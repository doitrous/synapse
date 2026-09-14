package com.synapse.app.feature.performance

import com.synapse.app.core.qbank.AttemptRecord
import org.junit.Assert.assertEquals
import org.junit.Assert.assertNull
import org.junit.Assert.assertTrue
import org.junit.Test
import java.time.Instant
import java.time.ZoneOffset

/**
 * Port of the relevant cases in the web's `src/data/attemptStats.test.ts` (and
 * iOS's `AttemptStatsTest.swift`) — same rule under test: a group with nothing
 * marked has no accuracy, not nought.
 */
class PersonalStatsTest {

    private val zone = ZoneOffset.UTC

    private fun attempt(
        id: String = "a${System.nanoTime()}",
        at: String = "2026-08-13T10:00:00Z",
        surface: String = "qbank",
        itemId: String = "q1",
        subjectId: String = "cvs",
        difficulty: String = "Moderate",
        correct: Boolean? = true,
    ) = AttemptRecord(
        id = id, at = at, surface = surface, itemId = itemId, subjectId = subjectId,
        topic = "Heart failure", difficulty = difficulty, correct = correct, sessionId = "s1",
    )

    // --- marked / accuracyOf ----------------------------------------------------

    @Test fun anUnmarkedAttemptIsNeverCountedInAnAccuracy() {
        val records = listOf(
            attempt(correct = true),
            attempt(correct = false),
            attempt(surface = "station", correct = null),
            attempt(surface = "station", correct = null),
        )
        assertEquals(2, marked(records).size)
        assertEquals(0.5, accuracyOf(records)!!, 0.0001)
    }

    @Test fun accuracyIsNullRatherThanZeroWhenNothingHasBeenMarked() {
        assertNull(accuracyOf(listOf(attempt(correct = null))))
        assertNull(accuracyOf(emptyList()))
    }

    // --- bySubject / byDifficulty ------------------------------------------------

    @Test fun aSubjectBreakdownCountsAttemptsAndMarksSeparately() {
        val rows = bySubject(
            listOf(
                attempt(subjectId = "cvs", correct = true),
                attempt(subjectId = "cvs", correct = false),
                attempt(subjectId = "cvs", surface = "station", correct = null),
                attempt(subjectId = "renal", correct = true),
            )
        )
        val cvs = rows.first { it.key == "cvs" }
        assertEquals(3, cvs.attempts)
        assertEquals(2, cvs.marked)
        assertEquals(1, cvs.correct)
        assertEquals(0.5, cvs.accuracy!!, 0.0001)
        assertEquals(1.0, rows.first { it.key == "renal" }.accuracy!!, 0.0001)
    }

    @Test fun difficultyBandsAreReportedSeparately() {
        val rows = byDifficulty(
            listOf(
                attempt(difficulty = "Easy", correct = true),
                attempt(difficulty = "Hard", correct = false),
                attempt(difficulty = "Hard", correct = false),
            )
        )
        assertEquals(1.0, rows.first { it.key == "Easy" }.accuracy!!, 0.0001)
        assertEquals(0.0, rows.first { it.key == "Hard" }.accuracy!!, 0.0001)
    }

    @Test fun aGroupWithNoMarkedAttemptHasNoAccuracy() {
        val rows = bySurface(listOf(attempt(surface = "station", correct = null)))
        assertNull(rows.single().accuracy)
    }

    // --- distinctItems ------------------------------------------------------------

    @Test fun coverageCountsItemsNotAnswers() {
        val records = listOf(attempt(itemId = "q1"), attempt(itemId = "q1"), attempt(itemId = "q2"))
        assertEquals(3, records.size)
        assertEquals(2, distinctItems(records))
    }

    @Test fun theSameItemIdOnTwoSurfacesIsTwoDifferentItems() {
        val records = listOf(attempt(itemId = "x", surface = "qbank"), attempt(itemId = "x", surface = "lab"))
        assertEquals(2, distinctItems(records))
    }

    // --- localDay / dailyCounts ----------------------------------------------------

    @Test fun aDayIsTheStudentsOwnCalendarDayNotAUtcOne() {
        // 23:30 local (here, UTC) on the 13th must not roll onto the 14th.
        assertEquals("2026-08-13", localDay("2026-08-13T23:30:00Z", zone))
    }

    @Test fun dailyCountsIncludeTheDaysWithNoActivity() {
        val today = Instant.parse("2026-08-13T00:00:00Z")
        val days = dailyCounts(listOf(attempt(at = "2026-08-13T10:00:00Z")), 7, today, zone)
        assertEquals(7, days.size)
        assertEquals(1, days.last().attempts)
        assertEquals(6, days.count { it.attempts == 0 })
    }

    // --- currentStreak --------------------------------------------------------------

    @Test fun aStreakSurvivesATodayThatHasNotBeenStudiedYet() {
        val today = Instant.parse("2026-08-13T09:00:00Z")
        val records = listOf(1, 2, 3).map { back -> attempt(at = daysAgo(back, today)) }
        assertEquals(3, currentStreak(records, today, zone))
    }

    @Test fun aStreakEndsWhenTheDayBeforeYesterdayIsTheLastOne() {
        val today = Instant.parse("2026-08-13T09:00:00Z")
        assertEquals(0, currentStreak(listOf(attempt(at = daysAgo(2, today))), today, zone))
    }

    @Test fun aStreakCountsTodayPlusTheRunBehindIt() {
        val today = Instant.parse("2026-08-13T09:00:00Z")
        val records = listOf(0, 1, 2, 4).map { back -> attempt(at = daysAgo(back, today)) }
        assertEquals(3, currentStreak(records, today, zone))
    }

    @Test fun noActivityIsAStreakOfZero() {
        assertEquals(0, currentStreak(emptyList(), Instant.parse("2026-08-13T09:00:00Z"), zone))
    }

    // --- computePersonalStats ----------------------------------------------------

    @Test fun emptyRecordsProduceTheEmptyStats() {
        val stats = computePersonalStats(emptyList(), Instant.parse("2026-08-13T09:00:00Z"))
        assertEquals(0, stats.attempts)
        assertNull(stats.overallAccuracy)
        assertTrue(stats.bySubject.isEmpty())
        assertTrue(stats.heatmap.isEmpty())
    }

    @Test fun computePersonalStatsWiresEveryFigureFromTheSameAttemptLog() {
        val today = Instant.parse("2026-08-13T09:00:00Z")
        val records = listOf(
            attempt(at = daysAgo(1, today), itemId = "q1", correct = true),
            attempt(at = daysAgo(0, today), itemId = "q1", correct = false),
            attempt(at = daysAgo(0, today), itemId = "q2", correct = true),
        )
        val stats = computePersonalStats(records, today)

        assertEquals(3, stats.attempts)
        assertEquals(3, stats.marked)
        assertEquals(2, stats.streak)
        assertEquals(HEATMAP_DAYS, stats.heatmap.size)
        // q1 answered twice, q2 once — two distinct items, three attempts.
        assertEquals(2, stats.distinctItems)
    }

    private fun daysAgo(days: Int, from: Instant): String =
        from.atZone(zone).toLocalDate().minusDays(days.toLong()).atTime(from.atZone(zone).toLocalTime()).atZone(zone).toInstant().toString()
}
