package com.synapse.app.core.api

import com.synapse.app.core.auth.AuthBackend
import com.synapse.app.core.config.AppConfig
import dagger.Module
import dagger.Provides
import dagger.hilt.InstallIn
import dagger.hilt.components.SingletonComponent
import kotlinx.serialization.Serializable
import kotlinx.serialization.json.Json
import kotlinx.serialization.json.JsonObject
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
import java.io.IOException
import javax.inject.Singleton

/*
 * Parties — synced group study-game sessions. Mirrors the shapes
 * `server/src/parties.js` and `server/src/partyGames.js` actually return
 * (see the `POST`/`GET /api/parties` and `/api/party-sessions` routes in
 * `server/src/index.js`, ~788-864). Every mutating call answers with a
 * `{ ok, reason }` body rather than an HTTP error code, exactly like
 * [RoomMutation] and friends in [SocialApi] — a 200 is never enough on its
 * own to mean "it worked".
 *
 * The party-game action set below (reconnect / leave / start / submit_answer
 * / next_round / end) matches the *deployed* state machine in
 * `partyGames.js`'s `applyActionToPartyGame`, not the richer pure reference
 * module `partyGameSync.ts` ported verbatim in `core/party/PartyGameSync.kt`.
 * The deployed machine seeds every current party member into a game's
 * participants at creation time, so there is no wire-level `join` action —
 * see that file's class doc for the full story.
 *
 * The live event stream (`GET /api/parties/:id/games/:gameId/events`, an SSE
 * endpoint) is intentionally not wired here: this product's polling mandate
 * is 4s HTTP GETs, never websockets/SSE. `feature/party/PartyGamesRepository`
 * polls the plain `GET .../games/:gameId` state endpoint instead — a strictly
 * simpler transport for the same server-authoritative state, at the cost of
 * only round-trip latency (never correctness, since the poll always re-reads
 * the full public state rather than trusting a diff).
 */

// --- Parties -----------------------------------------------------------------

@Serializable
data class PartyMemberDto(
    val userId: String,
    val displayName: String? = null,
    val role: String,
    val joinedAt: String? = null,
)

/** A party as one member sees it. See `partyFor` in `parties.js`. */
@Serializable
data class PartyDto(
    val id: String,
    val code: String,
    val name: String,
    val hostUserId: String? = null,
    val isHost: Boolean = false,
    val universityId: String? = null,
    val year: String? = null,
    /** `open` (findable by your year) or `invite` (link only). */
    val visibility: String,
    val createdAt: String? = null,
    val archivedAt: String? = null,
    val members: List<PartyMemberDto> = emptyList(),
)

/** A party in the student's own list. See `myParties` in `parties.js`. */
@Serializable
data class PartySummaryDto(
    val id: String,
    val code: String,
    val name: String,
    val isHost: Boolean = false,
    val visibility: String,
    val createdAt: String? = null,
    val archivedAt: String? = null,
    val members: Int = 0,
)

/** A party found while browsing. See `openParties` in `parties.js` — a narrower shape than [PartyDto]. */
@Serializable
data class OpenPartyDto(
    val id: String,
    val code: String,
    val name: String,
    val hostUserId: String? = null,
    val createdAt: String? = null,
    val members: Int = 0,
)

@Serializable
data class PartyMutation(
    val ok: Boolean? = null,
    val reason: String? = null,
    val party: PartyDto? = null,
) {
    val succeeded: Boolean get() = ok != false
}

@Serializable
data class LeaveMutation(val ok: Boolean? = null, val reason: String? = null) {
    val succeeded: Boolean get() = ok != false
}

@Serializable
data class PartyListResponse(val parties: List<PartySummaryDto> = emptyList())

@Serializable
data class OpenPartyListResponse(val parties: List<OpenPartyDto> = emptyList())

@Serializable
data class PartyResponse(val party: PartyDto)

@Serializable
data class CreatePartyBody(val name: String)

@Serializable
data class JoinPartyBody(val code: String)

@Serializable
data class VisibilityBody(val visibility: String)

// --- Party sessions (frozen questions/practicals/essays, worked through together) -------------

@Serializable
data class PartySessionItemRefDto(val kind: String, val id: String)

@Serializable
data class PartyAnswerRefDto(
    val kind: String,
    val id: String,
    /** Null for a self-checked (practical/essay) item — see `answerItem` in `parties.js`. */
    val correct: Boolean? = null,
    val seconds: Int? = null,
)

@Serializable
data class PartyMarkedDto(val correct: Int, val of: Int)

/** See `tally` in `partyRules.js` — marked and self-checked are reported apart, never averaged. */
@Serializable
data class PartyTallyDto(val marked: PartyMarkedDto? = null, val practised: Int = 0)

@Serializable
data class PartySessionMemberDto(
    val userId: String,
    val displayName: String? = null,
    val tally: PartyTallyDto = PartyTallyDto(),
)

/** A session in the party's list. See `sessionsFor` in `parties.js`. */
@Serializable
data class PartySessionSummaryDto(
    val id: String,
    val name: String,
    val itemCount: Int = 0,
    val startsAt: String? = null,
    val closedAt: String? = null,
    val createdBy: String? = null,
    val isMine: Boolean = false,
    val createdAt: String? = null,
    /** `scheduled`, `open`, or `closed` — see `sessionState` in `partyRules.js`. */
    val state: String,
)

/** A session as one member sees it. See `sessionFor` in `parties.js`. */
@Serializable
data class PartySessionDto(
    val id: String,
    val partyId: String,
    val name: String,
    val itemRefs: List<PartySessionItemRefDto> = emptyList(),
    val itemCount: Int = 0,
    val startsAt: String? = null,
    val closedAt: String? = null,
    val createdBy: String? = null,
    val isMine: Boolean = false,
    val createdAt: String? = null,
    val state: String,
    val myAnswers: List<PartyAnswerRefDto> = emptyList(),
    val members: List<PartySessionMemberDto> = emptyList(),
) {
    val isClosed: Boolean get() = state == "closed"
    val answeredKeys: Set<String> get() = myAnswers.map { "${it.kind}:${it.id}" }.toSet()
}

@Serializable
data class SessionMutation(
    val ok: Boolean? = null,
    val reason: String? = null,
    val session: PartySessionDto? = null,
) {
    val succeeded: Boolean get() = ok != false
}

@Serializable
data class SessionListResponse(val sessions: List<PartySessionSummaryDto> = emptyList())

@Serializable
data class SessionResponse(val session: PartySessionDto)

@Serializable
data class CreateSessionBody(val name: String, val items: List<PartySessionItemRefDto>, val startsAt: String? = null)

@Serializable
data class PartyAnswerBody(val kind: String, val id: String, val chosenIndex: Int? = null, val seconds: Int? = null)

/** What `POST /party-sessions/:id/answers` answers with — graded server-side for `kind: "question"`. */
@Serializable
data class PartyAnswerMutation(
    val ok: Boolean? = null,
    val reason: String? = null,
    val correct: Boolean? = null,
    val correctIndex: Int? = null,
) {
    val succeeded: Boolean get() = ok != false
}

// --- Party games (synced round-based minigames; server-authoritative content and scoring) -----

@Serializable
data class PartyGameParticipantDto(
    val id: String,
    val username: String,
    val profileIcon: String? = null,
    val connected: Boolean = false,
    val joinedAt: String? = null,
    val lastSeenAt: String? = null,
)

@Serializable
data class PartyGameChoiceDto(val id: String, val label: String, val lang: String? = null, val dir: String? = null)

@Serializable
data class PartyGameSourceDto(val kind: String, val id: String, val label: String)

/** Never carries `answerKey` — the server redacts it before this ever reaches a client. */
@Serializable
data class PublicPartyGameRoundDto(
    val id: String,
    val index: Int,
    val prompt: String,
    val choices: List<PartyGameChoiceDto> = emptyList(),
    val maxPoints: Int,
    /** `choice`, `normalized_text`, or `ordered_exact_positions`. */
    val scoring: String,
    val payload: JsonObject? = null,
)

/** The redacted, server-authoritative game state a client polls. See `publicStateOf` in `partyGames.js`. */
@Serializable
data class PartyGamePublicStateDto(
    val id: String,
    val partyId: String,
    val hostId: String,
    /** One of `term-grid`, `spotter`, `term-match`, `clinical-sequence`, `mechanism-chain`, `red-flag-sort`. */
    val kind: String,
    /** `lobby`, `in_round`, `between_rounds`, or `completed`. */
    val status: String,
    val title: String,
    val source: PartyGameSourceDto,
    val participants: Map<String, PartyGameParticipantDto> = emptyMap(),
    val currentRoundIndex: Int = 0,
    val roundCount: Int = 0,
    val currentRound: PublicPartyGameRoundDto? = null,
    val answeredParticipantIds: List<String> = emptyList(),
    val scores: Map<String, Int> = emptyMap(),
    val version: Int = 0,
    val updatedAt: String? = null,
    val completedAt: String? = null,
) {
    val isCompleted: Boolean get() = status == "completed"
}

/** A game in the party's list. See `partyGamesFor` in `partyGames.js`. */
@Serializable
data class PartyGameSummaryDto(
    val id: String,
    val partyId: String,
    val hostId: String,
    val kind: String,
    val title: String,
    val status: String,
    val currentRoundIndex: Int = 0,
    val version: Int = 0,
    val updatedAt: String? = null,
    val completedAt: String? = null,
)

@Serializable
data class GameMutation(
    val ok: Boolean? = null,
    val reason: String? = null,
    val game: PartyGamePublicStateDto? = null,
) {
    val succeeded: Boolean get() = ok != false
}

@Serializable
data class GameListResponse(val games: List<PartyGameSummaryDto> = emptyList())

@Serializable
data class GameResponse(val game: PartyGamePublicStateDto)

/**
 * What creates a game — a *kind* and a *seed*, never content: the server
 * builds the round content itself from published/authored material (see
 * `contentFromTrustedSource` in `partyGames.js`) and refuses a request that
 * tries to carry `content`/`answerKey` of its own.
 */
@Serializable
data class CreateGameBody(val kind: String, val seed: Long? = null)

@Serializable
data class PartyGameActionBody(val action: JsonObject)

@Serializable
data class PartyGameActionMutation(
    val ok: Boolean? = null,
    val reason: String? = null,
    val state: PartyGamePublicStateDto? = null,
) {
    val succeeded: Boolean get() = ok != false
}

interface PartyApi {
    // Parties
    suspend fun createParty(name: String): PartyMutation
    suspend fun joinParty(code: String): PartyMutation
    suspend fun myParties(): PartyListResponse
    suspend fun openParties(): OpenPartyListResponse
    suspend fun party(id: String): PartyDto
    suspend fun setVisibility(id: String, visibility: String): PartyMutation
    suspend fun leaveParty(id: String): LeaveMutation

    // Party sessions
    suspend fun createSession(partyId: String, body: CreateSessionBody): SessionMutation
    suspend fun sessions(partyId: String): SessionListResponse
    suspend fun session(sessionId: String): PartySessionDto
    suspend fun answer(sessionId: String, body: PartyAnswerBody): PartyAnswerMutation
    suspend fun closeSession(sessionId: String): SessionMutation

    // Party games
    suspend fun createGame(partyId: String, body: CreateGameBody): GameMutation
    suspend fun games(partyId: String): GameListResponse
    suspend fun game(partyId: String, gameId: String): PartyGamePublicStateDto
    suspend fun act(partyId: String, gameId: String, action: JsonObject): PartyGameActionMutation
}

/**
 * The thin, stateless Retrofit-backed [PartyApi]. Mirrors [RetrofitSocialApi]/
 * [RetrofitQBankApi]: the Supabase access token is read fresh per request via
 * [tokenProvider] and sent as a Bearer header, and HTTP failures are mapped to
 * [ApiException] so callers can class them: 401 → Unauthorized, 403 →
 * Forbidden, else Retryable (which includes a 404 "not found" — a party,
 * session, or game a caller isn't a member of answers the same way as one
 * that doesn't exist at all, so callers class that by inspecting the wrapped
 * [HttpException] the way [com.synapse.app.feature.social.StudyRoomsRepository]
 * already does for rooms).
 */
class RetrofitPartyApi(
    baseUrl: String,
    private val tokenProvider: suspend () -> String?,
    okHttp: OkHttpClient = OkHttpClient(),
    json: Json = Json { ignoreUnknownKeys = true },
) : PartyApi {

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

    override suspend fun createParty(name: String): PartyMutation = call { service.createParty(bearer(), CreatePartyBody(name)) }
    override suspend fun joinParty(code: String): PartyMutation = call { service.joinParty(bearer(), JoinPartyBody(code)) }
    override suspend fun myParties(): PartyListResponse = call { service.myParties(bearer()) }
    override suspend fun openParties(): OpenPartyListResponse = call { service.openParties(bearer()) }
    override suspend fun party(id: String): PartyDto = call { service.party(bearer(), id).party }
    override suspend fun setVisibility(id: String, visibility: String): PartyMutation =
        call { service.setVisibility(bearer(), id, VisibilityBody(visibility)) }
    override suspend fun leaveParty(id: String): LeaveMutation = call { service.leaveParty(bearer(), id) }

    override suspend fun createSession(partyId: String, body: CreateSessionBody): SessionMutation =
        call { service.createSession(bearer(), partyId, body) }
    override suspend fun sessions(partyId: String): SessionListResponse = call { service.sessions(bearer(), partyId) }
    override suspend fun session(sessionId: String): PartySessionDto = call { service.session(bearer(), sessionId).session }
    override suspend fun answer(sessionId: String, body: PartyAnswerBody): PartyAnswerMutation =
        call { service.answer(bearer(), sessionId, body) }
    override suspend fun closeSession(sessionId: String): SessionMutation = call { service.closeSession(bearer(), sessionId) }

    override suspend fun createGame(partyId: String, body: CreateGameBody): GameMutation =
        call { service.createGame(bearer(), partyId, body) }
    override suspend fun games(partyId: String): GameListResponse = call { service.games(bearer(), partyId) }
    override suspend fun game(partyId: String, gameId: String): PartyGamePublicStateDto =
        call { service.game(bearer(), partyId, gameId).game }
    override suspend fun act(partyId: String, gameId: String, action: JsonObject): PartyGameActionMutation =
        call { service.act(bearer(), partyId, gameId, PartyGameActionBody(action)) }

    private interface Service {
        @POST("parties")
        suspend fun createParty(@Header("Authorization") auth: String, @Body body: CreatePartyBody): PartyMutation

        @POST("parties/join")
        suspend fun joinParty(@Header("Authorization") auth: String, @Body body: JoinPartyBody): PartyMutation

        @GET("parties/mine")
        suspend fun myParties(@Header("Authorization") auth: String): PartyListResponse

        @GET("parties/open")
        suspend fun openParties(@Header("Authorization") auth: String): OpenPartyListResponse

        @GET("parties/{id}")
        suspend fun party(@Header("Authorization") auth: String, @Path("id") id: String): PartyResponse

        @POST("parties/{id}/visibility")
        suspend fun setVisibility(
            @Header("Authorization") auth: String,
            @Path("id") id: String,
            @Body body: VisibilityBody,
        ): PartyMutation

        @POST("parties/{id}/leave")
        suspend fun leaveParty(@Header("Authorization") auth: String, @Path("id") id: String): LeaveMutation

        @POST("parties/{id}/sessions")
        suspend fun createSession(
            @Header("Authorization") auth: String,
            @Path("id") partyId: String,
            @Body body: CreateSessionBody,
        ): SessionMutation

        @GET("parties/{id}/sessions")
        suspend fun sessions(@Header("Authorization") auth: String, @Path("id") partyId: String): SessionListResponse

        @GET("party-sessions/{sessionId}")
        suspend fun session(@Header("Authorization") auth: String, @Path("sessionId") sessionId: String): SessionResponse

        @POST("party-sessions/{sessionId}/answers")
        suspend fun answer(
            @Header("Authorization") auth: String,
            @Path("sessionId") sessionId: String,
            @Body body: PartyAnswerBody,
        ): PartyAnswerMutation

        @POST("party-sessions/{sessionId}/close")
        suspend fun closeSession(@Header("Authorization") auth: String, @Path("sessionId") sessionId: String): SessionMutation

        @POST("parties/{id}/games")
        suspend fun createGame(
            @Header("Authorization") auth: String,
            @Path("id") partyId: String,
            @Body body: CreateGameBody,
        ): GameMutation

        @GET("parties/{id}/games")
        suspend fun games(@Header("Authorization") auth: String, @Path("id") partyId: String): GameListResponse

        @GET("parties/{id}/games/{gameId}")
        suspend fun game(
            @Header("Authorization") auth: String,
            @Path("id") partyId: String,
            @Path("gameId") gameId: String,
        ): GameResponse

        @POST("parties/{id}/games/{gameId}/actions")
        suspend fun act(
            @Header("Authorization") auth: String,
            @Path("id") partyId: String,
            @Path("gameId") gameId: String,
            @Body body: PartyGameActionBody,
        ): PartyGameActionMutation
    }
}

/**
 * Self-contained DI for [PartyApi] — this feature's own module rather than an
 * addition to `di/AppModule.kt`, so this task's wiring never conflicts with
 * whatever else is landing on `AppModule.kt` concurrently.
 */
@Module
@InstallIn(SingletonComponent::class)
object PartyApiModule {
    @Provides
    @Singleton
    fun providePartyApi(config: AppConfig, authBackend: AuthBackend): PartyApi =
        RetrofitPartyApi(config, authBackend::accessToken)
}
