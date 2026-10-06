import { describe, it, expect, beforeEach } from "bun:test";
import { load, save, drop } from "./cache.js";

// a plain in-memory localStorage (one per test)
function memoryStorage() {
  const m = new Map();
  return { getItem: (k) => (m.has(k) ? m.get(k) : null), setItem: (k, v) => m.set(k, String(v)), removeItem: (k) => m.delete(k), m };
}

describe("cache", () => {
  beforeEach(() => { globalThis.localStorage = memoryStorage(); });

  it("returns a saved value while it is younger than maxAge", () => {
    save("k", { a: 1 });
    expect(load("k", 60e3)).toEqual({ a: 1 });
  });

  it("returns null once the value is older than maxAge", () => {
    save("k", 1);
    expect(load("k", -1)).toBe(null);
  });

  it("returns null for a missing key, corrupt data and after drop", () => {
    expect(load("none", 60e3)).toBe(null);
    localStorage.setItem("wm-cache:v2:bad", "{not json");
    expect(load("bad", 60e3)).toBe(null);
    save("k", 1);
    drop("k");
    expect(load("k", 60e3)).toBe(null);
  });

  it("never throws when storage is blocked or full", () => {
    globalThis.localStorage = { getItem() { throw new Error("blocked"); }, setItem() { throw new Error("full"); }, removeItem() { throw new Error("blocked"); } };
    expect(() => save("k", 1)).not.toThrow();
    expect(load("k", 60e3)).toBe(null);
    expect(() => drop("k")).not.toThrow();
  });
});
