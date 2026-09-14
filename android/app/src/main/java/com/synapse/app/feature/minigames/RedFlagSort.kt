package com.synapse.app.feature.minigames

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.Button
import androidx.compose.material3.Card
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedButton
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.unit.dp
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.lifecycle.ViewModel
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import com.synapse.app.core.minigames.MiniGameKind
import com.synapse.app.core.minigames.RedFlagFinding
import com.synapse.app.core.minigames.RedFlagLane
import com.synapse.app.core.minigames.RedFlagSortPack
import com.synapse.app.core.minigames.scoreRedFlagSort
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import javax.inject.Inject

/** What [RedFlagSortRoute] renders. */
sealed interface RedFlagSortUiState {
    /** No valid built-in red-flag-sort pack — nothing to play. */
    data object Unavailable : RedFlagSortUiState

    data class Content(
        val pack: RedFlagSortPack,
        /** Finding id -> the lane the student has placed it in so far. */
        val placements: Map<String, RedFlagLane>,
        val checked: Boolean,
    ) : RedFlagSortUiState
}

private fun redFlagSortInitialState(repository: MinigamesRepository): RedFlagSortUiState {
    val pack = repository.packs(MiniGameKind.RED_FLAG_SORT).filterIsInstance<RedFlagSortPack>().firstOrNull()
        ?: return RedFlagSortUiState.Unavailable
    return RedFlagSortUiState.Content(pack, emptyMap(), checked = false)
}

/**
 * Drives [RedFlagSortRoute]. No repository I/O beyond the static pack lookup
 * done once at construction — placements are pure in-memory state, the same
 * as web's `useState` for `placements`.
 */
@HiltViewModel
class RedFlagSortViewModel @Inject constructor(repository: MinigamesRepository) : ViewModel() {

    private val _uiState = MutableStateFlow(redFlagSortInitialState(repository))
    val uiState: StateFlow<RedFlagSortUiState> = _uiState.asStateFlow()

    fun place(findingId: String, lane: RedFlagLane) {
        val state = _uiState.value as? RedFlagSortUiState.Content ?: return
        _uiState.value = state.copy(placements = state.placements + (findingId to lane), checked = false)
    }

    fun check() {
        val state = _uiState.value as? RedFlagSortUiState.Content ?: return
        _uiState.value = state.copy(checked = true)
    }

    fun reset() {
        val state = _uiState.value as? RedFlagSortUiState.Content ?: return
        _uiState.value = state.copy(placements = emptyMap(), checked = false)
    }
}

const val RED_FLAG_SORT_CHECK_BUTTON_TAG = "red_flag_sort_check_button"

@Composable
fun RedFlagSortRoute(onBack: () -> Unit, viewModel: RedFlagSortViewModel = hiltViewModel()) {
    val uiState by viewModel.uiState.collectAsStateWithLifecycle()
    Column(modifier = Modifier.fillMaxSize().padding(16.dp)) {
        GameHeader(title = "Red Flag Sort", onBack = onBack)
        Text(
            "Classify authored urgent findings without generated facts.",
            style = MaterialTheme.typography.bodyMedium,
            modifier = Modifier.padding(top = 4.dp, bottom = 16.dp),
        )

        when (val state = uiState) {
            is RedFlagSortUiState.Unavailable -> Text(
                "No authored game pack is ready yet. This game appears once a reviewed local pack passes validation.",
                style = MaterialTheme.typography.bodyMedium,
            )

            is RedFlagSortUiState.Content -> RedFlagSortContent(
                state = state,
                onPlace = viewModel::place,
                onCheck = viewModel::check,
                onReset = viewModel::reset,
            )
        }
    }
}

@Composable
private fun RedFlagSortContent(
    state: RedFlagSortUiState.Content,
    onPlace: (String, RedFlagLane) -> Unit,
    onCheck: () -> Unit,
    onReset: () -> Unit,
) {
    val pack = state.pack
    val score = scoreRedFlagSort(pack, state.placements)
    val allPlaced = state.placements.size >= pack.findings.size

    Column(modifier = Modifier.fillMaxSize().verticalScroll(rememberScrollState())) {
        Text(pack.title, style = MaterialTheme.typography.titleLarge)
        Text(pack.prompt, style = MaterialTheme.typography.bodyMedium, modifier = Modifier.padding(top = 4.dp, bottom = 4.dp))
        Text(
            "${pack.source.label} · ${pack.source.reviewedBy}",
            style = MaterialTheme.typography.labelSmall,
            modifier = Modifier.padding(bottom = 12.dp),
        )

        for (finding in pack.findings) {
            val selected = state.placements[finding.id]
            val result = score.results.find { it.finding.id == finding.id }
            RedFlagFindingCard(
                finding = finding,
                lanes = pack.lanes,
                selected = selected,
                checked = state.checked,
                correct = result?.correct == true,
                onPlace = { lane -> onPlace(finding.id, lane) },
            )
        }

        Row(horizontalArrangement = Arrangement.spacedBy(8.dp), modifier = Modifier.padding(top = 8.dp)) {
            Button(onClick = onCheck, enabled = allPlaced, modifier = Modifier.testTag(RED_FLAG_SORT_CHECK_BUTTON_TAG)) {
                Text("Check sort")
            }
            OutlinedButton(onClick = onReset) { Text("Reset") }
        }

        if (state.checked) {
            Text(
                "${score.correct}/${score.total} findings matched to the authored lane",
                style = MaterialTheme.typography.labelLarge,
                modifier = Modifier.padding(top = 12.dp),
            )
        }
    }
}

@Composable
private fun RedFlagFindingCard(
    finding: RedFlagFinding,
    lanes: Map<RedFlagLane, String>,
    selected: RedFlagLane?,
    checked: Boolean,
    correct: Boolean,
    onPlace: (RedFlagLane) -> Unit,
) {
    Card(modifier = Modifier.fillMaxWidth().padding(bottom = 8.dp)) {
        Column(modifier = Modifier.padding(12.dp)) {
            Text(finding.text, style = MaterialTheme.typography.bodyMedium)
            Row(horizontalArrangement = Arrangement.spacedBy(8.dp), modifier = Modifier.padding(top = 8.dp)) {
                for (lane in listOf(RedFlagLane.URGENT, RedFlagLane.ROUTINE)) {
                    val isSelected = selected == lane
                    if (isSelected) {
                        Button(onClick = { onPlace(lane) }) { Text(lanes[lane].orEmpty()) }
                    } else {
                        OutlinedButton(onClick = { onPlace(lane) }) { Text(lanes[lane].orEmpty()) }
                    }
                }
            }
            if (checked && selected != null) {
                Text(
                    if (correct) "Correct — ${finding.rationale}" else finding.rationale,
                    style = MaterialTheme.typography.bodySmall,
                    modifier = Modifier.padding(top = 6.dp),
                )
            }
        }
    }
}
