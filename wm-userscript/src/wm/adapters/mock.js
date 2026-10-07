/**
 * Mock adapter (localhost dev). The dev API (plugins/vite-mock-api.js) mirrors the real
 * routes and shapes, so this reuses the real adapter and only swaps what lives outside
 * /api on the real site: the Supabase profile, the user id, and a dev-only reset.
 */

import { api } from "../api.js";
import { RealData } from "./real.js";
import { nMe, achievementsOf } from "../social.js";
import { readAllCopies } from "../discard.js";

export const MockData = {
  ...RealData,
  isReal: false,
  canReset: true,
  userId: "me",
  meNow: async () => "me", // no game session to wait for here

  async profile() {
    const p = await api("/api/profile", { quiet: true });
    return {
      username: p.username,
      packs_remaining: p.packs_remaining,
      pack_cap: p.pack_cap,
      currency: p.wikibidous_balance,
      regen_seconds: p.regen_seconds,
      next_regen_seconds: p.next_regen_seconds,
      is_pro: !!p.is_pro,
      is_vip: !!p.is_vip,
    };
  },

  reset: () => api("/api/reset", { method: "POST" }),

  // favourites and tags: the live game writes them to its database from its client; the dev API
  // stands in for it under /api/__sb (same operations, same shapes)
  setStarred: (id, starred) => api("/api/__sb/star", { method: "PATCH", body: { id, starred }, label: starred ? "Ajout aux favoris" : "Retrait des favoris" }),
  myTags: () => api("/api/__sb/tags", { quiet: true }),
  async createTag(name, color) {
    try { return (await api("/api/__sb/tags", { method: "POST", body: { name, color }, label: "Nouvelle étiquette" }))[0]; }
    catch (e) { if (e.data?.code !== "23505") throw e; return (await api("/api/__sb/tags", { quiet: true })).find((t) => t.name === name); }
  },
  tagCard: (userCardId, tagId) => api("/api/__sb/card-tags", { method: "POST", body: { user_card_id: userCardId, tag_id: tagId }, label: "Étiquette" }),
  untagCard: (userCardId, tagId) => api(`/api/__sb/card-tags?user_card_id=${encodeURIComponent(userCardId)}&tag_id=${encodeURIComponent(tagId)}`, { method: "DELETE", label: "Étiquette" }),
  myCopies: ({ onProgress } = {}) => readAllCopies((from, size) => api(`/api/__sb/copies?offset=${from}&limit=${size}`, { label: "Lecture de votre collection" }), { onProgress }),
  // my profile and achievements: the game reads them from its database, the dev API stands in
  me: () => api("/api/__sb/me", { quiet: true }).then(nMe),
  achievements: () => api("/api/__sb/achievements", { quiet: true }).then((d) => achievementsOf(d.achievements, d.mine)),
};
