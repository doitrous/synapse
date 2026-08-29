package com.synapse.app.feature.qbank

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.synapse.app.core.qbank.Question
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.update
import kotlinx.coroutines.launch
import javax.inject.Inject

/** What [OfflineDownloadScreen] renders. */
data class PinnedScopesUiState(
    val pinnedScopes: List<Set<String>> = emptyList(),
    val downloading: Boolean = false,
    val progressDone: Int = 0,
    val progressTotal: Int = 0,
    val lastResult: PinResult? = null,
)

/**
 * Drives [OfflineDownloadScreen]: downloading (pinning) the current scope for
 * offline use, and managing the scopes already pinned on this device.
 * Depends on [QBankOfflineStore] rather than [QBankRepository] directly so it
 * can be unit-tested with a plain fake instead of standing up
 * [QBankRepository]'s DataStore/MediaCache/Retrofit collaborators.
 */
@HiltViewModel
class PinnedScopesViewModel @Inject constructor(
    private val store: QBankOfflineStore,
) : ViewModel() {

    private val _uiState = MutableStateFlow(PinnedScopesUiState())
    val uiState: StateFlow<PinnedScopesUiState> = _uiState.asStateFlow()

    init {
        refresh()
    }

    fun refresh() {
        viewModelScope.launch {
            _uiState.update { it.copy(pinnedScopes = store.pinnedScopes()) }
        }
    }

    /**
     * Pin [scope] for offline use. Media prefetch is currently a no-op (see
     * [QBankRepository.pinScopeForOffline] — [Question] carries no media
     * field yet), so today this mainly records the scope as pinned; the
     * progress/count plumbing is forward-compatible with real media once
     * content references it.
     */
    fun download(scope: Set<String>, questions: List<Question>) {
        viewModelScope.launch {
            _uiState.update { it.copy(downloading = true, progressDone = 0, progressTotal = 0, lastResult = null) }
            val result = store.pinScopeForOffline(
                scope = scope,
                questions = questions,
                onProgress = { done, total -> _uiState.update { it.copy(progressDone = done, progressTotal = total) } },
            )
            _uiState.update { it.copy(downloading = false, lastResult = result) }
            refresh()
        }
    }

    fun remove(scope: Set<String>) {
        viewModelScope.launch {
            store.unpin(scope)
            refresh()
        }
    }
}
