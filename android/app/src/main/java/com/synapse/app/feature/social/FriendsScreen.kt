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
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.unit.dp
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import com.synapse.app.R
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
        state.message?.let { item { Text(stringResource(it), color = MaterialTheme.colorScheme.error) } }
        if (state.offline) {
            item { Text(stringResource(R.string.social_offline_generic), style = MaterialTheme.typography.bodyMedium) }
        }

        item {
            Card(modifier = Modifier.fillMaxWidth()) {
                Column(modifier = Modifier.padding(16.dp), verticalArrangement = Arrangement.spacedBy(8.dp)) {
                    Text(stringResource(R.string.social_find_people_title), style = MaterialTheme.typography.titleMedium)
                    OutlinedTextField(
                        value = query,
                        onValueChange = { query = it; viewModel.search(it) },
                        label = { Text(stringResource(R.string.social_search_cohort_label)) },
                        singleLine = true,
                        modifier = Modifier.fillMaxWidth(),
                    )
                    state.directoryResults?.forEach { person ->
                        Row(
                            modifier = Modifier.fillMaxWidth(),
                            horizontalArrangement = Arrangement.SpaceBetween,
                            verticalAlignment = Alignment.CenterVertically,
                        ) {
                            Text(person.displayName ?: stringResource(R.string.social_student_fallback))
                            TextButton(onClick = { viewModel.sendRequest(person.userId) }) { Text(stringResource(R.string.social_add_button)) }
                        }
                    }
                    if (state.directoryResults?.isEmpty() == true) {
                        Text(stringResource(R.string.social_nobody_matched), style = MaterialTheme.typography.bodySmall)
                    }
                }
            }
        }

        item {
            Card(modifier = Modifier.fillMaxWidth()) {
                Column(modifier = Modifier.padding(16.dp), verticalArrangement = Arrangement.spacedBy(8.dp)) {
                    Text(stringResource(R.string.social_invite_by_link_title), style = MaterialTheme.typography.titleMedium)
                    if (state.inviteToken != null) {
                        Text(state.inviteToken, style = MaterialTheme.typography.bodyMedium)
                    } else {
                        OutlinedButton(onClick = { viewModel.mintInvite() }) { Text(stringResource(R.string.social_create_invite_button)) }
                    }
                }
            }
        }

        if (state.incoming.isNotEmpty()) {
            item { Text(stringResource(R.string.social_requests_title), style = MaterialTheme.typography.titleMedium) }
            items(state.incoming, key = { it.userId }) { person ->
                RequestRow(
                    person = person,
                    onAccept = { viewModel.respondToRequest(person.userId, true) },
                    onDecline = { viewModel.respondToRequest(person.userId, false) },
                )
            }
        }

        if (state.outgoing.isNotEmpty()) {
            item { Text(stringResource(R.string.social_sent_requests_title), style = MaterialTheme.typography.titleMedium) }
            items(state.outgoing, key = { it.userId }) { person ->
                Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween) {
                    Text(person.displayName ?: stringResource(R.string.social_student_fallback))
                    Text(stringResource(R.string.social_pending_label), style = MaterialTheme.typography.labelMedium)
                }
            }
        }

        item { Text(stringResource(R.string.social_friends_title), style = MaterialTheme.typography.titleMedium) }
        if (state.friends.isEmpty()) {
            item { Text(stringResource(R.string.social_no_friends_yet), style = MaterialTheme.typography.bodyMedium) }
        } else {
            items(state.friends, key = { it.userId }) { friend ->
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically,
                ) {
                    Text(friend.displayName ?: stringResource(R.string.social_student_fallback))
                    TextButton(onClick = { viewModel.remove(friend.userId) }) { Text(stringResource(R.string.social_remove_button)) }
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
        Text(person.displayName ?: stringResource(R.string.social_student_fallback))
        Row {
            TextButton(onClick = onAccept) { Text(stringResource(R.string.social_accept_button)) }
            TextButton(onClick = onDecline) { Text(stringResource(R.string.social_decline_button)) }
        }
    }
}
