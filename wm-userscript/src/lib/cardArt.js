// Which rarity art a card without a photo shows (images in art.js). A shiny Legendary is "onyx".
const RARITIES = new Set(["C", "PC", "R", "SR", "UR", "L"]);

export const isOnyx = (card, shiny = false) => !!shiny && card.rarity === "L";

/** The art a card without a photo shows (and the fallback of a broken one): its rarity's, or "onyx". */
export const artKey = (card, shiny = false) => (isOnyx(card, shiny) ? "onyx" : RARITIES.has(card.rarity) ? card.rarity : "C");
