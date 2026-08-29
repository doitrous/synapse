package com.synapse.app.feature.dashboard

import com.synapse.app.core.api.SynapseApi
import com.synapse.app.core.cache.LocalStore
import com.synapse.app.core.cache.OutboxEntry
import com.synapse.app.core.model.AttemptRecord
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
import kotlinx.serialization.json.JsonNull
import org.junit.After
import org.junit.Assert.assertEquals
import org.junit.Assert.assertTrue
import org.junit.Before
import org.junit.Test
import java.io.IOException

/**
 * [DashboardViewModel] built on a real [DashboardRepository] + [SyncEngine], the latter
 * wired to hand-written fakes — same convention as
 * [com.synapse.app.feature.auth.AuthViewModelTest] (a real mid-layer object, faked only
 * at its lowest-level collaborators).
 */
@OptIn(ExperimentalCoroutinesApi::class)
class DashboardViewModelTest {

    private val dispatcher = StandardTestDispatcher()

    @Before fun setUp() { Dispatchers.setMain(dispatcher) }
    @After fun tearDown() { Dispatchers.resetMain() }

    private fun repository(api: VmFakeApi = VmFakeApi(), store: VmFakeStore = VmFakeStore()): DashboardRepository =
        DashboardRepository(store, SyncEngine(api, store, emptyList()))

    @Test fun initTriggersARefreshThatLandsOnContentWhenSyncSucceeds() = runTest {
        val viewModel = DashboardViewModel(repository())

        dispatcher.scheduler.advanceUntilIdle()

        val state = viewModel.uiState.value
        assertTrue(state is DashboardUiState.Content)
        assertTrue((state as DashboardUiState.Content).state.syncedOk)
    }

    @Test fun initTriggersARefreshThatLandsOnOfflineWhenSyncFails() = runTest {
        val api = VmFakeApi()
        val store = VmFakeStore()
        store.enqueue("synapse.notebook.notes", "{}")
        api.putUserStateError = IOException("no network")

        val viewModel = DashboardViewModel(repository(api, store))
        dispatcher.scheduler.advanceUntilIdle()

        assertTrue(viewModel.uiState.value is DashboardUiState.Offline)
    }

    @Test fun manualRefreshRunsAgainAndCanRecoverFromOffline() = runTest {
        val api = VmFakeApi()
        val store = VmFakeStore()
        store.enqueue("synapse.notebook.notes", "{}")
        api.putUserStateError = IOException("no network")

        val viewModel = DashboardViewModel(repository(api, store))
        dispatcher.scheduler.advanceUntilIdle()
        assertTrue(viewModel.uiState.value is DashboardUiState.Offline)

        api.putUserStateError = null
        viewModel.refresh()
        dispatcher.scheduler.advanceUntilIdle()

        assertTrue(viewModel.uiState.value is DashboardUiState.Content)
    }
}

private class VmFakeApi : SynapseApi {
    var putUserStateError: Throwable? = null
    override suspend fun session(): SessionDto = SessionDto("u")
    override suspend fun manifest(): Manifest = emptyMap()
    override suspend fun getState(key: String): StateDoc = StateDoc(JsonNull)
    override suspend fun getUserState(key: String): StateDoc = StateDoc(JsonNull)
    override suspend fun putUserState(key: String, doc: StateDoc) {
        putUserStateError?.let { throw it }
    }
    override suspend fun getAttempts(month: String): List<AttemptRecord> = emptyList()
    override suspend fun postAttempt(attempt: AttemptRecord) {}
}

private class VmFakeStore : LocalStore {
    private val catalogue = linkedMapOf<String, Pair<String, String>>()
    private val outbox = linkedMapOf<String, String>()
    private val attemptsById = linkedMapOf<String, AttemptRecord>()
    private val userState = linkedMapOf<String, Triple<String, String?, String?>>() // json, savedAt, serverUpdatedAt

    override suspend fun putCatalogue(key: String, updatedAt: String, json: String) { catalogue[key] = updatedAt to json }
    override suspend fun catalogueUpdatedAt(key: String): String? = catalogue[key]?.first
    override suspend fun getCatalogue(key: String): String? = catalogue[key]?.second
    override suspend fun enqueue(key: String, json: String) { outbox[key] = json }
    override suspend fun pendingOutbox(): List<OutboxEntry> = outbox.map { OutboxEntry(it.key, it.value) }
    override suspend fun clearOutbox(key: String) { outbox.remove(key) }
    override suspend fun putAttempts(items: List<AttemptRecord>) { items.forEach { attemptsById[it.id] = it } }
    override suspend fun attempts(month: String): List<AttemptRecord> = attemptsById.values.filter { it.month == month }
    override suspend fun putUserState(key: String, json: String, savedAt: String?, serverUpdatedAt: String?) {
        userState[key] = Triple(json, savedAt, serverUpdatedAt)
    }
    override suspend fun getUserState(key: String): String? = userState[key]?.first
    override suspend fun userStateSavedAt(key: String): String? = userState[key]?.second
    override suspend fun clearAll() { catalogue.clear(); outbox.clear(); attemptsById.clear(); userState.clear() }
}
