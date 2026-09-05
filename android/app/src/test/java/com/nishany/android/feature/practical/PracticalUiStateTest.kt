package com.nishany.android.feature.practical

import com.nishany.android.core.model.Practical
import com.nishany.android.core.sync.SyncStatus
import com.nishany.android.core.ui.UiState
import java.time.Instant
import org.junit.Assert.assertEquals
import org.junit.Assert.assertTrue
import org.junit.Test

/**
 * [practicalUiState] in isolation -- no Robolectric, no [android.content.Context],
 * no coroutine dispatcher, because it is a plain function of its four
 * arguments. The state machine [PracticalViewModel.uiState] actually wires
 * (ledger, [com.nishany.android.core.sync.SyncEngine], [com.nishany.android.core.ConnectivityMonitor])
 * is exercised end to end by `PracticalViewModelTest` instead.
 */
class PracticalUiStateTest {

    private val station = Practical(
        id = "os-1", title = "Station", subjectId = "cvs", type = "OSCE station",
        difficulty = "Moderate", minutes = 8, marks = 20,
        learningObjective = null, candidateInstructions = "Instructions",
        markSections = emptyList(), decisions = emptyList(), questions = emptyList(),
        debrief = null, references = emptyList(),
    )

    private fun noRetry(): () -> Unit = { error("retry should not run in this test") }

    @Test
    fun `a non-empty list is Content regardless of sync status`() {
        val result = practicalUiState(listOf(station), SyncStatus.Idle, isOnline = true, retry = noRetry())
        assertEquals(UiState.Content(listOf(station)), result)
    }

    @Test
    fun `an empty list before sync has finished is Loading`() {
        assertEquals(UiState.Loading, practicalUiState(emptyList(), SyncStatus.Idle, isOnline = true, retry = noRetry()))
        assertEquals(UiState.Loading, practicalUiState(emptyList(), SyncStatus.Syncing, isOnline = true, retry = noRetry()))
    }

    @Test
    fun `an empty list once sync has completed is Empty`() {
        val result = practicalUiState(emptyList(), SyncStatus.Done(0, Instant.now()), isOnline = true, retry = noRetry())
        assertTrue(result is UiState.Empty)
    }

    @Test
    fun `a failed sync is Error, worded for the connection that is actually down`() {
        val offline = practicalUiState(emptyList(), SyncStatus.Failed("boom"), isOnline = false, retry = noRetry())
        assertTrue(offline is UiState.Error)
        assertTrue((offline as UiState.Error).message.contains("offline", ignoreCase = true))

        val online = practicalUiState(emptyList(), SyncStatus.Failed("boom"), isOnline = true, retry = noRetry())
        assertTrue(online is UiState.Error)
        assertTrue(!(online as UiState.Error).message.contains("offline", ignoreCase = true))
    }

    @Test
    fun `Error carries the retry callback through`() {
        var ran = false
        val result = practicalUiState(emptyList(), SyncStatus.Failed("boom"), isOnline = true, retry = { ran = true })
        (result as UiState.Error).retry?.invoke()
        assertTrue(ran)
    }
}
