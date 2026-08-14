import test from 'node:test'
import assert from 'node:assert/strict'
import { strokeHitsPoint, strokesAlongPath, topmostAt } from './hitTest.ts'
import { encodePoints } from './strokeCodec.ts'
import { boundsOf, type InkObject, type Point } from './annotations.ts'

function ink(id: string, points: Point[], z = 1, w = 0.004): InkObject {
  return {
    id, kind: 'ink', page: 1, z, t: 0, tool: 'ball', color: '#000000', w,
    bbox: boundsOf(points, w / 2),
    p: encodePoints(points),
  }
}

/** A horizontal line across the middle of the page. */
const LINE = ink('line', [{ x: 0.2, y: 0.5 }, { x: 0.8, y: 0.5 }])

test('a point on the stroke is a hit; one well away is not', () => {
  assert.equal(strokeHitsPoint(LINE, { x: 0.5, y: 0.5 }, 0.002), true)
  assert.equal(strokeHitsPoint(LINE, { x: 0.5, y: 0.9 }, 0.002), false)
})

test('the stroke\'s own width counts toward the hit', () => {
  const thick = ink('thick', [{ x: 0.2, y: 0.5 }, { x: 0.8, y: 0.5 }], 1, 0.05)
  // 0.02 above the centreline: outside a hairline, inside a thick stroke.
  assert.equal(strokeHitsPoint(LINE, { x: 0.5, y: 0.52 }, 0.001), false)
  assert.equal(strokeHitsPoint(thick, { x: 0.5, y: 0.52 }, 0.001), true)
})

test('a hit is measured to the segment, not past its ends', () => {
  assert.equal(strokeHitsPoint(LINE, { x: 0.95, y: 0.5 }, 0.002), false)
})

test('a single-point stroke — a dot — can still be hit', () => {
  const dot = ink('dot', [{ x: 0.5, y: 0.5 }])
  assert.equal(strokeHitsPoint(dot, { x: 0.5, y: 0.5 }, 0.002), true)
  assert.equal(strokeHitsPoint(dot, { x: 0.7, y: 0.5 }, 0.002), false)
})

test('an eraser path collects everything it crosses, once each', () => {
  const a = ink('a', [{ x: 0.3, y: 0.2 }, { x: 0.3, y: 0.8 }])
  const b = ink('b', [{ x: 0.5, y: 0.2 }, { x: 0.5, y: 0.8 }])
  const c = ink('c', [{ x: 0.9, y: 0.2 }, { x: 0.9, y: 0.8 }])
  // A horizontal swipe across a and b, stopping short of c.
  const path: Point[] = Array.from({ length: 20 }, (_, i) => ({ x: 0.25 + i * 0.02, y: 0.5 }))
  const hit = strokesAlongPath([a, b, c], path, 0.005)
  assert.deepEqual(hit.sort(), ['a', 'b'])
})

test('an eraser that touches nothing removes nothing', () => {
  assert.deepEqual(strokesAlongPath([LINE], [{ x: 0.5, y: 0.1 }], 0.002), [])
  assert.deepEqual(strokesAlongPath([LINE], [], 0.002), [])
  assert.deepEqual(strokesAlongPath([], [{ x: 0.5, y: 0.5 }], 0.002), [])
})

test('a larger eraser reaches further', () => {
  const near: Point[] = [{ x: 0.5, y: 0.53 }]
  assert.deepEqual(strokesAlongPath([LINE], near, 0.005), [])
  assert.deepEqual(strokesAlongPath([LINE], near, 0.05), ['line'])
})

test('the topmost stroke under a point wins', () => {
  const under = ink('under', [{ x: 0.2, y: 0.5 }, { x: 0.8, y: 0.5 }], 1)
  const over = ink('over', [{ x: 0.2, y: 0.5 }, { x: 0.8, y: 0.5 }], 5)
  assert.equal(topmostAt([under, over], { x: 0.5, y: 0.5 }, 0.002)?.id, 'over')
  // Order of the list must not decide it.
  assert.equal(topmostAt([over, under], { x: 0.5, y: 0.5 }, 0.002)?.id, 'over')
})

test('nothing under the point returns nothing', () => {
  assert.equal(topmostAt([LINE], { x: 0.5, y: 0.05 }, 0.002), undefined)
})

test('a fast swipe erases what falls between its samples', () => {
  // The regression this guards: testing only the reported pointer positions
  // meant the faster someone scrubbed, the less the eraser removed. Here the
  // samples are 0.02 apart and the eraser reach is 0.007 — every stroke sits
  // in a gap, and all of them must still go.
  const strokes = [0.3, 0.5, 0.62].map((x, index) =>
    ink(`s${index}`, [{ x, y: 0.2 }, { x, y: 0.8 }]))
  const coarse: Point[] = Array.from({ length: 20 }, (_, i) => ({ x: 0.25 + i * 0.02, y: 0.5 }))
  assert.deepEqual(strokesAlongPath(strokes, coarse, 0.005).sort(), ['s0', 's1', 's2'])
})

test('a swipe that passes near but not through still leaves the stroke', () => {
  const away: Point[] = [{ x: 0.2, y: 0.1 }, { x: 0.8, y: 0.1 }]
  assert.deepEqual(strokesAlongPath([LINE], away, 0.005), [])
})

test('a stroke far away is rejected on its bounding box alone', () => {
  // Not observable directly, but this is the case that keeps a page of four
  // hundred strokes from decoding four hundred point arrays per pointer move.
  const far = ink('far', [{ x: 0.01, y: 0.01 }, { x: 0.02, y: 0.02 }])
  assert.equal(strokeHitsPoint(far, { x: 0.9, y: 0.9 }, 0.002), false)
})
