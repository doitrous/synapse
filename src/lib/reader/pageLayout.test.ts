import test from 'node:test'
import assert from 'node:assert/strict'
import {
  anchorAfterRelayout, applyMeasurement, buildLayout, fitScale, offsetForPage,
  pageAtOffset, sizesAreUniform, visibleRange,
} from './pageLayout.ts'

/** A4 at 72dpi, the shape of nearly every document this reader opens. */
const A4 = { width: 595, height: 842 }
const GAP = 16

function uniform(count: number) {
  return Array.from({ length: count }, () => A4)
}

test('pages stack in order with the gap between them', () => {
  const layout = buildLayout(uniform(3), { scale: 1, gap: GAP })
  assert.deepEqual(layout.pages.map((page) => page.top), [16, 874, 1732])
  assert.equal(layout.totalHeight, 2590)
})

test('a page narrower than the scroller is centred, a wider one is not', () => {
  const narrow = buildLayout(uniform(1), { scale: 1, gap: GAP, containerWidth: 1000 })
  assert.equal(narrow.pages[0].left, Math.round((1000 - 595) / 2))
  // Zoomed past the container, the page starts at the edge and the scroller
  // pans to it — clamping the width instead is why zoom used to do nothing.
  const wide = buildLayout(uniform(1), { scale: 3, gap: GAP, containerWidth: 1000 })
  assert.equal(wide.pages[0].left, 0)
  assert.equal(wide.contentWidth, 595 * 3)
})

test('an empty document has a layout rather than a crash', () => {
  const layout = buildLayout([], { scale: 1, gap: GAP })
  assert.deepEqual(layout.pages, [])
  assert.equal(pageAtOffset(layout, 0, 800), 1)
  assert.deepEqual(visibleRange(layout, 0, 800, 100), [1, 0])
})

test('the page showing the most of itself is the page being read', () => {
  const layout = buildLayout(uniform(5), { scale: 1, gap: GAP })
  assert.equal(pageAtOffset(layout, 0, 800), 1)
  assert.equal(pageAtOffset(layout, offsetForPage(layout, 3), 800), 3)
  assert.equal(pageAtOffset(layout, offsetForPage(layout, 5), 800), 5)
})

test('the current page does not flicker while a boundary sits mid-viewport', () => {
  // The regression this guards: a two-way flicker here was written into the
  // address bar, which was read back as a navigation, which scrolled the page.
  const layout = buildLayout(uniform(5), { scale: 1, gap: GAP })
  const boundary = layout.pages[1].top - 400 // page 1 and page 2 roughly halved
  assert.equal(pageAtOffset(layout, boundary, 800, 1), 1)
  assert.equal(pageAtOffset(layout, boundary, 800, 2), 2)
})

test('a decisive challenger still takes over', () => {
  const layout = buildLayout(uniform(5), { scale: 1, gap: GAP })
  // Almost all of page 3 is showing; claiming page 1 is still current is wrong.
  assert.equal(pageAtOffset(layout, offsetForPage(layout, 3), 800, 1), 3)
})

test('the mounted range covers the viewport plus its overscan', () => {
  const layout = buildLayout(uniform(20), { scale: 1, gap: GAP })
  const [first, last] = visibleRange(layout, offsetForPage(layout, 10), 800, 0)
  assert.equal(first, 10)
  assert.ok(last >= 10 && last <= 11, `expected 10 or 11, got ${last}`)

  const [wideFirst, wideLast] = visibleRange(layout, offsetForPage(layout, 10), 800, 1600)
  assert.ok(wideFirst < first, 'overscan should reach earlier pages')
  assert.ok(wideLast > last, 'overscan should reach later pages')
})

test('the range never runs past either end of the document', () => {
  const layout = buildLayout(uniform(4), { scale: 1, gap: GAP })
  const [first] = visibleRange(layout, 0, 800, 5000)
  const [, last] = visibleRange(layout, layout.totalHeight, 800, 5000)
  assert.equal(first, 1)
  assert.equal(last, 4)
})

test('scrolling to a page and reading it back agree', () => {
  const layout = buildLayout(uniform(30), { scale: 1.4, gap: GAP })
  for (const page of [1, 2, 15, 29, 30]) {
    assert.equal(pageAtOffset(layout, offsetForPage(layout, page), 900), page)
  }
})

test('a page number outside the document is clamped rather than thrown', () => {
  const layout = buildLayout(uniform(3), { scale: 1, gap: GAP })
  assert.equal(offsetForPage(layout, 0), offsetForPage(layout, 1))
  assert.equal(offsetForPage(layout, 99), offsetForPage(layout, 3))
})

test('measuring a page replaces its size and leaves the rest alone', () => {
  const sizes = uniform(3)
  const landscape = { width: 842, height: 595 }
  const next = applyMeasurement(sizes, 1, landscape)
  assert.deepEqual(next[1], landscape)
  assert.deepEqual(next[0], A4)
  // Same size in means the same array out, so nothing re-renders for nothing.
  assert.equal(applyMeasurement(next, 1, landscape), next)
})

test('correcting a page above the reader does not move what they are reading', () => {
  // The regression this guards: a landscape plate discovered on page 2 used to
  // shift every page below it, moving the text under the reader's eyes.
  const before = buildLayout(uniform(10), { scale: 1, gap: GAP })
  const scrollTop = offsetForPage(before, 6) + 120
  const corrected = applyMeasurement(uniform(10), 1, { width: 842, height: 400 })
  const after = buildLayout(corrected, { scale: 1, gap: GAP })

  const nextScroll = anchorAfterRelayout(before, after, scrollTop)
  assert.equal(pageAtOffset(after, nextScroll, 800), pageAtOffset(before, scrollTop, 800))
  // And the same distance into that page.
  const from = before.pages[5]
  const to = after.pages[5]
  assert.ok(Math.abs((scrollTop - from.top) - (nextScroll - to.top)) < 1)
})

test('fit-to-width fills the container minus its margins', () => {
  const scale = fitScale(uniform(3), 1000, 24)
  assert.equal(Math.round(595 * scale), 1000 - 48)
})

test('fit-to-width refuses to divide by nothing', () => {
  assert.equal(fitScale([], 1000), 1)
  assert.equal(fitScale(uniform(1), 0), 1)
})

test('a document of one page size is recognised as uniform', () => {
  assert.equal(sizesAreUniform(uniform(600)), true)
  assert.equal(sizesAreUniform([]), true)
  const mixed = applyMeasurement(uniform(600), 3, { width: 842, height: 595 })
  assert.equal(sizesAreUniform(mixed), false)
})

test('a difference beyond the sample window does not claim uniformity falsely', () => {
  // Only the first `sample` pages are checked, so the contract is that a
  // mixed-size document is measured page by page anyway — this pins the window.
  const mixed = applyMeasurement(uniform(600), 20, { width: 842, height: 595 })
  assert.equal(sizesAreUniform(mixed, 8), true)
  assert.equal(sizesAreUniform(mixed, 30), false)
})
