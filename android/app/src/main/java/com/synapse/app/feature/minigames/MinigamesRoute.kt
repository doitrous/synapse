package com.synapse.app.feature.minigames

import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.runtime.setValue

/**
 * Where [MinigamesRoute] currently is: the hub, or one of the six games. A
 * `when` over this enum, not a nested `NavHost` — Minigames is one shell
 * destination, and a second nested back stack under it would fight the app
 * shell's own back handling for no benefit at this scale, the same reasoning
 * `feature/qbank/QuestionBankRoot.kt`'s `QBankPosition` documents.
 */
private enum class MinigamesPosition {
    Hub, TermGrid, Spotter, TermMatch, ClinicalSequence, MechanismChain, RedFlagSort
}

/**
 * The Minigames tab's single public entry point: the hub, with navigation
 * into each game entirely internal to this composable — the shell mounts
 * this directly (`"minigames" to minigamesContent`) with no route wiring of
 * its own required, the same shape as `TaxonomyRoute`/`QuestionBankRoot`.
 *
 * [MinigamesPosition] is `rememberSaveable` so an in-progress game survives a
 * configuration change; each game's own `hiltViewModel()` resolves against
 * this destination's back-stack entry the same way `QuestionBankRoot`'s do,
 * so its own state (the current board, score, etc.) survives alongside it.
 */
@Composable
fun MinigamesRoute() {
    var position by rememberSaveable { mutableStateOf(MinigamesPosition.Hub) }
    val toHub: () -> Unit = { position = MinigamesPosition.Hub }

    when (position) {
        MinigamesPosition.Hub -> MinigamesHubScreen(
            onOpenTermGrid = { position = MinigamesPosition.TermGrid },
            onOpenSpotter = { position = MinigamesPosition.Spotter },
            onOpenTermMatch = { position = MinigamesPosition.TermMatch },
            onOpenClinicalSequence = { position = MinigamesPosition.ClinicalSequence },
            onOpenMechanismChain = { position = MinigamesPosition.MechanismChain },
            onOpenRedFlagSort = { position = MinigamesPosition.RedFlagSort },
        )

        MinigamesPosition.TermGrid -> TermGridRoute(onBack = toHub)
        MinigamesPosition.Spotter -> SpotterRoute(onBack = toHub)
        MinigamesPosition.TermMatch -> TermMatchRoute(onBack = toHub)
        MinigamesPosition.ClinicalSequence -> ClinicalSequenceRoute(onBack = toHub)
        MinigamesPosition.MechanismChain -> MechanismChainRoute(onBack = toHub)
        MinigamesPosition.RedFlagSort -> RedFlagSortRoute(onBack = toHub)
    }
}
