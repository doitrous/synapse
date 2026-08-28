import { useMemo, type CSSProperties, type ReactNode } from 'react'
import { TrendingUp } from 'lucide-react'
import { Panel } from '@/components/ui/Panel'
import { Badge } from '@/components/ui/Badge'
import { Icon } from '@/components/ui/Icon'
import { cn } from '@/lib/cn'
import { useT } from '@/lib/i18n'
import { masteryBand } from '@/data/mastery'
import { CONCEPT_STORAGE_KEY, initialConceptGraph, type ConceptGraph } from '@/data/conceptGraph'
import { summariseSkills } from '@/data/practicalProgress'
import { dailyCounts, distinctItems, firstAttemptSplit } from '@/data/attemptStats'
import { useMastery } from '@/lib/useMastery'
import { usePersistentState } from '@/lib/usePersistentState'
import { useAttemptHistory, useAttemptTotals } from '@/lib/useAttemptLog'
import { usePracticalProgress } from '@/lib/usePracticalProgress'
import { useLivePracticals } from '@/lib/useLivePracticals'
import { usePublishedQuestions } from '@/lib/usePublishedQuestions'
import { useLiveEssays } from '@/lib/useLiveEssays'
import { useEssayAnswers } from '@/lib/useEssayAnswers'
import { coveredCount } from '@/data/essay'

type Tone = 'danger' | 'primary' | 'success'

function zoneOf(v: number): { name: string; tone: Tone } {
  if (v < 40) return { name: 'Building', tone: 'danger' }
  if (v < 70) return { name: 'On track', tone: 'primary' }
  return { name: 'Exam-ready', tone: 'success' }
}

/** A lab-style reference range: zones + a marker at the reading. */
function ReadinessScale({ value }: { value: number }) {
  const t = useT()
  const zones = [
    { label: 'Building', width: 40, fill: 'bg-danger/20' },
    { label: 'On track', width: 30, fill: 'bg-warning/25' },
    { label: 'Exam-ready', width: 30, fill: 'bg-success/25' },
  ]
  const active = zoneOf(value).name
  const readinessStyle = { '--readiness-value': `${value}%` } as CSSProperties

  return (
    <div>
      <div className="relative pt-2.5">
        <div
          className="readiness-marker-fill absolute top-0 z-10 -translate-x-1/2"
          style={readinessStyle}
          aria-hidden
        >
          <svg width="9" height="6" viewBox="0 0 9 6" className="fill-ink">
            <path d="M4.5 6 0 0h9z" />
          </svg>
        </div>
        <div className="relative flex h-2.5 overflow-hidden rounded-full">
          {zones.map((z) => (
            <div key={z.label} className={z.fill} style={{ width: `${z.width}%` }} />
          ))}
          <span
            className="readiness-marker-fill absolute inset-y-0 w-0.5 -translate-x-1/2 rounded-full bg-ink"
            style={readinessStyle}
            aria-hidden
          />
        </div>
      </div>
      <div className="mt-1.5 flex text-[10px] leading-none">
        {zones.map((z) => (
          <span
            key={z.label}
            style={{ width: `${z.width}%` }}
            className={cn(
              'text-center',
              z.label === active ? 'font-semibold text-ink' : 'text-ink-3',
            )}
          >
            {t(z.label)}
          </span>
        ))}
      </div>
    </div>
  )
}

function RingReading({ value, label, tone = 'primary', compact = false }: { value: number; label: string; tone?: 'primary' | 'success'; compact?: boolean }) {
  const radius = 34
  const circumference = 2 * Math.PI * radius
  const targetOffset = circumference * (1 - value / 100)
  const color = tone === 'success' ? 'var(--color-success)' : 'var(--color-primary)'
  const ringStyle = {
    '--ring-circumference': circumference,
    '--ring-target-offset': targetOffset,
  } as CSSProperties

  return (
    <div className={cn('relative shrink-0', compact ? 'size-[6.5rem]' : 'size-[6.75rem]')} aria-label={`${value}% ${label}`}>
      <svg className="size-full -rotate-90" viewBox="0 0 84 84" aria-hidden>
        <circle cx="42" cy="42" r={radius} fill="none" stroke="var(--color-inset)" strokeWidth="7.5" />
        <circle
          className="metric-ring-fill"
          cx="42"
          cy="42"
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="7.5"
          strokeLinecap="round"
          strokeDasharray={circumference}
          style={ringStyle}
        />
      </svg>
      <div className="absolute inset-0 grid place-content-center text-center">
        <span className={cn('tnum font-mono font-semibold leading-none text-ink', compact ? 'text-[18px]' : 'text-[21px]')}>{value}%</span>
        <span className={cn('mt-1 font-medium text-ink-3', compact ? 'text-[10px]' : 'text-[11px]')}>{label}</span>
      </div>
    </div>
  )
}

function DualReading({ accuracy, used, detail, compact = false }: { accuracy: number; used: number; detail: string; compact?: boolean }) {
  const t = useT()
  return (
    <div>
      <div className={cn('grid grid-cols-[1fr_auto_1fr] items-center', compact ? 'gap-2' : 'gap-3 py-1')}>
        <div className="grid place-items-center">
          <RingReading value={accuracy} label={t('Correct')} tone="success" compact={compact} />
        </div>
        <div className={cn('w-px bg-line', compact ? 'h-16' : 'h-20')} aria-hidden />
        <div className="grid place-items-center">
          <RingReading value={used} label={t('Used')} compact={compact} />
        </div>
      </div>
      <p className={cn('text-center font-mono text-ink-3', compact ? 'mt-0.5 text-[9.5px] leading-none' : 'mt-2 text-[10.5px]')}>{detail}</p>
    </div>
  )
}

function StatBox({
  label,
  value,
  unit,
  sub,
  children,
  footer,
  compact = false,
}: {
  label: string
  value: string
  unit?: string
  sub: string
  children?: ReactNode
  footer?: ReactNode
  compact?: boolean
}) {
  return (
    <Panel className={cn('flex h-full min-w-0 flex-col', compact ? 'p-3' : 'p-4')}>
      <div className="flex items-start justify-between gap-2">
        <p className="text-[12.5px] font-medium text-ink-2">{label}</p>
        {footer}
      </div>
      {value && <div className={cn('flex items-baseline gap-1', compact ? 'mt-1' : 'mt-1.5')}>
        <span className={cn('tnum font-mono font-semibold leading-none tracking-tight text-ink', compact ? 'text-[27px]' : 'text-[32px]')}>{value}</span>
        {unit && <span className={cn('text-ink-3', compact ? 'text-[14px]' : 'text-[16px]')}>{unit}</span>}
      </div>}
      <p className={cn('text-ink-3', compact ? 'mt-0.5 text-[11px]' : 'mt-1.5 text-[12px]')}>{sub}</p>
      {children && <div className={compact ? 'mt-0' : 'mt-4'}>{children}</div>}
    </Panel>
  )
}

/**
 * How much of the curriculum the student has actually demonstrated.
 *
 * This replaced an "exam readiness" percentage that was a literal 68. A single
 * readiness figure needs an exam blueprint to weight topics and a cohort to
 * calibrate against, and this product has neither — so it is not recomputed,
 * it is dropped. Coverage is a claim the ledger can support: of the concepts
 * the curriculum defines, how many has this student been measured on, and how
 * did those go.
 */
export function ExamReadinessCard({ compact = false }: { compact?: boolean }) {
  const t = useT()
  const { ledger } = useMastery()
  const [graph] = usePersistentState<ConceptGraph>(CONCEPT_STORAGE_KEY, initialConceptGraph)

  const totalConcepts = graph.concepts.length
  const bands = useMemo(() => {
    const counts = { secure: 0, developing: 0, shaky: 0, practised: 0 }
    for (const concept of graph.concepts) {
      const band = masteryBand(ledger[concept.id])
      if (band !== 'unseen') counts[band] += 1
    }
    return counts
  }, [graph.concepts, ledger])

  const met = bands.secure + bands.developing + bands.shaky + bands.practised
  const coverage = totalConcepts ? Math.round((met / totalConcepts) * 100) : 0

  if (!totalConcepts) {
    return (
      <StatBox
        label={t('Curriculum coverage')}
        value=""
        sub={t('Coverage appears once your curriculum concepts are published.')}
        compact={compact}
      />
    )
  }

  const zone = zoneOf(coverage)
  return (
    <StatBox
      label={t('Curriculum coverage')}
      value={String(coverage)}
      unit="%"
      sub={met
        ? `${bands.secure} ${t('secure')} · ${bands.developing} ${t('developing')} · ${bands.shaky} ${t('shaky')}`
        : t('Answer some questions to start building this.')}
      footer={met ? <Badge tone={zone.tone}>{t(zone.name)}</Badge> : undefined}
      compact={compact}
    >
      <ReadinessScale value={coverage} />
    </StatBox>
  )
}

export function QuestionBankCard({ compact = false }: { compact?: boolean }) {
  const t = useT()
  const questions = usePublishedQuestions()
  const { totals } = useAttemptTotals()
  const history = useAttemptHistory()

  const qbankRecords = history.records.filter((record) => record.surface === 'qbank' || record.surface === 'room')
  const seen = distinctItems(qbankRecords)
  const bankTotal = questions.length
  const used = bankTotal ? Math.round((Math.min(seen, bankTotal) / bankTotal) * 100) : 0
  // First-attempt accuracy, because repeat accuracy mostly measures recall of
  // the answer rather than what the student knows.
  const firstAccuracy = firstAttemptSplit(qbankRecords).first.accuracy
  const thisWeek = dailyCounts(qbankRecords, 7).reduce((sum, day) => sum + day.attempts, 0)

  if (!bankTotal) {
    return <StatBox label={t('Question bank')} value="" sub={t('No questions have been published yet.')} compact={compact} />
  }

  return (
    <StatBox
      label={t('Question bank')}
      value=""
      sub={t('First attempt · whole bank')}
      footer={thisWeek > 0 ? (
        <span className="inline-flex items-center gap-1 text-[11.5px] font-medium text-success">
          <Icon icon={TrendingUp} size={13} />
          {thisWeek} {t('this week')}
        </span>
      ) : undefined}
      compact={compact}
    >
      <DualReading
        accuracy={firstAccuracy === null ? 0 : Math.round(firstAccuracy * 100)}
        used={used}
        detail={totals.attempts
          ? `${seen.toLocaleString()} / ${bankTotal.toLocaleString()} ${t('questions')}`
          : t('Not answered yet')}
        compact={compact}
      />
    </StatBox>
  )
}

export function PracticalSkillsCard({ compact = false }: { compact?: boolean }) {
  const t = useT()
  const { progress } = usePracticalProgress()
  const { osceStations, clinicalCases, labImaging } = useLivePracticals()

  const total = osceStations.length + clinicalCases.length + labImaging.length
  const attempted = Object.keys(progress.stations).length
    + Object.values(progress.cases).filter((entry) => entry.status !== 'not-started').length
    + Object.values(progress.labs).filter((entry) => entry.done > 0).length
  const skills = summariseSkills(progress, 0)

  if (!total) {
    return <StatBox label={t('Practical')} value="" sub={t('No practical items have been published yet.')} compact={compact} />
  }

  const stationRuns = Object.values(progress.stations)
  // The mean of each station's best share of its own marks. Self-scored, so it
  // is labelled "best score" rather than accuracy.
  const bestShare = stationRuns.length
    ? Math.round((stationRuns.reduce((sum, run) => sum + (run.outOf ? run.bestMarks / run.outOf : 0), 0) / stationRuns.length) * 100)
    : 0

  return (
    <StatBox
      label={t('Practical')}
      value=""
      sub={skills.ready ? `${skills.ready} ${t('skills marked ready')}` : t('Self-scored · your own mark scheme')}
      compact={compact}
    >
      <DualReading
        accuracy={bestShare}
        used={Math.round((attempted / total) * 100)}
        detail={attempted
          ? `${attempted} / ${total} ${t('items attempted')}`
          : t('Not started yet')}
        compact={compact}
      />
    </StatBox>
  )
}

/**
 * Written questions, marked the same way a practical station is: the student
 * ticks the key points they actually covered, and that ratio stands in for
 * accuracy. "Used" is how many of the published essays have been marked at
 * least once, not merely opened — an essay written but never checked has not
 * yet told the student anything about how they did.
 */
export function EssayCard({ compact = false }: { compact?: boolean }) {
  const t = useT()
  const essays = useLiveEssays()
  const { answers } = useEssayAnswers()

  const total = essays.length
  if (!total) {
    return <StatBox label={t('Essay')} value="" sub={t('No written questions have been published yet.')} compact={compact} />
  }

  let markedCount = 0
  let coverageSum = 0
  for (const essay of essays) {
    const covered = coveredCount(answers[essay.id]?.ticked ?? null, essay.keyPoints.map((point) => point.id))
    if (!covered) continue
    markedCount += 1
    coverageSum += covered.total ? covered.covered / covered.total : 0
  }
  const accuracy = markedCount ? Math.round((coverageSum / markedCount) * 100) : 0
  const used = Math.round((markedCount / total) * 100)

  return (
    <StatBox
      label={t('Essay')}
      value=""
      sub={markedCount ? t('Self-marked · key points covered') : t('Self-scored · your own mark scheme')}
      compact={compact}
    >
      <DualReading
        accuracy={accuracy}
        used={used}
        detail={markedCount ? `${markedCount} / ${total} ${t('marked')}` : t('Not marked yet')}
        compact={compact}
      />
    </StatBox>
  )
}

export function ProgressTrio({ layout = 'row' }: { layout?: 'row' | 'stacked' }) {
  const compact = layout === 'stacked'

  return (
    <div className={cn('grid gap-4', compact ? 'h-full grid-rows-3' : 'sm:grid-cols-3')}>
      <ExamReadinessCard compact={compact} />

      <QuestionBankCard compact={compact} />

      <PracticalSkillsCard compact={compact} />
    </div>
  )
}
