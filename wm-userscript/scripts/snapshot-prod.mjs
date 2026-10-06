// A snapshot of the live game for the local mock (read-only): real cards of every rarity with
// their real sold average, and the typical price per rarity. No usernames, no account data.
// Safe to re-run: written atomically, in a stable order, and left untouched when nothing changed.
//
//   bun run build && bun scripts/snapshot-prod.mjs   ->  mock/snapshot.json
import { realSite } from "./real-site.mjs";
import { renameSync, existsSync, readFileSync } from "node:fs";

const OUT = new URL("../mock/snapshot.json", import.meta.url).pathname;
const PER_RARITY = 40;
const PRICED = 10; // the mock needs a typical price per rarity: a sample of cards is enough
const RARITIES = ["C", "PC", "R", "SR", "UR", "L"];
const NAME = { C: "Commun", PC: "Peu Commun", R: "Rare", SR: "Super Rare", UR: "Ultra Rare", L: "Légendaire" };
// the game reads bursts as automation: like the app's own value lane, 2 requests at a time, spaced
const LANES = 2, PAUSE_MS = 450;
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
ok(`logged in${me ? ` as ${me}` : ""}: ${PER_RARITY} cards per rarity, ${PRICED} of them priced, ${LANES} requests at a time`);

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
// run `jobs` LANES at a time, calling onDone(count) after each
async function lanes(jobs, onDone) {
  const results = new Array(jobs.length); let next = 0, done = 0;
  await Promise.all(Array.from({ length: LANES }, async () => { while (next < jobs.length) { const k = next++; results[k] = await jobs[k](); onDone(++done); } }));
  return results;
}

// time left from the pace measured so far: requests still to make x average time per request
let requestsDone = 0;
const left = (rarityIndex, pricesLeft) => { const each = requestsDone ? (Date.now() - started) / requestsDone : PAUSE_MS + 300; return secs(((pricesLeft + (RARITIES.length - rarityIndex - 1) * (PRICED + 2)) * each) / LANES); };

const cards = [], recap = [];
for (const [i, rarity] of RARITIES.entries()) {
  const label = `[${i + 1}/${RARITIES.length}] ${NAME[rarity].padEnd(11)}`;
  // 1. pick: mostly cards with a picture, a quarter at most without (the mock draws a sky for those)
  const picked = [];
  for (let page = 0; page < 8 && picked.length < PER_RARITY; page++) {
    tick(`${label} ${dim("picking")} page ${page + 1}, ${picked.length}/${PER_RARITY} kept`);
    const d = await get(`/api/cards?page=${page}&rarity=${rarity}`);
    for (const card of d?.cards || []) {
      if (picked.length >= PER_RARITY) break;
      if (card.nsfw_image || UNSAFE.test(`${card.category || ""} ${card.wikipedia_title || ""}`) || (card.wikipedia_title || "").length < 3) continue;
      if (!card.image_url && picked.filter((x) => !x.image_url).length >= PER_RARITY / 4) continue;
      picked.push(card);
    }
  }
  // 2. price a sample (spread over the picked cards): their real sold average at this rarity
  const sample = picked.filter((_, k) => k % Math.ceil(picked.length / PRICED) === 0).slice(0, PRICED);
  const avgs = new Map();
  await lanes(sample.map((card) => async () => {
    const s = await get(`/api/marketplace/cards/${card.id}/sales?scope=summary`);
    avgs.set(card.id, s?.summary?.[card.rarity]?.average ?? null);
  }), (n) => tick(`${label} ${dim("prices")} ${String(n).padStart(2)}/${sample.length}  ${dim(`about ${left(i, sample.length - n)} left, server ${secs(slowest)} at worst`)}`));
  const priced = [...avgs.values()].filter((v) => v != null).length;
  for (const card of picked) cards.push({
    id: card.id, wikipedia_title: card.wikipedia_title, wikipedia_url: card.wikipedia_url, category: card.category, summary: card.summary ?? null,
    rarity: card.rarity, atk: card.atk, def: card.def, q_score: card.q_score, pageviews: card.pageviews,
    image_url: card.image_url, hide_image: !!card.hide_image, avg: avgs.get(card.id) ?? null,
  });
  tickEnd();
  const mine = cards.filter((x) => x.rarity === rarity);
  const median = medianOf(mine.map((x) => x.avg));
  recap.push([NAME[rarity], picked.length, mine.filter((x) => x.image_url).length, priced, median]);
  if (picked.length < PER_RARITY) warn(`${NAME[rarity]}: only ${picked.length} usable cards found`);
  ok(`${label} ${String(picked.length).padStart(2)} cards, ${priced}/${sample.length} sampled with a sold average, typical ${median ?? "-"} pts`);
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
