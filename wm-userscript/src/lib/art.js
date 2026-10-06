// The game's art as small inline WebP (the originals are 0.6 to 2 MB PNGs): no request.
// The onyx art is already a small WebP on the game's site, so it stays remote.
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
