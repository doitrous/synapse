package com.synapse.app.feature.practical

import com.synapse.app.core.cache.LocalStore
import com.synapse.app.core.cache.OutboxEntry
import com.synapse.app.core.model.Manifest
import com.synapse.app.core.model.SessionDto
import com.synapse.app.core.model.StateDoc
import com.synapse.app.core.practical.PracticalProgress
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
 * [PracticalRepository] projects the shared content ledger into practical
 * items and reads/writes the student's own progress over the durable
 * user-state store. A real [SyncEngine] is used against a fake in-memory
 * [LocalStore] so the write-through-then-read round-trip is actually
 * exercised, matching `LibraryRepositoryTest`/`QBankRepositoryTest`.
 */
class PracticalRepositoryTest {

    private val json = Json { ignoreUnknownKeys = true }

    private lateinit var localStore: FakeLocalStore
    private lateinit var synapseApi: FakeSynapseApi
    private lateinit var syncEngine: SyncEngine
    private lateinit var repository: PracticalRepository

    @Before
    fun setup() {
        localStore = FakeLocalStore()
        synapseApi = FakeSynapseApi()
        syncEngine = SyncEngine(synapseApi, localStore, readableKeys = emptyList(), userStateKeys = emptyList())
        repository = PracticalRepository(localStore, syncEngine, json)
    }

    // --- practicals -------------------------------------------------------------

    @Test
    fun practicalsIsEmptyWhenNoLedgerIsStoredLocally() = runTest {
        assertTrue(repository.practicals().isEmpty())
    }

    @Test
    fun practicalsProjectsAPublishedStationFromTheStoredStateDoc() = runTest {
        seedCatalogue(CONTENT_LEDGER_KEY, "[$PUBLISHED_STATION_JSON,$DRAFT_STATION_JSON]")

        val items = repository.practicals()

        assertEquals(1, items.size)
        assertEquals("os-cvs", items.single().id)
    }

    // --- progress ------------------------------------------------------------------

    @Test
    fun progressIsAllDefaultsWhenNothingStored() = runTest {
        val progress = repository.progress()
        assertTrue(progress.stations.isEmpty())
        assertTrue(progress.cases.isEmpty())
        assertTrue(progress.skills.isEmpty())
    }

    // --- recordStation --------------------------------------------------------------

    @Test
    fun recordStationThenProgressReflectsTheWriteWithNoRefresh() = runTest {
        val now = Instant.parse("2026-08-29T12:00:00Z")

        repository.recordStation("os-cvs", marks = 18, outOf = 24, checkedItems = listOf("a", "b"), now = now)

        val station = repository.progress().stations.getValue("os-cvs")
        assertEquals(18, station.bestMarks)
        assertEquals(24, station.outOf)
        // Write-through: SyncEngine.write hit putUserState synchronously, no network round-trip needed.
        assertEquals(1, synapseApi.putCalls.size)
    }

    @Test
    fun recordStationWithNoTickedItemsIsANoOp() = runTest {
        repository.recordStation("os-cvs", marks = 0, outOf = 24, checkedItems = emptyList(), now = Instant.parse("2026-08-29T12:00:00Z"))

        assertTrue(repository.progress().stations.isEmpty())
        assertTrue(synapseApi.putCalls.isEmpty())
    }

    @Test
    fun recordStationTwiceAccumulatesAttemptsAndKeepsTheBestScore() = runTest {
        val now = Instant.parse("2026-08-29T12:00:00Z")
        repository.recordStation("os-cvs", marks = 10, outOf = 24, checkedItems = listOf("a"), now = now)

        repository.recordStation("os-cvs", marks = 20, outOf = 24, checkedItems = listOf("a", "b"), now = now)

        val station = repository.progress().stations.getValue("os-cvs")
        assertEquals(2, station.attempts)
        assertEquals(20, station.bestMarks)
    }

    // --- recordCase ------------------------------------------------------------------

    @Test
    fun recordCaseThenProgressReflectsTheWrite() = runTest {
        val now = Instant.parse("2026-08-29T12:00:00Z")

        repository.recordCase("cc-chest", lastStep = 3, steps = 5, completed = false, now = now)

        val case = repository.progress().cases.getValue("cc-chest")
        assertEquals(PracticalProgress.CaseStatus.IN_PROGRESS, case.status)
        assertEquals(3, case.lastStep)
    }

    @Test
    fun recordCaseWithNoStepsIsANoOp() = runTest {
        repository.recordCase("cc-chest", lastStep = 0, steps = 0, completed = false, now = Instant.parse("2026-08-29T12:00:00Z"))

        assertTrue(repository.progress().cases.isEmpty())
    }

    // --- cycleSkill ------------------------------------------------------------------

    @Test
    fun cycleSkillMovesThroughNotStartedPractisedReadyThenBackToNotStarted() = runTest {
        val now = Instant.parse("2026-08-29T12:00:00Z")

        repository.cycleSkill("sk-bp", now)
        assertEquals(PracticalProgress.SkillStatus.PRACTISED, repository.progress().statusOfSkill("sk-bp"))

        repository.cycleSkill("sk-bp", now)
        assertEquals(PracticalProgress.SkillStatus.READY, repository.progress().statusOfSkill("sk-bp"))

        repository.cycleSkill("sk-bp", now)
        assertEquals(PracticalProgress.SkillStatus.NOT_STARTED, repository.progress().statusOfSkill("sk-bp"))
        assertTrue(repository.progress().skills.isEmpty())
    }

    // --- fixtures ------------------------------------------------------------------

    private suspend fun seedCatalogue(key: String, valueJson: String) {
        val doc = StateDoc(value = json.parseToJsonElement(valueJson), updatedAt = "2026-08-29T00:00:00Z")
        localStore.putCatalogue(key, "2026-08-29T00:00:00Z", json.encodeToString(StateDoc.serializer(), doc))
    }

    private companion object {
        const val CONTENT_LEDGER_KEY = "synapse-admin-content-ledger-v4"

        val PUBLISHED_STATION_JSON = """
            { "id":"os-cvs","kind":"practical","title":"Cardiovascular examination","subjectId":"cvs","status":"Published",
              "fields":{"Type":"OSCE station","Duration":"8","Marks":"24"},
              "practicalData":{"markSections":[{"id":"s1","title":"","items":["Washes hands"]}]}}
        """.trimIndent()

        val DRAFT_STATION_JSON = """
            { "id":"os-resp","kind":"practical","title":"Draft","subjectId":"resp","status":"Draft",
              "fields":{"Type":"OSCE station"},"practicalData":{}}
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
}
