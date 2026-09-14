package com.synapse.app.feature.performance

import com.synapse.app.core.api.LeaderboardApi
import com.synapse.app.core.api.LeaderboardMetric
import com.synapse.app.core.api.LeaderboardResponse
import com.synapse.app.core.api.LeaderboardRow
import com.synapse.app.core.cache.LocalStore
import com.synapse.app.core.cache.OutboxEntry
import com.synapse.app.core.model.AttemptRecord as ModelAttemptRecord
import com.synapse.app.core.qbank.AttemptRecord
import kotlinx.coroutines.test.runTest
import kotlinx.serialization.json.Json
import org.junit.Assert.assertEquals
import org.junit.Assert.assertTrue
import org.junit.Before
import org.junit.Test
import java.io.IOException
import java.time.Instant

/**
 * [PerformanceRepository] computes personal stats entirely from [LocalStore.allAttempts]
 * (a real in-memory [FakeLocalStore] round-trips the same JSON encode/decode
 * [com.synapse.app.feature.qbank.QBankRepository] writes) and fetches the leaderboard
 * through [LeaderboardApi] — offline-tolerant, matching `QBankRepository.postVerifiedAttempts`'s
 * "a failed network call never crashes the caller" convention.
 */
class PerformanceRepositoryTest {

    private val json = Json { ignoreUnknownKeys = true }
    private lateinit var localStore: FakeLocalStore
    private lateinit var leaderboardApi: FakeLeaderboardApi
    private lateinit var repository: PerformanceRepository

    @Before
    fun setup() {
        localStore = FakeLocalStore()
        leaderboardApi = FakeLeaderboardApi()
        repository = PerformanceRepository(localStore, leaderboardApi, json)
    }

    // --- personalStats ------------------------------------------------------------

    @Test
    fun personalStatsIsEmptyWhenNothingHasBeenAttempted() = runTest {
        val stats = repository.personalStats(Instant.parse("2026-08-13T09:00:00Z"))
        assertEquals(0, stats.attempts)
    }

    @Test
    fun personalStatsIsComputedFromEveryStoredAttemptAcrossMonths() = runTest {
        seedAttempt(month = "2026-07", record = sample(id = "a1", at = "2026-07-01T10:00:00Z", subjectId = "cvs", correct = true))
        seedAttempt(month = "2026-08", record = sample(id = "a2", at = "2026-08-01T10:00:00Z", subjectId = "renal", correct = false))

        val stats = repository.personalStats(Instant.parse("2026-08-13T09:00:00Z"))

        assertEquals(2, stats.attempts)
        assertEquals(2, stats.marked)
        assertEquals(setOf("cvs", "renal"), stats.bySubject.map { it.key }.toSet())
    }

    @Test
    fun malformedStoredPayloadsAreSkippedRatherThanCrashing() = runTest {
        localStore.attemptsById["broken"] = ModelAttemptRecord(
            id = "broken", month = "2026-08",
            payload = json.parseToJsonElement("""{"notAnAttempt":true}""").let { it as kotlinx.serialization.json.JsonObject },
        )
        seedAttempt(month = "2026-08", record = sample(id = "a1", at = "2026-08-01T10:00:00Z"))

        val stats = repository.personalStats(Instant.parse("2026-08-13T09:00:00Z"))

        assertEquals(1, stats.attempts)
    }

    // --- leaderboard (offline-tolerant) --------------------------------------------

    @Test
    fun leaderboardReturnsLoadedOnSuccess() = runTest {
        leaderboardApi.response = LeaderboardResponse(rows = listOf(LeaderboardRow(rank = 1, username = "a1")))

        val outcome = repository.leaderboard(LeaderboardMetric.ConceptsMastered)

        assertTrue(outcome is LeaderboardOutcome.Loaded)
        assertEquals(1, (outcome as LeaderboardOutcome.Loaded).response.rows.size)
    }

    @Test
    fun leaderboardDegradesToUnavailableWhenTheApiThrows() = runTest {
        leaderboardApi.failure = IOException("offline")

        val outcome = repository.leaderboard(LeaderboardMetric.PercentCorrect)

        assertEquals(LeaderboardOutcome.Unavailable, outcome)
    }

    @Test
    fun leaderboardPassesTheRequestedMetricThrough() = runTest {
        leaderboardApi.response = LeaderboardResponse()

        repository.leaderboard(LeaderboardMetric.PercentCorrect)

        assertEquals(LeaderboardMetric.PercentCorrect, leaderboardApi.lastMetric)
    }

    // --- fixtures ------------------------------------------------------------------

    private suspend fun seedAttempt(month: String, record: AttemptRecord) {
        localStore.attemptsById[record.id] = ModelAttemptRecord(
            id = record.id,
            month = month,
            payload = json.encodeToJsonElement(AttemptRecord.serializer(), record) as kotlinx.serialization.json.JsonObject,
        )
    }

    private fun sample(
        id: String,
        at: String,
        subjectId: String = "cvs",
        correct: Boolean? = true,
    ) = AttemptRecord(
        id = id, at = at, itemId = "q1", subjectId = subjectId, topic = "Heart failure",
        difficulty = "Moderate", correct = correct, sessionId = "s1",
    )
}

// --- Fakes --------------------------------------------------------------------

private class FakeLocalStore : LocalStore {
    val attemptsById = linkedMapOf<String, ModelAttemptRecord>()

    override suspend fun putCatalogue(key: String, updatedAt: String, json: String) {}
    override suspend fun catalogueUpdatedAt(key: String): String? = null
    override suspend fun getCatalogue(key: String): String? = null
    override suspend fun enqueue(key: String, json: String) {}
    override suspend fun pendingOutbox(): List<OutboxEntry> = emptyList()
    override suspend fun clearOutbox(key: String) {}
    override suspend fun putAttempts(items: List<ModelAttemptRecord>) { items.forEach { attemptsById[it.id] = it } }
    override suspend fun attempts(month: String): List<ModelAttemptRecord> = attemptsById.values.filter { it.month == month }
    override suspend fun allAttempts(): List<ModelAttemptRecord> = attemptsById.values.toList()
    override suspend fun putUserState(key: String, json: String, savedAt: String?, serverUpdatedAt: String?) {}
    override suspend fun getUserState(key: String): String? = null
    override suspend fun userStateSavedAt(key: String): String? = null
    override suspend fun clearAll() { attemptsById.clear() }
}

private class FakeLeaderboardApi : LeaderboardApi {
    var response: LeaderboardResponse = LeaderboardResponse()
    var failure: Exception? = null
    var lastMetric: LeaderboardMetric? = null

    override suspend fun getLeaderboard(metric: LeaderboardMetric): LeaderboardResponse {
        lastMetric = metric
        failure?.let { throw it }
        return response
    }
}
