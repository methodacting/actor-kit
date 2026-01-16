import type {
  ActorKitStorage,
  AlarmRecord,
  AlarmScheduleOptions,
} from "./storage";

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
 * and the Durable Object alarm API
 */
export class AlarmManager {
  private storage: ActorKitStorage;
  private state: DurableObjectState;
  private currentAlarmId: string | null = null;
  private currentAlarmTime: number | null = null;

  constructor(storage: ActorKitStorage, state: DurableObjectState) {
    this.storage = storage;
    this.state = state;
  }

  /**
   * Schedule a new alarm
   */
  async schedule(options: ScheduleAlarmOptions): Promise<void> {
    await this.storage.insertAlarm(options);
    await this.rescheduleNextAlarm();
  }

  /**
   * Cancel an alarm by ID
   */
  async cancel(id: string): Promise<void> {
    await this.storage.deleteAlarm(id);
    // If we canceled the current alarm, reschedule
    if (this.currentAlarmId === id) {
      await this.rescheduleNextAlarm();
    }
  }

  /**
   * Cancel all alarms of a specific type
   */
  async cancelByType(type: AlarmType): Promise<void> {
    await this.storage.deleteAlarmsByType(type);
    await this.rescheduleNextAlarm();
  }

  /**
   * Get all pending alarms
   */
  async getPendingAlarms(): Promise<Alarm[]> {
    const records = await this.storage.getAlarms();
    return records.map(this.parseAlarmRecord);
  }

  /**
   * Get alarms that are due now or before a given time
   */
  async getDueAlarms(before: number = Date.now()): Promise<Alarm[]> {
    const records = await this.storage.getDueAlarms(before);
    return records.map(this.parseAlarmRecord);
  }

  /**
   * Delete an alarm after it has been handled
   */
  async deleteAlarm(id: string): Promise<void> {
    await this.storage.deleteAlarm(id);
  }

  /**
   * Update an alarm (for rescheduling recurring alarms)
   */
  async updateAlarm(options: ScheduleAlarmOptions): Promise<void> {
    await this.storage.updateAlarm(options);
  }

  /**
   * Reschedule the next DO alarm based on the earliest alarm in storage
   * This sets the actual Durable Object alarm that will trigger the alarm() handler
   */
  async rescheduleNextAlarm(): Promise<void> {
    const earliest = await this.storage.getEarliestAlarm();

    if (!earliest) {
      // No alarms pending, clear the DO alarm
      this.currentAlarmId = null;
      this.currentAlarmTime = null;
      // Note: There's no way to "clear" a DO alarm, but we can set one far in the future
      // or just let it expire naturally
      return;
    }

    // Only set a new alarm if the earliest one is different from current
    if (this.currentAlarmId !== earliest.id || this.currentAlarmTime !== earliest.scheduled_at) {
      this.currentAlarmId = earliest.id;
      this.currentAlarmTime = earliest.scheduled_at;
      await this.state.storage.setAlarm(earliest.scheduled_at);
    }
  }

  /**
   * Handle due alarms and return results
   * This should be called from the Durable Object's alarm() handler
   */
  async handleDueAlarms(handler: (alarm: Alarm) => Promise<boolean>): Promise<AlarmHandleResult[]> {
    const now = Date.now();
    const dueAlarms = await this.getDueAlarms(now);
    const results: AlarmHandleResult[] = [];

    for (const alarm of dueAlarms) {
      let rescheduled = false;
      let deleted = true;

      if (alarm.repeatInterval) {
        // Recurring alarm - reschedule it
        const nextScheduledAt = now + alarm.repeatInterval;
        await this.updateAlarm({
          id: alarm.id,
          type: alarm.type,
          scheduledAt: nextScheduledAt,
          repeatInterval: alarm.repeatInterval,
          payload: alarm.payload,
        });
        rescheduled = true;
        deleted = false;
      } else {
        // One-time alarm - delete it
        await this.deleteAlarm(alarm.id);
      }

      // Call the handler and let it perform the alarm-specific action
      try {
        await handler(alarm);
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

    // Reschedule the next DO alarm
    await this.rescheduleNextAlarm();

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

  /**
   * Parse an alarm record from the database into an Alarm object
   */
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

/**
 * Calculate the next scheduled time for a recurring alarm
 */
export function calculateNextRecurringAlarm(
  baseTime: number,
  interval: number,
  now: number = Date.now()
): number {
  let next = baseTime;
  while (next < now) {
    next += interval;
  }
  return next;
}
