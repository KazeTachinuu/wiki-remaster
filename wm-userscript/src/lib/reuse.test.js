import { describe, it, expect } from "bun:test";
import { reuse } from "./reuse.js";

describe("reuse", () => {
  it("keeps the old object for an unchanged row, takes the fresh one for a changed or new row", () => {
    const a = { id: 1, price: 10 }, b = { id: 2, price: 20 };
    const out = reuse([a, b], [{ id: 1, price: 10 }, { id: 2, price: 25 }, { id: 3, price: 5 }]);
    expect(out[0]).toBe(a);
    expect(out[1]).not.toBe(b);
    expect(out.map((r) => r.price)).toEqual([10, 25, 5]);
  });
  it("follows the fresh order and drops rows gone", () => {
    const a = { id: 1 }, b = { id: 2 };
    expect(reuse([a, b], [{ id: 2 }])).toEqual([b]);
    expect(reuse(null, [{ id: 1 }])).toEqual([{ id: 1 }]);
  });
});
