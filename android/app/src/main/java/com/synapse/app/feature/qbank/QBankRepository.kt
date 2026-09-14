package com.synapse.app.feature.qbank

import androidx.datastore.core.DataStore
import androidx.datastore.preferences.core.Preferences
import androidx.datastore.preferences.core.edit
import androidx.datastore.preferences.core.stringSetPreferencesKey
import com.synapse.app.core.api.QBankApi
import com.synapse.app.core.api.VerifiedAttempt
import com.synapse.app.core.api.VerifiedAttemptsBody
import com.synapse.app.core.cache.LocalStore
import com.synapse.app.core.media.MediaCache
import com.synapse.app.core.model.StateDoc
import com.synapse.app.core.qbank.AttemptRecord
import com.synapse.app.core.qbank.MultiResponseProjection
import com.synapse.app.core.qbank.MultiResponseQuestion
import com.synapse.app.core.qbank.QBankCollections
import com.synapse.app.core.qbank.QBankScope
import com.synapse.app.core.qbank.SessionManifests
import com.synapse.app.core.qbank.Question
import com.synapse.app.core.qbank.QuestionProjection
import com.synapse.app.core.qbank.attemptsKey
import com.synapse.app.core.qbank.dedup
import com.synapse.app.core.qbank.monthKey
import com.synapse.app.core.sync.SyncEngine
import com.synapse.app.di.QBankPinsDataStore
import kotlinx.coroutines.flow.first
import kotlinx.serialization.builtins.ListSerializer
import kotlinx.serialization.builtins.MapSerializer
import kotlinx.serialization.builtins.serializer
import kotlinx.serialization.json.Json
import kotlinx.serialization.json.JsonObject
import java.time.Instant
import javax.inject.Inject
import kotlin.coroutines.cancellation.CancellationException

/** The shared, admin-authored ledger every student catalogue is projected from. */
internal const val CONTENT_LEDGER_KEY = "synapse-admin-content-ledger-v4"

/** Dotted, so [com.synapse.app.core.sync.StateOwnership] routes these to the student's own record. */
internal const val QBANK_MARKED_KEY = "synapse.qbank.marked.v1"

/** Which questions each finished (or abandoned) sitting served, in the order it served them. */
internal const val QBANK_SESSION_MANIFESTS_KEY = "synapse.qbank.sessionQuestions.v1"

/** What a student has renamed each of their own sittings to. */
internal const val QBANK_SESSION_NAMES_KEY = "synapse.qbank.sessionNames.v1"

private typealias ModelAttemptRecord = com.synapse.app.core.model.AttemptRecord

/** The outcome of one [QBankRepository.pinScopeForOffline] call. */
data class PinResult(val cachedCount: Int, val alreadyCachedCount: Int)

/**
 * The QBank data layer: projects the shared content ledger into student-facing
 * questions ([publishedQuestions], [multiResponseQuestions]), narrows them to a
 * chosen [pool], records attempts both locally and to the synced backend
 * ([recordAttempts]), and manages per-device offline media pins
 * ([pinScopeForOffline], [pinnedScopes], [unpin]).
 *
 * Pins are deliberately **not** synced: [pinsDataStore] is a local-only
 * DataStore, distinct from [localStore]/[syncEngine] — which device has which
 * media cached on disk is a property of that device, not of the student's
 * account.
 */
class QBankRepository @Inject constructor(
    private val localStore: LocalStore,
    private val syncEngine: SyncEngine,
    private val mediaCache: MediaCache,
    private val qbankApi: QBankApi,
    private val json: Json,
    @QBankPinsDataStore private val pinsDataStore: DataStore<Preferences>,
) {

    suspend fun publishedQuestions(): List<Question> =
        QuestionProjection.project(ledgerJsonOrEmpty())

    suspend fun multiResponseQuestions(): List<MultiResponseQuestion> =
        MultiResponseProjection.project(ledgerJsonOrEmpty())

    fun pool(scope: Set<String>, questions: List<Question>): List<Question> =
        QBankScope.poolFor(scope, questions)

    /** The ledger's raw `value` JSON, stringified for [QuestionProjection]/[MultiResponseProjection]. */
    private suspend fun ledgerJsonOrEmpty(): String {
        val stored = localStore.getCatalogue(CONTENT_LEDGER_KEY) ?: return "[]"
        return runCatching {
            val doc = json.decodeFromString(StateDoc.serializer(), stored)
            doc.value.toString()
        }.getOrDefault("[]")
    }

    /**
     * Record [records] (deduped by id): each is persisted locally under its
     * month, every month touched is re-synced in full via [SyncEngine.write],
     * and eligible qbank attempts are also POSTed for server-side leaderboard
     * verification — best-effort, since a leaderboard entry is not worth
     * failing (or retrying) the whole local write over.
     */
    suspend fun recordAttempts(records: List<AttemptRecord>, now: Instant) {
        val deduped = dedup(records)
        if (deduped.isEmpty()) return

        val affectedMonths = mutableSetOf<String>()
        for (record in deduped) {
            val month = monthKey(Instant.parse(record.at))
            affectedMonths += month
            localStore.putAttempts(
                listOf(
                    ModelAttemptRecord(
                        id = record.id,
                        month = month,
                        payload = json.encodeToJsonElement(AttemptRecord.serializer(), record) as JsonObject,
                    )
                )
            )
        }

        for (month in affectedMonths) {
            val monthRecords = localStore.attempts(month).map {
                json.decodeFromJsonElement(AttemptRecord.serializer(), it.payload)
            }
            val listJson = json.encodeToString(ListSerializer(AttemptRecord.serializer()), monthRecords)
            syncEngine.write(attemptsKey(month), listJson, now)
        }

        postVerifiedAttempts(deduped)
    }

    /** Best-effort server-side re-grading POST; a failure here never surfaces to the caller. */
    private suspend fun postVerifiedAttempts(records: List<AttemptRecord>) {
        val verified = records.mapNotNull { r ->
            if (r.surface != "qbank") return@mapNotNull null
            val selectedIndex = r.selectedIndex ?: return@mapNotNull null
            VerifiedAttempt(
                attemptId = r.id,
                sessionId = r.sessionId,
                questionId = r.itemId,
                answerIndex = selectedIndex,
                seconds = r.seconds,
                sessionDurationSeconds = r.sessionDurationSeconds,
                overtimeSeconds = r.sessionOvertimeSeconds,
                answeredAt = r.at,
            )
        }
        if (verified.isEmpty()) return
        try {
            qbankApi.postAttempts(VerifiedAttemptsBody(verified))
        } catch (e: CancellationException) {
            throw e
        } catch (e: Exception) {
            // Best-effort: a failed leaderboard POST never fails the local attempt write.
        }
    }

    /** Every attempt this device knows about, across every month -- the Revise hub's raw material. */
    suspend fun allAttemptRecords(): List<AttemptRecord> =
        localStore.allAttempts().mapNotNull { decodeAttemptOrNull(it.payload) }

    /** Questions flagged for another look ([QBANK_MARKED_KEY]). */
    suspend fun flaggedIds(): Set<String> = readStringSet(QBANK_MARKED_KEY)

    suspend fun setFlaggedIds(ids: Set<String>, now: Instant) = writeStringSet(QBANK_MARKED_KEY, ids, now)

    /** Which questions each sitting served ([QBANK_SESSION_MANIFESTS_KEY]) -- what "omitted" is derived against. */
    suspend fun sessionManifests(): SessionManifests = readManifests(QBANK_SESSION_MANIFESTS_KEY)

    /**
     * Files a sitting's manifest. Called as soon as a sitting starts (not when it
     * finishes) — a sitting abandoned halfway still served the questions it
     * served, and the ones never reached are still "omitted", not "unseen".
     */
    suspend fun recordSessionManifest(sessionId: String, questionIds: List<String>, now: Instant) {
        val next = QBankCollections.pruneManifests(sessionManifests() + (sessionId to questionIds))
        writeManifests(QBANK_SESSION_MANIFESTS_KEY, next, now)
    }

    /** What a student has renamed each sitting to ([QBANK_SESSION_NAMES_KEY]). */
    suspend fun sessionNames(): Map<String, String> = readStringMap(QBANK_SESSION_NAMES_KEY)

    suspend fun renameSession(sessionId: String, name: String, now: Instant) {
        val current = sessionNames()
        val next = if (name.isBlank()) current - sessionId else current + (sessionId to name.trim())
        writeStringMap(QBANK_SESSION_NAMES_KEY, next, now)
    }

    /**
     * Permanently forgets one sitting: every attempt it produced, its manifest
     * entry, and its saved name. Re-syncs every month an attempt was removed
     * from, the same way [recordAttempts] does after a write.
     */
    suspend fun deleteSession(sessionId: String, now: Instant) {
        val toDelete = localStore.allAttempts().filter { decodeAttemptOrNull(it.payload)?.sessionId == sessionId }
        if (toDelete.isNotEmpty()) {
            localStore.deleteAttempts(toDelete.map { it.id })
            for (month in toDelete.map { it.month }.distinct()) {
                val monthRecords = localStore.attempts(month).mapNotNull { decodeAttemptOrNull(it.payload) }
                val listJson = json.encodeToString(ListSerializer(AttemptRecord.serializer()), monthRecords)
                syncEngine.write(attemptsKey(month), listJson, now)
            }
        }
        writeManifests(QBANK_SESSION_MANIFESTS_KEY, sessionManifests() - sessionId, now)
        writeStringMap(QBANK_SESSION_NAMES_KEY, sessionNames() - sessionId, now)
    }

    private fun decodeAttemptOrNull(payload: JsonObject): AttemptRecord? =
        runCatching { json.decodeFromJsonElement(AttemptRecord.serializer(), payload) }.getOrNull()

    private suspend fun readStringSet(key: String): Set<String> {
        val stored = localStore.getUserState(key) ?: return emptySet()
        return runCatching { json.decodeFromString(ListSerializer(String.serializer()), stored).toSet() }.getOrDefault(emptySet())
    }

    private suspend fun writeStringSet(key: String, values: Set<String>, now: Instant) {
        syncEngine.write(key, json.encodeToString(ListSerializer(String.serializer()), values.sorted()), now)
    }

    private suspend fun readStringMap(key: String): Map<String, String> {
        val stored = localStore.getUserState(key) ?: return emptyMap()
        return runCatching { json.decodeFromString(MapSerializer(String.serializer(), String.serializer()), stored) }.getOrDefault(emptyMap())
    }

    private suspend fun writeStringMap(key: String, values: Map<String, String>, now: Instant) {
        syncEngine.write(key, json.encodeToString(MapSerializer(String.serializer(), String.serializer()), values), now)
    }

    private suspend fun readManifests(key: String): SessionManifests {
        val stored = localStore.getUserState(key) ?: return emptyMap()
        return runCatching {
            json.decodeFromString(MapSerializer(String.serializer(), ListSerializer(String.serializer())), stored)
        }.getOrDefault(emptyMap())
    }

    private suspend fun writeManifests(key: String, values: SessionManifests, now: Instant) {
        syncEngine.write(key, json.encodeToString(MapSerializer(String.serializer(), ListSerializer(String.serializer())), values), now)
    }

    /**
     * Cache every media asset referenced by the questions [scope] covers, so
     * a sitting drawn from it can run offline. [mediaIdsOf] extracts a
     * question's referenced media ids; it defaults to none, since [Question]
     * carries no media field yet — a forward-compatible no-op until content
     * actually references media.
     *
     * Idempotent: an id already on disk is left alone (and counted in
     * [PinResult.alreadyCachedCount] rather than [PinResult.cachedCount]), so
     * pinning the same scope twice does no redundant network work.
     */
    suspend fun pinScopeForOffline(
        scope: Set<String>,
        questions: List<Question>,
        onProgress: (done: Int, total: Int) -> Unit = { _, _ -> },
        mediaIdsOf: (Question) -> List<String> = { emptyList() },
    ): PinResult {
        val mediaIds = QBankScope.poolFor(scope, questions).flatMap(mediaIdsOf).distinct()

        var cached = 0
        var alreadyCached = 0
        mediaIds.forEachIndexed { index, id ->
            val wasCached = mediaCache.isCached(id)
            mediaCache.ensure(id)
            if (wasCached) alreadyCached++ else cached++
            onProgress(index + 1, mediaIds.size)
        }

        markPinned(scope)
        return PinResult(cachedCount = cached, alreadyCachedCount = alreadyCached)
    }

    /** Scopes pinned for offline use on this device. */
    suspend fun pinnedScopes(): List<Set<String>> {
        val stored = pinsDataStore.data.first()[PINNED_SCOPES_KEY] ?: emptySet()
        return stored.map(::decodeScope)
    }

    /** Forget that [scope] was pinned. Cached media files are left in place — they may still be shared with other pinned scopes. */
    suspend fun unpin(scope: Set<String>) {
        val key = encodeScope(scope)
        pinsDataStore.edit { prefs ->
            val current = prefs[PINNED_SCOPES_KEY] ?: emptySet()
            prefs[PINNED_SCOPES_KEY] = current - key
        }
    }

    private suspend fun markPinned(scope: Set<String>) {
        val key = encodeScope(scope)
        pinsDataStore.edit { prefs ->
            val current = prefs[PINNED_SCOPES_KEY] ?: emptySet()
            prefs[PINNED_SCOPES_KEY] = current + key
        }
    }

    private fun encodeScope(scope: Set<String>): String =
        json.encodeToString(ListSerializer(String.serializer()), scope.sorted())

    private fun decodeScope(encoded: String): Set<String> =
        runCatching { json.decodeFromString(ListSerializer(String.serializer()), encoded).toSet() }
            .getOrDefault(emptySet())

    private companion object {
        val PINNED_SCOPES_KEY = stringSetPreferencesKey("pinned_scopes")
    }
}
