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
import androidx.compose.foundation.lazy.items
import androidx.compose.material3.Card
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedButton
import androidx.compose.material3.OutlinedTextField
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
import com.synapse.app.core.api.PersonDto

/** The Friends tab: this student's friend graph, incoming/outgoing requests, and finding/inviting people. */
@Composable
fun FriendsScreen(viewModel: FriendsViewModel = hiltViewModel()) {
    val uiState by viewModel.uiState.collectAsStateWithLifecycle()
    var query by remember { mutableStateOf("") }

    val state = uiState as? FriendsUiState.Content
    if (state == null) {
        Box(modifier = Modifier.fillMaxSize(), contentAlignment = Alignment.Center) { CircularProgressIndicator() }
        return
    }

    LazyColumn(modifier = Modifier.fillMaxSize(), contentPadding = PaddingValues(16.dp), verticalArrangement = Arrangement.spacedBy(12.dp)) {
        state.message?.let { item { Text(it, color = MaterialTheme.colorScheme.error) } }
        if (state.offline) {
            item { Text("Could not reach Synapse.", style = MaterialTheme.typography.bodyMedium) }
        }

        item {
            Card(modifier = Modifier.fillMaxWidth()) {
                Column(modifier = Modifier.padding(16.dp), verticalArrangement = Arrangement.spacedBy(8.dp)) {
                    Text("Find people", style = MaterialTheme.typography.titleMedium)
                    OutlinedTextField(
                        value = query,
                        onValueChange = { query = it; viewModel.search(it) },
                        label = { Text("Search your cohort") },
                        singleLine = true,
                        modifier = Modifier.fillMaxWidth(),
                    )
                    state.directoryResults?.forEach { person ->
                        Row(
                            modifier = Modifier.fillMaxWidth(),
                            horizontalArrangement = Arrangement.SpaceBetween,
                            verticalAlignment = Alignment.CenterVertically,
                        ) {
                            Text(person.displayName ?: "Student")
                            TextButton(onClick = { viewModel.sendRequest(person.userId) }) { Text("Add") }
                        }
                    }
                    if (state.directoryResults?.isEmpty() == true) {
                        Text("Nobody matched.", style = MaterialTheme.typography.bodySmall)
                    }
                }
            }
        }

        item {
            Card(modifier = Modifier.fillMaxWidth()) {
                Column(modifier = Modifier.padding(16.dp), verticalArrangement = Arrangement.spacedBy(8.dp)) {
                    Text("Invite by link", style = MaterialTheme.typography.titleMedium)
                    if (state.inviteToken != null) {
                        Text(state.inviteToken, style = MaterialTheme.typography.bodyMedium)
                    } else {
                        OutlinedButton(onClick = { viewModel.mintInvite() }) { Text("Create an invite") }
                    }
                }
            }
        }

        if (state.incoming.isNotEmpty()) {
            item { Text("Requests", style = MaterialTheme.typography.titleMedium) }
            items(state.incoming, key = { it.userId }) { person ->
                RequestRow(
                    person = person,
                    onAccept = { viewModel.respondToRequest(person.userId, true) },
                    onDecline = { viewModel.respondToRequest(person.userId, false) },
                )
            }
        }

        if (state.outgoing.isNotEmpty()) {
            item { Text("Sent requests", style = MaterialTheme.typography.titleMedium) }
            items(state.outgoing, key = { it.userId }) { person ->
                Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween) {
                    Text(person.displayName ?: "Student")
                    Text("Pending", style = MaterialTheme.typography.labelMedium)
                }
            }
        }

        item { Text("Friends", style = MaterialTheme.typography.titleMedium) }
        if (state.friends.isEmpty()) {
            item { Text("No friends yet — search your cohort above.", style = MaterialTheme.typography.bodyMedium) }
        } else {
            items(state.friends, key = { it.userId }) { friend ->
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically,
                ) {
                    Text(friend.displayName ?: "Student")
                    TextButton(onClick = { viewModel.remove(friend.userId) }) { Text("Remove") }
                }
            }
        }
    }
}

@Composable
private fun RequestRow(person: PersonDto, onAccept: () -> Unit, onDecline: () -> Unit) {
    Row(
        modifier = Modifier.fillMaxWidth(),
        horizontalArrangement = Arrangement.SpaceBetween,
        verticalAlignment = Alignment.CenterVertically,
    ) {
        Text(person.displayName ?: "Student")
        Row {
            TextButton(onClick = onAccept) { Text("Accept") }
            TextButton(onClick = onDecline) { Text("Decline") }
        }
    }
}
