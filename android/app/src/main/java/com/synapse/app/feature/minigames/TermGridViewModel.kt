package com.synapse.app.feature.minigames

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.synapse.app.core.minigames.Grid
import com.synapse.app.core.minigames.GridDirection
import com.synapse.app.core.minigames.GridTerm
import com.synapse.app.core.minigames.PlacedWord
import com.synapse.app.core.minigames.buildGrid
import com.synapse.app.core.minigames.givenTermsForGrid
import com.synapse.app.core.minigames.normalizeTermGridLetter
import com.synapse.app.core.taxonomy.TaxonomyCatalogue
import com.synapse.app.core.taxonomy.TaxonomyCategory
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch
import java.time.Instant
import javax.inject.Inject
import kotlin.random.Random

/** The (row, column) [word]'s [index]-th letter lands on — shared by the view model and screen. */
fun cellFor(word: PlacedWord, index: Int): Pair<Int, Int> {
    val row = if (word.direction == GridDirection.DOWN) word.row + index else word.row
    val column = if (word.direction == GridDirection.ACROSS) word.column + index else word.column
    return row to column
}

private fun cellKey(row: Int, column: Int): String = "$row,$column"

/** What [TermGridRoute] renders. */
sealed interface TermGridUiState {
    data object Loading : TermGridUiState

    data class Content(
        val categories: List<TaxonomyCategory>,
        val category: String,
        val grid: Grid,
        /** Terms deterministically prefilled for this seed — shown as fixed, non-editable letters. */
        val givenWords: Set<String>,
        /** Typed (or given/revealed) letters, keyed by [cellKey]. */
        val letters: Map<String, String>,
        val revealedWords: Set<String>,
        val checkedOnce: Boolean,
        val startedAt: Instant,
        val finishedAt: Instant?,
    ) : TermGridUiState
}

/**
 * Drives [TermGridRoute]: loads the published glossary once, then builds and
 * plays one category's puzzle purely in-memory.
 *
 * Ships the full [buildGrid] generation/scoring logic; the board itself is
 * the functional-but-simpler native version this surface's scope guidance
 * allows (see `core/minigames/TermGrid.kt`'s file KDoc) — per-cell focus
 * wrapping and cursor-follow typing (`TermGridBoard.tsx` on web) are
 * deferred, not the crossword rules.
 */
@HiltViewModel
class TermGridViewModel @Inject constructor(
    private val repository: MinigamesRepository,
) : ViewModel() {

    var randomSeed: () -> Int = { Random.nextInt(0, Int.MAX_VALUE) }
    var now: () -> Instant = Instant::now

    private var glossary: TaxonomyCatalogue = TaxonomyCatalogue(emptyList(), emptyList())

    private val _uiState = MutableStateFlow<TermGridUiState>(TermGridUiState.Loading)
    val uiState: StateFlow<TermGridUiState> = _uiState.asStateFlow()

    init {
        load()
    }

    fun load() {
        viewModelScope.launch {
            glossary = repository.glossary()
            newPuzzle(glossary.categories.firstOrNull()?.key.orEmpty())
        }
    }

    fun selectCategory(category: String) = newPuzzle(category)

    fun newPuzzle(category: String = currentCategory()) {
        val terms = glossary.terms.filter { it.category == category }.map { GridTerm(it.term, it.definition) }
        val seed = randomSeed()
        val grid = buildGrid(terms, seed)
        val givenWords = givenTermsForGrid(grid, seed).toSet()

        val letters = mutableMapOf<String, String>()
        for (word in grid.words) {
            if (word.term !in givenWords) continue
            for (i in word.term.indices) {
                val (row, column) = cellFor(word, i)
                letters[cellKey(row, column)] = word.term[i].toString()
            }
        }

        _uiState.value = TermGridUiState.Content(
            categories = glossary.categories,
            category = category,
            grid = grid,
            givenWords = givenWords,
            letters = letters,
            revealedWords = emptySet(),
            checkedOnce = false,
            startedAt = now(),
            finishedAt = null,
        )
    }

    fun setLetter(row: Int, column: Int, rawInput: String) {
        val state = _uiState.value as? TermGridUiState.Content ?: return
        if (state.finishedAt != null) return
        val letter = normalizeTermGridLetter(rawInput)
        val next = state.letters + (cellKey(row, column) to letter)
        _uiState.value = state.copy(letters = next, finishedAt = if (isComplete(state.grid, next)) now() else state.finishedAt)
    }

    fun revealWord(term: String) {
        val state = _uiState.value as? TermGridUiState.Content ?: return
        val word = state.grid.words.find { it.term == term } ?: return
        val next = state.letters.toMutableMap()
        for (i in word.term.indices) {
            val (row, column) = cellFor(word, i)
            next[cellKey(row, column)] = word.term[i].toString()
        }
        _uiState.value = state.copy(
            letters = next,
            revealedWords = state.revealedWords + term,
            finishedAt = if (isComplete(state.grid, next)) now() else null,
        )
    }

    fun check() {
        val state = _uiState.value as? TermGridUiState.Content ?: return
        _uiState.value = state.copy(checkedOnce = true)
    }

    private fun currentCategory(): String =
        (_uiState.value as? TermGridUiState.Content)?.category ?: glossary.categories.firstOrNull()?.key.orEmpty()
}

private fun isComplete(grid: Grid, letters: Map<String, String>): Boolean {
    if (grid.words.isEmpty()) return false
    for (word in grid.words) {
        for (i in word.term.indices) {
            val (row, column) = cellFor(word, i)
            if (letters[cellKey(row, column)] != word.term[i].toString()) return false
        }
    }
    return true
}
