import type { SqliteStorage, EventInsert, EventRecord } from "./sqlite";
import type { Caller } from "@actor-kit/types";

/**
 * Options for the event log
 */
export interface EventLogOptions {
  /** Enable event logging to SQLite (default: false) */
  eventLog?: boolean;
  /** Maximum number of events to keep (rolling window, 0 = unlimited) */
  maxEvents?: number;
  /** Fields to strip from logged event payloads */
  redact?: string[];
}

/**
 * Event log entry before storage
 */
export interface EventLogEntry {
  /**
   * Sequence number captured synchronously for *this* event. Must be passed in
   * rather than read at write time: recordEvent runs after an async checksum, so
   * reading the live `eventSequence` would give every queued event the final
   * value and collide on the `seq` primary key.
   */
  seq: number;
  type: string;
  caller: Caller;
  payload: Record<string, unknown>;
  stateValue: unknown;
  checksum: string;
  durationMs?: number;
}

/**
 * Manages the event log for an actor.
 * Records events to SQLite after transitions, handles redaction and pruning.
 */
export class EventLog {
  private storage: SqliteStorage;
  private options: EventLogOptions;
  private eventSequence: number;

  constructor(
    storage: SqliteStorage,
    options: EventLogOptions,
    initialSequence: number = 0
  ) {
    this.storage = storage;
    this.options = options;
    this.eventSequence = initialSequence;
  }

  /**
   * Get the current event sequence number
   */
  getSequence(): number {
    return this.eventSequence;
  }

  /**
   * Increment and return the next sequence number.
   * Also persists the sequence to the meta table.
   */
  nextSequence(): number {
    this.eventSequence++;
    this.storage.setMeta("last_seq", String(this.eventSequence));
    return this.eventSequence;
  }

  /**
   * Record an event to the log after a transition.
   * Only records if eventLog is enabled.
   */
  recordEvent(entry: EventLogEntry): void {
    if (!this.options.eventLog) return;

    const seq = entry.seq;
    const redactedPayload = this.redactFields(entry.payload);

    const insert: EventInsert = {
      seq,
      timestamp: Date.now(),
      type: entry.type,
      callerId: entry.caller.id,
      callerType: entry.caller.type,
      payload: redactedPayload,
      stateValue: JSON.stringify(entry.stateValue),
      checksum: entry.checksum,
      durationMs: entry.durationMs,
    };

    this.storage.insertEvent(insert);

    // Prune old events if configured
    if (this.options.maxEvents && this.options.maxEvents > 0) {
      this.storage.pruneEvents(this.options.maxEvents, seq);
    }
  }

  /**
   * Query events from the log
   */
  queryEvents(options?: {
    afterSeq?: number;
    types?: string[];
    limit?: number;
  }): EventRecord[] {
    return this.storage.getEvents(options);
  }

  /**
   * Redact specified fields from an event payload
   */
  private redactFields(
    payload: Record<string, unknown>
  ): Record<string, unknown> {
    if (!this.options.redact || this.options.redact.length === 0) {
      return payload;
    }

    const redacted = { ...payload };
    for (const field of this.options.redact) {
      if (field in redacted) {
        delete redacted[field];
      }
    }
    return redacted;
  }
}

/**
 * Restore event sequence from storage
 */
export function restoreEventSequence(storage: SqliteStorage): number {
  const lastSeq = storage.getMeta("last_seq");
  return lastSeq ? parseInt(lastSeq, 10) : 0;
}
