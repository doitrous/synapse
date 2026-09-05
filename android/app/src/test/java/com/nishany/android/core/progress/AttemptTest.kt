package com.nishany.android.core.progress

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
    fun `an out-of-order record does not drag lastAt backwards`() {
        // Shards replay oldest-last; the web and iOS both guard against this.
        val totals = AttemptTotals(attempts = 1, marked = 1, correct = 1, lastAt = "2026-08-19T10:00:00.000Z")
        val folded = AttemptStore.fold(totals, record(correct = true).copy(at = "2026-08-01T09:00:00.000Z"))
        assertEquals("2026-08-19T10:00:00.000Z", folded.lastAt)
        assertEquals(2, folded.attempts)
    }

    @Test
    fun `a newer record moves lastAt forward`() {
        val totals = AttemptTotals(attempts = 1, marked = 1, correct = 1, lastAt = "2026-08-19T10:00:00.000Z")
        val folded = AttemptStore.fold(totals, record(correct = true).copy(at = "2026-08-20T08:00:00.000Z"))
        assertEquals("2026-08-20T08:00:00.000Z", folded.lastAt)
    }

    @Test
    fun `the record round-trips with the web's field names`() {
        val json = """
            {"id":"a1","at":"2026-08-19T10:00:00.000Z","surface":"qbank","itemId":"q1",
             "subjectId":"med","topic":"Cardiology","difficulty":"Moderate",
             "conceptIds":["c1"],"correct":true,"seconds":42,"sessionId":"s1"}
        """.trimIndent()
        val parsed = Json.decodeFromString<AttemptRecord>(json)
        assertEquals("a1", parsed.id)
        assertEquals("2026-08-19T10:00:00.000Z", parsed.at)
        assertEquals("qbank", parsed.surface)
        assertEquals("q1", parsed.itemId)
        assertEquals("med", parsed.subjectId)
        assertEquals("Cardiology", parsed.topic)
        assertEquals("Moderate", parsed.difficulty)
        // conceptIds has a default, so a renamed field would decode to an empty
        // list instead of throwing. Assert it, or the rename ships silently.
        assertEquals(listOf("c1"), parsed.conceptIds)
        assertEquals(42, parsed.seconds)
        assertEquals(true, parsed.correct)
        assertEquals("s1", parsed.sessionId)
    }

    @Test
    fun `indexing a record lists the month it belongs to`() {
        val index = AttemptStore.index(AttemptIndex(), record(correct = true), ZoneId.of("UTC"))
        assertEquals(listOf("2026-08"), index.months)
        assertEquals(1, index.totals.attempts)
    }

    @Test
    fun `a month already listed is not listed twice`() {
        val once = AttemptStore.index(AttemptIndex(), record(correct = true), ZoneId.of("UTC"))
        val twice = AttemptStore.index(once, record(correct = true).copy(id = "a2"), ZoneId.of("UTC"))
        assertEquals(listOf("2026-08"), twice.months)
        assertEquals(2, twice.totals.attempts)
    }

    @Test
    fun `months stay sorted when an older shard arrives late`() {
        // A backfill hands over 2026-03 after 2026-08 is already there. Every
        // client reads this list in order.
        val withAugust = AttemptIndex(months = listOf("2026-08"))
        val backfilled = AttemptStore.index(
            withAugust,
            record(correct = true).copy(id = "old-1", at = "2026-03-15T09:00:00.000Z"),
            ZoneId.of("UTC"),
        )
        assertEquals(listOf("2026-03", "2026-08"), backfilled.months)
    }

    @Test
    fun `the same attempt recorded twice is stored once`() {
        val month = AttemptStore.addAttempt(AttemptMonth(month = "2026-08"), record(correct = true))
        val again = AttemptStore.addAttempt(month, record(correct = true))
        assertEquals(1, again.records.size)
    }

    @Test
    fun `the same question answered again in a later sitting is a second record`() {
        val first = record(correct = true)
        val secondSitting = first.copy(id = AttemptStore.attemptId("s2", first.surface, first.itemId), sessionId = "s2")
        val month = AttemptStore.addAttempt(AttemptMonth(month = "2026-08"), first)
        val withSecond = AttemptStore.addAttempt(month, secondSitting)
        assertEquals(2, withSecond.records.size)
    }

    @Test
    fun `attemptId matches the web's spelling`() {
        assertEquals("s1:qbank:q1", AttemptStore.attemptId("s1", "qbank", "q1"))
    }

    private fun record(correct: Boolean?) = AttemptRecord(
        id = "a1", at = "2026-08-19T10:00:00.000Z", surface = "qbank", itemId = "q1",
        subjectId = "med", topic = "Cardiology", difficulty = "Moderate",
        conceptIds = listOf("c1"), correct = correct, seconds = 10, sessionId = "s1",
    )
}
