import { NextStepSkeleton } from '@/components/loading/DashboardSkeletons'
import { LoadingError } from '@/components/loading/LoadingError'
import { Link } from 'react-router-dom'
import { preloadStudentRoute } from '@/router'
import {
  AlarmClock, BookOpenText, CalendarClock, CalendarPlus,
  FileQuestion, MapPin, PenLine, Stethoscope,
} from 'lucide-react'
import { EXAM_KIND_LABEL, type StudyKind } from '@/data/examProgramme'
import { useNextExam, useNextExamState } from '@/lib/useExamProgramme'
import { useUpcoming } from '@/lib/useUpcoming'
import { nextUp, itemMinutes, type UpcomingItem } from '@/lib/upcoming'
import { formatClock, formatLongDate, formatMinutes } from '@/lib/format'
import { useT } from '@/lib/i18n'
import { ButtonLink } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Icon } from '@/components/ui/Icon'
import { EmptyState } from '@/components/ui/EmptyState'
import { cn } from '@/lib/cn'

const KIND_ICON: Record<StudyKind, typeof FileQuestion> = {
  reading: BookOpenText,
  questions: FileQuestion,
  written: PenLine,
  practical: Stethoscope,
}

const KIND_TITLE: Record<StudyKind, string> = {
  reading: 'Reading block',
  questions: 'Question block',
  written: 'Written block',
  practical: 'Practical block',
}

const KIND_ROUTE: Record<StudyKind, string> = {
  reading: '/app/library',
  questions: '/app/qbank',
  written: '/app/essays',
  practical: '/app/practical',
}

const KIND_UNIT: Record<StudyKind, string> = {
  reading: 'articles',
  questions: 'questions',
  written: 'questions',
  practical: 'items',
}

/** How far the countdown dial fills at zero days away. */
const DIAL_TICKS = 20

/**
 * The days-left dial — ticks counting down, not a ring filling up.
 *
 * Every other percentage on this dashboard is a circular ring, because it is
 * reporting how much of something has been done. A countdown is reporting the
 * opposite kind of fact — how much time is left, not earned — so it is drawn
 * as a shrinking row of segments rather than a growing arc. Mistaking the two
 * used to read as "38% ready" on a day that meant "38 days left".
 */
function CountdownDial({ daysAway }: { daysAway: number }) {
  const t = useT()
  const filled = Math.max(0, Math.min(daysAway, DIAL_TICKS))
  return (
    <div className="flex shrink-0 flex-col items-center gap-3">
      <div className="flex items-end gap-[3px]" aria-hidden>
        {Array.from({ length: DIAL_TICKS }).map((_, index) => (
          <span
            key={index}
            className={cn(
              'w-[3px] rounded-full transition-colors',
              index < filled ? 'bg-primary' : 'bg-inset',
              index % 5 === 0 ? 'h-6' : 'h-4',
            )}
          />
        ))}
      </div>
      <div className="text-center">
        <p className="tnum font-mono text-[44px] font-bold leading-none tracking-tight text-ink">{daysAway}</p>
        <p className="mt-1 text-[11.5px] font-medium text-ink-3">
          {daysAway === 1 ? t('day left') : t('days left')}
        </p>
      </div>
    </div>
  )
}

/** A short, slim entry for the "Then" strip — no card, just a line. */
function ThenPill({ eyebrow, title, to }: { eyebrow: string; title: string; to: string }) {
  return (
    <Link
      to={to}
      onMouseEnter={() => preloadStudentRoute(to)}
      onFocus={() => preloadStudentRoute(to)}
      onTouchStart={() => preloadStudentRoute(to)}
      className="flex min-h-11 flex-1 items-center gap-2.5 rounded-lg border border-line bg-surface/60 px-3 py-2.5 text-start transition-colors hover:bg-surface sm:min-h-0"
    >
      <span className="tnum shrink-0 font-mono text-[11px] text-ink-3">{eyebrow}</span>
      <span className="min-w-0 flex-1 truncate text-[12.5px] font-medium text-ink">{title}</span>
    </Link>
  )
}

/**
 * The one next step toward the closest exam, backed by that exam's own plan.
 *
 * Only the first item of today's plan is featured — the rest of today, and
 * whatever opens tomorrow's plan, moves into the slim "Then" row below it. A
 * student handed the whole day's workload as one card reads it as a pile, not
 * a sequence.
 */
function ExamHero() {
  const t = useT()
  const next = useNextExam()
  if (!next?.programme) return null
  const { exam, programme } = next
  const today = programme.days[0]
  if (!today?.items.length) return null

  const [featured, ...restToday] = today.items
  const tomorrow = programme.days[1]
  const then = restToday.length > 0
    ? restToday.map((item) => ({ item, dayLabel: t('Later today') }))
    : (tomorrow?.items ?? []).slice(0, 2).map((item) => ({ item, dayLabel: t('Tomorrow') }))

  return (
    <div className="w-full">
      <div className="flex flex-col gap-6 rounded-2xl border border-line bg-surface p-6 shadow-pop sm:flex-row sm:items-center sm:gap-9 sm:p-8">
        <CountdownDial daysAway={programme.daysAway} />

        <div className="min-w-0 flex-1 text-center sm:text-start">
          <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-start">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-primary-line bg-primary-tint px-2.5 py-1 text-[11.5px] font-semibold text-primary-strong">
              <Icon icon={AlarmClock} size={12} />
              {t('Your next step')}
            </span>
            <Badge tone="primary" className="text-[10.5px]">{EXAM_KIND_LABEL[exam.examKind ?? 'other']}</Badge>
          </div>

          <h2 className="mt-2.5 font-serif text-[22px] font-semibold leading-[1.18] tracking-[-0.02em] text-ink sm:text-[24px]">
            {t(KIND_TITLE[featured.kind])}
          </h2>
          <p className="mt-1 text-[12.5px] text-ink-3">{programme.examTitle}</p>

          <div className="mt-2.5 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[12.5px] text-ink-2 sm:justify-start">
            <span className="tnum font-mono text-ink-3">
              {featured.itemIds.length} {t(KIND_UNIT[featured.kind])}
            </span>
            {featured.minutes > 0 && (
              <span className="tnum text-ink-3">· {formatMinutes(featured.minutes)}</span>
            )}
          </div>

          <p className="mt-2.5 max-w-md text-[12.5px] leading-relaxed text-ink-3">
            {today.isConsolidation
              ? t('Going back over everything — no new material this close to the paper.')
              : t('Today, weighted the way this paper is marked.')}
          </p>

          <div className="mt-4 flex flex-wrap justify-center gap-2 sm:justify-start">
            <ButtonLink to={KIND_ROUTE[featured.kind]} variant="primary" size="md" iconLeft={KIND_ICON[featured.kind]}>
              {t('Start now')}
            </ButtonLink>
          </div>
        </div>
      </div>

      {then.length > 0 && (
        <div className="mt-3 flex items-center gap-3">
          <span className="shrink-0 text-[12px] font-semibold text-ink-3">{t('Then')}</span>
          <div className="flex min-w-0 flex-1 gap-2">
            {then.map(({ item, dayLabel }, index) => (
              <ThenPill
                key={`${item.kind}-${index}`}
                eyebrow={dayLabel}
                title={`${t(KIND_TITLE[item.kind])} · ${item.itemIds.length} ${t(KIND_UNIT[item.kind])}`}
                to={KIND_ROUTE[item.kind]}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

/** Where an item sends the student to prepare, when there is no exam plan to ask. */
function actionFor(item: UpcomingItem): { to: string; icon: typeof FileQuestion } {
  const kind = item.kind.toLowerCase()
  if (kind.includes('practical') || kind.includes('station')) return { to: '/app/practical', icon: Stethoscope }
  if (kind.includes('review') || kind.includes('revision') || kind.includes('question')) return { to: '/app/qbank', icon: FileQuestion }
  return { to: '/app/library', icon: BookOpenText }
}

/**
 * The next thing on the calendar, used as the hero whenever there is no exam
 * ahead — which is most of the year. Same shape as the exam hero, minus the
 * countdown dial: there is nothing here counting down to.
 */
function ScheduleHero() {
  const t = useT()
  const { items, hasYear, hasBlocks } = useUpcoming()
  const next = nextUp(items, new Date())

  if (!next) {
    return (
      <div className="w-full rounded-2xl border border-line bg-surface p-6 shadow-pop sm:p-8">
        <EmptyState
          icon={CalendarClock}
          title={hasYear || hasBlocks ? t('Nothing left to come') : t('Nothing scheduled yet')}
          description={hasYear
            ? t('Your year has no further published sessions, and you have nothing planned after now.')
            : t("Your university hasn't published a timetable for your year. Plan your own study blocks and they will show up here.")}
          action={<ButtonLink to="/app/calendar" variant="secondary" size="sm" iconLeft={CalendarPlus}>{t('Plan a study block')}</ButtonLink>}
        />
      </div>
    )
  }

  const action = actionFor(next)
  const minutes = itemMinutes(next)
  const following = items.filter((item) => item.start > next.start).slice(0, 2)
  const live = next.start.getTime() <= Date.now()

  return (
    <div className="w-full">
      <div className="flex flex-col gap-6 rounded-2xl border border-line bg-surface p-6 shadow-pop sm:flex-row sm:items-center sm:gap-9 sm:p-8">
        <div className="flex shrink-0 flex-col items-center gap-1">
          <span className="tnum font-serif text-[34px] font-semibold leading-none tracking-[-0.03em] text-ink">
            {formatClock(next.start)}
          </span>
          <span className="text-[11.5px] text-ink-3">{formatLongDate(next.start)}</span>
          {live && <Badge tone="success" className="mt-1 text-[10.5px]">{t('On now')}</Badge>}
        </div>

        <div className="min-w-0 flex-1 text-center sm:text-start">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-primary-line bg-primary-tint px-2.5 py-1 text-[11.5px] font-semibold text-primary-strong">
            <Icon icon={CalendarClock} size={12} />
            {t('Your next step')}
          </span>
          <h2 className="mt-2.5 max-w-md text-balance font-serif text-[22px] font-semibold leading-[1.18] tracking-[-0.02em] text-ink sm:text-[24px]">
            {next.title}
          </h2>
          <div className="mt-2.5 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[12.5px] text-ink-2 sm:justify-start">
            {minutes > 0 && <span className="tnum">{formatMinutes(minutes)}</span>}
            {next.location && (
              <span className="inline-flex items-center gap-1.5">
                <Icon icon={MapPin} size={13} className="text-ink-3" />
                {next.location}
              </span>
            )}
          </div>
          <div className="mt-4 flex flex-wrap justify-center gap-2 sm:justify-start">
            <ButtonLink to={action.to} variant="primary" size="md" iconLeft={action.icon}>{t('Start now')}</ButtonLink>
          </div>
        </div>
      </div>

      {following.length > 0 && (
        <div className="mt-3 flex items-center gap-3">
          <span className="shrink-0 text-[12px] font-semibold text-ink-3">{t('Then')}</span>
          <div className="flex min-w-0 flex-1 gap-2">
            {following.map((item) => (
              <ThenPill
                key={item.id}
                eyebrow={item.start.toDateString() === new Date().toDateString() ? formatClock(item.start) : formatLongDate(item.start)}
                title={item.title}
                to={actionFor(item).to}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

/**
 * The dashboard's hero: the one next step, and how long there is left to
 * prepare for whatever exam is closest.
 *
 * Prefers the exam plan when one is open, because a date on the calendar
 * outranks everything else a student could do today. Falls back to the plain
 * schedule the rest of the year, when there is no exam close enough to plan
 * against — never a blank space where the day's next thing should be.
 */
export function ExamCountdown() {
  const { nextExam: next, loading, error } = useNextExamState()
  const schedule = useUpcoming()
  if (error || schedule.error) return <LoadingError />
  if (loading || schedule.loading) return <NextStepSkeleton />
  if (next?.programme?.days[0]?.items.length) return <ExamHero />
  return <ScheduleHero />
}
