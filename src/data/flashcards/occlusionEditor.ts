/**
 * The pure geometry the occlusion editor's pointer handlers stand on.
 *
 * A drag produces a normalized rectangle; a screen point maps to image space
 * through the current viewBox; a shape is clamped to the image bounds. Keeping
 * these out of the component means the fiddly coordinate maths — the part most
 * likely to be subtly wrong — is pinned by tests instead of eyeballed in a
 * canvas. Everything is image-space, so a saved occluder lands in the same place
 * whatever the zoom or screen size.
 */

import type { OccluderShape } from './model.ts'

export interface Rect {
  x: number
  y: number
  w: number
  h: number
}

export interface ViewBox {
  x: number
  y: number
  w: number
  h: number
}

/** A rectangle from two corners, always with positive width and height. */
export function rectFromPoints(ax: number, ay: number, bx: number, by: number): Rect {
  return { x: Math.min(ax, bx), y: Math.min(ay, by), w: Math.abs(bx - ax), h: Math.abs(by - ay) }
}

/** Map a point in the SVG's client rect to image-space through the viewBox. */
export function clientToImage(
  clientX: number,
  clientY: number,
  bounds: { left: number; top: number; width: number; height: number },
  viewBox: ViewBox,
): { x: number; y: number } {
  const fx = bounds.width === 0 ? 0 : (clientX - bounds.left) / bounds.width
  const fy = bounds.height === 0 ? 0 : (clientY - bounds.top) / bounds.height
  return { x: viewBox.x + fx * viewBox.w, y: viewBox.y + fy * viewBox.h }
}

/** Keep a rectangle inside the image, shrinking rather than shifting it out. */
export function clampRect(rect: Rect, imageWidth: number, imageHeight: number): Rect {
  const x = Math.max(0, Math.min(rect.x, imageWidth))
  const y = Math.max(0, Math.min(rect.y, imageHeight))
  return { x, y, w: Math.max(0, Math.min(rect.w, imageWidth - x)), h: Math.max(0, Math.min(rect.h, imageHeight - y)) }
}

/** Zoom a viewBox toward a focal image-point, clamped to sane limits. */
export function zoomViewBox(view: ViewBox, factor: number, focus: { x: number; y: number }, imageWidth: number, imageHeight: number): ViewBox {
  const minW = Math.max(20, imageWidth / 20)
  const maxW = imageWidth
  const w = Math.max(minW, Math.min(maxW, view.w * factor))
  const h = w * (view.h / view.w)
  // Keep the focal point under the cursor by preserving its fractional position.
  const fx = view.w === 0 ? 0.5 : (focus.x - view.x) / view.w
  const fy = view.h === 0 ? 0.5 : (focus.y - view.y) / view.h
  let x = focus.x - fx * w
  let y = focus.y - fy * h
  x = Math.max(0, Math.min(x, imageWidth - w))
  y = Math.max(0, Math.min(y, imageHeight - h))
  return { x, y, w, h }
}

/** A minimum drag distance below which a "draw" is treated as a click. */
export const MIN_DRAW_SIZE = 4

/** Whether a drawn rectangle is big enough to become a shape. */
export function isDrawable(rect: Rect): boolean {
  return rect.w >= MIN_DRAW_SIZE && rect.h >= MIN_DRAW_SIZE
}

/**
 * The 8 resize handles on a rect/ellipse occluder, in compass terms on an
 * image where y grows DOWNWARD: `n` = top edge, `s` = bottom edge,
 * `w` = left edge, `e` = right edge. Corners combine two edges.
 */
export type ResizeHandle = 'nw' | 'n' | 'ne' | 'e' | 'se' | 's' | 'sw' | 'w'

/** Drag a resize handle to `imgPoint`, keeping the opposite edge(s) fixed. */
export function resizeRect(
  rect: Rect,
  handle: ResizeHandle,
  imgPoint: { x: number; y: number },
  imageWidth: number,
  imageHeight: number,
): Rect {
  let left = rect.x
  let right = rect.x + rect.w
  let top = rect.y
  let bottom = rect.y + rect.h

  const movesW = handle.includes('w')
  const movesE = handle.includes('e')
  const movesN = handle.includes('n')
  const movesS = handle.includes('s')

  if (movesW) left = imgPoint.x
  if (movesE) right = imgPoint.x
  if (movesN) top = imgPoint.y
  if (movesS) bottom = imgPoint.y

  if (movesW) left = Math.max(0, Math.min(left, imageWidth))
  if (movesE) right = Math.max(0, Math.min(right, imageWidth))
  if (movesN) top = Math.max(0, Math.min(top, imageHeight))
  if (movesS) bottom = Math.max(0, Math.min(bottom, imageHeight))

  if (movesW) left = Math.min(left, right - MIN_DRAW_SIZE)
  if (movesE) right = Math.max(right, left + MIN_DRAW_SIZE)
  if (movesN) top = Math.min(top, bottom - MIN_DRAW_SIZE)
  if (movesS) bottom = Math.max(bottom, top + MIN_DRAW_SIZE)

  return { x: left, y: top, w: right - left, h: bottom - top }
}

/** The 8 resize-handle anchor points for a rect, in image space. */
export function resizeHandlePoints(rect: Rect): { handle: ResizeHandle; x: number; y: number }[] {
  const { x, y, w, h } = rect
  const midX = x + w / 2
  const midY = y + h / 2
  return [
    { handle: 'nw', x, y },
    { handle: 'n', x: midX, y },
    { handle: 'ne', x: x + w, y },
    { handle: 'e', x: x + w, y: midY },
    { handle: 'se', x: x + w, y: y + h },
    { handle: 's', x: midX, y: y + h },
    { handle: 'sw', x, y: y + h },
    { handle: 'w', x, y: midY },
  ]
}

/** Translate any shape by an image-space delta, clamped to the image. */
export function nudgeShape(shape: OccluderShape, dx: number, dy: number, imageWidth: number, imageHeight: number): OccluderShape {
  if (shape.kind === 'polygon') {
    return {
      kind: 'polygon',
      points: shape.points.map((p) => ({
        x: Math.max(0, Math.min(imageWidth, p.x + dx)),
        y: Math.max(0, Math.min(imageHeight, p.y + dy)),
      })),
    }
  }
  const x = Math.max(0, Math.min(imageWidth - shape.w, shape.x + dx))
  const y = Math.max(0, Math.min(imageHeight - shape.h, shape.y + dy))
  return { ...shape, x, y }
}
