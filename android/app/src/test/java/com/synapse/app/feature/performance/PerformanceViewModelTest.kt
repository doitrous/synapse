package com.synapse.app.feature.performance

import com.synapse.app.core.api.LeaderboardApi
import com.synapse.app.core.api.LeaderboardMetric
import com.synapse.app.core.api.LeaderboardResponse
import com.synapse.app.core.api.LeaderboardRow
import com.synapse.app.core.cache.LocalStore
import com.synapse.app.core.cache.OutboxEntry
import com.synapse.app.core.model.AttemptRecord as ModelAttemptRecord
import com.synapse.app.core.qbank.AttemptRecord
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.ExperimentalCoroutinesApi
import kotlinx.coroutines.test.StandardTestDispatcher
import kotlinx.coroutines.test.resetMain
import kotlinx.coroutines.test.runTest
import kotlinx.coroutines.test.setMain
import kotlinx.serialization.json.Json
import org.junit.After
import org.junit.Assert.assertEquals
import org.junit.Assert.assertTrue
import org.junit.Before
import org.junit.Test
import java.io.IOException
import java.time.Instant

/**
 * [PerformanceViewModel] built against a real [PerformanceRepository] wired to
 * hand-written fakes — the same convention as `LibraryViewModelTest`.
 */
@OptIn(ExperimentalCoroutinesApi::class)
class PerformanceViewModelTest {

    private val dispatcher = StandardTestDispatcher()
    private val json = Json { ignoreUnknownKeys = true }
    private val now = Instant.parse("2026-08-13T09:00:00Z")

    @Before fun setUp() { Dispatchers.setMain(dispatcher) }
    @After fun tearDown() { Dispatchers.resetMain() }

    private fun viewModel(localStore: VmFakeLocalStore = VmFakeLocalStore(), api: VmFakeLeaderboardApi = VmFakeLeaderboardApi()): PerformanceViewModel {
        val repository = PerformanceRepository(localStore, api, json)
        return PerformanceViewModel(repository).apply { now = { this@PerformanceViewModelTest.now } }
    }

    @Test
    fun initLoadsPersonalStatsAndDefaultsToThePersonalTab() = runTest {
        val viewModel = viewModel()
        dispatcher.scheduler.advanceUntilIdle()

        val state = viewModel.uiState.value
        assertTrue(state is PerformanceUiState.Content)
        state as PerformanceUiState.Content
        assertEquals(PerformanceTab.Personal, state.tab)
        assertEquals(0, state.personal.attempts)
        // The leaderboard is never fetched until the Leaders tab is opened.
        assertEquals(LeaderboardUiState.Loading, state.leaderboard)
    }

    @Test
    fun personalStatsReflectStoredAttempts() = runTest {
        val localStore = VmFakeLocalStore()
        seedAttempt(localStore, "2026-08", sample("a1", "2026-08-01T10:00:00Z"))
        val viewModel = viewModel(localStore)
        dispatcher.scheduler.advanceUntilIdle()

        val state = viewModel.uiState.value as PerformanceUiState.Content
        assertEquals(1, state.personal.attempts)
    }

    @Test
    fun selectingLeadersTabTriggersTheLeaderboardFetchExactlyOnce() = runTest {
        val api = VmFakeLeaderboardApi()
        api.response = LeaderboardResponse(rows = listOf(LeaderboardRow(rank = 1, username = "a1")))
        val viewModel = viewModel(api = api)
        dispatcher.scheduler.advanceUntilIdle()

        viewModel.selectTab(PerformanceTab.Leaders)
        dispatcher.scheduler.advanceUntilIdle()

        val state = viewModel.uiState.value as PerformanceUiState.Content
        assertEquals(PerformanceTab.Leaders, state.tab)
        assertTrue(state.leaderboard is LeaderboardUiState.Loaded)
        assertEquals(1, api.callCount)

        // Switching tabs again does not refetch.
        viewModel.selectTab(PerformanceTab.Personal)
        viewModel.selectTab(PerformanceTab.Leaders)
        dispatcher.scheduler.advanceUntilIdle()
        assertEquals(1, api.callCount)
    }

    @Test
    fun offlineLeaderboardFetchSurfacesUnavailableWithoutCrashing() = runTest {
        val api = VmFakeLeaderboardApi()
        api.failure = IOException("offline")
        val viewModel = viewModel(api = api)
        dispatcher.scheduler.advanceUntilIdle()

        viewModel.selectTab(PerformanceTab.Leaders)
        dispatcher.scheduler.advanceUntilIdle()

        val state = viewModel.uiState.value as PerformanceUiState.Content
        assertEquals(LeaderboardUiState.Unavailable, state.leaderboard)
    }

    @Test
    fun selectingAMetricReloadsTheLeaderboardWithIt() = runTest {
        val api = VmFakeLeaderboardApi()
        api.response = LeaderboardResponse(rows = listOf(LeaderboardRow(rank = 1, username = "a1", accuracy = 0.9)))
        val viewModel = viewModel(api = api)
        dispatcher.scheduler.advanceUntilIdle()
        viewModel.selectTab(PerformanceTab.Leaders)
        dispatcher.scheduler.advanceUntilIdle()

        viewModel.selectMetric(LeaderboardMetric.PercentCorrect)
        dispatcher.scheduler.advanceUntilIdle()

        val state = viewModel.uiState.value as PerformanceUiState.Content
        assertEquals(LeaderboardMetric.PercentCorrect, state.metric)
        assertEquals(LeaderboardMetric.PercentCorrect, api.lastMetric)
        assertEquals(2, api.callCount)
    }

    // --- fixtures ------------------------------------------------------------------

    private suspend fun seedAttempt(localStore: VmFakeLocalStore, month: String, record: AttemptRecord) {
        localStore.attemptsById[record.id] = ModelAttemptRecord(
            id = record.id, month = month,
            payload = json.encodeToJsonElement(AttemptRecord.serializer(), record) as kotlinx.serialization.json.JsonObject,
        )
    }

    private fun sample(id: String, at: String) = AttemptRecord(
        id = id, at = at, itemId = "q1", subjectId = "cvs", topic = "Heart failure",
        difficulty = "Moderate", correct = true, sessionId = "s1",
    )
}

// --- Fakes --------------------------------------------------------------------

private class VmFakeLocalStore : LocalStore {
    val attemptsById = linkedMapOf<String, ModelAttemptRecord>()

    override suspend fun putCatalogue(key: String, updatedAt: String, json: String) {}
    override suspend fun catalogueUpdatedAt(key: String): String? = null
    override suspend fun getCatalogue(key: String): String? = null
    override suspend fun enqueue(key: String, json: String) {}
    override suspend fun pendingOutbox(): List<OutboxEntry> = emptyList()
    override suspend fun clearOutbox(key: String) {}
    override suspend fun putAttempts(items: List<ModelAttemptRecord>) { items.forEach { attemptsById[it.id] = it } }
    override suspend fun attempts(month: String): List<ModelAttemptRecord> = attemptsById.values.filter { it.month == month }
    override suspend fun allAttempts(): List<ModelAttemptRecord> = attemptsById.values.toList()
    override suspend fun putUserState(key: String, json: String, savedAt: String?, serverUpdatedAt: String?) {}
    override suspend fun getUserState(key: String): String? = null
    override suspend fun userStateSavedAt(key: String): String? = null
    override suspend fun clearAll() { attemptsById.clear() }
}

private class VmFakeLeaderboardApi : LeaderboardApi {
    var response: LeaderboardResponse = LeaderboardResponse()
    var failure: Exception? = null
    var lastMetric: LeaderboardMetric? = null
    var callCount = 0

    override suspend fun getLeaderboard(metric: LeaderboardMetric): LeaderboardResponse {
        callCount++
        lastMetric = metric
        failure?.let { throw it }
        return response
    }
}
