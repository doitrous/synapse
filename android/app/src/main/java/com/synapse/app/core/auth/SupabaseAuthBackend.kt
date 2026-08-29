package com.synapse.app.core.auth

import com.synapse.app.core.config.AppConfig
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable
import kotlinx.serialization.json.Json
import okhttp3.MediaType.Companion.toMediaType
import okhttp3.OkHttpClient
import okhttp3.ResponseBody
import retrofit2.Response
import retrofit2.Retrofit
import com.jakewharton.retrofit2.converter.kotlinx.serialization.asConverterFactory
import retrofit2.http.Body
import retrofit2.http.Header
import retrofit2.http.POST
import retrofit2.http.Query
import java.io.IOException

/** Thrown for any non-2xx response from Supabase GoTrue, or a malformed 2xx body. */
class AuthException(message: String) : Exception(message)

@Serializable
private data class PasswordGrantRequest(val email: String, val password: String)

@Serializable
private data class RefreshGrantRequest(@SerialName("refresh_token") val refreshToken: String)

@Serializable
private data class SignUpRequest(val email: String, val password: String)

@Serializable
private data class RecoverRequest(val email: String)

@Serializable
private data class GoTrueUserDto(
    val id: String,
    val email: String? = null,
    @SerialName("email_confirmed_at") val emailConfirmedAt: String? = null,
    @SerialName("confirmed_at") val confirmedAt: String? = null,
)

/**
 * Shape shared by the `token` (sign-in/refresh) and `signup` GoTrue endpoints.
 * `token` always nests the user under [user]; `signup` nests it under [user]
 * only when a session was also created (auto-confirm on) — otherwise the
 * response IS the user, with its fields flattened at the top level. [resolvedUser]
 * covers both.
 */
@Serializable
private data class GoTrueAuthResponse(
    @SerialName("access_token") val accessToken: String? = null,
    @SerialName("refresh_token") val refreshToken: String? = null,
    val user: GoTrueUserDto? = null,
    val id: String? = null,
    val email: String? = null,
    @SerialName("email_confirmed_at") val emailConfirmedAt: String? = null,
    @SerialName("confirmed_at") val confirmedAt: String? = null,
) {
    fun resolvedUser(): GoTrueUserDto? = user ?: id?.let {
        GoTrueUserDto(id = it, email = email, emailConfirmedAt = emailConfirmedAt, confirmedAt = confirmedAt)
    }
}

@Serializable
private data class GoTrueErrorResponse(
    val msg: String? = null,
    val error: String? = null,
    @SerialName("error_description") val errorDescription: String? = null,
)

private interface GoTrueService {
    @POST("token")
    suspend fun signInWithPassword(
        @Header("apikey") apiKey: String,
        @Query("grant_type") grantType: String,
        @Body body: PasswordGrantRequest,
    ): Response<GoTrueAuthResponse>

    @POST("token")
    suspend fun refresh(
        @Header("apikey") apiKey: String,
        @Query("grant_type") grantType: String,
        @Body body: RefreshGrantRequest,
    ): Response<GoTrueAuthResponse>

    @POST("signup")
    suspend fun signUp(
        @Header("apikey") apiKey: String,
        @Body body: SignUpRequest,
    ): Response<GoTrueAuthResponse>

    @POST("recover")
    suspend fun recover(
        @Header("apikey") apiKey: String,
        @Body body: RecoverRequest,
    ): Response<ResponseBody>
}

/**
 * [AuthBackend] backed directly by Supabase's GoTrue REST API over Retrofit/OkHttp
 * — no supabase-kt/Ktor SDK (Plan 02 Task 3 ruling: reuse the project's existing
 * networking stack instead of adding a new dependency). OAuth and MFA are out of
 * scope; only email/password sign-in, sign-up, sign-out and password reset are
 * implemented.
 *
 * Persists the access/refresh token pair via [tokenStore] so [restore] can
 * silently refresh a prior session on cold start without asking the student to
 * sign in again.
 */
class SupabaseAuthBackend(
    baseUrl: String,
    private val anonKey: String,
    private val tokenStore: TokenStore,
    okHttp: OkHttpClient = OkHttpClient(),
    private val json: Json = Json { ignoreUnknownKeys = true },
) : AuthBackend {

    /** Construct from [AppConfig] (production path): `https://<supabaseHost>/auth/v1/`. */
    constructor(config: AppConfig, tokenStore: TokenStore, okHttp: OkHttpClient = OkHttpClient()) : this(
        baseUrl = "https://${config.supabaseHost}/auth/v1/",
        anonKey = config.supabaseAnonKey,
        tokenStore = tokenStore,
        okHttp = okHttp,
    )

    private val service: GoTrueService = Retrofit.Builder()
        .baseUrl(if (baseUrl.endsWith("/")) baseUrl else "$baseUrl/")
        .client(okHttp)
        .addConverterFactory(json.asConverterFactory("application/json".toMediaType()))
        .build()
        .create(GoTrueService::class.java)

    private val _session = MutableStateFlow<Session?>(null)
    override val session: StateFlow<Session?> = _session.asStateFlow()

    override suspend fun restore() {
        val tokens = tokenStore.load()
        _session.value = if (tokens == null) {
            null
        } else {
            try {
                refreshSession(tokens.refreshToken)
            } catch (e: AuthException) {
                // Stored refresh token is no longer valid: fall back to signed-out
                // rather than surfacing an error from a silent, app-launch refresh.
                tokenStore.clear()
                null
            }
        }
    }

    override suspend fun signIn(email: String, password: String) {
        val response = service.signInWithPassword(anonKey, "password", PasswordGrantRequest(email, password))
        _session.value = handleSessionResponse(response)
    }

    override suspend fun signUp(email: String, password: String) {
        val response = service.signUp(anonKey, SignUpRequest(email, password))
        if (!response.isSuccessful) throw AuthException(errorMessage(response))
        val body = response.body() ?: throw AuthException("Empty signup response")
        val accessToken = body.accessToken
        val user = body.resolvedUser()
        _session.value = if (accessToken != null && user != null) {
            saveTokens(accessToken, body.refreshToken)
            toSession(user, accessToken)
        } else {
            // No session yet — GoTrue is configured to require email confirmation
            // before a session is issued.
            null
        }
    }

    override suspend fun signOut() {
        tokenStore.clear()
        _session.value = null
    }

    override suspend fun sendReset(email: String) {
        val response = service.recover(anonKey, RecoverRequest(email))
        if (!response.isSuccessful) throw AuthException(errorMessage(response))
        response.body()?.close()
    }

    override suspend fun accessToken(): String? = _session.value?.accessToken

    private suspend fun refreshSession(refreshToken: String): Session {
        val response = service.refresh(anonKey, "refresh_token", RefreshGrantRequest(refreshToken))
        return handleSessionResponse(response)
    }

    private suspend fun handleSessionResponse(response: Response<GoTrueAuthResponse>): Session {
        if (!response.isSuccessful) throw AuthException(errorMessage(response))
        val body = response.body() ?: throw AuthException("Empty auth response")
        val accessToken = body.accessToken ?: throw AuthException("Missing access_token in auth response")
        val user = body.resolvedUser() ?: throw AuthException("Missing user in auth response")
        saveTokens(accessToken, body.refreshToken)
        return toSession(user, accessToken)
    }

    private suspend fun saveTokens(accessToken: String, refreshToken: String?) {
        if (refreshToken != null) tokenStore.save(Tokens(accessToken, refreshToken))
    }

    private fun toSession(user: GoTrueUserDto, accessToken: String): Session = Session(
        userId = user.id,
        accessToken = accessToken,
        emailVerified = user.emailConfirmedAt != null || user.confirmedAt != null,
    )

    private fun errorMessage(response: Response<*>): String {
        val raw = try {
            response.errorBody()?.string()
        } catch (e: IOException) {
            null
        }
        if (raw.isNullOrBlank()) return "GoTrue request failed with HTTP ${response.code()}"
        return try {
            val parsed = json.decodeFromString(GoTrueErrorResponse.serializer(), raw)
            parsed.errorDescription ?: parsed.msg ?: parsed.error ?: raw
        } catch (e: Exception) {
            raw
        }
    }
}
