import { describe, expect, test } from "bun:test";
import { NO_PAGES, addPage, nextPage } from "./paging.js";

const page = (ids, hasMore = true) => ({ items: ids.map((id) => ({ id })), hasMore });
const ids = (acc) => acc.items.map((it) => it.id);

describe("accumulated pages", () => {
  test("nothing loaded asks for the first page", () => {
    expect(nextPage(NO_PAGES)).toBe(0);
    expect(NO_PAGES.hasMore).toBe(false);
  });

  test("pages append in order", () => {
    let acc = addPage(NO_PAGES, 0, page([1, 2]));
    acc = addPage(acc, 1, page([3], false));
    expect(ids(acc)).toEqual([1, 2, 3]);
    expect(acc.hasMore).toBe(false);
    expect(nextPage(acc)).toBe(2);
  });

  test("a failed page is retried, not skipped", () => {
    const acc = addPage(NO_PAGES, 0, page([1, 2]));
    // page 1 failed: nothing landed, so the next click asks for page 1 again
    expect(nextPage(acc)).toBe(1);
    expect(ids(addPage(acc, 1, page([3])))).toEqual([1, 2, 3]);
  });

  test("a page that does not follow the last loaded one is ignored", () => {
    const acc = addPage(NO_PAGES, 0, page([1]));
    expect(addPage(acc, 2, page([9]))).toBe(acc);
    const two = addPage(acc, 1, page([2]));
    expect(addPage(two, 1, page([2]))).toBe(two); // the same page landing twice

  });

  test("page 0 starts over", () => {
    let acc = addPage(addPage(NO_PAGES, 0, page([1])), 1, page([2]));
    acc = addPage(acc, 0, page([7]));
    expect(ids(acc)).toEqual([7]);
    expect(nextPage(acc)).toBe(1);
  });
});
