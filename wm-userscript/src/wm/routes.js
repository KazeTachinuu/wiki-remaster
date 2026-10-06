// The routes the remaster takes over; every other route stays the original site.
// /marketplace/<id> is an auction (market notifications link there): it opens in our market.
const CORE = /^\/(pulls|collection|global-collection|trades|marketplace(\/[^/]+)?)?\/?$/;

/** True when `path` (a pathname, query and hash ignored) is one of our screens. */
export const isOurs = (path) => typeof path === "string" && CORE.test(path.split(/[?#]/)[0]);
