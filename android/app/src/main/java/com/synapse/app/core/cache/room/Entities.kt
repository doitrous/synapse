package com.synapse.app.core.cache.room
import androidx.room.Entity
import androidx.room.PrimaryKey
@Entity(tableName = "catalogue")
data class CatalogueEntity(@PrimaryKey val key: String, val updatedAt: String, val json: String, val fetchedAt: Long)
@Entity(tableName = "outbox")
data class OutboxEntity(@PrimaryKey val key: String, val json: String, val enqueuedAt: Long)
@Entity(tableName = "attempt")
data class AttemptEntity(@PrimaryKey val id: String, val month: String, val json: String)
/**
 * A single per-student singleton document (e.g. a flashcards deck set). [json] is the
 * `StateDoc.value` payload. [savedAt] is the ISO-8601 instant of the last *local* write
 * (null when the row is purely server-sourced); [serverUpdatedAt] is the server `updatedAt`
 * from the last successful pull. See [com.synapse.app.core.sync.StatePrecedence].
 */
@Entity(tableName = "user_state")
data class UserStateEntity(@PrimaryKey val key: String, val json: String, val savedAt: String?, val serverUpdatedAt: String?)
