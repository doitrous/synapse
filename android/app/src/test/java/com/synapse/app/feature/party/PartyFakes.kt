package com.synapse.app.feature.party

import com.synapse.app.core.api.ApiError
import com.synapse.app.core.api.ApiException
import com.synapse.app.core.api.CreateGameBody
import com.synapse.app.core.api.CreateSessionBody
import com.synapse.app.core.api.GameListResponse
import com.synapse.app.core.api.GameMutation
import com.synapse.app.core.api.GameResponse
import com.synapse.app.core.api.LeaveMutation
import com.synapse.app.core.api.OpenPartyListResponse
import com.synapse.app.core.api.PartyAnswerBody
import com.synapse.app.core.api.PartyAnswerMutation
import com.synapse.app.core.api.PartyApi
import com.synapse.app.core.api.PartyDto
import com.synapse.app.core.api.PartyGameActionMutation
import com.synapse.app.core.api.PartyGamePublicStateDto
import com.synapse.app.core.api.PartyGameSourceDto
import com.synapse.app.core.api.PartyListResponse
import com.synapse.app.core.api.PartyMutation
import com.synapse.app.core.api.PartySessionDto
import com.synapse.app.core.api.PartySessionSummaryDto
import com.synapse.app.core.api.SessionMutation
import kotlinx.serialization.json.JsonObject
import retrofit2.HttpException
import retrofit2.Response
import okhttp3.ResponseBody.Companion.toResponseBody

/** An [ApiException] wrapping a 404, exactly what the server answers for a party/session/game a caller isn't a member of. */
internal fun notFoundApiException(): ApiException {
    val response = Response.error<Any>(404, "{}".toResponseBody(null))
    return ApiException(ApiError.Retryable(HttpException(response)))
}

internal fun fixtureParty(visibility: String = "invite") = PartyDto(
    id = "p1", code = "ABC123", name = "Test party", hostUserId = "host-1", isHost = true, visibility = visibility,
)

internal fun fixtureSession(state: String = "open") = PartySessionDto(
    id = "s1", partyId = "p1", name = "Test session", state = state,
)

internal fun fixtureGameState(status: String = "in_round") = PartyGamePublicStateDto(
    id = "g1", partyId = "p1", hostId = "host-1", kind = "term-match", status = status,
    title = "Test game", source = PartyGameSourceDto("published", "src", "Published glossary"),
)

/** A hand-rolled [PartyApi] test double — only the members these tests actually exercise are wired to fail/record. */
internal class FakePartyApi : PartyApi {
    var partiesFailure: Throwable? = null
    var partiesList: List<com.synapse.app.core.api.PartySummaryDto> = emptyList()
    var openPartiesList: List<com.synapse.app.core.api.OpenPartyDto> = emptyList()

    var singleParty: (() -> PartyDto)? = null
    var partyCallCount = 0

    var singleSession: (() -> PartySessionDto)? = null
    var sessionCallCount = 0

    var singleGame: (() -> PartyGamePublicStateDto)? = null
    var gameCallCount = 0
    var lastAction: JsonObject? = null

    override suspend fun createParty(name: String): PartyMutation = PartyMutation(ok = true, party = fixtureParty())
    override suspend fun joinParty(code: String): PartyMutation = PartyMutation(ok = true, party = fixtureParty())
    override suspend fun myParties(): PartyListResponse {
        partiesFailure?.let { throw it }
        return PartyListResponse(partiesList)
    }
    override suspend fun openParties(): OpenPartyListResponse {
        partiesFailure?.let { throw it }
        return OpenPartyListResponse(openPartiesList)
    }
    override suspend fun party(id: String): PartyDto {
        partyCallCount++
        return singleParty?.invoke() ?: error("no party configured")
    }
    override suspend fun setVisibility(id: String, visibility: String): PartyMutation = PartyMutation(ok = true, party = fixtureParty(visibility))
    override suspend fun leaveParty(id: String): LeaveMutation = LeaveMutation(ok = true)

    override suspend fun createSession(partyId: String, body: CreateSessionBody): SessionMutation = SessionMutation(ok = true, session = fixtureSession())
    override suspend fun sessions(partyId: String): com.synapse.app.core.api.SessionListResponse =
        com.synapse.app.core.api.SessionListResponse(emptyList<PartySessionSummaryDto>())
    override suspend fun session(sessionId: String): PartySessionDto {
        sessionCallCount++
        return singleSession?.invoke() ?: error("no session configured")
    }
    override suspend fun answer(sessionId: String, body: PartyAnswerBody): PartyAnswerMutation = PartyAnswerMutation(ok = true, correct = true, correctIndex = 0)
    override suspend fun closeSession(sessionId: String): SessionMutation = SessionMutation(ok = true, session = fixtureSession(state = "closed"))

    override suspend fun createGame(partyId: String, body: CreateGameBody): GameMutation = GameMutation(ok = true, game = fixtureGameState())
    override suspend fun games(partyId: String): GameListResponse = GameListResponse(emptyList())
    override suspend fun game(partyId: String, gameId: String): PartyGamePublicStateDto {
        gameCallCount++
        return singleGame?.invoke() ?: error("no game configured")
    }
    override suspend fun act(partyId: String, gameId: String, action: JsonObject): PartyGameActionMutation {
        lastAction = action
        return PartyGameActionMutation(ok = true, state = singleGame?.invoke() ?: fixtureGameState())
    }
}
