package com.synapse.android.core.sync

import com.synapse.android.core.CortexJson
import com.synapse.android.core.api.ApiError
import com.synapse.android.core.api.RemoteState
import com.synapse.android.core.api.SynapseApi
import com.synapse.android.core.cache.LocalStore
import com.synapse.android.core.model.LedgerDecoder
import com.synapse.android.core.progress.AttemptStore
import java.time.Instant
import java.time.YearMonth
import java.time.ZoneId
import kotlinx.coroutines.CancellationException
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.sync.Mutex
import kotlinx.serialization.SerializationException
import kotlinx.serialization.json.JsonNull

/**
 * What the last (or current) [SyncEngine.refresh] did.
 *
 * `Failed` deliberately carries no partial [Done]-style count: a refresh that
 * throws partway through has already left whatever it managed to fetch in
 * [LocalStore] — that is real progress, not a rollback — but reporting it as
 * a count here would suggest the whole pass succeeded when it did not.
 */
sealed interface SyncStatus {
    data object Idle : SyncStatus
    data object Syncing : SyncStatus
    data class Done(val changed: Int, val at: Instant) : SyncStatus
    data class Failed(val reason: String) : SyncStatus
}

/**
 * The only component in this app that is allowed to call the network.
 *
 * Every screen, ViewModel and repository reads through [LocalStore] — see the
 * module doc on that class. This is the thing that keeps it current: on
 * [refresh] it asks the server what changed since last time, downloads only
 * that, and reconciles it against whatever the device already holds; on
 * [write] it records a student's own edit locally and gets it back out to the
 * server, in order, even across process death (the queue lives in Room, not
 * in memory).
 */
class SyncEngine(
    private val api: SynapseApi,
    private val store: LocalStore,
) {
    private val _status = MutableStateFlow<SyncStatus>(SyncStatus.Idle)
    val status: StateFlow<SyncStatus> = _status.asStateFlow()

    // Guards refresh() against overlap. A plain flag read-then-set on
    // _status would race for real here — SynapseApi's calls resume on
    // OkHttp's own dispatcher thread, not necessarily the caller's — so this
    // needs an actual mutual-exclusion primitive, not just a checked field.
    private val refreshMutex = Mutex()

    /**
     * Ask the server what changed, pull it down, and reconcile it against
     * what is stored locally. A no-op if a refresh is already in flight —
     * see [refreshMutex].
     *
     * Order: the shared catalogue (manifest-diffed) → the per-student
     * documents the qbank and practical surfaces read, plus the attempt
     * ledger's index and the two most recent month shards (precedence-
     * checked, since these are the ones a student can also have edited
     * offline) → whatever is still waiting in the outbox.
     */
    suspend fun refresh() {
        if (!refreshMutex.tryLock()) return
        try {
            _status.value = SyncStatus.Syncing
            var changed = 0
            changed += syncCatalogue()
            changed += syncUserState()
            drain()
            _status.value = SyncStatus.Done(changed, Instant.now())
        } catch (e: CancellationException) {
            throw e
        } catch (e: ApiError) {
            _status.value = SyncStatus.Failed(e.message ?: "sync failed")
        } finally {
            refreshMutex.unlock()
        }
    }

    /**
     * Records a student's own edit and gets it moving toward the server.
     *
     * The local copy and the outbox entry that carries it to the server are
     * written in one [LocalStore.putDocumentAndEnqueue] transaction — a
     * student must never see an edit as saved locally with nothing queued to
     * ship it, which two separate writes here would risk on a process death
     * between them. [drain] then runs opportunistically: most writes leave
     * with the same call that made them, but a write made without a network
     * never blocks on one — it simply waits in the queue for the next
     * [refresh] or [write] to drain it.
     */
    suspend fun write(key: String, json: String) {
        val existing = store.document(key)
        store.putDocumentAndEnqueue(key, json, existing?.serverUpdatedAt, Instant.now())
        drain()
    }

    /**
     * Replays the outbox to the server, oldest first, deleting each entry by
     * its own id the moment the server accepts it — never a blanket
     * "clear everything read", which would drop a write enqueued mid-drain.
     *
     * A document the server refuses outright ([ApiError.Forbidden]) is
     * dropped rather than retried forever — retrying changes nothing about
     * why it was refused. An entry whose own JSON cannot even be parsed is
     * dropped the same way: it is not going to parse any better on the next
     * drain, and leaving it in place would wedge every entry queued behind
     * it forever. Anything else that can fail keeps the entry (and
     * everything queued after it, so replay order is never scrambled) for
     * the next drain.
     */
    suspend fun drain() {
        for (entry in store.outbox()) {
            try {
                val value = CortexJson.parseToJsonElement(entry.json)
                api.writeState(entry.key, value)
                store.clearOutbox(entry.id)
            } catch (e: CancellationException) {
                throw e
            } catch (e: SerializationException) {
                store.clearOutbox(entry.id)
            } catch (e: ApiError.Forbidden) {
                store.clearOutbox(entry.id)
            } catch (e: ApiError) {
                break
            }
        }
    }

    /**
     * Diffs [CATALOGUE_KEYS] against the manifest and fetches only what
     * moved. A 404 on the manifest itself is a rollout fallback, not an
     * error — see the class doc on [SynapseApi.manifest] — and degrades to
     * fetching every catalogue document directly.
     *
     * Returns how many documents were actually written locally.
     */
    private suspend fun syncCatalogue(): Int {
        val manifest = try {
            api.manifest()
        } catch (e: ApiError.NotFound) {
            null
        }

        var changed = 0
        for (key in CATALOGUE_KEYS) {
            val needsFetch = manifest == null || store.document(key)?.serverUpdatedAt != manifest[key]
            if (!needsFetch) continue
            applyCatalogueDocument(key, api.readState(key))
            changed++
        }
        return changed
    }

    private suspend fun applyCatalogueDocument(key: String, remote: RemoteState) {
        val text = (remote.value ?: JsonNull).toString()
        store.putDocument(key, text, remote.updatedAt)
        if (key == LEDGER_KEY) {
            store.replaceLedger(LedgerDecoder.decode(text).items)
        }
    }

    /**
     * Pulls the per-student documents the qbank and practical surfaces read,
     * plus the attempt ledger's index and its two most recent month shards.
     * Unlike the catalogue there is no manifest for these — each is a
     * request of its own — so [StatePrecedence] is what keeps an offline
     * edit from being clobbered by a server copy that has not seen it yet.
     *
     * Returns how many documents were actually written locally.
     */
    private suspend fun syncUserState(): Int {
        var changed = 0
        for (key in userStateKeys()) {
            val remote = api.readState(key)
            val local = store.document(key)
            if (StatePrecedence.localCopyWins(local?.savedAt, remote.updatedAt)) continue
            if (remote.value == null && local == null) continue
            store.putDocument(key, (remote.value ?: JsonNull).toString(), remote.updatedAt)
            changed++
        }
        return changed
    }

    private fun userStateKeys(): List<String> {
        val zone = ZoneId.systemDefault()
        val currentMonth = YearMonth.now(zone)
        val months = listOf(currentMonth, currentMonth.minusMonths(1))
            .map { "%04d-%02d".format(it.year, it.monthValue) }
            .distinct()
            .sorted()
        return USER_STATE_KEYS + AttemptStore.INDEX_KEY + months.map(AttemptStore::monthKey)
    }

    companion object {
        /**
         * The shared catalogue: every key `STUDENT_READABLE_STATE` lists on
         * the server (`server/src/index.js`), in the same order. Enumerated,
         * not derived from a pattern — a key the server has not (yet)
         * granted students must not be guessed at here.
         */
        val CATALOGUE_KEYS: List<String> = listOf(
            "synapse-academic-universities-v1",
            "synapse-course-curricula-v1",
            "synapse-module-schedules-v1",
            "synapse-admin-content-ledger-v4",
            "synapse-concept-graph-v2",
            "synapse-relation-types-v1",
            "synapse-taxonomy-tree-v4",
            "synapse-medical-library-taxonomy-v1",
            "synapse-medical-glossary-v1",
            "synapse-medical-evidence-published-v1",
            "synapse-plans-v1",
            "synapse-notification-campaigns-v1",
            "synapse-vouchers-v1",
            "synapse-system-colors-v1",
        )

        /** The content ledger's key — the one catalogue document that also gets shredded into rows [LocalStore] can query. */
        private const val LEDGER_KEY = "synapse-admin-content-ledger-v4"

        /**
         * The per-student documents the qbank and practical surfaces read.
         * Enumerated for the same reason [CATALOGUE_KEYS] is — Milestone 1
         * reads exactly these, and a key outside this list (mastery,
         * adaptive, library, notebook, whiteboard, reader, bookmarks,
         * annotations) is deliberately out of scope.
         */
        private val USER_STATE_KEYS: List<String> = listOf(
            "synapse.qbank.activeSession.v1", // src/pages/student/QuestionBank.tsx:232
            "synapse.qbank.marked.v1", // src/pages/student/QuestionBank.tsx:100
            "synapse.qbank.questionNotes.v1", // src/components/qbank/StudyRail.tsx:19
            "synapse.qbank.sessionNames.v1", // src/pages/student/QuestionBank.tsx:233
            "synapse.practical.progress.v1", // src/data/practicalProgress.ts:17
        )
    }
}
