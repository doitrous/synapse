import test from 'node:test'
import assert from 'node:assert/strict'
import { byteSizeOf, decodePoints, encodePoints, pointToSegment, simplify } from './strokeCodec.ts'
import type { Point } from './annotations.ts'

/** A hand-drawn-ish stroke: a wobbly arc across most of a page. */
function stroke(count: number): Point[] {
  const points: Point[] = []
  for (let index = 0; index < count; index++) {
    const t = index / (count - 1)
    points.push({
      x: 0.1 + t * 0.8,
      y: 0.3 + Math.sin(t * Math.PI) * 0.2 + Math.sin(t * 40) * 0.0015,
    })
  }
  return points
}

test('points survive the round trip within the quantum', () => {
  const original = stroke(120)
  const decoded = decodePoints(encodePoints(original))
  assert.equal(decoded.length, original.length)
  for (let index = 0; index < original.length; index++) {
    // 1/4096 of a page width — under 0.05 mm on A4.
    assert.ok(Math.abs(decoded[index].x - original[index].x) < 1 / 4096)
    assert.ok(Math.abs(decoded[index].y - original[index].y) < 1 / 4096)
  }
})

test('an empty or single-point stroke round-trips too', () => {
  assert.deepEqual(encodePoints([]), [])
  assert.deepEqual(decodePoints([]), [])
  const single = decodePoints(encodePoints([{ x: 0.5, y: 0.25 }]))
  assert.equal(single.length, 1)
  assert.ok(Math.abs(single[0].x - 0.5) < 1 / 4096)
})

test('encoding is deltas, so a stroke is a run of small numbers', () => {
  // This is the whole reason a book of annotations fits in the store at all.
  const encoded = encodePoints(stroke(120))
  const deltas = encoded.slice(2)
  const largest = Math.max(...deltas.map(Math.abs))
  assert.ok(largest < 200, `deltas should stay small, largest was ${largest}`)
})

test('a simplified stroke costs well under a kilobyte', () => {
  const encoded = encodePoints(simplify(stroke(200)))
  assert.ok(byteSizeOf(encoded) < 900, `stroke serialised to ${byteSizeOf(encoded)} bytes`)
})

test('simplification removes points without moving the line', () => {
  const original = stroke(200)
  const simplified = simplify(original, 0.002)
  assert.ok(simplified.length < original.length, 'nothing was removed')
  // Every original point stays within epsilon of the simplified path.
  for (const point of original) {
    let nearest = Infinity
    for (let index = 1; index < simplified.length; index++) {
      nearest = Math.min(nearest, pointToSegment(point, simplified[index - 1], simplified[index]))
    }
    assert.ok(nearest <= 0.002 + 1e-9, `a point drifted ${nearest} from the simplified line`)
  }
})

test('simplification keeps both ends exactly', () => {
  const original = stroke(80)
  const simplified = simplify(original)
  assert.deepEqual(simplified[0], original[0])
  assert.deepEqual(simplified[simplified.length - 1], original[original.length - 1])
})

test('a straight line collapses to its two ends', () => {
  const line: Point[] = Array.from({ length: 50 }, (_, i) => ({ x: i / 49, y: 0.5 }))
  assert.equal(simplify(line).length, 2)
})

test('a stroke of one or two points is left alone', () => {
  assert.equal(simplify([{ x: 0, y: 0 }]).length, 1)
  assert.equal(simplify([{ x: 0, y: 0 }, { x: 1, y: 1 }]).length, 2)
})

test('a dot — every point identical — does not divide by zero', () => {
  const dot: Point[] = Array.from({ length: 10 }, () => ({ x: 0.4, y: 0.4 }))
  const simplified = simplify(dot)
  assert.ok(simplified.length >= 1 && simplified.length <= 2)
  assert.ok(Number.isFinite(pointToSegment({ x: 0.5, y: 0.5 }, dot[0], dot[1])))
})

test('distance to a segment is measured to the segment, not its infinite line', () => {
  const a = { x: 0, y: 0 }
  const b = { x: 1, y: 0 }
  // Beyond the end: the distance is to the endpoint.
  assert.ok(Math.abs(pointToSegment({ x: 2, y: 0 }, a, b) - 1) < 1e-9)
  // Above the middle: the perpendicular.
  assert.ok(Math.abs(pointToSegment({ x: 0.5, y: 0.25 }, a, b) - 0.25) < 1e-9)
})
