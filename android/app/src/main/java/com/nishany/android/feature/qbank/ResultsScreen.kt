package com.nishany.android.feature.qbank

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material3.Button
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import com.nishany.android.core.qbank.QuestionState
import com.nishany.android.core.qbank.SittingMode
import kotlin.math.roundToInt

/** `mm:ss`, matching `clock` in `src/pages/student/QuestionBank.tsx`. */
private fun clock(seconds: Int): String {
    val minutes = seconds / 60
    val secs = seconds % 60
    return "%02d:%02d".format(minutes, secs)
}

private fun QuestionState.label(): String = when (this) {
    QuestionState.CORRECT -> "Correct"
    QuestionState.WRONG -> "Wrong"
    QuestionState.OMITTED -> "Omitted"
    QuestionState.ANSWERED -> "Answered"
    QuestionState.UNSEEN -> "Unseen"
}

/**
 * The sitting just finished: score, the elapsed clock in timed mode, and a
 * per-question breakdown where a skipped question reads as skipped, never
 * as wrong.
 *
 * The percentage guards `answered == 0` -- a sitting with no questions
 * answered must not render `NaN%`, the same case the web bails out of at
 * `src/pages/student/QuestionBank.tsx:1143`.
 */
@Composable
fun ResultsScreen(viewModel: ResultsViewModel, onDone: () -> Unit) {
    val session by viewModel.session.collectAsState()
    val summary by viewModel.summary.collectAsState()
    val pct = if (summary.answered > 0) ((summary.correct.toDouble() / summary.answered) * 100).roundToInt() else null

    Column(modifier = Modifier.fillMaxWidth().padding(24.dp), verticalArrangement = Arrangement.spacedBy(12.dp)) {
        Text("Results", style = MaterialTheme.typography.headlineSmall)

        Text(
            if (pct != null) "${summary.correct} of ${summary.answered} ($pct%)" else "${summary.correct} of ${summary.answered}",
            style = MaterialTheme.typography.titleMedium,
        )
        Text("${summary.omitted} omitted", style = MaterialTheme.typography.bodyMedium)

        if (session.mode == SittingMode.TIMED) {
            Text("Time: ${clock(summary.seconds)}", style = MaterialTheme.typography.bodyMedium)
        }

        LazyColumn(modifier = Modifier.fillMaxWidth().padding(top = 8.dp), verticalArrangement = Arrangement.spacedBy(4.dp)) {
            items(session.questionIds.indices.toList()) { index ->
                Row(modifier = Modifier.fillMaxWidth()) {
                    Text("Question ${index + 1}", modifier = Modifier.weight(1f))
                    Text(viewModel.stateOf(index).label())
                }
            }
        }

        Button(onClick = onDone, modifier = Modifier.fillMaxWidth()) {
            Text("Done")
        }
    }
}
