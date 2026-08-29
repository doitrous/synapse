package com.synapse.app.core.cache.room
import androidx.room.Database
import androidx.room.RoomDatabase
@Database(entities = [CatalogueEntity::class, OutboxEntity::class, AttemptEntity::class], version = 1, exportSchema = false)
abstract class SynapseDatabase : RoomDatabase() {
    abstract fun catalogueDao(): CatalogueDao
    abstract fun outboxDao(): OutboxDao
    abstract fun attemptDao(): AttemptDao
}
