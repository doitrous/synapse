/**
 * How useful this question is to this student, right now.
 *
 * Every term is computed separately, returned separately, and stored separately.
 * That is not tidiness — it is the only reason the product can honestly show a
 * student *why* a question was chosen, and the only reason an admin changing a
 * weight can see what it did.
 *
 * The one structural rule worth stating twice: **concept weakness and hierarchy
 * gap are different measurements.** A weak concept is scored from its own
 * evidence. The gap term reports only the breadth *around* it that the concept's
 * own weakness does not already explain. Adding a parent penalty on top of a
 * child penalty is the classic way an adaptive engine convinces itself that one
 * struggling student is failing an entire subject.
 */

import type { AdaptiveConfig } from './config.ts'
import type { ConceptState } from './masteryModel.ts'
import { reviewUrgencyDays } from './masteryModel.ts'
import type { AdaptiveItem } from './item.ts'
import { primaryConcept } from './item.ts'
import type { BlueprintNode } from './blueprint.ts'
import type { CoverageState } from './coverage.ts'
import { blueprintDeficit, groupGap } from './coverage.ts'
import type { BoostLedger } from './boosts.ts'
import { multiplierFor } from './boosts.ts'

/** Everything about the student that scoring depends on, gathered once per block. */
export interface ScoringContext {
  config: AdaptiveConfig
  /** Concept id → replayed state. Missing means no evidence at all. */
  states: Map<string, ConceptState>
  /** Concept id → blueprint weight. Missing means off-blueprint. */
  blueprintWeights: Map<string, number>
  nodeByConcept: Map<string, BlueprintNode>
  coverage: CoverageState
  /** Concept id → distinct questions answered, the coverage denominator. */
  distinctItemsByConcept: Map<string, number>
  boosts: BoostLedger
  /** Question ids this student has already been shown, with how many times. */
  exposureByQuestion: Map<string, number>
  /** Concepts asked in the last few blocks — the repetition the student feels. */
  recentConceptIds: Set<string>
  /** Topics asked in the last few blocks. */
  recentTopics: Set<string>
  /** 0–1. How much work the student has already done in this sitting. */
  fatigue: number
  now: Date
}

export interface PriorityTerms {
  conceptWeakness: number
  topicOrSubtopicGap: number
  examBlueprintDeficit: number
  spacedReviewUrgency: number
  informationGain: number
  recentErrorBoost: number
  novelty: number
  repetitionPenalty: number
  exposurePenalty: number
  fatiguePenalty: number
}

export interface PriorityScore {
  total: number
  /** Raw 0–1 term values, before weighting. What the admin console displays. */
  terms: PriorityTerms
  /** Weighted contributions, so a reader can see which term actually decided it. */
  contributions: PriorityTerms
  /** The boost multiplier applied, or 1. */
  boostMultiplier: number
}

/**
 * How badly a concept needs repair, 0–1.
 *
 * Distance below the weak threshold, not raw inverse accuracy. A concept at 0.54
 * is barely weak and a concept at 0.10 is badly broken, and a linear inverse
 * would rate a perfectly healthy 0.70 concept as needing 30% of the attention of
 * a total gap. Concepts with no state score zero here — not knowing is
 * `informationGain`'s job, and conflating the two would let unmeasured concepts
 * masquerade as weaknesses.
 */
export function conceptWeakness(item: AdaptiveItem, context: ScoringContext): number {
  const { weakBelow } = context.config.statuses
  let worst = 0
  for (const conceptId of item.conceptIds) {
    const state = context.states.get(conceptId)
    if (!state || state.status === 'unmeasured') continue
    if (state.mean >= weakBelow) continue
    const severity = weakBelow > 0 ? (weakBelow - state.mean) / weakBelow : 0
    // A concept whose weakness is asserted on thin evidence is discounted, so a
    // single bad answer cannot dominate a block before it has been confirmed.
    const confidence = state.status === 'weak' ? 1 : 0.5
    worst = Math.max(worst, severity * confidence)
  }
  return Math.min(1, worst)
}

/**
 * Breadth around the concept, 0–1.
 *
 * Delegated to `groupGap`, which subtracts the concept's own weight from both
 * sides of the ratio. This is the term that keeps parent-level breadth in the
 * score without charging a concept twice for being weak.
 */
export function topicOrSubtopicGap(item: AdaptiveItem, context: ScoringContext): number {
  return groupGap(item.conceptIds, context.nodeByConcept, context.coverage)
}

/** Blueprint weight this item would newly cover, 0–1. */
export function examBlueprintDeficit(item: AdaptiveItem, context: ScoringContext): number {
  return blueprintDeficit(item.conceptIds, context.blueprintWeights, context.distinctItemsByConcept)
}

/**
 * How overdue this item's concepts are, 0–1.
 *
 * Saturating rather than linear: a review seven days late and one thirty days
 * late are both simply late, and a linear ramp would let one ancient concept
 * outscore every genuinely urgent one for weeks.
 */
export function spacedReviewUrgency(item: AdaptiveItem, context: ScoringContext): number {
  let best = 0
  for (const conceptId of item.conceptIds) {
    const state = context.states.get(conceptId)
    if (!state) continue
    const overdue = reviewUrgencyDays(state, context.now)
    if (overdue === null || overdue < 0) continue
    best = Math.max(best, overdue / (overdue + 3))
  }
  return Math.min(1, best)
}

/**
 * How much asking this would teach us about the student, 0–1.
 *
 * Highest where the estimate is least certain — an unmeasured concept, or one
 * with wide credible bounds. This is the term that funds the "unmeasured or
 * uncertain" allocation, and the reason a student who only ever practises their
 * weaknesses still ends up measured across the blueprint.
 */
export function informationGain(item: AdaptiveItem, context: ScoringContext): number {
  let best = 0
  for (const conceptId of item.conceptIds) {
    const state = context.states.get(conceptId)
    // No state at all is maximum ignorance, and therefore maximum information.
    if (!state) return 1
    // Scaled against the half-width of a flat prior, which is the most uncertain
    // a Beta estimate can be. Expressing it as a share of that keeps the term
    // comparable across concepts with very different evidence counts.
    best = Math.max(best, Math.min(1, state.uncertainty / 0.5))
  }
  return best
}

/**
 * The bounded contribution of recent errors, 0–1.
 *
 * This is where error *burden* enters the score — three wrong answers on one
 * concept make its repair more urgent — while `conceptWeakness` keeps counting
 * distinct weak concepts. Bounded, so burden intensifies a concept's priority
 * without ever manufacturing extra weak concepts.
 */
export function recentErrorBoost(item: AdaptiveItem, context: ScoringContext): number {
  let best = 0
  for (const conceptId of item.conceptIds) {
    const state = context.states.get(conceptId)
    if (!state) continue
    const burden = state.rawWrong + state.highConfidenceErrors
    if (burden <= 0) continue
    // Saturating: the fourth error on a concept adds far less than the second,
    // because by then the message has been received.
    best = Math.max(best, burden / (burden + 2))
  }
  return best
}

/** Never seen is 1, seen is 0. Deliberately binary — "how new" is not a spectrum. */
export function novelty(item: AdaptiveItem, context: ScoringContext): number {
  return (context.exposureByQuestion.get(item.id) ?? 0) === 0 ? 1 : 0
}

/** How much of this item the student has just been asked about, 0–1. */
export function repetitionPenalty(item: AdaptiveItem, context: ScoringContext): number {
  if (!item.conceptIds.length) return context.recentTopics.has(item.topic) ? 0.5 : 0
  const repeated = item.conceptIds.filter((conceptId) => context.recentConceptIds.has(conceptId)).length
  const conceptShare = repeated / item.conceptIds.length
  const topicShare = context.recentTopics.has(item.topic) ? 0.5 : 0
  return Math.min(1, Math.max(conceptShare, topicShare))
}

/**
 * How worn out this item is for this student, 0–1.
 *
 * Reaches 1 at the configured exposure cap, so an item at its limit is heavily
 * penalised but still scoreable — the cap itself is a hard constraint applied by
 * the builder, and duplicating it as an infinite penalty here would hide a real
 * shortage behind a score of negative infinity.
 */
export function exposurePenalty(item: AdaptiveItem, context: ScoringContext): number {
  const seen = context.exposureByQuestion.get(item.id) ?? 0
  if (seen <= 0) return 0
  return Math.min(1, seen / Math.max(1, context.config.constraints.maxExposuresPerItem))
}

/**
 * The cost of asking something demanding of a tired student, 0–1.
 *
 * Only demanding items are penalised, and only in proportion to both the fatigue
 * and the item's cognitive load. A tired student can still answer a
 * straightforward recall question; what they cannot do well is a four-step
 * reasoning item, and scoring both the same is how a block's last third becomes
 * noise rather than evidence.
 */
export function fatiguePenalty(item: AdaptiveItem, context: ScoringContext): number {
  if (context.fatigue <= 0) return 0
  const load = item.demanding ? Math.max(0.5, item.cognitiveEffort) : item.cognitiveEffort * 0.5
  return Math.min(1, context.fatigue * load)
}

/**
 * The whole score.
 *
 * The boost multiplier is applied to the total rather than to a single term,
 * because a boost is a statement about the concept's importance overall, not
 * about one reason for asking it. It is capped in `boosts.ts` — 1.15× at most,
 * however many errors have stacked — which is what keeps a bad session from
 * turning the next block into a single-concept drill.
 */
export function scoreItem(item: AdaptiveItem, context: ScoringContext): PriorityScore {
  const weights = context.config.priority

  const terms: PriorityTerms = {
    conceptWeakness: conceptWeakness(item, context),
    topicOrSubtopicGap: topicOrSubtopicGap(item, context),
    examBlueprintDeficit: examBlueprintDeficit(item, context),
    spacedReviewUrgency: spacedReviewUrgency(item, context),
    informationGain: informationGain(item, context),
    recentErrorBoost: recentErrorBoost(item, context),
    novelty: novelty(item, context),
    repetitionPenalty: repetitionPenalty(item, context),
    exposurePenalty: exposurePenalty(item, context),
    fatiguePenalty: fatiguePenalty(item, context),
  }

  const contributions: PriorityTerms = {
    conceptWeakness: terms.conceptWeakness * weights.conceptWeakness,
    topicOrSubtopicGap: terms.topicOrSubtopicGap * weights.topicOrSubtopicGap,
    examBlueprintDeficit: terms.examBlueprintDeficit * weights.examBlueprintDeficit,
    spacedReviewUrgency: terms.spacedReviewUrgency * weights.spacedReviewUrgency,
    informationGain: terms.informationGain * weights.informationGain,
    recentErrorBoost: terms.recentErrorBoost * weights.recentErrorBoost,
    novelty: terms.novelty * weights.novelty,
    repetitionPenalty: -terms.repetitionPenalty * weights.repetitionPenalty,
    exposurePenalty: -terms.exposurePenalty * weights.exposurePenalty,
    fatiguePenalty: -terms.fatiguePenalty * weights.fatiguePenalty,
  }

  const base = Object.values(contributions).reduce((sum, value) => sum + value, 0)
  const boostMultiplier = multiplierFor(context.boosts, item.conceptIds, context.now)

  return {
    // Multiplying a negative total by a boost would make a poor item *worse* the
    // more its concept needs work. Boost only what is already worth asking.
    total: base > 0 ? base * boostMultiplier : base,
    terms,
    contributions,
    boostMultiplier,
  }
}

/**
 * Which need each of an item's signals would satisfy.
 *
 * Read from the same state the score is read from, so a block's diagnostics
 * cannot claim it served a need the score never saw.
 */
export function needSignals(item: AdaptiveItem, context: ScoringContext) {
  const repairStatuses = new Set(['weak', 'attention'])
  const primary = primaryConcept(item)

  let repairsWeakness = false
  let isDueReview = false
  let reducesUncertainty = false
  let closesCoverage = false

  for (const conceptId of item.conceptIds) {
    const state = context.states.get(conceptId)
    if (!state) {
      // Never measured, and on the blueprint: this is exactly what the
      // uncertainty allocation exists to buy.
      if (context.blueprintWeights.has(conceptId)) reducesUncertainty = true
      if ((context.distinctItemsByConcept.get(conceptId) ?? 0) === 0 && context.blueprintWeights.has(conceptId)) {
        closesCoverage = true
      }
      continue
    }
    if (repairStatuses.has(state.status)) repairsWeakness = true
    if (state.status === 'review-due') isDueReview = true
    const overdue = reviewUrgencyDays(state, context.now)
    if (overdue !== null && overdue >= 0) isDueReview = true
    if (state.status === 'unmeasured' || state.uncertainty >= 0.25) reducesUncertainty = true
    if ((context.distinctItemsByConcept.get(conceptId) ?? 0) === 0 && context.blueprintWeights.has(conceptId)) {
      closesCoverage = true
    }
  }

  return { repairsWeakness, closesCoverage, isDueReview, reducesUncertainty, primaryConceptId: primary }
}
