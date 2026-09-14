package com.synapse.app.feature.notifications

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.HorizontalDivider
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import com.synapse.app.core.api.ShareNotification

const val NOTIFICATIONS_LOADING_TAG = "notifications_loading"
const val NOTIFICATIONS_EMPTY_TAG = "notifications_empty"
const val NOTIFICATIONS_UNAVAILABLE_TAG = "notifications_unavailable"
fun notificationRowTag(id: String): String = "notifications_item_$id"

/**
 * The shared-notifications inbox's single public entry point. Constructs its
 * own [NotificationsViewModel] via [hiltViewModel] — no navigation wiring
 * required of the caller. Deep-linking a tapped item to its `/s/:shareId`
 * document is out of scope (see the plan this surface was built from); tapping
 * only marks the item read.
 */
@Composable
fun NotificationsRoute(viewModel: NotificationsViewModel = hiltViewModel()) {
    val uiState by viewModel.uiState.collectAsStateWithLifecycle()
    when (val state = uiState) {
        NotificationsUiState.Loading -> Box(Modifier.fillMaxSize().testTag(NOTIFICATIONS_LOADING_TAG), contentAlignment = Alignment.Center) {
            CircularProgressIndicator()
        }
        is NotificationsUiState.Content -> NotificationsContent(state, onTap = viewModel::markRead)
        NotificationsUiState.Unavailable -> Box(Modifier.fillMaxSize().testTag(NOTIFICATIONS_UNAVAILABLE_TAG), contentAlignment = Alignment.Center) {
            Text("Notifications aren't available right now.")
        }
    }
}

@Composable
private fun NotificationsContent(state: NotificationsUiState.Content, onTap: (String) -> Unit) {
    Column(Modifier.fillMaxSize()) {
        if (state.fromCache) {
            Text(
                "Showing your last-known inbox — you're offline.",
                color = MaterialTheme.colorScheme.error,
                modifier = Modifier.padding(12.dp),
            )
        }
        if (state.items.isEmpty()) {
            Box(Modifier.fillMaxSize().testTag(NOTIFICATIONS_EMPTY_TAG), contentAlignment = Alignment.Center) {
                Text("No shared-document notifications yet.")
            }
        } else {
            LazyColumn(Modifier.fillMaxSize()) {
                items(state.items, key = { it.id }) { item ->
                    NotificationRow(item, onTap = { onTap(item.id) })
                    HorizontalDivider()
                }
            }
        }
    }
}

@Composable
private fun NotificationRow(item: ShareNotification, onTap: () -> Unit) {
    val unread = item.readAt == null
    Row(
        modifier = Modifier
            .fillMaxWidth()
            .testTag(notificationRowTag(item.id))
            .clickable(onClick = onTap)
            .background(if (unread) MaterialTheme.colorScheme.primaryContainer else Color.Transparent)
            .padding(16.dp),
    ) {
        Column(Modifier.weight(1f)) {
            Text(item.title, fontWeight = if (unread) FontWeight.Bold else FontWeight.Normal)
            Text(item.message, style = MaterialTheme.typography.bodySmall)
        }
    }
}
