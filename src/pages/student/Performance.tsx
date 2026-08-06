import { useState } from 'react'
import { BarChart3, Brain, Clock3, ListChecks, Table2, Timer, Trophy } from 'lucide-react'
import { bySubject, byType, cohortSize, firstAttempt, leaderboard, studyAllocation, studyByHour, timeManagement, yourPercentile } from '@/data/performance'
import { getSubject } from '@/data/student'
import { PageContainer, PageHeader } from '@/components/shell/Page'
import { Panel, PanelHeader } from '@/components/ui/Panel'
import { Badge } from '@/components/ui/Badge'
import { BarList } from '@/components/charts/BarList'
import { SubjectDot } from '@/components/ui/Subject'
import { Table, Td, Th, Tr } from '@/components/ui/Table'
import { useT } from '@/lib/i18n'
import { Segmented } from '@/components/ui/Tabs'
import { formatMinutes, formatTimeString } from '@/lib/format'
import { cn } from '@/lib/cn'

const PACE_COLOR: Record<string, string> = { success: 'var(--color-success)', warning: 'var(--color-warning)', neutral: 'var(--color-ink-3)' }

function WhenYouStudy() {
  const [range, setRange] = useState<'day' | 'week' | 'month'>('week')
  const values = studyByHour[range]
  return (
    <Panel>
      <PanelHeader title="When you actually study" icon={Clock3} hint="Minutes recorded by hour of day" action={<Segmented value={range} onChange={(value) => setRange(value as typeof range)} items={[{ value: 'day', label: 'Day' }, { value: 'week', label: 'Week' }, { value: 'month', label: 'Month' }]} />} />
      <div className="p-5">
        <div className="flex h-44 items-end gap-1 border-b border-line-2">
          {values.map((value, hour) => <div key={hour} className="group relative flex h-full flex-1 items-end focus-visible:outline-none" tabIndex={0} role="img" aria-label={`${value} minutes at ${formatTimeString(`${String(hour).padStart(2, '0')}:00`)}`}><div className="w-full rounded-t-[3px] bg-accent/75 transition-colors group-hover:bg-accent group-focus:bg-accent" style={{ height: `${value}%` }} /><span className="pointer-events-none absolute bottom-[calc(100%+0.35rem)] left-1/2 z-10 hidden -translate-x-1/2 whitespace-nowrap rounded border border-line bg-surface px-2 py-1 font-mono text-[10px] text-ink shadow-raised group-hover:block group-focus:block">{value} min · {formatTimeString(`${String(hour).padStart(2, '0')}:00`)}</span></div>)}
        </div>
        <div className="mt-2 flex justify-between font-mono text-[10px] text-ink-3"><span>12:00 AM</span><span>6:00 AM</span><span>12:00 PM</span><span>6:00 PM</span><span>11:00 PM</span></div>
      </div>
    </Panel>
  )
}

export function Performance() {
  const t = useT()
  const totalStudy = studyAllocation.reduce((sum, item) => sum + item.minutes, 0)
  return (
    <PageContainer>
      <PageHeader title={t('Performance')} description={t('First-attempt accuracy, cohort context, weak areas, and the shape of your study time.')} />

      <div className="space-y-4">
        <Panel>
          <PanelHeader title="First-attempt accuracy" icon={Table2} hint="Compared with your Year 3 median" />
          <Table>
            <thead><Tr><Th>Subject</Th><Th align="right">Attempts</Th><Th align="right">You</Th><Th align="right">Year median</Th><Th align="right">Difference</Th></Tr></thead>
            <tbody>{firstAttempt.map((row) => { const subject = getSubject(row.subjectId); const difference = row.accuracy - row.yearMedian; return <Tr key={row.subjectId} hover><Td><span className="inline-flex items-center gap-2"><SubjectDot id={row.subjectId} />{subject.name}</span></Td><Td align="right" className="font-mono text-ink-2">{row.answered}</Td><Td align="right" className="font-mono font-semibold">{row.accuracy}%</Td><Td align="right" className="font-mono text-ink-2">{row.yearMedian}%</Td><Td align="right"><span className={cn('font-mono text-[12px] font-semibold', difference >= 0 ? 'text-success' : 'text-danger')}>{difference >= 0 ? '+' : ''}{difference} pp</span></Td></Tr>})}</tbody>
          </Table>
        </Panel>

        <div className="grid gap-4 lg:grid-cols-2">
          <Panel><PanelHeader title="Where are you weak?" icon={Brain} hint="Lowest first-attempt accuracy" /><div className="p-5"><BarList data={[...bySubject].sort((a, b) => a.accuracy - b.accuracy).slice(0, 6).map((row) => ({ key: row.subjectId, value: row.accuracy, valueLabel: `${row.accuracy}%`, color: row.accuracy < 62 ? 'var(--color-danger)' : 'var(--color-warning)', label: <span className="inline-flex items-center gap-1.5"><SubjectDot id={row.subjectId} />{getSubject(row.subjectId).name}</span> }))} /></div></Panel>
          <Panel><PanelHeader title="Accuracy by question type" icon={ListChecks} hint="This block" /><div className="p-5"><BarList data={byType.map((row) => ({ key: row.type, value: row.accuracy, valueLabel: `${row.accuracy}%`, label: <span className="truncate">{row.type}</span> }))} /></div></Panel>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <Panel>
            <PanelHeader title="Year leaderboard" icon={Trophy} hint="Anonymous" action={<Badge tone="accent">Top {100 - yourPercentile}%</Badge>} />
            <div className="p-2"><ul>{leaderboard.map((row) => <li key={row.rank}><div className={cn('flex items-center gap-3 rounded-md px-3 py-2', row.isYou && 'bg-accent-tint')}><span className={cn('tnum w-6 text-center font-mono text-[13px] font-medium', row.rank <= 3 ? 'text-accent' : 'text-ink-3')}>{row.rank}</span><span className={cn('flex-1 text-[13.5px]', row.isYou ? 'font-semibold text-accent-strong' : 'text-ink')}>{row.isYou ? 'You' : `Student ${row.code}`}</span><div className="hidden h-1.5 w-24 overflow-hidden rounded-full bg-inset sm:block"><div className="h-full rounded-full bg-accent" style={{ width: `${row.score}%` }} /></div><span className="tnum w-10 text-right font-mono text-[12.5px] text-ink-2">{row.score}%</span></div></li>)}</ul><p className="mx-2 mt-2 border-t border-line px-1 py-3 text-[11.5px] leading-relaxed text-ink-3">Names are never shown to anyone. Ranks are recalculated nightly, and only students who meet the minimum attempt count appear. Your position is among {cohortSize} students.</p></div>
          </Panel>

          <Panel>
            <PanelHeader title="Time management" icon={Timer} />
            <div className="space-y-5 p-5"><div className="grid grid-cols-3 gap-4"><div><p className="tnum font-mono text-[24px] font-semibold text-ink">{timeManagement.avgSeconds}s</p><p className="text-[12px] text-ink-3">Your average</p></div><div><p className="tnum font-mono text-[24px] font-semibold text-ink">{timeManagement.yearMedianSeconds}s</p><p className="text-[12px] text-ink-3">Year median</p></div><div><p className="tnum font-mono text-[24px] font-semibold text-ink">{timeManagement.flaggedPct}%</p><p className="text-[12px] text-ink-3">Flagged</p></div></div><div><div className="mb-2 flex items-baseline justify-between"><span className="text-[12.5px] font-medium text-ink-2">Pacing</span><span className="text-[12px] text-warning">{timeManagement.avgSeconds - timeManagement.yearMedianSeconds}s slower than median</span></div><div className="flex h-2.5 gap-0.5 overflow-hidden rounded-full">{timeManagement.pacing.map((pace) => <div key={pace.label} style={{ width: `${pace.pct}%`, backgroundColor: PACE_COLOR[pace.tone] }} />)}</div><div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5">{timeManagement.pacing.map((pace) => <span key={pace.label} className="inline-flex items-center gap-1.5 text-[12px] text-ink-2"><span className="size-2 rounded-full" style={{ backgroundColor: PACE_COLOR[pace.tone] }} />{pace.label}<span className="font-mono text-ink-3">{pace.pct}%</span></span>)}</div></div></div>
          </Panel>
        </div>

        <div className="grid gap-4 lg:grid-cols-[0.8fr_1.2fr]">
          <Panel><PanelHeader title="Where does the time go?" icon={BarChart3} hint="This week" /><div className="p-5"><p className="font-mono text-[26px] font-semibold text-ink">{formatMinutes(totalStudy)}</p><p className="text-[12px] text-ink-3">Recorded study time</p><div className="mt-4 flex h-3 overflow-hidden rounded-full">{studyAllocation.map((item, index) => <span key={item.label} style={{ width: `${(item.minutes / totalStudy) * 100}%`, backgroundColor: `color-mix(in srgb, var(--color-accent) ${100 - index * 11}%, var(--color-inset))` }} />)}</div><div className="mt-4 space-y-2">{studyAllocation.map((item) => <div key={item.label} className="flex items-center justify-between text-[12.5px]"><span className="text-ink-2">{item.label}</span><span className="font-mono text-ink">{formatMinutes(item.minutes)}</span></div>)}</div></div></Panel>
          <WhenYouStudy />
        </div>

        <Panel>
          <PanelHeader title="What that adds up to" />
          <ol className="divide-y divide-line px-5">{[
            'Your strongest accuracy is between 7:00 PM and 9:00 PM, and that is also when you study most. That is unusual and worth protecting.',
            'You spend 13 seconds longer per question than the year median. On a 120-question paper that is 26 minutes you do not have.',
            'Three of your last four sessions ended within two minutes of a calendar event starting. Short sessions are fine; interrupted ones score worse.',
          ].map((insight, index) => <li key={insight} className="grid gap-3 py-4 sm:grid-cols-[2.5rem_1fr]"><span className="font-serif text-[21px] text-accent">{String(index + 1).padStart(2, '0')}</span><p className="max-w-4xl text-[14px] leading-relaxed text-ink-2">{insight}</p></li>)}</ol>
        </Panel>
      </div>
    </PageContainer>
  )
}
