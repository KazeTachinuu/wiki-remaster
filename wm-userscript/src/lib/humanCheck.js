// The game's anti-bot step (Cloudflare Turnstile), shown inside the remaster. Any write that the
// server refuses for it opens the dialog (wm/api.js runs every write through withHumanCheck);
// once verified, the write runs exactly once more. One dialog at a time: concurrent callers share
// the same check.
export const human = {
  open: false,
  subs: new Set(),
  set(open) { this.open = open; for (const f of this.subs) f(open); },
  subscribe(f) { this.subs.add(f); f(this.open); return () => this.subs.delete(f); },
};
let waiting = null; // { promise, resolve }

// The server's refusal asking for the check: its code, its flag, or (any other wording it may use
// on a route not seen yet) a message about the anti-bot check.
export const needsHuman = (e) =>
  e?.code === "human_verification_required" || e?.data?.human_verification_required === true ||
  /human_verification|turnstile|captcha/i.test(e?.code ?? "") || /anti-bot|vérification humaine/i.test(e?.message ?? "");

/** Called by the dialog: true once the server accepted the token, false if the user closed it. */
export function resolveHuman(ok) {
  human.set(false);
  waiting?.resolve(ok);
  waiting = null;
}

function ask() {
  if (!waiting) {
    let resolve;
    const promise = new Promise((r) => (resolve = r));
    waiting = { promise, resolve };
    human.set(true);
  }
  return waiting.promise;
}

/** Run a write; if the server asks for the human check, show it, then run the write once more. */
export async function withHumanCheck(run) {
  try {
    return await run();
  } catch (e) {
    if (!needsHuman(e)) throw e;
    if (!(await ask())) throw new Error("Vérification annulée : l'action n'a pas été faite.");
    return run();
  }
}
