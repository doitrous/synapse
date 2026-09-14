package com.synapse.app.core.api

import com.synapse.app.core.config.AppConfig
import kotlinx.serialization.Serializable
import kotlinx.serialization.json.Json
import okhttp3.MediaType.Companion.toMediaType
import okhttp3.OkHttpClient
import okhttp3.ResponseBody
import retrofit2.HttpException
import retrofit2.Retrofit
import com.jakewharton.retrofit2.converter.kotlinx.serialization.asConverterFactory
import retrofit2.http.Body
import retrofit2.http.GET
import retrofit2.http.Header
import retrofit2.http.POST
import retrofit2.http.Path
import java.io.IOException

/** One attempt as submitted for server-side re-grading/verification. */
@Serializable
data class VerifiedAttempt(
    val attemptId: String,
    val sessionId: String,
    val questionId: String,
    val answerIndex: Int,
    val seconds: Int? = null,
    val sessionDurationSeconds: Int? = null,
    val overtimeSeconds: Int? = null,
    val answeredAt: String,
)

@Serializable
data class VerifiedAttemptsBody(val attempts: List<VerifiedAttempt>)

interface QBankApi {
    suspend fun postAttempts(body: VerifiedAttemptsBody)

    /** Raw bytes for one media asset, by its (already sha-derived) id. Caller closes the body. */
    suspend fun getMedia(id: String): ResponseBody

    /**
     * Raw bytes for one source document from the resources library
     * (`GET /api/medical-resources/:id`), by its id. Caller closes the body.
     *
     * Defaulted rather than added to every existing [QBankApi] fake: this is
     * a distinct endpoint from [getMedia] (a different storage root, and the
     * server transparently 302s to an external host when the resource has no
     * stored bytes), so a test double that never opens a resource document
     * needs no changes to keep compiling.
     */
    suspend fun getMedicalResource(id: String): ResponseBody =
        throw UnsupportedOperationException("getMedicalResource not implemented")
}

/**
 * The thin, stateless Retrofit-backed [QBankApi]. Mirrors [RetrofitSynapseApi]:
 * the Supabase access token is read fresh per request via [tokenProvider] and
 * sent as a Bearer header, and HTTP failures are mapped to [ApiException] so
 * callers can class them: 401 → Unauthorized, 403 → Forbidden, else Retryable.
 */
class RetrofitQBankApi(
    baseUrl: String,
    private val tokenProvider: suspend () -> String?,
    okHttp: OkHttpClient = OkHttpClient(),
    json: Json = Json { ignoreUnknownKeys = true },
) : QBankApi {

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

    override suspend fun postAttempts(body: VerifiedAttemptsBody) {
        call { service.postAttempts(bearer(), body).close() }
    }

    override suspend fun getMedia(id: String): ResponseBody = call { service.getMedia(bearer(), id) }

    override suspend fun getMedicalResource(id: String): ResponseBody = call { service.getMedicalResource(bearer(), id) }

    private interface Service {
        @POST("qbank/attempts")
        suspend fun postAttempts(@Header("Authorization") auth: String, @Body body: VerifiedAttemptsBody): ResponseBody

        @GET("media/{id}")
        suspend fun getMedia(@Header("Authorization") auth: String, @Path("id") id: String): ResponseBody

        @GET("medical-resources/{id}")
        suspend fun getMedicalResource(@Header("Authorization") auth: String, @Path("id") id: String): ResponseBody
    }
}
