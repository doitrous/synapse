package com.synapse.android.feature.reader

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import androidx.lifecycle.viewmodel.initializer
import androidx.lifecycle.viewmodel.viewModelFactory
import com.synapse.android.core.cache.LocalStore
import com.synapse.android.core.model.ContentKind
import com.synapse.android.core.reader.Article
import com.synapse.android.core.reader.ArticleReaderProjection
import com.synapse.android.core.reader.ReaderEvidence
import com.synapse.android.core.ui.UiState
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.first
import kotlinx.coroutines.launch

/**
 * The article Reader.
 *
 * Reads the cache, never the network -- the article body already lives in the
 * content ledger ([ContentKind.ARTICLE] rows), and the evidence gate reads the
 * published-evidence catalogue, both already synced by
 * [com.synapse.android.core.sync.SyncEngine]. So there is nothing to fetch and
 * no new user-state key: this Reader renders, it does not write. A port of the
 * article half of iOS `Features/Library/ArticleReaderView.swift`.
 *
 * A one-shot [load] on entry, like [com.synapse.android.feature.library.LibraryViewModel].
 */
class ArticleReaderViewModel(
    private val store: LocalStore,
) : ViewModel() {

    private val _state = MutableStateFlow<UiState<Article>>(UiState.Loading)
    val state: StateFlow<UiState<Article>> = _state.asStateFlow()

    fun load(articleId: String) {
        viewModelScope.launch {
            _state.value = UiState.Loading
            try {
                val articleItems = store.ledgerItems(ContentKind.ARTICLE).first().filter { it.isStudentVisible }
                // Every article a student may open, so a "read next" link
                // resolves only when it leads somewhere.
                val readableTitles = articleItems.associate { it.id to it.title }
                val evidence = ReaderEvidence.decode(store.document(EVIDENCE_KEY)?.json)

                val item = articleItems.firstOrNull { it.id == articleId }
                val article = item?.let { ArticleReaderProjection.project(it, evidence, readableTitles) }

                _state.value = if (article == null) {
                    UiState.Error(ARTICLE_GONE)
                } else {
                    UiState.Content(article)
                }
            } catch (e: Exception) {
                _state.value = UiState.Error(ARTICLE_GONE)
            }
        }
    }

    companion object {
        /** From [com.synapse.android.core.sync.SyncEngine.CATALOGUE_KEYS] -- already synced. */
        private const val EVIDENCE_KEY = "synapse-medical-evidence-published-v1"
        private const val ARTICLE_GONE = "This article is no longer available."

        fun factory(store: LocalStore) = viewModelFactory {
            initializer { ArticleReaderViewModel(store) }
        }
    }
}
