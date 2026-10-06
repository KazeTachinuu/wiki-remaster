/**
 * Domain layer entry point. The real adapter runs on wiki-masters.com, the mock anywhere
 * else (local dev). Both return the shapes in ./schema.js.
 */

import { MockData } from "./adapters/mock.js";
import { RealData } from "./adapters/real.js";
import { load, save, drop } from "./cache.js";
import { backgroundLane } from "./lane.js";
import { isRateLimited } from "./api.js";

export const data = /(^|\.)wiki-masters\.com$/.test(location.hostname) ? RealData : MockData;

export { RNAME, RARITIES, RARITIES_DESC, normSearch } from "./schema.js";
export { initCapture, refreshProfile, health, activity, isRateLimited } from "./api.js";
export { session, recordPull } from "./session.js";
export { STATUS, SIDE, statusLabel, tradeTabs, sideValue, verdict, balanceLabel, verdictTitle, chainOf, timeline, offerSummary, dealLine, balanceBadge, stepIn, afterLeaving } from "./trades.js";

// --- Market values: persisted 24 h per card, fetched through one paced lane ---------------
// A value is one request per card, and a collection can hold a thousand cards. The game flags
// bursts as automation, so every value request, from every screen, shares one lane: 2 at a
// time, one start every 450 ms; a rate-limit answer pauses the lane for a minute.

const VALUE_TTL = 24 * 3600e3;
const RATE_PAUSE_MS = 60e3;
export { backgroundLane };
const saved = Object.fromEntries(Object.entries(load("values", Infinity) || {}).filter(([, [, t]]) => Date.now() - t < VALUE_TTL));
const inflight = new Map(); // card id -> Promise, shared by concurrent callers
let saveTimer = null;

/** A card's market value: its sold average at its current rarity, or null. */
export function marketValueFor(card) {
  const hit = saved[card.id];
  if (hit) return Promise.resolve(hit[0]);
  if (!inflight.has(card.id)) {
    // A failure is not remembered, so the next view retries instead of showing "no value".
    // A rate limit pauses the lane, then this card waits in it and tries again (twice at most).
    const fetchValue = (left) => backgroundLane.run(() => data.marketStats(card)).then((s) => {
      saved[card.id] = [s.soldAvg, Date.now()];
      saveTimer ??= setTimeout(() => { saveTimer = null; save("values", saved); }, 1000);
      return s.soldAvg;
    }, (e) => {
      if (!isRateLimited(e)) return null;
      backgroundLane.pause(RATE_PAUSE_MS);
      return left > 0 ? fetchValue(left - 1) : null;
    });
    inflight.set(card.id, fetchValue(2).finally(() => inflight.delete(card.id)));
  }
  return inflight.get(card.id);
}

// --- Collection: stale-while-revalidate --------------------------------------------------

// ponytail: one saved copy per browser profile; another account on the same browser sees the
// old list until the fresh load lands (seconds).
const COLLECTION_TTL = 7 * 86400e3;

/**
 * Load the collection. `onCached` gets the last saved copy immediately (if any); the fresh
 * copy is returned and saved. Without a cache, `onPartial` streams pages as they arrive.
 */
// the collection's own cache key, versioned with its shape (stats.copies), so a shape change
// does not throw away the other caches (market values)
const COLLECTION_KEY = "collection.v3";
export async function loadCollection({ onCached, onPartial } = {}) {
  const cached = load(COLLECTION_KEY, COLLECTION_TTL);
  if (cached) onCached?.(cached);
  const fresh = await data.collection({ onPartial: cached ? undefined : onPartial });
  save(COLLECTION_KEY, fresh);
  return fresh;
}

/** Call after anything that changes the collection (discard, sale, pack). */
export const forgetCollection = () => drop(COLLECTION_KEY);
