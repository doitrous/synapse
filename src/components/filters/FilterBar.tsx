import { useMemo, useState } from 'react'
import { SlidersHorizontal } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { useI18n } from '@/lib/i18n'
import { cn } from '@/lib/cn'
import { clearCurriculumScopePart, curriculumScopeChips, type CurriculumScope } from '@/data/curriculumFilters'
import type { University } from '@/data/universities'
import { SearchField } from './SearchField'
import { StatusTabs } from './StatusTabs'
import { CascadingScopeFilter } from './CascadingScopeFilter'
import { ActiveFilterChips } from './ActiveFilterChips'
import { MoreFiltersSheet } from './MoreFiltersSheet'
import { toggleSecondaryFilterOption, type ActiveFilterChip, type SecondaryFilterDef, type SecondaryFilterValue, type StatusTabOption } from './types'

/** A stable identity, so an omitted `secondaryValue` never invalidates memoisation below. */
const EMPTY_SECONDARY_VALUE: SecondaryFilterValue = {}

/**
 * FilterBar — the shared, reusable filter header for admin/reviewer list
 * pages. Replaces a hand-built row of native `<select>`s (MediaRequests.tsx
 * had 11 of them, including one flattening the entire curriculum into a
 * single dropdown) with one search-first, composable control.
 *
 * Every piece is optional except search — pass only what a page needs:
 *
 * ```tsx
 * import { FilterBar } from '@/components/filters/FilterBar'
 * import { useFilterState } from '@/components/filters/useFilterState'
 * import type { CurriculumScope, SecondaryFilterValue } from '@/components/filters/types'
 *
 * const [state, setState] = useFilterState(
 *   { q: '', status: 'all', universityId: '', yearId: '', moduleId: '', medium: [] as string[] },
 *   { enabled: true, prefix: 'mr.' },   // opt-in URL sync; omit `enabled` (or pass false) for plain local state
 * )
 *
 * const scope: CurriculumScope = {
 *   universityId: state.universityId || undefined,
 *   yearId: state.yearId || undefined,
 *   moduleId: state.moduleId || undefined,
 * }
 *
 * <FilterBar
 *   searchValue={state.q}
 *   onSearchChange={(q) => setState({ q })}
 *   searchPlaceholder="Search brief, purpose, owner"
 *
 *   statusTabs={[
 *     { id: 'all', label: t('All'), count: rows.length },
 *     { id: 'needed', label: t('Needed'), count: needed.length },
 *     { id: 'planned', label: t('Planned'), count: planned.length },
 *   ]}
 *   statusValue={state.status}
 *   onStatusChange={(status) => setState({ status })}
 *
 *   catalogue={catalogue}
 *   scopeValue={scope}
 *   onScopeChange={(next) => setState({
 *     universityId: next.universityId ?? '', yearId: next.yearId ?? '', moduleId: next.moduleId ?? '',
 *   })}
 *
 *   secondaryFilters={[
 *     { id: 'medium', label: t('Medium'), type: 'multi', options: MEDIA_REQUEST_MEDIA.map((m) => ({ id: m, label: t(m) })) },
 *     { id: 'priority', label: t('Priority'), type: 'single', options: MEDIA_REQUEST_PRIORITIES.map((p) => ({ id: p, label: t(p) })) },
 *   ]}
 *   secondaryValue={{ medium: state.medium }}
 *   onSecondaryChange={(next) => setState({ medium: next.medium ?? [] })}
 *
 *   resultCount={filteredRows.length}
 * />
 * ```
 *
 * Active-filter chips (status, each scope part, each selected secondary
 * option) are derived automatically from whatever props are passed — there
 * is nothing else to wire up for "removable chips" or "Clear all".
 *
 * i18n: every built-in label goes through `t()` from `@/lib/i18n`. Labels
 * you supply (`statusTabs[].label`, `secondaryFilters[].label/options[].label`,
 * `searchPlaceholder`) are rendered as-is — call `t()` on them yourself
 * before passing them in.
 */
export function FilterBar({
  searchValue,
  onSearchChange,
  searchLabel,
  searchPlaceholder,

  statusTabs,
  statusValue,
  onStatusChange,
  statusLabel,

  catalogue,
  scopeValue,
  onScopeChange,

  secondaryFilters,
  secondaryValue,
  onSecondaryChange,

  resultCount,
  resultLabel,

  className,
}: {
  searchValue: string
  onSearchChange: (value: string) => void
  searchLabel?: string
  searchPlaceholder?: string

  /** The first tab is treated as the implicit "no filter" default — it never produces an active-filter chip. */
  statusTabs?: StatusTabOption[]
  statusValue?: string
  onStatusChange?: (id: string) => void
  statusLabel?: string

  /** All three of `catalogue`/`scopeValue`/`onScopeChange` are required together to render the cascade. */
  catalogue?: University[]
  scopeValue?: CurriculumScope
  onScopeChange?: (value: CurriculumScope) => void

  secondaryFilters?: SecondaryFilterDef[]
  secondaryValue?: SecondaryFilterValue
  onSecondaryChange?: (value: SecondaryFilterValue) => void

  /** Visible result count, shown next to "More filters". Omit to hide it (e.g. while still loading). */
  resultCount?: number
  /** Defaults to "`{count} results`" via `t('results')`. Supply your own for correct pluralisation/wording. */
  resultLabel?: (count: number) => string

  className?: string
}) {
  const { t } = useI18n()
  const [moreOpen, setMoreOpen] = useState(false)

  const secondary = secondaryValue ?? EMPTY_SECONDARY_VALUE
  const activeSecondaryCount = useMemo(
    () => Object.values(secondary).reduce((total, ids) => total + ids.length, 0),
    [secondary],
  )

  const activeChips = useMemo<ActiveFilterChip[]>(() => {
    const chips: ActiveFilterChip[] = []

    if (statusTabs && statusTabs.length > 0 && statusValue != null && onStatusChange && statusValue !== statusTabs[0].id) {
      const tab = statusTabs.find((candidate) => candidate.id === statusValue)
      if (tab) {
        chips.push({ key: 'status', label: tab.label, onRemove: () => onStatusChange(statusTabs[0].id) })
      }
    }

    if (catalogue && scopeValue && onScopeChange) {
      for (const chip of curriculumScopeChips(scopeValue, catalogue)) {
        chips.push({
          key: `scope:${chip.part}`,
          label: chip.label,
          onRemove: () => onScopeChange(clearCurriculumScopePart(scopeValue, chip.part)),
        })
      }
    }

    if (secondaryFilters && onSecondaryChange) {
      for (const def of secondaryFilters) {
        const selected = secondary[def.id] ?? []
        for (const optionId of selected) {
          const option = def.options.find((candidate) => candidate.id === optionId)
          if (!option) continue
          chips.push({
            key: `secondary:${def.id}:${optionId}`,
            label: `${def.label}: ${option.label}`,
            onRemove: () => onSecondaryChange(toggleSecondaryFilterOption(secondary, def, optionId)),
          })
        }
      }
    }

    return chips
  }, [statusTabs, statusValue, onStatusChange, catalogue, scopeValue, onScopeChange, secondaryFilters, onSecondaryChange, secondary])

  const clearAll = () => {
    if (statusTabs && statusTabs.length > 0 && onStatusChange) onStatusChange(statusTabs[0].id)
    if (onScopeChange) onScopeChange({})
    if (onSecondaryChange) onSecondaryChange({})
  }

  const showScope = Boolean(catalogue && scopeValue && onScopeChange)
  const showSecondaryTrigger = Boolean(secondaryFilters && secondaryFilters.length > 0 && onSecondaryChange)

  return (
    <div className={cn('flex flex-col gap-3', className)}>
      <SearchField value={searchValue} onChange={onSearchChange} label={searchLabel} placeholder={searchPlaceholder} />

      {(statusTabs || resultCount != null || showSecondaryTrigger) && (
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex min-w-0 flex-1">
            {statusTabs && statusValue != null && onStatusChange && (
              <StatusTabs tabs={statusTabs} value={statusValue} onChange={onStatusChange} label={statusLabel ?? t('Filter by status')} />
            )}
          </div>
          <div className="flex shrink-0 items-center gap-3">
            {resultCount != null && (
              <span className="tnum text-[12.5px] text-ink-3">
                {resultLabel ? resultLabel(resultCount) : `${resultCount} ${t('results')}`}
              </span>
            )}
            {showSecondaryTrigger && (
              <Button
                type="button"
                variant="secondary"
                size="sm"
                iconLeft={SlidersHorizontal}
                onClick={() => setMoreOpen(true)}
              >
                {t('More filters')}{activeSecondaryCount > 0 ? ` · ${activeSecondaryCount}` : ''}
              </Button>
            )}
          </div>
        </div>
      )}

      {showScope && (
        <CascadingScopeFilter catalogue={catalogue!} value={scopeValue!} onChange={onScopeChange!} />
      )}

      {activeChips.length > 0 && <ActiveFilterChips chips={activeChips} onClearAll={clearAll} />}

      {showSecondaryTrigger && (
        <MoreFiltersSheet
          open={moreOpen}
          onClose={() => setMoreOpen(false)}
          filters={secondaryFilters!}
          value={secondary}
          onChange={onSecondaryChange!}
        />
      )}
    </div>
  )
}
