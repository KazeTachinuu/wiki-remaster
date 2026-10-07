import { describe, it, expect } from "bun:test";
import { needsHuman, withHumanCheck, human, resolveHuman } from "./humanCheck.js";

describe("needsHuman", () => {
  it("recognises both server shapes", () => {
    expect(needsHuman({ code: "human_verification_required" })).toBe(true);
    expect(needsHuman({ data: { human_verification_required: true } })).toBe(true);
    expect(needsHuman({ code: "bid_too_low" })).toBe(false);
  });
  it("recognises the anti-bot refusal by its wording on routes whose code is not known", () => {
    expect(needsHuman(new Error("Vérification anti-bot requise."))).toBe(true);
    expect(needsHuman({ code: "turnstile_required" })).toBe(true);
    expect(needsHuman(new Error("La vérification a échoué. Réessaie."))).toBe(false);
  });
});

describe("withHumanCheck", () => {
  it("runs once when no check is needed", async () => {
    let n = 0;
    expect(await withHumanCheck(async () => ++n)).toBe(1);
  });
  it("asks for the check, then runs exactly once more", async () => {
    let n = 0;
    const p = withHumanCheck(async () => { if (++n === 1) throw Object.assign(new Error("x"), { code: "human_verification_required" }); return "done"; });
    await Promise.resolve(); await Promise.resolve();
    expect(human.open).toBe(true);
    resolveHuman(true);
    expect(await p).toBe("done");
    expect(n).toBe(2);
    expect(human.open).toBe(false);
  });
  it("a cancelled check rejects with a clear message and does not run again", async () => {
    let n = 0;
    const p = withHumanCheck(async () => { n++; throw Object.assign(new Error("x"), { code: "human_verification_required" }); });
    await Promise.resolve(); await Promise.resolve();
    resolveHuman(false);
    await expect(p).rejects.toThrow(/vérification/i);
    expect(n).toBe(1);
  });
});
