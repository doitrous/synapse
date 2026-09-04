package com.synapse.android.feature.taxonomy

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewmodel.initializer
import androidx.lifecycle.viewmodel.viewModelFactory
import com.synapse.android.core.CortexJson
import com.synapse.android.core.backgroundWorkScope
import com.synapse.android.core.cache.LocalStore
import com.synapse.android.core.taxonomy.GLOSSARY_KEY
import com.synapse.android.core.taxonomy.GlossaryDoc
import com.synapse.android.core.taxonomy.MedicalTerm
import com.synapse.android.core.taxonomy.TAXONOMY_TREE_KEY
import com.synapse.android.core.taxonomy.TaxSystem
import com.synapse.android.core.taxonomy.filterGlossary
import com.synapse.android.core.taxonomy.filterTaxonomy
import com.synapse.android.core.ui.EmptyConfig
import com.synapse.android.core.ui.UiState
import kotlinx.coroutines.cancel
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.SharingStarted
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.combine
import kotlinx.coroutines.flow.map
import kotlinx.coroutines.flow.stateIn
import kotlinx.coroutines.flow.update
import kotlinx.serialization.builtins.ListSerializer

/** Which of the two catalogue documents [TerminologyScreen] shows. */
enum class TerminologyTab { GLOSSARY, CURRICULUM }

/** A term list, already filtered by [TerminologyViewModel.query] and [TerminologyViewModel.category]. */
data class GlossaryUi(val categories: List<String>, val category: String?, val terms: List<MedicalTerm>)

/**
 * Medical Terminology & Taxonomy (parity item G11): browse/search over the
 * two admin-written catalogue documents Milestone 1 already syncs
 * ([GLOSSARY_KEY], [TAXONOMY_TREE_KEY]) -- pure UI, no [com.synapse.android.core.sync.SyncEngine.USER_STATE_KEYS]
 * change, since a student never edits either. Glossary is the primary tab: it
 * is what `MedicalTerminology.tsx` (the web's actual student-facing page,
 * still routed at its old name `MedicalTaxonomy`) shows. No student surface
 * on any client browses the curriculum tree directly -- it is authoring
 * structure questions and articles tag against -- so Curriculum here is a
 * secondary, read-only browse, not a port of any one web screen.
 */
class TerminologyViewModel(store: LocalStore) : ViewModel() {
    private val backgroundScope = backgroundWorkScope("TerminologyViewModel")

    private val glossaryDoc: StateFlow<GlossaryDoc?> = store.documentFlow(GLOSSARY_KEY)
        .map { doc -> doc?.json?.let { runCatching { CortexJson.decodeFromString(GlossaryDoc.serializer(), it) }.getOrNull() } }
        .stateIn(backgroundScope, SharingStarted.Eagerly, null)

    private val taxonomyTree: StateFlow<List<TaxSystem>?> = store.documentFlow(TAXONOMY_TREE_KEY)
        .map { doc -> doc?.json?.let { runCatching { CortexJson.decodeFromString(ListSerializer(TaxSystem.serializer()), it) }.getOrNull() } }
        .stateIn(backgroundScope, SharingStarted.Eagerly, null)

    private val _tab = MutableStateFlow(TerminologyTab.GLOSSARY)
    val tab: StateFlow<TerminologyTab> = _tab.asStateFlow()

    private val _query = MutableStateFlow("")
    val query: StateFlow<String> = _query.asStateFlow()

    private val _category = MutableStateFlow<String?>(null)
    val category: StateFlow<String?> = _category.asStateFlow()

    val glossaryUiState: StateFlow<UiState<GlossaryUi>> =
        combine(glossaryDoc, _query, _category) { doc, query, category ->
            glossaryUiState(doc, query, category)
        }.stateIn(backgroundScope, SharingStarted.Eagerly, UiState.Loading)

    val taxonomyUiState: StateFlow<UiState<List<TaxSystem>>> =
        combine(taxonomyTree, _query) { tree, query -> taxonomyUiState(tree, query) }
            .stateIn(backgroundScope, SharingStarted.Eagerly, UiState.Loading)

    fun selectTab(next: TerminologyTab) {
        _tab.value = next
    }

    fun setQuery(next: String) {
        _query.value = next
    }

    fun selectCategory(next: String?) {
        _category.update { if (it == next) null else next }
    }

    override fun onCleared() {
        backgroundScope.cancel()
    }

    companion object {
        fun factory(store: LocalStore) = viewModelFactory {
            initializer { TerminologyViewModel(store) }
        }
    }
}

internal fun glossaryUiState(doc: GlossaryDoc?, query: String, category: String?): UiState<GlossaryUi> {
    if (doc == null) return UiState.Loading
    if (doc.terms.isEmpty()) {
        return UiState.Empty(EmptyConfig(title = "No glossary yet", description = "Terms appear here once your course publishes them."))
    }
    val filtered = filterGlossary(doc.terms, category, query)
    val categories = doc.categories.map { it.key }.ifEmpty { doc.terms.map { it.category }.distinct() }
    return UiState.Content(GlossaryUi(categories = categories, category = category, terms = filtered))
}

internal fun taxonomyUiState(tree: List<TaxSystem>?, query: String): UiState<List<TaxSystem>> {
    if (tree == null) return UiState.Loading
    if (tree.isEmpty()) {
        return UiState.Empty(EmptyConfig(title = "No curriculum tree yet", description = "The curriculum structure appears here once it's published."))
    }
    return UiState.Content(filterTaxonomy(tree, query))
}
