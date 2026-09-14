package com.synapse.app.feature.notifications

import com.synapse.app.core.api.ApiError
import com.synapse.app.core.api.ApiException
import com.synapse.app.core.api.ShareNotification
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.ExperimentalCoroutinesApi
import kotlinx.coroutines.test.StandardTestDispatcher
import kotlinx.coroutines.test.resetMain
import kotlinx.coroutines.test.runTest
import kotlinx.coroutines.test.setMain
import kotlinx.serialization.json.Json
import org.junit.After
import org.junit.Assert.assertEquals
import org.junit.Before
import org.junit.Test
import java.time.Instant

/** [NotificationsViewModel] built against a real [NotificationsRepository] wired to hand-written fakes — same convention as `MaristanaViewModelTest`. */
@OptIn(ExperimentalCoroutinesApi::class)
class NotificationsViewModelTest {

    private val dispatcher = StandardTestDispatcher()
    private val json = Json { ignoreUnknownKeys = true }
    private val now = Instant.parse("2026-08-29T12:00:00Z")

    private val unread = ShareNotification(id = "n1", title = "Shared note updated", message = "m1", to = "/s/s1", readAt = null)
    private val read = ShareNotification(id = "n2", title = "Shared whiteboard updated", message = "m2", to = "/s/s2", readAt = "2026-08-28T09:00:00Z")

    @Before fun setUp() { Dispatchers.setMain(dispatcher) }
    @After fun tearDown() { Dispatchers.resetMain() }

    private fun viewModel(api: FakeNotificationsApi = FakeNotificationsApi(seed = listOf(unread, read))): NotificationsViewModel =
        NotificationsViewModel(NotificationsRepository(FakeNotificationsLocalStore(), api, json)).apply { this.now = { this@NotificationsViewModelTest.now } }

    @Test
    fun loadsNotificationsOnInit() = runTest(dispatcher) {
        val viewModel = viewModel()
        dispatcher.scheduler.advanceUntilIdle()

        val state = viewModel.uiState.value as NotificationsUiState.Content
        assertEquals(2, state.items.size)
        assertEquals(1, state.unreadCount)
        assertEquals(false, state.fromCache)
    }

    @Test
    fun unavailableWhenTheFetchFailsAndNothingIsCached() = runTest(dispatcher) {
        val api = FakeNotificationsApi()
        api.listResult = { throw ApiException(ApiError.Retryable(RuntimeException("offline"))) }
        val viewModel = viewModel(api)
        dispatcher.scheduler.advanceUntilIdle()

        assertEquals(NotificationsUiState.Unavailable, viewModel.uiState.value)
    }

    @Test
    fun markReadFlipsTheItemAndClearsItFromTheUnreadCount() = runTest(dispatcher) {
        val api = FakeNotificationsApi(seed = listOf(unread, read))
        val viewModel = viewModel(api)
        dispatcher.scheduler.advanceUntilIdle()

        viewModel.markRead("n1")
        dispatcher.scheduler.advanceUntilIdle()

        assertEquals(listOf("n1"), api.markReadCalls.single())
        val state = viewModel.uiState.value as NotificationsUiState.Content
        assertEquals(0, state.unreadCount)
    }

    @Test
    fun markReadOnAnAlreadyReadItemIsANoOp() = runTest(dispatcher) {
        val api = FakeNotificationsApi(seed = listOf(unread, read))
        val viewModel = viewModel(api)
        dispatcher.scheduler.advanceUntilIdle()

        viewModel.markRead("n2")
        dispatcher.scheduler.advanceUntilIdle()

        assertEquals(0, api.markReadCalls.size)
    }
}
