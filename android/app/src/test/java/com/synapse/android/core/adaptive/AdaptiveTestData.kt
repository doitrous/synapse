package com.synapse.android.core.adaptive

import java.time.Instant

/**
 * Synthetic evidence and blueprint builders shared by the adaptive tests.
 *
 * Kept tiny and explicit -- the whole point of the mastery replay being pure is
 * that a test can hand it a hand-written history and assert on the result.
 */
object AdaptiveTestData {

    val NOW: Instant = Instant.parse("2026-09-01T12:00:00Z")

    /** Days before [NOW], as an ISO instant string -- the shape the ledger stores. */
    fun daysAgo(days: Long): String = NOW.minusSeconds(days * 86_400).toString()

    fun event(
        conceptId: String,
        correct: Boolean?,
        at: String = daysAgo(0),
        questionId: String = "q-${at.hashCode()}-$correct",
        attemptId: String = questionId,
        role: ConceptRole = ConceptRole.MAIN,
        confidence: Confidence = Confidence.UNSTATED,
        difficulty: String = "Moderate",
        outcome: AttemptOutcome = AttemptOutcome.ANSWERED,
        seconds: Double? = null,
        expectedSeconds: Double? = null,
        exposure: ExposureState = ExposureState.FIRST,
    ): AdaptiveEvidenceEvent = AdaptiveEvidenceEvent(
        id = "$attemptId:$conceptId",
        at = at,
        attemptId = attemptId,
        blockId = "b1",
        questionId = questionId,
        questionVersion = "v1",
        conceptId = conceptId,
        role = role,
        correct = correct,
        outcome = outcome,
        confidence = confidence,
        seconds = seconds,
        expectedSeconds = expectedSeconds,
        mode = PresentationMode.TUTOR,
        exposure = exposure,
        difficulty = difficulty,
        configVersion = 1,
    )

    fun node(conceptId: String, weight: Double, groupId: String = "g1", groupLabel: String = "Group 1") =
        BlueprintNode(conceptId, conceptId.uppercase(), groupId, groupLabel, weight)
}
