import { useMemo, useState, type ReactNode } from 'react'
import { BarChart3 } from 'lucide-react'
import { Panel, PanelHeader } from '@/components/ui/Panel'
import { EmptyState } from '@/components/ui/EmptyState'
import { Segmented } from '@/components/ui/Tabs'
import { Select } from '@/components/ui/Field'
import { Tooltip } from '@/components/ui/Tooltip'
import { useT } from '@/lib/i18n'
import { pct, formatMinutes } from '@/lib/format'
import type { FlashcardsApi } from '@/lib/useFlashcards'
import { generateCards } from '@/data/flashcards/generate'
import { exclusiveCounts } from '@/data/flashcards/status'
import {
  addedOverTime, answerButtons, futureDue, heatmap, hourlyBreakdown, reviewIntervals,
  reviewsOverTime, studySummary, trueRetention,
  cardStability, cardDifficulty, cardRetrievability,
  type Horizon, type IntervalRange, type RetentionPeriod,
} from '@/data/flashcards/stats'
import { ColumnChart, StackBar, StatFigure, EmptyChart, type ColumnDatum } from './charts/Charts'
import { HeatmapGrid } from './charts/HeatmapGrid'

/**
 * The Stats screen. Every chart is a thin render of a `stats.ts` dataset over
 * the selected deck and time window — nothing here computes or fabricates data,
 * so an empty collection shows honest empty states rather than a graph of zeros.
 */

const HORIZONS: { value: string; label: string; days: Horizon }[] = [
  { value: '1m', label: '1M', days: 30 },
  { value: '3m', label: '3M', days: 90 },
  { value: '1y', label: '1Y', days: 365 },
  { value: 'all', label: 'All', days: null },
]

const EXCLUSIVE_COLORS: Record<string, string> = {
  new: 'var(--color-accent)',
  learning: 'var(--color-warning)',
  relearning: 'var(--color-primary-soft)',
  young: 'var(--color-primary)',
  mature: 'var(--color-primary-strong)',
  suspended: 'var(--color-ink-3)',
  buried: 'var(--color-line-2)',
}
const EXCLUSIVE_LABELS: Record<string, string> = {
  new: 'New / unseen', learning: 'Learning', relearning: 'Relearning', young: 'Young', mature: 'Mature', suspended: 'Suspended', buried: 'Buried',
}

export function StatsView({ api }: { api: FlashcardsApi }) {
  const t = useT()
  const now = useMemo(() => new Date(), [])
  const [deckId, setDeckId] = useState<string>('all')
  const [horizonKey, setHorizonKey] = useState('3m')
  const horizon = HORIZONS.find((h) => h.value === horizonKey)?.days ?? 90

  const events = useMemo(
    () => (deckId === 'all' ? api.reviewEvents : api.reviewEvents.filter((e) => e.deckId === deckId)),
    [api.reviewEvents, deckId],
  )
  const metas = useMemo(
    () => (deckId === 'all' ? api.allCards : api.allCards.filter((c) => c.card.deckId === deckId)).map((c) => c.meta),
    [api.allCards, deckId],
  )
  const notes = useMemo(
    () => (deckId === 'all' ? api.allNotes : api.allNotes.filter((n) => n.deckId === deckId)),
    [api.allNotes, deckId],
  )
  const joinedAt = useMemo(() => {
    const times = [
      ...notes.map((n) => (n.createdAt ? Date.parse(n.createdAt) : NaN)),
      ...events.map((e) => Date.parse(e.at)),
    ].filter((n) => !Number.isNaN(n))
    return times.length ? new Date(Math.min(...times)) : now
  }, [notes, events, now])

  const summary = useMemo(() => studySummary(events, now), [events, now])
  const counts = useMemo(() => exclusiveCounts(metas, now), [metas, now])
  const totalCards = metas.length
  const hasHistory = events.some((e) => e.kind === 'grade')
  const usesFsrs = deckId !== 'all' && api.getDeck(deckId)?.scheduler === 'fsrs'

  if (totalCards === 0 && !hasHistory) {
    return (
      <Panel className="p-10 text-center">
        <EmptyState icon={BarChart3} title={t('No statistics yet')} description={t('Add cards and study them, and your progress will chart here.')} />
      </Panel>
    )
  }

  const horizonFilter = (
    <Segmented items={HORIZONS.map((h) => ({ value: h.value, label: h.label }))} value={horizonKey} onChange={setHorizonKey} />
  )

  return (
    <div className="space-y-5">
      {/* Scope controls */}
      <div className="flex flex-wrap items-center gap-3">
        <Select value={deckId} onChange={(e) => setDeckId(e.target.value)} aria-label={t('Deck')} className="max-w-[16rem]">
          <option value="all">{t('All decks')}</option>
          {api.decks.map((d) => <option key={d.id} value={d.id}>{d.name}</option>)}
        </Select>
      </div>

      {/* Summary */}
      <Panel>
        <PanelHeader title={t('Today')} />
        <div className="grid grid-cols-2 gap-3 p-4 sm:grid-cols-3 lg:grid-cols-5">
          <StatFigure label={t('Studied today')} value={summary.studiedToday} sub={`${summary.newAnswersToday} ${t('new')} · ${summary.reviewAnswersToday} ${t('review')}`} />
          <StatFigure label={t('Pass rate')} value={summary.passRateToday === null ? '—' : pct(summary.passRateToday * 100)} sub={`${summary.againToday} ${t('graded Again')}`} />
          <StatFigure label={t('Review time')} value={formatMinutes(Math.round(summary.reviewTimeTodayMs / 60000))} />
          <StatFigure label={t('Streak')} value={`${summary.currentStreakDays} ${t('d')}`} sub={`${summary.activeDays} ${t('active days')}`} />
          <StatFigure label={t('Learning today')} value={summary.learningAnswersToday + summary.relearningAnswersToday} />
        </div>
      </Panel>

      {/* Card counts (exclusive) */}
      <Panel>
        <PanelHeader title={t('Card counts')} hint={<><span className="tnum">{totalCards}</span> {t('total')}</>} />
        <div className="p-4">
          <StackBar
            caption={t('Card counts by state')}
            segments={(Object.keys(EXCLUSIVE_LABELS)).map((key) => ({
              key, label: t(EXCLUSIVE_LABELS[key]), value: counts[key as keyof typeof counts], color: EXCLUSIVE_COLORS[key],
            }))}
          />
        </div>
      </Panel>

      {/* Future due */}
      <ChartPanel title={t('Future due')} filter={horizonFilter}>
        <FutureDuePanel metas={metas} now={now} horizon={horizon} />
      </ChartPanel>

      {/* Study heatmap */}
      <Panel>
        <PanelHeader title={t('Study calendar')} />
        <div className="p-4">
          {hasHistory ? <HeatmapGrid days={heatmap(events)} now={now} /> : <EmptyChart label={t('No reviews yet')} />}
        </div>
      </Panel>

      {/* Reviews */}
      <ChartPanel title={t('Reviews')} filter={horizonFilter}>
        <ReviewsPanel events={events} now={now} horizon={horizon} joinedAt={joinedAt} />
      </ChartPanel>

      {/* Review intervals */}
      <IntervalsPanel metas={metas} />

      {/* Answer buttons */}
      <ChartPanel title={t('Answer buttons')} filter={horizonFilter}>
        <AnswerButtonsPanel events={events} now={now} horizon={horizon} />
      </ChartPanel>

      {/* Hourly breakdown */}
      <ChartPanel title={t('Hourly breakdown')} filter={horizonFilter}>
        <HourlyPanel events={events} now={now} horizon={horizon} />
      </ChartPanel>

      {/* Added */}
      <ChartPanel title={t('Added')} filter={horizonFilter}>
        <AddedPanel notes={notes} now={now} horizon={horizon} />
      </ChartPanel>

      {/* True retention */}
      <Panel>
        <PanelHeader title={t('True retention')} />
        <TrueRetentionPanel events={events} now={now} />
      </Panel>

      {/* FSRS analytics — real FSRS state only, never derived from SM-2 */}
      <Panel>
        <PanelHeader title={t('FSRS analytics')} />
        <div className="p-4">
          {usesFsrs ? (
            <FsrsAnalyticsPanel metas={metas} now={now} />
          ) : (
            <p className="p-1 text-[13px] leading-relaxed text-ink-2">
              {t('Card stability, difficulty and retrievability require the FSRS scheduler, which this deck is not using. These are not shown as invented values — enable FSRS on a deck to see them.')}
            </p>
          )}
        </div>
      </Panel>
    </div>
  )
}

function ChartPanel({ title, filter, children }: { title: string; filter: ReactNode; children: ReactNode }) {
  return (
    <Panel>
      <PanelHeader title={title} action={filter} />
      <div className="p-4">{children}</div>
    </Panel>
  )
}

function FutureDuePanel({ metas, now, horizon }: { metas: Parameters<typeof futureDue>[0]; now: Date; horizon: Horizon }) {
  const t = useT()
  const f = useMemo(() => futureDue(metas, now, horizon), [metas, now, horizon])
  const data: ColumnDatum[] = f.points.map((p) => ({ label: p.day, value: p.count, cumulative: p.cumulative }))
  return (
    <div className="space-y-3">
      <ColumnChart data={data} caption={t('Cards due per day')} valueLabel={t('due')} cumulativeLabel={t('running total')} />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatFigure label={t('Total forecast')} value={f.totalForecast} />
        <StatFigure label={t('Average / day')} value={f.averagePerDay.toFixed(1)} />
        <StatFigure label={t('Due tomorrow')} value={f.dueTomorrow} />
        <StatFigure label={t('Daily load')} value={f.dailyLoad.toFixed(1)} sub={t('from intervals')} />
      </div>
    </div>
  )
}

function ReviewsPanel({ events, now, horizon, joinedAt }: { events: Parameters<typeof reviewsOverTime>[0]; now: Date; horizon: Horizon; joinedAt: Date }) {
  const t = useT()
  const r = useMemo(() => reviewsOverTime(events, now, horizon, joinedAt), [events, now, horizon, joinedAt])
  const data: ColumnDatum[] = r.points.map((p) => ({ label: p.day, value: p.count, cumulative: p.cumulative }))
  return (
    <div className="space-y-3">
      <ColumnChart data={data} caption={t('Reviews over time')} valueLabel={t('reviews')} cumulativeLabel={t('running total')} color="var(--color-accent)" />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatFigure label={t('Total reviews')} value={r.totalReviews} />
        <StatFigure label={t('Days studied')} value={r.daysStudied} sub={r.pctDaysStudied === null ? undefined : `${pct(r.pctDaysStudied * 100)} ${t('of days')}`} />
        <StatFigure label={t('Avg / active day')} value={r.averagePerActiveDay.toFixed(1)} />
        <StatFigure label={t('Since joining')} value={`${r.daysSinceJoined} ${t('d')}`} />
      </div>
      <div>
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.06em] text-ink-3">{t('Answers by state')}</p>
        <StackBar
          caption={t('Answers by state')}
          segments={[
            { key: 'nl', label: t('Learning / new'), value: r.stateBreakdown.newOrLearning, color: 'var(--color-warning)' },
            { key: 're', label: t('Relearning'), value: r.stateBreakdown.relearning, color: 'var(--color-primary-soft)' },
            { key: 'yo', label: t('Young'), value: r.stateBreakdown.young, color: 'var(--color-primary)' },
            { key: 'ma', label: t('Mature'), value: r.stateBreakdown.mature, color: 'var(--color-primary-strong)' },
          ]}
        />
      </div>
    </div>
  )
}

function IntervalsPanel({ metas }: { metas: Parameters<typeof reviewIntervals>[0] }) {
  const t = useT()
  const [range, setRange] = useState<IntervalRange>('month')
  const { buckets, averageDays } = useMemo(() => reviewIntervals(metas, range), [metas, range])
  const data: ColumnDatum[] = buckets.map((b) => ({ label: b.label, value: b.count, hint: `${b.label} (${pct(b.cumulativePct * 100)} ${t('cumulative')})` }))
  return (
    <Panel>
      <PanelHeader
        title={t('Review intervals')}
        action={<Segmented
          items={[{ value: 'month', label: '1M' }, { value: 'p50', label: '50%' }, { value: 'p95', label: '95%' }, { value: 'all', label: 'All' }]}
          value={range}
          onChange={(v) => setRange(v as IntervalRange)}
        />}
      />
      <div className="space-y-3 p-4">
        <ColumnChart data={data} caption={t('Interval distribution')} valueLabel={t('cards')} />
        <StatFigure label={t('Average interval')} value={`${averageDays.toFixed(1)} ${t('days')}`} />
      </div>
    </Panel>
  )
}

function AnswerButtonsPanel({ events, now, horizon }: { events: Parameters<typeof answerButtons>[0]; now: Date; horizon: Horizon }) {
  const t = useT()
  const rows = useMemo(() => answerButtons(events, now, horizon), [events, now, horizon])
  const CATEGORY_LABEL: Record<string, string> = { learning: 'Learning / new', relearning: 'Relearning', young: 'Young', mature: 'Mature' }
  const GRADE_COLOR = { again: 'var(--color-danger)', hard: 'var(--color-ink-3)', good: 'var(--color-primary)', easy: 'var(--color-success)' }
  const total = (r: (typeof rows)[number]) => r.again + r.hard + r.good + r.easy
  if (rows.every((r) => total(r) === 0)) return <EmptyChart label={t('No answers yet')} />
  return (
    <div className="space-y-3">
      {rows.map((r) => {
        const sum = total(r)
        return (
          <div key={r.category} className="grid grid-cols-[7rem_1fr_3rem] items-center gap-3">
            <span className="text-[12.5px] text-ink-2">{t(CATEGORY_LABEL[r.category])}</span>
            <div className="flex h-3.5 overflow-hidden rounded-full bg-inset" role="img" aria-label={`${t(CATEGORY_LABEL[r.category])}: ${r.again} again, ${r.hard} hard, ${r.good} good, ${r.easy} easy`}>
              {(['again', 'hard', 'good', 'easy'] as const).map((g) => (
                r[g] > 0 && <div key={g} style={{ width: `${sum === 0 ? 0 : (r[g] / sum) * 100}%`, backgroundColor: GRADE_COLOR[g] }} title={`${t(g[0].toUpperCase() + g.slice(1))}: ${r[g]}`} />
              ))}
            </div>
            <span className="tnum text-end font-mono text-[12.5px] text-ink">{r.passRate === null ? '—' : pct(r.passRate * 100)}</span>
          </div>
        )
      })}
      <p className="flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-ink-3">
        {(['again', 'hard', 'good', 'easy'] as const).map((g) => (
          <span key={g} className="inline-flex items-center gap-1"><span className="size-2.5 rounded-sm" style={{ backgroundColor: GRADE_COLOR[g] }} aria-hidden /> {t(g[0].toUpperCase() + g.slice(1))}</span>
        ))}
        <span className="ms-auto">{t('Pass % at right')}</span>
      </p>
    </div>
  )
}

function HourlyPanel({ events, now, horizon }: { events: Parameters<typeof hourlyBreakdown>[0]; now: Date; horizon: Horizon }) {
  const t = useT()
  const hours = useMemo(() => hourlyBreakdown(events, now, horizon), [events, now, horizon])
  const data: ColumnDatum[] = hours.map((h) => ({
    label: `${String(h.hour).padStart(2, '0')}`,
    value: h.reviews,
    hint: `${String(h.hour).padStart(2, '0')}:00 — ${h.reviews} ${t('reviews')}${h.passRate === null ? '' : `, ${pct(h.passRate * 100)} ${t('pass')} (n=${h.sample})`}`,
  }))
  if (hours.every((h) => h.reviews === 0)) return <EmptyChart label={t('No reviews yet')} />
  return <ColumnChart data={data} caption={t('Reviews by hour of day')} valueLabel={t('reviews')} />
}

function AddedPanel({ notes, now, horizon }: { notes: Parameters<typeof addedOverTime>[0]; now: Date; horizon: Horizon }) {
  const t = useT()
  const points = useMemo(() => addedOverTime(notes, (n) => generateCards(n).length, now, horizon), [notes, now, horizon])
  const data: ColumnDatum[] = points.map((p) => ({ label: p.day, value: p.count, cumulative: p.cumulative }))
  if (data.length === 0) return <EmptyChart label={t('No cards added in this window')} />
  return <ColumnChart data={data} caption={t('Cards added over time')} valueLabel={t('added')} cumulativeLabel={t('running total')} color="var(--color-accent)" />
}

function FsrsAnalyticsPanel({ metas, now }: { metas: Parameters<typeof cardStability>[0]; now: Date }) {
  const t = useT()
  const stability = useMemo(() => cardStability(metas), [metas])
  const difficulty = useMemo(() => cardDifficulty(metas), [metas])
  const retriev = useMemo(() => cardRetrievability(metas, now), [metas, now])

  if (stability.count === 0 && retriev.count === 0) {
    return <EmptyChart label={t('FSRS analytics will appear once you study this deck.')} />
  }

  const toData = (buckets: { label: string; count: number }[]): ColumnDatum[] => buckets.map((b) => ({ label: b.label, value: b.count }))
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatFigure label={t('Avg stability')} value={`${stability.averageDays.toFixed(1)} ${t('d')}`} sub={`${stability.count} ${stability.count === 1 ? t('card') : t('cards')}`} />
        <StatFigure label={t('Avg difficulty')} value={`${difficulty.average.toFixed(1)} / 10`} />
        <StatFigure label={t('Avg retrievability')} value={retriev.count === 0 ? '—' : pct(retriev.average * 100)} />
        <StatFigure label={t('Est. remembered')} value={retriev.estimatedRemembered.toFixed(1)} sub={t('expected recall now')} />
      </div>
      <div>
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.06em] text-ink-3">{t('Stability (days until 90% recall)')}</p>
        <ColumnChart data={toData(stability.buckets)} caption={t('Stability distribution')} valueLabel={t('cards')} />
      </div>
      <div>
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.06em] text-ink-3">{t('Difficulty (1 easy – 10 hard)')}</p>
        <ColumnChart data={toData(difficulty.buckets)} caption={t('Difficulty distribution')} valueLabel={t('cards')} color="var(--color-accent)" />
      </div>
      <div>
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.06em] text-ink-3">{t('Retrievability (chance of recall now)')}</p>
        <ColumnChart data={toData(retriev.buckets)} caption={t('Retrievability distribution')} valueLabel={t('cards')} />
      </div>
    </div>
  )
}

function TrueRetentionPanel({ events, now }: { events: Parameters<typeof trueRetention>[0]; now: Date }) {
  const t = useT()
  const periods: { key: RetentionPeriod; label: string }[] = [
    { key: 'today', label: t('Today') }, { key: 'yesterday', label: t('Yesterday') },
    { key: 'week', label: t('Last week') }, { key: 'month', label: t('Last month') }, { key: 'all', label: t('All') },
  ]
  const fmt = (n: number | null) => (n === null ? '—' : pct(n * 100))
  return (
    <div className="overflow-x-auto p-4">
      <table className="w-full text-[13px]">
        <caption className="sr-only">{t('True retention: first review of a card per day, Again is a fail')}</caption>
        <thead>
          <tr className="text-ink-3">
            <th scope="col" className="pb-2 text-start text-[11px] font-semibold uppercase tracking-[0.06em]">{t('Period')}</th>
            <th scope="col" className="pb-2 text-end text-[11px] font-semibold uppercase tracking-[0.06em]">{t('Young')}</th>
            <th scope="col" className="pb-2 text-end text-[11px] font-semibold uppercase tracking-[0.06em]">{t('Mature')}</th>
            <th scope="col" className="pb-2 text-end text-[11px] font-semibold uppercase tracking-[0.06em]">
              <Tooltip label={t('First review of each card per day. Again is a fail; Hard, Good and Easy pass.')}><span className="underline decoration-dotted">{t('Total')}</span></Tooltip>
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-line">
          {periods.map(({ key, label }) => {
            const r = trueRetention(events, key, now)
            return (
              <tr key={key}>
                <th scope="row" className="py-2 text-start font-medium text-ink-2">{label}</th>
                <td className="tnum py-2 text-end font-mono text-ink">{fmt(r.young)}</td>
                <td className="tnum py-2 text-end font-mono text-ink">{fmt(r.mature)}</td>
                <td className="tnum py-2 text-end font-mono font-semibold text-ink">{fmt(r.total)}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
