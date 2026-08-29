package com.synapse.app.core.api

import com.synapse.app.core.config.AppConfig
import com.synapse.app.core.model.AttemptRecord
import com.synapse.app.core.model.Manifest
import com.synapse.app.core.model.SessionDto
import com.synapse.app.core.model.StateDoc
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
import retrofit2.http.PUT
import retrofit2.http.Path
import retrofit2.http.Query
import java.io.IOException

/**
 * The thin, stateless Retrofit-backed [SynapseApi]. It holds no cache and no
 * state — [com.synapse.app.core.sync.SyncEngine] owns those. The Supabase access
 * token is read fresh per request via [tokenProvider] (transparent SDK refresh)
 * and sent as a Bearer header. HTTP failures are mapped to [ApiException] so the
 * sync engine can class them: 401 → Unauthorized, 403 → Forbidden, else Retryable.
 */
class RetrofitSynapseApi(
    baseUrl: String,
    private val tokenProvider: suspend () -> String?,
    okHttp: OkHttpClient = OkHttpClient(),
    json: Json = Json { ignoreUnknownKeys = true },
) : SynapseApi {

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

    override suspend fun session(): SessionDto = call { service.session(bearer()) }
    override suspend fun manifest(): Manifest = call { service.manifest(bearer()) }
    override suspend fun getState(key: String): StateDoc = call { service.getState(bearer(), key) }
    override suspend fun getUserState(key: String): StateDoc = call { service.getUserState(bearer(), key) }
    override suspend fun putUserState(key: String, doc: StateDoc) {
        call { service.putUserState(bearer(), key, doc).close() }
    }
    override suspend fun getAttempts(month: String): List<AttemptRecord> = call { service.getAttempts(bearer(), month) }
    override suspend fun postAttempt(attempt: AttemptRecord) {
        call { service.postAttempt(bearer(), attempt).close() }
    }

    private interface Service {
        @GET("session")
        suspend fun session(@Header("Authorization") auth: String): SessionDto

        @GET("state/manifest")
        suspend fun manifest(@Header("Authorization") auth: String): Map<String, String>

        @GET("state/{key}")
        suspend fun getState(@Header("Authorization") auth: String, @Path("key") key: String): StateDoc

        @GET("user-state/{key}")
        suspend fun getUserState(@Header("Authorization") auth: String, @Path("key") key: String): StateDoc

        @PUT("user-state/{key}")
        suspend fun putUserState(@Header("Authorization") auth: String, @Path("key") key: String, @Body doc: StateDoc): ResponseBody

        @GET("qbank/attempts")
        suspend fun getAttempts(@Header("Authorization") auth: String, @Query("month") month: String): List<AttemptRecord>

        @POST("qbank/attempts")
        suspend fun postAttempt(@Header("Authorization") auth: String, @Body attempt: AttemptRecord): ResponseBody
    }
}
