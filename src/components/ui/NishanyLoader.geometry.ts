/**
 * Where the loader's four rings sit, as pure arithmetic.
 *
 * Separated from the component so it can be tested on Node without pulling in
 * React: the thing worth asserting about this drawing is that the rings nest
 * (outer to inner, never crossing) and that no stroke is ever wide enough to
 * swallow its own radius — which is a number problem, not a render problem.
 *
 * The outermost ring is sized so that its radius plus half its stroke is
 * exactly `size / 2`: the drawing fills its box and never clips.
 */

/** Radius as a fraction of the box, outer to inner. */
const RADIUS_RATIOS = [0.46, 0.36, 0.26, 0.16] as const

/** Stroke width as a fraction of the box. Thinner as the rings get smaller,
 *  so the stack reads as one instrument rather than four equal circles. */
const WIDTH_RATIOS = [0.08, 0.07, 0.06, 0.05] as const

export interface LoaderRing {
  /** Ring radius, in the SVG's own units (which are the box's pixels). */
  r: number
  /** Stroke width for both the track and the arc. */
  width: number
}

export function loaderRings(size: number): LoaderRing[] {
  return RADIUS_RATIOS.map((ratio, index) => {
    // A hairline that rounds below 2px stops reading as a ring at all, so the
    // smallest sizes hold at 2 rather than scaling all the way down — which
    // is also the one case where the ratio radius would push the stroke past
    // the edge of the box, so the radius gives way instead of the width.
    const width = Math.max(2, Math.round(size * WIDTH_RATIOS[index] * 100) / 100)
    return { r: Math.min(size * ratio, (size - width) / 2), width }
  })
}

/** One arc's circumference — the `--c` the keyframe counts its offset against. */
export function ringCircumference(radius: number): number {
  return 2 * Math.PI * radius
}
