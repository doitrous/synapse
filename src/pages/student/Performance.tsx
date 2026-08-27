import { useEffect, useMemo, useState } from 'react'
import {
  Award, BarChart3, Brain, ClipboardCheck, Clock3, Layers, ListChecks, Medal,
  ShieldQuestion, Table2, Timer, TrendingUp, Users,
} from 'lucide-react'
import { getSubject } from '@/data/subjects'
import {
  accuracyOf, byDifficulty, bySubject, bySurface, currentStreak, distinctItems,
  firstAttemptSplit, hourHistogram, marked, medianSeconds, weakest,
} from '@/data/attemptStats'
import type { AttemptRecord } from '@/data/attempts'
import { masteryBand } from '@/data/mastery'
import { useMastery } from '@/lib/useMastery'
import { PageContainer, PageHeader } from '@/components/shell/Page'
import { ConceptMasteryPanel } from '@/components/performance/ConceptMastery'
import { SessionLedgerPanel } from '@/components/performance/SessionLedger'
import { Panel, PanelHeader } from '@/components/ui/Panel'
import { BarList } from '@/components/charts/BarList'
import { SubjectDot } from '@/components/ui/Subject'
import { Icon } from '@/components/ui/Icon'
import { EmptyState } from '@/components/ui/EmptyState'
import { Badge } from '@/components/ui/Badge'
import { Meter } from '@/components/ui/Meter'
import { ButtonLink } from '@/components/ui/Button'
import { Table, Td, Th, Tr } from '@/components/ui/Table'
import { useT } from '@/lib/i18n'
import { Segmented, Tabs } from '@/components/ui/Tabs'
import { useAttemptHistory } from '@/lib/useAttemptLog'
import { formatTimeString } from '@/lib/format'
import { cn } from '@/lib/cn'
import { API_MODE, apiGet } from '@/lib/api'
import { ExamReadinessCard } from '@/components/dashboard/ProgressTrio'
import { PerformanceOverview } from '@/components/dashboard/PerformanceOverview'
import { demoLeaderboard } from '@/data/demoPreview'

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
  viewer?: { eligible: boolean; verifiedAnswers?: number; requiredAnswers?: number }
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

function KpiTile({ icon, value, label, sub, tone }: { icon: typeof Timer; value: string; label: string; sub?: string; tone?: string }) {
  return (
    <Panel className="p-4">
      <div className="flex items-center gap-2 text-ink-3"><Icon icon={icon} size={15} /><p className="text-[12px] font-medium text-ink-2">{label}</p></div>
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
        title={t('When you actually study')}
        icon={Clock3}
        hint={t('Answers committed, by hour of day')}
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
 * The student's own place relative to this board, from data the page already
 * has — never the board's own ranking, which the API does not expose beyond
 * the visible rows. Mastery reads the local concept ledger; accuracy reads
 * the local attempt log. Only the eligibility gate (verified-answer count) is
 * a real figure returned by the leaderboard endpoint itself.
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

  return (
    <Panel className={cn('p-4', eligible ? 'border-success/25 bg-success-tint/20' : 'border-primary-line bg-primary-tint/25')}>
      <p className={cn('text-[10.5px] font-semibold uppercase tracking-[0.08em]', eligible ? 'text-success' : 'text-primary-strong')}>
        {eligible ? t('Your standing') : t('Your standing — still private')}
      </p>
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

      <div className="mt-3.5">
        <div className="flex items-center justify-between text-[11px] text-ink-2">
          <span>{t('Eligibility — verified answers this term')}</span>
          <span className="tnum font-mono font-semibold">{verified} / {required}</span>
        </div>
        <Meter value={verified} max={required} tone={eligible ? 'success' : 'primary'} className="mt-1.5" />
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
          {!API_MODE && <Badge tone="primary" dot className="mb-2">Demo cohort preview</Badge>}
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
          <div className="space-y-2 p-5" aria-label={t('Loading leaderboard')}>
            {[0, 1, 2, 3, 4].map((row) => <div key={row} className="h-12 animate-pulse rounded-lg bg-inset motion-reduce:animate-none" />)}
          </div>
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
 * The student's own record, and only their own record.
 *
 * Cohort comparison is gone from this page: the year median, the percentile,
 * the anonymous leaderboard and the "13 seconds slower than the median" line
 * were all literals in a source file, and no cohort aggregate exists anywhere
 * in this product to replace them with. Everything left is derived from the
 * attempt log and the concept mastery ledger.
 */
export function Performance() {
  const t = useT()
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
  const overall = accuracyOf(records)
  const median = medianSeconds(records)

  const header = (
    <>
      <PageHeader title={t('Performance')} description={t('Your progress, curriculum coverage, and verified peer rankings.')} back={{ fallback: '/app' }} />
      <Tabs
        className="mb-4"
        value={view}
        onChange={(value) => setView(value as PerformanceView)}
        items={[
          { value: 'personal', label: t('Personal progress'), icon: TrendingUp },
          { value: 'leaders', label: t('Top performers'), icon: Award },
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
        <Panel className="p-10 text-center text-[13px] text-ink-3">{t('Loading your record…')}</Panel>
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
              description={`${t('This page reports on your own marked answers. It needs at least')} ${MIN_MARKED} ${t('before any figure here would mean anything — you have')} ${scored.length}.`}
            />
          </Panel>
          <ConceptMasteryPanel />
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
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          <KpiTile
            icon={TrendingUp}
            value={overall === null ? '—' : `${Math.round(overall * 100)}%`}
            label={t('Overall accuracy')}
            sub={`${scored.length} ${t('marked answers')}`}
            tone="text-primary-strong"
          />
          <KpiTile
            icon={ListChecks}
            value={split.first.accuracy === null ? '—' : `${Math.round(split.first.accuracy * 100)}%`}
            label={t('First attempt')}
            sub={split.repeat.accuracy === null
              ? t('No repeats yet')
              : `${Math.round(split.repeat.accuracy * 100)}% ${t('on repeats')}`}
          />
          <KpiTile
            icon={Layers}
            value={distinctItems(records).toLocaleString()}
            label={t('Items covered')}
            sub={`${records.length.toLocaleString()} ${t('attempts in total')}`}
          />
          <KpiTile
            icon={Timer}
            value={median === null ? '—' : `${median}s`}
            label={t('Median per question')}
            sub={median === null ? t('No timed sessions yet') : `${currentStreak(records)} ${t('day streak')}`}
          />
        </div>

        <SessionLedgerPanel records={records} />

        <ConceptMasteryPanel />

        <Panel>
          <PanelHeader title={t('Accuracy by subject')} icon={Table2} hint={`${t('Subjects with at least')} ${MIN_PER_SUBJECT} ${t('marked answers')}`} />
          {subjects.length === 0 ? (
            <p className="p-8 text-center text-[13px] text-ink-3">{t('No subject has enough marked answers to report on yet.')}</p>
          ) : (
            <Table>
              <thead><Tr><Th>{t('Subject')}</Th><Th align="end">{t('Attempts')}</Th><Th align="end">{t('Marked')}</Th><Th align="end">{t('Correct')}</Th><Th align="end" className="pr-4">{t('Accuracy')}</Th></Tr></thead>
              <tbody>
                {[...subjects].sort((a, b) => (b.accuracy ?? 0) - (a.accuracy ?? 0)).map((row) => {
                  const subject = getSubject(row.key)
                  const pct = row.accuracy === null ? null : Math.round(row.accuracy * 100)
                  return (
                    <Tr key={row.key} hover>
                      <Td><span className="inline-flex items-center gap-2"><SubjectDot id={row.key} />{subject.name}</span></Td>
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
            <PanelHeader title={t('Where are you weak?')} icon={Brain} hint={t('Lowest accuracy first')} />
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
                    label: <span className="inline-flex items-center gap-1.5"><SubjectDot id={row.key} />{getSubject(row.key).name}</span>,
                  }
                })} />
              )}
            </div>
          </Panel>

          <Panel>
            <PanelHeader title={t('Accuracy by difficulty')} icon={ListChecks} hint={t('As the author graded each item')} />
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
            <PanelHeader title={t('Coverage by subject')} icon={Layers} hint={t('Attempts — where your practice is concentrated')} />
            <div className="p-5">
              <BarList data={bySubject(records).map((row) => ({
                key: row.key,
                value: row.attempts,
                valueLabel: String(row.attempts),
                color: 'var(--color-primary)',
                label: <span className="inline-flex items-center gap-1.5"><SubjectDot id={row.key} />{getSubject(row.key).name}</span>,
              }))} />
            </div>
          </Panel>
          <WhenYouStudy records={records} />
        </div>

        <Panel>
          <PanelHeader title={t('Where does the work go?')} icon={BarChart3} hint={t('Attempts by surface')} />
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
              {t('Stations, checklists and written questions are self-scored, so they count as attempts but never toward an accuracy. Cohort comparison is not available: nothing in Maristana aggregates other students yet.')}
            </p>
          </div>
        </Panel>
      </div>
    </PageContainer>
  )
}
