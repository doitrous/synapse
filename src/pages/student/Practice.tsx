import { useMemo } from 'react'
import { CircleCheck, ClipboardList, ListChecks, MessagesSquare, Microscope, PenLine, Sparkles } from 'lucide-react'
import { FeatureCard, FeatureGrid, HubPage, HubStat } from '@/components/hub'
import { dailyCounts } from '@/data/attemptStats'
import { oralQuestions, skills } from '@/data/practical'
import { summariseSkills } from '@/data/practicalProgress'
import { usePracticalProgress } from '@/lib/usePracticalProgress'
import { usePracticeProgress } from '@/lib/usePracticeProgress'
import { useT } from '@/lib/i18n'

/**
 * Practice: every format the exams throw at you.
 *
 * The cards read the same hooks the dashboard's ring stack does — bank seen,
 * practicals attempted, essays marked — deliberately, so a student who checks
 * the dashboard and then opens this hub is never told two different numbers
 * about the same work.
 *
 * Oral questions, Skills and Histology used to be tabs three, four and six of
 * Practical. A viva rehearsal, a skills checklist and a microscope are three
 * different evenings' work, and burying them behind a tab strip on a fourth
 * page meant a student had to already know they were there. They are cards
 * here now; Practical keeps the three that are genuinely one exam format.
 */
export function Practice() {
  const t = useT()
  const { qbankRecords, seen, bankTotal, firstAccuracy: accuracy, practicalTotal, stationCount, caseCount, attempted, essayTotal, markedCount: essaysMarked } = usePracticeProgress()
  const answeredToday = useMemo(() => dailyCounts(qbankRecords, 1).reduce((sum, day) => sum + day.attempts, 0), [qbankRecords])
  // The same store the two pages write to, so the card and the page it opens
  // can never report different counts.
  const { progress } = usePracticalProgress()
  const oralMarked = Math.min(Object.keys(progress.oral ?? {}).length, oralQuestions.length)
  const skillsSummary = summariseSkills(progress, skills.length)

  return (
    <HubPage
      title={t('Practice')}
      lede={t('Every format your exams throw at you.')}
      aside={(
        <HubStat
          label="Answered today"
          value={String(answeredToday)}
          sub={answeredToday === 1 ? 'question today' : 'questions today'}
        />
      )}
    >
      <FeatureGrid>
        <FeatureCard
          to="/app/qbank"
          icon={ListChecks}
          title={t('Question Bank')}
          description={t('Build a test out of any part of the bank, then sit it in tutor or timed mode.')}
          progress={bankTotal ? { kind: 'ring', value: Math.min(seen, bankTotal), max: bankTotal, label: t('of the bank seen') } : undefined}
          stats={[
            { label: t('First attempt'), value: accuracy === null ? '—' : `${Math.round(accuracy * 100)}%` },
            { label: t('Answered'), value: seen.toLocaleString() },
          ]}
        />
        <FeatureCard
          to="/app/practical"
          icon={ClipboardList}
          title={t('Practical')}
          description={t('OSCE stations, clinical cases, and the lab and imaging films you are asked to read.')}
          progress={practicalTotal ? { kind: 'ring', value: Math.min(attempted, practicalTotal), max: practicalTotal, label: t('items attempted') } : undefined}
          stats={[
            { label: t('OSCE stations'), value: String(stationCount) },
            { label: t('Cases'), value: String(caseCount) },
          ]}
        />
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
          to="/app/essays"
          icon={PenLine}
          title={t('Essay')}
          description={t('Write the long answer, then mark yourself against the key points an examiner looks for.')}
          progress={essayTotal ? { kind: 'ring', value: essaysMarked, max: essayTotal, label: t('marked') } : undefined}
          stats={[
            { label: t('Questions'), value: String(essayTotal) },
            { label: t('Marked'), value: String(essaysMarked) },
          ]}
        />
        <FeatureCard
          to="/app/histology"
          icon={Microscope}
          title={t('Histology')}
          description={t('The slide box and the microscope — pan, zoom, and name what is under the lens.')}
          status="coming-soon"
          comingSoon={{
            body: t('Histology will mark what you name on a slide, the way the question bank marks an answer, and carry it into your record. Until then the bench is a preview: every published slide, at full magnification, with the labels revealed when you ask for them.'),
            previewHref: '/app/histology',
          }}
        />
        <FeatureCard
          to="/app/adaptive"
          icon={Sparkles}
          title={t('Adaptive Study')}
          description={t('A session that follows your weakest concepts and re-times them as they firm up.')}
          status="coming-soon"
          comingSoon={{
            body: t('Adaptive Study will build each session from your own mastery ledger, spacing a concept further out every time you get it right and pulling it forward when you do not. It opens once there is enough of your marked work for the schedule to mean something; the preview shows how a session is put together.'),
            previewHref: '/app/adaptive',
          }}
        />
      </FeatureGrid>
    </HubPage>
  )
}
