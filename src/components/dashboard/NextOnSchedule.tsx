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
} from 'lucide-react'
import { getSubject } from '@/data/subjects'
import { Panel, PanelHeader } from '@/components/ui/Panel'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Icon } from '@/components/ui/Icon'
import { EmptyState } from '@/components/ui/EmptyState'
import { SystemMark } from '@/components/ui/SystemMark'
import { formatClock, formatLongDate, formatMinutes } from '@/lib/format'
import { usePersistentState } from '@/lib/usePersistentState'
import { useStudentSchedule, sessionMinutes, type ScheduledSession } from '@/lib/useStudentSchedule'
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

function timeValue(date: Date): string {
  return `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`
}

/** Where a block sends the student to prepare. */
function actionFor(session: ScheduledSession, t: (key: string) => string) {
  if (session.type === 'practical') return { label: t('Open station'), to: '/app/practical', icon: Stethoscope }
  if (session.type === 'review') return { label: t('Start a question block'), to: '/app/qbank', icon: ListChecks }
  return { label: t('Open prep materials'), to: '/app/library', icon: BookOpen }
}

/**
 * The next thing on the student's university timetable.
 *
 * Reads the schedule an admin published for their year. When their year has no
 * schedule, or nothing is left to come, it says so — the previous version
 * showed a fixed "Heart failure: pathophysiology & staging" in "Lecture Theatre
 * B" to every student, every day, forever.
 */
export function NextOnSchedule() {
  const t = useT()
  const { sessions, hasYear } = useStudentSchedule()
  const [blocks, setBlocks] = usePersistentState<PlannedCalendarBlock[]>('synapse.calendar.blocks', [])

  const now = Date.now()
  const next = sessions.find((session) => (session.end ?? session.start).getTime() >= now)

  if (!next) {
    return (
      <Panel className="flex h-full flex-col overflow-hidden">
        <PanelHeader title={t('Next on your schedule')} icon={CalendarClock} />
        <div className="flex flex-1 items-center justify-center p-4">
          <EmptyState
            icon={CalendarClock}
            title={hasYear ? t('Nothing left today') : t('No timetable yet')}
            description={hasYear
              ? t('Your year has no further published sessions coming up.')
              : t("Your university hasn't published a schedule for your year yet.")}
            action={<Link to="/app/calendar"><Button variant="secondary" size="sm">{t('Open the calendar')}</Button></Link>}
          />
        </div>
      </Panel>
    )
  }

  const subject = getSubject(next.topicIds[0] ?? '')
  const sameDayIndex = sessions.filter((session) =>
    session.start.toDateString() === next.start.toDateString()
    && session.start.getTime() <= next.start.getTime()).length
  const planned = blocks.some((block) => block.sourceSessionId === next.id)
  const action = actionFor(next, t)
  const minutes = sessionMinutes(next)

  function addToPlan() {
    if (planned || !next) return
    setBlocks((current) => [
      ...current,
      {
        id: `session-plan-${next.id}`,
        title: next.title || next.label,
        date: next.date,
        start: timeValue(next.start),
        end: next.end ? timeValue(next.end) : timeValue(next.start),
        subjectId: subject.id,
        kind: next.label,
        sourceSessionId: next.id,
      },
    ])
  }

  return (
    <Panel className="flex h-full flex-col overflow-hidden">
      <PanelHeader
        title={t('Next on your schedule')}
        icon={CalendarClock}
        hint={next.courseName}
        action={
          <Link to="/app/calendar" className="inline-flex items-center gap-1 text-[12.5px] font-medium text-primary hover:text-primary-strong">
            {t('Full schedule')}
            <Icon icon={ArrowRight} size={14} className="rtl:-scale-x-100" />
          </Link>
        }
      />

      <div className="flex flex-1 flex-col items-center justify-center p-4 text-center">
        <div className="flex flex-wrap items-baseline justify-center gap-x-3 gap-y-0.5">
          <span className="tnum font-serif text-[30px] font-semibold leading-none tracking-[-0.03em] text-ink sm:text-[34px]">
            {formatClock(next.start)}
          </span>
          <span className="text-[13px] font-medium text-ink-3">{formatLongDate(next.start)}</span>
        </div>

        <h3 className="mt-2.5 max-w-xl text-balance font-serif text-[19px] font-semibold leading-[1.18] tracking-[-0.02em] text-ink sm:text-[21px]">
          {next.title || next.label}
        </h3>

        <div className="mt-2.5 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[12.5px] text-ink-2">
          {next.end && (
            <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
              <Icon icon={CalendarClock} size={15} strokeWidth={2.15} className="text-ink-3" />
              <span className="tnum">{formatClock(next.start)} – {formatClock(next.end)}</span>
              {minutes > 0 && <span className="text-ink-3">· {formatMinutes(minutes)}</span>}
            </span>
          )}
          {next.location && (
            <span className="inline-flex items-center gap-1.5">
              <Icon icon={MapPin} size={15} strokeWidth={2.15} className="shrink-0 text-ink-3" />
              {next.location}
            </span>
          )}
          {next.topicIds.length > 0 && <SystemMark subjectId={subject.id} index={Math.max(1, sameDayIndex)} />}
          <Badge tone={next.isExam ? 'danger' : 'primary'} className="text-[11.5px]">{t(next.label)}</Badge>
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
