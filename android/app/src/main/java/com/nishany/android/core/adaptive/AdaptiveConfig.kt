package com.nishany.android.core.adaptive

import kotlinx.serialization.Serializable

/**
 * The tuning behind every adaptive decision.
 *
 * A port of the parts of `src/data/adaptive/config.ts` the dashboard reads,
 * kept field-compatible with the iOS `AdaptiveConfig` so the same admin-authored
 * document (`nishany-adaptive-config-v1`) decodes on every client. It is a
 * *record*, not a constant: an administrator can change it, and every estimate
 * carries the [version] it was produced under so a change recomputes history
 * rather than silently rewriting it under a new name.
 *
 * Every field carries its v1 default so a partial or absent document decodes to
 * something sane rather than throwing -- the whole surface must tolerate a
 * malformed config and fall back, not crash.
 */
@Serializable
data class AdaptiveConfig(
    val version: Int = 1,
    val updatedAt: String = "2026-07-19",
    val mastery: Mastery = Mastery(),
    val validity: Validity = Validity(),
    val statuses: StatusThresholds = StatusThresholds(),
    val reviewIntervalDays: ReviewIntervals = ReviewIntervals(),
    val constraints: Constraints = Constraints(),
    val priority: PriorityWeights = PriorityWeights(),
    val defaultShares: AllocationShares =
        AllocationShares(weakness = 0.40, coverage = 0.35, review = 0.15, uncertainty = 0.10),
    val horizonBands: List<HorizonBand> = DEFAULT_HORIZON_BANDS,
    val crashHorizons: List<CrashHorizonBand> = DEFAULT_CRASH_HORIZONS,
    val readiness: ReadinessConfig = ReadinessConfig(),
    val schedule: ScheduleConfig = ScheduleConfig(),
) {
    @Serializable
    data class Mastery(
        val priorAlpha: Double = 1.0,
        val priorBeta: Double = 1.0,
        /** How long accumulated evidence takes to decay halfway back to the prior. */
        val decayHalfLifeDays: Double = 60.0,
        val minDifficultyCredit: Double = 0.75,
        val maxDifficultyCredit: Double = 1.25,
        val mainConceptRelevance: Double = 1.0,
        val secondaryConceptRelevance: Double = 0.6,
        /** A wrong answer the student was sure of carries *extra* weight. */
        val highConfidenceErrorWeight: Double = 1.3,
    )

    @Serializable
    data class Validity(
        val fastResponseRatio: Double = 0.25,
        val fastWrongWeight: Double = 0.5,
        val fastCorrectWeight: Double = 0.4,
        val exposedRepeatWeight: Double = 0.25,
        val blankWeight: Double = 0.25,
        val defaultExpectedSeconds: Double = 75.0,
    )

    @Serializable
    data class StatusThresholds(
        val weakBelow: Double = 0.55,
        val secureAtOrAbove: Double = 0.75,
        val measuredDistinctItems: Int = 2,
        val weakDistinctItems: Int = 2,
        val secureDistinctItems: Int = 4,
        /** A correct answer this long after the previous evidence counts as retention. */
        val spacedSuccessMinHours: Double = 48.0,
        val weakHighConfidenceErrors: Int = 2,
    )

    @Serializable
    data class PriorityWeights(
        val conceptWeakness: Double = 0.32,
        val topicOrSubtopicGap: Double = 0.18,
        val examBlueprintDeficit: Double = 0.20,
        val spacedReviewUrgency: Double = 0.12,
        val informationGain: Double = 0.10,
        val recentErrorBoost: Double = 0.05,
        val novelty: Double = 0.03,
        val repetitionPenalty: Double = 0.15,
        val exposurePenalty: Double = 0.20,
        val fatiguePenalty: Double = 0.10,
    )

    @Serializable
    data class HorizonBand(
        val id: String = "",
        val label: String = "",
        /** Null is the open-ended band: more than the last bound, or no exam. */
        val maxDaysToExam: Int? = null,
        val shares: AllocationShares = AllocationShares(),
    )

    @Serializable
    data class CrashHorizonBand(
        val days: Int = 0,
        val emphasis: String = "",
        val assessmentCadence: String = "",
        val recoveryPolicy: String = "",
        val shares: AllocationShares = AllocationShares(),
    )

    @Serializable
    data class ReadinessConfig(
        val intervalConfidence: Double = 0.9,
        val minItemsPerTopicReport: Int = 3,
        val autoReserveShare: Double = 0.15,
        val exposureExclusionDays: Int = 30,
        val assessmentSize: Int = 40,
        val secondsPerItem: Double = 75.0,
    )

    @Serializable
    data class ScheduleConfig(
        val capacityBufferShare: Double = 0.18,
        val minTaskMinutes: Int = 15,
        val maxTaskMinutes: Int = 60,
        val maxConsecutiveHighEffort: Int = 1,
        val minimumTierShare: Double = 0.5,
        val recommendedTierShare: Double = 0.35,
        val mockLeadDays: Int = 7,
        val catchUpShare: Double = 0.5,
    )

    @Serializable
    data class Constraints(
        val minBlockSize: Int = 20,
        val maxBlockSize: Int = 40,
        val maxExposuresPerItem: Int = 1,
        val rollingDebtWindowBlocks: Int = 4,
    )

    @Serializable
    data class ReviewIntervals(
        val attention: Double = 1.0,
        val weak: Double = 1.0,
        val developing: Double = 3.0,
        val secure: Double = 14.0,
    )

    /** The narrowest crash band that still holds this many days, or null with no exam. */
    fun crashHorizon(daysToExam: Int?): CrashHorizonBand? {
        if (daysToExam == null) return null
        return crashHorizons.sortedBy { it.days }.firstOrNull { daysToExam <= it.days }
    }

    /**
     * The allocation for a given exam horizon.
     *
     * The nearest band that still contains the horizon wins; with no exam
     * scheduled, the open-ended band applies. Fourteen days out, coverage
     * matters more than depth.
     */
    fun shares(daysToExam: Int?): AllocationShares {
        if (daysToExam == null) {
            val open = horizonBands.firstOrNull { it.maxDaysToExam == null }
            return (open?.shares ?: defaultShares).normalised(defaultShares)
        }
        val bounded = horizonBands
            .filter { it.maxDaysToExam != null && daysToExam <= it.maxDaysToExam }
            .sortedBy { it.maxDaysToExam }
        val band = bounded.firstOrNull() ?: horizonBands.firstOrNull { it.maxDaysToExam == null }
        return (band?.shares ?: defaultShares).normalised(defaultShares)
    }

    companion object {
        /** Admin-authored, so hyphenated and read from the shared catalogue. */
        const val KEY = "nishany-adaptive-config-v1"

        val DEFAULT_HORIZON_BANDS = listOf(
            HorizonBand("imminent", "14 days or fewer", 14,
                AllocationShares(0.25, 0.50, 0.15, 0.10)),
            HorizonBand("near", "15-60 days", 60,
                AllocationShares(0.40, 0.35, 0.15, 0.10)),
            HorizonBand("far", "More than 60 days, or no exam scheduled", null,
                AllocationShares(0.45, 0.25, 0.20, 0.10)),
        )

        val DEFAULT_CRASH_HORIZONS = listOf(
            CrashHorizonBand(75, "Foundation, breadth and spacing",
                "Baseline, then every 2-3 weeks", "Full prerequisite repair",
                AllocationShares(0.45, 0.25, 0.20, 0.10)),
            CrashHorizonBand(60, "Breadth and weak repair",
                "Baseline, then fortnightly", "Focused prerequisites",
                AllocationShares(0.40, 0.35, 0.15, 0.10)),
            CrashHorizonBand(30, "Blueprint coverage and mixed timed practice",
                "Weekly", "Shortest approved intervention",
                AllocationShares(0.30, 0.45, 0.15, 0.10)),
            CrashHorizonBand(14, "Exam simulation and highest-impact gaps",
                "Baseline and 1-2 final mocks", "Avoid deep low-yield detours",
                AllocationShares(0.25, 0.50, 0.15, 0.10)),
        )

        /** The v1 defaults, matching web's `DEFAULT_ADAPTIVE_CONFIG` and iOS's `.default`. */
        val DEFAULT = AdaptiveConfig()
    }
}
