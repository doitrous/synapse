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
import kotlinx.coroutines.flow.distinctUntilChanged
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

    fun documentFlow(key: String): Flow<StoredDocument?> =
        documentDao.flow(key).map { it?.toDomain() }.distinctUntilChanged()

    /**
     * Caches a document and queues it for the server in one Room
     * transaction — what [SyncEngine.write] uses instead of calling
     * [putDocument] and [enqueue] back to back.
     *
     * Those two calls, done separately, leave a window where a process death
     * lands the edit in [documentDao] with no matching row in [outboxDao]: the
     * student sees the edit as saved (it is, locally) but nothing ever ships
     * it to the server, and nothing about that failure is visible from
     * either side. Wrapping both writes in [androidx.room.withTransaction]
     * closes that window — either both rows land, or neither does.
     */
    suspend fun putDocumentAndEnqueue(key: String, json: String, serverUpdatedAt: Instant?, savedAt: Instant) {
        database.withTransaction {
            documentDao.upsert(
                DocumentEntity(
                    key = key,
                    json = json,
                    serverUpdatedAt = serverUpdatedAt,
                    savedAt = Instant.now(),
                ),
            )
            outboxDao.insert(OutboxEntity(key = key, json = json, savedAt = savedAt))
        }
    }

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
        ledgerDao.byKind(kind.wire).map { entities -> entities.map { it.toDomain() } }.distinctUntilChanged()

    /**
     * Free-text search, scoped to [kind] when given.
     *
     * [query] is student-typed input, not a trusted FTS4 query string — a
     * stray `"`, a bare `*`, or a word FTS4 treats as an operator (`AND`,
     * `OR`, `NOT`, `NEAR`) would otherwise throw `malformed MATCH
     * expression` or silently change what the search means. [ftsQueryFor]
     * tokenizes and re-quotes the input so every token is searched for
     * literally, never interpreted as syntax.
     */
    suspend fun search(query: String, kind: ContentKind?): List<LedgerItem> {
        val ftsQuery = ftsQueryFor(query) ?: return emptyList()
        return ledgerDao.search(ftsQuery, kind?.wire).map { it.toDomain() }
    }

    // -- Outbox ------------------------------------------------------------

    suspend fun enqueue(key: String, json: String, savedAt: Instant) {
        outboxDao.insert(OutboxEntity(key = key, json = json, savedAt = savedAt))
    }

    suspend fun outbox(): List<OutboxEntry> = outboxDao.all().map { it.toDomain() }

    /** Deletes exactly one queued write. Never a blanket "clear everything read" — see [OutboxDao.deleteById]. */
    suspend fun clearOutbox(id: Long) = outboxDao.deleteById(id)

    fun outboxCount(): Flow<Int> = outboxDao.count().distinctUntilChanged()
}

/**
 * Turns student-typed [query] text into a safe FTS4 `MATCH` expression, or
 * `null` if nothing searchable survives.
 *
 * Splits on every non-alphanumeric character, so punctuation never reaches
 * SQLite. Each surviving token is wrapped in double quotes — a quoted
 * single-term phrase is searched for literally in FTS4, which is what
 * neutralizes reserved words like `AND`/`OR`/`NOT`/`NEAR` and any character
 * that would otherwise be read as query syntax. A double quote inside a
 * token is doubled per FTS4's own escaping rule; the alphanumeric split
 * above means a token can never actually contain one today, but the
 * escaping stays in place in case that stops being true. The final token
 * gets a trailing `*` inside its quotes, which FTS4 reads as a prefix
 * match — a search box is expected to find "wheezing" from "wheez".
 */
private fun ftsQueryFor(query: String): String? {
    val tokens = query.split(Regex("[^\\p{Alnum}]+")).filter { it.isNotEmpty() }
    if (tokens.isEmpty()) return null
    return tokens.mapIndexed { index, token ->
        val escaped = token.replace("\"", "\"\"")
        if (index == tokens.lastIndex) "\"$escaped*\"" else "\"$escaped\""
    }.joinToString(" ")
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
