// Seconds to the next free pack, ticking down from the profile. Used by the packs page and the
// top bar. At zero it calls onready once (shared throttle) so the real count is re-read.
const SYNC_GAP_MS = 30e3;
let lastSync = 0;

/** @param read () => seconds to the next pack, or null when none is coming (the packs are full) */
export function packTimer(read, onready) {
  let secs = $state(null);
  function ready() {
    if (Date.now() - lastSync < SYNC_GAP_MS) return;
    lastSync = Date.now();
    onready?.();
  }
  $effect(() => {
    const n = read();
    secs = n;
    if (n == null) return;
    if (n === 0) { ready(); return; }
    const t = setInterval(() => {
      secs = Math.max(0, secs - 1);
      if (!secs) { clearInterval(t); ready(); }
    }, 1000);
    return () => clearInterval(t);
  });
  return { get secs() { return secs; } };
}
