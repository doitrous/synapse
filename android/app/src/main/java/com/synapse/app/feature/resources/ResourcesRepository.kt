package com.synapse.app.feature.resources

import com.synapse.app.core.cache.LocalStore
import com.synapse.app.core.media.ResourceFileCache
import com.synapse.app.core.model.StateDoc
import com.synapse.app.core.resources.MedicalResource
import com.synapse.app.core.resources.ResourceFileProjection
import com.synapse.app.core.resources.ResourceProjection
import com.synapse.app.core.sync.SyncEngine
import kotlinx.coroutines.sync.Mutex
import kotlinx.coroutines.sync.withLock
import kotlinx.serialization.builtins.ListSerializer
import kotlinx.serialization.builtins.serializer
import kotlinx.serialization.json.Json
import java.io.File
import java.time.Instant
import javax.inject.Inject

/** The shared, admin-authored ledger every student resource catalogue is projected from — same source Library projects articles from. */
private const val CONTENT_LEDGER_KEY = "synapse-admin-content-ledger-v4"

/** The shared, published register of which catalogued resources actually have a document behind them. */
private const val EVIDENCE_KEY = "synapse-medical-evidence-published-v1"

/** Resource id -> saved, matching the web/iOS key exactly (`SAVED_RESOURCES_STORAGE_KEY` / `ResourceModel.bookmarksKey`). */
private const val BOOKMARKS_KEY = "synapse.bookmarks.resources.v1"

/**
 * The Resources data layer: projects the shared content ledger + evidence
 * registry into student-facing resources ([resources]), reads/writes the
 * student's own saved list ([bookmarks]/[toggleBookmark]) over the durable
 * user-state store, and downloads/caches a resource's document for the
 * native reader ([ensureDownloaded]).
 *
 * Keys are defined locally rather than imported from `feature.library` —
 * same reasoning `LibraryRepository`'s doc comment gives: decoupled features
 * that happen to share a storage mechanism, not a namespace.
 *
 * **Deliberately not built here: `synapse.resources.recentlyOpened`-style
 * history and the reader's own annotation store.** See `core/resources/Resource.kt`'s
 * doc comment for the annotation deferral; a "recently opened" record is a
 * nice-to-have the web/iOS keep as a bonus on top of the reader, not part of
 * catalogue + filters + bookmark + open/download this task scoped as the MVP.
 */
class ResourcesRepository @Inject constructor(
    private val localStore: LocalStore,
    private val syncEngine: SyncEngine,
    private val fileCache: ResourceFileCache,
    private val json: Json,
) {

    /** Serializes [toggleBookmark] so two concurrent writes can't clobber each other. */
    private val writeMutex = Mutex()

    private val bookmarksSerializer = ListSerializer(String.serializer())

    /** Published resources off the shared content ledger, with [MedicalResource.hasFile] resolved from the evidence registry. Empty if absent/unparseable. */
    suspend fun resources(): List<MedicalResource> {
        val entries = ResourceProjection.project(ledgerJsonOrEmpty())
        val files = ResourceFileProjection.project(evidenceJsonOrEmpty())
        return entries.map { entry ->
            val file = files[entry.id]
            MedicalResource(
                id = entry.id,
                title = entry.title,
                type = entry.type,
                subjectId = entry.subjectId,
                source = entry.source,
                meta = entry.meta,
                year = entry.year,
                chapters = entry.chapters,
                universityIds = entry.universityIds,
                yearIds = entry.yearIds,
                hasFile = file != null,
                mediaType = file?.mediaType,
                sourceUri = file?.sourceUri,
                pageCount = file?.pageCount,
            )
        }
    }

    /** This student's saved resource ids. */
    suspend fun bookmarks(): Set<String> {
        val stored = localStore.getUserState(BOOKMARKS_KEY) ?: return emptySet()
        return runCatching { json.decodeFromString(bookmarksSerializer, stored) }.getOrDefault(emptyList()).toSet()
    }

    /** Toggle whether [resourceId] is saved, matching web `toggleSaved`/iOS `toggleBookmark`. */
    suspend fun toggleBookmark(resourceId: String, now: Instant) {
        writeMutex.withLock {
            val current = bookmarks()
            val next = if (resourceId in current) current - resourceId else current + resourceId
            syncEngine.write(BOOKMARKS_KEY, json.encodeToString(bookmarksSerializer, next.sorted()), now)
        }
    }

    fun isDownloaded(resourceId: String): Boolean = fileCache.isCached(resourceId)

    /**
     * Downloads (if not already cached) and returns the on-device file for
     * [resourceId]. `CancellationException` and any other failure from the
     * underlying download propagate to the caller — this is a suspend I/O
     * call, not a fire-and-forget one, so the reader UI decides how to show
     * the failure rather than this layer swallowing it.
     */
    suspend fun ensureDownloaded(resourceId: String): File = fileCache.ensure(resourceId)

    /** Drop the on-device copy of [resourceId]'s document, if any. */
    fun removeDownload(resourceId: String) = fileCache.remove(resourceId)

    /** The ledger's raw `value` JSON, stringified for [ResourceProjection]. */
    private suspend fun ledgerJsonOrEmpty(): String {
        val stored = localStore.getCatalogue(CONTENT_LEDGER_KEY) ?: return "[]"
        return runCatching {
            val doc = json.decodeFromString(StateDoc.serializer(), stored)
            doc.value.toString()
        }.getOrDefault("[]")
    }

    /** The evidence registry's raw `value` JSON, stringified for [ResourceFileProjection]. */
    private suspend fun evidenceJsonOrEmpty(): String {
        val stored = localStore.getCatalogue(EVIDENCE_KEY) ?: return "{}"
        return runCatching {
            val doc = json.decodeFromString(StateDoc.serializer(), stored)
            doc.value.toString()
        }.getOrDefault("{}")
    }
}
