/**
 * How well a student knows a concept, and how sure we are.
 *
 * A decayed Beta model over the immutable evidence ledger. Deliberately simple:
 * IRT, Bayesian knowledge tracing, multidimensional Elo and anything learned
 * stay offline candidates until the item pool and response data are large,
 * clean and calibrated enough to beat transparent rules on held-out outcomes.
 * A complicated model that cannot be explained to the student it judges is a
 * downgrade, not an upgrade.
 *
 * Two properties matter more than the arithmetic:
 *
 *  - **Replayable.** `rebuild` takes evidence and config and returns the state.
 *    Nothing accumulates in place, so changing the model recomputes history
 *    rather than silently rewriting it under a new name.
 *  - **Honest about ignorance.** Every estimate carries an interval. One right
 *    answer is not mastery, and the interval is what stops the interface
 *    claiming it is.
 */

import type {
  AdaptiveEvidenceEvent, ConceptRole,
} from './evidenceLedger.ts'
import { distinctQuestions, rawWrongAttempts } from './evidenceLedger.ts'
import type { AdaptiveConfig } from './config.ts'

const HOUR = 3_600_000
const DAY = 86_400_000

/**
 * Where a concept stands.
 *
 * `attention` is the important one. A single wrong answer produces attention,
 * not weakness: it schedules a follow-up and lightly marks the concept, and it
 * takes repeated independent evidence — or a high-confidence misconception — to
 * become a label a student sees as "you are weak at this".
 */
export type ConceptStatus =
  | 'unmeasured'
  | 'attention'
  | 'weak'
  | 'developing'
  | 'secure'
  | 'review-due'

export const CONCEPT_STATUS_LABEL: Record<ConceptStatus, string> = {
  unmeasured: 'Unmeasured',
  attention: 'Needs a second look',
  weak: 'Weak',
  developing: 'Developing',
  secure: 'Secure',
  'review-due': 'Review due',
}

export interface ConceptState {
  conceptId: string
  /** Beta parameters after decay and all weighted evidence. */
  alpha: number
  beta: number
  /** Posterior mean, 0–1. Never shown without its interval. */
  mean: number
  /** Credible interval half-width, 0–1. Large means "we do not know yet". */
  uncertainty: number
  /** Distinct questions that produced evidence — not attempt count. */
  distinctItems: number
  /** Every marked attempt, including repeats of the same question. */
  attempts: number
  /** Raw wrong attempts, as the student experienced them. */
  rawWrong: number
  /** Wrong answers the student had said they were sure about. */
  highConfidenceErrors: number
  /** Correct answers given at least `spacedSuccessMinHours` after the previous evidence. */
  spacedSuccesses: number
  /** Median observed seconds ÷ expected seconds, or null when nothing was timed. */
  responseTimeRatio: number | null
  /** ISO timestamp of the most recent evidence of any kind. */
  lastSeen: string | null
  /** ISO timestamp this concept becomes worth revisiting. */
  nextReviewAt: string | null
  status: ConceptStatus
  /** The config version this estimate was produced under. */
  modelVersion: number
}

/** A concept with no evidence at all. */
export function blankState(conceptId: string, config: AdaptiveConfig): ConceptState {
  const { priorAlpha, priorBeta } = config.mastery
  return {
    conceptId,
    alpha: priorAlpha,
    beta: priorBeta,
    mean: priorAlpha / (priorAlpha + priorBeta),
    uncertainty: betaHalfWidth(priorAlpha, priorBeta),
    distinctItems: 0,
    attempts: 0,
    rawWrong: 0,
    highConfidenceErrors: 0,
    spacedSuccesses: 0,
    responseTimeRatio: null,
    lastSeen: null,
    nextReviewAt: null,
    status: 'unmeasured',
    modelVersion: config.version,
  }
}

/**
 * A normal-approximation half-width for the Beta posterior.
 *
 * Two standard deviations, clamped to the unit interval. Exact quantiles would
 * need an incomplete beta function for a figure that is only ever rendered as a
 * band a few pixels wide; the approximation is honest at the scale it is shown,
 * and it is monotone in evidence, which is the property the interface relies on.
 */
export function betaHalfWidth(alpha: number, beta: number): number {
  const n = alpha + beta
  if (n <= 0) return 0.5
  const variance = (alpha * beta) / (n * n * (n + 1))
  return Math.min(0.5, 2 * Math.sqrt(Math.max(0, variance)))
}

/**
 * Difficulty credit, clamped.
 *
 * Getting a Challenging item right says more than getting an Easy one right,
 * but only a little more — the clamp is what stops one hard question from
 * outweighing a week of consistent work. Unrecognised bands sit at neutral
 * rather than guessing.
 */
export function difficultyCredit(difficulty: string, config: AdaptiveConfig): number {
  const { minDifficultyCredit, maxDifficultyCredit } = config.mastery
  const span = maxDifficultyCredit - minDifficultyCredit
  const position: Record<string, number> = {
    Easy: 0,
    Moderate: 1 / 3,
    Hard: 2 / 3,
    Challenging: 1,
  }
  const at = position[difficulty]
  if (at === undefined) return (minDifficultyCredit + maxDifficultyCredit) / 2
  return minDifficultyCredit + span * at
}

/** How much a concept role says this item measured this concept. */
export function roleRelevance(role: ConceptRole, config: AdaptiveConfig): number {
  return role === 'main' ? config.mastery.mainConceptRelevance : config.mastery.secondaryConceptRelevance
}

/**
 * Whether the answer arrived too fast to have been reasoned.
 *
 * Response time alone never proves or disproves knowledge — it only ever reduces
 * how much an attempt is allowed to move an estimate. The raw record is
 * untouched either way.
 */
export function isAbnormallyFast(event: AdaptiveEvidenceEvent, config: AdaptiveConfig): boolean {
  if (event.seconds === null) return false
  const expected = event.expectedSeconds ?? config.validity.defaultExpectedSeconds
  if (expected <= 0) return false
  return event.seconds < expected * config.validity.fastResponseRatio
}

/**
 * How much this one event is allowed to move the estimate.
 *
 * relevance × item validity × difficulty credit, with exposure and speed applied
 * as reductions. Every factor is a reduction from a full-weight ordinary answer;
 * nothing here can amplify an attempt beyond its difficulty credit.
 */
export function evidenceWeight(event: AdaptiveEvidenceEvent, config: AdaptiveConfig): number {
  let weight = roleRelevance(event.role, config) * difficultyCredit(event.difficulty, config)

  if (event.outcome !== 'answered') weight *= config.validity.blankWeight
  if (event.exposure === 'repeat-after-reveal') weight *= config.validity.exposedRepeatWeight
  if (isAbnormallyFast(event, config)) {
    weight *= event.correct === true ? config.validity.fastCorrectWeight : config.validity.fastWrongWeight
  }
  // A wrong answer the student was sure of is the strongest misconception
  // evidence there is, so it is the one case that carries extra weight.
  if (event.correct === false && event.confidence === 'sure') {
    weight *= config.mastery.highConfidenceErrorWeight
  }
  return weight
}

/**
 * Fold one event into a running Beta state.
 *
 * The decay pulls the accumulated evidence back toward the prior in proportion
 * to elapsed time, so a concept last practised months ago is treated as
 * genuinely less certain rather than permanently proven. The half-life is a
 * launch hypothesis and lives in config.
 */
export function applyEvidence(
  state: { alpha: number; beta: number; at: string | null },
  event: AdaptiveEvidenceEvent,
  config: AdaptiveConfig,
): { alpha: number; beta: number } {
  const { priorAlpha, priorBeta, decayHalfLifeDays } = config.mastery
  const elapsedDays = state.at
    ? Math.max(0, (new Date(event.at).getTime() - new Date(state.at).getTime()) / DAY)
    : 0
  const decay = decayHalfLifeDays > 0 ? 0.5 ** (elapsedDays / decayHalfLifeDays) : 1

  const weight = evidenceWeight(event, config)
  // A blank contributes uncertainty, not a verdict: it decays what came before
  // and adds a small amount of negative evidence, never a full wrong answer.
  const correctness = event.correct === true ? 1 : 0

  return {
    alpha: priorAlpha + decay * (state.alpha - priorAlpha) + weight * correctness,
    beta: priorBeta + decay * (state.beta - priorBeta) + weight * (1 - correctness),
  }
}

/**
 * Which band a state falls into.
 *
 * Read the order carefully — it encodes the product's safety rules:
 *
 *  - Not enough distinct questions means `unmeasured`, whatever the accuracy.
 *    One lucky answer must never read as knowledge.
 *  - `weak` needs repeated independent evidence, or two high-confidence
 *    misconceptions. A single ordinary error can only reach `attention`.
 *  - `secure` needs the threshold, enough distinct questions, **and** a
 *    successful review at least 48 hours later. Answering four questions in one
 *    sitting is not retention.
 */
export function conceptStatus(
  state: Omit<ConceptState, 'status'>,
  config: AdaptiveConfig,
  now = new Date(),
): ConceptStatus {
  const t = config.statuses

  if (state.distinctItems < t.measuredDistinctItems) {
    // Even unmeasured, one recent error is worth surfacing as something to look
    // at again — that is the whole point of the attention band.
    return state.rawWrong > 0 || state.highConfidenceErrors > 0 ? 'attention' : 'unmeasured'
  }

  const secure =
    state.mean >= t.secureAtOrAbove &&
    state.distinctItems >= t.secureDistinctItems &&
    state.spacedSuccesses >= 1

  if (secure) {
    const due = state.nextReviewAt && new Date(state.nextReviewAt).getTime() <= now.getTime()
    return due ? 'review-due' : 'secure'
  }

  const weak =
    (state.mean < t.weakBelow && state.distinctItems >= t.weakDistinctItems) ||
    state.highConfidenceErrors >= t.weakHighConfidenceErrors

  if (weak) return 'weak'
  if (state.rawWrong > 0 && state.distinctItems < t.secureDistinctItems) return 'attention'
  return 'developing'
}

/** Which review interval a status waits out. `unmeasured` has nothing to review. */
function reviewIntervalDays(status: ConceptStatus, config: AdaptiveConfig): number | null {
  switch (status) {
    case 'weak': return config.reviewIntervalDays.weak
    case 'attention': return config.reviewIntervalDays.attention
    case 'developing': return config.reviewIntervalDays.developing
    case 'secure':
    case 'review-due': return config.reviewIntervalDays.secure
    default: return null
  }
}

function median(values: number[]): number | null {
  if (!values.length) return null
  const sorted = [...values].sort((a, b) => a - b)
  const middle = Math.floor(sorted.length / 2)
  return sorted.length % 2 ? sorted[middle] : (sorted[middle - 1] + sorted[middle]) / 2
}

/**
 * Rebuild one concept's state from its evidence.
 *
 * Pure, and the only way a `ConceptState` is ever produced. `events` must be for
 * a single concept; pass them in any order — they are sorted here so a caller
 * cannot corrupt the decay by handing over an unsorted array.
 */
export function rebuildConcept(
  conceptId: string,
  events: AdaptiveEvidenceEvent[],
  config: AdaptiveConfig,
  now = new Date(),
): ConceptState {
  const ordered = [...events]
    .filter((event) => event.conceptId === conceptId)
    .sort((a, b) => a.at.localeCompare(b.at))

  if (!ordered.length) return blankState(conceptId, config)

  let alpha = config.mastery.priorAlpha
  let beta = config.mastery.priorBeta
  let at: string | null = null
  let spacedSuccesses = 0
  let highConfidenceErrors = 0
  let attempts = 0
  const ratios: number[] = []

  for (const event of ordered) {
    const spacedFromPrevious =
      at !== null &&
      new Date(event.at).getTime() - new Date(at).getTime() >= config.statuses.spacedSuccessMinHours * HOUR

    const next = applyEvidence({ alpha, beta, at }, event, config)
    alpha = next.alpha
    beta = next.beta
    at = event.at

    if (event.correct !== null) attempts += 1
    if (event.correct === true && spacedFromPrevious) spacedSuccesses += 1
    if (event.correct === false && event.confidence === 'sure') highConfidenceErrors += 1
    if (event.seconds !== null) {
      const expected = event.expectedSeconds ?? config.validity.defaultExpectedSeconds
      if (expected > 0) ratios.push(event.seconds / expected)
    }
  }

  const mean = alpha / (alpha + beta)
  const partial: Omit<ConceptState, 'status'> = {
    conceptId,
    alpha,
    beta,
    mean,
    uncertainty: betaHalfWidth(alpha, beta),
    distinctItems: distinctQuestions(ordered),
    attempts,
    rawWrong: rawWrongAttempts(ordered),
    highConfidenceErrors,
    spacedSuccesses,
    responseTimeRatio: median(ratios),
    lastSeen: at,
    nextReviewAt: null,
    modelVersion: config.version,
  }

  // Status and review date are mutually dependent — `review-due` is "secure and
  // past its date" — so the date is computed from the status the state would
  // have without it, then the status is finalised against that date.
  const provisional = conceptStatus(partial, config, now)
  const interval = reviewIntervalDays(provisional, config)
  const nextReviewAt = interval !== null && at
    ? new Date(new Date(at).getTime() + interval * DAY).toISOString()
    : null

  const withDate = { ...partial, nextReviewAt }
  return { ...withDate, status: conceptStatus(withDate, config, now) }
}

/** Rebuild every concept that has evidence. */
export function rebuildAll(
  events: AdaptiveEvidenceEvent[],
  config: AdaptiveConfig,
  now = new Date(),
): Map<string, ConceptState> {
  const states = new Map<string, ConceptState>()
  for (const conceptId of new Set(events.map((event) => event.conceptId))) {
    states.set(conceptId, rebuildConcept(conceptId, events, config, now))
  }
  return states
}

/** How overdue a review is, in days. Positive means overdue; null means not scheduled. */
export function reviewUrgencyDays(state: ConceptState, now = new Date()): number | null {
  if (!state.nextReviewAt) return null
  return (now.getTime() - new Date(state.nextReviewAt).getTime()) / DAY
}

/**
 * The statuses adaptive practice treats as a repair target.
 *
 * `attention` is included because a follow-up is exactly what one error is
 * supposed to trigger — but it is not a weakness label, and the interface must
 * not present it as one.
 */
export const REPAIR_STATUSES: readonly ConceptStatus[] = ['weak', 'attention']

/** Concepts with too little evidence to say anything about. */
export function isUnmeasured(state: ConceptState | undefined): boolean {
  return !state || state.status === 'unmeasured'
}
