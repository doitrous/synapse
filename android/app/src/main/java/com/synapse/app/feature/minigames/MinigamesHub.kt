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
import androidx.compose.ui.res.pluralStringResource
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.unit.dp
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.lifecycle.ViewModel
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import com.synapse.app.R
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

private data class MinigameEntry(val id: String, val title: String, val description: String, val badge: String, val onOpen: () -> Unit)

const val MINIGAMES_HUB_TAG = "minigames_hub"

/**
 * [id] is a stable, untranslated game key (e.g. "term_grid") — kept separate from
 * the localized [MinigameEntry.title] so this tag doesn't change with locale.
 */
fun minigameCardTag(id: String): String = "minigame_card_$id"

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

    val glossaryBadge = stringResource(R.string.minigames_badge_glossary)
    val authoredPackBadge = stringResource(R.string.minigames_badge_authored_pack)
    val games = listOf(
        MinigameEntry(
            "term_grid",
            stringResource(R.string.minigames_termgrid_title),
            stringResource(R.string.minigames_termgrid_hub_description),
            glossaryBadge,
            onOpenTermGrid,
        ),
        MinigameEntry(
            "spotter",
            stringResource(R.string.minigames_spotter_title),
            stringResource(R.string.minigames_spotter_hub_description),
            glossaryBadge,
            onOpenSpotter,
        ),
        MinigameEntry(
            "term_match",
            stringResource(R.string.minigames_termmatch_title),
            stringResource(R.string.minigames_termmatch_hub_description),
            glossaryBadge,
            onOpenTermMatch,
        ),
        MinigameEntry(
            "clinical_sequence",
            stringResource(R.string.minigames_clinicalsequence_title),
            stringResource(R.string.minigames_clinicalsequence_hub_description),
            authoredPackBadge,
            onOpenClinicalSequence,
        ),
        MinigameEntry(
            "mechanism_chain",
            stringResource(R.string.minigames_mechanismchain_title),
            stringResource(R.string.minigames_mechanismchain_hub_description),
            authoredPackBadge,
            onOpenMechanismChain,
        ),
        MinigameEntry(
            "red_flag_sort",
            stringResource(R.string.minigames_redflagsort_title),
            stringResource(R.string.minigames_redflagsort_hub_description),
            authoredPackBadge,
            onOpenRedFlagSort,
        ),
    )

    Column(modifier = Modifier.fillMaxSize().padding(16.dp).testTag(MINIGAMES_HUB_TAG)) {
        Text(stringResource(R.string.nav_minigames), style = MaterialTheme.typography.titleLarge)
        Text(
            stringResource(R.string.minigames_hub_subtitle),
            style = MaterialTheme.typography.bodyMedium,
            modifier = Modifier.padding(top = 4.dp, bottom = 8.dp),
        )
        Text(
            stringResource(R.string.minigames_hub_disclaimer),
            style = MaterialTheme.typography.bodySmall,
        )
        Text(
            pluralStringResource(R.plurals.minigames_hub_packs_ready, authoredPackCount, authoredPackCount),
            style = MaterialTheme.typography.labelSmall,
            modifier = Modifier.padding(top = 2.dp, bottom = 16.dp),
        )

        Column(modifier = Modifier.fillMaxSize().verticalScroll(rememberScrollState()), verticalArrangement = Arrangement.spacedBy(8.dp)) {
            games.forEach { game ->
                Card(
                    onClick = game.onOpen,
                    modifier = Modifier.fillMaxWidth().testTag(minigameCardTag(game.id)),
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
