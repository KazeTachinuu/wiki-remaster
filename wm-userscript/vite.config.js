import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import monkey from "vite-plugin-monkey";
import mockApi from "./plugins/vite-mock-api.js";

// Single source of truth for the version: package.json. Bump it there, nowhere else.
const pkg = JSON.parse(readFileSync(fileURLToPath(new URL("./package.json", import.meta.url)), "utf8"));
// Where installs find their updates: the full script, and its header alone (`.meta.js`, a few KB)
// that Tampermonkey and the app's own update check read to compare versions.
const RAW = "https://raw.githubusercontent.com/KazeTachinuu/wiki-remaster/main/dist/";
const DOWNLOAD_URL = RAW + "wikimasters-app.user.js";
const META_URL = RAW + "wikimasters-app.meta.js";
// Tampermonkey's icon, inline (no request)
const icon = "data:image/png;base64," + readFileSync(fileURLToPath(new URL("./extension/icon-48.png", import.meta.url))).toString("base64");

// Dev (`npm run dev`): Vite + Svelte with HMR, serving index.html, with the mock API
//   mounted on /api by a plugin (no second process). Open http://localhost:5173.
// Build (`npm run build`): adds vite-plugin-monkey to emit the userscript.
export default defineConfig(({ command }) => ({
  // the version, shown in the app (sidebar, menu), from package.json at build time
  define: { __APP_VERSION__: JSON.stringify(pkg.version), __META_URL__: JSON.stringify(META_URL), __DOWNLOAD_URL__: JSON.stringify(DOWNLOAD_URL) },
  plugins: [
    svelte(),
    ...(command === "serve" ? [mockApi()] : []),
    ...(command === "build"
      ? [
          monkey({
            entry: "src/main.js",
            userscript: {
              name: "wiki-remaster",
              namespace: "hugo.wikimasters",
              version: pkg.version,
              description:
                "Unofficial redesign of wiki-masters.com, on the game's own data and your own session.",
              author: "Hugo Sibony",
              icon,
              match: ["https://www.wiki-masters.com/*", "https://wiki-masters.com/*"],
              runAt: "document-start",
              grant: "none",
              homepage: "https://github.com/KazeTachinuu/wiki-remaster",
              supportURL: "https://github.com/KazeTachinuu/wiki-remaster/issues",
              // Tampermonkey compares @version in the small header file, then installs the full one
              updateURL: META_URL,
              downloadURL: DOWNLOAD_URL,
            },
            build: { fileName: "wikimasters-app.user.js", metaFileName: true },
            server: { open: false },
          }),
        ]
      : []),
  ],
  // every build lands in dist/ at the repo root
  build: { outDir: fileURLToPath(new URL("../dist", import.meta.url)), emptyOutDir: false },
  server: {
    port: 5173,
  },
}));
