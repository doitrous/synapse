package com.synapse.app.feature.minigames

import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Button
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.unit.dp
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import com.synapse.app.R
import com.synapse.app.core.minigames.SpotterRefusal
import com.synapse.app.core.minigames.SpotterRound
import java.time.Duration

const val SPOTTER_LOADING_TAG = "spotter_loading"
fun spotterOptionTag(option: String): String = "spotter_option_$option"

@Composable
fun SpotterRoute(onBack: () -> Unit, viewModel: SpotterViewModel = hiltViewModel()) {
    val uiState by viewModel.uiState.collectAsStateWithLifecycle()
    Column(modifier = Modifier.fillMaxSize().padding(16.dp)) {
        GameHeader(title = stringResource(R.string.minigames_spotter_title), onBack = onBack)
        Text(
            stringResource(R.string.minigames_spotter_description),
            style = MaterialTheme.typography.bodyMedium,
            modifier = Modifier.padding(top = 4.dp, bottom = 16.dp),
        )

        when (val state = uiState) {
            is SpotterUiState.Loading -> Text(stringResource(R.string.minigames_loading), modifier = Modifier.testTag(SPOTTER_LOADING_TAG))
            is SpotterUiState.Content -> SpotterContent(
                state = state,
                onChoose = viewModel::choose,
                onAdvance = viewModel::advance,
                onReplay = viewModel::newGame,
            )
        }
    }
}

@Composable
private fun SpotterContent(
    state: SpotterUiState.Content,
    onChoose: (String) -> Unit,
    onAdvance: () -> Unit,
    onReplay: () -> Unit,
) {
    if (state.game.refusal == SpotterRefusal.TOO_FEW_TERMS) {
        Text(
            stringResource(R.string.minigames_spotter_too_few_terms),
            style = MaterialTheme.typography.bodyMedium,
        )
        return
    }

    if (state.finishedAt != null) {
        val elapsed = Duration.between(state.startedAt, state.finishedAt)
        Card(modifier = Modifier.fillMaxWidth()) {
            Column(modifier = Modifier.padding(12.dp)) {
                Text(
                    stringResource(R.string.minigames_spotter_score_format, state.correct, state.game.rounds.size),
                    style = MaterialTheme.typography.titleMedium,
                )
                Text(stringResource(R.string.minigames_time_taken_format, elapsed.seconds), style = MaterialTheme.typography.bodyMedium)
                Button(onClick = onReplay, modifier = Modifier.padding(top = 8.dp)) { Text(stringResource(R.string.minigames_play_again)) }
            }
        }
        return
    }

    val round = state.game.rounds.getOrNull(state.roundIndex) ?: return
    Text(
        stringResource(R.string.minigames_spotter_round_format, state.roundIndex + 1, state.game.rounds.size),
        style = MaterialTheme.typography.labelLarge,
        modifier = Modifier.padding(bottom = 8.dp),
    )
    SpotterRoundCard(round, state.chosen, onChoose)

    if (state.chosen != null) {
        Text(
            if (state.chosen == round.answer) stringResource(R.string.minigames_spotter_correct) else stringResource(R.string.minigames_spotter_wrong_format, round.answer),
            style = MaterialTheme.typography.bodyMedium,
            modifier = Modifier.padding(top = 8.dp, bottom = 8.dp),
        )
        Button(onClick = onAdvance) { Text(stringResource(R.string.minigames_continue)) }
    }
}

@Composable
private fun SpotterRoundCard(round: SpotterRound, chosen: String?, onChoose: (String) -> Unit) {
    Card(modifier = Modifier.fillMaxWidth().padding(bottom = 12.dp)) {
        Column(modifier = Modifier.padding(12.dp)) {
            Text(round.category, style = MaterialTheme.typography.labelSmall)
            Text(round.prompt, style = MaterialTheme.typography.bodyLarge, modifier = Modifier.padding(top = 4.dp))
        }
    }

    for (option in round.options) {
        val revealed = chosen != null
        val isAnswer = option == round.answer
        val isChosen = option == chosen
        val containerColor = when {
            !revealed -> MaterialTheme.colorScheme.surfaceVariant
            isAnswer -> MaterialTheme.colorScheme.tertiaryContainer
            isChosen -> MaterialTheme.colorScheme.errorContainer
            else -> MaterialTheme.colorScheme.surfaceVariant
        }
        Card(
            onClick = { onChoose(option) },
            enabled = !revealed,
            colors = CardDefaults.cardColors(containerColor = containerColor, disabledContainerColor = containerColor),
            modifier = Modifier.fillMaxWidth().padding(bottom = 6.dp).testTag(spotterOptionTag(option)),
        ) {
            Text(option, style = MaterialTheme.typography.bodyMedium, modifier = Modifier.fillMaxWidth().padding(12.dp))
        }
    }
}
