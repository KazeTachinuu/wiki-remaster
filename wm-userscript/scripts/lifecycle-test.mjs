// Real-account market lifecycle, the parts that need real time to pass (~62 min):
//   now     bulk-discard 2 commons, list a common at 40 for 1 h
//   +31 min lower the price to 30 (allowed only past half the duration)
//   +61 min the ended auction is settled (the server does it itself); unsold, the card comes back
//   (--cancel: cancel right after the reprice instead of waiting for the end)
// Uses the same logged-in profile as prod-test.mjs, opening the browser only per step.
//   bun run build && bun scripts/lifecycle-test.mjs
//   bun scripts/lifecycle-test.mjs --resume=<auction id>,<card title>,<listed at ISO>   (skip step 1)

const SITE = "https://www.wiki-masters.com";
const PROFILE = new URL("../.prod-profile", import.meta.url).pathname;
const DIST = await Bun.file(new URL("../dist/wikimasters-app.user.js", import.meta.url)).text();
const BROWSER = process.env.WM_BROWSER || ["brave", "chromium", "google-chrome-stable"].map((b) => Bun.which(b)).find(Boolean);

// Run one page-side function against the local build, in a fresh browser session.
async function step(label, fn, arg) {
  const view = new Bun.WebView({ dataStore: { directory: PROFILE }, backend: { type: "chrome", path: BROWSER, argv: ["--password-store=basic"] } });
  try {
    await view.navigate("about:blank");
    await view.cdp("Page.addScriptToEvaluateOnNewDocument", { source: `try{localStorage.setItem("wm-debug","1")}catch{};\n${DIST}` });
    await view.navigate(SITE + "/leaderboard");
    for (let i = 0; i < 60 && !(await view.evaluate("!!window.__wm")); i++) await Bun.sleep(250);
    const r = await view.evaluate(`(${fn})(${JSON.stringify(arg ?? null)}).then((v) => ({ ok: true, v }), (e) => ({ ok: false, v: e.message }))`);
    console.log(`${new Date().toLocaleTimeString("fr")}  ${r.ok ? "ok  " : "FAIL"}  ${label}  ${JSON.stringify(r.v)}`);
    return r;
  } finally {
    // close() only closes the tab; Bun keeps one browser per process, which would hold the
    // profile lock between steps. closeAll() ends it.
    Bun.WebView.closeAll();
    await Bun.sleep(1500);
  }
}

const resume = process.argv.find((a) => a.startsWith("--resume="))?.slice(9).split(",");
const listing = resume ? { ok: true, v: { auction_id: resume[0], title: resume[1] } } : await step("bulk-discard 2 commons, then list a common at 40 for 1 h", async () => {
  const { items } = await window.__wm.data.collection();
  const commons = items.filter((i) => i.card.rarity === "C");
  const bal0 = (await window.__wm.data.profile()).currency;
  const bulk = await window.__wm.data.bulkDiscard(commons.slice(0, 2).map((i) => i.id));
  const bal1 = (await window.__wm.data.profile()).currency;
  const sell = commons[2];
  const { auction_id } = await window.__wm.data.createAuction(sell, { price: 40, durationHours: 1 });
  return { bulk, balance: `${bal0} -> ${bal1}`, auction_id, title: sell.card.title };
});
if (!listing.ok) process.exit(1);
const { auction_id, title } = listing.v;

const listedAt = resume ? Date.parse(resume[2]) : Date.now();
// Wall-clock waits: a single long sleep does not advance while the machine is suspended.
async function until(min) {
  while (Date.now() < listedAt + min * 60000) await Bun.sleep(Math.min(30000, listedAt + min * 60000 - Date.now()));
}
await until(31);
await step("reprice 40 -> 30 past half time", async (id) => {
  await window.__wm.data.reprice(id, 30);
  const a = await window.__wm.data.auction(id);
  if (a.base !== 30) throw new Error(`base is ${a.base}`);
  return { base: a.base, repricedAt: a.repricedAt };
}, auction_id);

// The server settles on its own at the end (status "settled_unsold" / sold). With --cancel,
// stop after the reprice instead of waiting for that.
if (process.argv.includes("--cancel")) {
  await step("cancel after the reprice", async ([id, title]) => {
    const r = await window.__wm.data.cancelAuction(id);
    const back = (await window.__wm.data.collection()).items.some((i) => i.card.title === title);
    return { ...r, cardBack: back };
  }, [auction_id, title]);
  process.exit(0);
}

await until(61.5);
await step("the ended auction is settled (by the server or by us)", async ([id, title]) => {
  const r = await window.__wm.data.settle(id).catch((e) => ({ settleError: e.message }));
  const a = await window.__wm.data.auction(id);
  const back = (await window.__wm.data.collection()).items.some((i) => i.card.title === title);
  return { settle: r, status: a.status, finalPrice: a.finalPrice, winner: a.winner, cardBack: back };
}, [auction_id, title]);
process.exit(0);
