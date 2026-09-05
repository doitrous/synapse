package com.synapse.android.core.adaptive

import java.time.Instant
import kotlin.math.min
import kotlin.math.pow
import kotlin.math.sqrt

/**
 * Where a concept stands.
 *
 * `ATTENTION` is the important one. A single wrong answer produces attention,
 * not weakness: it schedules a follow-up and lightly marks the concept, and it
 * takes repeated independent evidence -- or a high-confidence misconception --
 * to become a label a student sees as "you are weak at this".
 */
enum class ConceptStatus(val wire: String, val label: String) {
    UNMEASURED("unmeasured", "Unmeasured"),
    ATTENTION("attention", "Needs a second look"),
    WEAK("weak", "Weak"),
    DEVELOPING("developing", "Developing"),
    SECURE("secure", "Secure"),
    REVIEW_DUE("review-due", "Review due");

    companion object {
        /**
         * The statuses adaptive practice treats as a repair target. `ATTENTION`
         * is included because a follow-up is exactly what one error is supposed
         * to trigger -- but it is not a weakness label.
         */
        val REPAIR = listOf(WEAK, ATTENTION)
    }
}

/** What the model believes about one concept, and how sure it is. */
data class ConceptState(
    val conceptId: String,
    /** Beta parameters after decay and all weighted evidence. */
    val alpha: Double,
    val beta: Double,
    /** Posterior mean, 0-1. Never shown without its interval. */
    val mean: Double,
    /** Credible interval half-width, 0-1. Large means "we do not know yet". */
    val uncertainty: Double,
    /** Distinct questions that produced evidence -- not attempt count. */
    val distinctItems: Int,
    val attempts: Int,
    /** Raw wrong attempts, as the student experienced them. */
    val rawWrong: Int,
    val highConfidenceErrors: Int,
    /** Correct answers given at least `spacedSuccessMinHours` after the previous evidence. */
    val spacedSuccesses: Int,
    val responseTimeRatio: Double?,
    val lastSeen: String?,
    val nextReviewAt: String?,
    val status: ConceptStatus,
    val modelVersion: Int,
)

/**
 * How well a student knows a concept, and how sure we are.
 *
 * A port of `src/data/adaptive/masteryModel.ts` (and the iOS `AdaptiveMastery`).
 * A decayed Beta model over the immutable evidence ledger, and deliberately
 * simple: a complicated model that cannot be explained to the student it judges
 * is a downgrade, not an upgrade.
 *
 * Two properties matter more than the arithmetic:
 *  - **Replayable.** [rebuild] takes evidence and config and returns the state.
 *    Nothing accumulates in place.
 *  - **Honest about ignorance.** Every estimate carries an interval. One right
 *    answer is not mastery.
 */
object AdaptiveMastery {

    private const val HOUR_MS = 3_600_000.0
    private const val DAY_MS = 86_400_000.0

    /** A concept with no evidence at all. */
    fun blank(conceptId: String, config: AdaptiveConfig): ConceptState {
        val alpha = config.mastery.priorAlpha
        val beta = config.mastery.priorBeta
        return ConceptState(
            conceptId = conceptId,
            alpha = alpha,
            beta = beta,
            mean = alpha / (alpha + beta),
            uncertainty = betaHalfWidth(alpha, beta),
            distinctItems = 0,
            attempts = 0,
            rawWrong = 0,
            highConfidenceErrors = 0,
            spacedSuccesses = 0,
            responseTimeRatio = null,
            lastSeen = null,
            nextReviewAt = null,
            status = ConceptStatus.UNMEASURED,
            modelVersion = config.version,
        )
    }

    /**
     * A normal-approximation half-width for the Beta posterior. Two standard
     * deviations, clamped to the unit interval.
     */
    fun betaHalfWidth(alpha: Double, beta: Double): Double {
        val n = alpha + beta
        if (n <= 0) return 0.5
        val variance = (alpha * beta) / (n * n * (n + 1))
        return min(0.5, 2 * sqrt(maxOf(0.0, variance)))
    }

    /**
     * Difficulty credit, clamped. Getting a Challenging item right says more
     * than getting an Easy one right, but only a little more. Unrecognised bands
     * sit at neutral.
     */
    fun difficultyCredit(difficulty: String, config: AdaptiveConfig): Double {
        val low = config.mastery.minDifficultyCredit
        val high = config.mastery.maxDifficultyCredit
        val position = mapOf(
            "Easy" to 0.0, "Moderate" to 1.0 / 3.0, "Hard" to 2.0 / 3.0, "Challenging" to 1.0,
        )[difficulty] ?: return (low + high) / 2
        return low + (high - low) * position
    }

    fun roleRelevance(role: ConceptRole, config: AdaptiveConfig): Double =
        if (role == ConceptRole.MAIN) config.mastery.mainConceptRelevance
        else config.mastery.secondaryConceptRelevance

    /** Whether the answer arrived too fast to have been reasoned. */
    fun isAbnormallyFast(event: AdaptiveEvidenceEvent, config: AdaptiveConfig): Boolean {
        val seconds = event.seconds ?: return false
        val expected = event.expectedSeconds ?: config.validity.defaultExpectedSeconds
        if (expected <= 0) return false
        return seconds < expected * config.validity.fastResponseRatio
    }

    /**
     * How much this one event is allowed to move the estimate. relevance x item
     * validity x difficulty credit, with exposure and speed applied as
     * reductions -- except a high-confidence error, which carries extra weight.
     */
    fun evidenceWeight(event: AdaptiveEvidenceEvent, config: AdaptiveConfig): Double {
        var weight = roleRelevance(event.role, config) * difficultyCredit(event.difficulty, config)
        if (event.outcome != AttemptOutcome.ANSWERED) weight *= config.validity.blankWeight
        if (event.exposure == ExposureState.REPEAT_AFTER_REVEAL) weight *= config.validity.exposedRepeatWeight
        if (isAbnormallyFast(event, config)) {
            weight *= if (event.correct == true) config.validity.fastCorrectWeight
            else config.validity.fastWrongWeight
        }
        if (event.correct == false && event.confidence == Confidence.SURE) {
            weight *= config.mastery.highConfidenceErrorWeight
        }
        return weight
    }

    /**
     * Fold one event into a running Beta state. The decay pulls accumulated
     * evidence back toward the prior in proportion to elapsed time.
     */
    fun apply(
        alpha: Double, beta: Double, at: String?, event: AdaptiveEvidenceEvent, config: AdaptiveConfig,
    ): Pair<Double, Double> {
        val priorAlpha = config.mastery.priorAlpha
        val priorBeta = config.mastery.priorBeta
        val halfLife = config.mastery.decayHalfLifeDays

        val elapsedDays: Double = run {
            val from = at?.let(::parseAdaptiveInstant)
            val to = parseAdaptiveInstant(event.at)
            if (from != null && to != null) {
                maxOf(0.0, (to.toEpochMilli() - from.toEpochMilli()) / DAY_MS)
            } else 0.0
        }
        val decay = if (halfLife > 0) 0.5.pow(elapsedDays / halfLife) else 1.0

        val weight = evidenceWeight(event, config)
        val correctness = if (event.correct == true) 1.0 else 0.0

        return Pair(
            priorAlpha + decay * (alpha - priorAlpha) + weight * correctness,
            priorBeta + decay * (beta - priorBeta) + weight * (1 - correctness),
        )
    }

    /**
     * Which band a state falls into. The order encodes the product's safety
     * rules: too few distinct questions is `UNMEASURED` whatever the accuracy;
     * `WEAK` needs repeated independent evidence or two high-confidence
     * misconceptions; `SECURE` needs the threshold, enough distinct questions,
     * and a successful review at least 48 hours later.
     */
    fun status(state: ConceptState, config: AdaptiveConfig, now: Instant = Instant.now()): ConceptStatus {
        val t = config.statuses

        if (state.distinctItems < t.measuredDistinctItems) {
            return if (state.rawWrong > 0 || state.highConfidenceErrors > 0) ConceptStatus.ATTENTION
            else ConceptStatus.UNMEASURED
        }

        val secure = state.mean >= t.secureAtOrAbove &&
            state.distinctItems >= t.secureDistinctItems &&
            state.spacedSuccesses >= 1

        if (secure) {
            val due = state.nextReviewAt?.let(::parseAdaptiveInstant)?.let { !it.isAfter(now) } ?: false
            return if (due) ConceptStatus.REVIEW_DUE else ConceptStatus.SECURE
        }

        val weak = (state.mean < t.weakBelow && state.distinctItems >= t.weakDistinctItems) ||
            state.highConfidenceErrors >= t.weakHighConfidenceErrors
        if (weak) return ConceptStatus.WEAK
        if (state.rawWrong > 0 && state.distinctItems < t.secureDistinctItems) return ConceptStatus.ATTENTION
        return ConceptStatus.DEVELOPING
    }

    /** Which review interval a status waits out. `UNMEASURED` has nothing to review. */
    fun reviewIntervalDays(status: ConceptStatus, config: AdaptiveConfig): Double? = when (status) {
        ConceptStatus.WEAK -> config.reviewIntervalDays.weak
        ConceptStatus.ATTENTION -> config.reviewIntervalDays.attention
        ConceptStatus.DEVELOPING -> config.reviewIntervalDays.developing
        ConceptStatus.SECURE, ConceptStatus.REVIEW_DUE -> config.reviewIntervalDays.secure
        ConceptStatus.UNMEASURED -> null
    }

    /**
     * Rebuild one concept's state from its evidence. Pure, and the only way a
     * [ConceptState] is ever produced. Events may be passed in any order -- they
     * are sorted here.
     */
    fun rebuild(
        conceptId: String, events: List<AdaptiveEvidenceEvent>,
        config: AdaptiveConfig, now: Instant = Instant.now(),
    ): ConceptState {
        val ordered = events.filter { it.conceptId == conceptId }.sortedBy { it.at }
        if (ordered.isEmpty()) return blank(conceptId, config)

        var alpha = config.mastery.priorAlpha
        var beta = config.mastery.priorBeta
        var at: String? = null
        var spacedSuccesses = 0
        var highConfidenceErrors = 0
        var attempts = 0
        val ratios = mutableListOf<Double>()

        for (event in ordered) {
            val spacedFromPrevious: Boolean = run {
                val from = at?.let(::parseAdaptiveInstant) ?: return@run false
                val to = parseAdaptiveInstant(event.at) ?: return@run false
                (to.toEpochMilli() - from.toEpochMilli()) >= config.statuses.spacedSuccessMinHours * HOUR_MS
            }

            val next = apply(alpha, beta, at, event, config)
            alpha = next.first
            beta = next.second
            at = event.at

            if (event.correct != null) attempts += 1
            if (event.correct == true && spacedFromPrevious) spacedSuccesses += 1
            if (event.correct == false && event.confidence == Confidence.SURE) highConfidenceErrors += 1
            val seconds = event.seconds
            if (seconds != null) {
                val expected = event.expectedSeconds ?: config.validity.defaultExpectedSeconds
                if (expected > 0) ratios.add(seconds / expected)
            }
        }

        var state = ConceptState(
            conceptId = conceptId,
            alpha = alpha,
            beta = beta,
            mean = alpha / (alpha + beta),
            uncertainty = betaHalfWidth(alpha, beta),
            distinctItems = ordered.distinctQuestions(),
            attempts = attempts,
            rawWrong = ordered.rawWrongAttempts(),
            highConfidenceErrors = highConfidenceErrors,
            spacedSuccesses = spacedSuccesses,
            responseTimeRatio = median(ratios),
            lastSeen = at,
            nextReviewAt = null,
            status = ConceptStatus.UNMEASURED,
            modelVersion = config.version,
        )

        // Status and review date are mutually dependent -- `review-due` is
        // "secure and past its date" -- so the date is computed from the
        // provisional status, then the status is finalised against that date.
        val provisional = status(state, config, now)
        val interval = reviewIntervalDays(provisional, config)
        val last = at?.let(::parseAdaptiveInstant)
        if (interval != null && last != null) {
            state = state.copy(nextReviewAt = last.plusSeconds((interval * 86_400).toLong()).toString())
        }
        return state.copy(status = status(state, config, now))
    }

    /** Rebuild every concept that has evidence. */
    fun rebuildAll(
        events: List<AdaptiveEvidenceEvent>, config: AdaptiveConfig, now: Instant = Instant.now(),
    ): Map<String, ConceptState> {
        val states = mutableMapOf<String, ConceptState>()
        for (conceptId in events.map { it.conceptId }.toSet()) {
            states[conceptId] = rebuild(conceptId, events, config, now)
        }
        return states
    }

    /** How overdue a review is, in days. Positive means overdue; null means not scheduled. */
    fun reviewUrgencyDays(state: ConceptState, now: Instant = Instant.now()): Double? {
        val due = state.nextReviewAt?.let(::parseAdaptiveInstant) ?: return null
        return (now.toEpochMilli() - due.toEpochMilli()) / 86_400_000.0
    }

    private fun median(values: List<Double>): Double? {
        if (values.isEmpty()) return null
        val sorted = values.sorted()
        val middle = sorted.size / 2
        return if (sorted.size % 2 == 1) sorted[middle] else (sorted[middle - 1] + sorted[middle]) / 2
    }
}
