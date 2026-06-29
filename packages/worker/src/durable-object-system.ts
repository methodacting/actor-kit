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
  [key: string]: unknown;
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
 * No-op clock for XState actors that use alarm-based scheduling.
 * Delays are handled via DO alarms, not setTimeout.
 */
export const NOOP_CLOCK: Clock = {
  setTimeout: () => Math.random(),
  clearTimeout: () => {
    // No-op — alarms manage cancellation
  },
};

/**
 * Map to track scheduled events by their scheduledEventId.
 * Used to look up event data when an alarm fires.
 */
const scheduledEventsMap = new Map<string, ScheduledEventSnapshot>();

/**
 * Create an alarm-based scheduler for XState actors.
 * Replaces the default setTimeout-based scheduler with one
 * that uses Durable Object alarms for persistence across restarts.
 */
export function createAlarmScheduler(
  alarmManager: AlarmManager,
  _system: unknown
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

      scheduledEventsMap.set(scheduledEventId, {
        sourceSessionId: source.sessionId,
        targetSessionId: target.sessionId,
        event,
        delay,
        id,
        startedAt: Date.now(),
      });

      const alarmId = `xstate-${scheduledEventId}`;

      try {
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
        });
      } catch (error) {
        console.error(`[AlarmScheduler] Error scheduling alarm:`, error);
        scheduledEventsMap.delete(scheduledEventId);
      }
    },

    cancel: (source: AnyActorRef, id: string) => {
      const scheduledEventId = `${source.sessionId}.${id}`;
      scheduledEventsMap.delete(scheduledEventId);

      try {
        alarmManager.cancel(`xstate-${scheduledEventId}`);
      } catch (error) {
        console.error(`[AlarmScheduler] Error canceling alarm:`, error);
      }
    },

    cancelAll: (actorRef: AnyActorRef) => {
      const eventsToCancel: string[] = [];

      for (const [scheduledEventId, snapshot] of scheduledEventsMap.entries()) {
        if (snapshot.sourceSessionId === actorRef.sessionId) {
          eventsToCancel.push(scheduledEventId);
        }
      }

      for (const scheduledEventId of eventsToCancel) {
        scheduledEventsMap.delete(scheduledEventId);
        try {
          alarmManager.cancel(`xstate-${scheduledEventId}`);
        } catch (error) {
          console.error(`[AlarmScheduler] Error canceling alarm:`, error);
        }
      }
    },
  };
}

/**
 * Minimal actor-ref shape we rely on to route a delayed event. Matches XState's
 * `ActorRefLike` plus the optional `system` for relaying.
 */
interface RoutableActorRef {
  sessionId?: string;
  send: (event: unknown) => void;
  getSnapshot?: () => unknown;
  system?: {
    _relay?: (source: unknown, target: unknown, event: unknown) => void;
  };
}

/**
 * Resolve a sessionId to a live actor ref by walking the actor tree.
 *
 * XState's system keeps a sessionId→ref registry, but it's closure-local and
 * never exposed (`system.get` only resolves *keyed* actors, not arbitrary
 * children). Each snapshot exposes `children: Record<string, AnyActorRef>` and
 * every ref carries `.sessionId`, so we recurse from the root to find the match.
 */
function findBySessionId(
  root: RoutableActorRef,
  sessionId: string
): RoutableActorRef | undefined {
  if (root.sessionId === sessionId) return root;
  const snapshot = root.getSnapshot?.() as
    | { children?: Record<string, RoutableActorRef> }
    | undefined;
  const children = snapshot?.children;
  if (!children) return undefined;
  for (const child of Object.values(children)) {
    const found = findBySessionId(child, sessionId);
    if (found) return found;
  }
  return undefined;
}

/**
 * Handle an XState delayed event alarm.
 * Called from the Durable Object's alarm() handler.
 *
 * Delivers the delayed event to the *recorded target* — which is usually the
 * root actor (top-level `after`), but may be an invoked child actor that
 * scheduled its own delay. Routing it back to the root would silently drop the
 * child's timer after hibernation, so we resolve the stored session IDs to refs.
 */
export function handleXStateAlarm(
  alarmData: XStateAlarmData,
  actor: RoutableActorRef
): void {
  const { scheduledEventId, event, sourceSessionId, targetSessionId } =
    alarmData;

  scheduledEventsMap.delete(scheduledEventId);

  try {
    // Fast path: the delay targets the root actor (the common case).
    if (!targetSessionId || targetSessionId === actor.sessionId) {
      actor.send(event);
      return;
    }

    const target = findBySessionId(actor, targetSessionId);
    if (!target) {
      // The target child was stopped before its alarm fired — the delayed event
      // is moot. Drop it rather than misdeliver to the root actor.
      return;
    }

    const source = findBySessionId(actor, sourceSessionId) ?? actor;
    if (actor.system?._relay) {
      actor.system._relay(source, target, event);
    } else {
      target.send(event);
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
      const { sourceSessionId, targetSessionId, event, scheduledEventId } =
        alarm.payload;
      const delay = alarm.scheduledAt - Date.now();

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
