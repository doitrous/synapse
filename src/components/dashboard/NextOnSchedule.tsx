import { Link } from 'react-router-dom'
import {
  BookOpen,
  ArrowRight,
  CalendarClock,
  CalendarPlus,
  Check,
  ListChecks,
  MapPin,
  Stethoscope,
  Video,
} from 'lucide-react'
import type { Session } from '@/data/types'
import { getSubject, nextSession, todaySessions } from '@/data/student'
import { Panel, PanelHeader } from '@/components/ui/Panel'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Icon } from '@/components/ui/Icon'
import { ChapterMark } from '@/components/ui/ChapterMark'
import { formatClock, formatLongDate, formatMinutes } from '@/lib/format'
import { usePersistentState } from '@/lib/usePersistentState'
import { useT } from '@/lib/i18n'

interface PlannedCalendarBlock {
  id: string
  title: string
  date: string
  start: string
  end: string
  subjectId: string
  kind: string
  sourceSessionId?: string
}

function durationLabel(session: Session): string {
  return formatMinutes(Math.round((session.end.getTime() - session.start.getTime()) / 60000))
}

function isoDay(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
}

function timeValue(date: Date): string {
  return `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`
}

export function NextOnSchedule() {
  const t = useT()
  const subject = getSubject(nextSession.subjectId)
  const later = todaySessions.filter((session) => session.id !== nextSession.id).slice(0, 3)
  const chapterIndex = todaySessions.findIndex((session) => session.id === nextSession.id) + 1
  const [blocks, setBlocks] = usePersistentState<PlannedCalendarBlock[]>('synapse.calendar.blocks', [])
  const planned = blocks.some((block) => block.sourceSessionId === nextSession.id)
  const action = nextSession.kind === 'OSCE' || nextSession.kind === 'Lab'
    ? { label: t('Open station'), to: '/app/practical', icon: Stethoscope }
    : nextSession.kind === 'Self-study'
      ? { label: t('Start test block'), to: '/app/qbank', icon: ListChecks }
      : { label: t('Open prep materials'), to: '/app/library', icon: BookOpen }

  function addToPlan() {
    if (planned) return
    setBlocks((current) => [
      ...current,
      {
        id: `session-plan-${nextSession.id}`,
        title: nextSession.title,
        date: isoDay(nextSession.start),
        start: timeValue(nextSession.start),
        end: timeValue(nextSession.end),
        subjectId: nextSession.subjectId,
        kind: nextSession.kind,
        sourceSessionId: nextSession.id,
      },
    ])
  }

  return (
    <Panel className="flex h-full flex-col overflow-hidden">
      <PanelHeader
        title={t('Next on your schedule')}
        icon={CalendarClock}
        hint={t('Today')}
        action={
          <Link
            to="/app/calendar"
            className="inline-flex items-center gap-1 text-[12.5px] font-medium text-accent hover:text-accent-strong"
          >
            {t('Full schedule')}
            <Icon icon={ArrowRight} size={14} className="rtl:-scale-x-100" />
          </Link>
        }
      />

      <div className="flex flex-col p-5 sm:p-6">
        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
          <span className="tnum font-serif text-[38px] font-semibold leading-none tracking-[-0.035em] text-ink sm:text-[44px]">
            {formatClock(nextSession.start)}
          </span>
          <span className="text-[14px] font-medium text-ink-3 sm:text-[15px]">
            {formatLongDate(nextSession.start)}
          </span>
        </div>

        <h3 className="mt-5 max-w-4xl text-balance font-serif text-[24px] font-semibold leading-[1.16] tracking-[-0.02em] text-ink sm:text-[28px]">
          {nextSession.title}
        </h3>

        <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-3 text-[13px] text-ink-2 sm:text-[14px]">
          <span className="inline-flex items-center gap-2 whitespace-nowrap">
            <Icon icon={CalendarClock} size={17} strokeWidth={2.15} className="text-ink-3" />
            <span className="tnum">{formatClock(nextSession.start)} – {formatClock(nextSession.end)}</span>
            <span className="text-ink-3">· {durationLabel(nextSession)}</span>
          </span>
          <span className="inline-flex items-center gap-2">
            <Icon icon={nextSession.online ? Video : MapPin} size={17} strokeWidth={2.15} className="shrink-0 text-ink-3" />
            {nextSession.location}
          </span>
          <ChapterMark subjectId={subject.id} index={Math.max(1, chapterIndex)} />
          <Badge tone="accent" className="px-3 py-1 text-[12px]">{t(nextSession.kind)}</Badge>
        </div>

        <div className="mt-7 flex flex-wrap gap-2.5">
          <Link to={action.to} className="max-sm:w-full">
            <Button className="max-sm:w-full" variant="primary" size="lg" iconLeft={action.icon}>{action.label}</Button>
          </Link>
          <Button
            type="button"
            variant="secondary"
            size="lg"
            iconLeft={planned ? Check : CalendarPlus}
            disabled={planned}
            onClick={addToPlan}
            className="max-sm:w-full"
          >
            {planned ? t('Added to plan') : t('Add to plan')}
          </Button>
        </div>
      </div>

      {later.length > 0 && (
        <div className="mt-auto border-t border-line px-4 pb-2 pt-3 sm:px-5">
          <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.07em] text-ink-3">
            {t('Later today')}
          </p>
          <ul>
            {later.map((session) => (
              <li key={session.id}>
                <Link
                  to="/app/calendar"
                  className="group flex w-full items-center gap-3 rounded-md px-2 py-2 text-left transition-colors hover:bg-inset"
                >
                  <span className="tnum w-28 shrink-0 whitespace-nowrap font-mono text-[11.5px] text-ink-2 sm:w-36 sm:text-[12.5px]">
                    {formatClock(session.start)}–{formatClock(session.end)}
                  </span>
                  <ChapterMark
                    subjectId={session.subjectId}
                    index={todaySessions.findIndex((item) => item.id === session.id) + 1}
                    compact
                  />
                  <span className="min-w-0 flex-1 truncate text-[13px] text-ink">
                    {session.title}
                  </span>
                  <span className="hidden text-[11.5px] text-ink-3 sm:inline">{t(session.kind)}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </Panel>
  )
}
