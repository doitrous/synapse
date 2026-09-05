package com.nishany.android.core.model

import org.junit.Assert.assertEquals
import org.junit.Assert.assertNull
import org.junit.Test

class QuestionProjectionTest {

    private fun item(raw: String) = LedgerDecoder.decode("[$raw]").items.single()

    private val good = """
        {"id":"q1","kind":"question","status":"Published","subjectId":"med",
         "title":"Which drug lowers mortality in HFrEF?",
         "fields":{"Topic":"Cardiology","Difficulty":"Hard","Vignette":"A 62-year-old...",
                   "Explanation":"Beta blockers reduce mortality."},
         "questionData":{"correctAnswer":"B",
           "answers":[{"label":"A","text":"Furosemide","explanation":"Symptom relief only."},
                      {"label":"B","text":"Bisoprolol","explanation":"Mortality benefit."}],
           "libraryIds":["s1"],"conceptIds":["c1"]}}
    """.trimIndent()

    @Test
    fun `the stem is the item title, not questionData stem`() {
        // In live content the stem is the item's `title`, and the vignette and
        // explanation are in `fields`. The keys inside `questionData` are unused
        // across every published question; reading those renders blank questions
        // and nothing reports an error.
        val question = QuestionProjection.project(item(good))!!
        assertEquals("Which drug lowers mortality in HFrEF?", question.stem)
        assertEquals("A 62-year-old...", question.vignette)
        assertEquals("Beta blockers reduce mortality.", question.explanation)
    }

    @Test
    fun `every option carries its own explanation`() {
        val question = QuestionProjection.project(item(good))!!
        assertEquals(2, question.options.size)
        assertEquals("Symptom relief only.", question.options.first { it.label == "A" }.explanation)
    }

    @Test
    fun `difficulty defaults to Moderate when unauthored`() {
        val raw = good.replace(""""Difficulty":"Hard",""", "")
        assertEquals("Moderate", QuestionProjection.project(item(raw))!!.difficulty)
    }

    @Test
    fun `a question whose correct answer is not among its options is rejected`() {
        // Not a hard question — a broken record. Showing it marks every attempt
        // wrong.
        val raw = good.replace(""""correctAnswer":"B"""", """"correctAnswer":"D"""")
        assertNull(QuestionProjection.project(item(raw)))
    }

    @Test
    fun `a question with no options is rejected`() {
        // DOT_MATCHES_ALL: `good`'s `answers` array spans multiple lines, and
        // `.` does not match a newline by default — without this flag the
        // pattern never matches and the field silently survives untouched.
        val raw = good.replace(Regex(""""answers":\[.*?\],""", RegexOption.DOT_MATCHES_ALL), "")
        assertNull(QuestionProjection.project(item(raw)))
    }

    @Test
    fun `a question with an empty stem is rejected`() {
        val raw = good.replace(""""title":"Which drug lowers mortality in HFrEF?"""", """"title":"  """")
        assertNull(QuestionProjection.project(item(raw)))
    }

    @Test
    fun `a non-question item projects to null`() {
        val raw = """{"id":"a1","kind":"article","status":"Published","title":"T","subjectId":"med"}"""
        assertNull(QuestionProjection.project(item(raw)))
    }

    @Test
    fun `a one-option question is not a question`() {
        // usePublishedQuestions.ts:24 rejects fewer than two surviving
        // options, even when the lone survivor is the correct answer. A
        // one-option question is hidden on the web and must not become
        // gradable here.
        val raw = """
            {"id":"q1","kind":"question","status":"Published","subjectId":"med",
             "title":"Single option question",
             "fields":{},
             "questionData":{"correctAnswer":"A",
               "answers":[{"label":"A","text":"Only option","explanation":"n/a"}]}}
        """.trimIndent()
        assertNull(QuestionProjection.project(item(raw)))
    }

    @Test
    fun `an unwritten explanation falls back to the correct option's own`() {
        // usePublishedQuestions.ts:41 — item.fields.Explanation?.trim() ||
        // correctExplanation, where correctExplanation (line 27) is the
        // explanation of the option whose label equals correctAnswer.
        // Per-option rationales are a normal authoring pattern; reading only
        // the field renders an empty explanation panel with no error.
        val raw = good.replace(""""Explanation":"Beta blockers reduce mortality."""", """"Explanation":""""")
        val question = QuestionProjection.project(item(raw))!!
        assertEquals("Mortality benefit.", question.explanation)
    }

    @Test
    fun `topic prefers tags topic over fields Topic`() {
        // usePublishedQuestions.ts:34 — data.tags.topic.trim() ||
        // item.fields.Topic?.trim() || 'General'.
        val raw = """
            {"id":"q1","kind":"question","status":"Published","subjectId":"med",
             "title":"T","fields":{"Topic":"Cardiology"},
             "questionData":{"correctAnswer":"A","tags":{"topic":"Heart Failure"},
               "answers":[{"label":"A","text":"X","explanation":"x"},
                          {"label":"B","text":"Y","explanation":"y"}]}}
        """.trimIndent()
        assertEquals("Heart Failure", QuestionProjection.project(item(raw))!!.topic)
    }

    @Test
    fun `an unrecognised difficulty is treated as Moderate`() {
        // usePublishedQuestions.ts:10-13 validates the resolved difficulty
        // against DIFFICULTIES (qbank.ts:4 = Easy/Moderate/Hard/Challenging);
        // anything else — an authoring typo like "hard" — must not flow
        // straight through into the scoping filters unvalidated.
        val raw = good.replace(""""Difficulty":"Hard"""", """"Difficulty":"hard"""")
        assertEquals("Moderate", QuestionProjection.project(item(raw))!!.difficulty)
    }

    @Test
    fun `concept ids are the union of both tag lists`() {
        // usePublishedQuestions.ts:50 — [...new Set([...(tags.mainConceptIds
        // ?? []), ...tags.conceptIds])]. Main first, de-duplicated, never an
        // either/or fallback.
        val raw = """
            {"id":"q1","kind":"question","status":"Published","subjectId":"med",
             "title":"T","fields":{},
             "questionData":{"correctAnswer":"A",
               "tags":{"mainConceptIds":["c1","c2"],"conceptIds":["c2","c3"]},
               "answers":[{"label":"A","text":"X","explanation":"x"},
                          {"label":"B","text":"Y","explanation":"y"}]}}
        """.trimIndent()
        assertEquals(listOf("c1", "c2", "c3"), QuestionProjection.project(item(raw))!!.conceptIds)
    }
}
