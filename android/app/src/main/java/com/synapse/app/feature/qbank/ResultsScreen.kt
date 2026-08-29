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
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.unit.dp
import com.synapse.app.core.qbank.QBankQuestionResult
import com.synapse.app.core.qbank.QBankSessionResult
import com.synapse.app.core.qbank.Question

const val QBANK_RESULTS_SCORE_TAG = "qbank_results_score"
const val QBANK_RESULTS_DONE_BUTTON_TAG = "qbank_results_done_button"

private data class AccuracyRow(val label: String, val correct: Int, val total: Int) {
    val percent: Int get() = if (total == 0) 0 else (correct * 100) / total
}

/**
 * The finished-sitting summary: overall score, per-subject and per-topic
 * accuracy (derived from [result] joined back against [questions] — nothing
 * here is re-fetched, since [SessionViewModel.finish] already recorded the
 * attempts), an answer-review list, and a "Sync now" hint pointing at the
 * Dashboard's own sync action.
 */
@Composable
fun ResultsScreen(
    result: QBankSessionResult,
    questions: List<Question>,
    onDone: () -> Unit,
) {
    val byId = questions.associateBy { it.id }
    val bySubject = accuracyBy(result.perQuestion, byId) { it.subjectId }
    val byTopic = accuracyBy(result.perQuestion, byId) { it.topic }

    Column(modifier = Modifier.fillMaxSize().padding(16.dp)) {
        Text("Results", style = MaterialTheme.typography.titleLarge)

        val percent = if (result.total == 0) 0 else (result.correct * 100) / result.total
        Text(
            text = "${result.correct} / ${result.total} correct ($percent%)",
            style = MaterialTheme.typography.titleMedium,
            modifier = Modifier.padding(top = 8.dp).testTag(QBANK_RESULTS_SCORE_TAG),
        )

        Text(
            text = "Attempts were saved and will sync automatically — visit the Dashboard's " +
                "\"Sync now\" if you want to push them right away.",
            style = MaterialTheme.typography.bodyMedium,
            modifier = Modifier.padding(top = 4.dp),
        )

        LazyColumn(modifier = Modifier.weight(1f).padding(top = 16.dp)) {
            item { SectionHeader("By subject") }
            items(bySubject) { row -> AccuracyLine(row) }

            item { SectionHeader("By topic", topPadding = 16) }
            items(byTopic) { row -> AccuracyLine(row) }

            item { SectionHeader("Review", topPadding = 16) }
            items(result.perQuestion) { pq -> ReviewRow(pq, byId[pq.questionId]) }
        }

        Button(
            onClick = onDone,
            modifier = Modifier.fillMaxWidth().padding(top = 8.dp).testTag(QBANK_RESULTS_DONE_BUTTON_TAG),
        ) {
            Text("Done")
        }
    }
}

private fun accuracyBy(
    perQuestion: List<QBankQuestionResult>,
    byId: Map<String, Question>,
    key: (Question) -> String,
): List<AccuracyRow> {
    val grouped = perQuestion.groupBy { byId[it.questionId]?.let(key) ?: "Unknown" }
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
        Text("${row.correct}/${row.total} (${row.percent}%)", style = MaterialTheme.typography.bodyMedium)
    }
}

@Composable
private fun ReviewRow(result: QBankQuestionResult, question: Question?) {
    Card(modifier = Modifier.fillMaxWidth().padding(vertical = 4.dp)) {
        Column(modifier = Modifier.padding(12.dp)) {
            Text(question?.stem ?: result.questionId, style = MaterialTheme.typography.bodyLarge)
            Text(
                text = if (result.correct) {
                    "Correct — you picked ${result.pickedLabel ?: "nothing"}"
                } else {
                    "Missed — you picked ${result.pickedLabel ?: "nothing"}, correct was ${question?.correctLabel ?: "?"}"
                },
                style = MaterialTheme.typography.bodyMedium,
                modifier = Modifier.padding(top = 4.dp),
            )
        }
    }
    HorizontalDivider()
}
