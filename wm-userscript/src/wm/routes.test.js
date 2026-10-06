import { describe, it, expect } from "bun:test";
import { isOurs } from "./routes.js";

describe("isOurs", () => {
  it("covers our screens, an auction, and ignores query and hash", () => {
    for (const p of ["/", "/pulls", "/collection", "/global-collection", "/trades", "/trades/", "/marketplace", "/marketplace/42", "/trades?x=1", "/marketplace/42#bid"]) expect(isOurs(p)).toBe(true);
  });
  it("leaves every other page to the original site", () => {
    for (const p of ["/friends", "/guild", "/battle", "/profile/doobii", "/marketplace/42/bids", null, undefined]) expect(isOurs(p)).toBe(false);
  });
});
