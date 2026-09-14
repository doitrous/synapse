package com.synapse.app.feature.social

import com.synapse.app.core.api.ApiError
import com.synapse.app.core.api.ApiException
import com.synapse.app.core.api.ChallengeAnswerBody
import com.synapse.app.core.api.ChallengeAnswerMutation
import com.synapse.app.core.api.ChallengeDto
import com.synapse.app.core.api.ChallengeMutation
import com.synapse.app.core.api.ChallengeSummaryDto
import com.synapse.app.core.api.CreateChallengeBody
import com.synapse.app.core.api.SocialApi
import com.synapse.app.core.qbank.Question
import com.synapse.app.feature.qbank.QBankRepository
import kotlinx.coroutines.CancellationException
import kotlinx.coroutines.delay
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.flow
import retrofit2.HttpException
import javax.inject.Inject

/** What listing this student's challenges came to. Offline is a normal outcome, never a crash. */
sealed interface ChallengesOutcome {
    data class Loaded(val challenges: List<ChallengeSummaryDto>) : ChallengesOutcome
    data object Unavailable : ChallengesOutcome
}

/** One tick of [ChallengesRepository.pollChallenge]. */
sealed interface ChallengePoll {
    data class Loaded(val challenge: ChallengeDto) : ChallengePoll
    /** No such challenge, or this student is not a side of it — the server answers both the same way. */
    data object Gone : ChallengePoll
    data object Unavailable : ChallengePoll
}

/**
 * The Challenges data layer — a head-to-head sitting of the same frozen
 * paper. [pollChallenge] re-fetches every [ROOM_POLL_INTERVAL] while
 * collected (the same 4s cadence study rooms use — there is one polling
 * rhythm in this product, not one per feature) and stops once the challenge
 * is declined or complete, mirroring the web `useChallenge` hook (iOS has no
 * Challenges surface yet, so the web hook is the behavioral source of truth
 * here). [questionsFor] resolves ids the same way [StudyRoomsRepository] does.
 */
class ChallengesRepository @Inject constructor(
    private val api: SocialApi,
    private val qbankRepository: QBankRepository,
) {

    suspend fun myChallenges(): ChallengesOutcome = try {
        ChallengesOutcome.Loaded(api.myChallenges().challenges)
    } catch (e: CancellationException) {
        throw e
    } catch (e: Exception) {
        ChallengesOutcome.Unavailable
    }

    suspend fun create(opponentId: String, questionIds: List<String>, scopeLabel: String): ChallengeMutation =
        api.createChallenge(CreateChallengeBody(opponentId, questionIds, scopeLabel))

    suspend fun respond(id: String, accept: Boolean): ChallengeMutation = api.respondToChallenge(id, accept)

    suspend fun submitAnswer(id: String, questionId: String, chosenIndex: Int, seconds: Int?): ChallengeAnswerMutation =
        api.submitChallengeAnswer(id, ChallengeAnswerBody(questionId, chosenIndex, seconds))

    suspend fun finish(id: String): ChallengeMutation = api.finishChallenge(id)

    suspend fun questionsFor(challenge: ChallengeDto): List<Question> {
        if (challenge.questionIds.isEmpty()) return emptyList()
        val byId = qbankRepository.publishedQuestions().associateBy { it.id }
        return challenge.questionIds.mapNotNull { byId[it] }
    }

    suspend fun publishedQuestions(): List<Question> = qbankRepository.publishedQuestions()

    /** Watch one challenge while it matters — see [StudyRoomsRepository.pollRoom]'s doc for the collection contract. */
    fun pollChallenge(id: String): Flow<ChallengePoll> = flow {
        while (true) {
            val tick = fetchChallenge(id)
            emit(tick)
            // Same rule as StudyRoomsRepository.pollRoom: a transient Unavailable
            // must not stop the loop, only Gone or an actually-finished challenge.
            when (tick) {
                is ChallengePoll.Loaded -> if (tick.challenge.isDeclined || tick.challenge.isComplete) break
                ChallengePoll.Gone -> break
                ChallengePoll.Unavailable -> {}
            }
            delay(ROOM_POLL_INTERVAL)
        }
    }

    /** One immediate read, outside the poll cadence — see [StudyRoomsRepository.fetchRoom]'s doc. */
    internal suspend fun fetchChallenge(id: String): ChallengePoll = try {
        ChallengePoll.Loaded(api.challenge(id))
    } catch (e: CancellationException) {
        throw e
    } catch (e: ApiException) {
        if ((e.error as? ApiError.Retryable)?.cause.let { it is HttpException && it.code() == 404 }) {
            ChallengePoll.Gone
        } else {
            ChallengePoll.Unavailable
        }
    } catch (e: Exception) {
        ChallengePoll.Unavailable
    }
}
