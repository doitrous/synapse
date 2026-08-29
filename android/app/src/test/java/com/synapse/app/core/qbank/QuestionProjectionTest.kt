package com.synapse.app.core.qbank

import org.junit.Assert.assertEquals
import org.junit.Assert.assertFalse
import org.junit.Assert.assertTrue
import org.junit.Test

/**
 * Task 1 (Plan 03 — Question Bank): pure-logic ledger projection.
 *
 * The ledger doc's `value` is a JSON array of `ManagedContentItem`s (or an
 * object wrapping one as `{ "items": [...] }`). Only `kind == "question"`
 * items are projected, and only when they are markable and Published.
 */
class QuestionProjectionTest {

    // One Published MCQ item, straight from the task-1 brief fixture.
    private val publishedItem = """
        { "id":"Q1","kind":"question","title":"Which mechanism explains this?","subjectId":"SYS_CVS","status":"Published",
          "fields":{"Topic":"Heart failure","Difficulty":"Moderate","Vignette":"A patient with HFrEF...","Explanation":"Chronic sympathetic activation is toxic."},
          "questionData":{"correctAnswer":"B","answers":[
            {"label":"A","text":"Increases cardiac output","explanation":"Wrong."},
            {"label":"B","text":"Opposes chronic sympathetic activation","explanation":"Correct."},
            {"label":"C","text":"","explanation":""}],
            "learningObjective":"...","estimatedSeconds":90,"libraryIds":["hf-patho"],
            "tags":{"universityIds":["OMS"],"years":["OMS_Y2"],"mainConceptIds":["C1"],"conceptIds":["C1"]}}}
    """.trimIndent()

    // status != Published -> dropped.
    private val draftItem = """
        { "id":"Q2","kind":"question","title":"Draft question","subjectId":"SYS_CVS","status":"Draft",
          "fields":{"Topic":"Heart failure","Difficulty":"Moderate","Vignette":"...","Explanation":"..."},
          "questionData":{"correctAnswer":"A","answers":[
            {"label":"A","text":"Some answer","explanation":"..."}]}}
    """.trimIndent()

    // correctAnswer matches no remaining option label -> dropped (unmarkable).
    private val unmarkableItem = """
        { "id":"Q3","kind":"question","title":"Unmarkable question","subjectId":"SYS_CVS","status":"Published",
          "fields":{"Topic":"Heart failure","Difficulty":"Moderate","Vignette":"...","Explanation":"..."},
          "questionData":{"correctAnswer":"Z","answers":[
            {"label":"A","text":"Some answer","explanation":"..."},
            {"label":"B","text":"Another answer","explanation":"..."}]}}
    """.trimIndent()

    // title is empty -> dropped.
    private val emptyTitleItem = """
        { "id":"Q4","kind":"question","title":"","subjectId":"SYS_CVS","status":"Published",
          "fields":{"Topic":"Heart failure","Difficulty":"Moderate","Vignette":"...","Explanation":"..."},
          "questionData":{"correctAnswer":"A","answers":[
            {"label":"A","text":"Some answer","explanation":"..."}]}}
    """.trimIndent()

    // all options empty after drop -> dropped (empty options list).
    private val allOptionsEmptyItem = """
        { "id":"Q5","kind":"question","title":"No usable options","subjectId":"SYS_CVS","status":"Published",
          "fields":{"Topic":"Heart failure","Difficulty":"Moderate","Vignette":"...","Explanation":"..."},
          "questionData":{"correctAnswer":"A","answers":[
            {"label":"","text":"Some answer","explanation":"..."},
            {"label":"A","text":"","explanation":"..."}]}}
    """.trimIndent()

    // kind != "question" -> ignored entirely, even though otherwise well-formed.
    private val nonQuestionItem = """
        { "id":"Q6","kind":"flashcard","title":"Not a question","subjectId":"SYS_CVS","status":"Published",
          "fields":{},"questionData":null}
    """.trimIndent()

    @Test fun projectsOnlyThePublishedMarkableQuestion() {
        val ledgerJson = "[$publishedItem,$draftItem,$unmarkableItem,$emptyTitleItem,$allOptionsEmptyItem,$nonQuestionItem]"

        val questions = QuestionProjection.project(ledgerJson)

        assertEquals(1, questions.size)
        val q = questions.single()
        assertEquals("Q1", q.id)
        assertEquals("SYS_CVS", q.subjectId)
        assertEquals("Which mechanism explains this?", q.stem)
        assertEquals("Heart failure", q.topic)
        assertEquals("Moderate", q.difficulty)
        assertEquals("A patient with HFrEF...", q.vignette)
        assertEquals("Chronic sympathetic activation is toxic.", q.explanation)
        assertEquals("B", q.correctLabel)
        assertEquals("...", q.learningObjective)
        assertEquals(90, q.estimatedSeconds)
        assertEquals(listOf("hf-patho"), q.libraryIds)
        assertEquals(listOf("C1"), q.conceptIds)
        assertEquals(listOf("OMS"), q.universityIds)
        assertEquals(listOf("OMS_Y2"), q.years)

        // The empty-label/text answer ("C") must be dropped.
        assertEquals(2, q.options.size)
        assertEquals(AnswerOption("A", "Increases cardiac output", "Wrong."), q.options[0])
        assertEquals(AnswerOption("B", "Opposes chronic sympathetic activation", "Correct."), q.options[1])

        assertTrue(q.isCorrect("B"))
        assertFalse(q.isCorrect("A"))
    }

    @Test fun conceptIdsFallBackToConceptIdsWhenMainConceptIdsAbsent() {
        val item = """
            { "id":"Q7","kind":"question","title":"Fallback concept ids","subjectId":"SYS_CVS","status":"Published",
              "fields":{"Topic":"T","Difficulty":"Moderate","Vignette":"V","Explanation":"E"},
              "questionData":{"correctAnswer":"A","answers":[
                {"label":"A","text":"Ans","explanation":"..."}],
                "tags":{"universityIds":[],"years":[],"conceptIds":["C9"]}}}
        """.trimIndent()

        val questions = QuestionProjection.project("[$item]")

        assertEquals(1, questions.size)
        assertEquals(listOf("C9"), questions.single().conceptIds)
    }

    @Test fun acceptsLedgerWrappedInItemsObject() {
        val ledgerJson = """{ "items": [$publishedItem] }"""

        val questions = QuestionProjection.project(ledgerJson)

        assertEquals(1, questions.size)
        assertEquals("Q1", questions.single().id)
    }

    @Test fun scopeMatchUniversityUsesPrefixBeforeUnderscore() {
        assertTrue(ScopeMatch.universityMatches(listOf("OMS"), "OMS_ClassA"))
        assertFalse(ScopeMatch.universityMatches(listOf("OMS"), "MGH_ClassB"))
        // Empty scope = unrestricted, matches anyone (including null).
        assertTrue(ScopeMatch.universityMatches(emptyList(), "OMS_ClassA"))
        assertTrue(ScopeMatch.universityMatches(emptyList(), null))
    }

    @Test fun scopeMatchYearUsesDigitsOnly() {
        assertTrue(ScopeMatch.yearMatches(listOf("OMS_Y2"), "2"))
        assertFalse(ScopeMatch.yearMatches(listOf("OMS_Y2"), "3"))
        // Empty scope = unrestricted, matches anyone (including null).
        assertTrue(ScopeMatch.yearMatches(emptyList(), "2"))
        assertTrue(ScopeMatch.yearMatches(emptyList(), null))
    }

    @Test fun inScopeCombinesUniversityAndYearScope() {
        val questions = QuestionProjection.project("[$publishedItem]")
        val q = questions.single()

        assertTrue(QuestionProjection.inScope(q, "OMS_ClassA", "2"))
        assertFalse(QuestionProjection.inScope(q, "MGH_ClassB", "2"))
        assertFalse(QuestionProjection.inScope(q, "OMS_ClassA", "3"))
    }
}
