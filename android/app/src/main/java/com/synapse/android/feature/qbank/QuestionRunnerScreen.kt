package com.synapse.android.feature.qbank

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
import androidx.compose.runtime.remember
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import com.synapse.android.core.model.Question
import com.synapse.android.core.qbank.SittingMode

/**
 * Puts one question on screen at a time and drives [RunnerViewModel].
 *
 * [questions] must be the same list the view model was built with -- this
 * screen never resolves a [Question] itself, it only looks one up by the id
 * [RunnerViewModel.session] currently points at.
 *
 * Every option carries its own explanation ([com.synapse.android.core.model.AnswerOption.explanation]),
 * not just the correct one -- that is the point of the question bank. A
 * student who picked B is shown why B is wrong, which is the thing they
 * actually needed to read, alongside [Question.explanation] for the
 * question as a whole.
 *
 * This screen is deliberately not wired into navigation -- see this task's
 * brief: reaching it, and what happens after [onFinished], is Task 15's job.
 */
@Composable
fun QuestionRunnerScreen(viewModel: RunnerViewModel, questions: List<Question>, onFinished: () -> Unit) {
    val session by viewModel.session.collectAsState()
    val questionsById = remember(questions) { questions.associateBy { it.id } }
    val question = session.questionIds.getOrNull(session.idx)?.let { questionsById[it] }

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

        if (question == null) {
            Text("No question to show.")
            return@Column
        }
        val questionId = question.id

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
