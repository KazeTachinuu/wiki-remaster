// The rarity background art (the real site's RARITY_CONFIG bgImage). A shiny Legendary uses the
// dark "onyx" art instead of the gold one: the "black legendary" look. The images are in art.js;
// this picks which one, for the full card and its thumbnail.
const RARITIES = new Set(["C", "PC", "R", "SR", "UR", "L"]);

export const isOnyx = (card, shiny = false) => !!shiny && card.rarity === "L";

/** The art a card without a photo shows (and the fallback of a broken one): its rarity's, or "onyx". */
export const artKey = (card, shiny = false) => (isOnyx(card, shiny) ? "onyx" : RARITIES.has(card.rarity) ? card.rarity : "C");
