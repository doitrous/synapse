package com.synapse.android.feature.practical

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.lazy.itemsIndexed
import androidx.compose.material3.Button
import androidx.compose.material3.Card
import androidx.compose.material3.Checkbox
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedButton
import androidx.compose.material3.Tab
import androidx.compose.material3.PrimaryTabRow
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableIntStateOf
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import com.synapse.android.core.model.Practical

/**
 * Reads one sat practical: an OSCE station or skills checklist, a clinical
 * case, or a lab/imaging set. Skills and Oral are bundled lists rendered
 * inline on [PracticalListScreen] -- they are never "sat", so they have no
 * reader route here.
 */
@Composable
fun PracticalReaderScreen(practical: Practical, viewModel: PracticalViewModel, onExit: () -> Unit) {
    when (practicalTab(practical.type)) {
        PracticalTab.OSCE -> StationReader(practical, viewModel, onExit)
        PracticalTab.CASES -> CaseReader(practical, viewModel, onExit)
        PracticalTab.LAB -> LabReader(practical, viewModel, onExit)
        null -> Text("This item has no reader.")
    }
}

private fun clock(seconds: Int): String {
    val safe = seconds.coerceAtLeast(0)
    return "%d:%02d".format(safe / 60, safe % 60)
}

@Composable
private fun StationReader(station: Practical, viewModel: PracticalViewModel, onExit: () -> Unit) {
    val ticks by viewModel.ticks.collectAsState()
    val remaining by viewModel.remaining.collectAsState()
    var tab by remember { mutableStateOf(0) }
    var finished by remember { mutableStateOf(false) }

    LaunchedEffect(station.id) { viewModel.openStation(station.id, station.minutes) }

    val totalItems = station.markSections.sumOf { it.items.size }

    if (finished) {
        val checkedCount = ticks.size
        Column(modifier = Modifier.fillMaxSize().padding(24.dp), verticalArrangement = Arrangement.spacedBy(12.dp)) {
            Text("Station finished", style = MaterialTheme.typography.headlineSmall)
            Text("$checkedCount / $totalItems items checked", style = MaterialTheme.typography.bodyMedium)
            Button(onClick = onExit) { Text("Done") }
        }
        return
    }

    Column(modifier = Modifier.fillMaxSize()) {
        Row(modifier = Modifier.fillMaxWidth().padding(16.dp), horizontalArrangement = Arrangement.SpaceBetween) {
            Text(station.title, style = MaterialTheme.typography.titleMedium)
            Text(clock(remaining), style = MaterialTheme.typography.titleMedium)
        }
        PrimaryTabRow(selectedTabIndex = tab) {
            Tab(selected = tab == 0, onClick = { tab = 0 }, text = { Text("Candidate") })
            Tab(selected = tab == 1, onClick = { tab = 1 }, text = { Text("Examiner & Actor") })
        }
        if (tab == 0) {
            Column(modifier = Modifier.padding(16.dp), verticalArrangement = Arrangement.spacedBy(12.dp)) {
                Card {
                    Text(
                        "The actor brief and the mark scheme are behind the Examiner & Actor tab. " +
                            "Don't read them before you run the station — knowing what is on the scheme " +
                            "is the fastest way to learn nothing from it.",
                        modifier = Modifier.padding(16.dp),
                        style = MaterialTheme.typography.bodyMedium,
                    )
                }
                station.candidateInstructions?.let { Text(it, style = MaterialTheme.typography.bodyMedium) }
            }
        } else {
            LazyColumn(modifier = Modifier.weight(1f).padding(16.dp), verticalArrangement = Arrangement.spacedBy(8.dp)) {
                station.markSections.forEach { section ->
                    item { Text(section.title, style = MaterialTheme.typography.titleSmall) }
                    items(section.items.size) { index ->
                        val tickId = "${section.id}:$index"
                        Row(modifier = Modifier.fillMaxWidth()) {
                            Checkbox(
                                checked = tickId in ticks,
                                onCheckedChange = { checked -> viewModel.tick(tickId, checked) },
                            )
                            Text(section.items[index], style = MaterialTheme.typography.bodyMedium)
                        }
                    }
                }
                item {
                    Button(
                        onClick = {
                            finished = true
                            viewModel.finishStation(station.id, marks = ticks.size, outOf = totalItems)
                        },
                        modifier = Modifier.fillMaxWidth(),
                    ) { Text("Finish station") }
                }
            }
        }
    }
}

@Composable
private fun CaseReader(case: Practical, viewModel: PracticalViewModel, onExit: () -> Unit) {
    val revealed by viewModel.revealed.collectAsState()
    var index by remember { mutableIntStateOf(0) }
    var debrief by remember { mutableStateOf(false) }

    LaunchedEffect(case.id) { viewModel.openCase(case.id) }

    if (debrief) {
        Column(modifier = Modifier.fillMaxSize().padding(24.dp), verticalArrangement = Arrangement.spacedBy(12.dp)) {
            Text("Case debrief", style = MaterialTheme.typography.labelSmall)
            case.debrief?.let { Text(it, style = MaterialTheme.typography.bodyMedium) }
            Button(onClick = onExit) { Text("Finish case") }
        }
        return
    }

    val decisions = case.decisions
    if (decisions.isEmpty()) {
        Column(modifier = Modifier.fillMaxSize().padding(24.dp)) {
            Text("This case has no decision points.", style = MaterialTheme.typography.bodyMedium)
            Button(onClick = onExit) { Text("Exit") }
        }
        return
    }

    val decision = decisions[index.coerceIn(0, decisions.lastIndex)]
    val isRevealed = decision.id in revealed
    val last = index == decisions.lastIndex

    Column(modifier = Modifier.fillMaxSize().padding(16.dp), verticalArrangement = Arrangement.spacedBy(12.dp)) {
        Text("${case.title} · step ${index + 1} / ${decisions.size}", style = MaterialTheme.typography.titleSmall)
        Text(decision.title, style = MaterialTheme.typography.titleMedium)
        Text(decision.context, style = MaterialTheme.typography.bodyMedium)
        decision.prompt?.let { Text(it, style = MaterialTheme.typography.bodyMedium) }

        if (isRevealed) {
            Text("Decision rationale", style = MaterialTheme.typography.labelSmall)
            Text(decision.answer.orEmpty(), style = MaterialTheme.typography.bodyMedium)
        } else {
            Button(
                onClick = { viewModel.answerCaseDecision(case.id, decision.id, index, decisions.size) },
                modifier = Modifier.fillMaxWidth(),
            ) { Text("Reveal") }
        }

        Row(horizontalArrangement = Arrangement.SpaceBetween, modifier = Modifier.fillMaxWidth()) {
            OutlinedButton(onClick = { if (index > 0) index -= 1 }, enabled = index > 0) { Text("Previous") }
            if (isRevealed) {
                Button(onClick = { if (last) debrief = true else index += 1 }) {
                    Text(if (last) "See the debrief" else "Next")
                }
            }
        }
    }
}

@Composable
private fun LabReader(lab: Practical, viewModel: PracticalViewModel, onExit: () -> Unit) {
    val revealed by viewModel.revealed.collectAsState()

    LaunchedEffect(lab.id) { viewModel.openLab(lab.id) }

    val kindLabel = if (lab.type == "Imaging interpretation") "Imaging" else "Lab"
    val questions = lab.questions

    Column(modifier = Modifier.fillMaxSize()) {
        Text("$kindLabel · ${lab.title}", style = MaterialTheme.typography.titleMedium, modifier = Modifier.padding(16.dp))
        LazyColumn(modifier = Modifier.weight(1f).padding(horizontal = 16.dp), verticalArrangement = Arrangement.spacedBy(12.dp)) {
            itemsIndexed(questions) { index, question ->
                val isRevealed = question.id in revealed
                Card(modifier = Modifier.fillMaxWidth()) {
                    Column(modifier = Modifier.padding(16.dp), verticalArrangement = Arrangement.spacedBy(8.dp)) {
                        Text(question.prompt, style = MaterialTheme.typography.bodyMedium)
                        if (isRevealed) {
                            Text(question.answer.orEmpty(), style = MaterialTheme.typography.bodyMedium)
                        } else {
                            Button(
                                onClick = { viewModel.answerLabQuestion(lab.id, question.id, index, questions.size) },
                            ) { Text("Reveal answer") }
                        }
                    }
                }
            }
            item {
                Button(onClick = onExit, modifier = Modifier.fillMaxWidth()) { Text("Done") }
            }
        }
    }
}
