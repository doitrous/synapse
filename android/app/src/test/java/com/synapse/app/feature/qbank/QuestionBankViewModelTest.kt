package com.synapse.app.feature.qbank

import androidx.datastore.preferences.core.PreferenceDataStoreFactory
import androidx.datastore.preferences.preferencesDataStoreFile
import androidx.test.core.app.ApplicationProvider
import com.synapse.app.core.api.QBankApi
import com.synapse.app.core.api.SynapseApi
import com.synapse.app.core.api.VerifiedAttemptsBody
import com.synapse.app.core.cache.LocalStore
import com.synapse.app.core.cache.OutboxEntry
import com.synapse.app.core.media.MediaCache
import com.synapse.app.core.model.AttemptRecord
import com.synapse.app.core.model.Manifest
import com.synapse.app.core.model.SessionDto
import com.synapse.app.core.model.StateDoc
import com.synapse.app.core.qbank.QBankScope
import com.synapse.app.core.qbank.QBankSession
import com.synapse.app.core.sync.SyncEngine
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.ExperimentalCoroutinesApi
import kotlinx.coroutines.test.StandardTestDispatcher
import kotlinx.coroutines.test.resetMain
import kotlinx.coroutines.test.runTest
import kotlinx.coroutines.test.setMain
import kotlinx.serialization.json.Json
import kotlinx.serialization.json.JsonNull
import okhttp3.ResponseBody
import okhttp3.ResponseBody.Companion.toResponseBody
import org.junit.Assert.assertEquals
import org.junit.Assert.assertFalse
import org.junit.Assert.assertTrue
import org.junit.Before
import org.junit.After
import org.junit.Test
import org.junit.runner.RunWith
import org.robolectric.RobolectricTestRunner
import java.io.File
import java.time.Instant

/**
 * [QuestionBankViewModel] against a real [QBankRepository] (same convention as
 * [com.synapse.app.feature.dashboard.DashboardViewModelTest]: a real mid-layer object, faked
 * only at its lowest-level collaborators), seeded with a small published-question ledger.
 */
@OptIn(ExperimentalCoroutinesApi::class)
@RunWith(RobolectricTestRunner::class)
class QuestionBankViewModelTest {

    private val dispatcher = StandardTestDispatcher()
    private val json = Json { ignoreUnknownKeys = true }
    private lateinit var localStore: FakeLocalStore

    @Before fun setUp() {
        Dispatchers.setMain(dispatcher)
        localStore = FakeLocalStore()
    }

    @After fun tearDown() { Dispatchers.resetMain() }

    private fun repository(): QBankRepository {
        val api = FakeSynapseApi()
        val syncEngine = SyncEngine(api, localStore, readableKeys = emptyList(), userStateKeys = emptyList())
        val qbankApi = FakeQBankApi()
        val context = ApplicationProvider.getApplicationContext<android.content.Context>()
        val mediaCache = MediaCache(File(context.cacheDir, "qbank-vm-test-${System.nanoTime()}"), qbankApi)
        val pinsDataStore = PreferenceDataStoreFactory.create(
            produceFile = { context.preferencesDataStoreFile("qbank_vm_pins_test_${System.nanoTime()}") }
        )
        return QBankRepository(localStore, syncEngine, mediaCache, qbankApi, json, pinsDataStore)
    }

    private suspend fun seedTwoTopics() {
        val ledger = """
            [
              { "id":"Q1","kind":"question","title":"Q1?","subjectId":"SYS_CVS","status":"Published",
                "fields":{"Topic":"Heart failure"},
                "questionData":{"correctAnswer":"A","answers":[{"label":"A","text":"A","explanation":"A"},{"label":"B","text":"B","explanation":"B"}]}},
              { "id":"Q2","kind":"question","title":"Q2?","subjectId":"SYS_RESP","status":"Published",
                "fields":{"Topic":"Asthma"},
                "questionData":{"correctAnswer":"A","answers":[{"label":"A","text":"A","explanation":"A"},{"label":"B","text":"B","explanation":"B"}]}}
            ]
        """.trimIndent()
        val doc = StateDoc(value = json.parseToJsonElement(ledger), updatedAt = "2026-08-29T00:00:00Z")
        localStore.putCatalogue(CONTENT_LEDGER_KEY, "2026-08-29T00:00:00Z", json.encodeToString(StateDoc.serializer(), doc))
    }

    @Test fun loadsPublishedQuestionsAndTopicsOnInit() = runTest {
        seedTwoTopics()
        val viewModel = QuestionBankViewModel(repository())
        dispatcher.scheduler.advanceUntilIdle()

        val state = viewModel.uiState.value
        assertFalse(state.loading)
        assertEquals(2, state.questions.size)
        assertEquals(2, state.topics.size)
    }

    @Test fun startWithEmptyScopeDoesNotEmitASessionBecauseThePoolIsEmpty() = runTest {
        seedTwoTopics()
        val viewModel = QuestionBankViewModel(repository())
        dispatcher.scheduler.advanceUntilIdle()

        viewModel.start() // scope is empty by default
        dispatcher.scheduler.advanceUntilIdle()

        assertEquals(null, viewModel.sessionStart.value)
    }

    @Test fun everythingPresetSelectsAllTopicsAndStartEmitsASession() = runTest {
        seedTwoTopics()
        val viewModel = QuestionBankViewModel(repository())
        viewModel.now = { Instant.parse("2026-08-29T12:00:00Z") }
        dispatcher.scheduler.advanceUntilIdle()

        viewModel.onPresetSelected(QBankPreset.Everything)
        val topics = viewModel.uiState.value.topics
        assertEquals(topics.map { QBankScope.topicKey(it.id) }.toSet(), viewModel.uiState.value.scope)
        assertEquals(2, viewModel.uiState.value.poolSize())

        viewModel.onLengthChange(10)
        viewModel.start()
        dispatcher.scheduler.advanceUntilIdle()

        val started = viewModel.sessionStart.value
        assertTrue(started != null)
        assertEquals(2, started!!.session.questions.size) // length 10 capped by pool size of 2
        assertEquals(QBankSession.Mode.Tutor, started.session.mode)
    }

    @Test fun weakPresetSetsModeAndLengthButLeavesScopeAlone() = runTest {
        seedTwoTopics()
        val viewModel = QuestionBankViewModel(repository())
        dispatcher.scheduler.advanceUntilIdle()

        viewModel.onPresetSelected(QBankPreset.Weak)

        val state = viewModel.uiState.value
        assertEquals(QBankSession.Mode.Tutor, state.mode)
        assertEquals(10, state.length)
        assertTrue(state.scope.isEmpty()) // no weakness signal to draw from -- documented, not fabricated
    }

    // --- Revise hub: collections derived from flags/attempts/manifests -------

    @Test fun flaggedSourceNarrowsStartToPersistedFlags() = runTest {
        seedTwoTopics()
        val repo = repository()
        repo.setFlaggedIds(setOf("Q1"), Instant.parse("2026-08-29T00:00:00Z"))
        val viewModel = QuestionBankViewModel(repo)
        dispatcher.scheduler.advanceUntilIdle()

        assertEquals(listOf("Q1"), viewModel.uiState.value.flaggedQuestions.map { it.id })

        viewModel.onSourceChange(QuestionSource.Flagged)
        viewModel.onPresetSelected(QBankPreset.Everything) // selects every topic
        assertEquals(1, viewModel.uiState.value.poolSize()) // only Q1's topic has a flagged question
    }

    @Test fun incorrectSourceReflectsTheLatestVerdictOnly() = runTest {
        seedTwoTopics()
        val repo = repository()
        val now = Instant.parse("2026-08-29T00:00:00Z")
        repo.recordAttempts(listOf(attempt("s1", "Q1", correct = false, at = "2026-08-29T00:00:00Z")), now)
        val viewModel = QuestionBankViewModel(repo)
        dispatcher.scheduler.advanceUntilIdle()

        assertEquals(listOf("Q1"), viewModel.uiState.value.incorrectQuestions.map { it.id })

        // Getting it right afterwards takes it back out.
        repo.recordAttempts(listOf(attempt("s2", "Q1", correct = true, at = "2026-08-29T01:00:00Z")), now)
        viewModel.load()
        dispatcher.scheduler.advanceUntilIdle()
        assertTrue(viewModel.uiState.value.incorrectQuestions.isEmpty())
    }

    @Test fun omittedSourceIsManifestMinusActuallyAnswered() = runTest {
        seedTwoTopics()
        val repo = repository()
        val now = Instant.parse("2026-08-29T00:00:00Z")
        repo.recordSessionManifest("s1", listOf("Q1", "Q2"), now)
        repo.recordAttempts(listOf(attempt("s1", "Q1", correct = true, at = "2026-08-29T00:00:00Z")), now)
        val viewModel = QuestionBankViewModel(repo)
        dispatcher.scheduler.advanceUntilIdle()

        assertEquals(listOf("Q2"), viewModel.uiState.value.omittedQuestions.map { it.id })
    }

    @Test fun previousTestsListsFinishedSessionsNewestFirst() = runTest {
        seedTwoTopics()
        val repo = repository()
        repo.recordAttempts(listOf(attempt("s1", "Q1", correct = true, at = "2026-08-29T00:00:00Z")), Instant.parse("2026-08-29T00:00:00Z"))
        repo.recordAttempts(listOf(attempt("s2", "Q2", correct = false, at = "2026-08-30T00:00:00Z")), Instant.parse("2026-08-30T00:00:00Z"))
        val viewModel = QuestionBankViewModel(repo)
        dispatcher.scheduler.advanceUntilIdle()

        assertEquals(listOf("s2", "s1"), viewModel.uiState.value.previousTests.map { it.sessionId })
    }

    @Test fun testTheseBuildsExactlyThoseQuestionsAndFilesManifestAndName() = runTest {
        seedTwoTopics()
        val repo = repository()
        val viewModel = QuestionBankViewModel(repo).also { it.now = { Instant.parse("2026-08-29T12:00:00Z") } }
        dispatcher.scheduler.advanceUntilIdle()

        viewModel.testThese(viewModel.uiState.value.questions, "My picks")
        dispatcher.scheduler.advanceUntilIdle()

        val started = viewModel.sessionStart.value
        assertTrue(started != null)
        assertEquals(2, started!!.session.questions.size)
        assertEquals("My picks", repo.sessionNames()[started.sessionId])
        assertEquals(setOf("Q1", "Q2"), repo.sessionManifests()[started.sessionId]?.toSet())
    }

    @Test fun testScopePullsInUnseenQuestionsFromTheSameTopic() = runTest {
        val repo = repository()
        val ledger = """
            [
              { "id":"Q1","kind":"question","title":"Q1?","subjectId":"SYS_CVS","status":"Published",
                "fields":{"Topic":"Heart failure"},
                "questionData":{"correctAnswer":"A","answers":[{"label":"A","text":"A","explanation":"A"},{"label":"B","text":"B","explanation":"B"}]}},
              { "id":"Q2","kind":"question","title":"Q2?","subjectId":"SYS_CVS","status":"Published",
                "fields":{"Topic":"Heart failure"},
                "questionData":{"correctAnswer":"A","answers":[{"label":"A","text":"A","explanation":"A"},{"label":"B","text":"B","explanation":"B"}]}}
            ]
        """.trimIndent()
        val doc = StateDoc(value = json.parseToJsonElement(ledger), updatedAt = "2026-08-29T00:00:00Z")
        localStore.putCatalogue(CONTENT_LEDGER_KEY, "2026-08-29T00:00:00Z", json.encodeToString(StateDoc.serializer(), doc))
        val viewModel = QuestionBankViewModel(repo).also { it.now = { Instant.parse("2026-08-29T12:00:00Z") } }
        dispatcher.scheduler.advanceUntilIdle()

        val q1 = viewModel.uiState.value.questions.single { it.id == "Q1" }
        viewModel.testScope(listOf(q1), "Flagged")
        dispatcher.scheduler.advanceUntilIdle()

        // Q2 was never in the collection handed to testScope, but shares Q1's topic.
        assertEquals(setOf("Q1", "Q2"), viewModel.sessionStart.value!!.session.questions.map { it.id }.toSet())
    }

    @Test fun retakeSameRebuildsThatSessionsQuestionsUnderARetakeName() = runTest {
        seedTwoTopics()
        val repo = repository()
        val now = Instant.parse("2026-08-29T00:00:00Z")
        repo.recordAttempts(listOf(attempt("s1", "Q1", correct = true, at = "2026-08-29T00:00:00Z")), now)
        repo.renameSession("s1", "Cardio drill", now)
        val viewModel = QuestionBankViewModel(repo).also { it.now = { now } }
        dispatcher.scheduler.advanceUntilIdle()

        viewModel.retakeSame("s1")
        dispatcher.scheduler.advanceUntilIdle()

        val started = viewModel.sessionStart.value
        assertEquals(listOf("Q1"), started!!.session.questions.map { it.id })
        assertEquals("Cardio drill · retake", repo.sessionNames()[started.sessionId])
    }

    @Test fun retakeScopeDrawsFromEveryQuestionInTheSameSubjects() = runTest {
        seedTwoTopics()
        val repo = repository()
        val now = Instant.parse("2026-08-29T00:00:00Z")
        repo.recordAttempts(listOf(attempt("s1", "Q1", correct = true, at = "2026-08-29T00:00:00Z")), now)
        val viewModel = QuestionBankViewModel(repo).also { it.now = { now } }
        dispatcher.scheduler.advanceUntilIdle()

        val summary = viewModel.uiState.value.previousTests.single()
        viewModel.retakeScope(summary)
        dispatcher.scheduler.advanceUntilIdle()

        // s1 only ever attempted Q1 (subject SYS_CVS); Q2 is a different subject.
        assertEquals(listOf("Q1"), viewModel.sessionStart.value!!.session.questions.map { it.id })
    }

    @Test fun renameSessionPersistsTheNewName() = runTest {
        seedTwoTopics()
        val repo = repository()
        val now = Instant.parse("2026-08-29T00:00:00Z")
        repo.recordAttempts(listOf(attempt("s1", "Q1", correct = true, at = "2026-08-29T00:00:00Z")), now)
        val viewModel = QuestionBankViewModel(repo).also { it.now = { now } }
        dispatcher.scheduler.advanceUntilIdle()

        viewModel.renameSession("s1", "My test")
        dispatcher.scheduler.advanceUntilIdle()

        assertEquals("My test", viewModel.uiState.value.sessionNames["s1"])
    }

    @Test fun deleteSessionRemovesItFromPreviousTests() = runTest {
        seedTwoTopics()
        val repo = repository()
        val now = Instant.parse("2026-08-29T00:00:00Z")
        repo.recordAttempts(listOf(attempt("s1", "Q1", correct = true, at = "2026-08-29T00:00:00Z")), now)
        val viewModel = QuestionBankViewModel(repo).also { it.now = { now } }
        dispatcher.scheduler.advanceUntilIdle()
        assertEquals(1, viewModel.uiState.value.previousTests.size)

        viewModel.deleteSession("s1")
        dispatcher.scheduler.advanceUntilIdle()

        assertTrue(viewModel.uiState.value.previousTests.isEmpty())
    }

    @Test fun reviewCollectionPublishesAReadOnlyResultFromTheLatestAttempt() = runTest {
        seedTwoTopics()
        val repo = repository()
        val now = Instant.parse("2026-08-29T00:00:00Z")
        repo.recordAttempts(listOf(attempt("s1", "Q1", correct = true, at = "2026-08-29T00:00:00Z")), now)
        val viewModel = QuestionBankViewModel(repo).also { it.now = { now } }
        dispatcher.scheduler.advanceUntilIdle()

        val q1 = viewModel.uiState.value.questions.single { it.id == "Q1" }
        viewModel.reviewCollection(listOf(q1))

        val target = viewModel.reviewTarget.value
        assertEquals(1, target!!.result.correct)
        assertEquals(listOf(q1), target.questions)
    }

    @Test fun reviewSessionUsesOnlyThatSessionsOwnRecords() = runTest {
        seedTwoTopics()
        val repo = repository()
        val now = Instant.parse("2026-08-29T00:00:00Z")
        repo.recordAttempts(listOf(attempt("s1", "Q1", correct = true, at = "2026-08-29T00:00:00Z", selectedIndex = 0)), now)
        repo.recordAttempts(listOf(attempt("s2", "Q1", correct = false, at = "2026-08-30T00:00:00Z", selectedIndex = 1)), now)
        val viewModel = QuestionBankViewModel(repo).also { it.now = { now } }
        dispatcher.scheduler.advanceUntilIdle()

        viewModel.reviewSession("s1")

        val target = viewModel.reviewTarget.value
        assertEquals(1, target!!.result.correct)
    }

    private fun attempt(
        sessionId: String,
        itemId: String,
        correct: Boolean,
        at: String,
        selectedIndex: Int = 0,
    ) = com.synapse.app.core.qbank.AttemptRecord(
        id = "$sessionId:qbank:$itemId",
        at = at,
        surface = "qbank",
        itemId = itemId,
        subjectId = if (itemId == "Q1") "SYS_CVS" else "SYS_RESP",
        topic = if (itemId == "Q1") "Heart failure" else "Asthma",
        difficulty = "Moderate",
        correct = correct,
        sessionId = sessionId,
        selectedIndex = selectedIndex,
        correctIndex = 0,
    )

    // --- Fakes (mirroring QBankRepositoryTest) --------------------------------

    private class FakeLocalStore : LocalStore {
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
        override suspend fun allAttempts(): List<AttemptRecord> = attemptsById.values.toList()
        override suspend fun deleteAttempts(ids: List<String>) { ids.forEach { attemptsById.remove(it) } }
        override suspend fun putUserState(key: String, json: String, savedAt: String?, serverUpdatedAt: String?) {
            userState[key] = Triple(json, savedAt, serverUpdatedAt)
        }
        override suspend fun getUserState(key: String): String? = userState[key]?.first
        override suspend fun userStateSavedAt(key: String): String? = userState[key]?.second
        override suspend fun clearAll() { catalogue.clear(); outbox.clear(); attemptsById.clear(); userState.clear() }
    }

    private class FakeSynapseApi : SynapseApi {
        override suspend fun session(): SessionDto = SessionDto("u")
        override suspend fun manifest(): Manifest = emptyMap()
        override suspend fun getState(key: String): StateDoc = StateDoc(JsonNull)
        override suspend fun getUserState(key: String): StateDoc = StateDoc(JsonNull)
        override suspend fun putUserState(key: String, doc: StateDoc) {}
    }

    private class FakeQBankApi : QBankApi {
        override suspend fun postAttempts(body: VerifiedAttemptsBody) {}
        override suspend fun getMedia(id: String): ResponseBody = "bytes".toResponseBody(null)
    }
}
