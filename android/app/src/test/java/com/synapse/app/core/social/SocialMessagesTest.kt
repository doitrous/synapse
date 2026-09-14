package com.synapse.app.core.social

import org.junit.Assert.assertEquals
import org.junit.Test

class SocialMessagesTest {

    @Test
    fun mapsKnownReasonsToStudentFacingWords() {
        assertEquals("Pick at least one question first.", socialReasonMessage("no_questions"))
        assertEquals("Only the host can start it.", socialReasonMessage("not_host"))
        assertEquals("You can only challenge a friend.", socialReasonMessage("not_friends"))
        assertEquals("That invite has expired.", socialReasonMessage("expired"))
    }

    @Test
    fun fallsBackToAGenericMessageForAnUnknownOrMissingReason() {
        assertEquals("That did not work.", socialReasonMessage(null))
        assertEquals("That did not work.", socialReasonMessage("some_future_reason_this_client_does_not_know_yet"))
    }
}
