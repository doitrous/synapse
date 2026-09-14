package com.synapse.app.core.social

import androidx.test.core.app.ApplicationProvider
import com.synapse.app.R
import org.junit.Assert.assertEquals
import org.junit.Test
import org.junit.runner.RunWith
import org.robolectric.RobolectricTestRunner

/**
 * [socialReasonMessage] now returns a `@StringRes` id rather than resolved
 * text, so this needs a real `Resources` to check the English copy hasn't
 * moved — Robolectric's default test locale is English, matching what these
 * assertions checked before the string was externalized.
 */
@RunWith(RobolectricTestRunner::class)
class SocialMessagesTest {

    private val context get() = ApplicationProvider.getApplicationContext<android.content.Context>()
    private fun resolve(@androidx.annotation.StringRes id: Int) = context.getString(id)

    @Test
    fun mapsKnownReasonsToStudentFacingWords() {
        assertEquals("Pick at least one question first.", resolve(socialReasonMessage("no_questions")))
        assertEquals("Only the host can start it.", resolve(socialReasonMessage("not_host")))
        assertEquals("You can only challenge a friend.", resolve(socialReasonMessage("not_friends")))
        assertEquals("That invite has expired.", resolve(socialReasonMessage("expired")))
    }

    @Test
    fun fallsBackToAGenericMessageForAnUnknownOrMissingReason() {
        assertEquals(R.string.social_reason_generic, socialReasonMessage(null))
        assertEquals(R.string.social_reason_generic, socialReasonMessage("some_future_reason_this_client_does_not_know_yet"))
    }
}
