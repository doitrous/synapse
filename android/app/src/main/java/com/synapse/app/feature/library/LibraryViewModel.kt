package com.synapse.app.feature.library

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.synapse.app.core.library.LibraryArticle
import com.synapse.app.core.library.LibraryChapter
import com.synapse.app.core.library.LibraryTreeNode
import com.synapse.app.core.library.groupIntoChapters
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch
import java.time.Instant
import javax.inject.Inject

/** What [LibraryScreen] renders. */
sealed interface LibraryUiState {
    data object Loading : LibraryUiState

    data class Content(
        /** Every published article, by id — the reader and browse screens both resolve titles/bodies from here. */
        val articlesById: Map<String, LibraryArticle>,
        /** The subject/chapter shelf, always populated — every published article is reachable here even when no tree files it. */
        val chapters: List<LibraryChapter>,
        /** The admin-authored filing trees, keyed by scope (`module:<id>` / `year:<id>`). */
        val trees: Map<String, List<LibraryTreeNode>>,
        /** Article ids this student has marked read. */
        val readIds: Set<String>,
        /** Article id -> this student's own tags on it. */
        val tagsByArticle: Map<String, List<String>>,
    ) : LibraryUiState
}

/**
 * Drives [LibraryScreen]: loads the article catalogue, the filing trees, and
 * the student's own read-state and personal tags, then owns mark-as-read and
 * tagging — a thin pass-through to [LibraryRepository], reloading afterward
 * so [uiState] always reflects the latest write. Mirrors
 * `com.synapse.app.feature.flashcards.FlashcardsViewModel`'s load-on-mutate
 * shape.
 */
@HiltViewModel
class LibraryViewModel @Inject constructor(
    private val repository: LibraryRepository,
) : ViewModel() {

    var now: () -> Instant = Instant::now

    private val _uiState = MutableStateFlow<LibraryUiState>(LibraryUiState.Loading)
    val uiState: StateFlow<LibraryUiState> = _uiState.asStateFlow()

    init {
        load()
    }

    fun load() {
        viewModelScope.launch {
            if (_uiState.value !is LibraryUiState.Content) {
                _uiState.value = LibraryUiState.Loading
            }
            _uiState.value = buildContent()
        }
    }

    private suspend fun buildContent(): LibraryUiState.Content {
        val articles = repository.articles()
        return LibraryUiState.Content(
            articlesById = articles.associateBy { it.id },
            chapters = groupIntoChapters(articles),
            trees = repository.trees(),
            readIds = repository.readState().filterValues { it }.keys,
            tagsByArticle = repository.personalTags(),
        )
    }

    fun toggleRead(articleId: String) {
        viewModelScope.launch {
            repository.toggleRead(articleId, now())
            load()
        }
    }

    fun addTag(articleId: String, tag: String) {
        viewModelScope.launch {
            repository.addTag(articleId, tag, now())
            load()
        }
    }

    fun removeTag(articleId: String, tag: String) {
        viewModelScope.launch {
            repository.removeTag(articleId, tag, now())
            load()
        }
    }
}
