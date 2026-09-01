import { cn } from '@/lib/cn'

type MarkProps = {
  size?: number
  className?: string
  monochrome?: boolean
}

/**
 * Nishany's Noon Dot.
 *
 * The bowl of the letter ن drawn as one thick stroke, its dot come to rest at
 * the bullseye, inside a faint aiming ring. Colours intentionally read from
 * the design-system tokens so the same vector belongs in light, warm and
 * dark themes without component-level theme branching.
 */
export function NishanyMark({ size = 28, className, monochrome = false }: MarkProps) {
  const ring = monochrome ? 'currentColor' : 'var(--color-accent-line)'
  const bowl = monochrome ? 'currentColor' : 'var(--brand-blue)'
  const dot = monochrome ? 'currentColor' : 'var(--brand-rose)'

  return (
    <svg
      aria-hidden="true"
      className={cn('shrink-0', className)}
      fill="none"
      height={size}
      viewBox="0 0 64 64"
      width={size}
    >
      <circle cx="32" cy="32" opacity="0.35" r="29" stroke={ring} strokeWidth="2" />
      <path
        d="M18.6 21.75 A17.5 17.5 0 1 0 45.4 21.75"
        stroke={bowl}
        strokeLinecap="round"
        strokeWidth="9"
      />
      <circle cx="32" cy="28.5" fill={dot} r="6" />
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
          <span className="mt-[0.38em] font-sans text-[max(8px,0.32em)] font-semibold tracking-[0.2em] text-[var(--color-ink-2)]">
            BY CONNECT
          </span>
        ) : null}
      </span>
    </span>
  )
}
