import { describe, it, expect } from "bun:test";
import { rarityArt } from "./cardArt.js";

describe("rarityArt", () => {
  it("is the real site's art for the card's rarity", () => {
    expect(rarityArt({ rarity: "R" })).toBe("https://www.wiki-masters.com/rare.png");
    expect(rarityArt({ rarity: "L" })).toBe("https://www.wiki-masters.com/legendaire.png");
  });
  it("is the onyx art for a shiny Legendary only", () => {
    expect(rarityArt({ rarity: "L" }, true)).toBe("https://www.wiki-masters.com/shiny/onyx-art.webp");
    expect(rarityArt({ rarity: "SR" }, true)).toBe("https://www.wiki-masters.com/super_rare.png");
  });
  it("falls back to the common art for an unknown rarity", () => {
    expect(rarityArt({ rarity: "?" })).toBe("https://www.wiki-masters.com/commun.png");
  });
});
