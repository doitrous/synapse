package com.synapse.app.feature.calendar

import com.synapse.app.core.cache.LocalStore
import com.synapse.app.core.cache.OutboxEntry
import com.synapse.app.core.calendar.StudyBlock
import com.synapse.app.core.model.AttemptRecord as ModelAttemptRecord
import com.synapse.app.core.model.Manifest
import com.synapse.app.core.model.SessionDto
import com.synapse.app.core.model.StateDoc
import com.synapse.app.core.sync.SyncEngine
import kotlinx.coroutines.test.runTest
import kotlinx.serialization.json.Json
import kotlinx.serialization.json.JsonNull
import org.junit.Assert.assertEquals
import org.junit.Assert.assertTrue
import org.junit.Before
import org.junit.Test
import java.time.Instant

/**
 * [CalendarRepository] reads the shared timetable catalogue and reads/writes
 * this student's own planned blocks over the durable user-state store. A
 * real [SyncEngine] is used against a fake in-memory [LocalStore] so the
 * write-through-then-read round-trip is actually exercised, matching
 * `PracticalRepositoryTest`/`LibraryRepositoryTest`.
 */
class CalendarRepositoryTest {

    private val json = Json { ignoreUnknownKeys = true }

    private lateinit var localStore: FakeLocalStore
    private lateinit var synapseApi: FakeSynapseApi
    private lateinit var syncEngine: SyncEngine
    private lateinit var repository: CalendarRepository

    @Before
    fun setup() {
        localStore = FakeLocalStore()
        synapseApi = FakeSynapseApi()
        syncEngine = SyncEngine(synapseApi, localStore, readableKeys = emptyList(), userStateKeys = emptyList())
        repository = CalendarRepository(localStore, syncEngine, json)
    }

    // --- blocks -------------------------------------------------------------

    @Test
    fun blocksIsEmptyWhenNothingIsStoredLocally() = runTest {
        assertTrue(repository.blocks().isEmpty())
    }

    @Test
    fun saveBlockThenBlocksReflectsTheWriteWithNoRefresh() = runTest {
        val now = Instant.parse("2026-09-10T12:00:00Z")

        repository.saveBlock(StudyBlock(id = "b1", title = "Heart failure reading", date = "2026-09-10", start = "17:00", end = "18:00"), now)

        val block = repository.blocks().single()
        assertEquals("Heart failure reading", block.title)
        // Write-through: SyncEngine.write hit putUserState synchronously, no network round-trip needed.
        assertEquals(1, synapseApi.putCalls.size)
    }

    @Test
    fun savingABlockWithAnExistingIdUpdatesItInPlaceRatherThanDuplicatingIt() = runTest {
        val now = Instant.parse("2026-09-10T12:00:00Z")
        repository.saveBlock(StudyBlock(id = "b1", title = "First draft", date = "2026-09-10", start = "17:00", end = "18:00"), now)

        repository.saveBlock(StudyBlock(id = "b1", title = "Renamed", date = "2026-09-10", start = "17:00", end = "18:00"), now)

        val blocks = repository.blocks()
        assertEquals(1, blocks.size)
        assertEquals("Renamed", blocks.single().title)
    }

    @Test
    fun deleteBlockRemovesItAndLeavesOthersUntouched() = runTest {
        val now = Instant.parse("2026-09-10T12:00:00Z")
        repository.saveBlock(StudyBlock(id = "b1", title = "Keep", date = "2026-09-10", start = "17:00", end = "18:00"), now)
        repository.saveBlock(StudyBlock(id = "b2", title = "Drop", date = "2026-09-11", start = "17:00", end = "18:00"), now)

        repository.deleteBlock("b2", now)

        assertEquals(listOf("Keep"), repository.blocks().map { it.title })
    }

    @Test
    fun deletingAnAbsentIdIsANoOp() = runTest {
        val now = Instant.parse("2026-09-10T12:00:00Z")
        repository.saveBlock(StudyBlock(id = "b1", title = "Keep", date = "2026-09-10", start = "17:00", end = "18:00"), now)

        repository.deleteBlock("does-not-exist", now)

        assertEquals(1, repository.blocks().size)
    }

    @Test
    fun oneMalformedStoredBlockIsSkippedRatherThanBlankingTheWholeList() = runTest {
        // A structurally-invalid entry (missing required fields) sits alongside a good one —
        // tolerant decode drops only the bad element, matching PracticalProjection's per-element runCatching.
        localStore.putUserState(
            "synapse.calendar.blocks",
            """[{"id":"good","title":"Fine","date":"2026-09-10","start":"09:00","end":"10:00"},{"notEvenABlock":true}]""",
            savedAt = null,
            serverUpdatedAt = null,
        )

        assertEquals(listOf("good"), repository.blocks().map { it.id })
    }

    // --- curriculumSessions / moduleScheduleStore -----------------------------

    @Test
    fun curriculumSessionsIsAlwaysEmptyUntilAUniversityYearScopeExists() = runTest {
        // Documented gap — see CalendarRepository.curriculumSessions's doc comment.
        assertTrue(repository.curriculumSessions().isEmpty())
    }

    @Test
    fun moduleScheduleStoreIsEmptyWhenNoCatalogueIsStoredLocally() = runTest {
        assertTrue(repository.moduleScheduleStore().isEmpty())
    }

    @Test
    fun moduleScheduleStoreDecodesTheCatalogueKeyedByModule() = runTest {
        seedCatalogue(
            MODULE_SCHEDULES_KEY,
            """{"kau:KAU_Y1:course-1":[{"id":"b1","type":"lecture","title":"Heart failure","date":"2026-09-10","startTime":"09:00","endTime":"10:00"}]}""",
        )

        val store = repository.moduleScheduleStore()

        assertEquals(1, store.getValue("kau:KAU_Y1:course-1").size)
        assertEquals("Heart failure", store.getValue("kau:KAU_Y1:course-1").single().title)
    }

    // --- fixtures ------------------------------------------------------------------

    private suspend fun seedCatalogue(key: String, valueJson: String) {
        val doc = StateDoc(value = json.parseToJsonElement(valueJson), updatedAt = "2026-09-10T00:00:00Z")
        localStore.putCatalogue(key, "2026-09-10T00:00:00Z", json.encodeToString(StateDoc.serializer(), doc))
    }

    private companion object {
        const val MODULE_SCHEDULES_KEY = "synapse-module-schedules-v1"
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
