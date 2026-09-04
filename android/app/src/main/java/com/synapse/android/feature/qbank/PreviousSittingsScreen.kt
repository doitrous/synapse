package com.synapse.android.feature.qbank

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import com.synapse.android.core.ui.StateHost
import kotlin.math.roundToInt

/**
 * A student's past qbank sittings, newest first: name, date, how many
 * questions were answered, and accuracy.
 */
@Composable
fun PreviousSittingsScreen(viewModel: PreviousSittingsViewModel, onBack: () -> Unit) {
    val uiState by viewModel.uiState.collectAsState()

    Column(modifier = Modifier.fillMaxSize().padding(24.dp)) {
        Row(modifier = Modifier.fillMaxWidth(), verticalAlignment = Alignment.CenterVertically) {
            Text("Previous sittings", style = MaterialTheme.typography.headlineSmall, modifier = Modifier.weight(1f))
            TextButton(onClick = onBack) { Text("Back") }
        }

        StateHost(state = uiState, modifier = Modifier.weight(1f)) { sittings ->
            LazyColumn(
                modifier = Modifier.fillMaxSize().padding(top = 12.dp),
                verticalArrangement = Arrangement.spacedBy(8.dp),
            ) {
                items(sittings, key = { it.sessionId }) { sitting ->
                    Column {
                        Text(sitting.name, style = MaterialTheme.typography.titleMedium)
                        val accuracyText = sitting.accuracy?.let { "${(it * 100).roundToInt()}%" } ?: "--"
                        Text(
                            "${sitting.date} · ${sitting.answered} answered · $accuracyText",
                            style = MaterialTheme.typography.bodyMedium,
                        )
                    }
                }
            }
        }
    }
}
