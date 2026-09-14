package com.synapse.app.feature.maristanas

import androidx.annotation.StringRes
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.synapse.app.R
import com.synapse.app.core.api.ApiException
import com.synapse.app.core.api.RenameHospitalResult
import com.synapse.app.core.maristanas.MaristanaOnboardingState
import com.synapse.app.core.maristanas.MaristanaOverview
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.CancellationException
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch
import java.time.Instant
import javax.inject.Inject

/** What [MaristanasRoute] renders. */
sealed interface MaristanaUiState {
    data object Loading : MaristanaUiState

    data class Content(
        val overview: MaristanaOverview,
        /** True when [overview] is the last-good cached response, not a fresh fetch — the screen should say so rather than imply it is live. */
        val fromCache: Boolean,
        val selectedSlot: Int,
        val onboarding: MaristanaOnboardingState,
        /** Set right after the server refused a rename; cleared by the next successful load. Never presented as though the rename had happened. Already mapped from the wire reason code — see [renameRefusalMessage]. */
        @StringRes val renameRefusalMessage: Int? = null,
    ) : MaristanaUiState

    /** Neither the network nor the offline cache had anything to show. */
    data object Unavailable : MaristanaUiState
}

/**
 * Drives [MaristanasRoute]. Loads the construction ledger (and the student's
 * own onboarding-dismissal doc) once on init and on [refresh]; renaming and
 * dismissing onboarding both write through [MaristanaRepository] then reload
 * so [uiState] always reflects the latest write — mirrors `PracticalViewModel`'s
 * load-on-mutate shape.
 */
@HiltViewModel
class MaristanaViewModel @Inject constructor(
    private val repository: MaristanaRepository,
) : ViewModel() {

    var now: () -> Instant = Instant::now

    private val _uiState = MutableStateFlow<MaristanaUiState>(MaristanaUiState.Loading)
    val uiState: StateFlow<MaristanaUiState> = _uiState.asStateFlow()

    init {
        refresh()
    }

    fun refresh() {
        viewModelScope.launch {
            val onboarding = repository.onboardingState()
            when (val outcome = repository.overview(now())) {
                is MaristanaOverviewOutcome.Loaded -> {
                    val previousSelection = (_uiState.value as? MaristanaUiState.Content)?.selectedSlot
                    val activeSlot = outcome.overview.hospitals.firstOrNull { it.active }?.slot ?: 1
                    val selected = outcome.overview.hospitals.firstOrNull { it.slot == previousSelection }?.slot ?: activeSlot
                    _uiState.value = MaristanaUiState.Content(
                        overview = outcome.overview,
                        fromCache = outcome.fromCache,
                        selectedSlot = selected,
                        onboarding = onboarding,
                    )
                }
                MaristanaOverviewOutcome.Unavailable -> _uiState.value = MaristanaUiState.Unavailable
            }
        }
    }

    fun selectHospital(slot: Int) {
        val state = _uiState.value as? MaristanaUiState.Content ?: return
        if (state.overview.hospitals.none { it.slot == slot }) return
        _uiState.value = state.copy(selectedSlot = slot)
    }

    /** Rename a hospital slot and reload on success. A typed refusal is surfaced; an offline/transport failure leaves the current name in place rather than claiming a refusal that never happened. */
    fun rename(slot: Int, name: String) {
        viewModelScope.launch {
            val result = try {
                repository.rename(slot, name)
            } catch (e: CancellationException) {
                throw e
            } catch (e: ApiException) {
                null
            }
            when (result) {
                is RenameHospitalResult.Renamed -> refresh()
                is RenameHospitalResult.Refused -> {
                    val state = _uiState.value as? MaristanaUiState.Content ?: return@launch
                    _uiState.value = state.copy(renameRefusalMessage = renameRefusalMessage(result.reason))
                }
                null -> Unit
            }
        }
    }

    fun dismissOnboarding() {
        viewModelScope.launch {
            repository.completeOnboarding(now())
            val state = _uiState.value as? MaristanaUiState.Content ?: return@launch
            _uiState.value = state.copy(onboarding = MaristanaOnboardingState(version = 1, completed = true))
        }
    }
}

/** Turns the server's verbatim rename refusal reason (a wire string, never localized itself) into a localized message id. */
@StringRes
private fun renameRefusalMessage(reason: String): Int = when (reason) {
    "hospital_not_unlocked" -> R.string.maristanas_rename_refused_not_unlocked
    "invalid_hospital" -> R.string.maristanas_rename_refused_invalid
    else -> R.string.maristanas_rename_refused_generic
}
