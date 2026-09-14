package com.synapse.app.core.api

import com.synapse.app.core.config.AppConfig
import kotlinx.serialization.Serializable
import kotlinx.serialization.json.Json
import okhttp3.MediaType.Companion.toMediaType
import okhttp3.OkHttpClient
import retrofit2.HttpException
import retrofit2.Retrofit
import com.jakewharton.retrofit2.converter.kotlinx.serialization.asConverterFactory
import retrofit2.http.Body
import retrofit2.http.DELETE
import retrofit2.http.GET
import retrofit2.http.Header
import retrofit2.http.POST
import java.io.IOException

/**
 * One voucher, as the admin-authored catalogue (`synapse-vouchers-v1`) and
 * `POST /api/vouchers/redeem`'s success body both shape it — a 1:1 port of
 * web's `Voucher` interface (`src/data/vouchers.ts`). [grant] is the raw wire
 * string (`"Discount"` or `"Full-access trial"`, absent means a discount);
 * [core.billing.isTrialVoucher] reads it rather than an enum so a decode never
 * fails on a value this client doesn't yet know about.
 */
@Serializable
data class Voucher(
    val id: String,
    val code: String,
    val name: String = "",
    val discountType: String = "Percentage",
    val amount: Double = 0.0,
    val grant: String? = null,
    val trialDays: Int? = null,
    val active: Boolean = true,
    val startsAt: String = "",
    val expiresAt: String = "",
    val maxRedemptions: Int = 0,
    val redemptionCount: Int = 0,
    val universityIds: List<String> = emptyList(),
    val years: List<String> = emptyList(),
    val groups: List<String> = emptyList(),
    val createdAt: String = "",
    val updatedAt: String = "",
)

/** `GET /api/vouchers/mine`'s redemption row — the voucher's own details are looked up from the catalogue by [voucherId]. */
@Serializable
data class VoucherRedemption(
    val voucherId: String,
    val code: String,
    val redeemedAt: String? = null,
)

/** `GET /api/vouchers/mine`'s body — `redemption` is null when nothing is currently applied. */
@Serializable
data class MineResponse(val redemption: VoucherRedemption? = null)

@Serializable
private data class RedeemRequest(val code: String)

/**
 * `POST /api/vouchers/redeem`'s body — one shape covers both answers the
 * server gives (see `server/src/vouchers.js#redeemVoucher`): a refusal is a
 * normal 200 with [ok] false, a typed [reason] and a human [message] to show;
 * success carries [ok] true and the [voucher] that was applied. Never a 4xx —
 * the server's own doc comment on the route explains why.
 */
@Serializable
data class RedeemResult(
    val ok: Boolean = false,
    val voucher: Voucher? = null,
    val reason: String? = null,
    val message: String? = null,
)

/** `DELETE /api/vouchers/redemption`'s body. [released] is the voucher id that was released, or null when nothing was applied. */
@Serializable
data class ReleaseResult(val ok: Boolean = false, val released: String? = null)

interface BillingApi {
    suspend fun myVoucher(): MineResponse
    suspend fun redeemVoucher(code: String): RedeemResult
    suspend fun releaseVoucher(): ReleaseResult
}

/**
 * The thin, stateless Retrofit-backed [BillingApi]. Mirrors [RetrofitQBankApi]/
 * [RetrofitLeaderboardApi]: the Supabase access token is read fresh per
 * request via [tokenProvider] and sent as a Bearer header, and HTTP failures
 * are mapped to [ApiException] so callers can class them: 401 → Unauthorized,
 * 403 → Forbidden, else Retryable.
 */
class RetrofitBillingApi(
    baseUrl: String,
    private val tokenProvider: suspend () -> String?,
    okHttp: OkHttpClient = OkHttpClient(),
    json: Json = Json { ignoreUnknownKeys = true },
) : BillingApi {

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

    override suspend fun myVoucher(): MineResponse = call { service.getMine(bearer()) }

    override suspend fun redeemVoucher(code: String): RedeemResult =
        call { service.redeem(bearer(), RedeemRequest(code)) }

    override suspend fun releaseVoucher(): ReleaseResult = call { service.releaseVoucher(bearer()) }

    private interface Service {
        @GET("vouchers/mine")
        suspend fun getMine(@Header("Authorization") auth: String): MineResponse

        @POST("vouchers/redeem")
        suspend fun redeem(@Header("Authorization") auth: String, @Body body: RedeemRequest): RedeemResult

        @DELETE("vouchers/redemption")
        suspend fun releaseVoucher(@Header("Authorization") auth: String): ReleaseResult
    }
}
