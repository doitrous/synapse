package com.synapse.android.core.sync

import com.synapse.android.core.CortexJson
import com.synapse.android.core.adaptive.AdaptiveConfig
import com.synapse.android.core.adaptive.AdaptiveEvidenceStore
import com.synapse.android.core.adaptive.BlueprintNode
import com.synapse.android.core.adaptive.CoverageDebt
import com.synapse.android.core.adaptive.ReadinessResult
import com.synapse.android.core.api.ApiError
import com.synapse.android.core.api.RemoteState
import com.synapse.android.core.api.SynapseApi
import com.synapse.android.core.cache.LocalStore
import com.synapse.android.core.cache.PendingDocument
import com.synapse.android.core.library.LibraryMarks
import com.synapse.android.core.model.LedgerDecoder
import com.synapse.android.core.practical.PRACTICAL_PROGRESS_KEY
import com.synapse.android.core.progress.AttemptStore
import com.synapse.android.core.qbank.LiveSession
import java.time.Duration
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
     * ledger's index and its [AttemptStore.HISTORY_MONTHS] most recent month
     * shards (precedence-checked, since these are the ones a student can also
     * have edited offline) → whatever is still waiting in the outbox.
     */
    suspend fun refresh() {
        if (!refreshMutex.tryLock()) return
        try {
            _status.value = SyncStatus.Syncing
            // Carry any pre-rebrand `synapse…` cache forward before the first
            // read touches the store. Idempotent and self-limiting: once the
            // old rows are renamed there is nothing left for it to match.
            store.renameLegacyDocumentKeys(LEGACY_KEY_RENAMES)
            var changed = 0
            changed += syncCatalogue()
            changed += syncUserState()
            drain()
            _status.value = SyncStatus.Done(changed, Instant.now())
        } catch (e: CancellationException) {
            // Nothing failed and nothing finished -- the caller's scope died
            // mid-pass, which is what happens every time the student
            // backgrounds the app while [refreshWhenStale] has one running.
            // Leaving [_status] on [SyncStatus.Syncing] would leave Account
            // showing a spinner that never resolves for the life of the
            // process, and would tell the next [refreshWhenStale] that a
            // pass is still in flight.
            _status.value = SyncStatus.Idle
            throw e
        } catch (e: ApiError) {
            _status.value = SyncStatus.Failed(e.message ?: "sync failed")
        } finally {
            refreshMutex.unlock()
        }
    }

    /**
     * [refresh], unless one finished less than [minAge] ago.
     *
     * The app used to refresh exactly once per process, from `RootScreen`'s
     * arrival at `SignedIn`. An Android process outlives a great many
     * sessions on the same account: a student who answers questions on the
     * web at a desk and then picks their phone back up was reading a cache
     * that had not been asked about since the app first opened, with no way
     * to ask for one short of killing the app. So the foreground now
     * refreshes, and this is the throttle that makes that affordable --
     * without it, every task-switch, every rotation and every trip back from
     * the camera is a full manifest diff.
     *
     * Only a *completed* pass counts. A [SyncStatus.Failed] carries no
     * timestamp and a cancelled one resets to [SyncStatus.Idle], so coming
     * back to the foreground after a failure tries again immediately, which
     * is the moment it is most likely to work.
     */
    suspend fun refreshWhenStale(minAge: Duration) {
        val lastCompleted = (_status.value as? SyncStatus.Done)?.at
        if (lastCompleted != null && Duration.between(lastCompleted, Instant.now()) < minAge) return
        refresh()
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
     * The same, for an edit that is only meaningful as a whole.
     *
     * [write] guarantees that one document and its outbox entry land
     * together; this guarantees the same across several documents at once.
     * Banking an attempt is the case that needs it: the month shard and the
     * index that counts it are two documents but one fact, and half of it
     * committed is worse than none of it -- a shard with no index entry is an
     * answer no headline figure counts, and an index with no shard counts an
     * answer no screen can show. Both are silent, and neither is recoverable
     * from the outside.
     *
     * Callers writing a single document should keep using [write]; there is
     * nothing to gain here and a list to build.
     */
    suspend fun writeAll(documents: List<Pair<String, String>>) {
        val pending = documents.map { (key, json) ->
            PendingDocument(key, json, store.document(key)?.serverUpdatedAt)
        }
        store.putDocumentsAndEnqueue(pending, Instant.now())
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
     * plus the attempt ledger's index and its [AttemptStore.HISTORY_MONTHS]
     * most recent month shards.
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

    /**
     * The user-state keys one refresh pulls: the fixed documents, the attempt
     * index, and the last [AttemptStore.HISTORY_MONTHS] month shards.
     *
     * The window has to match the one [com.synapse.android.core.progress.AttemptLedger]
     * reads back, which is why both take the number from the same constant.
     * Fetching a shorter window than the ledger reads is invisible until a
     * student opens a fresh install and finds months of their own work
     * missing.
     */
    private fun userStateKeys(): List<String> {
        val zone = ZoneId.systemDefault()
        val currentMonth = YearMonth.now(zone)
        val months = (0 until AttemptStore.HISTORY_MONTHS)
            .map { currentMonth.minusMonths(it.toLong()) }
            .map { "%04d-%02d".format(it.year, it.monthValue) }
            .distinct()
            .sorted()
        // Adaptive Study's evidence ledger is month-sharded exactly like the
        // attempt ledger (`src/data/adaptive/evidenceLedger.ts`), so it is pulled
        // the same way: its index plus the same recent-month window
        // [com.synapse.android.core.adaptive.AdaptiveEvidenceStore] reads back.
        // The keys come from that object so the pull list cannot drift from the read.
        return USER_STATE_KEYS +
            AttemptStore.INDEX_KEY + months.map(AttemptStore::monthKey) +
            AdaptiveEvidenceStore.INDEX_KEY + months.map(AdaptiveEvidenceStore::monthKey)
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
            // Adaptive Study's admin-authored, student-read config and blueprint
            // (server `STUDENT_READABLE_STATE`). Referenced by named constant so
            // the read path and this pull list cannot spell the key differently.
            AdaptiveConfig.KEY, // nishany-adaptive-config-v1
            BlueprintNode.KEY, // nishany-adaptive-blueprints-v1
        )

        /** The content ledger's key — the one catalogue document that also gets shredded into rows [LocalStore] can query. */
        private const val LEDGER_KEY = "synapse-admin-content-ledger-v4"

        /**
         * The per-student documents the qbank, practical, notebook and
         * calendar surfaces read, plus the article-marks document the Reader
         * writes ([LibraryMarks.storageKey]). Enumerated for the same reason
         * [CATALOGUE_KEYS] is. A key outside this list (mastery, adaptive,
         * whiteboard, bookmarks, annotations) is deliberately out of scope
         * for this milestone.
         *
         * All entries are spelled `nishany…`, matching the web app post-rebrand.
         * The three that have a named constant (the write path uses it) are
         * referenced rather than re-spelled, so the pull list cannot drift from
         * what the feature code writes. Installs from before the rename still
         * hold these documents under their old `synapse…` keys in [LocalStore];
         * [LEGACY_KEY_RENAMES] carries that cached work forward on upgrade.
         */
        private val USER_STATE_KEYS: List<String> = listOf(
            LiveSession.KEY, // nishany.qbank.activeSession.v1 — src/pages/student/QuestionBank.tsx:232
            "nishany.qbank.marked.v1", // src/pages/student/QuestionBank.tsx:100
            "nishany.qbank.questionNotes.v1", // src/components/qbank/StudyRail.tsx:19
            LiveSession.SESSION_NAMES_KEY, // nishany.qbank.sessionNames.v1 — src/pages/student/QuestionBank.tsx:233
            PRACTICAL_PROGRESS_KEY, // nishany.practical.progress.v1 — src/data/practicalProgress.ts:17
            "nishany.notebook.notes", // src/pages/student/Notebook.tsx:62
            "nishany.calendar.tasks.v1", // src/data/tasks.ts:13
            // Adaptive Study's per-student documents. The month-sharded evidence
            // ledger (index + shards) is added in [userStateKeys]; these two are
            // whole documents. Named constants, referenced by the ViewModel read
            // path too, so the pull can never drift from the read. `boosts` and
            // the stored `plan` are deliberately out of scope: the dashboard reads
            // neither (no on-device session runner).
            CoverageDebt.KEY, // nishany.progress.adaptive.coverageDebt.v1
            ReadinessResult.KEY, // nishany.progress.adaptive.readiness.v1
            LibraryMarks.storageKey, // nishany.library.marks.v1 -- article highlights and sticky notes (M6)
        )

        /**
         * The rebrand renamed these five synced documents from `synapse…` to
         * `nishany…` (see [USER_STATE_KEYS]). An install from before the rename
         * still holds each one in [LocalStore] under its old key; this maps old
         * → new so a one-time on-device rename can carry that cached work
         * forward on upgrade, instead of stranding it under a key nothing reads.
         */
        private val LEGACY_KEY_RENAMES: List<Pair<String, String>> = listOf(
            "synapse.qbank.activeSession.v1" to "nishany.qbank.activeSession.v1",
            "synapse.qbank.marked.v1" to "nishany.qbank.marked.v1",
            "synapse.qbank.questionNotes.v1" to "nishany.qbank.questionNotes.v1",
            "synapse.qbank.sessionNames.v1" to "nishany.qbank.sessionNames.v1",
            "synapse.practical.progress.v1" to "nishany.practical.progress.v1",
        )
    }
}
