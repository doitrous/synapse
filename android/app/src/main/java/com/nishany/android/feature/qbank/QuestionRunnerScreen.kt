package com.nishany.android.feature.qbank

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.Button
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedButton
import androidx.compose.material3.RadioButton
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import com.nishany.android.core.model.Question
import com.nishany.android.core.qbank.SittingMode
import com.nishany.android.core.ui.StateHost

/**
 * Puts one question on screen at a time and drives [RunnerViewModel].
 *
 * The question drawn is whatever [RunnerViewModel.uiState] resolves --
 * loading (a degenerate empty sitting), an error (the session names a
 * question id the runner could not resolve), or the [Question] itself --
 * routed through [StateHost] rather than this screen re-deriving it from
 * [RunnerViewModel.session] and a `questions` list of its own. See
 * [runnerUiState]'s own doc for what each branch means.
 *
 * Every option carries its own explanation ([com.nishany.android.core.model.AnswerOption.explanation]),
 * not just the correct one -- that is the point of the question bank. A
 * student who picked B is shown why B is wrong, which is the thing they
 * actually needed to read, alongside [Question.explanation] for the
 * question as a whole.
 *
 * This screen is deliberately not wired into navigation -- see this task's
 * brief: reaching it, and what happens after [onFinished], is Task 15's job.
 */
@Composable
fun QuestionRunnerScreen(viewModel: RunnerViewModel, onFinished: () -> Unit) {
    val session by viewModel.session.collectAsState()
    val uiState by viewModel.uiState.collectAsState()

    StateHost(state = uiState, modifier = Modifier.fillMaxSize()) { question ->
        val questionId = question.id
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(24.dp)
                .verticalScroll(rememberScrollState()),
            verticalArrangement = Arrangement.spacedBy(12.dp),
        ) {
            QuestionNavigator(
                count = session.questionIds.size,
                current = session.idx,
                stateOf = viewModel::stateOf,
                onSelect = viewModel::goTo,
            )

            Text("Question ${session.idx + 1} of ${session.questionIds.size}", style = MaterialTheme.typography.labelLarge)

            if (question.vignette.isNotBlank()) {
                Text(question.vignette, style = MaterialTheme.typography.bodyMedium)
            }
            Text(question.stem, style = MaterialTheme.typography.titleMedium)

            val chosenIndex = session.answers[questionId]
            // Matches `stateFor`'s own reveal condition (see RunnerViewModel.stateOf):
            // reviewing (post-finish) or checked for this question (tutor, at commit).
            val revealed = session.reviewing || session.checked[questionId] == true

            Column(verticalArrangement = Arrangement.spacedBy(4.dp)) {
                question.options.forEachIndexed { index, option ->
                    Row(verticalAlignment = Alignment.CenterVertically) {
                        RadioButton(
                            selected = chosenIndex == index,
                            onClick = { viewModel.choose(option.label) },
                            enabled = !revealed,
                        )
                        Text("${option.label}. ${option.text}")
                    }
                    if (revealed && chosenIndex == index) {
                        Text(
                            option.explanation,
                            style = MaterialTheme.typography.bodySmall,
                            modifier = Modifier.padding(start = 40.dp),
                        )
                    }
                }
            }

            if (revealed) {
                Text(question.explanation, style = MaterialTheme.typography.bodyMedium)
            }

            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.spacedBy(8.dp),
            ) {
                if (session.mode == SittingMode.TUTOR && !revealed && chosenIndex != null) {
                    Button(onClick = { viewModel.commit() }) { Text("Check answer") }
                }
                if (session.idx < session.questionIds.lastIndex) {
                    OutlinedButton(onClick = { viewModel.goTo(session.idx + 1) }) { Text("Next") }
                } else {
                    Button(onClick = { viewModel.finish(); onFinished() }) { Text("Finish") }
                }
            }
        }
    }
}
