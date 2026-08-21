package com.synapse.android.feature.account

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Button
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.SegmentedButton
import androidx.compose.material3.SegmentedButtonDefaults
import androidx.compose.material3.SingleChoiceSegmentedButtonRow
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.runtime.rememberCoroutineScope
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import com.synapse.android.design.CortexThemeChoice
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
    val ui by viewModel.ui.collectAsState(
        initial = AccountUi(email = null, lastSyncedAt = null, pendingWrites = 0, themeChoice = CortexThemeChoice.LIGHT),
    )
    val scope = rememberCoroutineScope()

    Column(
        modifier = Modifier.fillMaxSize().padding(24.dp),
        verticalArrangement = Arrangement.spacedBy(12.dp),
    ) {
        Text("Account", style = MaterialTheme.typography.headlineSmall)
        Text(ui.email ?: "Signed in")
        Text(syncedAtLabel(ui.lastSyncedAt))
        Text(pendingWritesLabel(ui.pendingWrites))
        Text("Appearance", style = MaterialTheme.typography.titleMedium)
        ThemePicker(selected = ui.themeChoice, onSelect = viewModel::setTheme)
        Text(
            "Light, warm, or dark. Kept on this device.",
            style = MaterialTheme.typography.bodySmall,
        )
        Button(onClick = { scope.launch { viewModel.signOut() } }) {
            Text("Sign out")
        }
    }
}

/** A three-way segmented control. Selecting recomposes the whole tree immediately -- no restart, no confirmation. */
@Composable
private fun ThemePicker(selected: CortexThemeChoice, onSelect: (CortexThemeChoice) -> Unit) {
    val options = CortexThemeChoice.entries
    SingleChoiceSegmentedButtonRow(modifier = Modifier.fillMaxWidth()) {
        options.forEachIndexed { index, choice ->
            SegmentedButton(
                selected = choice == selected,
                onClick = { onSelect(choice) },
                shape = SegmentedButtonDefaults.itemShape(index = index, count = options.size),
                label = { Text(themeLabel(choice)) },
            )
        }
    }
}

private fun themeLabel(choice: CortexThemeChoice): String = when (choice) {
    CortexThemeChoice.LIGHT -> "Light"
    CortexThemeChoice.WARM -> "Warm"
    CortexThemeChoice.DARK -> "Dark"
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
