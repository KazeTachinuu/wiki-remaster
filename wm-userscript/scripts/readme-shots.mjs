// README card comparison, from the real site (read-only): one card of each rarity you own, as the
// original site draws it and as the remaster does, side by side in docs/screenshots.
//
//   bun run build && bun scripts/readme-shots.mjs [--show] [--pack]
//   --pack also opens ONE real pack for the "Tout révéler" shot (spends a pack, adds its cards)
import { realSite } from "./real-site.mjs";
import { RARITIES_DESC, RNAME } from "../src/wm/schema.js";

const OUT = new URL("../../docs/screenshots/", import.meta.url).pathname;
const errors = [];
const site = await realSite({ show: process.argv.includes("--show"), width: 1440, height: 1000, onError: (e) => errors.push(e) });
const { view, ev, waitFor, go, preflight, close } = site;
const stop = await preflight();
if (stop) { console.error(stop); await close(); process.exit(2); }
const prevOff = await view.evaluate(`localStorage.getItem("wm-off")`);

// a picture of one element's box (CDP clip), as a data URI
async function crop(rect) {
  const pad = 6;
  const { data } = await view.cdp("Page.captureScreenshot", { format: "png", clip: { x: rect.x - pad, y: rect.y - pad, width: rect.width + 2 * pad, height: rect.height + 2 * pad, scale: 2 } });
  return `data:image/png;base64,${data}`;
}

// --- one card of each rarity, with a picture, from my collection --------------------------
await view.evaluate(`localStorage.removeItem("wm-off")`);
await go("/collection");
// one page per rarity, asked of the server (never the whole collection)
const coll = await ev(async () => {
  const out = [];
  for (const rarity of ["L", "UR", "SR", "R", "PC", "C"]) {
    out.push(...(await window.__wm.data.myCards({ rarity })).items.map((i) => ({ title: i.card.title, rarity: i.card.rarity, image: !!i.card.image_url && !i.card.hide_image })));
    await new Promise((r) => setTimeout(r, 600));
  }
  return out;
});
// per rarity, a few candidates (with a picture first): the first one the original site's search
// finds is the one shown on both sides
// A rarity I own none of (often Légendaire) comes from the full catalogue, on both sides.
// the most read one on Wikipedia, with a picture and nothing sensitive: a card people recognise
const catalog = await ev(async () => (await window.__wm.data.catalog({ page: 0, rarity: "L" })).cards
  .filter((c) => !c.nsfw_image && c.title.length >= 4 && !/tueu|meurtr|crimin|terror|nazi|guerre|attentat|porno|sex|drogue/i.test(c.category || "")).sort((a, b) => (b.pageviews ?? 0) - (a.pageviews ?? 0))
  .map((c) => ({ title: c.title, rarity: c.rarity, image: !!c.image_url && !c.hide_image, category: c.category })));
const candidates = RARITIES_DESC.map((r) => {
  const mine = [...coll.filter((c) => c.rarity === r && c.image), ...coll.filter((c) => c.rarity === r && !c.image)].map((c) => ({ ...c, page: "/collection" }));
  const others = catalog.filter((c) => c.rarity === r && c.image).map((c) => ({ ...c, page: "/global-collection" }));
  return (mine.length ? mine : others).slice(0, 3);
}).filter((l) => l.length);

// the card on screen once its pictures are loaded and the search has settled
const settled = (sel) => ev(async (sel) => {
  for (let i = 0; i < 40; i++) {
    const imgs = [...document.querySelectorAll(sel)];
    if (imgs.length && imgs.every((im) => im.complete && im.naturalWidth > 0)) return true;
    await new Promise((r) => setTimeout(r, 200));
  }
  return false;
}, sel);

// --- before: the original site's card, searched in its own collection page -----------------
await view.evaluate(`localStorage.setItem("wm-off", "1")`);
let at = null;
const nativePage = async (path) => { if (at !== path) { await go(path, { remaster: false }); await Bun.sleep(4000); at = path; } };
const picks = [], before = [];
for (const list of candidates) {
  for (const c of list) {
    await nativePage(c.page);
    // type into the native search (a React input: set through the native setter, then input)
    await ev((t) => {
      const i = [...document.querySelectorAll("input")].find((x) => /recherch/i.test(x.placeholder || ""));
      Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value").set.call(i, t);
      i.dispatchEvent(new Event("input", { bubbles: true }));
    }, c.title);
    // the catalogue search (2.7 million cards) answers slower than the collection's
    await Bun.sleep(c.page === "/global-collection" ? 6000 : 2500);
    await settled("img");
    await Bun.sleep(1200); // the card's own fade-in
    // the card: the smallest element showing the title with an image, shaped like a card
    const found = await ev((t) => {
      const hits = [...document.querySelectorAll("body *")].filter((el) => el.children.length === 0 && el.textContent.trim() === t);
      for (const h of hits) {
        for (let a = h.parentElement; a && a !== document.body; a = a.parentElement) {
          const r = a.getBoundingClientRect();
          if (r.width > 120 && r.height > r.width * 1.1 && r.height < r.width * 1.8 && a.querySelector("img")) { a.setAttribute("data-wm-shot", ""); return true; }
        }
      }
      return false;
    }, c.title);
    if (!found) continue;
    // in view first (a screenshot only sees the viewport), then measured
    await ev(() => document.querySelector("[data-wm-shot]").scrollIntoView({ block: "center" }));
    await Bun.sleep(1500);
    const rect = await ev(() => { const el = document.querySelector("[data-wm-shot]"); el.removeAttribute("data-wm-shot"); const r = el.getBoundingClientRect(); return { x: r.x, y: r.y, width: r.width, height: r.height }; });
    picks.push(c); before.push(await crop(rect)); break;
  }
}
console.log("cards:", picks.map((c) => `${c.rarity} ${c.title}`).join(" | "));

// --- after: the same cards, as the remaster draws them in my collection -------------------
await view.evaluate(`localStorage.removeItem("wm-off")`);
at = null;
const after = [];
for (const c of picks) {
  if (at !== c.page) { await go(c.page); await Bun.sleep(2500); at = c.page; }
  await ev((t) => { const i = document.querySelector("#wm-host").shadowRoot.querySelector(".coll-tools input"); i.value = t; i.dispatchEvent(new Event("input", { bubbles: true })); }, c.title);
  // the card with exactly this title, once the (server) search has answered: never the first
  // card of results still showing from before
  const card = `[...document.querySelector("#wm-host").shadowRoot.querySelectorAll(".grid .card-btn")].find((b) => b.querySelector(".wc-name")?.textContent.trim() === ${JSON.stringify(c.title)})`;
  await waitFor(card, 30000);
  await Bun.sleep(1500); // the photo fades in
  const rect = await view.evaluate(`(() => { const b = ${card}; b.scrollIntoView({ block: "center" }); const r = b.getBoundingClientRect(); return { x: r.x, y: r.y, width: r.width, height: r.height }; })()`);
  after.push(await crop(rect));
}

// --- montage ---------------------------------------------------------------------------
const cells = (imgs) => imgs.map((src) => `<div class="cell">${src ? `<img src="${src}">` : `<span>non trouvée</span>`}</div>`).join("");
const html = `<!doctype html><meta charset="utf-8"><style>
  body{margin:0;background:#0c0d0c;color:#e8ece9;font:600 15px/1.2 system-ui,sans-serif}
  .wrap{display:grid;grid-template-columns:110px repeat(${picks.length},200px);gap:18px 16px;padding:28px 30px;align-items:center}
  .lbl{color:#98a29a;font-size:14px;letter-spacing:.08em;text-transform:uppercase}
  .head{text-align:center;color:#c9d0cb;font-size:14px}
  .cell{display:flex;align-items:center;justify-content:center;height:300px}
  .cell img{max-width:200px;max-height:300px;object-fit:contain}
  .cell span{color:#666}
</style><div class="wrap"><div></div>${picks.map((c) => `<div class="head">${RNAME[c.rarity]}</div>`).join("")}
<div class="lbl">Avant</div>${cells(before)}<div class="lbl">Après</div>${cells(after)}</div>`;
await Bun.write("/tmp/wm-montage.html", html);
await view.navigate("file:///tmp/wm-montage.html");
await Bun.sleep(800);
const size = await ev(() => { const r = document.querySelector(".wrap").getBoundingClientRect(); return { width: Math.ceil(r.width), height: Math.ceil(r.height) }; });
const { data } = await view.cdp("Page.captureScreenshot", { format: "png", clip: { x: 0, y: 0, ...size, scale: 2 } });
await Bun.write(`${OUT}cards-before-after.png`, Buffer.from(data, "base64"));

// --- the remaster's screens, real data: desktop, then a phone ------------------------------
await view.navigate("https://www.wiki-masters.com/pulls");
await view.evaluate(`localStorage.removeItem("wm-off")`);
// shoot once `sel` shows, no skeleton is left and the loading bar is gone (then images settle)
const ROOT = `document.querySelector("#wm-host").shadowRoot`;
// every username this account can see (friends, trade partners, market sellers and bidders, me)
const NAMES = await ev(async () => {
  const j = (u) => fetch(u).then((r) => r.json()).catch(() => ({}));
  const [f, t, m, me] = await Promise.all([j("/api/friends"), j("/api/trades"), j("/api/marketplace?page=1&limit=50"), Promise.resolve(window.__wm.getProfile()?.username)]);
  const names = [me, ...(f.friendships || []).flatMap((x) => [x.requester?.username, x.addressee?.username]),
    ...(t.trades || []).flatMap((x) => [x.initiator?.username, x.recipient?.username]),
    ...(m.auctions || []).flatMap((a) => [a.seller?.username, a.current_bidder?.username])];
  return [...new Set(names.filter((n) => n && n.length > 1))].sort((a, b) => b.length - a.length);
});
// redact those names wherever they are written, and every avatar, before a shot: destructive
// (the text itself is replaced by a fixed placeholder, so nothing of a name, not even its length,
// reaches the picture; a CSS blur alone can be reversed)
function blurInPage(names) {
  const root = document.querySelector("#wm-host").shadowRoot;
  if (!root.querySelector("#wm-blur")) root.append(Object.assign(document.createElement("style"), { id: "wm-blur", textContent: ".bn{display:inline-block;color:transparent;background:#3a403a;border-radius:4px;line-height:1;vertical-align:middle}.avatar{background:#3a403a !important;color:transparent !important}" }));
  for (const a of root.querySelectorAll(".avatar")) a.replaceChildren();
  for (const el of root.querySelectorAll(".cmp-who")) if (!/^(Celle-ci|Votre vente)$/.test(el.textContent.trim())) el.replaceChildren(Object.assign(document.createElement("span"), { className: "bn", textContent: "xxxxxxxx" }));
  // seller lines name whoever listed it, including players who listed after the names were read
  for (const el of root.querySelectorAll(".auc-seller, .auc-by")) {
    const m = /^(Vendu par )(.+)$/.exec(el.textContent.trim());
    if (m && !el.querySelector(".bn")) el.replaceChildren(m[1], Object.assign(document.createElement("span"), { className: "bn", textContent: "xxxxxxxx" }));
  }
  const walk = document.createTreeWalker(root, NodeFilter.SHOW_TEXT), nodes = [];
  while (walk.nextNode()) if (!walk.currentNode.parentElement.closest(".bn, style")) nodes.push(walk.currentNode);
  for (const node of nodes) {
    let text = node.data, out = null;
    // the earliest name in the rest of the text, longest first on a tie
    for (;;) {
      let at = -1, hit = "";
      for (const n of names) { const i = text.indexOf(n); if (i >= 0 && (at < 0 || i < at || (i === at && n.length > hit.length))) { at = i; hit = n; } }
      if (at < 0) break;
      out ??= document.createDocumentFragment();
      out.append(text.slice(0, at), Object.assign(document.createElement("span"), { className: "bn", textContent: "xxxxxxxx" }));
      text = text.slice(at + hit.length);
    }
    if (out) { out.append(text); node.replaceWith(out); }
  }
}
const blurNames = (site) => site.view.evaluate(`(${blurInPage})(${JSON.stringify(NAMES)})`);
const loaded = (site, sel) => site.waitFor(`${ROOT}.querySelector(${JSON.stringify(sel)}) && !${ROOT}.querySelector(".skeleton, .loadbar.on")`, 30000).then(() => Bun.sleep(1500));
const screen = async (name, sel) => { await loaded(site, sel); await blurNames(site); await Bun.sleep(200); await Bun.write(`${OUT}${name}.png`, await view.screenshot()); };
await go("/pulls"); await screen("packs", ".booster");
await go("/collection"); await screen("collection", ".grid .card-btn");
// the card detail on its market tab: price, last sale, chart
await ev(() => document.querySelector("#wm-host").shadowRoot.querySelector(".grid .card-btn").click());
await loaded(site, ".modal [role=tab]");
await ev(() => [...document.querySelector("#wm-host").shadowRoot.querySelectorAll(".modal [role=tab]")].find((t) => t.textContent.includes("Marché")).click());
// loaded: its numbers (or "no sale"), and the live listings no longer placeholders
await site.waitFor(`(${ROOT}.querySelector(".modal .mk-kpis") || /Aucune vente/.test(${ROOT}.querySelector(".modal-panel")?.textContent)) && !${ROOT}.querySelector(".modal .sk")`, 60000);
await screen("card", ".modal .mk-kpis, .modal .cmp");
// the catalogue on a search (its default order opens on odd cards: disambiguation pages, domains)
await go("/global-collection");
await loaded(site, ".grid .card-btn");
await ev(() => { const i = document.querySelector("#wm-host").shadowRoot.querySelector(".coll-tools input"); i.value = "château"; i.dispatchEvent(new Event("input", { bubbles: true })); });
await site.waitFor(`[...${ROOT}.querySelectorAll(".grid .wc-name")].slice(0, 4).every((n) => /ch[aâ]teau/i.test(n.textContent))`, 30000).catch(() => {});
await screen("catalog", ".grid .card-btn");
await go("/marketplace"); await screen("market", ".auc-item");
// an auction open: its price, time left, the bid box, the card's other listings. Chosen, not the
// first one: a picture, nothing sensitive, and bids if any, so the chart and activity show
const auctionId = await ev(async () => {
  const unsafe = /porno|sex|érot|erot|tueu|meurtr|crimin|terror|nazi|attentat|drogue|guerre/i;
  const list = (await fetch("/api/marketplace?page=1&limit=50").then((r) => r.json())).auctions || [];
  const ok = list.filter((a) => a.card?.image_url && !a.card.hide_image && !a.card.nsfw_image && !unsafe.test(`${a.card.category || ""} ${a.card.wikipedia_title || ""}`));
  return (ok.find((a) => a.current_bid != null) ?? ok[0])?.id ?? null;
});
await go(auctionId ? `/marketplace/${auctionId}` : "/marketplace");
if (!auctionId) await ev(() => document.querySelector("#wm-host").shadowRoot.querySelector(".auc-item .card-btn").click());
await site.waitFor(`${ROOT}.querySelector(".auc") && !${ROOT}.querySelector(".auc .sk")`, 30000);
await screen("auction", ".auc .auc-panel");
// --pack (a write: spends one pack, adds its cards): the whole pack at once, "Tout révéler"
if (process.argv.includes("--pack")) {
  await go("/pulls");
  await loaded(site, ".booster");
  await ev(() => document.querySelector("#wm-host").shadowRoot.querySelector(".btn.primary.big").click());
  // the game may ask for its human check first: only a person can pass it (run with --show)
  if (await site.waitFor(`${ROOT}.querySelector(".reveal-skip")`, 120000).then(() => true, () => false)) {
    await ev(() => document.querySelector("#wm-host").shadowRoot.querySelector(".reveal-skip").click());
    await site.waitFor(`[...${ROOT}.querySelectorAll(".reveal-grid img.wc-photo, .reveal-grid img.wc-bg")].every((i) => i.complete)`, 30000);
    await Bun.sleep(2500); // the cards' entrance
    await Bun.write(`${OUT}reveal.png`, await view.screenshot());
  } else console.error("reveal: no pack opened (the game's human check? rerun with --pack --show and tick it)");
}
// a trade, open: the deal, the values, the verdict
// (values keep loading in the background here, so wait for the rows and the deal, not an idle page)
await go("/trades");
// the first tab holding a trade (an account with no pending offer only has history)
for (const tab of ["Reçues", "Envoyées", "Historique"]) {
  await ev((t) => [...document.querySelector("#wm-host").shadowRoot.querySelectorAll(".tr-tabs [role=tab], [role=tab]")].find((b) => b.textContent.includes(t))?.click(), tab);
  if (await site.waitFor(`${ROOT}.querySelector(".tr-row:not(.sk)")`, 8000).then(() => true, () => false)) break;
}
if (await ev(() => { const r = document.querySelector("#wm-host").shadowRoot.querySelector(".tr-row:not(.sk)"); r?.click(); return !!r; })) {
  await site.waitFor(`${ROOT}.querySelector(".tp-sides .card-btn img")`, 30000);
  await Bun.sleep(2500);
  await blurNames(site); await Bun.sleep(200);
  await Bun.write(`${OUT}trade.png`, await view.screenshot());
} else console.error("trade: no trade to show, kept the previous shot");
await view.evaluate(prevOff ? `localStorage.setItem("wm-off", ${JSON.stringify(prevOff)})` : `localStorage.removeItem("wm-off")`);
await view.evaluate(`localStorage.removeItem("wm-debug")`);
await close();

const phone = await realSite({ width: 390, height: 844 });
// a fresh browser on the same profile: make sure the remaster is on before the shots
await phone.go("/pulls"); await phone.view.evaluate(`localStorage.removeItem("wm-off")`);
for (const [path, name, sel] of [["/collection", "phone-collection", ".grid .card-btn"], ["/marketplace", "phone-market", ".auc-item"], ["/pulls", "phone-packs", ".booster"]]) {
  await phone.go(path); await loaded(phone, sel); await blurNames(phone); await Bun.sleep(200);
  await Bun.write(`${OUT}${name}.png`, await phone.view.screenshot());
}
await phone.view.evaluate(`localStorage.removeItem("wm-debug")`);
await phone.close();
console.log(`${OUT}cards-before-after.png`, before.filter(Boolean).length, "/", picks.length, "originals found", errors.length ? `errors: ${errors.join(" | ")}` : "");

// The Pro market analysis, from the test server (`bun run dev`): this account is not Pro, so the
// game would not send it the sale history. Skipped when the test server is not running.
const DEV = process.env.WM_DEV || "http://localhost:5173"; // WM_DEV: another port
const devUp = await fetch(DEV + "/api/profile").then((r) => r.ok, () => false);
if (devUp) {
  await fetch(DEV + "/api/__profile", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ is_pro: true }) });
  const dev = new Bun.WebView({ width: 1440, height: 900 });
  const at = (expr) => dev.evaluate(`(() => { const r = document.querySelector("#wm-host")?.shadowRoot; return ${expr}; })()`);
  const until = async (expr, ms = 20000) => { for (const end = Date.now() + ms; Date.now() < end; await Bun.sleep(200)) if (await at(expr).catch(() => false)) return; throw new Error("dev: " + expr); };
  await dev.navigate(DEV + "/global-collection");
  await until(`!!r?.querySelector(".grid .card-btn")`);
  await at(`[...r.querySelectorAll("button")].find((b) => /^Légendaire/.test(b.textContent.trim()))?.click()`);
  await Bun.sleep(1500);
  await at(`r.querySelector(".grid .card-btn").click()`);
  await until(`!!r?.querySelector(".modal [role=tab]")`);
  await at(`[...r.querySelectorAll(".modal [role=tab]")].find((t) => t.textContent.includes("Marché")).click()`);
  await until(`[...r.querySelectorAll("button")].some((b) => b.textContent.includes("Analyse complète"))`);
  await at(`[...r.querySelectorAll("button")].find((b) => b.textContent.includes("Analyse complète")).click()`);
  await until(`!!r?.querySelector(".ma .pc-plot")`);
  await Bun.sleep(1200);
  await Bun.write(`${OUT}analysis.png`, await dev.screenshot());
  dev.close();
  console.log(`${OUT}analysis.png (test server)`);
} else console.error("analysis: the test server is not running (bun run dev), kept the previous shot");
