// A paced lane for background requests the game might read as automation: at most
// `concurrency` running, starts spaced by `gapMs`, and `pause(ms)` holds every start (used when
// the game answers "Trop de requêtes automatisées"). Subscribers see "running" / "paused".
export function createLane({ concurrency = 2, gapMs = 450 } = {}) {
  const waiting = []; // resolvers of tasks allowed to start
  const subs = new Set();
  let active = 0, nextStart = 0, pausedUntil = 0, timer = null, state = "running";

  const emit = (s) => { if (s !== state) { state = s; for (const f of subs) f(s); } };

  function pump() {
    clearTimeout(timer); timer = null;
    const now = Date.now();
    if (pausedUntil > now) { emit("paused"); timer = setTimeout(pump, pausedUntil - now); return; }
    emit("running");
    if (!waiting.length || active >= concurrency) return;
    if (nextStart > now) { timer = setTimeout(pump, nextStart - now); return; }
    nextStart = now + gapMs;
    active++;
    waiting.shift()();
    if (waiting.length) pump();
  }

  return {
    /** Run `task` when the lane allows it; resolves or rejects with the task's outcome. */
    async run(task) {
      await new Promise((go) => { waiting.push(go); pump(); });
      try { return await task(); }
      finally { active--; pump(); }
    },
    pause(ms) { pausedUntil = Math.max(pausedUntil, Date.now() + ms); pump(); },
    subscribe(f) { subs.add(f); f(state); return () => subs.delete(f); },
    get state() { return state; },
  };
}
