// The deal of the trade pane: both sides and the verdict, laid out so that every card of the trade
// shows at one common size, as large as the pane allows. The sides face each other (row) or sit
// one above the other (stacked), each with its cards on one or more lines. The pane sets these
// metrics as CSS variables, so the layout and the stylesheet share one source.

export const DEAL = {
  min: 180, // the card size a deal too large for the pane scrolls at
  floor: 110, // the smallest card that still reads well: shrinking down to it beats scrolling
  max: 360, // a large display shows them big rather than lost in the pane
  gap: 12, // between cards, between the sides and the verdict
  pad: 12, // a side's padding and border
  head: 32, // a side's header and its gap to the cards
  headTall: 56, // the header wrapped on two lines (a narrow side)
  headWrapBelow: 190, // a side narrower than this wraps its header
  chip: 48, // the WikiBidous under a side's cards, with its gap
  verdictW: 88, // the verdict between facing sides
  verdictH: 44, // the verdict as a strip between stacked sides
  bodyGap: 24, // between the deal and the negotiation history (the pane body's gap)
  keepChain: 0.75, // the history shows with the deal if the cards keep this share of their size
  uneven: 0.85, // how a layout whose facing sides differ in height is weighed against stacking
};
const RATIO = 7 / 5; // card height / width

/**
 * What a side shows: its cards, and its WikiBidous as a chip under them. Coins alone take a
 * card-sized tile; an empty side, one line saying so.
 */
export function sideShape(items, coins) {
  return { n: Math.max(1, items.length), chip: !!(items.length && coins) };
}

const lines = (n, cols) => Math.ceil(n / cols);
const span = (cols, w, m) => cols * w + (cols - 1) * m.gap;
const extra = (s, m) => (s.chip ? m.chip : 0);
const sideH = (s, cols, w, head, m) => lines(s.n, cols) * w * RATIO + (lines(s.n, cols) - 1) * m.gap + extra(s, m) + head + 2 * m.pad;

// one arrangement: the card width that fits the width, the one that fits the height, the height it takes
function row(g, r, cg, cr, W, H, m) {
  const fitW = (W - 4 * m.pad - 2 * m.gap - m.verdictW - (cg + cr - 2) * m.gap) / (cg + cr);
  const head = span(Math.min(cg, cr), fitW, m) < m.headWrapBelow ? m.headTall : m.head;
  const height = (w) => Math.max(sideH(g, cg, w, head, m), sideH(r, cr, w, head, m));
  // the taller side sets the height, linear in the card width
  const fitH = Math.min(...[[g, cg], [r, cr]].map(([s, c]) => {
    const L = lines(s.n, c);
    return (H - head - 2 * m.pad - extra(s, m) - (L - 1) * m.gap) / (L * RATIO);
  }));
  // sides of unequal heights leave one of them half empty: worth it only for clearly larger cards
  const even = lines(g.n, cg) === lines(r.n, cr) ? 1 : m.uneven;
  return { stacked: false, give: cg, get: cr, fitW, fitH, height, even };
}
function stack(g, r, c, W, H, m) {
  const fitW = (W - 2 * m.pad - (c - 1) * m.gap) / c;
  const L = lines(g.n, c) + lines(r.n, c);
  const fixed = 2 * (m.head + 2 * m.pad) + extra(g, m) + extra(r, m) + m.verdictH + 2 * m.gap + (L - 2) * m.gap;
  const fitH = (H - fixed) / (L * RATIO);
  const height = (w) => L * w * RATIO + fixed;
  return { stacked: true, give: Math.min(c, g.n), get: Math.min(c, r.n), fitW, fitH, height, even: 1 };
}

/**
 * The layout of a deal (sides from sideShape) in a W x H box: { stacked, w (card width, px),
 * give, get (columns of each side), fits (no scrolling) }. The largest common card that shows the
 * whole deal without scrolling wins, down to `floor`; when none fits, the arrangement that
 * overflows least at `min`.
 */
export function dealLayout(W, H, give, get, m = DEAL) {
  const all = [];
  for (let cg = 1; cg <= give.n; cg++) for (let cr = 1; cr <= get.n; cr++) all.push(row(give, get, cg, cr, W, H, m));
  for (let c = 1; c <= Math.max(give.n, get.n); c++) all.push(stack(give, get, c, W, H, m));
  const pick = (score, lo, weigh) => {
    let best = null;
    for (const a of all) {
      const s = score(a);
      if (s < lo) continue;
      const rank = s * (weigh(a, s) ? a.even : 1);
      if (!best || rank > best.rank + 0.5 || (Math.abs(rank - best.rank) <= 0.5 && a.height(s) < best.a.height(best.s))) best = { a, s, rank };
    }
    return best;
  };
  // the whole deal in view, at the largest card that allows it
  const fit = pick((a) => Math.min(m.max, a.fitW, a.fitH), m.floor, () => true);
  // else the pane scrolls with cards at `min`: unequal sides only weigh against a layout that
  // fits, the shortest scroll wins (two cards side by side rather than every card on its own line)
  const best = fit ?? pick((a) => (a.fitW < m.min ? -1 : Math.min(m.max, a.fitW, Math.max(a.fitH, m.min))), m.min, (a, s) => a.fitH >= s);
  if (!best) return { stacked: true, w: Math.max(0, Math.floor(Math.min(m.max, W - 2 * m.pad))), give: 1, get: 1, fits: false };
  const { a, s } = best;
  return { stacked: a.stacked, w: Math.floor(s), give: a.give, get: a.get, fits: !!fit };
}
