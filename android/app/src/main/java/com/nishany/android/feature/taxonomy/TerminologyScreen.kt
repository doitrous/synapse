package com.nishany.android.feature.taxonomy

import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.LazyRow
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Card
import androidx.compose.material3.FilterChip
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Tab
import androidx.compose.material3.PrimaryTabRow
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.semantics.contentDescription
import androidx.compose.ui.semantics.semantics
import androidx.compose.ui.unit.dp
import com.nishany.android.core.taxonomy.MedicalTerm
import com.nishany.android.core.taxonomy.TaxSystem
import com.nishany.android.core.ui.StateHost
import com.nishany.android.design.LocalCortex

/**
 * Medical Terminology & Taxonomy (parity item G11): a Glossary tab (the
 * bilingual term dictionary a student actually studies from) and a
 * Curriculum tab (a read-only browse of the system/topic/subtopic tree) --
 * see [TerminologyViewModel]'s class doc for why the second tab has no direct
 * web/iOS screen it ports.
 */
@Composable
fun TerminologyScreen(viewModel: TerminologyViewModel, onBack: () -> Unit) {
    val tab by viewModel.tab.collectAsState()
    val query by viewModel.query.collectAsState()
    val cortex = LocalCortex.current

    Column(modifier = Modifier.fillMaxSize().padding(24.dp)) {
        Row(modifier = Modifier.fillMaxWidth(), verticalAlignment = Alignment.CenterVertically) {
            Text("Terminology", style = MaterialTheme.typography.headlineSmall, modifier = Modifier.weight(1f))
            TextButton(onClick = onBack) { Text("Back") }
        }

        PrimaryTabRow(selectedTabIndex = tab.ordinal, modifier = Modifier.padding(top = 8.dp)) {
            Tab(selected = tab == TerminologyTab.GLOSSARY, onClick = { viewModel.selectTab(TerminologyTab.GLOSSARY) }, text = { Text("Glossary") })
            Tab(selected = tab == TerminologyTab.CURRICULUM, onClick = { viewModel.selectTab(TerminologyTab.CURRICULUM) }, text = { Text("Curriculum") })
        }

        OutlinedTextField(
            value = query,
            onValueChange = viewModel::setQuery,
            label = { Text("Search") },
            singleLine = true,
            modifier = Modifier.fillMaxWidth().padding(top = 12.dp).semantics { contentDescription = "Search terminology" },
        )

        when (tab) {
            TerminologyTab.GLOSSARY -> GlossaryTab(viewModel, cortex.ink3)
            TerminologyTab.CURRICULUM -> CurriculumTab(viewModel)
        }
    }
}

@Composable
private fun GlossaryTab(viewModel: TerminologyViewModel, mutedColor: androidx.compose.ui.graphics.Color) {
    val uiState by viewModel.glossaryUiState.collectAsState()
    val cortex = LocalCortex.current

    StateHost(state = uiState, modifier = Modifier.fillMaxSize().padding(top = 12.dp)) { ui ->
        Column(modifier = Modifier.fillMaxSize()) {
            if (ui.categories.isNotEmpty()) {
                LazyRow(horizontalArrangement = Arrangement.spacedBy(8.dp), modifier = Modifier.padding(bottom = 10.dp)) {
                    items(ui.categories, key = { it }) { cat ->
                        FilterChip(
                            selected = ui.category == cat,
                            onClick = { viewModel.selectCategory(cat) },
                            label = { Text(cat) },
                        )
                    }
                }
            }
            if (ui.terms.isEmpty()) {
                Text("No terms match your search.", style = MaterialTheme.typography.bodyMedium, color = mutedColor)
            } else {
                LazyColumn(verticalArrangement = Arrangement.spacedBy(10.dp)) {
                    items(ui.terms, key = { it.id }) { term -> TermRow(term) }
                }
            }
        }
    }
}

@Composable
private fun TermRow(term: MedicalTerm) {
    val cortex = LocalCortex.current
    Card(modifier = Modifier.fillMaxWidth().clip(RoundedCornerShape(14.dp)).semantics { contentDescription = "${term.term}: ${term.def}" }) {
        Column(modifier = Modifier.padding(14.dp)) {
            Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                Text(term.term, style = MaterialTheme.typography.titleSmall, color = cortex.ink)
                if (term.ar.isNotBlank()) {
                    Text(term.ar, style = MaterialTheme.typography.titleSmall, color = cortex.ink2)
                }
            }
            Text(term.def, style = MaterialTheme.typography.bodySmall, color = cortex.ink2, modifier = Modifier.padding(top = 4.dp))
            if (term.example != null) {
                Text(term.example, style = MaterialTheme.typography.bodySmall, color = cortex.ink3, modifier = Modifier.padding(top = 4.dp))
            }
        }
    }
}

@Composable
private fun CurriculumTab(viewModel: TerminologyViewModel) {
    val uiState by viewModel.taxonomyUiState.collectAsState()
    StateHost(state = uiState, modifier = Modifier.fillMaxSize().padding(top = 12.dp)) { systems ->
        LazyColumn(verticalArrangement = Arrangement.spacedBy(12.dp)) {
            items(systems, key = { it.id }) { system -> SystemCard(system) }
        }
    }
}

@Composable
private fun SystemCard(system: TaxSystem) {
    val cortex = LocalCortex.current
    var expanded by remember { mutableStateOf(false) }
    Card(modifier = Modifier.fillMaxWidth().clip(RoundedCornerShape(14.dp))) {
        Column(modifier = Modifier.padding(14.dp)) {
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .clickable { expanded = !expanded }
                    .semantics { contentDescription = "${system.name}, ${system.topics.size} topics" },
                horizontalArrangement = Arrangement.SpaceBetween,
            ) {
                Text(system.name, style = MaterialTheme.typography.titleSmall, color = cortex.ink)
                Text(if (expanded) "−" else "+", style = MaterialTheme.typography.titleSmall, color = cortex.ink3)
            }
            if (expanded) {
                Column(modifier = Modifier.padding(top = 8.dp), verticalArrangement = Arrangement.spacedBy(6.dp)) {
                    system.topics.forEach { topic ->
                        Column {
                            Text(topic.title, style = MaterialTheme.typography.bodyMedium, color = cortex.ink2)
                            topic.subs.forEach { sub ->
                                Text("· ${sub.title}", style = MaterialTheme.typography.bodySmall, color = cortex.ink3, modifier = Modifier.padding(start = 8.dp))
                            }
                        }
                    }
                }
            }
        }
    }
}
