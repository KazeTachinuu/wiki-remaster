import { mount, unmount } from "svelte";
import App from "./App.svelte";
import appCss from "./app.css?inline";
import * as wm from "./wm/index.js";

// One copy per page: the prod test injects a local build next to an installed one.
if (!window.__wmMounted) {
window.__wmMounted = true;

// Patch fetch early (document-start) so we can read the app's own profile call.
wm.initCapture();

// Test hook for scripts/prod-test.mjs: exposes the domain layer only when opted in.
try { if (localStorage.getItem("wm-debug")) window.__wm = wm; } catch {}

// We only take over the core routes; every other route falls back to the real app.
// /marketplace/<id> is an auction (market notifications link there): we open it in our market.
const CORE = /^\/(pulls|collection|global-collection|trades|marketplace(\/[^/]+)?)?\/?$/;
const isCore = () => CORE.test(location.pathname);

let instance = null;
let host = null;       // shadow host in the page
let hideStyle = null;  // hides the real app while we overlay

// Mount inside a shadow root so the host site's CSS cannot leak into our UI and ours
// cannot leak out. Fonts (Outfit/Inter) are declared page-wide via @font-face and still
// reach shadow DOM, so typography is preserved.
function showOverlay() {
  if (host) return;
  host = document.createElement("div");
  host.id = "wm-host";
  document.body.appendChild(host);

  const shadow = host.attachShadow({ mode: "open" });
  const style = document.createElement("style");
  style.textContent = appCss;
  shadow.appendChild(style);
  const root = document.createElement("div");
  root.id = "wm-app-root";
  shadow.appendChild(root);

  hideStyle = document.createElement("style");
  hideStyle.id = "wm-hide-real";
  hideStyle.textContent =
    "html,body{margin:0;background:#0C0D0C}body>*:not(#wm-host):not(#wm-switch){display:none !important}";
  (document.head || document.documentElement).appendChild(hideStyle);

  instance = mount(App, { target: root });
}

function hideOverlay() {
  if (instance) { unmount(instance); instance = null; }
  if (host) { host.remove(); host = null; }
  if (hideStyle) { hideStyle.remove(); hideStyle = null; }
}

// Escape hatch: users can drop back to the native app so no feature (Pro tools, special
// packs, anything we do not reimplement) is ever lost.
// One switch, one spot: the same pill sits bottom-right in both worlds, so going to the
// original site and coming back is always the same click in the same place.
const OFF_KEY = "wm-off";
const LAST_KEY = "wm-last"; // last remastered route, where "Remaster" brings you back to
const overlayOff = () => { try { return localStorage.getItem(OFF_KEY) === "1"; } catch { return false; } };
const SWAP_ICON = '<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 4L3 8l4 4M3 8h13M17 20l4-4-4-4M21 16H8"/></svg>';
let switchBtn = null;
function renderSwitch(remastered) {
  if (!switchBtn) {
    // Light DOM (it must outlive the overlay), so it carries its own small stylesheet.
    const css = document.createElement("style");
    css.textContent =
      "#wm-switch{position:fixed;z-index:2147483599;right:16px;bottom:16px;display:inline-flex;align-items:center;justify-content:center;gap:8px;" +
      "min-width:148px;height:40px;padding:0 16px;border-radius:999px;border:1px solid #333833;background:#141613;color:#98A29A;" +
      "font:600 13px/1 Inter,system-ui,sans-serif;cursor:pointer;box-shadow:0 10px 28px -14px #000}" +
      "#wm-switch.to-remaster{color:#3CCB8E}#wm-switch:hover{border-color:#98A29A}" +
      // phones: icon only, so it never covers the centred buttons
      "@media(max-width:560px){#wm-switch{min-width:0;width:40px;padding:0}#wm-switch span{display:none}}";
    (document.head || document.documentElement).appendChild(css);
    switchBtn = document.createElement("button");
    switchBtn.id = "wm-switch";
    document.body.appendChild(switchBtn);
  }
  switchBtn.innerHTML = SWAP_ICON + `<span>${remastered ? "Site original" : "Remaster"}</span>`;
  switchBtn.classList.toggle("to-remaster", !remastered);
  switchBtn.title = remastered ? "Revenir au site d'origine (aucune fonctionnalité perdue)" : "Revenir à l'interface remaster";
  switchBtn.setAttribute("aria-label", switchBtn.title);
  switchBtn.onclick = remastered
    ? () => { try { localStorage.setItem(OFF_KEY, "1"); } catch {} location.reload(); }
    : () => {
        try { localStorage.removeItem(OFF_KEY); } catch {}
        if (isCore()) return location.reload();
        let last = null;
        try { last = sessionStorage.getItem(LAST_KEY); } catch {}
        location.assign(last || "/pulls");
      };
}

function sync() {
  const on = !overlayOff() && isCore();
  if (on) {
    try { sessionStorage.setItem(LAST_KEY, location.pathname); } catch {}
    showOverlay();
  } else hideOverlay();
  renderSwitch(on);
}

// React to SPA navigation (Next.js router uses the history API).
for (const m of ["pushState", "replaceState"]) {
  const orig = history[m];
  history[m] = function (...a) {
    const r = orig.apply(this, a);
    sync();
    window.dispatchEvent(new Event("wm:route"));
    return r;
  };
}
window.addEventListener("popstate", () => {
  sync();
  window.dispatchEvent(new Event("wm:route"));
});

function start() { sync(); }
if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start);
else start();
}
