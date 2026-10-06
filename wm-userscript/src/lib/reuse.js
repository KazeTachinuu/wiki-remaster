/**
 * Fresh rows that keep the old object wherever nothing changed (same id, same content): the
 * screen then redraws only what changed, not every card of a refreshed list.
 */
export function reuse(old = [], fresh = []) {
  const before = new Map((old ?? []).map((r) => [r.id, r]));
  return fresh.map((r) => {
    const o = before.get(r.id);
    return o && JSON.stringify(o) === JSON.stringify(r) ? o : r;
  });
}
