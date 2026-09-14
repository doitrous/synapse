package com.synapse.app.feature.social

import com.synapse.app.core.api.ApiError
import com.synapse.app.core.api.ApiException
import com.synapse.app.core.api.CreateRoomBody
import com.synapse.app.core.api.RoomAnswerBody
import com.synapse.app.core.api.RoomAnswerMutation
import com.synapse.app.core.api.RoomListResponse
import com.synapse.app.core.api.RoomMutation
import com.synapse.app.core.api.RoomSummaryDto
import com.synapse.app.core.api.SocialApi
import com.synapse.app.core.api.StudyRoomDto
import com.synapse.app.core.qbank.Question
import com.synapse.app.feature.qbank.QBankRepository
import kotlinx.coroutines.CancellationException
import kotlinx.coroutines.delay
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.flow
import retrofit2.HttpException
import javax.inject.Inject
import kotlin.time.Duration.Companion.seconds

/** How often an open room is re-read while being watched. Matches iOS `StudyRoomModel` and the web `useRoom` hook — there are no websockets anywhere in this product. */
internal val ROOM_POLL_INTERVAL = 4.seconds

/** What listing this student's rooms came to. Offline is a normal outcome, never a crash. */
sealed interface RoomsOutcome {
    data class Loaded(val rooms: List<RoomSummaryDto>) : RoomsOutcome
    data object Unavailable : RoomsOutcome
}

/** One tick of [StudyRoomsRepository.pollRoom]. */
sealed interface RoomPoll {
    data class Loaded(val room: StudyRoomDto) : RoomPoll
    /** The room no longer exists, or this student is no longer in it (server answers 404 either way). */
    data object Gone : RoomPoll
    /** A transient failure — offline, timeout. The last known [Loaded] room should stay on screen. */
    data object Unavailable : RoomPoll
}

/**
 * The Study Rooms data layer. [pollRoom] is the one live view this feature
 * exposes as a [Flow]: it re-fetches the room every [ROOM_POLL_INTERVAL]
 * while collected, mirroring iOS `StudyRoomModel.startPolling` and the web
 * `useRoom` hook, and stops fetching once the room closes — nothing further
 * can change once the last person still working has handed it in.
 *
 * The server sends only question ids; the text is content this device
 * already syncs for the Question Bank, so [questionsFor] resolves them via
 * [QBankRepository.publishedQuestions] exactly as iOS reads its `LocalStore`.
 * A question this device has not synced (or that has since been unpublished)
 * is silently skipped rather than shown blank — the same call iOS makes.
 */
class StudyRoomsRepository @Inject constructor(
    private val api: SocialApi,
    private val qbankRepository: QBankRepository,
) {

    suspend fun myRooms(): RoomsOutcome = try {
        RoomsOutcome.Loaded(api.myRooms().rooms)
    } catch (e: CancellationException) {
        throw e
    } catch (e: Exception) {
        RoomsOutcome.Unavailable
    }

    suspend fun create(
        name: String,
        questionIds: List<String>,
        timed: Boolean,
        secondsPerQuestion: Int? = null,
        inviteUserIds: List<String> = emptyList(),
    ): RoomMutation = api.createRoom(CreateRoomBody(name, questionIds, timed, secondsPerQuestion, inviteUserIds))

    suspend fun join(code: String): RoomMutation = api.joinRoom(code)

    suspend fun start(id: String): RoomMutation = api.startRoom(id)

    suspend fun submitAnswer(id: String, questionId: String, chosenIndex: Int, seconds: Int?): RoomAnswerMutation =
        api.submitRoomAnswer(id, RoomAnswerBody(questionId, chosenIndex, seconds))

    suspend fun finish(id: String): RoomMutation = api.finishRoom(id)

    /** The room's questions, in the room's own order — see the class doc. */
    suspend fun questionsFor(room: StudyRoomDto): List<Question> {
        if (room.questionIds.isEmpty()) return emptyList()
        val byId = qbankRepository.publishedQuestions().associateBy { it.id }
        return room.questionIds.mapNotNull { byId[it] }
    }

    /** Every question this student's device has synced, for building a new room. */
    suspend fun publishedQuestions(): List<Question> = qbankRepository.publishedQuestions()

    /**
     * Watch one room while it matters. Collect this from a lifecycle-scoped
     * coroutine (a ViewModel's `viewModelScope`, driven by
     * `collectAsStateWithLifecycle` downstream) — cancelling the collector is
     * what stops the polling, exactly like leaving iOS's `RoomView` calls
     * `StudyRoomModel.close()`.
     */
    fun pollRoom(id: String): Flow<RoomPoll> = flow {
        while (true) {
            val tick = fetchRoom(id)
            emit(tick)
            // A transient failure (Unavailable) must not stop the loop — only
            // Gone (the room, or this membership, no longer exists) and a room
            // that has actually closed have nothing left to poll for.
            when (tick) {
                is RoomPoll.Loaded -> if (tick.room.isClosed) break
                RoomPoll.Gone -> break
                RoomPoll.Unavailable -> {}
            }
            delay(ROOM_POLL_INTERVAL)
        }
    }

    /**
     * One immediate read, outside the poll cadence — for a ViewModel to call
     * right after a mutation it made itself (starting the room, handing it
     * in), so that action reflects on screen at once instead of waiting for
     * the next tick. `internal`, not `private`: [pollRoom] and a ViewModel's
     * own refresh share this one implementation rather than two.
     */
    internal suspend fun fetchRoom(id: String): RoomPoll = try {
        RoomPoll.Loaded(api.room(id))
    } catch (e: CancellationException) {
        throw e
    } catch (e: ApiException) {
        if ((e.error as? ApiError.Retryable)?.cause.let { it is HttpException && it.code() == 404 }) {
            RoomPoll.Gone
        } else {
            RoomPoll.Unavailable
        }
    } catch (e: Exception) {
        RoomPoll.Unavailable
    }
}
