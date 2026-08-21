package com.synapse.android.core.auth

import com.synapse.android.BuildConfig
import com.synapse.android.core.api.ApiError
import com.synapse.android.core.api.SessionUser
import com.synapse.android.core.api.SynapseApi
import com.synapse.android.core.config.AppConfig
import io.github.jan.supabase.auth.Auth
import io.github.jan.supabase.auth.SessionManager
import io.github.jan.supabase.auth.auth
import io.github.jan.supabase.auth.providers.builtin.Email
import io.github.jan.supabase.auth.user.UserSession
import io.github.jan.supabase.createSupabaseClient
import io.ktor.client.engine.okhttp.OkHttp
import kotlinx.coroutines.CancellationException
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.serialization.json.Json
import okhttp3.OkHttpClient

/**
 * Who is signed in, and how the app got there.
 *
 * This is the shape iOS already uses (`ios/Synapse/Core/Auth/AuthModel.swift:18-31`),
 * because the two apps have to behave the same way for the same account.
 * There is no `Failed` variant: a rejected password leaves the student on
 * [SignedOut] with a message on [AuthModel.message] rather than a dead end
 * the sign-in form would have to be taught to render its way out of.
 */
sealed interface AuthState {
    /** The build has no usable Supabase configuration -- a screen to render, not a crash. */
    data class NotConfigured(val missing: List<String>) : AuthState

    /** Deciding whether a stored session is still good. The app opens here, not on [SignedOut], so a student with a stored session never sees the sign-in form flash past. */
    data object Restoring : AuthState

    data object SignedOut : AuthState

    data class SignedIn(val user: SessionUser) : AuthState
}

/**
 * The narrow seam [AuthModel] talks to, so its tests never need a real
 * Supabase client or the network. [SupabaseAuthBackend] is the production
 * implementation.
 */
interface AuthBackend {
    suspend fun signIn(email: String, password: String)
    suspend fun signUp(email: String, password: String)
    suspend fun sendPasswordReset(email: String)
    suspend fun signOut()

    /** The current access token, read fresh. Null when there is no session. */
    suspend fun accessToken(): String?
}

/**
 * Who is signed in, and how the app got there.
 *
 * The app talks to two services that must agree: Supabase issues the token,
 * and the Synapse API verifies it. Signing in is therefore not finished when
 * [AuthBackend.signIn] returns -- it is finished when [api] accepts that
 * session (see [confirmWithServer]). Reporting success on Supabase's word
 * alone would drop a student into a shell that 401s on its first read.
 *
 * [isWorking] and [message] are orthogonal to [state], not variants of it, so
 * a spinner and a notice can both be true of a signed-out screen. That is
 * also the only channel a *successful* [signUp] or [resetPassword] has:
 * neither signs anybody in, so without it those two calls would succeed
 * silently and leave the student looking at a form that appears to have done
 * nothing.
 */
/**
 * Something to tell the student, and whether it is bad news.
 *
 * The tone is carried on the message rather than inferred at the call site,
 * because this one channel reports both halves of what can happen: a sign-in
 * that failed, and a sign-up or a password reset that *worked*. The screen
 * used to paint all of it in the error colour, so "Check your email to
 * confirm the address" -- the notice that says the account was created --
 * arrived looking exactly like a rejection.
 *
 * The two tones are the site's two notices: `role="alert"` in danger
 * (`src/pages/auth/Login.tsx:93`) and `role="status"` in the quiet neutral
 * panel (`src/pages/auth/ForgotPassword.tsx:22`). Neither of them is green;
 * the progress notice is telling the student to go and do something else,
 * not congratulating them.
 */
data class AuthNotice(val text: String, val tone: Tone) {
    enum class Tone {
        /** Something went wrong, or the account cannot be used as it stands. */
        PROBLEM,

        /** It worked, and the next step is somewhere other than this screen. */
        PROGRESS,
    }

    companion object {
        fun problem(text: String) = AuthNotice(text, Tone.PROBLEM)

        fun progress(text: String) = AuthNotice(text, Tone.PROGRESS)
    }
}

class AuthModel(
    private val config: AppConfig,
    private val api: SynapseApi,
    private val backend: AuthBackend,
) {
    private val _state = MutableStateFlow<AuthState>(AuthState.Restoring)
    val state: StateFlow<AuthState> = _state.asStateFlow()

    private val _isWorking = MutableStateFlow(false)
    val isWorking: StateFlow<Boolean> = _isWorking.asStateFlow()

    /** Shown to the student. Null when there is nothing to say. */
    private val _message = MutableStateFlow<AuthNotice?>(null)
    val message: StateFlow<AuthNotice?> = _message.asStateFlow()

    /** Restore a stored session, if there is one worth restoring. */
    suspend fun start() {
        if (!config.isConfigured) {
            _state.value = AuthState.NotConfigured(config.missing)
            return
        }
        _state.value = AuthState.Restoring
        // Launch, with nobody signed in, is the ordinary case -- there is
        // nothing to explain, so say nothing.
        confirmWithServer(explainFailure = false)
    }

    suspend fun signIn(email: String, password: String) {
        perform {
            backend.signIn(tidy(email), password)
            confirmWithServer(explainFailure = true)
        }
    }

    /**
     * Create an account. Supabase sends the confirmation mail and the
     * account cannot read anything until that link is followed, so this says
     * so plainly rather than leaving the student on a form that looks like
     * it did nothing.
     */
    suspend fun signUp(email: String, password: String) {
        perform {
            backend.signUp(tidy(email), password)
            _message.value = AuthNotice.progress("Check your email to confirm the address, then sign in.")
        }
    }

    suspend fun resetPassword(email: String) {
        perform {
            backend.sendPasswordReset(tidy(email))
            // Deliberately the same wording whether or not the address
            // exists -- otherwise this screen answers "does this person have
            // an account?" to anyone who asks.
            _message.value = AuthNotice.progress("If that address has an account, a reset link is on its way.")
        }
    }

    suspend fun signOut() {
        perform {
            backend.signOut()
            _state.value = AuthState.SignedOut
        }
    }

    /**
     * The token provider handed to [SynapseApi]. Read fresh on every call,
     * never cached here: the underlying SDK keeps the token current via
     * background refresh, and a copy cached in this class would go stale and
     * 401 every request made after that.
     */
    suspend fun accessToken(): String? = backend.accessToken()

    /**
     * Ask the Synapse API who it thinks we are. This is the step that proves
     * the whole chain -- Supabase token, JWKS verification, role -- actually
     * works.
     *
     * Two services have to agree here, and when they disagree the failure is
     * invisible from the outside: Supabase accepts the password, the API
     * refuses the token it issued, and the caller sees only a return to
     * [AuthState.SignedOut] that looks like it did nothing. So when the
     * caller has just tried to sign in ([explainFailure] is true), every
     * branch below says something.
     */
    private suspend fun confirmWithServer(explainFailure: Boolean) {
        try {
            val user = api.session()
            if (user != null) {
                _state.value = AuthState.SignedIn(user)
                _message.value = null
            } else {
                // Not an error: Supabase knows this address and Connect Cortex has
                // no account for it yet.
                _state.value = AuthState.SignedOut
                if (explainFailure) {
                    _message.value =
                        AuthNotice.problem("Signed in, but Connect Cortex has no account for this address yet.")
                }
            }
        } catch (e: ApiError.Unauthorized) {
            _state.value = AuthState.SignedOut
            if (explainFailure) {
                // Deliberately not guessing at a cause. Two services have to
                // agree, and from here the difference between an
                // unconfigured server, a suspended account and a clock skew
                // is invisible -- naming one would send the reader after the
                // wrong thing.
                var text = "Your password was accepted, but Connect Cortex rejected the session. " +
                    "Please try again, or contact support if it keeps happening."
                // Mirrors ios/Synapse/Core/Auth/AuthModel.swift:142-144: the
                // same silent-failure risk exists here, since accessToken()
                // records a read failure to a debug field instead of
                // throwing. Debug-only, and never in a release message --
                // this can carry token material.
                if (BuildConfig.DEBUG) {
                    SupabaseAuthBackend.lastTokenError?.let { tokenError ->
                        text += "\n[token error: ${tokenError.take(180)}]"
                    }
                }
                _message.value = AuthNotice.problem(text)
            }
        } catch (e: ApiError) {
            // Covers ApiError.Transient among others. The token may well be
            // fine and the network not, so nothing here touches the stored
            // session -- only the network's fault is being reported.
            _state.value = AuthState.SignedOut
            if (explainFailure) {
                _message.value = AuthNotice.problem(describe(e))
            }
        }
    }

    private suspend fun perform(work: suspend () -> Unit) {
        _isWorking.value = true
        _message.value = null
        try {
            work()
        } catch (e: CancellationException) {
            // A cancelled scope is not a failure to explain -- it is
            // structured concurrency doing its job (the student backgrounded
            // the app mid-sign-in, or the ViewModel scope holding this call
            // died). Converting it into a message here would tell the
            // coroutine machinery the job finished normally when it did not.
            throw e
        } catch (e: Exception) {
            _message.value = AuthNotice.problem(describe(e))
        } finally {
            _isWorking.value = false
        }
    }

    private companion object {
        fun tidy(email: String) = email.trim().lowercase()

        fun describe(error: Throwable): String = when (error) {
            ApiError.Unauthorized -> "That session is no longer valid. Please sign in again."
            ApiError.Forbidden -> "This account doesn't have access to that."
            is ApiError.Transient -> "Couldn't reach Connect Cortex. Check your connection and try again."
            is ApiError.Malformed -> "Connect Cortex sent back something unexpected. Please try again."
            else -> error.message ?: "Something went wrong."
        }
    }
}

/**
 * The production [AuthBackend], backed by supabase-kt.
 *
 * Session persistence is wired to [store] (via [SessionStoreSessionManager])
 * rather than left at supabase-kt's own default -- plain `SharedPreferences`
 * -- so there is exactly one place a session is stored on this device, and it
 * is the encrypted one. Persistence is not disabled outright: auto-refresh
 * (`AuthConfig.alwaysAutoRefresh`) depends on being able to reload the
 * session it is refreshing.
 */
class SupabaseAuthBackend(
    config: AppConfig,
    store: SessionStore,
    httpClient: OkHttpClient,
    tokenReader: (() -> String?)? = null,
) : AuthBackend {

    // Lazy, not eager: building this calls into supabase-kt's Android
    // Settings bootstrap (for its default PKCE code-verifier cache), which
    // needs a running Android process and throws outside one -- in a plain
    // JVM unit test, in particular. Deferring construction to first use means
    // a test that supplies [tokenReader] never has to pay for it, since
    // [readToken] then never touches [client] at all. Production behaviour
    // is unaffected: nothing calls into this client before the app itself is
    // running.
    private val client by lazy {
        createSupabaseClient(
            supabaseUrl = config.supabaseUrl,
            supabaseKey = config.supabaseAnonKey,
        ) {
            // Reuse the app's own OkHttpClient rather than letting Ktor spin
            // up a second HTTP stack -- Task 8 pinned OkHttp 4.12.0 for
            // exactly this, and ktor-client-okhttp:3.1.2 declares the same
            // version.
            httpEngine = OkHttp.create { preconfigured = httpClient }
            install(Auth) {
                sessionManager = SessionStoreSessionManager(store)
            }
        }
    }

    /**
     * Where the token actually comes from. Overridable in tests: nothing in
     * [accessToken] needs the Android Keystore or a real Supabase project --
     * only [EncryptedSessionStore] does -- so [tokenReader] lets a test drive
     * both a successful read and a throwing one with a plain lambda.
     */
    private val readToken: () -> String? = tokenReader ?: { client.auth.currentAccessTokenOrNull() }

    override suspend fun signIn(email: String, password: String) {
        client.auth.signInWith(Email) {
            this.email = email
            this.password = password
        }
    }

    override suspend fun signUp(email: String, password: String) {
        client.auth.signUpWith(Email) {
            this.email = email
            this.password = password
        }
    }

    override suspend fun sendPasswordReset(email: String) {
        client.auth.resetPasswordForEmail(email)
    }

    override suspend fun signOut() {
        client.auth.signOut()
    }

    override suspend fun accessToken(): String? = try {
        readToken()
    } catch (e: CancellationException) {
        // Not a token failure -- the caller's scope died mid-read. Rethrow
        // rather than recording it: a null return here reads as "no
        // session" to SynapseApi, which would send an unauthenticated
        // request on the way out of a cancelled scope, and lastTokenError
        // would carry a misleading breadcrumb about a read that never
        // actually failed.
        throw e
    } catch (e: Exception) {
        // Swallowing this silently once cost the iOS app hours: the request
        // went out with no Authorization header, the API answered 401, and
        // the app reported a rejected session without ever saying it had
        // failed to read one (ios/Synapse/Core/Auth/AuthModel.swift:44-48).
        // currentAccessTokenOrNull() reads an in-memory StateFlow and is not
        // expected to throw, but this is the seam where a future SDK version
        // could start doing so, so it is guarded the same way iOS guards its
        // own token read.
        lastTokenError = e.message
        null
    }

    companion object {
        /** Debug-only breadcrumb for a token read that would otherwise fail silently. Mirrors `SynapseAPI.lastTokenError` on iOS. */
        var lastTokenError: String? = null
            private set
    }
}

/**
 * Adapts [SessionStore]'s opaque string to the [UserSession] supabase-kt
 * persists, so the one encrypted store is the single place a session lives
 * on this device.
 */
private class SessionStoreSessionManager(private val store: SessionStore) : SessionManager {
    // Deliberately not `com.synapse.android.core.CortexJson`. A session is
    // written to this device's encrypted store and read back by this app
    // alone; it is never a shared document, so no other client can be broken
    // by its shape. CortexJson's settings are a cross-client contract and
    // belong only to documents that have one.
    private val json = Json { ignoreUnknownKeys = true }

    override suspend fun saveSession(session: UserSession) {
        store.write(json.encodeToString(UserSession.serializer(), session))
    }

    override suspend fun loadSession(): UserSession? {
        val raw = store.read() ?: return null
        return json.decodeFromString(UserSession.serializer(), raw)
    }

    override suspend fun deleteSession() {
        store.write(null)
    }
}
