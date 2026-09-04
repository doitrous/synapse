package com.synapse.android.feature.qbank

import com.synapse.android.core.ui.UiState
import org.junit.Assert.assertEquals
import org.junit.Assert.assertTrue
import org.junit.Test

/**
 * [previousSittingsUiState] in isolation. `null` is the window before the
 * one-shot ledger read in [PreviousSittingsViewModel]'s init block lands --
 * distinct from a genuinely empty, already-loaded list.
 */
class PreviousSittingsUiStateTest {

    private val sitting = PreviousSitting(sessionId = "s-1", name = "Test 1", date = "2026-01-01", answered = 10, accuracy = 0.8)

    @Test
    fun `null (not yet loaded) is Loading`() {
        assertEquals(UiState.Loading, previousSittingsUiState(null))
    }

    @Test
    fun `an empty, loaded list is Empty`() {
        assertTrue(previousSittingsUiState(emptyList()) is UiState.Empty)
    }

    @Test
    fun `a non-empty list is Content`() {
        assertEquals(UiState.Content(listOf(sitting)), previousSittingsUiState(listOf(sitting)))
    }
}
