/**
 * HTTP client and live-session capture.
 *
 * `/api/*` routes are same-origin and cookie-authenticated, so we call them directly.
 * The profile (packs, is_pro) lives in Supabase and needs the app's bearer token, so we
 * patch fetch at document-start, read the app's own Supabase calls, and keep their
 * credentials to replay `sync_profile_packs` ourselves on any route.
 */

import { load, save } from "./cache.js";

const isReal = /(^|\.)wiki-masters\.com$/.test(globalThis.location?.hostname ?? "");

// --- Resilience --------------------------------------------------------------------
// The game's backend fails intermittently (Cloudflare 525 to its database, 5xx, hangs).
// Reads retry with growing waits; writes are never re-sent (that could apply them twice):
// a write that fails server-side is flagged `uncertain` so the UI re-reads the real state.

/** Retry policy (tests shorten it). */
export const retry = { delays: [500, 1500, 4000], readTimeout: 15000, writeTimeout: 30000 };

/** Connection health: "ok" or "unstable" (a request failed server-side; cleared by the next success). */
export const health = {
  state: "ok",
  subs: new Set(),
  set(s) { if (s !== this.state) { this.state = s; for (const f of this.subs) f(s); } },
  subscribe(f) { this.subs.add(f); return () => this.subs.delete(f); },
  reset() { this.state = "ok"; },
};

/**
 * What is loading right now, for the global loading bar: every non-quiet request registers here
 * with a human label; retries update it. Background requests (polls, values) pass `quiet`.
 */
const LABELS = [
  [/^\/api\/packs\/open/, "Ouverture du paquet"],
  [/^\/api\/my-collection/, "Chargement de votre collection"],
  [/^\/api\/cards/, "Chargement des cartes"],
  [/^\/api\/marketplace\/[^/]+\/bid/, "Envoi de votre enchère"],
  [/^\/api\/marketplace/, "Chargement du marché"],
  [/^\/api\/trades/, "Chargement des échanges"],
  [/^\/api\/friends/, "Chargement de vos amis"],
  [/^\/api\/profile\//, "Chargement de sa collection"],
  [/^\/api\/chat/, "Chargement de la conversation"],
];
const labelFor = (path, read) => (read ? LABELS.find(([re]) => re.test(path))?.[1] ?? "Chargement" : path.startsWith("/api/packs/open") ? "Ouverture du paquet" : "Envoi en cours");

export const activity = {
  items: new Map(), // id -> { label, attempt, max, since }
  subs: new Set(),
  seq: 0,
  snapshot() {
    const all = [...this.items.values()];
    if (!all.length) return null;
    const last = all[all.length - 1];
    const retrying = all.find((x) => x.attempt > 1);
    return { count: all.length, label: last.label, since: Math.min(...all.map((x) => x.since)), retry: retrying && { attempt: retrying.attempt, max: retrying.max } };
  },
  emit() { const s = this.snapshot(); for (const f of this.subs) f(s); },
  subscribe(f) { this.subs.add(f); f(this.snapshot()); return () => this.subs.delete(f); },
  start(label, max) { const id = ++this.seq; this.items.set(id, { label, attempt: 1, max, since: Date.now() }); this.emit(); return id; },
  retrying(id, attempt) { const x = this.items.get(id); if (x) { x.attempt = attempt; this.emit(); } },
  end(id) { this.items.delete(id); this.emit(); },
};

// 429 is not retried: the game reads bursts as automation ("Trop de requêtes automatisées"),
// and hammering it again could get the account flagged. Callers back off instead.
const retryable = (status) => status === 0 || status >= 500;
/** The game refused because of request volume (status 429 or its anti-automation message). */
export const isRateLimited = (e) => e?.status === 429 || e?.code === "rate_limited" || /trop de requ[eê]tes/i.test(e?.message || "");
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
// "Retry-After: 3" (seconds) when the server says when to come back
const retryAfter = (r) => { const s = Number(r?.headers?.get?.("retry-after")); return s > 0 ? Math.min(s, 10) * 1000 : null; };

/** One request with a timeout. Resolves to the Response, or null on a network error / timeout. */
async function attempt(path, init, timeout) {
  const ctl = new AbortController();
  const t = setTimeout(() => ctl.abort(), timeout);
  try { return await fetch(path, { ...init, signal: ctl.signal }); }
  catch { return null; }
  finally { clearTimeout(t); }
}

/**
 * JSON request with the session cookie. On non-2xx, throws an Error carrying a readable message
 * plus `status`, `code`, `min`, the raw body as `data`, and `uncertain` for writes whose outcome
 * is unknown (server error or no answer).
 */
export async function api(path, { method = "GET", body, quiet = false, label, headers } = {}) {
  const read = method === "GET";
  const init = { method, credentials: "include", headers: { ...(body && { "content-type": "application/json" }), ...headers }, body: body && JSON.stringify(body) };
  const tracked = quiet ? null : activity.start(label || labelFor(path, read), read ? retry.delays.length + 1 : 1);
  try {
    for (let i = 0; ; i++) {
      const r = await attempt(path, init, read ? retry.readTimeout : retry.writeTimeout);
      const status = r?.status ?? 0;
      if (retryable(status)) {
        health.set("unstable");
        if (read && i < retry.delays.length) {
          if (tracked) activity.retrying(tracked, i + 2);
          await sleep(retryAfter(r) ?? retry.delays[i]);
          continue;
        }
      } else health.set("ok");
      const d = r ? await r.json().catch(() => ({})) : {};
      if (r?.ok) return d;
      throw Object.assign(new Error(errorMessage(d, status, read)), {
        status, code: d.code ?? (status === 429 ? "rate_limited" : undefined), min: d.min, data: d, uncertain: !read && retryable(status),
      });
    }
  } finally {
    if (tracked) activity.end(tracked);
  }
}

function errorMessage(d, status, read) {
  // Upstream outages come back as an HTML page inside `error`: never show that to the user.
  const server = typeof d.error === "string" && !d.error.trimStart().startsWith("<") ? d.error : null;
  if (status === 429) return server || "Trop de requêtes, réessayez dans un instant.";
  if (status && !retryable(status)) return server || `Erreur (${status}), réessayez.`;
  return read
    ? "Le serveur du jeu ne répond pas pour le moment. Réessayez dans un instant."
    : "Le serveur du jeu n'a pas répondu à temps : vérifiez le résultat avant de réessayer.";
}

// --- Captured session ------------------------------------------------------------

// last good profile, so packs and coins show at once (and survive a backend hiccup)
let profile = load("profile", 3600e3);
let epoch = 0; // bumped on each local pack-open so an older in-flight sync cannot roll it back
let origFetch = null;
let sb = null; // { base, headers, userId } from the app's Supabase traffic

export const getProfile = () => profile;
export const getUserId = () => sb?.userId ?? null;
export const bumpEpoch = () => { epoch++; };

/** Merge into the captured profile and tell the UI to re-read it. */
export function patchProfile(patch) {
  profile = { ...profile, ...patch };
  save("profile", profile);
  window.dispatchEvent(new Event("wm:profile"));
  return profile;
}

/** Replay the app's `sync_profile_packs` with its captured credentials. */
export async function refreshProfile() {
  if (!sb?.headers || !sb.userId) return null;
  try {
    const r = await origFetch.call(window, `${sb.base}/rest/v1/rpc/sync_profile_packs`, {
      method: "POST",
      headers: { ...sb.headers, "content-type": "application/json" },
      body: JSON.stringify({ user_id: sb.userId }),
    });
    // an error page (525) or an error body must never overwrite the last good profile
    if (!r.ok) { health.set("unstable"); return profile; }
    health.set("ok");
    return patchProfile(await r.json());
  } catch {
    return null;
  }
}

function header(init, name) {
  const h = init?.headers;
  if (!h) return null;
  if (typeof h.get === "function") return h.get(name);
  const entries = Array.isArray(h) ? h : Object.entries(h);
  return entries.find(([k]) => k.toLowerCase() === name)?.[1] ?? null;
}

// Read a response body without consuming the app's copy.
const peek = (ret, fn) => ret.then((res) => res.clone().json()).then(fn).catch(() => {});

/** Patch window.fetch (document-start) to capture the app's Supabase profile calls. */
export function initCapture() {
  if (!isReal) return;
  origFetch = window.fetch;
  window.fetch = function (...args) {
    const ret = origFetch.apply(window, args);
    const url = typeof args[0] === "string" ? args[0] : args[0]?.url;
    if (!url?.includes(".supabase.co/rest/v1/")) return ret;

    const apikey = header(args[1], "apikey");
    const authorization = header(args[1], "authorization");
    const userId = url.match(/[?&](?:id|user_id)=eq\.([0-9a-f-]{36})/i)?.[1];
    sb = {
      base: new URL(url).origin,
      headers: apikey && authorization ? { apikey, authorization } : sb?.headers,
      userId: userId || sb?.userId,
    };

    if (url.includes("/rpc/sync_profile_packs")) {
      const issued = epoch;
      ret.then((res) => res.ok && peek(Promise.resolve(res), (j) => { if (epoch === issued) patchProfile(j); }), () => {});
    } else if (url.includes("/rest/v1/profiles")) {
      peek(ret, (j) => {
        const row = Array.isArray(j) ? j[0] : j;
        if (row?.is_pro !== undefined) patchProfile({ is_pro: row.is_pro });
      });
    }
    return ret;
  };
}
