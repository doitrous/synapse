package com.synapse.android.feature.qbank

import android.content.Context
import androidx.room.Room
import androidx.test.core.app.ApplicationProvider
import com.synapse.android.core.api.SynapseApi
import com.synapse.android.core.cache.CortexDatabase
import com.synapse.android.core.cache.LocalStore
import com.synapse.android.core.model.AnswerOption
import com.synapse.android.core.model.LedgerDecoder
import com.synapse.android.core.model.Question
import com.synapse.android.core.progress.AttemptIndex
import com.synapse.android.core.progress.AttemptMonth
import com.synapse.android.core.progress.AttemptRecord
import com.synapse.android.core.progress.AttemptStats
import com.synapse.android.core.progress.AttemptStore
import com.synapse.android.core.qbank.LiveSession
import com.synapse.android.core.qbank.QuestionState
import com.synapse.android.core.qbank.SittingMode
import com.synapse.android.core.sync.SyncEngine
import java.time.Instant
import java.util.concurrent.ConcurrentHashMap
import kotlinx.coroutines.flow.first
import kotlinx.coroutines.runBlocking
import kotlinx.coroutines.withTimeout
import kotlinx.serialization.builtins.MapSerializer
import kotlinx.serialization.builtins.serializer
import kotlinx.serialization.json.Json
import okhttp3.OkHttpClient
import okhttp3.mockwebserver.Dispatcher
import okhttp3.mockwebserver.MockResponse
import okhttp3.mockwebserver.MockWebServer
import okhttp3.mockwebserver.RecordedRequest
import org.junit.After
import org.junit.Assert.assertEquals
import org.junit.Assert.assertNull
import org.junit.Assert.assertTrue
import org.junit.Before
import org.junit.Test
import org.junit.runner.RunWith
import org.robolectric.RobolectricTestRunner

/**
 * [AttemptStats] (the pure read side of the ledger), [ResultsViewModel] and
 * the naming half of [QuestionBankViewModel.build] and [PreviousSittingsViewModel]
 * (which need a real [LocalStore], hence [RobolectricTestRunner]) all land in
 * this task, so all four are exercised here, the way [RunnerViewModelTest]
 * covers everything that task added at once.
 */
@RunWith(RobolectricTestRunner::class)
class ResultsTest {

    private lateinit var server: MockWebServer
    private lateinit var database: CortexDatabase
    private lateinit var store: LocalStore
    private lateinit var api: SynapseApi
    private lateinit var sync: SyncEngine

    private val overrides = ConcurrentHashMap<String, () -> MockResponse>()
    private val json = Json { ignoreUnknownKeys = true }
    private val namesSerializer = MapSerializer(String.serializer(), String.serializer())

    @Before
    fun setUp() {
        server = MockWebServer()
        server.dispatcher = object : Dispatcher() {
            override fun dispatch(request: RecordedRequest): MockResponse {
                val key = "${request.method} ${request.path}"
                return overrides[key]?.invoke() ?: MockResponse().setResponseCode(200).setBody("""{"ok":true}""")
            }
        }
        server.start()

        val context = ApplicationProvider.getApplicationContext<Context>()
        database = Room.inMemoryDatabaseBuilder(context, CortexDatabase::class.java).build()
        store = LocalStore(database)
        api = SynapseApi(
            baseUrl = server.url("/").toString().trimEnd('/'),
            client = OkHttpClient(),
            tokenProvider = { "token" },
        )
        sync = SyncEngine(api, store)
    }

    @After
    fun tearDown() {
        server.shutdown()
        database.close()
    }

    // -- AttemptStats ----------------------------------------------------

    @Test
    fun `accuracy counts only marked attempts`() {
        val records = listOf(
            record(id = "a1", correct = true),
            record(id = "a2", correct = false),
            // A self-ticked station nobody has marked yet -- must not move
            // the denominator either way.
            record(id = "a3", correct = null),
        )

        assertEquals(0.5, AttemptStats.accuracyOf(records))
        assertNull(AttemptStats.accuracyOf(listOf(record(id = "a4", correct = null))))
    }

    // -- ResultsViewModel --------------------------------------------------

    @Test
    fun `omitted questions are reported separately, not as wrong`() {
        // q1 correct, q2 wrong, q3 never answered.
        val session = liveSession(
            questionIds = listOf("q1", "q2", "q3"),
            answers = mapOf("q1" to 0, "q2" to 1),
        )
        val questions = listOf(question("q1"), question("q2"), question("q3"))
        val viewModel = ResultsViewModel(session, questions)

        val summary = viewModel.summary.value
        assertEquals(2, summary.answered)
        assertEquals(1, summary.correct)
        assertEquals(1, summary.omitted)

        assertEquals(QuestionState.CORRECT, viewModel.stateOf(0))
        assertEquals(QuestionState.WRONG, viewModel.stateOf(1))
        assertEquals(QuestionState.OMITTED, viewModel.stateOf(2))
    }

    // -- PreviousSittingsViewModel -----------------------------------------

    @Test
    fun `a resumed sitting appears once in previous sittings, not twice`() = runBlocking {
        // Two records from the same sessionId -- the first run answered q1,
        // the app was backgrounded and resumed, and the second run answered
        // q2. Both carry the sessionId the sitting was minted with.
        seedRecords(
            record(id = "s1:qbank:q1", sessionId = "s1", itemId = "q1", at = "2026-08-19T09:00:00Z"),
            record(id = "s1:qbank:q2", sessionId = "s1", itemId = "q2", at = "2026-08-19T09:05:00Z"),
        )

        val viewModel = PreviousSittingsViewModel(store)
        val sittings = withTimeout(5_000) { viewModel.sittings.first { it.isNotEmpty() } }

        assertEquals(1, sittings.size)
        assertEquals("s1", sittings.single().sessionId)
        assertEquals(2, sittings.single().answered)
    }

    @Test
    fun `previous sittings read from the attempt shards, not from the live session`() = runBlocking {
        // A live session sitting mid-run: answers of its own, a different
        // sessionId, never finished and never logged to a shard.
        store.putDocument(
            LiveSession.KEY,
            json.encodeToString(
                LiveSession.serializer(),
                liveSession(
                    sessionId = "in-progress",
                    questionIds = listOf("q1", "q2", "q3", "q4", "q5"),
                    answers = mapOf("q1" to 0, "q2" to 0, "q3" to 0, "q4" to 0, "q5" to 0),
                ),
            ),
            null,
        )
        // The only thing that has actually been logged: a finished sitting
        // under a different sessionId.
        seedRecords(record(id = "shard-session:qbank:q1", sessionId = "shard-session", itemId = "q1"))

        val viewModel = PreviousSittingsViewModel(store)
        val sittings = withTimeout(5_000) { viewModel.sittings.first { it.isNotEmpty() } }

        assertEquals(1, sittings.size)
        assertEquals("shard-session", sittings.single().sessionId)
        assertEquals(1, sittings.single().answered)
    }

    // -- QuestionBankViewModel naming ---------------------------------------

    @Test
    fun `an unnamed sitting does not consume a test number`() = runBlocking {
        seed(questionJson("q1", subjectId = "Cardio"))
        // A previous sitting exists in the ledger (so it is eligible to be
        // counted) but was never given a stored name -- e.g. a client that
        // predates naming, or a name that was cleared.
        seedRecords(record(id = "old:qbank:q1", sessionId = "old-session", itemId = "q1", subjectId = "Cardio"))

        val viewModel = QuestionBankViewModel(store, sync)
        withTimeout(5_000) { viewModel.availableCount.first { it > 0 } }

        val session = viewModel.build(SittingMode.TUTOR, count = 1)

        assertEquals("Cardio · Test 1", session.name)
    }

    // -- helpers -------------------------------------------------------

    private fun record(
        id: String,
        sessionId: String = "s1",
        itemId: String = "q1",
        subjectId: String = "med",
        correct: Boolean? = true,
        at: String = "2026-08-19T09:00:00Z",
    ) = AttemptRecord(
        id = id, at = at, surface = "qbank", itemId = itemId, subjectId = subjectId,
        topic = "Cardiology", difficulty = "Moderate", correct = correct, seconds = 10, sessionId = sessionId,
    )

    private suspend fun seedRecords(vararg records: AttemptRecord) {
        val byMonth = records.groupBy { AttemptStore.month(Instant.parse(it.at)) }
        var index = AttemptIndex()
        for ((month, monthRecords) in byMonth) {
            val monthDoc = monthRecords.fold(AttemptMonth(month = month)) { acc, record -> AttemptStore.addAttempt(acc, record) }
            store.putDocument(AttemptStore.monthKey(month), json.encodeToString(AttemptMonth.serializer(), monthDoc), null)
            for (record in monthRecords) index = AttemptStore.index(index, record)
        }
        store.putDocument(AttemptStore.INDEX_KEY, json.encodeToString(AttemptIndex.serializer(), index), null)
    }

    private fun liveSession(
        sessionId: String = "s1",
        questionIds: List<String>,
        answers: Map<String, Int>,
    ) = LiveSession(
        questionIds = questionIds,
        idx = 0,
        answers = answers,
        checked = questionIds.associateWith { true },
        mode = SittingMode.TUTOR,
        sessionId = sessionId,
        elapsed = 42,
        visited = questionIds.indices.toList(),
        reviewing = true,
        name = "",
        phase = "results",
        startedAt = "2026-08-19T09:00:00Z",
    )

    private fun question(id: String) = Question(
        id = id,
        subjectId = "med",
        topic = "Cardiology",
        difficulty = "Moderate",
        vignette = "",
        stem = "Stem for $id",
        options = listOf(
            AnswerOption(label = "A", text = "Option A", explanation = "e"),
            AnswerOption(label = "B", text = "Option B", explanation = "e"),
        ),
        correctLabel = "A",
        explanation = "e",
        learningObjective = "",
        estimatedSeconds = null,
        libraryIds = emptyList(),
        conceptIds = emptyList(),
    )

    private fun questionJson(id: String, subjectId: String) = """
        {"id":"$id","kind":"question","status":"Published","subjectId":"$subjectId",
         "title":"Stem for $id",
         "fields":{"Topic":"Cardiology"},
         "questionData":{"correctAnswer":"A",
           "answers":[{"label":"A","text":"Option A","explanation":"e"},
                      {"label":"B","text":"Option B","explanation":"e"}],
           "tags":{"universityIds":[],"years":[]}}}
    """.trimIndent()

    private suspend fun seed(vararg raws: String) {
        store.replaceLedger(LedgerDecoder.decode(raws.joinToString(",", prefix = "[", postfix = "]")).items)
    }
}
