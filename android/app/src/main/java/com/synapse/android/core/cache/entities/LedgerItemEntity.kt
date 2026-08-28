package com.synapse.android.core.cache.entities

import androidx.room.Dao
import androidx.room.Entity
import androidx.room.Fts4
import androidx.room.Insert
import androidx.room.OnConflictStrategy
import androidx.room.PrimaryKey
import androidx.room.Query
import com.synapse.android.core.model.ContentKind
import com.synapse.android.core.model.ContentStatus
import com.synapse.android.core.model.LedgerItem
import kotlinx.coroutines.flow.Flow

/**
 * The on-device mirror of one [LedgerItem].
 *
 * Only the fields the app filters or sorts on are real columns — [raw]
 * carries everything else, unmodelled and unmodified, exactly as
 * [LedgerItem] does. See `core/model/ContentItem.kt` for why: a field this
 * table does not know about must never be lost by passing through it.
 */
@Entity(tableName = "ledger_items")
data class LedgerItemEntity(
    @PrimaryKey val id: String,
    val kind: String,
    val subjectId: String,
    val title: String,
    /** What the Library and Question Bank search over. Indexed by [LedgerItemFts]. */
    val searchText: String,
    val status: String,
    val updatedAt: String?,
    val raw: String,
    val universityIds: List<String>,
    val yearIds: List<String>,
)

/**
 * The search shadow table over [LedgerItemEntity].
 *
 * `contentEntity` makes this an external-content FTS4 table: Room adds
 * triggers so every write to `ledger_items` keeps this index current, and
 * the app never inserts into it directly. `searchText` is a real column on
 * the content entity above precisely so this can index it — FTS4 can only
 * shadow columns the content table actually has.
 */
@Entity(tableName = "ledger_fts")
@Fts4(contentEntity = LedgerItemEntity::class)
data class LedgerItemFts(
    val title: String,
    val searchText: String,
)

@Dao
interface LedgerDao {

    @Query("DELETE FROM ledger_items")
    suspend fun clearAll()

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertAll(items: List<LedgerItemEntity>)

    @Query("SELECT * FROM ledger_items WHERE kind = :kind ORDER BY title")
    fun byKind(kind: String): Flow<List<LedgerItemEntity>>

    /**
     * `kind` is optional: pass null to search every kind. The join walks
     * from the FTS match back to the real row by `rowid`, which is how an
     * external-content FTS4 table correlates back to its content table.
     */
    @Query(
        """
        SELECT ledger_items.* FROM ledger_items
        JOIN ledger_fts ON ledger_items.rowid = ledger_fts.rowid
        WHERE ledger_fts MATCH :query AND (:kind IS NULL OR ledger_items.kind = :kind)
        """,
    )
    suspend fun search(query: String, kind: String?): List<LedgerItemEntity>
}

fun LedgerItemEntity.toDomain(): LedgerItem = LedgerItem(
    id = id,
    kind = requireNotNull(ContentKind.fromWire(kind)) { "Unknown content kind stored on disk: $kind" },
    title = title,
    subjectId = subjectId,
    status = requireNotNull(ContentStatus.fromWire(status)) { "Unknown content status stored on disk: $status" },
    updatedAt = updatedAt,
    raw = raw,
    universityIds = universityIds,
    yearIds = yearIds,
    searchText = searchText,
)

fun LedgerItem.toEntity(): LedgerItemEntity = LedgerItemEntity(
    id = id,
    kind = kind.wire,
    subjectId = subjectId,
    title = title,
    searchText = searchText,
    status = status.wire,
    updatedAt = updatedAt,
    raw = raw,
    universityIds = universityIds,
    yearIds = yearIds,
)
