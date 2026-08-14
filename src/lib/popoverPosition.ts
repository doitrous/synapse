/**
 * Where a floating surface goes, as arithmetic.
 *
 * Kept out of the component so the awkward cases — an anchor near the bottom of
 * the window, a panel wider than the viewport, a right-to-left page — are
 * decided by something that can be tested without a browser.
 *
 * All values are viewport coordinates, matching `getBoundingClientRect`, and
 * the result is what a `position: fixed` element should use.
 */

export interface Size {
  width: number
  height: number
}

export interface AnchorRect {
  top: number
  left: number
  bottom: number
  right: number
}

export interface Viewport {
  width: number
  height: number
}

export type Side = 'top' | 'bottom'
export type Align = 'start' | 'end' | 'center'
export type Placement = `${Side}-${Align}`

export interface Placed {
  left: number
  top: number
  /** The side actually used, which is not always the one asked for. */
  side: Side
}

export interface PlaceOptions {
  placement?: Placement
  /** Space between the anchor and the surface. */
  gap?: number
  /** Smallest distance kept from the viewport edge. */
  margin?: number
  /** `start` follows the reading direction, so it is the right edge in Arabic. */
  rtl?: boolean
}

function clamp(value: number, low: number, high: number): number {
  // A surface wider or taller than the space it must fit into would otherwise
  // get a `high` below `low` and land off the near edge instead of the far one.
  if (high < low) return low
  return Math.min(Math.max(value, low), high)
}

/**
 * A menu opened at the pointer.
 *
 * Flips back toward the pointer rather than merely clamping: a menu pinned to
 * the edge covers the thing that was just right-clicked.
 */
export function placeAtPoint(
  point: { x: number; y: number },
  size: Size,
  viewport: Viewport,
  margin = 8,
): { left: number; top: number } {
  const left = point.x + size.width + margin > viewport.width
    ? Math.max(margin, point.x - size.width)
    : point.x
  const top = point.y + size.height + margin > viewport.height
    ? Math.max(margin, point.y - size.height)
    : point.y
  return { left, top }
}

/** A surface attached to a trigger element. */
export function placeAtAnchor(
  anchor: AnchorRect,
  size: Size,
  viewport: Viewport,
  options: PlaceOptions = {},
): Placed {
  const { placement = 'bottom-start', gap = 6, margin = 8, rtl = false } = options
  const [preferredSide, align] = placement.split('-') as [Side, Align]

  const below = anchor.bottom + gap
  const above = anchor.top - gap - size.height
  const fitsBelow = below + size.height <= viewport.height - margin
  const fitsAbove = above >= margin

  // Prefer the requested side, flip when it does not fit, and when neither
  // fits take the roomier one so the surface is clipped as little as possible.
  let side: Side = preferredSide
  if (preferredSide === 'bottom' && !fitsBelow) side = fitsAbove ? 'top' : (anchor.top > viewport.height - anchor.bottom ? 'top' : 'bottom')
  if (preferredSide === 'top' && !fitsAbove) side = fitsBelow ? 'bottom' : (viewport.height - anchor.bottom > anchor.top ? 'bottom' : 'top')

  const rawTop = side === 'bottom' ? below : above
  const top = clamp(rawTop, margin, viewport.height - size.height - margin)

  let rawLeft: number
  if (align === 'center') {
    rawLeft = anchor.left + (anchor.right - anchor.left) / 2 - size.width / 2
  } else {
    const leadingEdge = rtl ? anchor.right - size.width : anchor.left
    const trailingEdge = rtl ? anchor.left : anchor.right - size.width
    rawLeft = align === 'start' ? leadingEdge : trailingEdge
  }
  const left = clamp(rawLeft, margin, viewport.width - size.width - margin)

  return { left, top, side }
}
