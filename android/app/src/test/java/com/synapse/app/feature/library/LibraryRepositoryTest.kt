package com.synapse.app.feature.library

import com.synapse.app.core.cache.LocalStore
import com.synapse.app.core.cache.OutboxEntry
import com.synapse.app.core.model.Manifest
import com.synapse.app.core.model.SessionDto
import com.synapse.app.core.model.StateDoc
import com.synapse.app.core.sync.SyncEngine
import kotlinx.coroutines.test.runTest
import kotlinx.serialization.json.Json
import org.junit.Assert.assertEquals
import org.junit.Assert.assertTrue
import org.junit.Before
import org.junit.Test
import java.time.Instant

private typealias ModelAttemptRecord = com.synapse.app.core.model.AttemptRecord

/**
 * [LibraryRepository] projects the shared content ledger into articles and
 * the shared trees catalogue into browse structure, and reads/writes the
 * student's own read-state and personal tags over the durable user-state
 * store. A real [SyncEngine] is used against a fake in-memory [LocalStore] so
 * the write-through-then-read round-trip is actually exercised, matching
 * `FlashcardsRepositoryTest`/`QBankRepositoryTest`.
 */
class LibraryRepositoryTest {

    private val json = Json { ignoreUnknownKeys = true }

    private lateinit var localStore: FakeLocalStore
    private lateinit var synapseApi: FakeSynapseApi
    private lateinit var syncEngine: SyncEngine
    private lateinit var repository: LibraryRepository

    @Before
    fun setup() {
        localStore = FakeLocalStore()
        synapseApi = FakeSynapseApi()
        syncEngine = SyncEngine(synapseApi, localStore, readableKeys = emptyList(), userStateKeys = emptyList())
        repository = LibraryRepository(localStore, syncEngine, json)
    }

    // --- articles -------------------------------------------------------------

    @Test
    fun articlesIsEmptyWhenNoLedgerIsStoredLocally() = runTest {
        assertTrue(repository.articles().isEmpty())
    }

    @Test
    fun articlesProjectsAPublishedArticleFromTheStoredStateDoc() = runTest {
        seedCatalogue(CONTENT_LEDGER_KEY, "[$PUBLISHED_ARTICLE_JSON,$DRAFT_ARTICLE_JSON]")

        val articles = repository.articles()

        assertEquals(1, articles.size)
        assertEquals("A1", articles.single().id)
    }

    // --- trees ------------------------------------------------------------------

    @Test
    fun treesIsEmptyWhenNoCatalogueIsStoredLocally() = runTest {
        assertTrue(repository.trees().isEmpty())
    }

    @Test
    fun treesProjectsTheStoredScopeDocument() = runTest {
        seedCatalogue(TREES_KEY, """{ "trees": { "module:MOD_CVS": [ { "id":"n1","title":"Heart","articleIds":["A1"] } ] } }""")

        val trees = repository.trees()

        assertEquals(setOf("module:MOD_CVS"), trees.keys)
        assertEquals("n1", trees.getValue("module:MOD_CVS").single().id)
    }

    // --- readState / toggleRead --------------------------------------------------

    @Test
    fun readStateIsEmptyWhenNothingStored() = runTest {
        assertTrue(repository.readState().isEmpty())
    }

    @Test
    fun toggleReadThenReadStateReflectsTheWriteWithNoRefresh() = runTest {
        val now = Instant.parse("2026-08-29T12:00:00Z")

        repository.toggleRead("A1", now)

        assertEquals(mapOf("A1" to true), repository.readState())
        // Write-through: SyncEngine.write hit putUserState synchronously, no
        // network round-trip needed to read it back.
        assertEquals(1, synapseApi.putCalls.size)
    }

    @Test
    fun togglingAnAlreadyReadArticleRemovesItRatherThanStoringFalse() = runTest {
        val now = Instant.parse("2026-08-29T12:00:00Z")
        repository.toggleRead("A1", now)

        repository.toggleRead("A1", now)

        assertTrue(repository.readState().isEmpty())
    }

    // --- personalTags / addTag / removeTag ---------------------------------------

    @Test
    fun addTagThenPersonalTagsReflectsTheWrite() = runTest {
        val now = Instant.parse("2026-08-29T12:00:00Z")

        repository.addTag("A1", "exam", now)

        assertEquals(mapOf("A1" to listOf("exam")), repository.personalTags())
    }

    @Test
    fun addTagIsCaseInsensitiveAgainstAnExistingTag() = runTest {
        val now = Instant.parse("2026-08-29T12:00:00Z")
        repository.addTag("A1", "Exam", now)

        repository.addTag("A1", "exam", now)

        assertEquals(listOf("Exam"), repository.personalTags().getValue("A1"))
    }

    @Test
    fun removeTagDropsTheArticleEntryEntirelyOnceItsLastTagGoes() = runTest {
        val now = Instant.parse("2026-08-29T12:00:00Z")
        repository.addTag("A1", "exam", now)

        repository.removeTag("A1", "exam", now)

        assertTrue(repository.personalTags().isEmpty())
    }

    // --- fixtures ------------------------------------------------------------------

    private suspend fun seedCatalogue(key: String, valueJson: String) {
        val doc = StateDoc(value = json.parseToJsonElement(valueJson), updatedAt = "2026-08-29T00:00:00Z")
        localStore.putCatalogue(key, "2026-08-29T00:00:00Z", json.encodeToString(StateDoc.serializer(), doc))
    }

    private companion object {
        const val CONTENT_LEDGER_KEY = "synapse-admin-content-ledger-v4"
        const val TREES_KEY = "synapse-library-trees-v1"

        val PUBLISHED_ARTICLE_JSON = """
            { "id":"A1","kind":"article","title":"Heart failure","subjectId":"SYS_CVS","status":"Published",
              "articleData":{"summary":"HF overview","sections":[]}}
        """.trimIndent()

        val DRAFT_ARTICLE_JSON = """
            { "id":"A2","kind":"article","title":"Draft","subjectId":"SYS_CVS","status":"Draft",
              "articleData":{"summary":"x","sections":[]}}
        """.trimIndent()
    }
}

// --- Fakes --------------------------------------------------------------------

private class FakeLocalStore : LocalStore {
    val catalogue = linkedMapOf<String, Pair<String, String>>()
    val outbox = linkedMapOf<String, String>()
    val attemptsById = linkedMapOf<String, ModelAttemptRecord>()
    val userState = linkedMapOf<String, Triple<String, String?, String?>>() // json, savedAt, serverUpdatedAt

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
    override suspend fun getState(key: String): StateDoc = StateDoc(kotlinx.serialization.json.JsonNull)
    override suspend fun getUserState(key: String): StateDoc = StateDoc(kotlinx.serialization.json.JsonNull)
    override suspend fun putUserState(key: String, doc: StateDoc) { putCalls += key }
    override suspend fun getAttempts(month: String): List<ModelAttemptRecord> = emptyList()
    override suspend fun postAttempt(attempt: ModelAttemptRecord) { /* unused */ }
}
