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
import { Caveat, Figure, ProgressBlock, RangeBar, percent, rangeText } from './parts'
import { NEED_LABEL, ALLOCATION_NEEDS } from '@/data/adaptive/config'
import { PREDICTION_CAVEAT, WRONG_ATTEMPTS_VS_WEAK_CONCEPTS } from '@/data/adaptive/explain'
import { readinessSentence, type ReadinessResult } from '@/data/adaptive/readiness'
import { rawWrongTotal, statusCounts, type AdaptiveStudy } from '@/lib/adaptive/useAdaptiveStudy'
import { useT } from '@/lib/i18n'

/**
 * What the student should do next, and why.
 *
 * Chosen by the same states the block builder reads, so the card and the block
 * it starts can never disagree. Deliberately one recommendation: a dashboard
 * that offers five equally-weighted options has not actually decided anything,
 * which is the work it exists to do.
 */
function nextAction(study: AdaptiveStudy, readiness: ReadinessResult | null, t: (en: string) => string) {
  const blueprintConcepts = study.blueprint.nodes.map((node) => node.conceptId)
  const counts = statusCounts(study.states, blueprintConcepts)
  const due = [...study.states.values()].filter((state) => state.status === 'review-due').length

  if (study.blueprint.empty) {
    return {
      title: t('Nothing on your blueprint yet'),
      body: t('No concepts are in scope for your university and year, so there is nothing to select from. This is a content gap, not a gap in your work.'),
      cta: null,
      icon: AlertTriangle,
    }
  }

  if (!study.items.length) {
    return {
      title: t('No approved questions in scope'),
      body: t('Your blueprint exists, but no published questions match your university, year and modules yet.'),
      cta: null,
      icon: AlertTriangle,
    }
  }

  // Reviews first: a due review that slips is knowledge decaying while the
  // student practises something else.
  if (due > 0) {
    return {
      title: `${due} ${due === 1 ? t('concept due for review') : t('concepts due for review')}`,
      body: t('These were secure, and enough time has passed that they are worth checking before they fade.'),
      cta: 'practice' as const,
      icon: RotateCcw,
    }
  }

  if (counts.weak > 0) {
    return {
      title: `${counts.weak} ${counts.weak === 1 ? t('weak concept to repair') : t('weak concepts to repair')}`,
      body: t('Repeated evidence across different questions points to real gaps here. The next block will oversample them while still covering your blueprint.'),
      cta: 'practice' as const,
      icon: Target,
    }
  }

  if (!readiness && study.events.length > 40) {
    return {
      title: t('Time for a readiness assessment'),
      body: t('You have enough practice behind you to measure where you stand. Practice accuracy will not tell you — adaptive blocks deliberately oversample your weak areas.'),
      cta: 'readiness' as const,
      icon: ClipboardCheck,
    }
  }

  if (study.coverage.uncoveredWeight > 0.2) {
    return {
      title: `${percent(study.coverage.uncoveredWeight)} ${t('of your blueprint is unpractised')}`,
      body: t('The next block will weight coverage more heavily so the untouched areas start being measured.'),
      cta: 'practice' as const,
      icon: Compass,
    }
  }

  return {
    title: t('Start a block'),
    body: t('Nothing is overdue and no confirmed weakness is outstanding. The next block will balance review with the parts of your blueprint that have the least evidence behind them.'),
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
  const t = useT()
  const blueprintConcepts = useMemo(
    () => study.blueprint.nodes.map((node) => node.conceptId),
    [study.blueprint.nodes],
  )
  const counts = useMemo(() => statusCounts(study.states, blueprintConcepts), [study.states, blueprintConcepts])
  const rawWrong = useMemo(() => rawWrongTotal(study.events), [study.events])
  const action = nextAction(study, readiness, t)

  const measured = study.states.size
  const dueCount = [...study.states.values()].filter((state) => state.status === 'review-due').length

  return (
    <div className="space-y-5">
      {/* The recommendation, and the reason for it, before anything else. */}
      <Panel className="overflow-hidden">
        <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex min-w-0 gap-3.5">
            <div className="grid size-10 shrink-0 place-items-center rounded-xl border border-line bg-primary-tint text-primary-strong">
              <Icon icon={action.icon} size={19} />
            </div>
            <div className="min-w-0">
              <p className="text-[11px] font-semibold uppercase tracking-[0.06em] text-ink-3">{t('Recommended next')}</p>
              <h2 className="mt-1 font-serif text-[20px] font-semibold tracking-[-0.015em] text-ink">{action.title}</h2>
              <p className="mt-1.5 max-w-xl text-[13.5px] leading-relaxed text-ink-2">{action.body}</p>
            </div>
          </div>
          {action.cta === 'practice' && (
            <Button variant="primary" iconLeft={PlayCircle} onClick={onPractice} className="shrink-0">
              {t('Build a block')}
            </Button>
          )}
          {action.cta === 'readiness' && (
            <Button variant="primary" iconLeft={ClipboardCheck} onClick={onReadiness} className="shrink-0">
              {t('Start assessment')}
            </Button>
          )}
        </div>

        {study.daysToExam !== null && (
          <div className="flex flex-wrap items-center gap-2 border-t border-line bg-surface-2 px-5 py-3">
            <Icon icon={CalendarClock} size={15} className="text-ink-3" />
            <p className="text-[12.5px] text-ink-2">
              <span className="tnum font-mono font-semibold text-ink">{study.daysToExam}</span> {t('days to')}{' '}
              {study.examTitle ?? t('your next exam')}{t('. Selection is weighting blueprint coverage at')}{' '}
              <span className="tnum font-mono">{percent(study.shares.coverage)}</span> {t('of each block.')}
            </p>
          </div>
        )}
      </Panel>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Figure
          label={t('Readiness')}
          value={readiness ? rangeText(readiness.lower, readiness.upper) : ''}
          unavailable={!readiness}
          unavailableNote={t('Measured separately from practice, on blueprint-balanced questions held back from your blocks.')}
          sub={readiness ? t('From {n} held-out questions').replace('{n}', String(readiness.answered)) : undefined}
          icon={ClipboardCheck}
        />
        <Figure
          label={t('Blueprint covered')}
          value={percent(study.coverage.coveredWeight)}
          unavailable={study.blueprint.empty}
          unavailableNote={t('No concepts are in scope for your university and year yet.')}
          sub={`${study.coverage.uncoveredConcepts.length} ${study.coverage.uncoveredConcepts.length === 1 ? t('concept untouched') : t('concepts untouched')}`}
          icon={Layers}
        />
        <Figure
          label={t('Weak concepts')}
          value={String(counts.weak)}
          // Both numbers, always. A student shown only the smaller one concludes
          // the app has lost their mistakes.
          sub={`${rawWrong} ${rawWrong === 1 ? t('wrong answer recorded') : t('wrong answers recorded')}`}
          icon={Target}
        />
        <Figure
          label={t('Due for review')}
          value={String(dueCount)}
          sub={`${measured} ${measured === 1 ? t('concept measured') : t('concepts measured')}`}
          icon={RotateCcw}
        />
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <Panel>
          <PanelHeader
            title={t('Blueprint coverage')}
            icon={Layers}
            hint={study.blueprint.stored ? t('Blueprint v{version}').replace('{version}', String(study.blueprint.stored.version)) : t('Derived weights')}
          />
          <div className="p-5">
            {study.blueprint.empty ? (
              <EmptyState
                icon={Layers}
                title={t('No blueprint in scope')}
                description={t('No concepts are scoped to your university and year, so coverage cannot be measured. An administrator sets this up.')}
              />
            ) : (
              <div className="space-y-3">
                {study.coverage.groups.slice(0, 8).map((group) => (
                  <ProgressBlock
                    key={group.groupId}
                    label={group.groupLabel}
                    value={group.coveredWeight}
                    max={group.weight}
                    right={`${percent(group.weight > 0 ? group.coveredWeight / group.weight : 0)} ${t('of')} ${percent(group.weight)}`}
                    tone={group.coveredWeight / Math.max(group.weight, 1e-9) < 0.34 ? 'danger' : group.coveredWeight / Math.max(group.weight, 1e-9) < 0.67 ? 'warning' : 'success'}
                  />
                ))}
                {study.debt.slots >= 1 && (
                  <Caveat className="mt-4">
                    {t('Recent blocks under-served blueprint coverage by about')}{' '}
                    <span className="tnum font-mono">{Math.round(study.debt.slots)}</span>{' '}
                    {t('questions. That shortfall is being repaid across the next few blocks rather than all at once.')}
                  </Caveat>
                )}
              </div>
            )}
          </div>
        </Panel>

        <Panel>
          <PanelHeader title={t('What your next block will contain')} icon={Target} hint={t('Allocation targets')} />
          <div className="space-y-3 p-5">
            {ALLOCATION_NEEDS.map((need) => (
              <ProgressBlock
                key={need}
                label={t(NEED_LABEL[need])}
                value={study.shares[need]}
                max={1}
                right={percent(study.shares[need])}
                tone={need === 'weakness' ? 'primary' : 'neutral'}
              />
            ))}
            <Caveat className="mt-4">
              {t('These are allocation targets, not separate pools. One question often satisfies several of them at once and takes a single slot.')}
            </Caveat>
          </div>
        </Panel>
      </div>

      <Panel>
        <PanelHeader title={t('How your readiness is measured')} icon={ClipboardCheck} />
        <div className="space-y-4 p-5">
          <p className="text-[13.5px] leading-relaxed text-ink-2">{readinessSentence(readiness, t)}</p>
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
          <Caveat>{t(PREDICTION_CAVEAT)}</Caveat>
        </div>
      </Panel>

      <Panel>
        <PanelHeader title={t(WRONG_ATTEMPTS_VS_WEAK_CONCEPTS.heading)} icon={AlertTriangle} />
        <p className="p-5 text-[13.5px] leading-relaxed text-ink-2">{t(WRONG_ATTEMPTS_VS_WEAK_CONCEPTS.body)}</p>
      </Panel>
    </div>
  )
}
