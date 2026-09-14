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
import androidx.compose.ui.res.pluralStringResource
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.unit.dp
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import com.synapse.app.R
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
            ) {
                Text(
                    stringResource(
                        if (state.friends.isEmpty()) R.string.social_add_friend_first_button else R.string.social_challenge_friend_button,
                    ),
                )
            }
        }

        state.message?.let { item { Text(stringResource(it), color = MaterialTheme.colorScheme.error) } }

        if (state.offline) {
            item { Text(stringResource(R.string.social_offline_generic), style = MaterialTheme.typography.bodyMedium) }
        } else if (state.challenges.isEmpty()) {
            item { Text(stringResource(R.string.social_no_challenges_yet), style = MaterialTheme.typography.bodyMedium) }
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
            Text(
                challenge.scopeLabel?.takeIf { it.isNotBlank() } ?: stringResource(R.string.social_challenge_fallback_title),
                style = MaterialTheme.typography.titleMedium,
            )
            Text(
                "${pluralStringResource(R.plurals.social_question_count, challenge.questionCount, challenge.questionCount)} · " +
                    stringResource(challengeStatusRes(challenge)),
                style = MaterialTheme.typography.bodySmall,
            )

            challenge.result?.let { result ->
                val mine = if (challenge.myRole == "challenger") result.challenger else result.opponent
                val theirs = if (challenge.myRole == "challenger") result.opponent else result.challenger
                Text(
                    stringResource(
                        R.string.social_challenge_score_summary,
                        mine.correct,
                        challenge.questionCount,
                        theirs.correct,
                        challenge.questionCount,
                    ),
                )
            }

            if (challenge.status == "sent" && challenge.myRole == "opponent") {
                Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                    TextButton(onClick = { onRespond(true) }) { Text(stringResource(R.string.social_accept_button)) }
                    TextButton(onClick = { onRespond(false) }) { Text(stringResource(R.string.social_decline_button)) }
                }
            }
        }
    }
}

private fun challengeStatusRes(challenge: ChallengeSummaryDto): Int = when {
    challenge.status == "sent" && challenge.myRole == "challenger" -> R.string.social_challenge_status_waiting_response
    challenge.status == "sent" -> R.string.social_challenge_status_sent_to_you
    challenge.status == "declined" -> R.string.social_challenge_status_declined
    challenge.status == "complete" -> R.string.social_challenge_status_finished
    challenge.myFinished && !challenge.opponentFinished -> R.string.social_challenge_status_waiting_them
    else -> R.string.social_challenge_status_in_progress
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
    val defaultScopeLabel = stringResource(R.string.social_challenge_fallback_title)

    AlertDialog(
        onDismissRequest = onDismiss,
        title = { Text(stringResource(R.string.social_challenge_friend_button)) },
        text = {
            Column(verticalArrangement = Arrangement.spacedBy(12.dp)) {
                Text(stringResource(R.string.social_friend_label), style = MaterialTheme.typography.labelMedium)
                friends.forEach { friend ->
                    Row(
                        modifier = Modifier.fillMaxWidth().clickable { opponent = friend },
                        horizontalArrangement = Arrangement.SpaceBetween,
                    ) {
                        Text(friend.displayName ?: stringResource(R.string.social_student_fallback))
                        if (opponent?.userId == friend.userId) Text(stringResource(R.string.social_selected_label), style = MaterialTheme.typography.labelSmall)
                    }
                }

                Text(stringResource(R.string.social_questions_label), style = MaterialTheme.typography.labelMedium)
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
                    opponent?.let { onCreate(it.userId, ids, defaultScopeLabel) }
                },
                enabled = opponent != null && available.isNotEmpty(),
            ) { Text(stringResource(R.string.social_send_button)) }
        },
        dismissButton = { TextButton(onClick = onDismiss) { Text(stringResource(R.string.social_cancel_button)) } },
    )
}
