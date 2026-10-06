import { describe, it, expect } from "bun:test";
import { nf, ago, countdown, secondsUntil } from "./format.js";

const NOW = Date.parse("2026-09-28T12:00:00Z");
const before = (ms) => new Date(NOW - ms).toISOString();

describe("nf", () => {
  it("formats French thousands and shows a dash for missing values", () => {
    expect(nf(12345)).toBe((12345).toLocaleString("fr"));
    expect(nf(null)).toBe("-");
    expect(nf(undefined)).toBe("-");
  });
});

describe("ago", () => {
  it("buckets elapsed time", () => {
    expect(ago(before(20000), NOW)).toBe("à l'instant");
    expect(ago(before(5 * 60000), NOW)).toBe("il y a 5 min");
    expect(ago(before(3 * 3600000), NOW)).toBe("il y a 3 h");
    expect(ago(before(50 * 3600000), NOW)).toBe("il y a 2 j");
  });
  it("is empty for a bad date and clamps the future to now", () => {
    expect(ago("nope", NOW)).toBe("");
    expect(ago(new Date(NOW + 60000).toISOString(), NOW)).toBe("à l'instant");
  });
});

describe("countdown", () => {
  it("picks the two largest units", () => {
    expect(countdown(2 * 86400 + 4 * 3600)).toBe("2 j 4 h");
    expect(countdown(3 * 3600 + 5 * 60)).toBe("3 h 05");
    expect(countdown(4 * 60 + 9)).toBe("4 min");
    expect(countdown(4 * 60 + 9, { seconds: true })).toBe("4 min 09 s");
  });
  it("handles the last minute and the end", () => {
    expect(countdown(42)).toBe("< 1 min");
    expect(countdown(42, { seconds: true })).toBe("42 s");
    expect(countdown(0)).toBe("Terminée");
    expect(countdown(-5)).toBe("Terminée");
  });
});

describe("secondsUntil", () => {
  it("counts down, clamps at 0, and is null for bad input", () => {
    expect(secondsUntil(new Date(NOW + 90000).toISOString(), NOW)).toBe(90);
    expect(secondsUntil(before(1000), NOW)).toBe(0);
    expect(secondsUntil(null, NOW)).toBe(null);
  });
});
