package com.synapse.app.core.api

import com.synapse.app.core.config.AppConfig
import com.synapse.app.core.maristanas.MaristanaOverview
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
import retrofit2.http.PATCH
import retrofit2.http.POST
import retrofit2.http.Path
import java.io.IOException

/** Body for `POST /api/maristanas/study-heartbeat`. `bucket` is the wall-clock minute (`epochSeconds / 60`); the server refuses one too far from its own clock. */
@Serializable
data class StudyHeartbeatBody(
    val bucket: Long,
    val sessionId: String? = null,
    val moduleId: String? = null,
    val subjectId: String? = null,
    val surface: String? = null,
)

@Serializable
private data class StudyHeartbeatResponse(val ok: Boolean? = null, val accepted: Boolean? = null, val minuteBucket: Long? = null, val error: String? = null)

/** What one heartbeat attempt came to. */
sealed interface StudyHeartbeatResult {
    /** The minute bucket was recorded (or already had been — replaying the same bucket is harmless and still [accepted]=false only if some other bucket already owns that minute). */
    data class Recorded(val accepted: Boolean, val minuteBucket: Long) : StudyHeartbeatResult

    /** The server refused the bucket outright (400) — verbatim `error`, e.g. `invalid_minute_bucket`. */
    data class Refused(val reason: String) : StudyHeartbeatResult
}

@Serializable
private data class RenameHospitalBody(val name: String)

@Serializable
private data class RenameHospitalResponse(val ok: Boolean? = null, val slot: Int? = null, val name: String? = null, val error: String? = null)

/** What renaming a hospital slot came to. */
sealed interface RenameHospitalResult {
    data class Renamed(val slot: Int, val name: String) : RenameHospitalResult

    /**
     * The server refused the rename — verbatim `error`: `invalid_hospital` (400, a bad
     * slot/blank name) or `hospital_not_unlocked` (403, the slot has not been reached yet).
     */
    data class Refused(val reason: String) : RenameHospitalResult
}

interface MaristanaApi {
    /** The caller's own server-computed construction ledger (`GET /api/maristanas`). Scoped to the caller's JWT — no client identity needed. */
    suspend fun getOverview(): MaristanaOverview

    /** Record one active-study minute bucket (`POST /api/maristanas/study-heartbeat`). Callers must tie this to real, observed study presence — never a fabricated or synthetic tick. */
    suspend fun postStudyHeartbeat(body: StudyHeartbeatBody): StudyHeartbeatResult

    /** Rename a hospital slot the student has already reached (`PATCH /api/maristanas/:slot`). */
    suspend fun renameHospital(slot: Int, name: String): RenameHospitalResult
}

/**
 * The thin, stateless Retrofit-backed [MaristanaApi]. Mirrors [RetrofitQBankApi]/
 * [RetrofitLeaderboardApi]/[RetrofitUniversityApi]: the Supabase access token is
 * read fresh per request via [tokenProvider] and sent as a Bearer header.
 * Transport/HTTP failures are mapped to [ApiException]; the heartbeat and rename
 * endpoints are the exception — each answers a normal refusal with a 4xx *and*
 * a JSON body naming why, so those two paths read the error body into a typed
 * result before falling back to [ApiException].
 */
class RetrofitMaristanaApi(
    baseUrl: String,
    private val tokenProvider: suspend () -> String?,
    okHttp: OkHttpClient = OkHttpClient(),
    private val json: Json = Json { ignoreUnknownKeys = true },
) : MaristanaApi {

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

    override suspend fun getOverview(): MaristanaOverview = call { service.getOverview(bearer()) }

    override suspend fun postStudyHeartbeat(body: StudyHeartbeatBody): StudyHeartbeatResult = try {
        toHeartbeatResult(service.postStudyHeartbeat(bearer(), body))
    } catch (e: CancellationException) {
        throw e
    } catch (e: HttpException) {
        when (e.code()) {
            401 -> throw ApiException(ApiError.Unauthorized)
            403 -> throw ApiException(ApiError.Forbidden)
            400 -> toHeartbeatResult(errorBodyOf(e, StudyHeartbeatResponse.serializer()) ?: throw ApiException(ApiError.Retryable(e)))
            else -> throw ApiException(ApiError.Retryable(e))
        }
    } catch (e: IOException) {
        throw ApiException(ApiError.Retryable(e))
    }

    override suspend fun renameHospital(slot: Int, name: String): RenameHospitalResult = try {
        toRenameResult(service.renameHospital(bearer(), slot, RenameHospitalBody(name)))
    } catch (e: CancellationException) {
        throw e
    } catch (e: HttpException) {
        when (e.code()) {
            401 -> throw ApiException(ApiError.Unauthorized)
            400, 403 -> toRenameResult(errorBodyOf(e, RenameHospitalResponse.serializer()) ?: throw ApiException(ApiError.Retryable(e)))
            else -> throw ApiException(ApiError.Retryable(e))
        }
    } catch (e: IOException) {
        throw ApiException(ApiError.Retryable(e))
    }

    private fun <T> errorBodyOf(e: HttpException, serializer: kotlinx.serialization.KSerializer<T>): T? =
        e.response()?.errorBody()?.string()?.let { raw ->
            runCatching { json.decodeFromString(serializer, raw) }.getOrNull()
        }

    private fun toHeartbeatResult(response: StudyHeartbeatResponse): StudyHeartbeatResult =
        response.error?.let { StudyHeartbeatResult.Refused(it) }
            ?: StudyHeartbeatResult.Recorded(accepted = response.accepted ?: false, minuteBucket = response.minuteBucket ?: 0L)

    private fun toRenameResult(response: RenameHospitalResponse): RenameHospitalResult =
        response.error?.let { RenameHospitalResult.Refused(it) }
            ?: RenameHospitalResult.Renamed(slot = response.slot ?: -1, name = response.name.orEmpty())

    private interface Service {
        @GET("maristanas")
        suspend fun getOverview(@Header("Authorization") auth: String): MaristanaOverview

        @POST("maristanas/study-heartbeat")
        suspend fun postStudyHeartbeat(@Header("Authorization") auth: String, @Body body: StudyHeartbeatBody): StudyHeartbeatResponse

        @PATCH("maristanas/{slot}")
        suspend fun renameHospital(@Header("Authorization") auth: String, @Path("slot") slot: Int, @Body body: RenameHospitalBody): RenameHospitalResponse
    }
}
