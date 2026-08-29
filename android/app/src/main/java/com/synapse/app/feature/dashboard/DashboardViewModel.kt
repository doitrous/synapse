package com.synapse.app.feature.dashboard

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch
import java.time.Instant
import javax.inject.Inject

/** What [DashboardScreen] renders, driven by [DashboardViewModel.refresh]. */
sealed interface DashboardUiState {
    data object Loading : DashboardUiState
    data class Content(val state: DashboardState) : DashboardUiState
    data object Offline : DashboardUiState
}

/**
 * Drives the Dashboard screen: refreshes via [DashboardRepository] as soon as it's created,
 * and again whenever the student taps "Sync now" ([refresh]). [now] is a plain overridable
 * property rather than a constructor parameter, so tests can swap in a fixed [Instant]
 * without fighting Hilt's handling of `@Inject` constructor defaults.
 */
@HiltViewModel
class DashboardViewModel @Inject constructor(
    private val repository: DashboardRepository,
) : ViewModel() {

    var now: () -> Instant = Instant::now

    private val _uiState = MutableStateFlow<DashboardUiState>(DashboardUiState.Loading)
    val uiState: StateFlow<DashboardUiState> = _uiState.asStateFlow()

    init {
        refresh()
    }

    fun refresh() {
        viewModelScope.launch {
            _uiState.value = DashboardUiState.Loading
            val result = repository.refresh(now())
            _uiState.value = if (result.syncedOk) {
                DashboardUiState.Content(result)
            } else {
                DashboardUiState.Offline
            }
        }
    }
}
