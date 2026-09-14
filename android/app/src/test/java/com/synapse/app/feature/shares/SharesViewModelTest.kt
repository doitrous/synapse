package com.synapse.app.feature.shares

import com.synapse.app.core.api.ChunkUploadResponse
import com.synapse.app.core.api.CompleteUploadBody
import com.synapse.app.core.api.CompleteUploadResponse
import com.synapse.app.core.api.CreateMyDocumentBody
import com.synapse.app.core.api.CreateMyDocumentResponse
import com.synapse.app.core.api.CreateShareBody
import com.synapse.app.core.api.CreateShareResponse
import com.synapse.app.core.api.MyDocument
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
import com.synapse.app.core.shares.ShareKind
import com.synapse.app.core.sync.SyncEngine
import com.synapse.app.feature.notebook.NotebookRepository
import com.synapse.app.feature.whiteboard.WhiteboardRepository
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.ExperimentalCoroutinesApi
import kotlinx.coroutines.test.StandardTestDispatcher
import kotlinx.coroutines.test.resetMain
import kotlinx.coroutines.test.runTest
import kotlinx.coroutines.test.setMain
import kotlinx.serialization.json.Json
import kotlinx.serialization.json.JsonNull
import kotlinx.serialization.json.buildJsonObject
import kotlinx.serialization.json.put
import okhttp3.ResponseBody
import okhttp3.ResponseBody.Companion.toResponseBody
import org.junit.After
import org.junit.Assert.assertEquals
import org.junit.Assert.assertTrue
import org.junit.Before
import org.junit.Rule
import org.junit.Test
import org.junit.rules.TemporaryFolder
import java.time.Instant

/**
 * [SharesViewModel] built against a real [SharesRepository] (and real
 * [NotebookRepository]/[WhiteboardRepository]), backed by fakes — the same
 * convention as [com.synapse.app.feature.resources.ResourcesViewModelTest].
 */
@OptIn(ExperimentalCoroutinesApi::class)
class SharesViewModelTest {

    @get:Rule
    val tempFolder = TemporaryFolder()

    private val dispatcher = StandardTestDispatcher()
    private val json = Json { ignoreUnknownKeys = true }
    private val now = Instant.parse("2026-08-29T12:00:00Z")

    @Before fun setUp() { Dispatchers.setMain(dispatcher) }
    @After fun tearDown() { Dispatchers.resetMain() }

    private fun repository(localStore: VmFakeLocalStore = VmFakeLocalStore(), api: VmFakeSharesApi = VmFakeSharesApi()): SharesRepository {
        val syncEngine = SyncEngine(VmFakeSynapseApi(), localStore, readableKeys = emptyList(), userStateKeys = emptyList())
        val notebookRepository = NotebookRepository(localStore, syncEngine, json)
        val whiteboardRepository = WhiteboardRepository(localStore, syncEngine, json)
        // Shares `dispatcher`'s scheduler rather than a real one — see
        // `ResourcesViewModelTest`'s doc comment on why this matters for
        // `advanceUntilIdle()` to actually observe the download.
        val fileCache = MyDocumentFileCache(tempFolder.newFolder("shares-vm-test-${System.nanoTime()}"), api, ioDispatcher = dispatcher)
        return SharesRepository(api, localStore, syncEngine, notebookRepository, whiteboardRepository, fileCache, json)
    }

    private fun viewModel(repository: SharesRepository): SharesViewModel =
        SharesViewModel(repository, json).apply { now = { this@SharesViewModelTest.now } }

    @Test
    fun initLoadsDocumentsAndShares() = runTest {
        val api = VmFakeSharesApi().apply {
            documents = MyDocumentsResponse(items = listOf(MyDocument(id = "d1", title = "Doc")), usedBytes = 1, quotaBytes = 10)
            myShares = listOf(ShareSummary(id = "s1", kind = "note", title = "Shared note", access = "view"))
        }
        val viewModel = viewModel(repository(api = api))
        dispatcher.scheduler.advanceUntilIdle()

        val state = viewModel.uiState.value as SharesUiState.Content
        assertEquals(listOf("d1"), state.documents.map { it.id })
        assertEquals(listOf("s1"), state.myShares.map { it.id })
        assertEquals(1L, state.usedBytes)
    }

    @Test
    fun openDocumentDownloadsThenReaderBecomesReady() = runTest {
        val api = VmFakeSharesApi().apply {
            documents = MyDocumentsResponse(items = listOf(MyDocument(id = "d1", title = "Doc", mediaType = "pdf")))
            fileBytes["d1"] = "pdf bytes".toResponseBody()
        }
        val viewModel = viewModel(repository(api = api))
        dispatcher.scheduler.advanceUntilIdle()
        val document = (viewModel.uiState.value as SharesUiState.Content).documents.single()

        viewModel.openDocument(document)
        dispatcher.scheduler.advanceUntilIdle()

        val reader = (viewModel.uiState.value as SharesUiState.Content).documentReader
        assertTrue(reader is DocumentReaderState.Ready)
        assertEquals("pdf bytes", (reader as DocumentReaderState.Ready).file.readText())
    }

    @Test
    fun closeDocumentReaderReturnsToClosed() = runTest {
        val api = VmFakeSharesApi().apply {
            documents = MyDocumentsResponse(items = listOf(MyDocument(id = "d1", title = "Doc", mediaType = "pdf")))
            fileBytes["d1"] = "pdf bytes".toResponseBody()
        }
        val viewModel = viewModel(repository(api = api))
        dispatcher.scheduler.advanceUntilIdle()
        viewModel.openDocument((viewModel.uiState.value as SharesUiState.Content).documents.single())
        dispatcher.scheduler.advanceUntilIdle()

        viewModel.closeDocumentReader()

        assertEquals(DocumentReaderState.Closed, (viewModel.uiState.value as SharesUiState.Content).documentReader)
    }

    @Test
    fun openShareForANoteShowsItsPlainText() = runTest {
        val payload = buildJsonObject { put("plainText", "Hello there") }
        val api = VmFakeSharesApi().apply {
            shareDetails["s1"] = ShareDetail(id = "s1", kind = ShareKind.NOTE, title = "Note", access = "view", payload = payload, revision = 1)
        }
        val viewModel = viewModel(repository(api = api))
        dispatcher.scheduler.advanceUntilIdle()

        viewModel.openShare("s1")
        dispatcher.scheduler.advanceUntilIdle()

        val reader = (viewModel.uiState.value as SharesUiState.Content).sharedReader
        assertTrue(reader is SharedReaderState.NoteReady)
        assertEquals("Hello there", (reader as SharedReaderState.NoteReady).text)
    }

    @Test
    fun openShareForAMissingShareSetsFailed() = runTest {
        val viewModel = viewModel(repository())
        dispatcher.scheduler.advanceUntilIdle()

        viewModel.openShare("missing")
        dispatcher.scheduler.advanceUntilIdle()

        assertTrue((viewModel.uiState.value as SharesUiState.Content).sharedReader is SharedReaderState.Failed)
    }

    @Test
    fun toggleStarCallsTheApiWithTheOppositeOfCurrentAndRefreshes() = runTest {
        val api = VmFakeSharesApi().apply { myShares = listOf(ShareSummary(id = "s1", kind = "note", title = "T", access = "view", starred = false)) }
        val viewModel = viewModel(repository(api = api))
        dispatcher.scheduler.advanceUntilIdle()
        val share = (viewModel.uiState.value as SharesUiState.Content).myShares.single()

        viewModel.toggleStar(share)
        dispatcher.scheduler.advanceUntilIdle()

        assertEquals(true, api.starCalls[share.id])
    }

    @Test
    fun deleteShareRemovesItFromTheApiThenRefreshes() = runTest {
        val api = VmFakeSharesApi().apply { myShares = listOf(ShareSummary(id = "s1", kind = "note", title = "T", access = "view", isOwner = true)) }
        val viewModel = viewModel(repository(api = api))
        dispatcher.scheduler.advanceUntilIdle()

        viewModel.deleteShare("s1")
        dispatcher.scheduler.advanceUntilIdle()

        assertTrue(api.deletedShareIds.contains("s1"))
    }
}

// --- Fakes --------------------------------------------------------------------

private class VmFakeLocalStore : LocalStore {
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

private class VmFakeSynapseApi : SynapseApi {
    override suspend fun session(): SessionDto = SessionDto("u")
    override suspend fun manifest(): Manifest = emptyMap()
    override suspend fun getState(key: String): StateDoc = StateDoc(JsonNull)
    override suspend fun getUserState(key: String): StateDoc = StateDoc(JsonNull)
    override suspend fun putUserState(key: String, doc: StateDoc) {}
    override suspend fun getAttempts(month: String): List<ModelAttemptRecord> = emptyList()
    override suspend fun postAttempt(attempt: ModelAttemptRecord) {}
}

private class VmFakeSharesApi : SharesApi {
    var documents = MyDocumentsResponse()
    var myShares: List<ShareSummary> = emptyList()
    var discoverableShares: List<ShareSummary> = emptyList()
    val shareDetails = mutableMapOf<String, ShareDetail>()
    val fileBytes = mutableMapOf<String, ResponseBody>()
    val starCalls = mutableMapOf<String, Boolean>()
    val deletedShareIds = mutableListOf<String>()

    override suspend fun listMyDocuments(): MyDocumentsResponse = documents
    override suspend fun createMyDocument(body: CreateMyDocumentBody): CreateMyDocumentResponse =
        CreateMyDocumentResponse(id = "doc-x", uploadId = "up-x", chunkMaxBytes = 8 * 1024 * 1024)
    override suspend fun putDocumentChunk(id: String, uploadId: String, index: Int, chunk: ByteArray): ChunkUploadResponse =
        ChunkUploadResponse(ok = true, index = index, sizeBytes = chunk.size.toLong())
    override suspend fun completeDocumentUpload(id: String, uploadId: String, body: CompleteUploadBody): CompleteUploadResponse =
        CompleteUploadResponse(ok = true, id = id, sizeBytes = body.sizeBytes)
    override suspend fun renameMyDocument(id: String, title: String) {}
    override suspend fun getMyDocumentFile(id: String): ResponseBody = fileBytes[id] ?: error("no fixture for $id")
    override suspend fun deleteMyDocument(id: String) {}

    override suspend fun createShare(body: CreateShareBody): CreateShareResponse = error("unused in these tests")
    override suspend fun listDiscoverableShares(kind: String?): List<ShareSummary> = discoverableShares
    override suspend fun listMyShares(kind: String?): List<ShareSummary> = myShares
    override suspend fun getShare(id: String): ShareDetail = shareDetails[id] ?: error("no share fixture for $id")
    override suspend fun getShareAsset(shareId: String, documentId: String): ResponseBody = error("unused in these tests")
    override suspend fun updateShare(id: String, body: UpdateShareBody): ShareDetail = error("unused in these tests")
    override suspend fun setShareStar(id: String, starred: Boolean): ShareSummary {
        starCalls[id] = starred
        return ShareSummary(id = id, kind = "note", title = "T", access = "view", starred = starred)
    }
    override suspend fun setShareFollow(id: String, following: Boolean): ShareSummary =
        ShareSummary(id = id, kind = "note", title = "T", access = "view", following = following)
    override suspend fun getShareRevisions(id: String): List<ShareRevision> = emptyList()
    override suspend fun deleteShare(id: String) { deletedShareIds += id }
}
