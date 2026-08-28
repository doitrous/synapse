import { test } from 'node:test'
import assert from 'node:assert/strict'
import { clampRect, clientToImage, isDrawable, nudgeShape, rectFromPoints, zoomViewBox } from './occlusionEditor.ts'
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
