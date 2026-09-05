package com.synapse.android.core.adaptive

import com.synapse.android.core.adaptive.AdaptiveTestData.daysAgo
import com.synapse.android.core.adaptive.AdaptiveTestData.event
import org.junit.Assert.assertEquals
import org.junit.Assert.assertNotNull
import org.junit.Assert.assertNull
import org.junit.Assert.assertTrue
import org.junit.Test

/**
 * The mastery model -- the heart of the port. Every assertion here pins one of
 * the product's stated safety rules onto a hand-written evidence history.
 */
class AdaptiveMasteryTest {

    private val config = AdaptiveConfig.DEFAULT
    private val now = AdaptiveTestData.NOW

    @Test
    fun `a concept with no evidence is unmeasured`() {
        val state = AdaptiveMastery.rebuild("c1", emptyList(), config, now)
        assertEquals(ConceptStatus.UNMEASURED, state.status)
        assertEquals(0, state.distinctItems)
        assertEquals(0.5, state.mean, 1e-9)
    }

    @Test
    fun `one wrong answer is attention, never weak`() {
        val events = listOf(event("c1", correct = false, at = daysAgo(1)))
        val state = AdaptiveMastery.rebuild("c1", events, config, now)
        assertEquals(ConceptStatus.ATTENTION, state.status)
        assertEquals(1, state.rawWrong)
    }

    @Test
    fun `two distinct wrong answers become weak`() {
        val events = listOf(
            event("c1", correct = false, at = daysAgo(3), questionId = "q1"),
            event("c1", correct = false, at = daysAgo(2), questionId = "q2"),
        )
        val state = AdaptiveMastery.rebuild("c1", events, config, now)
        assertEquals(2, state.distinctItems)
        assertTrue(state.mean < config.statuses.weakBelow)
        assertEquals(ConceptStatus.WEAK, state.status)
    }

    @Test
    fun `two high-confidence errors are weak even across few items`() {
        // Same question id twice would be one distinct item; use two so it is not
        // the distinctItems path but the high-confidence-errors path being tested.
        val events = listOf(
            event("c1", correct = false, at = daysAgo(3), questionId = "q1", confidence = Confidence.SURE),
            event("c1", correct = false, at = daysAgo(2), questionId = "q2", confidence = Confidence.SURE),
        )
        val state = AdaptiveMastery.rebuild("c1", events, config, now)
        assertEquals(2, state.highConfidenceErrors)
        assertEquals(ConceptStatus.WEAK, state.status)
    }

    @Test
    fun `four correct in one sitting is not secure without a spaced success`() {
        val events = (1..4).map {
            event("c1", correct = true, at = daysAgo(2), questionId = "q$it", attemptId = "a$it")
        }
        val state = AdaptiveMastery.rebuild("c1", events, config, now)
        assertTrue("mean should be high", state.mean >= config.statuses.secureAtOrAbove)
        assertEquals(0, state.spacedSuccesses)
        assertTrue("not secure without spacing", state.status != ConceptStatus.SECURE)
    }

    @Test
    fun `correct answers spaced 48h apart reach secure`() {
        val events = listOf(
            event("c1", correct = true, at = daysAgo(20), questionId = "q1"),
            event("c1", correct = true, at = daysAgo(18), questionId = "q2"),
            event("c1", correct = true, at = daysAgo(10), questionId = "q3"),
            event("c1", correct = true, at = daysAgo(4), questionId = "q4"),
        )
        val state = AdaptiveMastery.rebuild("c1", events, config, now)
        assertTrue(state.spacedSuccesses >= 1)
        assertTrue(
            "secure or its review-due variant",
            state.status == ConceptStatus.SECURE || state.status == ConceptStatus.REVIEW_DUE,
        )
    }

    @Test
    fun `wide spacing decays earlier evidence toward the prior`() {
        // Decay is applied between consecutive events, not relative to "now" (the
        // estimate freezes at the last event). So the mechanism to exercise is
        // spacing: an early correct answer 400 days before the next one is almost
        // entirely decayed away by the time the second folds in.
        val close = AdaptiveMastery.rebuild("c1", listOf(
            event("c1", correct = true, at = daysAgo(2), questionId = "q1"),
            event("c1", correct = true, at = daysAgo(1), questionId = "q2"),
        ), config, now)
        val spread = AdaptiveMastery.rebuild("c1", listOf(
            event("c1", correct = true, at = daysAgo(401), questionId = "q1"),
            event("c1", correct = true, at = daysAgo(1), questionId = "q2"),
        ), config, now)
        // Two closely-spaced correct answers count as more evidence than two the
        // decay has pulled apart, so the spread history is less confident.
        assertTrue("spread is less confident", spread.mean < close.mean)
        assertTrue("spread is more uncertain", spread.uncertainty > close.uncertainty)
    }

    @Test
    fun `raw wrong counts attempts, not per-concept events`() {
        // One attempt, two concepts -- one mistake, not two.
        val events = listOf(
            event("c1", correct = false, at = daysAgo(1), attemptId = "att1", questionId = "q1"),
            event("c2", correct = false, at = daysAgo(1), attemptId = "att1", questionId = "q1"),
        )
        assertEquals(1, events.rawWrongAttempts())
    }

    @Test
    fun `difficulty credit is clamped and ordered`() {
        val easy = AdaptiveMastery.difficultyCredit("Easy", config)
        val challenging = AdaptiveMastery.difficultyCredit("Challenging", config)
        val unknown = AdaptiveMastery.difficultyCredit("???", config)
        assertEquals(config.mastery.minDifficultyCredit, easy, 1e-9)
        assertEquals(config.mastery.maxDifficultyCredit, challenging, 1e-9)
        assertTrue(easy < challenging)
        // Unknown bands sit at neutral rather than guessing.
        assertEquals((easy + challenging) / 2, unknown, 1e-9)
    }

    @Test
    fun `a secure concept past its review date reads as review-due`() {
        // Spaced successes long ago so the 14-day secure interval has elapsed.
        val events = listOf(
            event("c1", correct = true, at = daysAgo(120), questionId = "q1"),
            event("c1", correct = true, at = daysAgo(118), questionId = "q2"),
            event("c1", correct = true, at = daysAgo(60), questionId = "q3"),
            event("c1", correct = true, at = daysAgo(30), questionId = "q4"),
        )
        val state = AdaptiveMastery.rebuild("c1", events, config, now)
        assertNotNull(state.nextReviewAt)
        assertEquals(ConceptStatus.REVIEW_DUE, state.status)
    }

    @Test
    fun `rebuildAll produces one state per concept with evidence`() {
        val events = listOf(
            event("c1", correct = true, at = daysAgo(1)),
            event("c2", correct = false, at = daysAgo(1)),
        )
        val states = AdaptiveMastery.rebuildAll(events, config, now)
        assertEquals(setOf("c1", "c2"), states.keys)
    }

    @Test
    fun `malformed timestamps do not crash the replay`() {
        val events = listOf(
            event("c1", correct = true, at = "not-a-date", questionId = "q1"),
            event("c1", correct = true, at = daysAgo(1), questionId = "q2"),
        )
        val state = AdaptiveMastery.rebuild("c1", events, config, now)
        assertNotNull(state)
        assertEquals(2, state.distinctItems)
    }

    @Test
    fun `review urgency is null when nothing is scheduled`() {
        val state = AdaptiveMastery.blank("c1", config)
        assertNull(AdaptiveMastery.reviewUrgencyDays(state, now))
    }
}
