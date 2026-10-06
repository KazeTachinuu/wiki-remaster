// "Update available": Tampermonkey updates the script by itself (about once a day), so this
// only says sooner that a newer version exists and opens its install page, where Tampermonkey
// offers "Update". Read from the script's header alone (.meta.js, a few KB), at most every 6 h.
// Only for the Tampermonkey install: the store extensions update through their stores.
import { load, save } from "./cache.js";

const CHECK_EVERY = 6 * 3600e3;

/** True when version `a` is newer than `b` ("0.12.10" > "0.12.9"). */
export function isNewer(a, b) {
  const pa = String(a).split(".").map(Number), pb = String(b).split(".").map(Number);
  for (let i = 0; i < Math.max(pa.length, pb.length); i++) {
    const d = (pa[i] || 0) - (pb[i] || 0);
    if (d) return d > 0;
  }
  return false;
}

/** The @version of a userscript header, or null. */
export const headerVersion = (text) => /^\/\/\s*@version\s+(\S+)/m.exec(text)?.[1] ?? null;

/** Running as a Tampermonkey (or other manager) userscript, which can install an update. */
export const isUserscript = () => typeof GM_info !== "undefined" && !!GM_info?.script;

/**
 * The newer version published, or null (none, not a userscript, or the check failed: never an
 * error shown for a nudge). `current` is the running version.
 */
export async function availableUpdate(current, { metaUrl, fetch: get = fetch } = {}) {
  if (!metaUrl) return null;
  let latest = load("update.latest", CHECK_EVERY);
  if (!latest) {
    try {
      const r = await get(metaUrl, { cache: "no-store" });
      latest = r.ok ? headerVersion(await r.text()) : null;
    } catch {}
    if (latest) save("update.latest", latest);
  }
  return latest && isNewer(latest, current) ? latest : null;
}
