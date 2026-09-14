package com.synapse.app.core.api

import com.synapse.app.core.config.AppConfig
import com.synapse.app.core.university.StudentUniversityProjection
import kotlinx.coroutines.CancellationException
import kotlinx.serialization.Serializable
import kotlinx.serialization.json.Json
import okhttp3.MediaType.Companion.toMediaType
import okhttp3.OkHttpClient
import retrofit2.HttpException
import retrofit2.Retrofit
import com.jakewharton.retrofit2.converter.kotlinx.serialization.asConverterFactory
import retrofit2.http.Body
import retrofit2.http.GET
import retrofit2.http.Header
import retrofit2.http.POST
import java.io.IOException

/** One of this student's own rows from `enrollment_change_requests`, exactly as the server shapes it. */
@Serializable
data class EnrollmentChangeRequest(
    val id: String,
    val field: String,
    val currentValue: String? = null,
    val requestedValue: String,
    val reason: String,
    val status: String,
    val adminNote: String? = null,
    val reviewedBy: String? = null,
    val reviewedAt: String? = null,
    val createdAt: String? = null,
    val updatedAt: String? = null,
)

/** Which enrolment fact a change request targets — the only two `cleanField` in `enrollmentChanges.js` accepts. */
enum class EnrollmentField(val wireValue: String) { University("university"), Year("year") }

/** What submitting a change request came to. */
sealed interface EnrollmentChangeSubmission {
    data class Submitted(val request: EnrollmentChangeRequest) : EnrollmentChangeSubmission

    /**
     * The server refused the request outright (400/409) rather than a
     * transport failure. [reason] is the server's own error code verbatim —
     * `invalid_field`, `requested_value_required`, `reason_required`,
     * `profile_incomplete`, `unchanged`, or `pending_exists` (with
     * [pendingRequestId] set) — surfaced rather than reworded, so the UI
     * never claims more certainty than the server gave it.
     */
    data class Refused(val reason: String, val pendingRequestId: String? = null) : EnrollmentChangeSubmission
}

interface UniversityApi {
    /** The authenticated student's own programme/curriculum map (`GET /api/me/university`). Server-scoped to the caller's JWT. */
    suspend fun getUniversity(): StudentUniversityProjection

    /** This student's own enrollment-change requests, most recent first (`GET /api/me/enrollment-change-requests`). */
    suspend fun getEnrollmentChangeRequests(): List<EnrollmentChangeRequest>

    /** Submit an explicit request to change [field] to [requestedValue] (`POST /api/me/enrollment-change-requests`). [reason] must be at least 12 characters — the server rejects shorter ones. */
    suspend fun submitEnrollmentChangeRequest(field: EnrollmentField, requestedValue: String, reason: String): EnrollmentChangeSubmission
}

/**
 * The thin, stateless Retrofit-backed [UniversityApi]. Mirrors
 * [RetrofitQBankApi]/[RetrofitLeaderboardApi]: the Supabase access token is
 * read fresh per request via [tokenProvider] and sent as a Bearer header, and
 * transport/HTTP failures are mapped to [ApiException]. The submit endpoint
 * is the one exception: the server answers a refusal with a 400/409 status
 * *and* a JSON body explaining why, so that one path reads the error body
 * before falling back to [ApiException].
 */
class RetrofitUniversityApi(
    baseUrl: String,
    private val tokenProvider: suspend () -> String?,
    okHttp: OkHttpClient = OkHttpClient(),
    private val json: Json = Json { ignoreUnknownKeys = true },
) : UniversityApi {

    /** Construct from [AppConfig] (production path). */
    constructor(config: AppConfig, tokenProvider: suspend () -> String?) : this(config.apiBase, tokenProvider)

    private val service: Service = Retrofit.Builder()
        .baseUrl(if (baseUrl.endsWith("/")) baseUrl else "$baseUrl/")
        .client(okHttp)
        .addConverterFactory(json.asConverterFactory("application/json".toMediaType()))
        .build()
        .create(Service::class.java)

    private suspend fun bearer(): String = "Bearer ${tokenProvider() ?: ""}"

    /** Run one call, translating HTTP/transport failures into [ApiException]. */
    private suspend fun <T> call(block: suspend () -> T): T = try {
        block()
    } catch (e: CancellationException) {
        throw e
    } catch (e: HttpException) {
        throw ApiException(
            when (e.code()) {
                401 -> ApiError.Unauthorized
                403 -> ApiError.Forbidden
                else -> ApiError.Retryable(e)
            }
        )
    } catch (e: IOException) {
        throw ApiException(ApiError.Retryable(e))
    }

    override suspend fun getUniversity(): StudentUniversityProjection = call { service.getUniversity(bearer()) }

    override suspend fun getEnrollmentChangeRequests(): List<EnrollmentChangeRequest> =
        call { service.getEnrollmentChangeRequests(bearer()) }.requests

    override suspend fun submitEnrollmentChangeRequest(
        field: EnrollmentField,
        requestedValue: String,
        reason: String,
    ): EnrollmentChangeSubmission = try {
        val response = service.submitEnrollmentChangeRequest(
            bearer(),
            SubmitEnrollmentChangeBody(field.wireValue, requestedValue, reason),
        )
        toSubmission(response)
    } catch (e: CancellationException) {
        throw e
    } catch (e: HttpException) {
        when (e.code()) {
            401 -> throw ApiException(ApiError.Unauthorized)
            403 -> throw ApiException(ApiError.Forbidden)
            else -> toSubmission(errorBodyOf(e) ?: throw ApiException(ApiError.Retryable(e)))
        }
    } catch (e: IOException) {
        throw ApiException(ApiError.Retryable(e))
    }

    private fun errorBodyOf(e: HttpException): SubmitEnrollmentChangeResponse? =
        e.response()?.errorBody()?.string()?.let { raw ->
            runCatching { json.decodeFromString(SubmitEnrollmentChangeResponse.serializer(), raw) }.getOrNull()
        }

    private fun toSubmission(response: SubmitEnrollmentChangeResponse): EnrollmentChangeSubmission =
        response.request?.let { EnrollmentChangeSubmission.Submitted(it) }
            ?: EnrollmentChangeSubmission.Refused(response.error ?: "unknown_error", response.id)

    private interface Service {
        @GET("me/university")
        suspend fun getUniversity(@Header("Authorization") auth: String): StudentUniversityProjection

        @GET("me/enrollment-change-requests")
        suspend fun getEnrollmentChangeRequests(@Header("Authorization") auth: String): EnrollmentChangeRequestsResponse

        @POST("me/enrollment-change-requests")
        suspend fun submitEnrollmentChangeRequest(
            @Header("Authorization") auth: String,
            @Body body: SubmitEnrollmentChangeBody,
        ): SubmitEnrollmentChangeResponse
    }
}

@Serializable
private data class EnrollmentChangeRequestsResponse(val requests: List<EnrollmentChangeRequest> = emptyList())

@Serializable
private data class SubmitEnrollmentChangeBody(val field: String, val requestedValue: String, val reason: String)

@Serializable
private data class SubmitEnrollmentChangeResponse(
    val ok: Boolean? = null,
    val request: EnrollmentChangeRequest? = null,
    val error: String? = null,
    val id: String? = null,
)
