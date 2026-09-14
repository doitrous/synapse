package com.synapse.app.feature.essays

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
 * [EssaysRepository] projects the shared content ledger into practice essays
 * and written exam questions, and reads/writes the student's own drafts,
 * reveals and self-marks over the durable user-state store. A real
 * [SyncEngine] is used against a fake in-memory [LocalStore] so the
 * write-through-then-read round-trip is actually exercised, matching
 * `LibraryRepositoryTest`.
 */
class EssaysRepositoryTest {

    private val json = Json { ignoreUnknownKeys = true }

    private lateinit var localStore: FakeLocalStore
    private lateinit var synapseApi: FakeSynapseApi
    private lateinit var syncEngine: SyncEngine
    private lateinit var repository: EssaysRepository

    @Before
    fun setup() {
        localStore = FakeLocalStore()
        synapseApi = FakeSynapseApi()
        syncEngine = SyncEngine(synapseApi, localStore, readableKeys = emptyList(), userStateKeys = emptyList())
        repository = EssaysRepository(localStore, syncEngine, json)
    }

    // --- essays / writtenQuestions -----------------------------------------------

    @Test
    fun essaysIsEmptyWhenNoLedgerIsStoredLocally() = runTest {
        assertTrue(repository.essays().isEmpty())
    }

    @Test
    fun essaysProjectsAPublishedEssayFromTheStoredStateDoc() = runTest {
        seedCatalogue("[$PUBLISHED_ESSAY_JSON,$DRAFT_ESSAY_JSON]")

        val essays = repository.essays()

        assertEquals(1, essays.size)
        assertEquals("E1", essays.single().id)
    }

    @Test
    fun writtenQuestionsProjectsAPublishedQuestionFromTheStoredStateDoc() = runTest {
        seedCatalogue("[$PUBLISHED_WRITTEN_JSON]")

        val written = repository.writtenQuestions()

        assertEquals(1, written.size)
        assertEquals("W1", written.single().id)
    }

    // --- essayAnswers / saveEssayAnswer -------------------------------------------

    @Test
    fun essayAnswersIsEmptyWhenNothingStored() = runTest {
        assertTrue(repository.essayAnswers().isEmpty())
    }

    @Test
    fun saveEssayAnswerThenEssayAnswersReflectsTheWriteWithNoRefresh() = runTest {
        val now = Instant.parse("2026-08-29T12:00:00Z")

        repository.saveEssayAnswer("E1", text = "My answer", ticked = null, revealed = null, now = now)

        val saved = repository.essayAnswers().getValue("E1")
        assertEquals("My answer", saved.text)
        assertEquals(null, saved.ticked)
        // Write-through: SyncEngine.write hit putUserState synchronously, no
        // network round-trip needed to read it back.
        assertEquals(1, synapseApi.putCalls.size)
    }

    @Test
    fun savingATickedAnswerRoundTripsTheTicksAndRevealedFlag() = runTest {
        val now = Instant.parse("2026-08-29T12:00:00Z")

        repository.saveEssayAnswer("E1", text = "My answer", ticked = listOf("kp-0"), revealed = true, now = now)

        val saved = repository.essayAnswers().getValue("E1")
        assertEquals(listOf("kp-0"), saved.ticked)
        assertEquals(true, saved.revealed)
    }

    @Test
    fun savingAnAnswerToOneEssayLeavesAnotherEssaysAnswerUntouched() = runTest {
        val now = Instant.parse("2026-08-29T12:00:00Z")
        repository.saveEssayAnswer("E1", text = "First", ticked = null, revealed = null, now = now)

        repository.saveEssayAnswer("E2", text = "Second", ticked = null, revealed = null, now = now)

        val answers = repository.essayAnswers()
        assertEquals("First", answers.getValue("E1").text)
        assertEquals("Second", answers.getValue("E2").text)
    }

    // --- writtenAnswers / saveWrittenAnswer ---------------------------------------

    @Test
    fun writtenAnswersIsEmptyWhenNothingStored() = runTest {
        assertTrue(repository.writtenAnswers().isEmpty())
    }

    @Test
    fun saveWrittenAnswerThenWrittenAnswersReflectsTheWriteWithNoRefresh() = runTest {
        val now = Instant.parse("2026-08-29T12:00:00Z")

        repository.saveWrittenAnswer(
            "W1",
            text = mapOf("p-a" to "My part-a answer"),
            ticks = mapOf("p-a" to listOf("Femoral nerve")),
            revealed = true,
            now = now,
        )

        val saved = repository.writtenAnswers().getValue("W1")
        assertEquals("My part-a answer", saved.text.getValue("p-a"))
        assertEquals(listOf("Femoral nerve"), saved.ticks?.get("p-a"))
        assertEquals(true, saved.revealed)
        assertEquals(1, synapseApi.putCalls.size)
    }

    // --- fixtures ------------------------------------------------------------------

    private suspend fun seedCatalogue(valueJson: String) {
        val doc = StateDoc(value = json.parseToJsonElement(valueJson), updatedAt = "2026-08-29T00:00:00Z")
        localStore.putCatalogue(CONTENT_LEDGER_KEY, "2026-08-29T00:00:00Z", json.encodeToString(StateDoc.serializer(), doc))
    }

    private companion object {
        const val CONTENT_LEDGER_KEY = "synapse-admin-content-ledger-v4"

        val PUBLISHED_ESSAY_JSON = """
            { "id":"E1","kind":"essay","title":"Discuss heart failure","subjectId":"SYS_CVS","status":"Published",
              "essayData":{"prompt":"Discuss the pathophysiology of heart failure.",
                "keyPoints":[{"id":"kp-0","text":"Reduced ejection fraction"}],"examinerNote":"","modelAnswer":""}}
        """.trimIndent()

        val DRAFT_ESSAY_JSON = """
            { "id":"E2","kind":"essay","title":"Draft","subjectId":"SYS_CVS","status":"Draft",
              "essayData":{"prompt":"x","keyPoints":[{"id":"kp-0","text":"x"}],"examinerNote":"","modelAnswer":""}}
        """.trimIndent()

        val PUBLISHED_WRITTEN_JSON = """
            { "id":"W1","kind":"question","title":"Femoral triangle","subjectId":"SYS_MSK","status":"Published",
              "questionData":{"format":"structured_written",
                "writtenParts":[{"id":"p-a","label":"a","prompt":"Enumerate.","marks":4,"expectedPoints":["Femoral nerve"]}]}}
        """.trimIndent()
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
    override suspend fun getState(key: String): StateDoc = StateDoc(kotlinx.serialization.json.JsonNull)
    override suspend fun getUserState(key: String): StateDoc = StateDoc(kotlinx.serialization.json.JsonNull)
    override suspend fun putUserState(key: String, doc: StateDoc) { putCalls += key }
    override suspend fun getAttempts(month: String): List<ModelAttemptRecord> = emptyList()
    override suspend fun postAttempt(attempt: ModelAttemptRecord) { /* unused */ }
}
