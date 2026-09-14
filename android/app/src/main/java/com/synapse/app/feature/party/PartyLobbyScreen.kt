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
import androidx.compose.ui.res.pluralStringResource
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.text.AnnotatedString
import androidx.compose.ui.unit.dp
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import com.synapse.app.R
import com.synapse.app.core.api.PartyGameSummaryDto
import com.synapse.app.core.api.PartySessionItemRefDto
import com.synapse.app.core.api.PartySessionSummaryDto
import com.synapse.app.core.qbank.Question

/** Wire kind code to its display name — the code is what's sent to the server, never translated. */
private val PARTY_GAME_KINDS: List<Pair<String, Int>> = listOf(
    "term-grid" to R.string.party_game_kind_term_grid,
    "spotter" to R.string.party_game_kind_spotter,
    "term-match" to R.string.party_game_kind_term_match,
    "clinical-sequence" to R.string.party_game_kind_clinical_sequence,
    "mechanism-chain" to R.string.party_game_kind_mechanism_chain,
    "red-flag-sort" to R.string.party_game_kind_red_flag_sort,
)

/** Looks up a party game kind's display name; unrecognized kinds fall back to the raw wire value. */
@Composable
private fun partyGameKindLabel(kind: String): String {
    val resId = PARTY_GAME_KINDS.firstOrNull { it.first == kind }?.second
    return resId?.let { stringResource(it) } ?: kind
}

/** Maps a session's `scheduled`/`open`/`closed` wire state to its display label. */
@Composable
private fun partySessionStateLabel(state: String): String = when (state) {
    "scheduled" -> stringResource(R.string.party_session_state_scheduled)
    "open" -> stringResource(R.string.party_session_state_open)
    "closed" -> stringResource(R.string.party_session_state_closed)
    else -> state
}

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
            Text(stringResource(state.message), style = MaterialTheme.typography.bodyLarge)
            OutlinedButton(onClick = onBack) { Text(stringResource(R.string.party_back_to_parties)) }
        }

        is PartyLobbyUiState.Content -> {
            LazyColumn(modifier = Modifier.fillMaxSize(), contentPadding = PaddingValues(16.dp), verticalArrangement = Arrangement.spacedBy(12.dp)) {
                item {
                    Card(modifier = Modifier.fillMaxWidth()) {
                        Column(modifier = Modifier.padding(16.dp), verticalArrangement = Arrangement.spacedBy(8.dp)) {
                            Text(state.party.name, style = MaterialTheme.typography.titleLarge)
                            Row(verticalAlignment = Alignment.CenterVertically, horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                                Text(state.party.code, style = MaterialTheme.typography.headlineSmall)
                                TextButton(onClick = { clipboard.setText(AnnotatedString(state.party.code)) }) { Text(stringResource(R.string.party_copy_code)) }
                            }
                            if (state.party.isHost) {
                                Row(verticalAlignment = Alignment.CenterVertically, horizontalArrangement = Arrangement.SpaceBetween, modifier = Modifier.fillMaxWidth()) {
                                    Text(stringResource(if (state.party.visibility == "open") R.string.party_visibility_open else R.string.party_visibility_invite))
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
                    item { Text(stringResource(message), color = MaterialTheme.colorScheme.error, style = MaterialTheme.typography.bodyMedium) }
                }

                item { Text(stringResource(R.string.party_who_is_in_count, state.party.members.size), style = MaterialTheme.typography.titleMedium) }
                items(state.party.members, key = { it.userId }) { member ->
                    Row(
                        modifier = Modifier.fillMaxWidth().padding(vertical = 4.dp),
                        horizontalArrangement = Arrangement.SpaceBetween,
                        verticalAlignment = Alignment.CenterVertically,
                    ) {
                        Text(member.displayName ?: stringResource(R.string.party_member_fallback_name))
                        if (member.role == "host") Badge { Text(stringResource(R.string.party_host_badge)) }
                    }
                }

                item {
                    Row(horizontalArrangement = Arrangement.SpaceBetween, modifier = Modifier.fillMaxWidth(), verticalAlignment = Alignment.CenterVertically) {
                        Text(stringResource(R.string.party_sessions_title), style = MaterialTheme.typography.titleMedium)
                        if (state.party.isHost) TextButton(onClick = { showSessionBuilder = true }) { Text(stringResource(R.string.party_schedule)) }
                    }
                }
                if (state.sessions.isEmpty()) {
                    item { Text(stringResource(R.string.party_no_sessions), style = MaterialTheme.typography.bodySmall) }
                } else {
                    items(state.sessions, key = { "session-${it.id}" }) { session ->
                        SessionRow(session, onClick = { viewModel.openSession(session.id) })
                    }
                }

                item {
                    Row(horizontalArrangement = Arrangement.SpaceBetween, modifier = Modifier.fillMaxWidth(), verticalAlignment = Alignment.CenterVertically) {
                        Text(stringResource(R.string.party_games_title), style = MaterialTheme.typography.titleMedium)
                        if (state.party.isHost) TextButton(onClick = { showGameBuilder = true }) { Text(stringResource(R.string.party_create)) }
                    }
                }
                if (state.games.isEmpty()) {
                    item { Text(stringResource(R.string.party_no_games), style = MaterialTheme.typography.bodySmall) }
                } else {
                    items(state.games, key = { "game-${it.id}" }) { game ->
                        GameRow(game, onClick = { viewModel.openGame(game.id) })
                    }
                }

                if (!state.party.isHost) {
                    item {
                        OutlinedButton(onClick = { viewModel.leaveParty(onLeft) }, modifier = Modifier.fillMaxWidth()) { Text(stringResource(R.string.party_leave)) }
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
                Text(
                    "${pluralStringResource(R.plurals.party_items_count, session.itemCount, session.itemCount)} · ${partySessionStateLabel(session.state)}",
                    style = MaterialTheme.typography.bodySmall,
                )
            }
            if (session.isMine) Badge { Text(stringResource(R.string.party_yours_badge)) }
        }
    }
}

@Composable
private fun GameRow(game: PartyGameSummaryDto, onClick: () -> Unit) {
    Card(modifier = Modifier.fillMaxWidth().clickable(onClick = onClick)) {
        Row(modifier = Modifier.fillMaxWidth().padding(16.dp), horizontalArrangement = Arrangement.SpaceBetween, verticalAlignment = Alignment.CenterVertically) {
            Column(modifier = Modifier.weight(1f)) {
                Text(game.title, style = MaterialTheme.typography.titleMedium)
                Text(
                    "${partyGameKindLabel(game.kind)} · ${stringResource(if (game.status == "completed") R.string.party_game_status_completed else R.string.party_game_status_live)}",
                    style = MaterialTheme.typography.bodySmall,
                )
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
        title = { Text(stringResource(R.string.party_schedule_session_title)) },
        text = {
            Column(verticalArrangement = Arrangement.spacedBy(12.dp)) {
                OutlinedTextField(value = name, onValueChange = { name = it }, label = { Text(stringResource(R.string.party_name_label)) }, singleLine = true)

                Box {
                    OutlinedButton(onClick = { expanded = true }, modifier = Modifier.fillMaxWidth()) {
                        Text(chosen?.stem?.take(40) ?: stringResource(R.string.party_choose_question))
                    }
                    DropdownMenu(expanded = expanded, onDismissRequest = { expanded = false }) {
                        available.take(50).forEach { question ->
                            DropdownMenuItem(text = { Text(question.stem.take(60)) }, onClick = { chosen = question; expanded = false })
                        }
                    }
                }
                Text(
                    stringResource(R.string.party_session_note),
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
            ) { Text(stringResource(R.string.party_schedule)) }
        },
        dismissButton = { TextButton(onClick = onDismiss) { Text(stringResource(R.string.party_cancel)) } },
    )
}

@Composable
private fun GameBuilderDialog(onDismiss: () -> Unit, onCreate: (kind: String) -> Unit) {
    var expanded by remember { mutableStateOf(false) }
    var kind by remember { mutableStateOf(PARTY_GAME_KINDS.first()) }

    AlertDialog(
        onDismissRequest = onDismiss,
        title = { Text(stringResource(R.string.party_create_game_title)) },
        text = {
            Box {
                OutlinedButton(onClick = { expanded = true }, modifier = Modifier.fillMaxWidth()) { Text(stringResource(kind.second)) }
                DropdownMenu(expanded = expanded, onDismissRequest = { expanded = false }) {
                    PARTY_GAME_KINDS.forEach { option ->
                        DropdownMenuItem(text = { Text(stringResource(option.second)) }, onClick = { kind = option; expanded = false })
                    }
                }
            }
        },
        confirmButton = { TextButton(onClick = { onCreate(kind.first) }) { Text(stringResource(R.string.party_create)) } },
        dismissButton = { TextButton(onClick = onDismiss) { Text(stringResource(R.string.party_cancel)) } },
    )
}
