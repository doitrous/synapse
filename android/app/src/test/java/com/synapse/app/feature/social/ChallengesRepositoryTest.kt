package com.synapse.app.feature.social

import androidx.datastore.preferences.core.PreferenceDataStoreFactory
import androidx.test.core.app.ApplicationProvider
import com.synapse.app.core.api.ApiError
import com.synapse.app.core.api.ApiException
import com.synapse.app.core.api.ChallengeDto
import com.synapse.app.core.sync.SyncEngine
import com.synapse.app.core.media.MediaCache
import com.synapse.app.feature.qbank.QBankRepository
import kotlinx.coroutines.CancellationException
import kotlinx.coroutines.ExperimentalCoroutinesApi
import kotlinx.coroutines.flow.toList
import kotlinx.coroutines.launch
import kotlinx.coroutines.test.advanceTimeBy
import kotlinx.coroutines.test.runTest
import kotlinx.serialization.json.Json
import okhttp3.ResponseBody.Companion.toResponseBody
import org.junit.Assert.assertEquals
import org.junit.Assert.assertTrue
import org.junit.Before
import org.junit.Test
import org.junit.runner.RunWith
import org.robolectric.RobolectricTestRunner
import retrofit2.HttpException
import retrofit2.Response

/**
 * [ChallengesRepository]: same 4s-poll-while-collected contract as
 * [StudyRoomsRepositoryTest] covers for [StudyRoomsRepository] — retries
 * through a transient failure, stops for good on `Gone`/`declined`/`complete`,
 * and never swallows a [CancellationException] from a fetch cut short mid-flight.
 */
@RunWith(RobolectricTestRunner::class)
@OptIn(ExperimentalCoroutinesApi::class)
class ChallengesRepositoryTest {

    private lateinit var api: FakeSocialApi
    private lateinit var localStore: FakeLocalStore
    private lateinit var qbankRepository: QBankRepository
    private lateinit var repository: ChallengesRepository

    @Before
    fun setup() {
        api = FakeSocialApi()
        val context = ApplicationProvider.getApplicationContext<android.content.Context>()
        localStore = FakeLocalStore()
        val syncEngine = SyncEngine(FakeSynapseApi(), localStore, readableKeys = emptyList(), userStateKeys = emptyList())
        val mediaCache = MediaCache(java.io.File(context.cacheDir, "social-test-media-${System.nanoTime()}"), FakeQBankApi())
        val pinsDataStore = PreferenceDataStoreFactory.create(
            produceFile = { java.io.File(context.filesDir, "social-test-pins-${System.nanoTime()}.preferences_pb") }
        )
        qbankRepository = QBankRepository(localStore, syncEngine, mediaCache, FakeQBankApi(), Json { ignoreUnknownKeys = true }, pinsDataStore)
        repository = ChallengesRepository(api, qbankRepository)
    }

    @Test
    fun myChallengesReturnsLoadedOnSuccess() = runTest {
        val outcome = repository.myChallenges()
        assertTrue(outcome is ChallengesOutcome.Loaded)
    }

    @Test
    fun pollChallengeRethrowsCancellationRatherThanSwallowingIt() = runTest {
        api.singleChallenge = { throw CancellationException("gone mid-fetch") }
        var thrown: Throwable? = null
        try {
            repository.pollChallenge("c1").toList()
        } catch (e: CancellationException) {
            thrown = e
        }
        assertTrue(thrown is CancellationException)
    }

    @Test
    fun pollChallengeStopsOnceComplete() = runTest {
        api.singleChallenge = { challenge(status = "complete") }
        val ticks = repository.pollChallenge("c1").toList()
        assertEquals(1, ticks.size)
        assertTrue((ticks.single() as ChallengePoll.Loaded).challenge.isComplete)
    }

    @Test
    fun pollChallengeStopsOnceDeclined() = runTest {
        api.singleChallenge = { challenge(status = "declined") }
        val ticks = repository.pollChallenge("c1").toList()
        assertTrue((ticks.single() as ChallengePoll.Loaded).challenge.isDeclined)
    }

    @Test
    fun pollChallengeStopsOnceGone() = runTest {
        api.singleChallenge = {
            val response = Response.error<Any>(404, "{}".toResponseBody(null))
            throw ApiException(ApiError.Retryable(HttpException(response)))
        }
        val ticks = repository.pollChallenge("c1").toList()
        assertEquals(listOf(ChallengePoll.Gone), ticks)
    }

    @Test
    fun pollChallengeKeepsRetryingThroughATransientFailureAndStopsOnCollectorCancel() = runTest {
        api.singleChallenge = { challenge(status = "running") }
        val job = launch { repository.pollChallenge("c1").collect { } }
        advanceTimeBy(ROOM_POLL_INTERVAL.inWholeMilliseconds + 500)
        val callsBeforeCancel = api.challengeCallCount
        job.cancel()
        job.join()
        advanceTimeBy(ROOM_POLL_INTERVAL.inWholeMilliseconds * 3)
        assertEquals(callsBeforeCancel, api.challengeCallCount)
    }

    private fun challenge(status: String) = ChallengeDto(
        id = "c1", challengerId = "u1", opponentId = "u2", status = status, myRole = "challenger",
    )
}
