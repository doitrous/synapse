package com.synapse.app.feature.social

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.itemsIndexed
import androidx.compose.material3.Button
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.res.pluralStringResource
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.unit.dp
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import com.synapse.app.R

/** One open challenge: a `sent` invite to accept/decline, the sitting itself, and the finished head-to-head. */
@Composable
fun ChallengeDetailScreen(viewModel: ChallengeViewModel, onLeave: () -> Unit) {
    val uiState by viewModel.uiState.collectAsStateWithLifecycle()

    Column(modifier = Modifier.fillMaxSize()) {
        Row(modifier = Modifier.fillMaxWidth().padding(12.dp)) {
            TextButton(onClick = onLeave) { Text(stringResource(R.string.social_leave_button)) }
        }

        when (val state = uiState) {
            ChallengeDetailUiState.Loading -> Box(modifier = Modifier.fillMaxSize(), contentAlignment = Alignment.Center) {
                androidx.compose.material3.CircularProgressIndicator()
            }

            is ChallengeDetailUiState.Gone -> Box(modifier = Modifier.fillMaxSize(), contentAlignment = Alignment.Center) {
                Text(stringResource(state.message), modifier = Modifier.padding(24.dp))
            }

            is ChallengeDetailUiState.Detail -> when {
                state.challenge.isSent -> SentPane(state, onRespond = viewModel::respond)
                state.challenge.isDeclined -> Box(modifier = Modifier.fillMaxSize(), contentAlignment = Alignment.Center) {
                    Text(stringResource(R.string.social_challenge_declined_message))
                }
                state.challenge.isComplete -> CompletePane(state)
                state.challenge.myFinished -> Box(modifier = Modifier.fillMaxSize(), contentAlignment = Alignment.Center) {
                    Text(stringResource(R.string.social_waiting_other_side))
                }
                else -> RunningPane(state, onSelect = viewModel::selectAnswer, onNext = viewModel::next)
            }
        }
    }
}

@Composable
private fun SentPane(state: ChallengeDetailUiState.Detail, onRespond: (Boolean) -> Unit) {
    val challenge = state.challenge
    Column(
        modifier = Modifier.fillMaxSize().padding(20.dp),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.spacedBy(16.dp),
    ) {
        Text(challenge.scopeLabel ?: stringResource(R.string.social_challenge_fallback_title), style = MaterialTheme.typography.headlineSmall)
        Text(
            pluralStringResource(R.plurals.social_question_count, challenge.questionCount, challenge.questionCount),
            style = MaterialTheme.typography.bodyMedium,
        )
        state.message?.let { Text(stringResource(it), color = MaterialTheme.colorScheme.error) }
        if (challenge.myRole == "opponent") {
            Row(horizontalArrangement = Arrangement.spacedBy(12.dp)) {
                Button(onClick = { onRespond(true) }) { Text(stringResource(R.string.social_accept_button)) }
                TextButton(onClick = { onRespond(false) }) { Text(stringResource(R.string.social_decline_button)) }
            }
        } else {
            Text(stringResource(R.string.social_waiting_them_respond), style = MaterialTheme.typography.bodyMedium)
        }
    }
}

@Composable
private fun RunningPane(state: ChallengeDetailUiState.Detail, onSelect: (Int) -> Unit, onNext: () -> Unit) {
    val question = state.questions.getOrNull(state.index)
    if (question == null) {
        Box(modifier = Modifier.fillMaxSize(), contentAlignment = Alignment.Center) {
            Text(
                stringResource(R.string.social_challenge_questions_not_synced),
                modifier = Modifier.padding(24.dp),
            )
        }
        return
    }

    LazyColumn(modifier = Modifier.fillMaxSize(), contentPadding = PaddingValues(20.dp), verticalArrangement = Arrangement.spacedBy(16.dp)) {
        item {
            Text(
                stringResource(R.string.social_position_of_total, state.index + 1, state.questions.size),
                style = MaterialTheme.typography.labelMedium,
            )
        }
        if (question.vignette.isNotEmpty()) {
            item { Text(question.vignette, style = MaterialTheme.typography.bodyLarge) }
        }
        item { Text(question.stem, style = MaterialTheme.typography.titleMedium) }
        itemsIndexed(question.options) { position, option ->
            OptionRow(
                label = option.label,
                text = option.text,
                selected = state.chosenIndex == position,
                enabled = state.chosenIndex == null,
                onClick = { onSelect(position) },
            )
        }
        state.message?.let { item { Text(stringResource(it), color = MaterialTheme.colorScheme.error) } }
        if (state.chosenIndex != null) {
            item {
                Button(onClick = onNext, modifier = Modifier.fillMaxWidth()) {
                    Text(stringResource(if (state.index + 1 < state.questions.size) R.string.social_next_button else R.string.social_hand_in_button))
                }
            }
        }
    }
}

@Composable
private fun CompletePane(state: ChallengeDetailUiState.Detail) {
    val challenge = state.challenge
    val result = challenge.result
    Column(
        modifier = Modifier.fillMaxSize().padding(20.dp),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.spacedBy(12.dp),
    ) {
        if (result == null) {
            Text(stringResource(R.string.social_comparison_unavailable))
            return@Column
        }
        val mine = if (challenge.myRole == "challenger") result.challenger else result.opponent
        val theirs = if (challenge.myRole == "challenger") result.opponent else result.challenger
        Text(stringResource(R.string.social_you_score, mine.correct, challenge.questionCount), style = MaterialTheme.typography.headlineSmall)
        Text(stringResource(R.string.social_them_score, theirs.correct, challenge.questionCount), style = MaterialTheme.typography.titleMedium)
    }
}
