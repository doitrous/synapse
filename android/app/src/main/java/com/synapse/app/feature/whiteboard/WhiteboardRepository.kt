package com.synapse.app.feature.whiteboard

import com.synapse.app.core.cache.LocalStore
import com.synapse.app.core.sync.SyncEngine
import com.synapse.app.core.whiteboard.INITIAL_BOARD
import com.synapse.app.core.whiteboard.LEGACY_WHITEBOARD_KEY
import com.synapse.app.core.whiteboard.WHITEBOARD_COLLECTION_KEY
import com.synapse.app.core.whiteboard.WhiteboardCodec
import com.synapse.app.core.whiteboard.WhiteboardCollection
import com.synapse.app.core.whiteboard.WhiteboardOwner
import com.synapse.app.core.whiteboard.emptyWhiteboardCollection
import com.synapse.app.core.whiteboard.migrateSingleBoardToCollection
import kotlinx.coroutines.sync.Mutex
import kotlinx.coroutines.sync.withLock
import kotlinx.serialization.json.Json
import java.time.Instant
import javax.inject.Inject

/**
 * The Whiteboard data layer: reads/writes the student's own board collection
 * (`synapse.whiteboard.boards.v1`) over the durable user-state store, migrating
 * the legacy single-board key (`synapse.whiteboard.board`) into it exactly once —
 * matching the web page's `migrateSingleBoardToCollection` call on every mount,
 * which is a no-op after the first time due to [WhiteboardCollection.migratedFromSingleBoard].
 *
 * **Owner identity is a placeholder.** [DEFAULT_OWNER] stands in for
 * `ownerId`/`ownerName`/`universityId`/`year` because no shared Android accessor
 * for the signed-in student's display name and university/year exists yet
 * (`core/auth/AuthBackend.Session` carries only `userId`). Those fields are not
 * rendered anywhere this surface draws — they matter only for shared-board
 * audience filtering ([com.synapse.app.core.whiteboard.sameAudienceSharedBoards]),
 * which is itself deferred (see [WhiteboardCollection.sharedBoards]'s doc) — so
 * this does not block anything currently built. Wire a real identity source
 * through here when sharing is implemented.
 */
class WhiteboardRepository @Inject constructor(
    private val localStore: LocalStore,
    private val syncEngine: SyncEngine,
    private val json: Json,
) {
    private val writeMutex = Mutex()

    /**
     * The student's board collection, migrating the legacy singleton (or creating
     * a fresh default board) the first time there is no collection document yet.
     * A freshly migrated/created collection is saved immediately so a second call
     * reads it back directly instead of re-running migration.
     */
    suspend fun loadCollection(now: Instant): WhiteboardCollection {
        val stored = localStore.getUserState(WHITEBOARD_COLLECTION_KEY)?.let { WhiteboardCodec.decodeCollection(json, it) }
        if (stored != null) return stored

        val legacy = localStore.getUserState(LEGACY_WHITEBOARD_KEY)?.let { WhiteboardCodec.decodeLegacyBoard(json, it) }
        val migrated = migrateSingleBoardToCollection(
            legacy = legacy ?: INITIAL_BOARD,
            collection = emptyWhiteboardCollection(),
            owner = DEFAULT_OWNER,
            now = now.toString(),
        )
        saveCollection(now, migrated)
        return migrated
    }

    /** Replaces the whole collection document. Callers pass the full, already-updated collection. */
    suspend fun saveCollection(now: Instant, collection: WhiteboardCollection) {
        writeMutex.withLock {
            syncEngine.write(WHITEBOARD_COLLECTION_KEY, json.encodeToString(WhiteboardCollection.serializer(), collection), now)
        }
    }

    private companion object {
        val DEFAULT_OWNER = WhiteboardOwner(ownerId = "local-student", ownerName = "Student", universityId = "", year = "")
    }
}
