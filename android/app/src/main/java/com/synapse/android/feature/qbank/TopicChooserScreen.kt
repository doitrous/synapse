package com.synapse.android.feature.qbank

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material3.Button
import androidx.compose.material3.Checkbox
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import com.synapse.android.core.qbank.ChooserTopic
import com.synapse.android.core.qbank.QBankScope

/**
 * Which chapters a student is sitting.
 *
 * Every row is a whole-topic toggle -- Milestone 1's chooser offers no
 * subtopic drill-down (nothing in [QuestionBankViewModel.topics] carries
 * subtopics yet, since Milestone 1 ships no Library; see
 * `QBankScope.chooserTopics`). [ChooserTopic.id] is turned into a scope key
 * with [QBankScope.topicKey] here, at the one place a raw id is ever put in
 * the scope set -- everywhere else in this screen only reads the keyed form.
 */
@Composable
fun TopicChooserScreen(viewModel: QuestionBankViewModel, onContinue: () -> Unit) {
    val topics by viewModel.topics.collectAsState()
    val scope by viewModel.scope.collectAsState()
    val availableCount by viewModel.availableCount.collectAsState()

    Column(modifier = Modifier.fillMaxSize().padding(24.dp)) {
        Text("Choose chapters", style = MaterialTheme.typography.headlineSmall)
        Text(
            if (scope.isEmpty()) "Every chapter · $availableCount questions" else "$availableCount questions selected",
            style = MaterialTheme.typography.bodyMedium,
        )

        LazyColumn(
            modifier = Modifier.weight(1f).padding(top = 12.dp),
            verticalArrangement = Arrangement.spacedBy(4.dp),
        ) {
            items(topics, key = ChooserTopic::id) { topic ->
                val key = QBankScope.topicKey(topic.id)
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    verticalAlignment = Alignment.CenterVertically,
                ) {
                    Checkbox(checked = key in scope, onCheckedChange = { viewModel.toggle(key) })
                    Text(topic.title)
                }
            }
        }

        Button(
            onClick = onContinue,
            enabled = availableCount > 0,
            modifier = Modifier.fillMaxWidth(),
        ) {
            Text("Continue")
        }
    }
}
