package com.synapse.app.feature.taxonomy

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowBack
import androidx.compose.material3.HorizontalDivider
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.CompositionLocalProvider
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalLayoutDirection
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.unit.LayoutDirection
import androidx.compose.ui.unit.dp
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import com.synapse.app.R
import com.synapse.app.core.taxonomy.TaxonomyTerm

const val TAXONOMY_LOADING_TAG = "taxonomy_loading"
const val TAXONOMY_SEARCH_FIELD_TAG = "taxonomy_search_field"
fun taxonomyTermRowTag(termId: String): String = "taxonomy_term_$termId"
const val TAXONOMY_BACK_BUTTON_TAG = "taxonomy_back_button"

/**
 * The Medical Taxonomy tab's single public entry point. Constructs its own
 * [TaxonomyViewModel] via [hiltViewModel] — no navigation wiring required of
 * the caller; the shell mounts this directly and list-to-detail navigation
 * stays entirely inside it.
 */
@Composable
fun TaxonomyRoute(viewModel: TaxonomyViewModel = hiltViewModel()) {
    val uiState by viewModel.uiState.collectAsStateWithLifecycle()
    TaxonomyScreen(uiState = uiState, onQueryChange = viewModel::onQueryChange)
}

@Composable
private fun TaxonomyScreen(uiState: TaxonomyUiState, onQueryChange: (String) -> Unit) {
    if (uiState !is TaxonomyUiState.Content) {
        Column(
            modifier = Modifier.fillMaxSize().testTag(TAXONOMY_LOADING_TAG),
            horizontalAlignment = Alignment.CenterHorizontally,
            verticalArrangement = Arrangement.Center,
        ) { Text(stringResource(R.string.taxonomy_loading)) }
        return
    }

    var selectedTermId by rememberSaveable { mutableStateOf<String?>(null) }
    val selectedTerm = selectedTermId?.let { uiState.termsById[it] }

    if (selectedTermId != null && selectedTerm == null) {
        // The open term vanished from underneath us (a re-load after the
        // catalogue changed) — fall back to the list rather than showing a
        // blank detail pane.
        LaunchedEffect(Unit) { selectedTermId = null }
        return
    }

    if (selectedTerm != null) {
        TermDetailPane(term = selectedTerm, onBack = { selectedTermId = null })
    } else {
        TermListPane(
            uiState = uiState,
            onQueryChange = onQueryChange,
            onOpenTerm = { selectedTermId = it },
        )
    }
}

@Composable
private fun TermListPane(
    uiState: TaxonomyUiState.Content,
    onQueryChange: (String) -> Unit,
    onOpenTerm: (String) -> Unit,
) {
    Column(modifier = Modifier.fillMaxSize().padding(16.dp)) {
        Text(stringResource(R.string.taxonomy_title), style = MaterialTheme.typography.titleLarge)
        Text(
            stringResource(R.string.taxonomy_subtitle),
            style = MaterialTheme.typography.bodyMedium,
            modifier = Modifier.padding(top = 4.dp),
        )

        OutlinedTextField(
            value = uiState.query,
            onValueChange = onQueryChange,
            label = { Text(stringResource(R.string.taxonomy_search_label)) },
            singleLine = true,
            modifier = Modifier.fillMaxWidth().padding(top = 16.dp).testTag(TAXONOMY_SEARCH_FIELD_TAG),
        )

        if (uiState.groups.isEmpty()) {
            Text(
                stringResource(if (uiState.totalCount == 0) R.string.taxonomy_empty_not_published else R.string.taxonomy_empty_no_matches),
                style = MaterialTheme.typography.bodyMedium,
                modifier = Modifier.padding(top = 24.dp),
            )
            return@Column
        }

        Column(modifier = Modifier.fillMaxSize().verticalScroll(rememberScrollState())) {
            uiState.groups.forEach { group ->
                Row(
                    modifier = Modifier.fillMaxWidth().padding(top = 20.dp, bottom = 4.dp),
                    horizontalArrangement = Arrangement.spacedBy(8.dp),
                ) {
                    Text(group.category.key, style = MaterialTheme.typography.titleMedium)
                    Arabic(group.category.arabic, style = MaterialTheme.typography.bodyMedium)
                }
                group.terms.forEach { term ->
                    TermRow(term, onClick = { onOpenTerm(term.id) })
                    HorizontalDivider()
                }
            }
        }
    }
}

@Composable
private fun TermRow(term: TaxonomyTerm, onClick: () -> Unit) {
    Surface(onClick = onClick, modifier = Modifier.fillMaxWidth().testTag(taxonomyTermRowTag(term.id))) {
        Row(
            modifier = Modifier.fillMaxWidth().padding(vertical = 10.dp),
            horizontalArrangement = Arrangement.SpaceBetween,
        ) {
            Text(term.term, style = MaterialTheme.typography.bodyLarge)
            Arabic(term.arabic, style = MaterialTheme.typography.bodyLarge)
        }
    }
}

@Composable
private fun TermDetailPane(term: TaxonomyTerm, onBack: () -> Unit) {
    Column(modifier = Modifier.fillMaxSize().padding(16.dp).verticalScroll(rememberScrollState())) {
        Row(verticalAlignment = Alignment.CenterVertically, horizontalArrangement = Arrangement.spacedBy(8.dp)) {
            IconButton(onClick = onBack, modifier = Modifier.testTag(TAXONOMY_BACK_BUTTON_TAG)) {
                Icon(Icons.AutoMirrored.Filled.ArrowBack, contentDescription = stringResource(R.string.taxonomy_back))
            }
            Text(term.term, style = MaterialTheme.typography.titleLarge)
        }

        Arabic(term.arabic, style = MaterialTheme.typography.headlineSmall, modifier = Modifier.padding(top = 8.dp))

        if (term.category.isNotBlank()) {
            Text(term.category, style = MaterialTheme.typography.labelLarge, modifier = Modifier.padding(top = 8.dp))
        }

        if (term.definition.isNotBlank()) {
            Text(term.definition, style = MaterialTheme.typography.bodyLarge, modifier = Modifier.padding(top = 20.dp))
        }
        if (term.definitionAr.isNotBlank()) {
            Arabic(term.definitionAr, style = MaterialTheme.typography.bodyLarge, modifier = Modifier.padding(top = 6.dp))
        }

        term.example?.let { example ->
            Text(
                stringResource(R.string.taxonomy_example_format, example),
                style = MaterialTheme.typography.bodyMedium,
                modifier = Modifier.padding(top = 16.dp),
            )
        }
    }
}

/**
 * Arabic text, rendered right-to-left regardless of the interface's own
 * layout direction — matching iOS's `.environment(\.layoutDirection, .rightToLeft)`
 * on the Arabic side of every row. A no-op (renders nothing) for a blank string,
 * so callers don't need their own blank guard.
 */
@Composable
private fun Arabic(
    text: String,
    style: androidx.compose.ui.text.TextStyle,
    modifier: Modifier = Modifier,
) {
    if (text.isBlank()) return
    CompositionLocalProvider(LocalLayoutDirection provides LayoutDirection.Rtl) {
        Text(text, style = style, modifier = modifier)
    }
}
