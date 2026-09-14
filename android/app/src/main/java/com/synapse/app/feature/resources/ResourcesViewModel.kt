package com.synapse.app.feature.resources

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.synapse.app.core.resources.MedicalResource
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch
import java.io.File
import java.time.Instant
import javax.inject.Inject
import kotlin.coroutines.cancellation.CancellationException

/** What [com.synapse.app.feature.resources.ResourcesScreen] renders. */
sealed interface ResourcesUiState {
    data object Loading : ResourcesUiState

    data class Content(
        /** Every published, in-scope resource. */
        val resources: List<MedicalResource>,
        /** Resource ids this student has saved. */
        val bookmarkedIds: Set<String>,
        /** Whichever document is currently open in the reader pane, if any. */
        val reader: ReaderState = ReaderState.Closed,
    ) : ResourcesUiState
}

/** The document reader pane's own state, independent of catalogue filtering. */
sealed interface ReaderState {
    data object Closed : ReaderState
    data class Downloading(val resourceId: String) : ReaderState
    data class Ready(val resourceId: String, val file: File, val mediaType: String) : ReaderState
    data class Failed(val resourceId: String, val message: String) : ReaderState
}

/**
 * Drives the Resources surface: loads the catalogue and the student's saved
 * ids, then owns save/unsave and opening a document — a thin pass-through to
 * [ResourcesRepository], reloading afterward so [uiState] always reflects the
 * latest write. Mirrors `com.synapse.app.feature.library.LibraryViewModel`'s
 * load-on-mutate shape; the reader pane's own state is held separately from
 * that reload so downloading a document doesn't re-fetch the whole catalogue.
 */
@HiltViewModel
class ResourcesViewModel @Inject constructor(
    private val repository: ResourcesRepository,
) : ViewModel() {

    var now: () -> Instant = Instant::now

    private val _uiState = MutableStateFlow<ResourcesUiState>(ResourcesUiState.Loading)
    val uiState: StateFlow<ResourcesUiState> = _uiState.asStateFlow()

    init {
        load()
    }

    fun load() {
        viewModelScope.launch {
            val currentReader = (_uiState.value as? ResourcesUiState.Content)?.reader ?: ReaderState.Closed
            if (_uiState.value !is ResourcesUiState.Content) {
                _uiState.value = ResourcesUiState.Loading
            }
            _uiState.value = buildContent(currentReader)
        }
    }

    private suspend fun buildContent(reader: ReaderState): ResourcesUiState.Content =
        ResourcesUiState.Content(
            resources = repository.resources(),
            bookmarkedIds = repository.bookmarks(),
            reader = reader,
        )

    fun toggleBookmark(resourceId: String) {
        viewModelScope.launch {
            repository.toggleBookmark(resourceId, now())
            val reader = (_uiState.value as? ResourcesUiState.Content)?.reader ?: ReaderState.Closed
            _uiState.value = buildContent(reader)
        }
    }

    /** Download (if needed) and open [resource] in the reader pane. */
    fun openResource(resource: MedicalResource) {
        setReader(ReaderState.Downloading(resource.id))
        viewModelScope.launch {
            try {
                val file = repository.ensureDownloaded(resource.id)
                setReader(ReaderState.Ready(resource.id, file, resource.mediaType ?: "pdf"))
            } catch (e: CancellationException) {
                throw e
            } catch (e: Exception) {
                setReader(ReaderState.Failed(resource.id, "That file could not be opened. It may still be uploading."))
            }
        }
    }

    fun closeReader() = setReader(ReaderState.Closed)

    /** Drop the on-device copy and close the reader — matches iOS's "Remove download". */
    fun removeDownload(resourceId: String) {
        repository.removeDownload(resourceId)
        closeReader()
    }

    private fun setReader(reader: ReaderState) {
        val current = _uiState.value
        if (current is ResourcesUiState.Content) _uiState.value = current.copy(reader = reader)
    }
}
