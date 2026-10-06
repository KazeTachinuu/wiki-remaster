<script>
  // The one global loading indicator, fed by every non-quiet request (wm/api.js `activity`).
  // A glowing bar at the top after 150 ms (fast requests never flicker), then a caption that
  // says what is happening after 1 s, how long it has taken after 3 s, and whether the game's
  // server is slow (6 s) or being retried.
  import { activity } from "../wm/index.js";

  const BAR_AFTER = 150, CAPTION_AFTER = 1000, COUNT_AFTER = 3000, SLOW_AFTER = 6000;

  let snap = $state(null);
  let now = $state(Date.now());
  let last = $state(null); // keeps the caption text during the fade-out
  $effect(() => activity.subscribe((s) => { snap = s; if (s) last = s; }));
  $effect(() => {
    if (!snap) return;
    const t = setInterval(() => (now = Date.now()), 250);
    return () => clearInterval(t);
  });

  const elapsed = $derived(snap ? now - snap.since : 0);
  const showBar = $derived(!!snap && elapsed >= BAR_AFTER);
  const showCaption = $derived(!!snap && elapsed >= CAPTION_AFTER);
  const text = $derived.by(() => {
    const s = snap || last;
    if (!s) return "";
    if (s.retry) return `${s.label}, nouvelle tentative ${s.retry.attempt}/${s.retry.max}`;
    if (elapsed >= SLOW_AFTER) return `${s.label}, le serveur du jeu est lent`;
    return `${s.label}...`;
  });
</script>

<div class="loadbar" class:on={showBar} aria-hidden="true"></div>
<div class="loadcap" class:on={showCaption} class:slow={snap?.retry || elapsed >= SLOW_AFTER} role="status" aria-live="polite">
  <span class="spin"></span>
  <span class="loadcap-txt">{text}</span>
  {#if elapsed >= COUNT_AFTER}<span class="loadcap-t">{Math.floor(elapsed / 1000)} s</span>{/if}
</div>
