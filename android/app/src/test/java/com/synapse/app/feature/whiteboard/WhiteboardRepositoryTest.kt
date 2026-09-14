package com.synapse.app.feature.whiteboard

import com.synapse.app.core.api.SynapseApi
import com.synapse.app.core.cache.LocalStore
import com.synapse.app.core.cache.OutboxEntry
import com.synapse.app.core.model.AttemptRecord as ModelAttemptRecord
import com.synapse.app.core.model.Manifest
import com.synapse.app.core.model.SessionDto
import com.synapse.app.core.model.StateDoc
import com.synapse.app.core.sync.SyncEngine
import com.synapse.app.core.whiteboard.BoardState
import com.synapse.app.core.whiteboard.LEGACY_WHITEBOARD_KEY
import com.synapse.app.core.whiteboard.Note
import com.synapse.app.core.whiteboard.WHITEBOARD_COLLECTION_KEY
import kotlinx.coroutines.test.runTest
import kotlinx.serialization.json.Json
import org.junit.Assert.assertEquals
import org.junit.Assert.assertTrue
import org.junit.Before
import org.junit.Test
import java.time.Instant

/**
 * [WhiteboardRepository] against a real [SyncEngine] wired to a fake in-memory
 * [LocalStore], so the write-through-then-read round trip (and the legacy-key
 * migration) is actually exercised — the same convention as `FlashcardsRepositoryTest`.
 */
class WhiteboardRepositoryTest {

    private val json = Json { ignoreUnknownKeys = true }
    private lateinit var localStore: FakeLocalStore
    private lateinit var synapseApi: FakeSynapseApi
    private lateinit var syncEngine: SyncEngine
    private lateinit var repository: WhiteboardRepository

    @Before
    fun setup() {
        localStore = FakeLocalStore()
        synapseApi = FakeSynapseApi()
        syncEngine = SyncEngine(synapseApi, localStore, readableKeys = emptyList(), userStateKeys = emptyList())
        repository = WhiteboardRepository(localStore, syncEngine, json)
    }

    @Test
    fun `a fresh install with neither key gets a durable default board`() = runTest {
        val now = Instant.parse("2026-08-29T12:00:00Z")

        val collection = repository.loadCollection(now)

        assertEquals(1, collection.boards.size)
        assertEquals("default", collection.activeBoardId)
        assertTrue(collection.migratedFromSingleBoard)
        // Persisted immediately, so a second load reads it back without re-migrating.
        assertEquals(1, synapseApi.putCalls.size)
    }

    @Test
    fun `a legacy single board is migrated into the collection exactly once`() = runTest {
        val legacy = BoardState(notes = listOf(Note(id = "n1", x = 12.5, y = 8.25, text = "old note", tone = "teal")))
        localStore.putUserState(LEGACY_WHITEBOARD_KEY, json.encodeToString(BoardState.serializer(), legacy), savedAt = null, serverUpdatedAt = null)

        val now = Instant.parse("2026-08-29T12:00:00Z")
        val collection = repository.loadCollection(now)

        assertEquals(1, collection.boards.size)
        assertEquals(legacy, collection.boards.single().state)

        // A second load reads the now-persisted collection directly — no re-migration, no second write.
        repository.loadCollection(now)
        assertEquals(1, synapseApi.putCalls.size)
    }

    @Test
    fun `saving then loading reflects the write with no network round trip needed`() = runTest {
        val now = Instant.parse("2026-08-29T12:00:00Z")
        val collection = repository.loadCollection(now)
        val moved = collection.copy(
            boards = collection.boards.map { it.copy(state = it.state.copy(notes = listOf(Note(id = "n1", x = 3.0, y = 4.0, text = "hi", tone = "paper")))) },
        )

        repository.saveCollection(now, moved)
        val reloaded = repository.loadCollection(now)

        assertEquals(listOf("n1"), reloaded.boards.single().state.notes.map { it.id })
    }

    @Test
    fun `a malformed stored collection does not crash the load`() = runTest {
        localStore.putUserState(WHITEBOARD_COLLECTION_KEY, "{not valid json", savedAt = null, serverUpdatedAt = null)

        val collection = repository.loadCollection(Instant.parse("2026-08-29T12:00:00Z"))

        assertEquals(1, collection.boards.size)
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
    override suspend fun allAttempts(): List<ModelAttemptRecord> = attemptsById.values.toList()
    override suspend fun putUserState(key: String, json: String, savedAt: String?, serverUpdatedAt: String?) {
        userState[key] = Triple(json, savedAt, serverUpdatedAt)
    }
    override suspend fun getUserState(key: String): String? = userState[key]?.first
    override suspend fun userStateSavedAt(key: String): String? = userState[key]?.second
    override suspend fun clearAll() { catalogue.clear(); outbox.clear(); attemptsById.clear(); userState.clear() }
}

private class FakeSynapseApi : SynapseApi {
    val putCalls = mutableListOf<String>()

    override suspend fun session(): SessionDto = SessionDto("u")
    override suspend fun manifest(): Manifest = emptyMap()
    override suspend fun getState(key: String): StateDoc = StateDoc(kotlinx.serialization.json.JsonNull)
    override suspend fun getUserState(key: String): StateDoc = StateDoc(kotlinx.serialization.json.JsonNull)
    override suspend fun putUserState(key: String, doc: StateDoc) { putCalls += key }
    override suspend fun getAttempts(month: String): List<ModelAttemptRecord> = emptyList()
    override suspend fun postAttempt(attempt: ModelAttemptRecord) { /* unused */ }
}
