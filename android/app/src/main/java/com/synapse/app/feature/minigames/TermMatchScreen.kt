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
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedButton
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.res.pluralStringResource
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.unit.dp
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import com.synapse.app.R
import com.synapse.app.core.minigames.MIN_PAIRS
import com.synapse.app.core.minigames.MatchMode
import com.synapse.app.core.minigames.MatchRefusal
import com.synapse.app.core.minigames.MatchTile
import kotlinx.coroutines.delay
import java.time.Duration

/** How long a wrong pair stays flagged before it clears — mirrors web's `MISMATCH_FLASH_MS`. */
private const val MISMATCH_FLASH_MS = 650L

const val TERM_MATCH_LOADING_TAG = "term_match_loading"
fun termMatchTileTag(tileId: String): String = "term_match_tile_$tileId"

@Composable
fun TermMatchRoute(onBack: () -> Unit, viewModel: TermMatchViewModel = hiltViewModel()) {
    val uiState by viewModel.uiState.collectAsStateWithLifecycle()
    Column(modifier = Modifier.fillMaxSize().padding(16.dp)) {
        GameHeader(title = stringResource(R.string.minigames_termmatch_title), onBack = onBack)
        Text(
            stringResource(R.string.minigames_termmatch_description),
            style = MaterialTheme.typography.bodyMedium,
            modifier = Modifier.padding(top = 4.dp, bottom = 16.dp),
        )

        when (val state = uiState) {
            is TermMatchUiState.Loading -> Text(stringResource(R.string.minigames_loading), modifier = Modifier.testTag(TERM_MATCH_LOADING_TAG))
            is TermMatchUiState.Content -> TermMatchContent(
                state = state,
                onModeChange = viewModel::newGame,
                onTap = viewModel::tap,
                onClearWrongFlash = viewModel::clearWrongFlash,
                onReplay = { viewModel.newGame() },
            )
        }
    }
}

@Composable
private fun TermMatchContent(
    state: TermMatchUiState.Content,
    onModeChange: (MatchMode) -> Unit,
    onTap: (String) -> Unit,
    onClearWrongFlash: () -> Unit,
    onReplay: () -> Unit,
) {
    LaunchedEffect(state.wrongIds) {
        if (state.wrongIds.isNotEmpty()) {
            delay(MISMATCH_FLASH_MS)
            onClearWrongFlash()
        }
    }

    Row(horizontalArrangement = Arrangement.spacedBy(8.dp), modifier = Modifier.padding(bottom = 12.dp)) {
        for (mode in listOf(MatchMode.ARABIC, MatchMode.DEFINITION)) {
            val label = stringResource(if (mode == MatchMode.ARABIC) R.string.minigames_mode_arabic else R.string.minigames_mode_definition)
            if (mode == state.mode) {
                Button(onClick = { onModeChange(mode) }) { Text(label) }
            } else {
                OutlinedButton(onClick = { onModeChange(mode) }) { Text(label) }
            }
        }
    }

    if (state.board.refusal == MatchRefusal.TOO_FEW_TERMS) {
        Text(
            pluralStringResource(R.plurals.minigames_termmatch_too_few_terms, MIN_PAIRS, MIN_PAIRS),
            style = MaterialTheme.typography.bodyMedium,
        )
        return
    }

    if (state.finishedAt != null) {
        val elapsed = Duration.between(state.startedAt, state.finishedAt)
        Card(modifier = Modifier.fillMaxWidth().padding(bottom = 12.dp)) {
            Column(modifier = Modifier.padding(12.dp)) {
                Text(stringResource(R.string.minigames_time_taken_format, elapsed.seconds), style = MaterialTheme.typography.bodyMedium)
                Text(
                    stringResource(R.string.minigames_termmatch_wrong_attempts_format, state.wrongAttempts),
                    style = MaterialTheme.typography.bodyMedium,
                )
                Button(onClick = onReplay, modifier = Modifier.padding(top = 8.dp)) { Text(stringResource(R.string.minigames_play_again)) }
            }
        }
        return
    }

    Row(horizontalArrangement = Arrangement.spacedBy(8.dp), modifier = Modifier.fillMaxSize()) {
        TileColumn(tiles = state.board.termTiles, modifier = Modifier.weight(1f), state = state, onTap = onTap)
        TileColumn(tiles = state.board.partnerTiles, modifier = Modifier.weight(1f), state = state, onTap = onTap)
    }
}

@Composable
private fun TileColumn(
    tiles: List<MatchTile>,
    modifier: Modifier,
    state: TermMatchUiState.Content,
    onTap: (String) -> Unit,
) {
    Column(modifier = modifier.verticalScroll(rememberScrollState())) {
        for (tile in tiles) {
            val matched = tile.id in state.matchedIds
            val wrong = tile.id in state.wrongIds
            val selected = tile.id == state.selectedId
            val containerColor = when {
                matched -> MaterialTheme.colorScheme.tertiaryContainer
                wrong -> MaterialTheme.colorScheme.errorContainer
                selected -> MaterialTheme.colorScheme.primaryContainer
                else -> MaterialTheme.colorScheme.surfaceVariant
            }
            Card(
                onClick = { if (!matched) onTap(tile.id) },
                enabled = !matched,
                colors = CardDefaults.cardColors(containerColor = containerColor, disabledContainerColor = containerColor),
                modifier = Modifier.fillMaxWidth().padding(bottom = 6.dp).testTag(termMatchTileTag(tile.id)),
            ) {
                Text(tile.text, style = MaterialTheme.typography.bodyMedium, modifier = Modifier.fillMaxWidth().padding(12.dp))
            }
        }
    }
}

