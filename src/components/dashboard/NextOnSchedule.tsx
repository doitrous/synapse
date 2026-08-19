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
  Undo2,
  University,
  UserRound,
} from 'lucide-react'
import { getSubject } from '@/data/subjects'
import { STUDY_BLOCKS_STORAGE_KEY, type StudyBlock } from '@/data/studyBlocks'
import { Panel, PanelHeader } from '@/components/ui/Panel'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Icon } from '@/components/ui/Icon'
import { EmptyState } from '@/components/ui/EmptyState'
import { SystemMark } from '@/components/ui/SystemMark'
import { cn } from '@/lib/cn'
import { formatClock, formatLongDate, formatMinutes } from '@/lib/format'
import { usePersistentState } from '@/lib/usePersistentState'
import { itemMinutes, nextUp, type UpcomingItem } from '@/lib/upcoming'
import { useToggleBlock, useUpcoming } from '@/lib/useUpcoming'
import { useT } from '@/lib/i18n'

function timeValue(date: Date): string {
  return `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`
}

function isoDate(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
}

/** Where an item sends the student to prepare. */
function actionFor(item: UpcomingItem, t: (key: string) => string) {
  const kind = item.kind.toLowerCase()
  if (kind.includes('practical') || kind.includes('station')) return { label: t('Open station'), to: '/app/practical', icon: Stethoscope }
  if (kind.includes('review') || kind.includes('revision') || kind.includes('question')) return { label: t('Start a question block'), to: '/app/qbank', icon: ListChecks }
  return { label: t('Open prep materials'), to: '/app/library', icon: BookOpen }
}

/** Which calendar this came from, said in one chip. */
function SourceChip({ source, className }: { source: UpcomingItem['source']; className?: string }) {
  const t = useT()
  const faculty = source === 'faculty'
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[11px] font-medium',
        faculty ? 'border-accent-line bg-accent-tint text-accent-strong' : 'border-line-2 bg-surface-2 text-ink-2',
        className,
      )}
    >
      <Icon icon={faculty ? University : UserRound} size={12} />
      {faculty ? t('Your university') : t('Your plan')}
    </span>
  )
}

/** The one or two things after the one being shown. */
function ThenRow({ item }: { item: UpcomingItem }) {
  const t = useT()
  const sameDay = item.start.toDateString() === new Date().toDateString()
  return (
    <li className="flex items-center gap-2.5 text-[12px] text-ink-2">
      <span className="tnum shrink-0 font-mono text-ink-3">
        {sameDay ? formatClock(item.start) : formatLongDate(item.start)}
      </span>
      <span className="min-w-0 flex-1 truncate">{item.title}</span>
      <span
        className={cn('size-1.5 shrink-0 rounded-full', item.source === 'faculty' ? 'bg-accent' : 'bg-ink-3')}
        title={item.source === 'faculty' ? t('Your university') : t('Your plan')}
      />
    </li>
  )
}

/**
 * The next thing the student has to be somewhere for, from either calendar.
 *
 * This read the published university timetable alone, so a student whose year
 * has no timetable — which is most of them, most of the time — was told there
 * was nothing coming while their own calendar was full. Both are read now, and
 * the card says which one the answer came from.
 */
export function NextOnSchedule() {
  const t = useT()
  const { items, hasYear, hasBlocks } = useUpcoming()
  const [blocks, setBlocks] = usePersistentState<StudyBlock[]>(STUDY_BLOCKS_STORAGE_KEY, [])
  const toggleBlock = useToggleBlock()

  const next = nextUp(items, new Date())
  const following = next ? items.filter((item) => item.start > next.start).slice(0, 2) : []

  if (!next) {
    return (
      <Panel className="flex h-full flex-col overflow-hidden">
        <PanelHeader title={t('Next on your schedule')} icon={CalendarClock} />
        <div className="flex flex-1 items-center justify-center p-4">
          <EmptyState
            icon={CalendarClock}
            title={hasYear || hasBlocks ? t('Nothing left to come') : t('Nothing scheduled yet')}
            // Two different problems with two different answers. One message for
            // both told half the students something that was not true of them.
            description={hasYear
              ? t('Your year has no further published sessions, and you have nothing planned after now.')
              : t("Your university hasn't published a timetable for your year. Plan your own study blocks and they will show up here.")}
            action={<Link to="/app/calendar"><Button variant="secondary" size="sm" iconLeft={CalendarPlus}>{t('Plan a study block')}</Button></Link>}
          />
        </div>
      </Panel>
    )
  }

  const subject = getSubject(next.subjectId)
  const sameDayIndex = items.filter((item) =>
    item.start.toDateString() === next.start.toDateString()
    && item.start.getTime() <= next.start.getTime()).length
  const planned = blocks.some((block) => block.sourceSessionId === next.recordId)
  const action = actionFor(next, t)
  const minutes = itemMinutes(next)
  const live = next.start.getTime() <= Date.now()

  /** Copy a published session into the student's own blocks. */
  function addToPlan() {
    if (planned || !next || next.source !== 'faculty') return
    setBlocks((current) => [
      ...current,
      {
        id: `session-plan-${next.recordId}`,
        title: next.title,
        date: isoDate(next.start),
        start: timeValue(next.start),
        end: next.end ? timeValue(next.end) : timeValue(next.start),
        subjectId: subject.id,
        kind: next.kind,
        sourceSessionId: next.recordId,
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
          <Link to="/app/calendar" className="inline-flex items-center gap-1 text-[12.5px] font-medium text-accent hover:text-accent-strong">
            {t('Full schedule')}
            <Icon icon={ArrowRight} size={14} className="rtl:-scale-x-100" />
          </Link>
        }
      />

      <div className="flex flex-1 flex-col items-center justify-center p-4 text-center">
        <SourceChip source={next.source} className="mb-3" />

        <div className="flex flex-wrap items-baseline justify-center gap-x-3 gap-y-0.5">
          <span className="tnum font-serif text-[30px] font-semibold leading-none tracking-[-0.03em] text-ink sm:text-[34px]">
            {formatClock(next.start)}
          </span>
          <span className="text-[13px] font-medium text-ink-3">{formatLongDate(next.start)}</span>
          {/* Said plainly, because a card headed "next" showing a time in the
              past reads as stale rather than as the thing you are in. */}
          {live && <Badge tone="success" className="text-[11.5px]">{t('On now')}</Badge>}
        </div>

        <h3 className="mt-2.5 max-w-xl text-balance font-serif text-[19px] font-semibold leading-[1.18] tracking-[-0.02em] text-ink sm:text-[21px]">
          {next.title}
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
          {next.subjectId && <SystemMark subjectId={subject.id} index={Math.max(1, sameDayIndex)} />}
          <Badge tone={next.isExam ? 'danger' : 'accent'} className="text-[11.5px]">{t(next.kind)}</Badge>
        </div>

        <div className="mt-4 flex flex-wrap justify-center gap-2">
          <Link to={action.to} className="max-sm:w-full">
            <Button className="max-sm:w-full" variant="primary" size="md" iconLeft={action.icon}>{action.label}</Button>
          </Link>
          {next.source === 'faculty' ? (
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
          ) : (
            // A block the student wrote is a block they can finish. The old card
            // could only ever offer to add things to a plan, which is nothing to
            // offer about something already on it.
            <Button
              type="button"
              variant="secondary"
              size="md"
              iconLeft={next.done ? Undo2 : Check}
              onClick={() => toggleBlock(next.recordId)}
              className="max-sm:w-full"
            >
              {next.done ? t('Mark as not done') : t('Tick it off')}
            </Button>
          )}
        </div>
      </div>

      {following.length > 0 && (
        <div className="border-t border-line px-4 py-3">
          <p className="mb-1.5 text-[10.5px] font-semibold uppercase tracking-[0.07em] text-ink-3">{t('Then')}</p>
          <ul className="space-y-1.5">
            {following.map((item) => <ThenRow key={item.id} item={item} />)}
          </ul>
        </div>
      )}
    </Panel>
  )
}
