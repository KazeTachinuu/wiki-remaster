// The art of a card without a picture: a four-pointed star on a night sky (and, for a shiny card, a
// meteor shower), seeded by the title: each card its own sky, the same card always the same.

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

/**
 * In a 100x140 box: stars [[x, y, r, opacity]], and shooting stars [[x0, y0, x1, y1, width, opacity]]
 * all falling at one angle, like a meteor shower (x1, y1 is the bright head). `field` is the stars
 * as two SVG paths (dim and bright dots), so a card's sky is a couple of shapes, not 46.
 */
export function cardSky(title) {
  const r = random(title);
  const stars = Array.from({ length: 46 }, () => [round(r() * 100), round(r() * 140), round(0.15 + r() * 0.4), round(0.25 + r() * 0.5)]);
  const angle = ((20 + r() * 25) * Math.PI) / 180;
  const shooting = Array.from({ length: 5 + Math.floor(r() * 4) }, () => {
    const x = 5 + r() * 90, y = 5 + r() * 115, len = 8 + r() * 20;
    return [round(x - len * Math.cos(angle)), round(y - len * Math.sin(angle)), round(x), round(y), round(0.25 + r() * 0.45), round(0.35 + r() * 0.55)];
  });
  // shiny: two or three small sparkles close to the star [x, y, size]
  const sparkles = Array.from({ length: 2 + Math.floor(r() * 2) }, () => { const a = r() * Math.PI * 2, d = 17 + r() * 8; return [round(50 + d * Math.cos(a)), round(52 + d * Math.sin(a)), round(1.6 + r() * 1.6)]; });
  // each star a dot (a zero-length round-capped segment), drawn as one path per brightness
  const dots = (keep) => stars.filter(keep).map(([x, y]) => `M${x} ${y}h0`).join("");
  const field = { dim: dots(([, , , o]) => o < 0.5), bright: dots(([, , , o]) => o >= 0.5) };
  return { stars, field, shooting, sparkles };
}
