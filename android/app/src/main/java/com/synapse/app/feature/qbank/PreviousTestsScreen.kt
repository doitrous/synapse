package com.synapse.app.feature.qbank

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material3.AlertDialog
import androidx.compose.material3.Card
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedButton
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.res.pluralStringResource
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.unit.dp
import com.synapse.app.R
import com.synapse.app.core.qbank.QBankCollections.SessionSummary

const val PREVIOUS_TESTS_EMPTY_TAG = "qbank_previous_tests_empty"
fun previousTestRowTag(sessionId: String): String = "qbank_previous_test_$sessionId"
fun previousTestRenameFieldTag(sessionId: String): String = "qbank_previous_test_rename_$sessionId"
fun previousTestRetakeSameTag(sessionId: String): String = "qbank_previous_test_retake_same_$sessionId"
fun previousTestRetakeScopeTag(sessionId: String): String = "qbank_previous_test_retake_scope_$sessionId"
fun previousTestReviewTag(sessionId: String): String = "qbank_previous_test_review_$sessionId"
fun previousTestDeleteTag(sessionId: String): String = "qbank_previous_test_delete_$sessionId"

/**
 * "Previous tests": every finished sitting, newest first, each offering
 * rename, review answers, retake the same questions, a new test over the same
 * scope, and delete. Port of the `PreviousTests` component in
 * `src/pages/student/QuestionBank.tsx`, reduced to what has an Android
 * equivalent — see [QuestionBankViewModel]'s doc comment on why "resume" (an
 * in-progress, cross-process-death-persistent sitting) isn't offered here.
 */
@Composable
fun PreviousTestsScreen(
    sessions: List<SessionSummary>,
    names: Map<String, String>,
    canRetakeSame: (String) -> Boolean,
    onRename: (String, String) -> Unit,
    onReview: (String) -> Unit,
    onRetakeSame: (String) -> Unit,
    onRetakeScope: (SessionSummary) -> Unit,
    onDelete: (String) -> Unit,
    modifier: Modifier = Modifier,
) {
    if (sessions.isEmpty()) {
        Column(modifier = modifier.fillMaxSize().padding(16.dp).testTag(PREVIOUS_TESTS_EMPTY_TAG)) {
            Text(stringResource(R.string.qbank_previous_none_title), style = MaterialTheme.typography.titleMedium)
            Text(
                text = stringResource(R.string.qbank_previous_none_body),
                style = MaterialTheme.typography.bodyMedium,
            )
        }
        return
    }

    val untitledTest = stringResource(R.string.qbank_untitled_test)
    LazyColumn(modifier = modifier.fillMaxSize().padding(16.dp)) {
        items(sessions, key = { it.sessionId }) { entry ->
            PreviousTestRow(
                entry = entry,
                name = names[entry.sessionId]?.trim().let { if (it.isNullOrBlank()) untitledTest else it },
                canRetakeSame = canRetakeSame(entry.sessionId),
                onRename = { name -> onRename(entry.sessionId, name) },
                onReview = { onReview(entry.sessionId) },
                onRetakeSame = { onRetakeSame(entry.sessionId) },
                onRetakeScope = { onRetakeScope(entry) },
                onDelete = { onDelete(entry.sessionId) },
            )
        }
    }
}

@Composable
private fun PreviousTestRow(
    entry: SessionSummary,
    name: String,
    canRetakeSame: Boolean,
    onRename: (String) -> Unit,
    onReview: () -> Unit,
    onRetakeSame: () -> Unit,
    onRetakeScope: () -> Unit,
    onDelete: () -> Unit,
) {
    var confirmingDelete by rememberSaveable { mutableStateOf(false) }
    // Keyed to `name` so a rename applied elsewhere (or the initial load) resets
    // the field; committed on every keystroke below rather than on blur, since a
    // rename is infrequent enough that persisting per keystroke costs nothing.
    var draft by rememberSaveable(name) { mutableStateOf(name) }

    Card(modifier = Modifier.fillMaxWidth().padding(bottom = 12.dp).testTag(previousTestRowTag(entry.sessionId))) {
        Column(modifier = Modifier.padding(16.dp)) {
            OutlinedTextField(
                value = draft,
                onValueChange = { text -> draft = text; onRename(text) },
                label = { Text(stringResource(R.string.qbank_test_name_label)) },
                singleLine = true,
                modifier = Modifier
                    .fillMaxWidth()
                    .testTag(previousTestRenameFieldTag(entry.sessionId)),
            )

            Text(
                text = pluralStringResource(R.plurals.qbank_questions_count, entry.answered, entry.answered) +
                    (entry.accuracy?.let { " · ${(it * 100).toInt()}%" } ?: " · —"),
                style = MaterialTheme.typography.bodyMedium,
                modifier = Modifier.padding(top = 4.dp),
            )

            Row(
                modifier = Modifier.fillMaxWidth().padding(top = 12.dp),
                horizontalArrangement = Arrangement.spacedBy(8.dp),
                verticalAlignment = Alignment.CenterVertically,
            ) {
                OutlinedButton(
                    onClick = onRetakeSame,
                    enabled = canRetakeSame,
                    modifier = Modifier.testTag(previousTestRetakeSameTag(entry.sessionId)),
                ) { Text(stringResource(R.string.qbank_retake_these)) }
                OutlinedButton(
                    onClick = onRetakeScope,
                    modifier = Modifier.testTag(previousTestRetakeScopeTag(entry.sessionId)),
                ) { Text(stringResource(R.string.qbank_new_test_same_scope)) }
                TextButton(
                    onClick = onReview,
                    modifier = Modifier.testTag(previousTestReviewTag(entry.sessionId)),
                ) { Text(stringResource(R.string.qbank_review_answers)) }
                TextButton(
                    onClick = { confirmingDelete = true },
                    modifier = Modifier.testTag(previousTestDeleteTag(entry.sessionId)),
                ) { Text(stringResource(R.string.qbank_delete)) }
            }
        }
    }

    if (confirmingDelete) {
        AlertDialog(
            onDismissRequest = { confirmingDelete = false },
            title = { Text(stringResource(R.string.qbank_delete_test_dialog_title)) },
            text = { Text(stringResource(R.string.qbank_delete_test_dialog_body)) },
            confirmButton = {
                TextButton(onClick = { confirmingDelete = false; onDelete() }) { Text(stringResource(R.string.qbank_delete)) }
            },
            dismissButton = {
                TextButton(onClick = { confirmingDelete = false }) { Text(stringResource(R.string.qbank_cancel)) }
            },
        )
    }
}
