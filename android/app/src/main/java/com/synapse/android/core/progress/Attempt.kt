package com.synapse.android.core.progress

import java.time.Instant
import java.time.ZoneId
import kotlinx.serialization.Serializable

/**
 * One answered item.
 *
 * A port of `AttemptRecord` in `src/data/attempts.ts`, and it has to stay a
 * port: this is the raw event log every performance figure is computed from on
 * every platform. A field named differently here would not throw — it would
 * quietly stop counting on the web.
 */
@Serializable
data class AttemptRecord(
    val id: String,
    /** ISO 8601. */
    val at: String,
    val surface: String,
    val itemId: String,
    val subjectId: String,
    val topic: String,
    val difficulty: String,
    val conceptIds: List<String> = emptyList(),
    /**
     * Null when nobody marked the work — a self-ticked OSCE station. Null is
     * not the same as wrong, and accuracy must not count it either way.
     */
    val correct: Boolean? = null,
    val seconds: Int? = null,
    val sessionId: String,
)

@Serializable
data class AttemptMonth(val version: Int = 1, val month: String, val records: List<AttemptRecord> = emptyList())

@Serializable
data class AttemptTotals(
    val attempts: Int = 0,
    /** Attempts that were marked — the denominator for accuracy. */
    val marked: Int = 0,
    val correct: Int = 0,
    val lastAt: String? = null,
)

@Serializable
data class AttemptIndex(
    val version: Int = 1,
    val months: List<String> = emptyList(),
    val totals: AttemptTotals = AttemptTotals(),
)

object AttemptStore {

    const val INDEX_KEY = "synapse.progress.attemptIndex.v1"

    /**
     * `YYYY-MM` — the shard a timestamp belongs to.
     *
     * Local components, matching the web app's `getFullYear` and `getMonth`.
     * UTC here would file a late-evening answer under the next month for anyone
     * east of Greenwich, splitting the record across two shards the web app
     * would not look in.
     */
    fun month(instant: Instant, zone: ZoneId = ZoneId.systemDefault()): String {
        val local = instant.atZone(zone)
        return "%04d-%02d".format(local.year, local.monthValue)
    }

    fun monthKey(month: String) = "synapse.progress.attempts.$month"

    fun fold(totals: AttemptTotals, record: AttemptRecord) = AttemptTotals(
        attempts = totals.attempts + 1,
        marked = totals.marked + if (record.correct != null) 1 else 0,
        correct = totals.correct + if (record.correct == true) 1 else 0,
        lastAt = record.at,
    )
}
