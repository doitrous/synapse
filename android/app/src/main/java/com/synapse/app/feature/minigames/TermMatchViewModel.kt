package com.synapse.app.feature.minigames

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.synapse.app.core.minigames.MatchBoard
import com.synapse.app.core.minigames.MatchMode
import com.synapse.app.core.minigames.buildMatchBoard
import com.synapse.app.core.minigames.isPair
import com.synapse.app.core.taxonomy.TaxonomyTerm
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch
import java.time.Instant
import javax.inject.Inject
import kotlin.random.Random

/** What [TermMatchRoute] renders. */
sealed interface TermMatchUiState {
    data object Loading : TermMatchUiState

    data class Content(
        val board: MatchBoard,
        val mode: MatchMode,
        val selectedId: String?,
        val matchedIds: Set<String>,
        /** The (exactly two, while shown) tile ids flagged red after a wrong guess — cleared by the screen after a short flash. */
        val wrongIds: Set<String>,
        val wrongAttempts: Int,
        val startedAt: Instant,
        val finishedAt: Instant?,
    ) : TermMatchUiState
}

/**
 * Drives [TermMatchRoute]: loads the published glossary once, then builds
 * and plays boards purely in-memory — mirrors `TaxonomyViewModel`'s
 * load-once shape, since the glossary never changes locally between loads.
 */
@HiltViewModel
class TermMatchViewModel @Inject constructor(
    private val repository: MinigamesRepository,
) : ViewModel() {

    var randomSeed: () -> Int = { Random.nextInt(0, Int.MAX_VALUE) }
    var now: () -> Instant = Instant::now

    private var terms: List<TaxonomyTerm> = emptyList()

    private val _uiState = MutableStateFlow<TermMatchUiState>(TermMatchUiState.Loading)
    val uiState: StateFlow<TermMatchUiState> = _uiState.asStateFlow()

    init {
        load()
    }

    fun load() {
        viewModelScope.launch {
            terms = repository.glossary().terms
            newGame(MatchMode.ARABIC)
        }
    }

    fun newGame(mode: MatchMode = currentMode()) {
        val board = buildMatchBoard(terms, mode, randomSeed())
        _uiState.value = TermMatchUiState.Content(
            board = board,
            mode = mode,
            selectedId = null,
            matchedIds = emptySet(),
            wrongIds = emptySet(),
            wrongAttempts = 0,
            startedAt = now(),
            finishedAt = null,
        )
    }

    /** Tap one tile — mirrors web's `handleTap`: first tap selects, a matching second tap clears both into [Content.matchedIds], a mismatched one flags both in [Content.wrongIds] for the screen to flash and then [clearWrongFlash]. */
    fun tap(tileId: String) {
        val state = _uiState.value as? TermMatchUiState.Content ?: return
        if (state.board.refusal != null) return
        if (tileId in state.matchedIds || state.wrongIds.isNotEmpty()) return

        if (state.selectedId == tileId) {
            _uiState.value = state.copy(selectedId = null)
            return
        }
        if (state.selectedId == null) {
            _uiState.value = state.copy(selectedId = tileId)
            return
        }

        val first = state.board.tiles.find { it.id == state.selectedId }
        val second = state.board.tiles.find { it.id == tileId }
        if (first == null || second == null) {
            _uiState.value = state.copy(selectedId = tileId)
            return
        }

        if (isPair(first, second)) {
            val matched = state.matchedIds + first.id + second.id
            val finished = matched.size == state.board.tiles.size
            _uiState.value = state.copy(
                matchedIds = matched,
                selectedId = null,
                finishedAt = if (finished) now() else state.finishedAt,
            )
        } else {
            _uiState.value = state.copy(
                wrongAttempts = state.wrongAttempts + 1,
                wrongIds = setOf(first.id, second.id),
                selectedId = null,
            )
        }
    }

    /** Called by the screen after its mismatch flash beat elapses. */
    fun clearWrongFlash() {
        val state = _uiState.value as? TermMatchUiState.Content ?: return
        _uiState.value = state.copy(wrongIds = emptySet())
    }

    private fun currentMode(): MatchMode = (_uiState.value as? TermMatchUiState.Content)?.mode ?: MatchMode.ARABIC
}
