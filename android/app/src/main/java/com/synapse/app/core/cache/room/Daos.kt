package com.synapse.app.core.cache.room
import androidx.room.Dao
import androidx.room.Query
import androidx.room.Upsert

@Dao
interface CatalogueDao {
    @Upsert
    suspend fun upsert(entity: CatalogueEntity): Long

    @Query("SELECT updatedAt FROM catalogue WHERE key=:key")
    suspend fun updatedAt(key: String): String?

    @Query("SELECT json FROM catalogue WHERE key=:key")
    suspend fun json(key: String): String?

    @Query("DELETE FROM catalogue")
    suspend fun clear(): Int
}

@Dao
interface OutboxDao {
    @Upsert
    suspend fun upsert(entity: OutboxEntity): Long

    @Query("SELECT * FROM outbox ORDER BY enqueuedAt ASC")
    suspend fun all(): List<OutboxEntity>

    @Query("DELETE FROM outbox WHERE key=:key")
    suspend fun deleteByKey(key: String): Int

    @Query("DELETE FROM outbox")
    suspend fun clear(): Int
}

@Dao
interface AttemptDao {
    @Upsert
    suspend fun upsertAll(items: List<AttemptEntity>): List<Long>

    @Query("SELECT * FROM attempt WHERE month=:month")
    suspend fun byMonth(month: String): List<AttemptEntity>

    @Query("DELETE FROM attempt")
    suspend fun clear(): Int
}

@Dao
interface UserStateDao {
    @Upsert
    suspend fun upsert(entity: UserStateEntity): Long

    @Query("SELECT json FROM user_state WHERE key=:key")
    suspend fun json(key: String): String?

    @Query("SELECT savedAt FROM user_state WHERE key=:key")
    suspend fun savedAt(key: String): String?

    @Query("DELETE FROM user_state")
    suspend fun clear(): Int
}
