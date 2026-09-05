package com.nishany.android.feature.qbank

import com.nishany.android.core.model.Question
import com.nishany.android.core.sync.SyncStatus
import com.nishany.android.core.ui.UiState
import java.time.Instant
import org.junit.Assert.assertEquals
import org.junit.Assert.assertTrue
import org.junit.Test

/**
 * [qbankUiState] in isolation -- no Robolectric, no [SyncEngine], no
 * [ConnectivityMonitor], because it is a plain function of its four
 * arguments. Mirrors [com.nishany.android.feature.practical.PracticalUiStateTest]
 * -- this fold is [com.nishany.android.feature.practical.practicalUiState]
 * token for token, over a question pool instead of a practical one.
 */
class QBankUiStateTest {

    private val question = Question(
        id = "q-1", subjectId = "cvs", topic = "Heart failure", difficulty = "Moderate",
        vignette = "", stem = "Stem", options = emptyList(), correctLabel = "A",
        explanation = "Explanation", learningObjective = null, estimatedSeconds = null,
        libraryIds = emptyList(), conceptIds = emptyList(),
    )

    private fun noRetry(): () -> Unit = { error("retry should not run in this test") }

    @Test
    fun `a non-empty pool is Content regardless of sync status`() {
        val result = qbankUiState(listOf(question), SyncStatus.Idle, isOnline = true, retry = noRetry())
        assertEquals(UiState.Content(listOf(question)), result)
    }

    @Test
    fun `an empty pool before sync has finished is Loading`() {
        assertEquals(UiState.Loading, qbankUiState(emptyList(), SyncStatus.Idle, isOnline = true, retry = noRetry()))
        assertEquals(UiState.Loading, qbankUiState(emptyList(), SyncStatus.Syncing, isOnline = true, retry = noRetry()))
    }

    @Test
    fun `an empty pool once sync has completed is Empty`() {
        val result = qbankUiState(emptyList(), SyncStatus.Done(0, Instant.now()), isOnline = true, retry = noRetry())
        assertTrue(result is UiState.Empty)
    }

    @Test
    fun `a failed sync is Error, worded for the connection that is actually down`() {
        val offline = qbankUiState(emptyList(), SyncStatus.Failed("boom"), isOnline = false, retry = noRetry())
        assertTrue(offline is UiState.Error)
        assertTrue((offline as UiState.Error).message.contains("offline", ignoreCase = true))

        val online = qbankUiState(emptyList(), SyncStatus.Failed("boom"), isOnline = true, retry = noRetry())
        assertTrue(online is UiState.Error)
        assertTrue(!(online as UiState.Error).message.contains("offline", ignoreCase = true))
    }

    @Test
    fun `Error carries the retry callback through`() {
        var ran = false
        val result = qbankUiState(emptyList(), SyncStatus.Failed("boom"), isOnline = true, retry = { ran = true })
        (result as UiState.Error).retry?.invoke()
        assertTrue(ran)
    }
}
