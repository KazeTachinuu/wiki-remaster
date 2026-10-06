import { describe, it, expect, beforeEach } from "bun:test";
import { load, save, drop, sweep } from "./cache.js";

// a plain in-memory localStorage (one per test)
function memoryStorage() {
  const m = new Map();
  return {
    getItem: (k) => (m.has(k) ? m.get(k) : null), setItem: (k, v) => m.set(k, String(v)), removeItem: (k) => m.delete(k),
    get length() { return m.size; }, key: (i) => [...m.keys()][i] ?? null, m,
  };
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
    localStorage.setItem("wm-cache:v3:bad", "{not json");
    expect(load("bad", 60e3)).toBe(null);
    save("k", 1);
    drop("k");
    expect(load("k", 60e3)).toBe(null);
  });

  it("sweeps what can no longer be read: other versions, entries past a week; leaves the site's own data", () => {
    save("kept", 1);
    localStorage.setItem("wm-cache:v2:collection.v4", JSON.stringify({ t: Date.now(), v: [] }));
    localStorage.setItem("wm-cache:v3:stale", JSON.stringify({ t: Date.now() - 8 * 86400e3, v: 1 }));
    localStorage.setItem("game-own-key", "x");
    sweep();
    expect([...localStorage.m.keys()].sort()).toEqual(["game-own-key", "wm-cache:v3:kept"]);
  });

  it("never throws when storage is blocked or full", () => {
    globalThis.localStorage = { getItem() { throw new Error("blocked"); }, setItem() { throw new Error("full"); }, removeItem() { throw new Error("blocked"); } };
    expect(() => save("k", 1)).not.toThrow();
    expect(load("k", 60e3)).toBe(null);
    expect(() => drop("k")).not.toThrow();
    expect(() => sweep()).not.toThrow();
  });
});
