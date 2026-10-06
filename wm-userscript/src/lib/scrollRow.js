import { scrollFade } from "./scrollFade.js";

/**
 * A row that may be wider than its box (the picker's rarity chips). When the full row overflows,
 * the `steps` classes are added one after the other until it fits (the CSS says what each does:
 * the picker's `wrap` gives the chips a line of their own, then `compact` shortens the labels),
 * and the edges that still hide content fade (scrollFade).
 */
export function scrollRow(node, { steps = ["wrap", "compact"] } = {}) {
  const fade = scrollFade(node, { axis: "x" });
  const over = () => node.scrollWidth > node.clientWidth + 1;
  const fit = () => {
    node.classList.remove(...steps);
    for (const s of steps) {
      if (!over()) break;
      node.classList.add(s);
    }
    fade.update();
  };
  // the parent too: a wider bar does not resize chips that already fit at their natural width
  const ro = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(fit);
  ro?.observe(node);
  if (node.parentElement) ro?.observe(node.parentElement);
  fit();
  return { destroy: () => { ro?.disconnect(); fade.destroy(); } };
}
