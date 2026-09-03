import { useEffect, useState } from 'react'
import { cn } from '@/lib/cn'
import { useT } from '@/lib/i18n'

/** Same viewBox, radii and dash numbers as `NishanyMark` (100x100, r=34/20,
 * dash "163.2 50.4" / "96 29.7") — this ring IS the brand mark, not a lookalike. */
const OUTER_R = 34
const OUTER_STROKE = 8
const OUTER_DASH = 163.2
const OUTER_C = 2 * Math.PI * OUTER_R

const INNER_R = 20
const INNER_STROKE = 7
const INNER_DASH = 96
const INNER_GAP = 29.7

/**
 * The nishany Noon mark, reused as today's progress ring.
 *
 * Same two concentric arcs and navy seed dot as the static `NishanyMark`,
 * except the outer crimson arc is now a faint track plus a filled portion
 * sized to `done / goal` — both starting at the same anchor point the mark's
 * own arc starts from, so the fill grows from there toward the seed exactly
 * as the static arc already runs. The inner rose arc and the dot are drawn
 * unchanged from the mark: the fixed, "always-branded" half.
 *
 * No RTL mirror — this is a brand mark, not a directional meter (that's
 * `TargetRing`), so it always opens top-right like the logo does.
 */
export function TargetSeed({
  done,
  goal,
  size = 132,
  className,
}: {
  done: number
  goal: number
  size?: number
  className?: string
}) {
  const t = useT()
  const pct = goal > 0 ? Math.min(1, Math.max(0, done / goal)) : 0
  const [sweep, setSweep] = useState(false)
  useEffect(() => {
    const id = requestAnimationFrame(() => setSweep(true))
    return () => cancelAnimationFrame(id)
  }, [])
  const filled = (sweep ? pct : 0) * OUTER_DASH

  const label = t('{done} of {goal} questions done')
    .replace('{done}', String(done))
    .replace('{goal}', String(goal))

  return (
    <div
      role="img"
      aria-label={label}
      className={cn('relative inline-grid shrink-0 place-items-center', className)}
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} viewBox="0 0 100 100" fill="none" aria-hidden="true">
        {/* Outer track: the arc's full possible length, faint. */}
        <circle
          cx="50" cy="50" r={OUTER_R} fill="none" stroke="var(--color-inset)" strokeWidth={OUTER_STROKE}
          strokeLinecap="round" strokeDasharray={`${OUTER_DASH} ${OUTER_C - OUTER_DASH}`}
        />
        {/* Outer fill: today's progress, crimson, growing from the same start. */}
        <circle
          cx="50" cy="50" r={OUTER_R} fill="none" stroke="#a81d40" strokeWidth={OUTER_STROKE}
          strokeLinecap="round"
          strokeDasharray={`${filled} ${OUTER_C - filled}`}
          style={{ transition: 'stroke-dasharray 700ms var(--ease-out-quint)' }}
        />
        {/* Inner arc: the static brand accent, unchanged from the mark. */}
        <circle
          cx="50" cy="50" r={INNER_R} fill="none" stroke="#e0859b" strokeWidth={INNER_STROKE}
          strokeLinecap="round" strokeDasharray={`${INNER_DASH} ${INNER_GAP}`}
        />
        {/* The seed: midnight. */}
        <circle cx="72" cy="28" r="5" fill="var(--color-midnight)" />
      </svg>
    </div>
  )
}
