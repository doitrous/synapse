import { useCallback } from 'react'
import { usePersistentState } from './usePersistentState'

const ESSAY_ANSWERS_STORAGE_KEY = 'nishany.essay.answers.v1'

/**
 * One student's attempt at one written question.
 *
 * There is no `correct` field: a written answer is marked by the person who
 * wrote it, ticking the key points they actually made, the same way a
 * practical station is self-checked. See `AttemptRecord.correct` in
 * `src/data/attempts.ts` for why that stays a checklist, not a verdict.
 */
export interface EssayAnswer {
  /** What the student wrote, kept so they can reread it. */
  text: string
  /** Key point ids they ticked, or null when they have not marked it yet. */
  ticked: string[] | null
  /**
   * Whether the helpers have been opened.
   *
   * Kept apart from `ticked` because revealing and marking are different
   * events. Inferring the stage from `ticked` meant revealing had to write an
   * empty array to say "we are past writing" — which reads to `coveredCount`
   * as a marked answer with nothing covered, and put "0 of 6" against a
   * question the student had only peeked at.
   */
  revealed?: boolean
  updatedAt: string
}

/**
 * Read and add to the student's written answers.
 *
 * One flat document rather than a shard per answer: unlike the attempt log,
 * an essay answer is edited in place — rereading and re-marking the same
 * question overwrites its entry instead of appending a new record.
 */
export function useEssayAnswers() {
  const [answers, setAnswers, status] = usePersistentState<Record<string, EssayAnswer>>(
    ESSAY_ANSWERS_STORAGE_KEY,
    {},
  )

  const save = useCallback((essayId: string, answer: Omit<EssayAnswer, 'updatedAt'>) => {
    setAnswers((current) => ({
      ...current,
      [essayId]: { ...answer, updatedAt: new Date().toISOString() },
    }))
  }, [setAnswers])

  return { status, loading: !status.hydrated && !status.error, answers, save }
}
