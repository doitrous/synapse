import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

/**
 * `primary` is the working crimson — the badge that marks state the reader is
 * meant to act on. `accent` is cortex blue: quiet, structural emphasis for
 * things that point elsewhere (a source, a linked article, a concept), never an
 * action. Both exist because a screen that used crimson for both would lose the
 * distinction the two-hue brand is for.
 */
type Tone = 'neutral' | 'primary' | 'accent' | 'success' | 'warning' | 'danger' | 'outline'

const TONE: Record<Tone, string> = {
  neutral: 'bg-inset text-ink-2',
  primary: 'bg-primary-tint text-primary-strong border-primary-line',
  accent: 'bg-accent-tint text-accent-strong border-accent-line',
  success: 'bg-success-tint text-success',
  warning: 'bg-warning-tint text-warning',
  danger: 'bg-danger-tint text-danger',
  outline: 'border-line text-ink-2',
}

const DOT: Record<Tone, string> = {
  neutral: 'bg-ink-3',
  primary: 'bg-primary',
  accent: 'bg-accent',
  success: 'bg-success',
  warning: 'bg-warning',
  danger: 'bg-danger',
  outline: 'bg-ink-3',
}

export function Badge({
  children,
  tone = 'neutral',
  dot = false,
  className,
}: {
  children: ReactNode
  tone?: Tone
  dot?: boolean
  className?: string
}) {
  return (
    <span
      className={cn(
        // The border is on the base and transparent by default, so every tone
        // occupies the same box whether or not it carries a hairline.
        'inline-flex items-center gap-1.5 rounded-full border border-transparent px-2 py-0.5 text-[11.5px] font-medium leading-5 whitespace-nowrap',
        TONE[tone],
        className,
      )}
    >
      {dot && <span className={cn('size-1.5 rounded-full', DOT[tone])} />}
      {children}
    </span>
  )
}
