# Alarms and Scheduler System

This document describes the alarm-based scheduling system and the migration from KV storage to SQLite storage in actor-kit.

## Overview

Actor-Kit now uses Cloudflare Durable Object's built-in `alarm()` API and SQLite storage to provide:

- **Hibernation-safe delayed events** - XState `after()` delays persist across DO hibernation
- **Recurring alarms** - Schedule periodic tasks like cache cleanup
- **SQLite storage** - Replace legacy KV with more efficient structured storage
- **Automatic migration** - Existing KV data is automatically migrated to SQLite

## Motivation

### The Problem

Cloudflare Durable Objects can hibernate after a period of inactivity to save resources. When a DO hibernates:
- All in-memory state is lost
- `setTimeout` and `setInterval` callbacks are cancelled
- Scheduled delayed events in XState machines are lost

Previously, actor-kit used:
- `setInterval` for periodic cache cleanup
- XState's default scheduler (using `setTimeout`) for delayed transitions
- KV storage for actor metadata and snapshots

### The Solution

1. **Alarm-based scheduling** - Replace `setTimeout`/`setInterval` with the DO `alarm()` API
2. **SQLite storage** - Use Durable Object's built-in SQLite for structured data
3. **XState scheduler monkey patch** - Inject our alarm-based scheduler into XState's system

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                     MachineServer DO                             │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │  ActorKitStorage (SQLite)                               │    │
│  │  ─────────────────────────────────────────────────────  │    │
│  │  • alarms table - scheduled alarms                     │    │
│  │  • actor_meta table - actor metadata                   │    │
│  │  • snapshots table - persisted state                   │    │
│  └─────────────────────────────────────────────────────────┘    │
│                           │                                     │
│                           ▼                                     │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │  AlarmManager                                           │    │
│  │  ─────────────────────────────────────────────────────  │    │
│  │  • schedule(options) - Add alarm to storage            │    │
│  │  • cancel(id) - Remove alarm                           │    │
│  │  • handleDueAlarms(handler) - Process fired alarms     │    │
│  │  • rescheduleNextAlarm() - Set DO alarm                │    │
│  └─────────────────────────────────────────────────────────┘    │
│                           │                                     │
│                           ▼                                     │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │  XState Actor System                                   │    │
│  │  ─────────────────────────────────────────────────────  │    │
│  │  scheduler (monkey patched)                            │    │
│  │    • schedule() → alarmManager.schedule()              │    │
│  │    • cancel() → alarmManager.cancel()                   │    │
│  └─────────────────────────────────────────────────────────┘    │
│                           │                                     │
│                           ▼                                     │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │  DO alarm() Handler                                     │    │
│  │  ─────────────────────────────────────────────────────  │    │
│  │  1. Get due alarms from SQLite                          │    │
│  │  2. Handle cache-cleanup alarms                         │    │
│  │  3. Handle xstate-delay alarms → relay to actor        │    │
│  │  4. Reschedule recurring alarms                        │    │
│  └─────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────┘
```

## SQLite Schema

```sql
-- Alarms table - supports one-time and recurring alarms
CREATE TABLE IF NOT EXISTS alarms (
  id TEXT PRIMARY KEY,
  type TEXT NOT NULL,           -- 'xstate-delay', 'cache-cleanup', 'custom'
  scheduled_at INTEGER NOT NULL,
  repeat_interval INTEGER,      -- NULL for one-time, ms for recurring
  payload TEXT,                 -- JSON data for alarm handler
  created_at INTEGER NOT NULL
);

CREATE INDEX idx_alarms_scheduled_at ON alarms(scheduled_at);

-- Actor metadata (replaces KV keys)
CREATE TABLE IF NOT EXISTS actor_meta (
  actor_id TEXT PRIMARY KEY,
  actor_type TEXT NOT NULL,
  initial_caller TEXT NOT NULL,  -- JSON Caller
  input TEXT NOT NULL,           -- JSON input
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL
);

-- Snapshots table (replaces PERSISTED_SNAPSHOT_KEY)
CREATE TABLE IF NOT EXISTS snapshots (
  actor_id TEXT PRIMARY KEY,
  snapshot TEXT NOT NULL,        -- JSON snapshot
  checksum TEXT,
  updated_at INTEGER NOT NULL
);
```

## XState Scheduler Integration

### How It Works

XState's scheduler is responsible for delayed events (e.g., `after(5000, 'active')`). The default scheduler uses `setTimeout`, which doesn't survive hibernation.

We monkey-patch the scheduler after actor creation:

```typescript
// In createMachineServer.ts
this.actor = createActor(machine, actorOptions);

// Replace the scheduler with our alarm-based version
if (this.alarmManager && this.actor.system) {
  this.actor.system.scheduler = createAlarmScheduler(
    this.alarmManager,
    this.actor.system
  );
}
```

### The Scheduler Interface

```typescript
interface Scheduler {
  // Schedule a delayed event
  schedule(
    source: AnyActorRef,    // Source actor
    target: AnyActorRef,    // Target actor (same for self-transitions)
    event: AnyEventObject,   // Event to send after delay
    delay: number,          // Milliseconds to wait
    id?: string            // Unique ID for this scheduled event
  ): void;

  // Cancel a scheduled event
  cancel(source: AnyActorRef, id: string): void;

  // Cancel all events for an actor
  cancelAll(actorRef: AnyActorRef): void;
}
```

#### XState Delayed Event ID Format

XState generates IDs for delayed events in the format:

```
xstate.after.{delay|index}.{machineId}.{stateId}
```

Examples:
- `xstate.after.1000.myMachine.idle` - Object syntax with delay value
- `xstate.after.0.myMachine.idle` - Array syntax (uses index)

Our scheduler combines this with the actor's `sessionId` to create a unique identifier:

```typescript
const scheduledEventId = `${source.sessionId}.${id}`;
// Result: "session-abc123.xstate.after.1000.myMachine.idle"
```

#### Supported XState Features

| Feature | Supported | Notes |
|---------|-----------|-------|
| `after: { delay: 1000, target: 'next' }` | ✅ | Uses alarm scheduler |
| `after: [{ delay: 1000, target: 'next' }]` | ✅ | Uses alarm scheduler |
| `invoke` with timeout | ⚠️ | Managed internally by XState, not via scheduler |
| `raise` with delay | ✅ | Uses alarm scheduler |

### Alarm-Based Scheduler Implementation

```typescript
export function createAlarmScheduler(
  alarmManager: AlarmManager,
  system: any
): Scheduler {
  return {
    schedule: (source, target, event, delay, id) => {
      const scheduledEventId = `${source.sessionId}.${id}`;

      // Store event data for later retrieval
      scheduledEventsMap.set(scheduledEventId, {
        sourceSessionId: source.sessionId,
        targetSessionId: target.sessionId,
        event,
        delay,
        id,
        startedAt: Date.now(),
      });

      // Schedule the alarm via AlarmManager
      alarmManager.schedule({
        id: `xstate-${scheduledEventId}`,
        type: "xstate-delay",
        scheduledAt: Date.now() + delay,
        payload: {
          type: "xstate-delay",
          sourceSessionId: source.sessionId,
          targetSessionId: target.sessionId,
          event,
          scheduledEventId,
        },
      });
    },

    cancel: (source, id) => {
      const scheduledEventId = `${source.sessionId}.${id}`;
      scheduledEventsMap.delete(scheduledEventId);
      alarmManager.cancel(`xstate-${scheduledEventId}`);
    },

    cancelAll: (actorRef) => {
      // Cancel all scheduled events for this actor
      for (const [scheduledEventId, snapshot] of scheduledEventsMap.entries()) {
        if (snapshot.sourceSessionId === actorRef.sessionId) {
          scheduledEventsMap.delete(scheduledEventId);
          alarmManager.cancel(`xstate-${scheduledEventId}`);
        }
      }
    },
  };
}
```

### Handling Fired Alarms

When a DO alarm fires, we deliver the event to the XState actor:

```typescript
async alarm(): Promise<void> {
  await this.alarmManager.handleDueAlarms(async (alarm) => {
    if (alarm.type === "xstate-delay") {
      // Extract event data from alarm payload
      const eventData = alarm.payload as XStateAlarmData;

      // Deliver event to actor using XState's internal _relay method
      await handleXStateAlarm(eventData, this.actor);
    }
  });
}
```

The `handleXStateAlarm` function uses XState's internal `_relay` method:

```typescript
export async function handleXStateAlarm(
  alarmData: XStateAlarmData,
  actor: any
): Promise<void> {
  const { scheduledEventId, event } = alarmData;

  // Remove from tracking map
  scheduledEventsMap.delete(scheduledEventId);

  // Deliver event using XState's internal relay
  if (actor.system && actor.system._relay) {
    actor.system._relay(actor, actor, event);
  } else {
    actor.send(event);
  }
}
```

## Alarm Types

### xstate-delay
Created automatically by XState when using `after()` delays:

```typescript
createMachine({
  initial: 'idle',
  states: {
    idle: {
      after: {
        5000: 'active'  // Creates xstate-delay alarm
      }
    },
    active: {}
  }
});
```

### cache-cleanup
Recurring alarm for cleaning up old snapshots:

```typescript
async #scheduleCacheCleanupAlarm() {
  await this.alarmManager.schedule({
    id: generateAlarmId(),
    type: "cache-cleanup",
    scheduledAt: Date.now() + 300000,  // 5 minutes
    repeatInterval: 300000,             // Recurring
    payload: {},
  });
}
```

### custom
User-defined alarms for application-specific tasks:

```typescript
await this.alarmManager.schedule({
  id: 'send-reminder',
  type: "custom",
  scheduledAt: Date.now() + 86400000,  // 24 hours
  payload: { userId: '123', message: 'Hello' },
});
```

## Storage API

### ActorKitStorage Class

```typescript
const storage = new ActorKitStorage(doState.storage);

// Initialize schema
await storage.ensureInitialized();

// Actor metadata
await storage.setActorMeta({
  actorId: 'my-actor',
  actorType: 'MyMachine',
  initialCaller: { id: 'client-1', type: 'client' },
  input: { some: 'data' },
});
const meta = await storage.getActorMeta('my-actor');

// Snapshots
await storage.setSnapshot('my-actor', { value: 'active', context: {} });
const snapshot = await storage.getSnapshot('my-actor');

// Alarms
const alarms = await storage.getAlarms();
const dueAlarms = await storage.getDueAlarms(Date.now());
await storage.insertAlarm({
  id: 'alarm-1',
  type: 'xstate-delay',
  scheduledAt: Date.now() + 5000,
  payload: { event: { type: 'TIMER' } },
});
await storage.deleteAlarm('alarm-1');
```

### AlarmManager Class

```typescript
const alarmManager = new AlarmManager(storage, doState);

// Schedule an alarm
await alarmManager.schedule({
  id: 'my-alarm',
  type: 'custom',
  scheduledAt: Date.now() + 60000,  // 1 minute
  payload: { data: 'value' },
});

// Cancel an alarm
await alarmManager.cancel('my-alarm');

// Cancel all alarms of a type
await alarmManager.cancelByType('custom');

// Get pending alarms
const pending = await alarmManager.getPendingAlarms();

// Get due alarms
const due = await alarmManager.getDueAlarms(Date.now());

// Handle due alarms
await alarmManager.handleDueAlarms(async (alarm) => {
  console.log('Alarm fired:', alarm.type, alarm.payload);
  return true;  // Return true to delete one-time alarms
});
```

## Migration Guide

### For Existing Users

The migration from KV to SQLite is **automatic**. When a Durable Object starts:

1. Check SQLite for actor metadata
2. If not found, check legacy KV keys
3. If KV data exists, migrate to SQLite
4. Continue with SQLite for all future operations

```typescript
// In constructor
const actorMeta = await this.storage.getActorMeta();

if (!actorMeta) {
  // Try legacy KV format
  const [actorType, actorId, initialCaller, input] = await Promise.all([
    this.kvStorage.get("actorType"),
    this.kvStorage.get("actorId"),
    this.kvStorage.get("initialCaller"),
    this.kvStorage.get("input"),
  ]);

  if (actorType && actorId && initialCaller && input) {
    // Migrate to SQLite
    await this.storage.setActorMeta({
      actorId,
      actorType,
      initialCaller: JSON.parse(initialCaller),
      input: JSON.parse(input),
    });
  }
}
```

### Configuration

Alarms are enabled by default. To disable:

```typescript
const MachineServer = createMachineServer({
  machine: myMachine,
  serviceEvent: MyServiceEventSchema,
  inputProps: MyInputProps,
  options: {
    persisted: true,
    enableAlarms: false,  // Disable alarm system
  },
});
```

## Hibernation Flow

### Normal Lifecycle

```
1. DO receives request → 2. Actor processes events → 3. DO hibernates
```

### With Scheduled Events

```
1. DO receives request
2. Actor processes events, schedules delayed event
3. Scheduler calls alarmManager.schedule()
4. Alarm stored in SQLite, DO alarm set
5. DO hibernates
6. DO alarm fires → alarm() handler called
7. Due alarms loaded from SQLite
8. XState events delivered via handleXStateAlarm()
9. Actor continues execution
```

## Performance Considerations

### SQLite vs KV

| Operation | KV | SQLite |
|-----------|-----|--------|
| Single key read | 1 round trip | 1 round trip |
| Multiple keys | N round trips | 1 query |
| Structured queries | Not supported | Full SQL support |
| Atomic transactions | Limited | Full ACID |

### Alarm Overhead

- Each delayed event creates 1 SQLite row
- DO alarm is set for earliest scheduled event
- On alarm fire, all due events are processed in batch
- Recurring alarms are rescheduled with updated `scheduled_at`

## Troubleshooting

### Alarms Not Firing

1. Check that `enableAlarms` is not set to `false`
2. Verify DO has proper alarm permissions in wrangler.toml
3. Check logs for scheduler replacement message

### Events Not Delivered After Hibernation

1. Verify alarm was stored in SQLite
2. Check `scheduledEventsMap` was restored
3. Ensure `handleXStateAlarm` is using `_relay` method

### Migration Not Working

1. Check that KV keys exist
2. Verify SQLite schema initialized
3. Check for parse errors in KV data

## API Reference

### Exports

```typescript
// Storage
export { ActorKitStorage } from './storage';
export type {
  AlarmRecord,
  AlarmScheduleOptions,
  ActorMeta,
  ActorMetaRecord,
  Snapshot,
  SnapshotRecord,
} from './storage';

// Alarms
export {
  AlarmManager,
  generateAlarmId,
  calculateNextRecurringAlarm,
} from './alarms';
export type {
  Alarm,
  AlarmHandleResult,
  AlarmScheduleOptions,
  AlarmType,
  ScheduleAlarmOptions,
} from './alarms';

// Scheduler
export {
  createAlarmScheduler,
  handleXStateAlarm,
  restoreScheduledEvents,
  getScheduledEvents,
  NOOP_CLOCK,
} from './durable-object-system';
export type {
  Clock,
  ScheduledEventSnapshot,
  XStateAlarmData,
} from './durable-object-system';
```

### Types

```typescript
// Alarm types
type AlarmType = "xstate-delay" | "cache-cleanup" | "custom";

interface AlarmScheduleOptions {
  id: string;
  type: AlarmType;
  scheduledAt: number;
  repeatInterval?: number;  // For recurring alarms
  payload: Record<string, unknown>;
}

interface Alarm {
  id: string;
  type: AlarmType;
  scheduledAt: number;
  repeatInterval?: number;
  payload: Record<string, unknown>;
  createdAt: number;
}

// XState alarm data
interface XStateAlarmData {
  type: "xstate-delay";
  sourceSessionId: string;
  targetSessionId: string;
  event: AnyEventObject;
  scheduledEventId: string;
  alarmId: string;
  [key: string]: unknown;
}

// Scheduler
interface Scheduler {
  schedule(
    source: AnyActorRef,
    target: AnyActorRef,
    event: AnyEventObject,
    delay: number,
    id?: string
  ): void;
  cancel(source: AnyActorRef, id: string): void;
  cancelAll(actorRef: AnyActorRef): void;
}
```

## Example: Custom Alarms

```typescript
class MyMachineServer extends MachineServerImpl {
  async scheduleWelcomeReminder(userId: string) {
    if (!this.alarmManager) return;

    await this.alarmManager.schedule({
      id: `welcome-${userId}`,
      type: "custom",
      scheduledAt: Date.now() + 86400000,  // 24 hours
      payload: {
        userId,
        message: "Welcome! Check out our features.",
      },
    });
  }

  async alarm(): Promise<void> {
    await super.alarm();

    // Handle custom alarms
    if (!this.alarmManager) return;

    const customAlarms = (await this.alarmManager.getPendingAlarms())
      .filter(a => a.type === "custom");

    for (const alarm of customAlarms) {
      const payload = alarm.payload as { userId: string; message: string };
      await this.sendWelcomeEmail(payload.userId, payload.message);
      await this.alarmManager.deleteAlarm(alarm.id);
    }

    await this.alarmManager.rescheduleNextAlarm();
  }
}
```

## Future Enhancements

- [ ] Distributed alarm system across multiple DOs
- [ ] Alarm prioritization
- [ ] Dead letter queue for failed alarms
- [ ] Metrics and monitoring for alarm performance
- [ ] Webhook notifications for alarm events
