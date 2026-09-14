package com.synapse.app.feature.performance

import com.synapse.app.core.qbank.AttemptRecord
import java.time.Instant
import java.time.ZoneId
import java.time.format.DateTimeFormatter

/**
 * Every number the student sees about their own work, ported from the web's
 * `src/data/attemptStats.ts` (see also the iOS port at
 * `Core/Performance/AttemptStats.swift`). Pure functions over the attempt log:
 * an unmarked attempt (a self-scored station, a flashcard grade) never reaches
 * an accuracy — a group with nothing marked has no accuracy, not nought.
 */

/** Attempts that were marked against a key — the denominator for accuracy. */
fun marked(records: List<AttemptRecord>): List<AttemptRecord> = records.filter { it.correct != null }

/** Accuracy across marked attempts, or null when nothing has been marked. */
fun accuracyOf(records: List<AttemptRecord>): Double? {
    val scored = marked(records)
    if (scored.isEmpty()) return null
    return scored.count { it.correct == true }.toDouble() / scored.size
}

/** One group of attempts and what they came to. Null [accuracy] means this group has no marked attempt. */
data class Breakdown(val key: String, val attempts: Int, val marked: Int, val correct: Int, val accuracy: Double?)

private fun group(records: List<AttemptRecord>, keyOf: (AttemptRecord) -> String): List<Breakdown> {
    val buckets = linkedMapOf<String, MutableList<AttemptRecord>>()
    for (record in records) buckets.getOrPut(keyOf(record)) { mutableListOf() }.add(record)
    return buckets.map { (key, items) ->
        val scored = marked(items)
        val correct = scored.count { it.correct == true }
        Breakdown(
            key = key,
            attempts = items.size,
            marked = scored.size,
            correct = correct,
            accuracy = if (scored.isEmpty()) null else correct.toDouble() / scored.size,
        )
    }
}

fun bySubject(records: List<AttemptRecord>): List<Breakdown> =
    group(records) { it.subjectId }.sortedByDescending { it.attempts }

fun byDifficulty(records: List<AttemptRecord>): List<Breakdown> = group(records) { it.difficulty }

fun bySurface(records: List<AttemptRecord>): List<Breakdown> =
    group(records) { it.surface }.sortedByDescending { it.attempts }

/** Distinct items attempted, which is coverage rather than volume — the same item answered twenty times is one item covered. */
fun distinctItems(records: List<AttemptRecord>): Int = records.map { "${it.surface}:${it.itemId}" }.toSet().size

private val DAY_FORMATTER: DateTimeFormatter = DateTimeFormatter.ISO_LOCAL_DATE

/** The student's own calendar day for a timestamp — not the UTC one, which shifts late-night answers onto the wrong day. */
fun localDay(at: String, zone: ZoneId = ZoneId.systemDefault()): String =
    Instant.parse(at).atZone(zone).toLocalDate().format(DAY_FORMATTER)

private fun localDay(instant: Instant, zone: ZoneId): String = instant.atZone(zone).toLocalDate().format(DAY_FORMATTER)

/** One calendar day's worth of answers — the heatmap's unit cell. */
data class DayCount(val date: String, val attempts: Int)

/**
 * One entry per day for the last [days] days ending at [today] (inclusive), including
 * the empty ones — a heatmap needs the gaps as much as the activity, or a fortnight of
 * silence compresses into what looks like a busy week.
 */
fun dailyCounts(records: List<AttemptRecord>, days: Int, today: Instant, zone: ZoneId = ZoneId.systemDefault()): List<DayCount> {
    val todayDate = today.atZone(zone).toLocalDate()
    val counts = linkedMapOf<String, Int>()
    for (offset in (days - 1) downTo 0) counts[todayDate.minusDays(offset.toLong()).format(DAY_FORMATTER)] = 0
    for (record in records) {
        val day = localDay(record.at, zone)
        if (day in counts) counts[day] = counts.getValue(day) + 1
    }
    return counts.map { (date, attempts) -> DayCount(date, attempts) }
}

/**
 * Consecutive days ending today, or ending yesterday if today has no activity yet.
 * A streak is not broken the moment midnight passes — only once a whole day goes by
 * with nothing recorded.
 */
fun currentStreak(records: List<AttemptRecord>, today: Instant, zone: ZoneId = ZoneId.systemDefault()): Int {
    val active = records.map { localDay(it.at, zone) }.toSet()
    if (active.isEmpty()) return 0
    var cursor = today.atZone(zone).toLocalDate()
    if (cursor.format(DAY_FORMATTER) !in active) {
        cursor = cursor.minusDays(1)
        if (cursor.format(DAY_FORMATTER) !in active) return 0
    }
    var streak = 0
    while (cursor.format(DAY_FORMATTER) in active) {
        streak++
        cursor = cursor.minusDays(1)
    }
    return streak
}

/** Days the heatmap covers — 17 weeks, matching the iOS "When you study" grid. */
const val HEATMAP_DAYS = 17 * 7

/** Everything [feature/performance/PerformanceScreen.kt][PerformanceScreen] renders for the Personal progress tab. */
data class PersonalStats(
    val attempts: Int,
    val marked: Int,
    val correct: Int,
    val overallAccuracy: Double?,
    val bySubject: List<Breakdown>,
    val byDifficulty: List<Breakdown>,
    val bySurface: List<Breakdown>,
    val heatmap: List<DayCount>,
    val streak: Int,
    val distinctItems: Int,
) {
    companion object {
        val EMPTY = PersonalStats(
            attempts = 0, marked = 0, correct = 0, overallAccuracy = null,
            bySubject = emptyList(), byDifficulty = emptyList(), bySurface = emptyList(),
            heatmap = emptyList(), streak = 0, distinctItems = 0,
        )
    }
}

/** Below this many marked answers, an accuracy figure is noise dressed as a measurement. */
const val MIN_MARKED_FOR_ACCURACY = 20

fun computePersonalStats(records: List<AttemptRecord>, now: Instant): PersonalStats {
    if (records.isEmpty()) return PersonalStats.EMPTY
    val scored = marked(records)
    return PersonalStats(
        attempts = records.size,
        marked = scored.size,
        correct = scored.count { it.correct == true },
        overallAccuracy = accuracyOf(records),
        bySubject = bySubject(records),
        byDifficulty = byDifficulty(records),
        bySurface = bySurface(records),
        heatmap = dailyCounts(records, HEATMAP_DAYS, now),
        streak = currentStreak(records, now),
        distinctItems = distinctItems(records),
    )
}
