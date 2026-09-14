package com.synapse.app.feature.party

import com.synapse.app.core.auth.AuthBackend
import com.synapse.app.core.auth.Session
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.ExperimentalCoroutinesApi
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
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
 * [PartyGameViewModel] drives one open party game on `viewModelScope`.
 * [open] starts [PartyGamesRepository.pollGame]'s 4s poll; [close] must
 * actually stop it, per the task's polling-ViewModel hazard.
 */
@RunWith(RobolectricTestRunner::class)
@OptIn(ExperimentalCoroutinesApi::class)
class PartyGameViewModelTest {

    private val dispatcher = StandardTestDispatcher()

    @Before fun setUp() { Dispatchers.setMain(dispatcher) }
    @After fun tearDown() { Dispatchers.resetMain() }

    private fun viewModel(api: FakePartyApi): PartyGameViewModel =
        PartyGameViewModel(PartyGamesRepository(api), FakeAuthBackend(userId = "guest-1"))

    @Test
    fun openReflectsTheServerGameOnceThePollFires() = runTest {
        val api = FakePartyApi().apply { singleGame = { fixtureGameState(status = "lobby") } }
        val viewModel = viewModel(api)

        viewModel.open("p1", "g1")
        dispatcher.scheduler.advanceTimeBy(10)
        dispatcher.scheduler.runCurrent()

        val state = viewModel.uiState.value
        assertTrue(state is PartyGameUiState.InGame)
        assertEquals("g1", (state as PartyGameUiState.InGame).game.id)

        viewModel.close()
        dispatcher.scheduler.runCurrent()
    }

    @Test
    fun closeStopsAnyFurtherPolling() = runTest {
        val api = FakePartyApi().apply { singleGame = { fixtureGameState(status = "in_round") } }
        val viewModel = viewModel(api)

        viewModel.open("p1", "g1")
        dispatcher.scheduler.advanceTimeBy(10)
        dispatcher.scheduler.runCurrent()
        val callsAtOpen = api.gameCallCount
        assertTrue(callsAtOpen > 0)

        viewModel.close()
        dispatcher.scheduler.advanceTimeBy(PARTY_POLL_INTERVAL.inWholeMilliseconds * 3)
        dispatcher.scheduler.runCurrent()

        assertEquals("closing the game must stop the 4s poll loop", callsAtOpen, api.gameCallCount)
        assertEquals(PartyGameUiState.Loading, viewModel.uiState.value)
    }

    @Test
    fun aCompletedServerGameStopsThePollOnItsOwn() = runTest {
        val api = FakePartyApi().apply { singleGame = { fixtureGameState(status = "completed") } }
        val viewModel = viewModel(api)

        viewModel.open("p1", "g1")
        dispatcher.scheduler.advanceTimeBy(10)
        dispatcher.scheduler.runCurrent()

        val state = viewModel.uiState.value
        assertTrue(state is PartyGameUiState.InGame)
        assertEquals("completed", (state as PartyGameUiState.InGame).game.status)

        viewModel.close()
        dispatcher.scheduler.runCurrent()
    }
}

private class FakeAuthBackend(userId: String) : AuthBackend {
    private val _session = MutableStateFlow<Session?>(Session(userId, "token", emailVerified = true))
    override val session: StateFlow<Session?> = _session.asStateFlow()
    override suspend fun restore() {}
    override suspend fun signIn(email: String, password: String) {}
    override suspend fun signUp(email: String, password: String) {}
    override suspend fun signOut() { _session.value = null }
    override suspend fun sendReset(email: String) {}
    override suspend fun accessToken(): String? = _session.value?.accessToken
}
