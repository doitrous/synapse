package com.nishany.android.feature.qbank

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
import com.nishany.android.core.qbank.LiveSession
import com.nishany.android.core.qbank.SittingMode
import com.nishany.android.core.ui.StateHost
import kotlinx.coroutines.launch

/** `MAX_QUESTIONS` in `src/pages/student/QuestionBank.tsx` -- the longest sitting a student can build in one go. */
private const val MAX_QUESTIONS = 40

/** What the slider opens on, as the web's builder does. */
private const val DEFAULT_QUESTIONS = 10

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
    val uiState by viewModel.uiState.collectAsState()
    val availableCount by viewModel.availableCount.collectAsState()
    var mode by remember { mutableStateOf(SittingMode.TUTOR) }
    // Seeded once, then clamped on read. `availableCount` arrives after the
    // first composition and moves again whenever the student changes what the
    // pool is drawn from, so keying `remember` on it -- as this did -- threw
    // away the number they had just dialled in every time the pool changed
    // underneath them. Clamping instead means a count of 40 survives a filter
    // that briefly leaves five questions, and comes back at 40 when it lifts.
    var chosenCount by remember { mutableIntStateOf(DEFAULT_QUESTIONS) }
    val maxCount = if (availableCount > 0) minOf(availableCount, MAX_QUESTIONS) else 1
    val count = chosenCount.coerceIn(1, maxCount)
    val coroutineScope = rememberCoroutineScope()

    // Gated on the pool, not on availableCount: an empty pool (nothing
    // published) is a genuine UiState.Empty, but a scope the student picked
    // that happens to match nothing is a normal interactive state -- the
    // Start button being disabled already says that, and a full-screen Empty
    // surface here would trap them with no way back to widen the scope.
    StateHost(state = uiState, modifier = Modifier.fillMaxWidth()) {
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
                onValueChange = { chosenCount = it.toInt() },
                valueRange = 1f..maxCount.toFloat(),
                steps = maxOf(0, maxCount - 2),
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
}
