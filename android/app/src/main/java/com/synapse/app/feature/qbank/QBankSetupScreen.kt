package com.synapse.app.feature.qbank

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.material3.Button
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.FilterChip
import androidx.compose.material3.HorizontalDivider
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
import androidx.compose.ui.text.input.KeyboardType
import androidx.compose.ui.unit.dp
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import com.synapse.app.core.qbank.QBankSession

const val QBANK_SETUP_LOADING_TAG = "qbank_setup_loading"
fun sourceChipTag(source: QuestionSource): String = "qbank_source_${source.name}"
fun presetChipTag(preset: QBankPreset): String = "qbank_preset_${preset.name}"
const val QBANK_MODE_TUTOR_TAG = "qbank_mode_tutor"
const val QBANK_MODE_TIMED_TAG = "qbank_mode_timed"
fun lengthChipTag(length: Int): String = "qbank_length_$length"
const val QBANK_CUSTOM_LENGTH_FIELD_TAG = "qbank_custom_length_field"
const val QBANK_START_BUTTON_TAG = "qbank_start_button"
const val QBANK_DOWNLOAD_OFFLINE_BUTTON_TAG = "qbank_download_offline_button"
const val QBANK_MULTI_RESPONSE_ENTRY_TAG = "qbank_multi_response_entry"

private val LENGTH_OPTIONS = listOf(5, 10, 20, 40)

/**
 * The Question Bank landing screen: pick a source, a scope (via
 * [ScopeChooser]), a preset shortcut, a mode, and a length, then [Start] a
 * sitting. Also the entry point to [OfflineDownloadScreen] and the
 * multi-response practice surface (see [MultiResponseRunner] for why that's
 * separate from the main single-select sitting built here).
 */
@Composable
fun QBankSetupScreen(
    onStartOffline: () -> Unit,
    onStartMultiResponsePractice: () -> Unit,
    viewModel: QuestionBankViewModel = hiltViewModel(),
) {
    val uiState by viewModel.uiState.collectAsStateWithLifecycle()

    QBankSetupContent(
        uiState = uiState,
        onSourceChange = viewModel::onSourceChange,
        onToggleTopic = viewModel::onToggleTopic,
        onToggleSubtopic = viewModel::onToggleSubtopic,
        onPresetSelected = viewModel::onPresetSelected,
        onModeChange = viewModel::onModeChange,
        onLengthChange = viewModel::onLengthChange,
        onCustomLengthChange = viewModel::onCustomLengthChange,
        onStart = viewModel::start,
        onDownloadOffline = onStartOffline,
        onMultiResponsePractice = onStartMultiResponsePractice,
    )
}

@Composable
private fun QBankSetupContent(
    uiState: QuestionBankUiState,
    onSourceChange: (QuestionSource) -> Unit,
    onToggleTopic: (String) -> Unit,
    onToggleSubtopic: (String, String) -> Unit,
    onPresetSelected: (QBankPreset) -> Unit,
    onModeChange: (QBankSession.Mode) -> Unit,
    onLengthChange: (Int) -> Unit,
    onCustomLengthChange: (Int) -> Unit,
    onStart: () -> Unit,
    onDownloadOffline: () -> Unit,
    onMultiResponsePractice: () -> Unit,
) {
    if (uiState.loading) {
        Column(
            modifier = Modifier.fillMaxSize().testTag(QBANK_SETUP_LOADING_TAG),
            horizontalAlignment = Alignment.CenterHorizontally,
            verticalArrangement = Arrangement.Center,
        ) {
            CircularProgressIndicator()
        }
        return
    }

    Column(modifier = Modifier.fillMaxSize().padding(16.dp)) {
        Text("Question Bank", style = MaterialTheme.typography.titleLarge)

        Text(
            text = "Source",
            style = MaterialTheme.typography.titleMedium,
            modifier = Modifier.padding(top = 16.dp),
        )
        Row(horizontalArrangement = Arrangement.spacedBy(8.dp), modifier = Modifier.padding(top = 4.dp)) {
            QuestionSource.entries.forEach { source ->
                FilterChip(
                    selected = uiState.source == source,
                    onClick = { onSourceChange(source) },
                    label = { Text(source.label()) },
                    modifier = Modifier.testTag(sourceChipTag(source)),
                )
            }
        }

        Text(
            text = "Quick presets",
            style = MaterialTheme.typography.titleMedium,
            modifier = Modifier.padding(top = 16.dp),
        )
        Row(horizontalArrangement = Arrangement.spacedBy(8.dp), modifier = Modifier.padding(top = 4.dp)) {
            QBankPreset.entries.forEach { preset ->
                FilterChip(
                    selected = uiState.preset == preset,
                    onClick = { onPresetSelected(preset) },
                    label = { Text(preset.label()) },
                    modifier = Modifier.testTag(presetChipTag(preset)),
                )
            }
        }

        Text(
            text = "Topics (${uiState.poolSize()} question${if (uiState.poolSize() == 1) "" else "s"} selected)",
            style = MaterialTheme.typography.titleMedium,
            modifier = Modifier.padding(top = 16.dp),
        )
        ScopeChooser(
            topics = uiState.topics,
            scope = uiState.scope,
            onToggleTopic = onToggleTopic,
            onToggleSubtopic = onToggleSubtopic,
            modifier = Modifier.weight(1f).padding(top = 4.dp),
        )

        HorizontalDivider(modifier = Modifier.padding(vertical = 8.dp))

        Text("Mode", style = MaterialTheme.typography.titleMedium)
        Row(horizontalArrangement = Arrangement.spacedBy(8.dp), modifier = Modifier.padding(top = 4.dp)) {
            FilterChip(
                selected = uiState.mode == QBankSession.Mode.Tutor,
                onClick = { onModeChange(QBankSession.Mode.Tutor) },
                label = { Text("Tutor") },
                modifier = Modifier.testTag(QBANK_MODE_TUTOR_TAG),
            )
            FilterChip(
                selected = uiState.mode == QBankSession.Mode.Timed,
                onClick = { onModeChange(QBankSession.Mode.Timed) },
                label = { Text("Timed") },
                modifier = Modifier.testTag(QBANK_MODE_TIMED_TAG),
            )
        }

        Text("Length", style = MaterialTheme.typography.titleMedium, modifier = Modifier.padding(top = 12.dp))
        Row(horizontalArrangement = Arrangement.spacedBy(8.dp), modifier = Modifier.padding(top = 4.dp)) {
            LENGTH_OPTIONS.forEach { length ->
                FilterChip(
                    selected = uiState.customLength == null && uiState.length == length,
                    onClick = { onLengthChange(length) },
                    label = { Text("$length") },
                    modifier = Modifier.testTag(lengthChipTag(length)),
                )
            }
        }
        // A local text buffer, keyed to the view model's value so an external
        // change (a length chip or preset clearing customLength) still resets
        // it — but NOT bound straight to the parsed Int, so a transient
        // non-numeric edit (backspacing the last digit to retype) isn't
        // rejected and snapped back. Only a valid, complete number is pushed up.
        var customText by rememberSaveable(uiState.customLength) {
            mutableStateOf(uiState.customLength?.toString().orEmpty())
        }
        OutlinedTextField(
            value = customText,
            onValueChange = { text ->
                val digits = text.filter(Char::isDigit).take(2)
                customText = digits
                digits.toIntOrNull()?.let(onCustomLengthChange)
            },
            label = { Text("Custom length (max $QBANK_MAX_LENGTH)") },
            singleLine = true,
            keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Number),
            modifier = Modifier.fillMaxWidth().padding(top = 8.dp).testTag(QBANK_CUSTOM_LENGTH_FIELD_TAG),
        )

        Row(
            modifier = Modifier.fillMaxWidth().padding(top = 16.dp),
            horizontalArrangement = Arrangement.spacedBy(8.dp),
        ) {
            OutlinedButton(
                onClick = onDownloadOffline,
                modifier = Modifier.weight(1f).testTag(QBANK_DOWNLOAD_OFFLINE_BUTTON_TAG),
            ) {
                Text("Download for offline")
            }
            TextButton(
                onClick = onMultiResponsePractice,
                modifier = Modifier.weight(1f).testTag(QBANK_MULTI_RESPONSE_ENTRY_TAG),
            ) {
                Text("Multi-response practice")
            }
        }

        Button(
            onClick = onStart,
            enabled = uiState.poolSize() > 0,
            modifier = Modifier.fillMaxWidth().padding(top = 12.dp).testTag(QBANK_START_BUTTON_TAG),
        ) {
            Text("Start (${uiState.poolSize().coerceAtMost(uiState.length)} questions)")
        }
    }
}

private fun QuestionSource.label(): String = when (this) {
    QuestionSource.All -> "All"
    QuestionSource.Flagged -> "Flagged"
    QuestionSource.Incorrect -> "Got wrong"
    QuestionSource.Omitted -> "Omitted"
}

private fun QBankPreset.label(): String = when (this) {
    QBankPreset.Weak -> "Weak areas"
    QBankPreset.Emergency -> "Emergency"
    QBankPreset.Demanding -> "Demanding"
    QBankPreset.Everything -> "Everything"
}
