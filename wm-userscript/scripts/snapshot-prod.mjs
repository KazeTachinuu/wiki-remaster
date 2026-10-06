// A snapshot of the live game for the local mock (read-only): real cards of every rarity and the
// typical price per rarity, from the marketplace (the game's fast endpoint: full cards with live
// prices; the catalogue and sales endpoints take 6 to 15 s a request). No usernames, no account data.
// Safe to re-run: written atomically, in a stable order, and left untouched when nothing changed.
//
//   bun run build && bun scripts/snapshot-prod.mjs   ->  mock/snapshot.json
import { realSite } from "./real-site.mjs";
import { renameSync, existsSync, readFileSync } from "node:fs";

const OUT = new URL("../mock/snapshot.json", import.meta.url).pathname;
const PER_RARITY = 40;
const MAX_PAGES = 6; // marketplace pages of 50 listings per rarity
const RARITIES = ["C", "PC", "R", "SR", "UR", "L"];
const NAME = { C: "Commun", PC: "Peu Commun", R: "Rare", SR: "Super Rare", UR: "Ultra Rare", L: "Légendaire" };
const PAUSE_MS = 450; // the game reads bursts as automation: one request at a time, spaced
const UNSAFE = /porno|sex|érot|erot|tueu|meurtr|crimin|terror|nazi|attentat|drogue|guerre|massacre/i;

// [*] step  [+] done  [=] already up to date  [-] warning, kept going  [x] fatal
const tty = process.stdout.isTTY && !process.env.NO_COLOR;
const c = (code, s) => (tty ? `\x1b[${code}m${s}\x1b[0m` : s);
const dim = (s) => c("2", s);
const hdr = (s) => console.log(`${c("1;34", "[*]")} ${s}`);
const ok = (s) => console.log(`${c("1;32", "[+]")} ${s}`);
const same = (s) => console.log(dim(`[=] ${s}`));
const warn = (s) => console.error(`${c("1;33", "[-]")} ${s}`);
const die = (s) => { tickEnd(); console.error(`${c("31", "[x]")} ${s}`); process.exit(2); };
// one live line, rewritten in place, cleared when the step ends (skipped when piped)
// cut to the terminal's width: a line that wraps cannot be rewritten in place
const plain = (s) => s.replace(/\x1b\[[0-9;]*m/g, "");
const fit = (s) => { const room = (process.stdout.columns || 100) - 5; let out = "", n = 0; for (const part of s.split(/(\x1b\[[0-9;]*m)/)) { if (part.startsWith("\x1b")) { out += part; continue; } const take = part.slice(0, Math.max(0, room - n)); out += take; n += take.length; } return n < plain(s).length ? out.slice(0, -1) + "…\x1b[0m" : out; };
const tick = (s) => tty && process.stdout.write(`\r    ${fit(s)}\x1b[K`);
const tickEnd = () => tty && process.stdout.write("\r\x1b[K");
const secs = (ms) => (ms < 60e3 ? `${Math.round(ms / 1000)} s` : `${Math.floor(ms / 60e3)} min ${String(Math.round((ms % 60e3) / 1000)).padStart(2, "0")}`);

const started = Date.now();
let failed = 0;
hdr("Snapshot of the live game for the mock (read-only)");
tick("starting the browser…");
const site = await realSite({ width: 1200, height: 800 });
tick("checking the login…");
const stop = await site.preflight();
if (stop) { await site.close(); die(stop); }
const me = await site.ev(() => window.__wm?.getProfile?.()?.username ?? null).catch(() => null);
tickEnd();
ok(`logged in${me ? ` as ${me}` : ""}: up to ${PER_RARITY} cards per rarity from the marketplace, one request every ${PAUSE_MS} ms`);

let slowest = 0;
const get = async (path) => {
  const t = Date.now();
  const d = await site.ev(async (p) => { const r = await fetch(p); return r.ok ? r.json() : null; }, path).catch(() => null);
  slowest = Math.max(slowest, Date.now() - t);
  if (d == null) failed++;
  requestsDone++;
  await Bun.sleep(PAUSE_MS);
  return d;
};
let requestsDone = 0;

const cards = [], recap = [];
for (const [i, rarity] of RARITIES.entries()) {
  const label = `[${i + 1}/${RARITIES.length}] ${NAME[rarity].padEnd(11)}`;
  // distinct cards listed at this rarity, each with its listing prices (several copies: several prices)
  const byCard = new Map();
  for (let page = 1; page <= MAX_PAGES && byCard.size < PER_RARITY; page++) {
    tick(`${label} ${dim("marketplace")} page ${page}, ${byCard.size}/${PER_RARITY} cards  ${dim(`server ${secs(slowest)} at worst`)}`);
    const d = await get(`/api/marketplace?page=${page}&limit=50&rarity=${rarity}`);
    for (const a of d?.auctions || []) {
      const card = a.card;
      if (!card?.id || card.rarity !== rarity || card.nsfw_image || UNSAFE.test(`${card.category || ""} ${card.wikipedia_title || ""}`)) continue;
      const price = a.effective_bid ?? a.current_bid ?? a.base_amount;
      if (byCard.has(card.id)) { if (price != null) byCard.get(card.id).prices.push(price); continue; }
      if (byCard.size < PER_RARITY) byCard.set(card.id, { card, prices: price != null ? [price] : [] });
    }
    if (!d?.hasMore) break;
  }
  for (const { card, prices } of byCard.values()) cards.push({
    id: card.id, wikipedia_title: card.wikipedia_title, wikipedia_url: card.wikipedia_url, category: card.category, summary: card.summary ?? null,
    rarity: card.rarity, atk: card.atk, def: card.def, q_score: card.q_score, pageviews: card.pageviews,
    image_url: card.image_url, hide_image: !!card.hide_image, avg: medianOf(prices),
  });
  tickEnd();
  const mine = cards.filter((x) => x.rarity === rarity);
  const median = medianOf(mine.map((x) => x.avg));
  recap.push([NAME[rarity], mine.length, mine.filter((x) => x.image_url && !x.hide_image).length, mine.filter((x) => x.avg != null).length, median]);
  if (mine.length < PER_RARITY) warn(`${NAME[rarity]}: ${mine.length} distinct cards on the market (fewer listed than ${PER_RARITY})`);
  ok(`${label} ${String(mine.length).padStart(2)} cards, typical listing ${median ?? "-"} pts`);
}
await site.close();

function medianOf(xs) { const s = xs.filter((x) => x != null).sort((a, b) => a - b); return s.length ? s[Math.floor(s.length / 2)] : null; }
const prices = Object.fromEntries(RARITIES.map((r) => [r, medianOf(cards.filter((x) => x.rarity === r).map((x) => x.avg))]));

// recap, aligned
console.log("");
console.log(dim(`    ${"rarity".padEnd(11)} ${"cards".padStart(5)} ${"photo".padStart(5)} ${"priced".padStart(6)} ${"typical".padStart(8)}`));
for (const [name, n, photo, priced, median] of recap) console.log(`    ${name.padEnd(11)} ${String(n).padStart(5)} ${String(photo).padStart(5)} ${String(priced).padStart(6)} ${String(median ?? "-").padStart(5)} pts`);
console.log("");
if (failed) warn(`${failed} of ${requestsDone} requests failed (cards kept, without a price)`);

// stable output: cards in a fixed order, so an unchanged game gives an unchanged file
const ORDER = Object.fromEntries(RARITIES.map((r, i) => [r, i]));
cards.sort((a, b) => ORDER[a.rarity] - ORDER[b.rarity] || String(a.id).localeCompare(String(b.id)));
const body = (o) => JSON.stringify({ prices: o.prices, cards: o.cards });
const previous = existsSync(OUT) ? (() => { try { return JSON.parse(readFileSync(OUT, "utf8")); } catch { return null; } })() : null;
const took = secs(Date.now() - started);
if (previous && body(previous) === body({ prices, cards })) {
  same(`mock/snapshot.json unchanged, ${cards.length} cards (${took}, ${requestsDone} requests)`);
} else {
  // atomic: written next to it, then renamed over it in one step; never a half-written file
  const tmp = `${OUT}.tmp`;
  await Bun.write(tmp, JSON.stringify({ capturedAt: new Date().toISOString(), prices, cards }, null, 1) + "\n");
  renameSync(tmp, OUT);
  ok(`mock/snapshot.json ${previous ? "updated" : "written"}, ${cards.length} cards (${took}, ${requestsDone} requests)`);
}
