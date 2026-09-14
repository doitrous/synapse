package com.synapse.app.feature.auth

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.synapse.app.core.auth.AuthModel
import com.synapse.app.core.auth.AuthState
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.CancellationException
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.update
import kotlinx.coroutines.launch
import javax.inject.Inject

/**
 * The login/signup/reset form fields plus submission status, as rendered and
 * edited by the auth screens. Separate from [AuthState], which is the
 * session-level result [RequireAuth] gates on.
 */
data class AuthUiState(
    val email: String = "",
    val password: String = "",
    val error: String? = null,
    val submitting: Boolean = false,
)

/**
 * Drives the auth screens (login/signup/reset/verify-email). Re-exposes
 * [AuthModel.state] for [RequireAuth] to gate the app shell on, and owns the
 * transient form state the screens render: entered fields, in-flight status,
 * and the last error message.
 */
@HiltViewModel
class AuthViewModel @Inject constructor(
    private val authModel: AuthModel,
) : ViewModel() {

    /** The session state [RequireAuth] gates the app shell on. */
    val state: StateFlow<AuthState> = authModel.state

    private val _uiState = MutableStateFlow(AuthUiState())
    val uiState: StateFlow<AuthUiState> = _uiState.asStateFlow()

    init {
        // Cold-start session restore. [AuthModel] starts in [AuthState.Loading] and
        // nothing else moves it off at launch, so without this the app hangs forever on
        // [RequireAuth]'s spinner. A fresh install (no stored token) resolves to
        // SignedOut -> the login screen; a stored session is silently refreshed.
        viewModelScope.launch {
            try {
                authModel.restore()
            } catch (e: CancellationException) {
                throw e
            } catch (e: Exception) {
                // Never leave the UI stuck on the spinner: treat an unexpected
                // cold-start failure as signed-out so the login screen appears.
                authModel.signOut()
            }
        }
    }

    fun onEmailChange(email: String) {
        _uiState.update { it.copy(email = email, error = null) }
    }

    fun onPasswordChange(password: String) {
        _uiState.update { it.copy(password = password, error = null) }
    }

    fun onSignIn() = submit {
        authModel.signIn(_uiState.value.email, _uiState.value.password)
    }

    fun onSignUp() = submit {
        authModel.signUp(_uiState.value.email, _uiState.value.password)
    }

    fun onReset() = submit {
        authModel.sendReset(_uiState.value.email)
    }

    /** Re-checks the backend session — what [VerifyEmailScreen]'s "check again" button calls. */
    fun onCheckVerification() = submit {
        authModel.restore()
    }

    /**
     * Runs [block] in [viewModelScope], tracking [AuthUiState.submitting] and
     * turning any [Exception] the backend throws (e.g. `AuthException` for
     * bad credentials) into [AuthUiState.error] instead of crashing.
     */
    private fun submit(block: suspend () -> Unit) {
        _uiState.update { it.copy(submitting = true, error = null) }
        viewModelScope.launch {
            try {
                block()
                _uiState.update { it.copy(submitting = false) }
            } catch (e: CancellationException) {
                throw e
            } catch (e: Exception) {
                _uiState.update {
                    it.copy(submitting = false, error = e.message ?: "Something went wrong")
                }
            }
        }
    }
}
