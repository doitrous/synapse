package com.synapse.app.feature.adaptive

import com.synapse.app.core.adaptive.ConceptState
import com.synapse.app.core.adaptive.ConceptStatus
import org.junit.Assert.assertEquals
import org.junit.Test
import java.time.Instant

/**
 * [repairTargets] and [dueForReview] are the Practice tab's two lists (see
 * `AdaptiveViewModel.kt`'s doc comments) — pure functions over
 * [ConceptState], so tested directly rather than through the whole
 * repository/ViewModel pipeline `AdaptiveViewModelTest` exercises.
 */
class PracticeOrderingTest {

    private val now = Instant.parse("2026-08-29T12:00:00Z")

    private fun state(conceptId: String, status: ConceptStatus, mean: Double = 0.5, nextReviewAt: String? = null): ConceptState = ConceptState(
        conceptId = conceptId,
        alpha = 1.0,
        beta = 1.0,
        mean = mean,
        uncertainty = 0.2,
        distinctItems = 3,
        attempts = 3,
        rawWrong = 1,
        highConfidenceErrors = 0,
        spacedSuccesses = 0,
        responseTimeRatio = null,
        lastSeen = null,
        nextReviewAt = nextReviewAt,
        status = status,
        modelVersion = 1,
    )

    private fun daysAgo(days: Long): String = now.minusSeconds(days * 86_400).toString()

    @Test
    fun `repairTargets includes weak and attention, sorted weakest mean first, ties by concept id`() {
        val states = mapOf(
            "CON-B" to state("CON-B", ConceptStatus.WEAK, mean = 0.3),
            "CON-A" to state("CON-A", ConceptStatus.ATTENTION, mean = 0.3),
            "CON-C" to state("CON-C", ConceptStatus.WEAK, mean = 0.1),
            "CON-D" to state("CON-D", ConceptStatus.SECURE, mean = 0.9),
            "CON-E" to state("CON-E", ConceptStatus.UNMEASURED, mean = 0.5),
        )

        assertEquals(listOf("CON-C", "CON-A", "CON-B"), repairTargets(states).map { it.conceptId })
    }

    @Test
    fun `dueForReview is only review-due, sorted most overdue first, ties by concept id`() {
        val states = mapOf(
            "CON-A" to state("CON-A", ConceptStatus.REVIEW_DUE, nextReviewAt = daysAgo(1)),
            "CON-B" to state("CON-B", ConceptStatus.REVIEW_DUE, nextReviewAt = daysAgo(5)),
            "CON-C" to state("CON-C", ConceptStatus.REVIEW_DUE, nextReviewAt = daysAgo(5)),
            "CON-D" to state("CON-D", ConceptStatus.SECURE, nextReviewAt = daysAgo(10)),
        )

        assertEquals(listOf("CON-B", "CON-C", "CON-A"), dueForReview(states, now).map { it.conceptId })
    }
}
