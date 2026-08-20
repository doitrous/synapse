package com.synapse.android.core.model

import org.junit.Assert.assertEquals
import org.junit.Assert.assertTrue
import org.junit.Test

class PracticalProjectionTest {

    private fun item(raw: String) = LedgerDecoder.decode("[$raw]").items.single()

    private val osce = """
        {"id":"p1","kind":"practical","status":"Published","subjectId":"med","title":"Cardiac exam",
         "fields":{"Type":"OSCE station","Difficulty":"Moderate","Duration":"8","Marks":"20"},
         "practicalData":{"learningObjective":"Examine the praecordium",
           "candidateInstructions":"You have 8 minutes.",
           "markSections":[{"id":"m1","title":"Introduction","items":["Washes hands","Introduces self"]}],
           "decisions":[],"questions":[],"debrief":"Common misses: JVP.",
           "references":["Talley & O'Connor"]}}
    """.trimIndent()

    @Test
    fun `the five formats are one kind with different blocks filled in`() {
        val practical = PracticalProjection.project(item(osce))!!
        assertEquals("OSCE station", practical.type)
        assertEquals(8, practical.minutes)
        assertEquals(20, practical.marks)
        assertTrue(practical.decisions.isEmpty())
        assertEquals(2, practical.markSections.single().items.size)
    }

    @Test
    fun `type falls back to Practical rather than to an empty label`() {
        val raw = osce.replace(""""Type":"OSCE station",""", "")
        assertEquals("Practical", PracticalProjection.project(item(raw))!!.type)
    }

    @Test
    fun `a case reads its staged decisions`() {
        val raw = osce.replace(
            """"decisions":[]""",
            """"decisions":[{"id":"d1","title":"Initial","context":"BP 80/50","prompt":"Next?","answer":"Fluids"}]""",
        )
        val decision = PracticalProjection.project(item(raw))!!.decisions.single()
        assertEquals("Fluids", decision.answer)
    }

    @Test
    fun `mark items keep the id the author gave them`() {
        // The web restores a half-ticked run with checked.has(item.id). A
        // tick written under a positional key restores nothing there.
        val raw = osce.replace(
            """"items":["Washes hands","Introduces self"]""",
            """"items":[{"id":"i-hands","text":"Washes hands"},{"id":"i-intro","text":"Introduces self"}]""",
        )
        val items = PracticalProjection.project(item(raw))!!.markSections.single().items
        assertEquals(listOf("i-hands", "i-intro"), items.map { it.id })
        assertEquals(listOf("Washes hands", "Introduces self"), items.map { it.text })
    }

    @Test
    fun `a bare string item and an id-less item still project, positionally keyed`() {
        // Tolerance the projection had before authored ids existed, kept:
        // dropping the section would take the whole station off the phone.
        val raw = osce.replace(
            """"items":["Washes hands","Introduces self"]""",
            """"items":["Washes hands",{"text":"Introduces self"}]""",
        )
        val items = PracticalProjection.project(item(raw))!!.markSections.single().items
        assertEquals(listOf("m1:0", "m1:1"), items.map { it.id })
        assertEquals("Introduces self", items[1].text)
    }

    @Test
    fun `a section with no readable marks is worth zero, not dropped`() {
        // bulkImport.ts:267 does the same with an unparseable figure.
        val section = PracticalProjection.project(item(osce))!!.markSections.single()
        assertEquals(0, section.marks)
        assertEquals(2, section.items.size)
    }

    @Test
    fun `a station is scored by weighted section share, not by tick count`() {
        val raw = osce.replace(
            """"markSections":[{"id":"m1","title":"Introduction","items":["Washes hands","Introduces self"]}]""",
            """"markSections":[
                 {"id":"m1","title":"Introduction","marks":4,
                  "items":[{"id":"a","text":"Washes hands"},{"id":"b","text":"Introduces self"}]},
                 {"id":"m2","title":"Examination","marks":6,
                  "items":[{"id":"c","text":"Palpates apex"},{"id":"d","text":"Auscultates"},
                           {"id":"e","text":"Checks oedema"}]}
               ]""",
        )
        val practical = PracticalProjection.project(item(raw))!!
        assertEquals(10, practical.totalMarks)
        // Three ticks. A tick count would say 3; the weighted share is
        // 4x(1/2) + 6x(2/3) = 6.
        assertEquals(6, practical.earnedMarks(setOf("a", "c", "d")))
        assertEquals(0, practical.earnedMarks(emptySet()))
        assertEquals(10, practical.earnedMarks(setOf("a", "b", "c", "d", "e")))
    }

    @Test
    fun `a stage with no answers is not a step a student can be asked`() {
        // PracticalRunner.tsx:421 filters these out of the run, so counting
        // them towards `steps` would leave the student reading "3 of 2".
        val raw = osce.replace(
            """"decisions":[]""",
            """"decisions":[
                 {"id":"d1","title":"Initial","context":"BP 80/50",
                  "answers":[{"id":"a1","text":"Fluids"},{"id":"a2","text":"  "}]},
                 {"id":"d2","title":"Narrative","context":"He improves.","answers":[]},
                 {"id":"d3","title":"No answers key","context":"He deteriorates."}
               ]""",
        )
        val practical = PracticalProjection.project(item(raw))!!
        // Nothing is dropped on the way in -- the projection stays lossless.
        assertEquals(listOf("d1", "d2", "d3"), practical.decisions.map { it.id })
        assertEquals(listOf("d1"), practical.answerableDecisions.map { it.id })
    }

    @Test
    fun `a lab question with no answers is not counted either`() {
        val raw = osce.replace(
            """"questions":[]""",
            """"questions":[
                 {"id":"q1","prompt":"Interpret the gas","answers":[{"id":"a1","text":"Metabolic acidosis"}]},
                 {"id":"q2","prompt":"Anything else?","answers":[{"id":"a2","text":""}]}
               ]""",
        )
        val practical = PracticalProjection.project(item(raw))!!
        assertEquals(2, practical.questions.size)
        assertEquals(listOf("q1"), practical.answerableQuestions.map { it.id })
    }

    @Test
    fun `candidate instructions fall back to the authored field`() {
        val raw = osce
            .replace(""""candidateInstructions":"You have 8 minutes.",""", "")
            .replace(""""Marks":"20"""", """"Marks":"20","Candidate instructions":"From fields."""")
        assertEquals("From fields.", PracticalProjection.project(item(raw))!!.candidateInstructions)
    }
}
