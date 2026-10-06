import { describe, it, expect } from "bun:test";
import { rarest, sounded, pickSound, isTabSwitch } from "./sfx.js";

const rec = () => { const heard = []; const f = (n) => heard.push(n); f.heard = heard; return f; };

describe("rarest", () => {
  it("finds the rarest rarity of a haul", () => {
    expect(rarest([{ rarity: "C" }, { rarity: "SR" }, { rarity: "R" }])).toBe("SR");
    expect(rarest([{ rarity: "PC" }, { rarity: "L" }, { rarity: "UR" }])).toBe("L");
    expect(rarest([{ rarity: "C" }])).toBe("C");
  });
  it("is null for nothing", () => {
    expect(rarest([])).toBe(null);
    expect(rarest(undefined)).toBe(null);
  });
});

describe("sounded", () => {
  it("plays success and passes the result through", async () => {
    const p = rec();
    expect(await sounded(async () => 42, p)).toBe(42);
    expect(p.heard).toEqual(["success"]);
  });
  it("plays error and rethrows", async () => {
    const p = rec();
    const err = new Error("nope");
    await expect(sounded(async () => { throw err; }, p)).rejects.toBe(err);
    expect(p.heard).toEqual(["error"]);
  });
});

describe("pickSound", () => {
  it("selects what was not picked, deselects what was", () => {
    const p = rec();
    pickSound(false, p); pickSound(true, p);
    expect(p.heard).toEqual(["select", "deselect"]);
  });
});

describe("isTabSwitch", () => {
  const el = (attrs) => ({ closest: (sel) => (sel === '[role="tab"]' && attrs ? { getAttribute: (k) => attrs[k] ?? null, disabled: !!attrs.disabled } : null) });
  it("is a click on a tab that is not the current one", () => {
    expect(isTabSwitch(el({ "aria-selected": "false" }))).toBe(true);
  });
  it("ignores the current tab, disabled tabs and anything else", () => {
    expect(isTabSwitch(el({ "aria-selected": "true" }))).toBe(false);
    expect(isTabSwitch(el({ "aria-selected": "false", disabled: true }))).toBe(false);
    expect(isTabSwitch(el(null))).toBe(false);
    expect(isTabSwitch(null)).toBe(false);
  });
});
