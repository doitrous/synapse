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
  const { progress } = usePracticalProgress()
  const summary = summariseSkills(progress, skills.length)

  return (
    <PageContainer>
      <PageHeader
        title={t('Skills')}
        description={t('The procedures you are expected to perform, marked as you practise them and as you become ready.')}
        back={{ fallback: '/app/practice' }}
        actions={summary.total ? (
          <HubStat label="Ready" value={`${summary.ready}/${summary.total}`} sub="marked ready" />
        ) : undefined}
      />
      <SkillsChecklist onGoToOsce={() => navigate('/app/practical?tab=osce')} />
    </PageContainer>
  )
}
