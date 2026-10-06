import { describe, it, expect } from "bun:test";
import { cardSky } from "./cardSky.js";

describe("cardSky", () => {
  it("is the same for the same title, different for another", () => {
    expect(cardSky("Gare de Lozanne")).toEqual(cardSky("Gare de Lozanne"));
    expect(cardSky("Gare de Lozanne")).not.toEqual(cardSky("Rue de Rivoli"));
  });
  it("has 5 to 8 shooting stars, all falling the same way", () => {
    const { shooting } = cardSky("Château de Chambord");
    expect(shooting.length).toBeGreaterThanOrEqual(5);
    expect(shooting.length).toBeLessThanOrEqual(8);
    const slope = ([x0, y0, x1, y1]) => (y1 - y0) / (x1 - x0);
    for (const s of shooting) expect(slope(s)).toBeCloseTo(slope(shooting[0]), 1);
  });
});
