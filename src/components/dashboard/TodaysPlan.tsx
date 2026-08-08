import { useState } from 'react'
import { Check, Clock3 } from 'lucide-react'
import type { PlanBlock } from '@/data/types'
import { todaySessions, todaysPlan } from '@/data/student'
import { Panel, PanelHeader } from '@/components/ui/Panel'
import { Meter } from '@/components/ui/Meter'
import { Icon } from '@/components/ui/Icon'
import { ChapterMark } from '@/components/ui/ChapterMark'
import { formatLongDate, formatMinutes, formatTimeString } from '@/lib/format'
import { cn } from '@/lib/cn'
import { useT } from '@/lib/i18n'

const DAY_START = 6
const DAY_END = 24
const HOURS = [6, 9, 12, 15, 18, 21, 24]

function hourValue(date: Date) {
  return date.getHours() + date.getMinutes() / 60
}

function storedHour(value: string) {
  const [hour = 0, minute = 0] = value.split(':').map(Number)
  return hour + minute / 60
}

function position(hour: number) {
  return ((hour - DAY_START) / (DAY_END - DAY_START)) * 100
}

function timelineCode(title: string) {
  const value = title.toLowerCase()
  if (value.includes('heart failure')) return 'HF'
  if (value.includes('ecg')) return 'ECG'
  if (value.includes('diuretic')) return 'DIU'
  if (value.includes('examination')) return 'OSCE'
  return title.split(/\s+/).slice(0, 2).map((word) => word[0]).join('').toUpperCase()
}

function PlanRow({ block, index, onToggle }: { block: PlanBlock; index: number; onToggle: () => void }) {
  return (
    <button type="button" aria-pressed={block.done} onClick={onToggle} className="group grid w-full grid-cols-[1.75rem_4.75rem_minmax(0,1fr)] items-center gap-2 rounded-lg px-2 py-2.5 text-left transition-colors hover:bg-inset sm:grid-cols-[1.9rem_5.3rem_minmax(0,1fr)_auto_auto] sm:gap-3">
      <span className={cn('grid size-6 place-items-center rounded-lg border transition-colors', block.done ? 'border-accent bg-accent' : 'border-line-2 bg-surface group-hover:border-ink-3')}>
        {block.done && <Icon icon={Check} size={14} strokeWidth={2.7} className="text-on-accent" />}
      </span>
      <span className="tnum font-mono text-[12px] text-ink-2">{formatTimeString(block.time)}</span>
      <span className={cn('min-w-0 truncate text-[13.5px]', block.done ? 'text-ink-3 line-through decoration-line-2' : 'font-medium text-ink')}>{block.title}</span>
      <ChapterMark subjectId={block.subjectId} index={index + 1} compact className="hidden sm:inline-flex" />
      <span className="tnum hidden w-10 text-right font-mono text-[11.5px] text-ink-3 sm:block">{block.minutes}m</span>
    </button>
  )
}

/** The full-width schedule timeline (top of the dashboard "L"). */
export function TodaysSchedule() {
  const t = useT()
  const blocks = todaysPlan
  const now = new Date()
  const current = Math.min(100, Math.max(0, position(hourValue(now))))

  return (
    <Panel className="overflow-hidden">
      <PanelHeader title={t('Today')} icon={Clock3} hint={formatLongDate(now)} action={<div className="flex items-center gap-4 text-[11.5px] text-ink-2"><span className="inline-flex items-center gap-1.5"><span className="size-2.5 rounded bg-accent" />{t('Faculty')}</span><span className="inline-flex items-center gap-1.5"><span className="size-2.5 rounded border border-line-2 bg-[repeating-linear-gradient(45deg,var(--color-line),var(--color-line)_2px,transparent_2px,transparent_4px)]" />{t('Yours')}</span></div>} />

      <div className="px-3 py-4 sm:px-6 sm:py-5">
        <div className="relative ps-14 sm:ps-20">
          <div className="absolute start-0 top-0 text-[10.5px] font-bold uppercase tracking-[0.07em] text-ink-3">{t('Faculty')}</div>
          <div className="relative h-10 rounded-lg bg-inset">
            {todaySessions.map((session) => {
              const start = position(hourValue(session.start))
              const width = position(hourValue(session.end)) - start
              return <button type="button" key={session.id} aria-label={session.title} className="group absolute top-1.5 z-0 h-7 rounded-md bg-accent hover:z-30 focus:z-30" style={{ left: `${start}%`, width: `${Math.max(width, 4)}%` }}>
                <span className="flex h-full w-full items-center justify-center overflow-hidden px-0.5 font-mono text-[8.5px] font-bold tracking-[-0.04em] text-on-accent">{timelineCode(session.title)}</span>
                <span className="pointer-events-none absolute inset-y-0 left-0 flex min-w-48 items-center rounded-md border border-accent-strong bg-accent px-3 text-[11px] font-semibold text-on-accent opacity-0 shadow-raised transition-opacity group-hover:opacity-100 group-focus:opacity-100">{session.title}</span>
              </button>
            })}
          </div>

          <div className="absolute start-0 top-14 text-[10.5px] font-bold uppercase tracking-[0.07em] text-ink-3">{t('Your plan')}</div>
          <div className="relative mt-3 h-10 rounded-lg bg-inset">
            {blocks.map((block) => {
              const late = storedHour(block.time) >= 18
              return <button type="button" key={block.id} aria-label={block.title} className="group absolute top-1.5 z-0 h-7 rounded-md border border-line-2 bg-[repeating-linear-gradient(45deg,var(--color-surface),var(--color-surface)_4px,var(--color-line)_4px,var(--color-line)_6px)] hover:z-30 focus:z-30" style={{ left: `${position(storedHour(block.time))}%`, width: `${Math.max((block.minutes / 60 / (DAY_END - DAY_START)) * 100, 2.2)}%` }}>
                <span className="flex h-full w-full items-center justify-center overflow-hidden bg-surface/70 font-mono text-[8px] font-bold text-ink-2">{block.kind[0]}</span>
                <span className={cn('pointer-events-none absolute inset-y-0 flex min-w-48 items-center rounded-md border border-line-2 bg-surface px-3 text-[11px] font-semibold text-ink opacity-0 shadow-raised transition-opacity group-hover:opacity-100 group-focus:opacity-100', late ? 'right-0' : 'left-0')}>{block.title}</span>
              </button>
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

/** The half-width task checklist (left leg of the "L"). */
export function TodaysPlanList() {
  const t = useT()
  const [blocks, setBlocks] = useState<PlanBlock[]>(todaysPlan)
  const done = blocks.filter((block) => block.done).length
  const donePct = Math.round((done / blocks.length) * 100)
  const remaining = blocks.filter((block) => !block.done).reduce((sum, block) => sum + block.minutes, 0)

  function toggle(id: string) {
    setBlocks((previous) => previous.map((block) => block.id === id ? { ...block, done: !block.done } : block))
  }

  return (
    <Panel className="flex h-full flex-col overflow-hidden">
      <PanelHeader title={t("Today's plan")} icon={Clock3} hint={`${blocks.length} ${t('blocks')}`} />
      <div className="flex-1 px-3 py-3">
        <ul>{blocks.map((block, index) => <li key={block.id}><PlanRow block={block} index={index} onToggle={() => toggle(block.id)} /></li>)}</ul>
      </div>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-line px-4 py-3 sm:px-5">
        <span className="shrink-0 text-[12.5px] text-ink-2"><span className="tnum font-mono font-semibold text-ink">{done} {t('of')} {blocks.length}</span> {t('done')}</span>
        <Meter value={donePct} tone="success" className="order-3 basis-full sm:order-none sm:flex-1 sm:basis-auto" />
        <span className="tnum shrink-0 font-mono text-[12px] text-ink-3">{formatMinutes(remaining)} {t('left')}</span>
      </div>
    </Panel>
  )
}
