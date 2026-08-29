package com.synapse.app.core.cache
import com.synapse.app.core.model.AttemptRecord
data class OutboxEntry(val key: String, val json: String)
interface LocalStore {
    suspend fun putCatalogue(key: String, updatedAt: String, json: String)
    suspend fun catalogueUpdatedAt(key: String): String?
    suspend fun getCatalogue(key: String): String?
    suspend fun enqueue(key: String, json: String)
    suspend fun pendingOutbox(): List<OutboxEntry>
    suspend fun clearOutbox(key: String)
    suspend fun putAttempts(items: List<AttemptRecord>)
    suspend fun attempts(month: String): List<AttemptRecord>
    suspend fun clearAll()
}
