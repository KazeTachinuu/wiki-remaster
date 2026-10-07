import { describe, it, expect } from "bun:test";
import { isOurs } from "./routes.js";

describe("isOurs", () => {
  it("covers our screens (my own profile among them), an auction, and ignores query and hash", () => {
    for (const p of ["/", "/pulls", "/collection", "/global-collection", "/trades", "/trades/", "/marketplace", "/marketplace/42", "/trades?x=1", "/marketplace/42#bid", "/friends", "/achievements", "/profile", "/profile/alix"]) expect(isOurs(p)).toBe(true);
  });
  it("leaves every other page to the original site", () => {
    for (const p of ["/guild", "/battle", "/dms", "/profile/alix/collection", "/marketplace/42/bids", null, undefined]) expect(isOurs(p)).toBe(false);
  });
});
