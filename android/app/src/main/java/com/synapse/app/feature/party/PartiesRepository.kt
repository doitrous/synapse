package com.synapse.app.feature.party

import com.synapse.app.core.api.ApiError
import com.synapse.app.core.api.ApiException
import com.synapse.app.core.api.LeaveMutation
import com.synapse.app.core.api.OpenPartyDto
import com.synapse.app.core.api.PartyApi
import com.synapse.app.core.api.PartyDto
import com.synapse.app.core.api.PartyMutation
import com.synapse.app.core.api.PartySummaryDto
import kotlinx.coroutines.CancellationException
import kotlinx.coroutines.delay
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.flow
import retrofit2.HttpException
import javax.inject.Inject
import kotlin.time.Duration.Companion.seconds

/**
 * How often an open party is re-read while its lobby is on screen. Matches
 * [com.synapse.app.feature.social.ROOM_POLL_INTERVAL]: 4s HTTP polling, no
 * websockets anywhere in this product.
 */
internal val PARTY_POLL_INTERVAL = 4.seconds

/** What listing this student's parties came to. Offline is a normal outcome, never a crash. */
sealed interface PartiesOutcome {
    data class Loaded(val parties: List<PartySummaryDto>) : PartiesOutcome
    data object Unavailable : PartiesOutcome
}

sealed interface OpenPartiesOutcome {
    data class Loaded(val parties: List<OpenPartyDto>) : OpenPartiesOutcome
    data object Unavailable : OpenPartiesOutcome
}

/** One tick of [PartiesRepository.pollParty]. */
sealed interface PartyPoll {
    data class Loaded(val party: PartyDto) : PartyPoll
    /** The party no longer exists, or this student is no longer a member (server answers 404 either way). */
    data object Gone : PartyPoll
    /** A transient failure — offline, timeout. The last known [Loaded] party should stay on screen. */
    data object Unavailable : PartyPoll
}

/**
 * The Parties data layer: creating/joining, listing mine/open, and watching
 * one party's lobby. [pollParty] is the one live view this feature exposes as
 * a [Flow] — it re-fetches the party every [PARTY_POLL_INTERVAL] while
 * collected, mirroring [com.synapse.app.feature.social.StudyRoomsRepository.pollRoom].
 *
 * A party has no terminal state of its own (no archive/close endpoint is
 * wired — see `leaveParty`'s note in `parties.js`), so unlike a study room's
 * poll this one only ever stops on [PartyPoll.Gone] or collector
 * cancellation; a ViewModel's `close()` cancelling the collecting job is what
 * actually stops the network calls once nobody is watching the lobby.
 */
class PartiesRepository @Inject constructor(
    private val api: PartyApi,
) {

    suspend fun myParties(): PartiesOutcome = try {
        PartiesOutcome.Loaded(api.myParties().parties)
    } catch (e: CancellationException) {
        throw e
    } catch (e: Exception) {
        PartiesOutcome.Unavailable
    }

    suspend fun openParties(): OpenPartiesOutcome = try {
        OpenPartiesOutcome.Loaded(api.openParties().parties)
    } catch (e: CancellationException) {
        throw e
    } catch (e: Exception) {
        OpenPartiesOutcome.Unavailable
    }

    suspend fun create(name: String): PartyMutation = api.createParty(name)

    suspend fun join(code: String): PartyMutation = api.joinParty(code)

    suspend fun setVisibility(id: String, open: Boolean): PartyMutation =
        api.setVisibility(id, if (open) "open" else "invite")

    suspend fun leave(id: String): LeaveMutation = api.leaveParty(id)

    /**
     * Watch one party's lobby while it matters. Collect this from a
     * lifecycle-scoped coroutine (a ViewModel's `viewModelScope`) —
     * cancelling the collector is what stops the polling.
     */
    fun pollParty(id: String): Flow<PartyPoll> = flow {
        while (true) {
            val tick = fetchParty(id)
            emit(tick)
            if (tick is PartyPoll.Gone) break
            delay(PARTY_POLL_INTERVAL)
        }
    }

    /**
     * One immediate read, outside the poll cadence — for a ViewModel to call
     * right after a mutation it made itself, so that action reflects on
     * screen at once instead of waiting for the next tick.
     */
    internal suspend fun fetchParty(id: String): PartyPoll = try {
        PartyPoll.Loaded(api.party(id))
    } catch (e: CancellationException) {
        throw e
    } catch (e: ApiException) {
        if ((e.error as? ApiError.Retryable)?.cause.let { it is HttpException && it.code() == 404 }) {
            PartyPoll.Gone
        } else {
            PartyPoll.Unavailable
        }
    } catch (e: Exception) {
        PartyPoll.Unavailable
    }
}
