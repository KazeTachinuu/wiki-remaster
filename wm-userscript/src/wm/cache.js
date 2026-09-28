// localStorage-backed cache. Every access is guarded: storage can be full, blocked, or cleared.
// Bump the version whenever a cached shape changes: old entries are then simply never read.
const PREFIX = "wm-cache:v2:";

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
