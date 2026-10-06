/**
 * Mock adapter (localhost dev). The dev API (plugins/vite-mock-api.js) mirrors the real
 * routes and shapes, so this reuses the real adapter and only swaps what lives outside
 * /api on the real site: the Supabase profile, the user id, and a dev-only reset.
 */

import { api } from "../api.js";
import { RealData } from "./real.js";

export const MockData = {
  ...RealData,
  isReal: false,
  canReset: true,
  userId: "me",

  async profile() {
    const p = await api("/api/profile", { quiet: true });
    return {
      username: p.username,
      packs_remaining: p.packs_remaining,
      pack_cap: p.pack_cap,
      currency: p.wikibidous_balance,
      next_regen_seconds: p.next_regen_seconds,
      is_pro: !!p.is_pro,
    };
  },

  reset: () => api("/api/reset", { method: "POST" }),
};
