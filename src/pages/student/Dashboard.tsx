import { Play } from 'lucide-react'
import { Link } from 'react-router-dom'
import { PageContainer } from '@/components/shell/Page'
import { Button } from '@/components/ui/Button'
import { NextOnSchedule } from '@/components/dashboard/NextOnSchedule'
import { DueReviews } from '@/components/dashboard/DueReviews'
import { ExamReadinessCard, PracticalSkillsCard, QuestionBankCard } from '@/components/dashboard/ProgressTrio'
import { TodaysPlan } from '@/components/dashboard/TodaysPlan'
import { StudyHeatmap } from '@/components/dashboard/StudyHeatmap'
import { LastUsedResources } from '@/components/dashboard/LastUsedResources'
import { PerformanceOverview } from '@/components/dashboard/PerformanceOverview'
import { progress } from '@/data/student'
import { formatLongDate } from '@/lib/format'
import { useT } from '@/lib/i18n'

function greetingKey(): string {
  const h = new Date().getHours()
  if (h < 12) return 'Good morning'
  if (h < 18) return 'Good afternoon'
  return 'Good evening'
}

export function Dashboard() {
  const t = useT()
  return (
    <PageContainer>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-x-6 gap-y-4">
        <div>
          <h1 className="font-serif text-[28px] font-semibold tracking-[-0.02em] text-ink sm:text-[32px]">
            {t(greetingKey())}، Maya
          </h1>
          <p className="mt-1.5 text-[14px] text-ink-2">
            {formatLongDate(new Date())} ·{' '}
            <span className="font-medium text-ink">{progress.daysToExam} {t('days')}</span> {t('to your Cardiovascular exam — you\'re on track.')}
          </p>
        </div>
        <Link to="/app/calendar"><Button variant="primary" size="md" iconLeft={Play}>{t("Continue today's plan")}</Button></Link>
      </div>

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

        {/* Today up top; right column: Performance, Exam readiness, then Question bank + Practical */}
        <div className="grid items-start gap-4 lg:grid-cols-2">
          <div className="h-full min-w-0"><TodaysPlan /></div>
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
