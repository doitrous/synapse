/**
 * FSRS-5 (Free Spaced Repetition Scheduler), implemented as a pure,
 * day-grained scheduler behind the shared `Scheduler` interface. Every
 * function here is pure: no Date.now(), no randomness, no global state — the
 * clock and the weights are always explicit inputs, so a schedule is only
 * ever a function of its own history and the current query (see the header
 * comment on `scheduler.ts` for why that matters).
 *
 * This is a day-grained model: a graded card always lands in `state:
 * 'review'` with a whole-day interval, and there are no same-session
 * learning steps — an 'again' comes back the next day, not later the same
 * session. FSRS-5's own short-term/same-day parameters, w[17] and w[18], are
 * therefore intentionally UNUSED by every function in this file. They are
 * kept in `FSRS5_DEFAULT_WEIGHTS` only so the exported weight vector matches
 * the published FSRS-5 parameter set byte-for-byte; wiring same-day decay is
 * out of scope for v1.
 */

import type { Scheduler } from './scheduler.ts'
import { previewFrom } from './scheduler.ts'
import type { CardSchedule, Grade } from '../srs.ts'

/** FSRS-5 default parameters w[0]..w[18], as published by the FSRS project. */
export const FSRS5_DEFAULT_WEIGHTS = [
  0.40255, 1.18385, 3.173, 15.69105, 7.1949, 0.5345, 1.4604, 0.0046, 1.54575,
  0.1192, 1.01925, 1.9395, 0.11, 0.29605, 2.2698, 0.2315, 2.9898, 0.51655, 0.6621,
]

/** The exponent of the FSRS-5 power-function forgetting curve. */
const DECAY = -0.5
/** = 0.9 ** (1 / DECAY) - 1, i.e. exactly 19/81 — see `intervalFromStability`. */
const FACTOR = 19 / 81
export const DEFAULT_REQUEST_RETENTION = 0.9
/** Stability never reaches zero: a fully-decayed memory still needs a next interval to compute. */
const MIN_STABILITY = 0.01

/** Reuses srs.ts's own ceiling: a review is never scheduled further out than this many days. */
const MAX_INTERVAL_DAYS = 36500

const clamp = (x: number, lo: number, hi: number): number => Math.min(hi, Math.max(lo, x))

/** A review lands on a whole day, at least one day out, never past the ceiling. */
const clampDayInterval = (days: number): number => Math.max(1, Math.min(MAX_INTERVAL_DAYS, Math.round(days)))

/** FSRS rating: again=1, hard=2, good=3, easy=4. */
function ratingOf(answer: Grade): number {
  switch (answer) {
    case 'again': return 1
    case 'hard': return 2
    case 'good': return 3
    case 'easy': return 4
  }
}

/**
 * Probability of recall after `elapsedDays` at the given `stability`.
 * Invariants: `retrievability(0, S) === 1` for any S (no time has passed, so
 * recall is certain), and `retrievability(S, S) === 0.9` for any S — that is
 * the definition of stability: the number of days for recall odds to decay
 * to exactly the default 90% request retention.
 */
export function retrievability(elapsedDays: number, stability: number): number {
  return (1 + (FACTOR * elapsedDays) / stability) ** DECAY
}

/**
 * Days until retrievability decays to `requestRetention` at the given
 * stability. At the default 0.9 request retention this equals `stability`
 * exactly, because FACTOR was defined as `0.9 ** (1/DECAY) - 1`.
 */
export function intervalFromStability(
  stability: number,
  requestRetention: number = DEFAULT_REQUEST_RETENTION,
): number {
  return (stability / FACTOR) * (requestRetention ** (1 / DECAY) - 1)
}

/** Stability assigned to a card graded for the very first time (no prior FSRS history). */
export function initialStability(rating: number, w: number[] = FSRS5_DEFAULT_WEIGHTS): number {
  return Math.max(MIN_STABILITY, w[rating - 1])
}

/** Difficulty assigned to a card graded for the very first time. */
export function initialDifficulty(rating: number, w: number[] = FSRS5_DEFAULT_WEIGHTS): number {
  return clamp(w[4] - Math.exp(w[5] * (rating - 1)) + 1, 1, 10)
}

/**
 * Difficulty after a review: a linear step away from the current difficulty
 * (bigger for 'again', smaller/negative for 'easy'), pulled back toward
 * D0(Easy) by mean reversion so difficulty doesn't drift unboundedly.
 */
export function nextDifficulty(difficulty: number, rating: number, w: number[] = FSRS5_DEFAULT_WEIGHTS): number {
  const deltaD = -w[6] * (rating - 3)
  const linearDamping = difficulty + (deltaD * (10 - difficulty)) / 9
  const meanReverted = w[7] * initialDifficulty(4, w) + (1 - w[7]) * linearDamping
  return clamp(meanReverted, 1, 10)
}

/** Stability after a successful review (rating 2 "hard", 3 "good", or 4 "easy"). */
export function nextStabilityOnRecall(
  difficulty: number,
  stability: number,
  retrievabilityAtReview: number,
  rating: number,
  w: number[] = FSRS5_DEFAULT_WEIGHTS,
): number {
  const hardPenalty = rating === 2 ? w[15] : 1
  const easyBonus = rating === 4 ? w[16] : 1
  const grown = stability * (
    1
    + Math.exp(w[8])
      * (11 - difficulty)
      * stability ** -w[9]
      * (Math.exp(w[10] * (1 - retrievabilityAtReview)) - 1)
      * hardPenalty
      * easyBonus
  )
  return Math.max(MIN_STABILITY, grown)
}

/** Stability after a lapse (rating 1, "again"). */
export function nextStabilityOnForget(
  difficulty: number,
  stability: number,
  retrievabilityAtReview: number,
  w: number[] = FSRS5_DEFAULT_WEIGHTS,
): number {
  const forgotten = w[11]
    * difficulty ** -w[12]
    * ((stability + 1) ** w[13] - 1)
    * Math.exp(w[14] * (1 - retrievabilityAtReview))
  return Math.max(MIN_STABILITY, forgotten)
}

/**
 * FSRS-5 behind the shared `Scheduler` interface (see `scheduler.ts`).
 * `stability`/`difficulty` are absent on a fresh card and get set on its
 * first grade; from then on every graded card carries both.
 */
export function fsrsScheduler(params?: { weights?: number[]; requestRetention?: number }): Scheduler {
  const w = params?.weights ?? FSRS5_DEFAULT_WEIGHTS
  const requestRetention = params?.requestRetention ?? DEFAULT_REQUEST_RETENTION

  function gradeCard(schedule: CardSchedule, answer: Grade, now: Date): CardSchedule {
    const rating = ratingOf(answer)
    const isFirstReview = schedule.stability == null

    let stability: number
    let difficulty: number
    if (isFirstReview) {
      stability = initialStability(rating, w)
      difficulty = initialDifficulty(rating, w)
    } else {
      // Reconstruct elapsed days since the last review from the stored
      // schedule: `due` minus the interval that produced it is when the
      // card was last graded.
      const lastReviewMs = Date.parse(schedule.due) - schedule.interval * 86_400_000
      const elapsedDays = Math.max(0, (now.getTime() - lastReviewMs) / 86_400_000)
      const r = retrievability(elapsedDays, schedule.stability!)
      difficulty = nextDifficulty(schedule.difficulty!, rating, w)
      // Stability updates are computed from the OLD difficulty, not the one
      // just derived above — FSRS updates the two independently off the
      // same pre-review state.
      stability = rating === 1
        ? nextStabilityOnForget(schedule.difficulty!, schedule.stability!, r, w)
        : nextStabilityOnRecall(schedule.difficulty!, schedule.stability!, r, rating, w)
    }

    const interval = clampDayInterval(intervalFromStability(stability, requestRetention))
    // Failing a NEW card (no prior FSRS memory yet) is not a lapse of an
    // existing memory — only a forgotten review card counts.
    const lapses = schedule.lapses + (rating === 1 && !isFirstReview ? 1 : 0)

    return {
      ...schedule,
      state: 'review',
      step: 0,
      interval,
      ease: schedule.ease,
      lapses,
      reps: schedule.reps + 1,
      due: new Date(now.getTime() + interval * 86_400_000).toISOString(),
      stability,
      difficulty,
    }
  }

  return {
    type: 'fsrs',
    newCard: (now) => ({
      state: 'new',
      step: 0,
      interval: 0,
      // Unused filler: keeps the shape valid if the deck is ever switched back to SM-2.
      ease: 2.5,
      lapses: 0,
      reps: 0,
      due: now.toISOString(),
      // stability/difficulty deliberately absent — set on the first grade.
    }),
    grade: gradeCard,
    preview: (schedule, now) => previewFrom(gradeCard, schedule, now),
  }
}
