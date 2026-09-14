package com.synapse.app.feature.practical

import com.synapse.app.core.api.SynapseApi
import com.synapse.app.core.cache.LocalStore
import com.synapse.app.core.cache.OutboxEntry
import com.synapse.app.core.model.AttemptRecord as ModelAttemptRecord
import com.synapse.app.core.model.Manifest
import com.synapse.app.core.model.SessionDto
import com.synapse.app.core.model.StateDoc
import com.synapse.app.core.practical.PracticalProgress
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
 * [PracticalViewModel] built against a real [PracticalRepository] + [SyncEngine], the latter
 * wired to hand-written fakes — the same convention as `LibraryViewModelTest`.
 */
@OptIn(ExperimentalCoroutinesApi::class)
class PracticalViewModelTest {

    private val dispatcher = StandardTestDispatcher()
    private val json = Json { ignoreUnknownKeys = true }
    private val now = Instant.parse("2026-08-29T12:00:00Z")

    @Before fun setUp() { Dispatchers.setMain(dispatcher) }
    @After fun tearDown() { Dispatchers.resetMain() }

    private fun repository(localStore: VmFakeLocalStore = VmFakeLocalStore(), api: VmFakeApi = VmFakeApi()): PracticalRepository =
        PracticalRepository(localStore, SyncEngine(api, localStore, readableKeys = emptyList(), userStateKeys = emptyList()), json)

    private fun viewModel(repository: PracticalRepository): PracticalViewModel =
        PracticalViewModel(repository).apply { now = { this@PracticalViewModelTest.now } }

    @Test
    fun initLoadsEmptyContentWhenNothingIsStoredAnywhere() = runTest {
        val viewModel = viewModel(repository())
        dispatcher.scheduler.advanceUntilIdle()

        val state = viewModel.uiState.value
        assertTrue(state is PracticalUiState.Content)
        state as PracticalUiState.Content
        assertTrue(state.osceStations.isEmpty())
        assertTrue(state.clinicalCases.isEmpty())
        assertTrue(state.skills.isEmpty())
    }

    @Test
    fun loadGroupsPublishedItemsIntoTheirTabsByType() = runTest {
        val localStore = VmFakeLocalStore()
        seedLedger(localStore, "[$STATION_JSON,$CASE_JSON,$SKILL_JSON]")
        val viewModel = viewModel(repository(localStore))
        dispatcher.scheduler.advanceUntilIdle()

        val state = viewModel.uiState.value as PracticalUiState.Content
        assertEquals(listOf("os-cvs"), state.osceStations.map { it.id })
        assertEquals(listOf("cc-chest"), state.clinicalCases.map { it.id })
        assertEquals(listOf("sk-bp"), state.skills.map { it.id })
    }

    @Test
    fun finishRunUpdatesUiStateProgressWithNoManualReload() = runTest {
        val localStore = VmFakeLocalStore()
        seedLedger(localStore, "[$STATION_JSON]")
        val viewModel = viewModel(repository(localStore))
        dispatcher.scheduler.advanceUntilIdle()
        val station = (viewModel.uiState.value as PracticalUiState.Content).osceStations.single()

        viewModel.finishRun(station, ticked = setOf("s1-0"))
        dispatcher.scheduler.advanceUntilIdle()

        val progress = (viewModel.uiState.value as PracticalUiState.Content).progress
        assertEquals(1, progress.stations.getValue("os-cvs").bestMarks)
        assertEquals(1, progress.stations.getValue("os-cvs").outOf)
    }

    @Test
    fun advanceCaseUpdatesUiStateProgress() = runTest {
        val localStore = VmFakeLocalStore()
        seedLedger(localStore, "[$CASE_JSON]")
        val viewModel = viewModel(repository(localStore))
        dispatcher.scheduler.advanceUntilIdle()
        val case = (viewModel.uiState.value as PracticalUiState.Content).clinicalCases.single()

        viewModel.advanceCase(case, reachedStep = 1, completed = true)
        dispatcher.scheduler.advanceUntilIdle()

        val progress = (viewModel.uiState.value as PracticalUiState.Content).progress
        assertEquals(PracticalProgress.CaseStatus.COMPLETED, progress.cases.getValue("cc-chest").status)
    }

    @Test
    fun cycleSkillUpdatesUiStateProgress() = runTest {
        val viewModel = viewModel(repository())
        dispatcher.scheduler.advanceUntilIdle()

        viewModel.cycleSkill("sk-bp")
        dispatcher.scheduler.advanceUntilIdle()

        val progress = (viewModel.uiState.value as PracticalUiState.Content).progress
        assertEquals(PracticalProgress.SkillStatus.PRACTISED, progress.statusOfSkill("sk-bp"))
    }

    // --- fixtures ------------------------------------------------------------------

    private suspend fun seedLedger(localStore: VmFakeLocalStore, itemsJson: String) {
        val doc = StateDoc(value = json.parseToJsonElement(itemsJson), updatedAt = "2026-08-29T00:00:00Z")
        localStore.putCatalogue(CONTENT_LEDGER_KEY, "2026-08-29T00:00:00Z", json.encodeToString(StateDoc.serializer(), doc))
    }

    private companion object {
        const val CONTENT_LEDGER_KEY = "synapse-admin-content-ledger-v4"

        val STATION_JSON = """
            { "id":"os-cvs","kind":"practical","title":"Cardiovascular examination","subjectId":"cvs","status":"Published",
              "fields":{"Type":"OSCE station"},
              "practicalData":{"markSections":[{"id":"s1","title":"","items":["Washes hands"]}]}}
        """.trimIndent()

        val CASE_JSON = """
            { "id":"cc-chest","kind":"practical","title":"Acute chest pain","subjectId":"cvs","status":"Published",
              "fields":{"Type":"Clinical case"},
              "practicalData":{"decisions":[{"id":"d1","title":"","context":"c","question":"q","explanation":"a"}]}}
        """.trimIndent()

        val SKILL_JSON = """
            { "id":"sk-bp","kind":"practical","title":"Blood pressure measurement","subjectId":"cvs","status":"Published",
              "fields":{"Type":"Skills checklist"},"practicalData":{}}
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
    override suspend fun getAttempts(month: String): List<ModelAttemptRecord> = emptyList()
    override suspend fun postAttempt(attempt: ModelAttemptRecord) { /* unused */ }
}
