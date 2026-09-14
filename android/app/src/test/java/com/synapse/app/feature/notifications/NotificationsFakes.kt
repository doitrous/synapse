package com.synapse.app.feature.notifications

import com.synapse.app.core.api.MarkNotificationsReadResponse
import com.synapse.app.core.api.NotificationsApi
import com.synapse.app.core.api.ShareNotification
import com.synapse.app.core.cache.LocalStore
import com.synapse.app.core.cache.OutboxEntry
import com.synapse.app.core.model.AttemptRecord

/**
 * A hand-rolled fake [NotificationsApi] that behaves like the real server for
 * the one thing these tests exercise: marking ids read flips their [ShareNotification.readAt]
 * on the next [listShared] call, matching `markShareNotificationsRead`'s real semantics
 * (server/src/shares.js ~649) rather than only recording that a call happened.
 */
class FakeNotificationsApi(seed: List<ShareNotification> = emptyList()) : NotificationsApi {
    private val itemsById = linkedMapOf<String, ShareNotification>().apply { seed.forEach { put(it.id, it) } }
    var listResult: (() -> List<ShareNotification>)? = null
    val markReadCalls = mutableListOf<List<String>>()

    override suspend fun listShared(limit: Int?): List<ShareNotification> =
        listResult?.invoke() ?: itemsById.values.toList()

    override suspend fun markSharedRead(ids: List<String>): MarkNotificationsReadResponse {
        markReadCalls += ids
        var changed = 0
        ids.forEach { id ->
            val item = itemsById[id]
            if (item != null && item.readAt == null) {
                itemsById[id] = item.copy(readAt = "2026-08-29T12:00:00Z")
                changed++
            }
        }
        return MarkNotificationsReadResponse(ok = true, changed = changed)
    }
}

class FakeNotificationsLocalStore : LocalStore {
    val catalogue = linkedMapOf<String, Pair<String, String>>()
    private val outbox = linkedMapOf<String, String>()
    private val attemptsById = linkedMapOf<String, AttemptRecord>()
    private val userState = linkedMapOf<String, Triple<String, String?, String?>>()

    override suspend fun putCatalogue(key: String, updatedAt: String, json: String) {
        catalogue[key] = updatedAt to json
    }

    override suspend fun catalogueUpdatedAt(key: String): String? = catalogue[key]?.first
    override suspend fun getCatalogue(key: String): String? = catalogue[key]?.second
    override suspend fun enqueue(key: String, json: String) { outbox[key] = json }
    override suspend fun pendingOutbox(): List<OutboxEntry> = outbox.map { OutboxEntry(it.key, it.value) }
    override suspend fun clearOutbox(key: String) { outbox.remove(key) }
    override suspend fun putAttempts(items: List<AttemptRecord>) { items.forEach { attemptsById[it.id] = it } }
    override suspend fun attempts(month: String): List<AttemptRecord> = attemptsById.values.filter { it.month == month }
    override suspend fun putUserState(key: String, json: String, savedAt: String?, serverUpdatedAt: String?) {
        userState[key] = Triple(json, savedAt, serverUpdatedAt)
    }
    override suspend fun getUserState(key: String): String? = userState[key]?.first
    override suspend fun userStateSavedAt(key: String): String? = userState[key]?.second

    override suspend fun clearAll() {
        catalogue.clear(); outbox.clear(); attemptsById.clear(); userState.clear()
    }
}
