import { PERSISTED_SNAPSHOT_KEY } from "./constants";
import type { Caller } from "./types";

/**
 * SQL schema for the actor-kit SQLite storage
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

-- Index for efficient due alarm queries
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
  actor_id TEXT PRIMARY KEY,
  snapshot TEXT NOT NULL,
  checksum TEXT,
  updated_at INTEGER NOT NULL
);
`;

/**
 * Alarm record from the database
 */
export interface AlarmRecord {
  id: string;
  type: string;
  scheduled_at: number;
  repeat_interval: number | null;
  payload: string | null;
  created_at: number;
}

/**
 * Scheduled alarm options
 */
export interface AlarmScheduleOptions {
  id: string;
  type: string;
  scheduledAt: number;
  repeatInterval?: number;
  payload: Record<string, unknown>;
}

/**
 * Actor metadata record
 */
export interface ActorMetaRecord {
  actor_id: string;
  actor_type: string;
  initial_caller: string; // JSON stringified Caller
  input: string; // JSON stringified
  created_at: number;
  updated_at: number;
}

/**
 * Actor metadata as an object
 */
export interface ActorMeta {
  actorId: string;
  actorType: string;
  initialCaller: Caller;
  input: Record<string, unknown>;
}

/**
 * Snapshot record
 */
export interface SnapshotRecord {
  actor_id: string;
  snapshot: string; // JSON stringified
  checksum: string | null;
  updated_at: number;
}

/**
 * Snapshot as an object
 */
export interface Snapshot {
  actorId: string;
  snapshot: unknown;
  checksum?: string;
}

/**
 * SQLite storage wrapper for actor-kit Durable Objects
 * Provides methods for managing alarms, actor metadata, and snapshots
 */
export class ActorKitStorage {
  private initialized = false;
  private sql: DurableObjectStorage["sql"];

  constructor(private readonly storage: DurableObjectStorage) {
    this.sql = storage.sql;
  }

  /**
   * Initialize the database schema if not already done
   */
  async ensureInitialized(): Promise<void> {
    if (this.initialized) return;

    try {
      // Execute schema creation - SQLite will ignore IF NOT EXISTS if tables exist
      await this.sql.exec(SQL_SCHEMA);
      this.initialized = true;
    } catch (error) {
      console.error("Failed to initialize database schema:", error);
      throw error;
    }
  }

  // ==================== Alarms ====================

  /**
   * Get all alarms, optionally filtered by actor
   */
  async getAlarms(): Promise<AlarmRecord[]> {
    await this.ensureInitialized();
    const result = await this.sql.exec(
      "SELECT id, type, scheduled_at, repeat_interval, payload, created_at FROM alarms ORDER BY scheduled_at ASC"
    );
    return (await this.parseRows(result)) as AlarmRecord[];
  }

  /**
   * Get alarms that are due before a given timestamp
   */
  async getDueAlarms(before: number): Promise<AlarmRecord[]> {
    await this.ensureInitialized();
    const result = await this.sql.exec(
      "SELECT id, type, scheduled_at, repeat_interval, payload, created_at FROM alarms WHERE scheduled_at <= ? ORDER BY scheduled_at ASC",
      before
    );
    return (await this.parseRows(result)) as AlarmRecord[];
  }

  /**
   * Get the earliest scheduled alarm
   */
  async getEarliestAlarm(): Promise<AlarmRecord | null> {
    await this.ensureInitialized();
    const result = await this.sql.exec(
      "SELECT id, type, scheduled_at, repeat_interval, payload, created_at FROM alarms ORDER BY scheduled_at ASC LIMIT 1"
    );
    const rows = (await this.parseRows(result)) as AlarmRecord[];
    return rows[0] || null;
  }

  /**
   * Insert a new alarm
   */
  async insertAlarm(options: AlarmScheduleOptions): Promise<void> {
    await this.ensureInitialized();
    await this.sql.exec(
      "INSERT INTO alarms (id, type, scheduled_at, repeat_interval, payload, created_at) VALUES (?, ?, ?, ?, ?, ?)",
      options.id,
      options.type,
      options.scheduledAt,
      options.repeatInterval ?? null,
      JSON.stringify(options.payload),
      Date.now()
    );
  }

  /**
   * Update an alarm's scheduled time (for recurring alarms)
   */
  async updateAlarm(options: AlarmScheduleOptions): Promise<void> {
    await this.ensureInitialized();
    await this.sql.exec(
      "UPDATE alarms SET scheduled_at = ?, repeat_interval = ?, payload = ? WHERE id = ?",
      options.scheduledAt,
      options.repeatInterval ?? null,
      JSON.stringify(options.payload),
      options.id
    );
  }

  /**
   * Delete an alarm by ID
   */
  async deleteAlarm(id: string): Promise<void> {
    await this.ensureInitialized();
    await this.sql.exec("DELETE FROM alarms WHERE id = ?", id);
  }

  /**
   * Delete all alarms of a specific type
   */
  async deleteAlarmsByType(type: string): Promise<void> {
    await this.ensureInitialized();
    await this.sql.exec("DELETE FROM alarms WHERE type = ?", type);
  }

  // ==================== Actor Metadata ====================

  /**
   * Get actor metadata by ID
   */
  async getActorMeta(actorId?: string): Promise<ActorMeta | null> {
    await this.ensureInitialized();

    if (!actorId) {
      // Get the first (and only) actor metadata
      const result = await this.sql.exec(
        "SELECT actor_id, actor_type, initial_caller, input, created_at, updated_at FROM actor_meta LIMIT 1"
      );
      const rows = (await this.parseRows(result)) as ActorMetaRecord[];
      if (rows.length === 0) return null;

      const row = rows[0];
      return {
        actorId: row.actor_id,
        actorType: row.actor_type,
        initialCaller: JSON.parse(row.initial_caller) as Caller,
        input: JSON.parse(row.input),
      };
    }

    const result = await this.sql.exec(
      "SELECT actor_id, actor_type, initial_caller, input, created_at, updated_at FROM actor_meta WHERE actor_id = ?",
      actorId
    );
    const rows = (await this.parseRows(result)) as ActorMetaRecord[];
    if (rows.length === 0) return null;

    const row = rows[0];
    return {
      actorId: row.actor_id,
      actorType: row.actor_type,
      initialCaller: JSON.parse(row.initial_caller) as Caller,
      input: JSON.parse(row.input),
    };
  }

  /**
   * Set actor metadata
   */
  async setActorMeta(meta: ActorMeta): Promise<void> {
    await this.ensureInitialized();
    const now = Date.now();
    await this.sql.exec(
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

  /**
   * Delete actor metadata
   */
  async deleteActorMeta(actorId: string): Promise<void> {
    await this.ensureInitialized();
    await this.sql.exec("DELETE FROM actor_meta WHERE actor_id = ?", actorId);
  }

  // ==================== Snapshots ====================

  /**
   * Get a snapshot by actor ID
   */
  async getSnapshot(actorId: string): Promise<Snapshot | null> {
    await this.ensureInitialized();
    const result = await this.sql.exec(
      "SELECT actor_id, snapshot, checksum, updated_at FROM snapshots WHERE actor_id = ?",
      actorId
    );
    const rows = (await this.parseRows(result)) as SnapshotRecord[];
    if (rows.length === 0) return null;

    const row = rows[0];
    return {
      actorId: row.actor_id,
      snapshot: JSON.parse(row.snapshot),
      checksum: row.checksum ?? undefined,
    };
  }

  /**
   * Set a snapshot for an actor
   */
  async setSnapshot(actorId: string, snapshot: unknown, checksum?: string): Promise<void> {
    await this.ensureInitialized();
    await this.sql.exec(
      `INSERT INTO snapshots (actor_id, snapshot, checksum, updated_at)
       VALUES (?, ?, ?, ?)
       ON CONFLICT(actor_id) DO UPDATE SET
        snapshot = excluded.snapshot,
        checksum = excluded.checksum,
        updated_at = excluded.updated_at`,
      actorId,
      JSON.stringify(snapshot),
      checksum ?? null,
      Date.now()
    );
  }

  /**
   * Delete a snapshot
   */
  async deleteSnapshot(actorId: string): Promise<void> {
    await this.ensureInitialized();
    await this.sql.exec("DELETE FROM snapshots WHERE actor_id = ?", actorId);
  }

  // ==================== Migration Helpers ====================

  /**
   * Migrate data from legacy KV storage to SQLite
   * This is a one-time migration helper
   */
  async migrateFromKV(storage: DurableObjectStorage): Promise<void> {
    await this.ensureInitialized();

    // Migrate actor metadata
    const [actorType, actorId, initialCallerString, inputString] = await Promise.all([
      storage.get("actorType"),
      storage.get("actorId"),
      storage.get("initialCaller"),
      storage.get("input"),
    ]);

    if (actorType && actorId && initialCallerString && inputString) {
      await this.setActorMeta({
        actorId: actorId as string,
        actorType: actorType as string,
        initialCaller: JSON.parse(initialCallerString as string) as Caller,
        input: JSON.parse(inputString as string),
      });
    }

    // Migrate persisted snapshot
    const persistedSnapshot = await storage.get(PERSISTED_SNAPSHOT_KEY);
    if (persistedSnapshot) {
      const snapshot = JSON.parse(persistedSnapshot as string);
      await this.setSnapshot(actorId as string, snapshot);
    }
  }

  // ==================== Utility Methods ====================

  /**
   * Parse SQL result rows - handles both arrays and cursors
   */
  private async parseRows(result: any): Promise<unknown[]> {
    // Check if result is an async iterable (cursor)
    if (result && typeof result[Symbol.asyncIterator] === "function") {
      const cursor = result as AsyncIterable<{ columns: string[]; results: (string | number | null)[][] }>;
      const rows: unknown[] = [];
      let columns: string[] | null = null;

      for await (const batch of cursor) {
        if (!columns) columns = batch.columns;
        for (const row of batch.results) {
          const obj: Record<string, unknown> = {};
          (columns ?? []).forEach((col, i) => {
            obj[col] = row[i];
          });
          rows.push(obj);
        }
      }
      return rows;
    }

    // Handle row batches returned by sql.exec()
    const batches = Array.isArray(result) ? result : result ? [result] : [];
    if (batches.length === 0) return [];

    const first = batches[0] as {
      columns?: string[];
      columnNames?: string[];
      rows?: unknown[][];
      results?: unknown[][];
    };

    const columns = first?.columns ?? first?.columnNames ?? [];
    const rows = first?.rows ?? first?.results ?? [];
    if (!columns.length || !rows.length) return [];

    return rows.map((row: unknown[]) => {
      const obj: Record<string, unknown> = {};
      columns.forEach((col: string, i: number) => {
        obj[col] = row[i];
      });
      return obj;
    });
  }
}
