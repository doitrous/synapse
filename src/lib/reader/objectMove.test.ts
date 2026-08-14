import { strict as assert } from 'node:assert'
import test from 'node:test'
import { boundsOfObjects, translateObject } from './annotations.ts'
import { decodePoints, encodePoints, translatePoints } from './strokeCodec.ts'
import type { AnnotationObject } from './annotations.ts'

const POINTS = [{ x: 0.2, y: 0.3 }, { x: 0.25, y: 0.34 }, { x: 0.31, y: 0.30 }]

function stroke(id: string, page = 1): AnnotationObject {
  return {
    id, kind: 'ink', page, z: 1, bbox: [0.2, 0.3, 0.31, 0.34], t: 0,
    tool: 'ball', color: '#241d16', w: 0.003, p: encodePoints(POINTS),
  }
}

function sticky(id: string, page = 1): AnnotationObject {
  return {
    id, kind: 'note', page, z: 2, bbox: [0.5, 0.6, 0.8, 0.75], t: 0,
    r: [0.5, 0.6, 0.8, 0.75], tone: 'sage', text: 'why',
  }
}

test('shifting an encoded stroke moves every point by the same amount', () => {
  const moved = decodePoints(translatePoints(encodePoints(POINTS), 0.1, -0.05))
  for (let index = 0; index < POINTS.length; index++) {
    assert.ok(Math.abs(moved[index].x - (POINTS[index].x + 0.1)) < 1e-3)
    assert.ok(Math.abs(moved[index].y - (POINTS[index].y - 0.05)) < 1e-3)
  }
})

test('shifting touches only the first pair, whatever the stroke length', () => {
  const encoded = encodePoints(POINTS)
  const moved = translatePoints(encoded, 0.1, 0.1)
  assert.deepEqual(moved.slice(2), encoded.slice(2))
})

test('an empty stroke survives being moved', () => {
  assert.deepEqual(translatePoints([], 0.1, 0.1), [])
})

test('moving ink moves its bounding box and its points together', () => {
  const moved = translateObject(stroke('a'), 0.1, 0.2, translatePoints)
  assert.ok(Math.abs(moved.bbox[0] - 0.3) < 1e-9)
  assert.ok(Math.abs(moved.bbox[3] - 0.54) < 1e-9)
  assert.ok(moved.kind === 'ink')
  assert.ok(Math.abs(decodePoints(moved.p)[0].x - 0.3) < 1e-3)
})

test('moving a widget moves its rectangle, not a point array', () => {
  const moved = translateObject(sticky('b'), -0.1, 0, translatePoints)
  assert.ok(moved.kind === 'note')
  assert.ok(Math.abs(moved.r[0] - 0.4) < 1e-9)
  assert.ok(Math.abs(moved.r[2] - 0.7) < 1e-9)
})

test('a selection occupies one box around everything in it', () => {
  assert.deepEqual(boundsOfObjects([stroke('a'), sticky('b')]), [0.2, 0.3, 0.8, 0.75])
})

test('an empty selection has no box rather than an infinite one', () => {
  assert.deepEqual(boundsOfObjects([]), [0, 0, 0, 0])
})
