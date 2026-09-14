package com.synapse.app.feature.shares

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.synapse.app.core.api.MyDocument
import com.synapse.app.core.api.ShareDetail
import com.synapse.app.core.api.ShareSummary
import com.synapse.app.core.notebook.Note
import com.synapse.app.core.shares.ShareAccess
import com.synapse.app.core.shares.ShareKind
import com.synapse.app.core.shares.boardShareHandle
import com.synapse.app.core.shares.noteShareHandle
import com.synapse.app.core.shares.sharedBoardState
import com.synapse.app.core.shares.sharedNoteText
import com.synapse.app.core.whiteboard.BoardState
import com.synapse.app.core.whiteboard.WhiteboardDocument
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.CancellationException
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch
import kotlinx.serialization.json.Json
import java.io.File
import java.time.Instant
import javax.inject.Inject

/** What [SharesRoute] renders. */
sealed interface SharesUiState {
    data object Loading : SharesUiState

    data class Content(
        val documents: List<MyDocument> = emptyList(),
        val usedBytes: Long = 0,
        val quotaBytes: Long = 0,
        val myShares: List<ShareSummary> = emptyList(),
        val discoverableShares: List<ShareSummary> = emptyList(),
        /** This student's own notes/boards, for the "share one of my things" picker — see [SharesRepository.shareableNotes]/[SharesRepository.shareableBoards]. */
        val shareableNotes: List<Note> = emptyList(),
        val shareableBoards: List<WhiteboardDocument> = emptyList(),
        /** Local handle (`note:<id>`/`board:<id>`) -> live share id, so the picker can mark what's already shared. */
        val shareIndex: Map<String, String> = emptyMap(),
        val documentReader: DocumentReaderState = DocumentReaderState.Closed,
        val sharedReader: SharedReaderState = SharedReaderState.Closed,
        /** Set once, on the load or refresh that failed; cleared by the next successful one. */
        val error: String? = null,
    ) : SharesUiState
}

/** The My Documents reader pane's own state, independent of the list. Mirrors `feature.resources.ReaderState`. */
sealed interface DocumentReaderState {
    data object Closed : DocumentReaderState
    data class Downloading(val documentId: String) : DocumentReaderState
    data class Ready(val documentId: String, val file: File, val mediaType: String) : DocumentReaderState
    data class Failed(val documentId: String, val message: String) : DocumentReaderState
}

/** A shared document (opened by id, from either share list) being read. */
sealed interface SharedReaderState {
    data object Closed : SharedReaderState
    data class Loading(val shareId: String) : SharedReaderState
    data class NoteReady(val share: ShareDetail, val text: String) : SharedReaderState
    data class BoardReady(val share: ShareDetail, val board: BoardState) : SharedReaderState
    data class Failed(val shareId: String, val message: String) : SharedReaderState
}

private const val LOAD_FAILURE = "Your documents and shares could not be loaded. Check your connection and try again."
private const val ACTION_FAILURE = "That could not be completed. Check your connection and try again."

/**
 * Drives [SharesRoute]: My Documents (list/rename/delete/download-and-open,
 * plus the basic upload path — see [SharesRepository.uploadDocument]'s doc
 * comment) and Shares (mine + discoverable, star/follow/delete, publishing a
 * local note or board, and opening a shared document read-only).
 *
 * **Deferred, documented rather than missing by oversight:** editing the
 * *content* of an already-published share from this surface (web's
 * `SharedDocument.tsx` "Edit"/"Save changes") and a revision-history view
 * (`GET /api/shares/:id/revisions`) — the brief's priority list is list/open/
 * create/star/follow/delete, and a shared board already renders read-only via
 * [SharedBoardCanvas] reusing `core.whiteboard`'s geometry. Re-publishing from
 * the picker (edit locally in Notebook/Whiteboard, then Share again) remains
 * the way to update a share's content in this MVP.
 */
@HiltViewModel
class SharesViewModel @Inject constructor(
    private val repository: SharesRepository,
    private val json: Json,
) : ViewModel() {

    var now: () -> Instant = Instant::now

    private val _uiState = MutableStateFlow<SharesUiState>(SharesUiState.Loading)
    val uiState: StateFlow<SharesUiState> = _uiState.asStateFlow()

    init {
        load()
    }

    fun load() {
        viewModelScope.launch {
            val documentReader = (_uiState.value as? SharesUiState.Content)?.documentReader ?: DocumentReaderState.Closed
            val sharedReader = (_uiState.value as? SharesUiState.Content)?.sharedReader ?: SharedReaderState.Closed
            if (_uiState.value !is SharesUiState.Content) _uiState.value = SharesUiState.Loading
            _uiState.value = buildContent(documentReader, sharedReader)
        }
    }

    private suspend fun buildContent(documentReader: DocumentReaderState, sharedReader: SharedReaderState): SharesUiState.Content = try {
        val documents = repository.myDocuments()
        val mine = repository.myShares()
        val discoverable = repository.discoverableShares()
        SharesUiState.Content(
            documents = documents.items,
            usedBytes = documents.usedBytes,
            quotaBytes = documents.quotaBytes,
            myShares = mine,
            discoverableShares = discoverable,
            shareableNotes = repository.shareableNotes(),
            shareableBoards = repository.shareableBoards(now()),
            shareIndex = repository.shareIndex(),
            documentReader = documentReader,
            sharedReader = sharedReader,
        )
    } catch (e: CancellationException) {
        throw e
    } catch (e: Exception) {
        val current = _uiState.value as? SharesUiState.Content
        current?.copy(error = LOAD_FAILURE) ?: SharesUiState.Content(error = LOAD_FAILURE)
    }

    private fun refresh() {
        viewModelScope.launch {
            val documentReader = (_uiState.value as? SharesUiState.Content)?.documentReader ?: DocumentReaderState.Closed
            val sharedReader = (_uiState.value as? SharesUiState.Content)?.sharedReader ?: SharedReaderState.Closed
            _uiState.value = buildContent(documentReader, sharedReader)
        }
    }

    // --- My Documents ---------------------------------------------------------

    fun renameDocument(id: String, title: String) {
        viewModelScope.launch {
            runAction { repository.renameDocument(id, title) }
            refresh()
        }
    }

    fun deleteDocument(id: String) {
        viewModelScope.launch {
            runAction { repository.deleteDocument(id) }
            refresh()
        }
    }

    /** Download (if needed) and open [document] in the My Documents reader pane. */
    fun openDocument(document: MyDocument) {
        setDocumentReader(DocumentReaderState.Downloading(document.id))
        viewModelScope.launch {
            try {
                val file = repository.ensureDownloaded(document.id)
                setDocumentReader(DocumentReaderState.Ready(document.id, file, document.mediaType ?: "file"))
            } catch (e: CancellationException) {
                throw e
            } catch (e: Exception) {
                setDocumentReader(DocumentReaderState.Failed(document.id, "That file could not be opened. It may still be uploading."))
            }
        }
    }

    fun closeDocumentReader() = setDocumentReader(DocumentReaderState.Closed)

    fun removeDownload(id: String) {
        repository.removeDownload(id)
        closeDocumentReader()
    }

    /**
     * Upload a new document. [readChunk] is asked for successive chunks of the
     * source — the screen supplies it from a `ContentResolver` stream over the
     * file the student picked. See [SharesRepository.uploadDocument]'s doc
     * comment for what this path deliberately does not do.
     */
    fun uploadDocument(fileName: String, mimeType: String?, sizeBytes: Long, readChunk: suspend (index: Int, chunkBytes: Int) -> ByteArray) {
        viewModelScope.launch {
            runAction { repository.uploadDocument(fileName = fileName, mimeType = mimeType, sizeBytes = sizeBytes, readChunk = readChunk) }
            refresh()
        }
    }

    // --- Shares -----------------------------------------------------------------

    fun toggleStar(share: ShareSummary) {
        viewModelScope.launch {
            runAction { repository.setStar(share.id, !share.starred) }
            refresh()
        }
    }

    fun toggleFollow(share: ShareSummary) {
        viewModelScope.launch {
            runAction { repository.setFollow(share.id, !share.following) }
            refresh()
        }
    }

    fun deleteShare(id: String) {
        viewModelScope.launch {
            runAction { repository.deleteShare(id, now()) }
            refresh()
        }
    }

    fun publishNote(note: Note, access: String = ShareAccess.VIEW) {
        viewModelScope.launch {
            runAction { repository.publishNote(note, access, now()) }
            refresh()
        }
    }

    fun publishBoard(board: WhiteboardDocument, access: String = ShareAccess.VIEW) {
        viewModelScope.launch {
            runAction { repository.publishBoard(board, access, now()) }
            refresh()
        }
    }

    /** Whether [note] already has a live share, per the local index. */
    fun isNoteShared(note: Note, state: SharesUiState.Content): Boolean = noteShareHandle(note.id) in state.shareIndex

    fun isBoardShared(board: WhiteboardDocument, state: SharesUiState.Content): Boolean = boardShareHandle(board.id) in state.shareIndex

    /** Open [shareId] (from either share list) in the shared-document reader. */
    fun openShare(shareId: String) {
        setSharedReader(SharedReaderState.Loading(shareId))
        viewModelScope.launch {
            try {
                val detail = repository.readShare(shareId)
                val reader = if (detail.kind == ShareKind.WHITEBOARD) {
                    SharedReaderState.BoardReady(detail, sharedBoardState(json, detail.payload))
                } else {
                    SharedReaderState.NoteReady(detail, sharedNoteText(detail.payload))
                }
                setSharedReader(reader)
            } catch (e: CancellationException) {
                throw e
            } catch (e: Exception) {
                setSharedReader(SharedReaderState.Failed(shareId, "This shared item could not be opened. It may have been withdrawn."))
            }
        }
    }

    fun closeSharedReader() = setSharedReader(SharedReaderState.Closed)

    // --- helpers -----------------------------------------------------------------

    private suspend fun runAction(block: suspend () -> Unit) {
        try {
            block()
        } catch (e: CancellationException) {
            throw e
        } catch (e: Exception) {
            val current = _uiState.value as? SharesUiState.Content ?: return
            _uiState.value = current.copy(error = ACTION_FAILURE)
        }
    }

    private fun setDocumentReader(reader: DocumentReaderState) {
        val current = _uiState.value
        if (current is SharesUiState.Content) _uiState.value = current.copy(documentReader = reader)
    }

    private fun setSharedReader(reader: SharedReaderState) {
        val current = _uiState.value
        if (current is SharesUiState.Content) _uiState.value = current.copy(sharedReader = reader)
    }
}
