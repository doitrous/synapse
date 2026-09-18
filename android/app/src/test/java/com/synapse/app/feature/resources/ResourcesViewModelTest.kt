package com.synapse.app.feature.resources

import com.synapse.app.core.api.QBankApi
import com.synapse.app.core.api.SynapseApi
import com.synapse.app.core.api.VerifiedAttemptsBody
import com.synapse.app.core.cache.LocalStore
import com.synapse.app.core.cache.OutboxEntry
import com.synapse.app.core.media.ResourceFileCache
import com.synapse.app.core.model.AttemptRecord as ModelAttemptRecord
import com.synapse.app.core.model.Manifest
import com.synapse.app.core.model.SessionDto
import com.synapse.app.core.model.StateDoc
import com.synapse.app.core.sync.SyncEngine
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.ExperimentalCoroutinesApi
import kotlinx.coroutines.test.StandardTestDispatcher
import kotlinx.coroutines.test.resetMain
import kotlinx.coroutines.test.runTest
import kotlinx.coroutines.test.setMain
import kotlinx.serialization.json.Json
import kotlinx.serialization.json.JsonNull
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
 * [ResourcesViewModel] built against a real [ResourcesRepository] + [SyncEngine],
 * the latter wired to hand-written fakes — the same convention as
 * `LibraryViewModelTest`.
 */
@OptIn(ExperimentalCoroutinesApi::class)
class ResourcesViewModelTest {

    @get:Rule
    val tempFolder = TemporaryFolder()

    private val dispatcher = StandardTestDispatcher()
    private val json = Json { ignoreUnknownKeys = true }
    private val now = Instant.parse("2026-08-29T12:00:00Z")

    @Before fun setUp() { Dispatchers.setMain(dispatcher) }
    @After fun tearDown() { Dispatchers.resetMain() }

    private fun repository(
        localStore: VmFakeLocalStore = VmFakeLocalStore(),
        api: VmFakeApi = VmFakeApi(),
        qbankApi: VmFakeQBankApi = VmFakeQBankApi(),
    ): ResourcesRepository {
        // Shares `dispatcher`'s scheduler rather than the real Dispatchers.IO
        // default: ResourceFileCache.ensure hops dispatchers mid-download, and
        // a real dispatcher there is invisible to advanceUntilIdle() below.
        val fileCache = ResourceFileCache(
            tempFolder.newFolder("resources-vm-test-${System.nanoTime()}"),
            qbankApi,
            ioDispatcher = dispatcher,
        )
        return ResourcesRepository(localStore, SyncEngine(api, localStore, readableKeys = emptyList(), userStateKeys = emptyList()), fileCache, json)
    }

    private fun viewModel(repository: ResourcesRepository): ResourcesViewModel =
        ResourcesViewModel(repository).apply { now = { this@ResourcesViewModelTest.now } }

    @Test
    fun initLoadsEmptyContentWhenNothingIsStoredAnywhere() = runTest {
        val viewModel = viewModel(repository())
        dispatcher.scheduler.advanceUntilIdle()

        val state = viewModel.uiState.value
        assertTrue(state is ResourcesUiState.Content)
        state as ResourcesUiState.Content
        assertTrue(state.resources.isEmpty())
        assertTrue(state.bookmarkedIds.isEmpty())
        assertEquals(ReaderState.Closed, state.reader)
    }

    @Test
    fun loadProjectsAPublishedResource() = runTest {
        val localStore = VmFakeLocalStore()
        seedLedger(localStore, PUBLISHED_RESOURCE_JSON)
        val viewModel = viewModel(repository(localStore))
        dispatcher.scheduler.advanceUntilIdle()

        val state = viewModel.uiState.value as ResourcesUiState.Content
        assertEquals(setOf("r-kc"), state.resources.map { it.id }.toSet())
    }

    @Test
    fun toggleBookmarkUpdatesUiStateBookmarkedIdsWithNoManualReload() = runTest {
        val localStore = VmFakeLocalStore()
        seedLedger(localStore, PUBLISHED_RESOURCE_JSON)
        val viewModel = viewModel(repository(localStore))
        dispatcher.scheduler.advanceUntilIdle()

        viewModel.toggleBookmark("r-kc")
        dispatcher.scheduler.advanceUntilIdle()
        assertEquals(setOf("r-kc"), (viewModel.uiState.value as ResourcesUiState.Content).bookmarkedIds)

        viewModel.toggleBookmark("r-kc")
        dispatcher.scheduler.advanceUntilIdle()
        assertTrue((viewModel.uiState.value as ResourcesUiState.Content).bookmarkedIds.isEmpty())
    }

    @Test
    fun openResourceDownloadsThenReaderStateBecomesReady() = runTest {
        val localStore = VmFakeLocalStore()
        seedLedger(localStore, PUBLISHED_RESOURCE_JSON)
        val qbankApi = VmFakeQBankApi().apply { medicalResourceBytes["r-kc"] = "pdf bytes".toResponseBody() }
        val viewModel = viewModel(repository(localStore, qbankApi = qbankApi))
        dispatcher.scheduler.advanceUntilIdle()
        val resource = (viewModel.uiState.value as ResourcesUiState.Content).resources.single()

        viewModel.openResource(resource)
        dispatcher.scheduler.advanceUntilIdle()

        val reader = (viewModel.uiState.value as ResourcesUiState.Content).reader
        assertTrue(reader is ReaderState.Ready)
        assertEquals("r-kc", (reader as ReaderState.Ready).resourceId)
        assertEquals("pdf bytes", reader.file.readText())
    }

    @Test
    fun openResourceOnADownloadFailureSetsReaderStateFailed() = runTest {
        val localStore = VmFakeLocalStore()
        seedLedger(localStore, PUBLISHED_RESOURCE_JSON)
        // No fixture registered for "r-kc" in VmFakeQBankApi -> getMedicalResource throws.
        val viewModel = viewModel(repository(localStore))
        dispatcher.scheduler.advanceUntilIdle()
        val resource = (viewModel.uiState.value as ResourcesUiState.Content).resources.single()

        viewModel.openResource(resource)
        dispatcher.scheduler.advanceUntilIdle()

        val reader = (viewModel.uiState.value as ResourcesUiState.Content).reader
        assertTrue(reader is ReaderState.Failed)
    }

    @Test
    fun closeReaderReturnsToClosed() = runTest {
        val localStore = VmFakeLocalStore()
        seedLedger(localStore, PUBLISHED_RESOURCE_JSON)
        val qbankApi = VmFakeQBankApi().apply { medicalResourceBytes["r-kc"] = "pdf bytes".toResponseBody() }
        val viewModel = viewModel(repository(localStore, qbankApi = qbankApi))
        dispatcher.scheduler.advanceUntilIdle()
        val resource = (viewModel.uiState.value as ResourcesUiState.Content).resources.single()
        viewModel.openResource(resource)
        dispatcher.scheduler.advanceUntilIdle()

        viewModel.closeReader()

        assertEquals(ReaderState.Closed, (viewModel.uiState.value as ResourcesUiState.Content).reader)
    }

    // --- fixtures ------------------------------------------------------------------

    private suspend fun seedLedger(localStore: VmFakeLocalStore, resourceJson: String) {
        val doc = StateDoc(value = json.parseToJsonElement("[$resourceJson]"), updatedAt = "2026-08-29T00:00:00Z")
        localStore.putCatalogue(CONTENT_LEDGER_KEY, "2026-08-29T00:00:00Z", json.encodeToString(StateDoc.serializer(), doc))
    }

    private companion object {
        const val CONTENT_LEDGER_KEY = "synapse-admin-content-ledger-v4"

        val PUBLISHED_RESOURCE_JSON = """
            { "id":"r-kc","kind":"resource","title":"Kumar & Clark's Clinical Medicine","subjectId":"cvs",
              "status":"Published","fields":{"Type":"Book","Source":"Elsevier","Location":"Ch. 23 · Cardiology","Year":"2024"} }
        """.trimIndent()
    }
}

// --- Fakes --------------------------------------------------------------------

private class VmFakeLocalStore : LocalStore {
    val catalogue = linkedMapOf<String, Pair<String, String>>()
    val outbox = linkedMapOf<String, String>()
    val attemptsById = linkedMapOf<String, ModelAttemptRecord>()
    val userState = linkedMapOf<String, Triple<String, String?, String?>>()

    override suspend fun putCatalogue(key: String, updatedAt: String, json: String) {
        catalogue[key] = updatedAt to json
    }

    override suspend fun catalogueUpdatedAt(key: String): String? = catalogue[key]?.first
    override suspend fun getCatalogue(key: String): String? = catalogue[key]?.second
    override suspend fun enqueue(key: String, json: String) { outbox[key] = json }
    override suspend fun pendingOutbox(): List<OutboxEntry> = outbox.map { OutboxEntry(it.key, it.value) }
    override suspend fun clearOutbox(key: String) { outbox.remove(key) }
    override suspend fun putAttempts(items: List<ModelAttemptRecord>) { items.forEach { attemptsById[it.id] = it } }
    override suspend fun attempts(month: String): List<ModelAttemptRecord> =
        attemptsById.values.filter { it.month == month }
    override suspend fun putUserState(key: String, json: String, savedAt: String?, serverUpdatedAt: String?) {
        userState[key] = Triple(json, savedAt, serverUpdatedAt)
    }
    override suspend fun getUserState(key: String): String? = userState[key]?.first
    override suspend fun userStateSavedAt(key: String): String? = userState[key]?.second

    override suspend fun clearAll() {
        catalogue.clear(); outbox.clear(); attemptsById.clear(); userState.clear()
    }
}

private class VmFakeApi : SynapseApi {
    override suspend fun session(): SessionDto = SessionDto("u")
    override suspend fun manifest(): Manifest = emptyMap()
    override suspend fun getState(key: String): StateDoc = StateDoc(JsonNull)
    override suspend fun getUserState(key: String): StateDoc = StateDoc(JsonNull)
    override suspend fun putUserState(key: String, doc: StateDoc) { /* unused */ }
}

private class VmFakeQBankApi : QBankApi {
    val medicalResourceBytes = mutableMapOf<String, ResponseBody>()

    override suspend fun postAttempts(body: VerifiedAttemptsBody) { /* unused */ }
    override suspend fun getMedia(id: String): ResponseBody = error("unused in these tests")
    override suspend fun getMedicalResource(id: String): ResponseBody =
        medicalResourceBytes[id] ?: error("no fixture registered for $id")
}
