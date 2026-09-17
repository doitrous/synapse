import { ContentSkeleton } from '@/components/loading/PageSkeleton'
import { LoadingError } from '@/components/loading/LoadingError'
import { useNavigate } from 'react-router-dom'
import { HubStat } from '@/components/hub'
import { PageContainer, PageHeader } from '@/components/shell/Page'
import { SkillsChecklist } from '@/components/practical/SkillsChecklist'
import { skills } from '@/data/practical'
import { summariseSkills } from '@/data/practicalProgress'
import { usePracticalProgress } from '@/lib/usePracticalProgress'
import { useT } from '@/lib/i18n'

/**
 * Skills: the year's checklist, and how ready the student says they are.
 *
 * Its own destination now, because a checklist is something you keep rather
 * than something you visit inside another page. "Practise in OSCE stations"
 * still means the stations, which stayed on Practical — so the link crosses
 * pages instead of selecting a tab.
 */
export function Skills() {
  const t = useT()
  const navigate = useNavigate()
  const { progress, loading, status } = usePracticalProgress()
  const summary = summariseSkills(progress, skills.length)

  // The title and back button need nothing from the ledger, so they paint on
  // the first frame; only the ready-count badge and the checklist body — both
  // sourced from `progress` — wait on it, the same split `University.tsx` uses.
  return (
    <PageContainer>
      <PageHeader
        title={t('Skills')}
        back={{ fallback: '/app/practice' }}
        actions={!loading && summary.total ? (
          <HubStat label="Ready" value={`${summary.ready}/${summary.total}`} sub="marked ready" />
        ) : undefined}
      />
      {status.error ? (
        <LoadingError />
      ) : loading ? (
        <ContentSkeleton shape="skills" />
      ) : (
        <SkillsChecklist onGoToOsce={() => navigate('/app/practical?tab=osce')} />
      )}
    </PageContainer>
  )
}
