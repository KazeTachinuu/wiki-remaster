// What an auction's price means for a bidder, in three answers: is it a good deal (the price
// against the market), is it heating up (bids over the sale's time), and against whom (the
// bidders). An auction's price only goes up, so no price curve: these say more. Pure, for
// components/AuctionPrice.svelte.

// The gauge's zones, as multiples of the market price.
export const ZONES = [
  { id: "good", until: 0.85, label: "bonne affaire" },
  { id: "fair", until: 1.15, label: "prix du marché" },
  { id: "warm", until: 2, label: "cher" },
  { id: "bad", until: Infinity, label: "hors de prix" },
];

/**
 * Where a price stands against the market price: its zone and the gap in words
 * ("15 % au-dessus du marché", "3,2 fois le prix du marché"). Null without a market price.
 */
export function dealOf(price, market) {
  if (price == null || !market) return null;
  const r = price / market;
  const zone = ZONES.find((z) => r < z.until || (z.id === "fair" && r <= z.until)) ?? ZONES.at(-1);
  const pct = Math.round(Math.abs(r - 1) * 100);
  const gap = r >= 2 ? `${(Math.round(r * 10) / 10).toLocaleString("fr")} fois le prix du marché`
    : pct === 0 ? "au prix du marché"
    : `${pct} % ${r > 1 ? "au-dessus du" : "sous le"} marché`;
  return { zone: zone.id, word: zone.label, gap, ratio: r };
}

/**
 * The gauge: the market's zones and the marks on it, in percent of its width. Its scale holds the
 * price and two and a half times the market price, so every zone shows.
 */
export function gaugeOf(price, market, mine = null) {
  if (price == null || !market) return null;
  const max = Math.max(2.5 * market, price * 1.1, (mine ?? 0) * 1.1);
  const x = (v) => Math.min(100, Math.max(0, (v / max) * 100));
  let from = 0;
  const zones = ZONES.map((z) => {
    const to = Math.min(100, x(z.until * market));
    const zone = { id: z.id, label: z.label, from, to };
    from = to;
    return zone;
  });
  return { zones, price: x(price), market: x(market), mine: mine == null ? null : x(mine) };
}

/**
 * Bids per slice of the sale, from its opening to its end (`slices` of them): the bursts. `now`
 * places the present, in percent of the sale.
 */
export function paceOf(bids, start, end, now = Date.now(), slices = 48) {
  const counts = Array(slices).fill(0);
  const span = Math.max(1, end - start);
  for (const b of bids) {
    const t = Date.parse(b.at);
    if (Number.isFinite(t)) counts[Math.min(slices - 1, Math.max(0, Math.floor(((t - start) / span) * slices)))]++;
  }
  return { counts, top: Math.max(1, ...counts), now: Math.min(100, Math.max(0, ((now - start) / span) * 100)) };
}

/**
 * The bidders, best offer first, `top` of them (me always among them when I bid): their bids'
 * moments in percent of the sale, how many, their best. `others` counts the rest.
 */
export function biddersOf(bids, start, end, me = null, top = 5) {
  const span = Math.max(1, end - start);
  const by = new Map();
  for (const b of bids) {
    const id = b.bidderId ?? b.bidder ?? "?";
    const e = by.get(id) ?? { id, name: b.bidder || "Anonyme", mine: !!me && id === me, count: 0, best: 0, at: [] };
    e.count++;
    e.best = Math.max(e.best, b.amount);
    const t = Date.parse(b.at);
    if (Number.isFinite(t)) e.at.push(Math.min(100, Math.max(0, ((t - start) / span) * 100)));
    by.set(id, e);
  }
  const all = [...by.values()].sort((a, b) => b.best - a.best);
  const shown = all.slice(0, top);
  const myLane = all.find((e) => e.mine);
  if (myLane && !shown.includes(myLane)) shown[shown.length - 1] = myLane;
  return { shown, others: all.length - shown.length, total: all.length };
}
