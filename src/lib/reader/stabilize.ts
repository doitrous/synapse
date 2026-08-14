import type { Point } from './annotations.ts'

/**
 * Smoothing that follows the hand without lagging behind it.
 *
 * A "pulled string" model: the emitted point chases the raw one rather than
 * being it. At strength 0 it is the raw input; higher values trade
 * responsiveness for a steadier line, which is what someone writing small
 * annotations on a dense page actually wants.
 *
 * The catch-up on release matters more than it looks: without it every stroke
 * ends short of where the pen lifted, so a deliberate tick or the tail of a
 * letter is quietly clipped.
 */

export class Stabilizer {
  private point: Point | null = null
  private readonly follow: number

  /** `strength` 0..1. Mapped so 1 is very smooth but never frozen. */
  constructor(strength: number) {
    const clamped = Math.min(1, Math.max(0, strength))
    this.follow = 1 - clamped * 0.9
  }

  push(raw: Point): Point {
    if (!this.point) { this.point = { ...raw }; return { ...raw } }
    this.point = {
      x: this.point.x + (raw.x - this.point.x) * this.follow,
      y: this.point.y + (raw.y - this.point.y) * this.follow,
      pressure: raw.pressure,
    }
    return { ...this.point }
  }

  /** The samples that close the gap between the smoothed line and the pen. */
  finish(raw: Point, steps = 4): Point[] {
    if (!this.point) return [{ ...raw }]
    const out: Point[] = []
    for (let step = 1; step <= steps; step++) {
      const t = step / steps
      out.push({
        x: this.point.x + (raw.x - this.point.x) * t,
        y: this.point.y + (raw.y - this.point.y) * t,
        pressure: raw.pressure,
      })
    }
    return out
  }
}

/** Convenience for whole paths — the same filter, applied offline. */
export function stabilizePath(points: readonly Point[], strength: number): Point[] {
  // Two points is a straight drag: there is no tremor in it to remove, and
  // adding catch-up samples would only lengthen it for nothing.
  if (points.length < 3 || strength <= 0) return [...points]
  const stabilizer = new Stabilizer(strength)
  const out = points.map((point) => stabilizer.push(point))
  out.push(...stabilizer.finish(points[points.length - 1]))
  return out
}

/**
 * Total turning along a path — how wobbly it is.
 *
 * Used by the tests to state the property that matters: more smoothing means
 * less of this, and the line never sprouts detail the hand did not make.
 */
export function totalCurvature(points: readonly Point[]): number {
  if (points.length < 3) return 0
  let total = 0
  for (let index = 2; index < points.length; index++) {
    const ax = points[index - 1].x - points[index - 2].x
    const ay = points[index - 1].y - points[index - 2].y
    const bx = points[index].x - points[index - 1].x
    const by = points[index].y - points[index - 1].y
    const cross = ax * by - ay * bx
    const dot = ax * bx + ay * by
    total += Math.abs(Math.atan2(cross, dot))
  }
  return total
}

/**
 * Per-point width, 0..1, before the tool's base width is applied.
 *
 * A pen reports pressure and a mouse does not, so a mouse is read from speed
 * instead — fast strokes thin, slow strokes full, which is how a nib behaves
 * and why mouse ink otherwise looks like tape.
 */
export function widthProfile(
  points: readonly Point[],
  mode: 'pressure' | 'velocity' | 'flat',
): number[] {
  if (mode === 'flat') return points.map(() => 1)
  if (mode === 'pressure') {
    return points.map((point) => clamp01(0.35 + (point.pressure ?? 0.5) * 0.9))
  }

  const speeds: number[] = [0]
  for (let index = 1; index < points.length; index++) {
    speeds.push(Math.hypot(points[index].x - points[index - 1].x, points[index].y - points[index - 1].y))
  }
  const fastest = Math.max(...speeds, 1e-6)
  // Smoothed, or the width flickers between adjacent samples.
  const smoothed = speeds.map((speed, index) => {
    const before = speeds[Math.max(0, index - 1)]
    const after = speeds[Math.min(speeds.length - 1, index + 1)]
    return (before + speed + after) / 3
  })
  return smoothed.map((speed) => clamp01(1 - (speed / fastest) * 0.55))
}

function clamp01(value: number): number {
  return Math.min(1, Math.max(0.35, value))
}
