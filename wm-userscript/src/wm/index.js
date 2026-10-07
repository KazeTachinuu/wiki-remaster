/**
 * Domain layer entry point. The real adapter runs on wiki-masters.com, the mock anywhere
 * else (local dev). Both return the shapes in ./schema.js.
 */

import { MockData } from "./adapters/mock.js";
import { RealData } from "./adapters/real.js";
import { load, save, drop, sweep } from "./cache.js";
import { backgroundLane, pageLane } from "./lane.js";
import { isRateLimited } from "./api.js";

export const data = /(^|\.)wiki-masters\.com$/.test(location.hostname) ? RealData : MockData;
sweep();

export { RNAME, RARITIES, RARITIES_DESC, normSearch, pickCopy } from "./schema.js";
export { initCapture, refreshProfile, getProfile, health, activity, isRateLimited } from "./api.js";
export { session, recordPull } from "./session.js";
export { STATUS, SIDE, statusLabel, tradeTabs, sideValue, verdict, balanceLabel, verdictTitle, chainOf, roundsOf, timeline, offerSummary, dealLine, balanceBadge, stepIn, afterLeaving } from "./trades.js";

// --- Market values: persisted 24 h per card, fetched through one paced lane ---------------
// A value is one request per card, and a collection can hold a thousand cards. The game flags
// bursts as automation, so every value request, from every screen, shares one lane: 2 at a
// time, one start every 450 ms; a rate-limit answer pauses the lane for a minute.

const VALUE_TTL = 24 * 3600e3;
const RATE_PAUSE_MS = 60e3;
export { backgroundLane, pageLane };
const saved = Object.fromEntries(Object.entries(load("values", Infinity) || {}).filter(([, [, t]]) => Date.now() - t < VALUE_TTL));
const inflight = new Map(); // "card id|rarity" -> Promise, shared by concurrent callers
// The browser keeps ~5 MB for the whole site, the game's own data included: the saved values stop
// at the most recent few thousand (about 60 bytes each), however many cards are browsed.
const VALUE_KEEP = 4000;
const newest = (map, n) => {
  const e = Object.entries(map);
  return e.length <= n ? map : Object.fromEntries(e.sort((a, b) => b[1][1] - a[1][1]).slice(0, n));
};
let saveTimer = null;

/** A card's market value: its sold average at its current rarity, or null. */
export function marketValueFor(card) {
  // the same card sells at another price at another rarity (cards change rarity over time)
  const key = `${card.id}|${card.rarity}`;
  const hit = saved[key];
  if (hit) return Promise.resolve(hit[0]);
  if (!inflight.has(key)) {
    // A failure is not remembered, so the next view retries instead of showing "no value".
    // A rate limit pauses the lane, then this card waits in it and tries again (twice at most).
    const fetchValue = (left) => backgroundLane.run(() => data.marketValue(card)).then((v) => {
      saved[key] = [v, Date.now()];
      saveTimer ??= setTimeout(() => { saveTimer = null; save("values", newest(saved, VALUE_KEEP)); }, 1000);
      return v;
    }, (e) => {
      if (!isRateLimited(e)) return null;
      backgroundLane.pause(RATE_PAUSE_MS);
      return left > 0 ? fetchValue(left - 1) : null;
    });
    inflight.set(key, fetchValue(2).finally(() => inflight.delete(key)));
  }
  return inflight.get(key);
}

// --- Collection: asked of the server, page by page -----------------------------------------
// The game's server searches, filters by rarity and orders by rarity or name (checked by
// test:prod), so the collection screen and the trade picker ask it for one page at a time,
// whatever the size of the collection, as the game's own collection page does. Only the first
// page as it opens (rarity order, no search) is saved, so the screen shows at once.

// One saved first page per browser profile: another account on the same browser sees it until
// the fresh one lands (a second).
const FIRST_TTL = 7 * 86400e3;
const FIRST_KEY = "collection.first.v1";

/** The first page of my collection as saved last time ({ items, total, counts, pending }), or null. */
export const savedFirstPage = () => load(FIRST_KEY, FIRST_TTL);

/**
 * One page of my collection, asked of the server (`q`, `rarity`, `sort`: "rarity" | "name"). The
 * opening page (page 0, no search, no filter, rarity order) is saved for next time.
 */
export async function myCardsPage(query = {}) {
  const d = await data.myCards(query);
  const opening = !query.page && !query.q && !query.rarity && (query.sort ?? "rarity") === "rarity";
  if (opening) save(FIRST_KEY, d);
  return d;
}

// After a change (a pack, a discard, a sale, a trade): the saved first page is asked again.
export const collectionAdd = () => drop(FIRST_KEY);
export const collectionRemove = () => drop(FIRST_KEY);
export const forgetCollection = () => drop(FIRST_KEY);
