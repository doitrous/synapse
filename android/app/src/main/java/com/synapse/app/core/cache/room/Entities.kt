package com.synapse.app.core.cache.room
import androidx.room.Entity
import androidx.room.PrimaryKey
@Entity(tableName = "catalogue")
data class CatalogueEntity(@PrimaryKey val key: String, val updatedAt: String, val json: String, val fetchedAt: Long)
@Entity(tableName = "outbox")
data class OutboxEntity(@PrimaryKey val key: String, val json: String, val enqueuedAt: Long)
@Entity(tableName = "attempt")
data class AttemptEntity(@PrimaryKey val id: String, val month: String, val json: String)
