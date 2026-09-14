package com.synapse.app.feature.resources

import com.synapse.app.core.api.QBankApi
import com.synapse.app.core.api.VerifiedAttemptsBody
import com.synapse.app.core.cache.LocalStore
import com.synapse.app.core.cache.OutboxEntry
import com.synapse.app.core.media.ResourceFileCache
import com.synapse.app.core.model.Manifest
import com.synapse.app.core.model.SessionDto
import com.synapse.app.core.model.StateDoc
import com.synapse.app.core.sync.SyncEngine
import kotlinx.coroutines.test.runTest
import kotlinx.serialization.json.Json
import okhttp3.ResponseBody
import okhttp3.ResponseBody.Companion.toResponseBody
import org.junit.Assert.assertEquals
import org.junit.Assert.assertTrue
import org.junit.Before
import org.junit.Rule
import org.junit.Test
import org.junit.rules.TemporaryFolder
import java.time.Instant

private typealias ModelAttemptRecord = com.synapse.app.core.model.AttemptRecord

/**
 * [ResourcesRepository] projects the shared content ledger + evidence
 * registry into student-facing resources, and reads/writes the student's own
 * saved list over the durable user-state store. A real [SyncEngine] is used
 * against a fake in-memory [LocalStore] so the write-through-then-read
 * round-trip is actually exercised, matching `LibraryRepositoryTest`.
 */
class ResourcesRepositoryTest {

    @get:Rule
    val tempFolder = TemporaryFolder()

    private val json = Json { ignoreUnknownKeys = true }

    private lateinit var localStore: FakeLocalStore
    private lateinit var synapseApi: FakeSynapseApi
    private lateinit var syncEngine: SyncEngine
    private lateinit var qbankApi: FakeQBankApi
    private lateinit var fileCache: ResourceFileCache
    private lateinit var repository: ResourcesRepository

    @Before
    fun setup() {
        localStore = FakeLocalStore()
        synapseApi = FakeSynapseApi()
        syncEngine = SyncEngine(synapseApi, localStore, readableKeys = emptyList(), userStateKeys = emptyList())
        qbankApi = FakeQBankApi()
        fileCache = ResourceFileCache(tempFolder.newFolder("resources-repo-test"), qbankApi)
        repository = ResourcesRepository(localStore, syncEngine, fileCache, json)
    }

    // --- resources -------------------------------------------------------------

    @Test
    fun resourcesIsEmptyWhenNoLedgerIsStoredLocally() = runTest {
        assertTrue(repository.resources().isEmpty())
    }

    @Test
    fun resourcesProjectsAPublishedResourceAndMarksItOpenableFromTheEvidenceRegistry() = runTest {
        seedCatalogue(CONTENT_LEDGER_KEY, "[$PUBLISHED_RESOURCE_JSON]")
        seedCatalogue(EVIDENCE_KEY, """{ "resources": [ { "id":"r-kc","title":"Kumar & Clark","mediaType":"pdf","pageCount":812,"storageKey":"abc" } ] }""")

        val resources = repository.resources()

        assertEquals(1, resources.size)
        val resource = resources.single()
        assertEquals("r-kc", resource.id)
        assertTrue(resource.hasFile)
        assertEquals("pdf", resource.mediaType)
        assertEquals(812, resource.pageCount)
    }

    @Test
    fun aCataloguedResourceWithNothingInTheEvidenceRegistryIsNotOpenable() = runTest {
        seedCatalogue(CONTENT_LEDGER_KEY, "[$PUBLISHED_RESOURCE_JSON]")
        // No evidence catalogue stored at all.

        val resource = repository.resources().single()

        assertEquals(false, resource.hasFile)
    }

    // --- bookmarks / toggleBookmark ---------------------------------------------

    @Test
    fun bookmarksIsEmptyWhenNothingStored() = runTest {
        assertTrue(repository.bookmarks().isEmpty())
    }

    @Test
    fun toggleBookmarkThenBookmarksReflectsTheWriteWithNoRefresh() = runTest {
        val now = Instant.parse("2026-08-29T12:00:00Z")

        repository.toggleBookmark("r-kc", now)

        assertEquals(setOf("r-kc"), repository.bookmarks())
        // Write-through: SyncEngine.write hit putUserState synchronously, no
        // network round-trip needed to read it back.
        assertEquals(1, synapseApi.putCalls.size)
    }

    @Test
    fun togglingAnAlreadySavedResourceRemovesIt() = runTest {
        val now = Instant.parse("2026-08-29T12:00:00Z")
        repository.toggleBookmark("r-kc", now)

        repository.toggleBookmark("r-kc", now)

        assertTrue(repository.bookmarks().isEmpty())
    }

    // --- download -----------------------------------------------------------------

    @Test
    fun ensureDownloadedCachesTheDocumentThenIsDownloadedIsTrue() = runTest {
        qbankApi.medicalResourceBytes["r-kc"] = "pdf bytes".toResponseBody()

        assertEquals(false, repository.isDownloaded("r-kc"))
        val file = repository.ensureDownloaded("r-kc")

        assertEquals("pdf bytes", file.readText())
        assertTrue(repository.isDownloaded("r-kc"))
    }

    @Test
    fun removeDownloadDropsTheCachedFile() = runTest {
        qbankApi.medicalResourceBytes["r-kc"] = "pdf bytes".toResponseBody()
        repository.ensureDownloaded("r-kc")

        repository.removeDownload("r-kc")

        assertEquals(false, repository.isDownloaded("r-kc"))
    }

    // --- fixtures ------------------------------------------------------------------

    private suspend fun seedCatalogue(key: String, valueJson: String) {
        val doc = StateDoc(value = json.parseToJsonElement(valueJson), updatedAt = "2026-08-29T00:00:00Z")
        localStore.putCatalogue(key, "2026-08-29T00:00:00Z", json.encodeToString(StateDoc.serializer(), doc))
    }

    private companion object {
        const val CONTENT_LEDGER_KEY = "synapse-admin-content-ledger-v4"
        const val EVIDENCE_KEY = "synapse-medical-evidence-published-v1"

        val PUBLISHED_RESOURCE_JSON = """
            { "id":"r-kc","kind":"resource","title":"Kumar & Clark's Clinical Medicine","subjectId":"cvs",
              "status":"Published","fields":{"Type":"Book","Source":"Elsevier","Location":"Ch. 23 · Cardiology","Year":"2024"} }
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

private class FakeQBankApi : QBankApi {
    val medicalResourceBytes = mutableMapOf<String, ResponseBody>()

    override suspend fun postAttempts(body: VerifiedAttemptsBody) { /* unused */ }
    override suspend fun getMedia(id: String): ResponseBody = error("unused in these tests")
    override suspend fun getMedicalResource(id: String): ResponseBody =
        medicalResourceBytes[id] ?: error("no fixture registered for $id")
}
