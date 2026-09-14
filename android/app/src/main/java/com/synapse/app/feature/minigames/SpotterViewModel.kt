package com.synapse.app.feature.minigames

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.synapse.app.core.minigames.SpotterGame
import com.synapse.app.core.minigames.buildSpotterGame
import com.synapse.app.core.taxonomy.TaxonomyTerm
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch
import java.time.Instant
import javax.inject.Inject
import kotlin.random.Random

/** What [SpotterRoute] renders. */
sealed interface SpotterUiState {
    data object Loading : SpotterUiState

    data class Content(
        val game: SpotterGame,
        val roundIndex: Int,
        val correct: Int,
        /** The option chosen for the current round, or null before an answer is picked. */
        val chosen: String?,
        val startedAt: Instant,
        val finishedAt: Instant?,
    ) : SpotterUiState
}

/**
 * Drives [SpotterRoute]: loads the published glossary once (see
 * `core/minigames/Spotter.kt`'s KDoc for why this reads the glossary rather
 * than histology slides), then plays entirely in-memory — mirrors
 * `TaxonomyViewModel`'s load-once shape.
 */
@HiltViewModel
class SpotterViewModel @Inject constructor(
    private val repository: MinigamesRepository,
) : ViewModel() {

    var randomSeed: () -> Int = { Random.nextInt(0, Int.MAX_VALUE) }
    var now: () -> Instant = Instant::now

    private var terms: List<TaxonomyTerm> = emptyList()

    private val _uiState = MutableStateFlow<SpotterUiState>(SpotterUiState.Loading)
    val uiState: StateFlow<SpotterUiState> = _uiState.asStateFlow()

    init {
        load()
    }

    fun load() {
        viewModelScope.launch {
            terms = repository.glossary().terms
            newGame()
        }
    }

    fun newGame() {
        val game = buildSpotterGame(terms, randomSeed())
        _uiState.value = SpotterUiState.Content(
            game = game,
            roundIndex = 0,
            correct = 0,
            chosen = null,
            startedAt = now(),
            finishedAt = null,
        )
    }

    fun choose(option: String) {
        val state = _uiState.value as? SpotterUiState.Content ?: return
        if (state.chosen != null) return
        val round = state.game.rounds.getOrNull(state.roundIndex) ?: return
        val isCorrect = option == round.answer
        _uiState.value = state.copy(chosen = option, correct = if (isCorrect) state.correct + 1 else state.correct)
    }

    fun advance() {
        val state = _uiState.value as? SpotterUiState.Content ?: return
        val nextIndex = state.roundIndex + 1
        _uiState.value = if (nextIndex >= state.game.rounds.size) {
            state.copy(finishedAt = now())
        } else {
            state.copy(roundIndex = nextIndex, chosen = null)
        }
    }
}
