package com.synapse.app.feature.performance

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.synapse.app.core.api.LeaderboardMetric
import com.synapse.app.core.api.LeaderboardResponse
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch
import java.time.Instant
import javax.inject.Inject

/** Which of the two Performance tabs is showing. */
enum class PerformanceTab { Personal, Leaders }

/** The Top performers panel's own async state — independent of [PersonalStats], which never needs the network. */
sealed interface LeaderboardUiState {
    data object Loading : LeaderboardUiState
    data class Loaded(val response: LeaderboardResponse) : LeaderboardUiState
    /** The board could not be fetched — offline, or the server failed. Never substituted with fabricated rows. */
    data object Unavailable : LeaderboardUiState
}

/** What [PerformanceRoute] renders. */
sealed interface PerformanceUiState {
    data object Loading : PerformanceUiState

    data class Content(
        val tab: PerformanceTab,
        val personal: PersonalStats,
        val metric: LeaderboardMetric,
        val leaderboard: LeaderboardUiState,
    ) : PerformanceUiState
}

/**
 * Drives [PerformanceRoute]. Personal stats are computed once on load, entirely
 * from the local attempt log ([PerformanceRepository.personalStats]) — no reload
 * is needed when switching tabs. The leaderboard is fetched lazily, the first
 * time the Top performers tab is opened, and again whenever the metric toggles.
 */
@HiltViewModel
class PerformanceViewModel @Inject constructor(
    private val repository: PerformanceRepository,
) : ViewModel() {

    var now: () -> Instant = Instant::now

    private val _uiState = MutableStateFlow<PerformanceUiState>(PerformanceUiState.Loading)
    val uiState: StateFlow<PerformanceUiState> = _uiState.asStateFlow()

    init {
        load()
    }

    fun load() {
        viewModelScope.launch {
            val personal = repository.personalStats(now())
            _uiState.value = PerformanceUiState.Content(
                tab = PerformanceTab.Personal,
                personal = personal,
                metric = LeaderboardMetric.ConceptsMastered,
                leaderboard = LeaderboardUiState.Loading,
            )
        }
    }

    fun selectTab(tab: PerformanceTab) {
        val state = _uiState.value as? PerformanceUiState.Content ?: return
        _uiState.value = state.copy(tab = tab)
        if (tab == PerformanceTab.Leaders && state.leaderboard is LeaderboardUiState.Loading) {
            loadLeaderboard(state.metric)
        }
    }

    fun selectMetric(metric: LeaderboardMetric) {
        val state = _uiState.value as? PerformanceUiState.Content ?: return
        if (metric == state.metric) return
        _uiState.value = state.copy(metric = metric, leaderboard = LeaderboardUiState.Loading)
        loadLeaderboard(metric)
    }

    private fun loadLeaderboard(metric: LeaderboardMetric) {
        viewModelScope.launch {
            val outcome = repository.leaderboard(metric)
            val state = _uiState.value as? PerformanceUiState.Content ?: return@launch
            // A metric switch (or reload) while this call was in flight must not clobber the newer request's result.
            if (state.metric != metric) return@launch
            _uiState.value = state.copy(
                leaderboard = when (outcome) {
                    is LeaderboardOutcome.Loaded -> LeaderboardUiState.Loaded(outcome.response)
                    LeaderboardOutcome.Unavailable -> LeaderboardUiState.Unavailable
                },
            )
        }
    }
}
