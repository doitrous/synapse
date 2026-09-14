package com.synapse.app.feature.calendar

import com.synapse.app.core.api.SynapseApi
import com.synapse.app.core.cache.LocalStore
import com.synapse.app.core.cache.OutboxEntry
import com.synapse.app.core.calendar.CalendarLayer
import com.synapse.app.core.calendar.StudyBlock
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
import org.junit.Assert.assertFalse
import org.junit.Assert.assertTrue
import org.junit.Before
import org.junit.Test
import java.time.Instant
import java.time.LocalDate
import java.util.TimeZone

/**
 * [CalendarViewModel] built against a real [CalendarRepository] + [SyncEngine],
 * the latter wired to hand-written fakes — the same convention as
 * `PracticalViewModelTest`. `now` is pinned throughout, per this task's
 * requirement that "current week/day" come from the view model's `now` seam,
 * never the system clock.
 */
@OptIn(ExperimentalCoroutinesApi::class)
class CalendarViewModelTest {

    private val dispatcher = StandardTestDispatcher()
    private val json = Json { ignoreUnknownKeys = true }

    /** A Thursday, so shifting a Saturday-first week by one is an unambiguous check. */
    private val fixedNow = Instant.parse("2026-09-10T12:00:00Z")

    private lateinit var originalZone: TimeZone

    @Before
    fun setUp() {
        Dispatchers.setMain(dispatcher)
        // Pin the JVM default zone so `now().atZone(ZoneId.systemDefault())` in
        // CalendarViewModel.today() lands on a deterministic calendar date
        // regardless of which time zone the test host happens to run in.
        originalZone = TimeZone.getDefault()
        TimeZone.setDefault(TimeZone.getTimeZone("UTC"))
    }

    @After
    fun tearDown() {
        TimeZone.setDefault(originalZone)
        Dispatchers.resetMain()
    }

    private fun repository(localStore: VmFakeLocalStore = VmFakeLocalStore(), api: VmFakeApi = VmFakeApi()): CalendarRepository =
        CalendarRepository(localStore, SyncEngine(api, localStore, readableKeys = emptyList(), userStateKeys = emptyList()), json)

    private fun viewModel(repository: CalendarRepository): CalendarViewModel =
        CalendarViewModel(repository).apply { now = { fixedNow } }

    @Test
    fun initLoadsMonthViewAnchoredOnNowWithNoBlocks() = runTest {
        val viewModel = viewModel(repository())
        dispatcher.scheduler.advanceUntilIdle()

        val state = viewModel.uiState.value
        assertTrue(state is CalendarUiState.Content)
        state as CalendarUiState.Content
        assertEquals(CalendarViewMode.MONTH, state.view)
        assertEquals(LocalDate.of(2026, 9, 10), state.today)
        assertEquals(42, state.days.size)
        assertTrue(state.blocks.isEmpty())
    }

    @Test
    fun aSavedBlockAppearsInEventsByDayWithNoManualReload() = runTest {
        val viewModel = viewModel(repository())
        dispatcher.scheduler.advanceUntilIdle()

        viewModel.saveBlock(StudyBlock(id = "b1", title = "Revise CVS", date = "2026-09-10", start = "17:00", end = "18:00"))
        dispatcher.scheduler.advanceUntilIdle()

        val state = viewModel.uiState.value as CalendarUiState.Content
        val events = state.visibleEvents(LocalDate.of(2026, 9, 10))
        assertEquals(1, events.size)
        assertEquals(CalendarLayer.PERSONAL, events.single().layer)
        assertEquals("Revise CVS", events.single().title)
    }

    @Test
    fun deletingABlockRemovesItFromEventsByDay() = runTest {
        val viewModel = viewModel(repository())
        dispatcher.scheduler.advanceUntilIdle()
        viewModel.saveBlock(StudyBlock(id = "b1", title = "Revise CVS", date = "2026-09-10", start = "17:00", end = "18:00"))
        dispatcher.scheduler.advanceUntilIdle()

        viewModel.deleteBlock("b1")
        dispatcher.scheduler.advanceUntilIdle()

        val state = viewModel.uiState.value as CalendarUiState.Content
        assertTrue(state.visibleEvents(LocalDate.of(2026, 9, 10)).isEmpty())
    }

    @Test
    fun togglingPersonalVisibilityHidesItsEventsWithoutDroppingTheData() = runTest {
        val viewModel = viewModel(repository())
        dispatcher.scheduler.advanceUntilIdle()
        viewModel.saveBlock(StudyBlock(id = "b1", title = "Revise CVS", date = "2026-09-10", start = "17:00", end = "18:00"))
        dispatcher.scheduler.advanceUntilIdle()

        viewModel.togglePersonal()
        dispatcher.scheduler.advanceUntilIdle()

        val state = viewModel.uiState.value as CalendarUiState.Content
        assertFalse(state.showPersonal)
        assertTrue(state.visibleEvents(LocalDate.of(2026, 9, 10)).isEmpty())
        assertEquals(1, state.blocks.size) // the block itself is still there
    }

    @Test
    fun setViewToWeekRebuildsTheGridAsSevenDaysAroundTheAnchor() = runTest {
        val viewModel = viewModel(repository())
        dispatcher.scheduler.advanceUntilIdle()

        viewModel.setView(CalendarViewMode.WEEK)
        dispatcher.scheduler.advanceUntilIdle()

        val state = viewModel.uiState.value as CalendarUiState.Content
        assertEquals(CalendarViewMode.WEEK, state.view)
        assertEquals(7, state.days.size)
        assertTrue(state.days.contains(LocalDate.of(2026, 9, 10)))
    }

    @Test
    fun shiftingAMonthMovesTheAnchorToTheFirstOfTheNextMonth() = runTest {
        val viewModel = viewModel(repository())
        dispatcher.scheduler.advanceUntilIdle()

        viewModel.shift(1)
        dispatcher.scheduler.advanceUntilIdle()

        val state = viewModel.uiState.value as CalendarUiState.Content
        assertEquals(LocalDate.of(2026, 10, 1), state.anchor)
    }

    @Test
    fun goToTodayResetsTheAnchorBackToNow() = runTest {
        val viewModel = viewModel(repository())
        dispatcher.scheduler.advanceUntilIdle()
        viewModel.shift(3)
        dispatcher.scheduler.advanceUntilIdle()

        viewModel.goToToday()
        dispatcher.scheduler.advanceUntilIdle()

        val state = viewModel.uiState.value as CalendarUiState.Content
        assertEquals(LocalDate.of(2026, 9, 10), state.anchor)
    }
}

// --- Fakes --------------------------------------------------------------------

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
    override suspend fun attempts(month: String): List<ModelAttemptRecord> =
        attemptsById.values.filter { it.month == month }
    override suspend fun putUserState(key: String, json: String, savedAt: String?, serverUpdatedAt: String?) {
        userState[key] = Triple(json, savedAt, serverUpdatedAt)
    }
    override suspend fun getUserState(key: String): String? = userState[key]?.first
    override suspend fun userStateSavedAt(key: String): String? = userState[key]?.second

    override suspend fun clearAll() {
        catalogue.clear(); outbox.clear(); attemptsById.clear(); userState.clear()
    }
}

private class VmFakeApi : SynapseApi {
    override suspend fun session(): SessionDto = SessionDto("u")
    override suspend fun manifest(): Manifest = emptyMap()
    override suspend fun getState(key: String): StateDoc = StateDoc(JsonNull)
    override suspend fun getUserState(key: String): StateDoc = StateDoc(JsonNull)
    override suspend fun putUserState(key: String, doc: StateDoc) { /* unused */ }
    override suspend fun getAttempts(month: String): List<ModelAttemptRecord> = emptyList()
    override suspend fun postAttempt(attempt: ModelAttemptRecord) { /* unused */ }
}
