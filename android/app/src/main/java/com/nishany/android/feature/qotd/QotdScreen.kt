package com.nishany.android.feature.qotd

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.HorizontalDivider
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.RadioButton
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.lifecycle.viewmodel.compose.viewModel
import com.nishany.android.AppGraph
import com.nishany.android.core.model.Question
import com.nishany.android.core.model.QotdFriends
import com.nishany.android.core.model.QotdLeaderboard

/** Builds the view model and hosts the screen; wired as the `qotd` tab. */
@Composable
fun QotdRoute(graph: AppGraph) {
    val viewModel: QotdViewModel = viewModel(
        factory = QotdViewModel.factory(graph.store, graph.sync, graph.api),
    )
    QotdScreen(viewModel)
}

@Composable
fun QotdScreen(viewModel: QotdViewModel) {
    val state by viewModel.state.collectAsState()
    LaunchedEffect(Unit) { viewModel.load() }

    when (val s = state) {
        is QotdUiState.Loading ->
            Box(Modifier.fillMaxSize(), contentAlignment = Alignment.Center) { CircularProgressIndicator() }
        is QotdUiState.Error ->
            Box(Modifier.fillMaxSize(), contentAlignment = Alignment.Center) { Text(s.message) }
        is QotdUiState.Loaded -> Loaded(s, viewModel::answer)
    }
}

@Composable
private fun Loaded(state: QotdUiState.Loaded, onAnswer: (String) -> Unit) {
    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(20.dp)
            .verticalScroll(rememberScrollState()),
        verticalArrangement = Arrangement.spacedBy(18.dp),
    ) {
        Row(verticalAlignment = Alignment.CenterVertically) {
            Text("🔥 ${state.current}", style = MaterialTheme.typography.titleLarge)
            Spacer(Modifier.padding(horizontal = 4.dp))
            Text("day streak", style = MaterialTheme.typography.bodyMedium)
            Spacer(Modifier.weight(1f))
            if (state.longest > 0) {
                Text("Longest ${state.longest}", style = MaterialTheme.typography.labelMedium)
            }
        }

        val question = state.question
        if (question != null) {
            QuestionBlock(question, state, onAnswer)
        } else if (state.emptyReason != null) {
            Text(state.emptyReason, style = MaterialTheme.typography.bodyMedium)
        }

        state.leaderboard?.let { if (it.rows.isNotEmpty()) LeaderboardSection(it) }
        state.friends?.let { if (it.friends.isNotEmpty()) FriendsSection(it) }
    }
}

@Composable
private fun QuestionBlock(question: Question, state: QotdUiState.Loaded, onAnswer: (String) -> Unit) {
    Column(verticalArrangement = Arrangement.spacedBy(12.dp)) {
        if (question.vignette.isNotBlank()) {
            Text(question.vignette, style = MaterialTheme.typography.bodyMedium)
        }
        Text(question.stem, style = MaterialTheme.typography.titleMedium)

        Column(verticalArrangement = Arrangement.spacedBy(4.dp)) {
            question.options.forEach { option ->
                Row(verticalAlignment = Alignment.CenterVertically) {
                    RadioButton(
                        selected = option.label == state.chosenLabel,
                        onClick = { onAnswer(option.label) },
                        enabled = !state.answered,
                    )
                    Text("${option.label}. ${option.text}")
                    if (state.answered && option.label == state.correctLabel) Text("  ✓")
                    else if (state.answered && option.label == state.chosenLabel) Text("  ✗")
                }
            }
        }

        if (state.answered) {
            question.correctOption?.explanation?.takeIf { it.isNotBlank() }?.let {
                Text(it, style = MaterialTheme.typography.bodyMedium)
            }
            if (question.explanation.isNotBlank()) {
                Text(question.explanation, style = MaterialTheme.typography.bodyMedium)
            }
            question.learningObjective?.takeIf { it.isNotBlank() }?.let {
                Text("What this tests: $it", style = MaterialTheme.typography.bodySmall)
            }
        }

        state.answerError?.let { Text(it, style = MaterialTheme.typography.bodySmall) }
    }
}

@Composable
private fun LeaderboardSection(board: QotdLeaderboard) {
    HorizontalDivider()
    Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
        Text("Cohort leaderboard", style = MaterialTheme.typography.titleSmall, fontWeight = FontWeight.SemiBold)
        board.rows.forEach { row ->
            Row(verticalAlignment = Alignment.CenterVertically) {
                Text("${row.rank}", style = MaterialTheme.typography.labelLarge)
                Spacer(Modifier.padding(horizontal = 6.dp))
                Text(row.username, style = MaterialTheme.typography.bodyMedium)
                Spacer(Modifier.weight(1f))
                Text("🔥${row.current}", style = MaterialTheme.typography.labelMedium)
                Spacer(Modifier.padding(horizontal = 6.dp))
                Text("${row.totalCorrect}✓", style = MaterialTheme.typography.labelMedium)
            }
        }
        board.viewer.rank?.let { rank ->
            Text("You — #$rank of ${board.viewer.total}", style = MaterialTheme.typography.labelMedium)
        }
    }
}

@Composable
private fun FriendsSection(friends: QotdFriends) {
    HorizontalDivider()
    Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
        Text("Friends", style = MaterialTheme.typography.titleSmall, fontWeight = FontWeight.SemiBold)
        friends.friends.forEach { friend ->
            Row(modifier = Modifier.fillMaxWidth(), verticalAlignment = Alignment.CenterVertically) {
                Text(friend.name, style = MaterialTheme.typography.bodyMedium)
                Spacer(Modifier.weight(1f))
                val status = when {
                    !friend.answered -> "Not yet"
                    friend.correct == true -> "✓"
                    friend.correct == false -> "✗"
                    else -> "•"
                }
                Text(status, style = MaterialTheme.typography.labelMedium)
            }
        }
    }
}
