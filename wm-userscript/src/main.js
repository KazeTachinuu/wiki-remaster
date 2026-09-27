import { mount, unmount } from "svelte";
import App from "./App.svelte";
import appCss from "./app.css?inline";
import { initCapture } from "./wm/index.js";

// Patch fetch early (document-start) so we can read the app's own profile call.
initCapture();

// We only take over the core routes; every other route falls back to the real app.
const CORE = /^\/(pulls|collection|global-collection|marketplace)?\/?$/;
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
    "html,body{margin:0;background:#0C0D0C}body>*:not(#wm-host){display:none !important}";
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
const OFF_KEY = "wm-off";
const overlayOff = () => { try { return localStorage.getItem(OFF_KEY) === "1"; } catch { return false; } };
let reBtn = null;
function showReenable() {
  if (reBtn) return;
  reBtn = document.createElement("button");
  reBtn.textContent = "WikiMasters +";
  reBtn.style.cssText =
    "position:fixed;z-index:2147483600;right:16px;bottom:16px;padding:10px 15px;border-radius:999px;" +
    "border:1px solid #333833;background:#141613;color:#3CCB8E;font:600 13px/1 system-ui,sans-serif;" +
    "cursor:pointer;box-shadow:0 10px 28px -14px #000";
  reBtn.onclick = () => { try { localStorage.removeItem(OFF_KEY); } catch {} location.reload(); };
  document.body.appendChild(reBtn);
}
function removeReenable() { if (reBtn) { reBtn.remove(); reBtn = null; } }

function sync() {
  if (overlayOff()) { hideOverlay(); showReenable(); return; }
  removeReenable();
  if (isCore()) showOverlay();
  else hideOverlay();
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
