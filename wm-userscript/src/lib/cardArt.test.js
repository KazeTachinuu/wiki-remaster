import { describe, it, expect } from "bun:test";
import { artKey } from "./cardArt.js";

describe("artKey", () => {
  it("is the card's rarity", () => {
    expect(artKey({ rarity: "R" })).toBe("R");
    expect(artKey({ rarity: "L" })).toBe("L");
  });
  it("is the onyx art for a shiny Legendary only", () => {
    expect(artKey({ rarity: "L" }, true)).toBe("onyx");
    expect(artKey({ rarity: "SR" }, true)).toBe("SR");
  });
  it("falls back to the common art for an unknown rarity", () => {
    expect(artKey({ rarity: "?" })).toBe("C");
  });
});
