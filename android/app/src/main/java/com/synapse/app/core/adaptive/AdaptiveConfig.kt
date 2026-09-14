package com.synapse.app.core.adaptive

import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable

/**
 * Every number the adaptive mastery engine is allowed to use.
 *
 * Port of `src/data/adaptive/config.ts` (web, authoritative) cross-checked
 * against `ios/Synapse/Core/Adaptive/AdaptiveConfig.swift`. Every value below
 * is a **launch hypothesis** carried over verbatim from the web default —
 * none are invented here.
 *
 * ponytail: only the config sections the ported engine actually reads are
 * included (mastery, validity, statuses, review intervals, the horizon/share
 * split, the soft constraints + relaxation order, and readiness). The web's
 * `AdaptiveConfig` also carries `priority`, `interventions`, `schedule`,
 * `crashHorizons` and `changeNotes` sections for algorithms this task does not
 * port (block builder, boosts/interventions, weekly schedule, crash course).
 * Add them here when those engines are ported — duplicating their shape now
 * with no reader would be exactly the speculative flexibility ponytail exists
 * to cut.
 */

/** The four things a slot can be bought with. Order matters: it is the tie-break order for apportionment. */
@Serializable
enum class AllocationNeed {
    @SerialName("weakness") WEAKNESS,
    @SerialName("coverage") COVERAGE,
    @SerialName("review") REVIEW,
    @SerialName("uncertainty") UNCERTAINTY,
}

/** Shares of a block, 0-1, required to sum to 1. */
@Serializable
data class AllocationShares(
    val weakness: Double,
    val coverage: Double,
    val review: Double,
    val uncertainty: Double,
) {
    operator fun get(need: AllocationNeed): Double = when (need) {
        AllocationNeed.WEAKNESS -> weakness
        AllocationNeed.COVERAGE -> coverage
        AllocationNeed.REVIEW -> review
        AllocationNeed.UNCERTAINTY -> uncertainty
    }
}

/**
 * A named horizon band with its own allocation.
 *
 * [maxDaysToExam] is the inclusive upper bound of the band; `null` means "no
 * exam scheduled, or further away than every other band".
 */
@Serializable
data class HorizonBand(
    val id: String,
    val label: String,
    val maxDaysToExam: Int?,
    val shares: AllocationShares,
)

/** How an attempt is judged before it is allowed to move a mastery estimate. */
@Serializable
data class ValidityConfig(
    /** Below this multiple of the item's expected time, an answer is treated as too fast to have been reasoned. */
    val fastResponseRatio: Double,
    /** Weight retained by an abnormally fast wrong answer. */
    val fastWrongWeight: Double,
    /** Weight retained by an abnormally fast correct answer. */
    val fastCorrectWeight: Double,
    /** Weight retained by a repeat of a question this student has already seen the answer to. */
    val exposedRepeatWeight: Double,
    /** Weight of a blank or timed-out item. */
    val blankWeight: Double,
    /** Seconds assumed for an item whose author recorded no estimate. */
    val defaultExpectedSeconds: Double,
)

/** The decayed Beta model's shape. */
@Serializable
data class MasteryModelConfig(
    /** Conservative priors: a new concept is unknown, not assumed competent. */
    val priorAlpha: Double,
    val priorBeta: Double,
    /** Days for prior-relative evidence to halve. */
    val decayHalfLifeDays: Double,
    /** Difficulty credit is clamped into this range so one hard item cannot dominate. */
    val minDifficultyCredit: Double,
    val maxDifficultyCredit: Double,
    /** Relevance weight for a concept the item primarily assesses vs. also assesses. */
    val mainConceptRelevance: Double,
    val secondaryConceptRelevance: Double,
    /** Multiplier applied to negative evidence carrying a high-confidence error. */
    val highConfidenceErrorWeight: Double,
)

/** Where the status bands sit. */
@Serializable
data class StatusThresholdConfig(
    /** Mastery mean below this, with enough evidence, is weak. */
    val weakBelow: Double,
    /** Mastery mean at or above this, with enough evidence and a spaced success, is secure. */
    val secureAtOrAbove: Double,
    /** Distinct valid questions before a concept stops being "unmeasured". */
    val measuredDistinctItems: Int,
    /** Distinct valid questions before "weak" may be asserted. */
    val weakDistinctItems: Int,
    /** Distinct valid questions before "secure" may be asserted. */
    val secureDistinctItems: Int,
    /** Hours that must pass before a successful review counts toward "secure". */
    val spacedSuccessMinHours: Double,
    /** High-confidence misconception errors that alone justify "weak". */
    val weakHighConfidenceErrors: Int,
)

/** How long each status waits before it is worth seeing again, in days. `unmeasured` has no entry: it has nothing to review. */
@Serializable
data class ReviewIntervalConfig(
    val attention: Double,
    val weak: Double,
    val developing: Double,
    val secure: Double,
)

/**
 * The order constraints may be relaxed in when the pool cannot satisfy them.
 *
 * Ordered least-harmful first. Constraints absent from this list are never
 * relaxed, at any pool size — content approval and scope safety are not
 * negotiable.
 */
@Serializable
enum class RelaxableConstraint {
    @SerialName("novelty") NOVELTY,
    @SerialName("difficultyMix") DIFFICULTY_MIX,
    @SerialName("consecutiveTopic") CONSECUTIVE_TOPIC,
    @SerialName("unseenShare") UNSEEN_SHARE,
    @SerialName("conceptCap") CONCEPT_CAP,
    @SerialName("exposureCap") EXPOSURE_CAP,
    @SerialName("quotaTolerance") QUOTA_TOLERANCE,
}

val RELAXABLE_CONSTRAINT_LABEL: Map<RelaxableConstraint, String> = mapOf(
    RelaxableConstraint.NOVELTY to "Novelty preference",
    RelaxableConstraint.DIFFICULTY_MIX to "Difficulty and cognitive-task mix",
    RelaxableConstraint.CONSECUTIVE_TOPIC to "No more than three consecutive items from one topic",
    RelaxableConstraint.UNSEEN_SHARE to "Minimum unseen share",
    RelaxableConstraint.CONCEPT_CAP to "Maximum two items dominated by one concept",
    RelaxableConstraint.EXPOSURE_CAP to "Exposure cap per item",
    RelaxableConstraint.QUOTA_TOLERANCE to "Blueprint quota tolerance",
)

/** Never relaxed, at any pool size, for any student. Stated so it can be shown. */
val NON_NEGOTIABLE_CONSTRAINTS: List<String> = listOf(
    "Content approval status",
    "University, year and module scope",
    "Language and accessibility requirements",
    "Held-out readiness items excluded from practice",
)

/** Hard constraints. Evaluated before any scoring; a high score never overrides one. */
@Serializable
data class ConstraintConfig(
    val minBlockSize: Int,
    val maxBlockSize: Int,
    /** Items in a block dominated by a single concept. */
    val maxItemsPerPrimaryConcept: Int,
    /** Consecutive items drawn from one topic. */
    val maxConsecutiveSameTopic: Int,
    /** Share of a block that must be questions this student has never seen. */
    val minUnseenShare: Double,
    /** Times one item may appear across the exposure window. */
    val maxExposuresPerItem: Int,
    /** Blocks over which exposure is counted. */
    val exposureWindowBlocks: Int,
    /** Allowed absolute deviation from a blueprint node's slot target. */
    val quotaTolerance: Int,
    /** Blocks over which coverage debt is repaid rather than forced into one. */
    val rollingDebtWindowBlocks: Int,
    /** Target share of demanding items, as a soft mix target. */
    val targetDemandingShare: Double,
    /** Target share of high-cognitive-effort items. */
    val targetHighCognitiveShare: Double,
)

/** Readiness assessment separation. */
@Serializable
data class ReadinessConfig(
    /** Share of each blueprint node's pool reserved when no admin flag exists. */
    val autoReserveShare: Double,
    /** Days a practice-exposed item is barred from a readiness assessment. */
    val exposureExclusionDays: Int,
    /** Item count for a standard readiness assessment. */
    val assessmentSize: Int,
    /** Seconds allowed per item. */
    val secondsPerItem: Int,
    /** Marked answers a topic needs before its own uncertainty is worth reporting. */
    val minItemsPerTopicReport: Int,
    /** Confidence level for the reported score interval, 0-1. */
    val intervalConfidence: Double,
)

@Serializable
data class AdaptiveConfig(
    /** Bumped on every material change. Shown to students and admins alike. */
    val version: Int,
    /** ISO date of the last edit. */
    val updatedAt: String,
    /** The default allocation when no exam horizon applies. */
    val defaultShares: AllocationShares,
    val horizonBands: List<HorizonBand>,
    val mastery: MasteryModelConfig,
    val validity: ValidityConfig,
    val statuses: StatusThresholdConfig,
    val reviewIntervalDays: ReviewIntervalConfig,
    val constraints: ConstraintConfig,
    val relaxationOrder: List<RelaxableConstraint>,
    val readiness: ReadinessConfig,
)

private fun shares(weakness: Double, coverage: Double, review: Double, uncertainty: Double) =
    AllocationShares(weakness, coverage, review, uncertainty)

/**
 * The v1 published default. Immutable (Kotlin `val`s all the way down), so
 * unlike the TS `DEFAULT_ADAPTIVE_CONFIG` a caller cannot mutate the shared
 * instance — there is no need for a `defaultAdaptiveConfig()` clone function.
 */
val DEFAULT_ADAPTIVE_CONFIG: AdaptiveConfig = AdaptiveConfig(
    version = 1,
    updatedAt = "2026-07-19",

    // The v1 default. The 50/30/15/5 alternative remains a documented
    // comparison arm in docs/adaptive-study/README.md; it is not wired in as a
    // live variant, because choosing between them requires held-out outcome
    // data this product does not have yet.
    defaultShares = shares(0.40, 0.35, 0.15, 0.10),

    horizonBands = listOf(
        HorizonBand("imminent", "14 days or fewer", 14, shares(0.25, 0.50, 0.15, 0.10)),
        HorizonBand("near", "15–60 days", 60, shares(0.40, 0.35, 0.15, 0.10)),
        HorizonBand("far", "More than 60 days, or no exam scheduled", null, shares(0.45, 0.25, 0.20, 0.10)),
    ),

    mastery = MasteryModelConfig(
        priorAlpha = 1.0,
        priorBeta = 1.0,
        decayHalfLifeDays = 60.0,
        minDifficultyCredit = 0.75,
        maxDifficultyCredit = 1.25,
        mainConceptRelevance = 1.0,
        secondaryConceptRelevance = 0.6,
        highConfidenceErrorWeight = 1.3,
    ),

    validity = ValidityConfig(
        fastResponseRatio = 0.25,
        fastWrongWeight = 0.5,
        fastCorrectWeight = 0.4,
        exposedRepeatWeight = 0.25,
        blankWeight = 0.25,
        defaultExpectedSeconds = 75.0,
    ),

    statuses = StatusThresholdConfig(
        weakBelow = 0.55,
        secureAtOrAbove = 0.75,
        measuredDistinctItems = 2,
        weakDistinctItems = 2,
        secureDistinctItems = 4,
        spacedSuccessMinHours = 48.0,
        weakHighConfidenceErrors = 2,
    ),

    reviewIntervalDays = ReviewIntervalConfig(
        attention = 1.0,
        weak = 1.0,
        developing = 3.0,
        secure = 14.0,
    ),

    constraints = ConstraintConfig(
        minBlockSize = 20,
        maxBlockSize = 40,
        maxItemsPerPrimaryConcept = 2,
        maxConsecutiveSameTopic = 3,
        minUnseenShare = 0.4,
        maxExposuresPerItem = 1,
        exposureWindowBlocks = 5,
        quotaTolerance = 1,
        rollingDebtWindowBlocks = 4,
        targetDemandingShare = 0.5,
        targetHighCognitiveShare = 0.3,
    ),

    relaxationOrder = listOf(
        RelaxableConstraint.NOVELTY,
        RelaxableConstraint.DIFFICULTY_MIX,
        RelaxableConstraint.CONSECUTIVE_TOPIC,
        RelaxableConstraint.UNSEEN_SHARE,
        RelaxableConstraint.CONCEPT_CAP,
        RelaxableConstraint.EXPOSURE_CAP,
        RelaxableConstraint.QUOTA_TOLERANCE,
    ),

    readiness = ReadinessConfig(
        autoReserveShare = 0.15,
        exposureExclusionDays = 30,
        assessmentSize = 40,
        secondsPerItem = 75,
        minItemsPerTopicReport = 3,
        intervalConfidence = 0.9,
    ),
)

/** Shares as stored may drift from 1 after editing; scoring needs them summing to 1. */
fun normaliseShares(input: AllocationShares, fallback: AllocationShares = DEFAULT_ADAPTIVE_CONFIG.defaultShares): AllocationShares {
    val needs = AllocationNeed.entries
    val total = needs.sumOf { need -> maxOf(0.0, input[need]) }
    if (total <= 0) return fallback
    return AllocationShares(
        weakness = maxOf(0.0, input.weakness) / total,
        coverage = maxOf(0.0, input.coverage) / total,
        review = maxOf(0.0, input.review) / total,
        uncertainty = maxOf(0.0, input.uncertainty) / total,
    )
}

/**
 * The allocation for a given exam horizon.
 *
 * `daysToExam` is null when the student's year has no exam on the timetable.
 * Bands are matched narrowest-first so an explicit "14 days or fewer" always
 * wins over a wider band that also contains 14.
 */
fun sharesForHorizon(config: AdaptiveConfig, daysToExam: Int?): AllocationShares {
    if (daysToExam == null) {
        val open = config.horizonBands.firstOrNull { it.maxDaysToExam == null }
        return normaliseShares(open?.shares ?: config.defaultShares, config.defaultShares)
    }
    val bounded = config.horizonBands
        .filter { it.maxDaysToExam != null && daysToExam <= it.maxDaysToExam }
        .sortedBy { it.maxDaysToExam }
    val band = bounded.firstOrNull() ?: config.horizonBands.firstOrNull { it.maxDaysToExam == null }
    return normaliseShares(band?.shares ?: config.defaultShares, config.defaultShares)
}
