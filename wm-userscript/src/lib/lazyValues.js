import { createQueue } from "./queue.js";
import { marketValueFor } from "../wm/index.js";

/**
 * Market values fetched as cards scroll into view: bounded concurrency, visible cards first,
 * each card at most once. `watch` is a Svelte action taking the card.
 */
export function lazyValues(onvalue, { concurrency = 5 } = {}) {
  const queue = createQueue({ concurrency });

  function load(card, front = false) {
    queue.push(card.id, () => marketValueFor(card).then((v) => onvalue(card.id, v)));
    if (front) queue.prioritize(card.id);
  }

  const io = typeof IntersectionObserver === "undefined" ? null : new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (!e.isIntersecting) continue;
      io.unobserve(e.target);
      load(e.target.__card, true);
    }
  }, { rootMargin: "300px" });

  function watch(node, card) {
    node.__card = card;
    io?.observe(node);
    return { update: (c) => (node.__card = c), destroy: () => io?.unobserve(node) };
  }

  return { load, watch, destroy: () => io?.disconnect() };
}
