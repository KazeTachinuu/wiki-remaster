/**
 * Pages accumulated by "Charger plus". A page joins the list only once it loaded and only right
 * after the last one, so a failed page is asked again (never skipped) and a stale one is dropped.
 * Page 0 starts over.
 */
export const NO_PAGES = Object.freeze({ loaded: -1, items: [], hasMore: false });

export function addPage(acc, page, d) {
  if (page === 0) return { loaded: 0, items: d.items, hasMore: !!d.hasMore };
  if (page !== acc.loaded + 1) return acc;
  return { loaded: page, items: [...acc.items, ...d.items], hasMore: !!d.hasMore };
}

/** The page "Charger plus" asks for: the one after the last that actually loaded. */
export const nextPage = (acc) => acc.loaded + 1;
