import { Activity, CalendarDays, Play } from 'lucide-react'
import { Link } from 'react-router-dom'
import { PageContainer } from '@/components/shell/Page'
import { Button } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
import { NextOnSchedule } from '@/components/dashboard/NextOnSchedule'
import { DueReviews } from '@/components/dashboard/DueReviews'
import { PracticalSkillsCard, QuestionBankCard } from '@/components/dashboard/ProgressTrio'
import { TodaysAgenda } from '@/components/dashboard/TodaysAgenda'
import { formatLongDate } from '@/lib/format'
import { useI18n } from '@/lib/i18n'
import { useIdentity } from '@/lib/useIdentity'
import { useStudentSchedule } from '@/lib/useStudentSchedule'
import { nextExam } from '@/lib/studentSchedule'
import { ExamCountdown } from '@/components/dashboard/ExamCountdown'

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
  // Only claimed when an exam is actually on the published timetable. The line
  // used to read "38 days to your Cardiovascular exam — you're on track" from a
  // literal, for every student, on every day of the year.
  const exam = nextExam(sessions)

  return (
    <PageContainer>
      <section className="mb-5 overflow-hidden rounded-xl border border-line bg-surface shadow-panel">
        <div className="flex flex-wrap items-start justify-between gap-4 border-b border-line px-4 py-4 sm:px-5">
          <div className="min-w-0">
            <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-line bg-surface-2 px-2.5 py-1 text-[10.5px] font-semibold uppercase tracking-[0.07em] text-ink-3">
              <Icon icon={Activity} size={13} />
              {t('Clinical chart')}
            </div>
            <h1 className="font-serif text-[28px] font-semibold tracking-[-0.02em] text-ink sm:text-[32px]">
              {t(greetingKey())}{lang === 'ar' ? '، ' : ', '}{displayName}
            </h1>
            <p className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-[14px] text-ink-2">
              <span className="inline-flex items-center gap-1.5">
                <Icon icon={CalendarDays} size={14} className="text-ink-3" />
                {formatLongDate(new Date())}
              </span>
              {exam && (
                <span>
                  <span className="font-medium text-ink">
                    {exam.daysAway === 0 ? t('today') : `${exam.daysAway} ${exam.daysAway === 1 ? t('day') : t('days')}`}
                  </span>{' '}
                  {t('to')} {exam.session.title || exam.session.label}
                </span>
              )}
            </p>
          </div>
          <Link to="/app/calendar"><Button variant="primary" size="md" iconLeft={Play}>{t("Continue today's plan")}</Button></Link>
        </div>
      </section>

      {audienceUnknown && (
        <div className="mb-4 rounded-lg border border-warning/30 bg-warning-tint px-4 py-3 text-[13px] leading-relaxed text-ink-2">
          {t('Nobody has recorded where you study, so your timetable and anything scoped to your year stay empty. Everything else works as normal.')}{' '}
          <Link to="/app/account" className="font-semibold text-primary-strong hover:text-primary">{t('Add it in your account')}</Link>
        </div>
      )}

      {/* Above the four blocks, because an exam with a date on it outranks
          everything else a student could do today. Renders nothing when there
          is no exam ahead. */}
      <div className="mb-4"><ExamCountdown /></div>

      <div className="space-y-4">
        <div className="grid items-stretch gap-4 lg:grid-cols-3">
          <div className="h-full min-w-0 lg:col-span-2">
            <NextOnSchedule />
          </div>
          <div className="h-full min-w-0 lg:col-span-1">
            <DueReviews />
          </div>
        </div>

        <TodaysAgenda />

        <div className="grid min-w-0 gap-4 sm:grid-cols-2">
          <QuestionBankCard compact />
          <PracticalSkillsCard compact />
        </div>
      </div>
    </PageContainer>
  )
}
