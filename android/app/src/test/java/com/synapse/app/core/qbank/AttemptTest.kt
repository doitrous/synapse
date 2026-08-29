package com.synapse.app.core.qbank

import org.junit.After
import org.junit.Assert.assertEquals
import org.junit.Before
import org.junit.Test
import java.time.Instant
import java.util.TimeZone

/**
 * [attemptId], [monthKey], [attemptsKey], and [dedup] are pure helpers around
 * [AttemptRecord] — no network, no persistence — so they're covered directly
 * rather than through [QBankApi].
 */
class AttemptTest {
    private lateinit var originalZone: TimeZone

    @Before fun fixDefaultZone() {
        originalZone = TimeZone.getDefault()
    }

    @After fun restoreDefaultZone() {
        TimeZone.setDefault(originalZone)
    }

    @Test fun attemptIdJoinsSessionSurfaceAndItem() {
        assertEquals("sess-1:qbank:item-9", attemptId("sess-1", "qbank", "item-9"))
    }

    @Test fun monthKeyUsesLocalCalendarYearMonth() {
        TimeZone.setDefault(TimeZone.getTimeZone("UTC"))
        val instant = Instant.parse("2026-08-29T12:00:00Z")
        assertEquals("2026-08", monthKey(instant))
    }

    @Test fun monthKeyFollowsTheSystemDefaultZoneAcrossAMonthBoundary() {
        // 2026-03-01T03:00:00Z is March 1st in UTC, but LA is still on PST
        // (UTC-8; DST starts 2026-03-08) so the local wall-clock time is
        // 2026-02-28T19:00 — monthKey must reflect *that*, proving it uses
        // the local calendar day rather than the raw UTC instant.
        TimeZone.setDefault(TimeZone.getTimeZone("America/Los_Angeles"))
        val instant = Instant.parse("2026-03-01T03:00:00Z")
        assertEquals("2026-02", monthKey(instant))
    }

    @Test fun attemptsKeyNamespacesByMonth() {
        assertEquals("synapse.progress.attempts.2026-08", attemptsKey("2026-08"))
    }

    @Test fun attemptIndexKeyIsAStableConstant() {
        assertEquals("synapse.progress.attemptIndex.v1", ATTEMPT_INDEX_KEY)
    }

    @Test fun dedupKeepsOneRecordPerIdWithTheLastOneWinning() {
        val first = sampleAttempt(id = "a", correct = true)
        val second = sampleAttempt(id = "a", correct = false)
        val other = sampleAttempt(id = "b", correct = true)

        val result = dedup(listOf(first, second, other))

        assertEquals(2, result.size)
        assertEquals(false, result.first { it.id == "a" }.correct)
        assertEquals(true, result.first { it.id == "b" }.correct)
    }

    private fun sampleAttempt(id: String, correct: Boolean?) = AttemptRecord(
        id = id,
        at = "2026-08-29T12:00:00Z",
        itemId = "item-1",
        subjectId = "subj-1",
        topic = "Topic",
        difficulty = "Moderate",
        correct = correct,
        sessionId = "sess-1",
    )
}
