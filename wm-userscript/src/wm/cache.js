// localStorage-backed cache. Every access is guarded: storage can be full, blocked, or cleared.
// Bump the version whenever a cached shape changes: old entries are then simply never read.
const ROOT = "wm-cache:";
const PREFIX = ROOT + "v3:";
// Nothing is kept longer than this, whatever its own TTL.
const MAX_AGE = 7 * 86400e3;

/**
 * Remove what can no longer be read: entries of another version, and entries past MAX_AGE. The
 * browser keeps ~5 MB for the whole site, the game's own data included. Run once at startup.
 */
export function sweep() {
  try {
    const keys = Array.from({ length: localStorage.length }, (_, i) => localStorage.key(i));
    for (const k of keys) {
      if (!k.startsWith(ROOT)) continue;
      let t = 0;
      try { t = JSON.parse(localStorage.getItem(k))?.t ?? 0; } catch {}
      if (!k.startsWith(PREFIX) || Date.now() - t > MAX_AGE) localStorage.removeItem(k);
    }
  } catch {}
}

/** The saved value if younger than maxAgeMs, else null. */
export function load(key, maxAgeMs) {
  try {
    const e = JSON.parse(localStorage.getItem(PREFIX + key));
    if (e && Date.now() - e.t < maxAgeMs) return e.v;
  } catch {}
  return null;
}

export function save(key, v) {
  try { localStorage.setItem(PREFIX + key, JSON.stringify({ t: Date.now(), v })); } catch {}
}

export function drop(key) {
  try { localStorage.removeItem(PREFIX + key); } catch {}
}
