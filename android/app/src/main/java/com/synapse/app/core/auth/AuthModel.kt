package com.synapse.app.core.auth

import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow

/** What the UI renders. Only [SignedIn] carries an authenticated session. */
sealed interface AuthState {
    data object Loading : AuthState
    data object SignedOut : AuthState
    data object NeedsEmailVerify : AuthState
    data class SignedIn(val session: Session) : AuthState
}

/**
 * Turns [AuthBackend] session events into [AuthState] for the UI, applying the
 * two-gate sign-in rule: a session only reaches [AuthState.SignedIn] when its
 * email is verified *and* [confirmSession] (the `/api/session` round-trip)
 * agrees the server also considers it valid. Either gate failing keeps the
 * user out of [AuthState.SignedIn] — an unverified email routes to
 * [AuthState.NeedsEmailVerify], a failed server confirmation routes to
 * [AuthState.SignedOut].
 */
class AuthModel(
    private val backend: AuthBackend,
    private val confirmSession: suspend () -> Boolean,
) {
    private val _state = MutableStateFlow<AuthState>(AuthState.Loading)
    val state: StateFlow<AuthState> = _state.asStateFlow()

    suspend fun restore() {
        backend.restore()
        applyGate()
    }

    suspend fun signIn(email: String, password: String) {
        backend.signIn(email, password)
        applyGate()
    }

    suspend fun signUp(email: String, password: String) {
        backend.signUp(email, password)
        applyGate()
    }

    suspend fun signOut() {
        backend.signOut()
        applyGate()
    }

    suspend fun sendReset(email: String) {
        backend.sendReset(email)
    }

    suspend fun accessToken(): String? = backend.accessToken()

    /** Re-derives [state] from the backend's current session, applying the two-gate rule. */
    private suspend fun applyGate() {
        val session = backend.session.value
        _state.value = when {
            session == null -> AuthState.SignedOut
            !session.emailVerified -> AuthState.NeedsEmailVerify
            confirmSession() -> AuthState.SignedIn(session)
            else -> {
                // The server rejected /api/session for an otherwise-verified session: clear the
                // backend session too, so accessToken() (used by the API layer's auth header)
                // stops handing out a token for a session the server no longer honors.
                backend.signOut()
                AuthState.SignedOut
            }
        }
    }
}
