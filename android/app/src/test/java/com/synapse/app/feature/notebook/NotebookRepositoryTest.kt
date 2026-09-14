package com.synapse.app.feature.notebook

import com.synapse.app.core.cache.LocalStore
import com.synapse.app.core.cache.OutboxEntry
import com.synapse.app.core.model.Manifest
import com.synapse.app.core.model.SessionDto
import com.synapse.app.core.model.StateDoc
import com.synapse.app.core.notebook.Note
import com.synapse.app.core.sync.SyncEngine
import kotlinx.coroutines.test.runTest
import kotlinx.serialization.json.Json
import kotlinx.serialization.json.JsonNull
import org.junit.Assert.assertEquals
import org.junit.Assert.assertTrue
import org.junit.Before
import org.junit.Test
import java.time.Instant

private typealias ModelAttemptRecord = com.synapse.app.core.model.AttemptRecord

/**
 * [NotebookRepository] reads/writes the student's own notes over the durable
 * user-state store. A real [SyncEngine] is used against a fake in-memory
 * [LocalStore] so the write-through-then-read round-trip is actually
 * exercised, matching `EssaysRepositoryTest`.
 */
class NotebookRepositoryTest {

    private val json = Json { ignoreUnknownKeys = true }

    private lateinit var localStore: FakeLocalStore
    private lateinit var synapseApi: FakeSynapseApi
    private lateinit var syncEngine: SyncEngine
    private lateinit var repository: NotebookRepository

    @Before
    fun setup() {
        localStore = FakeLocalStore()
        synapseApi = FakeSynapseApi()
        syncEngine = SyncEngine(synapseApi, localStore, readableKeys = emptyList(), userStateKeys = emptyList())
        repository = NotebookRepository(localStore, syncEngine, json)
    }

    @Test
    fun notesIsEmptyWhenNothingIsStored() = runTest {
        assertTrue(repository.notes().isEmpty())
    }

    @Test
    fun saveThenNotesReflectsTheWriteWithNoRefresh() = runTest {
        val now = Instant.parse("2026-08-29T12:00:00Z")

        repository.save(Note(id = "n1", title = "First note", body = "Hello"), now)

        val saved = repository.notes().single()
        assertEquals("n1", saved.id)
        assertEquals("First note", saved.title)
        assertEquals(now.toString(), saved.updatedAt)
        // Write-through: SyncEngine.write hit putUserState synchronously, no
        // network round-trip needed to read it back.
        assertEquals(1, synapseApi.putCalls.size)
    }

    @Test
    fun savingASecondNoteLeavesTheFirstUntouched() = runTest {
        val now = Instant.parse("2026-08-29T12:00:00Z")
        repository.save(Note(id = "n1", title = "First"), now)

        repository.save(Note(id = "n2", title = "Second"), now.plusSeconds(60))

        val notes = repository.notes()
        assertEquals(2, notes.size)
        assertTrue(notes.any { it.id == "n1" && it.title == "First" })
        assertTrue(notes.any { it.id == "n2" && it.title == "Second" })
    }

    @Test
    fun savingAnExistingNoteIdOverwritesRatherThanDuplicating() = runTest {
        val now = Instant.parse("2026-08-29T12:00:00Z")
        repository.save(Note(id = "n1", title = "Draft"), now)

        repository.save(Note(id = "n1", title = "Final"), now.plusSeconds(60))

        val notes = repository.notes()
        assertEquals(1, notes.size)
        assertEquals("Final", notes.single().title)
    }

    @Test
    fun notesAreSortedNewestEditedFirst() = runTest {
        val t0 = Instant.parse("2026-08-29T12:00:00Z")
        repository.save(Note(id = "old", title = "Older"), t0)
        repository.save(Note(id = "new", title = "Newer"), t0.plusSeconds(60))

        val notes = repository.notes()
        assertEquals(listOf("new", "old"), notes.map { it.id })
    }

    @Test
    fun deleteRemovesOnlyTheGivenNote() = runTest {
        val now = Instant.parse("2026-08-29T12:00:00Z")
        repository.save(Note(id = "n1", title = "Keep"), now)
        repository.save(Note(id = "n2", title = "Remove"), now)

        repository.delete("n2", now)

        val notes = repository.notes()
        assertEquals(listOf("n1"), notes.map { it.id })
    }

    @Test
    fun aMalformedEntryInTheStoredArrayIsSkippedRatherThanFailingTheWholeList() = runTest {
        localStore.putUserState(
            "synapse.notebook.notes",
            """[{"id":"good","title":"Fine","updatedAt":"2026-08-29T00:00:00Z"}, {"nope":true}, 42]""",
            savedAt = null,
            serverUpdatedAt = null,
        )

        val notes = repository.notes()

        assertEquals(listOf("good"), notes.map { it.id })
    }
}

// --- Fakes --------------------------------------------------------------------

private class FakeLocalStore : LocalStore {
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

private class FakeSynapseApi : com.synapse.app.core.api.SynapseApi {
    val putCalls = mutableListOf<String>()

    override suspend fun session(): SessionDto = SessionDto("u")
    override suspend fun manifest(): Manifest = emptyMap()
    override suspend fun getState(key: String): StateDoc = StateDoc(JsonNull)
    override suspend fun getUserState(key: String): StateDoc = StateDoc(JsonNull)
    override suspend fun putUserState(key: String, doc: StateDoc) { putCalls += key }
    override suspend fun getAttempts(month: String): List<ModelAttemptRecord> = emptyList()
    override suspend fun postAttempt(attempt: ModelAttemptRecord) { /* unused */ }
}
