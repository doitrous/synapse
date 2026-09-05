package com.nishany.android.core.model

import org.junit.Assert.assertEquals
import org.junit.Assert.assertFalse
import org.junit.Assert.assertTrue
import org.junit.Test

class LedgerDecoderTest {

    @Test
    fun `a question keeps its scope under questionData tags, with years named years`() {
        val json = """
            [{"id":"q1","kind":"question","status":"Published","title":"Stem","subjectId":"med",
              "questionData":{"tags":{"universityIds":["kau"],"years":["kau_y3"]}}}]
        """.trimIndent()
        val item = LedgerDecoder.decode(json).items.single()
        assertEquals(listOf("kau"), item.universityIds)
        assertEquals(listOf("kau_y3"), item.yearIds)
    }

    @Test
    fun `an article keeps its scope on its own block, with years named yearIds`() {
        val json = """
            [{"id":"a1","kind":"article","status":"Published","title":"Heart failure","subjectId":"med",
              "articleData":{"universityIds":["kau"],"yearIds":["kau_y3"]}}]
        """.trimIndent()
        val item = LedgerDecoder.decode(json).items.single()
        assertEquals(listOf("kau_y3"), item.yearIds)
    }

    @Test
    fun `no scope means everyone, not nobody`() {
        val json = """[{"id":"q2","kind":"question","status":"Published","title":"S","subjectId":"med"}]"""
        val item = LedgerDecoder.decode(json).items.single()
        assertTrue(item.universityIds.isEmpty())
        assertTrue(item.yearIds.isEmpty())
    }

    @Test
    fun `only published items are student-visible`() {
        val json = """
            [{"id":"d1","kind":"article","status":"Draft","title":"WIP","subjectId":"med"},
             {"id":"p1","kind":"article","status":"Published","title":"Done","subjectId":"med"}]
        """.trimIndent()
        val items = LedgerDecoder.decode(json).items
        assertFalse(items.first { it.id == "d1" }.isStudentVisible)
        assertTrue(items.first { it.id == "p1" }.isStudentVisible)
    }

    @Test
    fun `one malformed record is skipped rather than failing the batch`() {
        // A student must not lose their whole library to one bad row authored
        // upstream.
        val json = """
            [{"id":"ok","kind":"question","status":"Published","title":"S","subjectId":"med"},
             {"kind":"question","status":"Published"},
             {"id":"bad","kind":"nonsense","status":"Published","title":"S","subjectId":"med"}]
        """.trimIndent()
        val result = LedgerDecoder.decode(json)
        assertEquals(listOf("ok"), result.items.map { it.id })
        assertEquals(2, result.skipped)
    }

    @Test
    fun `the raw record is kept verbatim for later projection`() {
        val json = """[{"id":"q1","kind":"question","status":"Published","title":"S","subjectId":"med",
                       "questionData":{"correctAnswer":"B"}}]"""
        val item = LedgerDecoder.decode(json).items.single()
        assertTrue(item.raw.contains("\"correctAnswer\""))
    }
}
