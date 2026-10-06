// The browser extensions, from the built userscript: a Manifest V3 package for the Chrome Web
// Store and one for Firefox Add-ons (the same, plus Firefox's own settings). The script runs as
// it does under Tampermonkey (grant none, document-start), in the page's own world ("MAIN": it
// patches the page's fetch and reads window.turnstile), so it needs no extension API and asks no
// permission beyond the game's site.
//
//   ./build.sh (repo root) builds everything: dist/chrome/ and dist/firefox/ (load unpacked),
//   dist/wiki-remaster-{chrome,firefox}.zip
import { readFileSync, writeFileSync, mkdirSync, rmSync, copyFileSync } from "node:fs";
import { execFileSync } from "node:child_process";

const root = new URL("../", import.meta.url).pathname;
const pkg = JSON.parse(readFileSync(root + "package.json", "utf8"));

const sites = ["https://www.wiki-masters.com/*", "https://wiki-masters.com/*"];
const icons = { 16: "icon-16.png", 48: "icon-48.png", 128: "icon-128.png" };
const manifest = {
  manifest_version: 3,
  name: "Wiki Remaster",
  version: pkg.version,
  description: "A redesign of wiki-masters.com, on the game's own data and your session.",
  homepage_url: "https://github.com/KazeTachinuu/wiki-remaster",
  icons,
  content_scripts: [{ matches: sites, js: ["content.js"], run_at: "document_start", world: "MAIN" }],
};
// Firefox: a stable id for updates, MAIN-world content scripts since 128, and the data collection
// declaration AMO asks of every new add-on (none: it only talks to the game). Chrome would flag
// the key as unknown, so its package goes without.
const gecko = { gecko: { id: "wiki-remaster@hugo.wikimasters", strict_min_version: "128.0", data_collection_permissions: { required: ["none"] } } };

// Chrome: MAIN-world content scripts since 111
for (const [browser, extra] of [["chrome", { minimum_chrome_version: "111" }], ["firefox", { browser_specific_settings: gecko }]]) {
  const out = `${root}dist/${browser}/`, zip = `${root}dist/wiki-remaster-${browser}.zip`;
  rmSync(out, { recursive: true, force: true });
  mkdirSync(out, { recursive: true });
  writeFileSync(out + "manifest.json", JSON.stringify({ ...manifest, ...extra }, null, 2) + "\n");
  copyFileSync(root + "dist/wikimasters-app.user.js", out + "content.js");
  for (const f of Object.values(icons)) copyFileSync(root + "extension/" + f, out + f);
  rmSync(zip, { force: true });
  execFileSync("zip", ["-qrX", zip, "."], { cwd: out });
}
