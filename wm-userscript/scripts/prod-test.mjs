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
// Features (--only):  routing profile collection catalog market estimate notifs trades assumptions contract ui
// contract: records the shape of every endpoint the app reads into
// docs/api-shapes.json and fails when a field disappears or changes type; --update-shapes
// accepts the live shapes after a review.
// Writes (--write), against your real account, kept small:
//   pack      open one pack (spends a pack)
//   discard   discard one common (+1 WikiBidou)
//   sell      list a common at 40 for 1 h, then cancel it (card comes back)
//   bid       minimum bid on the cheapest auction under 50 (held from the balance)
//   notif     mark the newest unread notification read

import { realSite, login, SITE } from "./real-site.mjs";

const OUT = new URL("../.prod-test/", import.meta.url).pathname;
const flag = (name) => new Set((process.argv.find((a) => a.startsWith(`--${name}=`)) || "").split("=")[1]?.split(",").filter(Boolean) || []);
const ONLY = flag("only");
const WRITES = flag("write");
const on = (f) => !ONLY.size || ONLY.has(f);

if (process.argv.includes("--login")) { await login(); process.exit(0); }

// --- browser (scripts/real-site.mjs): the logged-in profile, the local build injected -----
const SHOW = process.argv.includes("--show");
const errors = [];
const { view, ev, waitFor, go, preflight, close } = await realSite({ show: SHOW, attach: process.argv.includes("--attach"), onError: (e) => errors.push(e) });

// --- helpers -----------------------------------------------------------------------
const results = [];
function assert(ok, msg) { if (!ok) throw new Error(msg); }
async function check(name, fn) {
  if (SHOW) console.log("  ..", name); // live progress while you watch
  const run = fn();
  const limit = Bun.sleep(60000).then(() => { throw new Error("timed out after 60 s"); });
  try { results.push(["PASS", name, (await Promise.race([run, limit])) ?? ""]); }
  catch (e) {
    results.push(["FAIL", name, String(e.message)]);
    // a timed-out check may still hold the page (one evaluate at a time): let it finish first
    await Promise.race([run.catch(() => {}), Bun.sleep(30000)]);
  }
}
const waitCapture = () => waitFor("window.__wm.data.userId").catch(() => {});
const shot = async (name) => Bun.write(`${OUT}${name}.png`, await view.screenshot());
const $ = (sel) => `document.querySelector("#wm-host")?.shadowRoot?.querySelector(${JSON.stringify(sel)})`;
const $$ = (sel) => `[...(document.querySelector("#wm-host")?.shadowRoot?.querySelectorAll(${JSON.stringify(sel)}) || [])]`;

// --- preflight: logged in, and it is OUR build running --------------------------------
const stop = await preflight();
if (stop) { console.error(stop); await close(); process.exit(2); }
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
  await check("collection: the first page and one page per rarity load, no broken rows", async () => {
    // what the app reads: a page at a time (myCards), never the whole collection
    coll = await ev(async () => {
      const first = await window.__wm.data.myCards({ page: 0 });
      const byRarity = [];
      for (const rarity of ["L", "UR", "SR", "R", "PC", "C"]) { await new Promise((r) => setTimeout(r, 600)); byRarity.push(...(await window.__wm.data.myCards({ rarity })).items); }
      const row = (i) => ({ id: i.id, cardId: i.card.id, rarity: i.card.rarity, title: i.card.title, count: i.count });
      return { first: first.items.map(row), total: first.total, counts: first.counts, items: byRarity.map(row) };
    });
    const { first, total, counts, items } = coll;
    const sum = Object.values(counts).reduce((a, b) => a + b, 0);
    assert(first.length > 0, "empty collection");
    assert(Number.isInteger(total) && sum === total, `rarityCounts sum ${sum} != total ${total}`);
    assert(new Set(first.map((i) => i.id)).size === first.length, "duplicate rows in a page");
    assert([...first, ...items].every((i) => i.cardId && i.rarity && i.title), "row missing id/rarity/title");
    return `${total} copies, first page ${first.length} rows, ${items.length} rows across the rarities`;
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
    if (overlap >= a.auctions.length / 2) {
      // say what the server does with page numbers, to tell a paging change from churn
      const pages = [];
      for (const n of [0, 1, 2, 3]) { pages.push((await raw(`/api/marketplace?page=${n}&limit=50`)).body); await Bun.sleep(600); }
      const same = (x, y) => (y?.auctions || []).filter((a) => new Set((x?.auctions || []).map((z) => z.id)).has(a.id)).length;
      throw new Error(`page 1 repeats ${overlap}/${a.auctions.length} of page 0; raw server pages ${pages.map((p, i) => `?page=${i} -> echo ${p?.page} (${p?.auctions?.length} rows, shares ${i ? same(pages[i - 1], p) : "-"} with the previous)`).join("; ")}`);
    }
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
    // from the pack screen, so the collection grid's own value loads do not queue ahead in the
    // shared lane; one card per tier, through the app's own paced marketValueFor
    await go("/pulls");
    const sample = ["C", "PC", "R", "SR", "UR", "L"].flatMap((r) => coll.items.filter((i) => i.rarity === r).slice(0, 2));
    const rows = await ev(async (cards) => {
      const out = [];
      for (const c of cards) out.push({ ...c, v: await window.__wm.marketValueFor({ id: c.cardId, rarity: c.rarity }) });
      return out;
    }, sample);
    for (const r of rows) console.log(`    ${r.rarity.padEnd(2)} ${String(r.v).padStart(8)}  ${r.title.slice(0, 28)}`);
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
  await check("special packs probe does not throw", async () => JSON.stringify(await ev(() => window.__wm.data.specialPacks())));
}

// --- trades, friends, chat (read-only: raw shapes the Échanges screen relies on) ------------
// Fetched raw, like the native client, so a renamed field fails here rather than as a blank screen.
const raw = (path) => ev((path) => fetch(path).then(async (r) => ({ status: r.status, body: await r.json().catch(() => null) })), path);
const isStr = (v) => typeof v === "string" && v.length > 0;
const isId = (v) => v != null && v !== "";
const isParty = (p) => p && isId(p.id) && isStr(p.username);
if (on("trades")) {
  await check("trades: GET /api/trades shape", async () => {
    const { status, body } = await raw("/api/trades");
    assert(status === 200 && Array.isArray(body?.trades), `status ${status}, keys ${Object.keys(body || {})}`);
    const bad = body.trades.filter((t) => !isId(t.id) || !isStr(t.status) || !Array.isArray(t.items)
      || !isId(t.initiator_id) || !isId(t.recipient_id) || !isParty(t.initiator) || !isParty(t.recipient)
      || isNaN(Date.parse(t.updated_at || t.created_at)));
    assert(!bad.length, `${bad.length} trades missing id/status/items/parties/dates, first ${String(JSON.stringify(bad[0])).slice(0, 120)}`);
    const items = body.trades.flatMap((t) => t.items);
    const badItem = items.filter((i) => !isId(i.user_card_id) || !isId(i.offered_by) || !i.card?.id || !i.card?.rarity);
    assert(!badItem.length, `${badItem.length} items missing user_card_id/offered_by/card, first ${String(JSON.stringify(badItem[0])).slice(0, 120)}`);
    const by = Object.groupBy(body.trades, (t) => t.status);
    return Object.entries(by).map(([k, v]) => `${k} ${v.length}`).join(", ") || "no trades";
  });
  let friend = null;
  await check("trades: GET /api/friends shape", async () => {
    const { status, body } = await raw("/api/friends");
    assert(status === 200 && Array.isArray(body?.friendships), `status ${status}, keys ${Object.keys(body || {})}`);
    const bad = body.friendships.filter((f) => !isStr(f.status) || !isParty(f.requester) || !isParty(f.addressee));
    assert(!bad.length, `${bad.length} friendships missing status/requester/addressee`);
    const me = await view.evaluate("window.__wm.data.userId");
    const f = body.friendships.find((f) => f.status === "accepted");
    friend = f && (f.requester.id === me ? f.addressee : f.requester);
    return `${body.friendships.length} friendships, first friend ${friend?.username ?? "none"}`;
  });
  await check("trades: GET /api/profile/<friend>/collection?page=0 shape", async () => {
    if (!friend) return "no friend to read";
    const { status, body } = await raw(`/api/profile/${encodeURIComponent(friend.username)}/collection?page=0`);
    const rows = body?.collection; // the field the app reads
    assert(status === 200 && Array.isArray(rows), `status ${status}, keys ${Object.keys(body || {})}`);
    const bad = rows.filter((r) => !isId(r.id) || !r.card?.id || !r.card?.rarity);
    assert(!bad.length, `${bad.length} rows missing id/card`);
    assert(Array.isArray(body.pendingTradeCardIds ?? []), "pendingTradeCardIds is not a list");
    return `${rows.length} rows, profileId ${body.profileId ? "present" : "missing"}`;
  });
  await check("trades: friend collection is searched, filtered and sorted by the server", async () => {
    // the trade picker sends these instead of filtering loaded pages (CardPicker onquery)
    if (!friend) return "no friend to read";
    const base = `/api/profile/${encodeURIComponent(friend.username)}/collection?page=0`;
    const get = async (q) => { const r = await raw(base + q); await Bun.sleep(600); assert(r.status === 200, `${q}: status ${r.status}`); return r.body.collection; };
    const all = await get("");
    const word = all[0]?.card?.wikipedia_title?.split(/\s+/)[0];
    const pc = await get("&rarity=PC");
    assert(pc.every((r) => r.card.rarity === "PC"), "rarity=PC returned other rarities");
    const two = await get("&rarity=PC&rarity=C");
    assert(two.every((r) => ["PC", "C"].includes(r.card.rarity)), "repeated rarity not honoured");
    const found = word ? await get(`&q=${encodeURIComponent(word)}`) : [];
    assert(!word || found.some((r) => r.card.wikipedia_title.includes(word)), `q=${word} did not find its own card`);
    const named = await get("&sort=name");
    assert(named.length && named.map((r) => r.card.id).join() !== all.map((r) => r.card.id).join(), "sort=name kept the rarity order");
    const added = (await get("&sort=added")).map((r) => r.obtained_at);
    assert(added.every((t, i) => !i || added[i - 1] >= t), "sort=added is not newest first");
    return `rarity=PC ${pc.length}, PC+C ${two.length}, q=${word} ${found.length}, sort=name first ${named[0]?.card.wikipedia_title}, sort=added newest first`;
  });
  await check("collection: my collection is searched, filtered and ordered by the server", async () => {
    // the collection screen and my side of the trade picker ask these (myCards), page by page
    const get = async (q) => { const r = await raw(`/api/my-collection?page=0${q}`); await Bun.sleep(600); assert(r.status === 200, `${q}: status ${r.status}`); return r.body; };
    const base = await get("&stats=1");
    assert(Number.isInteger(base.total) && base.rarityCounts && typeof base.rarityCounts === "object", "stats=1 has no total or rarityCounts");
    const word = base.collection[0]?.card?.category?.split(/\s+/)[0];
    const found = word ? (await get(`&q=${encodeURIComponent(word)}&stats=1`)) : null;
    assert(!found || found.collection.length > 0, `q=${word} (a description word) found nothing`);
    const sr = await get("&rarity=SR");
    assert(sr.collection.every((r) => r.card.rarity === "SR"), "rarity=SR returned other rarities");
    const added = (await get("&sort=added")).collection.map((r) => r.obtained_at);
    assert(added.every((t, i) => !i || added[i - 1] >= t), "sort=added is not newest first");
    const starred = (await get("&sort=starred")).collection.map((r) => !!r.starred);
    assert(starred.every((s, i) => !i || starred[i - 1] || !s), "sort=starred does not put favourites first");
    return `${base.total} copies; q=${word} ${found?.collection.length ?? "-"}; rarity=SR ${sr.collection.length}; added and starred ordered`;
  });
  await check("trades: GET /api/chat/<friend id> shape", async () => {
    if (!friend) return "no friend to read";
    const { status, body } = await raw(`/api/chat/${friend.id}`);
    assert(status === 200 && Array.isArray(body?.messages) && Array.isArray(body?.trades), `status ${status}, keys ${Object.keys(body || {})}`);
    const bad = body.messages.filter((m) => !isId(m.id) || !isId(m.sender_id) || typeof m.content !== "string" || isNaN(Date.parse(m.created_at)));
    assert(!bad.length, `${bad.length} messages missing id/sender_id/content/created_at`);
    return `${body.messages.length} messages, ${body.trades.length} trades`;
  });
}

// --- assumptions: every behaviour of the API the app relies on, read-only and paced ----------
// Each check reports what the server actually does; an assert marks what the code depends on.
if (on("assumptions")) {
  const get = async (path) => { const r = await raw(path); await Bun.sleep(600); assert(r.status === 200, `${path}: status ${r.status}`); return r.body; };
  const uniq = (xs) => [...new Set(xs)].sort().join(",");
  let me = null, friends = [], friend = null;
  await check("assume: friendship statuses", async () => {
    me = await view.evaluate("window.__wm.data.userId");
    friends = (await get("/api/friends")).friendships;
    friend = friends.filter((f) => f.status === "accepted").map((f) => (f.requester.id === me ? f.addressee : f.requester))[0];
    return `statuses ${uniq(friends.map((f) => f.status))}, ${friends.length} rows`;
  });

  await check("assume: friend collection paging, pending ids, filters", async () => {
    if (!friend) return "no friend";
    const base = `/api/profile/${encodeURIComponent(friend.username)}/collection?`;
    const p0 = await get(base + "page=0"), p1 = await get(base + "page=1");
    const same = JSON.stringify([...(p0.pendingTradeCardIds || [])].sort()) === JSON.stringify([...(p1.pendingTradeCardIds || [])].sort());
    assert(same, "pendingTradeCardIds differ between pages: the app would lose locks from earlier pages");
    const L = await get(base + "page=0&rarity=L");
    assert(L.collection.every((r) => r.card.rarity === "L"), "rarity=L not honoured");
    const name = await get(base + "page=0&sort=name");
    const titles = name.collection.map((r) => r.card.wikipedia_title);
    return `page0 ${p0.collection.length} rows total=${p0.total}, page1 ${p1.collection.length}, pending ids same on both pages (${(p0.pendingTradeCardIds || []).length}), rarity=L ${L.collection.length} rows, name order first ${titles.slice(0, 2).join(" | ")}`;
  });

  await check("assume: pending trade ids are copy ids (user_card_id), not card ids", async () => {
    const mine = await get("/api/my-collection?sort=rarity&page=0&stats=1");
    const trades = (await get("/api/trades")).trades.filter((t) => t.status === "pending");
    const items = trades.flatMap((t) => t.items).filter((i) => i.offered_by === me);
    const ids = new Set(mine.pendingTradeCardIds || []);
    if (!items.length) return `no pending item of mine to compare (${ids.size} pending ids)`;
    const asCopy = items.filter((i) => ids.has(i.user_card_id)).length, asCard = items.filter((i) => ids.has(i.card_id)).length;
    return `${items.length} of my pending items: ${asCopy} match user_card_id, ${asCard} match card_id`;
  });

  await check("assume: my collection, stats keys, copies, server filters", async () => {
    const a = await get("/api/my-collection?sort=rarity&page=0&stats=1"), b = await get("/api/my-collection?sort=rarity&page=1&stats=0");
    const L = await get("/api/my-collection?sort=rarity&page=0&rarity=L"), q = await get("/api/my-collection?sort=rarity&page=0&q=a");
    const multi = a.collection.filter((r) => (r.count ?? 1) > 1).length;
    return `stats=1 keys ${Object.keys(a).sort()}, stats=0 keys ${Object.keys(b).sort()}, rows with count>1: ${multi}, rarity=L honoured: ${L.collection.every((r) => r.card.rarity === "L")} (${L.collection.length}), q honoured: total=${q.total} rows=${q.collection.length}`;
  });

  await check("assume: catalog totals, rarityCounts and sorts", async () => {
    const all = await get("/api/cards?page=0"), L = await get("/api/cards?page=0&rarity=L"), q = await get("/api/cards?page=0&q=Paris");
    const q1 = await get("/api/cards?page=1&q=Paris"), r = await get("/api/cards?page=0&sort=rarity");
    const sum = (c) => Object.values(c || {}).reduce((a, b) => a + b, 0);
    return [
      `rarityCounts keys ${Object.keys(all.rarityCounts || {}).join(",")}`,
      `total ${all.total} vs sum ${sum(all.rarityCounts)}`,
      `global counts ${JSON.stringify(all.rarityCounts)}`,
      `rarity=L total ${L.total}, counts under rarity=L ${JSON.stringify(L.rarityCounts)}`,
      `counts under q=Paris ${JSON.stringify(q.rarityCounts)}`,
      `q=Paris total ${q.total} searchHasMore ${q.searchHasMore} rows ${q.cards.length}, page1 rows ${q1.cards.length}`,
      `sort=rarity same as default: ${r.cards.map((c) => c.id).join() === all.cards.map((c) => c.id).join()}`,
    ].join("; ");
  });

  await check("assume: market search, sorts, my lists and statuses", async () => {
    const q = await get("/api/marketplace?page=1&limit=50&q=Paris"), qr = await get("/api/marketplace?page=1&limit=50&q=Paris&rarity=C");
    const end = await get("/api/marketplace?page=1&limit=50&sort=ending_soon"), rec = await get("/api/marketplace?page=1&limit=50&sort=recent");
    const mine = await get("/api/marketplace?page=1&limit=1&mine=1");
    const t = (a) => a.card?.wikipedia_title || "";
    const asc = (xs) => xs.every((x, i) => !i || xs[i - 1] <= x);
    const lists = ["selling", "bidding", "won", "history"].map((k) => `${k} ${mine[k]?.length ?? "-"}`).join(" ");
    const hist = [...(mine.history || []), ...(mine.won || [])];
    return [
      `q=Paris ${q.auctions.length} rows, titles with "paris" ${q.auctions.filter((a) => /paris/i.test(t(a))).length}`,
      `q+rarity=C ${qr.auctions.length} rows, all C ${qr.auctions.every((a) => (a.card?.rarity ?? a.snapshot_rarity) === "C")}`,
      `ending_soon ascending end_at ${asc(end.auctions.map((a) => a.end_at))}`,
      `recent descending created_at ${asc(rec.auctions.map((a) => a.created_at).reverse())}`,
      `mine: ${lists}, statuses ${uniq(hist.map((a) => a.status))}, history rows without card ${hist.filter((a) => !a.card).length}`,
    ].join("; ");
  });

  await check("assume: trades statuses, sides, paging", async () => {
    const body = await get("/api/trades");
    const tr = body.trades;
    const badSide = tr.flatMap((t) => t.items.filter((i) => i.offered_by !== t.initiator_id && i.offered_by !== t.recipient_id)).length;
    assert(!badSide, `${badSide} items offered by neither party`);
    return `${tr.length} trades, statuses ${uniq(tr.map((t) => t.status))}, keys ${Object.keys(body).join(",")}, chains ${tr.filter((t) => t.parent_trade_id).length} with a parent`;
  });

  await check("assume: chat carries full trade cards", async () => {
    if (!friend) return "no friend";
    const c = await get(`/api/chat/${friend.id}`);
    const items = c.trades.flatMap((t) => t.items);
    return `${c.messages.length} messages, ${c.trades.length} trades, items with card ${items.filter((i) => i.card?.id).length}/${items.length}`;
  });

  await check("assume: notification types", async () => {
    const n = await get("/api/notifications");
    const list = n.notifications || n;
    const byType = Object.groupBy(list, (x) => x.type);
    return `${list.length} notifications\n` + Object.entries(byType).map(([t, xs]) => `  ${t} x${xs.length}: data keys ${uniq(xs.flatMap((x) => Object.keys(x.data || {})))}; title "${xs[0].data?.title ?? xs[0].title ?? ""}" body "${String(xs[0].data?.body ?? xs[0].body ?? xs[0].message ?? "").slice(0, 60)}"; top keys ${Object.keys(xs[0]).join(",")}`).join("\n");
  });
}

// --- contract: the recorded shape of every endpoint the app reads ----------------------------
if (on("contract")) {
  const { shapeOf, diffShapes, mergeShapes } = await import("../src/wm/contract.js");
  const FILE = new URL("../../docs/api-shapes.json", import.meta.url).pathname;
  const saved = (await Bun.file(FILE).exists()) ? await Bun.file(FILE).json() : null;
  const update = process.argv.includes("--update-shapes") || !saved;
  const get = async (path) => { const r = await raw(path); await Bun.sleep(600); assert(r.status === 200, `${path}: status ${r.status}`); return r.body; };
  const live = {};

  // the ids the per-endpoint reads need: a friend, an auction and its card
  let friends = null, market = null, friend = null, auction = null;
  await check("contract: ids to read with", async () => {
    const me = await view.evaluate("window.__wm.data.userId");
    friends = await get("/api/friends");
    const f = friends.friendships.find((x) => x.status === "accepted");
    friend = f && (f.requester.id === me ? f.addressee : f.requester);
    market = await get("/api/marketplace?page=1&limit=50");
    auction = market.auctions[0];
    return `friend ${friend?.username ?? "none"}, auction ${auction?.id ?? "none"}`;
  });
  const reads = {
    friends: friends,
    marketplace: market,
    wikibidous: "/api/wikibidous",
    "my-collection": "/api/my-collection?sort=rarity&page=0&stats=1",
    "my-collection (more pages)": "/api/my-collection?sort=rarity&page=1&stats=0",
    cards: "/api/cards?page=0",
    "cards (search)": "/api/cards?page=0&q=Paris",
    "marketplace (mine)": "/api/marketplace?page=1&limit=1&mine=1",
    "marketplace/{id}": auction && `/api/marketplace/${auction.id}`,
    "marketplace/cards/{id}/sales summary": auction && `/api/marketplace/cards/${auction.card_id}/sales?scope=summary`,
    trades: "/api/trades",
    "profile/{u}/collection": friend && `/api/profile/${encodeURIComponent(friend.username)}/collection?page=0`,
    "chat/{id}": friend && `/api/chat/${friend.id}`,
    notifications: "/api/notifications",
    "packs/special": "/api/packs/special",
    "packs/pro-daily": "/api/packs/pro-daily",
    // the full sale list answers Pro accounts only: recorded when this account may read it
    "marketplace/cards/{id}/sales": auction && (async () => { const r = await raw(`/api/marketplace/cards/${auction.card_id}/sales`); return r.status === 200 ? r.body : null; }),
    // packs, regen time and Pro status: the game's own Supabase sync, replayed (read-only)
    "profile (game sync)": async () => view.evaluate("window.__wm.refreshProfile().then(() => window.__wm.getProfile())"),
  };
  // one check per endpoint: its own time limit, its own line when it changes
  for (const [key, src] of Object.entries(reads)) {
    if (!src) continue;
    await check(`contract: ${key}`, async () => {
      const body = typeof src === "string" ? await get(src) : typeof src === "function" ? await src() : src;
      if (body == null) return "not readable by this account, skipped";
      live[key] = shapeOf(body);
      if (!saved?.[key]) return `${Object.keys(live[key]).length} fields, new in the contract`;
      const d = diffShapes(saved[key], live[key]);
      const lost = [...d.removed.map((p) => `- ${p}`), ...d.changed.map((c) => `~ ${c}`)];
      if (lost.length && !update) throw new Error(`changed: ${lost.join(", ")} (review, then --update-shapes accepts it)`);
      return [`${Object.keys(live[key]).length} fields`, lost.length && `accepted ${lost.join(", ")}`, d.added.length && `new: ${d.added.join(", ")}`].filter(Boolean).join("; ");
    });
  }
  await Bun.write(`${OUT}api-shapes.live.json`, JSON.stringify(live, null, 1) + "\n"); // this run's, to inspect a diff
  // accepting merges what is live into the record (types unioned, nothing forgotten); an endpoint
  // not read this run keeps its old entry
  if (update) await Bun.write(FILE, JSON.stringify({ ...saved, ...Object.fromEntries(Object.entries(live).map(([k, s]) => [k, mergeShapes(saved?.[k], s)])) }, null, 1) + "\n");
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
  const back = await ev(async (title) => (await window.__wm.data.myCards({ q: title })).items.some((i) => i.card.title === title), it.title);
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
await close();

console.log("");
for (const [s, n, note] of results) console.log(`${s === "PASS" ? "ok  " : "FAIL"}  ${n}${note ? `  (${note})` : ""}`);
const failed = results.filter((r) => r[0] === "FAIL").length;
console.log(`\n${results.length - failed}/${results.length} passed. Screenshots: ${OUT}`);
process.exit(failed ? 1 : 0);
