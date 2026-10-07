// Market watches and their alerts, kept in this browser. Each watch is the market's own search
// (one request) every few minutes while the game's tab is in view; a sale it finds that was not
// there before becomes an alert: a toast, and an unread entry in the bell (App.svelte). A new
// watch first takes note of what is already for sale, so only what comes after alerts.
import { data, marketValueFor } from "../wm/index.js";
import { newWatch, matchesWatch, alertOf } from "../wm/watch.js";

const KEY = "wm-watches";
const EVERY_MS = 5 * 60e3;
const SEEN_KEEP = 300; // sale ids remembered per watch
const ALERTS_KEEP = 50;

function read() {
  try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch { return {}; }
}
const saved = read();
// list: the watches; seen: watch id -> sale ids already known; alerts: newest first;
// counts: watch id -> how many sales match right now (this visit)
export const watches = $state({ list: saved.list ?? [], seen: saved.seen ?? {}, alerts: saved.alerts ?? [], counts: {} });

$effect.root(() => {
  $effect(() => {
    const json = JSON.stringify({ list: watches.list, seen: watches.seen, alerts: watches.alerts });
    try { localStorage.setItem(KEY, json); } catch {}
  });
});

/** The sales of the market matching a watch now, and the ones not seen before. */
async function check(w) {
  const { auctions } = await data.marketplace({ page: 0, sort: "recent", q: w.q, rarity: w.rarity || undefined, quiet: true });
  const hits = [];
  for (const a of auctions) {
    if (!matchesWatch({ ...w, under: false }, a)) continue; // the cheap tests first
    if (!w.under || matchesWatch(w, a, await marketValueFor(a.card))) hits.push(a);
  }
  watches.counts[w.id] = hits.length;
  const seen = new Set(watches.seen[w.id] ?? []);
  const fresh = hits.filter((a) => !seen.has(a.id));
  watches.seen[w.id] = [...fresh.map((a) => a.id), ...seen].slice(0, SEEN_KEEP);
  return fresh.map((a) => alertOf(w, a));
}

/** Adds a watch (null when nothing was typed); what is for sale now is taken note of, not alerted. */
export async function addWatch(input) {
  const w = newWatch(input);
  if (!w) return null;
  watches.list.push(w);
  await check(w).catch(() => {});
  return w;
}

export function removeWatch(id) {
  watches.list = watches.list.filter((w) => w.id !== id);
  delete watches.seen[id];
  delete watches.counts[id];
}

export function markAlertsRead(ids = null) {
  for (const a of watches.alerts) if (!ids || ids.includes(a.id)) a.read = true;
}

/**
 * Checks every watch now and then while the tab is in view; `onalert(alert)` for each new sale.
 * Returns the stop function.
 */
export function startWatching(onalert) {
  let running = false;
  async function round() {
    if (running || document.visibilityState !== "visible" || !watches.list.length) return;
    running = true;
    for (const w of [...watches.list]) {
      try {
        for (const alert of await check(w)) {
          watches.alerts = [alert, ...watches.alerts.filter((a) => a.id !== alert.id)].slice(0, ALERTS_KEEP);
          onalert(alert);
        }
      } catch {} // a failed check waits for the next round
    }
    running = false;
  }
  const first = setTimeout(round, 15e3);
  const t = setInterval(round, EVERY_MS);
  return () => { clearTimeout(first); clearInterval(t); };
}
