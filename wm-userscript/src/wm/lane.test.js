import { describe, it, expect } from "bun:test";
import { createLane } from "./lane.js";

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

describe("createLane", () => {
  it("never runs more than `concurrency` tasks at once", async () => {
    const lane = createLane({ concurrency: 2, gapMs: 0 });
    let live = 0, peak = 0;
    const task = async () => { live++; peak = Math.max(peak, live); await sleep(10); live--; };
    await Promise.all(Array.from({ length: 6 }, () => lane.run(task)));
    expect(peak).toBe(2);
  });
  it("spaces task starts by at least `gapMs`", async () => {
    const lane = createLane({ concurrency: 5, gapMs: 30 });
    const starts = [];
    await Promise.all(Array.from({ length: 4 }, () => lane.run(async () => starts.push(performance.now()))));
    for (let i = 1; i < starts.length; i++) expect(starts[i] - starts[i - 1]).toBeGreaterThanOrEqual(28);
  });
  it("pause() holds every start until it ends, and reports its state", async () => {
    const lane = createLane({ concurrency: 2, gapMs: 0 });
    const states = [];
    lane.subscribe((s) => states.push(s));
    lane.pause(60);
    const t0 = performance.now();
    let ran = 0;
    await lane.run(async () => ran++);
    expect(performance.now() - t0).toBeGreaterThanOrEqual(55);
    expect(ran).toBe(1);
    expect(states).toContain("paused");
    expect(states.at(-1)).toBe("running");
  });
  it("passes results and errors through", async () => {
    const lane = createLane({ concurrency: 1, gapMs: 0 });
    expect(await lane.run(async () => 7)).toBe(7);
    await expect(lane.run(async () => { throw new Error("x"); })).rejects.toThrow("x");
  });
});
