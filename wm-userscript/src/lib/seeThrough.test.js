import { describe, it, expect } from "bun:test";
import { transparentShare } from "./seeThrough.js";

const px = (...alphas) => new Uint8ClampedArray(alphas.flatMap((a) => [0, 0, 0, a]));

describe("transparentShare", () => {
  it("counts pixels at least half transparent", () => {
    expect(transparentShare(px(0, 0, 255, 255))).toBe(0.5);
    expect(transparentShare(px(127, 128))).toBe(0.5);
  });
  it("is 0 for an opaque photo and for no data", () => {
    expect(transparentShare(px(255, 255, 255))).toBe(0);
    expect(transparentShare(new Uint8ClampedArray())).toBe(0);
  });
});
