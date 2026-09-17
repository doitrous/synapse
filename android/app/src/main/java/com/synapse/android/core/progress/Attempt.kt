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

    const val INDEX_KEY = "nishany.progress.attemptIndex.v1"

    /**
     * How many month shards count as "the student's history", everywhere.
     *
     * Website-first, from `src/lib/useAttemptLog.ts:17`
     * (`export const HISTORY_MONTHS = 6`), whose own comment explains the
     * six: it covers every window the app shows, the longest being the
     * seventeen-week heatmap.
     *
     * One constant because the number has to be the same in two places that
     * are easy to drift apart -- what [com.synapse.android.core.sync.SyncEngine]
     * *fetches* and what [AttemptLedger] *reads*. Fetch fewer than the ledger
     * reads and a fresh install shows a shorter history than the same
     * student's laptop; worse, `QuestionBankViewModel.build` counts previous
     * sittings against that truncated ledger to auto-name "Test N", so it
     * mints a name the web has already used.
     */
    const val HISTORY_MONTHS = 6

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

    fun monthKey(month: String) = "nishany.progress.attempts.$month"

    /**
     * The id a record is deduplicated by: `"$sessionId:$surface:$itemId"`,
     * matching `attemptId` in `src/data/attempts.ts:108-110`. A second sitting
     * at the same question carries a different `sessionId`, so it is a new
     * record; a double-tap inside one sitting reuses this id and is refused
     * by [addAttempt].
     */
    fun attemptId(sessionId: String, surface: String, itemId: String): String =
        "$sessionId:$surface:$itemId"

    /**
     * Add a record to its month, refusing an exact duplicate.
     *
     * A port of `addAttempt` in `src/data/attempts.ts:103-106`. React (and a
     * runner reacting to a double-tap) may re-run an event handler more than
     * once; without this check the same click would log two attempts at the
     * same question in the same sitting.
     */
    fun addAttempt(month: AttemptMonth, record: AttemptRecord): AttemptMonth {
        if (month.records.any { it.id == record.id }) return month
        return month.copy(records = month.records + record)
    }

    /**
     * Fold one record into the running totals.
     *
     * `lastAt` only ever moves forward. Records do not always arrive in order —
     * a shard replay or a backfill hands them over oldest-last — and the web
     * (`indexAttempt` in `src/data/attempts.ts`) and iOS both guard against a
     * late arrival dragging "last active" backwards. Overwriting here would
     * make the same ledger read differently on Android.
     */
    fun fold(totals: AttemptTotals, record: AttemptRecord) = AttemptTotals(
        attempts = totals.attempts + 1,
        marked = totals.marked + if (record.correct != null) 1 else 0,
        correct = totals.correct + if (record.correct == true) 1 else 0,
        lastAt = if (totals.lastAt == null || record.at > totals.lastAt) record.at else totals.lastAt,
    )

    /**
     * Fold a record into the index, so headline totals never need a shard
     * read.
     *
     * A port of `indexAttempt` in `src/data/attempts.ts:113-125`. [zone]
     * decides which local month the record's `at` timestamp belongs to — see
     * [month] — and defaults to the device's own, matching every other
     * caller of [month] in this file.
     */
    fun index(index: AttemptIndex, record: AttemptRecord, zone: ZoneId = ZoneId.systemDefault()): AttemptIndex {
        val recordMonth = month(Instant.parse(record.at), zone)
        val months = if (index.months.contains(recordMonth)) index.months else (index.months + recordMonth).sorted()
        return index.copy(months = months, totals = fold(index.totals, record))
    }
}
