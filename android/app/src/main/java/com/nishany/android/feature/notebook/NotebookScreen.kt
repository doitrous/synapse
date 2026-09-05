package com.nishany.android.feature.notebook

import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.AlertDialog
import androidx.compose.material3.Card
import androidx.compose.material3.FloatingActionButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.semantics.contentDescription
import androidx.compose.ui.semantics.semantics
import androidx.compose.ui.unit.dp
import com.nishany.android.core.notebook.Note
import com.nishany.android.core.ui.StateHost
import com.nishany.android.core.ui.UiState
import com.nishany.android.design.LocalCortex

/**
 * The Notebook (parity item G7): a list of notes, a "+" FAB to write one, tap
 * to edit, swipe-free delete from the same dialog -- a much simpler surface
 * than `Notebook.tsx`'s split-pane rich-text editor, matching what
 * [com.nishany.android.core.notebook.Note] models (title + plain-text body).
 *
 * A single [Composable] holding its own `editing` step, the same shape
 * `PracticalRoute` uses for list-vs-reader, rather than a second pushed
 * destination this app's `NavHost` would have to know about.
 */
@Composable
fun NotebookScreen(viewModel: NotebookViewModel, onBack: () -> Unit) {
    val uiState by viewModel.uiState.collectAsState()
    val saveFailed by viewModel.saveFailed.collectAsState()
    var editing by rememberSaveable { mutableStateOf<String?>(null) }
    var creating by rememberSaveable { mutableStateOf(false) }
    val cortex = LocalCortex.current

    Box(modifier = Modifier.fillMaxSize()) {
        Column(modifier = Modifier.fillMaxSize().padding(24.dp)) {
            Row(modifier = Modifier.fillMaxWidth(), verticalAlignment = Alignment.CenterVertically) {
                Text("Notebook", style = MaterialTheme.typography.headlineSmall, modifier = Modifier.weight(1f))
                TextButton(onClick = onBack) { Text("Back") }
            }

            StateHost(state = uiState, modifier = Modifier.weight(1f).padding(top = 12.dp)) { notes ->
                LazyColumn(verticalArrangement = Arrangement.spacedBy(10.dp)) {
                    items(notes, key = { it.id }) { note ->
                        NoteRow(note = note, onClick = { editing = note.id })
                    }
                    item { Box(modifier = Modifier.height(72.dp)) }
                }
            }
        }

        FloatingActionButton(
            onClick = { creating = true },
            containerColor = cortex.primary,
            contentColor = cortex.onPrimary,
            modifier = Modifier
                .align(Alignment.BottomEnd)
                .padding(24.dp)
                .semantics { contentDescription = "New note" },
        ) {
            Text("+", style = MaterialTheme.typography.headlineSmall)
        }
    }

    if (creating) {
        NoteEditDialog(
            title = "",
            body = "",
            onDismiss = { creating = false },
            onSave = { title, body -> viewModel.createNote(title, body); creating = false },
        )
    }

    val editingId = editing
    val notesInHand = (uiState as? UiState.Content)?.data
    val currentlyEditing = if (editingId != null) notesInHand?.firstOrNull { it.id == editingId } else null
    if (currentlyEditing != null) {
        NoteEditDialog(
            title = currentlyEditing.title,
            body = currentlyEditing.body,
            onDismiss = { editing = null },
            onSave = { title, body -> viewModel.updateNote(currentlyEditing.id, title, body); editing = null },
            onDelete = { viewModel.deleteNote(currentlyEditing.id); editing = null },
        )
    }

    if (saveFailed) {
        AlertDialog(
            onDismissRequest = viewModel::acknowledgeSaveFailure,
            confirmButton = { TextButton(onClick = viewModel::acknowledgeSaveFailure) { Text("OK") } },
            title = { Text("Couldn't save") },
            text = { Text("That change to your notebook wasn't saved. Try again.") },
        )
    }
}

@Composable
private fun NoteRow(note: Note, onClick: () -> Unit) {
    val cortex = LocalCortex.current
    Card(
        modifier = Modifier
            .fillMaxWidth()
            .clip(RoundedCornerShape(14.dp))
            .clickable(onClick = onClick)
            .semantics { contentDescription = "Note: ${note.title.ifBlank { "Untitled" }}" },
    ) {
        Column(modifier = Modifier.padding(14.dp)) {
            Text(
                note.title.ifBlank { "Untitled" },
                style = MaterialTheme.typography.titleSmall,
                color = cortex.ink,
            )
            if (note.body.isNotBlank()) {
                Text(
                    note.body.take(140),
                    style = MaterialTheme.typography.bodySmall,
                    color = cortex.ink2,
                    maxLines = 2,
                    modifier = Modifier.padding(top = 4.dp),
                )
            }
        }
    }
}

/** Title + body, and a Delete button only when editing an existing note (`onDelete != null`). */
@Composable
private fun NoteEditDialog(
    title: String,
    body: String,
    onDismiss: () -> Unit,
    onSave: (String, String) -> Unit,
    onDelete: (() -> Unit)? = null,
) {
    var titleText by remember { mutableStateOf(title) }
    var bodyText by remember { mutableStateOf(body) }

    AlertDialog(
        onDismissRequest = onDismiss,
        title = { Text(if (onDelete == null) "New note" else "Edit note") },
        text = {
            Column(verticalArrangement = Arrangement.spacedBy(10.dp)) {
                OutlinedTextField(
                    value = titleText,
                    onValueChange = { titleText = it },
                    label = { Text("Title") },
                    singleLine = true,
                    modifier = Modifier.fillMaxWidth(),
                )
                OutlinedTextField(
                    value = bodyText,
                    onValueChange = { bodyText = it },
                    label = { Text("Note") },
                    modifier = Modifier.fillMaxWidth().height(160.dp),
                )
                if (onDelete != null) {
                    TextButton(
                        onClick = onDelete,
                        modifier = Modifier.semantics { contentDescription = "Delete note" },
                    ) { Text("Delete") }
                }
            }
        },
        confirmButton = {
            TextButton(
                onClick = { onSave(titleText, bodyText) },
                enabled = titleText.isNotBlank() || bodyText.isNotBlank(),
            ) { Text("Save") }
        },
        dismissButton = { TextButton(onClick = onDismiss) { Text("Cancel") } },
    )
}
