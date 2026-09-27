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
              name: "WikiMasters App",
              namespace: "hugo.wikimasters",
              version: "0.1.0",
              description:
                "Personal redesigned client for wiki-masters.com. Uses the real API and session.",
              author: "Hugo",
              match: ["https://www.wiki-masters.com/*", "https://wiki-masters.com/*"],
              runAt: "document-start",
              grant: "none",
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
