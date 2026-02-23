import { describe, expect, it, vi } from "vitest";
import { createAccessToken } from "../src/createAccessToken";
import { createActorKitRouter } from "../src/createActorKitRouter";

type RouterEnv = {
	ACTOR_KIT_SECRET: string;
	GAME: {
		idFromName: (id: string) => string;
		get: (id: string) => {
			spawn: (input: unknown) => Promise<void>;
			getSnapshot: (caller: unknown, options: unknown) => Promise<unknown>;
			send: (event: unknown) => void;
			fetch: (request: Request) => Promise<Response>;
		};
	};
};

describe("createActorKitRouter", () => {
	it("parses GET wait options and only spawns an actor once", async () => {
		const spawn = vi.fn(async () => undefined);
		const getSnapshot = vi.fn(async () => ({
			checksum: "abc123",
			snapshot: { value: "ok", public: {}, private: {} },
		}));
		const send = vi.fn();
		const fetch = vi.fn(async () => new Response("ok"));

		const env: RouterEnv = {
			ACTOR_KIT_SECRET: "secret",
			GAME: {
				idFromName: (id) => id,
				get: () => ({ spawn, getSnapshot, send, fetch }),
			},
		};

		const token = await createAccessToken({
			signingKey: env.ACTOR_KIT_SECRET,
			actorId: "game-1",
			actorType: "game",
			callerId: "550e8400-e29b-41d4-a716-446655440000",
			callerType: "client",
		});

		const route = createActorKitRouter<RouterEnv>(["game"]);
		const request = new Request(
			"http://localhost/api/game/game-1?waitForEvent=%7B%22type%22%3A%22tick%22%7D&waitForState=%22ready%22&timeout=5000&errorOnWaitTimeout=true",
			{
				method: "GET",
				headers: { Authorization: `Bearer ${token}` },
			}
		);

		const response1 = await route(request, env, {} as ExecutionContext);
		const response2 = await route(request, env, {} as ExecutionContext);

		expect(response1.status).toBe(200);
		expect(response2.status).toBe(200);
		expect(spawn).toHaveBeenCalledTimes(1);
		expect(getSnapshot).toHaveBeenCalledTimes(2);
		expect(getSnapshot).toHaveBeenCalledWith(
			expect.objectContaining({ id: "550e8400-e29b-41d4-a716-446655440000" }),
			{
				waitForEvent: { type: "tick" },
				waitForState: "ready",
				timeout: 5000,
				errorOnWaitTimeout: true,
			}
		);
		expect(send).not.toHaveBeenCalled();
	});
});
