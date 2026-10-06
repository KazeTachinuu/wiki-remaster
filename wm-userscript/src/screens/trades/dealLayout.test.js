import { describe, it, expect } from "bun:test";
import { dealLayout, sideShape, DEAL } from "./dealLayout.js";

const side = (n, chip = false) => ({ n, chip });

describe("sideShape", () => {
  it("puts coins beside cards as a chip, alone as a card-sized tile", () => {
    expect(sideShape([{}, {}], 30)).toEqual({ n: 2, chip: true });
    expect(sideShape([], 30)).toEqual({ n: 1, chip: false });
    expect(sideShape([], 0)).toEqual({ n: 1, chip: false });
  });
});

describe("dealLayout", () => {
  it("faces the sides on a wide pane, both at the same size", () => {
    const l = dealLayout(1100, 600, side(1), side(2));
    expect(l.stacked).toBe(false);
    expect([l.give, l.get]).toEqual([1, 2]);
    expect(l.w).toBeGreaterThanOrEqual(250);
  });
  it("never exceeds the largest size, however large the pane", () => {
    expect(dealLayout(3000, 2000, side(1), side(1)).w).toBe(DEAL.max);
  });
  it("stacks the sides on a tall narrow pane", () => {
    const l = dealLayout(736, 800, side(1), side(3));
    expect(l.stacked).toBe(true);
    expect(l.w).toBeGreaterThan(200);
  });
  it("fits a phone without scrolling when the cards stay legible", () => {
    const l = dealLayout(358, 630, side(1), side(1));
    expect(l.stacked).toBe(true);
    expect(l.w).toBeGreaterThanOrEqual(140);
  });
  it("shrinks the cards on a short laptop pane rather than cut a side, two cards side by side", () => {
    // the 1280x720 split: one card against two (and WikiBidous) all in view
    for (const H of [338, 310]) {
      const l = dealLayout(525, H, side(1), side(2, true));
      expect(l).toMatchObject({ stacked: false, give: 1, get: 2, fits: true });
      expect(l.w).toBeGreaterThanOrEqual(DEAL.floor);
    }
    expect(dealLayout(525, 338, side(1), side(2))).toMatchObject({ stacked: false, give: 1, get: 2, fits: true });
  });
  it("faces the sides on a laptop pane when the cards stay whole", () => {
    expect(dealLayout(900, 560, side(1), side(2, true))).toMatchObject({ stacked: false, give: 1, get: 2, fits: true });
  });
  it("scrolls rather than shrink cards below the legible size", () => {
    expect(dealLayout(558, 200, side(2), side(3))).toMatchObject({ w: DEAL.min, fits: false });
  });
  it("falls back to one column when nothing is wide enough", () => {
    expect(dealLayout(100, 100, side(3), side(3))).toEqual({ stacked: true, w: 100 - 2 * DEAL.pad, give: 1, get: 1, fits: false });
  });
});
