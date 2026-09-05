package com.nishany.android.core.cache

import android.content.Context
import androidx.room.Database
import androidx.room.Room
import androidx.room.RoomDatabase
import androidx.room.TypeConverters
import com.nishany.android.core.cache.entities.Converters
import com.nishany.android.core.cache.entities.DocumentDao
import com.nishany.android.core.cache.entities.DocumentEntity
import com.nishany.android.core.cache.entities.LedgerDao
import com.nishany.android.core.cache.entities.LedgerItemEntity
import com.nishany.android.core.cache.entities.LedgerItemFts
import com.nishany.android.core.cache.entities.OutboxDao
import com.nishany.android.core.cache.entities.OutboxEntity

/**
 * The on-device database backing [LocalStore].
 *
 * `exportSchema = true` and `fallbackToDestructiveMigration` is never called
 * here — `outbox` holds student work the server has never seen, and dropping
 * it on a schema bump would destroy that work silently. When the schema next
 * moves, write a real `Migration` against the exported schema JSON in
 * `app/schemas/` rather than reaching for a destructive fallback.
 */
@Database(
    entities = [
        DocumentEntity::class,
        LedgerItemEntity::class,
        LedgerItemFts::class,
        OutboxEntity::class,
    ],
    version = 1,
    exportSchema = true,
)
@TypeConverters(Converters::class)
abstract class CortexDatabase : RoomDatabase() {

    abstract fun documentDao(): DocumentDao
    abstract fun ledgerDao(): LedgerDao
    abstract fun outboxDao(): OutboxDao

    companion object {
        const val FILE_NAME = "cortex.db"

        /** The cache lives in app-private internal storage — never external, never backed up. */
        fun build(context: Context): CortexDatabase =
            Room.databaseBuilder(context.applicationContext, CortexDatabase::class.java, FILE_NAME).build()
    }
}
