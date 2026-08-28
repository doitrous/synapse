/**
 * Image-occlusion geometry and the signature that stops a set being saved twice.
 *
 * Shapes are stored in image-space — pixels of the source image — so a card's
 * masks land in the same place whatever the canvas zoom or the screen size; the
 * editor maps to screen-space at draw time and never the other way. The pure
 * helpers here (bounds, hit test, nudge) are what the editor's pointer handlers
 * are built on, kept out of React so they can be pinned by tests.
 *
 * The duplicate signature is deliberately not a UI "already saved" flag. It is
 * derived from what actually makes two occlusion sets the same card: the source
 * image, the mode, and the *normalized* geometry and grouping of the occluders,
 * scoped to the deck. Normalizing to image fractions rounded to three places
 * means sub-pixel jitter from a re-drag doesn't count as a new set, while a
 * genuinely different layout does. The note's own id is excluded on purpose —
 * otherwise no two notes could ever be found equal, which is the whole point.
 */

import type { ImageOcclusionNote, Occluder, OccluderShape, OcclusionMode } from './model.ts'

export interface Bounds {
  x: number
  y: number
  w: number
  h: number
}

/** The axis-aligned bounding box of any shape, in image-space. */
export function shapeBounds(shape: OccluderShape): Bounds {
  if (shape.kind === 'polygon') {
    const xs = shape.points.map((p) => p.x)
    const ys = shape.points.map((p) => p.y)
    const minX = Math.min(...xs)
    const minY = Math.min(...ys)
    return { x: minX, y: minY, w: Math.max(...xs) - minX, h: Math.max(...ys) - minY }
  }
  return { x: shape.x, y: shape.y, w: shape.w, h: shape.h }
}

/** Whether an image-space point falls inside a shape (for click selection). */
export function pointInShape(shape: OccluderShape, px: number, py: number): boolean {
  if (shape.kind === 'rect') {
    return px >= shape.x && px <= shape.x + shape.w && py >= shape.y && py <= shape.y + shape.h
  }
  if (shape.kind === 'ellipse') {
    const rx = shape.w / 2
    const ry = shape.h / 2
    if (rx === 0 || ry === 0) return false
    const cx = shape.x + rx
    const cy = shape.y + ry
    const nx = (px - cx) / rx
    const ny = (py - cy) / ry
    return nx * nx + ny * ny <= 1
  }
  return pointInPolygon(shape.points, px, py)
}

/** Ray-casting point-in-polygon; edges count as inside via the standard test. */
export function pointInPolygon(points: { x: number; y: number }[], px: number, py: number): boolean {
  let inside = false
  for (let i = 0, j = points.length - 1; i < points.length; j = i++) {
    const xi = points[i].x
    const yi = points[i].y
    const xj = points[j].x
    const yj = points[j].y
    const intersects = yi > py !== yj > py && px < ((xj - xi) * (py - yi)) / (yj - yi) + xi
    if (intersects) inside = !inside
  }
  return inside
}

/** Translate a shape by an image-space delta, returning a new shape. */
export function moveShape(shape: OccluderShape, dx: number, dy: number): OccluderShape {
  if (shape.kind === 'polygon') {
    return { kind: 'polygon', points: shape.points.map((p) => ({ x: p.x + dx, y: p.y + dy })) }
  }
  return { ...shape, x: shape.x + dx, y: shape.y + dy }
}

/**
 * How many cards a set of occluders and groups will produce: one per group and
 * one per ungrouped occluder. Shown before saving so the count is never a
 * surprise.
 */
export function occlusionCardCount(occluders: Occluder[], groupIds: string[]): number {
  const ungrouped = occluders.filter((occ) => !occ.groupId).length
  return groupIds.length + ungrouped
}

/**
 * A stable, deck-scoped signature of an occlusion set. Two notes with the same
 * image, mode, grouping and normalized geometry in the same deck produce the
 * same string; anything that would change which cards are generated, or where
 * their masks sit, changes it.
 */
export function occlusionSignature(
  input: Pick<ImageOcclusionNote, 'deckId' | 'image' | 'imageWidth' | 'imageHeight' | 'mode' | 'occluders'>,
): string {
  const canonical = canonicalOcclusion(input)
  return `${input.deckId}|${input.image}|${input.mode}|${hash(canonical)}`
}

function canonicalOcclusion(
  input: Pick<ImageOcclusionNote, 'imageWidth' | 'imageHeight' | 'mode' | 'occluders'>,
): string {
  const w = input.imageWidth || 1
  const h = input.imageHeight || 1
  const parts = input.occluders
    .map((occ) => `${occ.groupId ?? ''}~${normalizeShape(occ.shape, w, h)}`)
    .sort()
  return parts.join(';')
}

/** Geometry rounded to three decimal places of image fraction, order-stable. */
function normalizeShape(shape: OccluderShape, w: number, h: number): string {
  const r = (n: number, span: number) => Math.round((n / span) * 1000) / 1000
  if (shape.kind === 'polygon') {
    const pts = shape.points
      .map((p) => `${r(p.x, w)},${r(p.y, h)}`)
      .sort()
      .join(' ')
    return `poly:${pts}`
  }
  return `${shape.kind}:${r(shape.x, w)},${r(shape.y, h)},${r(shape.w, w)},${r(shape.h, h)}`
}

/** Small, dependency-free FNV-1a over the canonical string; hex, order-stable. */
function hash(value: string): string {
  let h = 0x811c9dc5
  for (let i = 0; i < value.length; i++) {
    h ^= value.charCodeAt(i)
    h = Math.imul(h, 0x01000193)
  }
  return (h >>> 0).toString(16).padStart(8, '0')
}

/** Whether a candidate set already exists among saved signatures in the deck. */
export function isDuplicateOcclusion(
  candidate: Parameters<typeof occlusionSignature>[0],
  existingSignatures: Iterable<string>,
): boolean {
  const sig = occlusionSignature(candidate)
  for (const existing of existingSignatures) {
    if (existing === sig) return true
  }
  return false
}

export type { OcclusionMode }
