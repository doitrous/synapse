package com.synapse.app.feature.party

import kotlinx.coroutines.CancellationException
import kotlinx.coroutines.ExperimentalCoroutinesApi
import kotlinx.coroutines.flow.toList
import kotlinx.coroutines.launch
import kotlinx.coroutines.test.advanceTimeBy
import kotlinx.coroutines.test.runTest
import org.junit.Assert.assertEquals
import org.junit.Assert.assertTrue
import org.junit.Test

/**
 * [PartiesRepository]: the myParties/openParties passthroughs, and —
 * carefully — [PartiesRepository.pollParty]'s 4s cadence. A party has no
 * terminal state of its own (see the class doc), so the poll must keep
 * retrying through a transient failure and through [ApiException]s alike,
 * stop for good on [PartyPoll.Gone], and never swallow a
 * [CancellationException] thrown mid-fetch — the exact hazard the task's
 * polling-ViewModel warning calls out: any test that starts a poll must give
 * it a way to actually stop before the test body ends.
 */
@OptIn(ExperimentalCoroutinesApi::class)
class PartiesRepositoryTest {

    private val api = FakePartyApi()
    private val repository = PartiesRepository(api)

    @Test
    fun myPartiesReturnsLoadedOnSuccess() = runTest {
        api.partiesList = listOf(com.synapse.app.core.api.PartySummaryDto(id = "p1", code = "ABC123", name = "Test party", visibility = "invite"))
        val outcome = repository.myParties()
        assertTrue(outcome is PartiesOutcome.Loaded)
        assertEquals(1, (outcome as PartiesOutcome.Loaded).parties.size)
    }

    @Test
    fun myPartiesDegradesToUnavailableWhenOffline() = runTest {
        api.partiesFailure = java.io.IOException("offline")
        assertEquals(PartiesOutcome.Unavailable, repository.myParties())
    }

    @Test
    fun myPartiesRethrowsCancellationRatherThanSwallowingIt() = runTest {
        api.partiesFailure = CancellationException("navigated away")
        var thrown: Throwable? = null
        try {
            repository.myParties()
        } catch (e: CancellationException) {
            thrown = e
        }
        assertTrue("a CancellationException must propagate, not be reported as Unavailable", thrown is CancellationException)
    }

    @Test
    fun pollPartyStopsOnceThePartyIsGone() = runTest {
        api.singleParty = { throw notFoundApiException() }
        val ticks = repository.pollParty("p1").toList()
        assertEquals(listOf(PartyPoll.Gone), ticks)
    }

    @Test
    fun pollPartyRethrowsCancellationRatherThanSwallowingIt() = runTest {
        api.singleParty = { throw CancellationException("gone mid-fetch") }
        var thrown: Throwable? = null
        try {
            repository.pollParty("p1").toList()
        } catch (e: CancellationException) {
            thrown = e
        }
        assertTrue(thrown is CancellationException)
    }

    @Test
    fun pollPartyKeepsRetryingThroughATransientFailure() = runTest {
        var attempt = 0
        api.singleParty = {
            attempt++
            if (attempt == 1) throw java.io.IOException("offline") else fixtureParty()
        }
        val job = launch { repository.pollParty("p1").collect { } }
        advanceTimeBy(PARTY_POLL_INTERVAL.inWholeMilliseconds + 1_000)
        assertTrue("a transient failure must not stop the loop", attempt >= 2)
        // Stop the poll before runTest's end-of-body drain — an uncancelled
        // while(true) loop here would spin forever, per the task's warning.
        job.cancel()
        job.join()
    }

    @Test
    fun pollPartyStopsFetchingOnceTheCollectorIsCancelled() = runTest {
        api.singleParty = { fixtureParty() }
        val job = launch { repository.pollParty("p1").collect { } }
        advanceTimeBy(PARTY_POLL_INTERVAL.inWholeMilliseconds + 500)
        val callsBeforeCancel = api.partyCallCount
        job.cancel()
        job.join()
        advanceTimeBy(PARTY_POLL_INTERVAL.inWholeMilliseconds * 3)
        assertEquals("no further network calls once nothing is collecting", callsBeforeCancel, api.partyCallCount)
    }
}
