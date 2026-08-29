package com.synapse.app.feature.qbank

import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material3.Checkbox
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.material3.TriStateCheckbox
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.state.ToggleableState
import androidx.compose.ui.unit.dp
import com.synapse.app.core.qbank.QBankScope
import com.synapse.app.core.qbank.TopicNode

fun topicRowTag(topicId: String): String = "qbank_topic_row_$topicId"
fun subtopicRowTag(topicId: String, subtopicId: String): String = "qbank_subtopic_row_${topicId}_$subtopicId"

/**
 * A tri-state topic→subtopic tree over [QBankScope]: a topic checkbox shows
 * On/Off/Indeterminate (indeterminate when some, but not all, of its
 * subtopics are picked individually), and each subtopic checkbox shows
 * selected whenever either it or its whole parent topic is selected.
 * Tapping either level defers to [QBankScope.toggleTopic] /
 * [QBankScope.toggleSubtopic] for the actual scope-set arithmetic.
 */
@Composable
fun ScopeChooser(
    topics: List<TopicNode>,
    scope: Set<String>,
    onToggleTopic: (String) -> Unit,
    onToggleSubtopic: (String, String) -> Unit,
    modifier: Modifier = Modifier,
) {
    LazyColumn(modifier = modifier) {
        items(topics, key = { it.id }) { topic ->
            TopicRow(topic, scope, onToggleTopic, onToggleSubtopic)
        }
    }
}

@Composable
private fun TopicRow(
    topic: TopicNode,
    scope: Set<String>,
    onToggleTopic: (String) -> Unit,
    onToggleSubtopic: (String, String) -> Unit,
) {
    val topicKey = QBankScope.topicKey(topic.id)
    val topicSelected = topicKey in scope
    val anySubtopicSelected = topic.subtopicIds.any { QBankScope.subtopicKey(topic.id, it) in scope }
    val state = when {
        topicSelected -> ToggleableState.On
        anySubtopicSelected -> ToggleableState.Indeterminate
        else -> ToggleableState.Off
    }

    Column {
        androidx.compose.foundation.layout.Row(
            modifier = Modifier
                .fillMaxWidth()
                .testTag(topicRowTag(topic.id))
                .clickable { onToggleTopic(topic.id) },
            verticalAlignment = Alignment.CenterVertically,
        ) {
            TriStateCheckbox(state = state, onClick = { onToggleTopic(topic.id) })
            Text(
                text = topic.topic,
                style = MaterialTheme.typography.bodyLarge,
                modifier = Modifier.weight(1f).padding(vertical = 8.dp),
            )
            Text(
                text = "${topic.questions.size}",
                style = MaterialTheme.typography.bodyMedium,
                modifier = Modifier.padding(end = 16.dp),
            )
        }

        if (topic.subtopicIds.isNotEmpty()) {
            Column(modifier = Modifier.padding(start = 32.dp)) {
                topic.subtopicIds.forEach { subtopicId ->
                    val subtopicKey = QBankScope.subtopicKey(topic.id, subtopicId)
                    val subtopicSelected = topicSelected || subtopicKey in scope
                    androidx.compose.foundation.layout.Row(
                        modifier = Modifier
                            .fillMaxWidth()
                            .testTag(subtopicRowTag(topic.id, subtopicId))
                            .clickable { onToggleSubtopic(topic.id, subtopicId) },
                        verticalAlignment = Alignment.CenterVertically,
                    ) {
                        Checkbox(
                            checked = subtopicSelected,
                            onCheckedChange = { onToggleSubtopic(topic.id, subtopicId) },
                        )
                        Text(
                            text = subtopicId,
                            style = MaterialTheme.typography.bodyMedium,
                            modifier = Modifier.weight(1f).padding(vertical = 4.dp),
                        )
                    }
                }
            }
        }
    }
}
