package com.synapse.app.feature.taxonomy

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.synapse.app.core.taxonomy.TaxonomyCatalogue
import com.synapse.app.core.taxonomy.TaxonomyGroup
import com.synapse.app.core.taxonomy.TaxonomyTerm
import com.synapse.app.core.taxonomy.groupByCategory
import com.synapse.app.core.taxonomy.searchTerms
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch
import javax.inject.Inject

/** What [TaxonomyScreen] renders. */
sealed interface TaxonomyUiState {
    data object Loading : TaxonomyUiState

    data class Content(
        /** The current search box text, echoed back so the screen stays a pure function of state. */
        val query: String,
        /** Categories with at least one term matching [query], in published order. */
        val groups: List<TaxonomyGroup>,
        /** Every term, by id — the detail pane resolves from here so it survives a search that would otherwise filter the open term out. */
        val termsById: Map<String, TaxonomyTerm>,
        /** Total published term count, unfiltered — for an empty-search-result message. */
        val totalCount: Int,
    ) : TaxonomyUiState
}

/**
 * Drives [TaxonomyScreen]: loads the published glossary once, then filters
 * it in-memory as the student types — no re-read of the catalogue per
 * keystroke, since it never changes locally between loads.
 */
@HiltViewModel
class TaxonomyViewModel @Inject constructor(
    private val repository: TaxonomyRepository,
) : ViewModel() {

    private var catalogue: TaxonomyCatalogue = TaxonomyCatalogue(emptyList(), emptyList())

    private val _uiState = MutableStateFlow<TaxonomyUiState>(TaxonomyUiState.Loading)
    val uiState: StateFlow<TaxonomyUiState> = _uiState.asStateFlow()

    init {
        load()
    }

    fun load() {
        viewModelScope.launch {
            _uiState.value = TaxonomyUiState.Loading
            catalogue = repository.catalogue()
            _uiState.value = contentFor(query = "")
        }
    }

    fun onQueryChange(query: String) {
        _uiState.value = contentFor(query)
    }

    private fun contentFor(query: String): TaxonomyUiState.Content =
        TaxonomyUiState.Content(
            query = query,
            groups = groupByCategory(catalogue.categories, searchTerms(catalogue.terms, query)),
            termsById = catalogue.terms.associateBy { it.id },
            totalCount = catalogue.terms.size,
        )
}
