package com.synapse.android.feature.assistant

import com.synapse.android.core.api.ApiError
import com.synapse.android.core.api.AssistantStatus
import com.synapse.android.core.ui.UiState
import org.junit.Assert.assertEquals
import org.junit.Assert.assertTrue
import org.junit.Test

/** [assistantUiState] and [failureMessageFor] in isolation -- same idiom as `PracticalUiStateTest`. */
class AssistantUiStateTest {

    private fun noRetry(): () -> Unit = { error("retry should not run in this test") }

    private fun status(remaining: Int = 10) =
        AssistantStatus(available = true, reason = null, plan = "Free", dailyMessages = 10, used = 10 - remaining, remaining = remaining)

    // -- assistantUiState -----------------------------------------------------

    @Test
    fun `no status yet and no failure is Loading`() {
        assertEquals(UiState.Loading, assistantUiState(null, failed = false, isOnline = true, retry = noRetry()))
    }

    @Test
    fun `a loaded status is Content, even once remaining hits zero`() {
        val result = assistantUiState(status(remaining = 0), failed = false, isOnline = true, retry = noRetry())
        assertTrue(result is UiState.Content)
        assertEquals(0, (result as UiState.Content).data.remaining)
    }

    @Test
    fun `a failed load while online names the connection, not offline`() {
        val result = assistantUiState(null, failed = true, isOnline = true, retry = noRetry())
        assertTrue(result is UiState.Error)
        assertTrue((result as UiState.Error).message.contains("connection", ignoreCase = true))
    }

    @Test
    fun `a failed load while offline says so`() {
        val result = assistantUiState(null, failed = true, isOnline = false, retry = noRetry())
        assertTrue(result is UiState.Error)
        assertTrue((result as UiState.Error).message.contains("offline", ignoreCase = true))
    }

    // -- failureMessageFor ------------------------------------------------------

    @Test
    fun `forbidden reads as not on plan`() {
        assertTrue(failureMessageFor(ApiError.Forbidden).contains("plan"))
    }

    @Test
    fun `transient 429 reads as quota exhausted`() {
        assertTrue(failureMessageFor(ApiError.Transient(429)).contains("used all your assistant messages"))
    }

    @Test
    fun `transient 503 reads as unavailable`() {
        assertTrue(failureMessageFor(ApiError.Transient(503)).contains("unavailable"))
    }

    @Test
    fun `transient with no status at all reads as offline`() {
        assertTrue(failureMessageFor(ApiError.Transient(null)).contains("offline", ignoreCase = true))
    }

    @Test
    fun `an unrecognised transient status falls back to the generic retry message`() {
        assertTrue(failureMessageFor(ApiError.Transient(500)).contains("try again"))
    }
}
