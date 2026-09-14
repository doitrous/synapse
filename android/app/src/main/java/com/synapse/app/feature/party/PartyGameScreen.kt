package com.synapse.app.feature.party

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material3.Badge
import androidx.compose.material3.Button
import androidx.compose.material3.Card
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedButton
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import com.synapse.app.core.api.PartyGameChoiceDto
import com.synapse.app.core.api.PartyGameParticipantDto
import com.synapse.app.core.api.PublicPartyGameRoundDto

/** One party game's round-by-round play and scoreboard — the Android analogue of web's `PartyGameSyncPlayer`. */
@Composable
fun PartyGameScreen(viewModel: PartyGameViewModel = hiltViewModel(), onExit: () -> Unit) {
    val uiState by viewModel.uiState.collectAsStateWithLifecycle()

    when (val state = uiState) {
        PartyGameUiState.Loading -> Box(modifier = Modifier.fillMaxSize(), contentAlignment = Alignment.Center) { CircularProgressIndicator() }

        is PartyGameUiState.Gone -> Column(modifier = Modifier.fillMaxSize().padding(16.dp), verticalArrangement = Arrangement.spacedBy(12.dp)) {
            Text(state.message, style = MaterialTheme.typography.bodyLarge)
            OutlinedButton(onClick = onExit) { Text("Back") }
        }

        is PartyGameUiState.InGame -> {
            val game = state.game
            val ranked = remember(game.participants, game.scores) {
                game.participants.values.sortedByDescending { game.scores[it.id] ?: 0 }
            }
            LazyColumn(modifier = Modifier.fillMaxSize(), contentPadding = PaddingValues(16.dp), verticalArrangement = Arrangement.spacedBy(12.dp)) {
                item {
                    Text(game.title, style = MaterialTheme.typography.titleLarge)
                    Text(
                        game.currentRound?.let { "Round ${it.index + 1} / ${game.roundCount}" } ?: "No active round",
                        style = MaterialTheme.typography.bodyMedium,
                    )
                }
                state.message?.let { message -> item { Text(message, color = MaterialTheme.colorScheme.error) } }

                when (game.status) {
                    "lobby" -> item {
                        Card(modifier = Modifier.fillMaxWidth()) {
                            Column(modifier = Modifier.padding(16.dp), verticalArrangement = Arrangement.spacedBy(8.dp)) {
                                Text("Lobby is ready", style = MaterialTheme.typography.titleMedium)
                                Text("The host starts the server-authoritative game when everyone is in.", style = MaterialTheme.typography.bodyMedium)
                                if (state.isHost) {
                                    Button(onClick = viewModel::start, enabled = !state.busy) { Text("Start party game") }
                                }
                            }
                        }
                    }

                    "in_round" -> if (game.currentRound != null) {
                        item {
                            RoundCard(
                                round = game.currentRound,
                                disabled = state.busy || state.hasAnswered,
                                onSubmit = { answer -> viewModel.submitAnswer(game.currentRound.id, answer) },
                            )
                            if (state.hasAnswered) {
                                Text("Answer submitted. Waiting for the next round.", style = MaterialTheme.typography.bodySmall)
                            }
                        }
                    }

                    "between_rounds" -> item {
                        Card(modifier = Modifier.fillMaxWidth()) {
                            Column(modifier = Modifier.padding(16.dp), verticalArrangement = Arrangement.spacedBy(8.dp)) {
                                Text("Round recorded", style = MaterialTheme.typography.titleMedium)
                                Text("Scores are server-calculated. The host can continue when ready.", style = MaterialTheme.typography.bodyMedium)
                                if (state.isHost) {
                                    Button(onClick = viewModel::nextRound, enabled = !state.busy) {
                                        Text(if (game.currentRoundIndex + 1 >= game.roundCount) "Complete game" else "Next round")
                                    }
                                }
                            }
                        }
                    }

                    "completed" -> item {
                        Card(modifier = Modifier.fillMaxWidth()) {
                            Column(modifier = Modifier.padding(16.dp), verticalArrangement = Arrangement.spacedBy(8.dp)) {
                                Text("Party game complete", style = MaterialTheme.typography.titleMedium)
                                Text("Final scores are ready below.", style = MaterialTheme.typography.bodyMedium)
                            }
                        }
                    }
                }

                item { Text("Scoreboard", style = MaterialTheme.typography.titleMedium) }
                items(ranked, key = { it.id }) { participant -> ScoreRow(participant, game.scores[participant.id] ?: 0) }

                item { OutlinedButton(onClick = onExit) { Text("Leave") } }
            }
        }
    }
}

@Composable
private fun RoundCard(round: PublicPartyGameRoundDto, disabled: Boolean, onSubmit: (PartyGameAnswer) -> Unit) {
    Card(modifier = Modifier.fillMaxWidth()) {
        Column(modifier = Modifier.padding(16.dp), verticalArrangement = Arrangement.spacedBy(12.dp)) {
            Text(round.prompt, style = MaterialTheme.typography.headlineSmall)
            when {
                round.scoring == "ordered_exact_positions" -> OrderedAnswerControls(round.choices, disabled, onSubmit)
                round.choices.isNotEmpty() -> ChoiceAnswerControls(round.choices, disabled, onSubmit)
                else -> TextAnswerControls(disabled, onSubmit)
            }
        }
    }
}

@Composable
private fun ChoiceAnswerControls(choices: List<PartyGameChoiceDto>, disabled: Boolean, onSubmit: (PartyGameAnswer) -> Unit) {
    Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
        choices.forEach { choice ->
            OutlinedButton(
                onClick = { onSubmit(PartyGameAnswer.Text(choice.id)) },
                enabled = !disabled,
                modifier = Modifier.fillMaxWidth(),
            ) { Text(choice.label) }
        }
    }
}

@Composable
private fun TextAnswerControls(disabled: Boolean, onSubmit: (PartyGameAnswer) -> Unit) {
    var text by remember { mutableStateOf("") }
    Row(verticalAlignment = Alignment.CenterVertically, horizontalArrangement = Arrangement.spacedBy(8.dp)) {
        OutlinedTextField(
            value = text,
            onValueChange = { text = it },
            enabled = !disabled,
            label = { Text("Your answer") },
            singleLine = true,
            modifier = Modifier.weight(1f),
        )
        Button(onClick = { onSubmit(PartyGameAnswer.Text(text)); text = "" }, enabled = !disabled && text.isNotBlank()) { Text("Submit") }
    }
}

@Composable
private fun OrderedAnswerControls(choices: List<PartyGameChoiceDto>, disabled: Boolean, onSubmit: (PartyGameAnswer) -> Unit) {
    var order by remember(choices) { mutableStateOf(listOf<String>()) }
    val remaining = choices.filter { it.id !in order }

    Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
        Text("Your order", style = MaterialTheme.typography.labelLarge)
        order.forEachIndexed { index, id ->
            Text("${index + 1}. ${choices.firstOrNull { it.id == id }?.label ?: id}")
        }
        remaining.forEach { choice ->
            OutlinedButton(onClick = { order = order + choice.id }, enabled = !disabled, modifier = Modifier.fillMaxWidth()) { Text(choice.label) }
        }
        Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
            OutlinedButton(onClick = { order = emptyList() }, enabled = !disabled && order.isNotEmpty()) { Text("Clear order") }
            Button(
                onClick = { onSubmit(PartyGameAnswer.Ordered(order)) },
                enabled = !disabled && order.size == choices.size,
            ) { Text("Submit order") }
        }
    }
}

@Composable
private fun ScoreRow(participant: PartyGameParticipantDto, score: Int) {
    Row(
        modifier = Modifier.fillMaxWidth().padding(vertical = 4.dp),
        horizontalArrangement = Arrangement.SpaceBetween,
        verticalAlignment = Alignment.CenterVertically,
    ) {
        Row(verticalAlignment = Alignment.CenterVertically, horizontalArrangement = Arrangement.spacedBy(8.dp)) {
            Text(participant.username)
            if (!participant.connected) Badge { Text("Away") }
        }
        Text("$score", style = MaterialTheme.typography.titleMedium)
    }
}
