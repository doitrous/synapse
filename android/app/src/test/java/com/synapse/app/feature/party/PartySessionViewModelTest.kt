package com.synapse.app.feature.party

import androidx.datastore.preferences.core.PreferenceDataStoreFactory
import androidx.test.core.app.ApplicationProvider
import com.synapse.app.core.sync.SyncEngine
import com.synapse.app.feature.qbank.QBankRepository
import com.synapse.app.feature.social.FakeLocalStore
import com.synapse.app.feature.social.FakeQBankApi
import com.synapse.app.feature.social.FakeSynapseApi
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
 * [PartySessionViewModel] drives one open party session on `viewModelScope`.
 * [open] starts [PartySessionsRepository.pollSession]'s 4s poll; [close] must
 * actually stop it, per the task's polling-ViewModel hazard — every test that
 * starts a poll here calls [PartySessionViewModel.close] before the test body
 * ends.
 */
@RunWith(RobolectricTestRunner::class)
@OptIn(ExperimentalCoroutinesApi::class)
class PartySessionViewModelTest {

    private val dispatcher = StandardTestDispatcher()

    @Before fun setUp() { Dispatchers.setMain(dispatcher) }
    @After fun tearDown() { Dispatchers.resetMain() }

    private fun viewModel(api: FakePartyApi): PartySessionViewModel {
        val context = ApplicationProvider.getApplicationContext<android.content.Context>()
        val localStore = FakeLocalStore()
        val syncEngine = SyncEngine(FakeSynapseApi(), localStore, readableKeys = emptyList(), userStateKeys = emptyList())
        val mediaCache = com.synapse.app.core.media.MediaCache(java.io.File(context.cacheDir, "party-session-vm-test-media-${System.nanoTime()}"), FakeQBankApi())
        val pinsDataStore = PreferenceDataStoreFactory.create(
            produceFile = { java.io.File(context.filesDir, "party-session-vm-test-pins-${System.nanoTime()}.preferences_pb") }
        )
        val qbankRepository = QBankRepository(localStore, syncEngine, mediaCache, FakeQBankApi(), Json { ignoreUnknownKeys = true }, pinsDataStore)
        return PartySessionViewModel(PartySessionsRepository(api, qbankRepository))
    }

    @Test
    fun openReflectsTheServerSessionOnceThePollFires() = runTest {
        val api = FakePartyApi().apply { singleSession = { fixtureSession(state = "open") } }
        val viewModel = viewModel(api)

        viewModel.open("s1")
        dispatcher.scheduler.advanceTimeBy(10)
        dispatcher.scheduler.runCurrent()

        val state = viewModel.uiState.value
        assertTrue(state is PartySessionUiState.InSession)
        assertEquals("s1", (state as PartySessionUiState.InSession).session.id)

        viewModel.close()
        dispatcher.scheduler.runCurrent()
    }

    @Test
    fun closeStopsAnyFurtherPolling() = runTest {
        val api = FakePartyApi().apply { singleSession = { fixtureSession(state = "open") } }
        val viewModel = viewModel(api)

        viewModel.open("s1")
        dispatcher.scheduler.advanceTimeBy(10)
        dispatcher.scheduler.runCurrent()
        val callsAtOpen = api.sessionCallCount
        assertTrue(callsAtOpen > 0)

        viewModel.close()
        dispatcher.scheduler.advanceTimeBy(PARTY_POLL_INTERVAL.inWholeMilliseconds * 3)
        dispatcher.scheduler.runCurrent()

        assertEquals("closing the session must stop the 4s poll loop", callsAtOpen, api.sessionCallCount)
        assertEquals(PartySessionUiState.Loading, viewModel.uiState.value)
    }

    @Test
    fun aClosedServerSessionStopsThePollOnItsOwn() = runTest {
        val api = FakePartyApi().apply { singleSession = { fixtureSession(state = "closed") } }
        val viewModel = viewModel(api)

        viewModel.open("s1")
        dispatcher.scheduler.advanceTimeBy(10)
        dispatcher.scheduler.runCurrent()

        val state = viewModel.uiState.value
        assertTrue(state is PartySessionUiState.InSession)
        assertTrue((state as PartySessionUiState.InSession).session.isClosed)

        // The poll already stopped itself (terminal state) — close() is still
        // safe to call and is what a real exit from the screen always does.
        viewModel.close()
        dispatcher.scheduler.runCurrent()
    }
}
