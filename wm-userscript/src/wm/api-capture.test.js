import { describe, it, expect, beforeAll } from "bun:test";
import { initCapture, sessionReady, getUserId, supabase, refreshProfile, getProfile, patchProfile, bumpEpoch, retry, health } from "./api.js";

// The game's page, faked: its own requests to its database carry the session the remaster learns.
// One session per file (the capture keeps it, as on the page).
const USER = "356c0ccb-2633-492c-95ad-983bc6b284a5";
const b64url = (o) => btoa(JSON.stringify(o)).replace(/=+$/, "").replace(/\+/g, "-").replace(/\//g, "_");
const TOKEN = `Bearer ${b64url({ alg: "HS256" })}.${b64url({ sub: USER })}.sig`;
const BASE = "https://abc.supabase.co";
const calls = [];
let answer = () => new Response("[]", { status: 200 });
const page = {
  fetch: async (url, init) => { calls.push({ url: String(url), method: init?.method ?? "GET", headers: init?.headers, body: init?.body, signal: init?.signal }); return answer(String(url), init); },
  events: [],
  dispatchEvent(e) { this.events.push(e.type); },
};

beforeAll(() => {
  const m = new Map();
  globalThis.localStorage = { getItem: (k) => m.get(k) ?? null, setItem: (k, v) => m.set(k, String(v)), removeItem: (k) => m.delete(k), get length() { return m.size; }, key: (i) => [...m.keys()][i] ?? null };
  globalThis.window = page;
  initCapture(page);
});

describe("before the game's first request", () => {
  it("knows no session, waits for one a while, and refuses a database read without one", async () => {
    expect(getUserId()).toBe(null);
    expect(await sessionReady(5)).toBe(false);
    expect(await refreshProfile()).toBe(null);
  });
});

describe("the game's own requests", () => {
  it("are passed through untouched, and teach the session from a database call", async () => {
    const waiting = sessionReady(5000);
    const r = await page.fetch(`${BASE}/rest/v1/profiles?id=eq.x`, { headers: { apikey: "anon", authorization: TOKEN } });
    expect(r.status).toBe(200);
    expect(await waiting).toBe(true);
    expect(getUserId()).toBe(USER);
    expect(await sessionReady(5)).toBe(true);
  });
  it("ignore another site's calls", async () => {
    await page.fetch("https://evil.example/rest/v1/profiles", { headers: { apikey: "k", authorization: `Bearer ${b64url({})}.${b64url({ sub: "00000000-0000-0000-0000-000000000000" })}.s` } });
    expect(getUserId()).toBe(USER);
  });
  it("read my Pro status from my own profile row, never another player's", async () => {
    answer = () => new Response(JSON.stringify([{ id: "someone-else", is_pro: true }, { id: USER, is_pro: false }]), { status: 200 });
    await page.fetch(`${BASE}/rest/v1/profiles?select=*`, { headers: { apikey: "anon", authorization: TOKEN } });
    await new Promise((r) => setTimeout(r, 5));
    expect(getProfile().is_pro).toBe(false);
  });
  it("take the packs from the game's own sync, unless a newer opening happened meanwhile", async () => {
    answer = () => new Response(JSON.stringify({ packs_remaining: 7 }), { status: 200 });
    await page.fetch(`${BASE}/rest/v1/rpc/sync_profile_packs`, { method: "POST", headers: { apikey: "anon", authorization: TOKEN } });
    await new Promise((r) => setTimeout(r, 5));
    expect(getProfile().packs_remaining).toBe(7);
    answer = () => new Response(JSON.stringify({ packs_remaining: 9 }), { status: 200 });
    const late = page.fetch(`${BASE}/rest/v1/rpc/sync_profile_packs`, { method: "POST", headers: { apikey: "anon", authorization: TOKEN } });
    bumpEpoch(); // a pack opened while the sync was on its way
    await late; await new Promise((r) => setTimeout(r, 5));
    expect(getProfile().packs_remaining).toBe(7);
  });
});

describe("the remaster's own database reads and writes", () => {
  it("reads with the captured credentials, to the same origin, and says the server is fine", async () => {
    calls.length = 0;
    answer = () => new Response(JSON.stringify([{ id: 1 }]), { status: 200 });
    health.set("unstable");
    expect(await supabase("tags?select=*")).toEqual([{ id: 1 }]);
    const c = calls.at(-1);
    expect([c.url, c.method, c.headers.apikey, c.headers.authorization, c.headers.prefer, c.body]).toEqual([`${BASE}/rest/v1/tags?select=*`, "GET", "anon", TOKEN, "", undefined]);
    expect(health.state).toBe("ok");
  });
  it("writes ask for the written row back", async () => {
    await supabase("tags", { method: "POST", body: { name: "x" } });
    const c = calls.at(-1);
    expect([c.method, c.headers.prefer, c.body]).toEqual(["POST", "return=representation", '{"name":"x"}']);
  });
  it("a refusal keeps the database's code; a server error on a write is uncertain", async () => {
    answer = () => new Response(JSON.stringify({ message: "duplicate key", code: "23505" }), { status: 409 });
    const e = await supabase("tags", { method: "POST", body: {} }).catch((x) => x);
    expect([e.message, e.status, e.code, e.uncertain]).toEqual(["duplicate key", 409, "23505", false]);
    answer = () => new Response("oops", { status: 502 });
    const f = await supabase("tags", { method: "POST", body: {} }).catch((x) => x);
    expect([f.message, f.uncertain]).toEqual(["Enregistrement impossible pour le moment.", true]);
    expect(health.state).toBe("unstable");
  });
  it("a database that hangs is given up on, said so, and marks the server unstable", async () => {
    const saved = retry.readTimeout;
    retry.readTimeout = 20;
    health.set("ok");
    answer = (_, init) => new Promise((_, reject) => init.signal.addEventListener("abort", () => reject(new DOMException("aborted", "AbortError"))));
    const e = await supabase("achievements?select=*").catch((x) => x);
    retry.readTimeout = saved;
    expect([e.message, e.status, e.uncertain]).toEqual(["Le serveur du jeu ne répond pas pour le moment. Réessayez dans un instant.", 0, false]);
    expect(health.state).toBe("unstable");
  });
  it("replays the game's pack sync for my packs, and keeps the last good profile on an error", async () => {
    answer = () => new Response(JSON.stringify({ packs_remaining: 3 }), { status: 200 });
    expect((await refreshProfile()).packs_remaining).toBe(3);
    expect(JSON.parse(calls.at(-1).body)).toEqual({ user_id: USER });
    answer = () => new Response("<html>525</html>", { status: 525 });
    expect((await refreshProfile()).packs_remaining).toBe(3);
    expect(health.state).toBe("unstable");
  });
  it("tells the app when the profile changes", () => {
    page.events.length = 0;
    expect(patchProfile({ currency: 5 }).currency).toBe(5);
    expect(page.events).toEqual(["wm:profile"]);
  });
});
