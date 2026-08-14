import test from 'node:test'
import assert from 'node:assert/strict'
import { placeAtAnchor, placeAtPoint } from './popoverPosition.ts'

const VIEWPORT = { width: 1000, height: 800 }
const SIZE = { width: 240, height: 300 }

/** A 120x36 trigger with its top-left at (x, y). */
function anchorAt(x: number, y: number, width = 120, height = 36) {
  return { left: x, top: y, right: x + width, bottom: y + height }
}

test('a surface with room below sits under its anchor, aligned to the leading edge', () => {
  const placed = placeAtAnchor(anchorAt(100, 100), SIZE, VIEWPORT)
  assert.equal(placed.side, 'bottom')
  assert.equal(placed.top, 142) // 100 + 36 + gap 6
  assert.equal(placed.left, 100)
})

test('a surface with no room below flips above the anchor', () => {
  // The regression this guards: a date picker opened near the bottom of the
  // window rendering off-screen instead of upward.
  const placed = placeAtAnchor(anchorAt(100, 700), SIZE, VIEWPORT)
  assert.equal(placed.side, 'top')
  assert.equal(placed.top, 700 - 6 - 300)
})

test('with room on neither side the roomier one wins', () => {
  const tall = { width: 240, height: 780 }
  // Anchor low in the window: more space above than below, so flip up.
  assert.equal(placeAtAnchor(anchorAt(100, 600), tall, VIEWPORT).side, 'top')
  // Anchor high in the window: more space below, so stay down.
  assert.equal(placeAtAnchor(anchorAt(100, 40), tall, VIEWPORT).side, 'bottom')
})

test('a surface taller than the viewport is pinned to the top margin, not pushed off it', () => {
  const tall = { width: 240, height: 900 }
  const placed = placeAtAnchor(anchorAt(100, 400), tall, VIEWPORT)
  assert.equal(placed.top, 8)
})

test('end alignment hangs the surface off the anchor trailing edge', () => {
  const placed = placeAtAnchor(anchorAt(600, 100), SIZE, VIEWPORT, { placement: 'bottom-end' })
  assert.equal(placed.left, 720 - 240)
})

test('in right-to-left, start is the anchor right edge', () => {
  // The regression this guards: an Arabic page opening every popover flush to
  // the wrong side of its trigger.
  const ltr = placeAtAnchor(anchorAt(600, 100), SIZE, VIEWPORT, { placement: 'bottom-start' })
  const rtl = placeAtAnchor(anchorAt(600, 100), SIZE, VIEWPORT, { placement: 'bottom-start', rtl: true })
  assert.equal(ltr.left, 600)
  assert.equal(rtl.left, 720 - 240)
})

test('centre alignment centres on the anchor', () => {
  const placed = placeAtAnchor(anchorAt(400, 100), SIZE, VIEWPORT, { placement: 'bottom-center' })
  assert.equal(placed.left, 460 - 120)
})

test('a surface near the right edge is clamped inside the margin', () => {
  const placed = placeAtAnchor(anchorAt(950, 100), SIZE, VIEWPORT)
  assert.equal(placed.left, 1000 - 240 - 8)
})

test('a surface wider than the viewport lands on the leading margin', () => {
  const wide = { width: 1200, height: 200 }
  const placed = placeAtAnchor(anchorAt(100, 100), wide, VIEWPORT)
  assert.equal(placed.left, 8)
})

test('a pointer menu opens down and to the right when there is room', () => {
  assert.deepEqual(placeAtPoint({ x: 100, y: 100 }, SIZE, VIEWPORT), { left: 100, top: 100 })
})

test('a pointer menu near an edge flips back toward the pointer', () => {
  // Not merely clamped: a clamped menu covers what was right-clicked.
  const placed = placeAtPoint({ x: 950, y: 780 }, SIZE, VIEWPORT)
  assert.equal(placed.left, 950 - 240)
  assert.equal(placed.top, 780 - 300)
})

test('a pointer menu larger than the space stops at the margin', () => {
  const placed = placeAtPoint({ x: 40, y: 40 }, { width: 240, height: 300 }, { width: 260, height: 200 })
  assert.equal(placed.left, 8)
  assert.equal(placed.top, 8)
})
