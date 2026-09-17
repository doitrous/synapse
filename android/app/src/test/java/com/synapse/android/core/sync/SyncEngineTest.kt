package com.synapse.android.core.sync

import android.content.Context
import androidx.room.Room
import androidx.test.core.app.ApplicationProvider
import com.synapse.android.core.api.SynapseApi
import com.synapse.android.core.cache.CortexDatabase
import com.synapse.android.core.cache.LocalStore
import com.synapse.android.core.model.ContentKind
import com.synapse.android.core.progress.AttemptStore
import java.time.Duration
import java.time.Instant
import java.time.YearMonth
import java.time.ZoneId
import java.util.concurrent.ConcurrentHashMap
import java.util.concurrent.CopyOnWriteArrayList
import java.util.concurrent.TimeUnit
import kotlinx.coroutines.cancelAndJoin
import kotlinx.coroutines.delay
import kotlinx.coroutines.flow.first
import kotlinx.coroutines.launch
import kotlinx.coroutines.runBlocking
import kotlinx.coroutines.withTimeout
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
 * [SyncEngine] is the only thing in the app allowed to call the network, so
 * these tests drive it end to end against a real [MockWebServer] and a real
 * (in-memory) [LocalStore] — never a mock of either.
 *
 * Requests that a given test does not care about are answered by sensible
 * defaults (see [defaultResponse]) rather than left unstubbed: a manifest
 * request answers with every catalogue key reported as never-written, and a
 * per-key document request answers with `{"value":null,"updatedAt":null}` —
 * the same "nothing here yet" shape the server itself uses. That is what
 * lets a test about the outbox stub nothing about the catalogue at all.
 */
@RunWith(RobolectricTestRunner::class)
class SyncEngineTest {

    private lateinit var server: MockWebServer
    private lateinit var database: CortexDatabase
    private lateinit var store: LocalStore
    private lateinit var api: SynapseApi
    private lateinit var engine: SyncEngine

    private val requests = CopyOnWriteArrayList<RecordedRequest>()
    private val overrides = ConcurrentHashMap<String, () -> MockResponse>()

    @Before
    fun setUp() {
        server = MockWebServer()
        server.dispatcher = object : Dispatcher() {
            override fun dispatch(request: RecordedRequest): MockResponse {
                requests.add(request)
                val key = "${request.method} ${request.path}"
                return overrides[key]?.invoke() ?: defaultResponse(request)
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
        engine = SyncEngine(api, store)
    }

    @After
    fun tearDown() {
        server.shutdown()
        database.close()
    }

    // -- Step 1: the catalogue -------------------------------------------

    @Test
    fun `the catalogue key list matches STUDENT_READABLE_STATE exactly`() {
        assertEquals(
            listOf(
                "nishany-academic-universities-v1", "nishany-course-curricula-v1",
                "nishany-module-schedules-v1", "nishany-admin-content-ledger-v4",
                "nishany-concept-graph-v2", "nishany-relation-types-v1",
                "nishany-taxonomy-tree-v4", "nishany-medical-library-taxonomy-v1",
                "nishany-medical-glossary-v1", "nishany-medical-evidence-published-v1",
                "nishany-plans-v1", "nishany-notification-campaigns-v1",
                "nishany-vouchers-v1", "nishany-system-colors-v1",
            ),
            SyncEngine.CATALOGUE_KEYS,
        )
    }

    @Test
    fun `only documents whose stamp moved are fetched`() = runBlocking {
        val stamp = Instant.parse("2026-01-01T00:00:00Z")
        val unchangedA = "nishany-plans-v1"
        val unchangedB = "nishany-vouchers-v1"
        val changed = "nishany-system-colors-v1"

        store.putDocument(unchangedA, """{"a":1}""", stamp)
        store.putDocument(unchangedB, """{"b":1}""", stamp)
        // `changed` is left unstored (local stamp null), so the manifest's
        // non-null stamp for it always differs.

        stubManifest(mapOf(unchangedA to stamp, unchangedB to stamp, changed to Instant.parse("2026-02-01T00:00:00Z")))
        stubGet(changed, """{"universityIds":[]}""", Instant.parse("2026-02-01T00:00:00Z"))

        engine.refresh()

        val catalogueGets = requests.filter { it.method == "GET" && it.path in catalogueGetPaths() }
        assertEquals(listOf("/api/state/$changed"), catalogueGets.map { it.path })
    }

    @Test
    fun `nothing changed costs exactly one request`() = runBlocking {
        // The manifest's default answer (see defaultResponse) reports every
        // catalogue key as never-written, matching a fresh, empty store — so
        // the diff in syncCatalogue() finds nothing to fetch. The per-student
        // documents pulled after the catalogue (there is no manifest for
        // those — see the class doc on SyncEngine.refresh) are unaffected by
        // this and are not part of what this test is about.
        engine.refresh()

        val catalogueRequests = requests.filter { it.path in catalogueGetPaths() }
        assertTrue(catalogueRequests.isEmpty())
        val manifestRequests = requests.count { it.path == "/api/state/manifest" }
        assertEquals(1, manifestRequests)
    }

    @Test
    fun `a 404 on the manifest falls back to fetching every catalogue`() = runBlocking {
        overrides["GET /api/state/manifest"] = { MockResponse().setResponseCode(404) }

        engine.refresh()

        val fetched = requests.filter { it.method == "GET" && it.path in catalogueGetPaths() }.map { it.path }.toSet()
        assertEquals(SyncEngine.CATALOGUE_KEYS.map { "/api/state/$it" }.toSet(), fetched)
    }

    @Test
    fun `the ledger is shredded into rows the store can query`() = runBlocking {
        val ledgerKey = "nishany-admin-content-ledger-v4"
        val stamp = Instant.parse("2026-03-01T00:00:00Z")
        stubManifest(mapOf(ledgerKey to stamp))
        stubGet(
            ledgerKey,
            """[{"id":"q1","kind":"question","status":"Published","title":"Stem","subjectId":"med"}]""",
            stamp,
        )

        engine.refresh()

        val items = store.ledgerItems(ContentKind.QUESTION).first()
        assertEquals(listOf("q1"), items.map { it.id })
        assertEquals("Stem", items.single().title)
    }

    // -- Step 2: per-student documents and StatePrecedence ----------------

    @Test
    fun `a newer local copy is not overwritten by the server's`() = runBlocking {
        val key = "nishany.qbank.marked.v1"
        store.putDocument(key, """["q1"]""", null)
        // Clearly in the past relative to the local write that just happened.
        stubGet(key, """["q1","q2"]""", Instant.now().minusSeconds(600))

        engine.refresh()

        assertEquals("""["q1"]""", store.document(key)?.json)
    }

    @Test
    fun `a stale local copy is replaced`() = runBlocking {
        val key = "nishany.qbank.marked.v1"
        store.putDocument(key, """["q1"]""", null)
        // Millisecond precision: Room's Instant converter (Converters.kt)
        // round-trips through epoch millis, so a stamp with finer precision
        // than that would never compare equal to what comes back out.
        val serverStamp = Instant.ofEpochMilli(Instant.now().plusSeconds(600).toEpochMilli())
        stubGet(key, """["q1","q2"]""", serverStamp)

        engine.refresh()

        assertEquals("""["q1","q2"]""", store.document(key)?.json)
        assertEquals(serverStamp, store.document(key)?.serverUpdatedAt)
    }

    // -- The outbox ---------------------------------------------------------

    @Test
    fun `the outbox drains in order and empties`() = runBlocking {
        val keyA = "nishany.qbank.marked.v1"
        val keyB = "nishany.practical.progress.v1"
        store.enqueue(keyA, """["q1"]""", Instant.now())
        store.enqueue(keyB, """{"done":1}""", Instant.now())

        engine.drain()

        val puts = requests.filter { it.method == "PUT" }.map { it.path }
        assertEquals(listOf("/api/user-state/$keyA", "/api/user-state/$keyB"), puts)
        assertTrue(store.outbox().isEmpty())
    }

    @Test
    fun `a forbidden document is dropped from the queue rather than retried forever`() = runBlocking {
        val key = "nishany.qbank.marked.v1"
        store.enqueue(key, """["q1"]""", Instant.now())
        overrides["PUT /api/user-state/$key"] = { MockResponse().setResponseCode(403) }

        engine.drain()

        assertTrue(store.outbox().isEmpty())
    }

    @Test
    fun `a transient failure leaves the entry queued`() = runBlocking {
        val key = "nishany.qbank.marked.v1"
        store.enqueue(key, """["q1"]""", Instant.now())
        overrides["PUT /api/user-state/$key"] = { MockResponse().setResponseCode(500) }

        engine.drain()

        val remaining = store.outbox()
        assertEquals(1, remaining.size)
        assertEquals(key, remaining.single().key)
    }

    @Test
    fun `a malformed outbox entry is dropped without wedging the rest of the queue`() = runBlocking {
        val badKey = "nishany.qbank.marked.v1"
        val goodKey = "nishany.practical.progress.v1"
        // Not valid JSON at all -- parseToJsonElement throws SerializationException,
        // which must be handled the same way ApiError.Forbidden is, not left to
        // abort the loop and strand goodKey behind it.
        store.enqueue(badKey, "not valid json {{{", Instant.now())
        store.enqueue(goodKey, """{"done":1}""", Instant.now())

        engine.drain()

        assertTrue(store.outbox().isEmpty())
        assertTrue(requests.any { it.method == "PUT" && it.path == "/api/user-state/$goodKey" })
        assertTrue(requests.none { it.method == "PUT" && it.path == "/api/user-state/$badKey" })
    }

    @Test
    fun `write puts the document locally and drains it opportunistically`() = runBlocking {
        val key = "nishany.qbank.marked.v1"

        engine.write(key, """["q1"]""")

        assertEquals("""["q1"]""", store.document(key)?.json)
        assertTrue(store.outbox().isEmpty())
        assertTrue(requests.any { it.method == "PUT" && it.path == "/api/user-state/$key" })
    }

    @Test
    fun `write lands the document and the outbox entry together in one transaction`() = runBlocking {
        val key = "nishany.qbank.marked.v1"
        // Nothing drains it: write() must have already made both rows visible
        // in the same LocalStore.putDocumentAndEnqueue transaction before
        // drain() ever runs, not as two separable writes that could land one
        // without the other on a process death in between.
        overrides["PUT /api/user-state/$key"] = { MockResponse().setResponseCode(500) }

        engine.write(key, """["q1"]""")

        assertEquals("""["q1"]""", store.document(key)?.json)
        val outboxEntries = store.outbox()
        assertEquals(1, outboxEntries.size)
        assertEquals(key, outboxEntries.single().key)
        assertEquals("""["q1"]""", outboxEntries.single().json)
    }

    // -- Concurrency ----------------------------------------------------

    @Test
    fun `refresh while a refresh is running does not start a second one`() = runBlocking {
        overrides["GET /api/state/manifest"] = {
            MockResponse().setBody(manifestBody(emptyMap())).setBodyDelay(300, TimeUnit.MILLISECONDS)
        }

        val job = launch { engine.refresh() }
        withTimeout(5_000) { while (engine.status.value !is SyncStatus.Syncing) delay(5) }

        engine.refresh() // Should return immediately without issuing a second manifest request.
        job.join()

        assertEquals(1, requests.count { it.path == "/api/state/manifest" })
        assertTrue(engine.status.value is SyncStatus.Done)
    }

    @Test
    fun `a failure during refresh reports Failed status`() = runBlocking {
        overrides["GET /api/state/manifest"] = { MockResponse().setResponseCode(500) }

        engine.refresh()

        assertTrue(engine.status.value is SyncStatus.Failed)
        assertNull((engine.status.value as? SyncStatus.Done))
    }

    // -- Coming back to the foreground -----------------------------------

    /**
     * The app used to refresh exactly once per process. An Android process
     * outlives many sessions on one account, so a student who worked on the
     * web and then picked their phone back up read a cache nothing had asked
     * about since the app first opened. `RootScreen` now refreshes on every
     * arrival at STARTED, and this is the throttle that makes that
     * affordable -- without it, each task-switch and each rotation is a full
     * manifest diff.
     */
    @Test
    fun `a foreground inside the window does not ask the server again`() = runBlocking {
        engine.refresh()
        val afterFirst = requests.size
        assertTrue("the first pass must actually have gone out", afterFirst > 0)

        engine.refreshWhenStale(Duration.ofMinutes(2))

        assertEquals("nothing left the device", afterFirst, requests.size)
    }

    @Test
    fun `a foreground once the window has passed asks again`() = runBlocking {
        engine.refresh()
        val afterFirst = requests.size

        // Duration.ZERO rather than a sleep: it says "anything already
        // finished counts as stale", which is the branch under test, and a
        // test that waited out a real window would only be proving that
        // clocks advance.
        engine.refreshWhenStale(Duration.ZERO)

        assertTrue("a second pass went out", requests.size > afterFirst)
        assertTrue(engine.status.value is SyncStatus.Done)
    }

    /**
     * A failure carries no completion time, so it never satisfies the
     * window. Coming back to the foreground after a refresh that could not
     * reach the server tries again straight away -- which is the moment it
     * is most likely to work, since the usual reason for the failure is that
     * the phone was somewhere without signal.
     */
    @Test
    fun `a refresh that failed is retried on the next foreground, window or not`() = runBlocking {
        overrides["GET /api/state/manifest"] = { MockResponse().setResponseCode(500) }
        engine.refresh()
        assertTrue(engine.status.value is SyncStatus.Failed)
        val afterFailure = requests.size

        overrides.remove("GET /api/state/manifest")
        engine.refreshWhenStale(Duration.ofHours(1))

        assertTrue("the retry went out despite the window", requests.size > afterFailure)
        assertTrue(engine.status.value is SyncStatus.Done)
    }

    /**
     * Backgrounding the app cancels whatever pass `repeatOnLifecycle` had
     * running. Left on [SyncStatus.Syncing], that would show Account a
     * spinner that never resolves for the life of the process, and would
     * tell the next foreground that a pass was still in flight.
     */
    @Test
    fun `a cancelled refresh does not leave the status stuck on Syncing`() = runBlocking {
        overrides["GET /api/state/manifest"] = {
            MockResponse().setBody(manifestBody(emptyMap())).setBodyDelay(2, TimeUnit.SECONDS)
        }

        val job = launch { engine.refresh() }
        withTimeout(5_000) { while (engine.status.value !is SyncStatus.Syncing) delay(5) }
        job.cancelAndJoin()

        assertEquals(SyncStatus.Idle, engine.status.value)
    }

    // -- The attempt-shard window ----------------------------------------

    /**
     * One refresh must pull the same span of history the ledger reads back.
     *
     * These three numbers used to be three different numbers: the engine
     * fetched two shards, `AttemptLedger` read twelve, and the web
     * (`src/lib/useAttemptLog.ts:17`) loads six. Fetching fewer than the
     * ledger reads is silent -- a fresh install just shows two months where
     * the same student's laptop shows six -- but not harmless:
     * `QuestionBankViewModel.build` counts previous sittings against that
     * truncated ledger to auto-name "Test N", so it hands the student a name
     * the web has already used.
     */
    @Test
    fun `refresh fetches the same six months of shards the ledger reads`() = runBlocking {
        assertEquals("website-first, from src/lib/useAttemptLog.ts:17", 6, AttemptStore.HISTORY_MONTHS)

        engine.refresh()

        val currentMonth = YearMonth.now(ZoneId.systemDefault())
        val expected = (0 until AttemptStore.HISTORY_MONTHS)
            .map { currentMonth.minusMonths(it.toLong()) }
            .map { AttemptStore.monthKey("%04d-%02d".format(it.year, it.monthValue)) }
            .map { StateOwnership.pathFor(it) }
        val fetched = requests.filter { it.method == "GET" }.map { it.path }.toSet()

        assertEquals(
            "every month in the window the ledger reads must be fetched",
            emptyList<String>(),
            expected.filterNot { it in fetched },
        )
        // And no further back: a seventh shard is a request for a document no
        // screen on any client reads.
        val seventh = currentMonth.minusMonths(AttemptStore.HISTORY_MONTHS.toLong())
        assertTrue(
            StateOwnership.pathFor(AttemptStore.monthKey("%04d-%02d".format(seventh.year, seventh.monthValue))) !in fetched,
        )
    }

    // -- Helpers -------------------------------------------------------

    private fun catalogueGetPaths(): Set<String> = SyncEngine.CATALOGUE_KEYS.map { "/api/state/$it" }.toSet()

    private fun stubManifest(stamps: Map<String, Instant>) {
        overrides["GET /api/state/manifest"] = { MockResponse().setBody(manifestBody(stamps)) }
    }

    private fun stubGet(key: String, value: String, updatedAt: Instant?) {
        overrides["GET ${StateOwnership.pathFor(key)}"] = {
            MockResponse().setBody("""{"value":$value,"updatedAt":${updatedAt.jsonOrNull()}}""")
        }
    }

    private fun manifestBody(stamps: Map<String, Instant>): String {
        val body = SyncEngine.CATALOGUE_KEYS.joinToString(",", prefix = "{", postfix = "}") { key ->
            "\"$key\":${stamps[key].jsonOrNull()}"
        }
        return """{"keys":$body}"""
    }

    private fun Instant?.jsonOrNull(): String = this?.let { "\"$it\"" } ?: "null"

    /** The server's own "nothing here" shape, for any request a test did not stub. */
    private fun defaultResponse(request: RecordedRequest): MockResponse = when {
        request.method == "GET" && request.path == "/api/state/manifest" -> MockResponse().setBody(manifestBody(emptyMap()))
        request.method == "PUT" -> MockResponse().setBody("{}")
        else -> MockResponse().setBody("""{"value":null,"updatedAt":null}""")
    }
}
