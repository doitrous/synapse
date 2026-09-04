package com.synapse.android.feature.qbank

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxHeight
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material3.Button
import androidx.compose.material3.Checkbox
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import com.synapse.android.core.qbank.ChooserTopic
import com.synapse.android.core.qbank.QBankScope
import com.synapse.android.core.ui.StateHost
import com.synapse.android.design.LocalCortex
import kotlin.math.roundToInt

/**
 * The statistics panel that sits above the chooser on the web
 * (`src/pages/student/QuestionBank.tsx:119-200`) -- bank coverage, a stat
 * trio, a seven-day activity chart and accuracy by subject.
 */
@Composable
private fun QBankStatsPanel(stats: QBankStats) {
    val colors = LocalCortex.current

    Column(modifier = Modifier.fillMaxWidth(), verticalArrangement = Arrangement.spacedBy(12.dp)) {
        // Bank completed
        Column {
            Text("Bank completed", style = MaterialTheme.typography.labelLarge)
            Text("${stats.seen} / ${stats.total}", style = MaterialTheme.typography.titleMedium)
            Text("${(stats.total - stats.seen).coerceAtLeast(0)} remaining", style = MaterialTheme.typography.bodyMedium)
        }

        // Stat trio: accuracy, attempts this week, day streak.
        Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween) {
            Column(modifier = Modifier.weight(1f), horizontalAlignment = Alignment.CenterHorizontally) {
                Text(
                    stats.accuracy?.let { "${(it * 100).roundToInt()}%" } ?: "—",
                    color = colors.success,
                    style = MaterialTheme.typography.titleMedium,
                )
                Text("Accuracy", style = MaterialTheme.typography.bodyMedium)
            }
            Column(modifier = Modifier.weight(1f), horizontalAlignment = Alignment.CenterHorizontally) {
                Text("${stats.weekTotal}", style = MaterialTheme.typography.titleMedium)
                Text("This week", style = MaterialTheme.typography.bodyMedium)
            }
            Column(modifier = Modifier.weight(1f), horizontalAlignment = Alignment.CenterHorizontally) {
                Text("${stats.streak}", color = colors.primary, style = MaterialTheme.typography.titleMedium)
                Text("Day streak", style = MaterialTheme.typography.bodyMedium)
            }
        }

        // Last 7 days
        Column {
            Text("Last 7 days", style = MaterialTheme.typography.labelLarge)
            val peak = (stats.week.maxOfOrNull { it.attempts } ?: 0).coerceAtLeast(1)
            Row(modifier = Modifier.fillMaxWidth().height(64.dp), horizontalArrangement = Arrangement.spacedBy(4.dp)) {
                stats.week.forEach { day ->
                    Box(modifier = Modifier.weight(1f).fillMaxHeight(), contentAlignment = Alignment.BottomCenter) {
                        Box(
                            modifier = Modifier
                                .fillMaxWidth()
                                .fillMaxHeight(fraction = (day.attempts.toFloat() / peak).coerceIn(0f, 1f))
                                .background(colors.primarySoft),
                        )
                    }
                }
            }
        }

        // Accuracy by subject
        Column {
            Text("Accuracy by subject", style = MaterialTheme.typography.labelLarge)
            if (stats.bySubject.isEmpty()) {
                Text(
                    "Answer a few questions in a subject and its accuracy appears here.",
                    style = MaterialTheme.typography.bodyMedium,
                )
            } else {
                Column(verticalArrangement = Arrangement.spacedBy(6.dp)) {
                    stats.bySubject.forEach { subject ->
                        val pct = (subject.correct.toDouble() / subject.marked * 100).roundToInt()
                        Row(modifier = Modifier.fillMaxWidth(), verticalAlignment = Alignment.CenterVertically) {
                            Text(subject.subjectId, modifier = Modifier.weight(1f))
                            Text("$pct%", style = MaterialTheme.typography.bodyMedium)
                        }
                    }
                }
            }
        }
    }
}

/**
 * Which chapters a student is sitting.
 *
 * Every row is a whole-topic toggle -- Milestone 1's chooser offers no
 * subtopic drill-down (nothing in [QuestionBankViewModel.topics] carries
 * subtopics yet, since Milestone 1 ships no Library; see
 * `QBankScope.chooserTopics`). [ChooserTopic.id] is turned into a scope key
 * with [QBankScope.topicKey] here, at the one place a raw id is ever put in
 * the scope set -- everywhere else in this screen only reads the keyed form.
 */
@Composable
fun TopicChooserScreen(viewModel: QuestionBankViewModel, onContinue: () -> Unit, onPreviousSittings: () -> Unit) {
    val uiState by viewModel.uiState.collectAsState()
    val topics by viewModel.topics.collectAsState()
    val scope by viewModel.scope.collectAsState()
    val availableCount by viewModel.availableCount.collectAsState()
    val stats by viewModel.stats.collectAsState()

    Column(modifier = Modifier.fillMaxSize().padding(24.dp)) {
        Row(modifier = Modifier.fillMaxWidth(), verticalAlignment = Alignment.CenterVertically) {
            Text("Choose chapters", style = MaterialTheme.typography.headlineSmall, modifier = Modifier.weight(1f))
            TextButton(onClick = onPreviousSittings) { Text("Previous sittings") }
        }

        // The pool itself (still loading, sync failed, or nothing published)
        // -- see QuestionBankViewModel.uiState's own doc. Everything below
        // reads topics/scope/stats independently, already reactive; this
        // only gates whether there is a pool to choose from at all.
        StateHost(state = uiState, modifier = Modifier.weight(1f)) {
            Column(modifier = Modifier.fillMaxSize()) {
                QBankStatsPanel(stats)

                Text(
                    if (scope.isEmpty()) "Every chapter · $availableCount questions" else "$availableCount questions selected",
                    style = MaterialTheme.typography.bodyMedium,
                    modifier = Modifier.padding(top = 12.dp),
                )

                LazyColumn(
                    modifier = Modifier.weight(1f).padding(top = 12.dp),
                    verticalArrangement = Arrangement.spacedBy(4.dp),
                ) {
                    items(topics, key = ChooserTopic::id) { topic ->
                        val key = QBankScope.topicKey(topic.id)
                        Row(
                            modifier = Modifier.fillMaxWidth(),
                            verticalAlignment = Alignment.CenterVertically,
                        ) {
                            Checkbox(checked = key in scope, onCheckedChange = { viewModel.toggle(key) })
                            Text(topic.title)
                        }
                    }
                }

                Button(
                    onClick = onContinue,
                    enabled = availableCount > 0,
                    modifier = Modifier.fillMaxWidth(),
                ) {
                    Text("Continue")
                }
            }
        }
    }
}
