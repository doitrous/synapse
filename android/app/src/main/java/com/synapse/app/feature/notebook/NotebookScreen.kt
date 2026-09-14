package com.synapse.app.feature.notebook

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowBack
import androidx.compose.material.icons.filled.Add
import androidx.compose.material.icons.filled.Close
import androidx.compose.material.icons.filled.Delete
import androidx.compose.material3.AssistChip
import androidx.compose.material3.Button
import androidx.compose.material3.FilterChip
import androidx.compose.material3.HorizontalDivider
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.unit.dp
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import com.synapse.app.core.notebook.Note
import com.synapse.app.core.notebook.NoteBlock
import com.synapse.app.core.notebook.NoteBlockType
import com.synapse.app.core.notebook.notePlainText
import com.synapse.app.core.notebook.toNoteBlocks

const val NOTEBOOK_LOADING_TAG = "notebook_loading"
const val NOTEBOOK_NEW_NOTE_BUTTON_TAG = "notebook_new_note_button"
const val NOTEBOOK_SEARCH_FIELD_TAG = "notebook_search_field"
fun notebookRowTag(noteId: String): String = "notebook_row_$noteId"
const val NOTEBOOK_BACK_BUTTON_TAG = "notebook_back_button"
const val NOTEBOOK_DELETE_BUTTON_TAG = "notebook_delete_button"
const val NOTEBOOK_TITLE_FIELD_TAG = "notebook_title_field"
const val NOTEBOOK_ADD_BLOCK_BUTTON_TAG = "notebook_add_block_button"
const val NOTEBOOK_ADD_TAG_FIELD_TAG = "notebook_add_tag_field"
const val NOTEBOOK_ADD_TAG_BUTTON_TAG = "notebook_add_tag_button"

/**
 * The Notebook tab's single public entry point. The shell mounts this
 * directly and it constructs its own [NotebookViewModel] via [hiltViewModel] —
 * no navigation wiring required of the caller. Mirrors `LibraryRoute()`.
 */
@Composable
fun NotebookRoute(viewModel: NotebookViewModel = hiltViewModel()) {
    val uiState by viewModel.uiState.collectAsStateWithLifecycle()
    NotebookScreen(
        uiState = uiState,
        onSelectNote = viewModel::selectNote,
        onNewNote = viewModel::newNote,
        onDeleteNote = viewModel::deleteNote,
        onUpdateTitle = viewModel::updateTitle,
        onUpdateBlocks = viewModel::updateBlocks,
        onAddTag = viewModel::addTag,
        onRemoveTag = viewModel::removeTag,
    )
}

@Composable
private fun NotebookScreen(
    uiState: NotebookUiState,
    onSelectNote: (String?) -> Unit,
    onNewNote: () -> Unit,
    onDeleteNote: (String) -> Unit,
    onUpdateTitle: (String, String) -> Unit,
    onUpdateBlocks: (String, List<NoteBlock>) -> Unit,
    onAddTag: (String, String) -> Unit,
    onRemoveTag: (String, String) -> Unit,
) {
    if (uiState !is NotebookUiState.Content) {
        Column(
            modifier = Modifier.fillMaxSize().testTag(NOTEBOOK_LOADING_TAG),
            horizontalAlignment = Alignment.CenterHorizontally,
            verticalArrangement = Arrangement.Center,
        ) { Text("Loading…") }
        return
    }

    val selected = uiState.notes.firstOrNull { it.id == uiState.selectedId }
    if (selected == null) {
        NotesListPane(notes = uiState.notes, onSelectNote = onSelectNote, onNewNote = onNewNote)
    } else {
        NoteEditorPane(
            note = selected,
            onBack = { onSelectNote(null) },
            onDelete = { onDeleteNote(selected.id); onSelectNote(null) },
            onTitleChange = { onUpdateTitle(selected.id, it) },
            onBlocksChange = { onUpdateBlocks(selected.id, it) },
            onAddTag = { onAddTag(selected.id, it) },
            onRemoveTag = { onRemoveTag(selected.id, it) },
        )
    }
}

@Composable
private fun NotesListPane(notes: List<Note>, onSelectNote: (String) -> Unit, onNewNote: () -> Unit) {
    var query by rememberSaveable { mutableStateOf("") }
    val needle = query.trim().lowercase()
    val filtered = notes.filter { note ->
        needle.isEmpty() ||
            note.title.lowercase().contains(needle) ||
            notePlainText(note.plainText, note.editorJson).lowercase().contains(needle) ||
            note.tags.any { it.lowercase().contains(needle) }
    }

    Column(modifier = Modifier.fillMaxSize().padding(16.dp)) {
        Row(verticalAlignment = Alignment.CenterVertically, modifier = Modifier.fillMaxWidth()) {
            Text("Notebook", style = MaterialTheme.typography.titleLarge, modifier = Modifier.weight(1f))
            Button(onClick = onNewNote, modifier = Modifier.testTag(NOTEBOOK_NEW_NOTE_BUTTON_TAG)) {
                Icon(Icons.Filled.Add, contentDescription = null, modifier = Modifier.size(18.dp))
                Text(" New note")
            }
        }

        OutlinedTextField(
            value = query,
            onValueChange = { query = it },
            label = { Text("Search notes…") },
            singleLine = true,
            modifier = Modifier.fillMaxWidth().padding(top = 12.dp).testTag(NOTEBOOK_SEARCH_FIELD_TAG),
        )

        if (notes.isEmpty()) {
            Text(
                "No notes yet. Start one with New note.",
                style = MaterialTheme.typography.bodyMedium,
                modifier = Modifier.padding(top = 24.dp),
            )
        } else if (filtered.isEmpty()) {
            Text(
                "No note matches that search.",
                style = MaterialTheme.typography.bodyMedium,
                modifier = Modifier.padding(top = 24.dp),
            )
        } else {
            Column(modifier = Modifier.fillMaxSize().verticalScroll(rememberScrollState()).padding(top = 8.dp)) {
                filtered.forEach { note ->
                    NoteRow(note = note, onClick = { onSelectNote(note.id) })
                    HorizontalDivider()
                }
            }
        }
    }
}

@Composable
private fun NoteRow(note: Note, onClick: () -> Unit) {
    Surface(onClick = onClick, modifier = Modifier.fillMaxWidth().testTag(notebookRowTag(note.id))) {
        Column(modifier = Modifier.fillMaxWidth().padding(vertical = 10.dp)) {
            Text(
                note.title.ifBlank { "Untitled note" },
                style = MaterialTheme.typography.bodyLarge,
            )
            val snippet = notePlainText(note.plainText, note.editorJson).lineSequence().firstOrNull { it.isNotBlank() }
            Text(
                snippet ?: "No content yet",
                style = MaterialTheme.typography.bodySmall,
                maxLines = 1,
                modifier = Modifier.padding(top = 2.dp),
            )
            if (note.tags.isNotEmpty()) {
                Text(
                    note.tags.joinToString(" · "),
                    style = MaterialTheme.typography.labelSmall,
                    modifier = Modifier.padding(top = 4.dp),
                )
            }
        }
    }
}

/**
 * The note editor: title, tags, the native block editor, and (read-only, for
 * now) the article/document context the note carries. Editing the article
 * link, attaching resource references, and pasting images are web-only today
 * — see this file's class doc and `Note`'s field comments; nothing here
 * fabricates a value for them, the fields are simply not yet writable from
 * Android, and any value another client wrote is still shown so it is never
 * lost from view.
 */
@Composable
private fun NoteEditorPane(
    note: Note,
    onBack: () -> Unit,
    onDelete: () -> Unit,
    onTitleChange: (String) -> Unit,
    onBlocksChange: (List<NoteBlock>) -> Unit,
    onAddTag: (String) -> Unit,
    onRemoveTag: (String) -> Unit,
) {
    var newTag by rememberSaveable { mutableStateOf("") }
    // Keyed by note id so switching notes rebuilds the block list from that note's
    // own editorJson instead of carrying over the previous note's in-memory blocks.
    val blocks = remember(note.id, note.editorJson) { note.editorJson.toNoteBlocks() }

    Column(modifier = Modifier.fillMaxSize().padding(16.dp).verticalScroll(rememberScrollState())) {
        Row(verticalAlignment = Alignment.CenterVertically, horizontalArrangement = Arrangement.spacedBy(8.dp)) {
            IconButton(onClick = onBack, modifier = Modifier.testTag(NOTEBOOK_BACK_BUTTON_TAG)) {
                Icon(Icons.AutoMirrored.Filled.ArrowBack, contentDescription = "Back")
            }
            Text("Editing", style = MaterialTheme.typography.titleLarge, modifier = Modifier.weight(1f))
            IconButton(onClick = onDelete, modifier = Modifier.testTag(NOTEBOOK_DELETE_BUTTON_TAG)) {
                Icon(Icons.Filled.Delete, contentDescription = "Delete note")
            }
        }

        OutlinedTextField(
            value = note.title,
            onValueChange = onTitleChange,
            label = { Text("Note title") },
            singleLine = true,
            modifier = Modifier.fillMaxWidth().padding(top = 12.dp).testTag(NOTEBOOK_TITLE_FIELD_TAG),
        )

        TagEditor(
            tags = note.tags,
            newTag = newTag,
            onNewTagChange = { newTag = it },
            onAddTag = { onAddTag(newTag); newTag = "" },
            onRemoveTag = onRemoveTag,
        )

        Text("Body", style = MaterialTheme.typography.titleMedium, modifier = Modifier.padding(top = 20.dp))
        BlockEditor(blocks = blocks, onBlocksChange = onBlocksChange)

        NoteContext(note)
    }
}

@Composable
private fun TagEditor(
    tags: List<String>,
    newTag: String,
    onNewTagChange: (String) -> Unit,
    onAddTag: () -> Unit,
    onRemoveTag: (String) -> Unit,
) {
    Column(modifier = Modifier.padding(top = 16.dp)) {
        Text("Tags", style = MaterialTheme.typography.titleMedium)
        Row(modifier = Modifier.fillMaxWidth().padding(top = 6.dp), horizontalArrangement = Arrangement.spacedBy(6.dp)) {
            tags.forEach { tag ->
                AssistChip(
                    onClick = { onRemoveTag(tag) },
                    label = { Text(tag) },
                    trailingIcon = { Icon(Icons.Filled.Close, contentDescription = "Remove tag", modifier = Modifier.size(16.dp)) },
                )
            }
        }
        Row(modifier = Modifier.fillMaxWidth().padding(top = 8.dp), verticalAlignment = Alignment.CenterVertically) {
            OutlinedTextField(
                value = newTag,
                onValueChange = onNewTagChange,
                label = { Text("Add a tag") },
                singleLine = true,
                modifier = Modifier.weight(1f).testTag(NOTEBOOK_ADD_TAG_FIELD_TAG),
            )
            TextButton(onClick = onAddTag, enabled = newTag.isNotBlank(), modifier = Modifier.testTag(NOTEBOOK_ADD_TAG_BUTTON_TAG)) {
                Text("Add")
            }
        }
    }
}

private val blockTypeLabels: List<Pair<String, NoteBlockType>> = listOf(
    "¶" to NoteBlockType.Paragraph,
    "H1" to NoteBlockType.Heading(1),
    "H2" to NoteBlockType.Heading(2),
    "•" to NoteBlockType.BulletItem,
    "1." to NoteBlockType.NumberItem,
)

/**
 * The native block editor: one row per block, a compact type selector, and a
 * multi-line text field for that block's own text — paragraphs, two heading
 * levels and bulleted/numbered lists, per this task's brief. No span-level
 * bold/italic yet (see `NotebookBlocks.kt`'s class doc); a block's text is
 * always one flat run.
 */
@Composable
private fun BlockEditor(blocks: List<NoteBlock>, onBlocksChange: (List<NoteBlock>) -> Unit) {
    Column(modifier = Modifier.fillMaxWidth().padding(top = 8.dp)) {
        blocks.forEachIndexed { index, block ->
            Row(verticalAlignment = Alignment.Top, modifier = Modifier.fillMaxWidth().padding(vertical = 4.dp)) {
                Row(horizontalArrangement = Arrangement.spacedBy(2.dp)) {
                    blockTypeLabels.forEach { (label, type) ->
                        FilterChip(
                            selected = block.type == type,
                            onClick = { onBlocksChange(blocks.toMutableList().also { it[index] = block.copy(type = type) }) },
                            label = { Text(label) },
                        )
                    }
                }
                OutlinedTextField(
                    value = block.text,
                    onValueChange = { text -> onBlocksChange(blocks.toMutableList().also { it[index] = block.copy(text = text) }) },
                    modifier = Modifier.weight(1f).padding(start = 8.dp),
                )
                IconButton(
                    onClick = { onBlocksChange(blocks.filterIndexed { i, _ -> i != index }.ifEmpty { listOf(NoteBlock(block.id, NoteBlockType.Paragraph, "")) }) },
                ) { Icon(Icons.Filled.Close, contentDescription = "Remove block") }
            }
        }

        TextButton(
            onClick = { onBlocksChange(blocks + NoteBlock(java.util.UUID.randomUUID().toString(), NoteBlockType.Paragraph, "")) },
            modifier = Modifier.testTag(NOTEBOOK_ADD_BLOCK_BUTTON_TAG),
        ) {
            Icon(Icons.Filled.Add, contentDescription = null, modifier = Modifier.size(18.dp))
            Text(" Add block")
        }
    }
}

@Composable
private fun NoteContext(note: Note) {
    val refs = note.resourceRefs.orEmpty()
    val subtopicTitle = note.subtopicTitle
    if (subtopicTitle.isNullOrBlank() && refs.isEmpty()) return

    Column(modifier = Modifier.fillMaxWidth().padding(top = 20.dp)) {
        Text("About", style = MaterialTheme.typography.labelLarge)
        if (!subtopicTitle.isNullOrBlank()) {
            Text(subtopicTitle, style = MaterialTheme.typography.bodyMedium, modifier = Modifier.padding(top = 4.dp))
        }
        refs.forEach { ref ->
            val label = ref.page?.let { "${ref.label} · p.$it" } ?: ref.label
            Text(label, style = MaterialTheme.typography.bodyMedium, modifier = Modifier.padding(top = 4.dp))
        }
    }
}
