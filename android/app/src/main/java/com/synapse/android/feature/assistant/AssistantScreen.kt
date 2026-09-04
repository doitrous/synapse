package com.synapse.android.feature.assistant

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.lazy.rememberLazyListState
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.semantics.contentDescription
import androidx.compose.ui.semantics.semantics
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.synapse.android.core.ui.StateHost
import com.synapse.android.core.ui.UiState
import com.synapse.android.design.LocalCortex

/** Asked before the student has typed anything -- the same three iOS opens with, tap-to-send. */
private val SUGGESTIONS = listOf(
    "What should I study today?",
    "Explain preload and afterload",
    "Where is this covered in the library?",
)

/**
 * The study assistant screen (parity item G5): quota in the header, a
 * scrolling transcript, and a composer. Sits behind
 * [com.synapse.android.feature.root.AiConsentGate] already -- see this
 * screen's entry point in `RootScreen.kt` -- so no separate consent step
 * lives here; the disclaimer line under the composer is the permanent
 * qualifier iOS keeps beside every answer, not a one-time notice.
 */
@Composable
fun AssistantScreen(viewModel: AssistantViewModel, lang: String, onBack: () -> Unit) {
    val uiState by viewModel.uiState.collectAsState()
    val turns by viewModel.turns.collectAsState()
    val pending by viewModel.pending.collectAsState()
    val failureMessage by viewModel.failureMessage.collectAsState()
    val cortex = LocalCortex.current
    var draft by remember { mutableStateOf("") }

    Column(modifier = Modifier.fillMaxSize().padding(horizontal = 24.dp, vertical = 20.dp)) {
        Row(modifier = Modifier.fillMaxWidth(), verticalAlignment = Alignment.CenterVertically) {
            Column(modifier = Modifier.weight(1f)) {
                Text("Study assistant", style = MaterialTheme.typography.headlineSmall)
                (uiState as? UiState.Content)?.data?.let { status ->
                    Text(
                        "${status.remaining} / ${status.dailyMessages} left today · ${status.plan}",
                        style = MaterialTheme.typography.labelSmall,
                        color = cortex.ink3,
                    )
                }
            }
            if (turns.isNotEmpty()) {
                TextButton(onClick = { viewModel.reset(); draft = "" }) { Text("Start over") }
            }
            TextButton(onClick = onBack) { Text("Back") }
        }

        StateHost(state = uiState, modifier = Modifier.weight(1f).padding(top = 8.dp)) { status ->
            val isExhausted = status.remaining <= 0
            Column(modifier = Modifier.fillMaxSize()) {
                Transcript(
                    turns = turns,
                    pending = pending,
                    failureMessage = failureMessage,
                    isExhausted = isExhausted,
                    onSuggestion = { suggestion ->
                        if (!isExhausted) {
                            viewModel.clearFailure()
                            viewModel.send(suggestion, lang)
                        }
                    },
                    modifier = Modifier.weight(1f),
                )
                Composer(
                    draft = draft,
                    onDraftChange = { draft = it },
                    pending = pending,
                    isExhausted = isExhausted,
                    onSend = {
                        val text = draft
                        draft = ""
                        viewModel.clearFailure()
                        viewModel.send(text, lang)
                    },
                )
            }
        }
    }

    // A failed send hands the student's text back rather than dropping it.
    LaunchedEffect(failureMessage) {
        if (failureMessage != null) {
            val returned = viewModel.takeReturned()
            if (returned.isNotEmpty()) draft = returned
        }
    }
}

@Composable
private fun Transcript(
    turns: List<AssistantTurn>,
    pending: Boolean,
    failureMessage: String?,
    isExhausted: Boolean,
    onSuggestion: (String) -> Unit,
    modifier: Modifier = Modifier,
) {
    val cortex = LocalCortex.current
    val listState = rememberLazyListState()

    LaunchedEffect(turns.size, pending, failureMessage) {
        val lastIndex = turns.size - 1 + if (pending || failureMessage != null) 1 else 0
        if (lastIndex >= 0) listState.animateScrollToItem(lastIndex)
    }

    LazyColumn(state = listState, modifier = modifier.fillMaxWidth(), verticalArrangement = Arrangement.spacedBy(10.dp)) {
        if (turns.isEmpty()) {
            item {
                Column(verticalArrangement = Arrangement.spacedBy(10.dp)) {
                    Text(
                        "Ask about anything you're studying, or about how Nishany works.",
                        style = MaterialTheme.typography.bodyMedium,
                        color = cortex.ink2,
                    )
                    SUGGESTIONS.forEach { suggestion ->
                        Text(
                            suggestion,
                            style = MaterialTheme.typography.bodyMedium,
                            color = cortex.ink2,
                            modifier = Modifier
                                .fillMaxWidth()
                                .clip(RoundedCornerShape(12.dp))
                                .background(cortex.surface2)
                                .clickable(enabled = !isExhausted) { onSuggestion(suggestion) }
                                .padding(horizontal = 12.dp, vertical = 10.dp)
                                .semantics { contentDescription = suggestion },
                        )
                    }
                }
            }
        }
        items(turns, key = { it.id }) { turn -> Bubble(turn) }
        if (pending) {
            item {
                Text("Thinking…", style = MaterialTheme.typography.labelMedium, color = cortex.ink3)
            }
        }
        failureMessage?.let { message ->
            item {
                Text(
                    message,
                    style = MaterialTheme.typography.bodySmall,
                    color = cortex.ink,
                    modifier = Modifier
                        .fillMaxWidth()
                        .clip(RoundedCornerShape(12.dp))
                        .background(cortex.warningTint)
                        .border(1.dp, cortex.warning, RoundedCornerShape(12.dp))
                        .padding(10.dp),
                )
            }
        }
        item { Box(modifier = Modifier.size(8.dp)) }
    }
}

@Composable
private fun Bubble(turn: AssistantTurn) {
    val cortex = LocalCortex.current
    val mine = turn.role == "user"
    Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = if (mine) Arrangement.End else Arrangement.Start) {
        Text(
            turn.content,
            style = MaterialTheme.typography.bodyMedium,
            color = if (mine) cortex.onPrimary else cortex.ink,
            modifier = (
                if (mine) {
                    Modifier.background(cortex.primary, RoundedCornerShape(16.dp))
                } else {
                    Modifier
                        .background(cortex.surface, RoundedCornerShape(16.dp))
                        .border(1.dp, cortex.line, RoundedCornerShape(16.dp))
                }
                ).padding(horizontal = 12.dp, vertical = 9.dp),
        )
    }
}

@Composable
private fun Composer(
    draft: String,
    onDraftChange: (String) -> Unit,
    pending: Boolean,
    isExhausted: Boolean,
    onSend: () -> Unit,
) {
    val cortex = LocalCortex.current
    val canSend = draft.isNotBlank() && !pending && !isExhausted

    Column(modifier = Modifier.fillMaxWidth().padding(top = 10.dp)) {
        Row(verticalAlignment = Alignment.Bottom, horizontalArrangement = Arrangement.spacedBy(8.dp)) {
            OutlinedTextField(
                value = draft,
                onValueChange = onDraftChange,
                enabled = !isExhausted,
                placeholder = { Text(if (isExhausted) "No messages left today" else "Ask a question") },
                modifier = Modifier
                    .weight(1f)
                    .semantics { contentDescription = "Message" },
            )
            Box(
                modifier = Modifier
                    .size(48.dp)
                    .clip(CircleShape)
                    .background(if (canSend) cortex.primary else cortex.line)
                    .clickable(enabled = canSend, onClick = onSend)
                    .semantics { contentDescription = "Send" },
                contentAlignment = Alignment.Center,
            ) {
                Text("↑", color = cortex.onPrimary, fontSize = 18.sp)
            }
        }
        Text(
            "A study tool, not clinical guidance. Never use it for a decision about a patient.",
            style = MaterialTheme.typography.labelSmall,
            color = cortex.ink3,
            modifier = Modifier.padding(top = 6.dp),
        )
    }
}
