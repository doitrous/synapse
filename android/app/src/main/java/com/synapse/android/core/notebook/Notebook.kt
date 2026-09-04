package com.synapse.android.core.notebook

import kotlinx.serialization.Serializable

/**
 * The student's own notes: title, plain-text body, tags.
 *
 * A port of `Note` in `src/data/notebook.ts`, keeping only the fields this
 * app writes. The web interface also carries `editorJson` (a Tiptap
 * document), `plainText`, `legacyMarkdownSource`, `resourceRefs` and
 * `drawing` -- all optional, all left unmodelled here on purpose: the web's
 * own `ensureNotebookEditor` already upgrades a note that has only `body`
 * (no `editorJson`) into its rich-text shape on read, which is exactly the
 * legacy-note case this matches. [CortexJson]'s `ignoreUnknownKeys` would
 * silently drop those fields on a round trip -- but this app never edits a
 * note it did not itself create with this shape, so there is nothing of
 * theirs to lose. A note with a drawing or an attached document, edited on
 * Android, would lose those parts; there is no screen here that offers that
 * edit.
 */
@Serializable
data class Note(
    val id: String,
    val title: String,
    val body: String = "",
    val tags: List<String> = emptyList(),
    /** ISO timestamp of the last edit. */
    val updatedAt: String,
)

/** The whole document: a plain array, matching `usePersistentState<Note[]>('nishany.notebook.notes', …)`. */
const val NOTEBOOK_KEY = "nishany.notebook.notes"

/** Newest edit first -- matches `Notebook.tsx`'s own list ordering. */
fun sortNotes(notes: List<Note>): List<Note> = notes.sortedByDescending { it.updatedAt }

/** Appends a new note and returns its id alongside the updated list. */
fun addNote(notes: List<Note>, title: String, body: String, id: String, at: String): Pair<List<Note>, String> {
    val note = Note(id = id, title = title, body = body, updatedAt = at)
    return (notes + note) to id
}

/** Replaces [id]'s title/body, or no-ops if it is gone (deleted from another device mid-edit). */
fun editNote(notes: List<Note>, id: String, title: String, body: String, at: String): List<Note> =
    notes.map { if (it.id == id) it.copy(title = title, body = body, updatedAt = at) else it }

fun removeNote(notes: List<Note>, id: String): List<Note> = notes.filterNot { it.id == id }
