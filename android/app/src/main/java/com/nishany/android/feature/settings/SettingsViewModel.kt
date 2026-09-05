package com.nishany.android.feature.settings

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewmodel.initializer
import androidx.lifecycle.viewmodel.viewModelFactory
import com.nishany.android.core.api.ApiError
import com.nishany.android.core.api.Profile
import com.nishany.android.core.api.SupportTicket
import com.nishany.android.core.api.SynapseApi
import com.nishany.android.core.api.UsernameAvailability
import com.nishany.android.core.auth.AuthModel
import com.nishany.android.core.backgroundWorkScope
import com.nishany.android.design.AppLanguage
import com.nishany.android.design.CortexThemeChoice
import com.nishany.android.design.LanguagePreference
import com.nishany.android.design.ThemePreference
import kotlinx.coroutines.cancel
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch

/** What the Settings screen shows. See `SynapseApi.me()`'s own doc for why a null profile ([Empty]) is a state to render, not an error. */
sealed interface SettingsUiState {
    data object Loading : SettingsUiState
    data class ConnectionDropped(val message: String) : SettingsUiState

    /** Signed in, but the university hasn't set up a roster row yet. Profile editing, the enrolment-change form, and the AI-consent gate all need a roster row, so this state skips them rather than rendering fields with nothing to save. */
    data object Empty : SettingsUiState

    data class Content(val email: String?, val profile: Profile) : SettingsUiState
}

/** What `GET /api/me/support` is showing in the Help section's ticket history. */
sealed interface SupportListState {
    data object Loading : SupportListState
    data object Empty : SupportListState
    data class ConnectionDropped(val message: String) : SupportListState
    data class Loaded(val tickets: List<SupportTicket>) : SupportListState
}

/**
 * The full settings surface: profile, appearance, language, the enrolment-
 * change request, help and support, legal, sign-out, and account deletion.
 *
 * Username-availability debounce lives in `SettingsScreen` itself
 * (`LaunchedEffect(username) { delay(...); ... }`), not here -- that is UI
 * timing, not app state, and Compose already cancels-and-restarts a keyed
 * `LaunchedEffect` on every keystroke, which is exactly what a debounce needs.
 * This class stays the thing every other screen in this app already is: load
 * once, expose a small set of suspend actions, replace [state] with the
 * result.
 *
 * Runs its own work on [backgroundWorkScope], not `viewModelScope` -- see
 * that function's own doc, and `QuestionBankViewModel`'s class doc for the
 * same call made there: `viewModelScope` binds to `Dispatchers.Main.immediate`,
 * which needs a real Android main-thread Looper. A plain JVM unit test (the
 * kind `SettingsViewModelTest` is) has none, and `viewModelScope.launch` here
 * hung every load/save test until this class stopped depending on it.
 */
class SettingsViewModel(
    private val auth: AuthModel,
    private val api: SynapseApi,
    val themePreference: ThemePreference,
    val languagePreference: LanguagePreference,
) : ViewModel() {
    private val backgroundScope = backgroundWorkScope("SettingsViewModel")

    private val _state = MutableStateFlow<SettingsUiState>(SettingsUiState.Loading)
    val state: StateFlow<SettingsUiState> = _state.asStateFlow()

    private val _supportTickets = MutableStateFlow<SupportListState>(SupportListState.Loading)
    val supportTickets: StateFlow<SupportListState> = _supportTickets.asStateFlow()

    fun load() {
        backgroundScope.launch {
            _state.value = SettingsUiState.Loading
            val me = try {
                api.me()
            } catch (e: ApiError) {
                _state.value = SettingsUiState.ConnectionDropped(describeLoadFailure(e))
                return@launch
            }
            _state.value = me.profile?.let { SettingsUiState.Content(email = me.user.email, profile = it) }
                ?: SettingsUiState.Empty
        }
    }

    suspend fun checkUsername(handle: String): UsernameAvailability = api.usernameAvailable(handle)

    fun setTheme(choice: CortexThemeChoice) = themePreference.set(choice)

    fun setLanguage(language: AppLanguage) = languagePreference.set(language)

    /** Saves the Profile section as one `PUT /api/me/enrolment` -- see [SynapseApi.updateEnrolment]'s doc for why [universityId]/[year] are resent unchanged. */
    fun saveProfile(username: String, profileIcon: String, statusMessage: String, onResult: (Result<Unit>) -> Unit) {
        val current = (_state.value as? SettingsUiState.Content)?.profile ?: return
        backgroundScope.launch {
            val result = runCatching {
                api.updateEnrolment(
                    universityId = current.universityId,
                    year = current.year,
                    group = current.group,
                    username = username,
                    profileIcon = profileIcon,
                    statusMessage = statusMessage,
                )
            }
            result.onSuccess { updated -> replaceProfile(updated) }
            onResult(result.map {})
        }
    }

    fun requestEnrollmentChange(field: String, requestedValue: String, reason: String, onResult: (Result<Unit>) -> Unit) {
        backgroundScope.launch {
            onResult(runCatching { api.requestEnrollmentChange(field, requestedValue, reason) })
        }
    }

    fun loadSupportTickets() {
        backgroundScope.launch {
            _supportTickets.value = SupportListState.Loading
            _supportTickets.value = try {
                val tickets = api.listSupport()
                if (tickets.isEmpty()) SupportListState.Empty else SupportListState.Loaded(tickets)
            } catch (e: ApiError) {
                SupportListState.ConnectionDropped(describeLoadFailure(e))
            }
        }
    }

    fun submitSupport(subject: String?, message: String, onResult: (Result<Unit>) -> Unit) {
        backgroundScope.launch {
            val result = runCatching { api.submitSupport(subject, message) }
            result.onSuccess { loadSupportTickets() }
            onResult(result)
        }
    }

    suspend fun signOut() = auth.signOut()

    /** `DELETE /api/account`, then signs out locally -- the records are already gone server-side; a signed-in app with no account behind it fails every screen. Mirrors `ios/Synapse/Features/Root/DeleteAccountView.swift`. */
    suspend fun deleteAccount() {
        api.deleteAccount()
        auth.signOut()
    }

    private fun replaceProfile(profile: Profile) {
        (_state.value as? SettingsUiState.Content)?.let { _state.value = it.copy(profile = profile) }
    }

    override fun onCleared() {
        backgroundScope.cancel()
    }

    companion object {
        fun factory(auth: AuthModel, api: SynapseApi, themePreference: ThemePreference, languagePreference: LanguagePreference) = viewModelFactory {
            initializer { SettingsViewModel(auth, api, themePreference, languagePreference) }
        }
    }
}

private fun describeLoadFailure(error: ApiError): String = when (error) {
    ApiError.Unauthorized -> "Your session has expired. Please sign in again."
    else -> "Couldn't reach Nishany. Check your connection and try again."
}
