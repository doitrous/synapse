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
import androidx.compose.ui.res.pluralStringResource
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.unit.dp
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import com.synapse.app.R
import com.synapse.app.core.api.OpenPartyDto
import com.synapse.app.core.api.PartySummaryDto

/** The Parties list: this student's own parties, joining one by code, and building a new one. */
@Composable
fun PartiesScreen(viewModel: PartiesViewModel = hiltViewModel(), onOpenParty: (String) -> Unit) {
    val uiState by viewModel.uiState.collectAsStateWithLifecycle()
    var showCreate by remember { mutableStateOf(false) }
    var code by remember { mutableStateOf("") }

    val state = uiState as? PartiesUiState.Content
    if (state == null) {
        Box(modifier = Modifier.fillMaxSize(), contentAlignment = Alignment.Center) { CircularProgressIndicator() }
        return
    }

    LazyColumn(modifier = Modifier.fillMaxSize(), contentPadding = PaddingValues(16.dp), verticalArrangement = Arrangement.spacedBy(12.dp)) {
        item {
            Card(modifier = Modifier.fillMaxWidth()) {
                Column(modifier = Modifier.padding(16.dp), verticalArrangement = Arrangement.spacedBy(8.dp)) {
                    Text(stringResource(R.string.party_join_title), style = MaterialTheme.typography.titleMedium)
                    Row(verticalAlignment = Alignment.CenterVertically, horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                        OutlinedTextField(
                            value = code,
                            onValueChange = { code = it.uppercase() },
                            label = { Text(stringResource(R.string.party_code_label)) },
                            singleLine = true,
                            modifier = Modifier.weight(1f),
                        )
                        Button(onClick = { viewModel.join(code); code = "" }, enabled = code.isNotBlank()) { Text(stringResource(R.string.party_join)) }
                    }
                    Text(
                        stringResource(R.string.party_join_description),
                        style = MaterialTheme.typography.bodySmall,
                    )
                }
            }
        }

        item {
            OutlinedButton(onClick = { showCreate = true }, modifier = Modifier.fillMaxWidth()) {
                Text(stringResource(R.string.party_start))
            }
        }

        state.message?.let { message ->
            item { Text(stringResource(message), color = MaterialTheme.colorScheme.error, style = MaterialTheme.typography.bodyMedium) }
        }

        if (state.offline) {
            item { Text(stringResource(R.string.party_offline), style = MaterialTheme.typography.bodyMedium) }
        } else {
            if (state.mine.isNotEmpty()) {
                item { Text(stringResource(R.string.party_mine_title), style = MaterialTheme.typography.titleMedium) }
                items(state.mine, key = { "mine-${it.id}" }) { party -> MyPartyRow(party, onClick = { onOpenParty(party.id) }) }
            }
            if (state.open.isNotEmpty()) {
                item { Text(stringResource(R.string.party_open_title), style = MaterialTheme.typography.titleMedium) }
                items(state.open, key = { "open-${it.id}" }) { party -> OpenPartyRow(party, onClick = { viewModel.join(party.code); onOpenParty(party.id) }) }
            }
            if (state.mine.isEmpty() && state.open.isEmpty()) {
                item { Text(stringResource(R.string.party_empty), style = MaterialTheme.typography.bodyMedium) }
            }
        }
    }

    if (showCreate) {
        val defaultName = stringResource(R.string.party_default_name)
        var name by remember { mutableStateOf(defaultName) }
        AlertDialog(
            onDismissRequest = { showCreate = false },
            title = { Text(stringResource(R.string.party_start)) },
            text = {
                OutlinedTextField(value = name, onValueChange = { name = it }, label = { Text(stringResource(R.string.party_name_label)) }, singleLine = true)
            },
            confirmButton = {
                TextButton(
                    onClick = { viewModel.create(name); showCreate = false },
                    enabled = name.isNotBlank(),
                ) { Text(stringResource(R.string.party_start_confirm)) }
            },
            dismissButton = { TextButton(onClick = { showCreate = false }) { Text(stringResource(R.string.party_cancel)) } },
        )
    }
}

@Composable
private fun MyPartyRow(party: PartySummaryDto, onClick: () -> Unit) {
    Card(modifier = Modifier.fillMaxWidth().clickable(onClick = onClick)) {
        Row(
            modifier = Modifier.fillMaxWidth().padding(16.dp),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically,
        ) {
            Column(modifier = Modifier.weight(1f)) {
                Text(party.name, style = MaterialTheme.typography.titleMedium)
                Text(
                    "${pluralStringResource(R.plurals.party_members_count, party.members, party.members)} · ${party.code}",
                    style = MaterialTheme.typography.bodySmall,
                )
            }
            if (party.isHost) Badge { Text(stringResource(R.string.party_host_badge)) }
        }
    }
}

@Composable
private fun OpenPartyRow(party: OpenPartyDto, onClick: () -> Unit) {
    Card(modifier = Modifier.fillMaxWidth().clickable(onClick = onClick)) {
        Row(
            modifier = Modifier.fillMaxWidth().padding(16.dp),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically,
        ) {
            Column(modifier = Modifier.weight(1f)) {
                Text(party.name, style = MaterialTheme.typography.titleMedium)
                Text(pluralStringResource(R.plurals.party_members_count, party.members, party.members), style = MaterialTheme.typography.bodySmall)
            }
            Text(stringResource(R.string.party_join), style = MaterialTheme.typography.labelLarge)
        }
    }
}
