import { CircleCheck, LineChart, MessagesSquare, Microscope, Radar } from 'lucide-react'
import { FeatureCard, FeatureGrid, HubPage } from '@/components/hub'
import { oralQuestions, skills } from '@/data/practical'
import { summariseSkills } from '@/data/practicalProgress'
import { usePracticalProgress } from '@/lib/usePracticalProgress'
import { useT } from '@/lib/i18n'

/** Clinical rehearsal and the upcoming tools for tracking study progress. */
export function Practice() {
  const t = useT()
  // The same store the two pages write to, so the card and the page it opens
  // can never report different counts.
  const { progress } = usePracticalProgress()
  const oralMarked = Math.min(Object.keys(progress.oral ?? {}).length, oralQuestions.length)
  const skillsSummary = summariseSkills(progress, skills.length)

  return (
    <HubPage
      title={t('Practice')}
    >
      <FeatureGrid>
        <FeatureCard
          to="/app/oral"
          icon={MessagesSquare}
          title={t('Oral questions')}
          description={t('The questions asked across the table, answered aloud and marked by you.')}
          progress={oralQuestions.length ? { kind: 'ring', value: oralMarked, max: oralQuestions.length, label: t('marks recorded') } : undefined}
          stats={[
            { label: t('Questions'), value: String(oralQuestions.length) },
            { label: t('Marked'), value: String(oralMarked) },
          ]}
        />
        <FeatureCard
          to="/app/skills"
          icon={CircleCheck}
          title={t('Skills')}
          description={t('The procedures you are expected to perform, and how ready you say you are.')}
          progress={skillsSummary.total ? { kind: 'ring', value: skillsSummary.ready, max: skillsSummary.total, label: t('marked ready') } : undefined}
          stats={[
            { label: t('Skills'), value: String(skillsSummary.total) },
            { label: t('Ready'), value: String(skillsSummary.ready) },
          ]}
        />
        <FeatureCard
          to="/app/performance"
          icon={LineChart}
          title={t('Performance')}
          description={t('How your accuracy is moving, where it slips, and when you actually study.')}
          status="coming-soon"
          comingSoon={{ body: t('Performance will bring your study record and progress together in one place.') }}
        />
        <FeatureCard
          to="/app/adaptive"
          icon={Radar}
          title={t('Adaptive Study')}
          description={t('A session that follows your weakest concepts and re-times them as they firm up.')}
          status="coming-soon"
          comingSoon={{
            body: t('Adaptive Study will build each session from your own mastery ledger, spacing a concept further out every time you get it right and pulling it forward when you do not. It is coming soon.'),
          }}
        />
        <FeatureCard
          to="/app/histology"
          icon={Microscope}
          title={t('Histology Lab')}
          description={t('The slide box and the microscope — pan, zoom, and name what is under the lens.')}
          status="coming-soon"
          comingSoon={{
            body: t('Histology will mark what you name on a slide, the way the question bank marks an answer, and carry it into your record. It is coming soon.'),
          }}
        />
      </FeatureGrid>
    </HubPage>
  )
}
