import { ContentSkeleton } from '@/components/loading/PageSkeleton'
import { LoadingRegion, SkeletonRows } from '@/components/loading/SkeletonParts'
import { useEffect, useMemo, useState } from 'react'
import {
  Award, BarChart3, Brain, ClipboardCheck, Clock3, Highlighter, Hourglass, Layers, ListChecks, Medal,
  Percent, RotateCcw, ShieldQuestion, Table2, Timer, TrendingDown, TrendingUp, Users,
} from 'lucide-react'
import { useSubjectName } from '@/lib/useSubjectName'
import {
  accuracyOf, byDifficulty, bySubject, bySurface, currentStreak, distinctItems,
  firstAttemptSplit, hourHistogram, marked, medianSeconds, weakest,
} from '@/data/attemptStats'
import { averageSecondsPerQuestion, percentileStanding } from '@/data/performanceStats'
import type { AttemptRecord } from '@/data/attempts'
import { masteryBand } from '@/data/mastery'
import { useMastery } from '@/lib/useMastery'
import { PageContainer, PageHeader } from '@/components/shell/Page'
import { ConceptMasteryPanel } from '@/components/performance/ConceptMastery'
import { SourceCoveragePanel } from '@/components/performance/SourceCoverage'
import { SessionLedgerPanel } from '@/components/performance/SessionLedger'
import { Panel, PanelHeader } from '@/components/ui/Panel'
import { Skeleton } from '@/components/ui/Skeleton'
import { Meter } from '@/components/ui/Meter'
import { BarList } from '@/components/charts/BarList'
import { SubjectDot } from '@/components/ui/Subject'
import { Icon } from '@/components/ui/Icon'
import { EmptyState } from '@/components/ui/EmptyState'
import { Badge } from '@/components/ui/Badge'
import { ButtonLink } from '@/components/ui/Button'
import { ComingSoonBanner } from '@/components/hub'
import { Table, Td, Th, Tr } from '@/components/ui/Table'
import { useT } from '@/lib/i18n'
import { Segmented, Tabs } from '@/components/ui/Tabs'
import { useAttemptHistory } from '@/lib/useAttemptLog'
import { usePersistentState } from '@/lib/usePersistentState'
import { QUESTION_HIGHLIGHTS_STORAGE_KEY, type QuestionHighlightStore } from '@/data/questionHighlights'
import { analyzeHighlightBehavior, classifyAnswerChanges, flattenHighlightStore } from '@/data/studyTracking'
import { useMaristanas } from '@/lib/useMaristanas'
import { formatMinutes, formatTimeString } from '@/lib/format'
import { cn } from '@/lib/cn'
import { API_MODE, apiGet } from '@/lib/api'
import { ExamReadinessCard } from '@/components/dashboard/ProgressTrio'
import { PerformanceOverview } from '@/components/dashboard/PerformanceOverview'
import { demoLeaderboard } from '@/data/demoPreview'

/** Window the study-time and pace metrics below are averaged over. */
const STUDY_WINDOW_DAYS = 7

/**
 * Marked answers needed before this page reports anything.
 *
 * Below this, every panel is a percentage computed from a handful of items and
 * will swing wildly on one wrong answer. Saying "not yet" is more useful than
 * a chart that means nothing.
 */
const MIN_MARKED = 20

/** Marked answers a subject needs before its own row is worth showing. */
const MIN_PER_SUBJECT = 3

type PerformanceView = 'personal' | 'leaders'
type LeaderboardMetric = 'accuracy' | 'mastery'

interface LeaderboardRow {
  rank: number
  username: string
  profileIcon: string | null
  accuracy?: number
  verifiedAnswers?: number
  securedConcepts?: number
  lastVerifiedAt?: string | null
}

interface LeaderboardResponse {
  rows: LeaderboardRow[]
  scope?: { university?: string; year?: string; term?: string }
  viewer?: {
    eligible: boolean
    verifiedAnswers?: number
    requiredAnswers?: number
    rank?: number | null
    total?: number
    securedConcepts?: number
  }
}

// Keyed loosely, so nothing here fails to compile when a surface is added —
// only the row goes out untranslated. Add the label with the surface.
const SURFACE_LABEL: Record<string, string> = {
  qbank: 'Question bank',
  essay: 'Written questions',
  room: 'Shared tests',
  case: 'Clinical cases',
  lab: 'Lab & imaging',
  station: 'OSCE stations',
  card: 'Flashcards',
}

function KpiTile({ icon, value, label, sub, tone, highlight }: { icon: typeof Timer; value: string; label: string; sub?: string; tone?: string; highlight?: boolean }) {
  return (
    <Panel className={cn('p-4', highlight && 'border-primary-line bg-primary-tint/25')}>
      <div className="flex items-center gap-2 text-ink-3">
        <Icon icon={icon} size={15} className={highlight ? 'text-primary' : undefined} />
        <p className="text-[12px] font-medium text-ink-2">{label}</p>
      </div>
      <p className={cn('tnum mt-2 font-mono text-[27px] font-semibold leading-none', tone ?? 'text-ink')}>{value}</p>
      {sub && <p className="mt-1.5 text-[11.5px] text-ink-3">{sub}</p>}
    </Panel>
  )
}

/**
 * When answers actually get committed, by hour.
 *
 * Counts answers, not minutes. Nothing in this app measures reading time, and
 * the previous version's three 24-element "minutes recorded" arrays were
 * literals — there was no recording behind them.
 */
function WhenYouStudy({ records }: { records: AttemptRecord[] }) {
  const t = useT()
  const [range, setRange] = useState<'week' | 'month' | 'all'>('week')

  const windowed = useMemo(() => {
    if (range === 'all') return records
    const days = range === 'week' ? 7 : 30
    const cutoff = Date.now() - days * 86_400_000
    return records.filter((record) => new Date(record.at).getTime() >= cutoff)
  }, [range, records])

  const hours = useMemo(() => hourHistogram(windowed), [windowed])
  const peak = Math.max(1, ...hours)

  return (
    <Panel>
      <PanelHeader
        title={t('When you study')}
        icon={Clock3}
        hint={t('What time of day you answer questions')}
        action={<Segmented value={range} onChange={(value) => setRange(value as typeof range)} items={[{ value: 'week', label: t('Week') }, { value: 'month', label: t('Month') }, { value: 'all', label: t('All') }]} />}
      />
      <div className="p-5">
        {windowed.length === 0 ? (
          <p className="py-10 text-center text-[13px] text-ink-3">{t('Nothing answered in this window.')}</p>
        ) : (
          <>
            <div className="flex h-44 items-end gap-1 border-b border-line-2">
              {hours.map((value, hour) => (
                <div key={hour} className="group relative flex h-full flex-1 items-end focus-visible:outline-none" tabIndex={0} role="img" aria-label={`${value} ${t('answers')} · ${formatTimeString(`${String(hour).padStart(2, '0')}:00`)}`}>
                  <div className="w-full rounded-t-[3px] bg-primary/75 transition-colors group-hover:bg-primary group-focus:bg-primary" style={{ height: `${(value / peak) * 100}%` }} />
                  <span className="pointer-events-none absolute bottom-[calc(100%+0.35rem)] left-1/2 z-10 hidden -translate-x-1/2 whitespace-nowrap rounded border border-line bg-surface px-2 py-1 font-mono text-[10px] text-ink shadow-raised group-hover:block group-focus:block">{value} · {formatTimeString(`${String(hour).padStart(2, '0')}:00`)}</span>
                </div>
              ))}
            </div>
            <div className="mt-2 flex justify-between font-mono text-[10px] text-ink-3"><span>12:00 AM</span><span>6:00 AM</span><span>12:00 PM</span><span>6:00 PM</span><span>11:00 PM</span></div>
          </>
        )}
      </div>
    </Panel>
  )
}

const RANK_TONE: Record<number, { badge: string; row: string }> = {
  1: { badge: 'border-warning/40 bg-warning-tint text-warning', row: 'bg-warning-tint/25' },
  2: { badge: 'border-primary-line bg-primary-tint text-primary-strong', row: '' },
  3: { badge: 'border-accent-line bg-accent-tint text-accent-strong', row: '' },
}

/**
 * The student's own place relative to this board. The headline number
 * (secured concepts, or accuracy) still comes from data the page already
 * has — mastery reads the local concept ledger, accuracy reads the local
 * attempt log — but the eligibility gate, cohort rank, and cohort size are
 * real figures returned by the leaderboard endpoint itself (`viewer.rank`
 * and `viewer.total`, computed server-side over the full ranked cohort
 * before it is sliced to the visible rows).
 */
function YourStanding({ metric, viewer, records }: {
  metric: LeaderboardMetric
  viewer: LeaderboardResponse['viewer']
  records: AttemptRecord[]
}) {
  const t = useT()
  const { ledger } = useMastery()
  const securedConcepts = useMemo(
    () => Object.values(ledger).filter((entry) => masteryBand(entry) === 'secure').length,
    [ledger],
  )
  const accuracy = accuracyOf(records)
  const own = metric === 'mastery'
    ? securedConcepts
    : (accuracy == null ? null : Math.round(accuracy * 100))
  const eligible = viewer?.eligible ?? false
  const verified = viewer?.verifiedAnswers ?? 0
  const required = viewer?.requiredAnswers ?? 100
  const rank = viewer?.rank ?? null
  const total = viewer?.total ?? 0
  const hasRank = eligible && typeof rank === 'number' && total > 0

  return (
    <Panel className={cn('p-4', eligible ? 'border-success/25 bg-success-tint/20' : 'border-primary-line bg-primary-tint/25')}>
      <div className="flex items-center justify-between gap-2">
        <p className={cn('text-[10.5px] font-semibold uppercase tracking-[0.08em]', eligible ? 'text-success' : 'text-primary-strong')}>
          {eligible ? t('Your standing') : t('Your standing — still private')}
        </p>
        {hasRank && (
          <Badge tone="success" className="tnum font-mono">
            #{rank} {t('of')} {total}
          </Badge>
        )}
      </div>
      <div className="mt-2.5 flex items-center gap-3">
        <span className={cn('grid size-10 shrink-0 place-items-center rounded-full border', eligible ? 'border-success/30 bg-surface text-success' : 'border-primary-line bg-surface text-primary-strong')}>
          <Icon icon={metric === 'mastery' ? ShieldQuestion : ClipboardCheck} size={17} />
        </span>
        <div>
          <p className="tnum font-mono text-[17px] font-semibold text-ink">
            {own == null ? '—' : metric === 'mastery' ? own : `${own}%`}
          </p>
          <p className="text-[11px] text-ink-3">{metric === 'mastery' ? t('secured concepts, on your own log') : t('overall accuracy, on your own log')}</p>
        </div>
      </div>
      {hasRank && (
        <p className="mt-2 text-[12px] font-medium text-ink-2">
          {t("You're")} <span className="tnum font-mono font-semibold text-ink">#{rank}</span> {t('of')}{' '}
          <span className="tnum font-mono font-semibold text-ink">{total}</span> {t('in your cohort.')}
        </p>
      )}

      <div className="mt-3.5">
        <div className="flex items-center justify-between text-[11px] text-ink-2">
          <span>{t('Eligibility — verified answers this term')}</span>
          <span className="tnum font-mono font-semibold">{verified} / {required}</span>
        </div>
        <Meter value={verified} max={required} tone={eligible ? 'success' : 'primary'} target className="mt-1.5" />
        {!eligible && (
          <p className="mt-1.5 text-[11px] leading-relaxed text-ink-3">
            {Math.max(0, required - verified)} {t('more verified answers and you join the board — shared tests and readiness assessments count.')}
          </p>
        )}
      </div>

      <ButtonLink to="/app/study-together" size="sm" variant={eligible ? 'secondary' : 'primary'} className="mt-3.5 w-full justify-center">
        {t('Open shared tests')}
      </ButtonLink>
    </Panel>
  )
}

function HowThisBoardWorks() {
  const t = useT()
  const points = [
    t('Scoped to your university, year, and term — never a global board.'),
    t('“Secured concepts” comes from the mastery model, not raw volume — grinding easy questions does not climb it.'),
    t('Only server-verified answers count, so solo self-scored work cannot inflate a position.'),
    t('Personal stats elsewhere on this page never show a percentile; comparison lives only here, on verified data.'),
  ]
  return (
    <Panel className="flex-1 p-4">
      <p className="text-[10.5px] font-semibold uppercase tracking-[0.08em] text-ink-3">{t('How this board works')}</p>
      <ul className="mt-2.5 space-y-2">
        {points.map((point) => (
          <li key={point} className="flex gap-2 text-[12px] leading-relaxed text-ink-2">
            <span className="mt-1.5 size-1 shrink-0 rounded-full bg-primary" aria-hidden />
            {point}
          </li>
        ))}
      </ul>
    </Panel>
  )
}

function TopPerformers({ records }: { records: AttemptRecord[] }) {
  const t = useT()
  const [metric, setMetric] = useState<LeaderboardMetric>('mastery')
  const [data, setData] = useState<LeaderboardResponse | null>(null)
  const [loading, setLoading] = useState(API_MODE)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    let alive = true
    if (!API_MODE) {
      setData(demoLeaderboard(metric))
      setLoading(false)
      setFailed(false)
      return () => { alive = false }
    }
    setLoading(true)
    setFailed(false)
    apiGet<LeaderboardResponse>(`/leaderboards?metric=${metric}`)
      .then((next) => { if (alive) setData(next) })
      .catch(() => { if (alive) { setData(null); setFailed(true) } })
      .finally(() => { if (alive) setLoading(false) })
    return () => { alive = false }
  }, [metric])

  const rows = data?.rows ?? []
  return (
    <div className="grid gap-4 lg:grid-cols-[1.6fr_1fr]">
      <Panel className="lg:min-w-0">
        <PanelHeader
          title={t('This term’s top performers')}
          icon={Award}
          hint={t('Your university, year, and current term')}
          action={(
            <Segmented
              value={metric}
              onChange={(value) => setMetric(value as LeaderboardMetric)}
              items={[
                { value: 'mastery', label: t('Concepts mastered') },
                { value: 'accuracy', label: t('% correct') },
              ]}
            />
          )}
        />
        <div className="border-b border-line bg-surface-2/40 px-4 py-3 text-[12px] leading-relaxed text-ink-2 sm:px-5">
          {!API_MODE && <Badge tone="primary" dot className="mb-2">{t('Demo cohort preview')}</Badge>}
          {data?.scope && (
            <p className="mb-1 font-medium text-ink">
              {[data.scope.university, data.scope.year, data.scope.term].filter(Boolean).join(' · ')}
            </p>
          )}
          {metric === 'mastery'
            ? t('A concept counts as secured after at least three marked attempts at 80% accuracy or better. This rewards breadth of reliable knowledge, not answer volume alone.')
            : t('Accuracy includes students with at least 100 server-verified answers this term. Ties are resolved by evidence volume, then recent verified activity.')}
        </div>

        {loading ? (
          <LoadingRegion label={t('Loading leaderboard')}><SkeletonRows rows={5} /></LoadingRegion>
        ) : failed ? (
          <div className="p-10"><EmptyState icon={Users} title={t('Leaderboard unavailable')} description={t('The verified ranking could not be loaded. Your private performance data has not been substituted.')}/></div>
        ) : rows.length === 0 ? (
          <div className="p-10"><EmptyState icon={Users} title={t('No eligible performers yet')} description={API_MODE ? t('The board appears once students in this university and year have enough verified evidence.') : t('Public rankings require the connected server. Demo and historical client-only attempts remain private.')}/></div>
        ) : (
          <Table>
            <thead><Tr><Th className="w-14">{t('Rank')}</Th><Th>{t('Student')}</Th><Th align="end">{metric === 'mastery' ? t('Secured concepts') : t('Accuracy')}</Th><Th align="end" className="pr-4">{t('Evidence')}</Th></Tr></thead>
            <tbody>
              {rows.map((row) => {
                const tone = RANK_TONE[row.rank]
                return (
                  <Tr key={`${row.rank}-${row.username}`} hover className={tone?.row}>
                    <Td>
                      <span className={cn('tnum inline-flex size-7 items-center justify-center rounded-full border font-mono text-[12px] font-semibold', tone ? tone.badge : 'border-transparent bg-inset text-ink-2')}>
                        {row.rank <= 3 ? <Icon icon={row.rank === 1 ? Medal : Award} size={14} /> : row.rank}
                      </span>
                    </Td>
                    <Td>
                      <span className="inline-flex items-center gap-2.5 font-medium text-ink">
                        {row.profileIcon ? <img src={row.profileIcon} alt="" className="size-8 rounded-full border border-line bg-inset object-cover" /> : <span className="grid size-8 place-items-center rounded-full bg-inset text-[11px] font-bold uppercase text-ink-2">{row.username.slice(0, 2)}</span>}
                        @{row.username}
                      </span>
                    </Td>
                    <Td align="end" className="tnum font-mono font-semibold text-ink">
                      {metric === 'mastery' ? (row.securedConcepts ?? 0) : `${Math.round((row.accuracy ?? 0) * 100)}%`}
                    </Td>
                    <Td align="end" className="tnum pr-4 font-mono text-ink-3">
                      {row.verifiedAnswers ?? '—'}
                    </Td>
                  </Tr>
                )
              })}
            </tbody>
          </Table>
        )}
        <p className="border-t border-line px-4 py-2.5 text-[11px] text-ink-3 sm:px-5">
          {t('Rankings count only server-verified answers — solo self-scored work cannot inflate them.')}
        </p>
      </Panel>

      <div className="flex flex-col gap-4">
        <YourStanding metric={metric} viewer={data?.viewer} records={records} />
        <HowThisBoardWorks />
      </div>
    </div>
  )
}

/**
 * How the student's own accuracy sits against ranked peers.
 *
 * The "no cohort aggregate exists anywhere in this product" era is over:
 * `/api/leaderboards` now publishes real peer accuracy for students with at
 * least 100 server-verified answers in the same university, year and current
 * term — the same feed `TopPerformers` already reads. This panel asks the
 * same feed for a percentile instead of a rank list. When nobody in the
 * cohort has enough verified evidence yet, or the feed cannot be reached,
 * this renders a plain "not available" state rather than a guessed number —
 * a percentile against zero peers is not a percentile.
 */
function PeerStandingPanel({ records }: { records: AttemptRecord[] }) {
  const t = useT()
  const overall = accuracyOf(records)
  const [cohort, setCohort] = useState<LeaderboardResponse | null>(null)
  const [loading, setLoading] = useState(API_MODE)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    let alive = true
    if (!API_MODE) {
      setCohort(demoLeaderboard('accuracy'))
      setLoading(false)
      setFailed(false)
      return () => { alive = false }
    }
    setLoading(true)
    setFailed(false)
    apiGet<LeaderboardResponse>('/leaderboards?metric=accuracy')
      .then((next) => { if (alive) setCohort(next) })
      .catch(() => { if (alive) { setCohort(null); setFailed(true) } })
      .finally(() => { if (alive) setLoading(false) })
    return () => { alive = false }
  }, [])

  const peerAccuracies = (cohort?.rows ?? [])
    .map((row) => row.accuracy)
    .filter((value): value is number => typeof value === 'number')
  const standing = overall === null ? null : percentileStanding(overall, peerAccuracies)
  const yourPct = overall === null ? null : Math.round(overall * 100)

  return (
    <Panel>
      <PanelHeader title={t('How you compare')} icon={Percent} hint={t('Your accuracy next to other students in your year')} />
      <div className="p-5">
        {!API_MODE && <Badge tone="primary" dot className="mb-3">{t('Demo cohort preview')}</Badge>}
        {loading ? (
          <Skeleton className="h-28" />
        ) : failed ? (
          <EmptyState icon={Percent} title={t('Standing unavailable')} description={t('The peer ranking could not be loaded. Your private performance data has not been substituted.')} />
        ) : !standing || yourPct === null ? (
          <EmptyState
            icon={Percent}
            title={t('Needs cohort data')}
            description={t('Nobody in your university, year and current term has enough server-verified answers yet to compare against. This fills in once ranked peers exist.')}
          />
        ) : (
          <>
            <p className="text-[13px] text-ink-2">
              {t('You are more accurate than')} <span className="font-mono font-semibold text-primary-strong">{standing.percentile}%</span> {t('of ranked students in your year.')}
            </p>
            <div className="mt-4">
              <Meter value={yourPct} max={100} tone="primary" ticks />
              <div className="mt-1.5 flex justify-between font-mono text-[10.5px] text-ink-3">
                <span>{t('You')} · {yourPct}%</span>
                <span>{t('Class average')} · {Math.round(standing.peerMedian * 100)}%</span>
              </div>
            </div>
            <p className="mt-4 border-t border-line pt-3 text-[11.5px] leading-relaxed text-ink-3">
              {t('Compared with')} {standing.peerCount} {t('students in your university and year who have answered at least 100 checked questions this term.')}
            </p>
          </>
        )}
      </div>
    </Panel>
  )
}

/**
 * Average daily study time, split into reading and solving.
 *
 * All three figures are real, measured the same way: the Build Maristanas
 * minute ledger records one active minute at a time and tags it with the
 * surface the student was on. Reading is the reader, library and glossary;
 * solving is the Question Bank and the other answer-and-do surfaces; "other"
 * is everything else (notebook, whiteboard, flashcards). No estimate — each
 * bucket is a straight count of tagged minutes over the last week.
 */
/**
 * Your own study habits, from the two signals the admin console also tracks:
 * how your answer to a re-attempted question moves, and whether your Question
 * Bank highlights land on the reasoning. Both are computed with the same
 * `studyTracking` functions the admin view uses, but only over your own data.
 */
function StudentActivityPanel({ records }: { records: AttemptRecord[] }) {
  const t = useT()
  const [highlightStore] = usePersistentState<QuestionHighlightStore>(QUESTION_HIGHLIGHTS_STORAGE_KEY, {})
  const changes = useMemo(() => classifyAnswerChanges(records), [records])
  const highlights = useMemo(() => analyzeHighlightBehavior(flattenHighlightStore(highlightStore)), [highlightStore])

  const focusCopy = highlights.focusLabel === 'focused' ? t('You highlight the reasoning — the explanation and rationale. Keep it up.')
    : highlights.focusLabel === 'mixed' ? t('Your highlights are a mix of the reasoning and the scenario. Leaning into the explanation and rationale pays off most.')
      : highlights.focusLabel === 'sporadic' ? t('Your highlights scatter across the scenario and options. Try marking the explanation and rationale — the "why" — instead.')
        : t('Highlight the key points inside a question and a read on your habit appears here.')

  return (
    <Panel>
      <PanelHeader title={t('Your study habits')} icon={RotateCcw} hint={t('How you change answers and what you highlight')} />
      <div className="grid gap-4 p-5 sm:grid-cols-2">
        <div className="rounded-lg border border-line bg-surface-2/40 p-4">
          <p className="text-[12px] font-semibold text-ink-2">{t('When you re-answer a question')}</p>
          <p className="mt-1 text-[12px] text-ink-3">
            {changes.itemsWithRepeatedAttempts} {changes.itemsWithRepeatedAttempts === 1 ? t('question re-attempted') : t('questions re-attempted')} · {changes.totalTransitions} {changes.totalTransitions === 1 ? t('change') : t('changes')}
          </p>
          <ul className="mt-3 space-y-2 text-[12.5px] text-ink">
            <li className="flex items-center gap-2">
              <TrendingUp className="size-3.5 shrink-0 text-success" />
              <span className="flex-1 text-ink-2">{t('Wrong, then right')}</span>
              <span className="tnum font-mono font-semibold">{changes.counts.incorrectToCorrect}</span>
            </li>
            <li className="flex items-center gap-2">
              <TrendingDown className="size-3.5 shrink-0 text-danger" />
              <span className="flex-1 text-ink-2">{t('Right, then wrong')}</span>
              <span className="tnum font-mono font-semibold">{changes.counts.correctToIncorrect}</span>
            </li>
            <li className="flex items-center gap-2">
              <RotateCcw className="size-3.5 shrink-0 text-warning" />
              <span className="flex-1 text-ink-2">{t('Wrong both times')}</span>
              <span className="tnum font-mono font-semibold">{changes.counts.incorrectToIncorrect}</span>
            </li>
          </ul>
          {changes.totalTransitions === 0 && (
            <p className="mt-3 text-[11.5px] text-ink-3">{t('Re-attempt a question you have answered before to see how your answer moves.')}</p>
          )}
        </div>

        <div className="rounded-lg border border-line bg-surface-2/40 p-4">
          <div className="flex items-center justify-between gap-2">
            <p className="text-[12px] font-semibold text-ink-2">{t('How you highlight')}</p>
            <Badge tone={highlights.focusLabel === 'focused' ? 'success' : highlights.focusLabel === 'sporadic' ? 'warning' : 'neutral'} dot>
              {highlights.focusLabel === 'focused' ? t('Focused on reasoning')
                : highlights.focusLabel === 'mixed' ? t('Mixed')
                  : highlights.focusLabel === 'sporadic' ? t('Sporadic')
                    : t('No highlights yet')}
            </Badge>
          </div>
          <ul className="mt-3 space-y-2 text-[12.5px] text-ink">
            <li className="flex items-center gap-2">
              <Highlighter className="size-3.5 shrink-0 text-ink-3" />
              <span className="flex-1 text-ink-2">{t('On the explanation or rationale')}</span>
              <span className="tnum font-mono font-semibold">{Math.round(highlights.keyBlockShare * 100)}%</span>
            </li>
            <li className="flex items-center gap-2">
              <ListChecks className="size-3.5 shrink-0 text-ink-3" />
              <span className="flex-1 text-ink-2">{t('Highlights per question')}</span>
              <span className="tnum font-mono font-semibold">{highlights.highlightsPerQuestion.toFixed(1)}</span>
            </li>
          </ul>
          <p className="mt-3 text-[11.5px] leading-relaxed text-ink-3">{focusCopy}</p>
        </div>
      </div>
    </Panel>
  )
}

function StudyTimePanel() {
  const t = useT()
  const { data, loading, error } = useMaristanas()

  const perDay = (minutes: number | undefined): string | null =>
    minutes === undefined ? null : formatMinutes(Math.round(minutes / STUDY_WINDOW_DAYS))

  const studyingLabel = data ? formatMinutes(Math.round(data.thisWeek.studyMinutes / STUDY_WINDOW_DAYS)) : null
  const readingLabel = perDay(data?.thisWeek.reading)
  const solvingLabel = perDay(data?.thisWeek.solving)
  const otherLabel = perDay(data?.thisWeek.other)

  return (
    <Panel>
      <PanelHeader title={t('Average time studying')} icon={Clock3} hint={`${t('Per day, last')} ${STUDY_WINDOW_DAYS} ${t('days')}`} />
      <div className="p-5">
        {!API_MODE && <Badge tone="primary" dot className="mb-3">{t('Demo figures')}</Badge>}
        {loading ? (
          <div className="h-28 animate-pulse rounded-lg bg-inset motion-reduce:animate-none" />
        ) : (
          <>
            <div className="flex items-baseline gap-2">
              <p className="tnum font-mono text-[27px] font-semibold text-ink">{studyingLabel ?? '—'}</p>
              <span className="text-[12px] text-ink-3">{t('per day, all study surfaces')}</span>
            </div>
            {(error || studyingLabel === null) && (
              <p className="mt-1 text-[11.5px] text-ink-3">{t('Total active-study time needs the server connection and has not loaded.')}</p>
            )}
            <div className="mt-4 grid grid-cols-3 gap-3">
              <div className="rounded-lg border border-line bg-surface-2/40 p-3">
                <p className="text-[11.5px] font-medium text-ink-2">{t('Reading')}</p>
                <p className="tnum mt-1 font-mono text-[18px] font-semibold text-ink">{readingLabel ?? '—'}</p>
              </div>
              <div className="rounded-lg border border-line bg-surface-2/40 p-3">
                <p className="text-[11.5px] font-medium text-ink-2">{t('Solving')}</p>
                <p className="tnum mt-1 font-mono text-[18px] font-semibold text-ink">{solvingLabel ?? '—'}</p>
              </div>
              <div className="rounded-lg border border-line bg-surface-2/40 p-3">
                <p className="text-[11.5px] font-medium text-ink-2">{t('Other study')}</p>
                <p className="tnum mt-1 font-mono text-[18px] font-semibold text-ink">{otherLabel ?? '—'}</p>
              </div>
            </div>
            <p className="mt-4 border-t border-line pt-3 text-[11.5px] leading-relaxed text-ink-3">
              {t('Reading is the reader, library and glossary. Solving is the Question Bank and other answer-and-do activities. Other is notebook, whiteboard and flashcards. Each counts your active minutes over the last week.')}
            </p>
          </>
        )}
      </div>
    </Panel>
  )
}

/**
 * The student's own record, and only their own record.
 *
 * The year-over-year cohort literals this page once showed are still gone —
 * see the panels above for how a percentile and a study-time comparison are
 * built honestly instead, from feeds that did not exist when those literals
 * were removed. Everything below them is still derived only from the attempt
 * log and the concept mastery ledger.
 */
export function Performance() {
  const t = useT()
  const subjectName = useSubjectName()
  const [view, setView] = useState<PerformanceView>('personal')
  const { records, loading } = useAttemptHistory()

  const scored = useMemo(() => marked(records), [records])
  const subjects = useMemo(
    () => bySubject(records).filter((row) => row.marked >= MIN_PER_SUBJECT),
    [records],
  )
  const split = useMemo(() => firstAttemptSplit(records), [records])
  const difficulties = useMemo(() => byDifficulty(records), [records])
  const surfaces = useMemo(() => bySurface(records), [records])
  const practiceBySubject = useMemo(() => bySubject(records), [records])
  const overall = accuracyOf(records)
  const median = medianSeconds(records)
  const average = averageSecondsPerQuestion(records)

  const header = (
    <>
      <PageHeader title={t('My Analytics')} back={{ fallback: '/app' }} />
      {/* Inside `header`, so every branch below — leaders, loading, too few
          answers, the full page — says the same thing about being a preview. */}
      <ComingSoonBanner
        icon={TrendingUp}
        body="This is your own study record — how much you have done and how well it is going. It is still a preview, and the numbers fill in as you answer more questions."
      />
      <Tabs
        className="mb-4"
        value={view}
        onChange={(value) => setView(value as PerformanceView)}
        items={[
          { value: 'personal', label: t('My progress'), icon: TrendingUp },
          { value: 'leaders', label: t('Class leaders'), icon: Award },
        ]}
      />
    </>
  )

  if (view === 'leaders') {
    return <PageContainer>{header}<TopPerformers records={records} /></PageContainer>
  }

  if (loading) {
    return (
      <PageContainer>
        {header}
        <ContentSkeleton shape="performance" />
      </PageContainer>
    )
  }

  if (scored.length < MIN_MARKED) {
    return (
      <PageContainer>
        {header}
        <div className="space-y-4">
          <div className="grid gap-4 lg:grid-cols-2">
            <ExamReadinessCard />
            <PerformanceOverview />
          </div>
          <Panel className="p-10">
            <EmptyState
              icon={TrendingUp}
              title={t('Not enough answers yet')}
              description={`${t('This page uses answers you have graded yourself. It needs at least')} ${MIN_MARKED} ${t('for the numbers to mean anything — you have')} ${scored.length}.`}
            />
          </Panel>
          <ConceptMasteryPanel />
          <SourceCoveragePanel records={records} />
          <SessionLedgerPanel records={records} />
        </div>
      </PageContainer>
    )
  }

  return (
    <PageContainer>
      {header}

      <div className="space-y-4">
        <div className="grid gap-4 lg:grid-cols-2">
          <ExamReadinessCard />
          <PerformanceOverview />
        </div>
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-5">
          <KpiTile
            icon={TrendingUp}
            value={overall === null ? '—' : `${Math.round(overall * 100)}%`}
            label={t('How often you are right')}
            sub={`${t('across')} ${scored.length} ${t('graded answers')}`}
            tone="text-primary-strong"
            highlight
          />
          <KpiTile
            icon={ListChecks}
            value={split.first.accuracy === null ? '—' : `${Math.round(split.first.accuracy * 100)}%`}
            label={t('Right on the first try')}
            sub={split.repeat.accuracy === null
              ? t('No retries yet')
              : `${Math.round(split.repeat.accuracy * 100)}% ${t('when you retried')}`}
          />
          <KpiTile
            icon={Layers}
            value={distinctItems(records).toLocaleString()}
            label={t('Different questions tried')}
            sub={`${records.length.toLocaleString()} ${t('tries in total')}`}
          />
          <KpiTile
            icon={Timer}
            value={median === null ? '—' : `${median}s`}
            label={t('Usual time per question')}
            sub={median === null ? t('No timed sessions yet') : `${currentStreak(records)}-${t('day streak')}`}
          />
          <KpiTile
            icon={Hourglass}
            value={average === null ? '—' : `${average}s`}
            label={t('Average time per question')}
            sub={t('Across all timed questions')}
          />
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <PeerStandingPanel records={records} />
          <StudyTimePanel />
        </div>

        <StudentActivityPanel records={records} />

        <SessionLedgerPanel records={records} />

        <ConceptMasteryPanel />
        <SourceCoveragePanel records={records} />

        <Panel>
          <PanelHeader title={t('How you do in each subject')} icon={Table2} hint={`${t('Subjects where you have graded at least')} ${MIN_PER_SUBJECT} ${t('answers')}`} />
          {subjects.length === 0 ? (
            <p className="p-8 text-center text-[13px] text-ink-3">{t('No subject has enough marked answers to report on yet.')}</p>
          ) : (
            <Table>
              <thead><Tr><Th>{t('Subject')}</Th><Th align="end">{t('Attempts')}</Th><Th align="end">{t('Marked')}</Th><Th align="end">{t('Correct')}</Th><Th align="end" className="pr-4">{t('Accuracy')}</Th></Tr></thead>
              <tbody>
                {[...subjects].sort((a, b) => (b.accuracy ?? 0) - (a.accuracy ?? 0)).map((row) => {
                  const pct = row.accuracy === null ? null : Math.round(row.accuracy * 100)
                  return (
                    <Tr key={row.key} hover>
                      <Td><span className="inline-flex items-center gap-2"><SubjectDot id={row.key} />{subjectName(row.key)}</span></Td>
                      <Td align="end" className="font-mono text-ink-2">{row.attempts}</Td>
                      <Td align="end" className="font-mono text-ink-2">{row.marked}</Td>
                      <Td align="end" className="font-mono text-ink-2">{row.correct}</Td>
                      <Td align="end" className="pr-4"><span className={cn('font-mono font-semibold', pct !== null && pct < 60 ? 'text-danger' : pct !== null && pct < 80 ? 'text-warning' : 'text-success')}>{pct === null ? '—' : `${pct}%`}</span></Td>
                    </Tr>
                  )
                })}
              </tbody>
            </Table>
          )}
        </Panel>

        <div className="grid gap-4 lg:grid-cols-2">
          <Panel>
            <PanelHeader title={t('What to work on')} icon={Brain} hint={t('Your weakest subjects first')} />
            <div className="p-5">
              {weakest(subjects, MIN_PER_SUBJECT, 6).length === 0 ? (
                <p className="py-8 text-center text-[13px] text-ink-3">{t('Nothing stands out as a weakness yet.')}</p>
              ) : (
                <BarList data={weakest(subjects, MIN_PER_SUBJECT, 6).map((row) => {
                  const pct = Math.round((row.accuracy ?? 0) * 100)
                  return {
                    key: row.key,
                    value: pct,
                    valueLabel: `${pct}%`,
                    color: pct < 62 ? 'var(--color-danger)' : 'var(--color-warning)',
                    label: <span className="inline-flex items-center gap-1.5"><SubjectDot id={row.key} />{subjectName(row.key)}</span>,
                  }
                })} />
              )}
            </div>
          </Panel>

          <Panel>
            <PanelHeader title={t('How you do by difficulty')} icon={ListChecks} hint={t('Easy, medium and hard questions')} />
            <div className="p-5">
              {difficulties.filter((row) => row.marked > 0).length === 0 ? (
                <p className="py-8 text-center text-[13px] text-ink-3">{t('No marked answers yet.')}</p>
              ) : (
                <BarList data={difficulties.filter((row) => row.marked > 0).map((row) => {
                  const pct = Math.round((row.accuracy ?? 0) * 100)
                  return { key: row.key, value: pct, valueLabel: `${pct}%`, label: <span className="truncate">{t(row.key)}</span> }
                })} />
              )}
            </div>
          </Panel>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <Panel>
            <PanelHeader title={t('How much you practise each subject')} icon={Layers} hint={t('Number of tries per subject')} />
            <div className="p-5">
              <BarList
                max={Math.max(1, ...practiceBySubject.map((row) => row.attempts))}
                data={practiceBySubject.map((row) => ({
                  key: row.key,
                  value: row.attempts,
                  valueLabel: String(row.attempts),
                  color: 'var(--color-primary)',
                  label: <span className="inline-flex items-center gap-1.5"><SubjectDot id={row.key} />{subjectName(row.key)}</span>,
                }))}
              />
            </div>
          </Panel>
          <WhenYouStudy records={records} />
        </div>

        <Panel>
          <PanelHeader title={t('Where your practice goes')} icon={BarChart3} hint={t('Tries by activity')} />
          <div className="p-5">
            <p className="font-mono text-[26px] font-semibold text-ink">{records.length.toLocaleString()}</p>
            <p className="text-[12px] text-ink-3">{t('Attempts recorded')}</p>
            <div className="mt-4 flex h-3 overflow-hidden rounded-full">
              {surfaces.map((row, index) => (
                <span key={row.key} style={{ width: `${(row.attempts / records.length) * 100}%`, backgroundColor: `color-mix(in srgb, var(--color-primary) ${100 - index * 14}%, var(--color-inset))` }} />
              ))}
            </div>
            <div className="mt-4 grid gap-x-6 gap-y-2 sm:grid-cols-2">
              {surfaces.map((row) => (
                <div key={row.key} className="flex items-center justify-between text-[12.5px]">
                  <span className="text-ink-2">{t(SURFACE_LABEL[row.key] ?? row.key)}</span>
                  <span className="font-mono text-ink">{row.attempts}</span>
                </div>
              ))}
            </div>
            <p className="mt-5 border-t border-line pt-4 text-[11.5px] leading-relaxed text-ink-3">
              {t('Stations, checklists and written questions are graded by you, so they count as tries but not toward your accuracy score.')}
            </p>
          </div>
        </Panel>
      </div>
    </PageContainer>
  )
}
