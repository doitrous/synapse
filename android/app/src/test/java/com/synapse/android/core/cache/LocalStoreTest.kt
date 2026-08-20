package com.synapse.android.core.cache

import android.content.Context
import androidx.room.Room
import androidx.test.core.app.ApplicationProvider
import com.synapse.android.core.model.ContentKind
import com.synapse.android.core.model.ContentStatus
import com.synapse.android.core.model.LedgerItem
import java.time.Instant
import kotlinx.coroutines.flow.first
import kotlinx.coroutines.runBlocking
import org.junit.After
import org.junit.Assert.assertEquals
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

        // The server stops returning q1 on the next sync.
        store.replaceLedger(listOf(ledgerItem("q2", "Second question", "cough")))

        val remaining = store.ledgerItems(ContentKind.QUESTION).first()
        assertEquals(listOf("q2"), remaining.map { it.id })
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
        assertEquals(0, store.outboxCount().first())

        store.enqueue("key-1", "{}", Instant.now())

        assertEquals(1, store.outboxCount().first())
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
}
