// Every screen and the main actions on the test server, in Bun's own browser (WebKit), at desktop
// and phone sizes. A step fails when its action finds nothing, the page throws, or something
// sticks out sideways. Screenshots in /tmp/wm-sweep/.
//
//   bun run dev --port 5175 &   then   bun scripts/sweep.mjs [ONLY=social|market]
const BASE = process.env.WM_DEV || "http://localhost:5175";
const OUT = "/tmp/wm-sweep/";
const ONLY = process.env.ONLY;
await Bun.$`rm -rf ${OUT} && mkdir -p ${OUT}`;

const v = new Bun.WebView({ width: 1440, height: 900 });
const ev = (fn, ...args) => v.evaluate(`(${fn})(...${JSON.stringify(args)})`);

// page-side helpers, installed after each load: in the app's shadow root, click by selector and
// optional text, fill a field, the errors and the sideways spill
const HELPERS = () => {
  if (window.__t) return;
  window.__errs = [];
  addEventListener("error", (e) => { if (!/ResizeObserver loop/.test(e.message)) __errs.push(String(e.message)); });
  addEventListener("unhandledrejection", (e) => __errs.push("rejection: " + String(e.reason?.message ?? e.reason)));
  const root = () => document.querySelector("#wm-host")?.shadowRoot;
  const all = (sel, text) => [...(root()?.querySelectorAll(sel) ?? [])].filter((el) => el.getClientRects().length > 0 && (!text || new RegExp(text).test(el.textContent.trim())));
  window.__t = {
    has: (sel, text) => all(sel, text).length > 0,
    count: (sel) => all(sel).length,
    click: (sel, text, nth) => { const el = all(sel, text)[nth ?? 0]; if (!el) return false; el.click(); return true; },
    fill: (sel, value) => {
      const el = all(sel)[0]; if (!el) return false;
      el.value = value; el.dispatchEvent(new Event("input", { bubbles: true })); el.dispatchEvent(new Event("change", { bubbles: true })); return true;
    },
    key: (key) => { (root()?.activeElement ?? document.body).dispatchEvent(new KeyboardEvent("keydown", { key, bubbles: true, composed: true })); dispatchEvent(new KeyboardEvent("keydown", { key })); return true; },
    spill: () => {
      const w = innerWidth, out = [];
      if (document.scrollingElement.scrollWidth > w + 1) out.push(`page ${document.scrollingElement.scrollWidth}px wide`);
      for (const el of root()?.querySelectorAll("*") ?? []) {
        const r = el.getBoundingClientRect();
        if (!r.width || !r.height || getComputedStyle(el).position === "fixed") continue;
        let clipped = false;
        for (let a = el.parentElement; a; a = a.parentElement) if (/(auto|scroll|hidden|clip)/.test(getComputedStyle(a).overflowX)) { clipped = true; break; }
        if (!clipped && (r.right > w + 1 || r.left < -1)) out.push(`${el.tagName.toLowerCase()}.${[...el.classList].join(".")}`);
        if (out.length > 4) break;
      }
      return out;
    },
  };
};
const t = (name, ...args) => ev((n, a) => window.__t[n](...a), name, args);
async function go(path) {
  await v.navigate(BASE + path);
  for (let i = 0; i < 40 && !(await v.evaluate("!!document.querySelector('#wm-host')?.shadowRoot")); i++) await Bun.sleep(100);
  await ev(HELPERS);
  await Bun.sleep(1500);
}
async function until(fn, ms = 10000) {
  for (const end = Date.now() + ms; Date.now() < end; await Bun.sleep(150)) if (await fn()) return true;
  return false;
}
const post = (path, body) => fetch(BASE + path, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(body ?? {}) });
const click = (sel, text, nth) => t("click", sel, text, nth);
const wait = (sel, text, ms) => until(() => t("has", sel, text), ms);

const report = [];
let n = 0;
async function step(tag, name, fn) {
  let fail = null;
  try { if ((await fn()) === false) fail = "not found"; } catch (e) { fail = String(e.message).slice(0, 120); }
  await Bun.sleep(450);
  await ev(HELPERS); // a step may have navigated
  const spill = await t("spill").catch(() => ["spill check failed"]);
  const errs = await ev(() => window.__errs.splice(0)).catch(() => []);
  try { await Bun.write(`${OUT}${tag}-${String(n++).padStart(3, "0")}-${name}.png`, await v.screenshot()); } catch {}
  report.push({ tag, name, fail, spill, errs });
}

for (const [w, h, tag] of [[1440, 900, "d"], [390, 844, "m"]]) {
  await v.resize(w, h);
  await post("/api/__fault", { human: false });
  await post("/api/reset");
  await post("/api/__profile", { is_pro: true });
  await go("/pulls");
  await ev(() => { for (const k of Object.keys(localStorage)) if (k.startsWith("wm-cache:") || k === "wm-watches") localStorage.removeItem(k); });

  if (!ONLY) {
    await step(tag, "packs", () => wait(".pull-actions .btn.primary"));
    await step(tag, "pack-open", async () => (await click(".pull-actions .btn.primary")) && wait("button", "^Tout révéler$", 15000));
    await step(tag, "pack-all", async () => (await click("button", "^Tout révéler$")) && (await Bun.sleep(2600), wait(".rg-card")));
    await step(tag, "pack-done", () => click("button", "^Terminé$"));
    await go("/collection");
    await step(tag, "collection", () => wait(".grid .card-btn"));
    await step(tag, "coll-card", async () => (await click(".grid .card-btn")) && wait(".modal"));
    await step(tag, "coll-card-market", async () => (await click("[role=tab]", "^Marché$")) && wait(".mk-kpis, .modal-sum", null, 8000));
    await go("/global-collection");
    await step(tag, "catalog", () => wait(".grid .card-btn"));
    await go("/trades");
    await step(tag, "trades", () => wait("button[aria-label^='Échange avec']"));
    await step(tag, "trade", async () => (await click("button[aria-label^='Échange avec']")) && wait(".tp"));
  }

  if (!ONLY || ONLY === "market") {
    await go("/marketplace");
    await step(tag, "market", async () => (await wait(".auc-item")) && wait(".auc-gap", null, 12000));
    await step(tag, "deals", async () => (await click(".tabs button", "Affaires")) && (await wait(".deal-status", "vues", 8000)) && until(async () => (await t("count", ".auc-item")) > 0, 30000));
    await step(tag, "deals-strict", async () => (await click(".deal-caps button", "-50 %")) && (await Bun.sleep(400), (await t("has", ".auc-item")) || wait(".empty", "Aucune vente")));
    await step(tag, "deals-back", () => click(".tabs button", "Toutes les ventes"));
    // alerts, end to end: a watch, another player lists a matching card, the app alerts and opens it
    await step(tag, "alert-create", async () => { await t("fill", ".coll-head input", "Colmar"); await Bun.sleep(1200); return (await click(".watch-btn")) && (await wait(".modal.watch")) && (await click(".watch-form .btn.primary")) && (await wait(".watch-list li", "Colmar")) && click(".modal.watch .modal-close"); });
    await step(tag, "alert-toast", async () => { await post("/api/__auction", { q: "Colmar" }); await go("/marketplace"); return wait(".toast", "Alerte", 40000); });
    await step(tag, "alert-open", async () => (await click(".toast")) && wait(".auc", "Colmar", 10000));
    await ev(() => localStorage.removeItem("wm-watches"));
  }

  if (!ONLY || ONLY === "social") {
    await go("/friends");
    await step(tag, "friends", async () => (await wait(".fr-item")) && (w <= 900 || t("has", ".nav-count", "1")));
    await step(tag, "friends-find", async () => (await t("fill", ".fr-side-search input", "ka")) && wait(".fr-req", "Kami", 6000));
    await step(tag, "friends-add", async () => (await click(".fr-req .fr-btn", "Ajouter")) && wait(".fr-req small", "Demande envoyée"));
    await step(tag, "friends-accept", async () => (await t("fill", ".fr-side-search input", "")) && (await wait(".fr-reqs .fr-act.yes")) && (await click(".fr-reqs .fr-act.yes")) && (await until(async () => !(await t("has", ".fr-reqs")))) && wait(".coll-head .meta", "304 amis"));
    await step(tag, "friends-detail", async () => (await click(".fr-item")) && (await wait(".fr-offer, .fr-box .fr-hint", null, 8000)) && wait(".fr-cards .pf-place, .fr-box .fr-hint", null, 8000));
    await step(tag, "friends-offer", async () => (await click(".fr-offer")) && wait(".tr-row.flash", null, 10000));
    await go("/friends");
    await step(tag, "friends-chat", async () => (await wait(".fr-item")) && (w > 900 || (await click(".fr-item"))) && (await click(".fr-id-acts .btn", "Écrire")) && wait(".fr-chat .chat"));
    await step(tag, "player", async () => (await click(".fr-chat .modal-close")) && (await click(".fr-id-acts .btn", "Profil")) && (await wait(".pf-hero h1", "Alix")) && wait(".pf-places .pf-place", null, 8000));
    await step(tag, "player-private", async () => { await go("/profile/Elsa"); return (await wait(".pf-private", null, 8000)) && wait(".pf-acts .btn", "Ajouter en ami"); });
    await go("/achievements");
    await step(tag, "achievements", () => wait(".ach"));
    await step(tag, "achievements-human", async () => (await click("[role=tab]", "À réclamer")) && (await post("/api/__fault", { human: true })) && (await click(".ach-claim")) && wait(".hc"));
    await step(tag, "achievements-human-cancel", async () => (await t("key", "Escape")) && (await post("/api/__fault", { human: false })) && wait(".ach-note.bad", "annulée"));
    await step(tag, "achievements-claim-all", async () => (await click(".ach-all")) && wait(".ach-note", "WikiBidous reçus"));
    // kept between visits: with the server 4 s late, the screen still shows at once
    await step(tag, "achievements-kept", async () => { await post("/api/__fault", { delay: 4000, match: "/api/" }); await v.navigate(BASE + "/achievements"); await ev(HELPERS); const ok = await wait(".ach", null, 1500); await post("/api/__fault", {}); return ok; });
    await go("/profile");
    await step(tag, "profile", () => wait(".pf-hero"));
    await step(tag, "profile-public-view", async () => (await click(".pf-public")) && (await wait(".pf-own")) && (await click(".pf-own .link-btn")) && wait(".pf-avatar"));
    await step(tag, "profile-pick", async () => (await click(".pf-empty")) && wait(".pf-pick .card-btn"));
    await step(tag, "profile-place", async () => (await click(".pf-pick .card-btn")) && wait(".pf-place"));
  }

  // the chrome: notifications, and on a phone the tab bar (the five main screens) and the menu
  await step(tag, "notifications", () => click("button[aria-label*='otification']"));
  if (w <= 900) {
    await step(tag, "tabbar", async () => (await ev(() => [...document.querySelector("#wm-host").shadowRoot.querySelectorAll(".nav>button")].filter((b) => b.getClientRects().length).length)) === 5);
    await step(tag, "menu", async () => (await t("key", "Escape")) && click(".menu-btn"));
  }
}
v.close?.();

const bad = report.filter((r) => r.fail || r.spill.length || r.errs.length);
console.log(bad.length ? bad.map((r) => `${r.tag} ${r.name}: ${r.fail ?? ""} ${r.spill.join("; ")} ${r.errs.join("; ")}`).join("\n") : "clean");
console.log(`${report.length} steps, ${report.length - bad.length} clean (screenshots in ${OUT})`);
process.exit(bad.length ? 1 : 0);
