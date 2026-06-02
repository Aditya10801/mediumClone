import {
	env,
	createExecutionContext,
	waitOnExecutionContext,
	SELF,
} from "cloudflare:test";
import { describe, it, expect } from "vitest";
import worker from "../src/index";

// For now, you'll need to do something like this to get a correctly-typed
// `Request` to pass to `worker.fetch()`.
const IncomingRequest = Request<unknown, IncomingRequestCfProperties>;

describe("Backend API", () => {
	it("responds with health check", async () => {
		const request = new IncomingRequest("http://example.com/health");
		// Create an empty context to pass to `worker.fetch()`.
		const ctx = createExecutionContext();
		const response = await worker.fetch(request, env, ctx);
		// Wait for all `Promise`s passed to `ctx.waitUntil()` to settle before running test assertions
		await waitOnExecutionContext(ctx);
		
		expect(response.status).toBe(200);
		const data = await response.json();
		expect(data).toEqual({ status: 'ok' });
	});

	it("routes to user endpoints", async () => {
		const request = new IncomingRequest("http://example.com/api/v1/user");
		const ctx = createExecutionContext();
		const response = await worker.fetch(request, env, ctx);
		await waitOnExecutionContext(ctx);
		
		// Should not be 404, even if it's an error response
		expect(response.status).not.toBe(404);
	});

	it("routes to blog endpoints", async () => {
		const request = new IncomingRequest("http://example.com/api/v1/blog");
		const ctx = createExecutionContext();
		const response = await worker.fetch(request, env, ctx);
		await waitOnExecutionContext(ctx);
		
		// Should not be 404 for routes
		expect(response.status).not.toBe(404);
	});
});
