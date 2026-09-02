/**
 * The student's own concept states, and their right to argue with them.
 *
 * Two columns matter more than the rest. `Wrong` and `Status` sit next to each
 * other on purpose: a student who has three wrong answers against one concept
 * and reads "Weak" once should be able to see, in one row, that the app has not
 * lost two of their mistakes.
 *
 * The override controls are here because autonomy is a stated principle, not a
 * concession. A student who knows a concept is off their exam can take it out of
 * scope, and one who wants a break from a concept can snooze it. Neither erases
 * evidence — both change only what selection is allowed to offer.
 */

import { useMemo, useState } from 'react'
import { Braces, Search, SlidersHorizontal } from 'lucide-react'
import { Panel, PanelHeader } from '@/components/ui/Panel'
import { Badge } from '@/components/ui/Badge'
import { FilterChip } from '@/components/ui/FilterChip'
import { SearchInput, Select } from '@/components/ui/Field'
import { EmptyState } from '@/components/ui/EmptyState'
import { Caveat, RangeBar, StatusBadge, percent } from './parts'
import { STATUS_EXPLANATION, WRONG_ATTEMPTS_VS_WEAK_CONCEPTS } from '@/data/adaptive/explain'
import { CONCEPT_STATUS_LABEL, type ConceptStatus } from '@/data/adaptive/masteryModel'
import { byConcept } from '@/data/adaptive/misconceptions'
import type { AdaptiveStudy } from '@/lib/adaptive/useAdaptiveStudy'
import { useConceptOverrides, type ConceptOverride } from '@/lib/adaptive/useConceptOverrides'
import { useConceptLabels } from '@/lib/adaptive/useAdaptiveConfig'
import { cn } from '@/lib/cn'
import { useT } from '@/lib/i18n'

/** Filter chips, in the order they read best: worst standing first. */
const FILTERS: Array<{ value: 'all' | ConceptStatus; label: string }> = [
  { value: 'all', label: 'All' },
  { value: 'weak', label: CONCEPT_STATUS_LABEL.weak },
  { value: 'attention', label: CONCEPT_STATUS_LABEL.attention },
  { value: 'review-due', label: CONCEPT_STATUS_LABEL['review-due'] },
  { value: 'unmeasured', label: CONCEPT_STATUS_LABEL.unmeasured },
]

/** The colour a card's edge and its review line borrow from the status system
 * `StatusBadge` already uses, so a card never claims an urgency its badge
 * doesn't back up. */
const ACCENT_VAR: Record<ConceptStatus, string> = {
  unmeasured: 'var(--color-line-2)',
  attention: 'var(--color-warning)',
  weak: 'var(--color-danger)',
  developing: 'var(--color-primary)',
  secure: 'var(--color-success)',
  'review-due': 'var(--color-primary)',
}

function formatDate(iso: string | null): string {
  if (!iso) return '—'
  return new Date(iso).toLocaleDateString(undefined, { day: 'numeric', month: 'short' })
}

/**
 * What a concept card's footer says about its review, and how urgently.
 *
 * Only concepts with actual evidence carry a `nextReviewAt` at all, so this is
 * never called for an unmeasured concept — there is nothing yet to schedule.
 */
function reviewLine(
  nextReviewAt: string | null,
  now: Date,
  t: (en: string) => string,
): { text: string; tone: 'danger' | 'warning' | 'neutral' } | null {
  if (!nextReviewAt) return null
  const diffDays = Math.round((new Date(nextReviewAt).getTime() - now.getTime()) / 86_400_000)
  if (diffDays < 0) return { text: t('overdue {n}d').replace('{n}', String(Math.abs(diffDays))), tone: 'danger' }
  if (diffDays === 0) return { text: t('due today'), tone: 'warning' }
  return { text: `${t('review')} ${formatDate(nextReviewAt)}`, tone: 'neutral' }
}

export function Concepts({ study }: { study: AdaptiveStudy }) {
  const t = useT()
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState<'all' | ConceptStatus>('all')
  const [overrides, setOverride] = useConceptOverrides()
  const labels = useConceptLabels()
  const now = useMemo(() => new Date(), [])

  const misconceptionsByConcept = useMemo(
    () => byConcept(study.misconceptions),
    [study.misconceptions],
  )

  const allRows = useMemo(() => study.blueprint.nodes.map((node) => {
    const state = study.states.get(node.conceptId)
    return {
      conceptId: node.conceptId,
      label: labels.get(node.conceptId) ?? node.label,
      group: node.groupLabel,
      weight: node.weight,
      state,
      status: (state?.status ?? 'unmeasured') as ConceptStatus,
      misconceptions: misconceptionsByConcept.get(node.conceptId)?.length ?? 0,
      override: overrides[node.conceptId],
    }
  }), [study.blueprint.nodes, study.states, labels, misconceptionsByConcept, overrides])

  // Counts are taken from every concept in scope, not the filtered/searched
  // set — a chip that recounts itself as you type on it would be useless as a
  // way to see how many concepts a filter still holds.
  const counts = useMemo(() => {
    const tally: Record<'all' | ConceptStatus, number> = {
      all: allRows.length, unmeasured: 0, attention: 0, weak: 0, developing: 0, secure: 0, 'review-due': 0,
    }
    for (const row of allRows) tally[row.status] += 1
    return tally
  }, [allRows])

  const rows = useMemo(() => {
    const needle = query.trim().toLowerCase()
    return allRows
      .filter((row) => {
        if (needle && !row.label.toLowerCase().includes(needle) && !row.group.toLowerCase().includes(needle)) return false
        if (filter === 'all') return true
        return row.status === filter
      })
      .sort((a, b) => {
        // Weakest first, then by blueprint weight: the top of this grid should
        // be the concepts most worth a student's attention, in that order.
        const order: ConceptStatus[] = ['weak', 'review-due', 'attention', 'developing', 'unmeasured', 'secure']
        const rank = order.indexOf(a.status) - order.indexOf(b.status)
        return rank !== 0 ? rank : b.weight - a.weight
      })
  }, [allRows, query, filter])

  if (study.blueprint.empty) {
    return (
      <Panel>
        <EmptyState
          icon={Braces}
          title={t('No concepts in scope')}
          description={t('Nothing is scoped to your university and year yet, so there is nothing to measure. An administrator sets the blueprint up.')}
        />
      </Panel>
    )
  }

  return (
    <div className="space-y-5">
      <Caveat>{t(WRONG_ATTEMPTS_VS_WEAK_CONCEPTS.body)}</Caveat>

      {/* Filters, in rank order, each carrying its own count so a student can
          see the shape of their standing before opening a single card. */}
      <div className="flex flex-wrap items-center gap-2">
        {FILTERS.map((entry) => (
          <FilterChip key={entry.value} active={filter === entry.value} onClick={() => setFilter(entry.value)}>
            {t(entry.label)} · <span className="tnum font-mono">{counts[entry.value]}</span>
          </FilterChip>
        ))}
        <SearchInput
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={t('Search concepts…')}
          className="ms-auto w-full sm:w-64"
        />
      </div>

      {rows.length === 0 ? (
        <Panel>
          <EmptyState icon={Search} title={t('Nothing matches')} description={t('No concept matches this filter and search.')} />
        </Panel>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {rows.map((row) => {
            const measured = row.state && row.status !== 'unmeasured'
            const review = row.state ? reviewLine(row.state.nextReviewAt, now, t) : null
            const reviewTone = review
              ? { danger: 'text-danger', warning: 'text-warning', neutral: 'text-ink-3' }[review.tone]
              : null

            return (
              <Panel
                key={row.conceptId}
                className={cn('min-w-0 p-3.5', row.status === 'unmeasured' && 'border-dashed')}
                style={{ borderLeftWidth: 3, borderLeftColor: ACCENT_VAR[row.status] }}
              >
                <div className="flex items-start justify-between gap-2">
                  <p className={cn('min-w-0 truncate text-[13px] font-semibold', row.status === 'unmeasured' ? 'text-ink-2' : 'text-ink')}>
                    {row.label}
                  </p>
                  <StatusBadge status={row.status} />
                </div>
                <p className="mt-0.5 truncate text-[11px] text-ink-3">
                  {row.group} · {percent(row.weight)} {t('of blueprint')}
                  {row.misconceptions > 0 && ` · ${row.misconceptions} ${row.misconceptions === 1 ? t('misconception') : t('misconceptions')}`}
                </p>

                {measured && row.state ? (
                  <RangeBar
                    className="mt-2.5"
                    lower={Math.max(0, row.state.mean - row.state.uncertainty)}
                    upper={Math.min(1, row.state.mean + row.state.uncertainty)}
                    marker={row.state.mean}
                    tone={row.state.mean < study.config.statuses.weakBelow ? 'danger' : 'primary'}
                  />
                ) : (
                  <p className="mt-2.5 text-[11px] italic text-ink-3">
                    {t('Not enough evidence — will be drawn into your next block.')}
                  </p>
                )}

                {row.state && (
                  <div className="mt-2 flex items-center justify-between gap-2 text-[11px] text-ink-3">
                    <span className="tnum font-mono">{row.state.distinctItems} {t('items')} · {row.state.rawWrong} {t('wrong')}</span>
                    {review && (
                      <span className={reviewTone ?? undefined}>
                        {review.tone === 'neutral' ? review.text : <span className="font-semibold">{review.text}</span>}
                      </span>
                    )}
                  </div>
                )}

                <Select
                  value={row.override?.mode ?? 'normal'}
                  onChange={(event) => setOverride(row.conceptId, event.target.value as ConceptOverride['mode'])}
                  className="mt-2.5 h-7 text-[11px]"
                  aria-label={t('Scope for {concept}').replace('{concept}', row.label)}
                >
                  <option value="normal">{t('Normal')}</option>
                  <option value="snoozed">{t('Snoozed')}</option>
                  <option value="out-of-scope">{t('Out of scope')}</option>
                </Select>
              </Panel>
            )
          })}
        </div>
      )}

      {/* Legend, echoing the colours every card just used. */}
      <Panel className="flex flex-wrap items-center gap-x-5 gap-y-2 p-3.5">
        <span className="text-[11px] font-semibold uppercase tracking-[0.06em] text-ink-3">{t('Status')}</span>
        {(['weak', 'attention', 'developing', 'secure'] as ConceptStatus[]).map((status) => (
          <span key={status} className="inline-flex items-center gap-1.5 text-[11.5px] text-ink-2">
            <span className="size-2 rounded-sm" style={{ backgroundColor: ACCENT_VAR[status] }} />
            {t(CONCEPT_STATUS_LABEL[status])} — {t(STATUS_EXPLANATION[status])}
          </span>
        ))}
        <span className="text-[11px] text-ink-3 sm:ms-auto">
          {t('Marker = best estimate · band = uncertainty · snooze or scope out any concept from its card')}
        </span>
      </Panel>

      <Panel>
        <PanelHeader title={t('What your overrides do')} icon={SlidersHorizontal} />
        <div className="space-y-2.5 p-5 text-[13px] leading-relaxed text-ink-2">
          <p>
            <Badge tone="outline">{t('Snoozed')}</Badge>{' '}
            {t('keeps the concept measured and keeps its evidence, but stops selection offering it for two weeks. Use it when you have decided to come back to something later.')}
          </p>
          <p>
            <Badge tone="outline">{t('Out of scope')}</Badge>{' '}
            {t('removes the concept from your blueprint entirely, so it stops counting toward coverage and stops being selected. Use it when a concept genuinely is not on your exam.')}
          </p>
          <p className="text-ink-3">
            {t('Neither deletes anything. Your answers stay in the record, and setting a concept back to Normal restores its state exactly as it was.')}
          </p>
        </div>
      </Panel>

      <Panel>
        <PanelHeader title={t('Status meanings')} icon={Braces} />
        <div className="grid gap-4 p-5 sm:grid-cols-2">
          {(Object.keys(CONCEPT_STATUS_LABEL) as ConceptStatus[]).map((status) => (
            <div key={status} className="min-w-0">
              <StatusBadge status={status} />
              <p className="mt-1.5 text-[12.5px] leading-relaxed text-ink-2">{t(STATUS_EXPLANATION[status])}</p>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  )
}
