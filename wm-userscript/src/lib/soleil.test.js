import { describe, it, expect } from "bun:test";
import { soleil } from "./soleil.js";

describe("soleil", () => {
  it("is the same for the same title, different for another", () => {
    expect(soleil("Gare de Lozanne")).toEqual(soleil("Gare de Lozanne"));
    expect(soleil("Gare de Lozanne")).not.toEqual(soleil("Rue de Rivoli"));
  });
  it("keeps stars inside the card and the tilt small", () => {
    const { stars, tilt } = soleil("Château de Chambord");
    expect(stars.length).toBe(46);
    for (const [x, y] of stars) { expect(x).toBeGreaterThanOrEqual(0); expect(x).toBeLessThan(100); expect(y).toBeLessThan(140); }
    expect(Math.abs(tilt)).toBeLessThanOrEqual(15);
  });
});
