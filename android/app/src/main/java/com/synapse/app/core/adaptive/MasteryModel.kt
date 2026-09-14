package com.synapse.app.core.adaptive

import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable
import java.time.Instant
import kotlin.math.max
import kotlin.math.min
import kotlin.math.pow
import kotlin.math.sqrt

/**
 * How well a student knows a concept, and how sure we are.
 *
 * Port of `src/data/adaptive/masteryModel.ts`, cross-checked against
 * `ios/Synapse/Core/Adaptive/AdaptiveMastery.swift`. A decayed Beta model over
 * the immutable evidence ledger. Deliberately simple: IRT, Bayesian knowledge
 * tracing, multidimensional Elo and anything learned stay offline candidates
 * until the item pool and response data are large, clean and calibrated
 * enough to beat transparent rules on held-out outcomes.
 *
 * Two properties matter more than the arithmetic:
 *  - **Replayable.** [rebuildConcept] takes evidence and config and returns
 *    the state. Nothing accumulates in place, so changing the model
 *    recomputes history rather than silently rewriting it under a new name.
 *  - **Honest about ignorance.** Every estimate carries an interval ([ConceptState.uncertainty]).
 *    One right answer is not mastery.
 *
 * The clock is always a parameter ([Instant]), never read internally, so a
 * rebuild is reproducible from the same inputs on any client.
 */

private const val HOUR_MS = 3_600_000L
private const val DAY_MS = 86_400_000L

/**
 * Where a concept stands.
 *
 * `ATTENTION` is the important one. A single wrong answer produces attention,
 * not weakness: it schedules a follow-up and lightly marks the concept, and it
 * takes repeated independent evidence — or a high-confidence misconception —
 * to become a label a student sees as "you are weak at this".
 */
@Serializable
enum class ConceptStatus {
    @SerialName("unmeasured") UNMEASURED,
    @SerialName("attention") ATTENTION,
    @SerialName("weak") WEAK,
    @SerialName("developing") DEVELOPING,
    @SerialName("secure") SECURE,
    @SerialName("review-due") REVIEW_DUE,
}

// The human-readable label for each status is UI copy, not model logic —
// it lives in feature/adaptive/AdaptiveScreen.kt as a `Map<ConceptStatus, Int>`
// of @StringRes ids (see CONCEPT_STATUS_LABEL_RES there), resolved with
// stringResource so it can be localized (strings_adaptive.xml adaptive_status_label_*).

/**
 * The statuses adaptive practice treats as a repair target.
 *
 * `ATTENTION` is included because a follow-up is exactly what one error is
 * supposed to trigger — but it is not a weakness label, and the interface
 * must not present it as one.
 */
val REPAIR_STATUSES: List<ConceptStatus> = listOf(ConceptStatus.WEAK, ConceptStatus.ATTENTION)

@Serializable
data class ConceptState(
    val conceptId: String,
    /** Beta parameters after decay and all weighted evidence. */
    val alpha: Double,
    val beta: Double,
    /** Posterior mean, 0-1. Never shown without its interval. */
    val mean: Double,
    /** Credible interval half-width, 0-1. Large means "we do not know yet". */
    val uncertainty: Double,
    /** Distinct questions that produced evidence — not attempt count. */
    val distinctItems: Int,
    /** Every marked attempt, including repeats of the same question. */
    val attempts: Int,
    /** Raw wrong attempts, as the student experienced them. */
    val rawWrong: Int,
    /** Wrong answers the student had said they were sure about. */
    val highConfidenceErrors: Int,
    /** Correct answers given at least `spacedSuccessMinHours` after the previous evidence. */
    val spacedSuccesses: Int,
    /** Median observed seconds / expected seconds, or null when nothing was timed. */
    val responseTimeRatio: Double?,
    /** ISO timestamp of the most recent evidence of any kind. */
    val lastSeen: String?,
    /** ISO timestamp this concept becomes worth revisiting. */
    val nextReviewAt: String?,
    val status: ConceptStatus,
    /** The config version this estimate was produced under. */
    val modelVersion: Int,
)

/** A concept with no evidence at all. */
fun blankState(conceptId: String, config: AdaptiveConfig): ConceptState {
    val priorAlpha = config.mastery.priorAlpha
    val priorBeta = config.mastery.priorBeta
    return ConceptState(
        conceptId = conceptId,
        alpha = priorAlpha,
        beta = priorBeta,
        mean = priorAlpha / (priorAlpha + priorBeta),
        uncertainty = betaHalfWidth(priorAlpha, priorBeta),
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
 * A normal-approximation half-width for the Beta posterior.
 *
 * Two standard deviations, clamped to the unit interval. Exact quantiles
 * would need an incomplete beta function for a figure that is only ever
 * rendered as a band a few pixels wide; the approximation is honest at the
 * scale it is shown, and it is monotone in evidence.
 */
fun betaHalfWidth(alpha: Double, beta: Double): Double {
    val n = alpha + beta
    if (n <= 0) return 0.5
    val variance = (alpha * beta) / (n * n * (n + 1))
    return min(0.5, 2 * sqrt(max(0.0, variance)))
}

/**
 * Difficulty credit, clamped.
 *
 * Getting a Challenging item right says more than getting an Easy one right,
 * but only a little more — the clamp is what stops one hard question from
 * outweighing a week of consistent work. Unrecognised bands sit at neutral
 * rather than guessing.
 */
fun difficultyCredit(difficulty: String, config: AdaptiveConfig): Double {
    val floor = config.mastery.minDifficultyCredit
    val ceiling = config.mastery.maxDifficultyCredit
    val span = ceiling - floor
    val position = when (difficulty) {
        "Easy" -> 0.0
        "Moderate" -> 1.0 / 3.0
        "Hard" -> 2.0 / 3.0
        "Challenging" -> 1.0
        else -> return (floor + ceiling) / 2
    }
    return floor + span * position
}

/** How much a concept role says this item measured this concept. */
fun roleRelevance(role: ConceptRole, config: AdaptiveConfig): Double =
    if (role == ConceptRole.MAIN) config.mastery.mainConceptRelevance else config.mastery.secondaryConceptRelevance

/**
 * Whether the answer arrived too fast to have been reasoned.
 *
 * Response time alone never proves or disproves knowledge — it only ever
 * reduces how much an attempt is allowed to move an estimate. The raw record
 * is untouched either way.
 */
fun isAbnormallyFast(event: AdaptiveEvidenceEvent, config: AdaptiveConfig): Boolean {
    val seconds = event.seconds ?: return false
    val expected = event.expectedSeconds ?: config.validity.defaultExpectedSeconds
    if (expected <= 0) return false
    return seconds < expected * config.validity.fastResponseRatio
}

/**
 * How much this one event is allowed to move the estimate.
 *
 * relevance x item validity x difficulty credit, with exposure and speed
 * applied as reductions. Every factor is a reduction from a full-weight
 * ordinary answer; nothing here can amplify an attempt beyond its difficulty
 * credit, except the high-confidence-error case, which is the point.
 */
fun evidenceWeight(event: AdaptiveEvidenceEvent, config: AdaptiveConfig): Double {
    var weight = roleRelevance(event.role, config) * difficultyCredit(event.difficulty, config)

    if (event.outcome != AttemptOutcome.ANSWERED) weight *= config.validity.blankWeight
    if (event.exposure == ExposureState.REPEAT_AFTER_REVEAL) weight *= config.validity.exposedRepeatWeight
    if (isAbnormallyFast(event, config)) {
        weight *= if (event.correct == true) config.validity.fastCorrectWeight else config.validity.fastWrongWeight
    }
    // A wrong answer the student was sure of is the strongest misconception
    // evidence there is, so it is the one case that carries extra weight.
    if (event.correct == false && event.confidence == Confidence.SURE) {
        weight *= config.mastery.highConfidenceErrorWeight
    }
    return weight
}

data class AlphaBeta(val alpha: Double, val beta: Double)

/**
 * Fold one event into a running Beta state.
 *
 * The decay pulls the accumulated evidence back toward the prior in
 * proportion to elapsed time, so a concept last practised months ago is
 * treated as genuinely less certain rather than permanently proven.
 */
fun applyEvidence(alpha: Double, beta: Double, at: String?, event: AdaptiveEvidenceEvent, config: AdaptiveConfig): AlphaBeta {
    val priorAlpha = config.mastery.priorAlpha
    val priorBeta = config.mastery.priorBeta
    val halfLifeDays = config.mastery.decayHalfLifeDays

    val elapsedDays = if (at != null) {
        max(0.0, (Instant.parse(event.at).toEpochMilli() - Instant.parse(at).toEpochMilli()).toDouble() / DAY_MS)
    } else {
        0.0
    }
    val decay = if (halfLifeDays > 0) 0.5.pow(elapsedDays / halfLifeDays) else 1.0

    val weight = evidenceWeight(event, config)
    // A blank contributes uncertainty, not a verdict: it decays what came
    // before and adds a small amount of negative evidence, never a full wrong
    // answer.
    val correctness = if (event.correct == true) 1.0 else 0.0

    return AlphaBeta(
        alpha = priorAlpha + decay * (alpha - priorAlpha) + weight * correctness,
        beta = priorBeta + decay * (beta - priorBeta) + weight * (1 - correctness),
    )
}

/**
 * Which band a state falls into.
 *
 * Read the order carefully — it encodes the product's safety rules:
 *  - Not enough distinct questions means `UNMEASURED`, whatever the accuracy.
 *    One lucky answer must never read as knowledge.
 *  - `WEAK` needs repeated independent evidence, or two high-confidence
 *    misconceptions. A single ordinary error can only reach `ATTENTION`.
 *  - `SECURE` needs the threshold, enough distinct questions, **and** a
 *    successful review at least 48 hours later. Answering four questions in
 *    one sitting is not retention.
 */
fun conceptStatus(state: ConceptState, config: AdaptiveConfig, now: Instant = Instant.now()): ConceptStatus {
    val t = config.statuses

    if (state.distinctItems < t.measuredDistinctItems) {
        // Even unmeasured, one recent error is worth surfacing as something to
        // look at again — that is the whole point of the attention band.
        return if (state.rawWrong > 0 || state.highConfidenceErrors > 0) ConceptStatus.ATTENTION else ConceptStatus.UNMEASURED
    }

    val secure = state.mean >= t.secureAtOrAbove &&
        state.distinctItems >= t.secureDistinctItems &&
        state.spacedSuccesses >= 1

    if (secure) {
        val due = state.nextReviewAt != null && Instant.parse(state.nextReviewAt) <= now
        return if (due) ConceptStatus.REVIEW_DUE else ConceptStatus.SECURE
    }

    val weak = (state.mean < t.weakBelow && state.distinctItems >= t.weakDistinctItems) ||
        state.highConfidenceErrors >= t.weakHighConfidenceErrors

    if (weak) return ConceptStatus.WEAK
    if (state.rawWrong > 0 && state.distinctItems < t.secureDistinctItems) return ConceptStatus.ATTENTION
    return ConceptStatus.DEVELOPING
}

/** Which review interval a status waits out, in days. `UNMEASURED` has nothing to review. */
private fun reviewIntervalDays(status: ConceptStatus, config: AdaptiveConfig): Double? = when (status) {
    ConceptStatus.WEAK -> config.reviewIntervalDays.weak
    ConceptStatus.ATTENTION -> config.reviewIntervalDays.attention
    ConceptStatus.DEVELOPING -> config.reviewIntervalDays.developing
    ConceptStatus.SECURE, ConceptStatus.REVIEW_DUE -> config.reviewIntervalDays.secure
    ConceptStatus.UNMEASURED -> null
}

private fun median(values: List<Double>): Double? {
    if (values.isEmpty()) return null
    val sorted = values.sorted()
    val middle = sorted.size / 2
    return if (sorted.size % 2 == 1) sorted[middle] else (sorted[middle - 1] + sorted[middle]) / 2
}

/**
 * Rebuild one concept's state from its evidence.
 *
 * Pure, and the only way a [ConceptState] is ever produced. `events` must be
 * for a single concept; pass them in any order — they are sorted here so a
 * caller cannot corrupt the decay by handing over an unsorted list.
 */
fun rebuildConcept(
    conceptId: String,
    events: List<AdaptiveEvidenceEvent>,
    config: AdaptiveConfig,
    now: Instant = Instant.now(),
): ConceptState {
    val ordered = events.filter { it.conceptId == conceptId }.sortedBy { it.at }

    if (ordered.isEmpty()) return blankState(conceptId, config)

    var alpha = config.mastery.priorAlpha
    var beta = config.mastery.priorBeta
    var at: String? = null
    var spacedSuccesses = 0
    var highConfidenceErrors = 0
    var attempts = 0
    val ratios = mutableListOf<Double>()

    for (event in ordered) {
        val spacedFromPrevious = at != null &&
            Instant.parse(event.at).toEpochMilli() - Instant.parse(at).toEpochMilli() >= config.statuses.spacedSuccessMinHours * HOUR_MS

        val next = applyEvidence(alpha, beta, at, event, config)
        alpha = next.alpha
        beta = next.beta
        at = event.at

        if (event.correct != null) attempts += 1
        if (event.correct == true && spacedFromPrevious) spacedSuccesses += 1
        if (event.correct == false && event.confidence == Confidence.SURE) highConfidenceErrors += 1
        if (event.seconds != null) {
            val expected = event.expectedSeconds ?: config.validity.defaultExpectedSeconds
            if (expected > 0) ratios.add(event.seconds / expected)
        }
    }

    val mean = alpha / (alpha + beta)
    val partial = ConceptState(
        conceptId = conceptId,
        alpha = alpha,
        beta = beta,
        mean = mean,
        uncertainty = betaHalfWidth(alpha, beta),
        distinctItems = distinctQuestions(ordered),
        attempts = attempts,
        rawWrong = rawWrongAttempts(ordered),
        highConfidenceErrors = highConfidenceErrors,
        spacedSuccesses = spacedSuccesses,
        responseTimeRatio = median(ratios),
        lastSeen = at,
        nextReviewAt = null,
        status = ConceptStatus.UNMEASURED,
        modelVersion = config.version,
    )

    // Status and review date are mutually dependent — `REVIEW_DUE` is "secure
    // and past its date" — so the date is computed from the status the state
    // would have without it, then the status is finalised against that date.
    val provisional = conceptStatus(partial, config, now)
    val interval = reviewIntervalDays(provisional, config)
    val nextReviewAt = if (interval != null && at != null) {
        Instant.parse(at).plusMillis((interval * DAY_MS).toLong()).toString()
    } else {
        null
    }

    val withDate = partial.copy(nextReviewAt = nextReviewAt)
    return withDate.copy(status = conceptStatus(withDate, config, now))
}

/** Rebuild every concept that has evidence. */
fun rebuildAll(events: List<AdaptiveEvidenceEvent>, config: AdaptiveConfig, now: Instant = Instant.now()): Map<String, ConceptState> =
    events.map { it.conceptId }.toSet().associateWith { conceptId -> rebuildConcept(conceptId, events, config, now) }

/** How overdue a review is, in days. Positive means overdue; null means not scheduled. */
fun reviewUrgencyDays(state: ConceptState, now: Instant = Instant.now()): Double? {
    val next = state.nextReviewAt ?: return null
    return (now.toEpochMilli() - Instant.parse(next).toEpochMilli()).toDouble() / DAY_MS
}

/** Concepts with too little evidence to say anything about. */
fun isUnmeasured(state: ConceptState?): Boolean = state == null || state.status == ConceptStatus.UNMEASURED
