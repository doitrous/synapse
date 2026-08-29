package com.synapse.app.feature.dashboard

import com.synapse.app.core.cache.LocalStore
import com.synapse.app.core.model.StateDoc
import com.synapse.app.core.sync.SyncEngine
import kotlinx.coroutines.CancellationException
import kotlinx.serialization.json.Json
import kotlinx.serialization.json.JsonObject
import kotlinx.serialization.json.JsonPrimitive
import java.io.IOException
import java.time.Instant
import java.time.ZoneOffset
import java.time.format.DateTimeFormatter
import java.util.Locale
import javax.inject.Inject

/**
 * The catalogue key a student profile doc would live under, if/when a content plan adds
 * one. Not part of [com.synapse.app.core.sync.STUDENT_READABLE_KEYS] yet, so
 * [DashboardRepository] reading it today is a forward-compatible, best-effort lookup that
 * safely resolves to `null` until such a doc actually syncs down.
 */
internal const val PROFILE_CATALOGUE_KEY = "synapse-student-profile-v1"

private val SYNCED_LABEL_FORMATTER: DateTimeFormatter =
    DateTimeFormatter.ofPattern("MMM d, HH:mm 'UTC'", Locale.US).withZone(ZoneOffset.UTC)

/**
 * What the Dashboard renders: whether the last [DashboardRepository.refresh] reached the
 * network ([syncedOk]), a human-readable "last synced" label when it did
 * ([lastSyncedLabel]), and a greeting name read from [PROFILE_CATALOGUE_KEY] when that
 * catalogue doc happens to be present locally ([greetingName]).
 */
data class DashboardState(
    val syncedOk: Boolean,
    val lastSyncedLabel: String? = null,
    val greetingName: String? = null,
)

/**
 * Drives the Dashboard's one job: trigger a [SyncEngine] refresh and turn the outcome into
 * a [DashboardState] the ViewModel can render — a network failure never crashes the screen,
 * it just surfaces as an "offline" [DashboardState].
 *
 * [SyncEngine.refresh] is already internally resilient to most network failures (it catches
 * them per pull), but a raw [IOException] from the outbox-drain call site (the one path that
 * isn't wrapped in [com.synapse.app.core.api.ApiException]) still escapes — that's the case
 * this class exists to catch.
 */
class DashboardRepository @Inject constructor(
    private val localStore: LocalStore,
    private val syncEngine: SyncEngine,
) {
    suspend fun refresh(now: Instant): DashboardState = try {
        syncEngine.refresh(now)
        DashboardState(
            syncedOk = true,
            lastSyncedLabel = "Synced ${SYNCED_LABEL_FORMATTER.format(now)}",
            greetingName = readGreetingName(),
        )
    } catch (e: CancellationException) {
        throw e
    } catch (e: IOException) {
        DashboardState(syncedOk = false)
    }

    /** Best-effort; any parse failure (missing doc, unexpected shape) resolves to `null`. */
    private suspend fun readGreetingName(): String? {
        val json = localStore.getCatalogue(PROFILE_CATALOGUE_KEY) ?: return null
        return runCatching {
            val doc = Json.decodeFromString(StateDoc.serializer(), json)
            val name = (doc.value as? JsonObject)?.get("name") as? JsonPrimitive
            name?.content
        }.getOrNull()
    }
}
