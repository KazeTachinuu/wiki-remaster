// Fails the build if banned "AI tell" characters show up in the source.
// Bans em/en dashes, unicode ellipsis, decorative arrows, and glyph icons
// (use plain words or inline SVG instead). French middot and guillemets are allowed.
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, extname } from "node:path";

const ROOT = new URL("..", import.meta.url).pathname;
const SCAN_DIRS = ["src", "plugins", "mock", "../docs"];
const EXTRA_FILES = ["../README.md", "vite.config.js"];
const EXTS = new Set([".svelte", ".js", ".mjs", ".css", ".md"]);

const BANNED = {
  "—": "em dash (use a comma or period)",
  "–": "en dash (use a hyphen)",
  "…": "ellipsis char (use ...)",
  "←": "left arrow (use an SVG icon)",
  "→": "right arrow (use an SVG icon)",
  "•": "bullet (use a list or SVG)",
  "×": "multiplication sign (use x)",
  "★": "star glyph (use an SVG icon)",
  "☆": "star glyph (use an SVG icon)",
  "♥": "heart glyph (use an SVG icon)",
  "♡": "heart glyph (use an SVG icon)",
  "✦": "sparkle glyph (use an SVG icon)",
  "✓": "check glyph (use an SVG icon)",
  "✔": "check glyph (use an SVG icon)",
  "✧": "sparkle glyph (use an SVG icon)",
  "“": "smart quote (use \")",
  "”": "smart quote (use \")",
};

const files = [];
function walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p);
    else if (EXTS.has(extname(p))) files.push(p);
  }
}
for (const d of SCAN_DIRS) walk(join(ROOT, d));
for (const f of EXTRA_FILES) files.push(join(ROOT, f));

let hits = 0;
for (const f of files) {
  const lines = readFileSync(f, "utf8").split("\n");
  lines.forEach((line, i) => {
    for (const [ch, why] of Object.entries(BANNED)) {
      if (line.includes(ch)) {
        console.log(`${f.replace(ROOT, "")}:${i + 1}  ${why}  ->  ${line.trim().slice(0, 80)}`);
        hits++;
      }
    }
  });
}

if (hits) { console.error(`\nStyle check failed: ${hits} banned character(s).`); process.exit(1); }
console.log("Style check passed: no banned characters.");
