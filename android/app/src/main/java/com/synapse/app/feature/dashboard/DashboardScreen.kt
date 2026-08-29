package com.synapse.app.feature.dashboard

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.AssistChip
import androidx.compose.material3.Button
import androidx.compose.material3.Card
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.unit.dp
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.lifecycle.compose.collectAsStateWithLifecycle

/** Test tag on the sync-status chip, so tests can read its label unambiguously. */
const val SYNC_STATUS_CHIP_TAG = "dashboard_sync_status_chip"

/** Test tag on the manual "Sync now" button. */
const val SYNC_NOW_BUTTON_TAG = "dashboard_sync_now_button"

/**
 * The student's landing screen: a greeting, a sync-status chip, a manual "Sync now" action,
 * and empty-state cards for "Due reviews" / "Today's agenda" that fill in once content plans
 * (adaptive review scheduling, calendar) land in a later milestone.
 */
@Composable
fun DashboardScreen(viewModel: DashboardViewModel = hiltViewModel()) {
    val uiState by viewModel.uiState.collectAsStateWithLifecycle()
    DashboardContent(uiState = uiState, onSyncNow = viewModel::refresh)
}

@Composable
private fun DashboardContent(uiState: DashboardUiState, onSyncNow: () -> Unit) {
    val greetingName = (uiState as? DashboardUiState.Content)?.state?.greetingName
    val greeting = if (greetingName != null) "Welcome back, $greetingName" else "Welcome back"

    Column(modifier = Modifier.fillMaxSize().padding(24.dp)) {
        Text(text = greeting, style = MaterialTheme.typography.titleLarge)

        Row(
            modifier = Modifier.fillMaxWidth().padding(top = 12.dp),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically,
        ) {
            SyncStatusChip(uiState)
            Button(onClick = onSyncNow, modifier = Modifier.testTag(SYNC_NOW_BUTTON_TAG)) {
                Text("Sync now")
            }
        }

        EmptyStateCard(
            title = "Due reviews",
            body = "Nothing due yet — this fills in once your review schedule is set up.",
            modifier = Modifier.padding(top = 24.dp),
        )

        EmptyStateCard(
            title = "Today's agenda",
            body = "Your day's plan will show up here once a study plan is in place.",
            modifier = Modifier.padding(top = 16.dp),
        )
    }
}

@Composable
private fun SyncStatusChip(uiState: DashboardUiState) {
    val label = when (uiState) {
        DashboardUiState.Loading -> "Syncing…"
        DashboardUiState.Offline -> "Offline"
        is DashboardUiState.Content -> uiState.state.lastSyncedLabel ?: "Synced"
    }
    AssistChip(
        onClick = {},
        label = { Text(label) },
        modifier = Modifier.testTag(SYNC_STATUS_CHIP_TAG),
    )
}

@Composable
private fun EmptyStateCard(title: String, body: String, modifier: Modifier = Modifier) {
    Card(modifier = modifier.fillMaxWidth()) {
        Column(modifier = Modifier.padding(16.dp)) {
            Text(text = title, style = MaterialTheme.typography.titleMedium)
            Text(
                text = body,
                style = MaterialTheme.typography.bodyMedium,
                modifier = Modifier.padding(top = 4.dp),
            )
        }
    }
}
