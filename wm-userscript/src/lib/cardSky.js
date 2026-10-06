// The art of a card without a picture, seeded by its title (each card its own sky, the same card
// always the same): a star for most cards, a sun when shiny, a supernova for Legendaries.

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

const round = (x) => +x.toFixed(2);

/** Which drawing: "nova" (Legendary), "sun" (shiny), else "star". */
export const skyKind = (rarity, shiny) => (rarity === "L" ? "nova" : shiny ? "sun" : "star");

/**
 * { stars: [[x, y, r, opacity]] in a 100x140 box, tilt (degrees), jets: [[angle, length, width]] }
 * for the supernova's light jets; the same for the same title.
 */
export function cardSky(title, count = 46) {
  const r = random(title);
  const stars = Array.from({ length: count }, () => [round(r() * 100), round(r() * 140), round(0.15 + r() * 0.4), round(0.25 + r() * 0.5)]);
  const tilt = Math.round(r() * 30 - 15);
  const jets = Array.from({ length: 14 }, (_, k) => [round((k / 14) * 360 + (r() - 0.5) * 16), round(20 + r() * 26), round(1.2 + r() * 2.2)]);
  return { stars, tilt, jets };
}
