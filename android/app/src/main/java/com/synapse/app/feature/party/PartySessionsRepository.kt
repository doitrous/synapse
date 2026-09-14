package com.synapse.app.feature.party

import com.synapse.app.core.api.ApiError
import com.synapse.app.core.api.ApiException
import com.synapse.app.core.api.CreateSessionBody
import com.synapse.app.core.api.PartyAnswerBody
import com.synapse.app.core.api.PartyAnswerMutation
import com.synapse.app.core.api.PartyApi
import com.synapse.app.core.api.PartySessionDto
import com.synapse.app.core.api.PartySessionItemRefDto
import com.synapse.app.core.api.PartySessionSummaryDto
import com.synapse.app.core.api.SessionMutation
import com.synapse.app.core.qbank.Question
import com.synapse.app.feature.qbank.QBankRepository
import kotlinx.coroutines.CancellationException
import kotlinx.coroutines.delay
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.flow
import retrofit2.HttpException
import javax.inject.Inject

/** One tick of [PartySessionsRepository.pollSession]. */
sealed interface SessionPoll {
    data class Loaded(val session: PartySessionDto) : SessionPoll
    /** The session no longer exists, or this student is not a member of its party. */
    data object Gone : SessionPoll
    data object Unavailable : SessionPoll
}

/**
 * A party session's data layer: freezing one (host only, one item per the
 * production `PartyPage.schedulePartyActivity` flow), listing a party's
 * sessions, and watching one session while it is being sat.
 *
 * [questionsFor] resolves `kind: "question"` item refs the same way
 * [com.synapse.app.feature.social.StudyRoomsRepository.questionsFor] resolves
 * a room's question ids — via this device's own synced Question Bank, never
 * a second copy of question text carried over the party wire.
 *
 * A `practical` or `essay` item ref has no on-device content resolver yet
 * (there is no Android equivalent of web's `useLivePracticals`/
 * `useLiveEssays`): [PartySessionScreen] shows those refs as a self-check-only
 * card (id and kind, no authored body) rather than fabricating content for
 * them — an honest, KDoc'd degrade, not a silent gap. `answer` still records
 * the "I've done this" self-check correctly either way, since the server
 * never grades those kinds.
 */
class PartySessionsRepository @Inject constructor(
    private val api: PartyApi,
    private val qbankRepository: QBankRepository,
) {

    suspend fun sessionsFor(partyId: String): List<PartySessionSummaryDto> = try {
        api.sessions(partyId).sessions
    } catch (e: CancellationException) {
        throw e
    } catch (e: Exception) {
        emptyList()
    }

    /** `items` carries exactly one ref, matching the production create-session flow. */
    suspend fun create(partyId: String, name: String, item: PartySessionItemRefDto, startsAt: String?): SessionMutation =
        api.createSession(partyId, CreateSessionBody(name = name, items = listOf(item), startsAt = startsAt))

    suspend fun answer(sessionId: String, kind: String, id: String, chosenIndex: Int?, seconds: Int?): PartyAnswerMutation =
        api.answer(sessionId, PartyAnswerBody(kind, id, chosenIndex, seconds))

    suspend fun close(sessionId: String): SessionMutation = api.closeSession(sessionId)

    /** This session's `question` item refs, resolved to this device's own synced Question Bank, in the session's own order. */
    suspend fun questionsFor(session: PartySessionDto): List<Question> {
        val questionIds = session.itemRefs.filter { it.kind == "question" }.map { it.id }
        if (questionIds.isEmpty()) return emptyList()
        val byId = qbankRepository.publishedQuestions().associateBy { it.id }
        return questionIds.mapNotNull { byId[it] }
    }

    /** Every question this student's device has synced, for the "schedule a session" picker. */
    suspend fun publishedQuestions(): List<Question> = qbankRepository.publishedQuestions()

    fun pollSession(sessionId: String): Flow<SessionPoll> = flow {
        while (true) {
            val tick = fetchSession(sessionId)
            emit(tick)
            when (tick) {
                is SessionPoll.Loaded -> if (tick.session.isClosed) break
                SessionPoll.Gone -> break
                SessionPoll.Unavailable -> {}
            }
            delay(PARTY_POLL_INTERVAL)
        }
    }

    internal suspend fun fetchSession(sessionId: String): SessionPoll = try {
        SessionPoll.Loaded(api.session(sessionId))
    } catch (e: CancellationException) {
        throw e
    } catch (e: ApiException) {
        if ((e.error as? ApiError.Retryable)?.cause.let { it is HttpException && it.code() == 404 }) {
            SessionPoll.Gone
        } else {
            SessionPoll.Unavailable
        }
    } catch (e: Exception) {
        SessionPoll.Unavailable
    }
}
