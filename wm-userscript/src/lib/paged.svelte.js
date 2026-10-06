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
