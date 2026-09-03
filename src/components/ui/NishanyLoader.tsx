import type { CSSProperties } from 'react'
import { cn } from '@/lib/cn'
import { useT } from '@/lib/i18n'
import { loaderRings, ringCircumference } from './NishanyLoader.geometry'

/**
 * What Nishany looks like while it is thinking.
 *
 * The app's own instrument, not a borrowed spinner: two concentric rings — an
 * outer blue ring and an inner crimson ring, each an arc that fills and then
 * empties around its track while rotating a full turn. Both rings turn the
 * same way; the inner ring runs at 0.8× the outer ring's duration, so lap
 * over lap it visibly catches up and overtakes — they read as chasing each
 * other rather than as one rigid object.
 *
 * A spinner says "something is happening"; this says *which product* is
 * happening. That matters most on the screens where it is the only thing on
 * the page — a cold route chunk, an empty catalogue, a first load.
 *
 * `mini` is the button variant: one ring, in `currentColor`, sized to sit
 * inside a label without changing the control's height.
 */

/** Outer, then inner. Blue is the structural colour, crimson the working one. */
const ARC_COLORS = [
  'var(--color-accent)',
  'var(--color-primary)',
] as const

/** Duration multiplier per ring: the inner ring runs at 0.8× the outer ring's
 *  duration, so it visibly catches up to and overtakes the outer ring each
 *  loop instead of the pair staying in lockstep. */
const ARC_SPEED = [1, 0.8] as const

/** Where each arc is held when the reader has asked for no motion: a quarter
 *  and three quarters — the pair, standing still. */
const HELD_FRACTION = [0.75, 0.25] as const

export function NishanyLoader({
  size = 40,
  label,
  mini = false,
  decorative = false,
  className,
}: {
  size?: number
  /**
   * Announced to a screen reader. Defaults to a translated "Loading"; pass a
   * more specific one when the page knows what is arriving. Ignored — and it
   * should be omitted — when `decorative`.
   */
  label?: string
  /** The single-ring, `currentColor` variant for buttons. */
  mini?: boolean
  /**
   * Draw only. Use this wherever the loader sits *inside* something that is
   * already a live region with its own label — `RouteLoading`, `AsyncSurface`,
   * a `loading` button. Two nested live regions announce the wait twice, which
   * on a slow route is the screen reader repeating itself rather than one
   * clear "loading".
   */
  decorative?: boolean
  className?: string
}) {
  const t = useT()
  const box = mini ? 16 : size
  const rings = loaderRings(box)
  const drawn = mini ? rings.slice(0, 1) : rings
  const center = box / 2
  // The bed the rings sit in — the same faint disc TargetRing draws, so a
  // loader and a finished meter are recognisably the same drawing.
  const innermost = rings[rings.length - 1]
  const bedRadius = Math.max(innermost.r - innermost.width / 2 - 1, 0)

  return (
    <span
      className={cn('inline-grid place-items-center', className)}
      role={decorative ? undefined : 'status'}
      aria-live={decorative ? undefined : 'polite'}
      aria-hidden={decorative || undefined}
    >
      <svg width={box} height={box} viewBox={`0 0 ${box} ${box}`} aria-hidden focusable="false">
        {!mini && (
          <circle cx={center} cy={center} r={bedRadius} fill="none" stroke="var(--color-grid-major)" strokeWidth="1" />
        )}
        {drawn.map((ring) => (
          <circle
            key={`track-${ring.r}`}
            cx={center}
            cy={center}
            r={ring.r}
            fill="none"
            stroke={mini ? 'currentColor' : 'var(--color-inset)'}
            strokeOpacity={mini ? 0.25 : 1}
            strokeWidth={ring.width}
          />
        ))}
        {drawn.map((ring, index) => {
          const circumference = ringCircumference(ring.r)
          const vars = {
            '--phase': `${index * 120}ms`,
            // Only meaningful with two-plus rings; `mini` draws a single ring
            // and never overrides the keyframe's speed:1 default.
            '--speed': `${ARC_SPEED[index]}`,
          } as CSSProperties
          return (
            // The `<g>` owns the rotation (transform only, compositor-
            // friendly); the `<circle>` owns the fill/unfill sweep
            // (stroke-dashoffset). Kept on separate elements so the spin
            // never forces the sweep's paint work, or vice versa.
            <g key={`ring-${ring.r}`} className="nishany-loader-ring" style={vars}>
              <circle
                className="nishany-loader-arc"
                cx={center}
                cy={center}
                r={ring.r}
                fill="none"
                stroke={mini ? 'currentColor' : ARC_COLORS[index]}
                strokeWidth={ring.width}
                strokeLinecap="round"
                strokeDasharray={circumference}
                // The held offset is an inline style so it is what shows when
                // the keyframe is switched off; while the animation runs, the
                // animation owns the property and this is never seen.
                strokeDashoffset={circumference * HELD_FRACTION[index]}
                style={{ '--c': `${circumference}`, ...vars } as CSSProperties}
              />
            </g>
          )
        })}
      </svg>
      {!decorative && <span className="sr-only">{label ?? t('Loading')}</span>}
    </span>
  )
}
