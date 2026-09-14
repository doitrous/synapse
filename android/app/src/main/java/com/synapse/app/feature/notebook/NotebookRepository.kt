package com.synapse.app.feature.notebook

import com.synapse.app.core.cache.LocalStore
import com.synapse.app.core.notebook.Note
import com.synapse.app.core.sync.SyncEngine
import kotlinx.coroutines.sync.Mutex
import kotlinx.coroutines.sync.withLock
import kotlinx.serialization.builtins.ListSerializer
import kotlinx.serialization.json.Json
import kotlinx.serialization.json.JsonArray
import java.time.Instant
import javax.inject.Inject

/** The student's own notes, matching web's `synapse.notebook.notes` and iOS's `Note.storageKey`. One array, rewritten whole — see `Note`'s doc comment. */
private const val NOTES_KEY = "synapse.notebook.notes"

/**
 * The Notebook data layer: reads/writes the student's own notes over the
 * durable user-state store. There is no shared/admin ledger to project here —
 * unlike Library/Essays, a notebook has no admin-authored content, only what
 * the student themselves wrote.
 *
 * Mirrors `com.synapse.app.feature.essays.EssaysRepository`'s shape: keys
 * defined locally, a real [SyncEngine] write-through, and a [Mutex]
 * serializing concurrent writes to the same document.
 */
class NotebookRepository @Inject constructor(
    private val localStore: LocalStore,
    private val syncEngine: SyncEngine,
    private val json: Json,
) {

    private val writeMutex = Mutex()
    private val notesSerializer = ListSerializer(Note.serializer())

    /**
     * Every note, in whatever order is stored. Tolerant decode: one malformed
     * entry is skipped rather than failing the whole list, matching
     * `EssayProjection`'s `decodeItems` — a single corrupt note must not hide
     * every other one.
     */
    suspend fun notes(): List<Note> {
        val stored = localStore.getUserState(NOTES_KEY) ?: return emptyList()
        val array = runCatching { json.parseToJsonElement(stored) as? JsonArray }.getOrNull() ?: return emptyList()
        return array.mapNotNull { element -> runCatching { json.decodeFromJsonElement(Note.serializer(), element) }.getOrNull() }
    }

    /**
     * Upsert one note by id and persist the whole array, newest-edited first —
     * matching iOS `NotebookModel.save` (insert-or-replace, then sort by
     * `updatedAt` descending).
     */
    suspend fun save(note: Note, now: Instant) {
        writeMutex.withLock {
            val updated = note.copy(updatedAt = now.toString())
            val next = (notes().filterNot { it.id == note.id } + updated).sortedByDescending { it.updatedAt }
            syncEngine.write(NOTES_KEY, json.encodeToString(notesSerializer, next), now)
        }
    }

    suspend fun delete(id: String, now: Instant) {
        writeMutex.withLock {
            val next = notes().filterNot { it.id == id }
            syncEngine.write(NOTES_KEY, json.encodeToString(notesSerializer, next), now)
        }
    }
}
