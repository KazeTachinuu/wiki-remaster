// The cards a trade picker shows: filtered by rarity and search, sorted, the copies locked in a
// pending trade last (still visible, not pickable). Pure, so the composer's grid stays dumb.
import { normSearch, RARITIES_DESC } from "../wm/schema.js";

const RANK = Object.fromEntries(RARITIES_DESC.map((r, i) => [r, i])); // 0 = rarest
const val = (values, it) => values.get(it.card.id) ?? -1;
const byName = (a, b) => a.card.title.localeCompare(b.card.title, "fr", { sensitivity: "base" });
const SORTS = {
  // Rarity never reads values: they arrive one by one, and cards must not move under the cursor.
  rarity: () => (a, b) => RANK[a.card.rarity] - RANK[b.card.rarity] || byName(a, b),
  value: (v) => (a, b) => val(v, b) - val(v, a) || RANK[a.card.rarity] - RANK[b.card.rarity] || byName(a, b),
  name: () => byName,
};
/** Sort options, in the order the picker lists them. */
export const PICK_SORTS = [["rarity", "Rareté"], ["value", "Valeur estimée"], ["name", "Nom"]];

/** True once every row has a value entry (null = known to have none), so a value sort can settle. */
export const allValued = (items, values) => items.every((it) => values.has(it.card.id));

/**
 * items: collection rows ({ id, card }); values: Map card id -> value; isLocked(row) -> bool.
 * Returns a new array.
 */
export function pickList(items, { q = "", rarity = "", sort = "rarity", values, isLocked = () => false }) {
  const nq = normSearch(q);
  const cmp = (SORTS[sort] ?? SORTS.rarity)(values);
  return items
    .filter((it) => (!rarity || it.card.rarity === rarity) && (!nq || normSearch(it.card.title).includes(nq)))
    .map((it) => ({ it, locked: !!isLocked(it) }))
    .sort((a, b) => a.locked - b.locked || cmp(a.it, b.it))
    .map((x) => x.it);
}
