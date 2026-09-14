package com.synapse.app.feature.performance

import com.synapse.app.core.api.LeaderboardApi
import com.synapse.app.core.api.LeaderboardMetric
import com.synapse.app.core.api.LeaderboardResponse
import com.synapse.app.core.cache.LocalStore
import com.synapse.app.core.qbank.AttemptRecord
import kotlinx.coroutines.CancellationException
import kotlinx.serialization.json.Json
import java.time.Instant
import javax.inject.Inject

/** What a leaderboard fetch came to — offline (or any server failure) is a normal outcome, never a crash. */
sealed interface LeaderboardOutcome {
    data class Loaded(val response: LeaderboardResponse) : LeaderboardOutcome
    data object Unavailable : LeaderboardOutcome
}

/**
 * The Performance data layer: [personalStats] computes entirely on-device from the
 * attempt log the QBank (and other surfaces) already write via
 * `QBankRepository.recordAttempts` — no network needed, matching iOS's
 * `PerformanceModel.load()`. [leaderboard] is the one live call this feature makes;
 * the anonymous, cohort-scoped ranking cannot be computed locally, and a failed or
 * offline fetch degrades to [LeaderboardOutcome.Unavailable] rather than surfacing
 * an error or substituting fabricated rows.
 */
class PerformanceRepository @Inject constructor(
    private val localStore: LocalStore,
    private val leaderboardApi: LeaderboardApi,
    private val json: Json,
) {

    suspend fun personalStats(now: Instant): PersonalStats =
        computePersonalStats(allAttempts(), now)

    suspend fun leaderboard(metric: LeaderboardMetric): LeaderboardOutcome = try {
        LeaderboardOutcome.Loaded(leaderboardApi.getLeaderboard(metric))
    } catch (e: CancellationException) {
        throw e
    } catch (e: Exception) {
        LeaderboardOutcome.Unavailable
    }

    private suspend fun allAttempts(): List<AttemptRecord> =
        localStore.allAttempts().mapNotNull {
            runCatching { json.decodeFromJsonElement(AttemptRecord.serializer(), it.payload) }.getOrNull()
        }
}
