package com.synapse.app.feature.party

import com.synapse.app.core.api.ApiError
import com.synapse.app.core.api.ApiException
import com.synapse.app.core.api.CreateGameBody
import com.synapse.app.core.api.GameMutation
import com.synapse.app.core.api.PartyApi
import com.synapse.app.core.api.PartyGameActionMutation
import com.synapse.app.core.api.PartyGamePublicStateDto
import com.synapse.app.core.api.PartyGameSummaryDto
import kotlinx.coroutines.CancellationException
import kotlinx.coroutines.delay
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.flow
import kotlinx.serialization.json.JsonArray
import kotlinx.serialization.json.JsonElement
import kotlinx.serialization.json.JsonObject
import kotlinx.serialization.json.JsonPrimitive
import kotlinx.serialization.json.buildJsonObject
import kotlinx.serialization.json.put
import retrofit2.HttpException
import javax.inject.Inject

/** One tick of [PartyGamesRepository.pollGame]. */
sealed interface GamePoll {
    data class Loaded(val game: PartyGamePublicStateDto) : GamePoll
    /** The game no longer exists, or this student is not a member of its party. */
    data object Gone : GamePoll
    data object Unavailable : GamePoll
}

/** One round's answer, in the shape `submit_answer` expects — see `scoreAnswer` in `partyGames.js`. */
sealed interface PartyGameAnswer {
    data class Text(val value: String) : PartyGameAnswer
    data class Ordered(val value: List<String>) : PartyGameAnswer
}

private fun PartyGameAnswer.toJson(): JsonElement = when (this) {
    is PartyGameAnswer.Text -> JsonPrimitive(value)
    is PartyGameAnswer.Ordered -> JsonArray(value.map { JsonPrimitive(it) })
}

/**
 * A party game's data layer: creating one (host only — kind + seed, never
 * content, since the server builds rounds itself), listing a party's games,
 * watching one while it is being played, and dispatching actions on it.
 *
 * The action set mirrors the *deployed* `applyActionToPartyGame` state
 * machine in `server/src/partyGames.js` — reconnect / leave / start /
 * submit_answer / next_round / end — not the richer pure reference module
 * ported verbatim in `core/party/PartyGameSync.kt`; see that file's class doc
 * for why there is no `join` action here (every party member is already a
 * game participant at creation time).
 */
class PartyGamesRepository @Inject constructor(
    private val api: PartyApi,
) {

    suspend fun gamesFor(partyId: String): List<PartyGameSummaryDto> = try {
        api.games(partyId).games
    } catch (e: CancellationException) {
        throw e
    } catch (e: Exception) {
        emptyList()
    }

    /** `kind` is one of `term-grid`, `spotter`, `term-match`, `clinical-sequence`, `mechanism-chain`, `red-flag-sort`. */
    suspend fun create(partyId: String, kind: String, seed: Long): GameMutation =
        api.createGame(partyId, CreateGameBody(kind, seed))

    suspend fun start(partyId: String, gameId: String): PartyGameActionMutation =
        act(partyId, gameId, buildJsonObject { put("type", "start") })

    suspend fun reconnect(partyId: String, gameId: String): PartyGameActionMutation =
        act(partyId, gameId, buildJsonObject { put("type", "reconnect") })

    suspend fun leave(partyId: String, gameId: String): PartyGameActionMutation =
        act(partyId, gameId, buildJsonObject { put("type", "leave") })

    suspend fun submitAnswer(partyId: String, gameId: String, roundId: String, answer: PartyGameAnswer): PartyGameActionMutation =
        act(
            partyId, gameId,
            buildJsonObject {
                put("type", "submit_answer")
                put("roundId", roundId)
                put("answer", answer.toJson())
            },
        )

    suspend fun nextRound(partyId: String, gameId: String): PartyGameActionMutation =
        act(partyId, gameId, buildJsonObject { put("type", "next_round") })

    suspend fun end(partyId: String, gameId: String): PartyGameActionMutation =
        act(partyId, gameId, buildJsonObject { put("type", "end") })

    private suspend fun act(partyId: String, gameId: String, action: JsonObject): PartyGameActionMutation =
        api.act(partyId, gameId, action)

    fun pollGame(partyId: String, gameId: String): Flow<GamePoll> = flow {
        while (true) {
            val tick = fetchGame(partyId, gameId)
            emit(tick)
            when (tick) {
                is GamePoll.Loaded -> if (tick.game.isCompleted) break
                GamePoll.Gone -> break
                GamePoll.Unavailable -> {}
            }
            delay(PARTY_POLL_INTERVAL)
        }
    }

    internal suspend fun fetchGame(partyId: String, gameId: String): GamePoll = try {
        GamePoll.Loaded(api.game(partyId, gameId))
    } catch (e: CancellationException) {
        throw e
    } catch (e: ApiException) {
        if ((e.error as? ApiError.Retryable)?.cause.let { it is HttpException && it.code() == 404 }) {
            GamePoll.Gone
        } else {
            GamePoll.Unavailable
        }
    } catch (e: Exception) {
        GamePoll.Unavailable
    }
}
