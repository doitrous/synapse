package com.synapse.app.core.sync

import com.synapse.app.core.api.ApiError
import com.synapse.app.core.api.ApiException
import com.synapse.app.core.api.SynapseApi
import com.synapse.app.core.cache.LocalStore
import com.synapse.app.core.cache.OutboxEntry
import com.synapse.app.core.model.AttemptRecord
import com.synapse.app.core.model.Manifest
import com.synapse.app.core.model.SessionDto
import com.synapse.app.core.model.StateDoc
import kotlinx.coroutines.test.runTest
import kotlinx.serialization.json.JsonNull
import kotlinx.serialization.json.JsonPrimitive
import org.junit.Assert.assertEquals
import org.junit.Assert.assertFalse
import org.junit.Assert.assertNull
import org.junit.Assert.assertTrue
import org.junit.Test
import java.time.Instant
import kotlin.coroutines.cancellation.CancellationException

/** A fixed clock so the month used for attempt pulls is deterministic. */
private val NOW: Instant = Instant.parse("2026-08-15T00:00:00Z")

class SyncEngineTest {
    private val api = FakeApi()
    private val store = FakeStore()
    private val readable = listOf("synapse-admin-content-ledger-v4", "synapse-glossary-v1")
    private val userStateKeys = listOf("synapse.flashcards.decks.v1", "synapse.flashcards.dailyCounts.v1")
    private val engine = SyncEngine(api, store, readable, userStateKeys)

    @Test fun manifestDiffOnlyRefetchesChangedKeys() = runTest {
        store.catalogue["k1"] = "t1" to "{}"            // already have k1 at t1
        api.manifestMap = mapOf("k1" to "t1", "k2" to "t2")
        engine.refresh(NOW)
        assertEquals(listOf("k2"), api.fetchedStateKeys)  // only the changed key
        assertEquals("t2", store.catalogueUpdatedAt("k2"))
    }

    @Test fun manifest404FallsBackToFetchingAllReadableKeys() = runTest {
        api.manifestError = ApiException(ApiError.Retryable(RuntimeException("404")))
        engine.refresh(NOW)
        assertEquals(readable.toSet(), api.fetchedStateKeys.toSet())
    }

    @Test fun writeToSharedKeyIsRejected() = runTest {
        var threw = false
        try {
            engine.write("synapse-admin-content-ledger-v4", "{}", NOW)
        } catch (e: IllegalArgumentException) {
            threw = true
        }
        assertTrue(threw)
        assertTrue(store.outbox.isEmpty())
        assertTrue(api.putCalls.isEmpty())
    }

    @Test fun writeToUserKeyEnqueuesAndPuts() = runTest {
        engine.write("synapse.notebook.notes", "{\"a\":1}", NOW)
        assertEquals(listOf("synapse.notebook.notes"), api.putCalls)
        assertTrue(store.outbox.isEmpty())  // drained
    }

    @Test fun drainPushesAllPendingAndClears() = runTest {
        store.enqueue("synapse.notebook.a", "{}")
        store.enqueue("synapse.qbank.b", "{}")
        val result = engine.refresh(NOW)
        assertEquals(2, result.pushed)
        assertTrue(store.outbox.isEmpty())
    }

    @Test fun forbiddenEntryIsAbandoned() = runTest {
        store.enqueue("synapse.notebook.a", "{}")
        api.putErrors["synapse.notebook.a"] = ApiError.Forbidden
        val result = engine.refresh(NOW)
        assertEquals(0, result.pushed)
        assertEquals(1, result.abandoned)
        assertTrue(store.outbox.isEmpty())  // abandoned = cleared, never retried
    }

    @Test fun unauthorizedStopsDrainAndKeepsEntries() = runTest {
        store.enqueue("synapse.notebook.a", "{}")
        store.enqueue("synapse.qbank.b", "{}")
        api.putErrors["synapse.notebook.a"] = ApiError.Unauthorized
        val result = engine.refresh(NOW)
        assertTrue(result.stoppedUnauthorized)
        assertEquals(listOf("synapse.notebook.a"), api.putCalls)  // stopped after the first
        assertEquals(2, store.outbox.size)                        // nothing cleared
    }

    @Test fun retryableEntryIsKeptForNextDrain() = runTest {
        store.enqueue("synapse.notebook.a", "{}")
        api.putErrors["synapse.notebook.a"] = ApiError.Retryable(RuntimeException("network"))
        val result = engine.refresh(NOW)
        assertEquals(0, result.pushed)
        assertEquals(0, result.abandoned)
        assertFalse(result.stoppedUnauthorized)
        assertEquals(1, store.outbox.size)  // left in the outbox for the next drain
    }

    // --- write-through -------------------------------------------------------

    @Test fun writeIsReadableOfflineImmediatelyWithNoRefresh() = runTest {
        engine.write("synapse.flashcards.decks.v1", "{\"decks\":[1]}", NOW)

        // No refresh() was called -- getUserState must already see the write.
        assertEquals("{\"decks\":[1]}", store.getUserState("synapse.flashcards.decks.v1"))
        assertEquals(NOW.toString(), store.userStateSavedAt("synapse.flashcards.decks.v1"))
    }

    // --- pullUserState ---------------------------------------------------------

    @Test fun pullUserStateTakesTheServerCopyWhenNoLocalCopyExists() = runTest {
        api.states["synapse.flashcards.decks.v1"] =
            StateDoc(value = JsonPrimitive("server"), updatedAt = "2026-08-10T00:00:00Z")

        engine.refresh(NOW)

        assertEquals("\"server\"", store.getUserState("synapse.flashcards.decks.v1"))
        assertEquals("2026-08-10T00:00:00Z", store.userStateSavedAt("synapse.flashcards.decks.v1"))
    }

    @Test fun pullUserStateKeepsTheLocalCopyWhenItIsStrictlyNewerThanTheServer() = runTest {
        // Simulates a pending local write the outbox hasn't pushed yet.
        store.putUserState("synapse.flashcards.decks.v1", "{\"local\":true}", savedAt = "2026-08-20T00:00:00Z", serverUpdatedAt = null)
        api.states["synapse.flashcards.decks.v1"] =
            StateDoc(value = JsonPrimitive("stale-server"), updatedAt = "2026-08-10T00:00:00Z")

        engine.refresh(NOW)

        assertEquals("{\"local\":true}", store.getUserState("synapse.flashcards.decks.v1"))  // untouched
    }

    @Test fun pullUserStateSkipsAFailingKeyWithoutAbortingTheRest() = runTest {
        api.getUserStateErrors["synapse.flashcards.decks.v1"] = RuntimeException("network down")
        api.states["synapse.flashcards.dailyCounts.v1"] =
            StateDoc(value = JsonPrimitive("ok"), updatedAt = "2026-08-10T00:00:00Z")

        engine.refresh(NOW)  // must not throw

        assertNull(store.getUserState("synapse.flashcards.decks.v1"))
        assertEquals("\"ok\"", store.getUserState("synapse.flashcards.dailyCounts.v1"))
    }

    @Test fun pullUserStatePropagatesCancellation() = runTest {
        api.getUserStateErrors["synapse.flashcards.decks.v1"] = CancellationException("cancelled")
        var threw = false
        try {
            engine.refresh(NOW)
        } catch (e: CancellationException) {
            threw = true
        }
        assertTrue(threw)
    }
}

private class FakeApi : SynapseApi {
    var manifestMap: Map<String, String> = emptyMap()
    var manifestError: Throwable? = null
    val states = mutableMapOf<String, StateDoc>()
    val putErrors = mutableMapOf<String, ApiError>()
    val getUserStateErrors = mutableMapOf<String, Throwable>()
    val fetchedStateKeys = mutableListOf<String>()
    val putCalls = mutableListOf<String>()

    override suspend fun session(): SessionDto = SessionDto("u")
    override suspend fun manifest(): Manifest {
        manifestError?.let { throw it }
        return manifestMap
    }
    override suspend fun getState(key: String): StateDoc {
        fetchedStateKeys += key
        return states[key] ?: StateDoc(JsonNull, updatedAt = manifestMap[key])
    }
    override suspend fun getUserState(key: String): StateDoc {
        getUserStateErrors[key]?.let { throw it }
        return states[key] ?: StateDoc(JsonNull)
    }
    override suspend fun putUserState(key: String, doc: StateDoc) {
        putCalls += key
        putErrors[key]?.let { throw ApiException(it) }
    }
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
