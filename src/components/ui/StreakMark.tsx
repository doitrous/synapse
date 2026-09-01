import { cn } from '@/lib/cn'

/**
 * The streak glyph: a small bullseye — ring and landed dot — in place of the
 * old flame. A streak in this brand is not fire, it is shots that kept
 * landing; the glyph takes the primary colour while a streak is alive and
 * goes quiet (ink-3, hollow centre) when there is nothing running.
 */
export function StreakMark({ size = 15, active = false, className }: { size?: number; active?: boolean; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden
      className={cn('shrink-0', active ? 'text-primary' : 'text-ink-3', className)}
    >
      <circle cx="8" cy="8" r="6.3" stroke="currentColor" strokeWidth="1.8" />
      {active ? (
        <circle cx="8" cy="8" r="2.6" fill="currentColor" />
      ) : (
        <circle cx="8" cy="8" r="2.1" stroke="currentColor" strokeWidth="1.4" />
      )}
    </svg>
  )
}
