import test from 'node:test'
import assert from 'node:assert/strict'
import { Stabilizer, stabilizePath, totalCurvature, widthProfile } from './stabilize.ts'
import type { Point } from './annotations.ts'

/** A line with a hand's tremor on it. */
function shaky(count = 80): Point[] {
  return Array.from({ length: count }, (_, i) => {
    const t = i / (count - 1)
    return { x: 0.1 + t * 0.8, y: 0.5 + Math.sin(t * 60) * 0.004 }
  })
}

test('more smoothing means a steadier line', () => {
  const raw = shaky()
  const gentle = stabilizePath(raw, 0.3)
  const firm = stabilizePath(raw, 0.9)
  assert.ok(totalCurvature(gentle) < totalCurvature(raw), 'gentle smoothing did nothing')
  assert.ok(totalCurvature(firm) < totalCurvature(gentle), 'more strength was not smoother')
})

test('strength zero is the raw input', () => {
  const raw = shaky(20)
  assert.deepEqual(stabilizePath(raw, 0), raw)
})

test('a stabilised stroke ends exactly where the pen lifted', () => {
  // The regression this guards: without the catch-up, every stroke stops short
  // of the pen, so the tail of a letter or a deliberate tick is clipped.
  const raw = shaky()
  const smoothed = stabilizePath(raw, 0.9)
  const last = smoothed[smoothed.length - 1]
  const target = raw[raw.length - 1]
  assert.ok(Math.abs(last.x - target.x) < 1e-9, `x ended at ${last.x}, expected ${target.x}`)
  assert.ok(Math.abs(last.y - target.y) < 1e-9, `y ended at ${last.y}, expected ${target.y}`)
})

test('the first point is never moved', () => {
  const raw = shaky()
  assert.deepEqual(stabilizePath(raw, 0.9)[0], raw[0])
})

test('smoothing never invents detail', () => {
  // The smoothed line must stay inside the box the hand drew in.
  const raw = shaky()
  const smoothed = stabilizePath(raw, 0.8)
  const minY = Math.min(...raw.map((p) => p.y))
  const maxY = Math.max(...raw.map((p) => p.y))
  for (const point of smoothed) {
    assert.ok(point.y >= minY - 1e-9 && point.y <= maxY + 1e-9)
  }
})

test('a one- or two-point stroke is left alone', () => {
  assert.equal(stabilizePath([{ x: 0, y: 0 }], 0.9).length, 1)
  assert.equal(stabilizePath([{ x: 0, y: 0 }, { x: 1, y: 1 }], 0.9).length, 2)
})

test('the streaming stabilizer agrees with the offline one', () => {
  const raw = shaky(40)
  const stabilizer = new Stabilizer(0.7)
  const streamed = raw.map((point) => stabilizer.push(point))
  streamed.push(...stabilizer.finish(raw[raw.length - 1]))
  assert.deepEqual(streamed, stabilizePath(raw, 0.7))
})

test('pressure drives width where the device reports it', () => {
  const light = widthProfile([{ x: 0, y: 0, pressure: 0.1 }], 'pressure')
  const heavy = widthProfile([{ x: 0, y: 0, pressure: 1 }], 'pressure')
  assert.ok(heavy[0] > light[0])
})

test('a fast stroke thins and a slow one does not', () => {
  // A mouse reports no pressure, so speed is what is left — and ink that
  // ignores it looks like tape rather than a pen.
  const points: Point[] = [
    { x: 0, y: 0 }, { x: 0.002, y: 0 }, { x: 0.004, y: 0 }, // slow
    { x: 0.2, y: 0 }, { x: 0.4, y: 0 }, { x: 0.6, y: 0 }, // fast
  ]
  const profile = widthProfile(points, 'velocity')
  assert.ok(profile[1] > profile[4], 'the fast section should be thinner')
})

test('every width stays within a sane band', () => {
  for (const mode of ['pressure', 'velocity', 'flat'] as const) {
    for (const width of widthProfile(shaky(30), mode)) {
      assert.ok(width >= 0.35 && width <= 1, `${mode} produced ${width}`)
    }
  }
})

test('flat means flat', () => {
  assert.deepEqual(widthProfile(shaky(5), 'flat'), [1, 1, 1, 1, 1])
})

test('a stationary stroke does not divide by zero', () => {
  const still: Point[] = Array.from({ length: 6 }, () => ({ x: 0.5, y: 0.5 }))
  for (const width of widthProfile(still, 'velocity')) assert.ok(Number.isFinite(width))
})
