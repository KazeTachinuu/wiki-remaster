/**
 * Low-level HTTP client and live-session capture.
 *
 * Two jobs, both environment-level (no domain logic, that lives in the adapters):
 *   1. `json` / `postJson`: same-origin fetch against /api/* with the real session cookie.
 *   2. Capture: on wiki-masters.com the app talks to Supabase directly for the profile.
 *      We monkey-patch fetch at document-start to read those calls (packs, currency, is_pro)
 *      so our overlay shows a live profile on every route, not just /pulls where the app syncs.
 *
 * The captured profile and epoch counter live here because both the capture hook and the
 * real adapter's openPack mutate them; keeping the state in one module avoids a circular
 * import between api.js and adapters/real.js.
 */

const isReal = /(^|\.)wiki-masters\.com$/.test(location.hostname);

// --- HTTP -----------------------------------------------------------------------

/** GET/POST JSON against a path, sending the session cookie. Throws on non-2xx. */
export const json = (p, opts) =>
  fetch(p, { credentials: "include", ...opts }).then((r) => {
    if (!r.ok) throw new Error(p + " -> " + r.status);
    return r.json();
  });

/** POST a JSON body and parse the JSON response. */
export const postJson = (p, body) =>
  json(p, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(body) });

// --- Captured session state -----------------------------------------------------

let capturedProfile = null;
let localEpoch = 0; // bumped on each local pack-open so a stale in-flight sync cannot clobber it
let origFetch = null; // the real fetch, kept so we can call Supabase ourselves
let syncReq = null; // { url, init } of the app's sync_profile_packs call, if we saw it
// Captured from the app's Supabase calls so we can fetch the profile on any route
// (the app only calls sync_profile_packs on /pulls, so /collection would otherwise show "-").
let sbBase = null; // e.g. https://xxxx.supabase.co
let sbHeaders = null; // { apikey, authorization, ... }
let sbUserId = null;

/** The last captured profile payload, or null before the app has synced. */
export const getProfile = () => capturedProfile;

/** Merge a patch into the captured profile and notify the UI to re-read it. */
export function patchProfile(patch) {
  capturedProfile = { ...(capturedProfile || {}), ...patch };
  window.dispatchEvent(new Event("wm:profile"));
  return capturedProfile;
}

/** Invalidate any profile sync already in flight (call right after a local pack-open). */
export const bumpEpoch = () => { localEpoch++; };

/** Our own user id, captured from the app's Supabase calls (to tell if we are top bidder). */
export const getUserId = () => sbUserId;

// --- Capture --------------------------------------------------------------------

function headerVal(init, name) {
  const h = init && init.headers;
  if (!h) return null;
  if (typeof h.get === "function") return h.get(name);
  if (Array.isArray(h)) { const f = h.find(([k]) => String(k).toLowerCase() === name); return f ? f[1] : null; }
  for (const k in h) if (String(k).toLowerCase() === name) return h[k];
  return null;
}

/**
 * Fetch the live profile ourselves via Supabase, using credentials captured from the app.
 * Works on every route, so packs/currency never stay stuck on "-".
 */
export async function refreshProfile() {
  if (!origFetch) return null;
  try {
    let res;
    if (sbBase && sbHeaders && sbUserId) {
      res = await origFetch.call(window, `${sbBase}/rest/v1/rpc/sync_profile_packs`, {
        method: "POST",
        headers: { ...sbHeaders, "content-type": "application/json" },
        body: JSON.stringify({ user_id: sbUserId }),
      });
    } else if (syncReq) {
      res = await origFetch.call(window, syncReq.url, syncReq.init);
    } else {
      return null;
    }
    const j = await res.json();
    if (j && typeof j === "object") return patchProfile(j);
  } catch {}
  return null;
}

/** Patch window.fetch (document-start) to capture the app's own Supabase profile calls. */
export function initCapture() {
  if (!isReal || typeof window === "undefined") return;
  const orig = window.fetch;
  origFetch = orig;
  window.fetch = function (...args) {
    const ret = orig.apply(window, args);
    try {
      const url = typeof args[0] === "string" ? args[0] : args[0] && args[0].url;
      // Capture Supabase base + auth headers + our user id from any /rest/v1 call, so we
      // can fetch the profile ourselves on routes where the app never syncs.
      if (url && url.includes(".supabase.co/rest/v1/") && args[1]) {
        try {
          if (!sbBase) sbBase = new URL(url).origin;
          const apikey = headerVal(args[1], "apikey");
          const auth = headerVal(args[1], "authorization");
          if (apikey && auth) sbHeaders = { apikey, authorization: auth };
          const m = url.match(/(?:^|[?&])(?:id|user_id)=eq\.([0-9a-f-]{36})/i);
          if (m) sbUserId = m[1];
        } catch {}
      }
      if (url && url.includes("/rpc/sync_profile_packs")) {
        // Remember the request so we can replay it on demand.
        if (typeof args[0] === "string" && args[1]) syncReq = { url: args[0], init: args[1] };
        const issuedEpoch = localEpoch;
        ret
          .then((res) =>
            res.clone().json().then((j) => {
              // Ignore a sync that was already in flight when we opened a pack:
              // its data predates our local decrement and would roll it back.
              if (localEpoch !== issuedEpoch) return;
              patchProfile(j);
            }).catch(() => {})
          )
          .catch(() => {});
      }
      // The app fetches is_pro from Supabase directly; capture it for the profile header.
      if (url && url.includes("/rest/v1/profiles")) {
        ret
          .then((res) =>
            res.clone().json().then((j) => {
              const row = Array.isArray(j) ? j[0] : j;
              if (row && typeof row.is_pro !== "undefined") patchProfile({ is_pro: row.is_pro });
            }).catch(() => {})
          )
          .catch(() => {});
      }
    } catch {}
    return ret;
  };
}
