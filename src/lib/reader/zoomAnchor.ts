import { buildLayout, type Layout, type PageSize } from './pageLayout.ts'

/**
 * Zoom that keeps the page still under the pointer.
 *
 * Scaling from the top-left throws the reader's place away: at 200% on page 40
 * a zoom step sends them to page 20. The point under the cursor — or the centre
 * of the viewport, for a keyboard or button zoom — is what should not move.
 */

export interface Scroll {
  top: number
  left: number
}

export interface ZoomInput {
  sizes: readonly PageSize[]
  from: number
  to: number
  scroll: Scroll
  /** Where to hold still, in viewport coordinates from the scroller's corner. */
  pointer: { x: number; y: number }
  containerWidth: number
  containerHeight: number
  gap?: number
}

export interface ZoomResult {
  scale: number
  scroll: Scroll
  layout: Layout
}

export const MIN_SCALE = 0.25
export const MAX_SCALE = 6

export function clampScale(scale: number): number {
  return Math.min(MAX_SCALE, Math.max(MIN_SCALE, scale))
}

export function zoomAnchored(input: ZoomInput): ZoomResult {
  const { sizes, from, scroll, pointer, containerWidth, containerHeight, gap } = input
  const to = clampScale(input.to)

  const after = buildLayout(sizes, { scale: to, gap, containerWidth })

  if (from === to || !sizes.length) {
    return { scale: to, scroll, layout: after }
  }

  // The document point under the pointer, in unscaled units.
  const documentY = (scroll.top + pointer.y) / from
  const documentX = (scroll.left + pointer.x) / from

  const maxTop = Math.max(0, after.totalHeight - containerHeight)
  const maxLeft = Math.max(0, after.contentWidth - containerWidth)

  return {
    scale: to,
    scroll: {
      top: Math.min(maxTop, Math.max(0, documentY * to - pointer.y)),
      left: Math.min(maxLeft, Math.max(0, documentX * to - pointer.x)),
    },
    layout: after,
  }
}

/**
 * A step that reaches a round percentage.
 *
 * The old fixed ladder meant zoom could only ever be one of seven values, and
 * fit-to-width was never one of them — so the first `+` after opening a
 * document threw away the fit it had just been given.
 */
export function stepScale(scale: number, direction: 1 | -1): number {
  const next = direction > 0 ? scale * 1.2 : scale / 1.2
  const rounded = Math.round(next * 20) / 20
  return clampScale(Math.abs(rounded - scale) < 0.01 ? next : rounded)
}
