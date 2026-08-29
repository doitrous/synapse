package com.synapse.app.core.sync

import com.synapse.app.core.api.ApiError
import com.synapse.app.core.api.ApiException
import com.synapse.app.core.api.SynapseApi
import com.synapse.app.core.cache.LocalStore
import com.synapse.app.core.model.StateDoc
import kotlinx.serialization.json.Json
import java.time.Instant
import java.time.ZoneOffset
import kotlin.coroutines.cancellation.CancellationException

/**
 * The sole network caller. Screens read [LocalStore]; only this class talks to
 * [SynapseApi]. A refresh pulls catalogue changes (manifest-diffed), pulls the
 * student's own attempt history (merged by id), then drains the offline write
 * outbox. Mirrors the iOS SyncEngine so a student's data round-trips across web,
 * iOS and Android.
 */
class SyncEngine(
    private val api: SynapseApi,
    private val store: LocalStore,
    private val readableKeys: List<String>,
) {
    suspend fun refresh(now: Instant): SyncResult {
        pullCatalogues()
        pullAttempts(now)
        return drainOutbox()
    }

    /**
     * Manifest-diff pull: only refetch a catalogue key whose server `updatedAt`
     * differs from the locally stored one. If the manifest endpoint is missing
     * (older server) or errors, fall back to fetching every readable key.
     */
    private suspend fun pullCatalogues() {
        val manifest = try {
            api.manifest()
        } catch (e: Exception) {
            if (e is CancellationException) throw e
            null
        }
        val keys = if (manifest == null) {
            readableKeys
        } else {
            manifest.filter { (k, ts) -> store.catalogueUpdatedAt(k) != ts }.keys.toList()
        }
        for (key in keys) {
            val doc = try {
                api.getState(key)
            } catch (e: Exception) {
                if (e is CancellationException) throw e
                continue
            }
            store.putCatalogue(key, doc.updatedAt ?: "", Json.encodeToString(StateDoc.serializer(), doc))
        }
    }

    /** Attempts are append-only and idempotent; merge them into the local store by id. */
    private suspend fun pullAttempts(now: Instant) {
        val date = now.atZone(ZoneOffset.UTC)
        val month = String.format("%04d-%02d", date.year, date.monthValue)
        val remote = try {
            api.getAttempts(month)
        } catch (e: Exception) {
            if (e is CancellationException) throw e
            return
        }
        store.putAttempts(remote)
    }

    /**
     * Public write path. Refuses shared/admin keys (the server enforces ownership
     * too; this catches the mistake early). Enqueues to the outbox first — the
     * caller never waits on the network — then drains.
     */
    suspend fun write(key: String, json: String, savedAt: Instant) {
        require(StateOwnership.isUserOwned(key)) { "Refusing to write shared/admin key from client: $key" }
        store.enqueue(key, json)
        drainOutbox()
    }

    /**
     * Push every pending outbox document. Per-entry failure is classed:
     * forbidden → abandon (will never succeed); unauthorized → stop draining and
     * keep everything (the session is gone); anything else → leave it for next time.
     */
    private suspend fun drainOutbox(): SyncResult {
        var pushed = 0
        var abandoned = 0
        for (entry in store.pendingOutbox()) {
            try {
                api.putUserState(entry.key, StateDoc(value = Json.parseToJsonElement(entry.json)))
                store.clearOutbox(entry.key)
                pushed++
            } catch (e: ApiException) {
                when (e.error) {
                    is ApiError.Forbidden -> {
                        store.clearOutbox(entry.key)
                        abandoned++
                    }
                    is ApiError.Unauthorized -> return SyncResult(pushed, abandoned, stoppedUnauthorized = true)
                    is ApiError.Retryable -> { /* leave in outbox, retry next drain */ }
                }
            }
        }
        return SyncResult(pushed, abandoned, stoppedUnauthorized = false)
    }
}
