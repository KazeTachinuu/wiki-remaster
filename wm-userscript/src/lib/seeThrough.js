// Line drawings and maps on Wikimedia are often transparent PNG/SVG: black strokes that vanish
// on a dark card. A loaded image is sampled small; mostly transparent, it gets a paper backdrop.

/** Share of pixels at least half transparent, from canvas RGBA data. */
export function transparentShare(rgba) {
  let clear = 0;
  for (let i = 3; i < rgba.length; i += 4) if (rgba[i] < 128) clear++;
  return rgba.length ? clear / (rgba.length / 4) : 0;
}

/** True when a loaded <img> is mostly see-through. JPEGs never are; an unreadable image is not. */
export function seeThrough(img, threshold = 0.3) {
  if (/\.jpe?g($|\?)/i.test(img.currentSrc || img.src)) return false;
  try {
    const c = document.createElement("canvas");
    c.width = c.height = 24;
    const ctx = c.getContext("2d", { willReadFrequently: true });
    ctx.drawImage(img, 0, 0, 24, 24);
    return transparentShare(ctx.getImageData(0, 0, 24, 24).data) >= threshold;
  } catch {
    return false; // no CORS: cannot read it, leave it as is
  }
}
