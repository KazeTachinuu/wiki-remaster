import { describe, it, expect, beforeEach } from "bun:test";
import { isNewer, headerVersion, availableUpdate } from "./update.js";

describe("update check", () => {
  beforeEach(() => {
    const m = new Map();
    globalThis.localStorage = { getItem: (k) => m.get(k) ?? null, setItem: (k, v) => m.set(k, String(v)), removeItem: (k) => m.delete(k), get length() { return m.size; }, key: (i) => [...m.keys()][i] ?? null };
  });
  it("compares versions number by number", () => {
    expect(isNewer("0.12.10", "0.12.9")).toBe(true);
    expect(isNewer("0.13.0", "0.12.99")).toBe(true);
    expect(isNewer("0.12.7", "0.12.7")).toBe(false);
    expect(isNewer("0.12.6", "0.12.7")).toBe(false);
    expect(isNewer("1.0", "0.99.9")).toBe(true);
  });
  it("reads @version from a userscript header", () => {
    expect(headerVersion("// ==UserScript==\n// @name  x\n// @version      0.12.9\n// ==/UserScript==")).toBe("0.12.9");
    expect(headerVersion("nothing")).toBe(null);
  });
  it("says which newer version is out, asks once, and stays quiet on failure", async () => {
    let calls = 0;
    const ok = async () => { calls++; return { ok: true, text: async () => "// @version 0.13.0" }; };
    expect(await availableUpdate("0.12.7", { metaUrl: "m", fetch: ok })).toBe("0.13.0");
    expect(await availableUpdate("0.12.7", { metaUrl: "m", fetch: ok })).toBe("0.13.0");
    expect(calls).toBe(1); // remembered
    expect(await availableUpdate("0.13.0", { metaUrl: "m", fetch: ok })).toBe(null);
    localStorage.removeItem("wm-cache:v3:update.latest");
    expect(await availableUpdate("0.12.7", { metaUrl: "m", fetch: async () => { throw new Error("offline"); } })).toBe(null);
  });
});
