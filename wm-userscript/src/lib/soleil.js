// The art of a card without a picture: a flat sun (a four-pointed star in layered halos) on a
// starry sky, in the rarity's colour. Seeded by the title, so each card has its own sky and its
// star its own tilt, and the same card always looks the same.

function seed(text) {
  let h = 2166136261;
  for (const ch of text || "") h = Math.imul(h ^ ch.codePointAt(0), 16777619);
  return h >>> 0;
}

/** A small seeded generator in [0, 1). */
function random(text) {
  let s = seed(text) || 1;
  return () => ((s = Math.imul(s ^ (s >>> 15), 2246822507) ^ Math.imul(s ^ (s >>> 13), 3266489909)) >>> 0) / 4294967296;
}

/** { stars: [[x, y, r, opacity]...] in a 100x140 box, tilt in degrees }, the same for the same title. */
export function soleil(title, count = 46) {
  const r = random(title);
  const stars = Array.from({ length: count }, () => [+(r() * 100).toFixed(1), +(r() * 140).toFixed(1), +(0.15 + r() * 0.4).toFixed(2), +(0.25 + r() * 0.5).toFixed(2)]);
  return { stars, tilt: Math.round(r() * 30 - 15) };
}
