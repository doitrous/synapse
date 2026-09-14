package com.synapse.app.feature.notifications

import com.synapse.app.core.api.ApiError
import com.synapse.app.core.api.ApiException
import com.synapse.app.core.api.ShareNotification
import kotlinx.coroutines.test.runTest
import kotlinx.serialization.json.Json
import org.junit.Assert.assertEquals
import org.junit.Assert.assertNull
import org.junit.Assert.assertTrue
import org.junit.Before
import org.junit.Test
import java.time.Instant

/**
 * [NotificationsRepository] maps `GET /api/notifications/shared` field-for-field,
 * caches the last-good response for offline reads (mirroring `MaristanaRepositoryTest`),
 * and passes [NotificationsRepository.markRead] straight through to the API.
 */
class NotificationsRepositoryTest {

    private val json = Json { ignoreUnknownKeys = true }
    private val now = Instant.parse("2026-08-29T12:00:00Z")

    private lateinit var localStore: FakeNotificationsLocalStore
    private lateinit var api: FakeNotificationsApi
    private lateinit var repository: NotificationsRepository

    private val unread = ShareNotification(
        id = "n1",
        title = "Shared note updated",
        message = "Ali updated \"Cardio recap\"",
        to = "/s/share1",
        createdAt = "2026-08-29T10:00:00Z",
        sentAt = "2026-08-29T10:00:00Z",
        readAt = null,
    )
    private val read = ShareNotification(
        id = "n2",
        title = "Shared whiteboard updated",
        message = "Sara updated \"Renal board\"",
        to = "/s/share2",
        createdAt = "2026-08-28T09:00:00Z",
        sentAt = "2026-08-28T09:00:00Z",
        readAt = "2026-08-28T09:05:00Z",
    )

    @Before
    fun setup() {
        localStore = FakeNotificationsLocalStore()
        api = FakeNotificationsApi(seed = listOf(unread, read))
        repository = NotificationsRepository(localStore, api, json)
    }

    @Test
    fun sharedMapsServerFieldsAndCachesTheResponse() = runTest {
        val outcome = repository.shared(now) as NotificationsOutcome.Loaded

        assertEquals(2, outcome.items.size)
        assertEquals(false, outcome.fromCache)
        val first = outcome.items.first { it.id == "n1" }
        assertEquals("Shared note updated", first.title)
        assertEquals("Ali updated \"Cardio recap\"", first.message)
        assertEquals("/s/share1", first.to)
        assertNull(first.readAt)
        assertTrue(localStore.catalogue.containsKey("notifications-shared-cache-v1"))
    }

    @Test
    fun unreadCountCountsOnlyItemsWithoutAReadAt() = runTest {
        val outcome = repository.shared(now) as NotificationsOutcome.Loaded

        assertEquals(1, outcome.items.unreadCount())
    }

    @Test
    fun markReadPostsTheGivenIdsAndFlipsReadAtOnTheNextFetch() = runTest {
        repository.shared(now)

        val changed = repository.markRead(listOf("n1"))

        assertEquals(1, changed)
        assertEquals(listOf("n1"), api.markReadCalls.single())
        val after = repository.shared(now) as NotificationsOutcome.Loaded
        assertEquals("2026-08-29T12:00:00Z", after.items.first { it.id == "n1" }.readAt)
        assertEquals(0, after.items.unreadCount())
    }

    @Test
    fun sharedFallsBackToTheCacheWhenTheLiveFetchFails() = runTest {
        repository.shared(now)
        api.listResult = { throw ApiException(ApiError.Retryable(RuntimeException("offline"))) }

        val outcome = repository.shared(now) as NotificationsOutcome.Loaded

        assertEquals(2, outcome.items.size)
        assertEquals(true, outcome.fromCache)
    }

    @Test
    fun sharedIsUnavailableWithNoCacheAndAFailedFetch() = runTest {
        api.listResult = { throw ApiException(ApiError.Retryable(RuntimeException("offline"))) }

        assertEquals(NotificationsOutcome.Unavailable, repository.shared(now))
    }
}
