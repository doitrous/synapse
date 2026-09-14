package com.synapse.app.feature.university

import com.synapse.app.core.api.ApiError
import com.synapse.app.core.api.ApiException
import com.synapse.app.core.api.EnrollmentChangeRequest
import com.synapse.app.core.api.EnrollmentChangeSubmission
import com.synapse.app.core.api.EnrollmentField
import com.synapse.app.core.api.UniversityApi
import com.synapse.app.core.cache.LocalStore
import com.synapse.app.core.cache.OutboxEntry
import com.synapse.app.core.model.AttemptRecord
import com.synapse.app.core.university.ProjectionModule
import com.synapse.app.core.university.ProjectionTerm
import com.synapse.app.core.university.ProjectionUniversity
import com.synapse.app.core.university.ProjectionYear
import com.synapse.app.core.university.StudentUniversityProjection
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.ExperimentalCoroutinesApi
import kotlinx.coroutines.test.StandardTestDispatcher
import kotlinx.coroutines.test.resetMain
import kotlinx.coroutines.test.runTest
import kotlinx.coroutines.test.setMain
import kotlinx.serialization.json.Json
import org.junit.After
import org.junit.Assert.assertEquals
import org.junit.Assert.assertTrue
import org.junit.Before
import org.junit.Test
import java.time.Instant

/** [UniversityViewModel] built against a real [UniversityRepository] wired to hand-written fakes, the same convention as `LibraryViewModelTest`. */
@OptIn(ExperimentalCoroutinesApi::class)
class UniversityViewModelTest {

    private val dispatcher = StandardTestDispatcher()
    private val json = Json { ignoreUnknownKeys = true }
    private val now = Instant.parse("2026-08-29T12:00:00Z")

    @Before fun setUp() { Dispatchers.setMain(dispatcher) }
    @After fun tearDown() { Dispatchers.resetMain() }

    private fun viewModel(api: FakeApi, localStore: VmFakeLocalStore = VmFakeLocalStore()): UniversityViewModel =
        UniversityViewModel(UniversityRepository(api, localStore, json)).apply { now = { this@UniversityViewModelTest.now } }

    @Test
    fun loadShapesTheReadyProjectionIntoContent() = runTest {
        val projection = StudentUniversityProjection(
            status = "ready",
            university = ProjectionUniversity("hu", "Helwan University", "HU", "Cairo"),
            year = ProjectionYear("HU_Y2", "Year 2"),
            terms = listOf(ProjectionTerm("Term 1", listOf(ProjectionModule(id = "inh", name = "INH 201")))),
        )
        val viewModel = viewModel(FakeApi(projection))
        dispatcher.scheduler.advanceUntilIdle()

        val state = viewModel.uiState.value
        assertTrue(state is UniversityUiState.Content)
        state as UniversityUiState.Content
        assertEquals(false, state.stale)
        assertEquals(1, state.map.modules.size)
        assertEquals("inh", state.map.modules.single().id)
    }

    @Test
    fun loadFallsToUnavailableWhenThereIsNoNetworkAndNoCache() = runTest {
        val api = FakeApi(StudentUniversityProjection())
        api.shouldFail = true
        val viewModel = viewModel(api)
        dispatcher.scheduler.advanceUntilIdle()

        assertEquals(UniversityUiState.Unavailable, viewModel.uiState.value)
    }

    @Test
    fun submitChangeRequestPublishesTheRefusalReasonAndDoesNotReload() = runTest {
        val api = FakeApi(StudentUniversityProjection(status = "missing_profile"))
        api.submission = EnrollmentChangeSubmission.Refused("pending_exists", "existing-1")
        val viewModel = viewModel(api)
        dispatcher.scheduler.advanceUntilIdle()

        viewModel.submitChangeRequest(EnrollmentField.Year, "Year 3", "promoted this term")
        dispatcher.scheduler.advanceUntilIdle()

        assertEquals(ChangeRequestResult.Refused("pending_exists"), viewModel.lastChangeRequestResult.value)

        viewModel.consumeChangeRequestResult()
        assertEquals(null, viewModel.lastChangeRequestResult.value)
    }

    @Test
    fun submitChangeRequestPublishesFailedOnATransportError() = runTest {
        val api = FakeApi(StudentUniversityProjection(status = "missing_profile"))
        api.submitError = ApiException(ApiError.Retryable(RuntimeException("offline")))
        val viewModel = viewModel(api)
        dispatcher.scheduler.advanceUntilIdle()

        viewModel.submitChangeRequest(EnrollmentField.University, "cu", "transferred universities")
        dispatcher.scheduler.advanceUntilIdle()

        assertEquals(ChangeRequestResult.Failed, viewModel.lastChangeRequestResult.value)
    }

    @Test
    fun submitChangeRequestReloadsOnSuccess() = runTest {
        val api = FakeApi(StudentUniversityProjection(status = "missing_profile"))
        api.submission = EnrollmentChangeSubmission.Submitted(
            EnrollmentChangeRequest(id = "r1", field = "year", requestedValue = "Year 3", reason = "promoted this term", status = "pending"),
        )
        val viewModel = viewModel(api)
        dispatcher.scheduler.advanceUntilIdle()

        viewModel.submitChangeRequest(EnrollmentField.Year, "Year 3", "promoted this term")
        dispatcher.scheduler.advanceUntilIdle()

        assertEquals(ChangeRequestResult.Submitted, viewModel.lastChangeRequestResult.value)
        // Once from the initial load(), once from submitChangeRequest's reload after a Submitted result.
        assertEquals(2, api.getRequestsCallCount)
    }
}

// --- Fakes --------------------------------------------------------------------

private class FakeApi(private val projection: StudentUniversityProjection) : UniversityApi {
    var shouldFail = false
    var submission: EnrollmentChangeSubmission = EnrollmentChangeSubmission.Submitted(
        EnrollmentChangeRequest(id = "r1", field = "year", requestedValue = "x", reason = "y", status = "pending"),
    )
    var submitError: Exception? = null
    var getRequestsCallCount = 0

    override suspend fun getUniversity(): StudentUniversityProjection {
        if (shouldFail) throw RuntimeException("offline")
        return projection
    }

    override suspend fun getEnrollmentChangeRequests(): List<EnrollmentChangeRequest> {
        getRequestsCallCount++
        return emptyList()
    }

    override suspend fun submitEnrollmentChangeRequest(field: EnrollmentField, requestedValue: String, reason: String): EnrollmentChangeSubmission {
        submitError?.let { throw it }
        return submission
    }
}

private class VmFakeLocalStore : LocalStore {
    val userState = linkedMapOf<String, String>()
    override suspend fun putCatalogue(key: String, updatedAt: String, json: String) {}
    override suspend fun catalogueUpdatedAt(key: String): String? = null
    override suspend fun getCatalogue(key: String): String? = null
    override suspend fun enqueue(key: String, json: String) {}
    override suspend fun pendingOutbox(): List<OutboxEntry> = emptyList()
    override suspend fun clearOutbox(key: String) {}
    override suspend fun putAttempts(items: List<AttemptRecord>) {}
    override suspend fun attempts(month: String): List<AttemptRecord> = emptyList()
    override suspend fun putUserState(key: String, json: String, savedAt: String?, serverUpdatedAt: String?) { userState[key] = json }
    override suspend fun getUserState(key: String): String? = userState[key]
    override suspend fun userStateSavedAt(key: String): String? = null
    override suspend fun clearAll() { userState.clear() }
}
