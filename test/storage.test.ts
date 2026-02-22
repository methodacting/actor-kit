import { describe, expect, it, vi } from "vitest";
import type { AlarmScheduleOptions } from "../src/storage";
import { ActorKitStorage } from "../src/storage";

type ExecResult = unknown;
type QueryHandler = (query: string, args: unknown[]) => ExecResult | Promise<ExecResult>;

function createStorage(handler: QueryHandler) {
  const exec = vi.fn(async (query: string, ...args: unknown[]) => handler(query, args));
  const storage = {
    sql: { exec },
    get: vi.fn(),
  } as unknown as DurableObjectStorage;

  return {
    actorStorage: new ActorKitStorage(storage),
    exec,
    rawStorage: storage,
  };
}

function alarmRecordBatch(id: string) {
  return [
    {
      columns: ["id", "type", "scheduled_at", "repeat_interval", "payload", "created_at"],
      rows: [[id, "custom", 123, null, "{\"foo\":1}", 1000]],
    },
  ];
}

describe("ActorKitStorage", () => {
  it("initializes schema only once across multiple operations", async () => {
    const schemaCalls: string[] = [];
    const { actorStorage } = createStorage((query) => {
      if (query.includes("CREATE TABLE IF NOT EXISTS alarms")) {
        schemaCalls.push(query);
        return [];
      }
      if (query.includes("FROM alarms")) return alarmRecordBatch("a1");
      return [];
    });

    await actorStorage.getAlarms();
    await actorStorage.getAlarms();

    expect(schemaCalls).toHaveLength(1);
  });

  it("passes SQL bind values as individual args instead of array wrappers", async () => {
    const { actorStorage, exec } = createStorage((query) => {
      if (query.includes("FROM alarms WHERE scheduled_at <= ?")) return [];
      if (query.includes("INSERT INTO alarms")) return [];
      return [];
    });

    const before = 999;
    await actorStorage.getDueAlarms(before);
    const dueAlarmCall = exec.mock.calls.find(([query]) =>
      String(query).includes("FROM alarms WHERE scheduled_at <= ?")
    );
    expect(dueAlarmCall).toBeDefined();
    expect(dueAlarmCall?.[2]).toBeUndefined();
    expect(dueAlarmCall?.[1]).toBe(before);

    const alarm: AlarmScheduleOptions = {
      id: "alarm-1",
      type: "xstate-delay",
      scheduledAt: 1000,
      repeatInterval: 5000,
      payload: { foo: "bar" },
    };
    await actorStorage.insertAlarm(alarm);

    const insertCall = exec.mock.calls.find(([query]) =>
      String(query).includes("INSERT INTO alarms")
    );
    expect(insertCall).toBeDefined();
    expect(Array.isArray(insertCall?.[1])).toBe(false);
    expect(insertCall?.[1]).toBe("alarm-1");
    expect(insertCall?.[2]).toBe("xstate-delay");
    expect(insertCall?.[3]).toBe(1000);
    expect(insertCall?.[4]).toBe(5000);
    expect(insertCall?.[5]).toBe("{\"foo\":\"bar\"}");
  });

  it("parses SQL batches that use columnNames/results format", async () => {
    const { actorStorage } = createStorage((query) => {
      if (query.includes("FROM alarms ORDER BY scheduled_at ASC")) {
        return [
          {
            columnNames: ["id", "type", "scheduled_at", "repeat_interval", "payload", "created_at"],
            results: [["c1", "custom", 10, null, "{}", 1]],
          },
        ];
      }
      return [];
    });

    const rows = await actorStorage.getAlarms();
    expect(rows).toHaveLength(1);
    expect(rows[0]).toMatchObject({
      id: "c1",
      type: "custom",
      scheduled_at: 10,
    });
  });

  it("parses async-iterable cursor results", async () => {
    const { actorStorage } = createStorage((query) => {
      if (!query.includes("FROM alarms ORDER BY scheduled_at ASC")) return [];
      return {
        async *[Symbol.asyncIterator]() {
          yield {
            columns: ["id", "type", "scheduled_at", "repeat_interval", "payload", "created_at"],
            results: [["cursor-1", "custom", 42, null, null, 99]],
          };
        },
      };
    });

    const rows = await actorStorage.getAlarms();
    expect(rows).toHaveLength(1);
    expect(rows[0]).toMatchObject({
      id: "cursor-1",
      scheduled_at: 42,
      created_at: 99,
    });
  });
});
