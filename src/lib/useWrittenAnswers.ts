import { useCallback } from 'react'
import { usePersistentState } from './usePersistentState'
import type { WrittenTicks } from '@/data/writtenQuestion'

const WRITTEN_ANSWERS_STORAGE_KEY = 'nishany.written.answers.v1'

/**
 * One student's attempt at one written exam question.
 *
 * Kept apart from `nishany.essay.answers.v1` rather than folded into it,
 * because the shapes differ where it matters: an essay is one prompt with one
 * list of key points, while a written exam question is several parts, each
 * carrying its own marks and its own mark scheme. Storing per-part ticks under
 * the essay's flat `ticked: string[]` would lose which part each tick belonged
 * to, and with it every per-part mark.
 *
 * There is no `correct` field, for the same reason essays have none: a written
 * answer is marked by the person who wrote it. See `AttemptRecord.correct` in
 * `src/data/attempts.ts`.
 */
export interface WrittenAnswer {
  /** What the student wrote, per part id, kept so they can reread it. */
  text: Record<string, string>
  /** Expected points ticked, per part id, or null when not yet marked. */
  ticks: WrittenTicks | null
  /**
   * Whether the mark scheme has been opened.
   *
   * Separate from `ticks` because revealing and marking are different events —
   * inferring the stage from `ticks` would make revealing write an empty object,
   * which reads as a marked answer that scored nothing.
   */
  revealed?: boolean
  updatedAt: string
}

export function useWrittenAnswers() {
  const [answers, setAnswers] = usePersistentState<Record<string, WrittenAnswer>>(
    WRITTEN_ANSWERS_STORAGE_KEY,
    {},
  )

  const save = useCallback((questionId: string, answer: Omit<WrittenAnswer, 'updatedAt'>) => {
    setAnswers((current) => ({
      ...current,
      [questionId]: { ...answer, updatedAt: new Date().toISOString() },
    }))
  }, [setAnswers])

  return { answers, save }
}
