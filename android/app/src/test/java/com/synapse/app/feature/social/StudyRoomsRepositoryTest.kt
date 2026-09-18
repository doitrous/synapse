package com.synapse.app.feature.social

import androidx.datastore.preferences.core.PreferenceDataStoreFactory
import androidx.test.core.app.ApplicationProvider
import com.synapse.app.core.api.ChallengeAnswerBody
import com.synapse.app.core.api.ChallengeAnswerMutation
import com.synapse.app.core.api.ChallengeDto
import com.synapse.app.core.api.ChallengeListResponse
import com.synapse.app.core.api.ChallengeMutation
import com.synapse.app.core.api.ChallengeResponse
import com.synapse.app.core.api.CreateChallengeBody
import com.synapse.app.core.api.CreateRoomBody
import com.synapse.app.core.api.DirectoryResponse
import com.synapse.app.core.api.FriendMutation
import com.synapse.app.core.api.FriendsResponse
import com.synapse.app.core.api.InviteResponse
import com.synapse.app.core.api.PersonDto
import com.synapse.app.core.api.RedeemInviteMutation
import com.synapse.app.core.api.RoomAnswerBody
import com.synapse.app.core.api.RoomAnswerMutation
import com.synapse.app.core.api.RoomListResponse
import com.synapse.app.core.api.RoomMutation
import com.synapse.app.core.api.SocialApi
import com.synapse.app.core.api.StudyRoomDto
import com.synapse.app.core.api.VerifiedAttemptsBody
import com.synapse.app.core.api.ApiError
import com.synapse.app.core.api.ApiException
import com.synapse.app.core.api.QBankApi
import com.synapse.app.core.cache.LocalStore
import com.synapse.app.core.cache.OutboxEntry
import com.synapse.app.core.media.MediaCache
import com.synapse.app.core.model.Manifest
import com.synapse.app.core.model.SessionDto
import com.synapse.app.core.model.StateDoc
import com.synapse.app.core.api.SynapseApi
import com.synapse.app.core.sync.SyncEngine
import com.synapse.app.feature.qbank.QBankRepository
import kotlinx.coroutines.CancellationException
import kotlinx.coroutines.ExperimentalCoroutinesApi
import kotlinx.coroutines.flow.toList
import kotlinx.coroutines.launch
import kotlinx.coroutines.test.advanceTimeBy
import kotlinx.coroutines.test.runTest
import kotlinx.serialization.json.Json
import kotlinx.serialization.json.JsonNull
import okhttp3.ResponseBody
import okhttp3.ResponseBody.Companion.toResponseBody
import org.junit.Assert.assertEquals
import org.junit.Assert.assertTrue
import org.junit.Before
import org.junit.Test
import org.junit.runner.RunWith
import org.robolectric.RobolectricTestRunner
import retrofit2.HttpException
import retrofit2.Response

private typealias ModelAttemptRecord = com.synapse.app.core.model.AttemptRecord

/**
 * [StudyRoomsRepository]: the myRooms/create/join passthroughs, and — the
 * part worth being careful about — [StudyRoomsRepository.pollRoom]'s 4s
 * cadence. It must keep retrying through a transient failure, stop for good
 * once the room is `closed` or `Gone`, and — most importantly for a loop that
 * gets cancelled on every navigation away from the screen — never swallow a
 * [CancellationException] thrown mid-fetch.
 */
@RunWith(RobolectricTestRunner::class)
@OptIn(ExperimentalCoroutinesApi::class)
class StudyRoomsRepositoryTest {

    private lateinit var api: FakeSocialApi
    private lateinit var localStore: FakeLocalStore
    private lateinit var qbankRepository: QBankRepository
    private lateinit var repository: StudyRoomsRepository

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
        repository = StudyRoomsRepository(api, qbankRepository)
    }

    // --- one-shot calls ------------------------------------------------------------

    @Test
    fun myRoomsReturnsLoadedOnSuccess() = runTest {
        api.roomsList = listOf(com.synapse.app.core.api.RoomSummaryDto(id = "r1", code = "ABC123", name = "Test room", status = "lobby"))
        val outcome = repository.myRooms()
        assertTrue(outcome is RoomsOutcome.Loaded)
        assertEquals(1, (outcome as RoomsOutcome.Loaded).rooms.size)
    }

    @Test
    fun myRoomsDegradesToUnavailableWhenOffline() = runTest {
        api.roomsFailure = java.io.IOException("offline")
        val outcome = repository.myRooms()
        assertEquals(RoomsOutcome.Unavailable, outcome)
    }

    @Test
    fun myRoomsRethrowsCancellationRatherThanSwallowingIt() = runTest {
        api.roomsFailure = CancellationException("navigated away")
        var thrown: Throwable? = null
        try {
            repository.myRooms()
        } catch (e: CancellationException) {
            thrown = e
        }
        assertTrue("a CancellationException must propagate, not be reported as Unavailable", thrown is CancellationException)
    }

    // --- pollRoom --------------------------------------------------------------------

    @Test
    fun pollRoomRethrowsCancellationRatherThanSwallowingIt() = runTest {
        api.singleRoom = { throw CancellationException("gone mid-fetch") }
        var thrown: Throwable? = null
        try {
            repository.pollRoom("r1").toList()
        } catch (e: CancellationException) {
            thrown = e
        }
        assertTrue(thrown is CancellationException)
    }

    @Test
    fun pollRoomStopsOnceTheRoomHasClosed() = runTest {
        api.singleRoom = { room(status = "closed") }
        val ticks = repository.pollRoom("r1").toList()
        assertEquals(1, ticks.size)
        assertTrue((ticks.single() as RoomPoll.Loaded).room.isClosed)
    }

    @Test
    fun pollRoomStopsOnceTheRoomIsGone() = runTest {
        api.singleRoom = { throw notFound() }
        val ticks = repository.pollRoom("r1").toList()
        assertEquals(listOf(RoomPoll.Gone), ticks)
    }

    @Test
    fun pollRoomKeepsRetryingThroughATransientFailure() = runTest {
        var attempt = 0
        api.singleRoom = {
            attempt++
            if (attempt == 1) throw java.io.IOException("offline") else room(status = "running")
        }
        val job = launch { repository.pollRoom("r1").collect { } }
        advanceTimeBy(ROOM_POLL_INTERVAL.inWholeMilliseconds + 1_000)
        assertTrue("a transient failure must not stop the loop", attempt >= 2)
        job.cancel()
        job.join()
    }

    @Test
    fun pollRoomStopsFetchingOnceTheCollectorIsCancelled() = runTest {
        api.singleRoom = { room(status = "running") }
        val job = launch { repository.pollRoom("r1").collect { } }
        advanceTimeBy(ROOM_POLL_INTERVAL.inWholeMilliseconds + 500)
        val callsBeforeCancel = api.roomCallCount
        job.cancel()
        job.join()
        advanceTimeBy(ROOM_POLL_INTERVAL.inWholeMilliseconds * 3)
        assertEquals("no further network calls once nothing is collecting", callsBeforeCancel, api.roomCallCount)
    }

    // --- questionsFor ----------------------------------------------------------------

    @Test
    fun questionsForResolvesOnlySyncedIdsInTheRoomsOwnOrder() = runTest {
        seedLedger(localStore, listOf(publishedItemJson("Q1"), publishedItemJson("Q2")))
        val questions = repository.questionsFor(room(questionIds = listOf("Q2", "Q1", "Q3")))
        assertEquals(listOf("Q2", "Q1"), questions.map { it.id }) // Q3 was never synced, so it's skipped
    }

    // --- fixtures --------------------------------------------------------------------

    private fun room(status: String = "running", questionIds: List<String> = emptyList()) = StudyRoomDto(
        id = "r1", code = "ABC123", name = "Test room", status = status, questionIds = questionIds,
    )

    private fun notFound(): ApiException {
        val response = Response.error<Any>(404, "{}".toResponseBody(null))
        return ApiException(ApiError.Retryable(HttpException(response)))
    }
}

/** Mirrors `QBankRepositoryTest`'s own seeding: a [StateDoc] whose `value` is the raw JSON array `QuestionProjection` expects. */
internal fun seedLedger(localStore: LocalStore, items: List<String>) {
    val arrayJson = items.joinToString(prefix = "[", postfix = "]")
    kotlinx.coroutines.runBlocking {
        val json = Json { ignoreUnknownKeys = true }
        val doc = json.decodeFromString(StateDoc.serializer(), """{"value": $arrayJson}""")
        localStore.putCatalogue(
            com.synapse.app.feature.qbank.CONTENT_LEDGER_KEY,
            "2026-01-01T00:00:00Z",
            json.encodeToString(StateDoc.serializer(), doc),
        )
    }
}

internal fun publishedItemJson(id: String) = """
    {"id":"$id","kind":"question","status":"Published","title":"Stem $id",
     "questionData":{"answers":[{"label":"A","text":"opt A","explanation":""},{"label":"B","text":"opt B","explanation":""}],"correctAnswer":"A"}}
""".trimIndent()

// --- Fakes shared by StudyRoomsRepositoryTest and ChallengesRepositoryTest --------

internal class FakeSocialApi : SocialApi {
    var roomsList: List<com.synapse.app.core.api.RoomSummaryDto> = emptyList()
    var roomsFailure: Throwable? = null
    var singleRoom: (() -> StudyRoomDto)? = null
    var roomCallCount = 0

    var singleChallenge: (() -> ChallengeDto)? = null
    var challengeCallCount = 0

    override suspend fun createRoom(body: CreateRoomBody): RoomMutation = RoomMutation(ok = true)
    override suspend fun joinRoom(code: String): RoomMutation = RoomMutation(ok = true)
    override suspend fun myRooms(): RoomListResponse {
        roomsFailure?.let { throw it }
        return RoomListResponse(roomsList)
    }
    override suspend fun room(id: String): StudyRoomDto {
        roomCallCount++
        return singleRoom?.invoke() ?: error("no room configured")
    }
    override suspend fun startRoom(id: String): RoomMutation = RoomMutation(ok = true)
    override suspend fun submitRoomAnswer(id: String, body: RoomAnswerBody): RoomAnswerMutation = RoomAnswerMutation(ok = true)
    override suspend fun finishRoom(id: String): RoomMutation = RoomMutation(ok = true)

    override suspend fun createChallenge(body: CreateChallengeBody): ChallengeMutation = ChallengeMutation(ok = true)
    override suspend fun myChallenges(): ChallengeListResponse = ChallengeListResponse()
    override suspend fun challenge(id: String): ChallengeDto {
        challengeCallCount++
        return singleChallenge?.invoke() ?: error("no challenge configured")
    }
    override suspend fun respondToChallenge(id: String, accept: Boolean): ChallengeMutation = ChallengeMutation(ok = true)
    override suspend fun submitChallengeAnswer(id: String, body: ChallengeAnswerBody): ChallengeAnswerMutation = ChallengeAnswerMutation(ok = true)
    override suspend fun finishChallenge(id: String): ChallengeMutation = ChallengeMutation(ok = true)

    var friendsResponse: FriendsResponse = FriendsResponse()
    var friendsFailure: Throwable? = null
    var directoryResponse: DirectoryResponse = DirectoryResponse()
    var directoryFailure: Throwable? = null
    var sendRequestResult: FriendMutation = FriendMutation(ok = true)

    override suspend fun friends(): FriendsResponse {
        friendsFailure?.let { throw it }
        return friendsResponse
    }
    override suspend fun directory(query: String): DirectoryResponse {
        directoryFailure?.let { throw it }
        return directoryResponse
    }
    override suspend fun sendFriendRequest(userId: String): FriendMutation = sendRequestResult
    override suspend fun respondToFriendRequest(userId: String, accept: Boolean): FriendMutation = FriendMutation(ok = true)
    override suspend fun removeFriend(userId: String): FriendMutation = FriendMutation(ok = true)
    override suspend fun mintInvite(): InviteResponse = InviteResponse("tok")
    override suspend fun redeemInvite(token: String): RedeemInviteMutation = RedeemInviteMutation(ok = true)
}

internal class FakeLocalStore : LocalStore {
    val catalogue = linkedMapOf<String, Pair<String, String>>()
    override suspend fun putCatalogue(key: String, updatedAt: String, json: String) { catalogue[key] = updatedAt to json }
    override suspend fun catalogueUpdatedAt(key: String): String? = catalogue[key]?.first
    override suspend fun getCatalogue(key: String): String? = catalogue[key]?.second
    override suspend fun enqueue(key: String, json: String) {}
    override suspend fun pendingOutbox(): List<OutboxEntry> = emptyList()
    override suspend fun clearOutbox(key: String) {}
    override suspend fun putAttempts(items: List<ModelAttemptRecord>) {}
    override suspend fun attempts(month: String): List<ModelAttemptRecord> = emptyList()
    override suspend fun putUserState(key: String, json: String, savedAt: String?, serverUpdatedAt: String?) {}
    override suspend fun getUserState(key: String): String? = null
    override suspend fun userStateSavedAt(key: String): String? = null
    override suspend fun clearAll() { catalogue.clear() }
}

internal class FakeSynapseApi : SynapseApi {
    override suspend fun session(): SessionDto = SessionDto("u")
    override suspend fun manifest(): Manifest = emptyMap()
    override suspend fun getState(key: String): StateDoc = StateDoc(JsonNull)
    override suspend fun getUserState(key: String): StateDoc = StateDoc(JsonNull)
    override suspend fun putUserState(key: String, doc: StateDoc) {}
}

internal class FakeQBankApi : QBankApi {
    override suspend fun postAttempts(body: VerifiedAttemptsBody) {}
    override suspend fun getMedia(id: String): ResponseBody = "bytes".toResponseBody(null)
}
