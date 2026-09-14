package com.synapse.app.feature.dashboard

import com.synapse.app.core.api.SynapseApi
import com.synapse.app.core.cache.LocalStore
import com.synapse.app.core.cache.OutboxEntry
import com.synapse.app.core.model.AttemptRecord
import com.synapse.app.core.model.Manifest
import com.synapse.app.core.model.SessionDto
import com.synapse.app.core.model.StateDoc
import com.synapse.app.core.sync.SyncEngine
import kotlinx.coroutines.test.runTest
import kotlinx.serialization.json.Json
import kotlinx.serialization.json.JsonNull
import kotlinx.serialization.json.JsonObject
import kotlinx.serialization.json.JsonPrimitive
import org.junit.Assert.assertEquals
import org.junit.Assert.assertFalse
import org.junit.Assert.assertNull
import org.junit.Assert.assertTrue
import org.junit.Test
import java.io.IOException
import java.time.Instant

/** A fixed instant so [DashboardState.lastSyncedAt] is deterministic. */
private val NOW: Instant = Instant.parse("2026-08-29T12:00:00Z")

/**
 * Builds a real [SyncEngine] from hand-written [SynapseApi]/[LocalStore] fakes — same
 * shape as [com.synapse.app.core.sync.SyncEngineTest]'s doubles — rather than faking
 * [SyncEngine] itself (it's a concrete class, and the project's convention is to fake
 * the lowest-level collaborator, see [com.synapse.app.feature.auth.AuthViewModelTest]).
 */
class DashboardRepositoryTest {

    @Test fun refreshSuccessReturnsASyncedOkState() = runTest {
        val store = FakeStore()
        val repository = DashboardRepository(store, SyncEngine(FakeApi(), store, emptyList(), emptyList()))

        val state = repository.refresh(NOW)

        assertTrue(state.syncedOk)
        assertEquals("Aug 29, 12:00 UTC", state.lastSyncedAt)
    }

    @Test fun aNetworkFailureDuringSyncReturnsAnOfflineStateInsteadOfThrowing() = runTest {
        val api = FakeApi()
        val store = FakeStore()
        // The outbox-drain path is the one spot an uncaught IOException from the API can
        // escape SyncEngine.refresh (every other internal call site swallows exceptions).
        store.enqueue("synapse.notebook.notes", "{}")
        api.putUserStateError = IOException("no network")
        val repository = DashboardRepository(store, SyncEngine(api, store, emptyList(), emptyList()))

        val state = repository.refresh(NOW)

        assertFalse(state.syncedOk)
        assertNull(state.lastSyncedAt)
    }

    @Test fun greetingNameIsReadFromTheProfileCatalogueWhenPresent() = runTest {
        val store = FakeStore()
        store.catalogue[PROFILE_CATALOGUE_KEY] = "t1" to Json.encodeToString(
            StateDoc.serializer(),
            StateDoc(value = JsonObject(mapOf("name" to JsonPrimitive("Nour")))),
        )
        val repository = DashboardRepository(store, SyncEngine(FakeApi(), store, emptyList(), emptyList()))

        val state = repository.refresh(NOW)

        assertEquals("Nour", state.greetingName)
    }

    @Test fun greetingNameIsNullWhenNoProfileCatalogueDocExists() = runTest {
        val store = FakeStore()
        val repository = DashboardRepository(store, SyncEngine(FakeApi(), store, emptyList(), emptyList()))

        val state = repository.refresh(NOW)

        assertNull(state.greetingName)
    }
}

private class FakeApi : SynapseApi {
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

private class FakeStore : LocalStore {
    val catalogue = linkedMapOf<String, Pair<String, String>>()
    val outbox = linkedMapOf<String, String>()
    val attemptsById = linkedMapOf<String, AttemptRecord>()
    val userState = linkedMapOf<String, Triple<String, String?, String?>>() // json, savedAt, serverUpdatedAt

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
