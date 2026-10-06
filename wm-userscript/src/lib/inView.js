/**
 * Svelte action: calls `onEnter` each time the node comes within `margin` of the visible area
 * (an infinite list's sentinel loads the next page before the end is reached). A new `key` (the
 * number of rows) checks again, so a sentinel still in view after a page lands asks for the next.
 */
export function inView(node, { onEnter, margin = "600px", key }) {
  let cb = onEnter, last = key;
  if (typeof IntersectionObserver === "undefined") return {};
  const io = new IntersectionObserver((entries) => { if (entries.some((e) => e.isIntersecting)) cb(); }, { rootMargin: margin });
  io.observe(node);
  return {
    update(o) {
      cb = o.onEnter;
      if (o.key !== last) { last = o.key; io.unobserve(node); io.observe(node); }
    },
    destroy() { io.disconnect(); },
  };
}
