import { SvelteMap } from "svelte/reactivity";
import { createQueue } from "./queue.js";
import { marketValueFor } from "../wm/index.js";

/**
 * Market values fetched as cards scroll into view: bounded concurrency, visible cards first,
 * each card at most once. `watch` is a Svelte action taking the card.
 */
export function lazyValues(onvalue, { concurrency = 5 } = {}) {
  const queue = createQueue({ concurrency });

  function load(card, front = false) {
    queue.push(card.id, () => marketValueFor(card).then((v) => onvalue(card.id, v, card)));
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

  // leaving the screen drops the values it queued and never asked for (a value sort queues a
  // whole collection): they must not hold the shared lane for screens still open
  return { load, watch, destroy: () => { io?.disconnect(); queue.clear(); } };
}

/**
 * Values for a known set of cards (trade sides): a reactive Map card id -> value, filled as the
 * values arrive (absent while loading or unknown). Each card is fetched once. `watch` loads a
 * card once it scrolls into view (grids). Call `destroy` when the screen goes away.
 */
export function valueMap() {
  const values = new SvelteMap();
  const lazy = lazyValues((id, v) => values.set(id, v));
  return { values, load: (items) => { for (const it of items) lazy.load(it.card); }, watch: lazy.watch, destroy: lazy.destroy };
}
