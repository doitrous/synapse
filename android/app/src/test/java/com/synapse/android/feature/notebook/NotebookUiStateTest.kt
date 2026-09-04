package com.synapse.android.feature.notebook

import com.synapse.android.core.notebook.Note
import com.synapse.android.core.notebook.addNote
import com.synapse.android.core.notebook.editNote
import com.synapse.android.core.notebook.removeNote
import com.synapse.android.core.sync.SyncStatus
import com.synapse.android.core.ui.UiState
import java.time.Instant
import org.junit.Assert.assertEquals
import org.junit.Assert.assertTrue
import org.junit.Test

/** [notebookUiState] and the pure note folds in `core/notebook/Notebook.kt`, isolated the same way `PracticalUiStateTest` is. */
class NotebookUiStateTest {

    private fun noRetry(): () -> Unit = { error("retry should not run in this test") }

    private val note = Note(id = "n1", title = "Heart failure", body = "Compensation trap", updatedAt = "2024-01-01T00:00:00Z")

    @Test
    fun `a non-empty list is Content, newest first`() {
        val older = note.copy(id = "n0", updatedAt = "2023-01-01T00:00:00Z")
        val result = notebookUiState(listOf(older, note), SyncStatus.Idle, isOnline = true, retry = noRetry())
        assertEquals(UiState.Content(listOf(note, older)), result)
    }

    @Test
    fun `no document yet is Loading`() {
        assertEquals(UiState.Loading, notebookUiState(null, SyncStatus.Idle, isOnline = true, retry = noRetry()))
        assertEquals(UiState.Loading, notebookUiState(null, SyncStatus.Syncing, isOnline = true, retry = noRetry()))
    }

    @Test
    fun `an empty document, or an empty list once sync completes, is Empty`() {
        assertTrue(notebookUiState(emptyList(), SyncStatus.Idle, isOnline = true, retry = noRetry()) is UiState.Empty)
        assertTrue(notebookUiState(emptyList(), SyncStatus.Done(0, Instant.now()), isOnline = true, retry = noRetry()) is UiState.Empty)
    }

    @Test
    fun `a failed sync with nothing cached is Error, worded for the connection that is actually down`() {
        val offline = notebookUiState(null, SyncStatus.Failed("boom"), isOnline = false, retry = noRetry())
        assertTrue(offline is UiState.Error)
        assertTrue((offline as UiState.Error).message.contains("offline", ignoreCase = true))
    }

    @Test
    fun `addNote appends and returns the minted id`() {
        val (updated, id) = addNote(emptyList(), "Title", "Body", "n2", "2024-02-01T00:00:00Z")
        assertEquals(1, updated.size)
        assertEquals("n2", id)
        assertEquals("Title", updated.single().title)
    }

    @Test
    fun `editNote replaces title and body, leaves other notes untouched`() {
        val other = note.copy(id = "n-other")
        val updated = editNote(listOf(note, other), note.id, "New title", "New body", "2024-03-01T00:00:00Z")
        val edited = updated.first { it.id == note.id }
        assertEquals("New title", edited.title)
        assertEquals("New body", edited.body)
        assertEquals(other, updated.first { it.id == other.id })
    }

    @Test
    fun `editNote on a note that no longer exists is a no-op`() {
        val updated = editNote(listOf(note), "gone", "x", "y", "2024-03-01T00:00:00Z")
        assertEquals(listOf(note), updated)
    }

    @Test
    fun `removeNote drops exactly that note`() {
        val other = note.copy(id = "n-other")
        assertEquals(listOf(other), removeNote(listOf(note, other), note.id))
    }
}
