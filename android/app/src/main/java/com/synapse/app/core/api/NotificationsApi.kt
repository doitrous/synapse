package com.synapse.app.core.api

import com.synapse.app.core.auth.AuthBackend
import com.synapse.app.core.config.AppConfig
import dagger.Module
import dagger.Provides
import dagger.hilt.InstallIn
import dagger.hilt.components.SingletonComponent
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
import retrofit2.http.Query
import java.io.IOException
import javax.inject.Singleton

/**
 * One shared-document notification, as listed by `GET /api/notifications/shared`
 * (`listShareNotifications`, `server/src/shares.js` ~619). The route also returns
 * admin-campaign fields (`active`, `delivery`, `scheduledAt`, ...) the student inbox
 * never reads — left off this DTO on purpose rather than widened to match every
 * field the endpoint happens to carry.
 */
@Serializable
data class ShareNotification(
    val id: String,
    /** "Shared whiteboard updated" or "Shared note updated". */
    val title: String,
    val message: String,
    /** Deep-link target, `/s/:shareId` — routing there is out of scope for this surface. */
    val to: String? = null,
    val createdAt: String = "",
    val sentAt: String? = null,
    /** Null means unread. */
    val readAt: String? = null,
)

@Serializable
data class MarkNotificationsReadBody(val ids: List<String>)

@Serializable
data class MarkNotificationsReadResponse(val ok: Boolean = false, val changed: Int = 0)

interface NotificationsApi {
    /** `GET /api/notifications/shared`. */
    suspend fun listShared(limit: Int? = null): List<ShareNotification>

    /** `POST /api/notifications/shared/read`. Returns how many rows actually flipped. */
    suspend fun markSharedRead(ids: List<String>): MarkNotificationsReadResponse
}

/**
 * The thin, stateless Retrofit-backed [NotificationsApi]. Mirrors [RetrofitSharesApi]/
 * [RetrofitMaristanaApi]: the Supabase access token is read fresh per request via
 * [tokenProvider] and sent as a Bearer header, [CancellationException] always
 * propagates first, and every other transport/HTTP failure is mapped to [ApiException].
 */
class RetrofitNotificationsApi(
    baseUrl: String,
    private val tokenProvider: suspend () -> String?,
    okHttp: OkHttpClient = OkHttpClient(),
    json: Json = Json { ignoreUnknownKeys = true },
) : NotificationsApi {

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

    override suspend fun listShared(limit: Int?): List<ShareNotification> = call { service.listShared(bearer(), limit) }

    override suspend fun markSharedRead(ids: List<String>): MarkNotificationsReadResponse =
        call { service.markSharedRead(bearer(), MarkNotificationsReadBody(ids)) }

    private interface Service {
        @GET("notifications/shared")
        suspend fun listShared(@Header("Authorization") auth: String, @Query("limit") limit: Int?): List<ShareNotification>

        @POST("notifications/shared/read")
        suspend fun markSharedRead(@Header("Authorization") auth: String, @Body body: MarkNotificationsReadBody): MarkNotificationsReadResponse
    }
}

/**
 * Self-contained DI for [NotificationsApi] — this feature's own module rather than
 * an addition to `di/AppModule.kt`, so this task's wiring never conflicts with
 * whatever else is landing on `AppModule.kt` concurrently. Mirrors `SocialApiModule`.
 */
@Module
@InstallIn(SingletonComponent::class)
object NotificationsApiModule {
    @Provides
    @Singleton
    fun provideNotificationsApi(config: AppConfig, authBackend: AuthBackend): NotificationsApi =
        RetrofitNotificationsApi(config, authBackend::accessToken)
}
