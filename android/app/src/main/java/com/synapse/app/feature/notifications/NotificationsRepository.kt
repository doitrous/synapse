package com.synapse.app.feature.notifications

import com.synapse.app.core.api.NotificationsApi
import com.synapse.app.core.api.ShareNotification
import com.synapse.app.core.cache.LocalStore
import kotlinx.coroutines.CancellationException
import kotlinx.serialization.builtins.ListSerializer
import kotlinx.serialization.json.Json
import java.time.Instant
import javax.inject.Inject

/** How many of [items] are unread — [ShareNotification.readAt] null means unread. */
fun List<ShareNotification>.unreadCount(): Int = count { it.readAt == null }

/** What one shared-notifications fetch came to. */
sealed interface NotificationsOutcome {
    /** [fromCache] is true when this is the last-good response served after a failed/offline live fetch. */
    data class Loaded(val items: List<ShareNotification>, val fromCache: Boolean) : NotificationsOutcome

    /** Neither the network nor the offline cache had anything to show. Never substituted with fabricated notifications. */
    data object Unavailable : NotificationsOutcome
}

/**
 * The shared-notifications inbox data layer. [shared] is the one live call this
 * feature makes; a failed or offline fetch degrades to the last-good response
 * cached from a previous successful fetch (never to fabricated data), mirroring
 * [com.synapse.app.feature.maristanas.MaristanaRepository]'s overview-degrades-
 * honestly shape. [markRead] is a thin pass-through — the server is the source
 * of truth for read state; callers reload via [shared] to see it reflected.
 */
class NotificationsRepository @Inject constructor(
    private val localStore: LocalStore,
    private val api: NotificationsApi,
    private val json: Json,
) {

    suspend fun shared(now: Instant, limit: Int? = null): NotificationsOutcome = try {
        val fresh = api.listShared(limit)
        cache(fresh, now)
        NotificationsOutcome.Loaded(fresh, fromCache = false)
    } catch (e: CancellationException) {
        throw e
    } catch (e: Exception) {
        cached()?.let { NotificationsOutcome.Loaded(it, fromCache = true) } ?: NotificationsOutcome.Unavailable
    }

    suspend fun markRead(ids: List<String>): Int = api.markSharedRead(ids).changed

    private suspend fun cache(items: List<ShareNotification>, now: Instant) {
        localStore.putCatalogue(CACHE_KEY, now.toString(), json.encodeToString(ListSerializer(ShareNotification.serializer()), items))
    }

    private suspend fun cached(): List<ShareNotification>? {
        val stored = localStore.getCatalogue(CACHE_KEY) ?: return null
        return runCatching { json.decodeFromString(ListSerializer(ShareNotification.serializer()), stored) }.getOrNull()
    }

    private companion object {
        /**
         * A private offline cache of a per-user live endpoint response — deliberately
         * not a `core/sync/StudentReadableKeys.kt` entry, since that list is for shared
         * catalogue docs `SyncEngine` pulls; this key is never read or written by
         * `SyncEngine`, only by this repository, via the same generic catalogue table.
         */
        const val CACHE_KEY = "notifications-shared-cache-v1"
    }
}
