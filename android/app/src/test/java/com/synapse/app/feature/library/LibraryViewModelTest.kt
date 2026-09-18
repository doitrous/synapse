package com.synapse.app.feature.library

import com.synapse.app.core.api.SynapseApi
import com.synapse.app.core.cache.LocalStore
import com.synapse.app.core.cache.OutboxEntry
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
import org.junit.After
import org.junit.Assert.assertEquals
import org.junit.Assert.assertTrue
import org.junit.Before
import org.junit.Test
import java.time.Instant

/**
 * [LibraryViewModel] built against a real [LibraryRepository] + [SyncEngine], the latter wired to
 * hand-written fakes — the same convention as `FlashcardsViewModelTest`/`LibraryRepositoryTest`.
 */
@OptIn(ExperimentalCoroutinesApi::class)
class LibraryViewModelTest {

    private val dispatcher = StandardTestDispatcher()
    private val json = Json { ignoreUnknownKeys = true }
    private val now = Instant.parse("2026-08-29T12:00:00Z")

    @Before fun setUp() { Dispatchers.setMain(dispatcher) }
    @After fun tearDown() { Dispatchers.resetMain() }

    private fun repository(localStore: VmFakeLocalStore = VmFakeLocalStore(), api: VmFakeApi = VmFakeApi()): LibraryRepository =
        LibraryRepository(localStore, SyncEngine(api, localStore, readableKeys = emptyList(), userStateKeys = emptyList()), json)

    private fun viewModel(repository: LibraryRepository): LibraryViewModel =
        LibraryViewModel(repository).apply { now = { this@LibraryViewModelTest.now } }

    @Test
    fun initLoadsEmptyContentWhenNothingIsStoredAnywhere() = runTest {
        val viewModel = viewModel(repository())
        dispatcher.scheduler.advanceUntilIdle()

        val state = viewModel.uiState.value
        assertTrue(state is LibraryUiState.Content)
        state as LibraryUiState.Content
        assertTrue(state.articlesById.isEmpty())
        assertTrue(state.chapters.isEmpty())
        assertTrue(state.trees.isEmpty())
        assertTrue(state.readIds.isEmpty())
    }

    @Test
    fun loadProjectsAPublishedArticleIntoAChapter() = runTest {
        val localStore = VmFakeLocalStore()
        seedLedger(localStore, PUBLISHED_ARTICLE_JSON)
        val viewModel = viewModel(repository(localStore))
        dispatcher.scheduler.advanceUntilIdle()

        val state = viewModel.uiState.value as LibraryUiState.Content
        assertEquals(setOf("A1"), state.articlesById.keys)
        assertEquals(1, state.chapters.size)
        assertEquals(listOf("A1"), state.chapters.single().articleIds)
    }

    @Test
    fun toggleReadUpdatesUiStateReadIdsWithNoManualReload() = runTest {
        val localStore = VmFakeLocalStore()
        seedLedger(localStore, PUBLISHED_ARTICLE_JSON)
        val viewModel = viewModel(repository(localStore))
        dispatcher.scheduler.advanceUntilIdle()

        viewModel.toggleRead("A1")
        dispatcher.scheduler.advanceUntilIdle()

        assertEquals(setOf("A1"), (viewModel.uiState.value as LibraryUiState.Content).readIds)

        viewModel.toggleRead("A1")
        dispatcher.scheduler.advanceUntilIdle()

        assertTrue((viewModel.uiState.value as LibraryUiState.Content).readIds.isEmpty())
    }

    @Test
    fun addTagThenRemoveTagRoundTripsThroughUiState() = runTest {
        val viewModel = viewModel(repository())
        dispatcher.scheduler.advanceUntilIdle()

        viewModel.addTag("A1", "exam")
        dispatcher.scheduler.advanceUntilIdle()
        assertEquals(mapOf("A1" to listOf("exam")), (viewModel.uiState.value as LibraryUiState.Content).tagsByArticle)

        viewModel.removeTag("A1", "exam")
        dispatcher.scheduler.advanceUntilIdle()
        assertTrue((viewModel.uiState.value as LibraryUiState.Content).tagsByArticle.isEmpty())
    }

    // --- fixtures ------------------------------------------------------------------

    private suspend fun seedLedger(localStore: VmFakeLocalStore, articleJson: String) {
        val doc = StateDoc(value = json.parseToJsonElement("[$articleJson]"), updatedAt = "2026-08-29T00:00:00Z")
        localStore.putCatalogue(CONTENT_LEDGER_KEY, "2026-08-29T00:00:00Z", json.encodeToString(StateDoc.serializer(), doc))
    }

    private companion object {
        const val CONTENT_LEDGER_KEY = "synapse-admin-content-ledger-v4"

        val PUBLISHED_ARTICLE_JSON = """
            { "id":"A1","kind":"article","title":"Heart failure","subjectId":"SYS_CVS","status":"Published",
              "fields":{"Topic":"Heart"},"articleData":{"summary":"HF overview","sections":[]}}
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
