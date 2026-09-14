package com.synapse.app.feature.qbank

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material3.Button
import androidx.compose.material3.Card
import androidx.compose.material3.HorizontalDivider
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedButton
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.unit.dp
import com.synapse.app.R
import com.synapse.app.core.qbank.QBankQuestionResult
import com.synapse.app.core.qbank.QBankSessionResult
import com.synapse.app.core.qbank.Question

const val QBANK_RESULTS_SCORE_TAG = "qbank_results_score"
const val QBANK_RESULTS_DONE_BUTTON_TAG = "qbank_results_done_button"
const val QBANK_RESULTS_SAVE_STATUS_TAG = "qbank_results_save_status"
const val QBANK_RESULTS_RETRY_BUTTON_TAG = "qbank_results_retry_button"

private data class AccuracyRow(val label: String, val correct: Int, val total: Int) {
    val percent: Int get() = if (total == 0) 0 else (correct * 100) / total
}

/**
 * The finished-sitting summary: overall score, per-subject and per-topic
 * accuracy (derived from [result] joined back against [questions] — nothing
 * here is re-fetched, since [SessionViewModel.finish] already built the
 * attempts), an answer-review list, and a save-status line: a "Sync now" hint
 * once [saveState] is [SessionSaveState.Saved], or an error + [onRetrySave]
 * affordance if the local write [SessionSaveState.Failed]. The results are
 * shown regardless, since the grade is already computed.
 */
@Composable
fun ResultsScreen(
    result: QBankSessionResult,
    questions: List<Question>,
    onDone: () -> Unit,
    saveState: SessionSaveState = SessionSaveState.Saved,
    onRetrySave: () -> Unit = {},
) {
    val byId = questions.associateBy { it.id }
    val unknownGroupLabel = stringResource(R.string.qbank_unknown_group)
    val bySubject = accuracyBy(result.perQuestion, byId, unknownGroupLabel) { it.subjectId }
    val byTopic = accuracyBy(result.perQuestion, byId, unknownGroupLabel) { it.topic }

    Column(modifier = Modifier.fillMaxSize().padding(16.dp)) {
        Text(stringResource(R.string.qbank_results_title), style = MaterialTheme.typography.titleLarge)

        val percent = if (result.total == 0) 0 else (result.correct * 100) / result.total
        Text(
            text = stringResource(R.string.qbank_results_score_format, result.correct, result.total, percent),
            style = MaterialTheme.typography.titleMedium,
            modifier = Modifier.padding(top = 8.dp).testTag(QBANK_RESULTS_SCORE_TAG),
        )

        when (saveState) {
            SessionSaveState.Saving -> Text(
                text = stringResource(R.string.qbank_results_saving),
                style = MaterialTheme.typography.bodyMedium,
                modifier = Modifier.padding(top = 4.dp).testTag(QBANK_RESULTS_SAVE_STATUS_TAG),
            )

            SessionSaveState.Saved -> Text(
                text = stringResource(R.string.qbank_results_saved_message),
                style = MaterialTheme.typography.bodyMedium,
                modifier = Modifier.padding(top = 4.dp).testTag(QBANK_RESULTS_SAVE_STATUS_TAG),
            )

            SessionSaveState.Failed -> Row(
                modifier = Modifier.fillMaxWidth().padding(top = 4.dp),
                horizontalArrangement = Arrangement.spacedBy(8.dp),
                verticalAlignment = Alignment.CenterVertically,
            ) {
                Text(
                    text = stringResource(R.string.qbank_results_failed_message),
                    style = MaterialTheme.typography.bodyMedium,
                    color = MaterialTheme.colorScheme.error,
                    modifier = Modifier.weight(1f).testTag(QBANK_RESULTS_SAVE_STATUS_TAG),
                )
                OutlinedButton(
                    onClick = onRetrySave,
                    modifier = Modifier.testTag(QBANK_RESULTS_RETRY_BUTTON_TAG),
                ) {
                    Text(stringResource(R.string.qbank_results_retry_save))
                }
            }
        }

        LazyColumn(modifier = Modifier.weight(1f).padding(top = 16.dp)) {
            item { SectionHeader(stringResource(R.string.qbank_results_by_subject)) }
            items(bySubject) { row -> AccuracyLine(row) }

            item { SectionHeader(stringResource(R.string.qbank_results_by_topic), topPadding = 16) }
            items(byTopic) { row -> AccuracyLine(row) }

            item { SectionHeader(stringResource(R.string.qbank_results_review), topPadding = 16) }
            items(result.perQuestion) { pq -> ReviewRow(pq, byId[pq.questionId]) }
        }

        Button(
            onClick = onDone,
            modifier = Modifier.fillMaxWidth().padding(top = 8.dp).testTag(QBANK_RESULTS_DONE_BUTTON_TAG),
        ) {
            Text(stringResource(R.string.qbank_done))
        }
    }
}

private fun accuracyBy(
    perQuestion: List<QBankQuestionResult>,
    byId: Map<String, Question>,
    unknownLabel: String,
    key: (Question) -> String,
): List<AccuracyRow> {
    val grouped = perQuestion.groupBy { byId[it.questionId]?.let(key) ?: unknownLabel }
    return grouped.map { (label, results) -> AccuracyRow(label, results.count { it.correct }, results.size) }
}

@Composable
private fun SectionHeader(title: String, topPadding: Int = 0) {
    Text(
        text = title,
        style = MaterialTheme.typography.titleMedium,
        modifier = Modifier.padding(top = topPadding.dp, bottom = 4.dp),
    )
}

@Composable
private fun AccuracyLine(row: AccuracyRow) {
    Row(modifier = Modifier.fillMaxWidth().padding(vertical = 2.dp), horizontalArrangement = Arrangement.SpaceBetween) {
        Text(row.label, style = MaterialTheme.typography.bodyMedium)
        Text(
            stringResource(R.string.qbank_results_accuracy_line_format, row.correct, row.total, row.percent),
            style = MaterialTheme.typography.bodyMedium,
        )
    }
}

@Composable
private fun ReviewRow(result: QBankQuestionResult, question: Question?) {
    Card(modifier = Modifier.fillMaxWidth().padding(vertical = 4.dp)) {
        Column(modifier = Modifier.padding(12.dp)) {
            Text(question?.stem ?: result.questionId, style = MaterialTheme.typography.bodyLarge)
            val nothingPicked = stringResource(R.string.qbank_results_nothing_picked)
            Text(
                text = if (result.correct) {
                    stringResource(R.string.qbank_results_correct_picked_format, result.pickedLabel ?: nothingPicked)
                } else {
                    stringResource(
                        R.string.qbank_results_missed_picked_format,
                        result.pickedLabel ?: nothingPicked,
                        question?.correctLabel ?: "?",
                    )
                },
                style = MaterialTheme.typography.bodyMedium,
                modifier = Modifier.padding(top = 4.dp),
            )
        }
    }
    HorizontalDivider()
}
