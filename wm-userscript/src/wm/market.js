// A card's market, by rarity: a card can change rarity, and its sales keep the rarity they sold
// at, so prices only compare within one rarity (the game's own Pro market view groups them so).

import { RARITIES_DESC } from "./schema.js";

/** The rarities this card has sold at (its current one always first), rarest next. */
export function marketRarities(market, current) {
  const seen = new Set([...Object.keys(market?.averages || {}), ...(market?.sales || []).map((s) => s.rarity)]);
  return [current, ...RARITIES_DESC.filter((r) => r !== current && seen.has(r))];
}

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
