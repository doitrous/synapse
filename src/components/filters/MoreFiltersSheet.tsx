import { Check } from 'lucide-react'
import { Dialog } from '@/components/ui/Dialog'
import { Button } from '@/components/ui/Button'
import { FilterChip } from '@/components/ui/FilterChip'
import { useI18n } from '@/lib/i18n'
import { toggleSecondaryFilterOption, type SecondaryFilterDef, type SecondaryFilterValue } from './types'

/**
 * The secondary-facet surface: a bottom sheet on a phone, a centred panel
 * from `sm` (courtesy of `Dialog`), for whatever facets don't fit in the
 * always-visible bar — medium, priority, content type, that kind of thing.
 * Selections apply immediately; "Done" only closes the sheet.
 */
export function MoreFiltersSheet({
  open,
  onClose,
  filters,
  value,
  onChange,
}: {
  open: boolean
  onClose: () => void
  filters: SecondaryFilterDef[]
  value: SecondaryFilterValue
  onChange: (value: SecondaryFilterValue) => void
}) {
  const { t } = useI18n()
  if (!open) return null

  const activeCount = Object.values(value).reduce((total, ids) => total + ids.length, 0)

  return (
    <Dialog onClose={onClose} label={t('More filters')} size="sm">
      <div className="border-b border-line px-5 py-4">
        <h2 className="font-serif text-[17px] font-semibold text-ink">{t('More filters')}</h2>
      </div>

      <div className="max-h-[60dvh] space-y-5 overflow-y-auto px-5 py-4">
        {filters.length === 0 && (
          <p className="py-6 text-center text-[12.5px] text-ink-3">{t('No additional filters.')}</p>
        )}
        {filters.map((def) => {
          const selected = value[def.id] ?? []
          return (
            <fieldset key={def.id}>
              <legend className="mb-2 text-[12px] font-semibold text-ink-2">{def.label}</legend>
              <div className="flex flex-wrap gap-1.5">
                {def.options.map((option) => (
                  <FilterChip
                    key={option.id}
                    active={selected.includes(option.id)}
                    onClick={() => onChange(toggleSecondaryFilterOption(value, def, option.id))}
                  >
                    {option.label}
                  </FilterChip>
                ))}
              </div>
            </fieldset>
          )
        })}
      </div>

      <div className="flex items-center justify-between gap-2 border-t border-line px-5 py-3.5">
        <button
          type="button"
          onClick={() => onChange({})}
          disabled={activeCount === 0}
          className="rounded text-[12.5px] font-semibold text-ink-3 underline-offset-2 transition-colors hover:text-ink hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)] disabled:pointer-events-none disabled:opacity-50"
        >
          {t('Clear all')}
        </button>
        <Button type="button" variant="primary" iconLeft={Check} onClick={onClose}>{t('Done')}</Button>
      </div>
    </Dialog>
  )
}
