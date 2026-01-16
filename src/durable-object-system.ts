import type { AnyActorRef, AnyEventObject } from "xstate";
import type { AlarmManager } from "./alarms";

/**
 * Serializable data stored with each alarm for XState delayed events
 */
export interface XStateAlarmData {
  type: "xstate-delay";
  sourceSessionId: string;
  targetSessionId: string;
  event: AnyEventObject;
  scheduledEventId: string;
  alarmId: string;
  [key: string]: unknown; // Index signature for Record<string, unknown> compatibility
}

/**
 * Snapshot of scheduled events for persistence
 */
export interface ScheduledEventSnapshot {
  sourceSessionId: string;
  targetSessionId: string;
  event: AnyEventObject;
  delay: number;
  id: string;
  startedAt: number;
}

/**
 * Clock interface for compatibility with XState
 */
export interface Clock {
  setTimeout: (fn: () => void, delay: number) => unknown;
  clearTimeout: (id: unknown) => void;
}

/**
 * Simple no-op clock for XState actors that use alarm-based scheduling
 * This clock doesn't actually schedule anything - delays are handled via alarms
 */
export const NOOP_CLOCK: Clock = {
  setTimeout: () => Math.random(), // Return a fake ID
  clearTimeout: () => {
    // No-op - alarms manage cancellation
  },
};

/**
 * Map to track scheduled events by their scheduledEventId
 * This is used to look up event data when an alarm fires
 */
const scheduledEventsMap = new Map<string, ScheduledEventSnapshot>();

/**
 * Create an alarm-based scheduler for XState actors
 * This replaces the default setTimeout-based scheduler with one that uses Durable Object alarms
 *
 * @param alarmManager - The alarm manager to schedule alarms with
 * @param system - The XState ActorSystem (used to relay events)
 * @returns A scheduler object with schedule, cancel, and cancelAll methods
 */
export function createAlarmScheduler(
  alarmManager: AlarmManager,
  system: any
): {
  schedule: (
    source: AnyActorRef,
    target: AnyActorRef,
    event: AnyEventObject,
    delay: number,
    id?: string
  ) => void;
  cancel: (source: AnyActorRef, id: string) => void;
  cancelAll: (actorRef: AnyActorRef) => void;
} {
  return {
    schedule: (
      source: AnyActorRef,
      target: AnyActorRef,
      event: AnyEventObject,
      delay: number,
      id: string = Math.random().toString(36).slice(2)
    ) => {
      const scheduledEventId = `${source.sessionId}.${id}`;

      // Store the event data for later retrieval
      const snapshot: ScheduledEventSnapshot = {
        sourceSessionId: source.sessionId,
        targetSessionId: target.sessionId,
        event,
        delay,
        id,
        startedAt: Date.now(),
      };
      scheduledEventsMap.set(scheduledEventId, snapshot);

      // Schedule the alarm
      const alarmId = `xstate-${scheduledEventId}`;

      alarmManager.schedule({
        id: alarmId,
        type: "xstate-delay",
        scheduledAt: Date.now() + delay,
        payload: {
          type: "xstate-delay",
          sourceSessionId: source.sessionId,
          targetSessionId: target.sessionId,
          event,
          scheduledEventId,
          alarmId,
        },
      }).catch((error) => {
        console.error(`[AlarmScheduler] Error scheduling alarm:`, error);
        scheduledEventsMap.delete(scheduledEventId);
      });
    },

    cancel: (source: AnyActorRef, id: string) => {
      const scheduledEventId = `${source.sessionId}.${id}`;

      // Remove from our tracking map
      scheduledEventsMap.delete(scheduledEventId);

      // Cancel the alarm
      alarmManager.cancel(`xstate-${scheduledEventId}`).catch((error) => {
        console.error(`[AlarmScheduler] Error canceling alarm:`, error);
      });
    },

    cancelAll: (actorRef: AnyActorRef) => {
      // Find all events for this actor
      const eventsToCancel: string[] = [];

      for (const [scheduledEventId, snapshot] of scheduledEventsMap.entries()) {
        if (snapshot.sourceSessionId === actorRef.sessionId) {
          eventsToCancel.push(scheduledEventId);
        }
      }

      // Cancel each event
      for (const scheduledEventId of eventsToCancel) {
        scheduledEventsMap.delete(scheduledEventId);
        alarmManager.cancel(`xstate-${scheduledEventId}`).catch((error) => {
          console.error(`[AlarmScheduler] Error canceling alarm:`, error);
        });
      }
    },
  };
}

/**
 * Handle an XState delayed event alarm
 * This should be called from the Durable Object's alarm() handler
 *
 * @param alarmData - The alarm data from the XState alarm
 * @param actor - The actor to send the event to
 */
export async function handleXStateAlarm(
  alarmData: XStateAlarmData,
  actor: any
): Promise<void> {
  const { scheduledEventId, event } = alarmData;

  // Remove from tracking map
  scheduledEventsMap.delete(scheduledEventId);

  // Send the event to the actor
  try {
    // Use the actor's internal _relay method to deliver the event
    if (actor.system && actor.system._relay) {
      actor.system._relay(actor, actor, event);
    } else {
      // Fallback: send directly to the actor
      actor.send(event);
    }
  } catch (error) {
    console.error(`[AlarmScheduler] Error handling XState alarm:`, error);
  }
}

/**
 * Get all scheduled events (useful for debugging/inspection)
 */
export function getScheduledEvents(): Map<string, ScheduledEventSnapshot> {
  return new Map(scheduledEventsMap);
}

/**
 * Restore scheduled events from storage (called after DO hibernation)
 */
export function restoreScheduledEvents(
  alarms: Array<{ payload: XStateAlarmData; scheduledAt: number }>
): void {
  for (const alarm of alarms) {
    if (alarm.payload.type === "xstate-delay") {
      const { sourceSessionId, targetSessionId, event, scheduledEventId } = alarm.payload;
      const delay = alarm.scheduledAt - Date.now();

      // Only restore if the alarm is still in the future
      if (delay > 0) {
        scheduledEventsMap.set(scheduledEventId, {
          sourceSessionId,
          targetSessionId,
          event,
          delay,
          id: scheduledEventId.split(".").pop() || scheduledEventId,
          startedAt: alarm.scheduledAt - delay,
        });
      }
    }
  }
}
