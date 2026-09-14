package com.synapse.app.feature.social

import androidx.compose.foundation.clickable
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
import androidx.compose.material3.AlertDialog
import androidx.compose.material3.Card
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedButton
import androidx.compose.material3.SegmentedButton
import androidx.compose.material3.SegmentedButtonDefaults
import androidx.compose.material3.SingleChoiceSegmentedButtonRow
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
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
import com.synapse.app.core.api.ChallengeSummaryDto
import com.synapse.app.core.api.PersonDto
import com.synapse.app.core.qbank.Question

/** The Challenges tab: head-to-head sittings with a friend — sent, received, and finished. */
@Composable
fun ChallengesScreen(viewModel: ChallengesViewModel = hiltViewModel()) {
    val uiState by viewModel.uiState.collectAsStateWithLifecycle()
    var showBuilder by remember { mutableStateOf(false) }

    val state = uiState as? ChallengesUiState.Content
    if (state == null) {
        Box(modifier = Modifier.fillMaxSize(), contentAlignment = Alignment.Center) { CircularProgressIndicator() }
        return
    }

    LazyColumn(modifier = Modifier.fillMaxSize(), contentPadding = PaddingValues(16.dp), verticalArrangement = Arrangement.spacedBy(12.dp)) {
        item {
            OutlinedButton(
                onClick = { showBuilder = true },
                enabled = state.friends.isNotEmpty(),
                modifier = Modifier.fillMaxWidth(),
            ) { Text(if (state.friends.isEmpty()) "Add a friend first to challenge them" else "Challenge a friend") }
        }

        state.message?.let { item { Text(it, color = MaterialTheme.colorScheme.error) } }

        if (state.offline) {
            item { Text("Could not reach Synapse.", style = MaterialTheme.typography.bodyMedium) }
        } else if (state.challenges.isEmpty()) {
            item { Text("No challenges yet.", style = MaterialTheme.typography.bodyMedium) }
        } else {
            items(state.challenges, key = { it.id }) { challenge ->
                ChallengeRow(
                    challenge = challenge,
                    onOpen = { viewModel.openChallenge(challenge.id) },
                    onRespond = { accept -> viewModel.respond(challenge.id, accept) },
                )
            }
        }
    }

    if (showBuilder) {
        ChallengeBuilderDialog(
            friends = state.friends,
            available = state.available,
            onDismiss = { showBuilder = false },
            onCreate = { opponentId, ids, label ->
                viewModel.create(opponentId, ids, label)
                showBuilder = false
            },
        )
    }
}

@Composable
private fun ChallengeRow(challenge: ChallengeSummaryDto, onOpen: () -> Unit, onRespond: (Boolean) -> Unit) {
    Card(modifier = Modifier.fillMaxWidth().clickable(onClick = onOpen)) {
        Column(modifier = Modifier.padding(16.dp), verticalArrangement = Arrangement.spacedBy(6.dp)) {
            Text(challenge.scopeLabel?.takeIf { it.isNotBlank() } ?: "Challenge", style = MaterialTheme.typography.titleMedium)
            Text("${challenge.questionCount} questions · ${challengeStatusLabel(challenge)}", style = MaterialTheme.typography.bodySmall)

            challenge.result?.let { result ->
                val mine = if (challenge.myRole == "challenger") result.challenger else result.opponent
                val theirs = if (challenge.myRole == "challenger") result.opponent else result.challenger
                Text("You: ${mine.correct}/${challenge.questionCount} · Them: ${theirs.correct}/${challenge.questionCount}")
            }

            if (challenge.status == "sent" && challenge.myRole == "opponent") {
                Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                    TextButton(onClick = { onRespond(true) }) { Text("Accept") }
                    TextButton(onClick = { onRespond(false) }) { Text("Decline") }
                }
            }
        }
    }
}

private fun challengeStatusLabel(challenge: ChallengeSummaryDto): String = when {
    challenge.status == "sent" && challenge.myRole == "challenger" -> "waiting for a response"
    challenge.status == "sent" -> "sent to you"
    challenge.status == "declined" -> "declined"
    challenge.status == "complete" -> "finished"
    challenge.myFinished && !challenge.opponentFinished -> "waiting for them"
    else -> "in progress"
}

@Composable
private fun ChallengeBuilderDialog(
    friends: List<PersonDto>,
    available: List<Question>,
    onDismiss: () -> Unit,
    onCreate: (opponentId: String, questionIds: List<String>, scopeLabel: String) -> Unit,
) {
    var opponent by remember { mutableStateOf(friends.firstOrNull()) }
    var count by remember { mutableStateOf(10) }

    AlertDialog(
        onDismissRequest = onDismiss,
        title = { Text("Challenge a friend") },
        text = {
            Column(verticalArrangement = Arrangement.spacedBy(12.dp)) {
                Text("Friend", style = MaterialTheme.typography.labelMedium)
                friends.forEach { friend ->
                    Row(
                        modifier = Modifier.fillMaxWidth().clickable { opponent = friend },
                        horizontalArrangement = Arrangement.SpaceBetween,
                    ) {
                        Text(friend.displayName ?: "Student")
                        if (opponent?.userId == friend.userId) Text("Selected", style = MaterialTheme.typography.labelSmall)
                    }
                }

                Text("Questions", style = MaterialTheme.typography.labelMedium)
                SingleChoiceSegmentedButtonRow(modifier = Modifier.fillMaxWidth()) {
                    listOf(5, 10, 20).forEachIndexed { index, option ->
                        SegmentedButton(
                            selected = count == option,
                            onClick = { count = option },
                            shape = SegmentedButtonDefaults.itemShape(index = index, count = 3),
                        ) { Text("$option") }
                    }
                }
            }
        },
        confirmButton = {
            TextButton(
                onClick = {
                    val ids = available.shuffled().take(count).map { it.id }
                    opponent?.let { onCreate(it.userId, ids, "Challenge") }
                },
                enabled = opponent != null && available.isNotEmpty(),
            ) { Text("Send") }
        },
        dismissButton = { TextButton(onClick = onDismiss) { Text("Cancel") } },
    )
}
