package com.synapse.android.core.progress

import java.time.Instant
import java.time.ZoneId
import kotlinx.serialization.json.Json
import org.junit.Assert.assertEquals
import org.junit.Test

class AttemptTest {

    @Test
    fun `a month is the local month, not the UTC one`() {
        // 2026-08-31 23:30 in Riyadh is 20:30 UTC the same day; but
        // 2026-08-31 22:00 UTC is already September for anyone at UTC+3.
        val instant = Instant.parse("2026-08-31T22:00:00Z")
        assertEquals("2026-09", AttemptStore.month(instant, ZoneId.of("Asia/Riyadh")))
        assertEquals("2026-08", AttemptStore.month(instant, ZoneId.of("UTC")))
    }

    @Test
    fun `months are zero-padded so they sort as strings`() {
        val instant = Instant.parse("2026-01-05T09:00:00Z")
        assertEquals("2026-01", AttemptStore.month(instant, ZoneId.of("UTC")))
    }

    @Test
    fun `the shard key matches the web's spelling`() {
        assertEquals("synapse.progress.attempts.2026-08", AttemptStore.monthKey("2026-08"))
        assertEquals("synapse.progress.attemptIndex.v1", AttemptStore.INDEX_KEY)
    }

    @Test
    fun `an unmarked attempt counts as attempted but not as marked`() {
        // A self-ticked OSCE station. Null is not the same as wrong, and
        // accuracy must not count it either way.
        val totals = AttemptStore.fold(AttemptTotals(), record(correct = null))
        assertEquals(1, totals.attempts)
        assertEquals(0, totals.marked)
        assertEquals(0, totals.correct)
    }

    @Test
    fun `a wrong answer is marked but not correct`() {
        val totals = AttemptStore.fold(AttemptTotals(), record(correct = false))
        assertEquals(1, totals.attempts)
        assertEquals(1, totals.marked)
        assertEquals(0, totals.correct)
    }

    @Test
    fun `a right answer counts everywhere`() {
        val totals = AttemptStore.fold(AttemptTotals(), record(correct = true))
        assertEquals(1, totals.attempts)
        assertEquals(1, totals.marked)
        assertEquals(1, totals.correct)
    }

    @Test
    fun `the record round-trips with the web's field names`() {
        val json = """
            {"id":"a1","at":"2026-08-19T10:00:00.000Z","surface":"qbank","itemId":"q1",
             "subjectId":"med","topic":"Cardiology","difficulty":"Moderate",
             "conceptIds":["c1"],"correct":true,"seconds":42,"sessionId":"s1"}
        """.trimIndent()
        val parsed = Json.decodeFromString<AttemptRecord>(json)
        assertEquals("q1", parsed.itemId)
        assertEquals(42, parsed.seconds)
        assertEquals(true, parsed.correct)
    }

    private fun record(correct: Boolean?) = AttemptRecord(
        id = "a1", at = "2026-08-19T10:00:00.000Z", surface = "qbank", itemId = "q1",
        subjectId = "med", topic = "Cardiology", difficulty = "Moderate",
        conceptIds = listOf("c1"), correct = correct, seconds = 10, sessionId = "s1",
    )
}
