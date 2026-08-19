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
    fun `a sitting started on the web is readable on the phone`() {
        val session = json.decodeFromString<LiveSession>(fixture())
        assertTrue(session.questionIds.isNotEmpty())
        assertEquals("running", session.phase)
    }

    @Test
    fun `re-encoding keeps every field the web wrote`() {
        // A renamed or dropped field does not throw. It silently loses the
        // student's place when they go back to a laptop.
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
