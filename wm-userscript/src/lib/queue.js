// A small, dependency-free task queue: bounded concurrency + de-duplication by key.
//
// - At most `concurrency` tasks run at once (gentle on the API).
// - Pushing a key that is queued, running, or finished is a no-op, so the same
//   work never runs twice even if requested from several places.
// - `prioritize(key)` jumps a still-queued key to the front, so we can serve the
//   cards a user is actually looking at before a background sweep.
//
// Used for lazy market-value lookups: cards enqueue as they scroll into view, and
// results are cached upstream so revisiting is instant.
export function createQueue({ concurrency = 4 } = {}) {
  const seen = new Set(); // every key ever enqueued (dedupe across the queue's life)
  const pending = []; // [{ key, task }]
  let active = 0;

  function pump() {
    while (active < concurrency && pending.length) {
      const { task } = pending.shift();
      active++;
      Promise.resolve()
        .then(task)
        .catch(() => {}) // a failed task must not stall the pump
        .finally(() => { active--; pump(); });
    }
  }

  return {
    push(key, task) {
      if (seen.has(key)) return;
      seen.add(key);
      pending.push({ key, task });
      pump();
    },
    prioritize(key) {
      const i = pending.findIndex((p) => p.key === key);
      if (i > 0) pending.unshift(pending.splice(i, 1)[0]);
    },
    has: (key) => seen.has(key),
    get pendingCount() { return pending.length; },
    get activeCount() { return active; },
  };
}
