package com.synapse.app.core.cache
import androidx.room.Room
import androidx.test.core.app.ApplicationProvider
import com.synapse.app.core.cache.room.RoomLocalStore
import com.synapse.app.core.cache.room.SynapseDatabase
import kotlinx.coroutines.test.runTest
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
        store.clearAll()
        assertNull(store.getCatalogue("k")); assertTrue(store.pendingOutbox().isEmpty())
    }
}
