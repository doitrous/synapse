package com.nishany.android.feature.studytest

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.AlertDialog
import androidx.compose.material3.Button
import androidx.compose.material3.DropdownMenu
import androidx.compose.material3.DropdownMenuItem
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedButton
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Switch
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.lifecycle.viewmodel.compose.viewModel
import com.nishany.android.AppGraph
import com.nishany.android.core.model.ContentKind
import com.nishany.android.core.model.LedgerItem
import com.nishany.android.core.model.Question
import com.nishany.android.core.model.QuestionProjection
import com.nishany.android.core.model.RoomSummary
import com.nishany.android.core.model.StudyRoom
import com.nishany.android.core.ui.EmptyConfig
import com.nishany.android.core.ui.StateHost
import com.nishany.android.core.ui.UiState
import com.nishany.android.design.LocalCortex
import kotlinx.coroutines.flow.first

/**
 * Study together: build or join a shared test, then sit it. The Android peer
 * of iOS's `StudyTogetherView` -- lobby (join/create/your rooms), then one
 * room's waiting/running/results/review states, all driven by
 * [StudyTestViewModel]. Reached from Home's "MORE" grid, the same shape as
 * the (unrelated) voice Study Rooms entry.
 */
@Composable
fun StudyTestRoute(graph: AppGraph, onBack: () -> Unit) {
    val viewModel: StudyTestViewModel = viewModel(factory = StudyTestViewModel.factory(graph.api, graph.store))
    val ui by viewModel.ui.collectAsState()

    LaunchedEffect(Unit) { viewModel.loadRooms() }

    StudyTestScreen(
        ui = ui,
        onLoadRooms = viewModel::loadRooms,
        onJoin = viewModel::join,
        onCreate = viewModel::create,
        onOpen = viewModel::open,
        onLeave = viewModel::close,
        onStart = viewModel::start,
        onAnswer = viewModel::answer,
        onNext = viewModel::next,
        onStartReview = viewModel::startReview,
        onStopReview = viewModel::stopReview,
        onReviewPrevious = viewModel::reviewPrevious,
        onReviewNext = viewModel::reviewNext,
        questionPool = { graph.store.ledgerItems(ContentKind.QUESTION).first() },
        onBack = onBack,
    )
}

@Composable
internal fun StudyTestScreen(
    ui: StudyTestUi,
    onLoadRooms: () -> Unit,
    onJoin: (String) -> Unit,
    onCreate: (String, List<String>, Boolean) -> Unit,
    onOpen: (String) -> Unit,
    onLeave: () -> Unit,
    onStart: () -> Unit,
    onAnswer: (Int) -> Unit,
    onNext: () -> Unit,
    onStartReview: () -> Unit,
    onStopReview: () -> Unit,
    onReviewPrevious: () -> Unit,
    onReviewNext: () -> Unit,
    questionPool: suspend () -> List<LedgerItem>,
    onBack: () -> Unit,
) {
    val cortex = LocalCortex.current
    var creating by rememberSaveable { mutableStateOf(false) }

    Column(modifier = Modifier.fillMaxSize().background(cortex.paper)) {
        Row(
            modifier = Modifier.fillMaxWidth().padding(20.dp),
            verticalAlignment = Alignment.CenterVertically,
        ) {
            Text(
                "Study together",
                style = MaterialTheme.typography.headlineSmall,
                color = cortex.ink,
                modifier = Modifier.weight(1f),
            )
            if (ui.room != null) {
                TextButton(onClick = onLeave) { Text("Leave") }
            } else {
                TextButton(onClick = onBack) { Text("Back") }
            }
        }

        if (ui.room == null) {
            LobbyBody(
                ui = ui,
                onLoadRooms = onLoadRooms,
                onJoin = onJoin,
                onOpen = onOpen,
                onCreateClick = { creating = true },
                modifier = Modifier.weight(1f),
            )
        } else {
            RoomBody(
                ui = ui,
                room = ui.room,
                onStart = onStart,
                onAnswer = onAnswer,
                onNext = onNext,
                onStartReview = onStartReview,
                onStopReview = onStopReview,
                onReviewPrevious = onReviewPrevious,
                onReviewNext = onReviewNext,
                modifier = Modifier.weight(1f),
            )
        }
    }

    if (creating) {
        TestBuilderDialog(
            questionPool = questionPool,
            onCreate = { name, ids, timed -> onCreate(name, ids, timed); creating = false },
            onDismiss = { creating = false },
        )
    }
}

// --- Lobby: join by code, start one, your rooms ---

@Composable
private fun LobbyBody(
    ui: StudyTestUi,
    onLoadRooms: () -> Unit,
    onJoin: (String) -> Unit,
    onOpen: (String) -> Unit,
    onCreateClick: () -> Unit,
    modifier: Modifier = Modifier,
) {
    val cortex = LocalCortex.current
    var code by rememberSaveable { mutableStateOf("") }

    val loadState: UiState<List<RoomSummary>> = when {
        ui.loadError != null -> UiState.Error(ui.loadError, retry = onLoadRooms)
        ui.isLoading -> UiState.Loading
        else -> UiState.Content(ui.rooms)
    }

    StateHost(state = loadState, modifier = modifier) { rooms ->
        Column(
            modifier = Modifier.fillMaxSize().padding(horizontal = 20.dp),
            verticalArrangement = Arrangement.spacedBy(16.dp),
        ) {
            ui.message?.let { message ->
                Text(message, color = cortex.danger, style = MaterialTheme.typography.bodySmall)
            }

            Text("Join a test", style = MaterialTheme.typography.labelLarge, color = cortex.ink2)
            Row(verticalAlignment = Alignment.CenterVertically, horizontalArrangement = Arrangement.spacedBy(10.dp)) {
                OutlinedTextField(
                    value = code,
                    onValueChange = { code = it.uppercase() },
                    label = { Text("Room code") },
                    singleLine = true,
                    modifier = Modifier.weight(1f),
                )
                Button(onClick = { onJoin(code); code = "" }, enabled = code.isNotBlank()) { Text("Join") }
            }
            Text(
                "Everyone answers the same set at their own pace. Results open once you finish.",
                style = MaterialTheme.typography.bodySmall,
                color = cortex.ink3,
            )

            Button(onClick = onCreateClick, modifier = Modifier.fillMaxWidth()) {
                Text("Build a shared test")
            }

            if (rooms.isNotEmpty()) {
                Text("Your rooms", style = MaterialTheme.typography.labelLarge, color = cortex.ink2)
                LazyColumn(verticalArrangement = Arrangement.spacedBy(10.dp)) {
                    items(rooms, key = { it.id }) { summary ->
                        RoomSummaryRow(summary = summary, onClick = { onOpen(summary.id) })
                    }
                    item { Spacer(modifier = Modifier.height(24.dp)) }
                }
            }
        }
    }
}

@Composable
private fun RoomSummaryRow(summary: RoomSummary, onClick: () -> Unit) {
    val cortex = LocalCortex.current
    Row(
        modifier = Modifier
            .fillMaxWidth()
            .clip(RoundedCornerShape(14.dp))
            .background(cortex.surface)
            .border(1.dp, cortex.line, RoundedCornerShape(14.dp))
            .clickable(onClick = onClick)
            .padding(14.dp),
        horizontalArrangement = Arrangement.SpaceBetween,
        verticalAlignment = Alignment.CenterVertically,
    ) {
        Column {
            Text(summary.name, style = MaterialTheme.typography.bodyLarge, color = cortex.ink, fontWeight = FontWeight.Medium)
            Text(
                "${summary.questionCount} questions · ${statusLabel(summary.status)}",
                style = MaterialTheme.typography.bodySmall,
                color = cortex.ink3,
            )
        }
        Text(summary.code, style = MaterialTheme.typography.bodyMedium, color = cortex.primary, fontWeight = FontWeight.Medium)
    }
}

private fun statusLabel(status: String): String = when (status) {
    "lobby" -> "waiting"
    "running" -> "in progress"
    else -> "finished"
}

/** Choosing what goes into a shared test -- the Android peer of iOS's `TestBuilder`. */
@Composable
private fun TestBuilderDialog(
    questionPool: suspend () -> List<LedgerItem>,
    onCreate: (String, List<String>, Boolean) -> Unit,
    onDismiss: () -> Unit,
) {
    var name by rememberSaveable { mutableStateOf("Shared test") }
    var topic by rememberSaveable { mutableStateOf<String?>(null) }
    var count by rememberSaveable { mutableStateOf(10) }
    var timed by rememberSaveable { mutableStateOf(false) }
    var topicMenuOpen by remember { mutableStateOf(false) }
    var available by remember { mutableStateOf<List<Question>>(emptyList()) }

    LaunchedEffect(Unit) {
        available = questionPool().filter { it.isStudentVisible }.mapNotNull(QuestionProjection::project)
    }

    val topics = remember(available) { available.map { it.topic }.filter { it.isNotBlank() }.distinct().sorted() }
    val matching = remember(available, topic) { topic?.let { t -> available.filter { it.topic == t } } ?: available }

    AlertDialog(
        onDismissRequest = onDismiss,
        title = { Text("Build a test") },
        text = {
            Column(verticalArrangement = Arrangement.spacedBy(14.dp)) {
                OutlinedTextField(value = name, onValueChange = { name = it }, label = { Text("Name") }, singleLine = true)

                Box {
                    OutlinedButton(onClick = { topicMenuOpen = true }, modifier = Modifier.fillMaxWidth()) {
                        Text(topic ?: "Everything")
                    }
                    DropdownMenu(expanded = topicMenuOpen, onDismissRequest = { topicMenuOpen = false }) {
                        DropdownMenuItem(text = { Text("Everything") }, onClick = { topic = null; topicMenuOpen = false })
                        topics.forEach { t ->
                            DropdownMenuItem(text = { Text(t) }, onClick = { topic = t; topicMenuOpen = false })
                        }
                    }
                }

                Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                    listOf(5, 10, 20).forEach { option ->
                        val selected = count == option
                        OutlinedButton(onClick = { count = option }, modifier = Modifier.weight(1f)) {
                            Text(if (selected) "[$option]" else "$option")
                        }
                    }
                }

                Row(verticalAlignment = Alignment.CenterVertically, horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                    Text("Timed")
                    Switch(checked = timed, onCheckedChange = { timed = it })
                }

                Text(
                    "${matching.size} question${if (matching.size == 1) "" else "s"} to choose from.",
                    style = MaterialTheme.typography.bodySmall,
                )
            }
        },
        confirmButton = {
            TextButton(
                onClick = { onCreate(name.trim(), matching.shuffled().take(count).map { it.id }, timed) },
                enabled = matching.isNotEmpty() && name.isNotBlank(),
            ) { Text("Create") }
        },
        dismissButton = { TextButton(onClick = onDismiss) { Text("Cancel") } },
    )
}

// --- One room: waiting, running, results, review ---

@Composable
private fun RoomBody(
    ui: StudyTestUi,
    room: StudyRoom,
    onStart: () -> Unit,
    onAnswer: (Int) -> Unit,
    onNext: () -> Unit,
    onStartReview: () -> Unit,
    onStopReview: () -> Unit,
    onReviewPrevious: () -> Unit,
    onReviewNext: () -> Unit,
    modifier: Modifier = Modifier,
) {
    when {
        StudyTestLogic.phase(room) == StudyTestLogic.Phase.LOBBY -> WaitingBody(room = room, onStart = onStart, modifier = modifier)
        StudyTestLogic.phase(room) == StudyTestLogic.Phase.RESULTS && ui.reviewing ->
            ReviewBody(
                ui = ui,
                onBack = onStopReview,
                onPrevious = onReviewPrevious,
                onNext = onReviewNext,
                modifier = modifier,
            )
        StudyTestLogic.phase(room) == StudyTestLogic.Phase.RESULTS ->
            ResultsBody(ui = ui, room = room, onReview = onStartReview, modifier = modifier)
        else -> RunningBody(ui = ui, room = room, onAnswer = onAnswer, onNext = onNext, modifier = modifier)
    }
}

@Composable
private fun WaitingBody(room: StudyRoom, onStart: () -> Unit, modifier: Modifier = Modifier) {
    val cortex = LocalCortex.current
    Column(
        modifier = modifier.fillMaxSize().padding(20.dp),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.spacedBy(20.dp),
    ) {
        Text(room.name, style = MaterialTheme.typography.headlineMedium, color = cortex.ink)
        Text("Share this code", style = MaterialTheme.typography.bodySmall, color = cortex.ink2)
        Text(room.code, style = MaterialTheme.typography.displaySmall, color = cortex.ink, fontWeight = FontWeight.SemiBold)
        Text(
            "${room.questionCount} questions · ${if (room.timed) "timed" else "untimed"}",
            style = MaterialTheme.typography.bodySmall,
            color = cortex.ink3,
        )

        MembersCard(room = room)

        if (room.isHost) {
            Button(onClick = onStart, modifier = Modifier.fillMaxWidth()) { Text("Start the test") }
        } else {
            Text("Waiting for the host to start.", style = MaterialTheme.typography.bodySmall, color = cortex.ink3)
        }
    }
}

@Composable
private fun RunningBody(ui: StudyTestUi, room: StudyRoom, onAnswer: (Int) -> Unit, onNext: () -> Unit, modifier: Modifier = Modifier) {
    val cortex = LocalCortex.current
    val question = ui.current

    if (question == null) {
        Box(modifier = modifier.fillMaxSize(), contentAlignment = Alignment.Center) {
            EmptyNotice(
                config = EmptyConfig(
                    title = "Questions not downloaded",
                    description = "This room uses questions this device has not synced yet. Pull to refresh, then come back.",
                ),
            )
        }
        return
    }

    Column(modifier = modifier.fillMaxSize().padding(20.dp), verticalArrangement = Arrangement.spacedBy(16.dp)) {
        Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween) {
            Text("${ui.index + 1} of ${ui.questions.size}", style = MaterialTheme.typography.bodySmall, color = cortex.ink3)
            Text(
                "${room.members.count { it.finished }} of ${room.members.size} finished",
                style = MaterialTheme.typography.bodySmall,
                color = cortex.ink3,
            )
        }

        if (question.vignette.isNotEmpty()) {
            Text(question.vignette, style = MaterialTheme.typography.bodyLarge, color = cortex.ink)
        }
        Text(question.stem, style = MaterialTheme.typography.titleMedium, color = cortex.ink, fontWeight = FontWeight.SemiBold)

        question.options.forEachIndexed { position, option ->
            OptionRow(
                label = option.label,
                text = option.text,
                selected = ui.chosenIndex == position,
                enabled = ui.chosenIndex == null,
                onClick = { onAnswer(position) },
            )
        }

        // No rationale here, unlike the solo bank -- everyone is still
        // sitting it, and the room's results open together.
        if (ui.chosenIndex != null) {
            Button(onClick = onNext, modifier = Modifier.fillMaxWidth()) {
                Text(if (ui.index + 1 < ui.questions.size) "Next" else "Hand it in")
            }
        }
    }
}

@Composable
private fun OptionRow(label: String, text: String, selected: Boolean, enabled: Boolean, onClick: () -> Unit) {
    val cortex = LocalCortex.current
    Row(
        modifier = Modifier
            .fillMaxWidth()
            .clip(RoundedCornerShape(14.dp))
            .background(if (selected) cortex.primaryTint else cortex.surface)
            .border(1.dp, if (selected) cortex.primaryLine else cortex.line, RoundedCornerShape(14.dp))
            .then(if (enabled) Modifier.clickable(onClick = onClick) else Modifier)
            .padding(14.dp),
        horizontalArrangement = Arrangement.spacedBy(10.dp),
    ) {
        Text(label, style = MaterialTheme.typography.bodyMedium, color = cortex.ink3, modifier = Modifier.width(20.dp))
        Text(text, style = MaterialTheme.typography.bodyMedium, color = cortex.ink, modifier = Modifier.weight(1f))
    }
}

@Composable
private fun ResultsBody(ui: StudyTestUi, room: StudyRoom, onReview: () -> Unit, modifier: Modifier = Modifier) {
    val cortex = LocalCortex.current
    val correct = room.myAnswers.count { it.correct }

    Column(
        modifier = modifier.fillMaxSize().padding(20.dp),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.spacedBy(18.dp),
    ) {
        Text("$correct of ${room.questionCount}", style = MaterialTheme.typography.displaySmall, color = cortex.ink)
        Text(
            if (room.resultsOpen) "Everyone has finished" else "Waiting for the others",
            style = MaterialTheme.typography.bodyMedium,
            color = cortex.ink2,
        )

        // Finishing used to end at a score with the sat questions unreachable
        // -- the one moment a student is most ready to learn from them had
        // nothing to look at.
        if (ui.canReview) {
            Button(onClick = onReview, modifier = Modifier.fillMaxWidth()) { Text("Look back at your answers") }
        } else if (room.myAnswers.isNotEmpty()) {
            Text(
                "These questions are no longer published, so they cannot be reopened.",
                style = MaterialTheme.typography.bodySmall,
                color = cortex.ink3,
            )
        }

        MembersCard(room = room)
    }
}

@Composable
private fun MembersCard(room: StudyRoom) {
    val cortex = LocalCortex.current
    Column(
        modifier = Modifier
            .fillMaxWidth()
            .clip(RoundedCornerShape(16.dp))
            .background(cortex.surface)
            .border(1.dp, cortex.line, RoundedCornerShape(16.dp))
            .padding(16.dp),
        verticalArrangement = Arrangement.spacedBy(10.dp),
    ) {
        Text("Who is in", style = MaterialTheme.typography.labelLarge, color = cortex.ink2)
        room.members.forEach { member ->
            Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween) {
                Text(member.name, style = MaterialTheme.typography.bodyMedium, color = cortex.ink)
                // A score only once results are open, or once that member has
                // finished -- watching a friend's score climb mid-test is
                // exactly what the server withholds (see StudyRoom.Member.correct).
                if (member.correct != null && (room.resultsOpen || member.finished)) {
                    Text("${member.correct} / ${room.questionCount}", style = MaterialTheme.typography.bodySmall, color = cortex.ink2)
                } else {
                    Text("${member.answered} / ${room.questionCount}", style = MaterialTheme.typography.bodySmall, color = cortex.ink3)
                }
            }
        }
    }
}

@Composable
private fun ReviewBody(
    ui: StudyTestUi,
    onBack: () -> Unit,
    onPrevious: () -> Unit,
    onNext: () -> Unit,
    modifier: Modifier = Modifier,
) {
    val cortex = LocalCortex.current
    val rows = ui.reviewed
    val position = ui.reviewIndex.coerceIn(0, (rows.size - 1).coerceAtLeast(0))
    val row = rows.getOrNull(position)

    if (row == null) {
        Box(modifier = modifier.fillMaxSize(), contentAlignment = Alignment.Center) {
            EmptyNotice(config = EmptyConfig(title = "Nothing to review"))
        }
        return
    }

    Column(modifier = modifier.fillMaxSize().padding(20.dp), verticalArrangement = Arrangement.spacedBy(16.dp)) {
        Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween) {
            Text("${position + 1} of ${rows.size}", style = MaterialTheme.typography.bodySmall, color = cortex.ink3)
            val verdict = when {
                !row.wasAnswered -> "You did not answer this"
                row.answer.correct -> "You got this right"
                else -> "You got this wrong"
            }
            val verdictColor = when {
                !row.wasAnswered -> cortex.ink3
                row.answer.correct -> cortex.success
                else -> cortex.danger
            }
            Text(verdict, style = MaterialTheme.typography.labelMedium, color = verdictColor)
        }

        if (row.question.vignette.isNotEmpty()) {
            Text(row.question.vignette, style = MaterialTheme.typography.bodyLarge, color = cortex.ink)
        }
        Text(row.question.stem, style = MaterialTheme.typography.titleMedium, color = cortex.ink, fontWeight = FontWeight.SemiBold)

        row.question.options.forEachIndexed { index, option ->
            val isCorrect = index == row.correctIndex
            val isChosenWrong = index == row.answer.chosenIndex && !isCorrect
            ReviewOptionRow(label = option.label, text = option.text, isCorrect = isCorrect, isChosenWrong = isChosenWrong)
        }

        row.correctIndex?.let { idx ->
            val explanation = row.question.options.getOrNull(idx)?.explanation
            if (!explanation.isNullOrEmpty()) {
                ExplanationCard(title = "Why the right answer is right", text = explanation, tint = cortex.success)
            }
        }

        Row(horizontalArrangement = Arrangement.spacedBy(12.dp)) {
            OutlinedButton(onClick = onPrevious, enabled = position > 0) { Text("<") }
            Button(onClick = onBack, modifier = Modifier.weight(1f)) { Text("Back to your result") }
            OutlinedButton(onClick = onNext, enabled = position < rows.size - 1) { Text(">") }
        }
    }
}

@Composable
private fun ReviewOptionRow(label: String, text: String, isCorrect: Boolean, isChosenWrong: Boolean) {
    val cortex = LocalCortex.current
    val background = when {
        isCorrect -> cortex.successTint
        isChosenWrong -> cortex.dangerTint
        else -> cortex.surface
    }
    val border = when {
        isCorrect -> cortex.success
        isChosenWrong -> cortex.danger
        else -> cortex.line
    }
    Row(
        modifier = Modifier
            .fillMaxWidth()
            .clip(RoundedCornerShape(14.dp))
            .background(background)
            .border(1.dp, border, RoundedCornerShape(14.dp))
            .padding(14.dp),
        horizontalArrangement = Arrangement.spacedBy(10.dp),
    ) {
        Text(label, style = MaterialTheme.typography.bodyMedium, color = cortex.ink3, modifier = Modifier.width(20.dp))
        Text(text, style = MaterialTheme.typography.bodyMedium, color = cortex.ink, modifier = Modifier.weight(1f))
    }
}

@Composable
private fun ExplanationCard(title: String, text: String, tint: Color) {
    val cortex = LocalCortex.current
    Column(
        modifier = Modifier
            .fillMaxWidth()
            .clip(RoundedCornerShape(14.dp))
            .background(cortex.surface)
            .border(1.dp, cortex.line, RoundedCornerShape(14.dp))
            .padding(14.dp),
        verticalArrangement = Arrangement.spacedBy(6.dp),
    ) {
        Text(title, style = MaterialTheme.typography.labelLarge, color = tint)
        Text(text, style = MaterialTheme.typography.bodyMedium, color = cortex.ink)
    }
}

@Composable
private fun EmptyNotice(config: EmptyConfig) {
    val cortex = LocalCortex.current
    Column(horizontalAlignment = Alignment.CenterHorizontally, verticalArrangement = Arrangement.spacedBy(8.dp)) {
        Text(config.title, style = MaterialTheme.typography.titleMedium, color = cortex.ink)
        config.description?.let { Text(it, style = MaterialTheme.typography.bodySmall, color = cortex.ink3) }
    }
}
