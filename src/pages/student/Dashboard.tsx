import { Link } from 'react-router-dom'
import { PageContainer } from '@/components/shell/Page'
import { TodaysTarget } from '@/components/dashboard/TodaysTarget'
import { ExamCountdown } from '@/components/dashboard/ExamCountdown'
import { ProgressRingStack } from '@/components/dashboard/ProgressTrio'
import { StudyRhythmSection } from '@/components/dashboard/StudyRhythmSection'
import { TutorialCard } from '@/components/dashboard/TutorialCard'
import { useDueReviewSummary } from '@/components/dashboard/DueReviews'
import { useI18n } from '@/lib/i18n'
import { useIdentity } from '@/lib/useIdentity'

/**
 * The student's own dashboard, redrawn as one focused column.
 *
 * The hero at the top is today's own target — one ring, one line of status,
 * one action — because a student opening the app wants one answer, "what do
 * I do right now", not a page competing for the first look. Everything below
 * it is the quick-access layer: what's next on the calendar, the three
 * headline meters, and the study-rhythm band — the heatmap with today's single
 * question beside it — each one click away rather than pinned open whether it
 * is needed today or not.
 */
export function Dashboard() {
  const { t } = useI18n()
  const { audienceUnknown } = useIdentity()
  const { count: dueCount, startHref: dueHref } = useDueReviewSummary()

  return (
    <PageContainer>
      <div className="flex flex-col items-center gap-6 py-4 sm:py-8">
        <TodaysTarget />

        {audienceUnknown && (
          <div className="w-full max-w-[60rem] rounded-lg border border-warning/30 bg-warning-tint px-4 py-3 text-[13px] leading-relaxed text-ink-2">
            {t('Nobody has recorded where you study, so your timetable and anything scoped to your year stay empty. Everything else works as normal.')}{' '}
            <Link to="/app/account" className="font-semibold text-primary-strong hover:text-primary">{t('Add it in your account')}</Link>
          </div>
        )}

        <div className="grid w-full max-w-[60rem] min-w-0 gap-4 lg:grid-cols-[minmax(0,1fr)_17rem]">
          <div className="min-w-0">
            <ExamCountdown />
          </div>
          <TutorialCard />
        </div>

        <div className="w-full max-w-[60rem] min-w-0">
          <ProgressRingStack />
        </div>

        <div className="w-full max-w-[60rem] min-w-0">
          <StudyRhythmSection />
        </div>

        <p className="max-w-[60rem] text-center text-[12.5px] text-ink-3">
          {t('Everything else lives one click away')} &mdash;{' '}
          <Link to="/app/calendar" className="font-medium text-primary hover:text-primary-strong">{t('full schedule')}</Link>
          {' · '}
          <Link to="/app/performance" className="font-medium text-primary hover:text-primary-strong">{t('performance')}</Link>
          {' · '}
          <Link to={dueHref} className="font-medium text-primary hover:text-primary-strong">
            {t('review queue')} &middot; {dueCount} {t('waiting')}
          </Link>
        </p>
      </div>
    </PageContainer>
  )
}
