package com.synapse.app.feature.party

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
import androidx.compose.material3.Badge
import androidx.compose.material3.Button
import androidx.compose.material3.Card
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.DropdownMenu
import androidx.compose.material3.DropdownMenuItem
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedButton
import androidx.compose.material3.OutlinedTextField
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
import androidx.compose.ui.platform.LocalClipboardManager
import androidx.compose.ui.text.AnnotatedString
import androidx.compose.ui.unit.dp
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import com.synapse.app.core.api.PartyGameSummaryDto
import com.synapse.app.core.api.PartySessionItemRefDto
import com.synapse.app.core.api.PartySessionSummaryDto
import com.synapse.app.core.qbank.Question

private val PARTY_GAME_KINDS = listOf(
    "term-grid" to "Term Grid",
    "spotter" to "Spotter",
    "term-match" to "Term Match",
    "clinical-sequence" to "Clinical Sequence",
    "mechanism-chain" to "Mechanism Chain",
    "red-flag-sort" to "Red Flag Sort",
)

/** One party's lobby: its code, members, visibility (host only), sessions and party games. */
@Composable
fun PartyLobbyScreen(
    viewModel: PartyLobbyViewModel = hiltViewModel(),
    onLeft: () -> Unit,
    onBack: () -> Unit,
) {
    val uiState by viewModel.uiState.collectAsStateWithLifecycle()
    val clipboard = LocalClipboardManager.current
    var showSessionBuilder by remember { mutableStateOf(false) }
    var showGameBuilder by remember { mutableStateOf(false) }

    when (val state = uiState) {
        PartyLobbyUiState.Loading -> Box(modifier = Modifier.fillMaxSize(), contentAlignment = Alignment.Center) { CircularProgressIndicator() }

        is PartyLobbyUiState.Gone -> Column(modifier = Modifier.fillMaxSize().padding(16.dp), verticalArrangement = Arrangement.spacedBy(12.dp)) {
            Text(state.message, style = MaterialTheme.typography.bodyLarge)
            OutlinedButton(onClick = onBack) { Text("Back to parties") }
        }

        is PartyLobbyUiState.Content -> {
            LazyColumn(modifier = Modifier.fillMaxSize(), contentPadding = PaddingValues(16.dp), verticalArrangement = Arrangement.spacedBy(12.dp)) {
                item {
                    Card(modifier = Modifier.fillMaxWidth()) {
                        Column(modifier = Modifier.padding(16.dp), verticalArrangement = Arrangement.spacedBy(8.dp)) {
                            Text(state.party.name, style = MaterialTheme.typography.titleLarge)
                            Row(verticalAlignment = Alignment.CenterVertically, horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                                Text(state.party.code, style = MaterialTheme.typography.headlineSmall)
                                TextButton(onClick = { clipboard.setText(AnnotatedString(state.party.code)) }) { Text("Copy code") }
                            }
                            if (state.party.isHost) {
                                Row(verticalAlignment = Alignment.CenterVertically, horizontalArrangement = Arrangement.SpaceBetween, modifier = Modifier.fillMaxWidth()) {
                                    Text(if (state.party.visibility == "open") "Open to your year" else "Invite only")
                                    Switch(
                                        checked = state.party.visibility == "open",
                                        onCheckedChange = { viewModel.toggleVisibility(it) },
                                    )
                                }
                            }
                        }
                    }
                }

                state.message?.let { message ->
                    item { Text(message, color = MaterialTheme.colorScheme.error, style = MaterialTheme.typography.bodyMedium) }
                }

                item { Text("Who is in (${state.party.members.size})", style = MaterialTheme.typography.titleMedium) }
                items(state.party.members, key = { it.userId }) { member ->
                    Row(
                        modifier = Modifier.fillMaxWidth().padding(vertical = 4.dp),
                        horizontalArrangement = Arrangement.SpaceBetween,
                        verticalAlignment = Alignment.CenterVertically,
                    ) {
                        Text(member.displayName ?: "Student")
                        if (member.role == "host") Badge { Text("Host") }
                    }
                }

                item {
                    Row(horizontalArrangement = Arrangement.SpaceBetween, modifier = Modifier.fillMaxWidth(), verticalAlignment = Alignment.CenterVertically) {
                        Text("Sessions", style = MaterialTheme.typography.titleMedium)
                        if (state.party.isHost) TextButton(onClick = { showSessionBuilder = true }) { Text("Schedule") }
                    }
                }
                if (state.sessions.isEmpty()) {
                    item { Text("No sessions yet.", style = MaterialTheme.typography.bodySmall) }
                } else {
                    items(state.sessions, key = { "session-${it.id}" }) { session ->
                        SessionRow(session, onClick = { viewModel.openSession(session.id) })
                    }
                }

                item {
                    Row(horizontalArrangement = Arrangement.SpaceBetween, modifier = Modifier.fillMaxWidth(), verticalAlignment = Alignment.CenterVertically) {
                        Text("Party games", style = MaterialTheme.typography.titleMedium)
                        if (state.party.isHost) TextButton(onClick = { showGameBuilder = true }) { Text("Create") }
                    }
                }
                if (state.games.isEmpty()) {
                    item { Text("No party games yet.", style = MaterialTheme.typography.bodySmall) }
                } else {
                    items(state.games, key = { "game-${it.id}" }) { game ->
                        GameRow(game, onClick = { viewModel.openGame(game.id) })
                    }
                }

                if (!state.party.isHost) {
                    item {
                        OutlinedButton(onClick = { viewModel.leaveParty(onLeft) }, modifier = Modifier.fillMaxWidth()) { Text("Leave party") }
                    }
                }
            }

            if (showSessionBuilder) {
                SessionBuilderDialog(
                    available = state.availableQuestions,
                    onDismiss = { showSessionBuilder = false },
                    onCreate = { name, item, startsAt ->
                        viewModel.createSession(name, item, startsAt)
                        showSessionBuilder = false
                    },
                )
            }

            if (showGameBuilder) {
                GameBuilderDialog(
                    onDismiss = { showGameBuilder = false },
                    onCreate = { kind ->
                        viewModel.createGame(kind, System.currentTimeMillis())
                        showGameBuilder = false
                    },
                )
            }
        }
    }
}

@Composable
private fun SessionRow(session: PartySessionSummaryDto, onClick: () -> Unit) {
    Card(modifier = Modifier.fillMaxWidth().clickable(onClick = onClick)) {
        Row(modifier = Modifier.fillMaxWidth().padding(16.dp), horizontalArrangement = Arrangement.SpaceBetween, verticalAlignment = Alignment.CenterVertically) {
            Column(modifier = Modifier.weight(1f)) {
                Text(session.name, style = MaterialTheme.typography.titleMedium)
                Text("${session.itemCount} item${if (session.itemCount == 1) "" else "s"} · ${session.state}", style = MaterialTheme.typography.bodySmall)
            }
            if (session.isMine) Badge { Text("Yours") }
        }
    }
}

@Composable
private fun GameRow(game: PartyGameSummaryDto, onClick: () -> Unit) {
    Card(modifier = Modifier.fillMaxWidth().clickable(onClick = onClick)) {
        Row(modifier = Modifier.fillMaxWidth().padding(16.dp), horizontalArrangement = Arrangement.SpaceBetween, verticalAlignment = Alignment.CenterVertically) {
            Column(modifier = Modifier.weight(1f)) {
                Text(game.title, style = MaterialTheme.typography.titleMedium)
                Text("${game.kind} · ${if (game.status == "completed") "Completed" else "Live"}", style = MaterialTheme.typography.bodySmall)
            }
        }
    }
}

@Composable
private fun SessionBuilderDialog(
    available: List<Question>,
    onDismiss: () -> Unit,
    onCreate: (name: String, item: PartySessionItemRefDto, startsAt: String?) -> Unit,
) {
    var name by remember { mutableStateOf("") }
    var expanded by remember { mutableStateOf(false) }
    var chosen by remember { mutableStateOf<Question?>(null) }

    AlertDialog(
        onDismissRequest = onDismiss,
        title = { Text("Schedule a session") },
        text = {
            Column(verticalArrangement = Arrangement.spacedBy(12.dp)) {
                OutlinedTextField(value = name, onValueChange = { name = it }, label = { Text("Name") }, singleLine = true)

                Box {
                    OutlinedButton(onClick = { expanded = true }, modifier = Modifier.fillMaxWidth()) {
                        Text(chosen?.stem?.take(40) ?: "Choose a question")
                    }
                    DropdownMenu(expanded = expanded, onDismissRequest = { expanded = false }) {
                        available.take(50).forEach { question ->
                            DropdownMenuItem(text = { Text(question.stem.take(60)) }, onClick = { chosen = question; expanded = false })
                        }
                    }
                }
                Text(
                    "Starts immediately, open to the whole party. Practical and essay activities can be scheduled from the web app for now.",
                    style = MaterialTheme.typography.bodySmall,
                )
            }
        },
        confirmButton = {
            TextButton(
                onClick = {
                    val question = chosen ?: return@TextButton
                    onCreate(name.trim().ifBlank { question.stem.take(40) }, PartySessionItemRefDto("question", question.id), null)
                },
                enabled = chosen != null,
            ) { Text("Schedule") }
        },
        dismissButton = { TextButton(onClick = onDismiss) { Text("Cancel") } },
    )
}

@Composable
private fun GameBuilderDialog(onDismiss: () -> Unit, onCreate: (kind: String) -> Unit) {
    var expanded by remember { mutableStateOf(false) }
    var kind by remember { mutableStateOf(PARTY_GAME_KINDS.first()) }

    AlertDialog(
        onDismissRequest = onDismiss,
        title = { Text("Create a party game") },
        text = {
            Box {
                OutlinedButton(onClick = { expanded = true }, modifier = Modifier.fillMaxWidth()) { Text(kind.second) }
                DropdownMenu(expanded = expanded, onDismissRequest = { expanded = false }) {
                    PARTY_GAME_KINDS.forEach { option ->
                        DropdownMenuItem(text = { Text(option.second) }, onClick = { kind = option; expanded = false })
                    }
                }
            }
        },
        confirmButton = { TextButton(onClick = { onCreate(kind.first) }) { Text("Create") } },
        dismissButton = { TextButton(onClick = onDismiss) { Text("Cancel") } },
    )
}
