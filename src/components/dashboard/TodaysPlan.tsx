import { Link } from 'react-router-dom'
import { Check, CalendarPlus, Clock3 } from 'lucide-react'
import {
  blocksOn, durationMinutes, hourOf, STUDY_BLOCKS_STORAGE_KEY, type StudyBlock,
} from '@/data/studyBlocks'
import { Panel, PanelHeader } from '@/components/ui/Panel'
import { Button } from '@/components/ui/Button'
import { Meter } from '@/components/ui/Meter'
import { Icon } from '@/components/ui/Icon'
import { EmptyState } from '@/components/ui/EmptyState'
import { SystemMark } from '@/components/ui/SystemMark'
import { formatLongDate, formatMinutes, formatTimeString } from '@/lib/format'
import { usePersistentState } from '@/lib/usePersistentState'
import { useStudentSchedule, sameDay, type ScheduledSession } from '@/lib/useStudentSchedule'
import { cn } from '@/lib/cn'
import { useT } from '@/lib/i18n'

const DAY_START = 6
const DAY_END = 23
const HOURS = [6, 9, 12, 15, 18, 21, 23]

function hourValue(date: Date) {
  return date.getHours() + date.getMinutes() / 60
}

/**
 * An hour as a percentage across the day shown.
 *
 * Clamped, because the rails are percentage-positioned bars: anything outside
 * the window was placed off-scale, so a 05:30 start drew left of the track and
 * a late block ran past its end.
 */
function position(hour: number) {
  const clamped = Math.min(DAY_END, Math.max(DAY_START, hour))
  return ((clamped - DAY_START) / (DAY_END - DAY_START)) * 100
}

/**
 * A two-or-three letter tag for a bar too narrow to hold a title.
 *
 * Derived from the block's own words. It previously matched four hardcoded
 * topics — "heart failure", "ecg", "diuretic", "examination" — which only ever
 * worked because the timetable it labelled was hardcoded too.
 */
function timelineCode(title: string) {
  const words = title.trim().split(/\s+/).filter(Boolean)
  if (!words.length) return '—'
  if (words.length === 1) return words[0].slice(0, 3).toUpperCase()
  return words.slice(0, 3).map((word) => word[0]).join('').toUpperCase()
}

function PlanRow({ block, index, onToggle }: { block: StudyBlock; index: number; onToggle: () => void }) {
  const minutes = durationMinutes(block.start, block.end)
  return (
    <button type="button" aria-pressed={Boolean(block.done)} onClick={onToggle} className="group grid w-full grid-cols-[1.75rem_4.75rem_minmax(0,1fr)] items-center gap-2 rounded-lg px-2 py-2.5 text-left transition-colors hover:bg-inset sm:grid-cols-[1.9rem_5.3rem_minmax(0,1fr)_auto_auto] sm:gap-3">
      <span className={cn('grid size-6 place-items-center rounded-lg border transition-colors', block.done ? 'border-primary bg-primary' : 'border-line-2 bg-surface group-hover:border-ink-3')}>
        {block.done && <Icon icon={Check} size={14} strokeWidth={2.7} className="text-on-primary" />}
      </span>
      <span className="tnum font-mono text-[12px] text-ink-2">{formatTimeString(block.start)}</span>
      <span className={cn('min-w-0 truncate text-[13.5px]', block.done ? 'text-ink-3 line-through decoration-line-2' : 'font-medium text-ink')}>{block.title}</span>
      <SystemMark subjectId={block.subjectId} index={index + 1} className="hidden sm:inline-flex" />
      <span className="tnum hidden w-10 text-right font-mono text-[11.5px] text-ink-3 sm:block">{minutes}m</span>
    </button>
  )
}

/**
 * Today, on two rails: what the university scheduled, and what the student planned.
 *
 * Both rails are now real. The faculty rail comes from the published module
 * schedule for their year; the plan rail comes from the blocks they created.
 * An empty rail stays empty rather than being filled with an example day.
 */
export function TodaysSchedule() {
  const t = useT()
  const now = new Date()
  const { sessions } = useStudentSchedule()
  const [allBlocks] = usePersistentState<StudyBlock[]>(STUDY_BLOCKS_STORAGE_KEY, [])

  const todaySessions = sessions.filter((session) => sameDay(session.start, now) && session.end)
  const blocks = blocksOn(allBlocks, now)
  const current = Math.min(100, Math.max(0, position(hourValue(now))))

  if (!todaySessions.length && !blocks.length) {
    return (
      <Panel className="overflow-hidden">
        <PanelHeader title={t('Today')} icon={Clock3} hint={formatLongDate(now)} />
        <div className="p-4 sm:p-6">
          <EmptyState
            icon={Clock3}
            title={t('Nothing scheduled today')}
            description={t('University sessions appear here once your year has a published timetable. Blocks you plan yourself appear alongside them.')}
            action={<Link to="/app/calendar"><Button variant="secondary" size="sm" iconLeft={CalendarPlus}>{t('Plan a study block')}</Button></Link>}
          />
        </div>
      </Panel>
    )
  }

  return (
    <Panel className="overflow-hidden">
      <PanelHeader title={t('Today')} icon={Clock3} hint={formatLongDate(now)} action={<div className="flex items-center gap-4 text-[11.5px] text-ink-2"><span className="inline-flex items-center gap-1.5"><span className="size-2.5 rounded bg-primary" />{t('Faculty')}</span><span className="inline-flex items-center gap-1.5"><span className="size-2.5 rounded border border-line-2 bg-[repeating-linear-gradient(45deg,var(--color-line),var(--color-line)_2px,transparent_2px,transparent_4px)]" />{t('Yours')}</span></div>} />

      <div className="px-3 py-4 sm:px-6 sm:py-5">
        <div className="relative ps-14 sm:ps-20">
          <div className="absolute start-0 top-0 text-[10.5px] font-bold uppercase tracking-[0.07em] text-ink-3">{t('Faculty')}</div>
          <div className="relative h-10 rounded-lg bg-inset">
            {todaySessions.map((session: ScheduledSession) => {
              const start = position(hourValue(session.start))
              const width = position(hourValue(session.end!)) - start
              const label = session.title || session.label
              return <span key={session.id} title={label} className="group absolute top-1.5 z-0 h-7 rounded-md bg-primary hover:z-30" style={{ left: `${start}%`, width: `${Math.max(width, 4)}%` }}>
                <span className="flex h-full w-full items-center justify-center overflow-hidden px-0.5 font-mono text-[8.5px] font-bold tracking-[-0.04em] text-on-primary">{timelineCode(label)}</span>
                <span className="pointer-events-none absolute inset-y-0 left-0 flex min-w-48 items-center rounded-md border border-primary-strong bg-primary px-3 text-[11px] font-semibold text-on-primary opacity-0 shadow-raised transition-opacity group-hover:opacity-100">{label}</span>
              </span>
            })}
          </div>

          <div className="absolute start-0 top-14 text-[10.5px] font-bold uppercase tracking-[0.07em] text-ink-3">{t('Your plan')}</div>
          <div className="relative mt-3 h-10 rounded-lg bg-inset">
            {blocks.map((block) => {
              const late = hourOf(block.start) >= 18
              const minutes = durationMinutes(block.start, block.end)
              return <span key={block.id} title={block.title} className="group absolute top-1.5 z-0 h-7 rounded-md border border-line-2 bg-[repeating-linear-gradient(45deg,var(--color-surface),var(--color-surface)_4px,var(--color-line)_4px,var(--color-line)_6px)] hover:z-30" style={{ left: `${position(hourOf(block.start))}%`, width: `${Math.max((minutes / 60 / (DAY_END - DAY_START)) * 100, 2.2)}%` }}>
                <span className="flex h-full w-full items-center justify-center overflow-hidden bg-surface/70 font-mono text-[8px] font-bold text-ink-2">{(block.kind || '·')[0]}</span>
                <span className={cn('pointer-events-none absolute inset-y-0 flex min-w-48 items-center rounded-md border border-line-2 bg-surface px-3 text-[11px] font-semibold text-ink opacity-0 shadow-raised transition-opacity group-hover:opacity-100', late ? 'right-0' : 'left-0')}>{block.title}</span>
              </span>
            })}
          </div>

          <div className="relative mt-2 h-5">
            {HOURS.map((hour) => <span key={hour} className="absolute -translate-x-1/2 font-mono text-[10px] text-ink-3" style={{ left: `${position(hour)}%` }}>{hour}</span>)}
          </div>

          <div className="pointer-events-none absolute bottom-5 top-0 z-10 w-px bg-danger" style={{ left: `calc(5rem + (100% - 5rem) * ${current / 100})` }} aria-label={`Current time ${formatTimeString(`${now.getHours()}:${now.getMinutes()}`)}`}>
            <span className="absolute -left-[3px] top-[-3px] size-[7px] rounded-full bg-danger" />
          </div>
        </div>
      </div>
    </Panel>
  )
}

/**
 * The student's own blocks for today, tickable.
 *
 * The tick is written back to the same stored record the calendar reads, so it
 * survives a reload and shows up on both screens. It used to live in a
 * component-local `useState` seeded from a hardcoded array, which meant every
 * navigation reset it to two-of-five done.
 */
export function TodaysPlanList() {
  const t = useT()
  const [allBlocks, setBlocks] = usePersistentState<StudyBlock[]>(STUDY_BLOCKS_STORAGE_KEY, [])
  const blocks = blocksOn(allBlocks, new Date())

  const done = blocks.filter((block) => block.done).length
  const donePct = blocks.length ? Math.round((done / blocks.length) * 100) : 0
  const remaining = blocks.filter((block) => !block.done).reduce((sum, block) => sum + durationMinutes(block.start, block.end), 0)

  function toggle(id: string) {
    setBlocks((previous) => previous.map((block) => block.id === id ? { ...block, done: !block.done } : block))
  }

  return (
    <Panel className="flex h-full flex-col overflow-hidden">
      <PanelHeader title={t("Today's plan")} icon={Clock3} hint={blocks.length ? `${blocks.length} ${t('blocks')}` : undefined} />
      {blocks.length === 0 ? (
        <div className="flex flex-1 items-center justify-center p-4">
          <EmptyState
            icon={Clock3}
            title={t('No blocks planned for today')}
            description={t('Plan your own study blocks in the calendar, and tick them off here.')}
            action={<Link to="/app/calendar"><Button variant="primary" size="sm" iconLeft={CalendarPlus}>{t('Plan a study block')}</Button></Link>}
          />
        </div>
      ) : (
        <>
          <div className="flex-1 px-3 py-3">
            <ul>{blocks.map((block, index) => <li key={block.id}><PlanRow block={block} index={index} onToggle={() => toggle(block.id)} /></li>)}</ul>
          </div>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-line px-4 py-3 sm:px-5">
            <span className="shrink-0 text-[12.5px] text-ink-2"><span className="tnum font-mono font-semibold text-ink">{done} {t('of')} {blocks.length}</span> {t('done')}</span>
            <Meter value={donePct} tone="success" className="order-3 basis-full sm:order-none sm:flex-1 sm:basis-auto" />
            <span className="tnum shrink-0 font-mono text-[12px] text-ink-3">{formatMinutes(remaining)} {t('left')}</span>
          </div>
        </>
      )}
    </Panel>
  )
}
