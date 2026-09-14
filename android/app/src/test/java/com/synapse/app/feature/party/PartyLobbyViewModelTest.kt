package com.synapse.app.feature.party

import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.ExperimentalCoroutinesApi
import kotlinx.coroutines.test.StandardTestDispatcher
import kotlinx.coroutines.test.resetMain
import kotlinx.coroutines.test.runTest
import kotlinx.coroutines.test.setMain
import org.junit.After
import org.junit.Assert.assertEquals
import org.junit.Assert.assertTrue
import org.junit.Before
import org.junit.Test
import org.junit.runner.RunWith
import org.robolectric.RobolectricTestRunner

/**
 * [PartyLobbyViewModel] drives one open party's lobby on `viewModelScope`.
 * [open] starts [PartiesRepository.pollParty]'s 4s poll; [close] — called on
 * every exit from a lobby, per `PartiesRoute`'s `onBack`/`onLeft` — must
 * actually stop it, or the leaked `while(true)` loop spins `runTest`'s
 * end-of-body drain forever (the task's polling-ViewModel hazard).
 */
@RunWith(RobolectricTestRunner::class)
@OptIn(ExperimentalCoroutinesApi::class)
class PartyLobbyViewModelTest {

    private val dispatcher = StandardTestDispatcher()

    @Before fun setUp() { Dispatchers.setMain(dispatcher) }
    @After fun tearDown() { Dispatchers.resetMain() }

    private fun viewModel(api: FakePartyApi): PartyLobbyViewModel =
        PartyLobbyViewModel(PartiesRepository(api), PartySessionsRepository(api, mockQBankRepository()), PartyGamesRepository(api))

    @Test
    fun openReflectsTheServerPartyOnceThePollFires() = runTest {
        val api = FakePartyApi().apply { singleParty = { fixtureParty() } }
        val viewModel = viewModel(api)

        viewModel.open("p1")
        dispatcher.scheduler.advanceTimeBy(10)
        dispatcher.scheduler.runCurrent()

        val state = viewModel.uiState.value
        assertTrue(state is PartyLobbyUiState.Content)
        assertEquals("p1", (state as PartyLobbyUiState.Content).party.id)

        // Stop the party's infinite poll loop before runTest drains the scheduler.
        viewModel.close()
        dispatcher.scheduler.runCurrent()
    }

    @Test
    fun closeStopsAnyFurtherPolling() = runTest {
        val api = FakePartyApi().apply { singleParty = { fixtureParty() } }
        val viewModel = viewModel(api)

        viewModel.open("p1")
        dispatcher.scheduler.advanceTimeBy(10)
        dispatcher.scheduler.runCurrent()
        val callsAtOpen = api.partyCallCount
        assertTrue(callsAtOpen > 0)

        viewModel.close()
        dispatcher.scheduler.advanceTimeBy(PARTY_POLL_INTERVAL.inWholeMilliseconds * 3)
        dispatcher.scheduler.runCurrent()

        assertEquals("closing the lobby must stop the 4s poll loop", callsAtOpen, api.partyCallCount)
        assertEquals(PartyLobbyUiState.Loading, viewModel.uiState.value)
    }
}

/** A [com.synapse.app.feature.qbank.QBankRepository] this file never actually calls — [PartyLobbyViewModel] never resolves questions itself. */
private fun mockQBankRepository(): com.synapse.app.feature.qbank.QBankRepository {
    val localStore = com.synapse.app.feature.social.FakeLocalStore()
    val syncEngine = com.synapse.app.core.sync.SyncEngine(com.synapse.app.feature.social.FakeSynapseApi(), localStore, readableKeys = emptyList(), userStateKeys = emptyList())
    val mediaCache = com.synapse.app.core.media.MediaCache(
        java.io.File(org.robolectric.RuntimeEnvironment.getApplication().cacheDir, "party-lobby-vm-test-media-${System.nanoTime()}"),
        com.synapse.app.feature.social.FakeQBankApi(),
    )
    val pinsDataStore = androidx.datastore.preferences.core.PreferenceDataStoreFactory.create(
        produceFile = { java.io.File(org.robolectric.RuntimeEnvironment.getApplication().filesDir, "party-lobby-vm-test-pins-${System.nanoTime()}.preferences_pb") }
    )
    return com.synapse.app.feature.qbank.QBankRepository(
        localStore, syncEngine, mediaCache, com.synapse.app.feature.social.FakeQBankApi(),
        kotlinx.serialization.json.Json { ignoreUnknownKeys = true }, pinsDataStore,
    )
}
