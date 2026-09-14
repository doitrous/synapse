package com.synapse.app.feature.qbank

import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Button
import androidx.compose.material3.Checkbox
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableIntStateOf
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.unit.dp
import com.synapse.app.R
import com.synapse.app.core.qbank.MultiResponseQuestion
import com.synapse.app.core.qbank.MultiResponseResult
import com.synapse.app.core.qbank.markMultiResponse

fun multiResponseOptionTag(label: String): String = "qbank_mr_option_$label"
const val QBANK_MR_CHECK_BUTTON_TAG = "qbank_mr_check_button"
const val QBANK_MR_NEXT_BUTTON_TAG = "qbank_mr_next_button"
const val QBANK_MR_FEEDBACK_TAG = "qbank_mr_feedback"
const val QBANK_MR_DONE_TAG = "qbank_mr_done"
const val QBANK_MR_EMPTY_TAG = "qbank_mr_empty"

/**
 * Steps through [questions] one at a time, "select all that apply" style.
 *
 * This is a **separate surface from [SessionRunnerScreen]**, not a mode of
 * it: [com.synapse.app.core.qbank.QBankSession] is single-select by design
 * (its `picked` map holds one label per question, and every score/history
 * computation downstream assumes that), so a multi-response question can't
 * be dropped into a regular sitting. [MultiResponseQuestion] +
 * [markMultiResponse] give the format its own home instead of widening that
 * contract — see `core/qbank/MultiResponse.kt`'s doc comment.
 *
 * Deliberately self-contained (local `remember`ed state, no `ViewModel`):
 * there's no persistence, timer, or cross-screen navigation to justify one —
 * [questions] is the whole input, and finishing just calls [onDone].
 */
@Composable
fun MultiResponseRunner(
    questions: List<MultiResponseQuestion>,
    onDone: () -> Unit,
) {
    if (questions.isEmpty()) {
        Column(
            modifier = Modifier.fillMaxSize().padding(24.dp).testTag(QBANK_MR_EMPTY_TAG),
            horizontalAlignment = Alignment.CenterHorizontally,
        ) {
            Text(stringResource(R.string.qbank_mr_empty_message), style = MaterialTheme.typography.bodyLarge)
            Button(onClick = onDone, modifier = Modifier.padding(top = 16.dp)) { Text(stringResource(R.string.qbank_back)) }
        }
        return
    }

    var index by rememberSaveable { mutableIntStateOf(0) }
    var selected by remember(index) { mutableStateOf(setOf<String>()) }
    var result by remember(index) { mutableStateOf<MultiResponseResult?>(null) }

    val question = questions[index]

    Column(modifier = Modifier.fillMaxSize().padding(16.dp)) {
        Text(
            stringResource(R.string.qbank_mr_progress_format, index + 1, questions.size),
            style = MaterialTheme.typography.titleMedium,
        )
        Text(question.stem, style = MaterialTheme.typography.bodyLarge, modifier = Modifier.padding(top = 12.dp))

        question.options.forEach { option ->
            val checked = option.label in selected
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .clickable(enabled = result == null) {
                        selected = if (checked) selected - option.label else selected + option.label
                    }
                    .testTag(multiResponseOptionTag(option.label))
                    .padding(vertical = 4.dp),
                verticalAlignment = Alignment.CenterVertically,
            ) {
                Checkbox(checked = checked, onCheckedChange = null, enabled = result == null)
                Text("${option.label}. ${option.text}", modifier = Modifier.padding(start = 8.dp))
            }
            if (result != null) {
                val r = result!!
                val note = when (option.label) {
                    in r.hit -> stringResource(R.string.qbank_navstate_correct)
                    in r.falsePositive -> stringResource(R.string.qbank_mr_note_incorrect)
                    in r.missed -> stringResource(R.string.qbank_mr_note_missed)
                    else -> null
                }
                if (note != null) {
                    Text(
                        text = "$note. ${option.explanation}",
                        style = MaterialTheme.typography.bodyMedium,
                        modifier = Modifier.padding(start = 40.dp, bottom = 4.dp),
                    )
                }
            }
        }

        if (result == null) {
            Button(
                onClick = { result = markMultiResponse(question, selected.toList()) },
                enabled = selected.isNotEmpty(),
                modifier = Modifier.fillMaxWidth().padding(top = 12.dp).testTag(QBANK_MR_CHECK_BUTTON_TAG),
            ) {
                Text(stringResource(R.string.qbank_check))
            }
        } else {
            val r = result!!
            Text(
                text = if (r.allCorrect) {
                    stringResource(R.string.qbank_mr_all_correct)
                } else {
                    stringResource(R.string.qbank_mr_not_quite)
                },
                style = MaterialTheme.typography.titleMedium,
                modifier = Modifier.padding(top = 12.dp).testTag(QBANK_MR_FEEDBACK_TAG),
            )
            if (index < questions.lastIndex) {
                Button(
                    onClick = { index++ },
                    modifier = Modifier.fillMaxWidth().padding(top = 8.dp).testTag(QBANK_MR_NEXT_BUTTON_TAG),
                ) {
                    Text(stringResource(R.string.qbank_mr_next_question))
                }
            } else {
                Button(
                    onClick = onDone,
                    modifier = Modifier.fillMaxWidth().padding(top = 8.dp).testTag(QBANK_MR_DONE_TAG),
                ) {
                    Text(stringResource(R.string.qbank_done))
                }
            }
        }
    }
}
