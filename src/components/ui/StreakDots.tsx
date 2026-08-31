import { cn } from '@/lib/cn'

export type DayStatus = 'landed' | 'today' | 'missed' | 'future'

/**
 * A compact row of days, drawn the way the brand draws a streak: a landed
 * day is a filled crimson dot, today is an open ring waiting to be filled,
 * and anything else — missed or not yet arrived — is a quiet inset dot.
 *
 * Purely decorative (the streak count itself belongs in visible text beside
 * it), so the row is hidden from assistive tech rather than narrated dot by
 * dot.
 */
export function StreakDots({
  days,
  count,
  todayIndex,
  size = 8,
  className,
}: {
  /** Explicit per-day status, oldest first. Takes precedence over `count`. */
  days?: DayStatus[]
  /** Shorthand: build `count` dots from `todayIndex` when `days` is omitted. */
  count?: number
  todayIndex?: number
  size?: number
  className?: string
}) {
  const resolved: DayStatus[] = days ?? Array.from({ length: count ?? 0 }, (_, i): DayStatus => {
    if (todayIndex === undefined) return 'missed'
    if (i < todayIndex) return 'landed'
    if (i === todayIndex) return 'today'
    return 'future'
  })

  return (
    <div className={cn('flex items-center gap-1', className)} aria-hidden>
      {resolved.map((status, i) => (
        <span
          key={i}
          className={cn(
            'shrink-0 rounded-full',
            status === 'landed' && 'bg-primary',
            status === 'today' && 'border-2 border-primary-strong bg-transparent',
            (status === 'missed' || status === 'future') && 'bg-inset',
          )}
          style={{
            width: size,
            height: size,
            // The open ring reads a touch large next to a filled dot of the
            // same box size, since its border eats into the visible circle.
            ...(status === 'today' ? { width: size + 2, height: size + 2 } : {}),
          }}
        />
      ))}
    </div>
  )
}
