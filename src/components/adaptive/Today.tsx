/**
 * The adaptive dashboard.
 *
 * One recommended next action, carrying the reason it was chosen, above the
 * readings that justify it. The order is the argument: a student should be able
 * to act without reading the rest, and be able to check the recommendation by
 * reading on.
 *
 * Every figure here is derived from stored records. Where the evidence is too
 * thin to support a figure, the panel says "not yet" — the rule `Performance.tsx`
 * already follows, for the same reason: a percentage computed from three answers
 * swings wildly and means nothing.
 */

import { useMemo } from 'react'
import {
  AlertTriangle, CalendarClock, ClipboardCheck, Compass, Layers, PlayCircle, RotateCcw, Target,
} from 'lucide-react'
import { Panel, PanelHeader } from '@/components/ui/Panel'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Icon } from '@/components/ui/Icon'
import { EmptyState } from '@/components/ui/EmptyState'
import { Caveat, Figure, RangeBar, ShareRow, percent, rangeText } from './parts'
import { NEED_LABEL, ALLOCATION_NEEDS } from '@/data/adaptive/config'
import { PREDICTION_CAVEAT, WRONG_ATTEMPTS_VS_WEAK_CONCEPTS } from '@/data/adaptive/explain'
import { readinessSentence, type ReadinessResult } from '@/data/adaptive/readiness'
import { rawWrongTotal, statusCounts, type AdaptiveStudy } from '@/lib/adaptive/useAdaptiveStudy'

/**
 * What the student should do next, and why.
 *
 * Chosen by the same states the block builder reads, so the card and the block
 * it starts can never disagree. Deliberately one recommendation: a dashboard
 * that offers five equally-weighted options has not actually decided anything,
 * which is the work it exists to do.
 */
function nextAction(study: AdaptiveStudy, readiness: ReadinessResult | null) {
  const blueprintConcepts = study.blueprint.nodes.map((node) => node.conceptId)
  const counts = statusCounts(study.states, blueprintConcepts)
  const due = [...study.states.values()].filter((state) => state.status === 'review-due').length

  if (study.blueprint.empty) {
    return {
      title: 'Nothing on your blueprint yet',
      body: 'No concepts are in scope for your university and year, so there is nothing to select from. This is a content gap, not a gap in your work.',
      cta: null,
      icon: AlertTriangle,
    }
  }

  if (!study.items.length) {
    return {
      title: 'No approved questions in scope',
      body: 'Your blueprint exists, but no published questions match your university, year and modules yet.',
      cta: null,
      icon: AlertTriangle,
    }
  }

  // Reviews first: a due review that slips is knowledge decaying while the
  // student practises something else.
  if (due > 0) {
    return {
      title: `${due} concept${due === 1 ? '' : 's'} due for review`,
      body: 'These were secure, and enough time has passed that they are worth checking before they fade.',
      cta: 'practice' as const,
      icon: RotateCcw,
    }
  }

  if (counts.weak > 0) {
    return {
      title: `${counts.weak} weak concept${counts.weak === 1 ? '' : 's'} to repair`,
      body: 'Repeated evidence across different questions points to real gaps here. The next block will oversample them while still covering your blueprint.',
      cta: 'practice' as const,
      icon: Target,
    }
  }

  if (!readiness && study.events.length > 40) {
    return {
      title: 'Time for a readiness assessment',
      body: 'You have enough practice behind you to measure where you stand. Practice accuracy will not tell you — adaptive blocks deliberately oversample your weak areas.',
      cta: 'readiness' as const,
      icon: ClipboardCheck,
    }
  }

  if (study.coverage.uncoveredWeight > 0.2) {
    return {
      title: `${percent(study.coverage.uncoveredWeight)} of your blueprint is unpractised`,
      body: 'The next block will weight coverage more heavily so the untouched areas start being measured.',
      cta: 'practice' as const,
      icon: Compass,
    }
  }

  return {
    title: 'Start a block',
    body: 'Nothing is overdue and no confirmed weakness is outstanding. The next block will balance review with the parts of your blueprint that have the least evidence behind them.',
    cta: 'practice' as const,
    icon: PlayCircle,
  }
}

export function Today({
  study,
  readiness,
  onPractice,
  onReadiness,
}: {
  study: AdaptiveStudy
  readiness: ReadinessResult | null
  onPractice: () => void
  onReadiness: () => void
}) {
  const blueprintConcepts = useMemo(
    () => study.blueprint.nodes.map((node) => node.conceptId),
    [study.blueprint.nodes],
  )
  const counts = useMemo(() => statusCounts(study.states, blueprintConcepts), [study.states, blueprintConcepts])
  const rawWrong = useMemo(() => rawWrongTotal(study.events), [study.events])
  const action = nextAction(study, readiness)

  const measured = study.states.size
  const dueCount = [...study.states.values()].filter((state) => state.status === 'review-due').length

  return (
    <div className="space-y-5">
      {/* The recommendation, and the reason for it, before anything else. */}
      <Panel className="overflow-hidden">
        <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex min-w-0 gap-3.5">
            <div className="grid size-10 shrink-0 place-items-center rounded-xl border border-line bg-accent-tint text-accent-strong">
              <Icon icon={action.icon} size={19} />
            </div>
            <div className="min-w-0">
              <p className="text-[11px] font-semibold uppercase tracking-[0.06em] text-ink-3">Recommended next</p>
              <h2 className="mt-1 font-serif text-[20px] font-semibold tracking-[-0.015em] text-ink">{action.title}</h2>
              <p className="mt-1.5 max-w-xl text-[13.5px] leading-relaxed text-ink-2">{action.body}</p>
            </div>
          </div>
          {action.cta === 'practice' && (
            <Button variant="primary" iconLeft={PlayCircle} onClick={onPractice} className="shrink-0">
              Build a block
            </Button>
          )}
          {action.cta === 'readiness' && (
            <Button variant="primary" iconLeft={ClipboardCheck} onClick={onReadiness} className="shrink-0">
              Start assessment
            </Button>
          )}
        </div>

        {study.daysToExam !== null && (
          <div className="flex flex-wrap items-center gap-2 border-t border-line bg-surface-2 px-5 py-3">
            <Icon icon={CalendarClock} size={15} className="text-ink-3" />
            <p className="text-[12.5px] text-ink-2">
              <span className="tnum font-mono font-semibold text-ink">{study.daysToExam}</span> days to{' '}
              {study.examTitle ?? 'your next exam'}. Selection is weighting blueprint coverage at{' '}
              <span className="tnum font-mono">{percent(study.shares.coverage)}</span> of each block.
            </p>
          </div>
        )}
      </Panel>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Figure
          label="Readiness"
          value={readiness ? rangeText(readiness.lower, readiness.upper) : ''}
          unavailable={!readiness}
          unavailableNote="Measured separately from practice, on blueprint-balanced questions held back from your blocks."
          sub={readiness ? `From ${readiness.answered} held-out questions` : undefined}
          icon={ClipboardCheck}
        />
        <Figure
          label="Blueprint covered"
          value={percent(study.coverage.coveredWeight)}
          unavailable={study.blueprint.empty}
          unavailableNote="No concepts are in scope for your university and year yet."
          sub={`${study.coverage.uncoveredConcepts.length} ${study.coverage.uncoveredConcepts.length === 1 ? 'concept' : 'concepts'} untouched`}
          icon={Layers}
        />
        <Figure
          label="Weak concepts"
          value={String(counts.weak)}
          // Both numbers, always. A student shown only the smaller one concludes
          // the app has lost their mistakes.
          sub={`${rawWrong} wrong ${rawWrong === 1 ? 'answer' : 'answers'} recorded`}
          icon={Target}
        />
        <Figure
          label="Due for review"
          value={String(dueCount)}
          sub={`${measured} ${measured === 1 ? 'concept' : 'concepts'} measured`}
          icon={RotateCcw}
        />
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <Panel>
          <PanelHeader
            title="Blueprint coverage"
            icon={Layers}
            hint={study.blueprint.stored ? `Blueprint v${study.blueprint.stored.version}` : 'Derived weights'}
          />
          <div className="p-5">
            {study.blueprint.empty ? (
              <EmptyState
                icon={Layers}
                title="No blueprint in scope"
                description="No concepts are scoped to your university and year, so coverage cannot be measured. An administrator sets this up."
              />
            ) : (
              <div className="space-y-3.5">
                {study.coverage.groups.slice(0, 8).map((group) => (
                  <ShareRow
                    key={group.groupId}
                    label={group.groupLabel}
                    value={group.coveredWeight}
                    max={group.weight}
                    right={`${percent(group.weight > 0 ? group.coveredWeight / group.weight : 0)} of ${percent(group.weight)}`}
                    tone={group.coveredWeight / Math.max(group.weight, 1e-9) < 0.34 ? 'warning' : 'accent'}
                  />
                ))}
                {study.debt.slots >= 1 && (
                  <Caveat className="mt-4">
                    Recent blocks under-served blueprint coverage by about{' '}
                    <span className="tnum font-mono">{Math.round(study.debt.slots)}</span> questions. That shortfall is
                    being repaid across the next few blocks rather than all at once.
                  </Caveat>
                )}
              </div>
            )}
          </div>
        </Panel>

        <Panel>
          <PanelHeader title="What your next block will contain" icon={Target} hint="Allocation targets" />
          <div className="space-y-3.5 p-5">
            {ALLOCATION_NEEDS.map((need) => (
              <ShareRow
                key={need}
                label={NEED_LABEL[need]}
                value={study.shares[need]}
                max={1}
                right={percent(study.shares[need])}
                tone={need === 'weakness' ? 'accent' : 'neutral'}
              />
            ))}
            <Caveat className="mt-4">
              These are allocation targets, not separate pools. One question often satisfies several of them at once
              and takes a single slot.
            </Caveat>
          </div>
        </Panel>
      </div>

      <Panel>
        <PanelHeader title="How your readiness is measured" icon={ClipboardCheck} />
        <div className="space-y-4 p-5">
          <p className="text-[13.5px] leading-relaxed text-ink-2">{readinessSentence(readiness)}</p>
          {readiness && (
            <>
              <RangeBar lower={readiness.lower} upper={readiness.upper} />
              <div className="flex flex-wrap gap-2">
                {readiness.groups.filter((group) => !group.insufficient).slice(0, 6).map((group) => (
                  <Badge key={group.groupId} tone="outline">
                    {group.groupLabel} <span className="tnum font-mono">{rangeText(group.lower ?? 0, group.upper ?? 1)}</span>
                  </Badge>
                ))}
              </div>
            </>
          )}
          <Caveat>{PREDICTION_CAVEAT}</Caveat>
        </div>
      </Panel>

      <Panel>
        <PanelHeader title={WRONG_ATTEMPTS_VS_WEAK_CONCEPTS.heading} icon={AlertTriangle} />
        <p className="p-5 text-[13.5px] leading-relaxed text-ink-2">{WRONG_ATTEMPTS_VS_WEAK_CONCEPTS.body}</p>
      </Panel>
    </div>
  )
}
