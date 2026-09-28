/**
 * HTTP client and live-session capture.
 *
 * `/api/*` routes are same-origin and cookie-authenticated, so we call them directly.
 * The profile (packs, is_pro) lives in Supabase and needs the app's bearer token, so we
 * patch fetch at document-start, read the app's own Supabase calls, and keep their
 * credentials to replay `sync_profile_packs` ourselves on any route.
 */

const isReal = /(^|\.)wiki-masters\.com$/.test(location.hostname);

/**
 * JSON request with the session cookie. GETs retry once on a 5xx. On non-2xx, throws an
 * Error carrying the server's message plus `status`, `code`, `min` and the raw body as `data`.
 */
export async function api(path, { method = "GET", body } = {}, retried = false) {
  const r = await fetch(path, {
    method,
    credentials: "include",
    headers: body ? { "content-type": "application/json" } : undefined,
    body: body && JSON.stringify(body),
  });
  // The backend has transient upstream 5xx: a read is safe to repeat once.
  if (r.status >= 500 && method === "GET" && !retried) {
    await new Promise((res) => setTimeout(res, 400));
    return api(path, { method, body }, true);
  }
  const d = await r.json().catch(() => ({}));
  if (!r.ok) {
    // Upstream outages come back as an HTML page inside `error`: never show that to the user.
    const msg = typeof d.error === "string" && !d.error.trimStart().startsWith("<") ? d.error : `Erreur serveur (${r.status}), réessayez.`;
    throw Object.assign(new Error(msg), { status: r.status, code: d.code, min: d.min, data: d });
  }
  return d;
}

// --- Captured session ------------------------------------------------------------

let profile = null;
let epoch = 0; // bumped on each local pack-open so an older in-flight sync cannot roll it back
let origFetch = null;
let sb = null; // { base, headers, userId } from the app's Supabase traffic

export const getProfile = () => profile;
export const getUserId = () => sb?.userId ?? null;
export const bumpEpoch = () => { epoch++; };

/** Merge into the captured profile and tell the UI to re-read it. */
export function patchProfile(patch) {
  profile = { ...profile, ...patch };
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
      peek(ret, (j) => { if (epoch === issued) patchProfile(j); });
    } else if (url.includes("/rest/v1/profiles")) {
      peek(ret, (j) => {
        const row = Array.isArray(j) ? j[0] : j;
        if (row?.is_pro !== undefined) patchProfile({ is_pro: row.is_pro });
      });
    }
    return ret;
  };
}
