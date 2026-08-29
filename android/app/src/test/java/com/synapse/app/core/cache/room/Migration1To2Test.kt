package com.synapse.app.core.cache.room

import androidx.room.Database
import androidx.room.Room
import androidx.room.RoomDatabase
import androidx.test.core.app.ApplicationProvider
import kotlinx.coroutines.test.runTest
import org.junit.Assert.assertEquals
import org.junit.Test
import org.junit.runner.RunWith
import org.robolectric.RobolectricTestRunner
import java.io.File

/**
 * A frozen stand-in for [SynapseDatabase] as it existed at schema version 1 (before
 * `user_state` existed). Only used to produce a real, Room-generated version-1 database
 * file for [Migration1To2Test] to migrate — proving [MIGRATION_1_2]'s hand-written DDL
 * matches Room's own expected schema for [UserStateEntity], not just that a fresh
 * in-memory build at version 2 happens to work.
 */
@Database(entities = [CatalogueEntity::class, OutboxEntity::class, AttemptEntity::class], version = 1, exportSchema = false)
internal abstract class LegacyV1Database : RoomDatabase() {
    abstract fun catalogueDao(): CatalogueDao
}

@RunWith(RobolectricTestRunner::class)
class Migration1To2Test {
    @Test fun migration1To2PreservesExistingDataAndAddsAUsableUserStateTable() = runTest {
        val context = ApplicationProvider.getApplicationContext<android.content.Context>()
        val dbFile = File(context.cacheDir, "migration-test-${System.nanoTime()}.db")
        try {
            // 1. Build a real version-1 database (Room's own DDL, not a hand-copy) and seed it.
            val v1 = Room.databaseBuilder(context, LegacyV1Database::class.java, dbFile.absolutePath)
                .allowMainThreadQueries()
                .build()
            v1.catalogueDao().upsert(CatalogueEntity(key = "k", updatedAt = "t", json = "{}", fetchedAt = 1L))
            v1.close()

            // 2. Reopen the same file as SynapseDatabase (version 2) via the real migration.
            // Room validates the post-migration schema's identity hash here; a mismatch in
            // MIGRATION_1_2's DDL for `user_state` throws IllegalStateException.
            val v2 = Room.databaseBuilder(context, SynapseDatabase::class.java, dbFile.absolutePath)
                .allowMainThreadQueries()
                .addMigrations(MIGRATION_1_2)
                .build()
            assertEquals("t", v2.catalogueDao().updatedAt("k")) // pre-existing data survived

            val store = RoomLocalStore(v2)
            store.putUserState("synapse.flashcards.decks.v1", "{}", savedAt = null, serverUpdatedAt = "2026-08-29T00:00:00Z")
            assertEquals("{}", store.getUserState("synapse.flashcards.decks.v1"))
            v2.close()
        } finally {
            dbFile.delete()
        }
    }
}
