import type { Point } from './annotations.ts'
import { pointToSegment } from './strokeCodec.ts'

/**
 * Turning a drawn scribble into the shape it was meant to be.
 *
 * The rule that matters most is the one about *not* firing: a diagram, a
 * scrawled arrow through a paragraph, a circled word that is deliberately
 * rough — none of those should be straightened. So every test has to pass a
 * confidence bar, and a shape the reader keeps drawing badly is left as ink.
 */

export type ShapeKind = 'line' | 'rect' | 'ellipse' | 'arrow'

export interface Recognised {
  kind: ShapeKind
  /** Defining points: two corners for rect/ellipse/line, tail→head for arrow. */
  a: Point
  b: Point
  confidence: number
}

const SAMPLES = 64

export function recogniseShape(raw: readonly Point[]): Recognised | null {
  if (raw.length < 4) return null
  const points = resample(raw, SAMPLES)
  const box = bounds(points)
  const diagonal = Math.hypot(box.width, box.height)
  if (diagonal < 1e-4) return null

  const first = points[0]
  const last = points[points.length - 1]
  const closure = Math.hypot(last.x - first.x, last.y - first.y) / diagonal
  const closed = closure < 0.2

  // A line: everything sits on the segment between the ends. The threshold is
  // deliberately tight — a written word is a wobble along a line too, and
  // straightening someone's handwriting is worse than recognising nothing.
  const lineError = meanDistanceToSegment(points, first, last) / diagonal
  if (!closed && lineError < 0.03) {
    return { kind: 'line', a: first, b: last, confidence: 1 - lineError / 0.03 }
  }

  // An arrow: a shaft plus a head, so the last quarter turns back sharply.
  if (!closed) {
    const arrow = detectArrow(points, diagonal)
    if (arrow) return arrow
  }

  if (closed) {
    const ellipseError = ellipseResidual(points, box) / diagonal
    const rectError = rectResidual(points, box) / diagonal
    if (ellipseError < rectError && ellipseError < 0.06) {
      return {
        kind: 'ellipse',
        a: { x: box.minX, y: box.minY },
        b: { x: box.maxX, y: box.maxY },
        confidence: 1 - ellipseError / 0.06,
      }
    }
    if (rectError < 0.06) {
      return {
        kind: 'rect',
        a: { x: box.minX, y: box.minY },
        b: { x: box.maxX, y: box.maxY },
        confidence: 1 - rectError / 0.06,
      }
    }
  }

  return null
}

function detectArrow(points: readonly Point[], diagonal: number): Recognised | null {
  const headStart = Math.floor(points.length * 0.72)
  const shaft = points.slice(0, headStart)
  if (shaft.length < 4) return null
  const shaftError = meanDistanceToSegment(shaft, shaft[0], shaft[shaft.length - 1]) / diagonal
  if (shaftError > 0.05) return null

  // The head has to double back on the shaft rather than continue it.
  const tip = points[headStart]
  const end = points[points.length - 1]
  const shaftAngle = angle(shaft[0], shaft[shaft.length - 1])
  const backAngle = angle(tip, end)
  const turn = Math.abs(normaliseAngle(backAngle - shaftAngle))
  const headLength = Math.hypot(end.x - tip.x, end.y - tip.y) / diagonal
  if (turn < Math.PI * 0.45 || turn > Math.PI * 0.92) return null
  if (headLength < 0.06 || headLength > 0.5) return null

  return {
    kind: 'arrow',
    a: shaft[0],
    b: tip,
    confidence: 1 - shaftError / 0.05,
  }
}

/* ---- geometry ----------------------------------------------------------- */

export function resample(points: readonly Point[], count: number): Point[] {
  const total = pathLength(points)
  if (total === 0) return Array.from({ length: count }, () => ({ ...points[0] }))
  const step = total / (count - 1)
  const out: Point[] = [{ ...points[0] }]
  let accumulated = 0
  let index = 1
  let previous = points[0]

  while (index < points.length && out.length < count) {
    const segment = Math.hypot(points[index].x - previous.x, points[index].y - previous.y)
    if (accumulated + segment >= step) {
      const t = (step - accumulated) / segment
      const next = {
        x: previous.x + (points[index].x - previous.x) * t,
        y: previous.y + (points[index].y - previous.y) * t,
      }
      out.push(next)
      previous = next
      accumulated = 0
    } else {
      accumulated += segment
      previous = points[index]
      index++
    }
  }
  while (out.length < count) out.push({ ...points[points.length - 1] })
  return out
}

export function pathLength(points: readonly Point[]): number {
  let total = 0
  for (let index = 1; index < points.length; index++) {
    total += Math.hypot(points[index].x - points[index - 1].x, points[index].y - points[index - 1].y)
  }
  return total
}

interface Box { minX: number; minY: number; maxX: number; maxY: number; width: number; height: number }

function bounds(points: readonly Point[]): Box {
  let minX = Infinity; let minY = Infinity; let maxX = -Infinity; let maxY = -Infinity
  for (const point of points) {
    minX = Math.min(minX, point.x); maxX = Math.max(maxX, point.x)
    minY = Math.min(minY, point.y); maxY = Math.max(maxY, point.y)
  }
  return { minX, minY, maxX, maxY, width: maxX - minX, height: maxY - minY }
}

function meanDistanceToSegment(points: readonly Point[], a: Point, b: Point): number {
  let total = 0
  for (const point of points) total += pointToSegment(point, a, b)
  return total / points.length
}

/** Mean radial error against the ellipse inscribed in the bounding box. */
function ellipseResidual(points: readonly Point[], box: Box): number {
  const cx = (box.minX + box.maxX) / 2
  const cy = (box.minY + box.maxY) / 2
  const rx = Math.max(box.width / 2, 1e-6)
  const ry = Math.max(box.height / 2, 1e-6)
  let total = 0
  for (const point of points) {
    const nx = (point.x - cx) / rx
    const ny = (point.y - cy) / ry
    total += Math.abs(Math.hypot(nx, ny) - 1) * Math.min(rx, ry)
  }
  return total / points.length
}

/** Mean distance to the nearest edge of the bounding rectangle. */
function rectResidual(points: readonly Point[], box: Box): number {
  const corners: Point[] = [
    { x: box.minX, y: box.minY }, { x: box.maxX, y: box.minY },
    { x: box.maxX, y: box.maxY }, { x: box.minX, y: box.maxY },
  ]
  let total = 0
  for (const point of points) {
    let nearest = Infinity
    for (let index = 0; index < 4; index++) {
      nearest = Math.min(nearest, pointToSegment(point, corners[index], corners[(index + 1) % 4]))
    }
    total += nearest
  }
  return total / points.length
}

function angle(a: Point, b: Point): number {
  return Math.atan2(b.y - a.y, b.x - a.x)
}

function normaliseAngle(value: number): number {
  let angle = value
  while (angle > Math.PI) angle -= Math.PI * 2
  while (angle < -Math.PI) angle += Math.PI * 2
  return angle
}

/** The path a recognised shape becomes, so it can be stored as ordinary ink. */
export function shapePath(shape: Recognised, segments = 48): Point[] {
  const { a, b, kind } = shape
  if (kind === 'line') return [a, b]
  if (kind === 'arrow') {
    const head = Math.hypot(b.x - a.x, b.y - a.y) * 0.18
    const direction = Math.atan2(b.y - a.y, b.x - a.x)
    const wing = (offset: number): Point => ({
      x: b.x - Math.cos(direction + offset) * head,
      y: b.y - Math.sin(direction + offset) * head,
    })
    return [a, b, wing(0.45), b, wing(-0.45)]
  }
  if (kind === 'rect') {
    return [
      { x: a.x, y: a.y }, { x: b.x, y: a.y }, { x: b.x, y: b.y }, { x: a.x, y: b.y }, { x: a.x, y: a.y },
    ]
  }
  const cx = (a.x + b.x) / 2
  const cy = (a.y + b.y) / 2
  const rx = Math.abs(b.x - a.x) / 2
  const ry = Math.abs(b.y - a.y) / 2
  return Array.from({ length: segments + 1 }, (_, index) => {
    const t = (index / segments) * Math.PI * 2
    return { x: cx + Math.cos(t) * rx, y: cy + Math.sin(t) * ry }
  })
}
