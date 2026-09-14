package com.synapse.app.feature.party

import androidx.datastore.preferences.core.PreferenceDataStoreFactory
import androidx.test.core.app.ApplicationProvider
import com.synapse.app.core.api.PartySessionItemRefDto
import com.synapse.app.feature.qbank.QBankRepository
import com.synapse.app.feature.social.FakeLocalStore
import com.synapse.app.feature.social.FakeQBankApi
import com.synapse.app.feature.social.FakeSynapseApi
import com.synapse.app.core.sync.SyncEngine
import com.synapse.app.feature.social.publishedItemJson
import com.synapse.app.feature.social.seedLedger
import kotlinx.coroutines.CancellationException
import kotlinx.coroutines.ExperimentalCoroutinesApi
import kotlinx.coroutines.flow.toList
import kotlinx.coroutines.launch
import kotlinx.coroutines.test.advanceTimeBy
import kotlinx.coroutines.test.runTest
import kotlinx.serialization.json.Json
import org.junit.Assert.assertEquals
import org.junit.Assert.assertTrue
import org.junit.Before
import org.junit.Test
import org.junit.runner.RunWith
import org.robolectric.RobolectricTestRunner

/**
 * [PartySessionsRepository]: [PartySessionsRepository.questionsFor] resolves
 * only ids this device has synced (mirrors `StudyRoomsRepositoryTest`'s own
 * assertion for rooms), and [PartySessionsRepository.pollSession] retries
 * through a transient failure, stops for good once `closed` or [SessionPoll.Gone],
 * and never swallows a [CancellationException] mid-fetch.
 */
@RunWith(RobolectricTestRunner::class)
@OptIn(ExperimentalCoroutinesApi::class)
class PartySessionsRepositoryTest {

    private lateinit var api: FakePartyApi
    private lateinit var repository: PartySessionsRepository
    private lateinit var localStore: FakeLocalStore

    @Before
    fun setup() {
        api = FakePartyApi()
        val context = ApplicationProvider.getApplicationContext<android.content.Context>()
        localStore = FakeLocalStore()
        val syncEngine = SyncEngine(FakeSynapseApi(), localStore, readableKeys = emptyList(), userStateKeys = emptyList())
        val mediaCache = com.synapse.app.core.media.MediaCache(java.io.File(context.cacheDir, "party-test-media-${System.nanoTime()}"), FakeQBankApi())
        val pinsDataStore = PreferenceDataStoreFactory.create(
            produceFile = { java.io.File(context.filesDir, "party-test-pins-${System.nanoTime()}.preferences_pb") }
        )
        val qbankRepository = QBankRepository(localStore, syncEngine, mediaCache, FakeQBankApi(), Json { ignoreUnknownKeys = true }, pinsDataStore)
        repository = PartySessionsRepository(api, qbankRepository)
    }

    @Test
    fun questionsForResolvesOnlySyncedIdsInTheSessionsOwnOrder() = runTest {
        seedLedger(localStore, listOf(publishedItemJson("Q1"), publishedItemJson("Q2")))
        val session = fixtureSession().copy(
            itemRefs = listOf(PartySessionItemRefDto("question", "Q2"), PartySessionItemRefDto("question", "Q1"), PartySessionItemRefDto("question", "Q3")),
        )
        val questions = repository.questionsFor(session)
        assertEquals(listOf("Q2", "Q1"), questions.map { it.id }) // Q3 was never synced, so it's skipped
    }

    @Test
    fun pollSessionStopsOnceTheSessionHasClosed() = runTest {
        api.singleSession = { fixtureSession(state = "closed") }
        val ticks = repository.pollSession("s1").toList()
        assertEquals(1, ticks.size)
        assertTrue((ticks.single() as SessionPoll.Loaded).session.isClosed)
    }

    @Test
    fun pollSessionStopsOnceTheSessionIsGone() = runTest {
        api.singleSession = { throw notFoundApiException() }
        val ticks = repository.pollSession("s1").toList()
        assertEquals(listOf(SessionPoll.Gone), ticks)
    }

    @Test
    fun pollSessionRethrowsCancellationRatherThanSwallowingIt() = runTest {
        api.singleSession = { throw CancellationException("gone mid-fetch") }
        var thrown: Throwable? = null
        try {
            repository.pollSession("s1").toList()
        } catch (e: CancellationException) {
            thrown = e
        }
        assertTrue(thrown is CancellationException)
    }

    @Test
    fun pollSessionKeepsRetryingThroughATransientFailure() = runTest {
        var attempt = 0
        api.singleSession = {
            attempt++
            if (attempt == 1) throw java.io.IOException("offline") else fixtureSession(state = "open")
        }
        val job = launch { repository.pollSession("s1").collect { } }
        advanceTimeBy(PARTY_POLL_INTERVAL.inWholeMilliseconds + 1_000)
        assertTrue("a transient failure must not stop the loop", attempt >= 2)
        // Stop the poll before runTest's end-of-body drain, per the task's polling-test warning.
        job.cancel()
        job.join()
    }
}
