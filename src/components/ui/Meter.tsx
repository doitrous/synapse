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

/** A linear reading against a track. Tick marks make it read as a scale. */
export function Meter({
  value,
  max = 100,
  tone = 'primary',
  size = 'md',
  ticks = false,
  className,
}: {
  value: number
  max?: number
  tone?: Tone
  size?: 'sm' | 'md' | 'lg'
  ticks?: boolean
  className?: string
}) {
  const p = clamp((value / max) * 100, 0, 100)
  const [w, setW] = useState(0)
  useEffect(() => {
    const id = requestAnimationFrame(() => setW(p))
    return () => cancelAnimationFrame(id)
  }, [p])

  return (
    <div
      className={cn('relative w-full overflow-hidden rounded-full bg-inset', H[size], className)}
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
    </div>
  )
}
