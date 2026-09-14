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
import retrofit2.http.DELETE
import retrofit2.http.GET
import retrofit2.http.Header
import retrofit2.http.POST
import retrofit2.http.PUT
import java.io.IOException

/** The signed-in identity half of `GET /api/me` — always present. */
@Serializable
data class MeUser(
    val id: String,
    val email: String? = null,
    val role: String? = null,
)

/**
 * The roster row half of `GET /api/me` — null when this student's university
 * has not set one up yet ("your university hasn't set up your profile yet"
 * is a state to render, not an error — see the server's own doc comment on
 * this route). [universityId]/[year] are what onboarding/enrolment typed;
 * [yearId] is the server-derived scoping id (e.g. `KAU_Y3`).
 */
@Serializable
data class MeProfile(
    val studentId: String? = null,
    val name: String? = null,
    val email: String? = null,
    val universityId: String? = null,
    val year: String? = null,
    val yearId: String? = null,
    val group: String? = null,
    val status: String? = null,
    val username: String? = null,
    val profileIcon: String? = null,
    val discoverable: Boolean? = null,
    val socialProvider: String? = null,
)

@Serializable
data class MeEntitlement(
    val state: String? = null,
    val plan: String? = null,
    val expiresAt: String? = null,
    val daysLeft: Int? = null,
)

@Serializable
data class MeResponse(
    val user: MeUser,
    val profile: MeProfile? = null,
    val entitlement: MeEntitlement? = null,
)

/**
 * Body for `PUT /api/me/enrolment`. [group] is the only field this app ever
 * changes once a university/year is on record — the server locks those two
 * and answers `enrollment_locked` (a 409, surfaced as [ApiException] via
 * [RetrofitAccountApi.call]) if they're sent changed.
 */
@Serializable
data class EnrolmentRequest(
    val universityId: String,
    val year: String,
    val group: String? = null,
)

/**
 * `PUT /api/me/enrolment`'s success body carries a full profile too, but this
 * app re-fetches `GET /api/me` right after a successful write instead of
 * decoding it from here (see `AccountRepository.saveEnrolment`) — the
 * enrolment route's raw profile shape and `/api/me`'s mapped [MeProfile] are
 * assembled by different server-side code paths and don't share field names
 * (`id` vs `studentId`), so re-fetching the one this client already knows how
 * to read is simpler than reconciling two shapes for a value this method
 * discards anyway.
 */
@Serializable
data class EnrolmentResult(val ok: Boolean = false)

/** Shared by both the read (`GET`, no `ok`) and write (`POST`, includes `ok`) shapes of `/api/account/discoverable`. */
@Serializable
data class DiscoverableResponse(val discoverable: Boolean = false, val ok: Boolean = false)

@Serializable
private data class DiscoverableRequest(val discoverable: Boolean)

/** `DELETE /api/account`'s response — the server does the whole erasure in one transaction, so this app only needs to know it succeeded. */
@Serializable
data class AccountDeletionResult(val ok: Boolean = false)

interface AccountApi {
    suspend fun getMe(): MeResponse
    suspend fun putEnrolment(body: EnrolmentRequest): EnrolmentResult
    suspend fun getDiscoverable(): DiscoverableResponse
    suspend fun setDiscoverable(discoverable: Boolean): DiscoverableResponse
    suspend fun deleteAccount(): AccountDeletionResult

    /**
     * Raw bytes of `GET /api/me/export` — a JSON document shaped as a dynamic
     * map of every `user_state` document the account owns plus its profile
     * and uploads (see the server's doc comment on this route), not a fixed
     * schema worth modelling as a DTO here.
     *
     * Nothing in this module writes the bytes anywhere: there is no
     * download/share pipeline wired up on Android yet (a `MediaStore`/SAF
     * write, or a share-sheet intent) for any feature to reuse, so this stops
     * at handing back the response rather than fabricating a save location.
     * `AccountRepository.requestExport` uses it only to confirm the export
     * round-trip works and report its size; wiring an actual save is a
     * one-line change there once such a pipeline exists. Caller closes the
     * body.
     */
    suspend fun exportRaw(): ResponseBody
}

/**
 * The thin, stateless Retrofit-backed [AccountApi]. Mirrors [RetrofitQBankApi]/
 * [RetrofitLeaderboardApi]: the Supabase access token is read fresh per
 * request via [tokenProvider] and sent as a Bearer header, and HTTP failures
 * are mapped to [ApiException] so callers can class them: 401 → Unauthorized,
 * 403 → Forbidden, else Retryable (this includes 409 `enrollment_locked`/
 * `username_taken` from `PUT /api/me/enrolment` — this client has no richer
 * classification for those than "the write was refused").
 */
class RetrofitAccountApi(
    baseUrl: String,
    private val tokenProvider: suspend () -> String?,
    okHttp: OkHttpClient = OkHttpClient(),
    json: Json = Json { ignoreUnknownKeys = true },
) : AccountApi {

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

    override suspend fun getMe(): MeResponse = call { service.getMe(bearer()) }

    override suspend fun putEnrolment(body: EnrolmentRequest): EnrolmentResult =
        call { service.putEnrolment(bearer(), body) }

    override suspend fun getDiscoverable(): DiscoverableResponse = call { service.getDiscoverable(bearer()) }

    override suspend fun setDiscoverable(discoverable: Boolean): DiscoverableResponse =
        call { service.setDiscoverable(bearer(), DiscoverableRequest(discoverable)) }

    override suspend fun deleteAccount(): AccountDeletionResult = call { service.deleteAccount(bearer()) }

    override suspend fun exportRaw(): ResponseBody = call { service.exportRaw(bearer()) }

    private interface Service {
        @GET("me")
        suspend fun getMe(@Header("Authorization") auth: String): MeResponse

        @PUT("me/enrolment")
        suspend fun putEnrolment(@Header("Authorization") auth: String, @Body body: EnrolmentRequest): EnrolmentResult

        @GET("account/discoverable")
        suspend fun getDiscoverable(@Header("Authorization") auth: String): DiscoverableResponse

        @POST("account/discoverable")
        suspend fun setDiscoverable(@Header("Authorization") auth: String, @Body body: DiscoverableRequest): DiscoverableResponse

        @DELETE("account")
        suspend fun deleteAccount(@Header("Authorization") auth: String): AccountDeletionResult

        @GET("me/export")
        suspend fun exportRaw(@Header("Authorization") auth: String): ResponseBody
    }
}
