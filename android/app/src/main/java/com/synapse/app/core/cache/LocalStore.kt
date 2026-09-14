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
    suspend fun putUserState(key: String, json: String, savedAt: String?, serverUpdatedAt: String?)
    suspend fun getUserState(key: String): String?
    suspend fun userStateSavedAt(key: String): String?
    suspend fun clearAll()

    /**
     * Every locally known attempt, across every month -- unlike [attempts], which is
     * scoped to one. Defaulted to empty rather than made abstract so the many
     * [LocalStore] fakes elsewhere in the test suite (which have no use for
     * cross-month history) don't all need a real implementation; only
     * [com.synapse.app.core.cache.room.RoomLocalStore] and the QBank-feature fakes
     * that exercise it override it for real.
     */
    suspend fun allAttempts(): List<AttemptRecord> = emptyList()

    /** Permanently removes the attempts with these ids. See [allAttempts] on why this defaults to a no-op. */
    suspend fun deleteAttempts(ids: List<String>) {}
}
