package com.nishany.android.core.serialization

import android.content.Context
import androidx.room.Room
import androidx.test.core.app.ApplicationProvider
import com.nishany.android.core.api.NishanyApi
import com.nishany.android.core.cache.CortexDatabase
import com.nishany.android.core.cache.LocalStore
import com.nishany.android.core.model.LedgerDecoder
import com.nishany.android.core.practical.PRACTICAL_PROGRESS_KEY
import com.nishany.android.core.progress.AttemptRecord
import com.nishany.android.core.progress.AttemptStore
import com.nishany.android.core.progress.writeAttempt
import com.nishany.android.core.sync.SyncEngine
import com.nishany.android.feature.practical.PracticalViewModel
import java.time.Instant
import kotlinx.coroutines.delay
import kotlinx.coroutines.flow.first
import kotlinx.coroutines.runBlocking
import kotlinx.coroutines.withTimeout
import kotlinx.serialization.json.Json
import kotlinx.serialization.json.JsonObject
import kotlinx.serialization.json.jsonArray
import kotlinx.serialization.json.jsonObject
import okhttp3.OkHttpClient
import okhttp3.mockwebserver.Dispatcher
import okhttp3.mockwebserver.MockResponse
import okhttp3.mockwebserver.MockWebServer
import okhttp3.mockwebserver.RecordedRequest
import org.junit.After
import org.junit.Assert.assertTrue
import org.junit.Before
import org.junit.Test
import org.junit.runner.RunWith
import org.robolectric.RobolectricTestRunner

/**
 * The shape Android actually uploads, asserted against what the TypeScript
 * declares as required.
 *
 * Every other serialisation test on this branch round-trips through the Kotlin
 * serializer, which refills every default on the way back in and so cannot see
 * a key that was never written. These tests decode what the production write
 * path put in [LocalStore] into a raw [JsonObject] and check its key set, which
 * is the only thing the web and iOS ever see.
 *
 * Why a missing key is not cosmetic: `src/lib/stateStore.ts:344` replaces a
 * document wholesale (`entry.value = remote.value`), so whatever Android
 * uploads *is* the document. `src/data/attempts.ts:118` then computes
 * `index.totals.marked + (...)`, and `undefined + 0` is `NaN`, which
 * `JSON.stringify` writes back as `null` -- a student's lifetime totals
 * destroyed on the server. `src/data/attemptStats.ts:19` filters
 * `record.correct !== null`, and `undefined !== null` is true, so an omitted
 * `correct` turns a self-ticked OSCE station into a marked-and-wrong attempt.
 */
@RunWith(RobolectricTestRunner::class)
class SharedDocumentShapeTest {

    private lateinit var server: MockWebServer
    private lateinit var database: CortexDatabase
    private lateinit var store: LocalStore
    private lateinit var sync: SyncEngine

    /** Deliberately a bare parser: this test must read bytes, not re-inflate a model. */
    private val raw = Json

    @Before fun setUp() {
        server = MockWebServer()
        server.dispatcher = object : Dispatcher() {
            override fun dispatch(request: RecordedRequest) =
                MockResponse().setResponseCode(200).setBody("""{"ok":true}""")
        }
        server.start()

        val context = ApplicationProvider.getApplicationContext<Context>()
        database = Room.inMemoryDatabaseBuilder(context, CortexDatabase::class.java).build()
        store = LocalStore(database)
        sync = SyncEngine(
            NishanyApi(
                baseUrl = server.url("/").toString().trimEnd('/'),
                client = OkHttpClient(),
                tokenProvider = { "token" },
            ),
            store,
        )
    }

    @After fun tearDown() {
        server.shutdown()
        database.close()
    }

    private suspend fun stored(key: String): JsonObject =
        raw.parseToJsonElement(
            withTimeout(5_000) {
                var value = store.document(key)?.json
                while (value == null) {
                    delay(5)
                    value = store.document(key)?.json
                }
                value
            },
        ).jsonObject

    private fun assertKeys(required: Set<String>, actual: JsonObject, what: String) {
        val missing = required - actual.keys
        assertTrue(
            "$what must carry every key the TypeScript declares as required; missing $missing " +
                "(wrote ${actual.keys})",
            missing.isEmpty(),
        )
    }

    private fun record(
        sessionId: String,
        surface: String,
        itemId: String,
        correct: Boolean? = null,
        at: String = "2026-08-19T10:00:00Z",
    ) = AttemptRecord(
        id = AttemptStore.attemptId(sessionId, surface, itemId),
        at = at,
        surface = surface,
        itemId = itemId,
        subjectId = "cvs",
        topic = "Topic",
        difficulty = "Moderate",
        correct = correct,
        sessionId = sessionId,
    )

    /** `AttemptIndex` and `AttemptTotals` -- `src/data/attempts.ts:66-77`. */
    @Test
    fun `the attempt index Android uploads carries version months and totals`() = runBlocking {
        writeAttempt(store, sync, record("s1", "qbank", "q-1", correct = true))

        val index = stored(AttemptStore.INDEX_KEY)
        assertKeys(setOf("version", "months", "totals"), index, "AttemptIndex")
        // `lastAt` is `string | null` and required, so it is written even when null.
        assertKeys(
            setOf("attempts", "marked", "correct", "lastAt"),
            index.getValue("totals").jsonObject,
            "AttemptTotals",
        )
    }

    /** `AttemptMonth` and `AttemptRecord` -- `src/data/attempts.ts:19-56`. */
    @Test
    fun `the attempt shard Android uploads carries every required record key`() = runBlocking {
        // A self-ticked station: nobody marked it, so `correct` is null. The
        // key still has to be there -- see this class's doc on attemptStats.
        writeAttempt(store, sync, record("s1", "station", "os-1", correct = null))

        val month = stored(AttemptStore.monthKey(AttemptStore.month(Instant.parse("2026-08-19T10:00:00Z"))))
        assertKeys(setOf("version", "month", "records"), month, "AttemptMonth")
        assertKeys(
            setOf(
                "id", "at", "surface", "itemId", "subjectId", "topic",
                "difficulty", "conceptIds", "correct", "seconds", "sessionId",
            ),
            month.getValue("records").jsonArray.single().jsonObject,
            "AttemptRecord",
        )
    }

    /** `PracticalProgress` and `StationProgress` -- `src/data/practicalProgress.ts:19-60`. */
    @Test
    fun `the practical progress Android uploads carries all four sections`() = runBlocking {
        store.replaceLedger(
            LedgerDecoder.decode(
                """
                [{"id":"os-1","kind":"practical","status":"Published","subjectId":"cvs","title":"Station",
                  "fields":{"Type":"OSCE station","Difficulty":"Moderate","Duration":"8","Marks":"20"},
                  "practicalData":{"markSections":[{"id":"sec1","title":"Section","items":["m1"]}],
                    "decisions":[],"questions":[]}}]
                """.trimIndent(),
            ).items,
        )
        val viewModel = PracticalViewModel(store, sync)
        withTimeout(5_000) { viewModel.items.first { it.size == 1 } }

        viewModel.openStation("os-1", minutes = 8)
        // Finished without ticking anything: `checkedItems` is empty, which is
        // exactly the value a defaults-omitting encoder drops.
        viewModel.finishStation("os-1", marks = 0, outOf = 1)

        val progress = stored(PRACTICAL_PROGRESS_KEY)
        // Finishing a station also banks an attempt. Wait for that pair too,
        // or tearDown closes the database underneath a write still in flight
        // and Room logs an aborted transaction to stderr.
        stored(AttemptStore.monthKey(AttemptStore.month(Instant.now())))
        stored(AttemptStore.INDEX_KEY)
        assertKeys(setOf("version", "stations", "cases", "labs", "skills"), progress, "PracticalProgress")
        assertKeys(
            setOf("attempts", "bestMarks", "outOf", "lastAt", "checkedItems"),
            progress.getValue("stations").jsonObject.getValue("os-1").jsonObject,
            "StationProgress",
        )
    }
}
