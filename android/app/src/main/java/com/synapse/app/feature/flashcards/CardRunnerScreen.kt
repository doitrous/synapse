package com.synapse.app.feature.flashcards

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.HorizontalDivider
import androidx.compose.material3.LinearProgressIndicator
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.res.pluralStringResource
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.unit.dp
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import com.synapse.app.R
import com.synapse.app.core.flashcards.Grade

const val CARD_RUNNER_BACK_LINK_TAG = "card_runner_back_link"
const val CARD_RUNNER_PROGRESS_TAG = "card_runner_progress_text"
const val CARD_RUNNER_FRONT_TAG = "card_runner_front"
const val CARD_RUNNER_BACK_TAG = "card_runner_back"
const val CARD_RUNNER_SHOW_ANSWER_TAG = "card_runner_show_answer"
fun gradeButtonTag(grade: Grade): String = "card_runner_grade_${grade.name}"
const val CARD_RUNNER_SUMMARY_TAG = "card_runner_summary"
const val CARD_RUNNER_DONE_BUTTON_TAG = "card_runner_done_button"

/**
 * Runs one [StudySession] a card at a time: front, "Show answer", back + the four
 * live-interval-labeled grade buttons, then the end-of-session summary. A verbatim-behavior port
 * of `src/components/flashcards/CardRunner.tsx`, minus the web-only keyboard shortcuts (Space,
 * 1-4, Escape) — deliberately descoped for a touch-first surface, see the plan's deferral notes.
 */
@Composable
fun CardRunnerScreen(
    onLeave: () -> Unit,
    viewModel: CardRunnerViewModel = hiltViewModel(),
) {
    val uiState by viewModel.uiState.collectAsStateWithLifecycle()
    CardRunnerContent(
        uiState = uiState,
        onShowAnswer = viewModel::showAnswer,
        onGrade = viewModel::grade,
        onLeave = onLeave,
    )
}

@Composable
private fun CardRunnerContent(
    uiState: CardRunnerUiState,
    onShowAnswer: () -> Unit,
    onGrade: (Grade) -> Unit,
    onLeave: () -> Unit,
) {
    Column(modifier = Modifier.fillMaxSize().padding(16.dp)) {
        TextButton(onClick = onLeave, modifier = Modifier.testTag(CARD_RUNNER_BACK_LINK_TAG)) {
            Text(stringResource(R.string.flashcards_back_link_format, uiState.deckTitle))
        }

        if (uiState.finished) {
            SessionSummary(uiState, onLeave)
            return@Column
        }

        Row(
            modifier = Modifier.fillMaxWidth().padding(top = 8.dp),
            verticalAlignment = Alignment.CenterVertically,
            horizontalArrangement = Arrangement.spacedBy(8.dp),
        ) {
            LinearProgressIndicator(
                progress = { if (uiState.total == 0) 0f else uiState.position / uiState.total.toFloat() },
                modifier = Modifier.weight(1f),
            )
            Text(
                stringResource(R.string.flashcards_progress_format, uiState.position, uiState.total),
                modifier = Modifier.testTag(CARD_RUNNER_PROGRESS_TAG),
            )
        }

        Column(
            modifier = Modifier.weight(1f).fillMaxWidth().padding(top = 16.dp),
            horizontalAlignment = Alignment.CenterHorizontally,
            verticalArrangement = Arrangement.Center,
        ) {
            Text(stringResource(R.string.flashcards_front_caption), style = MaterialTheme.typography.labelSmall)
            Text(
                uiState.front,
                style = MaterialTheme.typography.headlineSmall,
                modifier = Modifier.padding(top = 8.dp).testTag(CARD_RUNNER_FRONT_TAG),
            )

            if (uiState.revealed) {
                HorizontalDivider(modifier = Modifier.fillMaxWidth().padding(vertical = 20.dp))
                Text(stringResource(R.string.flashcards_back_caption), style = MaterialTheme.typography.labelSmall)
                Text(
                    uiState.back,
                    style = MaterialTheme.typography.bodyLarge,
                    modifier = Modifier.padding(top = 8.dp).testTag(CARD_RUNNER_BACK_TAG),
                )
            }
        }

        if (!uiState.revealed) {
            Button(
                onClick = onShowAnswer,
                modifier = Modifier.fillMaxWidth().padding(top = 8.dp).testTag(CARD_RUNNER_SHOW_ANSWER_TAG),
            ) {
                Text(stringResource(R.string.flashcards_show_answer))
            }
        } else {
            GradeButtonGrid(uiState.gradeOptions, onGrade)
        }
    }
}

@Composable
private fun GradeButtonGrid(options: List<GradeOption>, onGrade: (Grade) -> Unit) {
    Column(modifier = Modifier.fillMaxWidth().padding(top = 8.dp)) {
        options.chunked(2).forEach { row ->
            Row(
                modifier = Modifier.fillMaxWidth().padding(top = 6.dp),
                horizontalArrangement = Arrangement.spacedBy(8.dp),
            ) {
                row.forEach { option ->
                    Button(
                        onClick = { onGrade(option.grade) },
                        colors = option.grade.tone(),
                        modifier = Modifier.weight(1f).testTag(gradeButtonTag(option.grade)),
                    ) {
                        Text("${stringResource(option.labelRes)} · ${option.interval}")
                    }
                }
            }
        }
    }
}

/** Again = danger, Hard = neutral, Good = primary, Easy = success/tertiary. */
@Composable
private fun Grade.tone() = when (this) {
    Grade.Again -> ButtonDefaults.buttonColors(
        containerColor = MaterialTheme.colorScheme.errorContainer,
        contentColor = MaterialTheme.colorScheme.onErrorContainer,
    )
    Grade.Hard -> ButtonDefaults.buttonColors(
        containerColor = MaterialTheme.colorScheme.surfaceVariant,
        contentColor = MaterialTheme.colorScheme.onSurfaceVariant,
    )
    Grade.Good -> ButtonDefaults.buttonColors(
        containerColor = MaterialTheme.colorScheme.primary,
        contentColor = MaterialTheme.colorScheme.onPrimary,
    )
    Grade.Easy -> ButtonDefaults.buttonColors(
        containerColor = MaterialTheme.colorScheme.tertiaryContainer,
        contentColor = MaterialTheme.colorScheme.onTertiaryContainer,
    )
}

/**
 * "Session complete" (studied>0) or "Nothing due right now" (empty queue from the start).
 * Deliberately **no score/percentage** anywhere here — a grade is a self-report, not a mark.
 */
@Composable
private fun SessionSummary(uiState: CardRunnerUiState, onLeave: () -> Unit) {
    Column(
        modifier = Modifier.fillMaxSize().testTag(CARD_RUNNER_SUMMARY_TAG),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.Center,
    ) {
        Text(
            stringResource(
                if (uiState.studied > 0) R.string.flashcards_session_complete_title else R.string.flashcards_nothing_due_title,
            ),
            style = MaterialTheme.typography.titleLarge,
        )
        Text(
            text = if (uiState.studied > 0) {
                val graduated = if (uiState.graduatedLater > 0) {
                    pluralStringResource(R.plurals.flashcards_graduated_later, uiState.graduatedLater, uiState.graduatedLater)
                } else {
                    ""
                }
                pluralStringResource(R.plurals.flashcards_studied_summary, uiState.studied, uiState.studied) + graduated
            } else {
                stringResource(R.string.flashcards_all_caught_up)
            },
            style = MaterialTheme.typography.bodyMedium,
            modifier = Modifier.padding(top = 8.dp),
        )
        Button(onClick = onLeave, modifier = Modifier.padding(top = 20.dp).testTag(CARD_RUNNER_DONE_BUTTON_TAG)) {
            Text(stringResource(R.string.flashcards_done_button))
        }
    }
}
