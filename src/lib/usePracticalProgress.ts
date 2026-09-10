import { useCallback } from 'react'
import { usePersistentState } from './usePersistentState'
import {
  EMPTY_PRACTICAL_PROGRESS, PRACTICAL_PROGRESS_STORAGE_KEY, recordCaseStep, recordLabAnswered,
  recordStationRun, setOralMark, setSkillStatus,
  type OralMark, type PracticalProgress, type SkillStatus,
} from '@/data/practicalProgress'

/**
 * Read and add to the student's practical record.
 *
 * The timestamp is stamped here so the fold functions stay pure and testable,
 * matching how `useMastery` treats the concept ledger.
 */
export function usePracticalProgress() {
  const [progress, setProgress, status] = usePersistentState<PracticalProgress>(
    PRACTICAL_PROGRESS_STORAGE_KEY,
    EMPTY_PRACTICAL_PROGRESS,
  )

  const finishStation = useCallback((stationId: string, run: { marks: number; outOf: number; checkedItems: string[] }) => {
    setProgress((current) => recordStationRun(current, stationId, { ...run, at: new Date().toISOString() }))
  }, [setProgress])

  const advanceCase = useCallback((caseId: string, step: { lastStep: number; steps: number; completed: boolean }) => {
    setProgress((current) => recordCaseStep(current, caseId, { ...step, at: new Date().toISOString() }))
  }, [setProgress])

  const advanceLab = useCallback((labId: string, state: { done: number; items: number }) => {
    setProgress((current) => recordLabAnswered(current, labId, { ...state, at: new Date().toISOString() }))
  }, [setProgress])

  const markSkill = useCallback((skillId: string, status: SkillStatus) => {
    setProgress((current) => setSkillStatus(current, skillId, status, new Date().toISOString()))
  }, [setProgress])

  const markOral = useCallback((questionId: string, mark: OralMark) => {
    setProgress((current) => setOralMark(current, questionId, mark, new Date().toISOString()))
  }, [setProgress])

  return { status, loading: !status.hydrated && !status.error, progress, finishStation, advanceCase, advanceLab, markSkill, markOral }
}
