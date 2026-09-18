package com.synapse.app.core.api

import com.synapse.app.core.config.AppConfig
import com.synapse.app.core.model.Manifest
import com.synapse.app.core.model.SessionDto
import com.synapse.app.core.model.StateDoc
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
import retrofit2.http.PUT
import retrofit2.http.Path
import java.io.IOException

/**
 * The thin, stateless Retrofit-backed [SynapseApi]. It holds no cache and no
 * state — [com.synapse.app.core.sync.SyncEngine] owns those. The Supabase access
 * token is read fresh per request via [tokenProvider] (transparent SDK refresh)
 * and sent as a Bearer header. HTTP failures are mapped to [ApiException] so the
 * sync engine can class them: 401 → Unauthorized, 403 → Forbidden, else Retryable.
 */
/** Wrapper for `GET /api/state/manifest`, whose body is `{ "keys": { ... } }` with nullable values. */
@Serializable
private data class ManifestResponse(val keys: Map<String, String?> = emptyMap())

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
    override suspend fun manifest(): Manifest = call {
        // Server shape is { "keys": { <key>: <updatedAt|null> } }. Drop the keys the
        // server has never written (null) so pullCatalogues diffs only real content;
        // without this unwrap the whole manifest-diff fell back to refetching every key.
        service.manifest(bearer()).keys.filterValues { it != null }.mapValues { it.value!! }
    }
    override suspend fun getState(key: String): StateDoc = call { service.getState(bearer(), key) }
    override suspend fun getUserState(key: String): StateDoc = call { service.getUserState(bearer(), key) }
    override suspend fun putUserState(key: String, doc: StateDoc) {
        call { service.putUserState(bearer(), key, doc).close() }
    }

    private interface Service {
        @GET("session")
        suspend fun session(@Header("Authorization") auth: String): SessionDto

        @GET("state/manifest")
        suspend fun manifest(@Header("Authorization") auth: String): ManifestResponse

        @GET("state/{key}")
        suspend fun getState(@Header("Authorization") auth: String, @Path("key") key: String): StateDoc

        @GET("user-state/{key}")
        suspend fun getUserState(@Header("Authorization") auth: String, @Path("key") key: String): StateDoc

        @PUT("user-state/{key}")
        suspend fun putUserState(@Header("Authorization") auth: String, @Path("key") key: String, @Body doc: StateDoc): ResponseBody
    }
}
