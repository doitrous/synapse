import { useEffect, useState } from 'react'
import { cn } from '@/lib/cn'
import { clamp } from '@/lib/format'
import { useI18n } from '@/lib/i18n'

type Tone = 'primary' | 'accent'

const STROKE: Record<Tone, string> = {
  primary: 'var(--color-primary)',
  accent: 'var(--color-accent)',
}

/**
 * The brand mark as a meter: a ring that sweeps toward a target. The reading
 * sits in the centre, so this ring never draws the bullseye dot — at 100% the
 * dot landed on top of the figure and hid it. The dot survives on
 * `RingStack`, whose centre is empty.
 *
 * Sweeps from 12 o'clock; in a right-to-left document the sweep mirrors
 * (counter-clockwise) so it still reads as "closing in" rather than reversed.
 */
export function TargetRing({
  value,
  max = 100,
  size = 104,
  thickness = 8,
  tone = 'primary',
  label,
  className,
  'aria-label': ariaLabel,
}: {
  value: number
  max?: number
  size?: number
  thickness?: number
  tone?: Tone
  /** Small caption drawn under the reading, e.g. "questions". */
  label?: string
  className?: string
  'aria-label'?: string
}) {
  const { dir } = useI18n()
  const pct = clamp(max > 0 ? (value / max) * 100 : 0, 0, 100)

  const radius = (size - thickness) / 2
  const innerRadius = Math.max(radius - thickness / 2 - 3, 0)
  const circumference = 2 * Math.PI * radius
  const [offset, setOffset] = useState(circumference)
  useEffect(() => {
    const id = requestAnimationFrame(() => setOffset(circumference * (1 - pct / 100)))
    return () => cancelAnimationFrame(id)
  }, [pct, circumference])

  const center = size / 2
  const svgTransform = dir === 'rtl' ? 'rotate(-90deg) scaleX(-1)' : 'rotate(-90deg)'

  return (
    <div
      className={cn('relative inline-grid shrink-0 place-items-center', className)}
      style={{ width: size, height: size }}
      role="meter"
      aria-valuenow={Math.round(value)}
      aria-valuemin={0}
      aria-valuemax={max}
      aria-label={ariaLabel}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        style={{ transform: svgTransform, transformOrigin: '50% 50%' }}
        aria-hidden
      >
        {/* the empty target bed */}
        <circle cx={center} cy={center} r={innerRadius} fill="none" stroke="var(--color-grid-major)" strokeWidth="1" />
        {/* track */}
        <circle cx={center} cy={center} r={radius} fill="none" stroke="var(--color-inset)" strokeWidth={thickness} />
        {/* progress arc */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke={STROKE[tone]}
          strokeWidth={thickness}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 700ms var(--ease-out-quint)' }}
        />
      </svg>
      <div className="pointer-events-none absolute inset-0 grid place-content-center text-center">
        <span className="tnum font-mono font-semibold leading-none text-ink" style={{ fontSize: Math.round(size * 0.2) }}>
          {Math.round(pct)}%
        </span>
        {label && (
          <span className="mt-1 font-medium text-ink-3" style={{ fontSize: Math.max(Math.round(size * 0.1), 10) }}>
            {label}
          </span>
        )}
      </div>
    </div>
  )
}
