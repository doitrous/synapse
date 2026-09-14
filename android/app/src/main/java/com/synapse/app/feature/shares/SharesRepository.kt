package com.synapse.app.feature.shares

import com.synapse.app.core.api.ChunkUploadResponse
import com.synapse.app.core.api.CompleteUploadBody
import com.synapse.app.core.api.CreateMyDocumentBody
import com.synapse.app.core.api.CreateShareBody
import com.synapse.app.core.api.MyDocument
import com.synapse.app.core.api.MyDocumentsResponse
import com.synapse.app.core.api.SharesApi
import com.synapse.app.core.api.ShareDetail
import com.synapse.app.core.api.ShareSummary
import com.synapse.app.core.api.UpdateShareBody
import com.synapse.app.core.cache.LocalStore
import com.synapse.app.core.notebook.Note
import com.synapse.app.core.shares.SHARE_INDEX_KEY
import com.synapse.app.core.shares.ShareKind
import com.synapse.app.core.shares.boardPayload
import com.synapse.app.core.shares.boardShareHandle
import com.synapse.app.core.shares.notePayload
import com.synapse.app.core.shares.noteShareHandle
import com.synapse.app.core.sync.SyncEngine
import com.synapse.app.core.whiteboard.WhiteboardDocument
import com.synapse.app.feature.notebook.NotebookRepository
import com.synapse.app.feature.whiteboard.WhiteboardRepository
import kotlinx.coroutines.CancellationException
import kotlinx.coroutines.sync.Mutex
import kotlinx.coroutines.sync.withLock
import kotlinx.serialization.builtins.MapSerializer
import kotlinx.serialization.builtins.serializer
import kotlinx.serialization.json.Json
import okhttp3.ResponseBody
import java.io.File
import java.time.Instant
import javax.inject.Inject

/** What a single upload request carries — matches web's `CHUNK_BYTES`, well under the server's own chunk ceiling. */
private const val CHUNK_BYTES = 8 * 1024 * 1024

/**
 * The Shares + My Documents data layer.
 *
 * `GET /api/my-documents` and `GET /api/shares(/mine)` are the sole sources of
 * truth for their lists — nothing here maintains a parallel local copy of
 * either (see `core/sync/UserStateKeys.kt`'s doc comment on why
 * `synapse.myDocuments.v1` is not one of the synced user-state keys). The one
 * local document this repository owns is [SHARE_INDEX_KEY]: which local note
 * or board a share id already belongs to, so re-publishing the same one
 * updates its existing link instead of minting a second one — matching web's
 * `useShareIndex`/`ShareDialog`.
 *
 * Reads [NotebookRepository]/[WhiteboardRepository] directly (one-way: they
 * do not know this feature exists) to source what a student can publish —
 * "share one of my things" needs to see those things, and Shares owns no
 * note/board content of its own.
 */
class SharesRepository @Inject constructor(
    private val api: SharesApi,
    private val localStore: LocalStore,
    private val syncEngine: SyncEngine,
    private val notebookRepository: NotebookRepository,
    private val whiteboardRepository: WhiteboardRepository,
    private val fileCache: MyDocumentFileCache,
    private val json: Json,
) {
    private val writeMutex = Mutex()
    private val shareIndexSerializer = MapSerializer(String.serializer(), String.serializer())

    // --- My Documents ------------------------------------------------------

    suspend fun myDocuments(): MyDocumentsResponse = api.listMyDocuments()

    suspend fun renameDocument(id: String, title: String) = api.renameMyDocument(id, title)

    suspend fun deleteDocument(id: String) {
        api.deleteMyDocument(id)
        fileCache.remove(id)
    }

    fun isDownloaded(id: String): Boolean = fileCache.isCached(id)

    /** Downloads (if needed) and returns the on-device copy of [MyDocument] [id]. Failures propagate — see [MyDocumentFileCache.ensure]. */
    suspend fun ensureDownloaded(id: String): File = fileCache.ensure(id)

    fun removeDownload(id: String) = fileCache.remove(id)

    /**
     * Chunked upload: init -> N chunk `PUT`s -> complete, matching web's
     * `useMyDocuments.upload`. [readChunk] is asked for up to [CHUNK_BYTES] of
     * [sizeBytes] starting at chunk [index] and returns exactly the bytes to
     * send (fewer for the final chunk) — callers stream from a
     * `ContentResolver`/file rather than holding the whole document in memory.
     *
     * **Deliberately basic**, matching the brief's allowance to defer a
     * polished upload UX: no resume after a process death mid-upload, no
     * concurrent chunk sends, no progress beyond what the caller derives from
     * which chunk index is in flight. A failure at any step propagates
     * (including [CancellationException]) rather than being swallowed into a
     * fabricated success — the caller decides how to surface it.
     */
    suspend fun uploadDocument(
        fileName: String,
        mimeType: String?,
        sizeBytes: Long,
        sourceKind: String = "resource",
        sourceId: String? = null,
        title: String = fileName,
        readChunk: suspend (index: Int, chunkBytes: Int) -> ByteArray,
    ): String {
        val created = api.createMyDocument(
            CreateMyDocumentBody(title = title, fileName = fileName, mimeType = mimeType, sourceKind = sourceKind, sourceId = sourceId),
        )
        val chunkSize = created.chunkMaxBytes.toInt().takeIf { it in 1..CHUNK_BYTES } ?: CHUNK_BYTES
        val totalChunks = maxOf(1, ((sizeBytes + chunkSize - 1) / chunkSize).toInt())
        for (index in 0 until totalChunks) {
            val remaining = sizeBytes - index.toLong() * chunkSize
            val thisChunkSize = minOf(chunkSize.toLong(), remaining).toInt()
            val bytes = readChunk(index, thisChunkSize)
            val response: ChunkUploadResponse = api.putDocumentChunk(created.id, created.uploadId, index, bytes)
            check(response.ok) { "chunk $index was not accepted" }
        }
        api.completeDocumentUpload(created.id, created.uploadId, CompleteUploadBody(totalChunks = totalChunks, sizeBytes = sizeBytes))
        return created.id
    }

    // --- Shares --------------------------------------------------------------

    suspend fun myShares(kind: String? = null): List<ShareSummary> = api.listMyShares(kind)

    suspend fun discoverableShares(kind: String? = null): List<ShareSummary> = api.listDiscoverableShares(kind)

    suspend fun readShare(id: String): ShareDetail = api.getShare(id)

    /** Raw bytes for a managed image referenced by a readable share. Caller closes the body. */
    suspend fun shareAsset(shareId: String, documentId: String): ResponseBody = api.getShareAsset(shareId, documentId)

    suspend fun setStar(id: String, starred: Boolean): ShareSummary = api.setShareStar(id, starred)

    suspend fun setFollow(id: String, following: Boolean): ShareSummary = api.setShareFollow(id, following)

    suspend fun deleteShare(id: String, now: Instant) {
        api.deleteShare(id)
        writeMutex.withLock {
            val next = shareIndex().filterValues { it != id }
            syncEngine.write(SHARE_INDEX_KEY, json.encodeToString(shareIndexSerializer, next), now)
        }
    }

    // --- What can be published ------------------------------------------------

    suspend fun shareableNotes(): List<Note> = notebookRepository.notes()

    suspend fun shareableBoards(now: Instant): List<WhiteboardDocument> = whiteboardRepository.loadCollection(now).boards

    /** Handle -> live share id, for marking which of [shareableNotes]/[shareableBoards] is already shared. */
    suspend fun shareIndex(): Map<String, String> {
        val stored = localStore.getUserState(SHARE_INDEX_KEY) ?: return emptyMap()
        return runCatching { json.decodeFromString(shareIndexSerializer, stored) }.getOrDefault(emptyMap())
    }

    /** Publish (or re-publish, updating the same link) one Notebook note. */
    suspend fun publishNote(note: Note, access: String, now: Instant) {
        publish(handle = noteShareHandle(note.id), kind = ShareKind.NOTE, title = note.title.ifBlank { "Untitled" }, access = access, payload = notePayload(note), now = now)
    }

    /** Publish (or re-publish, updating the same link) one Whiteboard board. */
    suspend fun publishBoard(board: WhiteboardDocument, access: String, now: Instant) {
        publish(handle = boardShareHandle(board.id), kind = ShareKind.WHITEBOARD, title = board.title, access = access, payload = boardPayload(json, board.state), now = now)
    }

    private suspend fun publish(handle: String, kind: String, title: String, access: String, payload: kotlinx.serialization.json.JsonElement, now: Instant) {
        val existingId = shareIndex()[handle]
        // What the link currently is, is the server's answer — re-read it fresh
        // rather than trusting a remembered revision, matching `ShareDialog`'s
        // doc comment ("the owner may have changed it from another device").
        val current = existingId?.let { id ->
            try {
                api.getShare(id)
            } catch (e: CancellationException) {
                throw e
            } catch (e: Exception) {
                null // Deleted from elsewhere — republish as a fresh share below.
            }
        }
        val shareId = if (current != null) {
            api.updateShare(current.id, UpdateShareBody(title = title, access = access, payload = payload, expectedRevision = current.revision))
            current.id
        } else {
            api.createShare(CreateShareBody(kind = kind, title = title, access = access, payload = payload)).id
        }
        writeMutex.withLock {
            val next = shareIndex() + (handle to shareId)
            syncEngine.write(SHARE_INDEX_KEY, json.encodeToString(shareIndexSerializer, next), now)
        }
    }
}
