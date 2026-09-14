package com.synapse.app.feature.minigames

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowBack
import androidx.compose.material.icons.filled.KeyboardArrowDown
import androidx.compose.material.icons.filled.KeyboardArrowUp
import androidx.compose.material3.Button
import androidx.compose.material3.Card
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.unit.dp
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.lifecycle.ViewModel
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import com.synapse.app.R
import com.synapse.app.core.minigames.MiniGameKind
import com.synapse.app.core.minigames.OrderedMiniGamePack
import com.synapse.app.core.minigames.OrderedStepScore
import com.synapse.app.core.minigames.scoreOrderedSteps
import com.synapse.app.core.minigames.shuffledStepIds
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import javax.inject.Inject
import kotlin.random.Random

/**
 * Clinical Sequence and Mechanism Chain — one shared engine for both, since
 * both are the same "reconstruct the authored order" game over a different
 * [MiniGameKind], mirroring web's single `AuthoredOrderGamePage` parametrized
 * on `kind`. Two distinct `@HiltViewModel` classes below (rather than one
 * shared class) so each destination resolves its own instance: `hiltViewModel()`
 * scopes by class, and reusing one class for two call sites under this
 * module's own (non-`NavHost`) position switch would collapse them into a
 * single shared instance.
 */
sealed interface OrderedGameUiState {
    /** No valid built-in pack for this kind — nothing to play. */
    data object Unavailable : OrderedGameUiState

    data class Content(
        val pack: OrderedMiniGamePack,
        /** The steps' ids, in the student's current (shuffled/reordered) order. */
        val ids: List<String>,
        val checked: Boolean,
    ) : OrderedGameUiState
}

/** Ported from web's `move`: reorder [ids] by moving the item at [from] to [to], a no-op past either end. */
private fun moveStep(ids: List<String>, from: Int, to: Int): List<String> {
    if (to < 0 || to >= ids.size || from == to) return ids
    val next = ids.toMutableList()
    val item = next.removeAt(from)
    next.add(to, item)
    return next
}

/** Built for [kind] from [repository]'s static pack list — no I/O, since pack resolution is an in-memory lookup. `null` when no valid built-in pack exists for [kind]. */
private fun orderedGameState(kind: MiniGameKind, repository: MinigamesRepository, seed: Int): OrderedGameUiState {
    val pack = repository.packs(kind).filterIsInstance<OrderedMiniGamePack>().firstOrNull()
        ?: return OrderedGameUiState.Unavailable
    return OrderedGameUiState.Content(pack, shuffledStepIds(pack, seed), checked = false)
}

@HiltViewModel
class ClinicalSequenceViewModel @Inject constructor(private val repository: MinigamesRepository) : ViewModel() {
    var randomSeed: () -> Int = { Random.nextInt(0, Int.MAX_VALUE) }

    private val _uiState = MutableStateFlow(orderedGameState(MiniGameKind.CLINICAL_SEQUENCE, repository, randomSeed()))
    val uiState: StateFlow<OrderedGameUiState> = _uiState.asStateFlow()

    fun newGame() { _uiState.value = orderedGameState(MiniGameKind.CLINICAL_SEQUENCE, repository, randomSeed()) }
    fun move(from: Int, to: Int) { _uiState.value = moveInState(_uiState.value, from, to) }
    fun check() { _uiState.value = checkInState(_uiState.value) }
}

@HiltViewModel
class MechanismChainViewModel @Inject constructor(private val repository: MinigamesRepository) : ViewModel() {
    var randomSeed: () -> Int = { Random.nextInt(0, Int.MAX_VALUE) }

    private val _uiState = MutableStateFlow(orderedGameState(MiniGameKind.MECHANISM_CHAIN, repository, randomSeed()))
    val uiState: StateFlow<OrderedGameUiState> = _uiState.asStateFlow()

    fun newGame() { _uiState.value = orderedGameState(MiniGameKind.MECHANISM_CHAIN, repository, randomSeed()) }
    fun move(from: Int, to: Int) { _uiState.value = moveInState(_uiState.value, from, to) }
    fun check() { _uiState.value = checkInState(_uiState.value) }
}

private fun moveInState(state: OrderedGameUiState, from: Int, to: Int): OrderedGameUiState {
    val content = state as? OrderedGameUiState.Content ?: return state
    return content.copy(ids = moveStep(content.ids, from, to), checked = false)
}

private fun checkInState(state: OrderedGameUiState): OrderedGameUiState {
    val content = state as? OrderedGameUiState.Content ?: return state
    return content.copy(checked = true)
}

const val ORDERED_GAME_CHECK_BUTTON_TAG = "ordered_game_check_button"
const val ORDERED_GAME_NEW_GAME_BUTTON_TAG = "ordered_game_new_game_button"
fun orderedGameStepRowTag(stepId: String): String = "ordered_game_step_$stepId"

@Composable
fun ClinicalSequenceRoute(onBack: () -> Unit, viewModel: ClinicalSequenceViewModel = hiltViewModel()) {
    val uiState by viewModel.uiState.collectAsStateWithLifecycle()
    OrderedGameScreen(
        title = stringResource(R.string.minigames_clinicalsequence_title),
        description = stringResource(R.string.minigames_clinicalsequence_description),
        uiState = uiState,
        onMove = viewModel::move,
        onCheck = viewModel::check,
        onNewGame = viewModel::newGame,
        onBack = onBack,
    )
}

@Composable
fun MechanismChainRoute(onBack: () -> Unit, viewModel: MechanismChainViewModel = hiltViewModel()) {
    val uiState by viewModel.uiState.collectAsStateWithLifecycle()
    OrderedGameScreen(
        title = stringResource(R.string.minigames_mechanismchain_title),
        description = stringResource(R.string.minigames_mechanismchain_description),
        uiState = uiState,
        onMove = viewModel::move,
        onCheck = viewModel::check,
        onNewGame = viewModel::newGame,
        onBack = onBack,
    )
}

@Composable
private fun OrderedGameScreen(
    title: String,
    description: String,
    uiState: OrderedGameUiState,
    onMove: (Int, Int) -> Unit,
    onCheck: () -> Unit,
    onNewGame: () -> Unit,
    onBack: () -> Unit,
) {
    Column(modifier = Modifier.fillMaxSize().padding(16.dp)) {
        GameHeader(title = title, onBack = onBack)
        Text(description, style = MaterialTheme.typography.bodyMedium, modifier = Modifier.padding(top = 4.dp, bottom = 16.dp))

        when (uiState) {
            is OrderedGameUiState.Unavailable -> Text(
                stringResource(R.string.minigames_pack_unavailable),
                style = MaterialTheme.typography.bodyMedium,
            )

            is OrderedGameUiState.Content -> OrderedGameContent(uiState, onMove, onCheck, onNewGame)
        }
    }
}

@Composable
private fun OrderedGameContent(
    state: OrderedGameUiState.Content,
    onMove: (Int, Int) -> Unit,
    onCheck: () -> Unit,
    onNewGame: () -> Unit,
) {
    val pack = state.pack
    val byId = pack.steps.associateBy { it.id }
    val score: OrderedStepScore = scoreOrderedSteps(pack, state.ids)

    Column(modifier = Modifier.fillMaxSize().verticalScroll(rememberScrollState())) {
        Text(pack.title, style = MaterialTheme.typography.titleLarge)
        Text(pack.prompt, style = MaterialTheme.typography.bodyMedium, modifier = Modifier.padding(top = 4.dp, bottom = 4.dp))
        Text(
            "${pack.source.label} · ${pack.source.reviewedBy}",
            style = MaterialTheme.typography.labelSmall,
            modifier = Modifier.padding(bottom = 12.dp),
        )

        state.ids.forEachIndexed { index, id ->
            val step = byId[id] ?: return@forEachIndexed
            val correctId = score.correct.getOrNull(index)
            val isCorrect = state.checked && id == correctId
            val isWrong = state.checked && id != correctId
            Card(modifier = Modifier.fillMaxWidth().padding(bottom = 8.dp).testTag(orderedGameStepRowTag(id))) {
                Row(
                    modifier = Modifier.fillMaxWidth().padding(12.dp),
                    verticalAlignment = Alignment.CenterVertically,
                    horizontalArrangement = Arrangement.spacedBy(8.dp),
                ) {
                    Text("${index + 1}", style = MaterialTheme.typography.labelLarge)
                    Text(step.text, style = MaterialTheme.typography.bodyMedium, modifier = Modifier.weight(1f))
                    if (state.checked) {
                        Text(
                            if (isCorrect) "✓" else if (isWrong) "✗" else "",
                            style = MaterialTheme.typography.titleMedium,
                        )
                    }
                    IconButton(onClick = { onMove(index, index - 1) }, enabled = index != 0) {
                        Icon(Icons.Filled.KeyboardArrowUp, contentDescription = stringResource(R.string.minigames_move_up))
                    }
                    IconButton(onClick = { onMove(index, index + 1) }, enabled = index != state.ids.lastIndex) {
                        Icon(Icons.Filled.KeyboardArrowDown, contentDescription = stringResource(R.string.minigames_move_down))
                    }
                }
            }
        }

        Row(horizontalArrangement = Arrangement.spacedBy(8.dp), modifier = Modifier.padding(top = 8.dp)) {
            Button(onClick = onCheck, modifier = Modifier.testTag(ORDERED_GAME_CHECK_BUTTON_TAG)) { Text(stringResource(R.string.minigames_check_order)) }
            Button(onClick = onNewGame, modifier = Modifier.testTag(ORDERED_GAME_NEW_GAME_BUTTON_TAG)) { Text(stringResource(R.string.minigames_new_order)) }
        }

        if (state.checked) {
            Text(
                stringResource(R.string.minigames_ordered_result_format, score.exactPositions, score.total),
                style = MaterialTheme.typography.labelLarge,
                modifier = Modifier.padding(top = 12.dp),
            )
            Text(pack.explanation, style = MaterialTheme.typography.bodyMedium, modifier = Modifier.padding(top = 4.dp))
        }
    }
}

/** Shared back-button header row, reused by every game screen in this module. */
@Composable
internal fun GameHeader(title: String, onBack: () -> Unit) {
    Row(verticalAlignment = Alignment.CenterVertically, horizontalArrangement = Arrangement.spacedBy(8.dp)) {
        IconButton(onClick = onBack) {
            Icon(Icons.AutoMirrored.Filled.ArrowBack, contentDescription = stringResource(R.string.minigames_back_content_description))
        }
        Text(title, style = MaterialTheme.typography.titleLarge)
    }
}
