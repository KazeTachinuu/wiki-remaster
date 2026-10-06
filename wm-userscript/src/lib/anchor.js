/**
 * Svelte action for dialogs: always centred vertically. When the content changes height
 * (tabs, sell form, loaded rows) the dialog glides to its new centre instead of jumping.
 * Taller than the screen, it sits at the top and scrolls inside.
 * Writes the offset as padding-top on the backdrop (the dialog's parent).
 */
const GAP = 16; // matches the backdrop's padding

export function anchorCentered(dialog) {
  const backdrop = dialog.parentElement;
  const center = () => {
    backdrop.style.paddingTop = `${Math.max(GAP, Math.round((innerHeight - dialog.offsetHeight) / 2))}px`;
  };
  center();
  // the first placement is instant; every later change glides (unless motion is reduced)
  const raf = requestAnimationFrame(() => {
    if (!matchMedia("(prefers-reduced-motion: reduce)").matches) backdrop.style.transition = "padding-top .22s cubic-bezier(.2,.7,.3,1)";
  });
  const ro = new ResizeObserver(center);
  ro.observe(dialog);
  addEventListener("resize", center);
  return { destroy() { cancelAnimationFrame(raf); ro.disconnect(); removeEventListener("resize", center); } };
}
