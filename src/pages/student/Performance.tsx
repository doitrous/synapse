import { useMemo, useState } from 'react'
import { BarChart3, Brain, Clock3, Layers, ListChecks, Table2, Timer, TrendingUp } from 'lucide-react'
import { getSubject } from '@/data/subjects'
import {
  accuracyOf, byDifficulty, bySubject, bySurface, currentStreak, distinctItems,
  firstAttemptSplit, hourHistogram, marked, medianSeconds, weakest,
} from '@/data/attemptStats'
import type { AttemptRecord } from '@/data/attempts'
import { PageContainer, PageHeader } from '@/components/shell/Page'
import { ConceptMasteryPanel } from '@/components/performance/ConceptMastery'
import { Panel, PanelHeader } from '@/components/ui/Panel'
import { BarList } from '@/components/charts/BarList'
import { SubjectDot } from '@/components/ui/Subject'
import { Icon } from '@/components/ui/Icon'
import { EmptyState } from '@/components/ui/EmptyState'
import { Table, Td, Th, Tr } from '@/components/ui/Table'
import { useT } from '@/lib/i18n'
import { Segmented } from '@/components/ui/Tabs'
import { useAttemptHistory } from '@/lib/useAttemptLog'
import { formatTimeString } from '@/lib/format'
import { cn } from '@/lib/cn'

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

// Keyed loosely, so nothing here fails to compile when a surface is added —
// only the row goes out untranslated. Add the label with the surface.
const SURFACE_LABEL: Record<string, string> = {
  qbank: 'Question bank',
  essay: 'Written questions',
  room: 'Shared tests',
  case: 'Clinical cases',
  lab: 'Lab & imaging',
  station: 'OSCE stations',
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

  if (loading) {
    return (
      <PageContainer>
        <PageHeader title={t('Performance')} description={t('Your accuracy, weak areas, and the shape of your study time.')} />
        <Panel className="p-10 text-center text-[13px] text-ink-3">{t('Loading your record…')}</Panel>
      </PageContainer>
    )
  }

  if (scored.length < MIN_MARKED) {
    return (
      <PageContainer>
        <PageHeader title={t('Performance')} description={t('Your accuracy, weak areas, and the shape of your study time.')} />
        <div className="space-y-4">
          <Panel className="p-10">
            <EmptyState
              icon={TrendingUp}
              title={t('Not enough answers yet')}
              description={`${t('This page reports on your own marked answers. It needs at least')} ${MIN_MARKED} ${t('before any figure here would mean anything — you have')} ${scored.length}.`}
            />
          </Panel>
          <ConceptMasteryPanel />
        </div>
      </PageContainer>
    )
  }

  return (
    <PageContainer>
      <PageHeader title={t('Performance')} description={t('Your accuracy, weak areas, and the shape of your study time.')} />

      <div className="space-y-4">
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
              {t('Stations, checklists and written questions are self-scored, so they count as attempts but never toward an accuracy. Cohort comparison is not available: nothing in Connect Cortex aggregates other students yet.')}
            </p>
          </div>
        </Panel>
      </div>
    </PageContainer>
  )
}
