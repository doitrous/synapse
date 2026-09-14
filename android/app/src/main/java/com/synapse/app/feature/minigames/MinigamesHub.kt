package com.synapse.app.feature.minigames

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.Card
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.unit.dp
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.lifecycle.ViewModel
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import javax.inject.Inject

/** What [MinigamesHubScreen] renders. */
sealed interface MinigamesHubUiState {
    data object Loading : MinigamesHubUiState
    data class Content(val authoredPackCount: Int) : MinigamesHubUiState
}

/**
 * Drives the hub screen: the only thing it loads is the built-in pack count
 * (a synchronous, in-memory count — see `MinigamesRepository.packs`), shown
 * as a footnote the way web's hub shows "N authored packs ready".
 */
@HiltViewModel
class MinigamesHubViewModel @Inject constructor(
    private val repository: MinigamesRepository,
) : ViewModel() {

    private val _uiState = MutableStateFlow<MinigamesHubUiState>(
        MinigamesHubUiState.Content(repository.packs().size),
    )
    val uiState: StateFlow<MinigamesHubUiState> = _uiState.asStateFlow()
}

private data class MinigameEntry(val title: String, val description: String, val badge: String, val onOpen: () -> Unit)

const val MINIGAMES_HUB_TAG = "minigames_hub"
fun minigameCardTag(title: String): String = "minigame_card_$title"

@Composable
fun MinigamesHubScreen(
    onOpenTermGrid: () -> Unit,
    onOpenSpotter: () -> Unit,
    onOpenTermMatch: () -> Unit,
    onOpenClinicalSequence: () -> Unit,
    onOpenMechanismChain: () -> Unit,
    onOpenRedFlagSort: () -> Unit,
    viewModel: MinigamesHubViewModel = hiltViewModel(),
) {
    val uiState by viewModel.uiState.collectAsStateWithLifecycle()
    val authoredPackCount = (uiState as? MinigamesHubUiState.Content)?.authoredPackCount ?: 0

    val games = listOf(
        MinigameEntry("Term Grid", "Crossword practice from the published glossary.", "Glossary", onOpenTermGrid),
        MinigameEntry("Spotter", "Spot the glossary term from its definition under time pressure.", "Glossary", onOpenSpotter),
        MinigameEntry("Term Match", "Match fixed terms to shuffled definitions or Arabic translations.", "Glossary", onOpenTermMatch),
        MinigameEntry("Clinical Sequence", "Order reviewed procedural or clinical steps.", "Authored pack", onOpenClinicalSequence),
        MinigameEntry("Mechanism Chain", "Rebuild reviewed cause-to-effect chains.", "Authored pack", onOpenMechanismChain),
        MinigameEntry("Red Flag Sort", "Classify reviewed findings by escalation level.", "Authored pack", onOpenRedFlagSort),
    )

    Column(modifier = Modifier.fillMaxSize().padding(16.dp).testTag(MINIGAMES_HUB_TAG)) {
        Text("Minigames", style = MaterialTheme.typography.titleLarge)
        Text(
            "Short, authored practice games for terms, mechanisms and red flags.",
            style = MaterialTheme.typography.bodyMedium,
            modifier = Modifier.padding(top = 4.dp, bottom = 8.dp),
        )
        Text(
            "Medicine game facts come from reviewed local packs or published content. The app can shuffle and score them, but it does not invent facts during play.",
            style = MaterialTheme.typography.bodySmall,
        )
        Text(
            "$authoredPackCount authored packs ready",
            style = MaterialTheme.typography.labelSmall,
            modifier = Modifier.padding(top = 2.dp, bottom = 16.dp),
        )

        Column(modifier = Modifier.fillMaxSize().verticalScroll(rememberScrollState()), verticalArrangement = Arrangement.spacedBy(8.dp)) {
            games.forEach { game ->
                Card(
                    onClick = game.onOpen,
                    modifier = Modifier.fillMaxWidth().testTag(minigameCardTag(game.title)),
                ) {
                    Column(modifier = Modifier.padding(12.dp)) {
                        Text(game.badge, style = MaterialTheme.typography.labelSmall)
                        Text(game.title, style = MaterialTheme.typography.titleMedium, modifier = Modifier.padding(top = 2.dp))
                        Text(game.description, style = MaterialTheme.typography.bodySmall, modifier = Modifier.padding(top = 2.dp))
                    }
                }
            }
        }
    }
}
