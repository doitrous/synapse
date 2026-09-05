package com.synapse.android.feature.reader

import android.util.Log
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import androidx.lifecycle.viewmodel.initializer
import androidx.lifecycle.viewmodel.viewModelFactory
import com.synapse.android.core.BACKGROUND_WORK_TAG
import com.synapse.android.core.CortexJson
import com.synapse.android.core.backgroundWorkScope
import com.synapse.android.core.cache.LocalStore
import com.synapse.android.core.library.LibraryMark
import com.synapse.android.core.library.LibraryMarkStore
import com.synapse.android.core.library.LibraryMarks
import com.synapse.android.core.library.TextRange
import com.synapse.android.core.model.ContentKind
import com.synapse.android.core.reader.Article
import com.synapse.android.core.reader.ArticleReaderProjection
import com.synapse.android.core.reader.ReaderEvidence
import com.synapse.android.core.sync.SyncEngine
import com.synapse.android.core.ui.UiState
import java.time.Instant
import kotlinx.coroutines.CancellationException
import kotlinx.coroutines.cancel
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.SharingStarted
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.first
import kotlinx.coroutines.flow.map
import kotlinx.coroutines.flow.stateIn
import kotlinx.coroutines.launch
import kotlinx.coroutines.sync.Mutex
import kotlinx.coroutines.sync.withLock
import kotlinx.serialization.builtins.ListSerializer
import kotlinx.serialization.builtins.MapSerializer
import kotlinx.serialization.builtins.serializer

/**
 * The article Reader, plus a student's own highlights and sticky notes on it.
 *
 * Reads the article body from the cache, never the network -- see the
 * original class doc kept below on [load]. Marks are the one thing this
 * screen writes: [LibraryMarks.storageKey] (`nishany.library.marks.v1`), the
 * same document the website and the iPhone read and write, via
 * [com.synapse.android.core.sync.SyncEngine.write] like every other synced
 * surface.
 *
 * Follows [com.synapse.android.feature.notebook.NotebookViewModel]'s
 * read-fold-write idiom for the marks document: every mutation is serialised
 * through [mutation], reads the document fresh (never off [marksStore], an
 * eagerly-collected [StateFlow] a write this same call just made may not
 * have reached yet), and survives a decode failure by reporting [saveFailed]
 * rather than crashing -- see [com.synapse.android.core.BackgroundWork]'s
 * doc for why that crash is a real path.
 *
 * A port of iOS `Features/Library/ArticleReaderView.swift` +
 * `Core/Library/LibraryMark.swift`.
 */
class ArticleReaderViewModel(
    private val store: LocalStore,
    private val sync: SyncEngine,
) : ViewModel() {
    private val backgroundScope = backgroundWorkScope("ArticleReaderViewModel")

    /** Serialises the marks document's read-fold-write path -- see the class doc. */
    private val mutation = Mutex()
    private val marksSerializer = MapSerializer(String.serializer(), ListSerializer(LibraryMark.serializer()))

    private val _state = MutableStateFlow<UiState<Article>>(UiState.Loading)
    val state: StateFlow<UiState<Article>> = _state.asStateFlow()

    /** Every mark on every article, live -- what [LibraryMarks.place] renders over the prose. */
    val marksStore: StateFlow<LibraryMarkStore> = store.documentFlow(LibraryMarks.storageKey)
        .map { doc -> doc?.json?.let(::decodeMarks) ?: emptyMap() }
        .stateIn(backgroundScope, SharingStarted.Eagerly, emptyMap())

    /** Set when a highlight or note the student made did not reach the disk -- see [PracticalViewModel.saveFailed]'s reasoning for the same field. */
    private val _saveFailed = MutableStateFlow(false)
    val saveFailed: StateFlow<Boolean> = _saveFailed.asStateFlow()

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

    /**
     * Anchors [range] of [blockText] (block [blockId]) and adds a new mark for
     * it -- a highlight in [tone], or a sticky note once [onCreated] fills in
     * text. A no-op if the range does not anchor (empty or out of bounds; see
     * [LibraryMarks.makeAnchor]).
     *
     * [onCreated] runs with the new mark as soon as it is queued to write --
     * not once the write actually lands, unlike iOS's `await`ed
     * `library.addMark`. The mark is enqueued through [LocalStore]'s outbox
     * either way (see [SyncEngine.write]), so this only changes how soon the
     * caller can open a note editor for it, never whether the highlight is
     * kept.
     */
    fun addMark(
        articleId: String,
        blockId: String,
        blockText: String,
        range: TextRange,
        tone: String,
        onCreated: (LibraryMark) -> Unit = {},
    ) {
        val anchor = LibraryMarks.makeAnchor(blockId, blockText, range.start, range.end) ?: return
        val mark = LibraryMark(
            id = LibraryMarks.newMarkId(),
            articleId = articleId,
            anchor = anchor,
            tone = tone,
            note = "",
            createdAt = Instant.now().toString(),
        )
        mutate { current -> LibraryMarks.upsert(current, mark) }
        onCreated(mark)
    }

    /** Changes a mark's tone and/or note. */
    fun updateMark(mark: LibraryMark) {
        mutate { current -> LibraryMarks.upsert(current, mark) }
    }

    fun removeMark(articleId: String, markId: String) {
        mutate { current -> LibraryMarks.remove(current, articleId, markId) }
    }

    fun acknowledgeSaveFailure() {
        _saveFailed.value = false
    }

    /** Reads the marks document fresh, folds [transform] over it, and writes the whole document back -- see the class doc. */
    private fun mutate(transform: (LibraryMarkStore) -> LibraryMarkStore) {
        backgroundScope.launch {
            mutation.withLock {
                try {
                    val current = loadMarks()
                    val updated = transform(current)
                    sync.write(LibraryMarks.storageKey, CortexJson.encodeToString(marksSerializer, updated))
                } catch (e: CancellationException) {
                    throw e
                } catch (e: Exception) {
                    Log.e(BACKGROUND_WORK_TAG, "ArticleReaderViewModel: a student's mark was not saved", e)
                    _saveFailed.value = true
                }
            }
        }
    }

    private suspend fun loadMarks(): LibraryMarkStore =
        store.document(LibraryMarks.storageKey)?.json?.let { CortexJson.decodeFromString(marksSerializer, it) } ?: emptyMap()

    private fun decodeMarks(json: String): LibraryMarkStore? =
        runCatching { CortexJson.decodeFromString(marksSerializer, json) }.getOrNull()

    override fun onCleared() {
        backgroundScope.cancel()
    }

    companion object {
        /** From [com.synapse.android.core.sync.SyncEngine.CATALOGUE_KEYS] -- already synced. */
        private const val EVIDENCE_KEY = "synapse-medical-evidence-published-v1"
        private const val ARTICLE_GONE = "This article is no longer available."

        fun factory(store: LocalStore, sync: SyncEngine) = viewModelFactory {
            initializer { ArticleReaderViewModel(store, sync) }
        }
    }
}
