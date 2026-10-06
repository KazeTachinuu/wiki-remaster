// The rarity background art, exactly as the real site (RARITY_CONFIG bgImage), served from
// wiki-masters.com so it also resolves in local dev. A shiny Legendary uses the dark "onyx" art
// instead of the gold one: the "black legendary" look. Shared by the full card and its thumbnail.
export const ASSET_BASE = "https://www.wiki-masters.com";
const RBG = { C: "/commun.png", PC: "/peu_commun.png", R: "/rare.png", SR: "/super_rare.png", UR: "/ultra_rare.png", L: "/legendaire.png" };

export const isOnyx = (card, shiny = false) => !!shiny && card.rarity === "L";

/** The art a card without a photo shows (and the fallback of a broken one). */
export const rarityArt = (card, shiny = false) => ASSET_BASE + (isOnyx(card, shiny) ? "/shiny/onyx-art.webp" : (RBG[card.rarity] || "/commun.png"));
