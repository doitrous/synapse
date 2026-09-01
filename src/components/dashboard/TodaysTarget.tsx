import { useMemo } from 'react'
import { CalendarDays, Play } from 'lucide-react'
import { Panel } from '@/components/ui/Panel'
import { ButtonLink } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
import { TargetRing } from '@/components/ui/TargetRing'
import { StreakDots, type DayStatus } from '@/components/ui/StreakDots'
import { formatLongDate } from '@/lib/format'
import { useI18n } from '@/lib/i18n'
import { useIdentity } from '@/lib/useIdentity'
import { useUpcoming } from '@/lib/useUpcoming'
import { itemsOn } from '@/lib/upcoming'
import { useAttemptHistory } from '@/lib/useAttemptLog'
import { useQotd } from '@/lib/useQotd'
import { dailyCounts } from '@/data/attemptStats'

/**
 * No per-student daily target exists in settings yet. Forty questions is a
 * sensible default sitting — enough to matter, short enough to actually
 * finish — until the app exposes one to set.
 */
const DAILY_QUESTION_GOAL = 40

function greetingKey(): string {
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
 * The dashboard's hero: the day's own bullseye.
 *
 * One target ring for today's attempted questions against a daily goal, one
 * line saying how far that is from earning the centre dot, and the single
 * action that actually moves it — continuing into the question bank, which
 * itself offers the real "still open" sitting when there is one (see
 * `ContinueCard`). Everything else on the page is context; this is the ask.
 */
export function TodaysTarget() {
  const { t, lang } = useI18n()
  const { displayName } = useIdentity()
  const { items } = useUpcoming()
  const { records } = useAttemptHistory()
  const qotd = useQotd()

  const now = new Date()
  const today = itemsOn(items, now)
  const personal = today.filter((item) => item.source === 'personal')
  const donePersonal = personal.filter((item) => item.done).length

  const qbankRecords = useMemo(
    () => records.filter((record) => record.surface === 'qbank' || record.surface === 'room'),
    [records],
  )
  const todayCount = dailyCounts(qbankRecords, 1, now)[0]?.attempts ?? 0
  const remaining = Math.max(0, DAILY_QUESTION_GOAL - todayCount)
  const earned = todayCount >= DAILY_QUESTION_GOAL

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

  return (
    <div className="w-full max-w-[46rem]">
      <Panel className="flex flex-col gap-6 p-6 shadow-pop sm:flex-row sm:items-center sm:gap-9 sm:p-8">
        <TargetRing
          value={todayCount}
          max={DAILY_QUESTION_GOAL}
          size={112}
          thickness={9}
          tone="primary"
          label={t('questions')}
          aria-label={`${todayCount} ${t('of')} ${DAILY_QUESTION_GOAL} ${t('questions')}`}
          className="mx-auto sm:mx-0"
        />

        <div className="min-w-0 flex-1 text-center sm:text-start">
          <h1 className="font-serif text-[22px] font-semibold leading-[1.18] tracking-[-0.02em] text-ink sm:text-[24px]">
            {t(greetingKey())}{displayName?.trim() ? `${lang === 'ar' ? '، ' : ', '}${displayName.trim()}` : ''}
          </h1>
          <p className="mt-1.5 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-[12.5px] text-ink-3 sm:justify-start">
            <span className="inline-flex items-center gap-1.5">
              <Icon icon={CalendarDays} size={13} className="text-ink-3" />
              {formatLongDate(now)}
            </span>
            {personal.length > 0 && (
              <span>
                &middot; <span className="tnum font-medium text-ink-2">{donePersonal} {t('of')} {personal.length}</span>{' '}
                {t("of today's blocks are done")}
              </span>
            )}
          </p>

          <p className="mt-3 text-[14px] font-medium text-ink">
            {earned
              ? t('Target hit for today — nice shooting')
              : `${remaining} ${t('more to hit your mark')}`}
          </p>

          {streakDays.length > 0 && (
            <div className="mt-2.5 flex items-center justify-center gap-2 sm:justify-start">
              <StreakDots days={streakDays} />
              <span className="text-[11.5px] text-ink-3">{qotd.current} {t('day streak')}</span>
            </div>
          )}

          <div className="mt-4 flex justify-center sm:justify-start">
            <ButtonLink to="/app/qbank" variant="primary" size="md" iconLeft={Play}>
              {t('Continue')}
            </ButtonLink>
          </div>
        </div>
      </Panel>
    </div>
  )
}
