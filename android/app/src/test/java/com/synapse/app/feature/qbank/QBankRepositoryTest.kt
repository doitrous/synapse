package com.synapse.app.feature.qbank

import androidx.datastore.preferences.core.PreferenceDataStoreFactory
import androidx.datastore.preferences.preferencesDataStoreFile
import androidx.test.core.app.ApplicationProvider
import com.synapse.app.core.api.QBankApi
import com.synapse.app.core.api.VerifiedAttemptsBody
import com.synapse.app.core.cache.LocalStore
import com.synapse.app.core.cache.OutboxEntry
import com.synapse.app.core.media.MediaCache
import com.synapse.app.core.model.Manifest
import com.synapse.app.core.model.SessionDto
import com.synapse.app.core.model.StateDoc
import com.synapse.app.core.qbank.AnswerOption
import com.synapse.app.core.qbank.AttemptRecord
import com.synapse.app.core.qbank.Question
import com.synapse.app.core.qbank.attemptsKey
import com.synapse.app.core.qbank.monthKey
import com.synapse.app.core.api.SynapseApi
import com.synapse.app.core.sync.SyncEngine
import kotlinx.coroutines.test.runTest
import kotlinx.serialization.builtins.ListSerializer
import kotlinx.serialization.json.Json
import kotlinx.serialization.json.JsonArray
import kotlinx.serialization.json.JsonNull
import okhttp3.ResponseBody
import okhttp3.ResponseBody.Companion.toResponseBody
import org.junit.Assert.assertEquals
import org.junit.Assert.assertFalse
import org.junit.Assert.assertTrue
import org.junit.Before
import org.junit.Test
import org.junit.runner.RunWith
import org.robolectric.RobolectricTestRunner
import java.io.File
import java.time.Instant

private typealias ModelAttemptRecord = com.synapse.app.core.model.AttemptRecord

/**
 * Task 5 (Plan 03 — Question Bank): the QBank data layer.
 *
 * [QBankRepository] projects the shared content ledger into student-facing
 * questions, records local + synced + best-effort-verified attempts, and
 * manages the per-device offline media pin bookkeeping.
 */
@RunWith(RobolectricTestRunner::class)
class QBankRepositoryTest {

    private val json = Json { ignoreUnknownKeys = true }

    private lateinit var localStore: FakeLocalStore
    private lateinit var synapseApi: FakeSynapseApi
    private lateinit var syncEngine: SyncEngine
    private lateinit var qbankApi: FakeQBankApi
    private lateinit var mediaCache: MediaCache
    private lateinit var repository: QBankRepository

    @Before
    fun setup() {
        localStore = FakeLocalStore()
        synapseApi = FakeSynapseApi()
        syncEngine = SyncEngine(synapseApi, localStore, readableKeys = emptyList(), userStateKeys = emptyList())
        qbankApi = FakeQBankApi()

        val context = ApplicationProvider.getApplicationContext<android.content.Context>()
        mediaCache = MediaCache(File(context.cacheDir, "qbank-media-test-${System.nanoTime()}"), qbankApi)

        val pinsDataStore = PreferenceDataStoreFactory.create(
            produceFile = { context.preferencesDataStoreFile("qbank_pins_test_${System.nanoTime()}") }
        )

        repository = QBankRepository(localStore, syncEngine, mediaCache, qbankApi, json, pinsDataStore)
    }

    // --- publishedQuestions / multiResponseQuestions ---------------------

    @Test
    fun publishedQuestionsIsEmptyWhenNoLedgerIsStoredLocally() = runTest {
        assertTrue(repository.publishedQuestions().isEmpty())
    }

    @Test
    fun publishedQuestionsProjectsFromTheStoredStateDoc() = runTest {
        seedLedger(listOf(PUBLISHED_ITEM_JSON))

        val questions = repository.publishedQuestions()

        assertEquals(1, questions.size)
        val q = questions.single()
        assertEquals("Q1", q.id)
        assertEquals("B", q.correctLabel)
    }

    @Test
    fun multiResponseQuestionsProjectsFromTheStoredStateDoc() = runTest {
        seedLedger(listOf(MULTI_ITEM_JSON))

        val questions = repository.multiResponseQuestions()

        assertEquals(1, questions.size)
        assertEquals("MR1", questions.single().id)
        assertEquals(listOf("A", "C"), questions.single().correctAnswers)
    }

    @Test
    fun poolDelegatesToQBankScope() = runTest {
        val q1 = question("Q1", topic = "Topic A")
        val q2 = question("Q2", topic = "Topic B")

        val pool = repository.pool(setOf("t:qt:Topic A"), listOf(q1, q2))

        assertEquals(listOf(q1), pool)
    }

    // --- recordAttempts ----------------------------------------------------

    @Test
    fun recordAttemptsPersistsLocallySyncsTheMonthAndPostsVerifiedAttempts() = runTest {
        val now = Instant.parse("2026-08-29T15:00:00Z")
        val qbankRecord = sampleAttempt(
            id = "sess-1:qbank:item-1",
            at = "2026-08-29T12:00:00Z",
            surface = "qbank",
            selectedIndex = 1,
        )
        val reviewRecord = sampleAttempt(
            id = "sess-1:review:item-2",
            at = "2026-08-29T12:05:00Z",
            surface = "review",
            selectedIndex = null,
        )

        repository.recordAttempts(listOf(qbankRecord, reviewRecord), now)

        val month = monthKey(Instant.parse("2026-08-29T12:00:00Z"))
        val stored = localStore.attempts(month)
        assertEquals(setOf("sess-1:qbank:item-1", "sess-1:review:item-2"), stored.map { it.id }.toSet())

        // SyncEngine.write pushed the merged month array to the right user-state key.
        val key = attemptsKey(month)
        assertTrue(synapseApi.putCalls.contains(key))
        val pushedArray = synapseApi.putBodies.getValue(key).value as JsonArray
        assertEquals(2, pushedArray.size)

        // Only the qbank record with a selectedIndex is verified server-side.
        assertEquals(1, qbankApi.postedBodies.size)
        val posted = qbankApi.postedBodies.single().attempts.single()
        assertEquals("sess-1:qbank:item-1", posted.attemptId)
        assertEquals(1, posted.answerIndex)
    }

    @Test
    fun recordAttemptsDedupsByIdKeepingTheLastRecord() = runTest {
        val now = Instant.parse("2026-08-29T15:00:00Z")
        val first = sampleAttempt(id = "a", at = "2026-08-29T12:00:00Z", correct = false)
        val second = sampleAttempt(id = "a", at = "2026-08-29T12:00:00Z", correct = true)

        repository.recordAttempts(listOf(first, second), now)

        val stored = localStore.attempts(monthKey(Instant.parse("2026-08-29T12:00:00Z")))
        assertEquals(1, stored.size)
        val decoded = json.decodeFromJsonElement(AttemptRecord.serializer(), stored.single().payload)
        assertEquals(true, decoded.correct)
    }

    @Test
    fun recordAttemptsSwallowsAFailedVerifiedPost() = runTest {
        qbankApi.postAttemptsError = RuntimeException("network down")
        val now = Instant.parse("2026-08-29T15:00:00Z")
        val record = sampleAttempt(id = "sess-1:qbank:item-1", at = "2026-08-29T12:00:00Z", selectedIndex = 0)

        repository.recordAttempts(listOf(record), now) // must not throw

        val stored = localStore.attempts(monthKey(Instant.parse("2026-08-29T12:00:00Z")))
        assertEquals(1, stored.size) // still persisted + synced despite the failed POST
    }

    @Test
    fun recordAttemptsWithNoRecordsIsANoOp() = runTest {
        repository.recordAttempts(emptyList(), Instant.parse("2026-08-29T15:00:00Z"))

        assertTrue(synapseApi.putCalls.isEmpty())
        assertTrue(qbankApi.postedBodies.isEmpty())
    }

    // --- pinScopeForOffline / pinnedScopes / unpin --------------------------

    @Test
    fun pinScopeForOfflineDownloadsReferencedMediaAndIsIdempotent() = runTest {
        val q1 = question("Q1", topic = "Topic A")
        val q2 = question("Q2", topic = "Topic A")
        val scope = setOf("t:qt:Topic A")
        val mediaIdsOf: (Question) -> List<String> = { q ->
            when (q.id) {
                "Q1" -> listOf("img-1", "img-2")
                "Q2" -> listOf("img-2", "img-3")
                else -> emptyList()
            }
        }

        val first = repository.pinScopeForOffline(scope, listOf(q1, q2), mediaIdsOf = mediaIdsOf)
        assertEquals(3, first.cachedCount)
        assertEquals(0, first.alreadyCachedCount)
        assertTrue(mediaCache.isCached("img-1"))
        assertTrue(mediaCache.isCached("img-2"))
        assertTrue(mediaCache.isCached("img-3"))

        val second = repository.pinScopeForOffline(scope, listOf(q1, q2), mediaIdsOf = mediaIdsOf)
        assertEquals(0, second.cachedCount)
        assertEquals(3, second.alreadyCachedCount)
    }

    @Test
    fun pinScopeForOfflineReportsProgressAcrossDistinctMediaIds() = runTest {
        val q1 = question("Q1", topic = "Topic A")
        val scope = setOf("t:qt:Topic A")
        val progress = mutableListOf<Pair<Int, Int>>()

        repository.pinScopeForOffline(
            scope,
            listOf(q1),
            onProgress = { done, total -> progress += done to total },
            mediaIdsOf = { listOf("img-1", "img-2") },
        )

        assertEquals(listOf(1 to 2, 2 to 2), progress)
    }

    @Test
    fun pinScopeForOfflineGracefullyNoOpsWhenQuestionsCarryNoMedia() = runTest {
        val q1 = question("Q1", topic = "Topic A")

        val result = repository.pinScopeForOffline(setOf("t:qt:Topic A"), listOf(q1))

        assertEquals(PinResult(cachedCount = 0, alreadyCachedCount = 0), result)
    }

    @Test
    fun pinnedScopesTracksAPinAndUnpinRemovesIt() = runTest {
        val q1 = question("Q1", topic = "Topic A")
        val scope = setOf("t:qt:Topic A")

        assertTrue(repository.pinnedScopes().isEmpty())

        repository.pinScopeForOffline(scope, listOf(q1), mediaIdsOf = { listOf("img-1") })
        assertTrue(repository.pinnedScopes().contains(scope))

        repository.unpin(scope)
        assertFalse(repository.pinnedScopes().contains(scope))
    }

    // --- fixtures -----------------------------------------------------------

    private suspend fun seedLedger(items: List<String>) {
        val ledgerJson = items.joinToString(prefix = "[", postfix = "]")
        val value = json.parseToJsonElement(ledgerJson)
        val doc = StateDoc(value = value, updatedAt = "2026-08-29T00:00:00Z")
        localStore.putCatalogue(
            CONTENT_LEDGER_KEY,
            "2026-08-29T00:00:00Z",
            json.encodeToString(StateDoc.serializer(), doc),
        )
    }

    private fun question(id: String, topic: String) = Question(
        id = id,
        subjectId = "SYS_CVS",
        topic = topic,
        vignette = "A patient presents...",
        stem = "Which is true?",
        options = listOf(AnswerOption("A", "Option A", "Because A")),
        correctLabel = "A",
        explanation = "Explained.",
    )

    private fun sampleAttempt(
        id: String,
        at: String,
        surface: String = "qbank",
        correct: Boolean? = true,
        selectedIndex: Int? = 1,
    ) = AttemptRecord(
        id = id,
        at = at,
        surface = surface,
        itemId = "item-1",
        subjectId = "subj-1",
        topic = "Topic",
        difficulty = "Moderate",
        correct = correct,
        seconds = 30,
        sessionId = "sess-1",
        selectedIndex = selectedIndex,
        correctIndex = 1,
        sessionDurationSeconds = 600,
    )

    private companion object {
        // Straight from the task-1 fixture (see QuestionProjectionTest).
        val PUBLISHED_ITEM_JSON = """
            { "id":"Q1","kind":"question","title":"Which mechanism explains this?","subjectId":"SYS_CVS","status":"Published",
              "fields":{"Topic":"Heart failure","Difficulty":"Moderate","Vignette":"A patient with HFrEF...","Explanation":"Chronic sympathetic activation is toxic."},
              "questionData":{"correctAnswer":"B","answers":[
                {"label":"A","text":"Increases cardiac output","explanation":"Wrong."},
                {"label":"B","text":"Opposes chronic sympathetic activation","explanation":"Correct."}],
                "learningObjective":"...","estimatedSeconds":90,"libraryIds":["hf-patho"],
                "tags":{"universityIds":["OMS"],"years":["OMS_Y2"],"mainConceptIds":["C1"],"conceptIds":["C1"]}}}
        """.trimIndent()

        // Straight from the task-2 fixture (see MultiResponseTest).
        val MULTI_ITEM_JSON = """
            { "id":"MR1","kind":"question","title":"Which vessels supply the inferior wall?","subjectId":"SYS_CVS","status":"Published",
              "fields":{"Topic":"Coronary anatomy"},
              "questionData":{"format":"mcq_multi","answers":[
                {"label":"A","text":"Right coronary artery","explanation":"Correct."},
                {"label":"B","text":"Left anterior descending","explanation":"Wrong."},
                {"label":"C","text":"Left circumflex","explanation":"Correct."}],
                "multiResponse":{"correctAnswers":["A","C"]},
                "learningObjective":"Know the RCA/LCx territory.",
                "tags":{"mainConceptIds":["C1"],"conceptIds":["C1"]}}}
        """.trimIndent()
    }
}

// --- Fakes ------------------------------------------------------------------

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

private class FakeSynapseApi : SynapseApi {
    val putCalls = mutableListOf<String>()
    val putBodies = mutableMapOf<String, StateDoc>()

    override suspend fun session(): SessionDto = SessionDto("u")
    override suspend fun manifest(): Manifest = emptyMap()
    override suspend fun getState(key: String): StateDoc = StateDoc(JsonNull)
    override suspend fun getUserState(key: String): StateDoc = StateDoc(JsonNull)
    override suspend fun putUserState(key: String, doc: StateDoc) {
        putCalls += key
        putBodies[key] = doc
    }
    override suspend fun getAttempts(month: String): List<ModelAttemptRecord> = emptyList()
    override suspend fun postAttempt(attempt: ModelAttemptRecord) { /* unused */ }
}

private class FakeQBankApi : QBankApi {
    val postedBodies = mutableListOf<VerifiedAttemptsBody>()
    var postAttemptsError: Throwable? = null
    val getMediaCalls = mutableListOf<String>()

    override suspend fun postAttempts(body: VerifiedAttemptsBody) {
        postAttemptsError?.let { throw it }
        postedBodies += body
    }

    override suspend fun getMedia(id: String): ResponseBody {
        getMediaCalls += id
        return "bytes-for-$id".toResponseBody(null)
    }
}
