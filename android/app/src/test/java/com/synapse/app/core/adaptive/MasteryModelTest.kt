package com.synapse.app.core.adaptive

import org.junit.Assert.assertEquals
import org.junit.Assert.assertFalse
import org.junit.Assert.assertNotEquals
import org.junit.Assert.assertNull
import org.junit.Assert.assertTrue
import org.junit.Test
import java.time.Instant

/**
 * 1:1 port of `src/data/adaptive/masteryModel.test.ts` — every test vector,
 * same inputs, same expected numbers. This is the correctness gate for
 * [rebuildConcept] and friends.
 */
class MasteryModelTest {
    private val config = DEFAULT_ADAPTIVE_CONFIG

    @Test
    fun `three wrong answers on one concept are three attempts and one weak concept`() {
        // The rule the whole product hangs on. Three questions, all mainly
        // assessing CON-A, must not become three weaknesses.
        val events = wrongRun("CON-A", 3)
        val state = rebuildConcept("CON-A", events, config, Instant.parse(daysAfter(1.0)))

        assertEquals(3, rawWrongAttempts(events))
        assertEquals(3, state.rawWrong)
        assertEquals(3, state.distinctItems)
        assertEquals(ConceptStatus.WEAK, state.status)

        val weakConcepts = listOf(state).filter { it.status == ConceptStatus.WEAK }.map { it.conceptId }.toSet()
        assertEquals(1, weakConcepts.size)
    }

    @Test
    fun `one ordinary error reaches attention, never weak`() {
        val state = rebuildConcept("CON-A", wrongRun("CON-A", 1), config, Instant.parse(daysAfter(1.0)))
        assertEquals(ConceptStatus.ATTENTION, state.status)
    }

    @Test
    fun `two high-confidence errors are enough for weak on their own`() {
        val events = wrongRun("CON-A", 2).map { it.copy(confidence = Confidence.SURE) }
        val state = rebuildConcept("CON-A", events, config, Instant.parse(daysAfter(1.0)))
        assertEquals(2, state.highConfidenceErrors)
        assertEquals(ConceptStatus.WEAK, state.status)
    }

    @Test
    fun `one lucky correct answer is unmeasured, not secure`() {
        val state = rebuildConcept("CON-A", listOf(evidence(conceptId = "CON-A")), config)
        assertEquals(1, state.distinctItems)
        assertEquals(ConceptStatus.UNMEASURED, state.status)
    }

    @Test
    fun `secure needs the threshold, four distinct items and a spaced success`() {
        val sameSitting = (0 until 4).map { index ->
            evidence(conceptId = "CON-A", questionId = "q-$index", attemptId = "a-$index", at = hoursAfter(index.toDouble()))
        }
        val crammed = rebuildConcept("CON-A", sameSitting, config, Instant.parse(daysAfter(1.0)))
        assertNotEquals(ConceptStatus.SECURE, crammed.status)

        val spaced = sameSitting + evidence(conceptId = "CON-A", questionId = "q-later", attemptId = "a-later", at = hoursAfter(72.0))
        val state = rebuildConcept("CON-A", spaced, config, Instant.parse(hoursAfter(73.0)))
        assertEquals(1, state.spacedSuccesses)
        assertEquals(ConceptStatus.SECURE, state.status)
    }

    @Test
    fun `difficulty credit is clamped to the configured band`() {
        for (difficulty in listOf("Easy", "Moderate", "Hard", "Challenging")) {
            val credit = difficultyCredit(difficulty, config)
            assertTrue("$difficulty above floor", credit >= config.mastery.minDifficultyCredit)
            assertTrue("$difficulty below ceiling", credit <= config.mastery.maxDifficultyCredit)
        }
        assertTrue(difficultyCredit("Challenging", config) > difficultyCredit("Easy", config))
        // An unrecognised band sits at neutral rather than guessing in either direction.
        val neutral = (config.mastery.minDifficultyCredit + config.mastery.maxDifficultyCredit) / 2
        assertEquals(neutral, difficultyCredit("Unknown band", config), 1e-9)
    }

    @Test
    fun `a repeat after the answer was revealed contributes at most a quarter of normal weight`() {
        val fresh = evidenceWeight(evidence(conceptId = "CON-A"), config)
        val exposed = evidenceWeight(evidence(conceptId = "CON-A", exposure = ExposureState.REPEAT_AFTER_REVEAL), config)
        assertTrue(exposed <= fresh * 0.25 + 1e-9)
    }

    @Test
    fun `a blank is not a wrong answer`() {
        val blank = evidence(conceptId = "CON-A", outcome = AttemptOutcome.BLANK, correct = null)
        val wrong = evidence(conceptId = "CON-A", correct = false)
        assertTrue(evidenceWeight(blank, config) < evidenceWeight(wrong, config))

        val state = rebuildConcept("CON-A", listOf(blank), config)
        assertEquals(0, state.rawWrong)
        assertEquals(0, state.attempts)
    }

    @Test
    fun `an abnormally fast correct answer is downweighted as a possible guess`() {
        val fast = evidence(conceptId = "CON-A", seconds = 5.0, expectedSeconds = 60.0)
        val normal = evidence(conceptId = "CON-A", seconds = 55.0, expectedSeconds = 60.0)
        assertTrue(isAbnormallyFast(fast, config))
        assertFalse(isAbnormallyFast(normal, config))
        assertTrue(evidenceWeight(fast, config) < evidenceWeight(normal, config))
    }

    @Test
    fun `an abnormally fast wrong answer keeps the raw error but moves the estimate less`() {
        val fast = evidence(conceptId = "CON-A", correct = false, seconds = 5.0, expectedSeconds = 60.0)
        val state = rebuildConcept("CON-A", listOf(fast), config)
        assertEquals(1, state.rawWrong)
        val careful = evidence(conceptId = "CON-A", correct = false, seconds = 55.0, expectedSeconds = 60.0)
        assertTrue(evidenceWeight(fast, config) < evidenceWeight(careful, config))
    }

    @Test
    fun `a wrong answer the student was sure of carries the most weight`() {
        val sure = evidenceWeight(evidence(conceptId = "CON-A", correct = false, confidence = Confidence.SURE), config)
        val unsure = evidenceWeight(evidence(conceptId = "CON-A", correct = false, confidence = Confidence.UNSURE), config)
        assertTrue(sure > unsure)
    }

    @Test
    fun `a secondary concept moves less than the concept the item is for`() {
        val main = evidenceWeight(evidence(conceptId = "CON-A", role = ConceptRole.MAIN), config)
        val secondary = evidenceWeight(evidence(conceptId = "CON-A", role = ConceptRole.SECONDARY), config)
        assertTrue(secondary < main)
    }

    @Test
    fun `evidence decays toward the prior as time passes`() {
        val strong = (0 until 6).map { index ->
            evidence(conceptId = "CON-A", questionId = "q-$index", attemptId = "a-$index", at = hoursAfter(index * 24.0))
        }
        val fresh = rebuildConcept("CON-A", strong, config, Instant.parse(daysAfter(6.0)))

        val stale = strong + evidence(conceptId = "CON-A", questionId = "q-late", attemptId = "a-late", at = daysAfter(400.0))
        val aged = rebuildConcept("CON-A", stale, config, Instant.parse(daysAfter(401.0)))
        assertTrue(aged.uncertainty > fresh.uncertainty)
    }

    @Test
    fun `uncertainty narrows as distinct evidence accumulates`() {
        val one = rebuildConcept("CON-A", listOf(evidence(conceptId = "CON-A")), config)
        val many = rebuildConcept(
            "CON-A",
            (0 until 8).map { index -> evidence(conceptId = "CON-A", questionId = "q-$index", attemptId = "a-$index", at = hoursAfter(index.toDouble())) },
            config,
        )
        assertTrue(many.uncertainty < one.uncertainty)
        assertTrue(betaHalfWidth(1.0, 1.0) > betaHalfWidth(50.0, 50.0))
    }

    @Test
    fun `rebuilding is pure and order-independent`() {
        val events = wrongRun("CON-A", 3)
        val forwards = rebuildConcept("CON-A", events, config, Instant.parse(daysAfter(1.0)))
        val backwards = rebuildConcept("CON-A", events.reversed(), config, Instant.parse(daysAfter(1.0)))
        assertEquals(forwards, backwards)
    }

    @Test
    fun `evidence for other concepts is ignored`() {
        val mixed = listOf(evidence(conceptId = "CON-A"), evidence(conceptId = "CON-B", correct = false))
        val state = rebuildConcept("CON-A", mixed, config)
        assertEquals(0, state.rawWrong)
    }

    @Test
    fun `a previously secure concept becomes review-due once its date passes`() {
        val events = (0 until 4).map { index ->
            evidence(conceptId = "CON-A", questionId = "q-$index", attemptId = "a-$index", at = hoursAfter(index.toDouble()))
        } + evidence(conceptId = "CON-A", questionId = "q-later", attemptId = "a-later", at = hoursAfter(72.0))

        val secure = rebuildConcept("CON-A", events, config, Instant.parse(hoursAfter(73.0)))
        assertEquals(ConceptStatus.SECURE, secure.status)

        val later = rebuildConcept("CON-A", events, config, Instant.parse(daysAfter(60.0)))
        assertEquals(ConceptStatus.REVIEW_DUE, later.status)
        assertTrue((reviewUrgencyDays(later, Instant.parse(daysAfter(60.0))) ?: 0.0) > 0)
    }

    @Test
    fun `status thresholds are read from config, not hardcoded`() {
        val strict = config.copy(statuses = config.statuses.copy(secureDistinctItems = 3))
        // Exactly three distinct items, one of them spaced: enough under the
        // pilot threshold, not enough under the safer operational default.
        val events = (0 until 2).map { index ->
            evidence(conceptId = "CON-A", questionId = "q-$index", attemptId = "a-$index", at = hoursAfter(index.toDouble()))
        } + evidence(conceptId = "CON-A", questionId = "q-later", attemptId = "a-later", at = hoursAfter(72.0))

        assertEquals(ConceptStatus.SECURE, rebuildConcept("CON-A", events, strict, Instant.parse(hoursAfter(73.0))).status)
        assertNotEquals(ConceptStatus.SECURE, rebuildConcept("CON-A", events, config, Instant.parse(hoursAfter(73.0))).status)
    }

    @Test
    fun `a concept with no evidence reports unmeasured with the widest interval`() {
        val state = rebuildConcept("CON-NEW", emptyList(), config)
        assertEquals(ConceptStatus.UNMEASURED, state.status)
        assertEquals(0, state.distinctItems)
        assertNull(state.lastSeen)
        assertTrue(state.uncertainty > 0.4)
    }

    @Test
    fun `conceptStatus never claims weak below the distinct-item floor`() {
        val status = conceptStatus(
            ConceptState(
                conceptId = "CON-A", alpha = 1.0, beta = 9.0, mean = 0.1, uncertainty = 0.3,
                distinctItems = 1, attempts = 1, rawWrong = 1, highConfidenceErrors = 0, spacedSuccesses = 0,
                responseTimeRatio = null, lastSeen = AT, nextReviewAt = null, status = ConceptStatus.UNMEASURED, modelVersion = 1,
            ),
            config,
        )
        assertEquals(ConceptStatus.ATTENTION, status)
    }
}
