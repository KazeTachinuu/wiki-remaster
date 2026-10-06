// The API contract, recorded rather than written by hand: the shape of a response is every field
// path with the types seen there ("collection[].card.rarity" -> "string"), and two shapes diff
// into fields removed, types changed and fields added. scripts/prod-test.mjs records the live
// shapes into docs/api-shapes.json and fails when a later run loses a field or changes a type.

import { RARITIES } from "./schema.js";

const ID_KEY = /^(\d+|[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})$/i;
// keys that are data, not field names: ids (a map of card id -> owners) and rarity codes (a
// card's sale summary is keyed by its rarity), each recorded under one placeholder
const keyOf = (k) => (ID_KEY.test(k) ? "{id}" : RARITIES.includes(k) ? "{rarity}" : k);
const typeOf = (v) => (v === null ? "null" : Array.isArray(v) ? "array" : typeof v);

/**
 * Field path -> sorted "|"-joined types. Array elements merge under "[]"; a field missing from
 * some elements of its array is marked optional ("?"), so data that varies (a trade with or
 * without a parent) does not read as a change. Keys that are data (see keyOf) are recorded under
 * a placeholder, so the shape does not change with the data.
 */
export function shapeOf(value) {
  const out = new Map();
  const add = (path, t) => (out.get(path) ?? out.set(path, new Set()).get(path)).add(t);
  const walk = (v, path) => {
    add(path, typeOf(v));
    if (Array.isArray(v)) {
      const objs = v.filter((x) => x && typeof x === "object" && !Array.isArray(x));
      const keys = new Set(objs.flatMap(Object.keys));
      for (const x of v) walk(x, `${path}[]`);
      for (const k of keys) if (objs.some((o) => !(k in o))) add(`${path}[].${k}`, "?");
    } else if (v && typeof v === "object") {
      for (const [k, x] of Object.entries(v)) walk(x, path ? `${path}.${keyOf(k)}` : keyOf(k));
    }
  };
  walk(value, "");
  out.delete("");
  return Object.fromEntries([...out].map(([p, ts]) => [p, [...ts].sort().join("|")]).sort(([a], [b]) => a.localeCompare(b)));
}

const isOptional = (t) => t.split("|").some((x) => x === "?" || x === "null" || x === "undefined");
const parentOf = (path) => path.replace(/(\[\]|\.[^.[\]]+)$/, "");

/**
 * What changed from `before` (the recorded contract) to `after` (a live shape):
 *  removed  a field always present before, now gone (while its parent is still there and filled);
 *  changed  a field whose types no longer overlap (number -> string), nullability aside;
 *  added    a field the contract did not have (new data, worth a look, never a failure).
 */
export function diffShapes(before, after) {
  const removed = [], changed = [], added = [];
  const core = (t) => t.split("|").filter((x) => !["?", "null", "undefined"].includes(x));
  for (const [p, t] of Object.entries(before)) {
    if (!(p in after)) {
      // only a parent still holding fields can lose one: an empty array, a parent now null or gone
      // says nothing about this field
      const parent = parentOf(p);
      const holds = !parent || /(^|\|)(object|array)(\||$)/.test(after[parent] ?? "");
      if (!isOptional(t) && !p.endsWith("[]") && holds) removed.push(p);
      continue;
    }
    const a = core(t), b = core(after[p]);
    if (a.length && b.length && !a.some((x) => b.includes(x))) changed.push(`${p}: ${a.join("|")} -> ${b.join("|")}`);
  }
  for (const p of Object.keys(after)) if (!(p in before)) added.push(p);
  return { removed, changed, added };
}
