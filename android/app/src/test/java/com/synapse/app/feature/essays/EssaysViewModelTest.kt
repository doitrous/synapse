package com.synapse.app.feature.essays

import com.synapse.app.core.api.SynapseApi
import com.synapse.app.core.cache.LocalStore
import com.synapse.app.core.cache.OutboxEntry
import com.synapse.app.core.essays.markWritten
import com.synapse.app.core.essays.writtenFullyMarked
import com.synapse.app.core.model.AttemptRecord as ModelAttemptRecord
import com.synapse.app.core.model.Manifest
import com.synapse.app.core.model.SessionDto
import com.synapse.app.core.model.StateDoc
import com.synapse.app.core.sync.SyncEngine
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.ExperimentalCoroutinesApi
import kotlinx.coroutines.test.StandardTestDispatcher
import kotlinx.coroutines.test.resetMain
import kotlinx.coroutines.test.runTest
import kotlinx.coroutines.test.setMain
import kotlinx.serialization.json.Json
import kotlinx.serialization.json.JsonNull
import org.junit.After
import org.junit.Assert.assertEquals
import org.junit.Assert.assertNull
import org.junit.Assert.assertTrue
import org.junit.Before
import org.junit.Test
import java.time.Instant

/**
 * [EssaysViewModel] built against a real [EssaysRepository] + [SyncEngine], the
 * latter wired to hand-written fakes — same convention as
 * `LibraryViewModelTest`/`EssaysRepositoryTest`.
 */
@OptIn(ExperimentalCoroutinesApi::class)
class EssaysViewModelTest {

    private val dispatcher = StandardTestDispatcher()
    private val json = Json { ignoreUnknownKeys = true }
    private val now = Instant.parse("2026-08-29T12:00:00Z")

    @Before fun setUp() { Dispatchers.setMain(dispatcher) }
    @After fun tearDown() { Dispatchers.resetMain() }

    private fun repository(localStore: VmFakeLocalStore = VmFakeLocalStore(), api: VmFakeApi = VmFakeApi()): EssaysRepository =
        EssaysRepository(localStore, SyncEngine(api, localStore, readableKeys = emptyList(), userStateKeys = emptyList()), json)

    private fun viewModel(repository: EssaysRepository): EssaysViewModel =
        EssaysViewModel(repository).apply { now = { this@EssaysViewModelTest.now } }

    // --- load ---------------------------------------------------------------------

    @Test
    fun initLoadsEmptyContentWhenNothingIsStoredAnywhere() = runTest {
        val viewModel = viewModel(repository())
        dispatcher.scheduler.advanceUntilIdle()

        val state = viewModel.uiState.value
        assertTrue(state is EssaysUiState.Content)
        state as EssaysUiState.Content
        assertTrue(state.essaysById.isEmpty())
        assertTrue(state.writtenById.isEmpty())
    }

    @Test
    fun loadProjectsAPublishedEssayAndWrittenQuestion() = runTest {
        val localStore = VmFakeLocalStore()
        seedLedger(localStore, "[$PUBLISHED_ESSAY_JSON,$PUBLISHED_WRITTEN_JSON]")
        val viewModel = viewModel(repository(localStore))
        dispatcher.scheduler.advanceUntilIdle()

        val state = viewModel.uiState.value as EssaysUiState.Content
        assertEquals(setOf("E1"), state.essaysById.keys)
        assertEquals(setOf("W1"), state.writtenById.keys)
    }

    // --- essay drafting / reveal / self-mark --------------------------------------

    @Test
    fun saveEssayDraftUpdatesUiStateImmediatelyButDoesNotPersistBeforeTheDebounceElapses() = runTest {
        val localStore = VmFakeLocalStore()
        val viewModel = viewModel(repository(localStore))
        dispatcher.scheduler.advanceUntilIdle()

        viewModel.saveEssayDraft("E1", "My answer")

        assertEquals("My answer", (viewModel.uiState.value as EssaysUiState.Content).essayAnswers.getValue("E1").text)
        assertNull(localStore.userState["synapse.essay.answers.v1"])
    }

    @Test
    fun saveEssayDraftPersistsOnceTheDebounceElapses() = runTest {
        val localStore = VmFakeLocalStore()
        val viewModel = viewModel(repository(localStore))
        dispatcher.scheduler.advanceUntilIdle()

        viewModel.saveEssayDraft("E1", "My answer")
        dispatcher.scheduler.advanceUntilIdle()

        val persisted = localStore.userState.getValue("synapse.essay.answers.v1").first
        assertTrue(persisted.contains("My answer"))
    }

    @Test
    fun retypingWithinTheDebounceWindowCoalescesIntoOneWrite() = runTest {
        val localStore = VmFakeLocalStore()
        val viewModel = viewModel(repository(localStore))
        dispatcher.scheduler.advanceUntilIdle()

        viewModel.saveEssayDraft("E1", "My")
        dispatcher.scheduler.advanceTimeBy(200)
        viewModel.saveEssayDraft("E1", "My answer")
        dispatcher.scheduler.advanceUntilIdle()

        val persisted = localStore.userState.getValue("synapse.essay.answers.v1").first
        assertTrue(persisted.contains("My answer"))
        assertTrue(!persisted.contains("\"My\""))
    }

    @Test
    fun revealEssayPersistsImmediatelyWithoutWaitingForTheDebounce() = runTest {
        val localStore = VmFakeLocalStore()
        val viewModel = viewModel(repository(localStore))
        dispatcher.scheduler.advanceUntilIdle()

        viewModel.revealEssay("E1")

        assertEquals(true, (viewModel.uiState.value as EssaysUiState.Content).essayAnswers.getValue("E1").revealed)

        dispatcher.scheduler.advanceUntilIdle()
        assertTrue(localStore.userState.containsKey("synapse.essay.answers.v1"))
    }

    @Test
    fun togglingEveryKeyPointMarksTheEssay() = runTest {
        val localStore = VmFakeLocalStore()
        seedLedger(localStore, "[$PUBLISHED_ESSAY_JSON]")
        val viewModel = viewModel(repository(localStore))
        dispatcher.scheduler.advanceUntilIdle()

        viewModel.toggleEssayPoint("E1", "kp-0")
        dispatcher.scheduler.advanceUntilIdle()

        val state = viewModel.uiState.value as EssaysUiState.Content
        val essay = state.essaysById.getValue("E1")
        val answer = state.essayAnswers.getValue("E1")
        assertEquals(listOf("kp-0"), answer.ticked)
        // Every key point (there is only one) is now ticked: fully covered.
        assertEquals(essay.keyPoints.map { it.id }.toSet(), answer.ticked?.toSet())
    }

    @Test
    fun togglingAnAlreadyTickedPointUntocksIt() = runTest {
        val viewModel = viewModel(repository())
        dispatcher.scheduler.advanceUntilIdle()
        viewModel.toggleEssayPoint("E1", "kp-0")
        dispatcher.scheduler.advanceUntilIdle()

        viewModel.toggleEssayPoint("E1", "kp-0")
        dispatcher.scheduler.advanceUntilIdle()

        assertTrue((viewModel.uiState.value as EssaysUiState.Content).essayAnswers.getValue("E1").ticked!!.isEmpty())
    }

    // --- written drafting / reveal / self-mark ------------------------------------

    @Test
    fun saveWrittenDraftUpdatesTheRightPartWithoutTouchingOthers() = runTest {
        val viewModel = viewModel(repository())
        dispatcher.scheduler.advanceUntilIdle()

        viewModel.saveWrittenDraft("W1", "p-a", "Answer A")
        viewModel.saveWrittenDraft("W1", "p-b", "Answer B")

        val text = (viewModel.uiState.value as EssaysUiState.Content).writtenAnswers.getValue("W1").text
        assertEquals("Answer A", text["p-a"])
        assertEquals("Answer B", text["p-b"])
    }

    @Test
    fun aFullyTickedRubricReportsMarkedThroughTheViewModelsOwnState() = runTest {
        val localStore = VmFakeLocalStore()
        seedLedger(localStore, "[$PUBLISHED_WRITTEN_JSON]")
        val viewModel = viewModel(repository(localStore))
        dispatcher.scheduler.advanceUntilIdle()

        viewModel.toggleWrittenPoint("W1", "p-a", "Femoral nerve")
        dispatcher.scheduler.advanceUntilIdle()

        val state = viewModel.uiState.value as EssaysUiState.Content
        val question = state.writtenById.getValue("W1")
        val answer = state.writtenAnswers.getValue("W1")
        assertTrue(writtenFullyMarked(answer.ticks, question.parts))
        val score = markWritten(answer.ticks, question.parts)!!
        assertEquals(4.0, score.marks, 0.0001)
        assertEquals(10, score.outOf)
    }

    // --- fixtures ------------------------------------------------------------------

    private suspend fun seedLedger(localStore: VmFakeLocalStore, itemsJson: String) {
        val doc = StateDoc(value = json.parseToJsonElement(itemsJson), updatedAt = "2026-08-29T00:00:00Z")
        localStore.putCatalogue(CONTENT_LEDGER_KEY, "2026-08-29T00:00:00Z", json.encodeToString(StateDoc.serializer(), doc))
    }

    private companion object {
        const val CONTENT_LEDGER_KEY = "synapse-admin-content-ledger-v4"

        val PUBLISHED_ESSAY_JSON = """
            { "id":"E1","kind":"essay","title":"Discuss heart failure","subjectId":"SYS_CVS","status":"Published",
              "essayData":{"prompt":"Discuss the pathophysiology of heart failure.",
                "keyPoints":[{"id":"kp-0","text":"Reduced ejection fraction"}],"examinerNote":"","modelAnswer":""}}
        """.trimIndent()

        // One part, one expected point, worth all 4 marks: ticking it fully marks the question.
        val PUBLISHED_WRITTEN_JSON = """
            { "id":"W1","kind":"question","title":"Femoral triangle","subjectId":"SYS_MSK","status":"Published",
              "questionData":{"format":"structured_written",
                "writtenParts":[{"id":"p-a","label":"a","prompt":"Enumerate.","marks":4,"expectedPoints":["Femoral nerve"]},
                                 {"id":"p-b","label":"b","prompt":"Describe.","marks":6,"expectedPoints":[]}]}}
        """.trimIndent()
    }
}

// --- Fakes --------------------------------------------------------------------

private class VmFakeLocalStore : LocalStore {
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

private class VmFakeApi : SynapseApi {
    override suspend fun session(): SessionDto = SessionDto("u")
    override suspend fun manifest(): Manifest = emptyMap()
    override suspend fun getState(key: String): StateDoc = StateDoc(JsonNull)
    override suspend fun getUserState(key: String): StateDoc = StateDoc(JsonNull)
    override suspend fun putUserState(key: String, doc: StateDoc) { /* unused */ }
}
