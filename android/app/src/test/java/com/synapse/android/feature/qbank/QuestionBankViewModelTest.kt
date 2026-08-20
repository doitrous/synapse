package com.synapse.android.feature.qbank

import android.content.Context
import androidx.room.Room
import androidx.test.core.app.ApplicationProvider
import com.synapse.android.core.api.SynapseApi
import com.synapse.android.core.cache.CortexDatabase
import com.synapse.android.core.cache.LocalStore
import com.synapse.android.core.model.LedgerDecoder
import com.synapse.android.core.qbank.QBankScope
import com.synapse.android.core.qbank.SittingMode
import com.synapse.android.core.sync.SyncEngine
import java.util.concurrent.ConcurrentHashMap
import kotlin.random.Random
import kotlinx.coroutines.flow.first
import kotlinx.coroutines.runBlocking
import kotlinx.coroutines.withTimeout
import okhttp3.OkHttpClient
import okhttp3.mockwebserver.Dispatcher
import okhttp3.mockwebserver.MockResponse
import okhttp3.mockwebserver.MockWebServer
import okhttp3.mockwebserver.RecordedRequest
import org.junit.After
import org.junit.Assert.assertEquals
import org.junit.Assert.assertFalse
import org.junit.Assert.assertNotEquals
import org.junit.Assert.assertTrue
import org.junit.Before
import org.junit.Test
import org.junit.runner.RunWith
import org.robolectric.RobolectricTestRunner

/**
 * [QuestionBankViewModel] is exercised against a real (in-memory) [LocalStore]
 * and a real [SyncEngine] backed by [MockWebServer] -- never mocks of either
 * -- the same discipline [RunnerViewModelTest] uses, needed since Task 15
 * gave `build` a real [SyncEngine] dependency (the session-naming write).
 */
@RunWith(RobolectricTestRunner::class)
class QuestionBankViewModelTest {

    private lateinit var server: MockWebServer
    private lateinit var database: CortexDatabase
    private lateinit var store: LocalStore
    private lateinit var api: SynapseApi
    private lateinit var sync: SyncEngine

    private val overrides = ConcurrentHashMap<String, () -> MockResponse>()

    @Before fun setUp() {
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

    @After fun tearDown() {
        server.shutdown()
        database.close()
    }

    /**
     * Written against the shape the authoring pipeline actually writes --
     * see `QuestionProjection`'s own class doc. [universityIds] and [years]
     * are wired through purely so the cohort-filter test has something real
     * to seed; nothing in this file ever expects them to narrow the pool.
     */
    private fun questionJson(
        id: String,
        topic: String,
        subjectId: String = "med",
        universityIds: List<String> = emptyList(),
        years: List<String> = emptyList(),
    ): String {
        fun jsonArray(values: List<String>) = values.joinToString(prefix = "[", postfix = "]") { "\"$it\"" }
        return """
            {"id":"$id","kind":"question","status":"Published","subjectId":"$subjectId",
             "title":"Stem for $id",
             "fields":{"Topic":"$topic"},
             "questionData":{"correctAnswer":"A",
               "answers":[{"label":"A","text":"Option A","explanation":"e"},
                          {"label":"B","text":"Option B","explanation":"e"}],
               "tags":{"universityIds":${jsonArray(universityIds)},"years":${jsonArray(years)}}}}
        """.trimIndent()
    }

    private suspend fun seed(vararg raws: String) {
        store.replaceLedger(LedgerDecoder.decode(raws.joinToString(",", prefix = "[", postfix = "]")).items)
    }

    @Test
    fun `every published question is offered, with no cohort filter`() = runBlocking {
        // LedgerItem carries universityIds/yearIds and there is an
        // itemInScope gate in the TypeScript, but the student Question Bank
        // never calls it -- usePublishedQuestions.ts filters on status
        // alone. q1 is tagged to a university and a year nobody here belongs
        // to; it must appear anyway.
        seed(
            questionJson("q1", "Cardiology", universityIds = listOf("uni-1"), years = listOf("y1")),
            questionJson("q2", "Renal"),
        )
        val viewModel = QuestionBankViewModel(store, sync)

        val count = withTimeout(5_000) { viewModel.availableCount.first { it > 0 } }

        assertEquals(2, count)
    }

    @Test
    fun `topics are synthesised from the questions when there is no library`() = runBlocking {
        seed(questionJson("q1", "Cardiology"), questionJson("q2", "Renal"))
        val viewModel = QuestionBankViewModel(store, sync)

        val topics = withTimeout(5_000) { viewModel.topics.first { it.size == 2 } }

        assertEquals(setOf("Cardiology", "Renal"), topics.map { it.title }.toSet())
        assertTrue(topics.all { QBankScope.isQuestionTopic(it.id) })
        assertTrue(topics.all { it.subtopicIds.isEmpty() })
    }

    @Test
    fun `a chapter keeps the first spelling seen and the order it appeared in`() = runBlocking {
        seed(
            questionJson("q1", "cardiology"),
            questionJson("q2", "Renal"),
            questionJson("q3", "CARDIOLOGY"),
        )
        val viewModel = QuestionBankViewModel(store, sync)

        val topics = withTimeout(5_000) { viewModel.topics.first { it.size == 2 } }

        assertEquals(listOf("cardiology", "Renal"), topics.map { it.title })
    }

    @Test
    fun `selecting a topic selects nothing else`() = runBlocking {
        seed(questionJson("q1", "Cardiology"), questionJson("q2", "Renal"))
        val viewModel = QuestionBankViewModel(store, sync)
        val topics = withTimeout(5_000) { viewModel.topics.first { it.size == 2 } }
        val cardiology = topics.first { it.title == "Cardiology" }

        viewModel.toggle(QBankScope.topicKey(cardiology.id))

        val count = withTimeout(5_000) { viewModel.availableCount.first { it == 1 } }
        assertEquals(1, count)
        assertEquals(setOf(QBankScope.topicKey(cardiology.id)), viewModel.scope.value)
    }

    @Test
    fun `the available count follows the scope`() = runBlocking {
        seed(questionJson("q1", "Cardiology"), questionJson("q2", "Cardiology"), questionJson("q3", "Renal"))
        val viewModel = QuestionBankViewModel(store, sync)
        val topics = withTimeout(5_000) { viewModel.topics.first { it.size == 2 } }
        withTimeout(5_000) { viewModel.availableCount.first { it == 3 } }
        val cardiology = topics.first { it.title == "Cardiology" }

        viewModel.toggle(QBankScope.topicKey(cardiology.id))
        assertEquals(2, withTimeout(5_000) { viewModel.availableCount.first { it == 2 } })

        viewModel.toggle(QBankScope.topicKey(cardiology.id))
        assertEquals(3, withTimeout(5_000) { viewModel.availableCount.first { it == 3 } })
    }

    @Test
    fun `an empty scope offers the whole bank`() = runBlocking {
        seed(questionJson("q1", "Cardiology"), questionJson("q2", "Renal"))
        val viewModel = QuestionBankViewModel(store, sync)

        val count = withTimeout(5_000) { viewModel.availableCount.first { it == 2 } }

        assertTrue(viewModel.scope.value.isEmpty())
        assertEquals(2, count)
    }

    @Test
    fun `building a sitting draws no more than the pool holds`() = runBlocking {
        // The shuffle is real randomness -- seeded here only so the test is
        // reproducible, not so it can assert on an order. What has to hold
        // for any seed is the size and the membership.
        seed(questionJson("q1", "Cardiology"), questionJson("q2", "Renal"))
        val viewModel = QuestionBankViewModel(store, sync, random = Random(42))
        withTimeout(5_000) { viewModel.availableCount.first { it == 2 } }

        val session = viewModel.build(SittingMode.TUTOR, count = 100)

        assertEquals(2, session.questionIds.size)
        assertEquals(setOf("q1", "q2"), session.questionIds.toSet())
    }

    @Test
    fun `a built sitting starts in the running phase with nothing visited`() = runBlocking {
        seed(questionJson("q1", "Cardiology"))
        val viewModel = QuestionBankViewModel(store, sync)
        withTimeout(5_000) { viewModel.availableCount.first { it == 1 } }

        val session = viewModel.build(SittingMode.TIMED, count = 1)

        assertEquals("running", session.phase)
        assertEquals(0, session.idx)
        assertTrue(session.visited.isEmpty())
        assertFalse(session.reviewing)
        assertTrue(session.answers.isEmpty())
        assertTrue(session.checked.isEmpty())
    }

    @Test
    fun `the sitting gets a stable id so its attempts can be grouped`() = runBlocking {
        seed(questionJson("q1", "Cardiology"), questionJson("q2", "Renal"))
        val viewModel = QuestionBankViewModel(store, sync)
        withTimeout(5_000) { viewModel.availableCount.first { it == 2 } }

        val first = viewModel.build(SittingMode.TUTOR, count = 1)
        val second = viewModel.build(SittingMode.TUTOR, count = 1)

        assertTrue(first.sessionId.isNotBlank())
        assertNotEquals(first.sessionId, second.sessionId)
    }
}
