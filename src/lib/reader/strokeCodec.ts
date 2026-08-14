import type { Point } from './annotations.ts'

/**
 * A stroke, small enough to store thousands of.
 *
 * Three stages, each cheap and reversible:
 *
 * 1. **Simplify** — Ramer–Douglas–Peucker, which typically removes half the
 *    samples with no visible change to the line.
 * 2. **Quantise** — multiply by 4096 and round. One unit is about 0.05 mm on
 *    A4: finer than a nib, and far finer than anyone can see.
 * 3. **Delta-encode** — store each point as its offset from the last. After
 *    simplification those offsets are almost all one- or two-digit integers.
 *
 * The result stays a plain array of small integers rather than base64 binary,
 * because `GET /api/me/export` promises the student their own data and a wall
 * of base64 is not that. A 120-point stroke lands around 700 bytes of JSON.
 */

/** 1/4096 of a page width. Below the resolution of any pen or any eye. */
export const QUANTUM = 4096

export function quantise(value: number): number {
  return Math.round(value * QUANTUM)
}

export function dequantise(value: number): number {
  return value / QUANTUM
}

/** `[x0, y0, dx1, dy1, …]` — the shape stored on `InkObject.p`. */
export function encodePoints(points: readonly Point[]): number[] {
  if (!points.length) return []
  const out: number[] = []
  let lastX = 0
  let lastY = 0
  for (let index = 0; index < points.length; index++) {
    const x = quantise(points[index].x)
    const y = quantise(points[index].y)
    if (index === 0) out.push(x, y)
    else out.push(x - lastX, y - lastY)
    lastX = x
    lastY = y
  }
  return out
}

/**
 * Move an encoded stroke without decoding it.
 *
 * Only the first pair is absolute — every other entry is an offset from the one
 * before — so moving the whole stroke is two additions, whatever its length.
 * That is the property that makes dragging a lasso selection of two hundred
 * strokes cost nothing.
 */
export function translatePoints(encoded: readonly number[], dx: number, dy: number): number[] {
  if (encoded.length < 2) return [...encoded]
  const out = [...encoded]
  out[0] += quantise(dx)
  out[1] += quantise(dy)
  return out
}

export function decodePoints(encoded: readonly number[]): Point[] {
  const points: Point[] = []
  let x = 0
  let y = 0
  for (let index = 0; index + 1 < encoded.length; index += 2) {
    if (index === 0) { x = encoded[0]; y = encoded[1] }
    else { x += encoded[index]; y += encoded[index + 1] }
    points.push({ x: dequantise(x), y: dequantise(y) })
  }
  return points
}

/**
 * Ramer–Douglas–Peucker.
 *
 * `epsilon` is in page-space units, so it means the same thing on every
 * document: 0.0006 of a page width is well under a pixel at 4× zoom.
 */
export function simplify(points: readonly Point[], epsilon = 0.0006): Point[] {
  if (points.length <= 2) return [...points]

  const keep = new Uint8Array(points.length)
  keep[0] = 1
  keep[points.length - 1] = 1

  const stack: [number, number][] = [[0, points.length - 1]]
  while (stack.length) {
    const [start, end] = stack.pop()!
    let furthest = -1
    let distance = epsilon
    for (let index = start + 1; index < end; index++) {
      const candidate = pointToSegment(points[index], points[start], points[end])
      if (candidate > distance) { distance = candidate; furthest = index }
    }
    if (furthest === -1) continue
    keep[furthest] = 1
    stack.push([start, furthest], [furthest, end])
  }

  const out: Point[] = []
  for (let index = 0; index < points.length; index++) if (keep[index]) out.push(points[index])
  return out
}

/** Perpendicular distance from a point to a segment (or to its end). */
export function pointToSegment(point: Point, a: Point, b: Point): number {
  const dx = b.x - a.x
  const dy = b.y - a.y
  const lengthSquared = dx * dx + dy * dy
  if (lengthSquared === 0) return Math.hypot(point.x - a.x, point.y - a.y)
  let t = ((point.x - a.x) * dx + (point.y - a.y) * dy) / lengthSquared
  t = Math.max(0, Math.min(1, t))
  return Math.hypot(point.x - (a.x + t * dx), point.y - (a.y + t * dy))
}

/** Roughly what a value costs once serialised, for the shard size guard. */
export function byteSizeOf(value: unknown): number {
  return JSON.stringify(value)?.length ?? 0
}
