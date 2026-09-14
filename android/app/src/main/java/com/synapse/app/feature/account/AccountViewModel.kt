package com.synapse.app.feature.account

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.synapse.app.core.account.AccountPrefs
import com.synapse.app.core.i18n.LocaleController
import com.synapse.app.core.api.MeEntitlement
import com.synapse.app.core.api.MeProfile
import com.synapse.app.core.api.MeUser
import com.synapse.app.design.ThemeChoice
import com.synapse.app.design.ThemePreference
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.CancellationException
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.SharingStarted
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.stateIn
import kotlinx.coroutines.launch
import java.time.Instant
import java.time.ZoneId
import javax.inject.Inject

/** What asking for a data export has produced so far, rendered by the Privacy & data panel. */
sealed interface ExportUiState {
    data object Idle : ExportUiState
    data object Loading : ExportUiState
    data class Ready(val sizeBytes: Long) : ExportUiState
    data object Unavailable : ExportUiState
}

/**
 * The delete-account confirmation flow's own state. Mirrors iOS
 * `DeleteAccountView`: the button only becomes enabled once the word
 * "DELETE" has actually been typed, not merely intended.
 */
data class DeletionUiState(
    val typed: String = "",
    val isDeleting: Boolean = false,
    val failure: String? = null,
) {
    /** Byte-for-byte port of iOS `DeleteAccountView.canDelete`. */
    val canDelete: Boolean get() = typed.trim().uppercase() == "DELETE" && !isDeleting
}

/** What [AccountRoute] renders. */
sealed interface AccountUiState {
    data object Loading : AccountUiState

    /** `/api/me` could not be fetched at all (offline on first load, session hiccup). Distinct from a [Content] with a null [Content.profile], which is a valid server answer — "your university hasn't set up your profile yet". */
    data object Unavailable : AccountUiState

    data class Content(
        val user: MeUser,
        val profile: MeProfile?,
        val entitlement: MeEntitlement?,
        val prefs: AccountPrefs,
        val language: String,
        val discoverable: Boolean,
        val savingEnrolment: Boolean = false,
        val enrolmentError: String? = null,
        val export: ExportUiState = ExportUiState.Idle,
        val deletion: DeletionUiState = DeletionUiState(),
    ) : AccountUiState
}

/**
 * Drives [AccountRoute]: identity/enrolment, prefs, language, the classmate
 * directory toggle, export, and account deletion. Theme is exposed
 * separately as [theme]/[setTheme] rather than folded into [AccountUiState]
 * — it is [ThemePreference]'s own stream (the same one the shell's theme
 * toggle reads via `RootViewModel`), so Account only surfaces it rather than
 * caching a copy that could go stale next to the real one.
 *
 * Deleting the account calls [com.synapse.app.core.auth.AuthModel.signOut]
 * from [AccountRepository.deleteAccount] on success; this view model does
 * not navigate anywhere itself — `RequireAuth` (wrapping the whole signed-in
 * app) reacts to the resulting `AuthState.SignedOut` and swaps this screen
 * out from under itself, the same way any other sign-out does.
 */
@HiltViewModel
class AccountViewModel @Inject constructor(
    private val repository: AccountRepository,
    private val themePreference: ThemePreference,
) : ViewModel() {

    var now: () -> Instant = Instant::now

    /** Overridable for tests; production reads the device's current zone. */
    var currentTimezone: () -> String = { ZoneId.systemDefault().id }

    private val _uiState = MutableStateFlow<AccountUiState>(AccountUiState.Loading)
    val uiState: StateFlow<AccountUiState> = _uiState.asStateFlow()

    val theme: StateFlow<ThemeChoice> = themePreference.choice.stateIn(
        scope = viewModelScope, started = SharingStarted.Eagerly, initialValue = ThemeChoice.Light,
    )

    init {
        load()
    }

    fun load() {
        viewModelScope.launch {
            _uiState.value = AccountUiState.Loading
            try {
                val timezone = currentTimezone()
                repository.syncTimezone(timezone, now())
                val me = repository.loadMe()
                _uiState.value = AccountUiState.Content(
                    user = me.user,
                    profile = me.profile,
                    entitlement = me.entitlement,
                    prefs = repository.prefs(timezone),
                    language = repository.language(),
                    discoverable = repository.discoverable(),
                )
            } catch (e: CancellationException) {
                throw e
            } catch (e: Exception) {
                _uiState.value = AccountUiState.Unavailable
            }
        }
    }

    fun setTheme(choice: ThemeChoice) {
        viewModelScope.launch { themePreference.set(choice) }
    }

    fun saveEnrolment(universityId: String, year: String, group: String?) {
        val state = _uiState.value as? AccountUiState.Content ?: return
        _uiState.value = state.copy(savingEnrolment = true, enrolmentError = null)
        viewModelScope.launch {
            try {
                val me = repository.saveEnrolment(universityId, year, group)
                val current = _uiState.value as? AccountUiState.Content ?: return@launch
                _uiState.value = current.copy(
                    profile = me.profile,
                    entitlement = me.entitlement,
                    savingEnrolment = false,
                )
            } catch (e: CancellationException) {
                throw e
            } catch (e: Exception) {
                val current = _uiState.value as? AccountUiState.Content ?: return@launch
                _uiState.value = current.copy(
                    savingEnrolment = false,
                    enrolmentError = "That could not be saved. Check your connection and try again.",
                )
            }
        }
    }

    fun setReviewReminders(value: Boolean) = mutatePrefs(
        apply = { it.copy(reviewReminders = value) },
        persist = { timezone -> repository.setReviewReminders(value, timezone, now()) },
    )

    fun setCalendarReminders(value: Boolean) = mutatePrefs(
        apply = { it.copy(calendarReminders = value) },
        persist = { timezone -> repository.setCalendarReminders(value, timezone, now()) },
    )

    /** Optimistically updates [AccountUiState.Content.prefs], then persists — a failed write leaves the switch where the student left it; `SyncEngine`'s outbox retries on the next drain. */
    private fun mutatePrefs(apply: (AccountPrefs) -> AccountPrefs, persist: suspend (String) -> Unit) {
        val state = _uiState.value as? AccountUiState.Content ?: return
        _uiState.value = state.copy(prefs = apply(state.prefs))
        viewModelScope.launch {
            try {
                persist(currentTimezone())
            } catch (e: CancellationException) {
                throw e
            } catch (e: Exception) {
                // Best effort — see this function's doc comment.
            }
        }
    }

    fun setLanguage(language: String) {
        val state = _uiState.value as? AccountUiState.Content ?: return
        _uiState.value = state.copy(language = language)
        LocaleController.apply(language)
        viewModelScope.launch {
            try {
                repository.setLanguage(language, now())
            } catch (e: CancellationException) {
                throw e
            } catch (e: Exception) {
                // Best effort, same as mutatePrefs.
            }
        }
    }

    fun setDiscoverable(value: Boolean) {
        val state = _uiState.value as? AccountUiState.Content ?: return
        _uiState.value = state.copy(discoverable = value)
        viewModelScope.launch {
            val stored = repository.setDiscoverable(value)
            val current = _uiState.value as? AccountUiState.Content ?: return@launch
            _uiState.value = current.copy(discoverable = stored ?: !value)
        }
    }

    fun requestExport() {
        val state = _uiState.value as? AccountUiState.Content ?: return
        _uiState.value = state.copy(export = ExportUiState.Loading)
        viewModelScope.launch {
            val outcome = repository.requestExport()
            val current = _uiState.value as? AccountUiState.Content ?: return@launch
            _uiState.value = current.copy(
                export = when (outcome) {
                    is ExportOutcome.Ready -> ExportUiState.Ready(outcome.sizeBytes)
                    ExportOutcome.Unavailable -> ExportUiState.Unavailable
                }
            )
        }
    }

    fun signOut() {
        viewModelScope.launch { repository.signOut() }
    }

    fun onDeletionTypedChange(text: String) {
        val state = _uiState.value as? AccountUiState.Content ?: return
        _uiState.value = state.copy(deletion = state.deletion.copy(typed = text, failure = null))
    }

    fun confirmDelete() {
        val state = _uiState.value as? AccountUiState.Content ?: return
        if (!state.deletion.canDelete) return
        _uiState.value = state.copy(deletion = state.deletion.copy(isDeleting = true, failure = null))
        viewModelScope.launch {
            val outcome = repository.deleteAccount()
            if (outcome is DeletionOutcome.Failed) {
                val current = _uiState.value as? AccountUiState.Content ?: return@launch
                _uiState.value = current.copy(
                    deletion = current.deletion.copy(
                        isDeleting = false,
                        failure = "Your account was not deleted. Nothing has been removed. Please check your connection and try again.",
                    )
                )
            }
            // DeletionOutcome.Deleted: nothing left to do — see this class's doc comment.
        }
    }
}
