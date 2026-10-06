// The real wiki-masters.com in the logged-in test profile, with the LOCAL build injected at
// document-start (like Tampermonkey). Shared by test:prod and the README screenshots.
//
// Session: the dedicated browser profile in .prod-profile/ (gitignored). Log in once with
// `bun run test:prod:login`. WM_BROWSER overrides the browser (default: brave, chromium, chrome).

export const SITE = "https://www.wiki-masters.com";
export const PROFILE = new URL("../.prod-profile", import.meta.url).pathname;
export const BROWSER = process.env.WM_BROWSER || ["brave", "chromium", "google-chrome-stable"].map((b) => Bun.which(b)).find(Boolean);
// Same cookie encryption in the visible login browser and the headless runs.
export const STORE = "--password-store=basic";

/** Open the login window on the test profile; resolves once it is closed. */
export async function login() {
  console.log("Log in to wiki-masters in the window that opened, then close it.");
  await Bun.spawn([BROWSER, `--user-data-dir=${PROFILE}`, STORE, "--no-first-run", "--no-default-browser-check", `${SITE}/pulls`]).exited;
}

/**
 * A WebView on the real site. `show`: a visible browser we launch and attach to; `attach`: the
 * running browser (remote debugging on). `onError(text)` gets page errors and the app's warnings.
 * Returns the view and its helpers; `close()` also closes a visible browser.
 */
export async function realSite({ show = false, attach = false, width = 1400, height = 900, onError = () => {} } = {}) {
  const dist = await Bun.file(new URL("../dist/wikimasters-app.user.js", import.meta.url)).text();
  let shown = null;
  let backend;
  if (attach) backend = undefined;
  else if (show) {
    const portFile = `${PROFILE}/DevToolsActivePort`;
    await Bun.file(portFile).delete().catch(() => {});
    shown = Bun.spawn([BROWSER, `--user-data-dir=${PROFILE}`, STORE, "--remote-debugging-port=0", "--no-first-run", "--no-default-browser-check", `--window-size=${width},${height + 50}`]);
    for (let i = 0; i < 100 && !(await Bun.file(portFile).exists()); i++) await Bun.sleep(100);
    const [port, path] = (await Bun.file(portFile).text()).split("\n");
    backend = { type: "chrome", url: `ws://127.0.0.1:${port}${path}` };
  } else backend = { type: "chrome", path: BROWSER, argv: [STORE] };

  const view = new Bun.WebView({
    width, height,
    ...(backend && { backend }),
    ...(backend && !show && { dataStore: { directory: PROFILE } }),
    console: (type, ...args) => {
      const s = args.map((a) => a?.value ?? a?.description ?? "").join(" ");
      if (s.includes("[wiki-remaster]") || type === "error") onError(`${type}: ${s}`.slice(0, 200));
    },
  });
  await view.navigate("about:blank"); // opens the CDP session
  await view.cdp("Runtime.enable");
  view.addEventListener("Runtime.exceptionThrown", (e) => onError("exception: " + (e.data.exceptionDetails.exception?.description || e.data.exceptionDetails.text).split("\n")[0]));
  // Mark the harness copy, then inject the local build at document-start (like Tampermonkey).
  await view.cdp("Page.addScriptToEvaluateOnNewDocument", {
    source: `try{localStorage.setItem("wm-debug","1")}catch{};window.__wmLocal=!window.__wmMounted;\n${dist}`,
  });

  // Run a self-contained page-side function with one JSON argument.
  const ev = (fn, arg) => view.evaluate(`(${fn})(${JSON.stringify(arg ?? null)})`);
  async function waitFor(expr, ms = 15000) {
    for (const end = Date.now() + ms; Date.now() < end; await Bun.sleep(250)) if (await view.evaluate(`!!(${expr})`).catch(() => false)) return;
    throw new Error(`timeout waiting for ${expr}`);
  }
  async function go(path, { remaster = true } = {}) {
    await view.navigate(SITE + path);
    if (remaster) await waitFor("window.__wm");
  }
  /** Logged in, and it is OUR build running: else a reason to stop. */
  async function preflight() {
    await go("/pulls");
    if (!(await view.evaluate(`fetch("/api/my-collection?page=0").then((r) => r.ok)`))) return "Not logged in. Run `bun run test:prod:login`, log in, close the window, rerun.";
    if (!(await view.evaluate("window.__wmLocal"))) return "An installed wiki-remaster ran before the local build. Disable it in Tampermonkey for this run.";
    return null;
  }
  const close = async () => { view.close?.(); shown?.kill(); };
  return { view, ev, waitFor, go, preflight, close };
}
