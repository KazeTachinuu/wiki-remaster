// The game's art, re-encoded small (WebP sized for 2x screens) and shipped inline with the script:
// no request, nothing to download on a slow connection. The originals are PNGs of 0.6 to 2 MB
// on wiki-masters.com; the onyx art is already a light WebP there, so it stays remote.
import C from "../assets/commun.webp?inline";
import PC from "../assets/peu_commun.webp?inline";
import R from "../assets/rare.webp?inline";
import SR from "../assets/super_rare.webp?inline";
import UR from "../assets/ultra_rare.webp?inline";
import L from "../assets/legendaire.webp?inline";
import { artKey } from "./cardArt.js";
export { default as PACK_IMG } from "../assets/card_pack.webp?inline";

const ART = { C, PC, R, SR, UR, L, onyx: "https://www.wiki-masters.com/shiny/onyx-art.webp" };
export const rarityArt = (card, shiny = false) => ART[artKey(card, shiny)];
