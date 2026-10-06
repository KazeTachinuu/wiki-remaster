/**
 * A box that may hold more than it shows (the picker's rarity chips, the offer's two sides):
 * the edges that still hide content fade out (`data-fade` = "start", "end" or "both", styled by
 * `[data-fade]` in app.css), so a cut row never looks like a bug. `axis` is "x" or "y"; the fade
 * follows scrolling, the box's size and its children's (a card added to a side).
 * Returns { update, destroy } so other actions can re-run it after changing the content.
 */
export function scrollFade(node, { axis = "x" } = {}) {
  const y = axis === "y";
  node.dataset.fadeAxis = y ? "y" : "x";
  const update = () => {
    const pos = y ? node.scrollTop : node.scrollLeft;
    const max = y ? node.scrollHeight - node.clientHeight : node.scrollWidth - node.clientWidth;
    const start = pos > 1, end = pos < max - 1;
    node.dataset.fade = start && end ? "both" : start ? "start" : end ? "end" : "";
  };
  const ro = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(update);
  const watch = () => { ro?.disconnect(); ro?.observe(node); for (const c of node.children) ro?.observe(c); };
  const mo = typeof MutationObserver === "undefined" ? null : new MutationObserver(() => { watch(); update(); });
  watch();
  mo?.observe(node, { childList: true });
  node.addEventListener("scroll", update, { passive: true });
  update();
  return { update, destroy: () => { ro?.disconnect(); mo?.disconnect(); node.removeEventListener("scroll", update); } };
}
