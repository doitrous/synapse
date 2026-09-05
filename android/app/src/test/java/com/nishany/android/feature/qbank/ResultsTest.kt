package com.nishany.android.feature.qbank

import android.content.Context
import androidx.room.Room
import androidx.test.core.app.ApplicationProvider
import com.nishany.android.core.api.NishanyApi
import com.nishany.android.core.cache.CortexDatabase
import com.nishany.android.core.cache.LocalStore
import com.nishany.android.core.model.AnswerOption
import com.nishany.android.core.model.LedgerDecoder
import com.nishany.android.core.model.Question
import com.nishany.android.core.progress.AttemptIndex
import com.nishany.android.core.progress.AttemptLedger
import com.nishany.android.core.progress.AttemptMonth
import com.nishany.android.core.progress.AttemptRecord
import com.nishany.android.core.progress.AttemptStats
import com.nishany.android.core.progress.AttemptStore
import com.nishany.android.core.progress.DayCount
import com.nishany.android.core.qbank.LiveSession
import com.nishany.android.core.qbank.QuestionState
import com.nishany.android.core.qbank.SittingMode
import com.nishany.android.core.sync.SyncEngine
import java.time.Instant
import java.time.LocalDate
import java.util.TimeZone
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
    private lateinit var api: NishanyApi
    private lateinit var sync: SyncEngine

    private val overrides = ConcurrentHashMap<String, () -> MockResponse>()
    private val json = Json { ignoreUnknownKeys = true }
    private val namesSerializer = MapSerializer(String.serializer(), String.serializer())

    // dailyCounts/currentStreak resolve "today" -- and every record's day --
    // through the JVM's default zone (see AttemptStats.localDay), and that
    // is deliberate: a student who studies at 11pm must not have it counted
    // against tomorrow. Pinned here to a fixed, real-offset zone (Asia/Riyadh,
    // UTC+3, no daylight saving) rather than UTC, so the tests are both
    // deterministic on any CI box AND able to tell the local-calendar rule
    // apart from a regression to ZoneOffset.UTC -- pinning to UTC itself
    // would make that regression invisible, since systemDefault() and
    // ZoneOffset.UTC would then compute identical dates.
    private lateinit var originalTimeZone: TimeZone

    @Before
    fun setUp() {
        originalTimeZone = TimeZone.getDefault()
        TimeZone.setDefault(TimeZone.getTimeZone("Asia/Riyadh"))
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
        api = NishanyApi(
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
        TimeZone.setDefault(originalTimeZone)
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

    @Test
    fun `dailyCounts emits a silent day with zeros rather than dropping it`() {
        val today = LocalDate.of(2026, 8, 19)
        // 08-17 has one marked-correct attempt, 08-19 has one marked-wrong
        // attempt, and 08-18 in between has nothing logged at all.
        val records = listOf(
            record(id = "d1", at = "2026-08-17T12:00:00Z", correct = true),
            record(id = "d2", at = "2026-08-19T12:00:00Z", correct = false),
        )

        val days = AttemptStats.dailyCounts(records, days = 3, today = today)

        assertEquals(3, days.size)
        assertEquals(
            DayCount(date = "2026-08-17", attempts = 1, marked = 1, correct = 1),
            days.single { it.date == "2026-08-17" },
        )
        // The silent day: present, not dropped, and zeroed rather than
        // inheriting a neighbour's counts.
        assertEquals(
            DayCount(date = "2026-08-18", attempts = 0, marked = 0, correct = 0),
            days.single { it.date == "2026-08-18" },
        )
        assertEquals(
            DayCount(date = "2026-08-19", attempts = 1, marked = 1, correct = 0),
            days.single { it.date == "2026-08-19" },
        )
    }

    @Test
    fun `currentStreak crosses the today-yesterday boundary in both directions`() {
        val today = LocalDate.of(2026, 8, 19)

        // Active 08-16 through 08-18 (yesterday); nothing logged today yet.
        // Today being silent so far must not zero the streak.
        val endingYesterday = listOf(
            record(id = "y1", at = "2026-08-16T12:00:00Z"),
            record(id = "y2", at = "2026-08-17T12:00:00Z"),
            record(id = "y3", at = "2026-08-18T12:00:00Z"),
        )
        assertEquals(3, AttemptStats.currentStreak(endingYesterday, today))

        // Active 08-16 and 08-17, but both 08-18 (yesterday) and 08-19
        // (today) are silent -- that is what actually ends a streak.
        val brokenByTwoSilentDays = listOf(
            record(id = "y4", at = "2026-08-16T12:00:00Z"),
            record(id = "y5", at = "2026-08-17T12:00:00Z"),
        )
        assertEquals(0, AttemptStats.currentStreak(brokenByTwoSilentDays, today))
    }

    @Test
    fun `distinctItems counts a repeated item once across two sittings`() {
        // q1 attempted in two different sittings; q2 in one of them.
        val records = listOf(
            record(id = "s1:qbank:q1", sessionId = "s1", itemId = "q1"),
            record(id = "s2:qbank:q1", sessionId = "s2", itemId = "q1"),
            record(id = "s2:qbank:q2", sessionId = "s2", itemId = "q2"),
        )

        assertEquals(2, AttemptStats.distinctItems(records))
    }

    @Test
    fun `dailyCounts resolves a late-night attempt onto the student's local day, not UTC's`() {
        val today = LocalDate.of(2026, 8, 20)
        val records = listOf(
            // 20:00Z is 23:00 local (UTC+3) -- 08-19 under either zone.
            record(id = "z1", at = "2026-08-19T20:00:00Z"),
            // 21:30Z is 00:30 local (UTC+3) the *next* day -- 08-20 local,
            // but still 08-19 under UTC. This is the record a reading of
            // ZoneOffset.UTC instead of the device zone would misfile.
            record(id = "z2", at = "2026-08-19T21:30:00Z"),
        )

        val days = AttemptStats.dailyCounts(records, days = 2, today = today)

        assertEquals(1, days.single { it.date == "2026-08-19" }.attempts)
        assertEquals(1, days.single { it.date == "2026-08-20" }.attempts)
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

    // -- AttemptLedger -------------------------------------------------------

    @Test
    fun `the ledger caps at the newest six shards, never opening the seventh`() = runBlocking {
        // One month more than the window, so the oldest is exactly the shard
        // the cap must exclude. Six is website-first, from
        // `src/lib/useAttemptLog.ts:17`, and is the same constant the sync
        // engine fetches by -- reading further back than it fetches would
        // only ever find shards that were never downloaded.
        assertEquals(6, AttemptStore.HISTORY_MONTHS)
        val months = (1..AttemptStore.HISTORY_MONTHS + 1).map { "2025-%02d".format(it) }
        val oldest = months.first()
        val keptMonths = months.drop(1)
        check(keptMonths.size == AttemptStore.HISTORY_MONTHS)

        store.putDocument(AttemptStore.INDEX_KEY, json.encodeToString(AttemptIndex.serializer(), AttemptIndex(months = months)), null)

        // The oldest shard's document is not valid AttemptMonth JSON at
        // all -- if the cap ever slipped and this shard were opened,
        // decoding it would throw and fail the test outright, rather than
        // this test only being able to infer "never opened" from an absence
        // that a merely-empty shard could produce just as easily.
        store.putDocument(AttemptStore.monthKey(oldest), "not valid attempt-month json", null)

        for (month in keptMonths) {
            val monthDoc = AttemptStore.addAttempt(
                AttemptMonth(month = month),
                record(id = "$month:qbank:q1", at = "${month}-15T09:00:00Z"),
            )
            store.putDocument(AttemptStore.monthKey(month), json.encodeToString(AttemptMonth.serializer(), monthDoc), null)
        }

        val records = AttemptLedger.records(store)

        assertEquals(AttemptStore.HISTORY_MONTHS, records.size)
        assertTrue(records.none { it.id.startsWith(oldest) })
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
