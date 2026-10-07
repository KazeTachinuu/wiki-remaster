// The order of a trade picker's cards: the server searches, filters and sorts by rarity, name, date
// added or favourites first (CardPicker asks it); here the cards it sent are ordered (by value, which only we know), with
// the copies locked in a pending trade last (still visible, not pickable). Pure, so the
// composer's grid stays dumb.
import { RARITIES_DESC } from "../../wm/schema.js";

const RANK = Object.fromEntries(RARITIES_DESC.map((r, i) => [r, i])); // 0 = rarest
const added = (it) => Date.parse(it.obtained_at || "") || 0;
const val = (values, it) => values.get(it.card.id) ?? -1;
const byName = (a, b) => a.card.title.localeCompare(b.card.title, "fr", { sensitivity: "base" });
const SORTS = {
  // Rarity never reads values: they arrive one by one, and cards must not move under the cursor.
  rarity: () => (a, b) => RANK[a.card.rarity] - RANK[b.card.rarity] || byName(a, b),
  value: (v) => (a, b) => val(v, b) - val(v, a) || RANK[a.card.rarity] - RANK[b.card.rarity] || byName(a, b),
  name: () => byName,
  recent: () => (a, b) => added(b) - added(a) || byName(a, b),
  // my favourites first (the server reads them so too), then by rarity
  starred: () => (a, b) => Number(!!b.starred) - Number(!!a.starred) || RANK[a.card.rarity] - RANK[b.card.rarity] || byName(a, b),
};
/** Sort options, in the order the picker lists them. */
export const PICK_SORTS = [["rarity", "Rareté"], ["recent", "Récentes"], ["starred", "Favoris d'abord"], ["value", "Valeur estimée"], ["name", "Nom"]];

/** True once every row has a value entry (null = known to have none), so a value sort can settle. */
export const allValued = (items, values) => items.every((it) => values.has(it.card.id));

/**
 * items: collection rows ({ id, card }); values: Map card id -> value; isLocked(row) -> bool.
 * Returns a new array.
 */
export function pickList(items, { sort = "rarity", values, isLocked = () => false }) {
  const cmp = (SORTS[sort] ?? SORTS.rarity)(values);
  return items
    .map((it) => ({ it, locked: !!isLocked(it) }))
    .sort((a, b) => a.locked - b.locked || cmp(a.it, b.it))
    .map((x) => x.it);
}
