import { PERSISTED_SNAPSHOT_KEY } from "./constants";
import type { Caller } from "./types";

/**
 * SQL schema for the actor-kit SQLite storage layer.
 *
 * Tables:
 * - alarms: one-time and recurring alarms for XState delayed events
 * - actor_meta: actor metadata (replaces KV keys)
 * - snapshots: persisted snapshots tagged with event sequence
 * - events: append-only event log with server timestamps
 * - meta: key-value store for actor-level metadata (seq counter, schema version)
 */
const SQL_SCHEMA = `
-- Alarms table - supports one-time and recurring alarms
CREATE TABLE IF NOT EXISTS alarms (
  id TEXT PRIMARY KEY,
  type TEXT NOT NULL,
  scheduled_at INTEGER NOT NULL,
  repeat_interval INTEGER,
  payload TEXT,
  created_at INTEGER NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_alarms_scheduled_at ON alarms(scheduled_at);

-- Actor metadata (replaces KV keys: actorType, actorId, initialCaller, input)
CREATE TABLE IF NOT EXISTS actor_meta (
  actor_id TEXT PRIMARY KEY,
  actor_type TEXT NOT NULL,
  initial_caller TEXT NOT NULL,
  input TEXT NOT NULL,
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL
);

-- Snapshots table (replaces PERSISTED_SNAPSHOT_KEY)
CREATE TABLE IF NOT EXISTS snapshots (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  seq INTEGER NOT NULL,
  timestamp INTEGER NOT NULL,
  checksum TEXT NOT NULL,
  data TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_snapshots_seq ON snapshots(seq);

-- Event log - append-only log of every event processed by the actor
CREATE TABLE IF NOT EXISTS events (
  seq INTEGER PRIMARY KEY,
  timestamp INTEGER NOT NULL,
  type TEXT NOT NULL,
  caller_id TEXT NOT NULL,
  caller_type TEXT NOT NULL,
  payload TEXT,
  state_value TEXT NOT NULL,
  checksum TEXT NOT NULL,
  duration_ms REAL
);
CREATE INDEX IF NOT EXISTS idx_events_type ON events(type);
CREATE INDEX IF NOT EXISTS idx_events_timestamp ON events(timestamp);
CREATE INDEX IF NOT EXISTS idx_events_caller ON events(caller_id, caller_type);

-- Actor-level metadata (seq counter, schema version, etc.)
CREATE TABLE IF NOT EXISTS meta (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL
);
`;

// ==================== Record Types ====================

export interface AlarmRecord {
  id: string;
  type: string;
  scheduled_at: number;
  repeat_interval: number | null;
  payload: string | null;
  created_at: number;
}

export interface AlarmScheduleOptions {
  id: string;
  type: string;
  scheduledAt: number;
  repeatInterval?: number;
  payload: Record<string, unknown>;
}

export interface ActorMetaRecord {
  actor_id: string;
  actor_type: string;
  initial_caller: string;
  input: string;
  created_at: number;
  updated_at: number;
}

export interface ActorMeta {
  actorId: string;
  actorType: string;
  initialCaller: Caller;
  input: Record<string, unknown>;
}

export interface SnapshotRecord {
  id: number;
  seq: number;
  timestamp: number;
  checksum: string;
  data: string;
}

export interface EventRecord {
  seq: number;
  timestamp: number;
  type: string;
  caller_id: string;
  caller_type: string;
  payload: string | null;
  state_value: string;
  checksum: string;
  duration_ms: number | null;
}

export interface EventInsert {
  seq: number;
  timestamp: number;
  type: string;
  callerId: string;
  callerType: string;
  payload?: Record<string, unknown>;
  stateValue: string;
  checksum: string;
  durationMs?: number;
}

/**
 * SQLite storage wrapper for actor-kit Durable Objects.
 * Provides methods for managing alarms, actor metadata, snapshots, and event log.
 */
export class SqliteStorage {
  private initialized = false;
  private sql: DurableObjectStorage["sql"];

  constructor(private readonly storage: DurableObjectStorage) {
    this.sql = storage.sql;
  }

  /**
   * Initialize the database schema if not already done
   */
  ensureInitialized(): void {
    if (this.initialized) return;
    this.sql.exec(SQL_SCHEMA);
    this.initialized = true;
  }

  // ==================== Alarms ====================

  getAlarms(): AlarmRecord[] {
    this.ensureInitialized();
    return this.queryRows<AlarmRecord>(
      "SELECT id, type, scheduled_at, repeat_interval, payload, created_at FROM alarms ORDER BY scheduled_at ASC"
    );
  }

  getDueAlarms(before: number): AlarmRecord[] {
    this.ensureInitialized();
    return this.queryRows<AlarmRecord>(
      "SELECT id, type, scheduled_at, repeat_interval, payload, created_at FROM alarms WHERE scheduled_at <= ? ORDER BY scheduled_at ASC",
      before
    );
  }

  getEarliestAlarm(): AlarmRecord | null {
    this.ensureInitialized();
    const rows = this.queryRows<AlarmRecord>(
      "SELECT id, type, scheduled_at, repeat_interval, payload, created_at FROM alarms ORDER BY scheduled_at ASC LIMIT 1"
    );
    return rows[0] ?? null;
  }

  insertAlarm(options: AlarmScheduleOptions): void {
    this.ensureInitialized();
    this.sql.exec(
      "INSERT INTO alarms (id, type, scheduled_at, repeat_interval, payload, created_at) VALUES (?, ?, ?, ?, ?, ?)",
      options.id,
      options.type,
      options.scheduledAt,
      options.repeatInterval ?? null,
      JSON.stringify(options.payload),
      Date.now()
    );
  }

  updateAlarm(options: AlarmScheduleOptions): void {
    this.ensureInitialized();
    this.sql.exec(
      "UPDATE alarms SET scheduled_at = ?, repeat_interval = ?, payload = ? WHERE id = ?",
      options.scheduledAt,
      options.repeatInterval ?? null,
      JSON.stringify(options.payload),
      options.id
    );
  }

  deleteAlarm(id: string): void {
    this.ensureInitialized();
    this.sql.exec("DELETE FROM alarms WHERE id = ?", id);
  }

  deleteAlarmsByType(type: string): void {
    this.ensureInitialized();
    this.sql.exec("DELETE FROM alarms WHERE type = ?", type);
  }

  // ==================== Actor Metadata ====================

  getActorMeta(actorId?: string): ActorMeta | null {
    this.ensureInitialized();

    const query = actorId
      ? "SELECT actor_id, actor_type, initial_caller, input, created_at, updated_at FROM actor_meta WHERE actor_id = ?"
      : "SELECT actor_id, actor_type, initial_caller, input, created_at, updated_at FROM actor_meta LIMIT 1";

    const rows = actorId
      ? this.queryRows<ActorMetaRecord>(query, actorId)
      : this.queryRows<ActorMetaRecord>(query);

    if (rows.length === 0) return null;

    const row = rows[0];
    return {
      actorId: row.actor_id,
      actorType: row.actor_type,
      initialCaller: JSON.parse(row.initial_caller) as Caller,
      input: JSON.parse(row.input) as Record<string, unknown>,
    };
  }

  setActorMeta(meta: ActorMeta): void {
    this.ensureInitialized();
    const now = Date.now();
    this.sql.exec(
      `INSERT INTO actor_meta (actor_id, actor_type, initial_caller, input, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?)
       ON CONFLICT(actor_id) DO UPDATE SET
        actor_type = excluded.actor_type,
        initial_caller = excluded.initial_caller,
        input = excluded.input,
        updated_at = excluded.updated_at`,
      meta.actorId,
      meta.actorType,
      JSON.stringify(meta.initialCaller),
      JSON.stringify(meta.input),
      now,
      now
    );
  }

  deleteActorMeta(actorId: string): void {
    this.ensureInitialized();
    this.sql.exec("DELETE FROM actor_meta WHERE actor_id = ?", actorId);
  }

  // ==================== Snapshots ====================

  getLatestSnapshot(): { data: string; seq: number; checksum: string } | null {
    this.ensureInitialized();
    const rows = this.queryRows<SnapshotRecord>(
      "SELECT id, seq, timestamp, checksum, data FROM snapshots ORDER BY seq DESC LIMIT 1"
    );
    if (rows.length === 0) return null;
    return { data: rows[0].data, seq: rows[0].seq, checksum: rows[0].checksum };
  }

  insertSnapshot(seq: number, data: string, checksum: string): void {
    this.ensureInitialized();
    this.sql.exec(
      "INSERT INTO snapshots (seq, timestamp, checksum, data) VALUES (?, ?, ?, ?)",
      seq,
      Date.now(),
      checksum,
      data
    );
  }

  // ==================== Event Log ====================

  insertEvent(event: EventInsert): void {
    this.ensureInitialized();
    this.sql.exec(
      "INSERT INTO events (seq, timestamp, type, caller_id, caller_type, payload, state_value, checksum, duration_ms) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
      event.seq,
      event.timestamp,
      event.type,
      event.callerId,
      event.callerType,
      event.payload ? JSON.stringify(event.payload) : null,
      event.stateValue,
      event.checksum,
      event.durationMs ?? null
    );
  }

  getEvents(options?: {
    afterSeq?: number;
    types?: string[];
    limit?: number;
  }): EventRecord[] {
    this.ensureInitialized();

    const conditions: string[] = [];
    const params: unknown[] = [];

    if (options?.afterSeq !== undefined) {
      conditions.push("seq > ?");
      params.push(options.afterSeq);
    }

    if (options?.types && options.types.length > 0) {
      const placeholders = options.types.map(() => "?").join(", ");
      conditions.push(`type IN (${placeholders})`);
      params.push(...options.types);
    }

    const where = conditions.length > 0 ? ` WHERE ${conditions.join(" AND ")}` : "";
    const limit = options?.limit ? ` LIMIT ${options.limit}` : "";

    return this.queryRows<EventRecord>(
      `SELECT seq, timestamp, type, caller_id, caller_type, payload, state_value, checksum, duration_ms FROM events${where} ORDER BY seq ASC${limit}`,
      ...params
    );
  }

  pruneEvents(maxEvents: number, currentSeq: number): void {
    this.ensureInitialized();
    const cutoff = currentSeq - maxEvents;
    if (cutoff <= 0) return;
    this.sql.exec("DELETE FROM events WHERE seq <= ?", cutoff);
  }

  // ==================== Meta ====================

  getMeta(key: string): string | null {
    this.ensureInitialized();
    const rows = this.queryRows<{ key: string; value: string }>(
      "SELECT key, value FROM meta WHERE key = ?",
      key
    );
    return rows[0]?.value ?? null;
  }

  setMeta(key: string, value: string): void {
    this.ensureInitialized();
    this.sql.exec(
      "INSERT INTO meta (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value",
      key,
      value
    );
  }

  // ==================== Migration ====================

  /**
   * Migrate data from legacy KV storage to SQLite.
   * Called on first boot after enabling SQLite on the DO class.
   */
  migrateFromKV(storage: DurableObjectStorage, actorId: string): void {
    this.ensureInitialized();

    // Check if already migrated
    const schemaVersion = this.getMeta("schema_version");
    if (schemaVersion) return;

    // Migrate is sync since we need to block concurrency anyway.
    // The actual KV reads happen before this is called.
    this.setMeta("schema_version", "1");
    this.setMeta("created_at", String(Date.now()));
  }

  /**
   * Migrate legacy KV data to SQLite tables.
   * This handles the async KV reads and delegates to sync SQLite writes.
   */
  async migrateFromKVAsync(storage: DurableObjectStorage): Promise<void> {
    this.ensureInitialized();

    // Check if already migrated
    const schemaVersion = this.getMeta("schema_version");
    if (schemaVersion) return;

    // Read legacy KV data
    const [actorType, actorId, initialCallerString, inputString] =
      await Promise.all([
        storage.get("actorType"),
        storage.get("actorId"),
        storage.get("initialCaller"),
        storage.get("input"),
      ]);

    if (actorType && actorId && initialCallerString && inputString) {
      this.setActorMeta({
        actorId: actorId as string,
        actorType: actorType as string,
        initialCaller: JSON.parse(initialCallerString as string) as Caller,
        input: JSON.parse(inputString as string) as Record<string, unknown>,
      });
    }

    // Migrate persisted snapshot
    const persistedSnapshot = await storage.get(PERSISTED_SNAPSHOT_KEY);
    if (persistedSnapshot && actorId) {
      const data =
        typeof persistedSnapshot === "string"
          ? persistedSnapshot
          : JSON.stringify(persistedSnapshot);
      this.insertSnapshot(0, data, "migrated-from-kv");

      // Clean up legacy KV entry
      await storage.delete(PERSISTED_SNAPSHOT_KEY);
    }

    // Clean up legacy KV keys
    if (actorType) {
      await Promise.all([
        storage.delete("actorType"),
        storage.delete("actorId"),
        storage.delete("initialCaller"),
        storage.delete("input"),
      ]);
    }

    this.setMeta("schema_version", "1");
    this.setMeta("created_at", String(Date.now()));
  }

  // ==================== Utility ====================

  private queryRows<T>(query: string, ...params: unknown[]): T[] {
    const cursor = this.sql.exec(query, ...params);
    const rows: T[] = [];
    for (const row of cursor) {
      rows.push(row as T);
    }
    return rows;
  }
}
