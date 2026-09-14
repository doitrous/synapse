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
import androidx.compose.material3.Button
import androidx.compose.material3.Card
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedButton
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.SegmentedButton
import androidx.compose.material3.SegmentedButtonDefaults
import androidx.compose.material3.SingleChoiceSegmentedButtonRow
import androidx.compose.material3.Switch
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
import com.synapse.app.core.api.RoomSummaryDto
import com.synapse.app.core.qbank.Question

/** The Rooms tab: this student's shared tests, joining one by code, and building a new one. */
@Composable
fun RoomsScreen(viewModel: StudyRoomsViewModel = hiltViewModel()) {
    val uiState by viewModel.uiState.collectAsStateWithLifecycle()
    var showBuilder by remember { mutableStateOf(false) }
    var code by remember { mutableStateOf("") }

    val state = uiState as? RoomsUiState.Content
    if (state == null) {
        Box(modifier = Modifier.fillMaxSize(), contentAlignment = Alignment.Center) { CircularProgressIndicator() }
        return
    }

    LazyColumn(modifier = Modifier.fillMaxSize(), contentPadding = PaddingValues(16.dp), verticalArrangement = Arrangement.spacedBy(12.dp)) {
        item {
            Card(modifier = Modifier.fillMaxWidth()) {
                Column(modifier = Modifier.padding(16.dp), verticalArrangement = Arrangement.spacedBy(8.dp)) {
                    Text("Join a test", style = MaterialTheme.typography.titleMedium)
                    Row(verticalAlignment = Alignment.CenterVertically, horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                        OutlinedTextField(
                            value = code,
                            onValueChange = { code = it.uppercase() },
                            label = { Text("Room code") },
                            singleLine = true,
                            modifier = Modifier.weight(1f),
                        )
                        Button(onClick = { viewModel.join(code); code = "" }, enabled = code.isNotBlank()) { Text("Join") }
                    }
                    Text(
                        "Everyone answers the same set at their own pace. Results open once you finish.",
                        style = MaterialTheme.typography.bodySmall,
                    )
                }
            }
        }

        item {
            OutlinedButton(onClick = { showBuilder = true }, modifier = Modifier.fillMaxWidth()) {
                Text("Build a shared test")
            }
        }

        state.message?.let { message ->
            item { Text(message, color = MaterialTheme.colorScheme.error, style = MaterialTheme.typography.bodyMedium) }
        }

        if (state.offline) {
            item { Text("Could not reach Synapse. A shared test needs a connection.", style = MaterialTheme.typography.bodyMedium) }
        } else if (state.rooms.isEmpty()) {
            item { Text("You have not joined or built a shared test yet.", style = MaterialTheme.typography.bodyMedium) }
        } else {
            item { Text("Your rooms", style = MaterialTheme.typography.titleMedium) }
            items(state.rooms, key = { it.id }) { room -> RoomRow(room, onClick = { viewModel.openRoom(room.id) }) }
        }
    }

    if (showBuilder) {
        RoomBuilderDialog(
            available = state.available,
            onDismiss = { showBuilder = false },
            onCreate = { name, ids, timed ->
                viewModel.create(name, ids, timed, if (timed) 90 else null)
                showBuilder = false
            },
        )
    }
}

@Composable
private fun RoomRow(room: RoomSummaryDto, onClick: () -> Unit) {
    Card(modifier = Modifier.fillMaxWidth().clickable(onClick = onClick)) {
        Row(
            modifier = Modifier.fillMaxWidth().padding(16.dp),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically,
        ) {
            Column(modifier = Modifier.weight(1f)) {
                Text(room.name, style = MaterialTheme.typography.titleMedium)
                Text("${room.questionCount} questions · ${roomStatusLabel(room.status)}", style = MaterialTheme.typography.bodySmall)
            }
            Text(room.code, style = MaterialTheme.typography.titleMedium)
        }
    }
}

private fun roomStatusLabel(status: String): String = when (status) {
    "lobby" -> "waiting"
    "running" -> "in progress"
    else -> "finished"
}

@Composable
private fun RoomBuilderDialog(
    available: List<Question>,
    onDismiss: () -> Unit,
    onCreate: (name: String, questionIds: List<String>, timed: Boolean) -> Unit,
) {
    var name by remember { mutableStateOf("Shared test") }
    var topic by remember { mutableStateOf<String?>(null) }
    var count by remember { mutableStateOf(10) }
    var timed by remember { mutableStateOf(false) }

    val topics = remember(available) { available.map { it.topic }.filter { it.isNotEmpty() }.distinct().sorted() }
    val matching = remember(available, topic) { topic?.let { t -> available.filter { it.topic == t } } ?: available }

    AlertDialog(
        onDismissRequest = onDismiss,
        title = { Text("Build a test") },
        text = {
            Column(verticalArrangement = Arrangement.spacedBy(12.dp)) {
                OutlinedTextField(value = name, onValueChange = { name = it }, label = { Text("Name") }, singleLine = true)

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

                Row(verticalAlignment = Alignment.CenterVertically, horizontalArrangement = Arrangement.SpaceBetween, modifier = Modifier.fillMaxWidth()) {
                    Text("Timed")
                    Switch(checked = timed, onCheckedChange = { timed = it })
                }

                Text("${matching.size} question${if (matching.size == 1) "" else "s"} to choose from.", style = MaterialTheme.typography.bodySmall)
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
