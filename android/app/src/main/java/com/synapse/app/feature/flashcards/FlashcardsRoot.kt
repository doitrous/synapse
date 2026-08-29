package com.synapse.app.feature.flashcards

import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.runtime.setValue
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.lifecycle.compose.collectAsStateWithLifecycle

/**
 * Where [FlashcardsRoot] currently is: the deck list, or an active study session. A plain enum
 * (not a sealed type carrying the live [CardRunnerViewModel]'s session) so it can be
 * `rememberSaveable`d across a configuration change — the session itself lives in the surviving
 * [CardRunnerViewModel], only the flow *position* needs restoring. Mirrors
 * `com.synapse.app.feature.qbank.QuestionBankRoot`'s `QBankPosition`.
 */
private enum class FlashcardsPosition { DeckList, Runner }

/**
 * The Flashcards tab's entire flow: the deck list (browse + CRUD) and the study runner, driven
 * by [FlashcardsPosition] rather than nav routes — see its doc comment.
 *
 * Both view models resolve via `hiltViewModel()` against this destination's back-stack entry, so
 * an active (or just-finished) study session survives a configuration change instead of silently
 * dropping the student back to the deck list — the same lesson
 * `com.synapse.app.feature.qbank.QuestionBankRoot` applies to `SessionViewModel`.
 */
@Composable
fun FlashcardsRoot(
    listViewModel: FlashcardsViewModel = hiltViewModel(),
    runnerViewModel: CardRunnerViewModel = hiltViewModel(),
) {
    var position by rememberSaveable { mutableStateOf(FlashcardsPosition.DeckList) }
    val studyStart by listViewModel.studyStart.collectAsStateWithLifecycle()

    LaunchedEffect(studyStart) {
        val start = studyStart ?: return@LaunchedEffect
        runnerViewModel.begin(start.session, start.sessionId)
        position = FlashcardsPosition.Runner
        listViewModel.consumeStudyStart()
    }

    when (position) {
        FlashcardsPosition.DeckList -> DeckListScreen(viewModel = listViewModel)

        FlashcardsPosition.Runner ->
            if (runnerViewModel.hasActiveSession()) {
                CardRunnerScreen(
                    viewModel = runnerViewModel,
                    onLeave = {
                        position = FlashcardsPosition.DeckList
                        // Studying may have changed due/new counts (and, for a provided deck,
                        // just created its mirror) — refresh so the deck list isn't stale.
                        listViewModel.load()
                    },
                )
            } else {
                // Process death restored position=Runner, but the session it referred to died
                // with the process — nothing to resume, so fall back to the deck list rather
                // than render an empty runner.
                LaunchedEffect(Unit) { position = FlashcardsPosition.DeckList }
            }
    }
}
