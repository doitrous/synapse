import { cn } from '@/lib/cn'

type MarkProps = {
  size?: number
  className?: string
  monochrome?: boolean
}

/**
 * Nishany's Noon mark — the letter ن.
 *
 * Two concentric arcs open from the top-right (crimson outer, rose inner) with
 * a midnight-blue dot resting in that opening, so the mark reads as a tilted ن.
 * The colours come from the theme-aware `--mark-*` tokens (crimson/rose/navy on
 * light and warm; a brighter crimson and a periwinkle dot on Dark/OLED, where
 * the literals go muddy and the dot vanishes). They are applied through `style`
 * rather than the `fill`/`stroke` attributes because `var()` does not resolve
 * in an SVG presentation attribute. `monochrome` collapses all three to
 * `currentColor` for use on a coloured surface.
 */
export function NishanyMark({ size = 28, className, monochrome = false }: MarkProps) {
  const outer = monochrome ? 'currentColor' : 'var(--mark-outer)'
  const inner = monochrome ? 'currentColor' : 'var(--mark-inner)'
  const dot = monochrome ? 'currentColor' : 'var(--mark-dot)'

  return (
    <svg
      aria-hidden="true"
      className={cn('shrink-0', className)}
      fill="none"
      height={size}
      viewBox="0 0 100 100"
      width={size}
    >
      <circle cx="50" cy="50" r="34" fill="none" style={{ stroke: outer }} strokeWidth="8" strokeLinecap="round" strokeDasharray="163.2 50.4" />
      <circle cx="50" cy="50" r="20" fill="none" style={{ stroke: inner }} strokeWidth="7" strokeLinecap="round" strokeDasharray="96 29.7" />
      <circle cx="72" cy="28" r="5" style={{ fill: dot }} />
    </svg>
  )
}

/** Nishany lockup: the Noon Dot mark precedes the lowercase name. */
export function Wordmark({
  collapsed = false,
  textSize = 20,
  className,
  endorsement = true,
}: {
  collapsed?: boolean
  textSize?: number
  className?: string
  endorsement?: boolean
}) {
  if (collapsed) {
    return (
      <span className={cn('inline-flex items-center text-[var(--color-ink)]', className)}>
        <NishanyMark size={28} />
        <span className="sr-only">Nishany by Connect</span>
      </span>
    )
  }

  const markSize = Math.max(28, Math.round(textSize * 1.55))

  return (
    <span
      className={cn('inline-flex items-center gap-[0.24em] whitespace-nowrap', className)}
      style={{ fontSize: textSize }}
    >
      <span className="sr-only">Nishany by Connect</span>
      <NishanyMark size={markSize} />
      <span aria-hidden="true" className="flex min-w-0 flex-col justify-center leading-none">
        <span className="font-brand font-extrabold tracking-normal text-[var(--color-ink)]">
          nishany
        </span>
        {endorsement ? (
          <span className="mt-[0.38em] font-sans text-[max(8px,0.32em)] font-semibold tracking-[0.2em] text-[#1b2b55]">
            BY CONNECT
          </span>
        ) : null}
      </span>
    </span>
  )
}
