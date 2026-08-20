package com.synapse.android.feature.practical

import android.content.Context
import androidx.room.Room
import androidx.test.core.app.ApplicationProvider
import com.synapse.android.core.api.SynapseApi
import com.synapse.android.core.cache.CortexDatabase
import com.synapse.android.core.cache.LocalStore
import com.synapse.android.core.model.LedgerDecoder
import com.synapse.android.core.practical.PRACTICAL_PROGRESS_KEY
import com.synapse.android.core.practical.PRACTICAL_SKILLS
import com.synapse.android.core.progress.AttemptIndex
import com.synapse.android.core.progress.AttemptMonth
import com.synapse.android.core.progress.AttemptStore
import com.synapse.android.core.practical.PracticalProgress
import com.synapse.android.core.sync.SyncEngine
import java.util.concurrent.ConcurrentHashMap
import kotlinx.coroutines.delay
import kotlinx.coroutines.flow.first
import kotlinx.coroutines.runBlocking
import kotlinx.coroutines.withContext
import kotlinx.coroutines.Dispatchers
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

/**
 * [PracticalViewModel] exercised against a real (in-memory) [LocalStore] and
 * a real [SyncEngine] backed by [MockWebServer] -- the same discipline
 * [RunnerViewModelTest] and [com.synapse.android.feature.qbank.QuestionBankViewModelTest]
 * use, so a passing test here means the whole offline-first path -- ledger to
 * pool, tick to stored progress, finish to attempt log -- actually works, not
 * just that a method was called.
 */
@RunWith(RobolectricTestRunner::class)
class PracticalViewModelTest {

    private lateinit var server: MockWebServer
    private lateinit var database: CortexDatabase
    private lateinit var store: LocalStore
    private lateinit var api: SynapseApi
    private lateinit var sync: SyncEngine

    private val overrides = ConcurrentHashMap<String, () -> MockResponse>()
    private val json = Json { ignoreUnknownKeys = true }

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

    /** Matches the shape `PracticalProjection.project` reads -- see that class's own doc. */
    private fun practicalJson(
        id: String,
        type: String,
        title: String = "Item $id",
        subjectId: String = "cvs",
        status: String = "Published",
        minutes: Int? = 8,
        marks: Int? = 20,
        markSections: String = "[]",
        decisions: String = "[]",
        questions: String = "[]",
    ): String {
        val durationField = minutes?.let { ",\"Duration\":\"$it\"" }.orEmpty()
        val marksField = marks?.let { ",\"Marks\":\"$it\"" }.orEmpty()
        return """
            {"id":"$id","kind":"practical","status":"$status","subjectId":"$subjectId",
             "title":"$title",
             "fields":{"Type":"$type","Difficulty":"Moderate"$durationField$marksField},
             "practicalData":{"candidateInstructions":"Instructions for $id",
               "markSections":$markSections,"decisions":$decisions,"questions":$questions}}
        """.trimIndent()
    }

    private suspend fun seed(vararg raws: String) {
        store.replaceLedger(LedgerDecoder.decode(raws.joinToString(",", prefix = "[", postfix = "]")).items)
    }

    private suspend fun awaitDocument(key: String): String = withTimeout(5_000) {
        var value: String? = store.document(key)?.json
        while (value == null) {
            delay(5)
            value = store.document(key)?.json
        }
        value
    }

    private suspend fun thisMonth(): AttemptMonth? =
        store.document(AttemptStore.monthKey(AttemptStore.month(java.time.Instant.now())))?.json
            ?.let { json.decodeFromString(AttemptMonth.serializer(), it) }

    /**
     * [timeoutMs] is generous because a serialised write path is meant to be
     * slow: twelve reveals are twelve turns through the lock, each of them
     * two documents saved, queued and drained. Waiting too briefly would turn
     * "this is correct but unhurried" into a red test.
     */
    private suspend fun awaitMonth(minRecords: Int, timeoutMs: Long = 20_000): AttemptMonth = withTimeout(timeoutMs) {
        var month = thisMonth()
        while (month == null || month.records.size < minRecords) {
            delay(5)
            month = thisMonth()
        }
        month
    }

    private suspend fun readIndex(): AttemptIndex =
        store.document(AttemptStore.INDEX_KEY)?.json?.let { json.decodeFromString(AttemptIndex.serializer(), it) }
            ?: AttemptIndex()

    /**
     * As [awaitMonth] and its [AttemptIndex] twin, but handing back whatever
     * is stored when the wait runs out rather than failing on the timeout --
     * so a test about *lost* records fails saying how many went missing
     * instead of saying only that it waited.
     */
    private suspend fun awaitMonthOrGiveUp(minRecords: Int): AttemptMonth =
        runCatching { awaitMonth(minRecords) }.getOrElse { thisMonth() ?: AttemptMonth(month = "none") }

    private suspend fun awaitIndexOrGiveUp(minAttempts: Int): AttemptIndex = runCatching {
        withTimeout(20_000) {
            var index = readIndex()
            while (index.totals.attempts < minAttempts) {
                delay(5)
                index = readIndex()
            }
            index
        }
    }.getOrElse { readIndex() }

    private suspend fun readProgress(): PracticalProgress =
        store.document(PRACTICAL_PROGRESS_KEY)?.json
            ?.let { json.decodeFromString(PracticalProgress.serializer(), it) }
            ?: PracticalProgress()

    @Test
    fun `all five formats render from one item kind`() = runBlocking {
        seed(
            practicalJson("os-1", "OSCE station", markSections = """[{"id":"sec1","title":"Section","items":["m1"]}]"""),
            practicalJson("cc-1", "Clinical case", decisions = """[{"id":"d1","title":"D1","context":"ctx","prompt":"Q?","answer":"A"}]"""),
            practicalJson("li-1", "Lab interpretation", questions = """[{"id":"q1","prompt":"Interpret","answer":"A"}]"""),
            practicalJson("li-2", "Imaging interpretation", questions = """[{"id":"q1","prompt":"Interpret","answer":"A"}]"""),
            practicalJson("sk-1", "Skills checklist", markSections = """[{"id":"sec1","title":"Section","items":["m1"]}]"""),
        )
        val viewModel = PracticalViewModel(store, sync)

        val items = withTimeout(5_000) { viewModel.items.first { it.size == 5 } }

        // One Practical class for all five -- type is the only thing that varies.
        assertEquals(
            setOf("OSCE station", "Clinical case", "Lab interpretation", "Imaging interpretation", "Skills checklist"),
            items.map { it.type }.toSet(),
        )
    }

    @Test
    fun `a tick is stored under the practical progress key`() = runBlocking {
        assertEquals("synapse.practical.progress.v1", PRACTICAL_PROGRESS_KEY)

        seed(practicalJson("os-1", "OSCE station", markSections = """[{"id":"sec1","title":"Section","items":["m1"]}]"""))
        val viewModel = PracticalViewModel(store, sync)
        withTimeout(5_000) { viewModel.items.first { it.size == 1 } }

        viewModel.openStation("os-1", minutes = 8)
        viewModel.tick("sec1:0", true)
        viewModel.finishStation("os-1", marks = 1, outOf = 1)

        awaitDocument(PRACTICAL_PROGRESS_KEY)
        val stored = readProgress()
        assertEquals(listOf("sec1:0"), stored.stations.getValue("os-1").checkedItems)
    }

    @Test
    fun `ticks survive leaving and reopening a station`() = runBlocking {
        seed(practicalJson("os-1", "OSCE station", markSections = """[{"id":"sec1","title":"Section","items":["m1","m2"]}]"""))
        val first = PracticalViewModel(store, sync)
        withTimeout(5_000) { first.items.first { it.size == 1 } }
        first.openStation("os-1", minutes = 8)
        first.tick("sec1:0", true)
        first.finishStation("os-1", marks = 1, outOf = 2)
        awaitDocument(PRACTICAL_PROGRESS_KEY)

        val second = PracticalViewModel(store, sync)
        second.openStation("os-1", minutes = 8)

        assertEquals(setOf("sec1:0"), second.ticks.value)
    }

    @Test
    fun `finishing a self-ticked station writes an attempt with a null mark`() = runBlocking {
        seed(practicalJson("os-1", "OSCE station", markSections = """[{"id":"sec1","title":"Section","items":["m1"]}]"""))
        val viewModel = PracticalViewModel(store, sync)
        withTimeout(5_000) { viewModel.items.first { it.size == 1 } }
        viewModel.openStation("os-1", minutes = 8)
        viewModel.tick("sec1:0", true)

        viewModel.finishStation("os-1", marks = 1, outOf = 1)

        val month = awaitMonth(1)
        val record = month.records.single { it.itemId == "os-1" }
        assertNull(record.correct)
    }

    @Test
    fun `a finished station writes an attempt on the station surface`() = runBlocking {
        seed(practicalJson("os-1", "OSCE station", markSections = """[{"id":"sec1","title":"Section","items":["m1"]}]"""))
        val viewModel = PracticalViewModel(store, sync)
        withTimeout(5_000) { viewModel.items.first { it.size == 1 } }
        viewModel.openStation("os-1", minutes = 8)

        viewModel.finishStation("os-1", marks = 0, outOf = 1)

        val month = awaitMonth(1)
        val record = month.records.single { it.itemId == "os-1" }
        assertEquals("station", record.surface)
    }

    @Test
    fun `a case's decisions stay hidden until revealed`() = runBlocking {
        seed(practicalJson("cc-1", "Clinical case", decisions = """[{"id":"d1","title":"D1","context":"ctx","prompt":"Q?","answer":"A"}]"""))
        val viewModel = PracticalViewModel(store, sync)
        val items = withTimeout(5_000) { viewModel.items.first { it.size == 1 } }
        val case = items.single()
        viewModel.openCase(case.id)

        assertFalse("d1" in viewModel.revealed.value)

        viewModel.answerCaseDecision(case.id, "d1", index = 0, totalSteps = 1)

        assertTrue("d1" in viewModel.revealed.value)
    }

    @Test
    fun `a lab set's answers stay hidden until revealed`() = runBlocking {
        seed(practicalJson("li-1", "Lab interpretation", questions = """[{"id":"q1","prompt":"Interpret","answer":"A"}]"""))
        val viewModel = PracticalViewModel(store, sync)
        val items = withTimeout(5_000) { viewModel.items.first { it.size == 1 } }
        val lab = items.single()
        viewModel.openLab(lab.id)

        assertFalse("q1" in viewModel.revealed.value)

        viewModel.answerLabQuestion(lab.id, "q1", index = 0, totalItems = 1)

        assertTrue("q1" in viewModel.revealed.value)
    }

    @Test
    fun `a station with no mark scheme still opens`() = runBlocking {
        seed(practicalJson("os-1", "OSCE station", markSections = "[]"))
        val viewModel = PracticalViewModel(store, sync)
        val items = withTimeout(5_000) { viewModel.items.first { it.size == 1 } }
        assertTrue(items.single().markSections.isEmpty())

        viewModel.openStation("os-1", minutes = 8)

        assertTrue(viewModel.ticks.value.isEmpty())
    }

    @Test
    fun `a published skills checklist lands on the stations tab, not the skills tab`() {
        // A checklist is an authored station; the Skills tab is the bundled
        // curriculum list. The two must never resolve to the same tab.
        assertEquals(PracticalTab.OSCE, practicalTab("Skills checklist"))
        assertEquals(PracticalTab.OSCE, practicalTab("OSCE station"))
    }

    @Test
    fun `an imaging item and a lab item share the lab tab`() {
        assertEquals(PracticalTab.LAB, practicalTab("Lab interpretation"))
        assertEquals(PracticalTab.LAB, practicalTab("Imaging interpretation"))
    }

    @Test
    fun `an unpublished practical does not appear`() = runBlocking {
        seed(
            practicalJson("os-1", "OSCE station", status = "Published"),
            practicalJson("os-2", "OSCE station", status = "Draft"),
        )
        val viewModel = PracticalViewModel(store, sync)

        val items = withTimeout(5_000) { viewModel.items.first { it.isNotEmpty() } }
        // Give a stray second write a moment to have shown up, were there one.
        delay(50)

        assertEquals(listOf("os-1"), viewModel.items.value.map { it.id })
        assertEquals(1, items.size)
    }

    @Test
    fun `the bundled skill ids match the ones the web stores status under`() {
        val expected = setOf(
            "sk-bp", "sk-cvs", "sk-resp", "sk-abdo", "sk-vene", "sk-cann",
            "sk-ecg", "sk-cath", "sk-bls", "sk-consent", "sk-breaking", "sk-handover",
        )
        assertEquals(expected, PRACTICAL_SKILLS.map { it.id }.toSet())
    }

    /**
     * A progress document written by a client that knows a station shape this
     * one does not. Valid JSON; it will not decode here, because
     * [com.synapse.android.core.practical.StationProgress] has no defaults.
     * The cases, labs and skills in it are a real student's work.
     */
    private val fromAnotherClient =
        """{"version":1,"stations":{"os-1":{"attempts":3,"score":{"marks":18,"outOf":20}}},""" +
            """"cases":{"cc-1":{"status":"completed","lastStep":5,"steps":5,"lastAt":"2026-08-01T00:00:00Z"}},""" +
            """"labs":{},"skills":{"sk-bp":{"status":"ready","lastAt":"2026-08-01T00:00:00Z"}}}"""

    @Test
    fun `an unreadable progress document is never overwritten with an empty one`() = runBlocking {
        store.putDocument(PRACTICAL_PROGRESS_KEY, fromAnotherClient, null)
        seed(practicalJson("os-1", "OSCE station", markSections = STATION_SECTION))
        val viewModel = PracticalViewModel(store, sync)
        withTimeout(5_000) { viewModel.items.first { it.size == 1 } }
        viewModel.openStation("os-1", minutes = 8)
        viewModel.tick("m1", true)

        // The write path reads, folds and writes the *whole* document. If the
        // read quietly yields an empty one, this single call erases a
        // completed case and a signed-off skill -- on every client.
        viewModel.finishStation("os-1", marks = 1, outOf = 2)

        // Long enough for a wrong write to have landed. It logs an uncaught
        // decode failure on the background scope, which is the point.
        delay(300)
        assertEquals(fromAnotherClient, store.document(PRACTICAL_PROGRESS_KEY)?.json)
        assertTrue(store.outbox().none { it.key == PRACTICAL_PROGRESS_KEY })
    }

    @Test
    fun `opening a station over an unreadable document still opens it`() = runBlocking {
        // The other half of the rule: a read that writes nothing may fall
        // back, because throwing here only costs the student the station.
        store.putDocument(PRACTICAL_PROGRESS_KEY, fromAnotherClient, null)
        seed(practicalJson("os-1", "OSCE station", markSections = STATION_SECTION))
        val viewModel = PracticalViewModel(store, sync)
        withTimeout(5_000) { viewModel.items.first { it.size == 1 } }

        viewModel.openStation("os-1", minutes = 8)

        assertTrue(viewModel.ticks.value.isEmpty())
        assertEquals(8 * 60, viewModel.remaining.value)
    }

    @Test
    fun `revealing every lab answer at once loses none of them`() = runBlocking {
        val questions = (1..12).joinToString(",") {
            """{"id":"q$it","prompt":"Question $it","answer":"A$it","answers":[{"id":"a$it","text":"A$it"}]}"""
        }
        seed(practicalJson("li-1", "Lab interpretation", questions = "[$questions]"))
        val viewModel = PracticalViewModel(store, sync)
        val lab = withTimeout(5_000) { viewModel.items.first { it.size == 1 } }.single()
        assertEquals(12, lab.answerableQuestions.size)
        viewModel.openLab(lab.id)

        // Every Reveal is on screen at once; nothing stops a student hitting
        // them in quick succession. Each call launches its own coroutine that
        // reads the progress document and the month shard, folds, and writes
        // both back -- so without a lock the later writes are folded onto
        // stale reads and the earlier reveals simply vanish.
        withContext(Dispatchers.Default) {
            lab.answerableQuestions.forEachIndexed { index, question ->
                viewModel.answerLabQuestion(lab.id, question.id, index, lab.answerableQuestions.size)
            }
        }

        val month = awaitMonthOrGiveUp(12)
        assertEquals(
            (0 until 12).map { "li-1:$it" }.toSortedSet(),
            month.records.filter { it.surface == "lab" }.map { it.itemId }.toSortedSet(),
        )

        runCatching { withTimeout(20_000) { while (readProgress().labs["li-1"]?.done != 12) delay(5) } }
        assertEquals(12, readProgress().labs.getValue("li-1").done)

        // The index is the other read-modify-write in the same critical
        // section, and it is what every headline total is read from. A lost
        // fold here is a student's attempt count quietly going backwards.
        assertEquals(12, awaitIndexOrGiveUp(12).totals.attempts)
    }

    @Test
    fun `leaving a station without finishing it banks nothing`() = runBlocking {
        seed(practicalJson("os-1", "OSCE station", markSections = STATION_SECTION))
        val viewModel = PracticalViewModel(store, sync)
        withTimeout(5_000) { viewModel.items.first { it.size == 1 } }
        viewModel.openStation("os-1", minutes = 8)
        viewModel.tick("m1", true)

        viewModel.abandonStation()

        // The only other way out of a station banks a real attempt and a real
        // score for a run that never happened.
        delay(200)
        assertNull(store.document(PRACTICAL_PROGRESS_KEY))
        assertNull(store.document(AttemptStore.INDEX_KEY))
        assertTrue(store.outbox().isEmpty())
        assertTrue(viewModel.ticks.value.isEmpty())
    }

    @Test
    fun `leaving a station does not erase what an earlier run banked`() = runBlocking {
        seed(practicalJson("os-1", "OSCE station", markSections = STATION_SECTION))
        val first = PracticalViewModel(store, sync)
        withTimeout(5_000) { first.items.first { it.size == 1 } }
        first.openStation("os-1", minutes = 8)
        first.tick("m1", true)
        first.finishStation("os-1", marks = 1, outOf = 2)
        awaitDocument(PRACTICAL_PROGRESS_KEY)

        val second = PracticalViewModel(store, sync)
        second.openStation("os-1", minutes = 8)
        second.tick("m2", true)
        second.abandonStation()

        delay(200)
        assertEquals(listOf("m1"), readProgress().stations.getValue("os-1").checkedItems)
    }

    @Test
    fun `an oral question writes neither progress nor an attempt`() = runBlocking {
        val viewModel = PracticalViewModel(store, sync)

        viewModel.revealOral("or-hf-1")

        // Give any (wrongly) launched write a moment to have landed.
        delay(50)
        assertNull(store.document(PRACTICAL_PROGRESS_KEY))
        assertTrue(store.outbox().isEmpty())
    }

    private companion object {
        /** Two authored mark items, ids and all, as the web writes them. */
        const val STATION_SECTION =
            """[{"id":"sec1","title":"Introduction","marks":2,""" +
                """"items":[{"id":"m1","text":"Washes hands"},{"id":"m2","text":"Introduces self"}]}]"""
    }
}
