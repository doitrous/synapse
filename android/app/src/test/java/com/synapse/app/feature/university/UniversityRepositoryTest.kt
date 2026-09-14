package com.synapse.app.feature.university

import com.synapse.app.core.api.EnrollmentChangeRequest
import com.synapse.app.core.api.EnrollmentChangeSubmission
import com.synapse.app.core.api.EnrollmentField
import com.synapse.app.core.api.UniversityApi
import com.synapse.app.core.cache.LocalStore
import com.synapse.app.core.cache.OutboxEntry
import com.synapse.app.core.model.AttemptRecord
import com.synapse.app.core.university.ProjectionUniversity
import com.synapse.app.core.university.StudentUniversityProjection
import kotlinx.coroutines.test.runTest
import kotlinx.serialization.json.Json
import org.junit.Assert.assertEquals
import org.junit.Assert.assertTrue
import org.junit.Test
import java.time.Instant

/**
 * [UniversityRepository] reads through [UniversityApi] and caches the last
 * successful projection locally so an offline re-open still shows real,
 * previously-seen data (never fabricated) rather than nothing at all.
 */
class UniversityRepositoryTest {

    private val json = Json { ignoreUnknownKeys = true }
    private val now = Instant.parse("2026-08-29T12:00:00Z")

    @Test
    fun projectionReturnsTheFreshReadAndCachesIt() = runTest {
        val api = FakeUniversityApi(projection = StudentUniversityProjection(status = "ready", university = ProjectionUniversity("hu", "Helwan University", "HU", "Cairo")))
        val localStore = FakeLocalStore()
        val repository = UniversityRepository(api, localStore, json)

        val outcome = repository.projection(now)

        assertTrue(outcome is UniversityProjectionOutcome.Loaded)
        outcome as UniversityProjectionOutcome.Loaded
        assertEquals(false, outcome.stale)
        assertEquals("hu", outcome.projection.university?.id)
        assertTrue(localStore.userState.containsKey("local.university.projection.v1"))
    }

    @Test
    fun projectionFallsBackToTheCacheWhenTheNetworkFails() = runTest {
        val api = FakeUniversityApi(projection = StudentUniversityProjection(status = "ready", university = ProjectionUniversity("hu", "Helwan University", "HU", "Cairo")))
        val localStore = FakeLocalStore()
        val repository = UniversityRepository(api, localStore, json)
        repository.projection(now) // seeds the cache with a good read

        api.shouldFail = true
        val outcome = repository.projection(now)

        assertTrue(outcome is UniversityProjectionOutcome.Loaded)
        outcome as UniversityProjectionOutcome.Loaded
        assertEquals(true, outcome.stale)
        assertEquals("hu", outcome.projection.university?.id)
    }

    @Test
    fun projectionIsUnavailableWhenTheNetworkFailsAndNothingIsCached() = runTest {
        val api = FakeUniversityApi(projection = StudentUniversityProjection())
        api.shouldFail = true
        val repository = UniversityRepository(api, FakeLocalStore(), json)

        val outcome = repository.projection(now)

        assertEquals(UniversityProjectionOutcome.Unavailable, outcome)
    }

    @Test
    fun enrollmentChangeRequestsDegradesToEmptyOnFailureRatherThanFailingTheScreen() = runTest {
        val api = FakeUniversityApi(projection = StudentUniversityProjection())
        api.shouldFailRequests = true
        val repository = UniversityRepository(api, FakeLocalStore(), json)

        assertTrue(repository.enrollmentChangeRequests().isEmpty())
    }

    @Test
    fun requestEnrollmentChangeDelegatesStraightToTheApi() = runTest {
        val api = FakeUniversityApi(projection = StudentUniversityProjection())
        val repository = UniversityRepository(api, FakeLocalStore(), json)

        val result = repository.requestEnrollmentChange(EnrollmentField.Year, "Year 3", "promoted this term")

        assertTrue(result is EnrollmentChangeSubmission.Submitted)
    }
}

// --- Fakes --------------------------------------------------------------------

private class FakeUniversityApi(private val projection: StudentUniversityProjection) : UniversityApi {
    var shouldFail = false
    var shouldFailRequests = false

    override suspend fun getUniversity(): StudentUniversityProjection {
        if (shouldFail) throw RuntimeException("offline")
        return projection
    }

    override suspend fun getEnrollmentChangeRequests(): List<EnrollmentChangeRequest> {
        if (shouldFailRequests) throw RuntimeException("offline")
        return emptyList()
    }

    override suspend fun submitEnrollmentChangeRequest(field: EnrollmentField, requestedValue: String, reason: String): EnrollmentChangeSubmission =
        EnrollmentChangeSubmission.Submitted(EnrollmentChangeRequest(id = "r1", field = field.wireValue, requestedValue = requestedValue, reason = reason, status = "pending"))
}

private class FakeLocalStore : LocalStore {
    val catalogue = linkedMapOf<String, Pair<String, String>>()
    val outbox = linkedMapOf<String, String>()
    val attemptsById = linkedMapOf<String, AttemptRecord>()
    val userState = linkedMapOf<String, Triple<String, String?, String?>>()

    override suspend fun putCatalogue(key: String, updatedAt: String, json: String) {
        catalogue[key] = updatedAt to json
    }

    override suspend fun catalogueUpdatedAt(key: String): String? = catalogue[key]?.first
    override suspend fun getCatalogue(key: String): String? = catalogue[key]?.second
    override suspend fun enqueue(key: String, json: String) { outbox[key] = json }
    override suspend fun pendingOutbox(): List<OutboxEntry> = outbox.map { OutboxEntry(it.key, it.value) }
    override suspend fun clearOutbox(key: String) { outbox.remove(key) }
    override suspend fun putAttempts(items: List<AttemptRecord>) { items.forEach { attemptsById[it.id] = it } }
    override suspend fun attempts(month: String): List<AttemptRecord> = attemptsById.values.filter { it.month == month }
    override suspend fun putUserState(key: String, json: String, savedAt: String?, serverUpdatedAt: String?) {
        userState[key] = Triple(json, savedAt, serverUpdatedAt)
    }
    override suspend fun getUserState(key: String): String? = userState[key]?.first
    override suspend fun userStateSavedAt(key: String): String? = userState[key]?.second
    override suspend fun clearAll() {
        catalogue.clear(); outbox.clear(); attemptsById.clear(); userState.clear()
    }
}
