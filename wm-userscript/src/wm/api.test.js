import { describe, it, expect, beforeEach, afterEach } from "bun:test";
import { api, retry, health } from "./api.js";

// A scripted fetch: each call takes the next step (a status, or "network" to throw).
let calls;
function script(...steps) {
  calls = [];
  globalThis.fetch = async (url, init) => {
    calls.push({ url, method: init?.method || "GET" });
    const s = steps[Math.min(calls.length - 1, steps.length - 1)];
    if (s === "network") throw new TypeError("NetworkError when attempting to fetch resource.");
    const [status, body = {}, headers = {}] = Array.isArray(s) ? s : [s];
    return new Response(JSON.stringify(body), { status, headers });
  };
}

const saved = { delays: retry.delays, readTimeout: retry.readTimeout };
beforeEach(() => { retry.delays = [0, 0, 0]; health.reset(); });
afterEach(() => { Object.assign(retry, saved); });

describe("api reads", () => {
  it("retries a server error and returns the recovered response", async () => {
    script(525, 500, [200, { ok: 1 }]);
    expect(await api("/api/x")).toEqual({ ok: 1 });
    expect(calls.length).toBe(3);
  });
  it("retries a dropped connection", async () => {
    script("network", [200, { ok: 1 }]);
    expect(await api("/api/x")).toEqual({ ok: 1 });
  });
  it("never retries a 429 (the game reads bursts as automation)", async () => {
    script([429, { error: "Trop de requêtes automatisées." }], [200, { ok: 1 }]);
    const e = await api("/api/x").catch((e) => e);
    expect(calls.length).toBe(1);
    expect(e.code).toBe("rate_limited");
    expect(e.message).toBe("Trop de requêtes automatisées.");
  });
  it("gives up after the retries with a readable message", async () => {
    script(525);
    const e = await api("/api/x").catch((e) => e);
    expect(calls.length).toBe(1 + retry.delays.length);
    expect(e.status).toBe(525);
    expect(e.message).toMatch(/serveur du jeu/i);
  });
  it("does not retry a client error (4xx other than 429)", async () => {
    script([409, { error: "Plus de paquets disponibles.", code: "x" }]);
    const e = await api("/api/x").catch((e) => e);
    expect(calls.length).toBe(1);
    expect(e.message).toBe("Plus de paquets disponibles.");
    expect(e.code).toBe("x");
  });
  it("times out a hanging read and retries it", async () => {
    retry.readTimeout = 20;
    let n = 0;
    globalThis.fetch = (url, init) => (++n === 1
      ? new Promise((_, reject) => init.signal.addEventListener("abort", () => reject(new DOMException("aborted", "AbortError"))))
      : Promise.resolve(new Response(JSON.stringify({ ok: 1 }), { status: 200 })));
    expect(await api("/api/x")).toEqual({ ok: 1 });
    expect(n).toBe(2);
  });
});

describe("api writes", () => {
  it("never re-sends a write, and flags the outcome as uncertain on a server error", async () => {
    script(500);
    const e = await api("/api/trades/1", { method: "PATCH", body: { action: "accept" } }).catch((e) => e);
    expect(calls.length).toBe(1);
    expect(e.uncertain).toBe(true);
    expect(e.message).toMatch(/vérifiez/i);
  });
  it("a refused write (4xx) is not uncertain", async () => {
    script([409, { error: "Enchère impossible." }]);
    const e = await api("/api/x", { method: "POST", body: {} }).catch((e) => e);
    expect(e.uncertain).toBeFalsy();
  });
});

describe("health", () => {
  it("is unstable after a failure and recovers on the next success", async () => {
    script(525, [200, {}]);
    const seen = [];
    const off = health.subscribe((s) => seen.push(s));
    await api("/api/x");
    off();
    expect(seen).toContain("unstable");
    expect(health.state).toBe("ok");
  });
});

describe("api headers", () => {
  it("merges extra headers into the request", async () => {
    let seen;
    globalThis.fetch = async (url, init) => { seen = init.headers; return new Response("{}", { status: 200 }); };
    await api("/api/trades/1", { method: "PATCH", body: { action: "accept" }, headers: { "x-wiki-calendar-tz": "Europe/Paris" } });
    expect(seen["x-wiki-calendar-tz"]).toBe("Europe/Paris");
    expect(seen["content-type"]).toBe("application/json");
  });
});
