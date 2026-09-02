import { useMemo } from 'react'
import { coveredCount } from '@/data/essay'
import { distinctItems, firstAttemptSplit } from '@/data/attemptStats'
import type { AttemptRecord } from '@/data/attempts'
import { useAttemptHistory } from '@/lib/useAttemptLog'
import { useEssayAnswers } from '@/lib/useEssayAnswers'
import { useLiveEssays } from '@/lib/useLiveEssays'
import { useLivePracticals } from '@/lib/useLivePracticals'
import { usePracticalProgress } from '@/lib/usePracticalProgress'
import { usePublishedQuestions } from '@/lib/usePublishedQuestions'

export interface PracticeProgress {
  /** Bank and room attempts only — the records the bank figures are cut from. */
  qbankRecords: AttemptRecord[]
  /** Distinct bank questions the student has answered at least once. */
  seen: number
  bankTotal: number
  /** First-attempt accuracy over the bank, 0–100; null before any attempt. */
  firstAccuracy: number | null
  practicalTotal: number
  stationCount: number
  caseCount: number
  /** Stations opened, cases started, labs with at least one item done. */
  attempted: number
  essayTotal: number
  /** Essays with at least one key point ticked. */
  markedCount: number
}

/**
 * The one set of "how far through the bank, practicals and essays" numbers.
 *
 * Both the dashboard's ring stack and the Practice hub show these, and the
 * spec's promise is that they never disagree. That promise is only as good as
 * the code path being shared, so both read this hook rather than each keeping
 * a copy of the arithmetic.
 */
export function usePracticeProgress(): PracticeProgress {
  const questions = usePublishedQuestions()
  const history = useAttemptHistory()
  const { progress } = usePracticalProgress()
  const { osceStations, clinicalCases, labImaging } = useLivePracticals()
  const essays = useLiveEssays()
  const { answers } = useEssayAnswers()

  const qbankRecords = useMemo(
    () => history.records.filter((record) => record.surface === 'qbank' || record.surface === 'room'),
    [history.records],
  )

  return useMemo(() => {
    const attempted = Object.keys(progress.stations).length
      + Object.values(progress.cases).filter((entry) => entry.status !== 'not-started').length
      + Object.values(progress.labs).filter((entry) => entry.done > 0).length
    let markedCount = 0
    for (const essay of essays) {
      const covered = coveredCount(answers[essay.id]?.ticked ?? null, essay.keyPoints.map((point) => point.id))
      if (covered) markedCount += 1
    }
    return {
      qbankRecords,
      seen: distinctItems(qbankRecords),
      bankTotal: questions.length,
      firstAccuracy: firstAttemptSplit(qbankRecords).first.accuracy,
      practicalTotal: osceStations.length + clinicalCases.length + labImaging.length,
      stationCount: osceStations.length,
      caseCount: clinicalCases.length,
      attempted,
      essayTotal: essays.length,
      markedCount,
    }
  }, [qbankRecords, questions.length, progress, osceStations.length, clinicalCases.length, labImaging.length, essays, answers])
}
