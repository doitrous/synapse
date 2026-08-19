/**
 * Saying why, in words a student can check against their own experience.
 *
 * Every selection stores a student-facing reason and the internal score
 * breakdown. Those are two different artefacts for two different readers, and
 * the second is not a substitute for the first: "priority 0.71, concept_weakness
 * 0.44" tells a student nothing they can act on or disagree with.
 *
 * The reason names the **dominant** term rather than listing all ten. A reason
 * that lists everything explains nothing, and a student who cannot tell which
 * consideration actually drove the choice cannot meaningfully exercise the
 * override the product promises them.
 */

import type { AllocationNeed } from './config.ts'
import type { AdaptiveBlock, BlockSlot } from './blockBuilder.ts'
import type { PriorityTerms } from './priority.ts'
import type { ConceptState } from './masteryModel.ts'

/** The positive terms, in the order they are worth mentioning. */
const REASON_BY_TERM: Record<keyof PriorityTerms, string> = {
  conceptWeakness: 'Included because this concept needs reinforcement.',
  topicOrSubtopicGap: 'Included because the rest of this topic has had little practice.',
  examBlueprintDeficit: 'Included to cover part of your exam blueprint you have not practised yet.',
  spacedReviewUrgency: 'Included because this is due for review.',
  informationGain: 'Included because nothing yet shows whether you know this.',
  recentErrorBoost: 'Included because of a recent mistake on this concept.',
  novelty: 'Included because this question is new to you.',
  repetitionPenalty: '',
  exposurePenalty: '',
  fatiguePenalty: '',
}

const POSITIVE_TERMS: Array<keyof PriorityTerms> = [
  'conceptWeakness',
  'spacedReviewUrgency',
  'examBlueprintDeficit',
  'recentErrorBoost',
  'informationGain',
  'topicOrSubtopicGap',
  'novelty',
]

/**
 * The one sentence shown beside a question.
 *
 * Ties break toward the more specific reason — weakness before coverage, coverage
 * before novelty — because the specific one is the one the student can act on.
 * A block where every item says "included for coverage" is a block that has
 * stopped explaining itself.
 */
export function slotReason(slot: Pick<BlockSlot, 'score' | 'credits'>): string {
  const { contributions } = slot.score

  const dominant = POSITIVE_TERMS
    .filter((term) => contributions[term] > 0)
    .sort((a, b) => contributions[b] - contributions[a])[0]

  if (dominant) {
    const base = REASON_BY_TERM[dominant]
    // A boost is a fact about the student's history, not about this question,
    // so it is appended rather than allowed to replace the actual reason.
    return slot.score.boostMultiplier > 1
      ? `${base} It is also being prioritised after a recent error.`
      : base
  }

  // No positive term at all means the item was a filler once every quota was
  // met. Saying so is more useful than inventing a pedagogical justification.
  return 'Included to complete the block once every other target was met.'
}

/** Attach reasons to a freshly built block. */
export function explainBlock(block: AdaptiveBlock): AdaptiveBlock {
  return { ...block, slots: block.slots.map((slot) => ({ ...slot, reason: slotReason(slot) })) }
}

/**
 * What the block as a whole is for.
 *
 * Built from what the block actually served, not from what was targeted. A block
 * that aimed for eight weakness items and found three should say three.
 */
export function blockSummary(block: AdaptiveBlock): string {
  const parts: string[] = []
  const order: AllocationNeed[] = ['weakness', 'coverage', 'review', 'uncertainty']
  const phrasing: Record<AllocationNeed, (n: number) => string> = {
    weakness: (n) => `${n} on concepts you have struggled with`,
    coverage: (n) => `${n} covering exam blueprint areas`,
    review: (n) => `${n} due for review`,
    uncertainty: (n) => `${n} on concepts not yet measured`,
  }

  for (const need of order) {
    const served = block.served[need]
    if (served > 0) parts.push(phrasing[need](served))
  }

  if (!parts.length) return `${block.size} questions.`
  if (parts.length === 1) return `${block.size} questions: ${parts[0]}.`
  return `${block.size} questions: ${parts.slice(0, -1).join(', ')} and ${parts[parts.length - 1]}.`
}

/**
 * Why a block fell short, named rather than hidden.
 *
 * Shown to the student too, not only to admins. A student who receives a block
 * with fewer new questions than usual deserves to know the bank ran short rather
 * than concluding the app is repeating itself at random.
 */
export function shortageNotice(block: AdaptiveBlock): string | null {
  const relaxed = block.relaxed.length
  const requested = block.targets.weakness + block.targets.coverage + block.targets.review + block.targets.uncertainty
  const short = block.size < requested

  // A need nothing could serve is reported by the redistribution notice, not
  // here. Treating the two the same produced the nonsense line "0 selection
  // rules had to be relaxed" on a block that was assembled perfectly well.
  if (!relaxed && !short) return null

  if (!relaxed) {
    return 'The question bank could not fill this block completely. The shortage has been reported.'
  }
  const rules = `${relaxed} selection rule${relaxed === 1 ? '' : 's'}`
  return short
    ? `The question bank could not fill this block completely. ${rules} had to be relaxed, and the shortage has been reported.`
    : `The question bank was tight here, so ${rules} had to be relaxed. The shortage has been reported.`
}

/**
 * The plain statement of what a concept's status means.
 *
 * Written so that reading it does not require having read the algorithm. In
 * particular `attention` must never read as "weak" — the difference between "one
 * answer went wrong, we will check again" and "you have a weakness here" is the
 * difference between a system a student trusts and one they resent.
 */
export const STATUS_EXPLANATION: Record<ConceptState['status'], string> = {
  unmeasured: 'Not enough distinct questions yet to say anything about this.',
  attention: 'One recent answer went wrong. Synapse will check this again — this is not a weakness label.',
  weak: 'Repeated evidence across different questions points to a real gap here.',
  developing: 'Measurable, but not yet strong enough to count as secure.',
  secure: 'Answered correctly across several distinct questions, including one after a gap of at least two days.',
  'review-due': 'This was secure, and enough time has passed that it is worth checking again.',
}

/**
 * The distinction the entire product rests on, stated for students.
 *
 * Exported as data rather than embedded in a component so both portals render
 * the same words, and so a change to the wording is a change to one string.
 */
export const WRONG_ATTEMPTS_VS_WEAK_CONCEPTS = {
  heading: 'Wrong answers and weak concepts are counted differently',
  body:
    'If you answer three questions incorrectly and all three were mainly testing the same concept, that records three wrong attempts and at most one weak concept. The mistakes are all kept — they make repairing that concept more urgent — but they do not create three separate weaknesses. This is why the number of wrong answers you remember is usually larger than the number of weak concepts shown.',
} as const

/** What Adaptive Learning and Readiness Assessment each measure, and do not. */
export const MEASUREMENT_SEPARATION = {
  adaptive: {
    heading: 'Adaptive practice chooses what to study',
    body:
      'Adaptive blocks deliberately oversample what you are weakest at and what is due for review. Your accuracy inside them is therefore not a fair estimate of your exam performance, and it is not used as one.',
  },
  readiness: {
    heading: 'Readiness assessment measures where you stand',
    body:
      'Readiness assessments are balanced against your exam blueprint, timed, and built from questions held back from ordinary practice. They report a range rather than a single score, because a limited number of questions cannot support more precision than that.',
  },
} as const

/** The honest limits, stated where a student can read them. */
export const PREDICTION_CAVEAT =
  'Every estimate here is a range based on the questions you have answered so far, under a model that has not yet been calibrated against results at your university. It describes your current preparation. It is not a prediction of your exam result, and it is not a guarantee.'
