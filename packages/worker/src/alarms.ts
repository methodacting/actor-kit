import type {
  SqliteStorage,
  AlarmRecord,
} from "./sqlite";

/**
 * Supported alarm types
 */
export type AlarmType = "xstate-delay" | "cache-cleanup" | "custom";

/**
 * Alarm data from the database with parsed payload
 */
export interface Alarm {
  id: string;
  type: AlarmType;
  scheduledAt: number;
  repeatInterval?: number;
  payload: Record<string, unknown>;
  createdAt: number;
}

/**
 * Options for scheduling a new alarm
 */
export interface ScheduleAlarmOptions {
  id: string;
  type: AlarmType;
  scheduledAt: number;
  repeatInterval?: number;
  payload: Record<string, unknown>;
}

/**
 * Result from handling an alarm
 */
export interface AlarmHandleResult {
  id: string;
  type: AlarmType;
  rescheduled?: boolean;
  deleted: boolean;
}

/**
 * Manages alarms for a Durable Object using SQLite storage
 * and the Durable Object alarm API.
 *
 * Alarms are stored in SQLite and the earliest one is set as the
 * actual DO alarm. When the DO alarm fires, all due alarms are
 * processed and the next DO alarm is scheduled.
 */
export class AlarmManager {
  private storage: SqliteStorage;
  private doState: DurableObjectState;
  private currentAlarmId: string | null = null;
  private currentAlarmTime: number | null = null;

  constructor(storage: SqliteStorage, doState: DurableObjectState) {
    this.storage = storage;
    this.doState = doState;
  }

  /**
   * Schedule a new alarm
   */
  schedule(options: ScheduleAlarmOptions): void {
    this.storage.insertAlarm(options);
    this.rescheduleNextAlarm();
  }

  /**
   * Cancel an alarm by ID
   */
  cancel(id: string): void {
    this.storage.deleteAlarm(id);
    if (this.currentAlarmId === id) {
      this.rescheduleNextAlarm();
    }
  }

  /**
   * Cancel all alarms of a specific type
   */
  cancelByType(type: AlarmType): void {
    this.storage.deleteAlarmsByType(type);
    this.rescheduleNextAlarm();
  }

  /**
   * Get all pending alarms
   */
  getPendingAlarms(): Alarm[] {
    const records = this.storage.getAlarms();
    return records.map(this.parseAlarmRecord);
  }

  /**
   * Get alarms that are due now or before a given time
   */
  getDueAlarms(before: number = Date.now()): Alarm[] {
    const records = this.storage.getDueAlarms(before);
    return records.map(this.parseAlarmRecord);
  }

  /**
   * Reschedule the next DO alarm based on the earliest alarm in storage.
   * Sets the actual Durable Object alarm that triggers the alarm() handler.
   */
  rescheduleNextAlarm(): void {
    const earliest = this.storage.getEarliestAlarm();

    if (!earliest) {
      this.currentAlarmId = null;
      this.currentAlarmTime = null;
      return;
    }

    if (
      this.currentAlarmId !== earliest.id ||
      this.currentAlarmTime !== earliest.scheduled_at
    ) {
      this.currentAlarmId = earliest.id;
      this.currentAlarmTime = earliest.scheduled_at;
      this.doState.storage.setAlarm(earliest.scheduled_at);
    }
  }

  /**
   * Handle due alarms and return results.
   * Should be called from the Durable Object's alarm() handler.
   */
  handleDueAlarms(
    handler: (alarm: Alarm) => void
  ): AlarmHandleResult[] {
    const now = Date.now();
    const dueAlarms = this.getDueAlarms(now);
    const results: AlarmHandleResult[] = [];

    for (const alarm of dueAlarms) {
      let rescheduled = false;
      let deleted = true;

      if (alarm.repeatInterval) {
        const nextScheduledAt = now + alarm.repeatInterval;
        this.storage.updateAlarm({
          id: alarm.id,
          type: alarm.type,
          scheduledAt: nextScheduledAt,
          repeatInterval: alarm.repeatInterval,
          payload: alarm.payload,
        });
        rescheduled = true;
        deleted = false;
      } else {
        this.storage.deleteAlarm(alarm.id);
      }

      try {
        handler(alarm);
      } catch (error) {
        console.error(`Error handling alarm ${alarm.id}:`, error);
      }

      results.push({
        id: alarm.id,
        type: alarm.type,
        rescheduled,
        deleted,
      });
    }

    this.rescheduleNextAlarm();
    return results;
  }

  /**
   * Get the current scheduled DO alarm info
   */
  getCurrentAlarm(): { id: string | null; time: number | null } {
    return {
      id: this.currentAlarmId,
      time: this.currentAlarmTime,
    };
  }

  private parseAlarmRecord(record: AlarmRecord): Alarm {
    return {
      id: record.id,
      type: record.type as AlarmType,
      scheduledAt: record.scheduled_at,
      repeatInterval: record.repeat_interval ?? undefined,
      payload: record.payload ? JSON.parse(record.payload) : {},
      createdAt: record.created_at,
    };
  }
}

/**
 * Generate a unique alarm ID
 */
export function generateAlarmId(): string {
  return `alarm-${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
}
