package com.synapse.app.core.cache.room
import com.synapse.app.core.cache.LocalStore
import com.synapse.app.core.cache.OutboxEntry
import com.synapse.app.core.model.AttemptRecord
import kotlinx.serialization.json.Json
import kotlinx.serialization.json.JsonObject

class RoomLocalStore(private val db: SynapseDatabase) : LocalStore {
    private val catalogueDao = db.catalogueDao()
    private val outboxDao = db.outboxDao()
    private val attemptDao = db.attemptDao()
    private val jsonFormat = Json { ignoreUnknownKeys = true }

    override suspend fun putCatalogue(key: String, updatedAt: String, json: String) {
        catalogueDao.upsert(CatalogueEntity(key = key, updatedAt = updatedAt, json = json, fetchedAt = System.currentTimeMillis()))
    }

    override suspend fun catalogueUpdatedAt(key: String): String? = catalogueDao.updatedAt(key)

    override suspend fun getCatalogue(key: String): String? = catalogueDao.json(key)

    override suspend fun enqueue(key: String, json: String) {
        outboxDao.upsert(OutboxEntity(key = key, json = json, enqueuedAt = System.currentTimeMillis()))
    }

    override suspend fun pendingOutbox(): List<OutboxEntry> =
        outboxDao.all().map { OutboxEntry(key = it.key, json = it.json) }

    override suspend fun clearOutbox(key: String) {
        outboxDao.deleteByKey(key)
    }

    override suspend fun putAttempts(items: List<AttemptRecord>) {
        attemptDao.upsertAll(
            items.map { AttemptEntity(id = it.id, month = it.month, json = jsonFormat.encodeToString(JsonObject.serializer(), it.payload)) }
        )
    }

    override suspend fun attempts(month: String): List<AttemptRecord> =
        attemptDao.byMonth(month).map {
            AttemptRecord(id = it.id, month = it.month, payload = jsonFormat.decodeFromString(JsonObject.serializer(), it.json))
        }

    override suspend fun clearAll() {
        catalogueDao.clear()
        outboxDao.clear()
        attemptDao.clear()
    }
}
