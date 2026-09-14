package com.synapse.app.feature.shares

import com.synapse.app.core.api.ChunkUploadResponse
import com.synapse.app.core.api.CompleteUploadBody
import com.synapse.app.core.api.CompleteUploadResponse
import com.synapse.app.core.api.CreateMyDocumentBody
import com.synapse.app.core.api.CreateMyDocumentResponse
import com.synapse.app.core.api.CreateShareBody
import com.synapse.app.core.api.CreateShareResponse
import com.synapse.app.core.api.MyDocumentsResponse
import com.synapse.app.core.api.SharesApi
import com.synapse.app.core.api.ShareDetail
import com.synapse.app.core.api.ShareRevision
import com.synapse.app.core.api.ShareSummary
import com.synapse.app.core.api.SynapseApi
import com.synapse.app.core.api.UpdateShareBody
import com.synapse.app.core.cache.LocalStore
import com.synapse.app.core.cache.OutboxEntry
import com.synapse.app.core.model.AttemptRecord as ModelAttemptRecord
import com.synapse.app.core.model.Manifest
import com.synapse.app.core.model.SessionDto
import com.synapse.app.core.model.StateDoc
import com.synapse.app.core.notebook.Note
import com.synapse.app.core.shares.ShareKind
import com.synapse.app.core.shares.boardShareHandle
import com.synapse.app.core.shares.noteShareHandle
import com.synapse.app.core.sync.SyncEngine
import com.synapse.app.feature.notebook.NotebookRepository
import com.synapse.app.feature.whiteboard.WhiteboardRepository
import kotlinx.coroutines.test.runTest
import kotlinx.serialization.json.Json
import kotlinx.serialization.json.JsonNull
import okhttp3.ResponseBody
import okhttp3.ResponseBody.Companion.toResponseBody
import org.junit.Assert.assertEquals
import org.junit.Assert.assertTrue
import org.junit.Before
import org.junit.Rule
import org.junit.Test
import org.junit.rules.TemporaryFolder
import java.time.Instant

/**
 * [SharesRepository] against a fake [SharesApi] and a real [SyncEngine] over
 * a fake in-memory [LocalStore] — the share index write-through is actually
 * exercised, matching `ResourcesRepositoryTest`'s convention.
 */
class SharesRepositoryTest {

    @get:Rule
    val tempFolder = TemporaryFolder()

    private val json = Json { ignoreUnknownKeys = true }
    private val now = Instant.parse("2026-08-29T12:00:00Z")

    private lateinit var localStore: FakeLocalStore
    private lateinit var synapseApi: FakeSynapseApi
    private lateinit var syncEngine: SyncEngine
    private lateinit var sharesApi: FakeSharesApi
    private lateinit var notebookRepository: NotebookRepository
    private lateinit var whiteboardRepository: WhiteboardRepository
    private lateinit var repository: SharesRepository

    @Before
    fun setup() {
        localStore = FakeLocalStore()
        synapseApi = FakeSynapseApi()
        syncEngine = SyncEngine(synapseApi, localStore, readableKeys = emptyList(), userStateKeys = emptyList())
        sharesApi = FakeSharesApi()
        notebookRepository = NotebookRepository(localStore, syncEngine, json)
        whiteboardRepository = WhiteboardRepository(localStore, syncEngine, json)
        val fileCache = MyDocumentFileCache(tempFolder.newFolder("my-documents-test"), sharesApi)
        repository = SharesRepository(sharesApi, localStore, syncEngine, notebookRepository, whiteboardRepository, fileCache, json)
    }

    // --- My Documents ------------------------------------------------------------

    @Test
    fun myDocumentsDelegatesToTheApi() = runTest {
        sharesApi.documents = MyDocumentsResponse(usedBytes = 10, quotaBytes = 100)
        val result = repository.myDocuments()
        assertEquals(10L, result.usedBytes)
        assertEquals(100L, result.quotaBytes)
    }

    @Test
    fun uploadDocumentSendsEveryChunkThenCompletesWithTheDeclaredSize() = runTest {
        sharesApi.createResponse = CreateMyDocumentResponse(id = "doc-1", uploadId = "up-1", chunkMaxBytes = 4)
        val bytes = "0123456789".toByteArray() // 10 bytes -> chunks of 4, 4, 2

        val id = repository.uploadDocument(fileName = "notes.pdf", mimeType = "application/pdf", sizeBytes = bytes.size.toLong()) { index, chunkBytes ->
            bytes.copyOfRange(index * 4, index * 4 + chunkBytes)
        }

        assertEquals("doc-1", id)
        assertEquals(listOf(4, 4, 2), sharesApi.receivedChunkSizes)
        assertEquals(3, sharesApi.completeCall?.totalChunks)
        assertEquals(10L, sharesApi.completeCall?.sizeBytes)
    }

    @Test
    fun ensureDownloadedCachesTheDocumentThenIsDownloadedIsTrue() = runTest {
        sharesApi.fileBytes["doc-1"] = "pdf bytes".toResponseBody()
        assertEquals(false, repository.isDownloaded("doc-1"))

        val file = repository.ensureDownloaded("doc-1")

        assertEquals("pdf bytes", file.readText())
        assertTrue(repository.isDownloaded("doc-1"))
    }

    @Test
    fun deleteDocumentRemovesTheCachedCopyToo() = runTest {
        sharesApi.fileBytes["doc-1"] = "pdf bytes".toResponseBody()
        repository.ensureDownloaded("doc-1")

        repository.deleteDocument("doc-1")

        assertTrue(sharesApi.deletedDocumentIds.contains("doc-1"))
        assertEquals(false, repository.isDownloaded("doc-1"))
    }

    // --- Shares --------------------------------------------------------------------

    @Test
    fun publishingANewNoteCreatesAShareAndRemembersItsHandle() = runTest {
        val note = Note(id = "n1", title = "Cardio", plainText = "Two heart sounds")

        repository.publishNote(note, access = "view", now = now)

        assertEquals(1, sharesApi.createCalls.size)
        assertEquals(ShareKind.NOTE, sharesApi.createCalls.single().kind)
        assertEquals(mapOf(noteShareHandle("n1") to "share-1"), repository.shareIndex())
    }

    @Test
    fun rePublishingAnAlreadySharedNoteUpdatesTheExistingShareInstead() = runTest {
        val note = Note(id = "n1", title = "Cardio", plainText = "v1")
        repository.publishNote(note, access = "view", now = now)

        repository.publishNote(note.copy(plainText = "v2"), access = "view", now = now)

        assertEquals(1, sharesApi.createCalls.size) // still just the one create
        assertEquals(1, sharesApi.updateCalls.size)
        assertEquals("share-1", sharesApi.updateCalls.single().first)
    }

    @Test
    fun publishingABoardUsesTheBoardHandle() = runTest {
        val boards = whiteboardRepository.loadCollection(now).boards
        val board = boards.single()

        repository.publishBoard(board, access = "edit", now = now)

        assertEquals(mapOf(boardShareHandle(board.id) to "share-1"), repository.shareIndex())
    }

    @Test
    fun deletingAShareForgetsItsHandle() = runTest {
        val note = Note(id = "n1", title = "Cardio", plainText = "v1")
        repository.publishNote(note, access = "view", now = now)

        repository.deleteShare("share-1", now)

        assertTrue(sharesApi.deletedShareIds.contains("share-1"))
        assertTrue(repository.shareIndex().isEmpty())
    }
}

// --- Fakes --------------------------------------------------------------------

private class FakeLocalStore : LocalStore {
    val catalogue = linkedMapOf<String, Pair<String, String>>()
    val outbox = linkedMapOf<String, String>()
    val attemptsById = linkedMapOf<String, ModelAttemptRecord>()
    val userState = linkedMapOf<String, Triple<String, String?, String?>>()

    override suspend fun putCatalogue(key: String, updatedAt: String, json: String) { catalogue[key] = updatedAt to json }
    override suspend fun catalogueUpdatedAt(key: String): String? = catalogue[key]?.first
    override suspend fun getCatalogue(key: String): String? = catalogue[key]?.second
    override suspend fun enqueue(key: String, json: String) { outbox[key] = json }
    override suspend fun pendingOutbox(): List<OutboxEntry> = outbox.map { OutboxEntry(it.key, it.value) }
    override suspend fun clearOutbox(key: String) { outbox.remove(key) }
    override suspend fun putAttempts(items: List<ModelAttemptRecord>) { items.forEach { attemptsById[it.id] = it } }
    override suspend fun attempts(month: String): List<ModelAttemptRecord> = attemptsById.values.filter { it.month == month }
    override suspend fun putUserState(key: String, json: String, savedAt: String?, serverUpdatedAt: String?) {
        userState[key] = Triple(json, savedAt, serverUpdatedAt)
    }
    override suspend fun getUserState(key: String): String? = userState[key]?.first
    override suspend fun userStateSavedAt(key: String): String? = userState[key]?.second
    override suspend fun clearAll() { catalogue.clear(); outbox.clear(); attemptsById.clear(); userState.clear() }
}

private class FakeSynapseApi : SynapseApi {
    override suspend fun session(): SessionDto = SessionDto("u")
    override suspend fun manifest(): Manifest = emptyMap()
    override suspend fun getState(key: String): StateDoc = StateDoc(JsonNull)
    override suspend fun getUserState(key: String): StateDoc = StateDoc(JsonNull)
    override suspend fun putUserState(key: String, doc: StateDoc) {}
    override suspend fun getAttempts(month: String): List<ModelAttemptRecord> = emptyList()
    override suspend fun postAttempt(attempt: ModelAttemptRecord) {}
}

private class FakeSharesApi : SharesApi {
    var documents = MyDocumentsResponse()
    var createResponse = CreateMyDocumentResponse(id = "doc-1", uploadId = "up-1", chunkMaxBytes = 8 * 1024 * 1024)
    val receivedChunkSizes = mutableListOf<Int>()
    var completeCall: CompleteUploadBody? = null
    val fileBytes = mutableMapOf<String, ResponseBody>()
    val deletedDocumentIds = mutableListOf<String>()

    var nextShareId = 1
    val createCalls = mutableListOf<CreateShareBody>()
    val updateCalls = mutableListOf<Pair<String, UpdateShareBody>>()
    val shares = linkedMapOf<String, ShareDetail>()
    val deletedShareIds = mutableListOf<String>()

    override suspend fun listMyDocuments(): MyDocumentsResponse = documents
    override suspend fun createMyDocument(body: CreateMyDocumentBody): CreateMyDocumentResponse = createResponse
    override suspend fun putDocumentChunk(id: String, uploadId: String, index: Int, chunk: ByteArray): ChunkUploadResponse {
        receivedChunkSizes += chunk.size
        return ChunkUploadResponse(ok = true, index = index, sizeBytes = chunk.size.toLong())
    }
    override suspend fun completeDocumentUpload(id: String, uploadId: String, body: CompleteUploadBody): CompleteUploadResponse {
        completeCall = body
        return CompleteUploadResponse(ok = true, id = id, sizeBytes = body.sizeBytes)
    }
    override suspend fun renameMyDocument(id: String, title: String) {}
    override suspend fun getMyDocumentFile(id: String): ResponseBody = fileBytes[id] ?: error("no fixture for $id")
    override suspend fun deleteMyDocument(id: String) { deletedDocumentIds += id }

    override suspend fun createShare(body: CreateShareBody): CreateShareResponse {
        createCalls += body
        val id = "share-${nextShareId++}"
        shares[id] = ShareDetail(id = id, kind = body.kind, title = body.title, access = body.access, payload = body.payload, revision = 1, isOwner = true, canEdit = true)
        return CreateShareResponse(ok = true, id = id, access = body.access, revision = 1)
    }
    override suspend fun listDiscoverableShares(kind: String?): List<ShareSummary> = emptyList()
    override suspend fun listMyShares(kind: String?): List<ShareSummary> = emptyList()
    override suspend fun getShare(id: String): ShareDetail = shares[id] ?: error("no share $id")
    override suspend fun getShareAsset(shareId: String, documentId: String): ResponseBody = error("unused in these tests")
    override suspend fun updateShare(id: String, body: UpdateShareBody): ShareDetail {
        updateCalls += id to body
        val current = shares[id] ?: error("no share $id")
        val updated = current.copy(
            title = body.title ?: current.title,
            access = body.access ?: current.access,
            payload = body.payload ?: current.payload,
            revision = current.revision + 1,
        )
        shares[id] = updated
        return updated
    }
    override suspend fun setShareStar(id: String, starred: Boolean): ShareSummary = error("unused in these tests")
    override suspend fun setShareFollow(id: String, following: Boolean): ShareSummary = error("unused in these tests")
    override suspend fun getShareRevisions(id: String): List<ShareRevision> = emptyList()
    override suspend fun deleteShare(id: String) { deletedShareIds += id; shares.remove(id) }
}
