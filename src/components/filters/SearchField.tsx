import { X } from 'lucide-react'
import { SearchInput } from '@/components/ui/Field'
import { Icon } from '@/components/ui/Icon'
import { useI18n } from '@/lib/i18n'
import { cn } from '@/lib/cn'

/**
 * The search-first control `FilterBar` puts above every other facet. A plain
 * `SearchInput` with a clear button that only appears once there is
 * something to clear, and an `aria-label` a screen reader announces even
 * though the visible placeholder is the only "label" a sighted user sees.
 */
export function SearchField({
  value,
  onChange,
  placeholder,
  label,
  autoFocus,
  className,
}: {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  /** aria-label; defaults to the placeholder, then to a generic "Search". */
  label?: string
  autoFocus?: boolean
  className?: string
}) {
  const { t } = useI18n()
  return (
    <div className={cn('relative', className)}>
      <SearchInput
        aria-label={label ?? placeholder ?? t('Search')}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder ?? t('Search')}
        autoFocus={autoFocus}
        className="w-full pe-9 text-[14px] sm:h-10"
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange('')}
          aria-label={t('Clear search')}
          className="absolute end-2.5 top-1/2 grid size-6 -translate-y-1/2 place-items-center rounded-full text-ink-3 transition-colors hover:bg-inset hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]"
        >
          <Icon icon={X} size={14} />
        </button>
      )}
    </div>
  )
}
