import { cn } from '@/lib/cn'

type MarkProps = {
  size?: number
  className?: string
  monochrome?: boolean
}

/**
 * Maristana's Courtyard M.
 *
 * Two mirrored architectural halves make the letterform. Their inner edges
 * stop around a negative-space doorway: the useful part of the mark is the
 * way through, not an ornament placed on top of it. Colours intentionally read
 * from the design-system tokens so the same vector belongs in light, warm and
 * dark themes without component-level theme branching.
 */
export function MaristanaMark({ size = 28, className, monochrome = false }: MarkProps) {
  const blue = monochrome ? 'currentColor' : 'var(--brand-blue)'
  const rose = monochrome ? 'currentColor' : 'var(--brand-rose)'

  return (
    <svg
      aria-hidden="true"
      className={cn('shrink-0', className)}
      fill="none"
      height={size}
      viewBox="0 0 64 64"
      width={size}
    >
      <path
        d="M4 58V11C4 8.8 5.8 7 8 7h6l18 22v9c-7.7 0-14 6.3-14 14v6H4Z"
        fill={blue}
      />
      <path
        d="M60 58V11c0-2.2-1.8-4-4-4h-6L32 29v9c7.7 0 14 6.3 14 14v6h14Z"
        fill={rose}
      />
    </svg>
  )
}

/**
 * Compatibility export for integration points that historically used the old
 * component name. It renders the Maristana mark; no legacy artwork remains in
 * the visible product.
 */
export const CortexMark = MaristanaMark

/** Maristana lockup: the Courtyard M is the first character in the name. */
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
        <MaristanaMark size={28} />
        <span className="sr-only">Maristana by Connect Academy</span>
      </span>
    )
  }

  const markSize = Math.max(28, Math.round(textSize * 1.55))

  return (
    <span
      className={cn('inline-flex items-center gap-[0.24em] whitespace-nowrap', className)}
      style={{ fontSize: textSize }}
    >
      <span className="sr-only">Maristana by Connect Academy</span>
      <MaristanaMark size={markSize} />
      <span aria-hidden="true" className="flex min-w-0 flex-col justify-center leading-none">
        <span className="font-brand font-bold tracking-[-0.01em] text-[var(--color-ink)]">
          ARISTANA
        </span>
        {endorsement ? (
          <span className="mt-[0.38em] font-sans text-[max(8px,0.32em)] font-semibold tracking-[0.2em] text-[var(--color-ink-2)]">
            BY CONNECT ACADEMY
          </span>
        ) : null}
      </span>
    </span>
  )
}
