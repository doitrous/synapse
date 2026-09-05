package com.nishany.android.core.adaptive

import java.time.Instant
import java.time.LocalDateTime
import java.time.OffsetDateTime
import java.time.ZoneOffset
import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable

/** How much a concept was actually being tested by an item. */
@Serializable
enum class ConceptRole {
    @SerialName("main") MAIN,
    @SerialName("secondary") SECONDARY,
}

/** What happened to the attempt. A blank and a timeout are deliberately not "wrong". */
@Serializable
enum class AttemptOutcome {
    @SerialName("answered") ANSWERED,
    @SerialName("blank") BLANK,
    @SerialName("timeout") TIMEOUT,
}

/** What the student said about how sure they were. `unstated` means they were not asked. */
@Serializable
enum class Confidence {
    @SerialName("sure") SURE,
    @SerialName("unsure") UNSURE,
    @SerialName("unstated") UNSTATED,
}

@Serializable
enum class PresentationMode {
    @SerialName("tutor") TUTOR,
    @SerialName("exam") EXAM,
    @SerialName("readiness") READINESS,
}

/** Whether this student had already been shown the answer to this item. */
@Serializable
enum class ExposureState {
    @SerialName("first") FIRST,
    @SerialName("repeat-after-reveal") REPEAT_AFTER_REVEAL,
}

/**
 * One piece of evidence about one concept.
 *
 * A port of `AdaptiveEvidenceEvent` in `src/data/adaptive/evidenceLedger.ts`.
 * The ledger is immutable and every estimate is rebuilt from it, so this type
 * is the whole input to the model -- anything not recorded here cannot affect
 * what the app believes about a student. Read-only on Android (no session
 * runner writes it here yet), so unknown fields are ignored on decode.
 */
@Serializable
data class AdaptiveEvidenceEvent(
    /** `<attemptId>:<conceptId>` -- the idempotency key. */
    val id: String,
    /** ISO timestamp of when the answer was committed. */
    val at: String,
    val attemptId: String,
    val blockId: String = "",
    val questionId: String,
    val questionVersion: String = "",
    val conceptId: String,
    val role: ConceptRole = ConceptRole.MAIN,
    /** True only when marked against a key. Null for a blank or a timeout. */
    val correct: Boolean? = null,
    val outcome: AttemptOutcome = AttemptOutcome.ANSWERED,
    val confidence: Confidence = Confidence.UNSTATED,
    /** Null when the item was untimed. */
    val seconds: Double? = null,
    val expectedSeconds: Double? = null,
    val mode: PresentationMode = PresentationMode.TUTOR,
    val exposure: ExposureState = ExposureState.FIRST,
    /** The author's intended difficulty, carried so difficulty credit is replayable. */
    val difficulty: String = "Moderate",
    val configVersion: Int = 1,
)

/**
 * Raw wrong attempts, as the student experienced them.
 *
 * By attempt rather than by event: one submitted answer produces an event per
 * concept, and counting those would tell a student they had made three mistakes
 * when they made one.
 */
fun List<AdaptiveEvidenceEvent>.rawWrongAttempts(): Int =
    filter { it.correct == false }.map { it.attemptId }.toSet().size

/** Distinct questions that produced evidence, across this list. */
fun List<AdaptiveEvidenceEvent>.distinctQuestions(): Int =
    map { it.questionId }.toSet().size

/**
 * Tolerant ISO-8601 parse.
 *
 * Evidence timestamps arrive from three clients and may be spelled with `Z`,
 * with an explicit offset, or bare. A timestamp that cannot be read is not a
 * visible failure -- it is evidence that quietly stops counting -- so every
 * form the ledger might hold is tried before giving up.
 */
fun parseAdaptiveInstant(text: String): Instant? {
    runCatching { return Instant.parse(text) }
    runCatching { return OffsetDateTime.parse(text).toInstant() }
    runCatching { return LocalDateTime.parse(text).toInstant(ZoneOffset.UTC) }
    return null
}
