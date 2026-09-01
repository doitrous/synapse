/**
 * The peer answer breakdown for one revealed question: how the students in the
 * viewer's own university and year divided across its options.
 *
 * This is the client-side shape of what `POST /api/qbank/answer-distribution`
 * returns, one entry per requested question. The server counts one answer per
 * distinct student (their most recent), so `counts` sums to `total` — a head
 * count of students, never of attempts.
 *
 * `eligible` is the privacy floor: below a minimum cohort size the server
 * returns `eligible: false` with no `counts`, because a share drawn from a
 * handful of students both misleads and can single someone out. The client
 * shows the breakdown only when `eligible` is true.
 */

/** Below this many distinct students in scope, no breakdown is shown. */
export const ANSWER_STATS_MIN_STUDENTS = 10

export interface AnswerDistribution {
  questionId: string
  /** True once at least {@link ANSWER_STATS_MIN_STUDENTS} students have answered. */
  eligible: boolean
  /** Distinct students counted (present even when not eligible, for context). */
  total: number
  /**
   * Distinct students per option index, aligned to the question's options.
   * Absent when not eligible.
   */
  counts?: number[]
}

export interface AnswerDistributionResponse {
  distributions: AnswerDistribution[]
}

/**
 * Whole-number percentages per option, aligned to `counts`.
 *
 * Rounded so the parts still sum to 100 despite rounding: the largest
 * remainders are handed the leftover points, so the bars a student sees never
 * add up to 99 or 101. An empty or zero-total distribution yields all zeros.
 */
export function answerPercentages(counts: number[], total: number): number[] {
  if (!Array.isArray(counts) || total <= 0) return (counts ?? []).map(() => 0)
  const exact = counts.map((count) => (Math.max(0, count) / total) * 100)
  const floored = exact.map((value) => Math.floor(value))
  let remainder = 100 - floored.reduce((sum, value) => sum + value, 0)
  const order = exact
    .map((value, index) => ({ index, frac: value - Math.floor(value) }))
    .sort((a, b) => b.frac - a.frac)
  const result = floored.slice()
  for (let i = 0; i < order.length && remainder > 0; i += 1) {
    result[order[i].index] += 1
    remainder -= 1
  }
  return result
}
