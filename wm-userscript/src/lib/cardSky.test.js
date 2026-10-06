import { describe, it, expect } from "bun:test";
import { cardSky, skyKind } from "./cardSky.js";

describe("cardSky", () => {
  it("is the same for the same title, different for another", () => {
    expect(cardSky("Gare de Lozanne")).toEqual(cardSky("Gare de Lozanne"));
    expect(cardSky("Gare de Lozanne")).not.toEqual(cardSky("Rue de Rivoli"));
  });
  it("keeps stars inside the card, the tilt small and the jets within the art", () => {
    const { stars, tilt, jets } = cardSky("Château de Chambord");
    for (const [x, y] of stars) { expect(x).toBeGreaterThanOrEqual(0); expect(x).toBeLessThan(100); expect(y).toBeLessThan(140); }
    expect(Math.abs(tilt)).toBeLessThanOrEqual(15);
    for (const [, len] of jets) expect(len).toBeLessThanOrEqual(46);
  });
});

describe("skyKind", () => {
  it("a supernova for every Legendary, a sun for shiny, a star otherwise", () => {
    expect(skyKind("L", false)).toBe("nova");
    expect(skyKind("L", true)).toBe("nova");
    expect(skyKind("SR", true)).toBe("sun");
    expect(skyKind("C", false)).toBe("star");
  });
});
