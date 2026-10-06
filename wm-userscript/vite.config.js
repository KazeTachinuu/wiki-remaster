import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import monkey from "vite-plugin-monkey";
import mockApi from "./plugins/vite-mock-api.js";

// Single source of truth for the version: package.json. Bump it there, nowhere else.
const pkg = JSON.parse(readFileSync(fileURLToPath(new URL("./package.json", import.meta.url)), "utf8"));
// Tampermonkey's icon, inline (no request)
const icon = "data:image/png;base64," + readFileSync(fileURLToPath(new URL("./extension/icon-48.png", import.meta.url))).toString("base64");

// Dev (`npm run dev`): Vite + Svelte with HMR, serving index.html, with the mock API
//   mounted on /api by a plugin (no second process). Open http://localhost:5173.
// Build (`npm run build`): adds vite-plugin-monkey to emit the userscript.
export default defineConfig(({ command }) => ({
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
              // Tampermonkey checks these to auto-update. They resolve once the built file
              // is reachable at a public raw URL (repo public, or a public release).
              updateURL: "https://raw.githubusercontent.com/KazeTachinuu/wiki-remaster/main/dist/wikimasters-app.user.js",
              downloadURL: "https://raw.githubusercontent.com/KazeTachinuu/wiki-remaster/main/dist/wikimasters-app.user.js",
            },
            build: { fileName: "wikimasters-app.user.js" },
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
