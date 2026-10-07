// Market watches: "tell me when a sale of « singapour » shows up", optionally of one rarity, at
// most some price, or under the market price. Pure, for lib/watches.svelte.js (the checks) and
// the market's alert panel.
import { RNAME } from "./schema.js";
import { nf } from "../lib/format.js";
import { DEALS } from "./auction.js";

const UNDER = DEALS[0].cap; // "sous le marché"

/** A watch as typed: words trimmed, an empty rarity or price left out. */
export function newWatch({ q = "", rarity = "", max = null, under = false }, id = String(Date.now())) {
  const words = q.trim().replace(/\s+/g, " ");
  return words ? { id, q: words, rarity: rarity || "", max: max > 0 ? Math.round(max) : null, under: !!under } : null;
}

/** What a watch looks for, in a few words: "singapour · Légendaire · 200 max · sous le marché". */
export const watchLabel = (w) =>
  [`« ${w.q} »`, w.rarity && RNAME[w.rarity], w.max && `${nf(w.max)} max`, w.under && "sous le marché"].filter(Boolean).join(" · ");

/**
 * Whether a sale found by the watch's search (the game's own, as the market's search box: titles
 * and descriptions) answers it: someone else's, still running, of its rarity, at most its price, and under the
 * market price when asked (`worth`: the sale's market price; unknown, it does not match yet).
 */
export function matchesWatch(w, sale, worth = null, now = Date.now()) {
  if (sale.status !== "active" || !(Date.parse(sale.endAt) > now) || sale.price == null) return false;
  if (sale.mine) return false; // my own sales are not news
  if (w.rarity && sale.card.rarity !== w.rarity) return false;
  if (w.max != null && sale.price > w.max) return false;
  return !w.under || (worth > 0 && sale.price / worth <= UNDER);
}

/** The alert for a sale a watch just found, shaped as a notification of the bell. */
export const alertOf = (w, sale, now = Date.now()) => ({
  id: `watch:${w.id}:${sale.id}`,
  type: "watch",
  title: `Alerte ${watchLabel(w)}`,
  message: `${sale.card.title} à ${nf(sale.price)} WikiBidous`,
  read: false,
  at: new Date(now).toISOString(),
  href: `/marketplace/${encodeURIComponent(sale.id)}`,
});
