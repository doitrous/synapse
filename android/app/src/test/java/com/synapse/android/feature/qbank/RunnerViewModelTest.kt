package com.synapse.android.feature.qbank

import android.content.Context
import androidx.room.Room
import androidx.test.core.app.ApplicationProvider
import com.synapse.android.core.api.SynapseApi
import com.synapse.android.core.cache.CortexDatabase
import com.synapse.android.core.cache.LocalStore
import com.synapse.android.core.model.AnswerOption
import com.synapse.android.core.model.Question
import com.synapse.android.core.progress.AttemptIndex
import com.synapse.android.core.progress.AttemptMonth
import com.synapse.android.core.progress.AttemptStore
import com.synapse.android.core.qbank.LiveSession
import com.synapse.android.core.qbank.QuestionState
import com.synapse.android.core.qbank.SittingMode
import com.synapse.android.core.sync.SyncEngine
import java.time.Instant
import java.util.concurrent.ConcurrentHashMap
import java.util.concurrent.atomic.AtomicInteger
import kotlinx.coroutines.CompletableDeferred
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.awaitCancellation
import kotlinx.coroutines.cancelAndJoin
import kotlinx.coroutines.channels.Channel
import kotlinx.coroutines.delay
import kotlinx.coroutines.launch
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
import org.junit.Assert.assertFalse
import org.junit.Assert.assertNull
import org.junit.Assert.assertTrue
import org.junit.Before
import org.junit.Test
import org.junit.runner.RunWith
import org.robolectric.RobolectricTestRunner
import org.robolectric.shadows.ShadowLog

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
    fun tearDown() = runBlocking {
        quiesce()
        server.shutdown()
        database.close()
    }

    /**
     * [RunnerViewModel] persists from coroutines it launches itself and
     * never awaits, so closing the database out from under one of them
     * fails its transaction and prints a stack trace no assertion catches.
     * Waits for the outbox to stop growing -- every write enqueues -- before
     * the database goes away.
     */
    private suspend fun quiesce() {
        var previous = -1
        repeat(200) {
            val current = store.outbox().size
            if (current == previous) return
            previous = current
            delay(10)
        }
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

    /**
     * Polls until the index reflects at least [minAttempts] -- not merely
     * until the document exists. [RunnerViewModel.finish] can write this
     * document more than once in a row (one attempt per answered question),
     * so an existence check alone can return after only the first of
     * several async writes has landed.
     */
    private suspend fun awaitIndex(minAttempts: Int = 1): AttemptIndex = withTimeout(5_000) {
        var index = store.document(AttemptStore.INDEX_KEY)?.json
            ?.let { json.decodeFromString(AttemptIndex.serializer(), it) }
        while (index == null || index.totals.attempts < minAttempts) {
            delay(5)
            index = store.document(AttemptStore.INDEX_KEY)?.json
                ?.let { json.decodeFromString(AttemptIndex.serializer(), it) }
        }
        index
    }

    /** Same reasoning as [awaitIndex]: waits for a record count, not mere existence. */
    private suspend fun awaitMonth(key: String, minRecords: Int): AttemptMonth = withTimeout(5_000) {
        var month = store.document(key)?.json?.let { json.decodeFromString(AttemptMonth.serializer(), it) }
        while (month == null || month.records.size < minRecords) {
            delay(5)
            month = store.document(key)?.json?.let { json.decodeFromString(AttemptMonth.serializer(), it) }
        }
        month
    }

    /**
     * A [Ticker] a test drives by hand: [advance] sends one tick and blocks
     * (a rendezvous channel) until [RunnerViewModel] has actually consumed
     * it, so a test never races the background loop or waits on a real
     * clock.
     */
    private class ManualTicker : Ticker {
        private val channel = Channel<Unit>(Channel.RENDEZVOUS)

        override suspend fun await() {
            channel.receive()
        }

        suspend fun advance() {
            channel.send(Unit)
        }

        /** Never suspends: succeeds only if the loop is waiting right now. */
        fun tryAdvance(): Boolean = channel.trySend(Unit).isSuccess
    }

    /**
     * Ticks [limit] times as fast as [Dispatchers.Default] will schedule it
     * -- no delay at all -- then parks forever, so a test can race it
     * against a real concurrent mutator (unlike [ManualTicker], which is
     * driven by hand and never overlaps a tick with a mutator call).
     */
    private class BoundedTicker(private val limit: Int) : Ticker {
        private val count = AtomicInteger(0)
        val done = CompletableDeferred<Unit>()

        override suspend fun await() {
            if (count.incrementAndGet() > limit) {
                done.complete(Unit)
                awaitCancellation()
            }
        }
    }

    @Test
    fun `concurrent ticks are never lost to a racing mutator`() = runBlocking {
        val q1 = question("q1", correctLabel = "A")
        val ticks = 3_000
        val ticker = BoundedTicker(ticks)
        val viewModel = RunnerViewModel(
            sessionOf(SittingMode.TIMED, listOf(q1.id)),
            listOf(q1),
            store,
            sync,
            ticker,
        )

        var lastSeen = 0
        var everDecreased = false
        // A real background thread (Dispatchers.Default), hammering a
        // mutator that goes through the same persist() path as commit() and
        // finish() -- exactly what the ticker now races against for real.
        val mutatorJob = launch(Dispatchers.Default) {
            while (!ticker.done.isCompleted) {
                viewModel.goTo(0)
                val now = viewModel.session.value.elapsed
                if (now < lastSeen) everDecreased = true
                lastSeen = now
            }
        }

        // A hang detector, not a performance assertion. Three thousand ticks
        // is three thousand real persist() round-trips through Room while a
        // second thread hammers goTo(), and how long that takes is a fact
        // about the machine, not about the code under test -- on a loaded CI
        // box it can be several times what it is on a developer's laptop.
        // Ten seconds was close enough to the real figure to fail there and
        // pass here, which is the one outcome a test like this must not have.
        // The tick count stays where it is: the value of this test is that
        // the I/O is real and there is enough of it to lose a tick in.
        withTimeout(120_000) { ticker.done.await() }
        mutatorJob.cancelAndJoin()

        assertFalse("elapsed must never be observed going backwards while ticking", everDecreased)
        assertEquals(
            "every tick must survive a concurrently racing goTo(), or the sitting's clock undercounts",
            ticks,
            viewModel.session.value.elapsed,
        )
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

    @Test
    fun `finishing twice does not double-count the index`() = runBlocking {
        val questions = listOf(question("q1", correctLabel = "A"), question("q2", correctLabel = "A"))
        val viewModel = RunnerViewModel(
            sessionOf(SittingMode.TIMED, questions.map { it.id }),
            questions,
            store,
            sync,
        )

        viewModel.choose("A")
        viewModel.commit()
        viewModel.goTo(1)
        viewModel.choose("A")
        viewModel.commit()
        viewModel.finish()

        val firstIndex = awaitIndex(minAttempts = 2)
        assertEquals(2, firstIndex.totals.attempts)
        assertEquals(2, firstIndex.totals.marked)
        assertEquals(2, firstIndex.totals.correct)

        // The strip still shows "Finish" once the student is back on the
        // last question -- see QuestionRunnerScreen -- so a second tap must
        // reach the view model. It must not re-log every answered question.
        viewModel.finish()
        delay(50)

        val secondIndex = awaitIndex()
        assertEquals(firstIndex.totals.attempts, secondIndex.totals.attempts)
        assertEquals(firstIndex.totals.marked, secondIndex.totals.marked)
        assertEquals(firstIndex.totals.correct, secondIndex.totals.correct)

        val month = awaitMonth(monthKeyNow(), minRecords = 2)
        assertEquals(2, month.records.size)
    }

    @Test
    fun `double-committing the same answer does not inflate the index`() = runBlocking {
        val q1 = question("q1", correctLabel = "A")
        val viewModel = RunnerViewModel(sessionOf(SittingMode.TUTOR, listOf(q1.id)), listOf(q1), store, sync)

        viewModel.choose("A")
        viewModel.commit()
        awaitIndex()

        // Re-committing an already-checked question reuses the same
        // attempt id; AttemptStore.addAttempt refuses it, and the index
        // must refuse it too.
        viewModel.commit()
        delay(50)

        val index = awaitIndex()
        assertEquals(1, index.totals.attempts)
        val month = json.decodeFromString(AttemptMonth.serializer(), awaitDocument(monthKeyNow()))
        assertEquals(1, month.records.size)
    }

    @Test
    fun `the clock advances once per tick while running, and stops at finish`() = runBlocking {
        val q1 = question("q1", correctLabel = "A")
        val ticker = ManualTicker()
        val viewModel = RunnerViewModel(
            sessionOf(SittingMode.TIMED, listOf(q1.id)),
            listOf(q1),
            store,
            sync,
            ticker,
        )

        ticker.advance()
        ticker.advance()
        ticker.advance()

        withTimeout(5_000) {
            while (viewModel.session.value.elapsed < 3) delay(5)
        }
        assertEquals(3, viewModel.session.value.elapsed)

        viewModel.choose("A")
        viewModel.commit()
        viewModel.finish()

        val frozenAt = viewModel.session.value.elapsed
        // If the ticker loop were still running, it would be waiting to
        // receive again almost immediately after each tick it consumes, so
        // one of these would succeed. None should: finish() cancels it.
        repeat(20) {
            ticker.tryAdvance()
            delay(5)
        }
        assertEquals(frozenAt, viewModel.session.value.elapsed)
    }

    @Test
    fun `a lost timing baseline records unknown seconds, not zero`() = runBlocking {
        val q1 = question("q1", correctLabel = "A")
        val q2 = question("q2", correctLabel = "A")
        // Simulates resuming a force-quit sitting: q1 was already answered
        // in a prior process, so this fresh view model has no in-memory
        // "opened at" baseline for it -- only for whatever question idx
        // points at now.
        val resumed = sessionOf(SittingMode.TIMED, listOf(q1.id, q2.id), idx = 1, elapsed = 40).copy(
            answers = mapOf(q1.id to 0, q2.id to 0),
        )
        val viewModel = RunnerViewModel(resumed, listOf(q1, q2), store, sync)

        viewModel.finish()

        val month = awaitMonth(monthKeyNow(), minRecords = 2)
        assertEquals(2, month.records.size)
        val q1Record = month.records.single { it.itemId == q1.id }
        val q2Record = month.records.single { it.itemId == q2.id }
        assertNull("no baseline survives a resume, so seconds must be unknown, not 0", q1Record.seconds)
        assertEquals(0, q2Record.seconds)
    }

    @Test
    fun `an unresolvable question id is logged, not silently ignored`() = runBlocking {
        ShadowLog.reset()
        val q1 = question("q1")
        // "ghost" is in the sitting's question order but was never resolved
        // into a Question -- QuestionProjection.project returns null for
        // malformed authoring data, so this can happen for real.
        val session = sessionOf(SittingMode.TUTOR, listOf("ghost", q1.id))
        val viewModel = RunnerViewModel(session, listOf(q1), store, sync)

        viewModel.choose("A")
        viewModel.commit()

        val warnings = ShadowLog.getLogsForTag("RunnerViewModel")
        assertTrue(
            "expected a warning naming the unresolved id, got: $warnings",
            warnings.any { it.msg.contains("ghost") },
        )
        assertEquals(emptyMap<String, Int>(), viewModel.session.value.answers)
    }

    @Test
    fun `checking answer after answer in tutor mode banks every one of them`() = runBlocking {
        // Tutor mode banks from commit(), one independently launched
        // coroutine per answer checked -- so a student working quickly has
        // several read-modify-writes of the same month shard in flight at
        // once. Every one of their answers must survive that.
        val questions = (1..24).map { question("q$it", correctLabel = "A") }
        val viewModel = RunnerViewModel(
            sessionOf(SittingMode.TUTOR, questions.map { it.id }),
            questions,
            store,
            sync,
        )

        for (index in questions.indices) {
            viewModel.goTo(index)
            viewModel.choose("A")
            viewModel.commit()
        }

        val month = runCatching { awaitMonth(monthKeyNow(), minRecords = questions.size) }.getOrNull()
        assertEquals(
            "every checked answer must reach the shard; a lost one is a lost attempt",
            questions.map { it.id }.toSet(),
            month?.records?.map { it.itemId }?.toSet() ?: emptySet<String>(),
        )
        assertEquals(
            "the index folds once per record, so its total must match the shard",
            questions.size,
            awaitIndex(minAttempts = questions.size).totals.attempts,
        )
    }
}
