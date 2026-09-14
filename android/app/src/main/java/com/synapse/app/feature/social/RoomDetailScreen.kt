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
import androidx.compose.foundation.lazy.itemsIndexed
import androidx.compose.material3.Button
import androidx.compose.material3.Card
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.HorizontalDivider
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import com.synapse.app.core.api.RoomMemberDto
import com.synapse.app.core.api.StudyRoomDto
import com.synapse.app.core.qbank.Question

/** One open room: the lobby, the sitting, and the results. */
@Composable
fun RoomDetailScreen(viewModel: RoomViewModel, onLeave: () -> Unit) {
    val uiState by viewModel.uiState.collectAsStateWithLifecycle()

    Column(modifier = Modifier.fillMaxSize()) {
        Row(
            modifier = Modifier.fillMaxWidth().padding(12.dp),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically,
        ) {
            TextButton(onClick = onLeave) { Text("Leave") }
        }

        when (val state = uiState) {
            RoomDetailUiState.Loading -> Box(modifier = Modifier.fillMaxSize(), contentAlignment = Alignment.Center) {
                CircularProgressIndicator()
            }

            is RoomDetailUiState.Gone -> Box(modifier = Modifier.fillMaxSize(), contentAlignment = Alignment.Center) {
                Text(state.message, modifier = Modifier.padding(24.dp))
            }

            is RoomDetailUiState.InRoom -> when {
                state.room.isLobby -> LobbyPane(state, onStart = viewModel::start)
                state.room.myFinished -> ResultsPane(state, onToggleReview = viewModel::setReviewExpanded)
                else -> RunningPane(state, onSelect = viewModel::selectAnswer, onNext = viewModel::next)
            }
        }
    }
}

@Composable
private fun LobbyPane(state: RoomDetailUiState.InRoom, onStart: () -> Unit) {
    val room = state.room
    Column(
        modifier = Modifier.fillMaxSize().padding(20.dp),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.spacedBy(16.dp),
    ) {
        Text(room.name, style = MaterialTheme.typography.headlineSmall)
        Text("Share this code", style = MaterialTheme.typography.bodyMedium)
        Text(room.code, style = MaterialTheme.typography.displaySmall, fontWeight = FontWeight.Bold)
        Text(
            "${room.questionCount} questions · ${if (room.timed) "timed" else "untimed"}",
            style = MaterialTheme.typography.bodySmall,
        )

        state.message?.let { Text(it, color = MaterialTheme.colorScheme.error) }

        MembersCard(room.members, room.questionCount, room.resultsOpen)

        if (room.isHost) {
            Button(onClick = onStart, modifier = Modifier.fillMaxWidth()) { Text("Start the test") }
        } else {
            Text("Waiting for the host to start.", style = MaterialTheme.typography.bodySmall)
        }
    }
}

@Composable
private fun RunningPane(state: RoomDetailUiState.InRoom, onSelect: (Int) -> Unit, onNext: () -> Unit) {
    val question = state.questions.getOrNull(state.index)
    if (question == null) {
        Box(modifier = Modifier.fillMaxSize(), contentAlignment = Alignment.Center) {
            Text(
                "This room uses questions this device has not synced yet. Sync the Question Bank, then come back.",
                modifier = Modifier.padding(24.dp),
            )
        }
        return
    }

    LazyColumn(modifier = Modifier.fillMaxSize(), contentPadding = PaddingValues(20.dp), verticalArrangement = Arrangement.spacedBy(16.dp)) {
        item {
            Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween) {
                Text("${state.index + 1} of ${state.questions.size}", style = MaterialTheme.typography.labelMedium)
                Text(
                    "${state.room.members.count { it.finished }} of ${state.room.members.size} finished",
                    style = MaterialTheme.typography.labelMedium,
                )
            }
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
        state.message?.let { item { Text(it, color = MaterialTheme.colorScheme.error) } }
        if (state.chosenIndex != null) {
            item {
                Button(onClick = onNext, modifier = Modifier.fillMaxWidth()) {
                    Text(if (state.index + 1 < state.questions.size) "Next" else "Hand it in")
                }
            }
        }
    }
}

@Composable
private fun ResultsPane(state: RoomDetailUiState.InRoom, onToggleReview: (Boolean) -> Unit) {
    val room = state.room
    val myCorrect = room.myAnswers.count { it.correct }

    LazyColumn(modifier = Modifier.fillMaxSize(), contentPadding = PaddingValues(20.dp), verticalArrangement = Arrangement.spacedBy(16.dp)) {
        item {
            Column(horizontalAlignment = Alignment.CenterHorizontally, modifier = Modifier.fillMaxWidth()) {
                Text("$myCorrect of ${room.questionCount}", style = MaterialTheme.typography.displaySmall)
                Text(
                    if (room.resultsOpen) "Everyone has finished" else "Waiting for the others",
                    style = MaterialTheme.typography.bodyMedium,
                )
            }
        }
        if (room.myAnswers.isNotEmpty()) {
            item {
                TextButton(onClick = { onToggleReview(!state.reviewExpanded) }) {
                    Text(if (state.reviewExpanded) "Hide your answers" else "Look back at your answers")
                }
            }
        }
        if (state.reviewExpanded) {
            val byId = state.questions.associateBy { it.id }
            items(room.myAnswers, key = { it.questionId }) { answer ->
                val question = byId[answer.questionId]
                Card(modifier = Modifier.fillMaxWidth()) {
                    Column(modifier = Modifier.padding(12.dp)) {
                        Text(question?.stem ?: "(question no longer available)", style = MaterialTheme.typography.bodyMedium)
                        Text(
                            if (answer.correct) "Correct" else "Incorrect",
                            color = if (answer.correct) MaterialTheme.colorScheme.primary else MaterialTheme.colorScheme.error,
                            style = MaterialTheme.typography.labelMedium,
                        )
                    }
                }
            }
        }
        item { MembersCard(room.members, room.questionCount, room.resultsOpen) }
    }
}

@Composable
private fun MembersCard(members: List<RoomMemberDto>, questionCount: Int, resultsOpen: Boolean) {
    Card(modifier = Modifier.fillMaxWidth()) {
        Column(modifier = Modifier.padding(16.dp), verticalArrangement = Arrangement.spacedBy(8.dp)) {
            Text("Who is in", style = MaterialTheme.typography.titleSmall)
            members.forEach { member ->
                Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween) {
                    Text(member.displayName?.takeIf { it.isNotBlank() } ?: "Student")
                    val showScore = member.correct != null && (resultsOpen || member.finished)
                    Text(if (showScore) "${member.correct} / $questionCount" else "${member.answered} / $questionCount")
                }
            }
        }
    }
}

@Composable
internal fun OptionRow(label: String, text: String, selected: Boolean, enabled: Boolean, onClick: () -> Unit) {
    Card(
        modifier = Modifier.fillMaxWidth().clickable(enabled = enabled, onClick = onClick),
        colors = if (selected) {
            androidx.compose.material3.CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.primaryContainer)
        } else {
            androidx.compose.material3.CardDefaults.cardColors()
        },
    ) {
        Row(modifier = Modifier.fillMaxWidth().padding(14.dp), horizontalArrangement = Arrangement.spacedBy(10.dp)) {
            Text(label, style = MaterialTheme.typography.labelLarge)
            Text(text, style = MaterialTheme.typography.bodyMedium, modifier = Modifier.weight(1f))
        }
    }
}
