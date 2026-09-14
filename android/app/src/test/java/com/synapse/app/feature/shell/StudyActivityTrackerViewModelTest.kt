package com.synapse.app.feature.shell

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
import com.synapse.app.core.model.AttemptRecord
import com.synapse.app.core.model.Manifest
import com.synapse.app.core.model.SessionDto
import com.synapse.app.core.model.StateDoc
import com.synapse.app.core.sync.SyncEngine
import com.synapse.app.feature.maristanas.MaristanaRepository
import java.time.Instant
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
import org.junit.Assert.assertTrue
import org.junit.Before
import org.junit.Test

/**
 * [StudyActivityTrackerViewModel] built against a real [MaristanaRepository] wired to
 * hand-written fakes — same convention as `MaristanaViewModelTest`. Every test that starts the
 * ticker stops it (via [StudyActivityTrackerViewModel.onForegroundChanged] going false, or
 * `onCleared()`) before the test body ends, per this project's polling-ViewModel test hazard:
 * a leaked `while (isActive) { delay(...) }` loop spins `runTest`'s end-of-body drain forever.
 */
@OptIn(ExperimentalCoroutinesApi::class)
class StudyActivityTrackerViewModelTest {

    private val dispatcher = StandardTestDispatcher()
    private val fixedNow = Instant.parse("2026-08-29T12:00:00Z")

    @Before fun setUp() { Dispatchers.setMain(dispatcher) }
    @After fun tearDown() { Dispatchers.resetMain() }

    private fun viewModel(api: FakeMaristanaApi): StudyActivityTrackerViewModel {
        val repository = MaristanaRepository(
            FakeLocalStore(),
            SyncEngine(FakeSynapseApi(), FakeLocalStore(), readableKeys = emptyList(), userStateKeys = emptyList()),
            api,
            Json { ignoreUnknownKeys = true },
        )
        return StudyActivityTrackerViewModel(repository).apply { now = { fixedNow } }
    }

    @Test
    fun firesOnceAMinuteWhileOnAStudyRouteInForeground() = runTest(dispatcher) {
        val api = FakeMaristanaApi()
        val viewModel = viewModel(api)

        viewModel.onForegroundChanged(true)
        viewModel.onRouteChanged("library")

        dispatcher.scheduler.advanceTimeBy(HEARTBEAT_INTERVAL_MS)
        dispatcher.scheduler.runCurrent()
        assertEquals(1, api.calls.size)

        dispatcher.scheduler.advanceTimeBy(HEARTBEAT_INTERVAL_MS)
        dispatcher.scheduler.runCurrent()
        assertEquals(2, api.calls.size)
        assertEquals("library", api.calls.last().surface)

        // Stop the ticker before runTest drains the scheduler.
        viewModel.onForegroundChanged(false)
        dispatcher.scheduler.runCurrent()
    }

    @Test
    fun noHeartbeatOffAStudyRouteEvenInForeground() = runTest(dispatcher) {
        val api = FakeMaristanaApi()
        val viewModel = viewModel(api)

        viewModel.onForegroundChanged(true)
        viewModel.onRouteChanged("dashboard") // not in STUDY_SURFACES

        dispatcher.scheduler.advanceTimeBy(HEARTBEAT_INTERVAL_MS * 3)
        dispatcher.scheduler.runCurrent()

        assertTrue(api.calls.isEmpty())
    }

    @Test
    fun noHeartbeatOnAStudyRouteWhileBackgrounded() = runTest(dispatcher) {
        val api = FakeMaristanaApi()
        val viewModel = viewModel(api)

        viewModel.onRouteChanged("library")
        viewModel.onForegroundChanged(false) // never resumed

        dispatcher.scheduler.advanceTimeBy(HEARTBEAT_INTERVAL_MS * 3)
        dispatcher.scheduler.runCurrent()

        assertTrue(api.calls.isEmpty())
    }

    @Test
    fun backgroundingStopsAnAlreadyRunningTicker() = runTest(dispatcher) {
        val api = FakeMaristanaApi()
        val viewModel = viewModel(api)

        viewModel.onForegroundChanged(true)
        viewModel.onRouteChanged(QUESTION_BANK_ROUTE)
        dispatcher.scheduler.advanceTimeBy(HEARTBEAT_INTERVAL_MS)
        dispatcher.scheduler.runCurrent()
        assertEquals(1, api.calls.size)

        viewModel.onForegroundChanged(false)
        dispatcher.scheduler.advanceTimeBy(HEARTBEAT_INTERVAL_MS * 3)
        dispatcher.scheduler.runCurrent()

        assertEquals(1, api.calls.size) // no further heartbeats once backgrounded
    }

    @Test
    fun sessionIdChangesWhenTheStudySurfaceChanges() = runTest(dispatcher) {
        val api = FakeMaristanaApi()
        val viewModel = viewModel(api)

        viewModel.onForegroundChanged(true)
        viewModel.onRouteChanged("library")
        dispatcher.scheduler.advanceTimeBy(HEARTBEAT_INTERVAL_MS)
        dispatcher.scheduler.runCurrent()

        viewModel.onRouteChanged(QUESTION_BANK_ROUTE)
        dispatcher.scheduler.advanceTimeBy(HEARTBEAT_INTERVAL_MS)
        dispatcher.scheduler.runCurrent()

        assertEquals(2, api.calls.size)
        assertTrue(api.calls[0].sessionId != null)
        assertTrue(api.calls[1].sessionId != null)
        assertTrue(api.calls[0].sessionId != api.calls[1].sessionId)

        viewModel.onForegroundChanged(false)
        dispatcher.scheduler.runCurrent()
    }
}

// --- Fakes --------------------------------------------------------------------

private class FakeMaristanaApi : MaristanaApi {
    val calls = mutableListOf<StudyHeartbeatBody>()

    override suspend fun getOverview(): MaristanaOverview = MaristanaOverview(
        enabled = true,
        config = DEFAULT_MARISTANA_CONFIG,
        totalCredits = 0,
        completedHospitals = 0,
        studyMinutes = 0,
        questionsAnswered = 0,
        correctAnswers = 0,
        assessmentSessions = 0,
        averageAssessmentScore = null,
        breakdown = MaristanaCreditBreakdown(0, 0, 0, 0),
        hospitals = maristanaHospitals(0),
        recentActivity = emptyList(),
        thisWeek = MaristanaWeek(0, 0, 0),
    )

    override suspend fun postStudyHeartbeat(body: StudyHeartbeatBody): StudyHeartbeatResult {
        calls += body
        return StudyHeartbeatResult.Recorded(accepted = true, minuteBucket = body.bucket)
    }

    override suspend fun renameHospital(slot: Int, name: String): RenameHospitalResult =
        RenameHospitalResult.Renamed(slot, name)
}

private class FakeLocalStore : LocalStore {
    private val catalogue = linkedMapOf<String, Pair<String, String>>()
    private val outbox = linkedMapOf<String, String>()
    private val userState = linkedMapOf<String, Triple<String, String?, String?>>()

    override suspend fun putCatalogue(key: String, updatedAt: String, json: String) {
        catalogue[key] = updatedAt to json
    }

    override suspend fun catalogueUpdatedAt(key: String): String? = catalogue[key]?.first
    override suspend fun getCatalogue(key: String): String? = catalogue[key]?.second
    override suspend fun enqueue(key: String, json: String) { outbox[key] = json }
    override suspend fun pendingOutbox(): List<OutboxEntry> = outbox.map { OutboxEntry(it.key, it.value) }
    override suspend fun clearOutbox(key: String) { outbox.remove(key) }
    override suspend fun putAttempts(items: List<AttemptRecord>) { /* unused */ }
    override suspend fun attempts(month: String): List<AttemptRecord> = emptyList()
    override suspend fun putUserState(key: String, json: String, savedAt: String?, serverUpdatedAt: String?) {
        userState[key] = Triple(json, savedAt, serverUpdatedAt)
    }
    override suspend fun getUserState(key: String): String? = userState[key]?.first
    override suspend fun userStateSavedAt(key: String): String? = userState[key]?.second

    override suspend fun clearAll() {
        catalogue.clear(); outbox.clear(); userState.clear()
    }
}

private class FakeSynapseApi : SynapseApi {
    override suspend fun session(): SessionDto = SessionDto("u")
    override suspend fun manifest(): Manifest = emptyMap()
    override suspend fun getState(key: String): StateDoc = StateDoc(JsonNull)
    override suspend fun getUserState(key: String): StateDoc = StateDoc(JsonNull)
    override suspend fun putUserState(key: String, doc: StateDoc) { /* unused */ }
    override suspend fun getAttempts(month: String): List<AttemptRecord> = emptyList()
    override suspend fun postAttempt(attempt: AttemptRecord) { /* unused */ }
}
