import { useEffect, useState } from 'react'
import { cn } from '@/lib/cn'
import { clamp } from '@/lib/format'

type Tone = 'primary' | 'success' | 'warning' | 'danger' | 'neutral'

const FILL: Record<Tone, string> = {
  primary: 'bg-primary',
  success: 'bg-success',
  warning: 'bg-warning',
  danger: 'bg-danger',
  neutral: 'bg-ink-3',
}

const H: Record<'sm' | 'md' | 'lg', string> = {
  sm: 'h-1.5',
  md: 'h-2',
  lg: 'h-2.5',
}

/**
 * A linear reading against a track. Tick marks make it read as a scale.
 *
 * `target` draws the "approach" device from the brand's target-as-progress
 * vocabulary: a hollow bullseye waiting just past the track's end, and a
 * crimson leading dot riding the fill edge toward it. Only meaningful for a
 * goal-like meter (e.g. "reviews cleared") — a plain distribution bar should
 * leave it off. Default behaviour with the prop unset is unchanged: the
 * returned element is still the bare track div, nothing wraps it.
 */
export function Meter({
  value,
  max = 100,
  tone = 'primary',
  size = 'md',
  ticks = false,
  target = false,
  className,
}: {
  value: number
  max?: number
  tone?: Tone
  size?: 'sm' | 'md' | 'lg'
  ticks?: boolean
  target?: boolean
  className?: string
}) {
  const p = clamp((value / max) * 100, 0, 100)
  const [w, setW] = useState(0)
  useEffect(() => {
    const id = requestAnimationFrame(() => setW(p))
    return () => cancelAnimationFrame(id)
  }, [p])
  const earned = target && p >= 100

  const track = (
    <div
      className={cn(
        'relative overflow-hidden rounded-full bg-inset',
        H[size],
        target ? 'min-w-0 flex-1' : 'w-full',
        !target && className,
      )}
      role="meter"
      aria-valuenow={Math.round(value)}
      aria-valuemin={0}
      aria-valuemax={max}
    >
      <div
        className={cn(
          'h-full rounded-full transition-[width] duration-700 ease-[var(--ease-out-quint)]',
          FILL[tone],
        )}
        style={{ width: `${w}%` }}
      />
      {ticks &&
        [20, 40, 60, 80].map((t) => (
          <span
            key={t}
            className="absolute inset-y-0 w-px bg-paper/70"
            style={{ left: `${t}%` }}
            aria-hidden
          />
        ))}
      {target && !earned && (
        <span
          aria-hidden
          className="absolute top-1/2 size-2.5 -translate-y-1/2 -translate-x-1/2 rtl:translate-x-1/2 rounded-full bg-primary ring-2 ring-surface"
          style={{ insetInlineStart: `${w}%` }}
        />
      )}
    </div>
  )

  if (!target) return track

  return (
    <div className={cn('flex items-center gap-2', className)}>
      {track}
      <span
        aria-hidden
        className="relative grid size-3.5 shrink-0 place-items-center rounded-full border-[1.5px] border-accent-line"
      >
        <span className={cn('size-1.5 rounded-full transition-colors duration-300', earned ? 'bg-primary' : 'bg-inset')} />
      </span>
    </div>
  )
}
