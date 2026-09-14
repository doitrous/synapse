package com.synapse.app.feature.library

import com.synapse.app.core.cache.LocalStore
import com.synapse.app.core.library.LibraryArticle
import com.synapse.app.core.library.LibraryProjection
import com.synapse.app.core.library.LibraryTreeNode
import com.synapse.app.core.library.LibraryTreeProjection
import com.synapse.app.core.model.StateDoc
import com.synapse.app.core.sync.SyncEngine
import kotlinx.coroutines.sync.Mutex
import kotlinx.coroutines.sync.withLock
import kotlinx.serialization.builtins.ListSerializer
import kotlinx.serialization.builtins.MapSerializer
import kotlinx.serialization.builtins.serializer
import kotlinx.serialization.json.Json
import java.time.Instant
import javax.inject.Inject

/** The shared, admin-authored ledger every student article catalogue is projected from. */
private const val CONTENT_LEDGER_KEY = "synapse-admin-content-ledger-v4"

/** The admin-authored module/year filing trees a student browses articles through. */
private const val TREES_KEY = "synapse-library-trees-v1"

/** Article id -> read, matching the web/iOS key (undotted-after-`read`, no `.v1` — see `UserLibrary.readKey`). */
private const val READ_KEY = "synapse.library.read"

/** Article id -> this student's own tags on it, matching `PERSONAL_TAGS_KEY` on web. */
private const val PERSONAL_TAGS_KEY = "synapse.library.personalTags"

/**
 * The Library data layer: projects the shared content ledger into student-facing
 * articles ([articles]) and the shared trees catalogue into browse structure
 * ([trees]), and reads/writes the student's own read-state ([readState]) and
 * personal tags ([personalTags]) over the durable user-state store.
 *
 * Keys are defined locally rather than imported from `feature.qbank`/
 * `feature.flashcards` — same reasoning `FlashcardsRepository`'s doc comment
 * gives: these are decoupled features that happen to share a storage
 * mechanism, not a namespace.
 *
 * **Deliberately not built here: `synapse.library.marks.v1` (highlights and
 * sticky notes) and `synapse.library.userArticles` (student-authored
 * articles).** See `core/library/Library.kt`'s doc comment for why marks are
 * deferred; student-authored articles are a separate authoring surface this
 * task's brief scoped out (taxonomy browse + reader + mark-as-read first).
 */
class LibraryRepository @Inject constructor(
    private val localStore: LocalStore,
    private val syncEngine: SyncEngine,
    private val json: Json,
) {

    /** Serializes [setRead]/[addTag]/[removeTag] so two concurrent writes can't clobber each other. */
    private val writeMutex = Mutex()

    private val readStateSerializer = MapSerializer(String.serializer(), Boolean.serializer())
    private val tagsSerializer = MapSerializer(String.serializer(), ListSerializer(String.serializer()))

    /** Published articles off the shared content ledger. Empty if absent/unparseable. */
    suspend fun articles(): List<LibraryArticle> =
        LibraryProjection.project(ledgerJsonOrEmpty())

    /** The filing trees a student browses articles through, keyed by scope (`module:<id>` / `year:<id>`). Empty if absent/unparseable. */
    suspend fun trees(): Map<String, List<LibraryTreeNode>> =
        LibraryTreeProjection.project(treesJsonOrEmpty())

    /** Article id -> read. A map rather than a list because that is what the other clients write. */
    suspend fun readState(): Map<String, Boolean> {
        val stored = localStore.getUserState(READ_KEY) ?: return emptyMap()
        return runCatching { json.decodeFromString(readStateSerializer, stored) }.getOrDefault(emptyMap())
    }

    /** Article id -> this student's own tags on it. */
    suspend fun personalTags(): Map<String, List<String>> {
        val stored = localStore.getUserState(PERSONAL_TAGS_KEY) ?: return emptyMap()
        return runCatching { json.decodeFromString(tagsSerializer, stored) }.getOrDefault(emptyMap())
    }

    /**
     * Toggle whether [articleId] is marked read. A `false` entry is removed
     * rather than stored — the map is a set of what has been read, matching
     * iOS `UserLibrary.toggleRead` — so re-toggling twice restores the exact
     * document a plain add/remove would.
     */
    suspend fun toggleRead(articleId: String, now: Instant) {
        writeMutex.withLock {
            val current = readState()
            val next = if (current[articleId] == true) current - articleId else current + (articleId to true)
            syncEngine.write(READ_KEY, json.encodeToString(readStateSerializer, next), now)
        }
    }

    /** Add a personal tag to [articleId]. Matched case-insensitively against existing tags; a no-op if blank or already present. */
    suspend fun addTag(articleId: String, tag: String, now: Instant) {
        val trimmed = tag.trim()
        if (trimmed.isEmpty()) return
        writeMutex.withLock {
            val current = personalTags()
            val existing = current[articleId].orEmpty()
            if (existing.any { it.equals(trimmed, ignoreCase = true) }) return@withLock
            val next = current + (articleId to existing + trimmed)
            syncEngine.write(PERSONAL_TAGS_KEY, json.encodeToString(tagsSerializer, next), now)
        }
    }

    /** Remove a personal tag from [articleId]. The article's own entry is dropped entirely once its last tag goes. */
    suspend fun removeTag(articleId: String, tag: String, now: Instant) {
        writeMutex.withLock {
            val current = personalTags()
            val remaining = current[articleId].orEmpty().filterNot { it == tag }
            val next = if (remaining.isEmpty()) current - articleId else current + (articleId to remaining)
            syncEngine.write(PERSONAL_TAGS_KEY, json.encodeToString(tagsSerializer, next), now)
        }
    }

    /** The ledger's raw `value` JSON, stringified for [LibraryProjection]. */
    private suspend fun ledgerJsonOrEmpty(): String {
        val stored = localStore.getCatalogue(CONTENT_LEDGER_KEY) ?: return "[]"
        return runCatching {
            val doc = json.decodeFromString(StateDoc.serializer(), stored)
            doc.value.toString()
        }.getOrDefault("[]")
    }

    /** The trees catalogue's raw `value` JSON, stringified for [LibraryTreeProjection]. */
    private suspend fun treesJsonOrEmpty(): String {
        val stored = localStore.getCatalogue(TREES_KEY) ?: return "{}"
        return runCatching {
            val doc = json.decodeFromString(StateDoc.serializer(), stored)
            doc.value.toString()
        }.getOrDefault("{}")
    }
}
