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
import kotlinx.serialization.json.JsonObject
import kotlinx.serialization.json.JsonPrimitive
import org.junit.Assert.assertEquals
import org.junit.Assert.assertFalse
import org.junit.Assert.assertTrue
import org.junit.Test
import java.time.Instant

/** A fixed clock so the month used for attempt pulls is deterministic. */
private val NOW: Instant = Instant.parse("2026-08-15T00:00:00Z")

class SyncEngineTest {
    private val api = FakeApi()
    private val store = FakeStore()
    private val readable = listOf("synapse-admin-content-ledger-v4", "synapse-glossary-v1")
    private val engine = SyncEngine(api, store, readable)

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

    @Test fun attemptsMergeByIdNotReplace() = runTest {
        store.putAttempts(listOf(AttemptRecord("x", "2026-08", JsonObject(emptyMap()))))
        api.attemptList = mutableListOf(AttemptRecord("y", "2026-08", JsonObject(mapOf("s" to JsonPrimitive(1)))))
        engine.refresh(NOW)
        assertEquals(setOf("x", "y"), store.attemptsById.keys)  // merged, not replaced
    }
}

private class FakeApi : SynapseApi {
    var manifestMap: Map<String, String> = emptyMap()
    var manifestError: Throwable? = null
    val states = mutableMapOf<String, StateDoc>()
    var attemptList = mutableListOf<AttemptRecord>()
    val putErrors = mutableMapOf<String, ApiError>()
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
    override suspend fun getUserState(key: String): StateDoc = states[key] ?: StateDoc(JsonNull)
    override suspend fun putUserState(key: String, doc: StateDoc) {
        putCalls += key
        putErrors[key]?.let { throw ApiException(it) }
    }
    override suspend fun getAttempts(month: String): List<AttemptRecord> = attemptList.toList()
    override suspend fun postAttempt(attempt: AttemptRecord) { attemptList += attempt }
}

private class FakeStore : LocalStore {
    val catalogue = linkedMapOf<String, Pair<String, String>>()
    val outbox = linkedMapOf<String, String>()
    val attemptsById = linkedMapOf<String, AttemptRecord>()

    override suspend fun putCatalogue(key: String, updatedAt: String, json: String) { catalogue[key] = updatedAt to json }
    override suspend fun catalogueUpdatedAt(key: String): String? = catalogue[key]?.first
    override suspend fun getCatalogue(key: String): String? = catalogue[key]?.second
    override suspend fun enqueue(key: String, json: String) { outbox[key] = json }
    override suspend fun pendingOutbox(): List<OutboxEntry> = outbox.map { OutboxEntry(it.key, it.value) }
    override suspend fun clearOutbox(key: String) { outbox.remove(key) }
    override suspend fun putAttempts(items: List<AttemptRecord>) { items.forEach { attemptsById[it.id] = it } }
    override suspend fun attempts(month: String): List<AttemptRecord> = attemptsById.values.filter { it.month == month }
    override suspend fun clearAll() { catalogue.clear(); outbox.clear(); attemptsById.clear() }
}
