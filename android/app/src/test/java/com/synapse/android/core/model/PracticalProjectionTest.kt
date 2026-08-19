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
    fun `candidate instructions fall back to the authored field`() {
        val raw = osce
            .replace(""""candidateInstructions":"You have 8 minutes.",""", "")
            .replace(""""Marks":"20"""", """"Marks":"20","Candidate instructions":"From fields."""")
        assertEquals("From fields.", PracticalProjection.project(item(raw))!!.candidateInstructions)
    }
}
