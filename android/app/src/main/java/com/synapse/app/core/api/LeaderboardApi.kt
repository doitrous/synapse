package com.synapse.app.core.api

import com.synapse.app.core.config.AppConfig
import kotlinx.serialization.Serializable
import kotlinx.serialization.json.Json
import okhttp3.MediaType.Companion.toMediaType
import okhttp3.OkHttpClient
import retrofit2.HttpException
import retrofit2.Retrofit
import com.jakewharton.retrofit2.converter.kotlinx.serialization.asConverterFactory
import retrofit2.http.GET
import retrofit2.http.Header
import retrofit2.http.Query
import java.io.IOException

/** One anonymous row on the leaderboard. Never carries anything that identifies the student besides their own chosen username. */
@Serializable
data class LeaderboardRow(
    val rank: Int,
    val username: String,
    val profileIcon: String? = null,
    val accuracy: Double? = null,
    val verifiedAnswers: Int? = null,
    val securedConcepts: Int? = null,
    val lastVerifiedAt: String? = null,
)

/** The cohort this board is scoped to, server-side — university + year + term. */
@Serializable
data class LeaderboardScope(
    val university: String? = null,
    val year: String? = null,
    val term: String? = null,
)

/** Whether the caller themself is eligible to appear, and how close they are if not. */
@Serializable
data class LeaderboardViewer(
    val eligible: Boolean,
    val verifiedAnswers: Int? = null,
    val requiredAnswers: Int? = null,
)

@Serializable
data class LeaderboardResponse(
    val rows: List<LeaderboardRow> = emptyList(),
    val scope: LeaderboardScope? = null,
    val viewer: LeaderboardViewer? = null,
)

/** Which figure the board ranks by — the two metrics `GET /leaderboards` accepts. */
enum class LeaderboardMetric(val wireValue: String) {
    ConceptsMastered("conceptsMastered"),
    PercentCorrect("percentCorrect"),
}

interface LeaderboardApi {
    suspend fun getLeaderboard(metric: LeaderboardMetric): LeaderboardResponse
}

/**
 * The thin, stateless Retrofit-backed [LeaderboardApi]. Mirrors [RetrofitQBankApi]/
 * [RetrofitSynapseApi]: the Supabase access token is read fresh per request via
 * [tokenProvider] and sent as a Bearer header, and HTTP failures are mapped to
 * [ApiException] so callers can class them: 401 → Unauthorized, 403 → Forbidden,
 * else Retryable. The server scopes rows to the caller's own university/year —
 * this client sends no cohort of its own.
 */
class RetrofitLeaderboardApi(
    baseUrl: String,
    private val tokenProvider: suspend () -> String?,
    okHttp: OkHttpClient = OkHttpClient(),
    json: Json = Json { ignoreUnknownKeys = true },
) : LeaderboardApi {

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

    override suspend fun getLeaderboard(metric: LeaderboardMetric): LeaderboardResponse =
        call { service.getLeaderboard(bearer(), metric.wireValue) }

    private interface Service {
        @GET("leaderboards")
        suspend fun getLeaderboard(
            @Header("Authorization") auth: String,
            @Query("metric") metric: String,
        ): LeaderboardResponse
    }
}
