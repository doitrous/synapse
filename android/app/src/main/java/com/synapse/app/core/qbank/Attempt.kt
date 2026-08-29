package com.synapse.app.core.qbank

import kotlinx.serialization.Serializable
import java.time.Instant
import java.time.ZoneId

/**
 * One local record of a student answering (or reviewing) a question. This is
 * the on-device shape persisted under [attemptsKey] and indexed by
 * [ATTEMPT_INDEX_KEY]; it is broader than [com.synapse.app.core.api.VerifiedAttempt]
 * (the server-verified POST payload), which only carries what's needed to
 * re-grade an answer server-side.
 */
@Serializable
data class AttemptRecord(
    val id: String,
    val at: String,
    val surface: String = "qbank",
    val itemId: String,
    val subjectId: String,
    val topic: String,
    val difficulty: String,
    val conceptIds: List<String> = emptyList(),
    val correct: Boolean? = null,
    val seconds: Int? = null,
    val sessionId: String,
    val selectedIndex: Int? = null,
    val correctIndex: Int? = null,
    val subtopic: String? = null,
    val sessionDurationSeconds: Int? = null,
    val sessionOvertimeSeconds: Int? = null,
)

/** The stable identity of one attempt: unique per session/surface/item. */
fun attemptId(sessionId: String, surface: String, itemId: String): String = "$sessionId:$surface:$itemId"

/** The local-calendar `YYYY-MM` bucket [at] falls into, in the system default zone. */
fun monthKey(at: Instant): String {
    val zoned = at.atZone(ZoneId.systemDefault())
    return "%04d-%02d".format(zoned.year, zoned.monthValue)
}

/** The user-state key holding the month's attempts array. */
fun attemptsKey(month: String): String = "synapse.progress.attempts.$month"

/** The user-state key holding the cross-month index of known attempt ids. */
const val ATTEMPT_INDEX_KEY = "synapse.progress.attemptIndex.v1"

/**
 * Collapses [records] to one entry per [AttemptRecord.id], keeping the last
 * occurrence — the same id can be written more than once (e.g. a resumed
 * session re-syncing), and the most recent write should win.
 */
fun dedup(records: List<AttemptRecord>): List<AttemptRecord> =
    records.associateBy { it.id }.values.toList()
