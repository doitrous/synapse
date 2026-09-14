package com.synapse.app.core.qbank

import org.junit.Assert.assertEquals
import org.junit.Assert.assertNull
import org.junit.Assert.assertTrue
import org.junit.Test

/**
 * Ports [QBankCollections]' derivation cases 1:1 from `src/data/qbankCollections.test.ts`
 * (and `attemptStats.test.ts`'s `bySession` coverage), adapted where the Android
 * [AttemptRecord] shape forces it — see [QBankCollections]'s class doc for why
 * "was this actually answered" is [AttemptRecord.selectedIndex] here rather than
 * a null [AttemptRecord.correct].
 */
class QBankCollectionsTest {

    private fun record(
        itemId: String,
        correct: Boolean?,
        at: String,
        sessionId: String = "s1",
        selectedIndex: Int? = if (correct != null) 0 else null,
    ) = AttemptRecord(
        id = "$sessionId:qbank:$itemId",
        at = at,
        surface = "qbank",
        itemId = itemId,
        subjectId = "cvs",
        topic = "Heart failure",
        difficulty = "Moderate",
        correct = correct,
        sessionId = sessionId,
        selectedIndex = selectedIndex,
    )

    private fun question(id: String, topic: String) = Question(
        id = id, subjectId = "cvs", topic = topic, vignette = "", stem = id,
        options = listOf(AnswerOption("A", "A", ""), AnswerOption("B", "B", "")),
        correctLabel = "A", explanation = "",
    )

    private val topics = QBankScope.topicsFromQuestions(
        listOf(question("q1", "Heart failure"), question("q2", "Asthma")),
    )

    @Test fun theLatestVerdictWinsNotTheFirst() {
        val records = listOf(
            record("q1", false, "2026-08-01T09:00:00.000Z", "s1"),
            record("q1", true, "2026-08-05T09:00:00.000Z", "s2"),
        )
        assertEquals(true, QBankCollections.latestVerdicts(records)["q1"])
    }

    @Test fun anUnansweredRecordDoesNotClearAVerdict() {
        // Reached-and-skipped (no option picked) is evidence of practice, not of
        // correctness -- it must not take a question out of the wrong list.
        val records = listOf(
            record("q1", false, "2026-08-01T09:00:00.000Z", "s1"),
            record("q1", null, "2026-08-05T09:00:00.000Z", "s2"),
        )
        assertEquals(false, QBankCollections.latestVerdicts(records)["q1"])
    }

    @Test fun gettingAQuestionRightTakesItOutOfTheWrongList() {
        val wrong = listOf(record("q1", false, "2026-08-01T09:00:00.000Z", "s1"))
        assertEquals(setOf("q1"), QBankCollections.incorrectIds(wrong))

        val fixed = wrong + record("q1", true, "2026-08-05T09:00:00.000Z", "s2")
        assertEquals(emptySet<String>(), QBankCollections.incorrectIds(fixed))
    }

    @Test fun aQuestionASittingServedButNeverAnsweredIsOmitted() {
        val manifests = mapOf("s1" to listOf("q1", "q2"))
        val records = listOf(record("q1", true, "2026-08-01T09:00:00.000Z", "s1"))
        assertEquals(setOf("q2"), QBankCollections.omittedIds(manifests, records))
    }

    @Test fun answeringAQuestionInAnySittingTakesItOutOfTheOmittedList() {
        val manifests = mapOf("s1" to listOf("q1", "q2"))
        val records = listOf(
            record("q1", true, "2026-08-01T09:00:00.000Z", "s1"),
            record("q2", false, "2026-08-06T09:00:00.000Z", "s2"),
        )
        assertTrue(QBankCollections.omittedIds(manifests, records).isEmpty())
    }

    @Test fun aQuestionReachedButNeverPickedIsOmittedEvenWithAFinishedRecord() {
        // Android writes a record for every question in a finished sitting,
        // correct=false, selectedIndex=null when nothing was picked -- that must
        // still count as omitted, not as wrong.
        val manifests = mapOf("s1" to listOf("q1"))
        val records = listOf(record("q1", false, "2026-08-01T09:00:00.000Z", "s1", selectedIndex = null))
        assertEquals(setOf("q1"), QBankCollections.omittedIds(manifests, records))
        assertTrue(QBankCollections.incorrectIds(records).isEmpty())
    }

    @Test fun finishedManifestsExcludesTheOpenSitting() {
        val manifests = mapOf("s1" to listOf("q1"), "s2" to listOf("q2"))
        assertEquals(mapOf("s2" to listOf("q2")), QBankCollections.finishedManifests(manifests, "s1"))
        assertEquals(manifests, QBankCollections.finishedManifests(manifests, null))
    }

    @Test fun questionsByIdKeepsThePoolOrderAndDropsUnpublishedIds() {
        val pool = listOf(question("q1", "Heart failure"), question("q2", "Asthma"))
        val result = QBankCollections.questionsById(pool, setOf("q2", "q1", "gone"))
        assertEquals(listOf("q1", "q2"), result.map { it.id })
    }

    @Test fun aScopeCoversTheTopicsThoseQuestionsCameFrom() {
        val scope = QBankCollections.scopeFromQuestions(listOf(question("q1", "Heart failure")), topics)
        val heartFailureTopicId = topics.single { it.topic == "Heart failure" }.id
        assertEquals(setOf(QBankScope.topicKey(heartFailureTopicId)), scope)
    }

    @Test fun aQuestionNamingATopicNotInTheGivenTreeContributesNoKey() {
        val scope = QBankCollections.scopeFromQuestions(listOf(question("q1", "Cardiac cycle")), topics)
        assertTrue(scope.isEmpty())
    }

    @Test fun pruningKeepsTheMostRecentSittingsAndDropsTheOldest() {
        val manifests = linkedMapOf("s1" to listOf("q1"), "s2" to listOf("q2"), "s3" to listOf("q3"))
        assertEquals(mapOf("s2" to listOf("q2"), "s3" to listOf("q3")), QBankCollections.pruneManifests(manifests, 2))
    }

    @Test fun pruningLeavesAMapUnderTheLimitUntouched() {
        val manifests = mapOf("s1" to listOf("q1"))
        assertEquals(manifests, QBankCollections.pruneManifests(manifests, 2))
    }

    // --- bySession -----------------------------------------------------------

    @Test fun bySessionGroupsByIdNewestFirstAndComputesAccuracy() {
        val records = listOf(
            record("q1", true, "2026-08-01T09:00:00.000Z", "s1"),
            record("q2", false, "2026-08-01T09:01:00.000Z", "s1"),
            record("q3", true, "2026-08-05T09:00:00.000Z", "s2"),
        )
        val summaries = QBankCollections.bySession(records)
        assertEquals(listOf("s2", "s1"), summaries.map { it.sessionId })
        val s1 = summaries.single { it.sessionId == "s1" }
        assertEquals(2, s1.answered)
        assertEquals(2, s1.marked)
        assertEquals(1, s1.correct)
        assertEquals(0.5, s1.accuracy)
        assertEquals(listOf("cvs"), s1.subjectIds)
    }

    @Test fun bySessionReportsNullAccuracyWhenNothingWasMarked() {
        val records = listOf(record("q1", false, "2026-08-01T09:00:00.000Z", "s1", selectedIndex = null))
        val summary = QBankCollections.bySession(records).single()
        assertEquals(0, summary.marked)
        assertNull(summary.accuracy)
    }

    // --- result builders -------------------------------------------------------

    @Test fun latestResultForUsesTheFreshestPickAndMarksNeverPickedAsIncorrect() {
        val q1 = question("q1", "Heart failure")
        val q2 = question("q2", "Heart failure")
        val records = listOf(
            record("q1", false, "2026-08-01T09:00:00.000Z", "s1", selectedIndex = 1), // B, wrong
            record("q1", true, "2026-08-05T09:00:00.000Z", "s2", selectedIndex = 0), // A, right -- freshest
        )
        val result = QBankCollections.latestResultFor(listOf(q1, q2), records)
        assertEquals(1, result.correct)
        assertEquals(2, result.total)
        assertEquals("A", result.perQuestion.single { it.questionId == "q1" }.pickedLabel)
        assertNull(result.perQuestion.single { it.questionId == "q2" }.pickedLabel)
        assertEquals(false, result.perQuestion.single { it.questionId == "q2" }.correct)
    }

    @Test fun sessionResultOnlyLooksAtThatSessionsOwnRecords() {
        val q1 = question("q1", "Heart failure")
        val records = listOf(
            record("q1", true, "2026-08-01T09:00:00.000Z", "s1", selectedIndex = 0), // A, right, in s1
            record("q1", false, "2026-08-05T09:00:00.000Z", "s2", selectedIndex = 1), // B, wrong, in s2 -- later but different session
        )
        val result = QBankCollections.sessionResult("s1", listOf(q1), records)
        assertEquals(1, result.correct)
        assertEquals("A", result.perQuestion.single().pickedLabel)
    }
}
