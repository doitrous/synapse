import { CalendarDays } from 'lucide-react'
import { Link } from 'react-router-dom'
import { PageContainer } from '@/components/shell/Page'
import { Icon } from '@/components/ui/Icon'
import { ExamCountdown } from '@/components/dashboard/ExamCountdown'
import { EssayCard, PracticalSkillsCard, QuestionBankCard } from '@/components/dashboard/ProgressTrio'
import { StudyHeatmap } from '@/components/dashboard/StudyHeatmap'
import { useDueReviewSummary } from '@/components/dashboard/DueReviews'
import { formatLongDate } from '@/lib/format'
import { useI18n } from '@/lib/i18n'
import { useIdentity } from '@/lib/useIdentity'
import { useUpcoming } from '@/lib/useUpcoming'
import { itemsOn } from '@/lib/upcoming'

function greetingKey(): string {
  const h = new Date().getHours()
  if (h < 12) return 'Good morning'
  if (h < 18) return 'Good afternoon'
  return 'Good evening'
}

/**
 * The student's own dashboard, redrawn as one focused column.
 *
 * This used to be a grid of independent panels — schedule, reviews, agenda,
 * stats — each competing for the first look. A student opening the app wants
 * one answer, "what do I do right now", not a page of them: the hero above
 * answers that, everything after it is one click away rather than pinned open
 * whether it is needed today or not.
 */
export function Dashboard() {
  const { t, lang } = useI18n()
  const { displayName, audienceUnknown } = useIdentity()
  const { items } = useUpcoming()
  const { count: dueCount, startHref: dueHref } = useDueReviewSummary()

  const now = new Date()
  const today = itemsOn(items, now)
  const personal = today.filter((item) => item.source === 'personal')
  const donePersonal = personal.filter((item) => item.done).length

  return (
    <PageContainer>
      <div className="flex flex-col items-center gap-6 py-4 sm:py-8">
        <div className="text-center">
          <h1 className="font-serif text-[26px] font-semibold tracking-[-0.02em] text-ink sm:text-[30px]">
            {t(greetingKey())}{displayName?.trim() ? `${lang === 'ar' ? '، ' : ', '}${displayName.trim()}` : ''}
          </h1>
          <p className="mt-2 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-[13.5px] text-ink-2">
            <span className="inline-flex items-center gap-1.5">
              <Icon icon={CalendarDays} size={14} className="text-ink-3" />
              {formatLongDate(now)}
            </span>
            {personal.length > 0 && (
              <span>
                &middot; <span className="tnum font-medium text-ink">{donePersonal} {t('of')} {personal.length}</span>{' '}
                {t("of today's blocks are done")}
              </span>
            )}
          </p>
        </div>

        {audienceUnknown && (
          <div className="w-full max-w-[46rem] rounded-lg border border-warning/30 bg-warning-tint px-4 py-3 text-[13px] leading-relaxed text-ink-2">
            {t('Nobody has recorded where you study, so your timetable and anything scoped to your year stay empty. Everything else works as normal.')}{' '}
            <Link to="/app/account" className="font-semibold text-primary-strong hover:text-primary">{t('Add it in your account')}</Link>
          </div>
        )}

        <ExamCountdown />

        <div className="grid w-full max-w-[46rem] min-w-0 gap-3 sm:grid-cols-3">
          <QuestionBankCard compact />
          <EssayCard compact />
          <PracticalSkillsCard compact />
        </div>

        <div className="w-full max-w-[46rem] min-w-0">
          <StudyHeatmap />
        </div>

        <p className="max-w-[46rem] text-center text-[12.5px] text-ink-3">
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
