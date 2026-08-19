import { ChevronRight, Play } from 'lucide-react'
import { Link } from 'react-router-dom'
import { PageContainer } from '@/components/shell/Page'
import { Button } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
import { NextOnSchedule } from '@/components/dashboard/NextOnSchedule'
import { DueReviews } from '@/components/dashboard/DueReviews'
import { ExamReadinessCard, PracticalSkillsCard, QuestionBankCard } from '@/components/dashboard/ProgressTrio'
import { TodaysAgenda } from '@/components/dashboard/TodaysAgenda'
import { StudyHeatmap } from '@/components/dashboard/StudyHeatmap'
import { LastUsedResources } from '@/components/dashboard/LastUsedResources'
import { PerformanceOverview } from '@/components/dashboard/PerformanceOverview'
import { formatLongDate } from '@/lib/format'
import { useI18n } from '@/lib/i18n'
import { useIdentity } from '@/lib/useIdentity'
import { useLocalPreference } from '@/lib/useLocalPreference'
import { nextExam, useStudentSchedule } from '@/lib/useStudentSchedule'

function greetingKey(): string {
  const h = new Date().getHours()
  if (h < 12) return 'Good morning'
  if (h < 18) return 'Good afternoon'
  return 'Good evening'
}

export function Dashboard() {
  const { t, lang } = useI18n()
  const { displayName, audienceUnknown } = useIdentity()
  const { sessions } = useStudentSchedule()
  // Closed by default and remembered per device: on the screen someone opens
  // first thing in the morning, last month's accuracy is not the headline.
  const [detail, , toggleDetail] = useLocalPreference('synapse.dashboard.detail', false)
  // Only claimed when an exam is actually on the published timetable. The line
  // used to read "38 days to your Cardiovascular exam — you're on track" from a
  // literal, for every student, on every day of the year.
  const exam = nextExam(sessions)

  return (
    <PageContainer>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-x-6 gap-y-4">
        <div>
          <h1 className="font-serif text-[28px] font-semibold tracking-[-0.02em] text-ink sm:text-[32px]">
            {/* The Arabic comma was hardcoded, so the English greeting read
                "Good afternoon، Student". Punctuation follows the language. */}
            {t(greetingKey())}{lang === 'ar' ? '، ' : ', '}{displayName}
          </h1>
          <p className="mt-1.5 text-[14px] text-ink-2">
            {formatLongDate(new Date())}
            {exam && (
              <>
                {' · '}
                <span className="font-medium text-ink">
                  {exam.daysAway === 0 ? t('today') : `${exam.daysAway} ${exam.daysAway === 1 ? t('day') : t('days')}`}
                </span>{' '}
                {t('to')} {exam.session.title || exam.session.label}
              </>
            )}
          </p>
        </div>
        <Link to="/app/calendar"><Button variant="primary" size="md" iconLeft={Play}>{t("Continue today's plan")}</Button></Link>
      </div>

      {audienceUnknown && (
        <div className="mb-4 rounded-lg border border-warning/30 bg-warning-tint px-4 py-3 text-[13px] leading-relaxed text-ink-2">
          {t('Nobody has recorded where you study, so your timetable and anything scoped to your year stay empty. Everything else works as normal.')}{' '}
          <Link to="/app/account" className="font-semibold text-primary-strong hover:text-primary">{t('Add it in your account')}</Link>
        </div>
      )}

      {/* Four blocks, in the order the questions are asked: what now, what is
          slipping, what today holds, and where I stand. Everything that
          answered "how have I been doing lately" — the accuracy chart, the
          activity heatmap, the last things opened — is a review of the past
          rather than an instruction for the next hour, and sits behind a
          disclosure instead of taking up two more screenfuls above it. This
          page previously showed nine panels at once. */}
      <div className="space-y-4">
        {/* What's next + what's slipping */}
        <div className="grid items-stretch gap-4 lg:grid-cols-3">
          <div className="h-full min-w-0 lg:col-span-2">
            <NextOnSchedule />
          </div>
          <div className="h-full min-w-0 lg:col-span-1">
            <DueReviews />
          </div>
        </div>

        {/* The day itself: both calendars in one list, ticked off in place. The
            separate plan checklist that used to sit below it is gone — it drew
            the same blocks a second time. */}
        <TodaysAgenda />

        {/* Where I stand, on one line rather than as four stacked panels. */}
        <div className="grid min-w-0 gap-4 sm:grid-cols-3">
          <ExamReadinessCard compact />
          <QuestionBankCard compact />
          <PracticalSkillsCard compact />
        </div>

        <section>
          <button
            type="button"
            onClick={toggleDetail}
            aria-expanded={detail}
            className="flex min-h-11 w-full items-center gap-2 rounded-xl border border-line bg-surface px-4 text-start text-[13px] font-semibold text-ink-2 transition-colors hover:bg-inset hover:text-ink"
          >
            {t('How this month has gone')}
            <Icon icon={ChevronRight} size={15} className="ms-auto chevron-turn text-ink-3" open={detail} />
          </button>
          {detail && (
            <div className="mt-4 space-y-4">
              <PerformanceOverview />
              <div className="grid items-stretch gap-4 lg:grid-cols-2">
                <StudyHeatmap />
                <LastUsedResources />
              </div>
            </div>
          )}
        </section>
      </div>
    </PageContainer>
  )
}
