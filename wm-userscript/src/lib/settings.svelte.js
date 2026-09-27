// Global, persisted UI preferences. A .svelte.js module so runes work and any
// component importing `settings` reacts to changes.
const KEY = "wm-settings";

function load() {
  try { return JSON.parse(localStorage.getItem(KEY) || "{}"); } catch { return {}; }
}

export const settings = $state({
  hideStats: false, // hide ATK/DEF everywhere (the user does not care about them)
  hideSensitive: true, // blur images flagged nsfw_image until the viewer reveals them
  ...load(),
});

function persist() {
  try { localStorage.setItem(KEY, JSON.stringify({ hideStats: settings.hideStats, hideSensitive: settings.hideSensitive })); } catch {}
}

export function toggleHideStats() {
  settings.hideStats = !settings.hideStats;
  persist();
}

export function toggleHideSensitive() {
  settings.hideSensitive = !settings.hideSensitive;
  persist();
}
