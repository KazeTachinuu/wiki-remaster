// The rest of the game's market, as a Pro account sees it in a card's sale history: the mock's six
// players sell a handful of cards, the real game sells some cards hundreds of times. Seeded by the
// card, so a card's past is the same on every start, and shaped like the live histories seen:
// busier lately than months ago, a slow drift, weekday rhythm, quiet stretches, and now and then a
// sale far above the rest (2 222 for a card that usually goes for 30).

const DAY = 86400e3;
/** The live history endpoint returned exactly 200 sales on a busy card: the latest 200, it seems. */
export const SALES_CAP = 200;

function rng(seed) {
  let s = 0;
  for (const ch of String(seed)) s = Math.imul(s ^ ch.codePointAt(0), 2654435761);
  return () => ((s = Math.imul(s ^ (s >>> 15), 2246822507) ^ Math.imul(s ^ (s >>> 13), 3266489909)) >>> 0) / 4294967296;
}

// how often a card sells, by rarity: the market lists the higher tiers far more
const PER_DAY = { L: 2.4, UR: 1.6, SR: 1.2, R: 0.8, PC: 0.35, C: 0.15 };

/**
 * A card's past sales on the whole market, oldest first: [{ id, rarity, final_price, settled_at }].
 * `typical` is the card's usual price (its snapshot average or its rarity's).
 */
export function pastSales(card, typical, now = Date.now()) {
  const r = rng("history " + card.id);
  // a card's own pace: popular ones (many views) sell more, some barely at all
  const views = Math.max(1, card.pageviews ?? 1000);
  const pace = (PER_DAY[card.rarity] ?? 0.3) * Math.min(3, 0.4 + Math.log10(views) / 3) * (0.3 + r() * 1.4);
  const days = Math.round(30 + r() * 100); // listed for one to four months
  const drift = (r() - 0.5) * 0.8; // -40 % .. +40 % over the period
  const base = Math.max(3, typical || 20);
  const quiet = r() < 0.5 ? [Math.floor(r() * days), 3 + Math.floor(r() * 8)] : null; // a lull
  const out = [];
  for (let d = days; d >= 0; d--) {
    if (quiet && d <= quiet[0] && d > quiet[0] - quiet[1]) continue;
    // busier lately: the last weeks sell up to twice the early pace
    const busy = pace * (0.5 + 1.5 * (1 - d / days)) * (new Date(now - d * DAY).getDay() % 6 === 0 ? 1.4 : 1);
    let n = Math.floor(busy) + (r() < busy % 1 ? 1 : 0);
    while (n-- > 0) {
      const level = base * (1 + drift * (1 - d / days));
      let price = level * (0.55 + r() * 0.9); // the usual spread around the going price
      const odd = r();
      if (odd < 0.012) price = level * (8 + r() * 30); // someone paid far too much
      else if (odd < 0.03) price = Math.max(1, level * r() * 0.2); // or got it for nothing
      out.push({ at: now - d * DAY - r() * DAY, price: Math.max(1, Math.round(price)) });
    }
  }
  return out
    .filter((s) => s.at < now)
    .sort((a, b) => a.at - b.at)
    .map((s, i) => ({ id: `hist_${card.id}_${i}`, rarity: card.rarity, final_price: s.price, settled_at: new Date(s.at).toISOString() }));
}
