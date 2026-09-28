/**
 * Domain layer entry point. The real adapter runs on wiki-masters.com, the mock anywhere
 * else (local dev). Both return the shapes in ./schema.js.
 */

import { MockData } from "./adapters/mock.js";
import { RealData } from "./adapters/real.js";
import { load, save, drop } from "./cache.js";

export const data = /(^|\.)wiki-masters\.com$/.test(location.hostname) ? RealData : MockData;

export { RNAME, RARITIES, RARITIES_DESC, normSearch } from "./schema.js";
export { initCapture, refreshProfile } from "./api.js";
export { session, recordPull } from "./session.js";

// --- Market values: persisted 6 h per card -------------------------------------------

const VALUE_TTL = 6 * 3600e3;
const saved = Object.fromEntries(Object.entries(load("values", Infinity) || {}).filter(([, [, t]]) => Date.now() - t < VALUE_TTL));
const inflight = new Map(); // card id -> Promise, shared by concurrent callers
let saveTimer = null;

/** A card's market value: its sold average at its current rarity, or null. */
export function marketValueFor(card) {
  const hit = saved[card.id];
  if (hit) return Promise.resolve(hit[0]);
  if (!inflight.has(card.id)) {
    // A failure is not remembered, so the next view retries instead of showing "no value".
    inflight.set(card.id, data.marketStats(card).then((s) => {
      saved[card.id] = [s.soldAvg, Date.now()];
      saveTimer ??= setTimeout(() => { saveTimer = null; save("values", saved); }, 1000);
      return s.soldAvg;
    }, () => null).finally(() => inflight.delete(card.id)));
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
export async function loadCollection({ onCached, onPartial } = {}) {
  const cached = load("collection", COLLECTION_TTL);
  if (cached) onCached?.(cached);
  const fresh = await data.collection({ onPartial: cached ? undefined : onPartial });
  save("collection", fresh);
  return fresh;
}

/** Call after anything that changes the collection (discard, sale, pack). */
export const forgetCollection = () => drop("collection");
