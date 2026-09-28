// Prod test: runs the LOCAL build on the real wiki-masters.com inside YOUR logged-in Brave.
//
//   bun run build && bun run test:prod                   every read-only check (safe)
//   bun run test:prod --show                             same, in a visible browser
//   bun run test:prod --only=estimate,market             just these features
//   bun run test:prod --write=discard,sell,bid,notif     also run these writes
//
// Session: a dedicated browser profile in .prod-profile/ (gitignored), separate from your
// everyday browser. Log in once with `bun run test:prod:login`, then every run reuses it.
// --attach instead attaches to your running Brave (remote debugging on).
// WM_BROWSER overrides the browser binary (default: brave, then chromium/chrome on PATH).
//
// Features (--only):  routing profile collection catalog market estimate notifs ui
// Writes (--write), against your real account, kept small:
//   pack      open one pack (spends a pack)
//   discard   discard one common (+1 WikiBidou)
//   sell      list a common at 40 for 1 h, then cancel it (card comes back)
//   bid       minimum bid on the cheapest auction under 50 (held from the balance)
//   notif     mark the newest unread notification read

const SITE = "https://www.wiki-masters.com";
const DIST = await Bun.file(new URL("../dist/wikimasters-app.user.js", import.meta.url)).text();
const OUT = new URL("../.prod-test/", import.meta.url).pathname;
const flag = (name) => new Set((process.argv.find((a) => a.startsWith(`--${name}=`)) || "").split("=")[1]?.split(",").filter(Boolean) || []);
const ONLY = flag("only");
const WRITES = flag("write");
const on = (f) => !ONLY.size || ONLY.has(f);

// --- browser ------------------------------------------------------------------------
const PROFILE = new URL("../.prod-profile", import.meta.url).pathname;
const BROWSER = process.env.WM_BROWSER || ["brave", "chromium", "google-chrome-stable"].map((b) => Bun.which(b)).find(Boolean);
// Same cookie encryption in the visible login browser and the headless runs.
const STORE = "--password-store=basic";

if (process.argv.includes("--login")) {
  console.log("Log in to wiki-masters in the window that opened, then close it.");
  await Bun.spawn([BROWSER, `--user-data-dir=${PROFILE}`, STORE, "--no-first-run", "--no-default-browser-check", `${SITE}/pulls`]).exited;
  process.exit(0);
}

// --show: launch a visible browser on the profile ourselves and attach to it over CDP.
let shown = null; // the visible browser process, closed at the end so the profile unlocks
async function visibleBrowser() {
  const portFile = `${PROFILE}/DevToolsActivePort`;
  await Bun.file(portFile).delete().catch(() => {});
  shown = Bun.spawn([BROWSER, `--user-data-dir=${PROFILE}`, STORE, "--remote-debugging-port=0", "--no-first-run", "--no-default-browser-check", "--window-size=1400,950"]);
  for (let i = 0; i < 100 && !(await Bun.file(portFile).exists()); i++) await Bun.sleep(100);
  const [port, path] = (await Bun.file(portFile).text()).split("\n");
  return { type: "chrome", url: `ws://127.0.0.1:${port}${path}` };
}
const SHOW = process.argv.includes("--show");
const backend = process.argv.includes("--attach") ? undefined
  : SHOW ? await visibleBrowser()
  : { type: "chrome", path: BROWSER, argv: [STORE] };

const errors = [];
const view = new Bun.WebView({
  width: 1400, height: 900,
  ...(backend && { backend }),
  ...(backend && !SHOW && { dataStore: { directory: PROFILE } }),
  console: (type, ...args) => {
    const s = args.map((a) => a?.value ?? a?.description ?? "").join(" ");
    if (s.includes("[wiki-remaster]") || type === "error") errors.push(`${type}: ${s}`.slice(0, 200));
  },
});
await view.navigate("about:blank"); // opens the CDP session
await view.cdp("Runtime.enable");
view.addEventListener("Runtime.exceptionThrown", (e) => errors.push("exception: " + (e.data.exceptionDetails.exception?.description || e.data.exceptionDetails.text).split("\n")[0]));
// Mark the harness copy, then inject the local build at document-start (like Tampermonkey).
await view.cdp("Page.addScriptToEvaluateOnNewDocument", {
  source: `try{localStorage.setItem("wm-debug","1")}catch{};window.__wmLocal=!window.__wmMounted;\n${DIST}`,
});

// --- helpers -----------------------------------------------------------------------
const results = [];
function assert(ok, msg) { if (!ok) throw new Error(msg); }
async function check(name, fn) {
  if (SHOW) console.log("  ..", name); // live progress while you watch
  const limit = Bun.sleep(60000).then(() => { throw new Error("timed out after 60 s"); });
  try { results.push(["PASS", name, (await Promise.race([fn(), limit])) ?? ""]); }
  catch (e) { results.push(["FAIL", name, String(e.message).split("\n")[0]]); }
}
// Run a self-contained page-side function with one JSON argument.
const ev = (fn, arg) => view.evaluate(`(${fn})(${JSON.stringify(arg ?? null)})`);
async function waitFor(expr, ms = 15000) {
  for (const end = Date.now() + ms; Date.now() < end; await Bun.sleep(250)) if (await view.evaluate(`!!(${expr})`).catch(() => false)) return;
  throw new Error(`timeout waiting for ${expr}`);
}
async function go(path) { await view.navigate(SITE + path); await waitFor("window.__wm"); }
const waitCapture = () => waitFor("window.__wm.data.userId").catch(() => {});
const shot = async (name) => Bun.write(`${OUT}${name}.png`, await view.screenshot());
const $ = (sel) => `document.querySelector("#wm-host")?.shadowRoot?.querySelector(${JSON.stringify(sel)})`;
const $$ = (sel) => `[...(document.querySelector("#wm-host")?.shadowRoot?.querySelectorAll(${JSON.stringify(sel)}) || [])]`;

// --- preflight: logged in, and it is OUR build running --------------------------------
await go("/pulls");
if (!(await view.evaluate(`fetch("/api/my-collection?page=0").then((r) => r.ok)`))) {
  console.error("Not logged in. Run `bun run test:prod:login`, log in, close the window, rerun.");
  process.exit(2);
}
if (!(await view.evaluate("window.__wmLocal"))) {
  console.error("An installed wiki-remaster ran before the local build. Disable it in Tampermonkey for this run.");
  process.exit(2);
}
const prevOff = await view.evaluate(`localStorage.getItem("wm-off")`);
await view.evaluate(`localStorage.removeItem("wm-off")`);

// --- routing ---------------------------------------------------------------------------
if (on("routing")) {
  for (const p of ["/pulls", "/collection", "/global-collection", "/marketplace"]) {
    await check(`overlay mounts on ${p}`, async () => {
      await go(p);
      await waitFor($(".app"));
      await Bun.sleep(2500); // let data land before the screenshot
      await shot(p.slice(1));
    });
  }
  await check("non-core route falls back to the native site", async () => {
    await view.navigate(SITE + "/leaderboard");
    await Bun.sleep(1500);
    assert(!(await view.evaluate(`!!document.querySelector("#wm-host")`)), "overlay mounted on /leaderboard");
  });
}

// --- profile ---------------------------------------------------------------------------
if (on("profile")) {
  await go("/pulls");
  await waitCapture();
  await check("captures user id from Supabase traffic", async () => {
    const id = await view.evaluate("window.__wm.data.userId");
    assert(/^[0-9a-f-]{36}$/i.test(id || ""), `userId=${id}`);
  });
  await check("profile: packs + currency are numbers", async () => {
    // Like the UI: packs arrive once the app's Supabase auth headers have been captured.
    await waitFor("window.__wm.data.profile().then((p) => p.packs_remaining != null)").catch(() => {});
    const p = await ev(() => window.__wm.data.profile());
    assert(Number.isInteger(p.packs_remaining), `packs_remaining=${p.packs_remaining}`);
    assert(typeof p.currency === "number", `currency=${p.currency}`);
    return `packs ${p.packs_remaining}/${p.pack_cap}, ${p.currency} pts, pro=${p.is_pro}, next regen ${p.next_regen_seconds}s`;
  });
  await check("refreshProfile works off /pulls (Supabase replay)", async () => {
    await go("/collection");
    await waitCapture();
    const p = await ev(async () => { await window.__wm.refreshProfile(); return window.__wm.data.profile(); });
    assert(Number.isInteger(p.packs_remaining), `packs_remaining=${p.packs_remaining} on /collection`);
  });
}

// --- collection (also feeds estimate + writes) -----------------------------------------
let coll = null;
if (on("collection") || on("estimate") || WRITES.size) {
  await check("collection: every page loads, no broken rows", async () => {
    coll = await ev(async () => {
      const d = await window.__wm.data.collection();
      return {
        items: d.items.map((i) => ({ id: i.id, cardId: i.card.id, rarity: i.card.rarity, title: i.card.title, count: i.count })),
        stats: d.stats,
      };
    });
    const { items, stats } = coll;
    const sum = Object.values(stats.counts).reduce((a, b) => a + b, 0);
    assert(items.length > 0, "empty collection");
    // The server's order can shift while paging (cards gained mid-load), so allow a small gap.
    assert(Math.abs(items.length - stats.unique) <= 5, `loaded ${items.length} rows but total=${stats.unique} (a page failed silently)`);
    assert(new Set(items.map((i) => i.id)).size === items.length, "duplicate rows across pages");
    assert(items.every((i) => i.cardId && i.rarity && i.title), "row missing id/rarity/title");
    assert(sum === stats.unique, `rarityCounts sum ${sum} != unique ${stats.unique}`);
    return `${items.length} unique, ${stats.total} copies`;
  });
}

// --- catalog ---------------------------------------------------------------------------
const cat = (o) => ev((o) => window.__wm.data.catalog(o), o);
if (on("catalog")) {
  await check("catalog: page 0 and page 1 are distinct", async () => {
    const [a, b] = [await cat({ page: 0 }), await cat({ page: 1 })];
    assert(a.cards.length > 0, "no cards");
    const ids = new Set(a.cards.map((c) => c.id));
    assert(!b.cards.some((c) => ids.has(c.id)), "page 1 overlaps page 0");
    return `${a.cards.length}/page, total ${a.total}`;
  });
  await check("catalog: search q returns matches", async () => {
    const d = await cat({ q: "Paris" });
    assert(d.cards.length > 0, "no results for Paris");
    return `${d.cards.length} results, hasMore=${d.hasMore}`;
  });
  for (const r of ["L", "C"]) {
    await check(`catalog: rarity=${r} filter is honoured`, async () => {
      const d = await cat({ rarity: r });
      const off = d.cards.filter((c) => c.rarity !== r).length;
      assert(d.cards.length && !off, `${off}/${d.cards.length} cards not ${r}`);
    });
  }
  for (const [sort, key, dir] of [["name", "title", 1], ["atk", "atk", -1], ["def", "def", -1]]) {
    await check(`catalog: sort=${sort} is applied server-side`, async () => {
      const v = (await cat({ sort })).cards.map((c) => c[key]);
      const cmp = (x, y) => (typeof x === "string" ? x.localeCompare(y, "fr") : x - y) * dir;
      const bad = v.slice(1).filter((x, i) => cmp(v[i], x) > 0).length;
      assert(bad === 0, `${bad} out-of-order pairs (sort ignored?) first: ${v.slice(0, 3).join(" | ")}`);
    });
  }
  await check("catalog: wishlist filter returns only wishlisted", async () => {
    const d = await cat({ wishlist: true });
    assert(d.cards.every((c) => c.wishlisted), "non-wishlisted card in wishlist view");
    return `${d.cards.length} wishlisted`;
  });
}

// --- marketplace -----------------------------------------------------------------------
let auctions = [];
if (on("market") || WRITES.has("bid")) {
  await check("marketplace: auctions parse", async () => {
    const d = await ev(() => window.__wm.data.marketplace({ page: 0 }));
    auctions = d.auctions;
    assert(auctions.length > 0, "no auctions");
    const bad = auctions.filter((a) => typeof a.price !== "number" || isNaN(Date.parse(a.endAt)) || !a.card.rarity);
    assert(!bad.length, `${bad.length} auctions with missing price/endAt/rarity`);
    return `${auctions.length} auctions, hasMore=${d.hasMore}`;
  });
}
if (on("market")) {
  await check("marketplace: rarity filter is honoured", async () => {
    const d = await ev(() => window.__wm.data.marketplace({ rarity: "SR" }));
    const off = d.auctions.filter((a) => a.card.rarity !== "SR").length;
    assert(!off, `${off}/${d.auctions.length} not SR`);
  });
  await check("marketplace: pages do not overlap (server pages are 1-based)", async () => {
    const [a, b] = [await ev(() => window.__wm.data.marketplace({ page: 0 })), await ev(() => window.__wm.data.marketplace({ page: 1 }))];
    const ids = new Set(a.auctions.map((x) => x.id));
    // A few repeats are live listings shifting between the two requests; a 1-based/0-based
    // mix-up would repeat the whole page.
    const overlap = b.auctions.filter((x) => ids.has(x.id)).length;
    assert(overlap < a.auctions.length / 2, `page 1 repeats ${overlap}/${a.auctions.length} of page 0`);
    return overlap ? `${overlap} shifted by new listings` : "";
  });
  for (const [sort, dir] of [["price_asc", 1], ["price_desc", -1]]) {
    await check(`marketplace: sort=${sort} is applied`, async () => {
      const v = (await ev((sort) => window.__wm.data.marketplace({ sort }), sort)).auctions.map((a) => a.price);
      const bad = v.slice(1).filter((x, i) => (x - v[i]) * dir < 0).length;
      assert(bad === 0, `${bad} out-of-order: ${v.slice(0, 5).join(",")}`);
    });
  }
  await check("my market: selling / bidding / won / history", async () => {
    const m = await ev(() => window.__wm.data.myMarket());
    assert(["selling", "bidding", "won", "history"].every((k) => Array.isArray(m[k])) && Number.isInteger(m.max), JSON.stringify(m).slice(0, 120));
    return `selling ${m.selling.length}/${m.max}, bidding ${m.bidding.length}, won ${m.won.length}, history ${m.history.length}`;
  });
  await check("auction detail: live state + bids", async () => {
    const pick = auctions.find((x) => Date.parse(x.endAt) > Date.now() + 120000); // not about to close
    assert(pick, "no auction to open");
    const a = await ev((id) => window.__wm.data.auction(id), pick.id);
    assert(a.id === pick.id && Array.isArray(a.bids), "bad detail");
    return `${a.bids.length} bids, price ${a.price}`;
  });
}

// --- market estimate -------------------------------------------------------------------
// The value badge reads summary[card.rarity].average. Per-card, or one number per rarity
// tier? If every sampled card of a tier gets the same value, "sort by value" is meaningless.
if (on("estimate")) {
  await check("market estimate: per-card, not per-rarity", async () => {
    assert(coll, "collection did not load");
    const sample = ["C", "PC", "R", "SR", "UR", "L"].flatMap((r) => coll.items.filter((i) => i.rarity === r).slice(0, 3));
    const rows = await ev(async (cards) => Promise.all(cards.map(async (c) => {
      const raw = await fetch(`/api/marketplace/cards/${c.cardId}/sales?scope=summary`).then((r) => r.json()).catch(() => null);
      const v = await window.__wm.marketValueFor({ id: c.cardId, rarity: c.rarity });
      return { ...c, v, raw: JSON.stringify(raw?.summary ?? raw).slice(0, 90) };
    })), sample);
    for (const r of rows) console.log(`    ${r.rarity.padEnd(2)} ${String(r.v).padStart(8)}  ${r.title.slice(0, 28).padEnd(28)} ${r.raw}`);
    const byTier = {};
    for (const r of rows) if (typeof r.v === "number") (byTier[r.rarity] ||= []).push(r.v);
    const flat = Object.entries(byTier).filter(([, vs]) => vs.length > 1 && new Set(vs).size === 1).map(([r]) => r);
    assert(!flat.length, `identical values within tier ${flat.join(",")}, looks per-rarity`);
    return `${rows.filter((r) => typeof r.v === "number").length}/${rows.length} cards priced`;
  });
}

// --- notifications + special pack --------------------------------------------------------
if (on("notifs")) {
  await check("notifications parse", async () => {
    const n = await ev(() => window.__wm.data.notifications());
    assert(Array.isArray(n) && n.every((x) => x.id && x.title), "bad notification row");
    return `${n.length} (${n.filter((x) => !x.read).length} unread)`;
  });
  await check("special pack probe does not throw", async () => String(await ev(() => window.__wm.data.specialAvailable())));
}

// --- UI smoke (inside the shadow root) ----------------------------------------------------
if (on("ui")) {
  await check("UI: collection grid renders and value badges appear", async () => {
    await go("/collection");
    await waitFor($(".card-btn"), 20000);
    await waitFor($(".wc-val"), 20000);
    return `${await view.evaluate(`${$$(".card-btn")}.length`)} cards, ${await view.evaluate(`${$$(".wc-val")}.length`)} badges`;
  });
  await check("UI: card modal opens with market tab", async () => {
    await view.evaluate(`${$(".card-btn")}.click()`);
    await waitFor($(".modal"));
    await view.evaluate(`${$$('[role="tab"]')}.find((t) => t.textContent.includes("Marché")).click()`);
    await Bun.sleep(2000);
    await shot("card-modal");
    await view.press("Escape");
  });
  await check("UI: auction modal opens", async () => {
    await go("/marketplace");
    await waitFor($(".auc-item .card-btn"));
    await view.evaluate(`${$(".auc-item .card-btn")}.click()`);
    await waitFor($(".auc"));
    await Bun.sleep(1500);
    await shot("auction-modal");
    await view.press("Escape");
  });
}

// --- writes (opt-in) ----------------------------------------------------------------------
const common = () => coll?.items.find((i) => i.rarity === "C");
const profile = () => ev(() => window.__wm.data.profile());
const myMarket = () => ev(() => window.__wm.data.myMarket());

if (WRITES.has("pack")) await check("WRITE open one pack", async () => {
  await go("/pulls"); await waitCapture();
  const before = (await profile()).packs_remaining;
  assert(before > 0, "no packs left");
  const d = await ev(() => window.__wm.data.openPack());
  assert(d.cards.length === 5, `${d.cards.length} cards`);
  assert(d.packs_remaining === before - 1, `packs ${before} -> ${d.packs_remaining}`);
  return d.cards.map((c) => `${c.rarity}${c.is_new ? "*" : ""} ${c.title}`).join(", ");
});

if (WRITES.has("discard")) await check("WRITE discard one common", async () => {
  const it = common(); assert(it, "no common");
  const bal0 = (await profile()).currency;
  const d = await ev((id) => window.__wm.data.discard(id), it.id);
  assert(d.balance === bal0 + 1, `balance ${bal0} -> ${d.balance}`);
  coll.items = coll.items.filter((x) => x.id !== it.id);
  return `${it.title}, balance ${bal0} -> ${d.balance}`;
});

if (WRITES.has("sell")) await check("WRITE list a common at 40, then cancel", async () => {
  const it = common(); assert(it, "no common");
  const r = await ev((it) => window.__wm.data.createAuction(it, { price: 40, durationHours: 1 }), it);
  assert(r.auction_id, JSON.stringify(r));
  const listed = (await myMarket()).selling.find((a) => a.id === r.auction_id);
  assert(listed?.base === 40, "listing not in my market");
  const early = await ev((id) => window.__wm.data.reprice(id, 30).then(() => "ok", (e) => e.message), r.auction_id);
  const c = await ev((id) => window.__wm.data.cancelAuction(id), r.auction_id);
  assert(c.status === "cancelled", JSON.stringify(c));
  const back = await ev(async (title) => (await window.__wm.data.collection()).items.some((i) => i.card.title === title), it.title);
  assert(back, "card did not come back after cancel");
  return `${it.title}: listed, early reprice -> "${early}", cancelled, card back`;
});

if (WRITES.has("bid")) await check("WRITE minimum bid on the cheapest auction under 50", async () => {
  const list = (await ev(() => window.__wm.data.marketplace({ sort: "price_asc" }))).auctions;
  const a = list.find((x) => !x.owned && x.price < 49 && Date.parse(x.endAt) > Date.now() + 120000);
  assert(a, "no auction under 50");
  const min = a.bid != null ? a.bid + 1 : a.base;
  const tooLow = await ev(([id]) => window.__wm.data.placeBid(id, 1).then(() => null, (e) => e.code + " min " + e.min), [a.id]);
  const d = await ev(([id, amt]) => window.__wm.data.placeBid(id, amt), [a.id, min]);
  assert(d.current_bid === min, JSON.stringify(d));
  assert((await myMarket()).bidding.some((x) => x.id === a.id), "not in my bidding list");
  return `${a.card.title} @ ${min} (too low: ${tooLow}), balance ${d.bidder_balance}`;
});

if (WRITES.has("notif")) await check("WRITE mark one notification read", async () => {
  const n = (await ev(() => window.__wm.data.notifications())).find((x) => !x.read);
  if (!n) return "nothing unread";
  await ev((id) => window.__wm.data.markRead([id]), n.id);
  const after = (await ev(() => window.__wm.data.notifications())).find((x) => x.id === n.id);
  assert(after.read, "still unread");
  return n.title;
});

// --- report ------------------------------------------------------------------------------
await check("no runtime errors or drift warnings", async () => assert(!errors.length, errors.slice(0, 3).join(" / ")));
if (prevOff) await view.evaluate(`localStorage.setItem("wm-off", ${JSON.stringify(prevOff)})`);
await view.evaluate(`localStorage.removeItem("wm-debug")`);
view.close();
shown?.kill();

console.log("");
for (const [s, n, note] of results) console.log(`${s === "PASS" ? "ok  " : "FAIL"}  ${n}${note ? `  (${note})` : ""}`);
const failed = results.filter((r) => r[0] === "FAIL").length;
console.log(`\n${results.length - failed}/${results.length} passed. Screenshots: ${OUT}`);
process.exit(failed ? 1 : 0);
