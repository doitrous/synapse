package com.synapse.app.feature.social

import androidx.datastore.preferences.core.PreferenceDataStoreFactory
import androidx.test.core.app.ApplicationProvider
import com.synapse.app.core.api.StudyRoomDto
import com.synapse.app.core.media.MediaCache
import com.synapse.app.core.sync.SyncEngine
import com.synapse.app.feature.qbank.QBankRepository
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.ExperimentalCoroutinesApi
import kotlinx.coroutines.test.StandardTestDispatcher
import kotlinx.coroutines.test.resetMain
import kotlinx.coroutines.test.runTest
import kotlinx.coroutines.test.setMain
import kotlinx.serialization.json.Json
import org.junit.After
import org.junit.Assert.assertEquals
import org.junit.Assert.assertTrue
import org.junit.Before
import org.junit.Test
import org.junit.runner.RunWith
import org.robolectric.RobolectricTestRunner

/**
 * [RoomViewModel] drives one open room on `viewModelScope`. The behavior
 * worth locking down at this layer (on top of what [StudyRoomsRepositoryTest]
 * already proves about the repository's own poll loop) is the ViewModel's
 * half of the lifecycle contract: [RoomViewModel.open] starts reflecting
 * server state, and [RoomViewModel.close] — called on every exit from a room,
 * per `StudyTogetherRoute`'s `onLeave` — actually stops further network calls.
 */
@RunWith(RobolectricTestRunner::class)
@OptIn(ExperimentalCoroutinesApi::class)
class RoomViewModelTest {

    private val dispatcher = StandardTestDispatcher()

    @Before fun setUp() { Dispatchers.setMain(dispatcher) }
    @After fun tearDown() { Dispatchers.resetMain() }

    private fun viewModel(api: FakeSocialApi): RoomViewModel {
        val context = ApplicationProvider.getApplicationContext<android.content.Context>()
        val localStore = FakeLocalStore()
        val syncEngine = SyncEngine(FakeSynapseApi(), localStore, readableKeys = emptyList(), userStateKeys = emptyList())
        val mediaCache = MediaCache(java.io.File(context.cacheDir, "social-vm-test-media-${System.nanoTime()}"), FakeQBankApi())
        val pinsDataStore = PreferenceDataStoreFactory.create(
            produceFile = { java.io.File(context.filesDir, "social-vm-test-pins-${System.nanoTime()}.preferences_pb") }
        )
        val qbankRepository = QBankRepository(localStore, syncEngine, mediaCache, FakeQBankApi(), Json { ignoreUnknownKeys = true }, pinsDataStore)
        return RoomViewModel(StudyRoomsRepository(api, qbankRepository))
    }

    private fun room(status: String) = StudyRoomDto(id = "r1", code = "ABC123", name = "Test room", status = status)

    @Test
    fun openReflectsTheServerRoomOnceThePollFires() = runTest {
        val api = FakeSocialApi().apply { singleRoom = { room(status = "lobby") } }
        val viewModel = viewModel(api)

        viewModel.open("r1")
        dispatcher.scheduler.advanceTimeBy(10)
        dispatcher.scheduler.runCurrent()

        val state = viewModel.uiState.value
        assertTrue(state is RoomDetailUiState.InRoom)
        assertTrue((state as RoomDetailUiState.InRoom).room.isLobby)

        // Stop the room's infinite poll loop before runTest drains the scheduler;
        // the poll lives on viewModelScope (this test dispatcher), so a leaked
        // while(true) loop would spin the end-of-test advanceUntilIdle forever.
        viewModel.close()
        dispatcher.scheduler.runCurrent()
    }

    @Test
    fun closeStopsAnyFurtherPolling() = runTest {
        val api = FakeSocialApi().apply { singleRoom = { room(status = "running") } }
        val viewModel = viewModel(api)

        viewModel.open("r1")
        dispatcher.scheduler.advanceTimeBy(10)
        dispatcher.scheduler.runCurrent()
        val callsAtOpen = api.roomCallCount
        assertTrue(callsAtOpen > 0)

        viewModel.close()
        dispatcher.scheduler.advanceTimeBy(ROOM_POLL_INTERVAL.inWholeMilliseconds * 3)
        dispatcher.scheduler.runCurrent()

        assertEquals("closing the room must stop the 4s poll loop", callsAtOpen, api.roomCallCount)
        assertEquals(RoomDetailUiState.Loading, viewModel.uiState.value)
    }

    @Test
    fun reopeningADifferentRoomCancelsThePreviousRoomsPoll() = runTest {
        val api = FakeSocialApi().apply { singleRoom = { room(status = "running") } }
        val viewModel = viewModel(api)

        viewModel.open("r1")
        dispatcher.scheduler.advanceTimeBy(10)
        dispatcher.scheduler.runCurrent()
        val callsForFirstRoom = api.roomCallCount

        viewModel.open("r2")
        dispatcher.scheduler.advanceTimeBy(ROOM_POLL_INTERVAL.inWholeMilliseconds * 3)
        dispatcher.scheduler.runCurrent()

        // Both rooms share the one fake `room(id)` call, so this only proves the
        // old poll didn't keep running forever alongside the new one — a bound
        // rather than an exact count, since r2's own polling keeps calling in.
        assertTrue(api.roomCallCount > callsForFirstRoom)

        // Stop r2's infinite poll before runTest drains — see the note in
        // openReflectsTheServerRoomOnceThePollFires.
        viewModel.close()
        dispatcher.scheduler.runCurrent()
    }
}
