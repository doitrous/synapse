package com.synapse.app.core.adaptive

import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable

/**
 * What actually happened, concept by concept, kept forever.
 *
 * Port of `src/data/adaptive/evidenceLedger.ts`. The distinction this file
 * exists to protect: **evidence is immutable, mastery is a rebuildable
 * estimate**. Every mastery number is derived by replaying these rows through
 * a versioned model ([MasteryModel]). Change the model and the estimates
 * change; the rows do not.
 *
 * One submitted response produces one event **per assessed concept**. That is
 * the mechanism behind the rule the whole product hangs on: three wrong
 * answers on one concept are three attempts and one weak concept, because
 * they are three events sharing a `conceptId` — not three concepts.
 */

/** Dotted, so a future sync layer can route these to the student's own record. */
const val ADAPTIVE_EVIDENCE_INDEX_KEY = "synapse.progress.adaptive.evidenceIndex.v1"

fun adaptiveEvidenceMonthKey(month: String): String = "synapse.progress.adaptive.evidence.$month"

/**
 * How the student rated their own certainty before the answer was marked.
 *
 * `UNSTATED` is not a middle value — it means the student was not asked, or
 * declined, and it must never be read as "normal confidence".
 */
@Serializable
enum class Confidence {
    @SerialName("sure") SURE,
    @SerialName("unsure") UNSURE,
    @SerialName("unstated") UNSTATED,
}

/**
 * What became of the item.
 *
 * A blank and a timeout are deliberately not "wrong" — folding either into a
 * wrong answer would make a mastery estimate quietly measure speed.
 */
@Serializable
enum class AttemptOutcome {
    @SerialName("answered") ANSWERED,
    @SerialName("blank") BLANK,
    @SerialName("timeout") TIMEOUT,
}

/** Whether this student had already been shown the answer to this item. */
@Serializable
enum class ExposureState {
    @SerialName("first") FIRST,
    @SerialName("repeat-after-reveal") REPEAT_AFTER_REVEAL,
}

@Serializable
enum class PresentationMode {
    @SerialName("tutor") TUTOR,
    @SerialName("exam") EXAM,
    @SerialName("readiness") READINESS,
}

/** Which concept role the item assigned — what it is *for* vs. what it also tests. */
@Serializable
enum class ConceptRole {
    @SerialName("main") MAIN,
    @SerialName("secondary") SECONDARY,
}

@Serializable
data class AdaptiveEvidenceEvent(
    /** `<attemptId>:<conceptId>` — the idempotency key. */
    val id: String,
    /** ISO timestamp of when the answer was committed. */
    val at: String,
    /** Groups every event produced by one submitted response. */
    val attemptId: String,
    /** Groups the events made in one sitting. */
    val blockId: String,
    val questionId: String,
    /** Which revision of the question was answered. */
    val questionVersion: String,
    val conceptId: String,
    val role: ConceptRole,
    /** True only when marked against a key. Null for a blank or timeout. */
    val correct: Boolean?,
    val outcome: AttemptOutcome,
    val confidence: Confidence,
    /** Null when the item was untimed. */
    val seconds: Double?,
    /** Seconds the author expected this item to take, when they recorded one. */
    val expectedSeconds: Double?,
    val mode: PresentationMode,
    val exposure: ExposureState,
    /** The author's intended difficulty, carried so difficulty credit is replayable. */
    val difficulty: String,
    /** The distractor chosen, when it was a wrong answer with a mapped misconception. */
    val misconceptionId: String? = null,
    /** The config version in force when this was recorded, for audit. */
    val configVersion: Int,
)

/**
 * Raw wrong attempts — the number a student recognises from their own
 * session. Deliberately separate from any count of weak concepts: a student
 * who answered three questions wrong and is told they have one weak concept
 * will otherwise assume the app has lost two of their mistakes.
 */
fun rawWrongAttempts(events: List<AdaptiveEvidenceEvent>): Int =
    events.filter { it.correct == false }.map { it.attemptId }.toSet().size

/** Distinct questions that produced evidence for a concept. */
fun distinctQuestions(events: List<AdaptiveEvidenceEvent>): Int =
    events.map { it.questionId }.toSet().size

/** Every event for one concept, oldest first — the input a mastery replay needs. */
fun eventsForConcept(events: List<AdaptiveEvidenceEvent>, conceptId: String): List<AdaptiveEvidenceEvent> =
    events.filter { it.conceptId == conceptId }.sortedBy { it.at }

/** Group events by concept, each group sorted oldest first. */
fun groupByConcept(events: List<AdaptiveEvidenceEvent>): Map<String, List<AdaptiveEvidenceEvent>> =
    events.sortedBy { it.at }.groupBy { it.conceptId }
