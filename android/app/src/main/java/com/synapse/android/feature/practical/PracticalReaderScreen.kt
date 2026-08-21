package com.synapse.android.feature.practical

import androidx.activity.compose.BackHandler
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.lazy.itemsIndexed
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.Button
import androidx.compose.material3.Card
import androidx.compose.material3.Checkbox
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedButton
import androidx.compose.material3.PrimaryTabRow
import androidx.compose.material3.Tab
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableIntStateOf
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import com.synapse.android.core.model.Practical

/**
 * Reads one sat practical: an OSCE station or skills checklist, a clinical
 * case, or a lab/imaging set. Skills and Oral are bundled lists rendered
 * inline on [PracticalListScreen] -- they are never "sat", so they have no
 * reader route here.
 *
 * Every screen below scrolls. `step` is not on the navigation back stack
 * (see `RootScreen.PracticalRoute`), so a control pushed off the bottom of a
 * phone by a long paragraph is not merely awkward -- it is unreachable, and
 * in the case reader the control that goes first is the one that advances
 * the case.
 *
 * Every screen below also has a way out that banks nothing. The only forward
 * path out of a station is "Finish station", which writes a real attempt and
 * a station-run fold; a student who opened the wrong item must not have to
 * fake a sitting to leave it. Each reader binds the system back gesture to
 * that same way out, so backing out of a station stops its clock and drops
 * its run exactly as the "Back" button does -- without one, back skipped the
 * reader entirely and left the ticker running for the life of the process.
 */
@Composable
fun PracticalReaderScreen(practical: Practical, viewModel: PracticalViewModel, onExit: () -> Unit) {
    when (practicalTab(practical.type)) {
        PracticalTab.OSCE -> StationReader(practical, viewModel, onExit)
        PracticalTab.CASES -> CaseReader(practical, viewModel, onExit)
        PracticalTab.LAB -> LabReader(practical, viewModel, onExit)
        null -> {
            BackHandler(onBack = onExit)
            Column(modifier = Modifier.fillMaxSize().padding(24.dp)) {
                Text("This item has no reader.")
                TextButton(onClick = onExit) { Text("Back") }
            }
        }
    }
}

private fun clock(seconds: Int): String {
    val safe = seconds.coerceAtLeast(0)
    return "%d:%02d".format(safe / 60, safe % 60)
}

/**
 * The in-screen way out, on the same row as the title.
 *
 * Task 15's convention (`PreviousSittingsScreen`): a plain "Back" the
 * student can always see, rather than relying on the system gesture alone.
 * The gesture is bound to the same lambda by each reader's own
 * [BackHandler], so the two exits are one exit.
 */
@Composable
private fun ReaderHeader(title: String, trailing: String? = null, onBack: () -> Unit) {
    Row(
        modifier = Modifier.fillMaxWidth().padding(16.dp),
        verticalAlignment = Alignment.CenterVertically,
        horizontalArrangement = Arrangement.spacedBy(8.dp),
    ) {
        TextButton(onClick = onBack) { Text("Back") }
        Text(title, style = MaterialTheme.typography.titleMedium, modifier = Modifier.weight(1f))
        trailing?.let { Text(it, style = MaterialTheme.typography.titleMedium) }
    }
}

@Composable
private fun StationReader(station: Practical, viewModel: PracticalViewModel, onExit: () -> Unit) {
    val ticks by viewModel.ticks.collectAsState()
    val remaining by viewModel.remaining.collectAsState()
    // Saveable, not remembered: a configuration change rebuilds the
    // composition, and a station that came back on the wrong tab -- or, far
    // worse, back in the run it had just been finished out of -- is the same
    // loss the route's own position had.
    var tab by rememberSaveable { mutableIntStateOf(0) }
    var finished by rememberSaveable { mutableStateOf(false) }

    // Re-runs after a configuration change. openStation refuses to re-seed a
    // run it already has open, which is what keeps the ticks and the clock.
    LaunchedEffect(station.id) { viewModel.openStation(station.id, station.minutes) }

    val totalItems = station.markSections.sumOf { it.items.size }

    if (finished) {
        Column(
            modifier = Modifier.fillMaxSize().verticalScroll(rememberScrollState()).padding(24.dp),
            verticalArrangement = Arrangement.spacedBy(12.dp),
        ) {
            Text("Station finished", style = MaterialTheme.typography.headlineSmall)
            Text("${ticks.size} / $totalItems items checked", style = MaterialTheme.typography.bodyMedium)
            Text(
                "${station.earnedMarks(ticks)} / ${station.totalMarks} marks",
                style = MaterialTheme.typography.bodyMedium,
            )
            Button(onClick = onExit) { Text("Done") }
        }
        // The run is already banked; there is nothing left to abandon.
        BackHandler(onBack = onExit)
        return
    }

    // Leaving mid-run must bank nothing -- see abandonStation.
    val leave = {
        viewModel.abandonStation()
        onExit()
    }
    BackHandler(onBack = leave)

    Column(modifier = Modifier.fillMaxSize()) {
        ReaderHeader(station.title, trailing = clock(remaining), onBack = leave)
        PrimaryTabRow(selectedTabIndex = tab) {
            Tab(selected = tab == 0, onClick = { tab = 0 }, text = { Text("Candidate") })
            Tab(selected = tab == 1, onClick = { tab = 1 }, text = { Text("Examiner & Actor") })
        }
        if (tab == 0) {
            Column(
                modifier = Modifier.weight(1f).verticalScroll(rememberScrollState()).padding(16.dp),
                verticalArrangement = Arrangement.spacedBy(12.dp),
            ) {
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
                    // Ticked under the *authored* item id, which is what the
                    // shared document's checkedItems holds and what the web
                    // restores a half-ticked run from. Deliberately not a
                    // LazyColumn key, though: two sections of an imported
                    // mark scheme can carry the same authored id, and a
                    // duplicate key crashes the list outright.
                    items(section.items) { markItem ->
                        Row(modifier = Modifier.fillMaxWidth(), verticalAlignment = Alignment.CenterVertically) {
                            Checkbox(
                                checked = markItem.id in ticks,
                                onCheckedChange = { checked -> viewModel.tick(markItem.id, checked) },
                            )
                            Text(markItem.text, style = MaterialTheme.typography.bodyMedium)
                        }
                    }
                }
                item {
                    Button(
                        onClick = {
                            finished = true
                            // Weighted section share, exactly as the web
                            // scores it -- a tick count is a different scale,
                            // and recordStationRun compares the two as one.
                            viewModel.finishStation(
                                station.id,
                                marks = station.earnedMarks(ticks),
                                outOf = station.totalMarks,
                            )
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
    // Saveable for the same reason as the station's tab: a rotation must not
    // send a student back to decision one of a case they are part-way through.
    var index by rememberSaveable { mutableIntStateOf(0) }
    var debrief by rememberSaveable { mutableStateOf(false) }

    LaunchedEffect(case.id) { viewModel.openCase(case.id) }

    // A case banks each decision as it is revealed, so backing out of one
    // loses nothing that was not already saved.
    BackHandler(onBack = onExit)

    if (debrief) {
        Column(
            modifier = Modifier.fillMaxSize().verticalScroll(rememberScrollState()).padding(24.dp),
            verticalArrangement = Arrangement.spacedBy(12.dp),
        ) {
            Text("Case debrief", style = MaterialTheme.typography.labelSmall)
            case.debrief?.let { Text(it, style = MaterialTheme.typography.bodyMedium) }
            Button(onClick = onExit) { Text("Finish case") }
        }
        return
    }

    // A stage the author gave no answerable options is not a decision -- see
    // Practical.answerableDecisions. Indexing anywhere but this list would
    // also put the wrong number in the attempt log's itemId.
    val decisions = case.answerableDecisions
    if (decisions.isEmpty()) {
        Column(modifier = Modifier.fillMaxSize().verticalScroll(rememberScrollState()).padding(24.dp)) {
            Text("This case has no decision points.", style = MaterialTheme.typography.bodyMedium)
            Button(onClick = onExit) { Text("Exit") }
        }
        return
    }

    val decision = decisions[index.coerceIn(0, decisions.lastIndex)]
    val isRevealed = decision.id in revealed
    val last = index == decisions.lastIndex

    Column(modifier = Modifier.fillMaxSize()) {
        ReaderHeader("${case.title} · step ${index + 1} / ${decisions.size}", onBack = onExit)
        Column(
            modifier = Modifier.weight(1f).verticalScroll(rememberScrollState()).padding(horizontal = 16.dp),
            verticalArrangement = Arrangement.spacedBy(12.dp),
        ) {
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
}

@Composable
private fun LabReader(lab: Practical, viewModel: PracticalViewModel, onExit: () -> Unit) {
    val revealed by viewModel.revealed.collectAsState()

    LaunchedEffect(lab.id) { viewModel.openLab(lab.id) }

    // As with a case: every revealed question is already banked.
    BackHandler(onBack = onExit)

    val kindLabel = if (lab.type == "Imaging interpretation") "Imaging" else "Lab"
    // As in CaseReader: only the questions the author gave answers to, so
    // `items` and the attempt log's index mean what the web means by them.
    val questions = lab.answerableQuestions

    Column(modifier = Modifier.fillMaxSize()) {
        ReaderHeader("$kindLabel · ${lab.title}", onBack = onExit)
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
