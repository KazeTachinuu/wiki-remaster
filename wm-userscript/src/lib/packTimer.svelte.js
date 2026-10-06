// The next free pack, counted down every second from the profile (the adapter computes it from
// the game's regen period). Shared by the packs page and the top bar's pack chip. At zero the pack
// is ready on the server: like the game's own page, it stops at "prêt" and asks the game for the
// real count once (onready, at most every SYNC_GAP_MS for every user of it together), instead of
// counting below zero.
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
