import test from 'node:test'
import assert from 'node:assert/strict'
import { pathLength, recogniseShape, resample, shapePath } from './shapeRecognition.ts'
import type { Point } from './annotations.ts'

/** Hand-drawn: the intended shape plus a little tremor. */
function wobble(points: Point[], amount = 0.004): Point[] {
  return points.map((point, index) => ({
    x: point.x + Math.sin(index * 2.3) * amount,
    y: point.y + Math.cos(index * 1.7) * amount,
  }))
}

function line(from: Point, to: Point, count = 40): Point[] {
  return Array.from({ length: count }, (_, i) => ({
    x: from.x + (to.x - from.x) * (i / (count - 1)),
    y: from.y + (to.y - from.y) * (i / (count - 1)),
  }))
}

function circle(cx: number, cy: number, r: number, count = 60): Point[] {
  return Array.from({ length: count }, (_, i) => {
    const t = (i / (count - 1)) * Math.PI * 2
    return { x: cx + Math.cos(t) * r, y: cy + Math.sin(t) * r }
  })
}

function rectangle(x0: number, y0: number, x1: number, y1: number): Point[] {
  return [
    ...line({ x: x0, y: y0 }, { x: x1, y: y0 }, 15),
    ...line({ x: x1, y: y0 }, { x: x1, y: y1 }, 15),
    ...line({ x: x1, y: y1 }, { x: x0, y: y1 }, 15),
    ...line({ x: x0, y: y1 }, { x: x0, y: y0 }, 15),
  ]
}

test('a drawn straight line is recognised as a line', () => {
  const shape = recogniseShape(wobble(line({ x: 0.2, y: 0.3 }, { x: 0.8, y: 0.35 })))
  assert.equal(shape?.kind, 'line')
})

test('a drawn circle is recognised as an ellipse', () => {
  const shape = recogniseShape(wobble(circle(0.5, 0.5, 0.2)))
  assert.equal(shape?.kind, 'ellipse')
})

test('a drawn rectangle is recognised as a rectangle', () => {
  const shape = recogniseShape(wobble(rectangle(0.2, 0.2, 0.7, 0.5), 0.003))
  assert.equal(shape?.kind, 'rect')
})

test('a drawn arrow is recognised as an arrow', () => {
  const shaft = line({ x: 0.2, y: 0.5 }, { x: 0.7, y: 0.5 }, 30)
  const head = line({ x: 0.7, y: 0.5 }, { x: 0.62, y: 0.44 }, 10)
  assert.equal(recogniseShape(wobble([...shaft, ...head], 0.002))?.kind, 'arrow')
})

test('a scribble is not a shape', () => {
  // The rule that matters most. A diagram, a scrawl through a paragraph, a
  // deliberately rough circle round a word — none of these may be straightened.
  const scribble: Point[] = Array.from({ length: 90 }, (_, i) => ({
    x: 0.3 + Math.sin(i * 0.9) * 0.15 + i * 0.002,
    y: 0.4 + Math.cos(i * 1.7) * 0.12,
  }))
  assert.equal(recogniseShape(scribble), null)
})

test('handwriting is not a shape', () => {
  // A written word runs along a line, so a loose line test straightens it. The
  // amplitude here is roughly an x-height against the width of a short word.
  const cursive: Point[] = Array.from({ length: 120 }, (_, i) => {
    const t = i / 119
    return { x: 0.2 + t * 0.22, y: 0.5 + Math.sin(t * 26) * 0.022 }
  })
  assert.equal(recogniseShape(cursive), null)
})

test('too few points is never a shape', () => {
  assert.equal(recogniseShape([]), null)
  assert.equal(recogniseShape([{ x: 0, y: 0 }, { x: 1, y: 1 }]), null)
})

test('a stroke that went nowhere is not a shape', () => {
  const dot: Point[] = Array.from({ length: 20 }, () => ({ x: 0.5, y: 0.5 }))
  assert.equal(recogniseShape(dot), null)
})

test('recognition reports how sure it is', () => {
  const clean = recogniseShape(line({ x: 0.2, y: 0.3 }, { x: 0.8, y: 0.3 }))
  const rough = recogniseShape(wobble(line({ x: 0.2, y: 0.3 }, { x: 0.8, y: 0.3 }), 0.008))
  assert.ok(clean && rough)
  assert.ok(clean.confidence > rough.confidence, 'a cleaner line should score higher')
  assert.ok(clean.confidence <= 1 && rough.confidence >= 0)
})

test('resampling gives evenly spaced points and keeps the ends', () => {
  const source = line({ x: 0, y: 0 }, { x: 1, y: 0 }, 7)
  const resampled = resample(source, 20)
  assert.equal(resampled.length, 20)
  assert.ok(Math.abs(resampled[0].x - 0) < 1e-9)
  assert.ok(Math.abs(resampled[19].x - 1) < 1e-6)
  const gaps: number[] = []
  for (let i = 1; i < resampled.length; i++) gaps.push(resampled[i].x - resampled[i - 1].x)
  const spread = Math.max(...gaps) - Math.min(...gaps)
  assert.ok(spread < 1e-6, `spacing varied by ${spread}`)
})

test('an ellipse becomes a closed path', () => {
  const shape = recogniseShape(wobble(circle(0.5, 0.5, 0.2)))!
  const path = shapePath(shape)
  const first = path[0]
  const last = path[path.length - 1]
  assert.ok(Math.hypot(last.x - first.x, last.y - first.y) < 1e-9)
  assert.ok(pathLength(path) > 0)
})

test('a rectangle path returns to its start', () => {
  const shape = recogniseShape(wobble(rectangle(0.2, 0.2, 0.7, 0.5), 0.003))!
  const path = shapePath(shape)
  assert.deepEqual(path[0], path[path.length - 1])
})

test('an arrow path carries a head', () => {
  const shaft = line({ x: 0.2, y: 0.5 }, { x: 0.7, y: 0.5 }, 30)
  const head = line({ x: 0.7, y: 0.5 }, { x: 0.62, y: 0.44 }, 10)
  const shape = recogniseShape(wobble([...shaft, ...head], 0.002))!
  // Tail, tip, wing, back to tip, other wing.
  assert.equal(shapePath(shape).length, 5)
})
