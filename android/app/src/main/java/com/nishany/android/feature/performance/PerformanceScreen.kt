package com.nishany.android.feature.performance

import androidx.compose.foundation.Canvas
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material3.Card
import androidx.compose.material3.LinearProgressIndicator
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.semantics.contentDescription
import androidx.compose.ui.semantics.semantics
import androidx.compose.ui.unit.dp
import com.nishany.android.core.progress.DayCount
import com.nishany.android.core.ui.StateHost
import com.nishany.android.design.LocalCortex
import kotlin.math.roundToInt

/**
 * The performance/progress dashboard (parity item G10): accuracy, streak, a
 * short activity trend, and weakest-first subject/difficulty breakdowns --
 * the same metric set [PerformanceViewModel]'s class doc says iOS's
 * `PerformanceView` and the web's `Performance.tsx` show, computed here from
 * [com.nishany.android.core.progress.AttemptRecord] alone.
 */
@Composable
fun PerformanceScreen(viewModel: PerformanceViewModel, onBack: () -> Unit) {
    val uiState by viewModel.uiState.collectAsState()
    val cortex = LocalCortex.current

    Column(modifier = Modifier.fillMaxSize().padding(24.dp)) {
        Row(modifier = Modifier.fillMaxWidth(), verticalAlignment = Alignment.CenterVertically) {
            Text("Performance", style = MaterialTheme.typography.headlineSmall, modifier = Modifier.weight(1f))
            TextButton(onClick = onBack) { Text("Back") }
        }

        StateHost(state = uiState, modifier = Modifier.weight(1f).padding(top = 12.dp)) { ui ->
            LazyColumn(verticalArrangement = Arrangement.spacedBy(16.dp)) {
                item { HeadlineRow(ui) }
                item { ActivityTrendCard(ui.dailyCounts) }
                if (ui.bySubject.isNotEmpty()) {
                    item { Text("Weakest topics", style = MaterialTheme.typography.titleMedium) }
                    items(ui.bySubject.take(10), key = { it.subjectId + it.topic }) { row ->
                        BreakdownRow(label = row.topic.ifEmpty { row.subjectId }, accuracy = row.accuracy, marked = row.marked)
                    }
                }
                if (ui.byDifficulty.isNotEmpty()) {
                    item { Text("By difficulty", style = MaterialTheme.typography.titleMedium) }
                    items(ui.byDifficulty, key = { it.difficulty }) { row ->
                        BreakdownRow(label = row.difficulty, accuracy = row.accuracy, marked = row.marked)
                    }
                }
                item {
                    Text(
                        "Covers ${ui.distinctItems} distinct item${if (ui.distinctItems == 1) "" else "s"} across ${ui.attempts} attempt${if (ui.attempts == 1) "" else "s"}.",
                        style = MaterialTheme.typography.bodySmall,
                        color = cortex.ink3,
                    )
                }
            }
        }
    }
}

/** Accuracy (once there is enough marked work to trust it) and the day streak, side by side -- a port of iOS's `headline`. */
@Composable
private fun HeadlineRow(ui: PerformanceUi) {
    val cortex = LocalCortex.current
    if (ui.hasEnoughForAccuracy) {
        Row(horizontalArrangement = Arrangement.spacedBy(12.dp)) {
            StatTile(
                label = "Accuracy",
                value = ui.accuracy?.let { "${(it * 100).roundToInt()}%" } ?: "--",
                detail = "of ${ui.marked} marked",
                modifier = Modifier.weight(1f),
            )
            StatTile(
                label = "Streak",
                value = "${ui.streak}",
                detail = if (ui.streak == 1) "day" else "days",
                modifier = Modifier.weight(1f),
            )
        }
    } else {
        val remaining = MIN_MARKED_FOR_ACCURACY - ui.marked
        Card(modifier = Modifier.fillMaxWidth()) {
            Column(modifier = Modifier.padding(16.dp)) {
                Text("Not enough answers yet", style = MaterialTheme.typography.titleSmall, color = cortex.ink)
                Text(
                    "$remaining more marked answer${if (remaining == 1) "" else "s"} and accuracy becomes worth reading. " +
                        "Below that it moves too much to mean anything.",
                    style = MaterialTheme.typography.bodySmall,
                    color = cortex.ink2,
                )
            }
        }
    }
}

@Composable
private fun StatTile(label: String, value: String, detail: String, modifier: Modifier = Modifier) {
    val cortex = LocalCortex.current
    Card(modifier = modifier) {
        Column(modifier = Modifier.padding(16.dp)) {
            Text(label, style = MaterialTheme.typography.labelMedium, color = cortex.ink2)
            Text(value, style = MaterialTheme.typography.headlineMedium, color = cortex.ink)
            Text(detail, style = MaterialTheme.typography.bodySmall, color = cortex.ink3)
        }
    }
}

/** One accuracy row: label, percentage, denominator, and a [LinearProgressIndicator] bar -- native Material rather than a hand-rolled Canvas bar. */
@Composable
private fun BreakdownRow(label: String, accuracy: Double, marked: Int) {
    val cortex = LocalCortex.current
    val pct = (accuracy * 100).roundToInt()
    Column(modifier = Modifier.fillMaxWidth()) {
        Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween) {
            Text(label, style = MaterialTheme.typography.bodyMedium, color = cortex.ink, modifier = Modifier.weight(1f))
            Text("$pct% / $marked", style = MaterialTheme.typography.bodySmall, color = cortex.ink2)
        }
        LinearProgressIndicator(
            progress = { accuracy.toFloat() },
            modifier = Modifier.fillMaxWidth().padding(top = 4.dp),
            color = if (accuracy < 0.5) cortex.danger else cortex.primary,
            trackColor = cortex.inset,
        )
    }
}

/**
 * The last [TREND_DAYS] days of attempts, one bar per day -- the app's own
 * hand-drawn [Canvas] idiom (see [com.nishany.android.feature.home.TargetSeed]),
 * not a charting library. [contentDescription] carries the same information
 * in words, so TalkBack reads a summary rather than nothing -- see this
 * task's brief on chart accessibility.
 */
@Composable
private fun ActivityTrendCard(days: List<DayCount>) {
    val cortex = LocalCortex.current
    val total = days.sumOf { it.attempts }
    val activeDays = days.count { it.attempts > 0 }
    val summary = "Last ${days.size} days: $total attempts on $activeDays of ${days.size} days."

    Card(modifier = Modifier.fillMaxWidth()) {
        Column(modifier = Modifier.padding(16.dp)) {
            Text("Activity, last ${days.size} days", style = MaterialTheme.typography.titleSmall, color = cortex.ink)
            Canvas(
                modifier = Modifier
                    .fillMaxWidth()
                    .height(56.dp)
                    .padding(top = 10.dp)
                    .semantics { contentDescription = summary },
            ) {
                if (days.isEmpty()) return@Canvas
                val peak = (days.maxOfOrNull { it.attempts } ?: 0).coerceAtLeast(1)
                val gap = 3.dp.toPx()
                val barWidth = (size.width - gap * (days.size - 1)) / days.size
                days.forEachIndexed { index, day ->
                    val barHeight = if (day.attempts > 0) (day.attempts.toFloat() / peak) * size.height else 2f
                    val x = index * (barWidth + gap)
                    drawRoundRect(
                        color = if (day.attempts > 0) cortex.primary else cortex.line,
                        topLeft = androidx.compose.ui.geometry.Offset(x, size.height - barHeight),
                        size = androidx.compose.ui.geometry.Size(barWidth, barHeight),
                        cornerRadius = androidx.compose.ui.geometry.CornerRadius(2.dp.toPx()),
                    )
                }
            }
            Text(summary, style = MaterialTheme.typography.bodySmall, color = cortex.ink3, modifier = Modifier.padding(top = 6.dp))
        }
    }
}
