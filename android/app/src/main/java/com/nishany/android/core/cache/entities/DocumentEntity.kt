package com.nishany.android.core.cache.entities

import androidx.room.Dao
import androidx.room.Entity
import androidx.room.Insert
import androidx.room.OnConflictStrategy
import androidx.room.PrimaryKey
import androidx.room.Query
import java.time.Instant
import kotlinx.coroutines.flow.Flow

/**
 * One cached document: the state blob the app synced from the server under
 * [key], plus the stamps needed to reason about staleness.
 *
 * `serverUpdatedAt` is nullable — a document the app has never successfully
 * synced still has a `savedAt` (the write is real) but no server stamp to
 * compare it against.
 */
@Entity(tableName = "documents")
data class DocumentEntity(
    @PrimaryKey val key: String,
    val json: String,
    val serverUpdatedAt: Instant?,
    val savedAt: Instant,
)

@Dao
interface DocumentDao {

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun upsert(entity: DocumentEntity)

    @Query("SELECT * FROM documents WHERE `key` = :key")
    suspend fun get(key: String): DocumentEntity?

    @Query("SELECT * FROM documents WHERE `key` = :key")
    fun flow(key: String): Flow<DocumentEntity?>

    @Query("DELETE FROM documents WHERE `key` = :key")
    suspend fun deleteByKey(key: String)
}
