package com.synapse.app

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.synapse.app.core.i18n.LocaleController
import com.synapse.app.design.ThemeChoice
import com.synapse.app.design.ThemePreference
import com.synapse.app.feature.account.AccountRepository
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.SharingStarted
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.stateIn
import kotlinx.coroutines.launch
import javax.inject.Inject

/**
 * Backs [MainActivity]'s root composable so it stays a thin shell: exposes the persisted
 * [ThemeChoice] as a [StateFlow] (for `collectAsStateWithLifecycle`) and lets the shell
 * request a change without [MainActivity] touching [ThemePreference] or coroutine scopes
 * directly. Also applies the student's stored `synapse-lang` ([AccountRepository.language])
 * as the app's per-app locale once, at process start — [com.synapse.app.feature.account.AccountViewModel.setLanguage]
 * re-applies it immediately whenever the student changes it from Account.
 */
@HiltViewModel
class RootViewModel @Inject constructor(
    private val themePreference: ThemePreference,
    private val accountRepository: AccountRepository,
) : ViewModel() {

    val choice: StateFlow<ThemeChoice> = themePreference.choice.stateIn(
        scope = viewModelScope,
        started = SharingStarted.Eagerly,
        initialValue = ThemeChoice.Light,
    )

    init {
        viewModelScope.launch { LocaleController.apply(accountRepository.language()) }
    }

    fun setChoice(choice: ThemeChoice) {
        viewModelScope.launch { themePreference.set(choice) }
    }
}
