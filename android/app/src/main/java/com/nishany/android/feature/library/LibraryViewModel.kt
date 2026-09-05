package com.nishany.android.feature.library

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import androidx.lifecycle.viewmodel.initializer
import androidx.lifecycle.viewmodel.viewModelFactory
import com.nishany.android.core.cache.LocalStore
import com.nishany.android.core.library.ArticleCard
import com.nishany.android.core.library.ArticleProjection
import com.nishany.android.core.library.EvidenceIndex
import com.nishany.android.core.library.LibraryAtlas
import com.nishany.android.core.library.LibraryResource
import com.nishany.android.core.library.ResourceGrouping
import com.nishany.android.core.library.ResourceProjection
import com.nishany.android.core.model.ContentKind
import com.nishany.android.core.sync.SyncEngine
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.first
import kotlinx.coroutines.launch

/** What the Library screen is showing. */
sealed interface LibraryUiState {
    data object Loading : LibraryUiState

    /** The cache could not be opened at all -- distinct from an empty-but-readable cache. */
    data class Error(val message: String) : LibraryUiState

    data class Loaded(
        /** Every published resource, already tagged with whether it is openable. */
        val resources: List<LibraryResource>,
        val atlas: LibraryAtlas,
        val articlesById: Map<String, ArticleCard>,
        /** Set when the shelf is empty, saying which kind of empty it is. */
        val resourcesEmptyReason: String?,
        /** Set when the taxonomy is empty. */
        val libraryEmptyReason: String?,
    ) : LibraryUiState
}

/**
 * The Library and Resources surfaces.
 *
 * Reads the cache, never the network -- [SyncEngine] keeps the cache current
 * and [RootScreen] refreshes it on every foreground. This turns two synced
 * catalogue documents plus the content ledger into something the screen can
 * browse:
 *  - the resource shelf: ledger `resource` rows ([ResourceProjection]) tagged
 *    for openability by the published-evidence catalogue ([EvidenceIndex],
 *    `synapse-medical-evidence-published-v1`);
 *  - the medical library taxonomy: `synapse-medical-library-taxonomy-v1`
 *    ([LibraryAtlas]) with ledger `article` rows hung off the branches they
 *    were placed on.
 *
 * Both catalogue keys are already in [SyncEngine.CATALOGUE_KEYS]; nothing here
 * fetches them.
 *
 * A one-shot [load] on entry, re-run when a sync completes -- mirroring iOS
 * `LibraryView`/`ResourcesView`, whose first read lands on an empty cache
 * before the first refresh returns.
 */
class LibraryViewModel(
    private val store: LocalStore,
) : ViewModel() {

    private val _state = MutableStateFlow<LibraryUiState>(LibraryUiState.Loading)
    val state: StateFlow<LibraryUiState> = _state.asStateFlow()

    private val _query = MutableStateFlow("")
    val query: StateFlow<String> = _query.asStateFlow()

    // TODO: the web/iOS clients persist this per device (`synapse.resources.groupBy`).
    // Kept in memory for this first pass -- it survives rotation with the ViewModel.
    private val _grouping = MutableStateFlow(ResourceGrouping.CHAPTER)
    val grouping: StateFlow<ResourceGrouping> = _grouping.asStateFlow()

    fun setQuery(value: String) {
        _query.value = value
    }

    fun setGrouping(value: ResourceGrouping) {
        _grouping.value = value
    }

    fun load() {
        viewModelScope.launch {
            _state.value = LibraryUiState.Loading
            try {
                val resourceItems = store.ledgerItems(ContentKind.RESOURCE).first().filter { it.isStudentVisible }
                val articleItems = store.ledgerItems(ContentKind.ARTICLE).first().filter { it.isStudentVisible }

                val evidence = EvidenceIndex.decode(store.document(EVIDENCE_KEY)?.json)
                val resources = evidence.applyTo(resourceItems.mapNotNull(ResourceProjection::project))
                    .sortedBy { it.title.lowercase() }

                val articles = articleItems.mapNotNull(ArticleProjection::projectCard)
                val atlas = LibraryAtlas.build(store.document(TAXONOMY_KEY)?.json, articles)

                _state.value = LibraryUiState.Loaded(
                    resources = resources,
                    atlas = atlas,
                    articlesById = articles.associateBy { it.id },
                    resourcesEmptyReason = if (resources.isEmpty()) EMPTY_RESOURCES else null,
                    libraryEmptyReason = if (articles.isEmpty()) EMPTY_LIBRARY else null,
                )
            } catch (e: Exception) {
                _state.value = LibraryUiState.Error("The library could not be opened on this device.")
            }
        }
    }

    companion object {
        /** From [SyncEngine.CATALOGUE_KEYS] -- both are already synced; see the class doc. */
        private const val EVIDENCE_KEY = "synapse-medical-evidence-published-v1"
        private const val TAXONOMY_KEY = "synapse-medical-library-taxonomy-v1"

        private const val EMPTY_RESOURCES =
            "No resources have downloaded yet. Pull to refresh once you have a connection, or check back once your year's shelf is published."
        private const val EMPTY_LIBRARY =
            "No library articles have downloaded yet. Pull to refresh once you have a connection."

        fun factory(store: LocalStore, sync: SyncEngine) = viewModelFactory {
            initializer { LibraryViewModel(store) }
        }
    }
}
