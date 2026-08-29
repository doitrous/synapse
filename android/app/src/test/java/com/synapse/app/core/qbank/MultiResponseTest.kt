package com.synapse.app.core.qbank

import org.junit.Assert.assertEquals
import org.junit.Assert.assertFalse
import org.junit.Assert.assertTrue
import org.junit.Test

/**
 * Task 2 (Plan 03 — Question Bank): multi-response question + grading.
 *
 * Ported from `src/data/multiResponseQuestion.ts`. A multi-response question
 * has two or more correct labels, so it is reported as three buckets — hit,
 * falsePositive, missed — rather than one pass/fail flag: choosing something
 * wrong and leaving something out are different mistakes.
 */
class MultiResponseTest {

    private val question = MultiResponseQuestion(
        id = "MR1",
        subjectId = "SYS_CVS",
        topic = "Coronary anatomy",
        stem = "Which vessels supply the inferior wall?",
        options = listOf(
            AnswerOption("A", "Right coronary artery", "Correct."),
            AnswerOption("B", "Left anterior descending", "Wrong."),
            AnswerOption("C", "Left circumflex", "Correct."),
            AnswerOption("D", "Posterior interventricular", "Wrong."),
        ),
        correctAnswers = listOf("A", "C"),
    )

    @Test fun everythingRightAndNothingWrong() {
        val result = markMultiResponse(question, listOf("A", "C"))

        assertEquals(listOf("A", "C"), result.hit.sorted())
        assertEquals(emptyList<String>(), result.falsePositive)
        assertEquals(emptyList<String>(), result.missed)
        assertTrue(result.allCorrect)
    }

    @Test fun partialSelectionMissesTheRest() {
        val result = markMultiResponse(question, listOf("A"))

        assertEquals(listOf("A"), result.hit)
        assertEquals(emptyList<String>(), result.falsePositive)
        assertEquals(listOf("C"), result.missed)
        assertFalse(result.allCorrect)
    }

    @Test fun overSelectionReportsAFalsePositive() {
        // Choosing something wrong and leaving something out are different
        // mistakes, and a single fraction hides which one was made.
        val result = markMultiResponse(question, listOf("A", "B"))

        assertEquals(listOf("A"), result.hit)
        assertEquals(listOf("B"), result.falsePositive)
        assertEquals(listOf("C"), result.missed)
        assertFalse(result.allCorrect)
    }

    @Test fun choosingEveryOptionIsNotAllCorrect() {
        // The obvious way to game an all-or-nothing marker.
        val result = markMultiResponse(question, listOf("A", "B", "C", "D"))

        assertEquals(listOf("A", "C"), result.hit.sorted())
        assertEquals(listOf("B", "D"), result.falsePositive.sorted())
        assertEquals(emptyList<String>(), result.missed)
        assertFalse(result.allCorrect)
    }

    @Test fun answeringNothingScoresNothing() {
        val result = markMultiResponse(question, emptyList())

        assertEquals(emptyList<String>(), result.hit)
        assertEquals(emptyList<String>(), result.falsePositive)
        assertEquals(listOf("A", "C"), result.missed.sorted())
        assertFalse(result.allCorrect)
    }

    @Test fun duplicateSelectionsCollapseGracefully() {
        val result = markMultiResponse(question, listOf("A", "A", "C", "C"))

        assertEquals(listOf("A", "C"), result.hit.sorted())
        assertEquals(emptyList<String>(), result.falsePositive)
        assertTrue(result.allCorrect)
    }

    @Test fun unknownLabelsAreIgnoredRatherThanCountedAsFalsePositives() {
        val result = markMultiResponse(question, listOf("A", "C", "Z"))

        assertEquals(listOf("A", "C"), result.hit.sorted())
        assertEquals(emptyList<String>(), result.falsePositive)
        assertTrue(result.allCorrect)
    }

    // --- Projection -----------------------------------------------------

    // A mcq_multi item, Published, with two correct answers -> projects.
    private val multiItem = """
        { "id":"MR1","kind":"question","title":"Which vessels supply the inferior wall?","subjectId":"SYS_CVS","status":"Published",
          "fields":{"Topic":"Coronary anatomy"},
          "questionData":{"format":"mcq_multi","answers":[
            {"label":"A","text":"Right coronary artery","explanation":"Correct."},
            {"label":"B","text":"Left anterior descending","explanation":"Wrong."},
            {"label":"C","text":"Left circumflex","explanation":"Correct."},
            {"label":"D","text":"","explanation":""}],
            "multiResponse":{"correctAnswers":["A","C"]},
            "learningObjective":"Know the RCA/LCx territory.",
            "tags":{"mainConceptIds":["C1"],"conceptIds":["C1"]}}}
    """.trimIndent()

    // A single-answer (non-multi) question -> not selected by the projection.
    private val singleItem = """
        { "id":"S1","kind":"question","title":"Single best answer","subjectId":"SYS_CVS","status":"Published",
          "fields":{"Topic":"Other"},
          "questionData":{"correctAnswer":"A","answers":[
            {"label":"A","text":"Some answer","explanation":"..."}]}}
    """.trimIndent()

    // status != Published -> dropped.
    private val draftMultiItem = """
        { "id":"MR2","kind":"question","title":"Draft multi","subjectId":"SYS_CVS","status":"Draft",
          "fields":{"Topic":"Other"},
          "questionData":{"format":"mcq_multi","answers":[
            {"label":"A","text":"Ans A","explanation":"..."},
            {"label":"B","text":"Ans B","explanation":"..."}],
            "multiResponse":{"correctAnswers":["A","B"]}}}
    """.trimIndent()

    @Test fun projectsTheMultiResponseItemWithItsCorrectAnswers() {
        val ledgerJson = "[$multiItem,$singleItem,$draftMultiItem]"

        val questions = MultiResponseProjection.project(ledgerJson)

        assertEquals(1, questions.size)
        val q = questions.single()
        assertEquals("MR1", q.id)
        assertEquals("SYS_CVS", q.subjectId)
        assertEquals("Coronary anatomy", q.topic)
        assertEquals("Which vessels supply the inferior wall?", q.stem)
        assertEquals(listOf("A", "C"), q.correctAnswers)
        assertEquals("Know the RCA/LCx territory.", q.learningObjective)
        assertEquals(listOf("C1"), q.conceptIds)

        // The empty-label/text answer ("D") must be dropped.
        assertEquals(3, q.options.size)
        assertEquals(AnswerOption("A", "Right coronary artery", "Correct."), q.options[0])
    }

    @Test fun acceptsLedgerWrappedInItemsObject() {
        val ledgerJson = """{ "items": [$multiItem] }"""

        val questions = MultiResponseProjection.project(ledgerJson)

        assertEquals(1, questions.size)
        assertEquals("MR1", questions.single().id)
    }
}
