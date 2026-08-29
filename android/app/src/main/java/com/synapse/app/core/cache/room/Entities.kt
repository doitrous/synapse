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
 * `StateDoc.value` payload. [savedAt] is the freshness marker [com.synapse.app.core.sync.StatePrecedence]
 * compares against an incoming server `updatedAt`: a local write stamps it with the write's
 * own instant, and a server pull re-stamps it with that pull's `updatedAt` (so a later,
 * older/stale server response can't clobber a newer cached copy); null only when the row
 * has never been written or pulled. [serverUpdatedAt] is the server `updatedAt` from the
 * last successful pull specifically (null until the first pull).
 */
@Entity(tableName = "user_state")
data class UserStateEntity(@PrimaryKey val key: String, val json: String, val savedAt: String?, val serverUpdatedAt: String?)
