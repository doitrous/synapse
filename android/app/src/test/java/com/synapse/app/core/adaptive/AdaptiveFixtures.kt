package com.synapse.app.core.adaptive

import java.time.Instant

/**
 * Fixture builders for the adaptive engine tests.
 *
 * Port of `src/data/adaptive/fixtures.ts`, trimmed to what this task's ported
 * tests need (no `question`/`AdaptiveItem.question` field — see the ponytail
 * note in `AdaptiveItem.kt`). Kept out of the test files for the same reason
 * as the original: a test that spells out twenty irrelevant properties hides
 * its own subject.
 */

const val AT = "2026-08-12T10:00:00.000Z"

/** Days after [AT], as an ISO timestamp. */
fun daysAfter(days: Double, from: String = AT): String =
    Instant.parse(from).plusMillis((days * 86_400_000).toLong()).toString()

fun hoursAfter(hours: Double, from: String = AT): String =
    Instant.parse(from).plusMillis((hours * 3_600_000).toLong()).toString()

fun testItem(
    id: String,
    topic: String = "Heart failure",
    mainConceptIds: List<String> = listOf("CON-A"),
    secondaryConceptIds: List<String> = emptyList(),
    moduleIds: List<String> = emptyList(),
    universityIds: List<String> = emptyList(),
    years: List<String> = emptyList(),
    onlyFor: List<String> = emptyList(),
): AdaptiveItem = AdaptiveItem(
    id = id,
    version = "v1",
    subjectId = "cvs",
    topic = topic,
    difficulty = "Moderate",
    mainConceptIds = mainConceptIds,
    secondaryConceptIds = secondaryConceptIds,
    conceptIds = mainConceptIds + secondaryConceptIds,
    moduleIds = moduleIds,
    universityIds = universityIds,
    years = years,
    onlyFor = onlyFor,
)

/** A pool of [count] items, spread across [topics], one concept each. */
fun testPool(count: Int, topics: List<String> = listOf("Heart failure", "Arrhythmia", "Valves", "Ischaemia")): List<AdaptiveItem> =
    (0 until count).map { index ->
        testItem(
            id = "q-$index",
            topic = topics[index % topics.size],
            mainConceptIds = listOf("CON-${index % maxOf(1, count / 2)}"),
        )
    }

fun evidence(
    conceptId: String,
    questionId: String = "q-0",
    attemptId: String = "attempt-$questionId",
    at: String = AT,
    role: ConceptRole = ConceptRole.MAIN,
    correct: Boolean? = true,
    outcome: AttemptOutcome = AttemptOutcome.ANSWERED,
    confidence: Confidence = Confidence.UNSTATED,
    seconds: Double? = 60.0,
    expectedSeconds: Double? = 60.0,
    mode: PresentationMode = PresentationMode.TUTOR,
    exposure: ExposureState = ExposureState.FIRST,
    difficulty: String = "Moderate",
    configVersion: Int = 1,
): AdaptiveEvidenceEvent = AdaptiveEvidenceEvent(
    id = "$attemptId:$conceptId",
    at = at,
    attemptId = attemptId,
    blockId = "block-1",
    questionId = questionId,
    questionVersion = "v1",
    conceptId = conceptId,
    role = role,
    correct = correct,
    outcome = outcome,
    confidence = confidence,
    seconds = seconds,
    expectedSeconds = expectedSeconds,
    mode = mode,
    exposure = exposure,
    difficulty = difficulty,
    configVersion = configVersion,
)

/** [count] wrong answers on one concept, each on a different question. */
fun wrongRun(conceptId: String, count: Int, from: String = AT): List<AdaptiveEvidenceEvent> =
    (0 until count).map { index ->
        evidence(
            conceptId = conceptId,
            questionId = "q-wrong-$index",
            attemptId = "attempt-wrong-$index",
            correct = false,
            at = hoursAfter(index.toDouble(), from),
        )
    }
