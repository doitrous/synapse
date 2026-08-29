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
import retrofit2.http.Header
import retrofit2.http.POST
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

    private interface Service {
        @POST("qbank/attempts")
        suspend fun postAttempts(@Header("Authorization") auth: String, @Body body: VerifiedAttemptsBody): ResponseBody
    }
}
