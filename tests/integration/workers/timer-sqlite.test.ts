/**
 * Integration tests for the SQLite storage layer — event log, SQLite snapshot
 * persistence, and the hibernation-safe alarm scheduler.
 *
 * Runs inside the Workers runtime via @cloudflare/vitest-pool-workers, so the
 * Timer DO uses *real* Durable Object SQLite storage and a *real* DO alarm —
 * the things programmatic Miniflare can't faithfully exercise. We drive the DO
 * over RPC and fire its alarm deterministically with `runDurableObjectAlarm`.
 */
import { env, runDurableObjectAlarm } from "cloudflare:test";
import { describe, expect, it } from "vitest";
import type { ActorServerMethods, AnyActorKitStateMachine } from "@actor-kit/types";
import type { TimerMachine } from "./src/index";

/** RPC inspection methods our Timer subclass adds on top of the actor server. */
type TimerStub = ActorServerMethods<TimerMachine> & {
  getEventCount(): Promise<number>;
  hasPersistedSnapshot(): Promise<boolean>;
  pendingXStateAlarms(): Promise<number>;
};

function getTimerStub(
  namespace: { getByName(name: string): unknown },
  name: string
): TimerStub {
  return namespace.getByName(name) as TimerStub;
}

const TIMER = (env as unknown as { TIMER: { getByName(name: string): unknown } })
  .TIMER;

const client = { id: "test-user", type: "client" as const };

function spawn(stub: TimerStub, actorId: string) {
  stub.spawn({ actorType: "timer", actorId, caller: client, input: {} });
}

describe("SQLite storage layer (Workers pool)", () => {
  it("records client events to the SQLite event log", async () => {
    const stub = getTimerStub(TIMER, "log-1");
    spawn(stub, "log-1");

    stub.send({ type: "INCREMENT" });
    stub.send({ type: "INCREMENT" });
    stub.send({ type: "INCREMENT" });

    const snap = await stub.getSnapshot(client);
    expect(snap.snapshot.public.count).toBe(3);

    // Each client send is one logged event row.
    expect(await stub.getEventCount()).toBe(3);
  });

  it("persists snapshots to SQLite", async () => {
    const stub = getTimerStub(TIMER, "snap-1");
    spawn(stub, "snap-1");

    stub.send({ type: "INCREMENT" });
    await stub.getSnapshot(client); // settle

    // `persisted: true` writes snapshots to SQLite (not KV).
    expect(await stub.hasPersistedSnapshot()).toBe(true);
  });

  it("schedules an XState `after` delay as a persisted DO alarm, and fires it", async () => {
    const stub = getTimerStub(TIMER, "timer-1");
    spawn(stub, "timer-1");

    // Enter the timed state — the scheduler must persist the delay as a SQLite
    // alarm row (not an in-memory setTimeout), which is what survives hibernation.
    stub.send({ type: "START_TIMER" });

    let snap = await stub.getSnapshot(client);
    expect(snap.snapshot.value).toBe("ticking");
    // The delay is persisted as a SQLite alarm row — this is the claim that it
    // survives hibernation (vs. an in-memory setTimeout that would be lost).
    expect(await stub.pendingXStateAlarms()).toBe(1);

    // Let the delay elapse, then ensure the DO alarm has fired. The runtime may
    // auto-fire it; `runDurableObjectAlarm` is a deterministic backstop (a no-op
    // if it already ran). Either path delivers the delayed event via the alarm
    // handler, not a timer.
    await new Promise((r) => setTimeout(r, 120));
    await runDurableObjectAlarm(TIMER.getByName("timer-1") as never);

    snap = await stub.getSnapshot(client);
    expect(snap.snapshot.value).toBe("rang");
    expect(snap.snapshot.public.rang).toBe(true);
    expect(await stub.pendingXStateAlarms()).toBe(0);
  });
});

// Keep the type import honest across pool typegen drift.
type _Assert = AnyActorKitStateMachine;
