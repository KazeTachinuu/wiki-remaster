// A card's market, by rarity: a card can change rarity, and its sales keep the rarity they sold
// at, so prices only compare within one rarity (the game's own Pro market view groups them so).

/**
 * One rarity's market: the average every account sees (the summary), and from a Pro account's
 * sale list the price series (oldest first), count, min, max and the 10 latest sales.
 */
export function rarityMarket(market, rarity) {
  const sales = (market?.sales || []).filter((s) => s.rarity === rarity && s.price != null).sort((a, b) => a.at - b.at);
  const prices = sales.map((s) => s.price);
  const avg = market?.averages?.[rarity] ?? (prices.length ? Math.round(prices.reduce((a, b) => a + b, 0) / prices.length) : null);
  return {
    avg,
    series: sales,
    count: prices.length,
    min: prices.length ? Math.min(...prices) : null,
    max: prices.length ? Math.max(...prices) : null,
    recent: sales.slice(-10).reverse(),
  };
}

/**
 * The numbers the card detail leads with: last sale and cheapest listing as a % gap to the
 * market price (the sold average), and a quick-sale price.
 * @param {{ avg, series }} rm  one rarity's market (rarityMarket)
 * @param {number|null} cheapest  the cheapest live normal copy of the card, if any
 */
export function marketVerdict(rm, cheapest) {
  const pct = (v) => (rm.avg && v != null ? Math.round(((v - rm.avg) / rm.avg) * 100) : null);
  const last = rm.series.at(-1)?.price ?? null;
  // 1 under the cheapest listing, capped at the market price
  const sellAt = cheapest != null ? Math.max(1, Math.min(cheapest - 1, rm.avg ?? cheapest)) : rm.avg;
  return { last, lastPct: pct(last), cheapest, cheapestPct: pct(cheapest), sellAt };
}
