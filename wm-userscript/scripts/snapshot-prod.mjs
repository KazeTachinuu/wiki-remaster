// A snapshot of the live game for the local mock (read-only): real cards of every rarity with
// their real sold average, and the typical price per rarity. No usernames, no account data.
//
//   bun run build && bun scripts/snapshot-prod.mjs   ->  mock/snapshot.json
import { realSite } from "./real-site.mjs";

const OUT = new URL("../mock/snapshot.json", import.meta.url).pathname;
const PER_RARITY = 40;
const RARITIES = ["C", "PC", "R", "SR", "UR", "L"];
const PAUSE_MS = 450; // the game reads bursts as automation: one request at a time, spaced

// [*] step  [+] done  [-] warning, kept going  [x] fatal
const tty = process.stdout.isTTY && !process.env.NO_COLOR;
const c = (code, s) => (tty ? `\x1b[${code}m${s}\x1b[0m` : s);
const hdr = (s) => console.log(`${c("1;34", "[*]")} ${s}`);
const ok = (s) => console.log(`${c("1;32", "[+]")} ${s}`);
const warn = (s) => console.error(`${c("1;33", "[-]")} ${s}`);
const die = (s) => { console.error(`${c("31", "[x]")} ${s}`); process.exit(2); };
const tick = (n, total, s) => tty && process.stdout.write(`\r    ${String(n).padStart(3)}/${total} ${s}\x1b[K`);
const tickEnd = () => tty && process.stdout.write("\r\x1b[K");

const started = Date.now();
hdr("snapshot of the live game (read-only)");
const site = await realSite({ width: 1200, height: 800 });
const stop = await site.preflight();
if (stop) { await site.close(); die(stop); }

const get = (path) => site.ev(async (p) => { const r = await fetch(p); return r.ok ? r.json() : null; }, path).catch(() => null);
const pause = () => Bun.sleep(PAUSE_MS);
const unsafe = /porno|sex|érot|erot|tueu|meurtr|crimin|terror|nazi|attentat|drogue|guerre|massacre/i;

const cards = [];
for (const [i, rarity] of RARITIES.entries()) {
  // pick: mostly cards with a picture, a few without (the rarity's sky shows instead)
  const picked = [];
  for (let page = 0; page < 8 && picked.length < PER_RARITY; page++) {
    const d = await get(`/api/cards?page=${page}&rarity=${rarity}`);
    await pause();
    for (const card of d?.cards || []) {
      if (picked.length >= PER_RARITY) break;
      if (card.nsfw_image || unsafe.test(`${card.category || ""} ${card.wikipedia_title || ""}`) || (card.wikipedia_title || "").length < 3) continue;
      if (!card.image_url && picked.filter((x) => !x.image_url).length >= PER_RARITY / 4) continue;
      picked.push(card);
    }
  }
  if (picked.length < PER_RARITY) warn(`${rarity}: only ${picked.length} usable cards`);
  // price each one: its real sold average at its rarity
  let priced = 0;
  for (const [k, card] of picked.entries()) {
    tick(k + 1, picked.length, `${rarity} prices`);
    const s = await get(`/api/marketplace/cards/${card.id}/sales?scope=summary`);
    await pause();
    const avg = s?.summary?.[card.rarity]?.average ?? null;
    if (avg != null) priced++;
    cards.push({
      id: card.id, wikipedia_title: card.wikipedia_title, wikipedia_url: card.wikipedia_url, category: card.category, summary: card.summary ?? null,
      rarity: card.rarity, atk: card.atk, def: card.def, q_score: card.q_score, pageviews: card.pageviews,
      image_url: card.image_url, hide_image: !!card.hide_image, avg,
    });
  }
  tickEnd();
  ok(`[${i + 1}/${RARITIES.length}] ${rarity}: ${picked.length} cards, ${priced} with a sold average`);
}
await site.close();

// typical price per rarity: the median of the real sold averages
const median = (xs) => { const s = xs.filter((x) => x != null).sort((a, b) => a - b); return s.length ? s[Math.floor(s.length / 2)] : null; };
const prices = Object.fromEntries(RARITIES.map((r) => [r, median(cards.filter((x) => x.rarity === r).map((x) => x.avg))]));
await Bun.write(OUT, JSON.stringify({ capturedAt: new Date().toISOString(), prices, cards }, null, 1) + "\n");
ok(`${cards.length} cards, typical prices ${Object.entries(prices).map(([r, p]) => `${r} ${p ?? "-"}`).join(" ")}`);
ok(`mock/snapshot.json in ${Math.round((Date.now() - started) / 1000)} s`);
