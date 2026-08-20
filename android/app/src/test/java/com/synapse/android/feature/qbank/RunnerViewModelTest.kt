package com.synapse.android.feature.qbank

import android.content.Context
import androidx.room.Room
import androidx.test.core.app.ApplicationProvider
import com.synapse.android.core.api.SynapseApi
import com.synapse.android.core.cache.CortexDatabase
import com.synapse.android.core.cache.LocalStore
import com.synapse.android.core.model.AnswerOption
import com.synapse.android.core.model.Question
import com.synapse.android.core.progress.AttemptMonth
import com.synapse.android.core.progress.AttemptStore
import com.synapse.android.core.qbank.LiveSession
import com.synapse.android.core.qbank.QuestionState
import com.synapse.android.core.qbank.SittingMode
import com.synapse.android.core.sync.SyncEngine
import java.time.Instant
import java.util.concurrent.ConcurrentHashMap
import kotlinx.coroutines.delay
import kotlinx.coroutines.runBlocking
import kotlinx.coroutines.withTimeout
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
 * [RunnerViewModel] is exercised against a real (in-memory) [LocalStore] and
 * a real [SyncEngine] backed by [MockWebServer] -- never mocks of either --
 * the same discipline [com.synapse.android.core.sync.SyncEngineTest] and
 * [QuestionBankViewModelTest] already use, so a passing test here means the
 * read-modify-write path this task's brief describes actually works end to
 * end, not just that the right methods were called.
 */
@RunWith(RobolectricTestRunner::class)
class RunnerViewModelTest {

    private lateinit var server: MockWebServer
    private lateinit var database: CortexDatabase
    private lateinit var store: LocalStore
    private lateinit var api: SynapseApi
    private lateinit var sync: SyncEngine

    private val overrides = ConcurrentHashMap<String, () -> MockResponse>()
    private val json = Json { ignoreUnknownKeys = true }

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

    private fun option(label: String) = AnswerOption(label = label, text = "Option $label", explanation = "Why $label")

    private fun question(id: String, correctLabel: String = "A") = Question(
        id = id,
        subjectId = "med",
        topic = "Cardiology",
        difficulty = "Moderate",
        vignette = "",
        stem = "Stem for $id",
        options = listOf(option("A"), option("B")),
        correctLabel = correctLabel,
        explanation = "Overall explanation",
        learningObjective = null,
        estimatedSeconds = null,
        libraryIds = emptyList(),
        conceptIds = listOf("concept-1"),
    )

    private fun sessionOf(mode: SittingMode, questionIds: List<String>, idx: Int = 0, elapsed: Int = 0) = LiveSession(
        questionIds = questionIds,
        idx = idx,
        answers = emptyMap(),
        checked = emptyMap(),
        mode = mode,
        sessionId = "sitting-1",
        elapsed = elapsed,
        visited = emptyList(),
        reviewing = false,
        name = "",
        phase = "running",
        startedAt = Instant.now().toString(),
    )

    private fun monthKeyNow() = AttemptStore.monthKey(AttemptStore.month(Instant.now()))

    private suspend fun awaitDocument(key: String): String = withTimeout(5_000) {
        var value: String? = store.document(key)?.json
        while (value == null) {
            delay(5)
            value = store.document(key)?.json
        }
        value
    }

    private suspend fun awaitOutboxEntry(key: String) = withTimeout(5_000) {
        var entries = store.outbox()
        while (entries.none { it.key == key }) {
            delay(5)
            entries = store.outbox()
        }
        entries.first { it.key == key }
    }

    @Test
    fun `tutor mode reveals the answer as soon as it is committed`() = runBlocking {
        val q1 = question("q1", correctLabel = "A")
        val viewModel = RunnerViewModel(sessionOf(SittingMode.TUTOR, listOf(q1.id)), listOf(q1), store, sync)

        viewModel.choose("A")
        viewModel.commit()

        assertEquals(true, viewModel.session.value.checked[q1.id])
        assertEquals(QuestionState.CORRECT, viewModel.stateOf(0))
    }

    @Test
    fun `timed mode holds the answer back until the sitting ends`() = runBlocking {
        val q1 = question("q1", correctLabel = "A")
        val viewModel = RunnerViewModel(sessionOf(SittingMode.TIMED, listOf(q1.id)), listOf(q1), store, sync)

        viewModel.choose("A")
        viewModel.commit()

        assertNull(viewModel.session.value.checked[q1.id])
        assertEquals(QuestionState.ANSWERED, viewModel.stateOf(0))
    }

    @Test
    fun `a question reached and left is omitted, not unseen`() = runBlocking {
        val questions = listOf(question("q1"), question("q2"), question("q3"))
        val viewModel = RunnerViewModel(
            sessionOf(SittingMode.TUTOR, questions.map { it.id }),
            questions,
            store,
            sync,
        )

        viewModel.goTo(1)
        viewModel.goTo(2)

        assertEquals(QuestionState.OMITTED, viewModel.stateOf(0))
        assertEquals(QuestionState.OMITTED, viewModel.stateOf(1))
        assertEquals(QuestionState.UNSEEN, viewModel.stateOf(2))
    }

    @Test
    fun `a question never reached is unseen`() = runBlocking {
        val questions = listOf(question("q1"), question("q2"), question("q3"))
        val viewModel = RunnerViewModel(
            sessionOf(SittingMode.TUTOR, questions.map { it.id }),
            questions,
            store,
            sync,
        )

        assertEquals(QuestionState.UNSEEN, viewModel.stateOf(2))
    }

    @Test
    fun `where the student is is not one of the five states`() = runBlocking {
        // A different fact on a different axis — you can be on a question that is
        // answered, omitted or untouched.
        val questions = listOf(question("q1"), question("q2"))
        val viewModel = RunnerViewModel(
            sessionOf(SittingMode.TUTOR, questions.map { it.id }),
            questions,
            store,
            sync,
        )

        viewModel.goTo(1)
        assertEquals(1, viewModel.session.value.idx)
        assertEquals(QuestionState.UNSEEN, viewModel.stateOf(1))

        viewModel.choose("A")
        viewModel.commit()

        // Committing changed the state at index 1 from UNSEEN to CORRECT, but
        // idx -- where the student is standing -- never moved.
        assertEquals(1, viewModel.session.value.idx)
        assertEquals(QuestionState.CORRECT, viewModel.stateOf(1))
    }

    @Test
    fun `committing an answer writes one attempt`() = runBlocking {
        val q1 = question("q1", correctLabel = "A")
        val viewModel = RunnerViewModel(sessionOf(SittingMode.TUTOR, listOf(q1.id)), listOf(q1), store, sync)

        viewModel.choose("A")
        viewModel.commit()

        val month = json.decodeFromString(AttemptMonth.serializer(), awaitDocument(monthKeyNow()))
        assertEquals(1, month.records.size)
        val record = month.records.single()
        assertEquals("q1", record.itemId)
        assertEquals("qbank", record.surface)
        assertEquals(true, record.correct)
        assertNull(record.seconds)
        assertEquals("med", record.subjectId)
        assertEquals("Cardiology", record.topic)
        assertEquals(listOf("concept-1"), record.conceptIds)
    }

    @Test
    fun `the attempt carries the session id so a sitting can be reviewed`() = runBlocking {
        val q1 = question("q1")
        val session = sessionOf(SittingMode.TUTOR, listOf(q1.id))
        val viewModel = RunnerViewModel(session, listOf(q1), store, sync)

        viewModel.choose("A")
        viewModel.commit()

        val month = json.decodeFromString(AttemptMonth.serializer(), awaitDocument(monthKeyNow()))
        val record = month.records.single()
        assertEquals(session.sessionId, record.sessionId)
        assertEquals(AttemptStore.attemptId(session.sessionId, "qbank", "q1"), record.id)
    }

    @Test
    fun `an attempt made offline is queued rather than lost`() = runBlocking {
        val monthKey = monthKeyNow()
        overrides["PUT /api/user-state/$monthKey"] = { MockResponse().setResponseCode(500) }
        val q1 = question("q1")
        val viewModel = RunnerViewModel(sessionOf(SittingMode.TUTOR, listOf(q1.id)), listOf(q1), store, sync)

        viewModel.choose("A")
        viewModel.commit()

        val month = json.decodeFromString(AttemptMonth.serializer(), awaitDocument(monthKey))
        assertEquals(1, month.records.size)

        val queued = awaitOutboxEntry(monthKey)
        assertEquals(monthKey, queued.key)
    }

    @Test
    fun `the sitting is saved after every commit so a crash loses nothing`() = runBlocking {
        val q1 = question("q1")
        val viewModel = RunnerViewModel(sessionOf(SittingMode.TUTOR, listOf(q1.id)), listOf(q1), store, sync)

        viewModel.choose("A")
        viewModel.commit()

        val saved = json.decodeFromString(LiveSession.serializer(), awaitDocument(LiveSession.KEY))
        assertEquals(0, saved.answers[q1.id])
        assertEquals(true, saved.checked[q1.id])
    }

    @Test
    fun `finishing moves the phase to results`() = runBlocking {
        val q1 = question("q1", correctLabel = "A")
        val viewModel = RunnerViewModel(sessionOf(SittingMode.TIMED, listOf(q1.id)), listOf(q1), store, sync)

        viewModel.choose("A")
        viewModel.commit()
        viewModel.finish()

        assertEquals("results", viewModel.session.value.phase)
        assertTrue(viewModel.session.value.reviewing)

        // Timed mode postpones the attempt until finish (see this task's
        // brief, step 2) -- it must land here, not have been dropped.
        val month = json.decodeFromString(AttemptMonth.serializer(), awaitDocument(monthKeyNow()))
        assertEquals(1, month.records.size)
        assertEquals(true, month.records.single().correct)
    }
}
