import { describe, expect, it, beforeEach, vi } from "vitest";
import { SqliteStorage } from "../src/sqlite";

/**
 * Minimal in-memory SQLite-like mock for testing SqliteStorage.
 * Simulates the DurableObjectStorage.sql interface.
 */
class FakeSqlCursor {
  private rows: Record<string, unknown>[];
  private index = 0;

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

  toArray() {
    return this.rows;
  }
}

class FakeSql {
  private tables = new Map<string, Record<string, unknown>[]>();
  private execCalls: Array<{ query: string; params: unknown[] }> = [];

  exec(query: string, ...params: unknown[]): FakeSqlCursor {
    this.execCalls.push({ query, params });

    const normalized = query.trim().toUpperCase();

    // CREATE TABLE / CREATE INDEX — no-op
    if (normalized.startsWith("CREATE")) {
      return new FakeSqlCursor([]);
    }

    // INSERT
    if (normalized.startsWith("INSERT INTO META")) {
      return this.handleMetaInsert(query, params);
    }
    if (normalized.startsWith("INSERT INTO ALARMS")) {
      return this.handleInsert("alarms", params);
    }
    if (normalized.startsWith("INSERT INTO ACTOR_META")) {
      return this.handleActorMetaInsert(params);
    }
    if (normalized.startsWith("INSERT INTO SNAPSHOTS")) {
      return this.handleInsert("snapshots", params);
    }
    if (normalized.startsWith("INSERT INTO EVENTS")) {
      return this.handleInsert("events", params);
    }

    // DELETE (must be before SELECT to avoid "FROM X" matching)
    if (normalized.startsWith("DELETE FROM ALARMS")) {
      return this.handleAlarmDelete(query, params);
    }
    if (normalized.startsWith("DELETE FROM ACTOR_META")) {
      const rows = this.getTable("actor_meta");
      const idx = rows.findIndex((r) => r.actor_id === params[0]);
      if (idx >= 0) rows.splice(idx, 1);
      return new FakeSqlCursor([]);
    }
    if (normalized.startsWith("DELETE FROM EVENTS")) {
      return this.handleEventsDelete(params);
    }

    // UPDATE
    if (normalized.startsWith("UPDATE ALARMS")) {
      return this.handleAlarmUpdate(params);
    }

    // SELECT
    if (normalized.includes("FROM META")) {
      return this.handleMetaSelect(params);
    }
    if (normalized.includes("FROM ALARMS")) {
      return this.handleAlarmsSelect(query, params);
    }
    if (normalized.includes("FROM ACTOR_META")) {
      return this.handleActorMetaSelect(params);
    }
    if (normalized.includes("FROM SNAPSHOTS")) {
      return this.handleSnapshotsSelect(query);
    }
    if (normalized.includes("FROM EVENTS")) {
      return this.handleEventsSelect(query, params);
    }

    return new FakeSqlCursor([]);
  }

  private getTable(name: string): Record<string, unknown>[] {
    if (!this.tables.has(name)) {
      this.tables.set(name, []);
    }
    return this.tables.get(name)!;
  }

  private handleMetaInsert(
    _query: string,
    params: unknown[]
  ): FakeSqlCursor {
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

  private handleMetaSelect(params: unknown[]): FakeSqlCursor {
    const table = this.getTable("meta");
    if (params.length > 0) {
      const rows = table.filter((r) => r.key === params[0]);
      return new FakeSqlCursor(rows);
    }
    return new FakeSqlCursor(table);
  }

  private handleInsert(
    tableName: string,
    params: unknown[]
  ): FakeSqlCursor {
    const table = this.getTable(tableName);
    // Simple insert — store params as indexed record
    if (tableName === "alarms") {
      table.push({
        id: params[0],
        type: params[1],
        scheduled_at: params[2],
        repeat_interval: params[3],
        payload: params[4],
        created_at: params[5],
      });
    } else if (tableName === "snapshots") {
      table.push({
        id: table.length + 1,
        seq: params[0],
        timestamp: params[1],
        checksum: params[2],
        data: params[3],
      });
    } else if (tableName === "events") {
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
    }
    return new FakeSqlCursor([]);
  }

  private handleActorMetaInsert(params: unknown[]): FakeSqlCursor {
    const table = this.getTable("actor_meta");
    const existing = table.findIndex((r) => r.actor_id === params[0]);
    const row = {
      actor_id: params[0],
      actor_type: params[1],
      initial_caller: params[2],
      input: params[3],
      created_at: params[4],
      updated_at: params[5],
    };
    if (existing >= 0) {
      table[existing] = row;
    } else {
      table.push(row);
    }
    return new FakeSqlCursor([]);
  }

  private handleActorMetaSelect(params: unknown[]): FakeSqlCursor {
    const table = this.getTable("actor_meta");
    if (params.length > 0) {
      return new FakeSqlCursor(
        table.filter((r) => r.actor_id === params[0])
      );
    }
    return new FakeSqlCursor(table.slice(0, 1));
  }

  private handleSnapshotsSelect(query: string): FakeSqlCursor {
    const table = this.getTable("snapshots");
    const normalized = query.toUpperCase();
    if (normalized.includes("ORDER BY SEQ DESC")) {
      const sorted = [...table].sort(
        (a, b) => (b.seq as number) - (a.seq as number)
      );
      return new FakeSqlCursor(sorted.slice(0, 1));
    }
    return new FakeSqlCursor(table);
  }

  private handleEventsSelect(
    query: string,
    params: unknown[]
  ): FakeSqlCursor {
    const table = this.getTable("events");
    let rows = [...table];

    if (query.includes("seq > ?")) {
      const afterSeq = params[0] as number;
      rows = rows.filter((r) => (r.seq as number) > afterSeq);
      // Remove the first param since we consumed it
      params = params.slice(1);
    }

    if (query.includes("type IN")) {
      rows = rows.filter((r) =>
        params.includes(r.type as string)
      );
    }

    rows.sort((a, b) => (a.seq as number) - (b.seq as number));

    const limitMatch = query.match(/LIMIT\s+(\d+)/i);
    if (limitMatch) {
      rows = rows.slice(0, parseInt(limitMatch[1], 10));
    }

    return new FakeSqlCursor(rows);
  }

  private handleEventsDelete(params: unknown[]): FakeSqlCursor {
    const table = this.getTable("events");
    const cutoff = params[0] as number;
    const remaining = table.filter((r) => (r.seq as number) > cutoff);
    this.tables.set("events", remaining);
    return new FakeSqlCursor([]);
  }

  private handleAlarmsSelect(
    query: string,
    params: unknown[]
  ): FakeSqlCursor {
    const table = this.getTable("alarms");
    let rows = [...table];

    if (query.includes("scheduled_at <= ?")) {
      rows = rows.filter(
        (r) => (r.scheduled_at as number) <= (params[0] as number)
      );
    }

    rows.sort(
      (a, b) => (a.scheduled_at as number) - (b.scheduled_at as number)
    );

    if (query.includes("LIMIT 1")) {
      rows = rows.slice(0, 1);
    }

    return new FakeSqlCursor(rows);
  }

  private handleAlarmUpdate(params: unknown[]): FakeSqlCursor {
    const table = this.getTable("alarms");
    const idx = table.findIndex((r) => r.id === params[3]);
    if (idx >= 0) {
      table[idx] = {
        ...table[idx],
        scheduled_at: params[0],
        repeat_interval: params[1],
        payload: params[2],
      };
    }
    return new FakeSqlCursor([]);
  }

  private handleAlarmDelete(
    query: string,
    params: unknown[]
  ): FakeSqlCursor {
    const table = this.getTable("alarms");
    if (query.includes("type = ?")) {
      const remaining = table.filter((r) => r.type !== params[0]);
      this.tables.set("alarms", remaining);
    } else {
      const remaining = table.filter((r) => r.id !== params[0]);
      this.tables.set("alarms", remaining);
    }
    return new FakeSqlCursor([]);
  }

  getExecCalls() {
    return this.execCalls;
  }

  reset() {
    this.tables.clear();
    this.execCalls = [];
  }
}

function createFakeStorage(): DurableObjectStorage {
  const fakeSql = new FakeSql();
  const kvStore = new Map<string, unknown>();

  return {
    sql: fakeSql,
    get: vi.fn(async (key: string) => kvStore.get(key)),
    put: vi.fn(async (key: string, value: unknown) => {
      kvStore.set(key, value);
    }),
    delete: vi.fn(async (key: string) => {
      kvStore.delete(key);
      return true;
    }),
  } as unknown as DurableObjectStorage;
}

describe("SqliteStorage", () => {
  let storage: DurableObjectStorage;
  let sqliteStorage: SqliteStorage;

  beforeEach(() => {
    storage = createFakeStorage();
    sqliteStorage = new SqliteStorage(storage);
    sqliteStorage.ensureInitialized();
  });

  describe("ensureInitialized", () => {
    it("should be idempotent", () => {
      sqliteStorage.ensureInitialized();
      sqliteStorage.ensureInitialized();
      // No error thrown
    });
  });

  describe("actor metadata", () => {
    it("should store and retrieve actor metadata", () => {
      sqliteStorage.setActorMeta({
        actorId: "actor-1",
        actorType: "todo",
        initialCaller: { id: "user-1", type: "client" },
        input: { title: "My List" },
      });

      const meta = sqliteStorage.getActorMeta("actor-1");
      expect(meta).toEqual({
        actorId: "actor-1",
        actorType: "todo",
        initialCaller: { id: "user-1", type: "client" },
        input: { title: "My List" },
      });
    });

    it("should return null for non-existent actor", () => {
      const meta = sqliteStorage.getActorMeta("non-existent");
      expect(meta).toBeNull();
    });

    it("should return first actor when no id specified", () => {
      sqliteStorage.setActorMeta({
        actorId: "actor-1",
        actorType: "todo",
        initialCaller: { id: "user-1", type: "client" },
        input: {},
      });

      const meta = sqliteStorage.getActorMeta();
      expect(meta?.actorId).toBe("actor-1");
    });

    it("should update existing actor metadata", () => {
      sqliteStorage.setActorMeta({
        actorId: "actor-1",
        actorType: "todo",
        initialCaller: { id: "user-1", type: "client" },
        input: { title: "Old" },
      });

      sqliteStorage.setActorMeta({
        actorId: "actor-1",
        actorType: "todo",
        initialCaller: { id: "user-1", type: "client" },
        input: { title: "New" },
      });

      const meta = sqliteStorage.getActorMeta("actor-1");
      expect(meta?.input).toEqual({ title: "New" });
    });

    it("should delete actor metadata", () => {
      sqliteStorage.setActorMeta({
        actorId: "actor-1",
        actorType: "todo",
        initialCaller: { id: "user-1", type: "client" },
        input: {},
      });

      sqliteStorage.deleteActorMeta("actor-1");
      const meta = sqliteStorage.getActorMeta("actor-1");
      expect(meta).toBeNull();
    });
  });

  describe("snapshots", () => {
    it("should store and retrieve latest snapshot", () => {
      const data = JSON.stringify({ value: "idle", context: { count: 0 } });
      sqliteStorage.insertSnapshot(1, data, "abc123");

      const result = sqliteStorage.getLatestSnapshot();
      expect(result).toEqual({
        data,
        seq: 1,
        checksum: "abc123",
      });
    });

    it("should return latest snapshot by seq", () => {
      sqliteStorage.insertSnapshot(
        1,
        JSON.stringify({ v: 1 }),
        "check1"
      );
      sqliteStorage.insertSnapshot(
        5,
        JSON.stringify({ v: 5 }),
        "check5"
      );
      sqliteStorage.insertSnapshot(
        3,
        JSON.stringify({ v: 3 }),
        "check3"
      );

      const result = sqliteStorage.getLatestSnapshot();
      expect(result?.seq).toBe(5);
      expect(result?.checksum).toBe("check5");
    });

    it("should return null when no snapshots exist", () => {
      expect(sqliteStorage.getLatestSnapshot()).toBeNull();
    });
  });

  describe("alarms", () => {
    it("should insert and retrieve alarms", () => {
      sqliteStorage.insertAlarm({
        id: "alarm-1",
        type: "xstate-delay",
        scheduledAt: 1000,
        payload: { event: "TIMEOUT" },
      });

      const alarms = sqliteStorage.getAlarms();
      expect(alarms).toHaveLength(1);
      expect(alarms[0].id).toBe("alarm-1");
      expect(alarms[0].type).toBe("xstate-delay");
    });

    it("should get due alarms", () => {
      sqliteStorage.insertAlarm({
        id: "past",
        type: "custom",
        scheduledAt: 500,
        payload: {},
      });
      sqliteStorage.insertAlarm({
        id: "future",
        type: "custom",
        scheduledAt: 2000,
        payload: {},
      });

      const due = sqliteStorage.getDueAlarms(1000);
      expect(due).toHaveLength(1);
      expect(due[0].id).toBe("past");
    });

    it("should get earliest alarm", () => {
      sqliteStorage.insertAlarm({
        id: "later",
        type: "custom",
        scheduledAt: 2000,
        payload: {},
      });
      sqliteStorage.insertAlarm({
        id: "sooner",
        type: "custom",
        scheduledAt: 500,
        payload: {},
      });

      const earliest = sqliteStorage.getEarliestAlarm();
      expect(earliest?.id).toBe("sooner");
    });

    it("should delete alarm by id", () => {
      sqliteStorage.insertAlarm({
        id: "alarm-1",
        type: "custom",
        scheduledAt: 1000,
        payload: {},
      });
      sqliteStorage.deleteAlarm("alarm-1");

      expect(sqliteStorage.getAlarms()).toHaveLength(0);
    });

    it("should delete alarms by type", () => {
      sqliteStorage.insertAlarm({
        id: "a1",
        type: "xstate-delay",
        scheduledAt: 1000,
        payload: {},
      });
      sqliteStorage.insertAlarm({
        id: "a2",
        type: "custom",
        scheduledAt: 1000,
        payload: {},
      });

      sqliteStorage.deleteAlarmsByType("xstate-delay");
      const alarms = sqliteStorage.getAlarms();
      expect(alarms).toHaveLength(1);
      expect(alarms[0].type).toBe("custom");
    });
  });

  describe("event log", () => {
    it("should insert and query events", () => {
      sqliteStorage.insertEvent({
        seq: 1,
        timestamp: Date.now(),
        type: "ADD_TODO",
        callerId: "user-1",
        callerType: "client",
        payload: { text: "Buy milk" },
        stateValue: '"idle"',
        checksum: "abc",
      });

      const events = sqliteStorage.getEvents();
      expect(events).toHaveLength(1);
      expect(events[0].type).toBe("ADD_TODO");
    });

    it("should filter events by afterSeq", () => {
      for (let i = 1; i <= 5; i++) {
        sqliteStorage.insertEvent({
          seq: i,
          timestamp: Date.now(),
          type: `EVENT_${i}`,
          callerId: "user-1",
          callerType: "client",
          stateValue: '"idle"',
          checksum: `check${i}`,
        });
      }

      const events = sqliteStorage.getEvents({ afterSeq: 3 });
      expect(events).toHaveLength(2);
      expect(events[0].seq).toBe(4);
    });

    it("should prune old events", () => {
      for (let i = 1; i <= 10; i++) {
        sqliteStorage.insertEvent({
          seq: i,
          timestamp: Date.now(),
          type: "TEST",
          callerId: "user-1",
          callerType: "client",
          stateValue: '"idle"',
          checksum: `check${i}`,
        });
      }

      sqliteStorage.pruneEvents(5, 10);
      const events = sqliteStorage.getEvents();
      expect(events).toHaveLength(5);
      expect(events[0].seq).toBe(6);
    });
  });

  describe("meta", () => {
    it("should set and get meta values", () => {
      sqliteStorage.setMeta("last_seq", "42");
      expect(sqliteStorage.getMeta("last_seq")).toBe("42");
    });

    it("should return null for non-existent key", () => {
      expect(sqliteStorage.getMeta("non-existent")).toBeNull();
    });

    it("should update existing meta values", () => {
      sqliteStorage.setMeta("last_seq", "1");
      sqliteStorage.setMeta("last_seq", "2");
      expect(sqliteStorage.getMeta("last_seq")).toBe("2");
    });
  });

  describe("KV migration", () => {
    it("should migrate legacy KV data to SQLite", async () => {
      // Populate KV with legacy data
      await storage.put("actorType", "todo");
      await storage.put("actorId", "actor-1");
      await storage.put(
        "initialCaller",
        JSON.stringify({ id: "user-1", type: "client" })
      );
      await storage.put("input", JSON.stringify({ title: "Test" }));
      await storage.put(
        "persistedSnapshot",
        JSON.stringify({ value: "idle", context: {} })
      );

      await sqliteStorage.migrateFromKVAsync(storage);

      // Check actor meta migrated
      const meta = sqliteStorage.getActorMeta("actor-1");
      expect(meta?.actorType).toBe("todo");

      // Check snapshot migrated
      const snapshot = sqliteStorage.getLatestSnapshot();
      expect(snapshot).not.toBeNull();

      // Check schema version set
      expect(sqliteStorage.getMeta("schema_version")).toBe("1");
    });

    it("should not migrate twice", async () => {
      sqliteStorage.setMeta("schema_version", "1");

      await storage.put("actorType", "todo");
      await sqliteStorage.migrateFromKVAsync(storage);

      // No actor meta should be written since already migrated
      const meta = sqliteStorage.getActorMeta();
      expect(meta).toBeNull();
    });
  });
});
