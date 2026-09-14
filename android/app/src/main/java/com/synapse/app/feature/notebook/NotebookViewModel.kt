package com.synapse.app.feature.notebook

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.synapse.app.core.notebook.Note
import com.synapse.app.core.notebook.NoteBlock
import com.synapse.app.core.notebook.ensureNotebookEditor
import com.synapse.app.core.notebook.toEditorJson
import com.synapse.app.core.notebook.toPlainText
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.Job
import kotlinx.coroutines.delay
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch
import java.time.Instant
import javax.inject.Inject

/**
 * Long enough that typing a sentence is one write, short enough that a pause
 * to think has already saved. Same value and same reasoning as
 * `EssaysViewModel.DRAFT_DEBOUNCE_MS` — ported from web's `WRITE_DEBOUNCE_MS`.
 */
private const val DRAFT_DEBOUNCE_MS = 400L

/** What [NotebookScreen] renders. */
sealed interface NotebookUiState {
    data object Loading : NotebookUiState

    data class Content(
        /** Newest-edited first. */
        val notes: List<Note>,
        val selectedId: String?,
    ) : NotebookUiState
}

/**
 * Drives the Notebook surface: loads the student's own notes, then owns
 * creating, editing, tagging and deleting them — a thin pass-through to
 * [NotebookRepository].
 *
 * Title/body edits update [uiState] immediately (a text field never lags
 * behind typing) and persist after [DRAFT_DEBOUNCE_MS] of no further typing —
 * one job per note id, replaced on every keystroke, mirroring
 * `EssaysViewModel`'s draft debounce. Structural edits (tags, delete, new
 * note) persist immediately.
 */
@HiltViewModel
class NotebookViewModel @Inject constructor(
    private val repository: NotebookRepository,
) : ViewModel() {

    var now: () -> Instant = Instant::now

    private val _uiState = MutableStateFlow<NotebookUiState>(NotebookUiState.Loading)
    val uiState: StateFlow<NotebookUiState> = _uiState.asStateFlow()

    private val draftJobs = mutableMapOf<String, Job>()

    init {
        load()
    }

    fun load() {
        viewModelScope.launch {
            if (_uiState.value !is NotebookUiState.Content) {
                _uiState.value = NotebookUiState.Loading
            }
            // Migrate any note still missing editorJson/plainText (e.g. synced fresh from
            // iOS, which never writes those fields at all) before it is ever displayed —
            // mirrors web's load-time useEffect over `ensureNotebookEditor`. The migrated
            // shape is written back the first time the note itself is edited; a bare read
            // never forces an extra write.
            val notes = repository.notes().map(::ensureNotebookEditor).sortedByDescending { it.updatedAt }
            val previousSelection = (_uiState.value as? NotebookUiState.Content)?.selectedId
            _uiState.value = NotebookUiState.Content(
                notes = notes,
                selectedId = previousSelection?.takeIf { id -> notes.any { it.id == id } },
            )
        }
    }

    fun selectNote(id: String?) {
        updateContent { it.copy(selectedId = id) }
    }

    /** Create a blank note and select it. Persists immediately, same as web/iOS's "new note" action. */
    fun newNote() {
        val id = "nb${now().toEpochMilli()}"
        val note = ensureNotebookEditor(Note(id = id, updatedAt = now().toString()))
        val current = _uiState.value as? NotebookUiState.Content ?: NotebookUiState.Content(emptyList(), null)
        _uiState.value = current.copy(notes = listOf(note) + current.notes, selectedId = id)
        persistNow(id)
    }

    fun deleteNote(id: String) {
        draftJobs.remove(id)?.cancel()
        val current = _uiState.value as? NotebookUiState.Content
        val remaining = current?.notes.orEmpty().filterNot { it.id == id }
        _uiState.value = NotebookUiState.Content(
            notes = remaining,
            selectedId = current?.selectedId?.takeIf { it != id },
        )
        viewModelScope.launch { repository.delete(id, now()) }
    }

    fun updateTitle(id: String, title: String) {
        updateLocal(id) { it.copy(title = title) }
        schedulePersist(id)
    }

    /** The block editor's content changed. Re-encodes to the Lexical-shaped JSON web/iOS read, same debounce as title edits. */
    fun updateBlocks(id: String, blocks: List<NoteBlock>) {
        updateLocal(id) { it.copy(editorJson = blocks.toEditorJson(), plainText = blocks.toPlainText()) }
        schedulePersist(id)
    }

    fun addTag(id: String, tag: String) {
        val trimmed = tag.trim()
        if (trimmed.isEmpty()) return
        updateLocal(id) { note ->
            if (note.tags.any { it.equals(trimmed, ignoreCase = true) }) note else note.copy(tags = note.tags + trimmed)
        }
        persistNow(id)
    }

    fun removeTag(id: String, tag: String) {
        updateLocal(id) { it.copy(tags = it.tags.filterNot { existing -> existing == tag }) }
        persistNow(id)
    }

    private fun updateContent(transform: (NotebookUiState.Content) -> NotebookUiState.Content) {
        val current = _uiState.value as? NotebookUiState.Content ?: return
        _uiState.value = transform(current)
    }

    /** Applies [transform] to note [id] in-memory, bumping `revision` — matching web's `update()` helper. `updatedAt` is stamped only at actual persistence, not on every keystroke. */
    private fun updateLocal(id: String, transform: (Note) -> Note) {
        val current = _uiState.value as? NotebookUiState.Content ?: return
        val next = current.notes.map { entry ->
            if (entry.id != id) return@map entry
            val ensured = ensureNotebookEditor(entry)
            transform(ensured).copy(revision = (ensured.revision ?: 1) + 1)
        }
        _uiState.value = current.copy(notes = next)
    }

    private fun schedulePersist(id: String) {
        draftJobs[id]?.cancel()
        draftJobs[id] = viewModelScope.launch {
            delay(DRAFT_DEBOUNCE_MS)
            persist(id)
        }
    }

    private fun persistNow(id: String) {
        draftJobs.remove(id)?.cancel()
        viewModelScope.launch { persist(id) }
    }

    private suspend fun persist(id: String) {
        val note = (_uiState.value as? NotebookUiState.Content)?.notes?.firstOrNull { it.id == id } ?: return
        repository.save(note, now())
    }
}
