// My tags (the game's "étiquettes"), shared by the card window and the collection's filter:
// read once per session, kept in step as tags are created here.
import { data } from "../wm/index.js";

// a few distinct colours for new tags, the game picks one at random too
const COLORS = ["#ef4444", "#f97316", "#eab308", "#22c55e", "#14b8a6", "#3b82f6", "#8b5cf6", "#ec4899"];

class Tags {
  list = $state.raw(null); // null until read
  #loading = null;

  load() {
    this.#loading ??= data.myTags().then((l) => (this.list = l), () => { this.#loading = null; this.list ??= []; });
    return this.#loading;
  }

  /** The tag of that name (any case), created when there is none. */
  async named(name) {
    const clean = name.trim().slice(0, 48);
    const have = (this.list ?? []).find((t) => t.name.toLocaleLowerCase("fr") === clean.toLocaleLowerCase("fr"));
    if (have) return have;
    const tag = await data.createTag(clean, COLORS[Math.floor(Math.random() * COLORS.length)]);
    if (tag && !(this.list ?? []).some((t) => t.id === tag.id)) this.list = [...(this.list ?? []), tag].sort((a, b) => a.name.localeCompare(b.name, "fr"));
    return tag;
  }
}
export const tags = new Tags();
