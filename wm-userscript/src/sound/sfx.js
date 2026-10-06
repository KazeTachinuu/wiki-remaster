// Where the interface makes its sounds: the rules live here so components only say what happened.
// The sounds themselves are in sound.js. Every helper takes the player last, for the tests.
import { play } from "./sound.js";

/** Run a write the player cares about: a chime when it lands, a low buzz when it fails. */
export async function sounded(run, sfx = play) {
  try {
    const d = await run();
    sfx("success");
    return d;
  } catch (e) {
    sfx("error");
    throw e;
  }
}

/** Picking a card in a multi-select: up when it goes in, down when it comes out. */
export const pickSound = (wasPicked, sfx = play) => sfx(wasPicked ? "deselect" : "select");

/** A click that moves to another tab (not the one already shown). */
export function isTabSwitch(target) {
  const tab = target?.closest?.('[role="tab"]');
  return !!tab && !tab.disabled && tab.getAttribute("aria-selected") !== "true";
}

/** Every tab bar under `root` ticks on a switch. Capture phase: read before the tab updates. */
export function tabTicks(root, sfx = play) {
  const on = (e) => isTabSwitch(e.target) && sfx("tick");
  root.addEventListener("click", on, true);
  return () => root.removeEventListener("click", on, true);
}
