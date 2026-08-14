import { bboxIntersects, boundsOf, isBoxed, isInk, type AnnotationObject, type InkObject, type Point } from './annotations.ts'
import { decodePoints, pointToSegment } from './strokeCodec.ts'

/**
 * What the pointer is touching, decided geometrically.
 *
 * All of it in page space, never in the DOM: a mark is a path, not an element,
 * and asking the browser what is under a point would mean one node per stroke.
 * Every test rejects on the cached bounding box first, so a page of four
 * hundred strokes decodes almost none of them.
 */

/** Does a stroke pass within `tolerance` of a point? */
export function strokeHitsPoint(object: InkObject, point: Point, tolerance: number): boolean {
  const reach = tolerance + object.w / 2
  if (!bboxIntersects(object.bbox, [point.x - reach, point.y - reach, point.x + reach, point.y + reach])) return false
  const points = decodePoints(object.p)
  if (points.length === 1) return Math.hypot(points[0].x - point.x, points[0].y - point.y) <= reach
  for (let index = 1; index < points.length; index++) {
    if (pointToSegment(point, points[index - 1], points[index]) <= reach) return true
  }
  return false
}

/**
 * Every object an eraser swipe crossed.
 *
 * The swipe is treated as a *path*, not as the handful of points the pointer
 * happened to report. Testing only those points misses anything that fell
 * between two of them — and the faster the swipe, the further apart they are,
 * so a quick scrub would rub out almost nothing.
 */
export function strokesAlongPath(
  objects: readonly AnnotationObject[],
  path: readonly Point[],
  radius: number,
): string[] {
  if (!path.length) return []
  const sweep = boundsOf(path, radius)
  const hit = new Set<string>()

  for (const object of objects) {
    if (hit.has(object.id)) continue
    if (!bboxIntersects(object.bbox, sweep)) continue

    // A widget is erased by touching it; only ink has a path to trace.
    if (!isInk(object)) {
      if (isBoxed(object) && path.some((point) => insideRect(point, object.r, radius))) hit.add(object.id)
      continue
    }

    const reach = radius + object.w / 2
    const points = decodePoints(object.p)
    if (points.length === 1) {
      if (path.some((point) => Math.hypot(points[0].x - point.x, points[0].y - point.y) <= reach)) hit.add(object.id)
      continue
    }
    if (path.length === 1) {
      if (strokeHitsPoint(object, path[0], radius)) hit.add(object.id)
      continue
    }

    outer: for (let e = 1; e < path.length; e++) {
      for (let s = 1; s < points.length; s++) {
        if (segmentDistance(path[e - 1], path[e], points[s - 1], points[s]) <= reach) {
          hit.add(object.id)
          break outer
        }
      }
    }
  }
  return [...hit]
}

/** Shortest distance between two line segments. */
export function segmentDistance(a1: Point, a2: Point, b1: Point, b2: Point): number {
  if (segmentsCross(a1, a2, b1, b2)) return 0
  return Math.min(
    pointToSegment(a1, b1, b2),
    pointToSegment(a2, b1, b2),
    pointToSegment(b1, a1, a2),
    pointToSegment(b2, a1, a2),
  )
}

function cross(ox: number, oy: number, ax: number, ay: number, bx: number, by: number): number {
  return (ax - ox) * (by - oy) - (ay - oy) * (bx - ox)
}

function segmentsCross(a1: Point, a2: Point, b1: Point, b2: Point): boolean {
  const d1 = cross(b1.x, b1.y, b2.x, b2.y, a1.x, a1.y)
  const d2 = cross(b1.x, b1.y, b2.x, b2.y, a2.x, a2.y)
  const d3 = cross(a1.x, a1.y, a2.x, a2.y, b1.x, b1.y)
  const d4 = cross(a1.x, a1.y, a2.x, a2.y, b2.x, b2.y)
  return ((d1 > 0) !== (d2 > 0)) && ((d3 > 0) !== (d4 > 0))
}

/** The topmost object under a point, or undefined. */
export function topmostAt(
  objects: readonly AnnotationObject[],
  point: Point,
  tolerance: number,
): AnnotationObject | undefined {
  let best: AnnotationObject | undefined
  for (const object of objects) {
    const touched = isInk(object)
      ? strokeHitsPoint(object, point, tolerance)
      : isBoxed(object) && insideRect(point, object.r, tolerance)
    if (!touched) continue
    if (!best || object.z > best.z) best = object
  }
  return best
}

/** Is a point inside a widget's rectangle, allowing for a little slop? */
export function insideRect(point: Point, rect: readonly [number, number, number, number], slop = 0): boolean {
  return point.x >= rect[0] - slop && point.x <= rect[2] + slop
    && point.y >= rect[1] - slop && point.y <= rect[3] + slop
}
