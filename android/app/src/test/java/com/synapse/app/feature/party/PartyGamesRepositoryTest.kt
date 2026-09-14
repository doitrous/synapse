package com.synapse.app.feature.party

import kotlinx.coroutines.CancellationException
import kotlinx.coroutines.ExperimentalCoroutinesApi
import kotlinx.coroutines.flow.toList
import kotlinx.coroutines.launch
import kotlinx.coroutines.test.advanceTimeBy
import kotlinx.coroutines.test.runTest
import kotlinx.serialization.json.JsonArray
import kotlinx.serialization.json.jsonPrimitive
import org.junit.Assert.assertEquals
import org.junit.Assert.assertTrue
import org.junit.Test

/**
 * [PartyGamesRepository]: the action builders send the shape
 * `applyActionToPartyGame` in `server/src/partyGames.js` actually expects
 * (see [PartyGamesRepository]'s class doc for why there is no `join`), and
 * [PartyGamesRepository.pollGame] retries through a transient failure, stops
 * for good once `completed` or [GamePoll.Gone], and never swallows a
 * [CancellationException] mid-fetch.
 */
@OptIn(ExperimentalCoroutinesApi::class)
class PartyGamesRepositoryTest {

    private val api = FakePartyApi()
    private val repository = PartyGamesRepository(api)

    @Test
    fun startSendsATypeOnlyAction() = runTest {
        repository.start("p1", "g1")
        assertEquals("start", api.lastAction?.get("type")?.jsonPrimitive?.content)
    }

    @Test
    fun submitAnswerSendsRoundIdAndAnswer() = runTest {
        repository.submitAnswer("p1", "g1", "round-1", PartyGameAnswer.Text("choice-a"))
        val action = api.lastAction!!
        assertEquals("submit_answer", action["type"]?.jsonPrimitive?.content)
        assertEquals("round-1", action["roundId"]?.jsonPrimitive?.content)
        assertEquals("choice-a", action["answer"]?.jsonPrimitive?.content)
    }

    @Test
    fun submitAnswerSendsAnOrderedAnswerAsAnArray() = runTest {
        repository.submitAnswer("p1", "g1", "round-1", PartyGameAnswer.Ordered(listOf("a", "b", "c")))
        val answer = api.lastAction!!["answer"] as JsonArray
        assertEquals(listOf("a", "b", "c"), answer.map { it.jsonPrimitive.content })
    }

    @Test
    fun pollGameStopsOnceTheGameHasCompleted() = runTest {
        api.singleGame = { fixtureGameState(status = "completed") }
        val ticks = repository.pollGame("p1", "g1").toList()
        assertEquals(1, ticks.size)
        assertTrue((ticks.single() as GamePoll.Loaded).game.isCompleted)
    }

    @Test
    fun pollGameStopsOnceTheGameIsGone() = runTest {
        api.singleGame = { throw notFoundApiException() }
        val ticks = repository.pollGame("p1", "g1").toList()
        assertEquals(listOf(GamePoll.Gone), ticks)
    }

    @Test
    fun pollGameRethrowsCancellationRatherThanSwallowingIt() = runTest {
        api.singleGame = { throw CancellationException("gone mid-fetch") }
        var thrown: Throwable? = null
        try {
            repository.pollGame("p1", "g1").toList()
        } catch (e: CancellationException) {
            thrown = e
        }
        assertTrue(thrown is CancellationException)
    }

    @Test
    fun pollGameKeepsRetryingThroughATransientFailure() = runTest {
        var attempt = 0
        api.singleGame = {
            attempt++
            if (attempt == 1) throw java.io.IOException("offline") else fixtureGameState(status = "in_round")
        }
        val job = launch { repository.pollGame("p1", "g1").collect { } }
        advanceTimeBy(PARTY_POLL_INTERVAL.inWholeMilliseconds + 1_000)
        assertTrue("a transient failure must not stop the loop", attempt >= 2)
        // Stop the poll before runTest's end-of-body drain, per the task's polling-test warning.
        job.cancel()
        job.join()
    }
}
