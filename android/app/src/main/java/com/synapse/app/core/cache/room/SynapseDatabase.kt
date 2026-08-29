package com.synapse.app.core.cache.room
import androidx.room.Database
import androidx.room.RoomDatabase
import androidx.room.migration.Migration
import androidx.sqlite.db.SupportSQLiteDatabase
@Database(entities = [CatalogueEntity::class, OutboxEntity::class, AttemptEntity::class, UserStateEntity::class], version = 2, exportSchema = false)
abstract class SynapseDatabase : RoomDatabase() {
    abstract fun catalogueDao(): CatalogueDao
    abstract fun outboxDao(): OutboxDao
    abstract fun attemptDao(): AttemptDao
    abstract fun userStateDao(): UserStateDao
}

/** Adds the durable per-student singleton-document table (Plan 04); everything else is untouched. */
val MIGRATION_1_2 = object : Migration(1, 2) {
    override fun migrate(db: SupportSQLiteDatabase) {
        db.execSQL(
            "CREATE TABLE IF NOT EXISTS `user_state` (`key` TEXT NOT NULL, `json` TEXT NOT NULL, `savedAt` TEXT, `serverUpdatedAt` TEXT, PRIMARY KEY(`key`))"
        )
    }
}
