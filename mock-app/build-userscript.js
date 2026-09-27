// Generates the Tampermonkey userscript from public/polish.css.
// This guarantees the shipped userscript and the local test use the SAME CSS.
// Run:  node build-userscript.js

const fs = require("fs");
const path = require("path");

const polish = fs.readFileSync(path.join(__dirname, "public", "polish.css"), "utf8");

const header = `// ==UserScript==
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
`;

const body = `
(function () {
  "use strict";
  var css = ${JSON.stringify(polish)};
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
`;

const out = path.join(__dirname, "..", "wikimasters-polish.user.js");
fs.writeFileSync(out, header + body);
console.log("Wrote " + out + " (" + polish.length + " bytes of CSS embedded)");
