import { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { CalendarPlus, Check, Clock3, MapPin, University, UserRound } from 'lucide-react'
import { Panel, PanelHeader } from '@/components/ui/Panel'
import { Button } from '@/components/ui/Button'
import { Meter } from '@/components/ui/Meter'
import { Icon } from '@/components/ui/Icon'
import { Badge } from '@/components/ui/Badge'
import { EmptyState } from '@/components/ui/EmptyState'
import { SystemMark } from '@/components/ui/SystemMark'
import { formatClock, formatLongDate, formatMinutes } from '@/lib/format'
import { isPast, itemMinutes, itemsOn, type UpcomingItem } from '@/lib/upcoming'
import { useToggleBlock, useUpcoming } from '@/lib/useUpcoming'
import { cn } from '@/lib/cn'
import { useT } from '@/lib/i18n'

/**
 * Today, as one list.
 *
 * This was two rails of percentage-positioned bars — one for the university's
 * sessions, one for the student's own — with every title squeezed into a
 * two-or-three letter code and the real one available only on hover. That is
 * unreadable at a glance, unavailable on a touch screen, and on a phone it was
 * a row of coloured slivers. A day is a short list of things in order, so it is
 * drawn as one.
 *
 * The student's own blocks are ticked off here, in the same record the calendar
 * and the dashboard write, so the tick means the same thing everywhere. That is
 * why the separate checklist that used to sit below this is gone: it rendered
 * the same blocks a second time.
 */

/** Re-rendered every minute, so the now-line and "on now" stay true. */
function useMinuteClock(): Date {
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 60_000)
    return () => window.clearInterval(timer)
  }, [])
  return now
}

function SourceDot({ source, title }: { source: UpcomingItem['source']; title: string }) {
  return (
    <span
      title={title}
      className={cn(
        'grid size-7 shrink-0 place-items-center rounded-full border',
        source === 'faculty'
          ? 'border-primary-line bg-primary-tint text-primary-strong'
          : 'border-line-2 bg-surface-2 text-ink-3',
      )}
    >
      <Icon icon={source === 'faculty' ? University : UserRound} size={14} />
    </span>
  )
}

function AgendaRow({
  item,
  index,
  now,
  onToggle,
}: {
  item: UpcomingItem
  index: number
  now: Date
  onToggle: (blockId: string) => void
}) {
  const t = useT()
  const minutes = itemMinutes(item)
  const past = isPast(item, now)
  const live = item.start.getTime() <= now.getTime() && !past
  const personal = item.source === 'personal'
  const done = Boolean(item.done)

  return (
    <li
      className={cn(
        'flex items-start gap-3 px-4 py-3 transition-opacity sm:px-5',
        past && !live && 'opacity-55',
      )}
    >
      {/* One column for both times, so the titles all start at the same place
          however long the range is. */}
      <div className="tnum w-[4.25rem] shrink-0 pt-0.5 text-end font-mono text-[12px] leading-tight sm:w-[5.5rem]">
        <span className={cn('block', live ? 'font-semibold text-primary-strong' : 'text-ink-2')}>
          {formatClock(item.start)}
        </span>
        {item.end && <span className="block text-[10.5px] text-ink-3">{formatClock(item.end)}</span>}
      </div>

      <SourceDot source={item.source} title={item.source === 'faculty' ? t('Your university') : t('Your plan')} />

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <span className={cn('text-[13.5px] font-medium', done ? 'text-ink-3 line-through decoration-line-2' : 'text-ink')}>
            {item.title}
          </span>
          {live && <Badge tone="success" className="text-[10.5px]">{t('On now')}</Badge>}
          {item.isExam && <Badge tone="danger" className="text-[10.5px]">{t('Exam')}</Badge>}
        </div>
        <div className="mt-0.5 flex flex-wrap items-center gap-x-2.5 gap-y-0.5 text-[11.5px] text-ink-3">
          {item.kind && <span>{t(item.kind)}</span>}
          {item.courseName && <><span aria-hidden>·</span><span className="truncate">{item.courseName}</span></>}
          {item.location && (
            <><span aria-hidden>·</span><span className="inline-flex items-center gap-1"><Icon icon={MapPin} size={12} />{item.location}</span></>
          )}
          {minutes > 0 && <><span aria-hidden>·</span><span className="tnum">{formatMinutes(minutes)}</span></>}
        </div>
      </div>

      {item.subjectId && <SystemMark subjectId={item.subjectId} index={index + 1} className="mt-0.5 hidden shrink-0 sm:inline-flex" />}

      {/* Only a block the student wrote can be ticked. A lecture happening or
          not is not theirs to record. */}
      {personal ? (
        <button
          type="button"
          aria-pressed={done}
          aria-label={done ? `${t('Mark as not done')}: ${item.title}` : `${t('Tick it off')}: ${item.title}`}
          onClick={() => onToggle(item.recordId)}
          className={cn(
            'mt-0.5 grid size-7 shrink-0 place-items-center rounded-lg border transition-colors',
            done ? 'border-primary bg-primary' : 'border-line-2 bg-surface hover:border-ink-3',
          )}
        >
          {done && <Icon icon={Check} size={14} strokeWidth={2.7} className="text-on-primary" />}
        </button>
      ) : (
        <span className="mt-0.5 size-7 shrink-0" aria-hidden />
      )}
    </li>
  )
}

/** The line between what has happened and what has not. */
function NowLine({ now }: { now: Date }) {
  const t = useT()
  return (
    <li aria-hidden className="relative flex items-center gap-3 px-4 sm:px-5">
      <span className="tnum w-[4.25rem] shrink-0 text-end font-mono text-[11px] font-semibold text-danger sm:w-[5.5rem]">
        {formatClock(now)}
      </span>
      <span className="relative flex flex-1 items-center">
        <span className="size-2 shrink-0 rounded-full bg-danger" />
        <span className="h-px flex-1 bg-danger/45" />
        <span className="ms-2 shrink-0 text-[10px] font-semibold uppercase tracking-[0.07em] text-danger">{t('Now')}</span>
      </span>
    </li>
  )
}

export function TodaysAgenda() {
  const t = useT()
  const now = useMinuteClock()
  const { items, hasYear } = useUpcoming()
  const toggleBlock = useToggleBlock()

  const today = itemsOn(items, now)
  const personal = today.filter((item) => item.source === 'personal')
  const done = personal.filter((item) => item.done).length
  const donePct = personal.length ? Math.round((done / personal.length) * 100) : 0
  const remaining = personal
    .filter((item) => !item.done)
    .reduce((sum, item) => sum + itemMinutes(item), 0)

  // Where the day has got to: the number of items already finished is the row
  // the line goes above.
  const passed = today.filter((item) => isPast(item, now)).length
  const showNowLine = passed < today.length

  if (!today.length) {
    return (
      <Panel className="overflow-hidden">
        <PanelHeader title={t('Today')} icon={Clock3} hint={formatLongDate(now)} />
        <div className="p-4 sm:p-6">
          <EmptyState
            icon={Clock3}
            title={t('Nothing scheduled today')}
            description={hasYear
              ? t('Your year has no sessions today. Blocks you plan yourself appear here alongside them.')
              : t('University sessions appear here once your year has a published timetable. Blocks you plan yourself appear here either way.')}
            action={<Link to="/app/calendar"><Button variant="secondary" size="sm" iconLeft={CalendarPlus}>{t('Plan a study block')}</Button></Link>}
          />
        </div>
      </Panel>
    )
  }

  return (
    <Panel className="overflow-hidden">
      <PanelHeader
        title={t('Today')}
        icon={Clock3}
        hint={formatLongDate(now)}
        action={
          <div className="flex items-center gap-3.5 text-[11.5px] text-ink-2">
            <span className="inline-flex items-center gap-1.5">
              <span className="grid size-4 place-items-center rounded-full border border-primary-line bg-primary-tint text-primary-strong"><Icon icon={University} size={9} /></span>
              {t('University')}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="grid size-4 place-items-center rounded-full border border-line-2 bg-surface-2 text-ink-3"><Icon icon={UserRound} size={9} /></span>
              {t('Yours')}
            </span>
          </div>
        }
      />

      <ul className="divide-y divide-line">
        {today.map((item, index) => (
          <Fragment key={item.id}>
            {showNowLine && index === passed && <NowLine now={now} />}
            <AgendaRow item={item} index={index} now={now} onToggle={toggleBlock} />
          </Fragment>
        ))}
        {showNowLine && passed === today.length && <NowLine now={now} />}
      </ul>

      {/* Only about the blocks the student owns: a progress bar over lectures
          they cannot tick would be a number about nothing. */}
      {personal.length > 0 && (
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-line px-4 py-3 sm:px-5">
          <span className="shrink-0 text-[12.5px] text-ink-2">
            <span className="tnum font-mono font-semibold text-ink">{done} {t('of')} {personal.length}</span> {t('done')}
          </span>
          <Meter value={donePct} tone="success" className="order-3 basis-full sm:order-none sm:flex-1 sm:basis-auto" />
          <span className="tnum shrink-0 font-mono text-[12px] text-ink-3">{formatMinutes(remaining)} {t('left')}</span>
        </div>
      )}
    </Panel>
  )
}
