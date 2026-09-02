import type { ReactNode } from 'react'
import { Tabs } from '@/components/ui/Tabs'
import type { SittingKind } from '@/data/sittings'
import { useT } from '@/lib/i18n'

/** Which kinds of sitting the list is showing. */
export type PreviousFilter = SittingKind | 'all'

export interface PreviousTestsTabProps {
  filter: PreviousFilter
  onFilterChange: (next: PreviousFilter) => void
  /** How many sittings each chip stands for. */
  counts: Record<PreviousFilter, number>
  /** The MCQ ledger — `PreviousTests` and its detail panel, unchanged. */
  mcq: ReactNode
  /** Practical, essay and mixed sittings, already filtered. */
  others: ReactNode
  /** Whether the MCQ list belongs on screen under the current filter. */
  showMcq: boolean
  /** Whether the other kinds belong on screen under the current filter. */
  showOthers: boolean
}

/**
 * Every test the student has sat, of every kind, under one heading.
 *
 * The list used to be built from the MCQ attempt log alone, so a practical or a
 * mixed sitting left no row at all — a student could finish six stations and
 * find no evidence of it. The chips say which kinds are on screen and how many
 * of each there are, and each row carries the kind as a badge, because "12
 * questions" and "12 items" are not the same test.
 *
 * The MCQ list keeps its own component and its own actions — review, rename,
 * retake, delete — because they are wired to session state that lives in
 * `QuestionBank.tsx`. Moving it here would mean moving that state with it,
 * which this redesign deliberately does not do.
 */
export function PreviousTestsTab({
  filter,
  onFilterChange,
  counts,
  mcq,
  others,
  showMcq,
  showOthers,
}: PreviousTestsTabProps) {
  const t = useT()

  return (
    <section aria-labelledby="previous-tests-title">
      <div className="mb-3">
        <h2 id="previous-tests-title" className="text-[15px] font-semibold text-ink">
          {t('Previous tests')}
        </h2>
        <p className="mt-1.5 text-[12.5px] leading-relaxed text-ink-2">
          {counts.all === 0
            ? t('Every test you sit is kept here with its full report, whichever bank it came from.')
            : t('Open a report, review the answers, or sit the same questions again.')}
        </p>
      </div>

      <Tabs
        className="mb-4"
        value={filter}
        onChange={(next) => onFilterChange(next as PreviousFilter)}
        items={[
          { value: 'all', label: t('All'), count: counts.all },
          { value: 'mcq', label: t('MCQ'), count: counts.mcq },
          { value: 'practical', label: t('Practical'), count: counts.practical },
          { value: 'essay', label: t('Essay'), count: counts.essay },
          { value: 'mixed', label: t('Mixed'), count: counts.mixed },
        ]}
      />

      <div className="space-y-4">
        {showMcq && mcq}
        {showOthers && others}
      </div>
    </section>
  )
}
