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
import { Table, Td, Th, Tr } from '@/components/ui/Table'
import { Badge } from '@/components/ui/Badge'
import { SearchInput, Select } from '@/components/ui/Field'
import { EmptyState } from '@/components/ui/EmptyState'
import { Segmented } from '@/components/ui/Tabs'
import { Caveat, RangeBar, StatusBadge, percent } from './parts'
import { STATUS_EXPLANATION, WRONG_ATTEMPTS_VS_WEAK_CONCEPTS } from '@/data/adaptive/explain'
import { CONCEPT_STATUS_LABEL, type ConceptStatus } from '@/data/adaptive/masteryModel'
import { byConcept } from '@/data/adaptive/misconceptions'
import type { AdaptiveStudy } from '@/lib/adaptive/useAdaptiveStudy'
import { useConceptOverrides, type ConceptOverride } from '@/lib/adaptive/useConceptOverrides'
import { useConceptLabels } from '@/lib/adaptive/useAdaptiveConfig'

const FILTERS: Array<{ value: string; label: string }> = [
  { value: 'all', label: 'All' },
  { value: 'weak', label: 'Weak' },
  { value: 'attention', label: 'Attention' },
  { value: 'review-due', label: 'Due' },
  { value: 'unmeasured', label: 'Unmeasured' },
]

function formatDate(iso: string | null): string {
  if (!iso) return '—'
  return new Date(iso).toLocaleDateString(undefined, { day: 'numeric', month: 'short' })
}

export function Concepts({ study }: { study: AdaptiveStudy }) {
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState('all')
  const [overrides, setOverride] = useConceptOverrides()
  const labels = useConceptLabels()

  const misconceptionsByConcept = useMemo(
    () => byConcept(study.misconceptions),
    [study.misconceptions],
  )

  const rows = useMemo(() => {
    const needle = query.trim().toLowerCase()
    return study.blueprint.nodes
      .map((node) => {
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
      })
      .filter((row) => {
        if (needle && !row.label.toLowerCase().includes(needle) && !row.group.toLowerCase().includes(needle)) return false
        if (filter === 'all') return true
        return row.status === filter
      })
      .sort((a, b) => {
        // Weakest first, then by blueprint weight: the top of this table should
        // be the concepts most worth a student's attention, in that order.
        const order: ConceptStatus[] = ['weak', 'review-due', 'attention', 'developing', 'unmeasured', 'secure']
        const rank = order.indexOf(a.status) - order.indexOf(b.status)
        return rank !== 0 ? rank : b.weight - a.weight
      })
  }, [study.blueprint.nodes, study.states, labels, misconceptionsByConcept, overrides, query, filter])

  if (study.blueprint.empty) {
    return (
      <Panel>
        <EmptyState
          icon={Braces}
          title="No concepts in scope"
          description="Nothing is scoped to your university and year yet, so there is nothing to measure. An administrator sets the blueprint up."
        />
      </Panel>
    )
  }

  return (
    <div className="space-y-5">
      <Caveat>{WRONG_ATTEMPTS_VS_WEAK_CONCEPTS.body}</Caveat>

      <Panel>
        <PanelHeader
          title="Your concepts"
          icon={Braces}
          hint={`${rows.length} of ${study.blueprint.nodes.length}`}
          action={
            <div className="flex flex-wrap items-center gap-2">
              <Segmented value={filter} onChange={setFilter} items={FILTERS} />
              <SearchInput
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search concepts"
                className="w-44"
              />
            </div>
          }
        />

        {rows.length === 0 ? (
          <EmptyState icon={Search} title="Nothing matches" description="No concept matches this filter and search." />
        ) : (
          <Table>
            <thead>
              <tr>
                <Th>Concept</Th>
                <Th>Status</Th>
                <Th>Mastery</Th>
                <Th align="end">Items</Th>
                <Th align="end">Wrong</Th>
                <Th align="end">Next review</Th>
                <Th align="end">Scope</Th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <Tr key={row.conceptId} hover>
                  <Td>
                    <p className="font-medium text-ink">{row.label}</p>
                    <p className="mt-0.5 text-[11.5px] text-ink-3">
                      {row.group} · {percent(row.weight)} of blueprint
                      {row.misconceptions > 0 && ` · ${row.misconceptions} misconception${row.misconceptions === 1 ? '' : 's'}`}
                    </p>
                  </Td>
                  <Td><StatusBadge status={row.status} /></Td>
                  <Td className="min-w-[140px]">
                    {row.state && row.status !== 'unmeasured' ? (
                      <>
                        <RangeBar
                          lower={Math.max(0, row.state.mean - row.state.uncertainty)}
                          upper={Math.min(1, row.state.mean + row.state.uncertainty)}
                          tone={row.state.mean < study.config.statuses.weakBelow ? 'danger' : 'accent'}
                        />
                        <p className="tnum mt-1 font-mono text-[11px] text-ink-3">
                          {percent(Math.max(0, row.state.mean - row.state.uncertainty))}–
                          {percent(Math.min(1, row.state.mean + row.state.uncertainty))}
                        </p>
                      </>
                    ) : (
                      <span className="text-[12px] text-ink-3">Not enough evidence</span>
                    )}
                  </Td>
                  <Td align="end" className="tnum font-mono text-[12.5px]">{row.state?.distinctItems ?? 0}</Td>
                  <Td align="end" className="tnum font-mono text-[12.5px]">{row.state?.rawWrong ?? 0}</Td>
                  <Td align="end" className="tnum font-mono text-[12.5px] text-ink-2">{formatDate(row.state?.nextReviewAt ?? null)}</Td>
                  <Td align="end">
                    <Select
                      value={row.override?.mode ?? 'normal'}
                      onChange={(event) => setOverride(row.conceptId, event.target.value as ConceptOverride['mode'])}
                      className="h-8 w-[118px] text-[12px]"
                    >
                      <option value="normal">Normal</option>
                      <option value="snoozed">Snoozed</option>
                      <option value="out-of-scope">Out of scope</option>
                    </Select>
                  </Td>
                </Tr>
              ))}
            </tbody>
          </Table>
        )}
      </Panel>

      <Panel>
        <PanelHeader title="What your overrides do" icon={SlidersHorizontal} />
        <div className="space-y-2.5 p-5 text-[13px] leading-relaxed text-ink-2">
          <p>
            <Badge tone="outline">Snoozed</Badge> keeps the concept measured and keeps its evidence, but stops selection
            offering it for two weeks. Use it when you have decided to come back to something later.
          </p>
          <p>
            <Badge tone="outline">Out of scope</Badge> removes the concept from your blueprint entirely, so it stops
            counting toward coverage and stops being selected. Use it when a concept genuinely is not on your exam.
          </p>
          <p className="text-ink-3">
            Neither deletes anything. Your answers stay in the record, and setting a concept back to Normal restores its
            state exactly as it was.
          </p>
        </div>
      </Panel>

      <Panel>
        <PanelHeader title="Status meanings" icon={Braces} />
        <div className="grid gap-4 p-5 sm:grid-cols-2">
          {(Object.keys(CONCEPT_STATUS_LABEL) as ConceptStatus[]).map((status) => (
            <div key={status} className="min-w-0">
              <StatusBadge status={status} />
              <p className="mt-1.5 text-[12.5px] leading-relaxed text-ink-2">{STATUS_EXPLANATION[status]}</p>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  )
}
