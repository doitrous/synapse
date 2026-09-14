package com.synapse.app.feature.maristanas

import com.synapse.app.core.api.ApiError
import com.synapse.app.core.api.ApiException
import com.synapse.app.core.api.MaristanaApi
import com.synapse.app.core.api.RenameHospitalResult
import com.synapse.app.core.api.StudyHeartbeatBody
import com.synapse.app.core.api.StudyHeartbeatResult
import com.synapse.app.core.api.SynapseApi
import com.synapse.app.core.cache.LocalStore
import com.synapse.app.core.cache.OutboxEntry
import com.synapse.app.core.maristanas.DEFAULT_MARISTANA_CONFIG
import com.synapse.app.core.maristanas.MaristanaCreditBreakdown
import com.synapse.app.core.maristanas.MaristanaOverview
import com.synapse.app.core.maristanas.MaristanaWeek
import com.synapse.app.core.maristanas.maristanaHospitals
import com.synapse.app.core.model.AttemptRecord as ModelAttemptRecord
import com.synapse.app.core.model.Manifest
import com.synapse.app.core.model.SessionDto
import com.synapse.app.core.model.StateDoc
import com.synapse.app.core.sync.SyncEngine
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.ExperimentalCoroutinesApi
import kotlinx.coroutines.test.StandardTestDispatcher
import kotlinx.coroutines.test.resetMain
import kotlinx.coroutines.test.runTest
import kotlinx.coroutines.test.setMain
import kotlinx.serialization.json.Json
import kotlinx.serialization.json.JsonNull
import org.junit.After
import org.junit.Assert.assertEquals
import org.junit.Assert.assertNull
import org.junit.Assert.assertTrue
import org.junit.Before
import org.junit.Test
import java.time.Instant

/** A representative overview shared by every test in this file — kept top-level so [VmFakeMaristanaApi] can default to it too. */
private val SAMPLE_OVERVIEW = MaristanaOverview(
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

/**
 * [MaristanaViewModel] built against a real [MaristanaRepository] + [SyncEngine],
 * the latter wired to hand-written fakes — same convention as `PracticalViewModelTest`.
 */
@OptIn(ExperimentalCoroutinesApi::class)
class MaristanaViewModelTest {

    private val dispatcher = StandardTestDispatcher()
    private val json = Json { ignoreUnknownKeys = true }
    private val now = Instant.parse("2026-08-29T12:00:00Z")
    private val overview = SAMPLE_OVERVIEW

    @Before fun setUp() { Dispatchers.setMain(dispatcher) }
    @After fun tearDown() { Dispatchers.resetMain() }

    private fun repository(localStore: VmFakeLocalStore = VmFakeLocalStore(), api: VmFakeMaristanaApi = VmFakeMaristanaApi()): MaristanaRepository =
        MaristanaRepository(localStore, SyncEngine(VmFakeSynapseApi(), localStore, readableKeys = emptyList(), userStateKeys = emptyList()), api, json)

    private fun viewModel(repository: MaristanaRepository): MaristanaViewModel =
        MaristanaViewModel(repository).apply { now = { this@MaristanaViewModelTest.now } }

    @Test
    fun loadsOverviewAndOnboardingOnInit() = runTest(dispatcher) {
        val viewModel = viewModel(repository())
        dispatcher.scheduler.advanceUntilIdle()

        val state = viewModel.uiState.value as MaristanaUiState.Content
        assertEquals(130, state.overview.totalCredits)
        assertEquals(false, state.fromCache)
        assertEquals(1, state.selectedSlot)
        assertEquals(false, state.onboarding.completed)
    }

    @Test
    fun unavailableWhenTheFetchFailsAndNothingIsCached() = runTest(dispatcher) {
        val api = VmFakeMaristanaApi()
        api.overviewResult = { throw ApiException(ApiError.Retryable(RuntimeException("offline"))) }
        val viewModel = viewModel(repository(api = api))
        dispatcher.scheduler.advanceUntilIdle()

        assertEquals(MaristanaUiState.Unavailable, viewModel.uiState.value)
    }

    @Test
    fun selectHospitalIgnoresAnUnknownSlot() = runTest(dispatcher) {
        val viewModel = viewModel(repository())
        dispatcher.scheduler.advanceUntilIdle()

        viewModel.selectHospital(99)

        assertEquals(1, (viewModel.uiState.value as MaristanaUiState.Content).selectedSlot)
    }

    @Test
    fun renameSuccessTriggersAReloadAndClearsAnyPriorRefusal() = runTest(dispatcher) {
        val api = VmFakeMaristanaApi()
        val viewModel = viewModel(repository(api = api))
        dispatcher.scheduler.advanceUntilIdle()

        viewModel.rename(1, "Ibn Sina House")
        dispatcher.scheduler.advanceUntilIdle()

        assertEquals(1, api.renameCalls.size)
        assertNull((viewModel.uiState.value as MaristanaUiState.Content).renameRefusalReason)
    }

    @Test
    fun renameRefusalIsSurfacedOnState() = runTest(dispatcher) {
        val api = VmFakeMaristanaApi()
        api.renameResult = { RenameHospitalResult.Refused("hospital_not_unlocked") }
        val viewModel = viewModel(repository(api = api))
        dispatcher.scheduler.advanceUntilIdle()

        viewModel.rename(5, "Too Far Ahead")
        dispatcher.scheduler.advanceUntilIdle()

        val state = viewModel.uiState.value as MaristanaUiState.Content
        assertEquals("hospital_not_unlocked", state.renameRefusalReason)
    }

    @Test
    fun renameTransportFailureLeavesStateUntouchedRatherThanCrashing() = runTest(dispatcher) {
        val api = VmFakeMaristanaApi()
        api.renameResult = { throw ApiException(ApiError.Retryable(RuntimeException("offline"))) }
        val viewModel = viewModel(repository(api = api))
        dispatcher.scheduler.advanceUntilIdle()

        viewModel.rename(1, "Ibn Sina House")
        dispatcher.scheduler.advanceUntilIdle()

        val state = viewModel.uiState.value as MaristanaUiState.Content
        assertNull(state.renameRefusalReason)
        assertEquals("Maristana 01", state.overview.hospitals.first().name)
    }

    @Test
    fun dismissOnboardingMarksItCompletedOnState() = runTest(dispatcher) {
        val viewModel = viewModel(repository())
        dispatcher.scheduler.advanceUntilIdle()

        viewModel.dismissOnboarding()
        dispatcher.scheduler.advanceUntilIdle()

        assertTrue((viewModel.uiState.value as MaristanaUiState.Content).onboarding.completed)
    }
}

// --- Fakes --------------------------------------------------------------------

private class VmFakeMaristanaApi : MaristanaApi {
    var overviewResult: () -> MaristanaOverview = { SAMPLE_OVERVIEW }
    var renameResult: () -> RenameHospitalResult = { RenameHospitalResult.Renamed(1, "unstubbed") }
    var heartbeatResult: () -> StudyHeartbeatResult = { StudyHeartbeatResult.Recorded(true, 0) }
    val renameCalls = mutableListOf<Pair<Int, String>>()

    override suspend fun getOverview(): MaristanaOverview = overviewResult()
    override suspend fun postStudyHeartbeat(body: StudyHeartbeatBody): StudyHeartbeatResult = heartbeatResult()
    override suspend fun renameHospital(slot: Int, name: String): RenameHospitalResult {
        renameCalls += slot to name
        return renameResult()
    }
}

private class VmFakeLocalStore : LocalStore {
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

private class VmFakeSynapseApi : SynapseApi {
    override suspend fun session(): SessionDto = SessionDto("u")
    override suspend fun manifest(): Manifest = emptyMap()
    override suspend fun getState(key: String): StateDoc = StateDoc(JsonNull)
    override suspend fun getUserState(key: String): StateDoc = StateDoc(JsonNull)
    override suspend fun putUserState(key: String, doc: StateDoc) { /* unused */ }
    override suspend fun getAttempts(month: String): List<ModelAttemptRecord> = emptyList()
    override suspend fun postAttempt(attempt: ModelAttemptRecord) { /* unused */ }
}
