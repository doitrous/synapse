package com.synapse.app.core.api

import com.synapse.app.core.auth.AuthBackend
import com.synapse.app.core.config.AppConfig
import dagger.Module
import dagger.Provides
import dagger.hilt.InstallIn
import dagger.hilt.components.SingletonComponent
import kotlinx.serialization.Serializable
import kotlinx.serialization.json.Json
import okhttp3.MediaType.Companion.toMediaType
import okhttp3.OkHttpClient
import retrofit2.HttpException
import retrofit2.Retrofit
import com.jakewharton.retrofit2.converter.kotlinx.serialization.asConverterFactory
import retrofit2.http.Body
import retrofit2.http.GET
import retrofit2.http.Header
import retrofit2.http.POST
import retrofit2.http.Path
import retrofit2.http.Query
import java.io.IOException
import javax.inject.Singleton

/*
 * Study Together — Study Rooms, Challenges and Friends. Mirrors the shapes
 * `server/src/studyRooms.js`, `server/src/challenges.js` and
 * `server/src/friends.js` actually return; every mutating call answers with a
 * `{ ok, reason }` body rather than an HTTP error code (see [RoomMutation]/
 * [ChallengeMutation]/[FriendMutation]), so a 200 is never enough on its own
 * to mean "it worked". The Facebook-link endpoints (`/api/friends/facebook*`)
 * are omitted: they sit behind a server-side feature flag that is off, and a
 * client that called them would just be exercising dead code.
 */

// --- Study Rooms -----------------------------------------------------------

@Serializable
data class RoomMemberDto(
    val userId: String,
    val displayName: String? = null,
    val finished: Boolean = false,
    val answered: Int = 0,
    /** Null until results open, for everyone but the caller themself. */
    val correct: Int? = null,
)

@Serializable
data class RoomAnswerDto(
    val questionId: String,
    val chosenIndex: Int,
    val correct: Boolean,
)

/** A shared test, as one member sees it. See `roomFor` in `studyRooms.js`. */
@Serializable
data class StudyRoomDto(
    val id: String,
    val code: String,
    val name: String,
    val hostUserId: String? = null,
    val isHost: Boolean = false,
    /** `lobby`, `running`, or `closed`. */
    val status: String,
    val timed: Boolean = false,
    val secondsPerQuestion: Int? = null,
    val questionCount: Int = 0,
    /** Empty while the room is in the lobby, by design — see `roomFor`. */
    val questionIds: List<String> = emptyList(),
    val startedAt: String? = null,
    val closedAt: String? = null,
    val resultsOpen: Boolean = false,
    val members: List<RoomMemberDto> = emptyList(),
    val myAnswers: List<RoomAnswerDto> = emptyList(),
    val myFinished: Boolean = false,
) {
    val isLobby: Boolean get() = status == "lobby"
    val isClosed: Boolean get() = status == "closed"
    val answeredIds: Set<String> get() = myAnswers.map { it.questionId }.toSet()
}

/** A room in the student's own list. See `myRooms` in `studyRooms.js`. */
@Serializable
data class RoomSummaryDto(
    val id: String,
    val code: String,
    val name: String,
    val status: String,
    val createdAt: String? = null,
    val isHost: Boolean = false,
    val members: Int = 0,
    val questionCount: Int = 0,
    val answered: Int = 0,
    val correct: Int = 0,
    val finished: Boolean = false,
)

/**
 * What every mutating room call answers with. The server reports refusals as
 * `{ ok: false, reason }` rather than an HTTP error, so [succeeded] — not the
 * HTTP status — is what a caller must check.
 */
@Serializable
data class RoomMutation(
    val ok: Boolean? = null,
    val reason: String? = null,
    val room: StudyRoomDto? = null,
) {
    val succeeded: Boolean get() = ok != false
}

@Serializable
data class RoomListResponse(val rooms: List<RoomSummaryDto> = emptyList())

@Serializable
data class RoomResponse(val room: StudyRoomDto)

@Serializable
data class CreateRoomBody(
    val name: String,
    val questionIds: List<String>,
    val timed: Boolean,
    val secondsPerQuestion: Int? = null,
    val inviteUserIds: List<String> = emptyList(),
)

@Serializable
data class JoinRoomBody(val code: String)

@Serializable
data class RoomAnswerBody(val questionId: String, val chosenIndex: Int, val seconds: Int? = null)

/** What `POST /study-rooms/:id/answers` answers with — graded server-side. */
@Serializable
data class RoomAnswerMutation(
    val ok: Boolean? = null,
    val reason: String? = null,
    val correct: Boolean? = null,
    val correctIndex: Int? = null,
) {
    val succeeded: Boolean get() = ok != false
}

// --- Challenges --------------------------------------------------------------

@Serializable
data class ChallengeAnswerDto(val questionId: String, val chosenIndex: Int, val correct: Boolean)

@Serializable
data class SideTotalsDto(val correct: Int = 0, val answered: Int = 0, val seconds: Int = 0)

@Serializable
data class QuestionVerdictDto(
    val questionId: String,
    val challengerCorrect: Boolean = false,
    val opponentCorrect: Boolean = false,
)

/** Both sides' totals, once both have finished. See `headToHead` in `challengeResult.js`. */
@Serializable
data class HeadToHeadDto(
    val challenger: SideTotalsDto,
    val opponent: SideTotalsDto,
    val questions: List<QuestionVerdictDto> = emptyList(),
)

/** A challenge as one side sees it. See `challengeFor` in `challenges.js`. */
@Serializable
data class ChallengeDto(
    val id: String,
    val challengerId: String,
    val opponentId: String,
    val scopeLabel: String? = null,
    /** `sent`, `running`, `declined`, or `complete`. */
    val status: String,
    val questionIds: List<String> = emptyList(),
    val questionCount: Int = 0,
    val createdAt: String? = null,
    /** `challenger` or `opponent`. */
    val myRole: String,
    val myFinished: Boolean = false,
    val opponentFinished: Boolean = false,
    val myAnswers: List<ChallengeAnswerDto> = emptyList(),
    /** Null until [bothFinished] — an in-flight comparison is not shown to either side. */
    val result: HeadToHeadDto? = null,
) {
    val isDeclined: Boolean get() = status == "declined"
    val isComplete: Boolean get() = status == "complete"
    val isSent: Boolean get() = status == "sent"
    val answeredIds: Set<String> get() = myAnswers.map { it.questionId }.toSet()
}

/** A challenge in the student's own list. See `myChallenges` in `challenges.js`. */
@Serializable
data class ChallengeSummaryDto(
    val id: String,
    val opponentId: String,
    val scopeLabel: String? = null,
    val status: String,
    val questionCount: Int = 0,
    val myRole: String,
    val myFinished: Boolean = false,
    val opponentFinished: Boolean = false,
    val createdAt: String? = null,
    val result: HeadToHeadDto? = null,
)

@Serializable
data class ChallengeMutation(
    val ok: Boolean? = null,
    val reason: String? = null,
    val challenge: ChallengeDto? = null,
) {
    val succeeded: Boolean get() = ok != false
}

@Serializable
data class ChallengeListResponse(val challenges: List<ChallengeSummaryDto> = emptyList())

@Serializable
data class ChallengeResponse(val challenge: ChallengeDto)

@Serializable
data class CreateChallengeBody(val opponentId: String, val questionIds: List<String>, val scopeLabel: String)

@Serializable
data class RespondChallengeBody(val accept: Boolean)

@Serializable
data class ChallengeAnswerBody(val questionId: String, val chosenIndex: Int, val seconds: Int? = null)

@Serializable
data class ChallengeAnswerMutation(
    val ok: Boolean? = null,
    val reason: String? = null,
    val correct: Boolean? = null,
    val correctIndex: Int? = null,
) {
    val succeeded: Boolean get() = ok != false
}

// --- Friends -----------------------------------------------------------------

@Serializable
data class PersonDto(
    val userId: String,
    val displayName: String? = null,
    val universityId: String? = null,
    val year: String? = null,
)

@Serializable
data class FriendRequestsDto(
    val incoming: List<PersonDto> = emptyList(),
    val outgoing: List<PersonDto> = emptyList(),
)

@Serializable
data class FriendsResponse(
    val friends: List<PersonDto> = emptyList(),
    val requests: FriendRequestsDto = FriendRequestsDto(),
)

@Serializable
data class DirectoryResponse(val people: List<PersonDto> = emptyList())

@Serializable
data class FriendMutation(val ok: Boolean? = null, val reason: String? = null, val status: String? = null) {
    val succeeded: Boolean get() = ok != false
}

@Serializable
data class InviteResponse(val token: String? = null)

@Serializable
data class RedeemInviteMutation(val ok: Boolean? = null, val reason: String? = null, val userId: String? = null) {
    val succeeded: Boolean get() = ok != false
}

@Serializable
private data class UserIdBody(val userId: String)

@Serializable
private data class RespondFriendBody(val userId: String, val accept: Boolean)

@Serializable
private data class RedeemInviteBody(val token: String)

interface SocialApi {
    // Study Rooms
    suspend fun createRoom(body: CreateRoomBody): RoomMutation
    suspend fun joinRoom(code: String): RoomMutation
    suspend fun myRooms(): RoomListResponse
    suspend fun room(id: String): StudyRoomDto
    suspend fun startRoom(id: String): RoomMutation
    suspend fun submitRoomAnswer(id: String, body: RoomAnswerBody): RoomAnswerMutation
    suspend fun finishRoom(id: String): RoomMutation

    // Challenges
    suspend fun createChallenge(body: CreateChallengeBody): ChallengeMutation
    suspend fun myChallenges(): ChallengeListResponse
    suspend fun challenge(id: String): ChallengeDto
    suspend fun respondToChallenge(id: String, accept: Boolean): ChallengeMutation
    suspend fun submitChallengeAnswer(id: String, body: ChallengeAnswerBody): ChallengeAnswerMutation
    suspend fun finishChallenge(id: String): ChallengeMutation

    // Friends
    suspend fun friends(): FriendsResponse
    suspend fun directory(query: String): DirectoryResponse
    suspend fun sendFriendRequest(userId: String): FriendMutation
    suspend fun respondToFriendRequest(userId: String, accept: Boolean): FriendMutation
    suspend fun removeFriend(userId: String): FriendMutation
    suspend fun mintInvite(): InviteResponse
    suspend fun redeemInvite(token: String): RedeemInviteMutation
}

/**
 * The thin, stateless Retrofit-backed [SocialApi]. Mirrors [RetrofitQBankApi]/
 * [RetrofitLeaderboardApi]: the Supabase access token is read fresh per
 * request via [tokenProvider] and sent as a Bearer header, and HTTP failures
 * are mapped to [ApiException] so callers can class them: 401 → Unauthorized,
 * 403 → Forbidden, else Retryable. Refusals the server reports in-band (a 200
 * body with `ok: false`) are left untouched for the repository layer to read,
 * exactly like [RoomMutation.succeeded] expects.
 */
class RetrofitSocialApi(
    baseUrl: String,
    private val tokenProvider: suspend () -> String?,
    okHttp: OkHttpClient = OkHttpClient(),
    json: Json = Json { ignoreUnknownKeys = true },
) : SocialApi {

    /** Construct from [AppConfig] (production path). */
    constructor(config: AppConfig, tokenProvider: suspend () -> String?) : this(config.apiBase, tokenProvider)

    private val service: Service = Retrofit.Builder()
        .baseUrl(if (baseUrl.endsWith("/")) baseUrl else "$baseUrl/")
        .client(okHttp)
        .addConverterFactory(json.asConverterFactory("application/json".toMediaType()))
        .build()
        .create(Service::class.java)

    private suspend fun bearer(): String = "Bearer ${tokenProvider() ?: ""}"

    /** Run one call, translating HTTP/transport failures into [ApiException]. */
    private suspend fun <T> call(block: suspend () -> T): T = try {
        block()
    } catch (e: HttpException) {
        throw ApiException(
            when (e.code()) {
                401 -> ApiError.Unauthorized
                403 -> ApiError.Forbidden
                else -> ApiError.Retryable(e)
            }
        )
    } catch (e: IOException) {
        throw ApiException(ApiError.Retryable(e))
    }

    override suspend fun createRoom(body: CreateRoomBody): RoomMutation = call { service.createRoom(bearer(), body) }
    override suspend fun joinRoom(code: String): RoomMutation = call { service.joinRoom(bearer(), JoinRoomBody(code)) }
    override suspend fun myRooms(): RoomListResponse = call { service.myRooms(bearer()) }
    override suspend fun room(id: String): StudyRoomDto = call { service.room(bearer(), id).room }
    override suspend fun startRoom(id: String): RoomMutation = call { service.startRoom(bearer(), id) }
    override suspend fun submitRoomAnswer(id: String, body: RoomAnswerBody): RoomAnswerMutation =
        call { service.submitRoomAnswer(bearer(), id, body) }
    override suspend fun finishRoom(id: String): RoomMutation = call { service.finishRoom(bearer(), id) }

    override suspend fun createChallenge(body: CreateChallengeBody): ChallengeMutation =
        call { service.createChallenge(bearer(), body) }
    override suspend fun myChallenges(): ChallengeListResponse = call { service.myChallenges(bearer()) }
    override suspend fun challenge(id: String): ChallengeDto = call { service.challenge(bearer(), id).challenge }
    override suspend fun respondToChallenge(id: String, accept: Boolean): ChallengeMutation =
        call { service.respondToChallenge(bearer(), id, RespondChallengeBody(accept)) }
    override suspend fun submitChallengeAnswer(id: String, body: ChallengeAnswerBody): ChallengeAnswerMutation =
        call { service.submitChallengeAnswer(bearer(), id, body) }
    override suspend fun finishChallenge(id: String): ChallengeMutation = call { service.finishChallenge(bearer(), id) }

    override suspend fun friends(): FriendsResponse = call { service.friends(bearer()) }
    override suspend fun directory(query: String): DirectoryResponse = call { service.directory(bearer(), query) }
    override suspend fun sendFriendRequest(userId: String): FriendMutation =
        call { service.sendFriendRequest(bearer(), UserIdBody(userId)) }
    override suspend fun respondToFriendRequest(userId: String, accept: Boolean): FriendMutation =
        call { service.respondToFriendRequest(bearer(), RespondFriendBody(userId, accept)) }
    override suspend fun removeFriend(userId: String): FriendMutation =
        call { service.removeFriend(bearer(), UserIdBody(userId)) }
    override suspend fun mintInvite(): InviteResponse = call { service.mintInvite(bearer()) }
    override suspend fun redeemInvite(token: String): RedeemInviteMutation =
        call { service.redeemInvite(bearer(), RedeemInviteBody(token)) }

    private interface Service {
        @POST("study-rooms")
        suspend fun createRoom(@Header("Authorization") auth: String, @Body body: CreateRoomBody): RoomMutation

        @POST("study-rooms/join")
        suspend fun joinRoom(@Header("Authorization") auth: String, @Body body: JoinRoomBody): RoomMutation

        @GET("study-rooms/mine")
        suspend fun myRooms(@Header("Authorization") auth: String): RoomListResponse

        @GET("study-rooms/{id}")
        suspend fun room(@Header("Authorization") auth: String, @Path("id") id: String): RoomResponse

        @POST("study-rooms/{id}/start")
        suspend fun startRoom(@Header("Authorization") auth: String, @Path("id") id: String): RoomMutation

        @POST("study-rooms/{id}/answers")
        suspend fun submitRoomAnswer(
            @Header("Authorization") auth: String,
            @Path("id") id: String,
            @Body body: RoomAnswerBody,
        ): RoomAnswerMutation

        @POST("study-rooms/{id}/finish")
        suspend fun finishRoom(@Header("Authorization") auth: String, @Path("id") id: String): RoomMutation

        @POST("challenges")
        suspend fun createChallenge(@Header("Authorization") auth: String, @Body body: CreateChallengeBody): ChallengeMutation

        @GET("challenges/mine")
        suspend fun myChallenges(@Header("Authorization") auth: String): ChallengeListResponse

        @GET("challenges/{id}")
        suspend fun challenge(@Header("Authorization") auth: String, @Path("id") id: String): ChallengeResponse

        @POST("challenges/{id}/respond")
        suspend fun respondToChallenge(
            @Header("Authorization") auth: String,
            @Path("id") id: String,
            @Body body: RespondChallengeBody,
        ): ChallengeMutation

        @POST("challenges/{id}/answers")
        suspend fun submitChallengeAnswer(
            @Header("Authorization") auth: String,
            @Path("id") id: String,
            @Body body: ChallengeAnswerBody,
        ): ChallengeAnswerMutation

        @POST("challenges/{id}/finish")
        suspend fun finishChallenge(@Header("Authorization") auth: String, @Path("id") id: String): ChallengeMutation

        @GET("friends")
        suspend fun friends(@Header("Authorization") auth: String): FriendsResponse

        @GET("friends/directory")
        suspend fun directory(@Header("Authorization") auth: String, @Query("q") query: String): DirectoryResponse

        @POST("friends/request")
        suspend fun sendFriendRequest(@Header("Authorization") auth: String, @Body body: UserIdBody): FriendMutation

        @POST("friends/respond")
        suspend fun respondToFriendRequest(@Header("Authorization") auth: String, @Body body: RespondFriendBody): FriendMutation

        @POST("friends/remove")
        suspend fun removeFriend(@Header("Authorization") auth: String, @Body body: UserIdBody): FriendMutation

        @POST("friends/invite")
        suspend fun mintInvite(@Header("Authorization") auth: String): InviteResponse

        @POST("friends/invite/redeem")
        suspend fun redeemInvite(@Header("Authorization") auth: String, @Body body: RedeemInviteBody): RedeemInviteMutation
    }
}

/**
 * Self-contained DI for [SocialApi] — this feature's own module rather than
 * an addition to `di/AppModule.kt`, so this task's wiring never conflicts
 * with whatever else is landing on `AppModule.kt` concurrently.
 */
@Module
@InstallIn(SingletonComponent::class)
object SocialApiModule {
    @Provides
    @Singleton
    fun provideSocialApi(config: AppConfig, authBackend: AuthBackend): SocialApi =
        RetrofitSocialApi(config, authBackend::accessToken)
}
