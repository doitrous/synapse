package com.synapse.android.core.qbank

import kotlinx.serialization.json.Json
import org.junit.Assert.assertEquals
import org.junit.Assert.assertTrue
import org.junit.Test

class LiveSessionTest {

    private val json = Json { ignoreUnknownKeys = true }

    private fun fixture(): String =
        checkNotNull(javaClass.classLoader!!.getResourceAsStream("live-session-from-web.json"))
            .bufferedReader().readText()

    @Test
    fun `every field the web wrote arrives intact`() {
        // Assert all twelve, not a sample. A renamed field throws, but a field
        // this class simply does not declare is dropped in silence by
        // `ignoreUnknownKeys` — and that is the one that loses the student's
        // place when they go back to a laptop. Only an assertion per field
        // catches it.
        val session = json.decodeFromString<LiveSession>(fixture())
        assertEquals(listOf("q-101", "q-102", "q-103", "q-104"), session.questionIds)
        assertEquals(2, session.idx)
        assertEquals(mapOf("q-101" to 2, "q-102" to 0), session.answers)
        assertEquals(mapOf("q-101" to true, "q-102" to true), session.checked)
        assertEquals(SittingMode.TUTOR, session.mode)
        assertEquals("sess-8f3c2b1a", session.sessionId)
        assertEquals(187, session.elapsed)
        assertEquals(listOf(0, 1, 2), session.visited)
        assertEquals(false, session.reviewing)
        assertEquals("Cardiology Review", session.name)
        assertEquals("running", session.phase)
        assertEquals("2026-08-19T14:32:07.123Z", session.startedAt)
    }

    @Test
    fun `a sitting survives the trip back out to the web`() {
        val session = json.decodeFromString<LiveSession>(fixture())
        val round = json.decodeFromString<LiveSession>(json.encodeToString(session))
        assertEquals(session, round)
    }

    @Test
    fun `the key is spelled as the web spells it`() {
        assertEquals("synapse.qbank.activeSession.v1", LiveSession.KEY)
    }

    @Test
    fun `tutor explains as you go and timed does not`() {
        // Not cosmetic: in tutor mode the explanation is the point; in timed
        // mode showing it defeats the rehearsal.
        assertTrue(SittingMode.TUTOR.explainsAsYouGo)
        assertTrue(!SittingMode.TIMED.explainsAsYouGo)
    }

    @Test
    fun `mode serialises lowercase`() {
        assertEquals("\"timed\"", json.encodeToString(SittingMode.TIMED))
    }

    @Test
    fun `omitted is distinct from unseen`() {
        // A question reached, left, and moved past is exactly the one a student
        // most needs to come back to. Folding it into unanswered hides it.
        assertEquals(5, QuestionState.entries.size)
        assertTrue(QuestionState.OMITTED != QuestionState.UNSEEN)
    }
}
