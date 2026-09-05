package com.nishany.android.core.qbank

import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable

/**
 * Tutor explains as you go; timed explains at the end and runs a clock.
 *
 * The difference is not cosmetic. In tutor mode a student is learning and the
 * explanation is the point; in timed mode they are rehearsing an exam, and
 * being shown the answer would defeat it.
 */
@Serializable
enum class SittingMode(val wire: String) {
    @SerialName("tutor") TUTOR("tutor"),
    @SerialName("timed") TIMED("timed"),
    ;

    /** Whether the answer is revealed as soon as it is committed. */
    val explainsAsYouGo: Boolean get() = this == TUTOR
}

/**
 * Everything needed to put a half-finished sitting back on screen.
 *
 * A port of `LiveSession` in `src/pages/student/QuestionBank.tsx`, field for
 * field — a sitting started on the website has to be resumable on the phone,
 * and the record is the only thing that carries it across.
 */
@Serializable
data class LiveSession(
    val questionIds: List<String>,
    val idx: Int,
    /** Question id -> the index of the option chosen. */
    val answers: Map<String, Int>,
    /** Question id -> whether the student has committed to it. */
    val checked: Map<String, Boolean>,
    val mode: SittingMode,
    val sessionId: String,
    /** Seconds, for the timed clock. */
    val elapsed: Int,
    /**
     * Indices the student has actually looked at, so the navigator can tell
     * "skipped" from "not reached".
     */
    val visited: List<Int>,
    val reviewing: Boolean,
    val name: String,
    /** `"running"` or `"results"` — a sitting is never saved while being set up. */
    val phase: String,
    /** ISO 8601. */
    val startedAt: String,
) {
    companion object {
        const val KEY = "nishany.qbank.activeSession.v1"

        /**
         * `sessionId -> the name a student's sitting was given`, ported from
         * `SESSION_NAMES_STORAGE_KEY` (`src/pages/student/QuestionBank.tsx:233`).
         * A separate document from [KEY] on purpose: a name must survive
         * past the sitting that earned it, long after [KEY] has moved on to
         * describe a different one.
         */
        const val SESSION_NAMES_KEY = "nishany.qbank.sessionNames.v1"
    }
}

/**
 * What the navigator shows for one question.
 *
 * Five states, not four: [OMITTED] is a question the student reached, left,
 * and moved past. Folding it into [UNSEEN] would hide the thing they most
 * need to come back to.
 *
 * Local UI state only — never serialized, never sent to the server — so
 * unlike [SittingMode] it has no wire spelling to match. [WRONG] is spelled
 * that way (not `INCORRECT`, as the web calls it in
 * `src/components/qbank/QuestionNavigator.tsx`) to match the Swift port at
 * `ios/Synapse/Core/QuestionBank/QBankSession.swift:68`; since this enum
 * never crosses the wire, the two clients agreeing with each other matters
 * more than either agreeing with the web.
 */
enum class QuestionState {
    ANSWERED, CORRECT, WRONG, OMITTED, UNSEEN,
    ;
}
