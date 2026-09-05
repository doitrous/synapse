package com.nishany.android.feature.home

import com.nishany.android.core.sync.SyncStatus
import com.nishany.android.core.ui.UiState
import java.time.Instant
import org.junit.Assert.assertEquals
import org.junit.Assert.assertTrue
import org.junit.Test

/**
 * [homeUiState] in isolation -- a plain function of a [HomeUi], a
 * `hasContent` flag, [SyncStatus] and connectivity, mirroring
 * [com.nishany.android.feature.practical.PracticalUiStateTest]'s coverage of
 * [com.nishany.android.feature.practical.practicalUiState]. `hasContent` --
 * not [HomeUi] itself, which is always non-null -- is what decides
 * Content vs. Loading/Empty here; see [HomeViewModel.uiState]'s own doc.
 */
class HomeUiStateTest {

    private fun noRetry(): () -> Unit = { error("retry should not run in this test") }

    @Test
    fun `hasContent is Content regardless of sync status`() {
        val result = homeUiState(HomeUi.EMPTY, hasContent = true, SyncStatus.Idle, isOnline = true, retry = noRetry())
        assertEquals(UiState.Content(HomeUi.EMPTY), result)
    }

    @Test
    fun `no content before sync has finished is Loading`() {
        assertEquals(UiState.Loading, homeUiState(HomeUi.EMPTY, hasContent = false, SyncStatus.Idle, isOnline = true, retry = noRetry()))
        assertEquals(UiState.Loading, homeUiState(HomeUi.EMPTY, hasContent = false, SyncStatus.Syncing, isOnline = true, retry = noRetry()))
    }

    @Test
    fun `no content once sync has completed is Empty`() {
        val result = homeUiState(HomeUi.EMPTY, hasContent = false, SyncStatus.Done(0, Instant.now()), isOnline = true, retry = noRetry())
        assertTrue(result is UiState.Empty)
    }

    @Test
    fun `a failed sync is Error, worded for the connection that is actually down`() {
        val offline = homeUiState(HomeUi.EMPTY, hasContent = false, SyncStatus.Failed("boom"), isOnline = false, retry = noRetry())
        assertTrue(offline is UiState.Error)
        assertTrue((offline as UiState.Error).message.contains("offline", ignoreCase = true))

        val online = homeUiState(HomeUi.EMPTY, hasContent = false, SyncStatus.Failed("boom"), isOnline = true, retry = noRetry())
        assertTrue(online is UiState.Error)
        assertTrue(!(online as UiState.Error).message.contains("offline", ignoreCase = true))
    }

    @Test
    fun `Error carries the retry callback through`() {
        var ran = false
        val result = homeUiState(HomeUi.EMPTY, hasContent = false, SyncStatus.Failed("boom"), isOnline = true, retry = { ran = true })
        (result as UiState.Error).retry?.invoke()
        assertTrue(ran)
    }
}
