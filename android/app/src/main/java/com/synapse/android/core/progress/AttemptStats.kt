package com.synapse.android.core.progress

import java.time.Instant
import java.time.LocalDate
import java.time.ZoneId

/** One day's activity, including days with nothing in them. */
data class DayCount(val date: String, val attempts: Int, val marked: Int, val correct: Int)

/** One sitting, reconstructed from the records it produced. */
data class SessionSummary(
    val sessionId: String,
    /** When the first answer in the sitting was committed. */
    val startedAt: String,
    /** When the last one was. */
    val endedAt: String,
    val surface: String,
    val answered: Int,
    /** Answers actually marked -- a station is practice, not a score. */
    val marked: Int,
    val correct: Int,
    val accuracy: Double?,
    /** Distinct subjects covered, most-answered first. */
    val subjectIds: List<String>,
    val seconds: Int,
)

/**
 * Every number the student sees about their own work, derived here.
 *
 * A port of `src/data/attemptStats.ts`. Pure functions over the attempt log,
 * so each figure can be traced to the records that produced it and tested
 * without a Room database. The rule this file enforces is that an unmarked
 * attempt never reaches an accuracy: a station ticked by the student is
 * practice, and counting it as right or wrong would make the headline
 * accuracy a number about nothing.
 *
 * `AttemptStore` (in this package) is the write side of the ledger. This is
 * the read side -- see `AttemptLedger` for the [LocalStore][com.synapse.android.core.cache.LocalStore]
 * reads that hand this object its [AttemptRecord]s.
 */
object AttemptStats {

    /** Attempts that were marked against a key. */
    fun marked(records: List<AttemptRecord>): List<AttemptRecord> = records.filter { it.correct != null }

    /** Accuracy across marked attempts; null when nothing has been marked. */
    fun accuracyOf(records: List<AttemptRecord>): Double? {
        val scored = marked(records)
        if (scored.isEmpty()) return null
        return scored.count { it.correct == true }.toDouble() / scored.size
    }

    /** Distinct items attempted -- coverage, not volume. Keyed "surface:itemId". */
    fun distinctItems(records: List<AttemptRecord>): Int =
        records.map { "${it.surface}:${it.itemId}" }.toSet().size

    /**
     * Local calendar date of a timestamp -- not the UTC one, which shifts the
     * day for anyone not on Greenwich time. A port of `localDay` at
     * `attemptStats.ts:100`.
     */
    private fun localDay(at: String, zone: ZoneId): LocalDate = Instant.parse(at).atZone(zone).toLocalDate()

    /**
     * One entry per day for the last [days] days, including the empty ones.
     *
     * A port of `attemptStats.ts:109-126`. A chart needs the gaps as much as
     * the activity; dropping empty days compresses a fortnight of nothing
     * into a solid week.
     */
    fun dailyCounts(records: List<AttemptRecord>, days: Int, today: LocalDate = LocalDate.now()): List<DayCount> {
        val zone = ZoneId.systemDefault()
        val start = today.minusDays((days - 1).toLong())
        val counts = LinkedHashMap<LocalDate, DayCount>()
        for (offset in 0 until days) {
            val date = start.plusDays(offset.toLong())
            counts[date] = DayCount(date = date.toString(), attempts = 0, marked = 0, correct = 0)
        }
        for (record in records) {
            val day = localDay(record.at, zone)
            val entry = counts[day] ?: continue
            val marked = entry.marked + if (record.correct != null) 1 else 0
            val correct = entry.correct + if (record.correct == true) 1 else 0
            counts[day] = entry.copy(attempts = entry.attempts + 1, marked = marked, correct = correct)
        }
        return counts.values.toList()
    }

    /**
     * Consecutive days ending today, or ending yesterday.
     *
     * A port of `attemptStats.ts:137-152`. Today having no attempts in it yet
     * does not end a streak -- otherwise someone who studied daily for a
     * month is told they are on zero the moment they open the app in the
     * morning. An empty *yesterday*, with an empty today, is what ends it.
     */
    fun currentStreak(records: List<AttemptRecord>, today: LocalDate = LocalDate.now()): Int {
        val zone = ZoneId.systemDefault()
        val active = records.map { localDay(it.at, zone) }.toSet()
        if (active.isEmpty()) return 0

        var cursor = today
        if (cursor !in active) {
            cursor = cursor.minusDays(1)
            if (cursor !in active) return 0
        }

        var streak = 0
        while (cursor in active) {
            streak += 1
            cursor = cursor.minusDays(1)
        }
        return streak
    }

    /**
     * Sittings, newest first.
     *
     * A port of `attemptStats.ts:311-341`. Groups on [AttemptRecord.sessionId],
     * skipping records that carry none; takes [SessionSummary.startedAt] and
     * [SessionSummary.endedAt] from the sorted `at` values rather than
     * insertion order; scores accuracy over marked records only; orders
     * [SessionSummary.subjectIds] most-answered first; sums `seconds` treating
     * null as 0.
     */
    fun bySession(records: List<AttemptRecord>): List<SessionSummary> {
        val groups = LinkedHashMap<String, MutableList<AttemptRecord>>()
        for (record in records) {
            val sessionId = record.sessionId.ifEmpty { null } ?: continue
            groups.getOrPut(sessionId) { mutableListOf() }.add(record)
        }

        val summaries = groups.map { (sessionId, group) ->
            val times = group.map { it.at }.sorted()
            val scored = marked(group)
            val correct = scored.count { it.correct == true }
            val bySubject = LinkedHashMap<String, Int>()
            for (record in group) bySubject[record.subjectId] = (bySubject[record.subjectId] ?: 0) + 1

            SessionSummary(
                sessionId = sessionId,
                startedAt = times.first(),
                endedAt = times.last(),
                surface = group.first().surface,
                answered = group.size,
                marked = scored.size,
                correct = correct,
                accuracy = if (scored.isNotEmpty()) correct.toDouble() / scored.size else null,
                subjectIds = bySubject.entries.sortedByDescending { it.value }.map { it.key },
                seconds = group.sumOf { it.seconds ?: 0 },
            )
        }

        return summaries.sortedByDescending { it.startedAt }
    }
}
