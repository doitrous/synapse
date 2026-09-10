import { PageSkeleton } from '@/components/loading/PageSkeleton'
import { LoadingError } from '@/components/loading/LoadingError'
import { HubStat } from '@/components/hub'
import { PageContainer, PageHeader } from '@/components/shell/Page'
import { OralRehearsal } from '@/components/practical/OralRehearsal'
import { oralQuestions } from '@/data/practical'
import { usePracticalProgress } from '@/lib/usePracticalProgress'
import { useT } from '@/lib/i18n'

/**
 * Oral questions: the viva, rehearsed one question at a time.
 *
 * Its own destination on the Practice hub rather than the third tab of
 * Practical. The store is the same one the tab wrote to, so a student who
 * marked questions before the move opens this page on their own record.
 */
export function OralQuestions() {
  const t = useT()
  const { progress, loading, status } = usePracticalProgress()
  const marked = Math.min(Object.keys(progress.oral ?? {}).length, oralQuestions.length)

  if (status.error) return <PageContainer><LoadingError /></PageContainer>
  if (loading) return <PageSkeleton layout={{ shape: 'oral' }} />

  return (
    <PageContainer>
      <PageHeader
        title={t('Oral questions')}
        back={{ fallback: '/app/practice' }}
        actions={oralQuestions.length ? (
          <HubStat
            label="Marked"
            value={`${marked}/${oralQuestions.length}`}
            sub="marked so far"
          />
        ) : undefined}
      />
      <OralRehearsal />
    </PageContainer>
  )
}
