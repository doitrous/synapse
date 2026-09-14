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
    /**
     * Every attempt ever recorded, across all months — what Performance's
     * personal-stats panel is computed from.
     *
     * Defaulted rather than added to every existing [LocalStore] fake in the
     * test suite (same reasoning as [com.synapse.app.core.api.QBankApi.getMedicalResource]):
     * only [RoomLocalStore][com.synapse.app.core.cache.room.RoomLocalStore] and tests that
     * actually care about it need to override it.
     */
    suspend fun allAttempts(): List<AttemptRecord> = emptyList()
    suspend fun putUserState(key: String, json: String, savedAt: String?, serverUpdatedAt: String?)
    suspend fun getUserState(key: String): String?
    suspend fun userStateSavedAt(key: String): String?
    suspend fun clearAll()
}
