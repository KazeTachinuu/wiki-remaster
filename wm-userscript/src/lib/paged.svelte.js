/**
 * A server-paged list. Only the latest request lands, so a slow stale page (typing, fast
 * paging) never overwrites a newer one. `page` is the page asked for (a Pager shows it and
 * "Réessayer" asks it again), `loaded` the page `data` belongs to.
 */
export class PagedList {
  page = $state(0);
  data = $state(null);
  loaded = $state(-1);
  loading = $state(false);
  error = $state(false);
  #token = 0;

  constructor(fetchPage) {
    this.fetchPage = fetchPage;
  }

  /**
   * The same page again, quietly: no loading state, nothing dimmed, and `merge(old, fresh)`
   * decides what lands (keep unchanged rows, see reuse). A failure keeps what is shown.
   */
  async refresh(merge = (old, fresh) => fresh) {
    const token = this.#token;
    try {
      const d = await this.fetchPage(this.loaded);
      if (token === this.#token) this.data = merge(this.data, d);
    } catch {}
  }

  async go(page = this.page) {
    const token = ++this.#token;
    this.page = page;
    this.loading = true;
    this.error = false;
    try {
      const d = await this.fetchPage(page);
      if (token === this.#token) { this.loaded = page; this.data = d; }
    } catch {
      if (token === this.#token) this.error = true;
    } finally {
      if (token === this.#token) this.loading = false;
    }
  }
}

/** How long typing must pause before a server-side search runs. */
export const SEARCH_DELAY_MS = 350;

/**
 * Debounced search for a server-filtered list: once `read()` (trimmed) has been stable for
 * SEARCH_DELAY_MS, `apply(q)` runs. Call during component init.
 */
export function debouncedSearch(read, apply) {
  $effect(() => {
    const q = read().trim();
    const t = setTimeout(() => apply(q), SEARCH_DELAY_MS);
    return () => clearTimeout(t);
  });
}

/**
 * A server-paged list read by scrolling: pages pile up as the end comes near (`more()`), and a
 * new query (`reset()`) starts over. Only the latest query's pages land, so a slow answer to an
 * old search never mixes in; until the new first page arrives, the old cards stay (no flash).
 * `fetchPage(page)` answers `{ items, hasMore, ...meta }`; `meta` keeps the first page's extras
 * (counts, totals). A failed page is asked again by the next `more()`, never skipped.
 */
export class PageStream {
  items = $state.raw([]);
  meta = $state.raw(null);
  hasMore = $state(false);
  loading = $state(false);
  error = $state(false);
  started = $state(false); // a first page has landed
  first = $state(false); // the page being read is a first one (a new query), not the next
  #page = -1;
  #token = 0;
  #ids = new Set(); // rows shift between pages when the list changes mid-read: never one twice

  constructor(fetchPage) {
    this.fetchPage = fetchPage;
  }

  /** A first page known already (saved last time): shown at once, until reset() brings the fresh one. */
  show({ items, hasMore, ...meta }) {
    this.items = items;
    this.#ids = new Set(items.map((r) => r.id));
    this.meta = meta;
    this.hasMore = !!hasMore;
    this.started = true;
  }

  reset() {
    this.#token++;
    this.#page = -1;
    this.hasMore = false;
    return this.#load(0);
  }

  more() {
    if (this.loading || !this.hasMore) return;
    return this.#load(this.#page + 1);
  }

  async #load(page) {
    const token = this.#token;
    this.loading = true;
    this.first = !page;
    this.error = false;
    try {
      const { items, hasMore, ...meta } = await this.fetchPage(page);
      if (token !== this.#token) return;
      if (!page) this.#ids = new Set();
      const fresh = items.filter((r) => !this.#ids.has(r.id));
      for (const r of fresh) this.#ids.add(r.id);
      this.items = page ? [...this.items, ...fresh] : fresh;
      if (!page) this.meta = meta;
      this.#page = page;
      this.hasMore = !!hasMore;
      this.started = true;
    } catch {
      if (token === this.#token) this.error = true;
    } finally {
      if (token === this.#token) this.loading = false;
    }
  }

  /** A row changed here (a favourite, a tag): replaced in place, without asking again. */
  update(row) {
    this.items = this.items.map((r) => (r.id === row.id ? row : r));
  }

  /** Rows changed here (a discard, a sale): out of the list without asking again. */
  drop(ids) {
    const gone = new Set(ids);
    this.items = this.items.filter((r) => !gone.has(r.id));
  }
}
