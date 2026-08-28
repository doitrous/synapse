import { test } from 'node:test'
import assert from 'node:assert/strict'
import {
  clampRect,
  clientToImage,
  isDrawable,
  MIN_DRAW_SIZE,
  nudgeShape,
  rectFromPoints,
  resizeHandlePoints,
  resizeRect,
  zoomViewBox,
} from './occlusionEditor.ts'
import type { OccluderShape } from './model.ts'

test('a rectangle from two corners always has positive size', () => {
  assert.deepEqual(rectFromPoints(100, 100, 40, 60), { x: 40, y: 60, w: 60, h: 40 })
})

test('client points map to image space through the viewBox', () => {
  const bounds = { left: 0, top: 0, width: 200, height: 100 }
  const view = { x: 0, y: 0, w: 1000, h: 500 }
  assert.deepEqual(clientToImage(100, 50, bounds, view), { x: 500, y: 250 })
  // A zoomed/panned viewBox offsets and scales.
  const view2 = { x: 500, y: 250, w: 500, h: 250 }
  assert.deepEqual(clientToImage(0, 0, bounds, view2), { x: 500, y: 250 })
})

test('clamp keeps a rectangle inside the image by shrinking', () => {
  assert.deepEqual(clampRect({ x: 90, y: 0, w: 50, h: 10 }, 100, 100), { x: 90, y: 0, w: 10, h: 10 })
  assert.deepEqual(clampRect({ x: -10, y: -10, w: 20, h: 20 }, 100, 100), { x: 0, y: 0, w: 20, h: 20 })
})

test('zoom keeps the focal point under the cursor and clamps to the image', () => {
  const view = { x: 0, y: 0, w: 1000, h: 500 }
  const zoomed = zoomViewBox(view, 0.5, { x: 500, y: 250 }, 1000, 500)
  assert.equal(zoomed.w, 500)
  assert.equal(zoomed.h, 250)
  assert.equal(zoomed.x, 250) // focal 500 stays centred
  // Cannot zoom out past the image.
  const out = zoomViewBox({ x: 100, y: 50, w: 500, h: 250 }, 4, { x: 350, y: 175 }, 1000, 500)
  assert.equal(out.w, 1000)
  assert.equal(out.x, 0)
})

test('isDrawable rejects a tiny drag (a click, not a shape)', () => {
  assert.equal(isDrawable({ x: 0, y: 0, w: 2, h: 2 }), false)
  assert.equal(isDrawable({ x: 0, y: 0, w: 20, h: 20 }), true)
})

test('nudge moves a rect and clamps it to the image', () => {
  const rect: OccluderShape = { kind: 'rect', x: 90, y: 10, w: 20, h: 20 }
  assert.deepEqual(nudgeShape(rect, 50, 0, 100, 100), { kind: 'rect', x: 80, y: 10, w: 20, h: 20 })
})

test('nudge moves every point of a polygon', () => {
  const poly: OccluderShape = { kind: 'polygon', points: [{ x: 10, y: 10 }, { x: 20, y: 20 }] }
  assert.deepEqual(nudgeShape(poly, 5, -5, 100, 100), { kind: 'polygon', points: [{ x: 15, y: 5 }, { x: 25, y: 15 }] })
})

// --- resizeRect --------------------------------------------------------

test('resizeRect: se corner drags right+bottom, opposite corner (left/top) stays fixed', () => {
  const rect = { x: 10, y: 10, w: 100, h: 100 }
  assert.deepEqual(resizeRect(rect, 'se', { x: 200, y: 180 }, 300, 300), { x: 10, y: 10, w: 190, h: 170 })
})

test('resizeRect: nw corner drags left+top, opposite corner (right/bottom) stays fixed', () => {
  const rect = { x: 50, y: 50, w: 100, h: 100 } // right=150, bottom=150
  assert.deepEqual(resizeRect(rect, 'nw', { x: 20, y: 30 }, 300, 300), { x: 20, y: 30, w: 130, h: 120 })
})

test('resizeRect: ne corner drags right+top, opposite corner (left/bottom) stays fixed', () => {
  const rect = { x: 10, y: 10, w: 100, h: 100 } // left=10, bottom=110
  assert.deepEqual(resizeRect(rect, 'ne', { x: 250, y: 5 }, 300, 300), { x: 10, y: 5, w: 240, h: 105 })
})

test('resizeRect: sw corner drags left+bottom, opposite corner (right/top) stays fixed', () => {
  const rect = { x: 10, y: 10, w: 100, h: 100 } // right=110, top=10
  assert.deepEqual(resizeRect(rect, 'sw', { x: 5, y: 250 }, 300, 300), { x: 5, y: 10, w: 105, h: 240 })
})

test('resizeRect: n edge drags only the top edge', () => {
  const rect = { x: 10, y: 10, w: 100, h: 100 }
  assert.deepEqual(resizeRect(rect, 'n', { x: 999, y: 40 }, 300, 300), { x: 10, y: 40, w: 100, h: 70 })
})

test('resizeRect: e edge drags only the right edge', () => {
  const rect = { x: 10, y: 10, w: 100, h: 100 }
  assert.deepEqual(resizeRect(rect, 'e', { x: 150, y: 999 }, 300, 300), { x: 10, y: 10, w: 140, h: 100 })
})

test('resizeRect: s edge drags only the bottom edge', () => {
  const rect = { x: 10, y: 10, w: 100, h: 100 }
  assert.deepEqual(resizeRect(rect, 's', { x: 999, y: 200 }, 300, 300), { x: 10, y: 10, w: 100, h: 190 })
})

test('resizeRect: w edge drags only the left edge', () => {
  const rect = { x: 10, y: 10, w: 100, h: 100 }
  assert.deepEqual(resizeRect(rect, 'w', { x: 5, y: 999 }, 300, 300), { x: 5, y: 10, w: 105, h: 100 })
})

test('resizeRect: clamps a moved edge to the image bounds', () => {
  const rect = { x: 10, y: 10, w: 100, h: 100 }
  assert.deepEqual(resizeRect(rect, 'nw', { x: -50, y: -50 }, 300, 300), { x: 0, y: 0, w: 110, h: 110 })
})

test('resizeRect: enforces MIN_DRAW_SIZE when dragging the right edge past the left', () => {
  const rect = { x: 10, y: 10, w: 100, h: 100 }
  const result = resizeRect(rect, 'e', { x: 5, y: 50 }, 300, 300)
  assert.equal(result.w, MIN_DRAW_SIZE)
  assert.deepEqual(result, { x: 10, y: 10, w: MIN_DRAW_SIZE, h: 100 })
})

test('resizeRect: enforces MIN_DRAW_SIZE when dragging the left edge past the right', () => {
  const rect = { x: 10, y: 10, w: 100, h: 100 }
  const result = resizeRect(rect, 'w', { x: 200, y: 50 }, 300, 300)
  assert.equal(result.w, MIN_DRAW_SIZE)
  assert.deepEqual(result, { x: 106, y: 10, w: MIN_DRAW_SIZE, h: 100 })
})

test('resizeRect: enforces MIN_DRAW_SIZE when dragging the top edge past the bottom', () => {
  const rect = { x: 10, y: 10, w: 100, h: 100 }
  const result = resizeRect(rect, 'n', { x: 50, y: 200 }, 300, 300)
  assert.equal(result.h, MIN_DRAW_SIZE)
  assert.deepEqual(result, { x: 10, y: 106, w: 100, h: MIN_DRAW_SIZE })
})

test('resizeRect: enforces MIN_DRAW_SIZE when dragging the bottom edge past the top', () => {
  const rect = { x: 10, y: 10, w: 100, h: 100 }
  const result = resizeRect(rect, 's', { x: 50, y: -100 }, 300, 300)
  assert.equal(result.h, MIN_DRAW_SIZE)
  assert.deepEqual(result, { x: 10, y: 10, w: 100, h: MIN_DRAW_SIZE })
})

test('resizeRect does not mutate the input rect', () => {
  const rect = { x: 10, y: 10, w: 100, h: 100 }
  const copy = { ...rect }
  resizeRect(rect, 'se', { x: 200, y: 180 }, 300, 300)
  assert.deepEqual(rect, copy)
})

test('resizeHandlePoints returns the 8 handles in order at their documented positions', () => {
  const rect = { x: 10, y: 20, w: 80, h: 40 }
  assert.deepEqual(resizeHandlePoints(rect), [
    { handle: 'nw', x: 10, y: 20 },
    { handle: 'n', x: 50, y: 20 },
    { handle: 'ne', x: 90, y: 20 },
    { handle: 'e', x: 90, y: 40 },
    { handle: 'se', x: 90, y: 60 },
    { handle: 's', x: 50, y: 60 },
    { handle: 'sw', x: 10, y: 60 },
    { handle: 'w', x: 10, y: 40 },
  ])
})
