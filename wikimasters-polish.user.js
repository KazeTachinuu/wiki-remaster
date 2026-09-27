// ==UserScript==
// @name         WikiMasters Polish
// @namespace    hugo.wikimasters.polish
// @version      0.2.0
// @description  Personal visual polish for wiki-masters.com. Same data and behaviour, flat and elegant look. Generated from polish.css.
// @author       Hugo
// @match        https://www.wiki-masters.com/*
// @match        https://wiki-masters.com/*
// @run-at       document-start
// @grant        none
// ==/UserScript==

// DO NOT EDIT BY HAND. This file is generated from mock-app/public/polish.css
// by mock-app/build-userscript.js so the local test and the userscript never drift.

(function () {
  "use strict";
  var css = "/* =====================================================================\n   WikiMasters Polish  (SINGLE SOURCE OF TRUTH)\n   This exact file is loaded by the local test page AND injected by the\n   Tampermonkey userscript on the real site. Do not fork it. The userscript\n   is generated from this file (see build-userscript.js), so they cannot drift.\n\n   Goal: flat, elegant, modern. Kill the loud rarity-PNG card fill and glow.\n   Rarity becomes one precise accent. Nothing about data or behaviour changes.\n   ===================================================================== */\n\n/* rarity accent colour per card (muted from the neon rarity set) */\n.glow-c  { --wm-r:#7fd8b4; }\n.glow-pc { --wm-r:#7fb0e6; }\n.glow-r  { --wm-r:#b18fe0; }\n.glow-sr { --wm-r:#e46f9f; }\n.glow-ur { --wm-r:#f0912f; }\n.glow-l  { --wm-r:#e8c93a; }\n\n/* the card: flat dark surface, hairline border, one rarity accent line, no glow */\n[class*=\"glow-\"] {\n  background: #141613 !important;\n  box-shadow: none !important;\n  border: 1px solid #262a26 !important;\n  border-bottom: 3px solid var(--wm-r, #262a26) !important;\n}\n\n/* remove the rarity-PNG backdrop (the giant scaled image behind the card) */\n[class*=\"glow-\"] > img:first-child { display: none !important; }\n\n/* remove the inset gradient overlay and the tint over the article image */\n[class*=\"glow-\"] > div.absolute.inset-0 { background-image: none !important; }\n[class*=\"glow-\"] .bg-black\\/20 { background: transparent !important; }\n\n/* card text: light and readable on the dark surface */\n[class*=\"glow-\"] > div:last-child,\n[class*=\"glow-\"] > div:last-child * { color: #e8eae7 !important; }\n[class*=\"glow-\"] > div:last-child p { color: #98a29a !important; }\n\n/* stats divider as a hairline */\n[class*=\"glow-\"] .border-t { border-color: #262a26 !important; }\n";
  function inject() {
    if (document.getElementById("wm-polish")) return;
    var s = document.createElement("style");
    s.id = "wm-polish";
    s.textContent = css;
    (document.head || document.documentElement).appendChild(s);
  }
  inject();
  document.addEventListener("DOMContentLoaded", inject);
})();
