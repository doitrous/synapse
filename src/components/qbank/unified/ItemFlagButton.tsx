import { Flag } from 'lucide-react'
import { Icon } from '@/components/ui/Icon'
import { useItemFlags } from '@/lib/useItemFlags'
import type { FlagKind } from '@/data/itemFlags'
import { cn } from '@/lib/cn'
import { useT } from '@/lib/i18n'

/**
 * "Come back to this" — the one control, wherever the item is.
 *
 * Deliberately the same button the MCQ runner has carried since it shipped:
 * bordered, tinted and filled when it is on, `aria-pressed` either way, and
 * never colour alone — the word changes from Flag to Flagged with the tint. A
 * student who has learned to flag a question mid-paper should not have to
 * learn a second control to flag a station.
 *
 * It reads and writes the flag itself rather than taking `flagged`/`onFlag`,
 * so it can be dropped into a runner that knows nothing about the hub without
 * threading state through it.
 */
export function ItemFlagButton({ kind, id, className }: { kind: FlagKind; id: string; className?: string }) {
  const t = useT()
  const { flagged, toggle } = useItemFlags()
  const on = flagged(kind, id)

  return (
    <button
      type="button"
      aria-pressed={on}
      onClick={() => toggle(kind, id)}
      className={cn(
        'inline-flex min-h-11 items-center justify-center gap-1.5 rounded-md border px-3 text-[12px] font-semibold transition-colors sm:min-h-9',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]',
        on ? 'border-primary-line bg-primary-tint text-primary-strong' : 'border-line bg-surface text-ink-2 hover:bg-inset hover:text-ink',
        className,
      )}
    >
      <Icon icon={Flag} size={14} className={cn(on && 'fill-current')} />
      {on ? t('Flagged') : t('Flag')}
    </button>
  )
}

/**
 * The same toggle at the end of a list row, where there is no room for a word.
 *
 * The state still reaches a screen reader — through `aria-pressed` and a label
 * that says which way pressing it goes — so nothing here depends on seeing a
 * crimson flag.
 */
export function ItemFlagIconButton({ kind, id, title }: { kind: FlagKind; id: string; title: string }) {
  const t = useT()
  const { flagged, toggle } = useItemFlags()
  const on = flagged(kind, id)
  const label = `${on ? t('Remove the flag from') : t('Flag')} ${title}`

  return (
    <button
      type="button"
      aria-pressed={on}
      aria-label={label}
      title={label}
      onClick={() => toggle(kind, id)}
      className={cn(
        'inline-grid size-11 shrink-0 place-items-center rounded-md border transition-colors sm:size-9',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]',
        on ? 'border-primary-line bg-primary-tint text-primary-strong' : 'border-line bg-surface text-ink-3 hover:bg-inset hover:text-ink',
      )}
    >
      <Icon icon={Flag} size={15} className={cn(on && 'fill-current')} />
    </button>
  )
}
