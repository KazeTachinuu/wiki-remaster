// Persisted UI preferences: display toggles plus each screen's last sort, filter and tab.
// Any change is saved automatically.
const KEY = "wm-settings";

const DEFAULTS = {
  hideStats: false, // hide ATK/DEF everywhere
  hideSensitive: true, // blur images flagged nsfw_image until revealed
  sideRail: false, // the sidebar folded to a rail of icons (wide screens)
  collection: { sort: "rarity", filter: "ALL", favOnly: false },
  catalog: { sort: "rarity", rarity: "", wishOnly: false },
  market: { tab: "browse", sort: "recent", rarity: "", deal: "good" },
};

function load() {
  try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch { return {}; }
}

const saved = load();
export const settings = $state(
  Object.fromEntries(Object.entries(DEFAULTS).map(([k, v]) => [k, typeof v === "object" ? { ...v, ...saved[k] } : saved[k] ?? v]))
);

$effect.root(() => {
  $effect(() => {
    const json = JSON.stringify(settings); // reads every field, so any change re-saves
    try { localStorage.setItem(KEY, json); } catch {}
  });
});

export const toggleHideStats = () => (settings.hideStats = !settings.hideStats);
export const toggleHideSensitive = () => (settings.hideSensitive = !settings.hideSensitive);
export const toggleSideRail = () => (settings.sideRail = !settings.sideRail);

/** Switch back to the native site (the overlay stays off until re-enabled). */
export function useOriginalSite(path) {
  try { localStorage.setItem("wm-off", "1"); } catch {}
  path ? location.assign(path) : location.reload();
}
