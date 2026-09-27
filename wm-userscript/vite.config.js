import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import monkey from "vite-plugin-monkey";

// Dev (`npm run dev`): plain Vite + Svelte with HMR, served from index.html,
//   proxying /api to the local mock server. Open http://localhost:5173.
// Build (`npm run build`): adds vite-plugin-monkey to emit the userscript.
export default defineConfig(({ command }) => ({
  plugins: [
    svelte(),
    ...(command === "build"
      ? [
          monkey({
            entry: "src/main.js",
            userscript: {
              name: "wiki-remaster",
              namespace: "hugo.wikimasters",
              version: "0.1.0",
              description:
                "Redesigned client for wiki-masters.com. Uses the real API and session.",
              author: "Hugo Sibony",
              match: ["https://www.wiki-masters.com/*", "https://wiki-masters.com/*"],
              runAt: "document-start",
              grant: "none",
              homepage: "https://github.com/KazeTachinuu/wiki-remaster",
              supportURL: "https://github.com/KazeTachinuu/wiki-remaster/issues",
              // Tampermonkey checks these to auto-update. They resolve once the built file
              // is reachable at a public raw URL (repo public, or a public release).
              updateURL: "https://raw.githubusercontent.com/KazeTachinuu/wiki-remaster/main/wm-userscript/dist/wikimasters-app.user.js",
              downloadURL: "https://raw.githubusercontent.com/KazeTachinuu/wiki-remaster/main/wm-userscript/dist/wikimasters-app.user.js",
            },
            build: { fileName: "wikimasters-app.user.js" },
            server: { open: false },
          }),
        ]
      : []),
  ],
  server: {
    port: 5173,
    proxy: { "/api": "http://localhost:8799" },
  },
}));
