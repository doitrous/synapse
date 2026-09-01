import { X } from 'lucide-react'
import { Icon } from '@/components/ui/Icon'
import { useI18n } from '@/lib/i18n'
import { cn } from '@/lib/cn'
import type { ActiveFilterChip } from './types'

/**
 * The row of removable pills below a filter bar's controls, one per active
 * facet. `FilterBar` builds this list for you (see its `activeChips`
 * derivation); render this directly only if you are composing the pieces
 * by hand.
 */
export function ActiveFilterChips({
  chips,
  onClearAll,
  className,
}: {
  chips: ActiveFilterChip[]
  onClearAll: () => void
  className?: string
}) {
  const { t } = useI18n()
  if (chips.length === 0) return null
  return (
    <div className={cn('flex flex-wrap items-center gap-1.5', className)}>
      {chips.map((chip) => (
        <button
          key={chip.key}
          type="button"
          onClick={chip.onRemove}
          className="inline-flex h-9 items-center gap-1.5 rounded-md border border-primary-line bg-primary-tint ps-3 pe-2 text-[12px] font-medium text-primary-strong transition-colors hover:bg-primary-tint/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)] sm:h-7"
        >
          <span className="max-w-48 truncate">{chip.label}</span>
          <Icon icon={X} size={12} />
        </button>
      ))}
      <button
        type="button"
        onClick={onClearAll}
        className="rounded px-1.5 text-[12px] font-semibold text-ink-3 underline-offset-2 transition-colors hover:text-ink hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]"
      >
        {t('Clear all')}
      </button>
    </div>
  )
}
