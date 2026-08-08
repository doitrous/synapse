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

      <div className="flex flex-1 flex-col items-center justify-center p-4 text-center">
        <div className="flex flex-wrap items-baseline justify-center gap-x-3 gap-y-0.5">
          <span className="tnum font-serif text-[30px] font-semibold leading-none tracking-[-0.03em] text-ink sm:text-[34px]">
            {formatClock(nextSession.start)}
          </span>
          <span className="text-[13px] font-medium text-ink-3">
            {formatLongDate(nextSession.start)}
          </span>
        </div>

        <h3 className="mt-2.5 max-w-xl text-balance font-serif text-[19px] font-semibold leading-[1.18] tracking-[-0.02em] text-ink sm:text-[21px]">
          {nextSession.title}
        </h3>

        <div className="mt-2.5 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[12.5px] text-ink-2">
          <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
            <Icon icon={CalendarClock} size={15} strokeWidth={2.15} className="text-ink-3" />
            <span className="tnum">{formatClock(nextSession.start)} – {formatClock(nextSession.end)}</span>
            <span className="text-ink-3">· {durationLabel(nextSession)}</span>
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Icon icon={nextSession.online ? Video : MapPin} size={15} strokeWidth={2.15} className="shrink-0 text-ink-3" />
            {nextSession.location}
          </span>
          <ChapterMark subjectId={subject.id} index={Math.max(1, chapterIndex)} compact />
          <Badge tone="accent" className="text-[11.5px]">{t(nextSession.kind)}</Badge>
        </div>

        <div className="mt-4 flex flex-wrap justify-center gap-2">
          <Link to={action.to} className="max-sm:w-full">
            <Button className="max-sm:w-full" variant="primary" size="md" iconLeft={action.icon}>{action.label}</Button>
          </Link>
          <Button
            type="button"
            variant="secondary"
            size="md"
            iconLeft={planned ? Check : CalendarPlus}
            disabled={planned}
            onClick={addToPlan}
            className="max-sm:w-full"
          >
            {planned ? t('Added to plan') : t('Add to plan')}
          </Button>
        </div>
      </div>
    </Panel>
  )
}
