package com.nishany.android.core.progress

import android.content.Context
import androidx.room.Room
import androidx.test.core.app.ApplicationProvider
import com.nishany.android.core.api.NishanyApi
import com.nishany.android.core.cache.CortexDatabase
import com.nishany.android.core.cache.LocalStore
import com.nishany.android.core.sync.SyncEngine
import java.time.Instant
import kotlinx.coroutines.runBlocking
import kotlinx.serialization.json.Json
import okhttp3.OkHttpClient
import okhttp3.mockwebserver.Dispatcher
import okhttp3.mockwebserver.MockResponse
import okhttp3.mockwebserver.MockWebServer
import okhttp3.mockwebserver.RecordedRequest
import org.junit.After
import org.junit.Assert.assertEquals
import org.junit.Before
import org.junit.Test
import org.junit.runner.RunWith
import org.robolectric.RobolectricTestRunner

/**
 * [writeAttempt] -- the one implementation the question bank runner and all
 * three practical surfaces bank through.
 *
 * It used to be copied character for character into
 * [com.nishany.android.feature.qbank.RunnerViewModel] and
 * [com.nishany.android.feature.practical.PracticalViewModel]. The invariant
 * that duplication endangered is the one this file pins: the month shard and
 * the index have to agree, so the identity check that refuses a duplicate
 * record must gate *both* writes. Gate only the shard and a re-banked attempt
 * inflates every headline total; gate only the index and the shard grows a
 * second copy of a record the totals already counted.
 */
@RunWith(RobolectricTestRunner::class)
class AttemptWriterTest {

    private lateinit var server: MockWebServer
    private lateinit var database: CortexDatabase
    private lateinit var store: LocalStore
    private lateinit var sync: SyncEngine

    private val json = Json { ignoreUnknownKeys = true }

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

    private fun record(
        sessionId: String,
        surface: String,
        itemId: String,
        correct: Boolean? = null,
        at: String = Instant.now().toString(),
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

    private suspend fun month(at: String): AttemptMonth =
        json.decodeFromString(
            AttemptMonth.serializer(),
            store.document(AttemptStore.monthKey(AttemptStore.month(Instant.parse(at))))!!.json,
        )

    private suspend fun index(): AttemptIndex =
        json.decodeFromString(AttemptIndex.serializer(), store.document(AttemptStore.INDEX_KEY)!!.json)

    @Test
    fun `banking the same attempt twice leaves one record and one fold`() = runBlocking {
        val at = "2026-08-19T10:00:00Z"
        val one = record(sessionId = "s1", surface = "station", itemId = "os-1", at = at)

        writeAttempt(store, sync, one)
        writeAttempt(store, sync, one)

        assertEquals(1, month(at).records.size)
        assertEquals(1, index().totals.attempts)
    }

    @Test
    fun `the question bank and the practical surfaces share one shard and one index`() = runBlocking {
        val at = "2026-08-19T10:00:00Z"
        writeAttempt(store, sync, record("s1", "qbank", "q-1", correct = true, at = at))
        writeAttempt(store, sync, record("s2", "station", "os-1", correct = null, at = at))
        writeAttempt(store, sync, record("s3", "case", "cc-1:0", correct = null, at = at))
        writeAttempt(store, sync, record("s4", "lab", "li-1:0", correct = null, at = at))

        assertEquals(4, month(at).records.size)
        val totals = index().totals
        assertEquals(4, totals.attempts)
        // Only the question bank marked its work; a self-ticked practical is
        // attempted, not marked, and must not move accuracy either way.
        assertEquals(1, totals.marked)
        assertEquals(1, totals.correct)
        assertEquals(listOf("2026-08"), index().months)
    }
}
