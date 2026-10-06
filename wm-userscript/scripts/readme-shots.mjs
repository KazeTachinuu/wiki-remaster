// README card comparison, from the real site (read-only): one card of each rarity you own, as the
// original site draws it and as the remaster does, side by side in docs/screenshots.
//
//   bun run build && bun scripts/readme-shots.mjs [--show]
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
const coll = await ev(async () => (await window.__wm.data.collection()).items.map((i) => ({ title: i.card.title, rarity: i.card.rarity, image: !!i.card.image_url && !i.card.hide_image })));
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
  await Bun.sleep(900);
  await waitFor(`document.querySelector("#wm-host").shadowRoot.querySelector(".grid .card-btn")`);
  await Bun.sleep(1500); // the photo fades in
  const rect = await ev(() => { const r = document.querySelector("#wm-host").shadowRoot.querySelector(".grid .card-btn").getBoundingClientRect(); return { x: r.x, y: r.y, width: r.width, height: r.height }; });
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
const screen = async (name) => { await Bun.sleep(2500); await Bun.write(`${OUT}${name}.png`, await view.screenshot()); };
await go("/collection"); await screen("collection");
await ev(() => document.querySelector("#wm-host").shadowRoot.querySelector(".grid .card-btn").click()); await screen("card");
await go("/marketplace"); await screen("market");
await view.evaluate(prevOff ? `localStorage.setItem("wm-off", ${JSON.stringify(prevOff)})` : `localStorage.removeItem("wm-off")`);
await view.evaluate(`localStorage.removeItem("wm-debug")`);
await close();

const phone = await realSite({ width: 390, height: 844 });
// a fresh browser on the same profile: make sure the remaster is on before the shots
await phone.go("/pulls"); await phone.view.evaluate(`localStorage.removeItem("wm-off")`);
for (const [path, name] of [["/collection", "phone-collection"], ["/marketplace", "phone-market"], ["/pulls", "phone-packs"]]) {
  await phone.go(path); await Bun.sleep(3000);
  await Bun.write(`${OUT}${name}.png`, await phone.view.screenshot());
}
await phone.view.evaluate(`localStorage.removeItem("wm-debug")`);
await phone.close();
console.log(`${OUT}cards-before-after.png`, before.filter(Boolean).length, "/", picks.length, "originals found", errors.length ? `errors: ${errors.slice(0, 2).join(" / ")}` : "");
