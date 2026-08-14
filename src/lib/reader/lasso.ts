import { bboxIntersects, type AnnotationObject, type ObjectKind, type Point } from './annotations.ts'
import { decodePoints } from './strokeCodec.ts'

/**
 * Choosing marks by drawing round them.
 *
 * Two rules, and each is the one that makes the tool usable:
 *
 * - **Ink needs most of itself inside.** "Any point inside" makes a long stroke
 *   impossible to *avoid* selecting; "every point inside" makes it impossible
 *   to select at all. Sixty per cent is the line that behaves.
 * - **Widgets go by their centre**, because a sticky note is a thing in a
 *   place, not a path.
 *
 * `kinds` is the settings popover, expressed as an argument: turning
 * "handwriting" off is just leaving `ink` out of the set.
 */

/** Fraction of a stroke's points that must fall inside to select it. */
const INK_THRESHOLD = 0.6

export function pointInPolygon(point: Point, polygon: readonly Point[]): boolean {
  if (polygon.length < 3) return false
  let inside = false
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const a = polygon[i]
    const b = polygon[j]
    const straddles = (a.y > point.y) !== (b.y > point.y)
    if (!straddles) continue
    const crossX = ((b.x - a.x) * (point.y - a.y)) / (b.y - a.y) + a.x
    if (point.x < crossX) inside = !inside
  }
  return inside
}

export function polygonBounds(polygon: readonly Point[]): [number, number, number, number] {
  let minX = Infinity; let minY = Infinity; let maxX = -Infinity; let maxY = -Infinity
  for (const point of polygon) {
    minX = Math.min(minX, point.x); maxX = Math.max(maxX, point.x)
    minY = Math.min(minY, point.y); maxY = Math.max(maxY, point.y)
  }
  return [minX, minY, maxX, maxY]
}

/** A rectangular marquee, as a polygon, so one code path serves both shapes. */
export function rectanglePolygon(a: Point, b: Point): Point[] {
  return [
    { x: Math.min(a.x, b.x), y: Math.min(a.y, b.y) },
    { x: Math.max(a.x, b.x), y: Math.min(a.y, b.y) },
    { x: Math.max(a.x, b.x), y: Math.max(a.y, b.y) },
    { x: Math.min(a.x, b.x), y: Math.max(a.y, b.y) },
  ]
}

export function selectInLasso(
  objects: readonly AnnotationObject[],
  polygon: readonly Point[],
  kinds: ReadonlySet<ObjectKind>,
): string[] {
  if (polygon.length < 3) return []
  const box = polygonBounds(polygon)
  const selected: string[] = []

  for (const object of objects) {
    if (!kinds.has(object.kind)) continue
    if (!bboxIntersects(object.bbox, box)) continue

    if (object.kind === 'ink' || object.kind === 'highlighter') {
      const points = decodePoints(object.p)
      if (!points.length) continue
      let inside = 0
      for (const point of points) if (pointInPolygon(point, polygon)) inside++
      if (inside / points.length >= INK_THRESHOLD) selected.push(object.id)
      continue
    }

    // Everything else is a thing in a place: its centre decides.
    const centre = { x: (object.bbox[0] + object.bbox[2]) / 2, y: (object.bbox[1] + object.bbox[3]) / 2 }
    if (pointInPolygon(centre, polygon)) selected.push(object.id)
  }

  return selected
}

/** The box round a selection, for its handles. */
export function selectionBounds(objects: readonly AnnotationObject[]): [number, number, number, number] | null {
  if (!objects.length) return null
  let minX = Infinity; let minY = Infinity; let maxX = -Infinity; let maxY = -Infinity
  for (const object of objects) {
    minX = Math.min(minX, object.bbox[0]); minY = Math.min(minY, object.bbox[1])
    maxX = Math.max(maxX, object.bbox[2]); maxY = Math.max(maxY, object.bbox[3])
  }
  return [minX, minY, maxX, maxY]
}
