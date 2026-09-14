package com.synapse.app.feature.university

import com.synapse.app.core.api.EnrollmentChangeRequest
import com.synapse.app.core.api.EnrollmentChangeSubmission
import com.synapse.app.core.api.EnrollmentField
import com.synapse.app.core.api.UniversityApi
import com.synapse.app.core.cache.LocalStore
import com.synapse.app.core.university.StudentUniversityProjection
import kotlinx.coroutines.CancellationException
import kotlinx.serialization.json.Json
import java.time.Instant
import javax.inject.Inject

/**
 * Local-only cache of the last successful `/api/me/university` read. Written
 * with [LocalStore.putUserState] directly rather than through
 * [com.synapse.app.core.sync.SyncEngine.write]: this is a read cache of
 * server-derived data, not a student-authored fact that needs to sync back
 * up, so it deliberately never touches the outbox.
 */
private const val CACHE_KEY = "local.university.projection.v1"

/** What one attempt to read the programme map came to. Offline (or any server failure) is a normal outcome, never a crash. */
sealed interface UniversityProjectionOutcome {
    data class Loaded(val projection: StudentUniversityProjection, val stale: Boolean) : UniversityProjectionOutcome
    data object Unavailable : UniversityProjectionOutcome
}

/**
 * The University data layer: reads the server-scoped programme/curriculum
 * projection ([projection]) and this student's own enrollment-change
 * requests ([enrollmentChangeRequests]), and submits new ones
 * ([requestEnrollmentChange]).
 *
 * Read-only beyond the change-request queue — there is no local editing of
 * the programme map itself, matching web's `LiveUniversity`
 * (`src/pages/student/University.tsx`), whose only source of truth is
 * `GET /api/me/university`. A successful read is cached locally so one
 * subsequent offline open still shows real, previously-seen data rather than
 * a blank screen; [UniversityProjectionOutcome.Loaded.stale] tells the caller
 * which case it got, so the screen can say so rather than passing off old
 * data as current.
 */
class UniversityRepository @Inject constructor(
    private val api: UniversityApi,
    private val localStore: LocalStore,
    private val json: Json,
) {

    suspend fun projection(now: Instant): UniversityProjectionOutcome = try {
        val fresh = api.getUniversity()
        localStore.putUserState(CACHE_KEY, json.encodeToString(StudentUniversityProjection.serializer(), fresh), now.toString(), now.toString())
        UniversityProjectionOutcome.Loaded(fresh, stale = false)
    } catch (e: CancellationException) {
        throw e
    } catch (e: Exception) {
        cached()?.let { UniversityProjectionOutcome.Loaded(it, stale = true) } ?: UniversityProjectionOutcome.Unavailable
    }

    /** This student's own change requests. Degrades to an empty list on failure — they are supplementary to the programme map, not worth failing the whole screen over. */
    suspend fun enrollmentChangeRequests(): List<EnrollmentChangeRequest> = try {
        api.getEnrollmentChangeRequests()
    } catch (e: CancellationException) {
        throw e
    } catch (e: Exception) {
        emptyList()
    }

    /** Submit an explicit enrollment-change request. Left uncaught (beyond the mandatory cancellation rethrow) — this is a deliberate user action, so its failure belongs on screen, not swallowed. */
    suspend fun requestEnrollmentChange(field: EnrollmentField, requestedValue: String, reason: String): EnrollmentChangeSubmission =
        api.submitEnrollmentChangeRequest(field, requestedValue, reason)

    private suspend fun cached(): StudentUniversityProjection? {
        val stored = localStore.getUserState(CACHE_KEY) ?: return null
        return runCatching { json.decodeFromString(StudentUniversityProjection.serializer(), stored) }.getOrNull()
    }
}
