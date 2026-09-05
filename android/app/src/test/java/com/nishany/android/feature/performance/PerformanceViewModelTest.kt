package com.nishany.android.feature.performance

import com.nishany.android.core.progress.AttemptRecord
import com.nishany.android.core.ui.UiState
import java.time.LocalDate
import org.junit.Assert.assertEquals
import org.junit.Assert.assertNull
import org.junit.Assert.assertTrue
import org.junit.Test

/**
 * [performanceSummary] and [performanceUiState] in isolation -- no
 * Robolectric, no [android.content.Context], no coroutine dispatcher, no
 * [com.nishany.android.core.cache.LocalStore], because both are plain
 * functions of their arguments. Mirrors `PracticalUiStateTest`'s shape.
 */
class PerformanceViewModelTest {

    private fun record(
        id: String,
        at: String,
        subjectId: String = "cvs",
        topic: String = "Heart failure",
        difficulty: String = "Moderate",
        correct: Boolean? = null,
        sessionId: String = "s1",
    ) = AttemptRecord(
        id = id, at = at, surface = "qbank", itemId = id, subjectId = subjectId, topic = topic,
        difficulty = difficulty, correct = correct, sessionId = sessionId,
    )

    // -- performanceUiState --------------------------------------------------

    @Test
    fun `records not yet loaded is Loading`() {
        assertEquals(UiState.Loading, performanceUiState(null))
    }

    @Test
    fun `a loaded but empty ledger is Empty`() {
        val result = performanceUiState(emptyList())
        assertTrue(result is UiState.Empty)
    }

    @Test
    fun `a non-empty ledger is Content`() {
        val result = performanceUiState(listOf(record("a", "2026-09-01T10:00:00Z")))
        assertTrue(result is UiState.Content)
    }

    // -- performanceSummary ---------------------------------------------------

    @Test
    fun `an unmarked attempt counts toward attempts but never accuracy`() {
        val summary = performanceSummary(listOf(record("a", "2026-09-01T10:00:00Z", correct = null)))
        assertEquals(1, summary.attempts)
        assertEquals(0, summary.marked)
        assertNull(summary.accuracy)
    }

    @Test
    fun `accuracy is correct over marked, unmarked attempts excluded from the denominator`() {
        val records = listOf(
            record("a", "2026-09-01T10:00:00Z", correct = true),
            record("b", "2026-09-01T10:05:00Z", correct = false),
            record("c", "2026-09-01T10:10:00Z", correct = null),
        )
        val summary = performanceSummary(records)
        assertEquals(3, summary.attempts)
        assertEquals(2, summary.marked)
        assertEquals(1, summary.correct)
        assertEquals(0.5, summary.accuracy!!, 0.0001)
    }

    @Test
    fun `accuracy is gated behind the minimum-marked floor`() {
        val fewRecords = (1..MIN_MARKED_FOR_ACCURACY - 1).map { record("$it", "2026-09-01T10:00:00Z", correct = true) }
        assertTrue(!performanceSummary(fewRecords).hasEnoughForAccuracy)

        val enoughRecords = (1..MIN_MARKED_FOR_ACCURACY).map { record("$it", "2026-09-01T10:00:00Z", correct = true) }
        assertTrue(performanceSummary(enoughRecords).hasEnoughForAccuracy)
    }

    @Test
    fun `bySubject is weakest first and drops subjects below the per-subject floor`() {
        val records = listOf(
            record("a1", "2026-09-01T10:00:00Z", subjectId = "cvs", topic = "Heart failure", correct = true),
            record("a2", "2026-09-01T10:01:00Z", subjectId = "cvs", topic = "Heart failure", correct = true),
            record("a3", "2026-09-01T10:02:00Z", subjectId = "cvs", topic = "Heart failure", correct = false),
            record("b1", "2026-09-01T10:03:00Z", subjectId = "resp", topic = "Asthma", correct = false),
            record("b2", "2026-09-01T10:04:00Z", subjectId = "resp", topic = "Asthma", correct = false),
            record("b3", "2026-09-01T10:05:00Z", subjectId = "resp", topic = "Asthma", correct = false),
            // Below MIN_MARKED_PER_SUBJECT (3) -- must not appear at all.
            record("c1", "2026-09-01T10:06:00Z", subjectId = "gi", topic = "Ulcer", correct = true),
        )
        val bySubject = performanceSummary(records).bySubject
        assertEquals(listOf("Asthma", "Heart failure"), bySubject.map { it.topic })
        assertEquals(0.0, bySubject.first().accuracy, 0.0001)
    }

    @Test
    fun `byDifficulty follows the authored order, not accuracy`() {
        val records = listOf(
            record("a", "2026-09-01T10:00:00Z", difficulty = "Hard", correct = true),
            record("b", "2026-09-01T10:01:00Z", difficulty = "Easy", correct = false),
            record("c", "2026-09-01T10:02:00Z", difficulty = "Moderate", correct = true),
        )
        val byDifficulty = performanceSummary(records).byDifficulty
        assertEquals(listOf("Easy", "Moderate", "Hard"), byDifficulty.map { it.difficulty })
    }

    @Test
    fun `dailyCounts spans exactly TREND_DAYS days including empty ones`() {
        val today = LocalDate.of(2026, 9, 4)
        val records = listOf(record("a", "${today}T10:00:00Z"))
        val summary = performanceSummary(records, today)
        assertEquals(TREND_DAYS, summary.dailyCounts.size)
        assertEquals(1, summary.dailyCounts.last().attempts)
        assertEquals(0, summary.dailyCounts.first().attempts)
    }

    @Test
    fun `distinctItems counts coverage, not volume`() {
        val records = listOf(
            record("a", "2026-09-01T10:00:00Z"),
            record("a", "2026-09-02T10:00:00Z", sessionId = "s2"),
            record("b", "2026-09-03T10:00:00Z"),
        )
        assertEquals(2, performanceSummary(records).distinctItems)
    }
}
