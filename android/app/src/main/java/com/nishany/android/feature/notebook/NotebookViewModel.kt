package com.nishany.android.feature.notebook

import android.util.Log
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewmodel.initializer
import androidx.lifecycle.viewmodel.viewModelFactory
import com.nishany.android.core.BACKGROUND_WORK_TAG
import com.nishany.android.core.ConnectivityMonitor
import com.nishany.android.core.CortexJson
import com.nishany.android.core.backgroundWorkScope
import com.nishany.android.core.cache.LocalStore
import com.nishany.android.core.notebook.NOTEBOOK_KEY
import com.nishany.android.core.notebook.Note
import com.nishany.android.core.notebook.addNote
import com.nishany.android.core.notebook.editNote
import com.nishany.android.core.notebook.removeNote
import com.nishany.android.core.notebook.sortNotes
import com.nishany.android.core.sync.SyncEngine
import com.nishany.android.core.sync.SyncStatus
import com.nishany.android.core.ui.EmptyConfig
import com.nishany.android.core.ui.UiState
import java.time.Instant
import kotlinx.coroutines.CancellationException
import kotlinx.coroutines.cancel
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.SharingStarted
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.combine
import kotlinx.coroutines.flow.flowOf
import kotlinx.coroutines.flow.map
import kotlinx.coroutines.flow.stateIn
import kotlinx.coroutines.launch
import kotlinx.coroutines.sync.Mutex
import kotlinx.coroutines.sync.withLock
import kotlinx.serialization.builtins.ListSerializer

/**
 * The student's Notebook (parity item G7): a flat list of notes, synced
 * through [NOTEBOOK_KEY] -- the same document `src/pages/student/Notebook.tsx`
 * reads and writes, so a note written here shows up on the web and vice
 * versa. See [com.nishany.android.core.notebook.Note]'s own doc for what this
 * app deliberately does not model (rich text, drawings, attachments).
 *
 * Follows [com.nishany.android.feature.practical.PracticalViewModel]'s
 * read-fold-write idiom: every mutation is serialised through [mutation],
 * reads the document fresh (never off [notes], which is an eagerly-collected
 * [StateFlow] a sibling instance's own write may not have reached yet), and
 * survives a decode failure by reporting [saveFailed] rather than crashing.
 */
class NotebookViewModel(
    private val store: LocalStore,
    private val sync: SyncEngine,
    connectivity: ConnectivityMonitor? = null,
) : ViewModel() {
    private val backgroundScope = backgroundWorkScope("NotebookViewModel")
    private val mutation = Mutex()
    private val serializer = ListSerializer(Note.serializer())

    private val notes: StateFlow<List<Note>?> = store.documentFlow(NOTEBOOK_KEY)
        .map { doc -> doc?.json?.let { decode(it) } }
        .stateIn(backgroundScope, SharingStarted.Eagerly, null)

    /**
     * `null` (not yet synced) and an empty list are different things here --
     * see [notebookUiState]: only a completed sync that found nothing is a
     * genuine [UiState.Empty].
     */
    val uiState: StateFlow<UiState<List<Note>>> =
        combine(notes, sync.status, connectivity?.isOnline ?: flowOf(true)) { current, status, online ->
            notebookUiState(current, status, online, retry = ::retrySync)
        }.stateIn(backgroundScope, SharingStarted.Eagerly, UiState.Loading)

    private val _saveFailed = MutableStateFlow(false)
    val saveFailed: StateFlow<Boolean> = _saveFailed.asStateFlow()

    fun createNote(title: String, body: String) {
        val id = "note-${millisBase36()}"
        mutate { current -> addNote(current, title, body, id, nowIso()).first }
    }

    fun updateNote(id: String, title: String, body: String) {
        mutate { current -> editNote(current, id, title, body, nowIso()) }
    }

    fun deleteNote(id: String) {
        mutate { current -> removeNote(current, id) }
    }

    /** Reads the document fresh, folds [transform] over it, and writes the whole list back -- see the class doc. */
    private fun mutate(transform: (List<Note>) -> List<Note>) {
        backgroundScope.launch {
            mutation.withLock {
                try {
                    val current = loadNotes()
                    val updated = transform(current)
                    sync.write(NOTEBOOK_KEY, CortexJson.encodeToString(serializer, updated))
                } catch (e: CancellationException) {
                    throw e
                } catch (e: Exception) {
                    Log.e(BACKGROUND_WORK_TAG, "NotebookViewModel: a student's change was not saved", e)
                    _saveFailed.value = true
                }
            }
        }
    }

    private suspend fun loadNotes(): List<Note> =
        store.document(NOTEBOOK_KEY)?.json?.let { decode(it) } ?: emptyList()

    private fun decode(json: String): List<Note>? = runCatching { CortexJson.decodeFromString(serializer, json) }.getOrNull()

    fun acknowledgeSaveFailure() {
        _saveFailed.value = false
    }

    private fun retrySync() {
        backgroundScope.launch { sync.refresh() }
    }

    private fun nowIso(): String = Instant.now().toString()

    private fun millisBase36(): String = java.lang.Long.toString(System.currentTimeMillis(), 36)

    override fun onCleared() {
        backgroundScope.cancel()
    }

    companion object {
        fun factory(store: LocalStore, sync: SyncEngine, connectivity: ConnectivityMonitor) = viewModelFactory {
            initializer { NotebookViewModel(store, sync, connectivity) }
        }
    }
}

/**
 * The pure fold behind [NotebookViewModel.uiState]. `null` means "no document
 * has come back from a sync pass yet" (still loading, unless the sync itself
 * failed); an empty list only reads as [UiState.Empty] once a pass has
 * actually completed, matching [com.nishany.android.feature.practical.practicalUiState]'s
 * reasoning for the same distinction.
 */
internal fun notebookUiState(
    notes: List<Note>?,
    syncStatus: SyncStatus,
    isOnline: Boolean,
    retry: () -> Unit,
): UiState<List<Note>> = when {
    !notes.isNullOrEmpty() -> UiState.Content(sortNotes(notes))
    syncStatus is SyncStatus.Failed -> UiState.Error(
        message = if (isOnline) {
            "Couldn't reach Nishany. Check your connection and try again."
        } else {
            "You're offline. Connect and try again."
        },
        retry = retry,
    )
    syncStatus is SyncStatus.Done -> UiState.Empty(
        EmptyConfig(
            title = "Your notebook is empty",
            description = "Write your first note with the + button below.",
        ),
    )
    notes != null -> UiState.Empty(
        EmptyConfig(
            title = "Your notebook is empty",
            description = "Write your first note with the + button below.",
        ),
    )
    else -> UiState.Loading
}
