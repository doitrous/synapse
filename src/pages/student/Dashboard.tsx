import { Play } from 'lucide-react'
import { Link } from 'react-router-dom'
import { PageContainer } from '@/components/shell/Page'
import { Button } from '@/components/ui/Button'
import { NextOnSchedule } from '@/components/dashboard/NextOnSchedule'
import { DueReviews } from '@/components/dashboard/DueReviews'
import { ExamReadinessCard, PracticalSkillsCard, QuestionBankCard } from '@/components/dashboard/ProgressTrio'
import { TodaysSchedule, TodaysPlanList } from '@/components/dashboard/TodaysPlan'
import { StudyHeatmap } from '@/components/dashboard/StudyHeatmap'
import { LastUsedResources } from '@/components/dashboard/LastUsedResources'
import { PerformanceOverview } from '@/components/dashboard/PerformanceOverview'
import { formatLongDate } from '@/lib/format'
import { useT } from '@/lib/i18n'
import { useIdentity } from '@/lib/useIdentity'
import { nextExam, useStudentSchedule } from '@/lib/useStudentSchedule'

function greetingKey(): string {
  const h = new Date().getHours()
  if (h < 12) return 'Good morning'
  if (h < 18) return 'Good afternoon'
  return 'Good evening'
}

export function Dashboard() {
  const t = useT()
  const { displayName, profileMissing } = useIdentity()
  const { sessions } = useStudentSchedule()
  // Only claimed when an exam is actually on the published timetable. The line
  // used to read "38 days to your Cardiovascular exam — you're on track" from a
  // literal, for every student, on every day of the year.
  const exam = nextExam(sessions)

  return (
    <PageContainer>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-x-6 gap-y-4">
        <div>
          <h1 className="font-serif text-[28px] font-semibold tracking-[-0.02em] text-ink sm:text-[32px]">
            {t(greetingKey())}، {displayName}
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

      {profileMissing && (
        <div className="mb-4 rounded-lg border border-warning/30 bg-warning-tint px-4 py-3 text-[13px] leading-relaxed text-ink-2">
          {t("Your university hasn't set up your student profile yet, so your timetable and any content scoped to your year won't appear. Everything else works as normal.")}
        </div>
      )}

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

        {/* Full-width schedule timeline (top bar of the "L") */}
        <TodaysSchedule />

        {/* Left leg: today's plan list; right: Performance, Exam readiness, Question bank + Practical */}
        <div className="grid items-start gap-4 lg:grid-cols-2">
          <div className="h-full min-w-0"><TodaysPlanList /></div>
          <div className="grid min-w-0 content-start gap-4">
            <PerformanceOverview compact />
            <ExamReadinessCard compact />
            <div className="grid gap-4 sm:grid-cols-2">
              <QuestionBankCard compact />
              <PracticalSkillsCard compact />
            </div>
          </div>
        </div>

        {/* Heatmap left half, Last used resources right half */}
        <div className="grid items-stretch gap-4 lg:grid-cols-2">
          <StudyHeatmap />
          <LastUsedResources />
        </div>
      </div>
    </PageContainer>
  )
}
