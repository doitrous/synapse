/**
 * Where every page of a document sits, as arithmetic.
 *
 * The reader used to *measure* its layout: each page carried an
 * IntersectionObserver, one to decide whether to paint and another to decide
 * which page was being read. Both fed state that changed the layout, and the
 * layout fed them back — which is how scrolling ended up oscillating. An
 * unpainted page was also drawn at double height (an `aspect-ratio` canvas plus
 * a spacer of the same height), so every paint shrank the document under the
 * pointer and re-triggered everything.
 *
 * Computing the layout instead makes those loops impossible: the scroll offset
 * is the only input, and which page is showing is a pure function of it. All
 * values are CSS pixels.
 */

export interface PageSize {
  /** Points at scale 1, from the PDF's own viewport. */
  width: number
  height: number
}

export interface PageBox {
  top: number
  left: number
  width: number
  height: number
}

export interface Layout {
  /** One box per page, index 0 = page 1. */
  pages: PageBox[]
  totalHeight: number
  /** The widest page, so the scroller knows when to scroll horizontally. */
  contentWidth: number
  scale: number
  gap: number
}

export interface LayoutOptions {
  scale: number
  /** Space between pages, and above the first and below the last. */
  gap?: number
  /** The scroller's inner width, used to centre a page narrower than it. */
  containerWidth?: number
}

const DEFAULT_GAP = 16

export function buildLayout(sizes: readonly PageSize[], options: LayoutOptions): Layout {
  const { scale, gap = DEFAULT_GAP, containerWidth = 0 } = options
  const pages: PageBox[] = []
  let top = gap
  let contentWidth = 0

  for (const size of sizes) {
    const width = size.width * scale
    const height = size.height * scale
    // A page narrower than the scroller is centred; a wider one starts at the
    // left edge and the scroller pans to it. Clamping the width instead — the
    // old `maxWidth: 100%` — is why zooming past fit appeared to do nothing.
    const left = containerWidth > width ? Math.round((containerWidth - width) / 2) : 0
    pages.push({ top, left, width, height })
    top += height + gap
    if (width > contentWidth) contentWidth = width
  }

  return { pages, totalHeight: Math.max(top, gap), contentWidth, scale, gap }
}

/** Index of the last page whose top is at or before `offset`. */
function pageIndexAt(layout: Layout, offset: number): number {
  let low = 0
  let high = layout.pages.length - 1
  let found = 0
  while (low <= high) {
    const mid = (low + high) >> 1
    if (layout.pages[mid].top <= offset) { found = mid; low = mid + 1 }
    else high = mid - 1
  }
  return found
}

function overlap(box: PageBox, top: number, bottom: number): number {
  return Math.max(0, Math.min(box.top + box.height, bottom) - Math.max(box.top, top))
}

/**
 * Which page is being read, as a 1-based number.
 *
 * The page showing the most of itself wins — but only decisively. Without the
 * hysteresis a scroll that parks a boundary near the middle of the viewport
 * makes the number flicker between two pages, and that flicker is what used to
 * be written back into the address bar.
 */
export function pageAtOffset(
  layout: Layout,
  scrollTop: number,
  viewportHeight: number,
  previous?: number,
): number {
  if (!layout.pages.length) return 1
  const top = scrollTop
  const bottom = scrollTop + viewportHeight

  const start = pageIndexAt(layout, top)
  let bestIndex = start
  let bestVisible = -1
  let totalVisible = 0

  for (let index = start; index < layout.pages.length; index++) {
    const box = layout.pages[index]
    if (box.top > bottom) break
    const visible = overlap(box, top, bottom)
    totalVisible += visible
    if (visible > bestVisible) { bestVisible = visible; bestIndex = index }
  }

  const best = bestIndex + 1
  if (previous === undefined || previous === best) return best

  const incumbent = layout.pages[previous - 1]
  if (!incumbent) return best
  const incumbentVisible = overlap(incumbent, top, bottom)
  if (incumbentVisible <= 0 || totalVisible <= 0) return best
  // The challenger has to own more than 55% of what is on screen to take over.
  return bestVisible / totalVisible > 0.55 ? best : previous
}

/**
 * The pages worth mounting, as an inclusive 1-based range.
 *
 * `overscan` is expressed in pixels rather than "a page or two" so a document
 * of tall plates and a document of small cards both keep the same amount of
 * work ahead of the reader.
 */
export function visibleRange(
  layout: Layout,
  scrollTop: number,
  viewportHeight: number,
  overscan: number,
): [number, number] {
  if (!layout.pages.length) return [1, 0]
  const top = scrollTop - overscan
  const bottom = scrollTop + viewportHeight + overscan

  let first = pageIndexAt(layout, top)
  // `pageIndexAt` lands on the page containing `top`; if that page ends at or
  // before it, it shows nothing and the range starts at the next one.
  while (first < layout.pages.length - 1 && layout.pages[first].top + layout.pages[first].height <= top) first++

  let last = first
  while (last < layout.pages.length - 1 && layout.pages[last + 1].top <= bottom) last++

  return [first + 1, last + 1]
}

/** The scroll offset that puts a page's top edge just inside the viewport. */
export function offsetForPage(layout: Layout, page: number): number {
  const box = layout.pages[Math.max(0, Math.min(layout.pages.length - 1, page - 1))]
  if (!box) return 0
  return Math.max(0, box.top - layout.gap)
}

/**
 * Correct one page's size once its real dimensions are known.
 *
 * Page 1's size is assumed for the whole document at first, so the scroller has
 * a height and is usable immediately. Every correction reflows the pages below
 * it — which is fine, and is why `anchorAfterRelayout` exists.
 */
export function applyMeasurement(
  sizes: readonly PageSize[],
  index: number,
  size: PageSize,
): PageSize[] {
  if (index < 0 || index >= sizes.length) return sizes as PageSize[]
  const current = sizes[index]
  if (current.width === size.width && current.height === size.height) return sizes as PageSize[]
  const next = [...sizes]
  next[index] = size
  return next
}

/**
 * Keep the reading position still across a relayout.
 *
 * A correction to a page *above* the reader shifts everything below it, so the
 * words under their eyes would move. This maps the same point in the same page
 * from the old layout to the new one.
 */
export function anchorAfterRelayout(before: Layout, after: Layout, scrollTop: number): number {
  if (!before.pages.length || !after.pages.length) return scrollTop
  const index = pageIndexAt(before, scrollTop)
  const from = before.pages[index]
  const to = after.pages[Math.min(index, after.pages.length - 1)]
  if (!from || !to) return scrollTop
  const withinPage = from.height > 0 ? (scrollTop - from.top) / from.height : 0
  return Math.max(0, to.top + withinPage * to.height)
}

/** The scale at which the widest page exactly fills the available width. */
export function fitScale(sizes: readonly PageSize[], containerWidth: number, margin = 24): number {
  const widest = sizes.reduce((max, size) => Math.max(max, size.width), 0)
  if (!widest || containerWidth <= 0) return 1
  return Math.max(0.1, (containerWidth - margin * 2) / widest)
}

/**
 * Whether the first few pages agree closely enough to assume the rest match.
 *
 * Most textbooks are one page size throughout, and measuring 600 pages to learn
 * that is work nobody benefits from. A document that fails this check is
 * measured page by page in the background instead.
 */
export function sizesAreUniform(sizes: readonly PageSize[], sample = 8, tolerance = 0.5): boolean {
  if (sizes.length <= 1) return true
  const first = sizes[0]
  const count = Math.min(sample, sizes.length)
  for (let index = 1; index < count; index++) {
    if (Math.abs(sizes[index].width - first.width) > tolerance) return false
    if (Math.abs(sizes[index].height - first.height) > tolerance) return false
  }
  return true
}
