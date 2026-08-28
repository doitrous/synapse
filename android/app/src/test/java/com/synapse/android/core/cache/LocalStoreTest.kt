package com.synapse.android.core.cache

import android.content.Context
import androidx.room.Room
import androidx.test.core.app.ApplicationProvider
import com.synapse.android.core.model.ContentKind
import com.synapse.android.core.model.ContentStatus
import com.synapse.android.core.model.LedgerItem
import java.time.Instant
import kotlinx.coroutines.coroutineScope
import kotlinx.coroutines.delay
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.first
import kotlinx.coroutines.launch
import kotlinx.coroutines.runBlocking
import kotlinx.coroutines.withTimeout
import org.junit.After
import org.junit.Assert.assertEquals
import org.junit.Assert.assertTrue
import org.junit.Before
import org.junit.Test
import org.junit.runner.RunWith
import org.robolectric.RobolectricTestRunner

/**
 * [LocalStore] is the only read path in the app, so these tests exercise it
 * the way every future screen will: through its own methods, never by
 * reaching into [CortexDatabase] directly.
 */
@RunWith(RobolectricTestRunner::class)
class LocalStoreTest {

    private lateinit var database: CortexDatabase
    private lateinit var store: LocalStore

    @Before fun setUp() {
        val context = ApplicationProvider.getApplicationContext<Context>()
        database = Room.inMemoryDatabaseBuilder(context, CortexDatabase::class.java).build()
        store = LocalStore(database)
    }

    @After fun tearDown() {
        database.close()
    }

    private fun ledgerItem(
        id: String,
        title: String,
        searchText: String,
        kind: ContentKind = ContentKind.QUESTION,
    ) = LedgerItem(
        id = id,
        kind = kind,
        title = title,
        subjectId = "subject-1",
        status = ContentStatus.PUBLISHED,
        updatedAt = "2026-01-01T00:00:00.000Z",
        raw = """{"id":"$id","title":"$title"}""",
        universityIds = emptyList(),
        yearIds = emptyList(),
        searchText = searchText,
    )

    /**
     * Subscribes to this flow *before* [write] runs, waits for the initial
     * value to prove a collector is actually attached, runs [write], then
     * waits for a value matching [until] to arrive on that same
     * subscription. Returns everything the one collector saw.
     *
     * This is the difference between proving a flow pushes updates to an
     * active collector and proving a fresh read afterwards would see the
     * new value — the latter passes even for a non-reactive snapshot.
     */
    private suspend fun <T> Flow<T>.collectAfter(write: suspend () -> Unit, until: (T) -> Boolean): List<T> =
        coroutineScope {
            val seen = mutableListOf<T>()
            val job = launch { collect { seen.add(it) } }
            withTimeout(5_000) { while (seen.isEmpty()) delay(5) }

            write()

            withTimeout(5_000) { while (seen.none(until)) delay(5) }
            job.cancel()
            seen
        }

    @Test fun `a document round-trips with its server stamp`() = runBlocking {
        val serverStamp = Instant.parse("2026-03-01T12:00:00Z")

        store.putDocument("synapse-plans-v1", """{"value":1}""", serverStamp)
        val stored = store.document("synapse-plans-v1")

        assertEquals("synapse-plans-v1", stored?.key)
        assertEquals("""{"value":1}""", stored?.json)
        assertEquals(serverStamp, stored?.serverUpdatedAt)
    }

    @Test fun `replacing the ledger removes items the server dropped`() = runBlocking {
        store.replaceLedger(
            listOf(
                ledgerItem("q1", "First question", "wheeze"),
                ledgerItem("q2", "Second question", "cough"),
            ),
        )

        val seen = store.ledgerItems(ContentKind.QUESTION).collectAfter(
            write = {
                // The server stops returning q1 on the next sync.
                store.replaceLedger(listOf(ledgerItem("q2", "Second question", "cough")))
            },
            until = { it.map { item -> item.id } == listOf("q2") },
        )

        assertEquals(listOf("q1", "q2"), seen.first().map { it.id }.sorted())
        assertEquals(listOf("q2"), seen.last().map { it.id })
    }

    @Test fun `search finds a question by a word in its stem`() = runBlocking {
        store.replaceLedger(
            listOf(ledgerItem("q1", "Asthma", "a patient presents with sudden wheeze and breathlessness")),
        )

        val results = store.search("wheeze", null)

        assertEquals(listOf("q1"), results.map { it.id })
    }

    @Test fun `search is scoped by kind`() = runBlocking {
        store.replaceLedger(
            listOf(
                ledgerItem("q1", "Asthma question", "wheeze", kind = ContentKind.QUESTION),
                ledgerItem("a1", "Asthma article", "wheeze", kind = ContentKind.ARTICLE),
            ),
        )

        val results = store.search("wheeze", ContentKind.ARTICLE)

        assertEquals(listOf("a1"), results.map { it.id })
    }

    @Test fun `a query containing a double quote does not crash`() = runBlocking {
        store.replaceLedger(listOf(ledgerItem("q1", "Asthma", "a patient presents with wheeze")))

        val results = store.search("\"wheeze", null)

        assertEquals(listOf("q1"), results.map { it.id })
    }

    @Test fun `the words AND, OR and NOT are searched for, not obeyed`() = runBlocking {
        store.replaceLedger(
            listOf(
                ledgerItem("q1", "Combination therapy", "salt and pepper together"),
                ledgerItem("q2", "Unrelated", "sugar with cinnamon"),
            ),
        )

        val results = store.search("AND", null)

        assertEquals(listOf("q1"), results.map { it.id })
    }

    @Test fun `a partial word finds the whole one`() = runBlocking {
        store.replaceLedger(listOf(ledgerItem("q1", "Asthma", "presents with sudden wheezing")))

        val results = store.search("wheez", null)

        assertEquals(listOf("q1"), results.map { it.id })
    }

    @Test fun `a query of only punctuation returns nothing`() = runBlocking {
        store.replaceLedger(listOf(ledgerItem("q1", "Asthma", "presents with wheeze")))

        val results = store.search("???", null)

        assertTrue(results.isEmpty())
    }

    @Test fun `an outbox entry survives being read`() = runBlocking {
        store.enqueue("synapse-notes-v1", """{"text":"hello"}""", Instant.parse("2026-02-01T00:00:00Z"))

        val entries = store.outbox()

        assertEquals(1, entries.size)
        assertEquals("synapse-notes-v1", entries.single().key)
        assertEquals("""{"text":"hello"}""", entries.single().json)
    }

    @Test fun `clearing one outbox entry leaves the others`() = runBlocking {
        store.enqueue("key-1", "{}", Instant.now())
        store.enqueue("key-2", "{}", Instant.now())
        val firstId = store.outbox().first().id

        store.clearOutbox(firstId)

        val remaining = store.outbox()
        assertEquals(listOf("key-2"), remaining.map { it.key })
    }

    @Test fun `outboxCount emits when a write is queued`() = runBlocking {
        val seen = store.outboxCount().collectAfter(
            write = { store.enqueue("key-1", "{}", Instant.now()) },
            until = { it == 1 },
        )

        assertEquals(0, seen.first())
        assertEquals(1, seen.last())
    }

    @Test fun `a write queued while a drain is in flight is not lost`() = runBlocking {
        // The specific loss this guards: a note typed while an upload is running.
        // Draining by "delete everything I just read" discards writes that arrived
        // during the request. Delete by id, one at a time.
        store.enqueue("key-1", "{}", Instant.now())
        val inFlightBatch = store.outbox()

        // A second write is queued while the first batch is still being uploaded.
        store.enqueue("key-2", "{}", Instant.now())

        // The drain finishes and clears only the entries it actually sent.
        inFlightBatch.forEach { store.clearOutbox(it.id) }

        val remaining = store.outbox()
        assertEquals(listOf("key-2"), remaining.map { it.key })
    }

    // -- Multi-document writes --------------------------------------------

    @Test fun `several documents and their outbox entries land together`() = runBlocking {
        store.putDocumentsAndEnqueue(
            listOf(
                PendingDocument("shard", """{"a":1}""", null),
                PendingDocument("index", """{"b":2}""", null),
            ),
            Instant.now(),
        )

        assertEquals("""{"a":1}""", store.document("shard")?.json)
        assertEquals("""{"b":2}""", store.document("index")?.json)
        assertEquals(listOf("shard", "index"), store.outbox().map { it.key })
    }

    /**
     * The half-written attempt this method exists to prevent.
     *
     * Banking an attempt writes a month shard and the index that counts it.
     * As two separate transactions, a failure between them commits the first
     * and loses the second, and nothing afterwards can tell: a shard with no
     * index fold is an answer no headline figure counts, and an index fold
     * with no shard is a total no screen can account for.
     *
     * The failure is injected by handing the method a list that throws on its
     * second element -- real, in-transaction, and precisely between the two
     * documents. No mocking framework, because there is none on this branch
     * and this does not need one.
     */
    @Test fun `a failure between two documents leaves neither written`() = runBlocking {
        val explodesOnTheSecond = object : AbstractList<PendingDocument>() {
            override val size = 2
            override fun get(index: Int): PendingDocument = when (index) {
                0 -> PendingDocument("shard", """{"a":1}""", null)
                else -> throw IllegalStateException("the write failed midway")
            }
        }

        val thrown = runCatching { store.putDocumentsAndEnqueue(explodesOnTheSecond, Instant.now()) }
        assertTrue("the failure must surface, not be swallowed", thrown.isFailure)

        assertEquals("the first document must have been rolled back", null, store.document("shard"))
        assertEquals("and its outbox entry with it", emptyList<String>(), store.outbox().map { it.key })
    }
}
