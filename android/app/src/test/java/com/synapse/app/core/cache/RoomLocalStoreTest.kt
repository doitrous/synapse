package com.synapse.app.core.cache
import androidx.room.Room
import androidx.test.core.app.ApplicationProvider
import com.synapse.app.core.cache.room.RoomLocalStore
import com.synapse.app.core.cache.room.SynapseDatabase
import com.synapse.app.core.model.AttemptRecord
import kotlinx.coroutines.test.runTest
import kotlinx.serialization.json.JsonObject
import kotlinx.serialization.json.JsonPrimitive
import org.junit.After
import org.junit.Assert.*
import org.junit.Before
import org.junit.Test
import org.junit.runner.RunWith
import org.robolectric.RobolectricTestRunner
@RunWith(RobolectricTestRunner::class)
class RoomLocalStoreTest {
    private lateinit var db: SynapseDatabase
    private lateinit var store: RoomLocalStore
    @Before fun setup() {
        db = Room.inMemoryDatabaseBuilder(ApplicationProvider.getApplicationContext(), SynapseDatabase::class.java).allowMainThreadQueries().build()
        store = RoomLocalStore(db)
    }
    @After fun teardown() = db.close()

    @Test fun catalogueUpsertAndRead() = runTest {
        store.putCatalogue("k", "2026-08-20T10:00:00Z", "{\"a\":1}")
        assertEquals("2026-08-20T10:00:00Z", store.catalogueUpdatedAt("k"))
        assertEquals("{\"a\":1}", store.getCatalogue("k"))
        store.putCatalogue("k", "2026-08-20T11:00:00Z", "{\"a\":2}") // upsert
        assertEquals("2026-08-20T11:00:00Z", store.catalogueUpdatedAt("k"))
    }
    @Test fun outboxCoalescesPerKey() = runTest {
        store.enqueue("synapse.notebook.notes", "v1")
        store.enqueue("synapse.notebook.notes", "v2") // replaces, not appends
        val pending = store.pendingOutbox()
        assertEquals(1, pending.size)
        assertEquals("v2", pending.first().json)
        store.clearOutbox("synapse.notebook.notes")
        assertTrue(store.pendingOutbox().isEmpty())
    }
    @Test fun clearAllWipesEverything() = runTest {
        store.putCatalogue("k", "t", "{}"); store.enqueue("x", "y")
        store.putUserState("synapse.flashcards.decks.v1", "{}", savedAt = "2026-08-29T10:00:00Z", serverUpdatedAt = null)
        store.clearAll()
        assertNull(store.getCatalogue("k")); assertTrue(store.pendingOutbox().isEmpty())
        assertNull(store.getUserState("synapse.flashcards.decks.v1"))
    }

    @Test fun userStateUpsertAndRead() = runTest {
        store.putUserState("synapse.flashcards.decks.v1", "{\"decks\":[]}", savedAt = "2026-08-29T10:00:00Z", serverUpdatedAt = null)
        assertEquals("{\"decks\":[]}", store.getUserState("synapse.flashcards.decks.v1"))
        assertEquals("2026-08-29T10:00:00Z", store.userStateSavedAt("synapse.flashcards.decks.v1"))
    }

    @Test fun userStateUpsertOverwritesPreviousValue() = runTest {
        store.putUserState("k", "{\"a\":1}", savedAt = "2026-08-29T10:00:00Z", serverUpdatedAt = null)
        store.putUserState("k", "{\"a\":2}", savedAt = "2026-08-29T11:00:00Z", serverUpdatedAt = "2026-08-29T11:00:00Z")
        assertEquals("{\"a\":2}", store.getUserState("k"))
        assertEquals("2026-08-29T11:00:00Z", store.userStateSavedAt("k"))
    }

    @Test fun userStateReadsNullWhenAbsent() = runTest {
        assertNull(store.getUserState("nope"))
        assertNull(store.userStateSavedAt("nope"))
    }

    @Test fun databaseOpensAtVersion2AndUserStateTableIsUsable() = runTest {
        // A fresh in-memory build at the current (version-2) schema, independent of `store`/`db`
        // from setup(), proves UserStateEntity/UserStateDao are wired into SynapseDatabase.
        val freshDb = Room.inMemoryDatabaseBuilder(ApplicationProvider.getApplicationContext(), SynapseDatabase::class.java)
            .allowMainThreadQueries()
            .build()
        val freshStore = RoomLocalStore(freshDb)
        freshStore.putUserState("k", "{}", savedAt = null, serverUpdatedAt = "2026-08-29T00:00:00Z")
        assertEquals("{}", freshStore.getUserState("k"))
        freshDb.close()
    }

    @Test fun outboxPreservesFifoEnqueueOrder() = runTest {
        // Physical row/insertion order alone is NOT enough to prove this: SQLite's
        // default no-ORDER-BY scan happens to return rows in rowid (insertion) order
        // for brand-new keys, which would mask a missing ORDER BY. To force a real
        // signal we decouple insertion order from enqueuedAt order: "b" is inserted
        // first (earlier rowid) but re-enqueued later (later enqueuedAt) than "a".
        // Correct FIFO-by-enqueuedAt must report ["a", "b"]; a query with no
        // ORDER BY (or one keyed on rowid/insertion order) would report ["b", "a"].
        var clock = 0L
        val fifoStore = RoomLocalStore(db, now = { clock++ })
        fifoStore.enqueue("b", "v0")  // rowid 1, enqueuedAt 0
        fifoStore.enqueue("a", "va")  // rowid 2, enqueuedAt 1
        fifoStore.enqueue("b", "vb")  // upsert of rowid 1, enqueuedAt 2 (now the most recent)
        val pending = fifoStore.pendingOutbox()
        assertEquals(listOf("a", "b"), pending.map { it.key })
    }

    @Test fun putAttemptsMergesById() = runTest {
        val month = "2026-08"
        val original = AttemptRecord(id = "att-1", month = month, payload = JsonObject(mapOf("score" to JsonPrimitive(1))))
        val updated = AttemptRecord(id = "att-1", month = month, payload = JsonObject(mapOf("score" to JsonPrimitive(2))))
        store.putAttempts(listOf(original))
        store.putAttempts(listOf(updated))
        val results = store.attempts(month)
        assertEquals(1, results.size)
        assertEquals(updated.payload, results.first().payload)
    }

    @Test fun allAttemptsSpansEveryMonth() = runTest {
        store.putAttempts(
            listOf(
                AttemptRecord(id = "att-1", month = "2026-07", payload = JsonObject(mapOf("score" to JsonPrimitive(1)))),
                AttemptRecord(id = "att-2", month = "2026-08", payload = JsonObject(mapOf("score" to JsonPrimitive(2)))),
            )
        )
        assertEquals(setOf("att-1", "att-2"), store.allAttempts().map { it.id }.toSet())
    }
}
