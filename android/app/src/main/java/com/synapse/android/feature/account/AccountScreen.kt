package com.synapse.android.feature.account

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Button
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.runtime.rememberCoroutineScope
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import java.time.Instant
import java.time.ZoneId
import java.time.format.DateTimeFormatter
import kotlinx.coroutines.launch

/**
 * Who is signed in, whether their work has actually left the phone, and how
 * many edits are still queued for the server. A `null` [AccountUi.lastSyncedAt]
 * always renders as "Not yet synced" -- never a formatted epoch, which
 * reads as corruption rather than "we haven't synced yet".
 */
@Composable
fun AccountScreen(viewModel: AccountViewModel) {
    val ui by viewModel.ui.collectAsState(initial = AccountUi(email = null, lastSyncedAt = null, pendingWrites = 0))
    val scope = rememberCoroutineScope()

    Column(
        modifier = Modifier.fillMaxSize().padding(24.dp),
        verticalArrangement = Arrangement.spacedBy(12.dp),
    ) {
        Text("Account", style = MaterialTheme.typography.headlineSmall)
        Text(ui.email ?: "Signed in")
        Text(syncedAtLabel(ui.lastSyncedAt))
        Text(pendingWritesLabel(ui.pendingWrites))
        Button(onClick = { scope.launch { viewModel.signOut() } }) {
            Text("Sign out")
        }
    }
}

private fun syncedAtLabel(lastSyncedAt: Instant?): String {
    if (lastSyncedAt == null) return "Not yet synced"
    val formatter = DateTimeFormatter.ofPattern("MMM d, h:mm a").withZone(ZoneId.systemDefault())
    return "Last synced ${formatter.format(lastSyncedAt)}"
}

private fun pendingWritesLabel(pendingWrites: Int): String = when (pendingWrites) {
    0 -> "All changes saved"
    1 -> "1 change waiting to sync"
    else -> "$pendingWrites changes waiting to sync"
}
