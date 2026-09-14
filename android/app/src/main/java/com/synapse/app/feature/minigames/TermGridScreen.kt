package com.synapse.app.feature.minigames

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.horizontalScroll
import androidx.compose.foundation.verticalScroll
import androidx.compose.foundation.text.BasicTextField
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.material3.Button
import androidx.compose.material3.Card
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedButton
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.remember
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.text.TextRange
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.input.KeyboardCapitalization
import androidx.compose.ui.text.input.TextFieldValue
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import com.synapse.app.core.minigames.GridDirection
import com.synapse.app.core.minigames.MIN_TERMS
import com.synapse.app.core.minigames.PlacedWord
import java.time.Duration

const val TERM_GRID_LOADING_TAG = "term_grid_loading"
fun termGridCellTag(row: Int, column: Int): String = "term_grid_cell_${row}_$column"

@Composable
fun TermGridRoute(onBack: () -> Unit, viewModel: TermGridViewModel = hiltViewModel()) {
    val uiState by viewModel.uiState.collectAsStateWithLifecycle()
    Column(modifier = Modifier.fillMaxSize().padding(16.dp)) {
        GameHeader(title = "Term Grid", onBack = onBack)
        Text(
            "A crossword built from the glossary — fill in each term from its definition.",
            style = MaterialTheme.typography.bodyMedium,
            modifier = Modifier.padding(top = 4.dp, bottom = 16.dp),
        )

        when (val state = uiState) {
            is TermGridUiState.Loading -> Text("Loading…", modifier = Modifier.testTag(TERM_GRID_LOADING_TAG))
            is TermGridUiState.Content -> TermGridContent(
                state = state,
                onSelectCategory = viewModel::selectCategory,
                onLetterChange = viewModel::setLetter,
                onRevealWord = viewModel::revealWord,
                onNewPuzzle = { viewModel.newPuzzle() },
            )
        }
    }
}

@Composable
private fun TermGridContent(
    state: TermGridUiState.Content,
    onSelectCategory: (String) -> Unit,
    onLetterChange: (Int, Int, String) -> Unit,
    onRevealWord: (String) -> Unit,
    onNewPuzzle: () -> Unit,
) {
    if (state.categories.isEmpty()) {
        Text("The glossary has not been published yet.", style = MaterialTheme.typography.bodyMedium)
        return
    }

    Row(
        horizontalArrangement = Arrangement.spacedBy(8.dp),
        modifier = Modifier.horizontalScroll(rememberScrollState()).padding(bottom = 12.dp),
    ) {
        for (category in state.categories) {
            if (category.key == state.category) {
                Button(onClick = { onSelectCategory(category.key) }) { Text(category.key) }
            } else {
                OutlinedButton(onClick = { onSelectCategory(category.key) }) { Text(category.key) }
            }
        }
    }

    if (state.grid.words.isEmpty()) {
        Text(
            "Term Grid needs at least $MIN_TERMS terms in a category that can interlock into a crossword. This one has too few — try another category.",
            style = MaterialTheme.typography.bodyMedium,
        )
        return
    }

    if (state.finishedAt != null) {
        val elapsed = Duration.between(state.startedAt, state.finishedAt)
        Card(modifier = Modifier.fillMaxWidth().padding(bottom = 12.dp)) {
            Column(modifier = Modifier.padding(12.dp)) {
                Text("Time taken: ${elapsed.seconds}s", style = MaterialTheme.typography.bodyMedium)
                Text("Words revealed: ${state.revealedWords.size}", style = MaterialTheme.typography.bodyMedium)
                Button(onClick = onNewPuzzle, modifier = Modifier.padding(top = 8.dp)) { Text("New puzzle") }
            }
        }
        return
    }

    Column(modifier = Modifier.fillMaxSize().verticalScroll(rememberScrollState())) {
        TermGridBoard(state, onLetterChange)

        Row(horizontalArrangement = Arrangement.spacedBy(8.dp), modifier = Modifier.padding(vertical = 12.dp)) {
            OutlinedButton(onClick = onNewPuzzle) { Text("New puzzle") }
        }

        ClueList(state.grid.words.filter { it.direction == GridDirection.ACROSS }, "Across", state.revealedWords, onRevealWord)
        ClueList(state.grid.words.filter { it.direction == GridDirection.DOWN }, "Down", state.revealedWords, onRevealWord)
    }
}

private const val CELL_SIZE_DP = 28

/**
 * A functional (if visually simpler) native crossword board: one small text
 * field per used square, no per-cell focus-jump-on-type or cursor-follow —
 * see `core/minigames/TermGrid.kt`'s file KDoc for why that polish is
 * deferred here while the full generation/scoring logic above it is not.
 */
@Composable
private fun TermGridBoard(state: TermGridUiState.Content, onLetterChange: (Int, Int, String) -> Unit) {
    val grid = state.grid
    val usedCells = remember(grid) {
        grid.words.flatMap { word -> word.term.indices.map { i -> cellFor(word, i) } }.toSet()
    }
    val numberAt = remember(grid) {
        grid.words.associate { (it.row to it.column) to it.number }
    }

    Column(modifier = Modifier.horizontalScroll(rememberScrollState())) {
        for (row in 0 until grid.height) {
            Row {
                for (column in 0 until grid.width) {
                    if ((row to column) !in usedCells) {
                        Box(modifier = Modifier.size(CELL_SIZE_DP.dp))
                        continue
                    }
                    val key = "$row,$column"
                    val given = key in givenCellKeys(state)
                    val number = numberAt[row to column]
                    Box(
                        modifier = Modifier
                            .size(CELL_SIZE_DP.dp)
                            .border(1.dp, MaterialTheme.colorScheme.outline)
                            .background(if (given) MaterialTheme.colorScheme.surfaceVariant else Color.Transparent)
                            .testTag(termGridCellTag(row, column)),
                        contentAlignment = Alignment.Center,
                    ) {
                        if (number != null) {
                            Text(
                                "$number",
                                style = TextStyle(fontSize = 8.sp),
                                modifier = Modifier.align(Alignment.TopStart).padding(1.dp),
                            )
                        }
                        val value = state.letters[key].orEmpty()
                        if (given) {
                            Text(value, style = MaterialTheme.typography.bodyMedium)
                        } else {
                            BasicTextField(
                                value = TextFieldValue(value, selection = TextRange(value.length)),
                                onValueChange = { onLetterChange(row, column, it.text) },
                                singleLine = true,
                                textStyle = TextStyle(fontSize = 14.sp, textAlign = TextAlign.Center),
                                keyboardOptions = KeyboardOptions(capitalization = KeyboardCapitalization.Characters),
                                modifier = Modifier.fillMaxWidth().padding(horizontal = 2.dp),
                            )
                        }
                    }
                }
            }
        }
    }
}

private fun givenCellKeys(state: TermGridUiState.Content): Set<String> {
    val keys = mutableSetOf<String>()
    for (word in state.grid.words) {
        if (word.term !in state.givenWords) continue
        for (i in word.term.indices) {
            val (row, column) = cellFor(word, i)
            keys += "$row,$column"
        }
    }
    return keys
}

@Composable
private fun ClueList(words: List<PlacedWord>, heading: String, revealedWords: Set<String>, onRevealWord: (String) -> Unit) {
    if (words.isEmpty()) return
    Text(heading, style = MaterialTheme.typography.titleMedium, modifier = Modifier.padding(top = 8.dp, bottom = 4.dp))
    for (word in words.sortedBy { it.number }) {
        Row(
            modifier = Modifier.fillMaxWidth().padding(vertical = 2.dp),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically,
        ) {
            Text(
                "${word.number}. ${word.clue} (${word.term.length})",
                style = MaterialTheme.typography.bodyMedium,
                modifier = Modifier.weight(1f),
            )
            if (word.term in revealedWords) {
                Text("Revealed", style = MaterialTheme.typography.labelSmall)
            } else {
                TextButton(onClick = { onRevealWord(word.term) }) { Text("Reveal") }
            }
        }
    }
}
