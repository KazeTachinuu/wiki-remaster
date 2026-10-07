import { describe, it, expect } from "bun:test";
import { nTrade, nMessage } from "./schema.js";
import { whoAmI, chatMe, tradeTabs, sideValue, verdict, balanceLabel, verdictTitle, chainOf, roundsOf, timeline, otherOf, NO_ME, offerSummary, dealLine, balanceBadge, stepIn, afterLeaving } from "./trades.js";

const card = (id, rarity = "C") => ({ id, rarity, atk: 1, def: 2, wikipedia_title: "T" + id });
const raw = (o) => ({
  id: "t1", status: "pending", initiator_id: "u2", recipient_id: "me",
  initiator: { id: "u2", username: "Basile", avatar_url: null }, recipient: { id: "me", username: "Moi" },
  items: [
    { id: "i1", card: card("c1", "R"), card_id: "c1", user_card_id: "uc1", offered_by: "u2", snapshot_rarity: "R" },
    { id: "i2", card: card("c2", "PC"), card_id: "c2", user_card_id: "uc2", offered_by: "me" },
  ],
  initiator_wikibidous: 0, recipient_wikibidous: 100, parent_trade_id: null,
  created_at: "2026-10-05T16:44:21Z", updated_at: "2026-10-05T20:23:46Z", ...o,
});

describe("nTrade", () => {
  it("splits sides by offered_by and maps coins to the right side", () => {
    const t = nTrade(raw(), "me");
    expect(t.incoming).toBe(true);
    expect(t.other.username).toBe("Basile");
    expect(t.give.map((i) => i.card.id)).toEqual(["c2"]);
    expect(t.get.map((i) => i.card.id)).toEqual(["c1"]);
    expect(t.giveCoins).toBe(100); // I am the recipient: recipient_wikibidous is mine to give
    expect(t.getCoins).toBe(0);
  });
  it("prefers snapshot rarity/stats (the card may have changed since)", () => {
    const t = nTrade(raw({ items: [{ id: "i", card: card("c9", "C"), user_card_id: "u", offered_by: "u2", snapshot_rarity: "SR", snapshot_atk: 9 }] }), "me");
    expect(t.get[0].card.rarity).toBe("SR");
    expect(t.get[0].card.atk).toBe(9);
  });
  it("is outgoing when I initiated", () => {
    const t = nTrade(raw({ initiator_id: "me", recipient_id: "u2", initiator: { id: "me" }, recipient: { id: "u2", username: "Basile" } }), "me");
    expect(t.incoming).toBe(false);
    expect(t.other.username).toBe("Basile");
  });
  it("refuses to guess a split when me is unknown", () => {
    expect(() => nTrade(raw(), null)).toThrow(NO_ME);
  });
});

describe("whoAmI", () => {
  it("infers me as the party common to every trade", () => {
    const a = raw(), b = raw({ id: "t2", initiator_id: "me", recipient_id: "u3" });
    expect(whoAmI([a, b], null)).toBe("me");
  });
  it("finds me by my username, even with a single trade", () => {
    expect(whoAmI([raw()], null, "Moi")).toBe("me");
  });
  it("finds me by my username when every trade is with the same friend", () => {
    const a = raw(), b = raw({ id: "t2", initiator_id: "me", recipient_id: "u2", initiator: { id: "me", username: "Moi" }, recipient: { id: "u2", username: "Basile" } });
    const me = whoAmI([a, b], null, "Moi");
    expect(me).toBe("me");
    const tabs = tradeTabs([a, b].map((t) => nTrade(t, me)));
    expect(tabs.incoming.map((t) => t.id)).toEqual(["t1"]);
    expect(tabs.outgoing.map((t) => t.id)).toEqual(["t2"]);
    expect(nTrade(a, me).give.map((i) => i.card.id)).toEqual(["c2"]);
  });
  it("returns null when it cannot tell (one friend, no username)", () => {
    expect(whoAmI([raw()], null)).toBe(null);
    expect(whoAmI([raw(), raw({ id: "t2", initiator_id: "me", recipient_id: "u2" })], null)).toBe(null);
    expect(whoAmI([], null)).toBe(null);
  });
});

describe("tradeTabs", () => {
  it("files pending incoming/outgoing and the rest as history, newest first", () => {
    const t = (id, status, incoming, updatedAt) => ({ id, status, incoming, updatedAt });
    const tabs = tradeTabs([t("a", "pending", true, "1"), t("b", "pending", false, "2"), t("c", "declined", true, "3"), t("d", "accepted", false, "4")]);
    expect(tabs.incoming.map((x) => x.id)).toEqual(["a"]);
    expect(tabs.outgoing.map((x) => x.id)).toEqual(["b"]);
    expect(tabs.history.map((x) => x.id)).toEqual(["d", "c"]);
  });
  it("shows a negotiation once, by its latest offer", () => {
    const root = { id: "r", status: "countered", incoming: true, updatedAt: "1", parentId: null };
    const counter = { id: "c", status: "pending", incoming: false, updatedAt: "2", parentId: "r" };
    const tabs = tradeTabs([root, counter]);
    expect(tabs.outgoing.map((x) => x.id)).toEqual(["c"]);
    expect(tabs.history).toEqual([]);
    expect(tradeTabs([root, { ...counter, status: "accepted" }]).history.map((x) => x.id)).toEqual(["c"]);
  });
});

describe("timeline", () => {
  const other = { username: "alix" };
  const offer = { id: "r", incoming: true, other, createdAt: "t1", updatedAt: "t2", status: "countered" };
  const counter = { id: "c", incoming: false, other, createdAt: "t2", updatedAt: "t3" };
  const line = (steps) => steps.map((s) => `${s.text} ${s.by} @${s.at}`);
  it("tells each offer, then who answered the last one", () => {
    expect(line(timeline([offer, { ...counter, status: "accepted" }]))).toEqual(["Offre de alix @t1", "Contre-offre de vous @t2", "Acceptée par alix @t3"]);
    expect(line(timeline([{ ...offer, status: "declined" }]))).toEqual(["Offre de alix @t1", "Refusée par vous @t2"]);
  });
  it("names the sender when an offer is withdrawn, and waits without a date", () => {
    expect(line(timeline([offer, { ...counter, status: "cancelled" }])).at(-1)).toBe("Annulée par vous @t3");
    expect(line(timeline([offer, { ...counter, status: "pending" }])).at(-1)).toBe("En attente de alix @null");
  });
});

describe("sideValue / verdict", () => {
  const it_ = (id) => ({ card: { id } });
  it("adds card values and coins", () => {
    expect(sideValue([it_("a"), it_("b")], 10, new Map([["a", 20], ["b", 5]]))).toEqual({ total: 35, unknown: 0 });
  });
  it("counts coins-only sides", () => expect(sideValue([], 100, new Map())).toEqual({ total: 100, unknown: 0 }));
  it("reports cards without a value instead of counting them as 0 silently", () => {
    expect(sideValue([it_("a"), it_("x")], 0, new Map([["a", 20], ["x", null]]))).toEqual({ total: 20, unknown: 1 });
  });
  it("calls it balanced within 15 %", () => expect(verdict({ total: 100 }, { total: 110 }).kind).toBe("balanced"));
  it("advantage / disadvantage with the difference", () => {
    expect(verdict({ total: 20 }, { total: 45 })).toEqual({ kind: "advantage", diff: 25 });
    expect(verdict({ total: 45 }, { total: 20 })).toEqual({ kind: "disadvantage", diff: -25 });
  });
  it("nothing on either side is balanced", () => expect(verdict({ total: 0 }, { total: 0 }).kind).toBe("balanced"));
  it("never gives a firm verdict while a card has no known value", () => {
    // one unpriced Légendaire given for 5 WikiBidous is not "advantage"
    expect(verdict({ total: 0, unknown: 1 }, { total: 5, unknown: 0 })).toEqual({ kind: "unknown", diff: 5, unknown: 1 });
    expect(verdict({ total: 50, unknown: 0 }, { total: 0, unknown: 2 })).toEqual({ kind: "unknown", diff: -50, unknown: 2 });
  });
});

describe("roundsOf", () => {
  it("counts each negotiation's offers, for every trade of it", () => {
    const all = [{ id: "a" }, { id: "b", parentId: "a" }, { id: "c", parentId: "b" }, { id: "x" }];
    const r = roundsOf(all);
    expect([r.get("a"), r.get("c"), r.get("x")]).toEqual([3, 3, 1]);
  });
  it("stays fast for a power user: 2000 trades, one of 500 offers", () => {
    const all = Array.from({ length: 1500 }, (_, i) => ({ id: "t" + i }));
    for (let i = 0; i < 500; i++) all.push({ id: "c" + i, parentId: i ? "c" + (i - 1) : undefined });
    const t0 = performance.now();
    const r = roundsOf(all);
    const chain = chainOf(all.at(-1), all);
    expect(performance.now() - t0).toBeLessThan(50);
    expect(r.get("c499")).toBe(500);
    expect(chain).toHaveLength(500);
  });
});

describe("chainOf", () => {
  it("orders a counter-offer chain oldest first", () => {
    const a = { id: "a", parentId: null, createdAt: "1" }, b = { id: "b", parentId: "a", createdAt: "2" }, c = { id: "c", parentId: "b", createdAt: "3" };
    expect(chainOf(b, [c, a, b]).map((x) => x.id)).toEqual(["a", "b", "c"]);
  });
  it("a lone trade is a chain of one", () => expect(chainOf({ id: "z", parentId: null }, []).length).toBe(1));
});

describe("otherOf", () => {
  it("otherOf picks the side that is not me", () => {
    const f = { requester: { id: "me", username: "Moi" }, addressee: { id: "u3", username: "Capucine", avatar_url: null } };
    expect(otherOf(f, "me")).toEqual({ id: "u3", username: "Capucine", avatar: null, ax: 50, ay: 50 });
    expect(() => otherOf(f, null)).toThrow(NO_ME);
  });
});

describe("chatMe", () => {
  const msg = (from, to) => ({ id: "m" + from, sender_id: from, recipient_id: to, content: "x", created_at: "x" });
  it("is the party that is not the friend when the user id is unknown, with one trade", () => {
    const me = chatMe("u2", [raw()], [msg("me", "u2")], null);
    expect(me).toBe("me");
    expect(nTrade(raw(), me).give.map((i) => i.card.id)).toEqual(["c2"]);
  });
  it("reads it from the messages when there is no trade", () => {
    const me = chatMe("u2", [], [msg("u2", "me"), msg("me", "u2")], null);
    expect(me).toBe("me");
    expect([msg("u2", "me"), msg("me", "u2")].map((m) => nMessage(m, me).mine)).toEqual([false, true]);
  });
  it("is null only for an empty conversation", () => expect(chatMe("u2", [], [], null)).toBe(null));
});

describe("balanceLabel", () => {
  it("says the verdict in one short line, signed from my side", () => {
    expect(balanceLabel({ kind: "unknown", diff: 0, unknown: 1 })).toBe("Non estimé");
    expect(balanceLabel({ kind: "balanced", diff: 10 })).toBe("Équilibré");
    expect(balanceLabel({ kind: "advantage", diff: 1500 })).toBe(`+${(1500).toLocaleString("fr")} pour vous`);
    expect(balanceLabel({ kind: "disadvantage", diff: -200 })).toBe("-200 pour vous");
  });
  it("titles the verdict with the same words as the short line", () => {
    expect(verdictTitle({ kind: "unknown" })).toBe(balanceLabel({ kind: "unknown" }));
    expect(verdictTitle({ kind: "balanced" })).toBe(balanceLabel({ kind: "balanced" }));
    expect(verdictTitle({ kind: "advantage", diff: 5 })).toBe("À votre avantage");
    expect(verdictTitle({ kind: "disadvantage", diff: -5 })).toBe("À votre désavantage");
  });
});

describe("offerSummary", () => {
  it("counts each side in a few words, coins included", () => {
    expect(offerSummary(2, 0, 1, 0)).toBe("2 contre 1");
    expect(offerSummary(1, 50, 0, 1200)).toBe(`1 + 50 wb contre ${(1200).toLocaleString("fr")} wb`);
    expect(offerSummary(0, 0, 3, 0)).toBe("rien contre 3");
  });
  it("is null while nothing is picked", () => {
    expect(offerSummary(0, 0, 0, 0)).toBe(null);
  });
});

describe("dealLine", () => {
  const nb = (s) => s.replaceAll("\u00a0", " ");
  it("names my cards, then counts theirs, coins added on either side", () => {
    expect(nb(dealLine(2, 0, 1, 0))).toBe("2 cartes contre 1");
    expect(nb(dealLine(1, 0, 3, 0))).toBe("1 carte contre 3");
    expect(nb(dealLine(1, 50, 2, 0))).toBe("1 carte + 50 wb contre 2");
    expect(nb(dealLine(1, 0, 0, 1200))).toBe(`1 carte contre ${(1200).toLocaleString("fr")} wb`);
    expect(nb(dealLine(0, 80, 1, 0))).toBe("80 wb contre 1 carte");
  });
  it("keeps each side on one line, breaking only before 'contre'", () => {
    expect(dealLine(1, 20, 2, 30)).toBe("1\u00a0carte\u00a0+\u00a020\u00a0wb contre\u00a02\u00a0+\u00a030\u00a0wb");
  });
});

describe("balanceBadge", () => {
  it("is the signed gap, '=' when balanced, '-' when a value is missing", () => {
    expect(balanceBadge({ kind: "advantage", diff: 50 })).toBe("+50");
    expect(balanceBadge({ kind: "disadvantage", diff: -1500 })).toBe(`-${(1500).toLocaleString("fr")}`);
    expect(balanceBadge({ kind: "balanced", diff: 4 })).toBe("=");
    expect(balanceBadge({ kind: "unknown", diff: 0, unknown: 2 })).toBe("-");
  });
});

describe("stepIn", () => {
  const list = [{ id: "a" }, { id: "b" }, { id: "c" }];
  it("moves the selection by one, stopping at the ends", () => {
    expect(stepIn(list, "a", 1).id).toBe("b");
    expect(stepIn(list, "b", -1).id).toBe("a");
    expect(stepIn(list, "c", 1).id).toBe("c");
    expect(stepIn(list, "a", -1).id).toBe("a");
  });
  it("starts from the first row when nothing is selected", () => {
    expect(stepIn(list, null, 1).id).toBe("a");
    expect(stepIn([], null, 1)).toBe(null);
  });
});

describe("afterLeaving", () => {
  const list = [{ id: "a" }, { id: "b" }, { id: "c" }];
  it("selects the next row once one leaves the list, else the one before", () => {
    expect(afterLeaving(list, "a").id).toBe("b");
    expect(afterLeaving(list, "b").id).toBe("c");
    expect(afterLeaving(list, "c").id).toBe("b");
  });
  it("is null when it was the last one, or not in the list", () => {
    expect(afterLeaving([{ id: "a" }], "a")).toBe(null);
    expect(afterLeaving(list, "z")).toBe(null);
  });
});
