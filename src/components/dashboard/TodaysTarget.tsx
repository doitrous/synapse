import { useMemo, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { Panel } from '@/components/ui/Panel'
import { StreakDots, type DayStatus } from '@/components/ui/StreakDots'
import { useDueReviewSummary } from '@/components/dashboard/DueReviews'
import { EXAM_KIND_LABEL, daysUntil } from '@/data/examProgramme'
import { useI18n } from '@/lib/i18n'
import { useUpcoming } from '@/lib/useUpcoming'
import { itemsOn } from '@/lib/upcoming'
import { useQotd } from '@/lib/useQotd'
import { useNextExam } from '@/lib/useExamProgramme'
import { cn } from '@/lib/cn'

/** Time-of-day greeting key — also used standalone by the dashboard's own
 * big serif "Good evening, {name}" heading, so the two never disagree about
 * what time of day it is. */
export function greetingKey(): string {
  const h = new Date().getHours()
  if (h < 12) return 'Good morning'
  if (h < 18) return 'Good afternoon'
  return 'Good evening'
}

/** Local calendar-day arithmetic on a `YYYY-MM-DD` string, tz-agnostic. */
function shiftDate(dateStr: string, days: number): string {
  const d = new Date(`${dateStr}T00:00:00Z`)
  d.setUTCDate(d.getUTCDate() + days)
  return d.toISOString().slice(0, 10)
}

/**
 * "Oct 10" — a date short enough to ride inside a fact's one-line label.
 *
 * `formatLongDate` carries the year, which is noise next to a countdown that
 * has already said how far away the paper is.
 */
function shortDate(dateStr: string, lang: string): string {
  const [year, month, day] = dateStr.split('-').map(Number)
  if (!year || !month || !day) return ''
  return new Intl.DateTimeFormat(lang === 'ar' ? 'ar-EG-u-nu-latn' : 'en-US', { month: 'short', day: 'numeric' })
    .format(new Date(year, month - 1, day))
}

/** Which colour a fact's figure earns. Exactly one class — `cn` does not merge. */
const TONE_CLASS = {
  ink: 'text-ink',
  primary: 'text-primary-strong',
  warning: 'text-warning',
} as const

/**
 * One fact in the strip: a figure, a label, and the page it belongs to.
 *
 * Quiet on purpose — a link, never a button. The only call to action in the
 * top of the dashboard is "Start now" in Your next step, and four buttons
 * competing with it would make none of them the answer.
 *
 * The hairline between facts lives on the wrapper rather than on the link, so
 * the link keeps its own rounded hover shape and the rule stays straight.
 */
function Fact({
  to, value, unit, label, tone = 'ink', trailing,
}: {
  to: string
  value: ReactNode
  unit?: ReactNode
  label: ReactNode
  tone?: keyof typeof TONE_CLASS
  trailing?: ReactNode
}) {
  return (
    <div className="flex min-w-0 sm:min-w-[8rem] sm:border-s sm:border-line sm:first:border-s-0">
      <Link
        to={to}
        className="flex min-h-[44px] min-w-0 flex-1 flex-col justify-center gap-0.5 rounded-lg border border-line bg-mist/60 px-3 py-2.5 transition-colors hover:bg-inset/50 sm:min-h-0 sm:border-0 sm:bg-transparent sm:px-5 sm:py-1"
      >
        <span className={cn(
          'tnum flex items-baseline gap-1 text-[18px] font-semibold leading-[1.1] tracking-[-0.02em] sm:text-[20px]',
          TONE_CLASS[tone],
        )}>
          {value}
          {unit !== undefined && (
            <span className="text-[12px] font-medium tracking-normal text-ink-3">{unit}</span>
          )}
        </span>
        <span className="flex min-w-0 items-center gap-1.5 text-[11.5px] text-ink-3">
          <span className="min-w-0 truncate">{label}</span>
          {trailing}
        </span>
      </Link>
    </div>
  )
}

/**
 * The dashboard's day strip: the four facts nothing else on the page reports.
 *
 * It used to carry a target ring against an invented forty-question goal,
 * which said the same thing as the progress panel further down and asked for
 * the same click as the card below it. The ring is back — as `TargetSeed`, on
 * a real "answered today" count, in its own hero card above this strip — so
 * this component kept only what it always did well: the streak, what the
 * review queue is holding, how much of today's own plan is ticked off, and
 * how long there is until the next paper — each one a quiet link to the page
 * that owns it, none of them a button. The greeting that used to open this
 * panel moved out too, into the dashboard's own big serif heading.
 */
export function DailyFactsStrip() {
  const { t, lang } = useI18n()
  const { items } = useUpcoming()
  const qotd = useQotd()
  const due = useDueReviewSummary()
  const nextExam = useNextExam()

  const now = new Date()
  const today = itemsOn(items, now)
  const personal = today.filter((item) => item.source === 'personal')
  const donePersonal = personal.filter((item) => item.done).length

  const streakDays = useMemo<DayStatus[]>(() => {
    if (!qotd.current) return []
    const landed = new Set(qotd.history)
    const days: DayStatus[] = []
    for (let offset = 6; offset >= 0; offset--) {
      if (offset === 0) { days.push('today'); continue }
      days.push(landed.has(shiftDate(qotd.date, -offset)) ? 'landed' : 'missed')
    }
    return days
  }, [qotd.current, qotd.history, qotd.date])

  // The exam fact prefers the programme's own figures and falls back to the
  // block itself, because a paper too far out to have opened a plan is still a
  // paper worth counting down to.
  let exam: { daysAway: number; label: string } | null = null
  if (nextExam) {
    const away = nextExam.programme?.daysAway ?? daysUntil(nextExam.exam.date, now)
    if (Number.isFinite(away) && away >= 0) {
      const title = nextExam.programme?.examTitle
        || nextExam.exam.title
        || EXAM_KIND_LABEL[nextExam.exam.examKind ?? 'other']
      const when = shortDate(nextExam.exam.date, lang)
      exam = { daysAway: away, label: when ? `${title} · ${when}` : title }
    }
  }

  const facts: ReactNode[] = [
    <Fact
      key="streak"
      to="/app/qbank"
      value={qotd.current}
      unit={qotd.current === 1 ? t('day') : t('days')}
      tone="primary"
      label={t('Streak')}
      trailing={streakDays.length > 0 ? <StreakDots days={streakDays} size={6} /> : undefined}
    />,
    <Fact
      key="reviews"
      to={due.startHref}
      value={due.count}
      tone={due.count > 0 ? 'warning' : 'ink'}
      label={due.count > 0 ? t('Reviews due today') : t('Nothing due')}
    />,
  ]

  if (personal.length > 0) {
    facts.push(
      <Fact
        key="blocks"
        to="/app/calendar"
        value={donePersonal}
        unit={`${t('of')} ${personal.length}`}
        label={t("Today's blocks done")}
      />,
    )
  }

  if (exam) {
    facts.push(
      <Fact
        key="exam"
        to="/app/calendar"
        value={exam.daysAway}
        unit={exam.daysAway === 1 ? t('day') : t('days')}
        label={exam.label}
      />,
    )
  }

  return (
    <div className="w-full max-w-[60rem]">
      <Panel className="flex px-4 py-3.5 shadow-panel sm:px-6">
        <div className="grid w-full grid-cols-2 gap-2 sm:flex sm:items-stretch sm:gap-0">
          {facts}
        </div>
      </Panel>
    </div>
  )
}
