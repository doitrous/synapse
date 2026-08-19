/**
 * Every number the adaptive algorithms are allowed to use.
 *
 * Nothing in `src/data/adaptive/` may hardcode a threshold, a weight, a share or
 * an interval at its call site. They all live here, they are all versioned, and
 * the admin console edits this one document — which is the only way the
 * "Admin-visible Adaptive Score Rules" surface can honestly claim to describe
 * what the algorithm actually did.
 *
 * Every value below is a **launch hypothesis**, not a validated constant. The
 * comments say which ones the specification explicitly flags as unproven, so a
 * later reader does not mistake a starting point for a finding.
 */

/** Admin-owned, so this is a shared catalogue document rather than `synapse.progress.*`. */
export const ADAPTIVE_CONFIG_STORAGE_KEY = 'synapse-adaptive-config-v1'

/**
 * The four things a slot can be bought with.
 *
 * These are allocation *targets*, not separate item pools. One question may
 * satisfy several needs but always consumes exactly one slot.
 */
export type AllocationNeed = 'weakness' | 'coverage' | 'review' | 'uncertainty'

export const ALLOCATION_NEEDS: readonly AllocationNeed[] = ['weakness', 'coverage', 'review', 'uncertainty']

export const NEED_LABEL: Record<AllocationNeed, string> = {
  weakness: 'Confirmed weak concepts',
  coverage: 'Exam-blueprint coverage and rolling debt',
  review: 'Spaced review',
  uncertainty: 'Unmeasured or uncertain concepts',
}

/** Shares of a block, expressed 0–1 and required to sum to 1. */
export type AllocationShares = Record<AllocationNeed, number>

/**
 * A named horizon band with its own allocation.
 *
 * `maxDaysToExam` is the inclusive upper bound of the band; the last entry uses
 * `null` for "no exam scheduled, or further away than every other band".
 * Blueprint coverage inside a band is a **floor**, never a ceiling — every
 * selected question still counts toward actual coverage whatever need bought it.
 */
export interface HorizonBand {
  id: string
  label: string
  maxDaysToExam: number | null
  shares: AllocationShares
}

/** How an attempt is judged before it is allowed to move a mastery estimate. */
export interface ValidityConfig {
  /**
   * Below this multiple of the item's expected time, an answer is treated as
   * too fast to have been reasoned. The raw error is always kept; only the
   * mastery weight is reduced.
   */
  fastResponseRatio: number
  /** Weight retained by an abnormally fast wrong answer — possible carelessness. */
  fastWrongWeight: number
  /** Weight retained by an abnormally fast correct answer — possible guess or recall. */
  fastCorrectWeight: number
  /**
   * Weight retained by an attempt at a question whose answer this student has
   * already seen. The specification caps this at 25% of normal evidence.
   */
  exposedRepeatWeight: number
  /** Weight of a blank or timed-out item. A non-answer is not a wrong answer. */
  blankWeight: number
  /** Seconds assumed for an item whose author recorded no estimate. */
  defaultExpectedSeconds: number
}

/** The decayed Beta model's shape. */
export interface MasteryModelConfig {
  /** Conservative priors: a new concept is unknown, not assumed competent. */
  priorAlpha: number
  priorBeta: number
  /** Days for prior-relative evidence to halve. 60 is an explicit launch hypothesis. */
  decayHalfLifeDays: number
  /** Difficulty credit is clamped into this range so one hard item cannot dominate. */
  minDifficultyCredit: number
  maxDifficultyCredit: number
  /** Relevance weight for a concept the item primarily assesses vs. also assesses. */
  mainConceptRelevance: number
  secondaryConceptRelevance: number
  /** Multiplier applied to negative evidence carrying a high-confidence error. */
  highConfidenceErrorWeight: number
}

/** Where the status bands sit. */
export interface StatusThresholdConfig {
  /** Mastery mean below this, with enough evidence, is weak. */
  weakBelow: number
  /** Mastery mean at or above this, with enough evidence and a spaced success, is secure. */
  secureAtOrAbove: number
  /** Distinct valid questions before a concept stops being "unmeasured". */
  measuredDistinctItems: number
  /** Distinct valid questions before "weak" may be asserted. */
  weakDistinctItems: number
  /**
   * Distinct valid questions before "secure" may be asserted.
   *
   * The wider blueprint proposes three as a possible minimum; four is the safer
   * operational default and stays until validation resolves the difference. The
   * admin console exposes this as a labelled pilot toggle rather than burying it.
   */
  secureDistinctItems: number
  /** Hours that must pass before a successful review counts toward "secure". */
  spacedSuccessMinHours: number
  /** High-confidence misconception errors that alone justify "weak". */
  weakHighConfidenceErrors: number
}

/** How long each status waits before it is worth seeing again. */
export type ReviewIntervalConfig = Record<'attention' | 'weak' | 'developing' | 'secure', number>

/** The priority score's terms. All are versioned launch hypotheses. */
export interface PriorityWeightConfig {
  conceptWeakness: number
  topicOrSubtopicGap: number
  examBlueprintDeficit: number
  spacedReviewUrgency: number
  informationGain: number
  recentErrorBoost: number
  novelty: number
  /** Subtracted, so these are stored positive and negated by the scorer. */
  repetitionPenalty: number
  exposurePenalty: number
  fatiguePenalty: number
}

/** The graduated response to a wrong answer. */
export interface InterventionConfig {
  /** Selection multiplier applied to a boosted concept. */
  boostMultiplier: number
  /** Ceiling on stacked multipliers, however many errors accumulate. */
  stackedMultiplierCap: number
  /** Blocks the boost survives. Decremented only when a block could have used it. */
  remainingEligibleBlocks: number
  /** Distinct successful repair questions that cancel a boost. */
  repairsToCancelBoost: number
  /** How many of those repairs must be spaced rather than immediate. */
  spacedRepairsRequired: number
  /** Blocks within which an owed transfer check must be served. */
  transferCheckWithinBlocks: number
  /** Hours before the delayed transfer check for a repaired concept. */
  delayedTransferHours: number
  /** Misconception selections of the same distractor before escalation. */
  misconceptionEscalationCount: number
  /** Misses of the same concept before escalation. */
  repeatMissEscalationCount: number
  /** Resource segments recommended per wrong answer. Never more than one. */
  maxResourceRecommendations: number
}

/** Hard constraints. Evaluated before any scoring; a high score never overrides one. */
export interface ConstraintConfig {
  minBlockSize: number
  maxBlockSize: number
  /** Items in a block dominated by a single concept. */
  maxItemsPerPrimaryConcept: number
  /** Consecutive items drawn from one topic. */
  maxConsecutiveSameTopic: number
  /** Share of a block that must be questions this student has never seen. */
  minUnseenShare: number
  /** Times one item may appear across the exposure window. */
  maxExposuresPerItem: number
  /** Blocks over which exposure is counted. */
  exposureWindowBlocks: number
  /** Allowed absolute deviation from a blueprint node's slot target. */
  quotaTolerance: number
  /** Blocks over which coverage debt is repaid rather than forced into one. */
  rollingDebtWindowBlocks: number
  /** Target share of demanding items, as a soft mix target. */
  targetDemandingShare: number
  /** Target share of high-cognitive-effort items. */
  targetHighCognitiveShare: number
}

/**
 * The order constraints may be relaxed in when the pool cannot satisfy them.
 *
 * Ordered least-harmful first. Relaxation is always recorded and always raises a
 * shortage event; the builder never fills silently with whatever is available.
 * Constraints absent from this list are never relaxed — content approval and
 * scope safety are not negotiable, at any pool size.
 */
export type RelaxableConstraint =
  | 'novelty'
  | 'difficultyMix'
  | 'consecutiveTopic'
  | 'unseenShare'
  | 'conceptCap'
  | 'exposureCap'
  | 'quotaTolerance'

export const RELAXABLE_CONSTRAINT_LABEL: Record<RelaxableConstraint, string> = {
  novelty: 'Novelty preference',
  difficultyMix: 'Difficulty and cognitive-task mix',
  consecutiveTopic: 'No more than three consecutive items from one topic',
  unseenShare: 'Minimum unseen share',
  conceptCap: 'Maximum two items dominated by one concept',
  exposureCap: 'Exposure cap per item',
  quotaTolerance: 'Blueprint quota tolerance',
}

/** Never relaxed, at any pool size, for any student. Stated so it can be shown. */
export const NON_NEGOTIABLE_CONSTRAINTS = [
  'Content approval status',
  'University, year and module scope',
  'Language and accessibility requirements',
  'Held-out readiness items excluded from practice',
] as const

/** Readiness assessment separation. */
export interface ReadinessConfig {
  /** Share of each blueprint node's pool reserved when no admin flag exists. */
  autoReserveShare: number
  /** Days a practice-exposed item is barred from a readiness assessment. */
  exposureExclusionDays: number
  /** Item count for a standard readiness assessment. */
  assessmentSize: number
  /** Seconds allowed per item. */
  secondsPerItem: number
  /** Marked answers a topic needs before its own uncertainty is worth reporting. */
  minItemsPerTopicReport: number
  /** Confidence level for the reported score interval, 0–1. */
  intervalConfidence: number
}

/** Weekly schedule (legacy requirement 029). */
export interface ScheduleConfig {
  /** Fraction of stated capacity held back. Never schedule every free minute. */
  capacityBufferShare: number
  /** Minutes in the shortest schedulable task. */
  minTaskMinutes: number
  /** Minutes in the longest single task before it is split. */
  maxTaskMinutes: number
  /** High-effort sessions allowed to sit next to each other. */
  maxConsecutiveHighEffort: number
  /** Share of a week's target that the "minimum" tier represents. */
  minimumTierShare: number
  /** Share the "recommended" tier represents. Stretch is whatever remains. */
  recommendedTierShare: number
  /** Days a mock is placed before an exam so repair is still possible. */
  mockLeadDays: number
  /** Fraction of a missed day that may be added to later days. Never all of it. */
  catchUpShare: number
}

/** Crash-course horizons (legacy requirement 056). */
export interface CrashHorizonBand {
  days: number
  emphasis: string
  assessmentCadence: string
  recoveryPolicy: string
  shares: AllocationShares
}

/** A dated note explaining a material algorithm change. */
export interface ConfigChangeNote {
  version: number
  /** ISO date. */
  at: string
  author: string
  note: string
}

export interface AdaptiveConfig {
  /** Bumped on every material change. Shown to students and admins alike. */
  version: number
  /** ISO timestamp of the last edit. */
  updatedAt: string
  /** The default allocation when no exam horizon applies. */
  defaultShares: AllocationShares
  horizonBands: HorizonBand[]
  priority: PriorityWeightConfig
  mastery: MasteryModelConfig
  validity: ValidityConfig
  statuses: StatusThresholdConfig
  reviewIntervalDays: ReviewIntervalConfig
  interventions: InterventionConfig
  constraints: ConstraintConfig
  relaxationOrder: RelaxableConstraint[]
  readiness: ReadinessConfig
  schedule: ScheduleConfig
  crashHorizons: CrashHorizonBand[]
  changeNotes: ConfigChangeNote[]
}

const shares = (weakness: number, coverage: number, review: number, uncertainty: number): AllocationShares =>
  ({ weakness, coverage, review, uncertainty })

export const DEFAULT_ADAPTIVE_CONFIG: AdaptiveConfig = {
  version: 1,
  updatedAt: '2026-07-19',

  // The v1 default. The 50/30/15/5 alternative remains a documented comparison
  // arm in docs/adaptive-study/README.md; it is not wired in as a live variant,
  // because choosing between them requires held-out outcome data this product
  // does not have yet.
  defaultShares: shares(0.40, 0.35, 0.15, 0.10),

  horizonBands: [
    { id: 'imminent', label: '14 days or fewer', maxDaysToExam: 14, shares: shares(0.25, 0.50, 0.15, 0.10) },
    { id: 'near', label: '15–60 days', maxDaysToExam: 60, shares: shares(0.40, 0.35, 0.15, 0.10) },
    { id: 'far', label: 'More than 60 days, or no exam scheduled', maxDaysToExam: null, shares: shares(0.45, 0.25, 0.20, 0.10) },
  ],

  priority: {
    conceptWeakness: 0.32,
    topicOrSubtopicGap: 0.18,
    examBlueprintDeficit: 0.20,
    spacedReviewUrgency: 0.12,
    informationGain: 0.10,
    recentErrorBoost: 0.05,
    novelty: 0.03,
    repetitionPenalty: 0.15,
    exposurePenalty: 0.20,
    fatiguePenalty: 0.10,
  },

  mastery: {
    priorAlpha: 1,
    priorBeta: 1,
    decayHalfLifeDays: 60,
    minDifficultyCredit: 0.75,
    maxDifficultyCredit: 1.25,
    mainConceptRelevance: 1,
    secondaryConceptRelevance: 0.6,
    highConfidenceErrorWeight: 1.3,
  },

  validity: {
    fastResponseRatio: 0.25,
    fastWrongWeight: 0.5,
    fastCorrectWeight: 0.4,
    exposedRepeatWeight: 0.25,
    blankWeight: 0.25,
    defaultExpectedSeconds: 75,
  },

  statuses: {
    weakBelow: 0.55,
    secureAtOrAbove: 0.75,
    measuredDistinctItems: 2,
    weakDistinctItems: 2,
    secureDistinctItems: 4,
    spacedSuccessMinHours: 48,
    weakHighConfidenceErrors: 2,
  },

  reviewIntervalDays: {
    attention: 1,
    weak: 1,
    developing: 3,
    secure: 14,
  },

  interventions: {
    boostMultiplier: 1.05,
    stackedMultiplierCap: 1.15,
    remainingEligibleBlocks: 3,
    repairsToCancelBoost: 2,
    spacedRepairsRequired: 1,
    transferCheckWithinBlocks: 2,
    delayedTransferHours: 48,
    misconceptionEscalationCount: 2,
    repeatMissEscalationCount: 2,
    maxResourceRecommendations: 1,
  },

  constraints: {
    minBlockSize: 20,
    maxBlockSize: 40,
    maxItemsPerPrimaryConcept: 2,
    maxConsecutiveSameTopic: 3,
    minUnseenShare: 0.4,
    maxExposuresPerItem: 1,
    exposureWindowBlocks: 5,
    quotaTolerance: 1,
    rollingDebtWindowBlocks: 4,
    targetDemandingShare: 0.5,
    targetHighCognitiveShare: 0.3,
  },

  relaxationOrder: ['novelty', 'difficultyMix', 'consecutiveTopic', 'unseenShare', 'conceptCap', 'exposureCap', 'quotaTolerance'],

  readiness: {
    autoReserveShare: 0.15,
    exposureExclusionDays: 30,
    assessmentSize: 40,
    secondsPerItem: 75,
    minItemsPerTopicReport: 3,
    intervalConfidence: 0.9,
  },

  schedule: {
    capacityBufferShare: 0.18,
    minTaskMinutes: 15,
    maxTaskMinutes: 60,
    maxConsecutiveHighEffort: 1,
    minimumTierShare: 0.5,
    recommendedTierShare: 0.35,
    mockLeadDays: 7,
    catchUpShare: 0.5,
  },

  crashHorizons: [
    {
      days: 75,
      emphasis: 'Foundation, breadth and spacing',
      assessmentCadence: 'Baseline, then every 2–3 weeks',
      recoveryPolicy: 'Full prerequisite repair',
      shares: shares(0.45, 0.25, 0.20, 0.10),
    },
    {
      days: 60,
      emphasis: 'Breadth and weak repair',
      assessmentCadence: 'Baseline, then fortnightly',
      recoveryPolicy: 'Focused prerequisites',
      shares: shares(0.40, 0.35, 0.15, 0.10),
    },
    {
      days: 30,
      emphasis: 'Blueprint coverage and mixed timed practice',
      assessmentCadence: 'Weekly',
      recoveryPolicy: 'Shortest approved intervention',
      shares: shares(0.30, 0.45, 0.15, 0.10),
    },
    {
      days: 14,
      emphasis: 'Exam simulation and highest-impact gaps',
      assessmentCadence: 'Baseline and 1–2 final mocks',
      recoveryPolicy: 'Avoid deep low-yield detours',
      shares: shares(0.25, 0.50, 0.15, 0.10),
    },
  ],

  changeNotes: [
    {
      version: 1,
      at: '2026-07-19',
      author: 'Connect Cortex',
      note: 'Initial published configuration. All weights, thresholds and intervals are launch hypotheses awaiting local held-out calibration.',
    },
  ],
}

/** A fresh copy, so a caller editing a draft cannot mutate the shipped default. */
export function defaultAdaptiveConfig(): AdaptiveConfig {
  return structuredClone(DEFAULT_ADAPTIVE_CONFIG)
}

/** Shares as stored may drift from 1 after editing; scoring needs them summing to 1. */
export function normaliseShares(input: AllocationShares): AllocationShares {
  const total = ALLOCATION_NEEDS.reduce((sum, need) => sum + Math.max(0, input[need]), 0)
  if (total <= 0) return { ...DEFAULT_ADAPTIVE_CONFIG.defaultShares }
  return ALLOCATION_NEEDS.reduce((out, need) => {
    out[need] = Math.max(0, input[need]) / total
    return out
  }, {} as AllocationShares)
}

/**
 * The allocation for a given exam horizon.
 *
 * `daysToExam` is null when the student's year has no exam on the timetable —
 * which is common, and must not be dressed up as an imminent one. Bands are
 * matched narrowest-first so an explicit "14 days or fewer" always wins over a
 * wider band that also contains 14.
 */
export function sharesForHorizon(config: AdaptiveConfig, daysToExam: number | null): AllocationShares {
  if (daysToExam === null) {
    const open = config.horizonBands.find((band) => band.maxDaysToExam === null)
    return normaliseShares(open?.shares ?? config.defaultShares)
  }
  const bounded = config.horizonBands
    .filter((band) => band.maxDaysToExam !== null && daysToExam <= band.maxDaysToExam)
    .sort((a, b) => (a.maxDaysToExam as number) - (b.maxDaysToExam as number))
  const band = bounded[0] ?? config.horizonBands.find((item) => item.maxDaysToExam === null)
  return normaliseShares(band?.shares ?? config.defaultShares)
}

/** The crash-course band a horizon falls into, or null when it is too far out. */
export function crashHorizonFor(config: AdaptiveConfig, daysToExam: number | null): CrashHorizonBand | null {
  if (daysToExam === null) return null
  const bands = [...config.crashHorizons].sort((a, b) => a.days - b.days)
  return bands.find((band) => daysToExam <= band.days) ?? null
}
