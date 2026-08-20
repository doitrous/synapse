package com.synapse.android.feature.qbank

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Button
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.RadioButton
import androidx.compose.material3.Slider
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableIntStateOf
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.rememberCoroutineScope
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import com.synapse.android.core.qbank.LiveSession
import com.synapse.android.core.qbank.SittingMode
import kotlinx.coroutines.launch

/** `MAX_QUESTIONS` in `src/pages/student/QuestionBank.tsx` -- the longest sitting a student can build in one go. */
private const val MAX_QUESTIONS = 40

/**
 * How many questions, and whether to see the answer as you go (tutor) or
 * only at the end (timed).
 *
 * [onBuilt] hands the caller the [LiveSession] [QuestionBankViewModel.build]
 * returns -- this screen never persists it. The runner (a later task) is
 * what writes it under [LiveSession.KEY] and takes the student into it.
 */
@Composable
fun SessionBuilderScreen(viewModel: QuestionBankViewModel, onBuilt: (LiveSession) -> Unit) {
    val availableCount by viewModel.availableCount.collectAsState()
    var mode by remember { mutableStateOf(SittingMode.TUTOR) }
    val maxCount = { if (availableCount > 0) minOf(availableCount, MAX_QUESTIONS) else 1 }
    var count by remember(availableCount) { mutableIntStateOf(minOf(10, maxCount())) }
    val coroutineScope = rememberCoroutineScope()

    Column(
        modifier = Modifier.fillMaxWidth().padding(24.dp),
        verticalArrangement = Arrangement.spacedBy(12.dp),
    ) {
        Text("Build your sitting", style = MaterialTheme.typography.headlineSmall)
        Text("$availableCount questions available")

        Text("Mode")
        SittingMode.entries.forEach { candidate ->
            Row(verticalAlignment = Alignment.CenterVertically) {
                RadioButton(selected = mode == candidate, onClick = { mode = candidate })
                Text(if (candidate == SittingMode.TUTOR) "Tutor -- explained as you go" else "Timed -- explained at the end")
            }
        }

        Text("$count questions")
        Slider(
            value = count.toFloat(),
            onValueChange = { count = it.toInt() },
            valueRange = 1f..maxCount().toFloat(),
            steps = maxOf(0, maxCount() - 2),
        )

        Button(
            onClick = { coroutineScope.launch { onBuilt(viewModel.build(mode, count)) } },
            enabled = availableCount > 0,
            modifier = Modifier.fillMaxWidth(),
        ) {
            Text("Start")
        }
    }
}
