package com.synapse.android.core.cache

import androidx.room.withTransaction
import com.synapse.android.core.cache.entities.DocumentEntity
import com.synapse.android.core.cache.entities.OutboxEntity
import com.synapse.android.core.cache.entities.toDomain
import com.synapse.android.core.cache.entities.toEntity
import com.synapse.android.core.model.ContentKind
import com.synapse.android.core.model.LedgerItem
import java.time.Instant
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.map

/** A cached document, as it sits on the device: the bytes, plus both stamps needed to reason about staleness. */
data class StoredDocument(
    val key: String,
    val json: String,
    val serverUpdatedAt: Instant?,
    val savedAt: Instant,
)

/** One queued write, waiting for the sync engine to drain it. */
data class OutboxEntry(
    val id: Long,
    val key: String,
    val json: String,
    val savedAt: Instant,
    val attempts: Int,
)

/**
 * The only read path in the app.
 *
 * Every screen reads through here, never through the network directly —
 * see the module doc at the top of this task's brief. [SyncEngine] (a later
 * task) is the only thing that calls the network, and it writes into this
 * store the same way anything else does: through these methods. Nothing
 * here talks to `SynapseApi`.
 */
class LocalStore(private val database: CortexDatabase) {

    private val documentDao get() = database.documentDao()
    private val ledgerDao get() = database.ledgerDao()
    private val outboxDao get() = database.outboxDao()

    // -- Documents -----------------------------------------------------

    /** Upserts a document, stamping it with the moment it was written to disk. */
    suspend fun putDocument(key: String, json: String, serverUpdatedAt: Instant?) {
        documentDao.upsert(
            DocumentEntity(
                key = key,
                json = json,
                serverUpdatedAt = serverUpdatedAt,
                savedAt = Instant.now(),
            ),
        )
    }

    suspend fun document(key: String): StoredDocument? = documentDao.get(key)?.toDomain()

    fun documentFlow(key: String): Flow<StoredDocument?> = documentDao.flow(key).map { it?.toDomain() }

    // -- Ledger ----------------------------------------------------------

    /**
     * Replaces the whole ledger with [items].
     *
     * A real replace, not a merge: an item the server stopped returning is
     * removed here too, in the same transaction that inserts what is still
     * current, so a reader never sees a half-updated table.
     */
    suspend fun replaceLedger(items: List<LedgerItem>) {
        database.withTransaction {
            ledgerDao.clearAll()
            ledgerDao.insertAll(items.map { it.toEntity() })
        }
    }

    fun ledgerItems(kind: ContentKind): Flow<List<LedgerItem>> =
        ledgerDao.byKind(kind.wire).map { entities -> entities.map { it.toDomain() } }

    suspend fun search(query: String, kind: ContentKind?): List<LedgerItem> =
        ledgerDao.search(query, kind?.wire).map { it.toDomain() }

    // -- Outbox ------------------------------------------------------------

    suspend fun enqueue(key: String, json: String, savedAt: Instant) {
        outboxDao.insert(OutboxEntity(key = key, json = json, savedAt = savedAt))
    }

    suspend fun outbox(): List<OutboxEntry> = outboxDao.all().map { it.toDomain() }

    /** Deletes exactly one queued write. Never a blanket "clear everything read" — see [OutboxDao.deleteById]. */
    suspend fun clearOutbox(id: Long) = outboxDao.deleteById(id)

    fun outboxCount(): Flow<Int> = outboxDao.count()
}

private fun DocumentEntity.toDomain() = StoredDocument(
    key = key,
    json = json,
    serverUpdatedAt = serverUpdatedAt,
    savedAt = savedAt,
)

private fun OutboxEntity.toDomain() = OutboxEntry(
    id = id,
    key = key,
    json = json,
    savedAt = savedAt,
    attempts = attempts,
)
