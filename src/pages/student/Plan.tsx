import { useMemo } from 'react'
import { CalendarDays, GraduationCap, LineChart } from 'lucide-react'
import { FeatureCard, FeatureGrid, HubPage, HubStat } from '@/components/hub'
import { firstAttemptSplit, dailyCounts, bySession } from '@/data/attemptStats'
import { openTasks } from '@/data/tasks'
import { useAttemptHistory } from '@/lib/useAttemptLog'
import { useNextExam } from '@/lib/useExamProgramme'
import { itemsOn } from '@/lib/upcoming'
import { useUpcoming } from '@/lib/useUpcoming'
import { useTasks } from '@/lib/useTasks'
import { dayDiff } from '@/lib/format'
import { useT } from '@/lib/i18n'
import { PageContainer, PageHeader } from '@/components/shell/Page'
import { SkeletonCard } from '@/components/ui/Skeleton'

function examDate(ymd: string): Date | null {
  const [year, month, day] = ymd.split('-').map(Number)
  return year ? new Date(year, month - 1, day) : null
}

/**
 * Plan: where the weeks are going.
 *
 * Three destinations, each carrying the one figure a student would open it
 * for — today's blocks on the calendar, the accuracy behind the performance
 * page — and the university view, which waits on the faculty's published
 * curriculum and says so instead of opening onto an empty screen.
 *
 * Performance keeps its ring and its two figures while it is marked coming
 * soon: they are computed from the student's own attempts and are true today.
 * What is not finished is the page they lead to, and that is what the card and
 * the banner on the page itself say.
 */
export function Plan() {
  const t = useT()
  const { items } = useUpcoming()
  const { records, loading } = useAttemptHistory()
  const { doc } = useTasks()
  const nextExam = useNextExam()

  const now = new Date()
  const qbank = useMemo(() => records.filter((record) => record.surface === 'qbank' || record.surface === 'room'), [records])
  const accuracy = useMemo(() => firstAttemptSplit(qbank).first.accuracy, [qbank])
  const sessions = useMemo(() => bySession(qbank).length, [qbank])

  if (loading) {
    return (
      <PageContainer>
        <PageHeader title={t('Plan')} description={t('Where your weeks are going.')} className="border-b border-line pb-5 sm:pb-6" />
        <div className="stagger grid gap-4 sm:grid-cols-2 xl:grid-cols-3" aria-label={t('Loading…')}>
          <SkeletonCard className="h-40" />
          <SkeletonCard className="h-40" />
          <SkeletonCard className="h-40" />
        </div>
      </PageContainer>
    )
  }

  const today = itemsOn(items, now)
  const personal = today.filter((item) => item.source === 'personal')
  const donePersonal = personal.filter((item) => item.done).length
  const open = openTasks(doc).length
  const week = dailyCounts(qbank, 7, now).reduce((sum, day) => sum + day.attempts, 0)

  const examDay = nextExam ? examDate(nextExam.exam.date) : null
  const daysToExam = examDay ? Math.max(0, dayDiff(examDay, now)) : null

  return (
    <HubPage
      eyebrow="01 · PLAN"
      title={t('Plan')}
      lede={t('Where your weeks are going.')}
      aside={daysToExam !== null ? (
        <HubStat label="Next exam" value={String(daysToExam)} sub={daysToExam === 1 ? 'day away' : 'days away'} />
      ) : (
        <HubStat label="Open tasks" value={String(open)} sub={open === 1 ? 'thing to do' : 'things to do'} />
      )}
    >
      <FeatureGrid>
        <FeatureCard
          to="/app/calendar"
          icon={CalendarDays}
          title={t('Calendar')}
          description={t('Your timetable, the blocks you plan, and the tasks you still owe the week.')}
          progress={personal.length ? { kind: 'bar', value: donePersonal, max: personal.length, label: t("today's blocks") } : undefined}
          stats={[
            { label: t('Open tasks'), value: String(open) },
            daysToExam !== null
              ? { label: t('Next exam'), value: daysToExam === 0 ? t('today') : `${daysToExam} ${daysToExam === 1 ? t('day') : t('days')}` }
              : { label: t('Today'), value: `${donePersonal}/${personal.length}` },
          ]}
        />
        <FeatureCard
          to="/app/university"
          icon={GraduationCap}
          title={t('University')}
          description={t('Your modules, timetable and marks, exactly as your faculty publishes them.')}
          status="coming-soon"
          comingSoon={{
            body: t('The University view will follow your faculty’s published curriculum: every module, its sessions, and the marks as they are released. It opens once your year’s curriculum is published; until then the preview shows the structure with whatever has been shared so far.'),
            previewHref: '/app/university',
          }}
        />
        <FeatureCard
          to="/app/performance"
          icon={LineChart}
          title={t('Performance')}
          description={t('How your accuracy is moving, where it slips, and when you actually study.')}
          progress={accuracy === null ? undefined : { kind: 'ring', value: Math.round(accuracy * 100), max: 100, label: t('first attempt'), tone: 'accent' }}
          stats={[
            { label: t('This week'), value: `${week} ${t('answered')}` },
            { label: t('Sessions'), value: String(sessions) },
          ]}
          status="coming-soon"
          comingSoon={{
            body: t('Performance will report your whole record against your year’s blueprint — every surface, every subject, and where the next mark is most likely to come from. Until then it is a preview: the figures are computed from your own attempts, and they fill in as you answer.'),
            previewHref: '/app/performance',
          }}
        />
      </FeatureGrid>
    </HubPage>
  )
}
