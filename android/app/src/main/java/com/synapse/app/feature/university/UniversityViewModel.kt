package com.synapse.app.feature.university

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.synapse.app.core.api.ApiException
import com.synapse.app.core.api.EnrollmentChangeRequest
import com.synapse.app.core.api.EnrollmentChangeSubmission
import com.synapse.app.core.api.EnrollmentField
import com.synapse.app.core.university.StudentCurriculumMap
import com.synapse.app.core.university.normalizeStudentUniversityProjection
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.CancellationException
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch
import java.time.Instant
import javax.inject.Inject

/** What [UniversityScreen] renders. */
sealed interface UniversityUiState {
    data object Loading : UniversityUiState

    data class Content(
        val map: StudentCurriculumMap,
        /** True when [map] came from the local cache, not this load's own network read. */
        val stale: Boolean,
        val changeRequests: List<EnrollmentChangeRequest>,
    ) : UniversityUiState

    /** Neither a fresh nor a cached read succeeded — never shown alongside fabricated data. */
    data object Unavailable : UniversityUiState
}

/** A one-shot outcome of [UniversityViewModel.submitChangeRequest], for a snackbar/dialog the screen clears with [UniversityViewModel.consumeChangeRequestResult]. */
sealed interface ChangeRequestResult {
    data object Submitted : ChangeRequestResult
    data class Refused(val reason: String) : ChangeRequestResult
    data object Failed : ChangeRequestResult
}

/**
 * Drives [UniversityScreen]: loads the programme map and this student's own
 * enrollment-change requests, and owns submitting a new change request.
 * Mirrors `LibraryViewModel`'s load-on-mutate shape, with an [Unavailable]
 * terminal state (rather than an infinite spinner) for the case neither a
 * fresh nor a cached read succeeds.
 */
@HiltViewModel
class UniversityViewModel @Inject constructor(
    private val repository: UniversityRepository,
) : ViewModel() {

    var now: () -> Instant = Instant::now

    private val _uiState = MutableStateFlow<UniversityUiState>(UniversityUiState.Loading)
    val uiState: StateFlow<UniversityUiState> = _uiState.asStateFlow()

    private val _lastChangeRequestResult = MutableStateFlow<ChangeRequestResult?>(null)
    val lastChangeRequestResult: StateFlow<ChangeRequestResult?> = _lastChangeRequestResult.asStateFlow()

    init {
        load()
    }

    fun load() {
        viewModelScope.launch {
            if (_uiState.value !is UniversityUiState.Content) {
                _uiState.value = UniversityUiState.Loading
            }
            val instant = now()
            when (val outcome = repository.projection(instant)) {
                is UniversityProjectionOutcome.Loaded -> {
                    val map = normalizeStudentUniversityProjection(outcome.projection, instant)
                    _uiState.value = UniversityUiState.Content(map, outcome.stale, repository.enrollmentChangeRequests())
                }
                UniversityProjectionOutcome.Unavailable -> _uiState.value = UniversityUiState.Unavailable
            }
        }
    }

    fun submitChangeRequest(field: EnrollmentField, requestedValue: String, reason: String) {
        viewModelScope.launch {
            try {
                when (val result = repository.requestEnrollmentChange(field, requestedValue, reason)) {
                    is EnrollmentChangeSubmission.Submitted -> {
                        _lastChangeRequestResult.value = ChangeRequestResult.Submitted
                        load()
                    }
                    is EnrollmentChangeSubmission.Refused -> _lastChangeRequestResult.value = ChangeRequestResult.Refused(result.reason)
                }
            } catch (e: CancellationException) {
                throw e
            } catch (e: ApiException) {
                _lastChangeRequestResult.value = ChangeRequestResult.Failed
            }
        }
    }

    fun consumeChangeRequestResult() {
        _lastChangeRequestResult.value = null
    }
}
