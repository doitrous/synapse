import type { AttemptRecord } from './attempts'

/**
 * What the Question Notes page can say about one question, derived purely
 * from that question's own Question Bank attempts.
 *
 * Nothing here is stored — see `attemptStats.ts` for the same rule applied to
 * the rest of the app. A student's note is written once and rarely touched
 * again; the numbers beside it have to stay live, or they go stale the moment
 * the note does not.
 */
export interface QuestionNoteStats {
  /** How many times this question has been answered in the Question Bank. */
  attempts: number
  /** ISO timestamp of the most recent attempt, or null if never attempted. */
  lastAt: string | null
  /** Whether the most recent *marked* attempt was correct. Null if unmarked or never attempted. */
  lastCorrect: boolean | null
  /** Time taken on the most recent attempt, or null if untimed or never attempted. */
  lastSeconds: number | null
  /**
   * How the two most recent marked attempts compare, in time order.
   *
   * Null until there are at least two marked attempts to compare — one
   * attempt has nothing to improve on or slip from yet.
   */
  trend: 'improved' | 'slipped' | 'steady' | null
}

export const EMPTY_QUESTION_NOTE_STATS: QuestionNoteStats = {
  attempts: 0,
  lastAt: null,
  lastCorrect: null,
  lastSeconds: null,
  trend: null,
}

/**
 * Stats for one question, from the student's full attempt log.
 *
 * `records` need not be pre-sorted or pre-filtered — this does both, the same
 * way every other reader of the log does, so a caller can hand it the raw
 * history straight from `useAttemptHistory`.
 */
export function questionNoteStats(records: AttemptRecord[], questionId: string): QuestionNoteStats {
  const forQuestion = records
    .filter((record) => record.surface === 'qbank' && record.itemId === questionId)
    .sort((a, b) => a.at.localeCompare(b.at))

  if (!forQuestion.length) return EMPTY_QUESTION_NOTE_STATS

  const last = forQuestion[forQuestion.length - 1]
  const markedAttempts = forQuestion.filter((record) => record.correct !== null)

  let trend: QuestionNoteStats['trend'] = null
  if (markedAttempts.length >= 2) {
    const previous = markedAttempts[markedAttempts.length - 2]
    const latest = markedAttempts[markedAttempts.length - 1]
    if (previous.correct === false && latest.correct === true) trend = 'improved'
    else if (previous.correct === true && latest.correct === false) trend = 'slipped'
    else trend = 'steady'
  }

  return {
    attempts: forQuestion.length,
    lastAt: last.at,
    lastCorrect: last.correct,
    lastSeconds: last.seconds,
    trend,
  }
}
