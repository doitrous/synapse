package com.synapse.app.feature.maristanas

import com.synapse.app.core.api.ApiError
import com.synapse.app.core.api.ApiException
import com.synapse.app.core.api.MaristanaApi
import com.synapse.app.core.api.RenameHospitalResult
import com.synapse.app.core.api.StudyHeartbeatBody
import com.synapse.app.core.api.StudyHeartbeatResult
import com.synapse.app.core.cache.LocalStore
import com.synapse.app.core.cache.OutboxEntry
import com.synapse.app.core.maristanas.DEFAULT_MARISTANA_CONFIG
import com.synapse.app.core.maristanas.MARISTANA_ONBOARDING_KEY
import com.synapse.app.core.maristanas.MaristanaCreditBreakdown
import com.synapse.app.core.maristanas.MaristanaOverview
import com.synapse.app.core.maristanas.MaristanaWeek
import com.synapse.app.core.maristanas.maristanaHospitals
import com.synapse.app.core.model.Manifest
import com.synapse.app.core.model.SessionDto
import com.synapse.app.core.model.StateDoc
import com.synapse.app.core.sync.SyncEngine
import kotlinx.coroutines.test.runTest
import kotlinx.serialization.json.Json
import org.junit.Assert.assertEquals
import org.junit.Assert.assertNull
import org.junit.Assert.assertTrue
import org.junit.Before
import org.junit.Test
import java.time.Instant

private typealias ModelAttemptRecord = com.synapse.app.core.model.AttemptRecord

/**
 * [MaristanaRepository] wraps the one live overview fetch with an offline
 * cache and round-trips the onboarding-dismissal doc over a real [SyncEngine]
 * against a fake in-memory [LocalStore] — same shape as `PracticalRepositoryTest`.
 */
class MaristanaRepositoryTest {

    private val json = Json { ignoreUnknownKeys = true }
    private val now = Instant.parse("2026-08-29T12:00:00Z")

    private lateinit var localStore: FakeLocalStore
    private lateinit var synapseApi: FakeSynapseApi
    private lateinit var syncEngine: SyncEngine
    private lateinit var maristanaApi: FakeMaristanaApi
    private lateinit var repository: MaristanaRepository

    private val sampleOverview = MaristanaOverview(
        enabled = true,
        config = DEFAULT_MARISTANA_CONFIG,
        totalCredits = 130,
        completedHospitals = 0,
        studyMinutes = 40,
        questionsAnswered = 10,
        correctAnswers = 8,
        assessmentSessions = 0,
        averageAssessmentScore = null,
        breakdown = MaristanaCreditBreakdown(80, 20, 80, 0),
        hospitals = maristanaHospitals(130),
        recentActivity = emptyList(),
        thisWeek = MaristanaWeek(40, 10, 180),
    )

    @Before
    fun setup() {
        localStore = FakeLocalStore()
        synapseApi = FakeSynapseApi()
        syncEngine = SyncEngine(synapseApi, localStore, readableKeys = emptyList(), userStateKeys = emptyList())
        maristanaApi = FakeMaristanaApi()
        repository = MaristanaRepository(localStore, syncEngine, maristanaApi, json)
    }

    // --- overview ---------------------------------------------------------------

    @Test
    fun overviewReturnsTheLiveResponseAndCachesIt() = runTest {
        maristanaApi.overviewResult = { sampleOverview }

        val outcome = repository.overview(now) as MaristanaOverviewOutcome.Loaded

        assertEquals(130, outcome.overview.totalCredits)
        assertEquals(false, outcome.fromCache)
        assertTrue(localStore.catalogue.containsKey("maristana-overview-cache-v1"))
    }

    @Test
    fun overviewFallsBackToTheCacheWhenTheLiveFetchFails() = runTest {
        maristanaApi.overviewResult = { sampleOverview }
        repository.overview(now)
        maristanaApi.overviewResult = { throw ApiException(ApiError.Retryable(RuntimeException("offline"))) }

        val outcome = repository.overview(now) as MaristanaOverviewOutcome.Loaded

        assertEquals(130, outcome.overview.totalCredits)
        assertEquals(true, outcome.fromCache)
    }

    @Test
    fun overviewIsUnavailableWithNoCacheAndAFailedFetch() = runTest {
        maristanaApi.overviewResult = { throw ApiException(ApiError.Retryable(RuntimeException("offline"))) }

        assertEquals(MaristanaOverviewOutcome.Unavailable, repository.overview(now))
    }

    // --- onboarding ---------------------------------------------------------------

    @Test
    fun onboardingStateDefaultsToNotCompletedWhenNothingStored() = runTest {
        assertEquals(false, repository.onboardingState().completed)
    }

    @Test
    fun completeOnboardingThenOnboardingStateReflectsTheWriteWithNoRefresh() = runTest {
        repository.completeOnboarding(now)

        assertEquals(true, repository.onboardingState().completed)
        // Write-through: SyncEngine.write hit putUserState synchronously.
        assertEquals(1, synapseApi.putCalls.size)
        assertEquals(MARISTANA_ONBOARDING_KEY, synapseApi.putCalls.single())
    }

    // --- rename / heartbeat pass-through --------------------------------------------

    @Test
    fun renameDelegatesToTheApi() = runTest {
        maristanaApi.renameResult = RenameHospitalResult.Renamed(1, "Ibn Sina House")

        val result = repository.rename(1, "Ibn Sina House")

        assertEquals(RenameHospitalResult.Renamed(1, "Ibn Sina House"), result)
        assertEquals(1, maristanaApi.renameCalls.size)
    }

    @Test
    fun recordStudyHeartbeatDelegatesToTheApi() = runTest {
        maristanaApi.heartbeatResult = StudyHeartbeatResult.Recorded(accepted = true, minuteBucket = 42)

        val result = repository.recordStudyHeartbeat(42, "s1", null, null, "qbank")

        assertEquals(StudyHeartbeatResult.Recorded(true, 42), result)
        assertEquals(StudyHeartbeatBody(42, "s1", null, null, "qbank"), maristanaApi.heartbeatCalls.single())
    }
}

// --- Fakes --------------------------------------------------------------------

private class FakeMaristanaApi : MaristanaApi {
    var overviewResult: () -> MaristanaOverview = { throw IllegalStateException("not stubbed") }
    var renameResult: RenameHospitalResult = RenameHospitalResult.Renamed(1, "unstubbed")
    var heartbeatResult: StudyHeartbeatResult = StudyHeartbeatResult.Recorded(true, 0)
    val renameCalls = mutableListOf<Pair<Int, String>>()
    val heartbeatCalls = mutableListOf<StudyHeartbeatBody>()

    override suspend fun getOverview(): MaristanaOverview = overviewResult()

    override suspend fun postStudyHeartbeat(body: StudyHeartbeatBody): StudyHeartbeatResult {
        heartbeatCalls += body
        return heartbeatResult
    }

    override suspend fun renameHospital(slot: Int, name: String): RenameHospitalResult {
        renameCalls += slot to name
        return renameResult
    }
}

private class FakeLocalStore : LocalStore {
    val catalogue = linkedMapOf<String, Pair<String, String>>()
    val outbox = linkedMapOf<String, String>()
    val attemptsById = linkedMapOf<String, ModelAttemptRecord>()
    val userState = linkedMapOf<String, Triple<String, String?, String?>>()

    override suspend fun putCatalogue(key: String, updatedAt: String, json: String) {
        catalogue[key] = updatedAt to json
    }

    override suspend fun catalogueUpdatedAt(key: String): String? = catalogue[key]?.first
    override suspend fun getCatalogue(key: String): String? = catalogue[key]?.second
    override suspend fun enqueue(key: String, json: String) { outbox[key] = json }
    override suspend fun pendingOutbox(): List<OutboxEntry> = outbox.map { OutboxEntry(it.key, it.value) }
    override suspend fun clearOutbox(key: String) { outbox.remove(key) }
    override suspend fun putAttempts(items: List<ModelAttemptRecord>) { items.forEach { attemptsById[it.id] = it } }
    override suspend fun attempts(month: String): List<ModelAttemptRecord> = attemptsById.values.filter { it.month == month }
    override suspend fun putUserState(key: String, json: String, savedAt: String?, serverUpdatedAt: String?) {
        userState[key] = Triple(json, savedAt, serverUpdatedAt)
    }
    override suspend fun getUserState(key: String): String? = userState[key]?.first
    override suspend fun userStateSavedAt(key: String): String? = userState[key]?.second

    override suspend fun clearAll() {
        catalogue.clear(); outbox.clear(); attemptsById.clear(); userState.clear()
    }
}

private class FakeSynapseApi : com.synapse.app.core.api.SynapseApi {
    val putCalls = mutableListOf<String>()

    override suspend fun session(): SessionDto = SessionDto("u")
    override suspend fun manifest(): Manifest = emptyMap()
    override suspend fun getState(key: String): StateDoc = StateDoc(kotlinx.serialization.json.JsonNull)
    override suspend fun getUserState(key: String): StateDoc = StateDoc(kotlinx.serialization.json.JsonNull)
    override suspend fun putUserState(key: String, doc: StateDoc) { putCalls += key }
    override suspend fun getAttempts(month: String): List<ModelAttemptRecord> = emptyList()
    override suspend fun postAttempt(attempt: ModelAttemptRecord) { /* unused */ }
}
