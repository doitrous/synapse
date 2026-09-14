package com.synapse.app.feature.practical

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.synapse.app.core.practical.Practical
import com.synapse.app.core.practical.PracticalProgress
import com.synapse.app.core.practical.totalMarkItems
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch
import java.time.Instant
import javax.inject.Inject

/** What [PracticalScreen] renders. */
sealed interface PracticalUiState {
    data object Loading : PracticalUiState

    data class Content(
        val osceStations: List<Practical>,
        val clinicalCases: List<Practical>,
        /** "Skills checklist" items. A checklist with its own mark scheme runs through the runner like a station; one with none is rated straight from the row (see [PracticalScreen]). */
        val skills: List<Practical>,
        val progress: PracticalProgress,
    ) : PracticalUiState
}

/**
 * Drives [PracticalRoute]: loads the practical catalogue (grouped into the
 * three tabs this pass implements) and the student's own progress, then owns
 * recording a station/case run and cycling a skill — a thin pass-through to
 * [PracticalRepository], reloading afterward so [uiState] always reflects the
 * latest write. Mirrors `LibraryViewModel`'s load-on-mutate shape.
 */
@HiltViewModel
class PracticalViewModel @Inject constructor(
    private val repository: PracticalRepository,
) : ViewModel() {

    var now: () -> Instant = Instant::now

    private val _uiState = MutableStateFlow<PracticalUiState>(PracticalUiState.Loading)
    val uiState: StateFlow<PracticalUiState> = _uiState.asStateFlow()

    init {
        load()
    }

    fun load() {
        viewModelScope.launch {
            if (_uiState.value !is PracticalUiState.Content) {
                _uiState.value = PracticalUiState.Loading
            }
            _uiState.value = buildContent()
        }
    }

    private suspend fun buildContent(): PracticalUiState.Content {
        val items = repository.practicals()
        return PracticalUiState.Content(
            osceStations = items.filter { it.type == "OSCE station" },
            clinicalCases = items.filter { it.type == "Clinical case" },
            skills = items.filter { it.type == "Skills checklist" },
            progress = repository.progress(),
        )
    }

    /** Keep a finished station/checklist-with-a-mark-scheme run and reload. */
    fun finishRun(practical: Practical, ticked: Set<String>) {
        viewModelScope.launch {
            repository.recordStation(practical.id, marks = ticked.size, outOf = practical.totalMarkItems(), checkedItems = ticked.sorted(), now = now())
            load()
        }
    }

    /** Keep a case's progress and reload. [reachedStep]/[completed] follow the "answers revealed" gate `PracticalRunner` uses. */
    fun advanceCase(practical: Practical, reachedStep: Int, completed: Boolean) {
        viewModelScope.launch {
            repository.recordCase(practical.id, lastStep = reachedStep, steps = practical.decisions.size, completed = completed, now = now())
            load()
        }
    }

    fun cycleSkill(skillId: String) {
        viewModelScope.launch {
            repository.cycleSkill(skillId, now())
            load()
        }
    }
}
