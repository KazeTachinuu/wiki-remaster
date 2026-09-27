import { describe, it, expect } from "vitest";
import { createQueue } from "./queue.js";

const tick = () => new Promise((r) => setTimeout(r, 0));

describe("createQueue", () => {
  it("dedupes by key: the same key never runs twice", async () => {
    const q = createQueue({ concurrency: 2 });
    let runs = 0;
    const task = async () => { runs++; };
    q.push("a", task);
    q.push("a", task);
    q.push("a", task);
    await tick();
    expect(runs).toBe(1);
    expect(q.has("a")).toBe(true);
  });

  it("never exceeds the concurrency limit", async () => {
    const q = createQueue({ concurrency: 2 });
    let active = 0;
    let peak = 0;
    let release;
    const gate = new Promise((r) => { release = r; });
    const task = async () => { active++; peak = Math.max(peak, active); await gate; active--; };
    for (const k of ["a", "b", "c", "d"]) q.push(k, task);
    await tick();
    expect(peak).toBe(2);
    expect(q.activeCount).toBe(2);
    expect(q.pendingCount).toBe(2);
    release();
    await tick();
    await tick();
    expect(peak).toBe(2);
  });

  it("a failing task does not stall the pump", async () => {
    const q = createQueue({ concurrency: 1 });
    let ran = false;
    q.push("bad", async () => { throw new Error("boom"); });
    q.push("good", async () => { ran = true; });
    await tick();
    await tick();
    expect(ran).toBe(true);
  });

  it("prioritize moves a queued key to the front", async () => {
    const q = createQueue({ concurrency: 1 });
    const order = [];
    let release;
    const gate = new Promise((r) => { release = r; });
    q.push("blocker", async () => { await gate; order.push("blocker"); });
    q.push("x", async () => { order.push("x"); });
    q.push("y", async () => { order.push("y"); });
    q.prioritize("y"); // y should now run before x once the blocker clears
    release();
    await tick();
    await tick();
    await tick();
    expect(order).toEqual(["blocker", "y", "x"]);
  });
});
