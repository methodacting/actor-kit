import { describe, expect, it, beforeEach, vi } from "vitest";
import { EventLog, restoreEventSequence } from "../src/event-log";
import { SqliteStorage } from "../src/sqlite";

// Reuse the fake SQL infrastructure from sqlite tests
class FakeSqlCursor {
  private rows: Record<string, unknown>[];

  constructor(rows: Record<string, unknown>[]) {
    this.rows = rows;
  }

  [Symbol.iterator]() {
    let idx = 0;
    const rows = this.rows;
    return {
      next() {
        if (idx < rows.length) {
          return { value: rows[idx++], done: false };
        }
        return { value: undefined, done: true };
      },
    };
  }
}

class FakeSql {
  private tables = new Map<string, Record<string, unknown>[]>();

  exec(query: string, ...params: unknown[]): FakeSqlCursor {
    const normalized = query.trim().toUpperCase();

    if (normalized.startsWith("CREATE")) {
      return new FakeSqlCursor([]);
    }

    if (normalized.startsWith("INSERT INTO META")) {
      const table = this.getTable("meta");
      const key = params[0] as string;
      const value = params[1] as string;
      const existing = table.findIndex((r) => r.key === key);
      if (existing >= 0) {
        table[existing] = { key, value };
      } else {
        table.push({ key, value });
      }
      return new FakeSqlCursor([]);
    }

    if (normalized.includes("FROM META")) {
      const table = this.getTable("meta");
      if (params.length > 0) {
        return new FakeSqlCursor(table.filter((r) => r.key === params[0]));
      }
      return new FakeSqlCursor(table);
    }

    if (normalized.startsWith("INSERT INTO EVENTS")) {
      const table = this.getTable("events");
      table.push({
        seq: params[0],
        timestamp: params[1],
        type: params[2],
        caller_id: params[3],
        caller_type: params[4],
        payload: params[5],
        state_value: params[6],
        checksum: params[7],
        duration_ms: params[8],
      });
      return new FakeSqlCursor([]);
    }

    if (normalized.startsWith("DELETE FROM EVENTS")) {
      const table = this.getTable("events");
      const cutoff = params[0] as number;
      this.tables.set(
        "events",
        table.filter((r) => (r.seq as number) > cutoff)
      );
      return new FakeSqlCursor([]);
    }

    if (normalized.includes("FROM EVENTS")) {
      const table = this.getTable("events");
      return new FakeSqlCursor(
        [...table].sort((a, b) => (a.seq as number) - (b.seq as number))
      );
    }

    return new FakeSqlCursor([]);
  }

  private getTable(name: string): Record<string, unknown>[] {
    if (!this.tables.has(name)) {
      this.tables.set(name, []);
    }
    return this.tables.get(name)!;
  }
}

function createFakeStorage(): DurableObjectStorage {
  return {
    sql: new FakeSql(),
    get: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
  } as unknown as DurableObjectStorage;
}

describe("EventLog", () => {
  let sqliteStorage: SqliteStorage;
  let eventLog: EventLog;

  beforeEach(() => {
    const storage = createFakeStorage();
    sqliteStorage = new SqliteStorage(storage);
    sqliteStorage.ensureInitialized();
    eventLog = new EventLog(sqliteStorage, { eventLog: true }, 0);
  });

  describe("sequence management", () => {
    it("should start at 0", () => {
      expect(eventLog.getSequence()).toBe(0);
    });

    it("should increment sequence", () => {
      expect(eventLog.nextSequence()).toBe(1);
      expect(eventLog.nextSequence()).toBe(2);
      expect(eventLog.getSequence()).toBe(2);
    });

    it("should persist sequence to meta", () => {
      eventLog.nextSequence();
      const stored = sqliteStorage.getMeta("last_seq");
      expect(stored).toBe("1");
    });
  });

  describe("recording events", () => {
    it("should record event when eventLog is enabled", () => {
      eventLog.nextSequence();
      eventLog.recordEvent({
        type: "ADD_TODO",
        caller: { id: "user-1", type: "client" },
        payload: { text: "Buy milk" },
        stateValue: "idle",
        checksum: "abc",
        durationMs: 1.5,
      });

      const events = eventLog.queryEvents();
      expect(events).toHaveLength(1);
      expect(events[0].type).toBe("ADD_TODO");
    });

    it("should not record when eventLog is disabled", () => {
      const disabledLog = new EventLog(
        sqliteStorage,
        { eventLog: false },
        0
      );
      disabledLog.nextSequence();
      disabledLog.recordEvent({
        type: "ADD_TODO",
        caller: { id: "user-1", type: "client" },
        payload: {},
        stateValue: "idle",
        checksum: "abc",
      });

      const events = disabledLog.queryEvents();
      expect(events).toHaveLength(0);
    });
  });

  describe("redaction", () => {
    it("should redact specified fields", () => {
      const redactLog = new EventLog(
        sqliteStorage,
        { eventLog: true, redact: ["storage", "env"] },
        0
      );
      redactLog.nextSequence();
      redactLog.recordEvent({
        type: "TEST",
        caller: { id: "user-1", type: "client" },
        payload: { storage: "secret", env: "secret", text: "visible" },
        stateValue: "idle",
        checksum: "abc",
      });

      const events = redactLog.queryEvents();
      expect(events).toHaveLength(1);
      const payload = JSON.parse(events[0].payload as string);
      expect(payload).not.toHaveProperty("storage");
      expect(payload).not.toHaveProperty("env");
      expect(payload).toHaveProperty("text", "visible");
    });
  });

  describe("pruning", () => {
    it("should prune old events when maxEvents is set", () => {
      const prunedLog = new EventLog(
        sqliteStorage,
        { eventLog: true, maxEvents: 3 },
        0
      );

      for (let i = 0; i < 5; i++) {
        prunedLog.nextSequence();
        prunedLog.recordEvent({
          type: `EVENT_${i}`,
          caller: { id: "user-1", type: "client" },
          payload: {},
          stateValue: "idle",
          checksum: `check${i}`,
        });
      }

      const events = prunedLog.queryEvents();
      expect(events).toHaveLength(3);
    });
  });
});

describe("restoreEventSequence", () => {
  it("should restore sequence from meta", () => {
    const storage = createFakeStorage();
    const sqliteStorage = new SqliteStorage(storage);
    sqliteStorage.ensureInitialized();
    sqliteStorage.setMeta("last_seq", "42");

    expect(restoreEventSequence(sqliteStorage)).toBe(42);
  });

  it("should return 0 when no sequence stored", () => {
    const storage = createFakeStorage();
    const sqliteStorage = new SqliteStorage(storage);
    sqliteStorage.ensureInitialized();

    expect(restoreEventSequence(sqliteStorage)).toBe(0);
  });
});
