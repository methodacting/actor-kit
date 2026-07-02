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
 * The scheduler shape XState's actor system expects.
 */
export interface XStateScheduler {
  schedule: (
    source: AnyActorRef,
    target: AnyActorRef,
    event: AnyEventObject,
    delay: number,
    id?: string
  ) => void;
  cancel: (source: AnyActorRef, id: string) => void;
  cancelAll: (actorRef: AnyActorRef) => void;
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
 * Alarm-backed replacement for XState's setTimeout scheduler, scoped to one
 * Durable Object instance.
 *
 * Delays are persisted as DO alarms (via the AlarmManager) so they survive
 * hibernation; the in-memory map is per-instance bookkeeping only. It MUST be
 * per-instance: XState session ids (`x:0`, `x:1`, …) restart from zero in every
 * actor system, so a module-level map would collide across DO instances that
 * share an isolate and let one instance's `cancelAll` clobber another's entries.
 */
export class XStateAlarmScheduler {
  private scheduledEvents = new Map<string, ScheduledEventSnapshot>();

  constructor(private readonly alarmManager: AlarmManager) {}

  /**
   * The scheduler object to install on `actor.system.scheduler`.
   */
  scheduler(): XStateScheduler {
    return {
      schedule: (
        source: AnyActorRef,
        target: AnyActorRef,
        event: AnyEventObject,
        delay: number,
        id: string = Math.random().toString(36).slice(2)
      ) => {
        const scheduledEventId = `${source.sessionId}.${id}`;

        this.scheduledEvents.set(scheduledEventId, {
          sourceSessionId: source.sessionId,
          targetSessionId: target.sessionId,
          event,
          delay,
          id,
          startedAt: Date.now(),
        });

        const alarmId = `xstate-${scheduledEventId}`;

        try {
          this.alarmManager.schedule({
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
          this.scheduledEvents.delete(scheduledEventId);
        }
      },

      cancel: (source: AnyActorRef, id: string) => {
        const scheduledEventId = `${source.sessionId}.${id}`;
        this.scheduledEvents.delete(scheduledEventId);

        try {
          this.alarmManager.cancel(`xstate-${scheduledEventId}`);
        } catch (error) {
          console.error(`[AlarmScheduler] Error canceling alarm:`, error);
        }
      },

      cancelAll: (actorRef: AnyActorRef) => {
        const eventsToCancel: string[] = [];

        for (const [
          scheduledEventId,
          snapshot,
        ] of this.scheduledEvents.entries()) {
          if (snapshot.sourceSessionId === actorRef.sessionId) {
            eventsToCancel.push(scheduledEventId);
          }
        }

        for (const scheduledEventId of eventsToCancel) {
          this.scheduledEvents.delete(scheduledEventId);
          try {
            this.alarmManager.cancel(`xstate-${scheduledEventId}`);
          } catch (error) {
            console.error(`[AlarmScheduler] Error canceling alarm:`, error);
          }
        }
      },
    };
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
  handleAlarm(alarmData: XStateAlarmData, actor: RoutableActorRef): void {
    const { scheduledEventId, event, sourceSessionId, targetSessionId } =
      alarmData;

    this.scheduledEvents.delete(scheduledEventId);

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
  getScheduledEvents(): Map<string, ScheduledEventSnapshot> {
    return new Map(this.scheduledEvents);
  }

  /**
   * Restore scheduled events from storage (called after DO hibernation)
   */
  restoreScheduledEvents(
    alarms: Array<{ payload: XStateAlarmData; scheduledAt: number }>
  ): void {
    for (const alarm of alarms) {
      if (alarm.payload.type === "xstate-delay") {
        const { sourceSessionId, targetSessionId, event, scheduledEventId } =
          alarm.payload;
        const delay = alarm.scheduledAt - Date.now();

        if (delay > 0) {
          this.scheduledEvents.set(scheduledEventId, {
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
}
