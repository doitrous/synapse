package com.synapse.app.feature.qbank

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowBack
import androidx.compose.material.icons.automirrored.filled.ArrowForward
import androidx.compose.material.icons.filled.Close
import androidx.compose.material.icons.filled.Star
import androidx.compose.material3.AlertDialog
import androidx.compose.material3.Button
import androidx.compose.material3.Checkbox
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedButton
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.runtime.Composable
import androidx.compose.runtime.DisposableEffect
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.text.style.TextDecoration
import androidx.compose.ui.unit.dp
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.lifecycle.Lifecycle
import androidx.lifecycle.LifecycleEventObserver
import androidx.lifecycle.compose.LocalLifecycleOwner
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import com.synapse.app.R
import com.synapse.app.core.qbank.AnswerOption
import com.synapse.app.core.qbank.QBankSession
import kotlinx.coroutines.delay

fun optionRowTag(label: String): String = "qbank_option_$label"
fun optionCrossOutTag(label: String): String = "qbank_crossout_$label"
const val QBANK_CHECK_BUTTON_TAG = "qbank_check_button"
const val QBANK_NEXT_BUTTON_TAG = "qbank_next_button"
const val QBANK_PREV_BUTTON_TAG = "qbank_prev_button"
const val QBANK_FLAG_BUTTON_TAG = "qbank_flag_button"
const val QBANK_NOTE_FIELD_TAG = "qbank_note_field"
const val QBANK_TIMER_TAG = "qbank_timer_text"
const val QBANK_RESUME_BUTTON_TAG = "qbank_resume_button"
const val QBANK_END_BUTTON_TAG = "qbank_end_button"
const val QBANK_END_DIALOG_LEAVE_TAG = "qbank_end_dialog_leave"
const val QBANK_END_DIALOG_SUBMIT_TAG = "qbank_end_dialog_submit"
const val QBANK_EXPLANATION_TAG = "qbank_explanation"

/**
 * Runs one [com.synapse.app.core.qbank.QBankSession] question at a time:
 * vignette/stem/options, per-option cross-out (independent of picking),
 * Tutor-mode Check + revealed explanations, flag + private note, a
 * pause-on-background timer, the question navigator, and an End dialog
 * (Leave vs Submit).
 *
 * The 1-second timer tick is driven here, in the UI layer, via a plain
 * `delay(1000)` loop in [LaunchedEffect] — [SessionViewModel.tick] itself is
 * a synchronous state update with no coroutine of its own, which is what
 * lets tests call it directly instead of manipulating virtual time. A
 * [LifecycleEventObserver] pauses that loop on `ON_STOP` and requires the
 * student's explicit "Resume" tap on `ON_START` (see
 * [SessionViewModel.onAppForeground]'s doc comment for why).
 */
@Composable
fun SessionRunnerScreen(
    onLeave: () -> Unit,
    viewModel: SessionViewModel = hiltViewModel(),
) {
    val uiState by viewModel.uiState.collectAsStateWithLifecycle()
    val lifecycleOwner = LocalLifecycleOwner.current

    DisposableEffect(lifecycleOwner, viewModel) {
        val observer = LifecycleEventObserver { _, event ->
            when (event) {
                Lifecycle.Event.ON_STOP -> viewModel.onAppBackground()
                Lifecycle.Event.ON_START -> viewModel.onAppForeground()
                else -> {}
            }
        }
        lifecycleOwner.lifecycle.addObserver(observer)
        onDispose { lifecycleOwner.lifecycle.removeObserver(observer) }
    }

    val finished = uiState.result != null
    LaunchedEffect(uiState.isPaused, finished) {
        if (uiState.isPaused || finished) return@LaunchedEffect
        while (true) {
            delay(1000)
            viewModel.tick()
        }
    }

    SessionRunnerContent(
        uiState = uiState,
        onPick = viewModel::pick,
        onToggleCrossOut = viewModel::toggleCrossOut,
        onCheck = viewModel::check,
        onNext = viewModel::next,
        onPrev = viewModel::prev,
        onGoTo = viewModel::goTo,
        onToggleFlag = viewModel::toggleFlag,
        onNoteChange = viewModel::setNote,
        onResumeTimer = viewModel::resumeTimer,
        onLeave = onLeave,
        onSubmit = viewModel::finish,
    )
}

@Composable
private fun SessionRunnerContent(
    uiState: SessionUiState,
    onPick: (String) -> Unit,
    onToggleCrossOut: (String) -> Unit,
    onCheck: () -> Unit,
    onNext: () -> Unit,
    onPrev: () -> Unit,
    onGoTo: (Int) -> Unit,
    onToggleFlag: () -> Unit,
    onNoteChange: (String) -> Unit,
    onResumeTimer: () -> Unit,
    onLeave: () -> Unit,
    onSubmit: () -> Unit,
) {
    val question = uiState.question ?: return
    var showEndDialog by remember { mutableStateOf(false) }

    Column(modifier = Modifier.fillMaxSize().padding(16.dp)) {
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceBetween,
        ) {
            Text(
                text = formatTimer(uiState.timerDisplaySeconds, uiState.isOvertime),
                style = MaterialTheme.typography.titleMedium,
                modifier = Modifier.testTag(QBANK_TIMER_TAG),
            )
            Row {
                if (uiState.isPaused) {
                    TextButton(onClick = onResumeTimer, modifier = Modifier.testTag(QBANK_RESUME_BUTTON_TAG)) {
                        Text(stringResource(R.string.qbank_resume))
                    }
                }
                IconButton(onClick = onToggleFlag, modifier = Modifier.testTag(QBANK_FLAG_BUTTON_TAG)) {
                    Icon(
                        Icons.Filled.Star,
                        contentDescription = stringResource(R.string.qbank_flag_for_review_description),
                        tint = if (uiState.isFlagged) Color(0xFFFFC107) else MaterialTheme.colorScheme.onSurfaceVariant,
                    )
                }
                TextButton(onClick = { showEndDialog = true }, modifier = Modifier.testTag(QBANK_END_BUTTON_TAG)) {
                    Text(stringResource(R.string.qbank_end))
                }
            }
        }

        Text(
            text = stringResource(R.string.qbank_question_progress_format, uiState.index + 1, uiState.total),
            style = MaterialTheme.typography.bodyMedium,
            modifier = Modifier.padding(top = 4.dp),
        )

        Column(
            modifier = Modifier
                .weight(1f)
                .padding(top = 8.dp)
                .verticalScroll(rememberScrollState()),
        ) {
            Text(question.vignette, style = MaterialTheme.typography.bodyLarge)
            Text(question.stem, style = MaterialTheme.typography.titleMedium, modifier = Modifier.padding(top = 8.dp))

            question.options.forEach { option ->
                OptionRow(
                    option = option,
                    isSelected = uiState.pickedLabel == option.label,
                    isCrossedOut = option.label in uiState.currentCrossedOut,
                    isChecked = uiState.isChecked,
                    isCorrectAnswer = option.label == question.correctLabel,
                    onSelect = { onPick(option.label) },
                    onToggleCrossOut = { onToggleCrossOut(option.label) },
                )
            }
            if (uiState.isChecked) {
                Text(
                    text = question.explanation,
                    style = MaterialTheme.typography.bodyMedium,
                    modifier = Modifier.padding(top = 8.dp).testTag(QBANK_EXPLANATION_TAG),
                )
            }
            OutlinedTextField(
                value = uiState.currentNote,
                onValueChange = onNoteChange,
                label = { Text(stringResource(R.string.qbank_private_note_label)) },
                modifier = Modifier.fillMaxWidth().padding(top = 12.dp).testTag(QBANK_NOTE_FIELD_TAG),
            )
            QuestionNavigator(
                navStates = uiState.navStates,
                currentIndex = uiState.index,
                flagged = { index -> uiState.questionIds.getOrNull(index) in uiState.flaggedIds },
                onSelect = onGoTo,
                modifier = Modifier.padding(top = 16.dp),
            )
        }

        if (uiState.mode == QBankSession.Mode.Tutor && !uiState.isChecked) {
            Button(
                onClick = onCheck,
                enabled = uiState.pickedLabel != null,
                modifier = Modifier.fillMaxWidth().padding(top = 8.dp).testTag(QBANK_CHECK_BUTTON_TAG),
            ) {
                Text(stringResource(R.string.qbank_check))
            }
        }

        Row(
            modifier = Modifier.fillMaxWidth().padding(top = 8.dp),
            horizontalArrangement = Arrangement.SpaceBetween,
        ) {
            OutlinedButton(
                onClick = onPrev,
                enabled = !uiState.isFirst,
                modifier = Modifier.testTag(QBANK_PREV_BUTTON_TAG),
            ) {
                Icon(Icons.AutoMirrored.Filled.ArrowBack, contentDescription = null)
                Spacer(Modifier.width(4.dp))
                Text(stringResource(R.string.qbank_previous))
            }
            OutlinedButton(
                onClick = onNext,
                enabled = !uiState.isLast,
                modifier = Modifier.testTag(QBANK_NEXT_BUTTON_TAG),
            ) {
                Text(stringResource(R.string.qbank_next))
                Spacer(Modifier.width(4.dp))
                Icon(Icons.AutoMirrored.Filled.ArrowForward, contentDescription = null)
            }
        }
    }

    if (showEndDialog) {
        AlertDialog(
            onDismissRequest = { showEndDialog = false },
            title = { Text(stringResource(R.string.qbank_end_dialog_title)) },
            text = { Text(stringResource(R.string.qbank_end_dialog_body)) },
            confirmButton = {
                TextButton(
                    onClick = { showEndDialog = false; onSubmit() },
                    modifier = Modifier.testTag(QBANK_END_DIALOG_SUBMIT_TAG),
                ) { Text(stringResource(R.string.qbank_submit)) }
            },
            dismissButton = {
                TextButton(
                    onClick = { showEndDialog = false; onLeave() },
                    modifier = Modifier.testTag(QBANK_END_DIALOG_LEAVE_TAG),
                ) { Text(stringResource(R.string.qbank_leave)) }
            },
        )
    }
}

@Composable
private fun OptionRow(
    option: AnswerOption,
    isSelected: Boolean,
    isCrossedOut: Boolean,
    isChecked: Boolean,
    isCorrectAnswer: Boolean,
    onSelect: () -> Unit,
    onToggleCrossOut: () -> Unit,
) {
    val backgroundColor = when {
        !isChecked -> if (isSelected) MaterialTheme.colorScheme.secondaryContainer else MaterialTheme.colorScheme.surface
        isCorrectAnswer -> Color(0xFFDCF5E3)
        isSelected -> Color(0xFFFBDCDC)
        else -> MaterialTheme.colorScheme.surface
    }

    Column(
        modifier = Modifier
            .fillMaxWidth()
            .padding(vertical = 4.dp)
            .clip(RoundedCornerShape(8.dp))
            .background(backgroundColor),
    ) {
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .clickable(enabled = !isChecked && !isCrossedOut, onClick = onSelect)
                .testTag(optionRowTag(option.label))
                .padding(12.dp),
        ) {
            Checkbox(checked = isSelected, onCheckedChange = { onSelect() }, enabled = !isChecked && !isCrossedOut)
            Text(
                text = "${option.label}. ${option.text}",
                style = MaterialTheme.typography.bodyLarge,
                textDecoration = if (isCrossedOut) TextDecoration.LineThrough else null,
                modifier = Modifier.weight(1f).padding(start = 4.dp),
            )
            IconButton(
                onClick = onToggleCrossOut,
                enabled = !isChecked,
                modifier = Modifier.size(32.dp).testTag(optionCrossOutTag(option.label)),
            ) {
                Icon(
                    Icons.Filled.Close,
                    contentDescription = stringResource(R.string.qbank_cross_out_option_format, option.label),
                )
            }
        }
        if (isChecked) {
            Surface(color = Color.Transparent) {
                Text(
                    text = option.explanation,
                    style = MaterialTheme.typography.bodyMedium,
                    modifier = Modifier.padding(start = 44.dp, end = 12.dp, bottom = 8.dp),
                )
            }
        }
    }
}

private fun formatTimer(seconds: Int, overtime: Boolean): String {
    val minutes = seconds / 60
    val secs = seconds % 60
    val text = "%d:%02d".format(minutes, secs)
    return if (overtime) "+$text" else text
}
