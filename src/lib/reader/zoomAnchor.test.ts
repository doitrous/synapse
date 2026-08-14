import test from 'node:test'
import assert from 'node:assert/strict'
import { MAX_SCALE, MIN_SCALE, clampScale, stepScale, zoomAnchored } from './zoomAnchor.ts'
import { buildLayout } from './pageLayout.ts'

const A4 = { width: 595, height: 842 }
const SIZES = Array.from({ length: 40 }, () => A4)
const CONTAINER = { containerWidth: 900, containerHeight: 800 }

/** Where the document point under the pointer ends up after a zoom. */
function pointUnderPointer(scale: number, scroll: { top: number; left: number }, pointer: { x: number; y: number }) {
  return { x: (scroll.left + pointer.x) / scale, y: (scroll.top + pointer.y) / scale }
}

test('the document point under the pointer does not move', () => {
  // The regression this guards: zooming from the top-left corner threw the
  // reader from page 40 to page 20 on a single step.
  const pointer = { x: 400, y: 300 }
  const scroll = { top: 12_000, left: 0 }
  const result = zoomAnchored({ sizes: SIZES, from: 1, to: 2, scroll, pointer, ...CONTAINER })

  const before = pointUnderPointer(1, scroll, pointer)
  const after = pointUnderPointer(result.scale, result.scroll, pointer)
  assert.ok(Math.abs(before.y - after.y) < 0.5, `y moved by ${Math.abs(before.y - after.y)}`)
})

test('it holds still zooming out as well as in', () => {
  const pointer = { x: 200, y: 500 }
  const scroll = { top: 20_000, left: 100 }
  const result = zoomAnchored({ sizes: SIZES, from: 2, to: 1, scroll, pointer, ...CONTAINER })
  const before = pointUnderPointer(2, scroll, pointer)
  const after = pointUnderPointer(result.scale, result.scroll, pointer)
  assert.ok(Math.abs(before.y - after.y) < 0.5)
})

test('the scroll offset never goes negative at the top of the document', () => {
  const result = zoomAnchored({
    sizes: SIZES, from: 1, to: 0.5, scroll: { top: 0, left: 0 }, pointer: { x: 0, y: 0 }, ...CONTAINER,
  })
  assert.equal(result.scroll.top, 0)
  assert.equal(result.scroll.left, 0)
})

test('the scroll offset never runs past the end of the document', () => {
  const layout = buildLayout(SIZES, { scale: 0.5, containerWidth: CONTAINER.containerWidth })
  const result = zoomAnchored({
    sizes: SIZES, from: 2, to: 0.5,
    scroll: { top: 60_000, left: 0 }, pointer: { x: 450, y: 400 }, ...CONTAINER,
  })
  assert.ok(result.scroll.top <= layout.totalHeight - CONTAINER.containerHeight + 1)
})

test('a zoom that does not fit horizontally cannot scroll left of the page', () => {
  const result = zoomAnchored({
    sizes: SIZES, from: 1, to: 0.5, scroll: { top: 0, left: 500 }, pointer: { x: 10, y: 10 }, ...CONTAINER,
  })
  // At 0.5 the page is narrower than the container, so there is nowhere to pan.
  assert.equal(result.scroll.left, 0)
})

test('zooming to the same scale changes nothing', () => {
  const scroll = { top: 4321, left: 12 }
  const result = zoomAnchored({ sizes: SIZES, from: 1.5, to: 1.5, scroll, pointer: { x: 1, y: 2 }, ...CONTAINER })
  assert.deepEqual(result.scroll, scroll)
})

test('an empty document zooms without dividing by nothing', () => {
  const result = zoomAnchored({
    sizes: [], from: 1, to: 2, scroll: { top: 0, left: 0 }, pointer: { x: 0, y: 0 }, ...CONTAINER,
  })
  assert.equal(result.scale, 2)
  assert.deepEqual(result.scroll, { top: 0, left: 0 })
})

test('scale is clamped at both ends', () => {
  assert.equal(clampScale(0.01), MIN_SCALE)
  assert.equal(clampScale(99), MAX_SCALE)
  assert.equal(zoomAnchored({
    sizes: SIZES, from: 1, to: 50, scroll: { top: 0, left: 0 }, pointer: { x: 0, y: 0 }, ...CONTAINER,
  }).scale, MAX_SCALE)
})

test('a zoom step always moves, and lands on round values where it can', () => {
  // The old fixed ladder could not represent fit-to-width, so the first `+`
  // after opening a document discarded the fit it had just been given.
  let scale = 1
  for (let i = 0; i < 5; i++) {
    const next = stepScale(scale, 1)
    assert.ok(next > scale, `step ${i} did not increase: ${scale} -> ${next}`)
    scale = next
  }
  for (let i = 0; i < 5; i++) {
    const next = stepScale(scale, -1)
    assert.ok(next < scale, `step ${i} did not decrease: ${scale} -> ${next}`)
    scale = next
  }
})

test('a step from an odd fit scale still moves', () => {
  const fit = 1.38319327731
  assert.ok(stepScale(fit, 1) > fit)
  assert.ok(stepScale(fit, -1) < fit)
})

test('stepping cannot escape the clamp', () => {
  assert.equal(stepScale(MAX_SCALE, 1), MAX_SCALE)
  assert.equal(stepScale(MIN_SCALE, -1), MIN_SCALE)
})
