package com.synapse.app.feature.qbank

import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.runtime.setValue
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import com.synapse.app.core.qbank.MultiResponseQuestion
import com.synapse.app.core.qbank.QBankScope
import com.synapse.app.core.qbank.Question

/**
 * Where [QuestionBankRoot] currently is in its flow: Setup, the single-select
 * Runner+Results, the Offline downloads screen, or multi-response practice. A
 * `when` over this enum, not a nested `NavHost` — the question bank tab is one
 * bottom-nav destination, and a second nested back stack under it would fight
 * the app shell's own back handling for no benefit at this scale.
 *
 * It is a plain enum (not a sealed type carrying the live [SessionViewModel]'s
 * session) precisely so it can be `rememberSaveable`d across a configuration
 * change: the session itself lives in the surviving [SessionViewModel], and
 * only the flow *position* needs restoring.
 */
private enum class QBankPosition { Setup, Offline, MultiResponsePractice, Session }

/**
 * The Question Bank tab's entire flow: Setup, the single-select Runner +
 * Results, the Offline downloads screen, and multi-response practice — all
 * driven by [QBankPosition] rather than nav routes (see its doc comment).
 *
 * The flow [position][QBankPosition] is `rememberSaveable`, and both view
 * models resolve via `hiltViewModel()` against this destination's back-stack
 * entry, so an active (or just-finished) sitting survives a configuration
 * change instead of silently dropping the student back to Setup. Defaulting
 * the view models via `hiltViewModel()` also lets plain (non-Hilt) tests
 * composing [com.synapse.app.feature.shell.AppScaffold] substitute their own
 * `qbankContent`, the same seam
 * [com.synapse.app.feature.dashboard.DashboardScreen] uses for `dashboardContent`.
 */
@Composable
fun QuestionBankRoot(
    setupViewModel: QuestionBankViewModel = hiltViewModel(),
    sessionViewModel: SessionViewModel = hiltViewModel(),
) {
    var position by rememberSaveable { mutableStateOf(QBankPosition.Setup) }
    val setupState by setupViewModel.uiState.collectAsStateWithLifecycle()
    val sessionStart by setupViewModel.sessionStart.collectAsStateWithLifecycle()

    LaunchedEffect(sessionStart) {
        val start = sessionStart ?: return@LaunchedEffect
        sessionViewModel.begin(start.session, start.sessionId)
        position = QBankPosition.Session
        setupViewModel.consumeSessionStart()
    }

    when (position) {
        QBankPosition.Setup -> QBankSetupScreen(
            onStartOffline = { position = QBankPosition.Offline },
            onStartMultiResponsePractice = { position = QBankPosition.MultiResponsePractice },
            viewModel = setupViewModel,
        )

        QBankPosition.Offline -> OfflineDownloadScreen(
            scope = setupState.scope,
            questions = setupState.questions,
            onBack = { position = QBankPosition.Setup },
        )

        QBankPosition.MultiResponsePractice -> MultiResponseRunner(
            questions = setupState.multiResponseQuestions.filter { it.inScope(setupState.scope) },
            onDone = { position = QBankPosition.Setup },
        )

        QBankPosition.Session ->
            if (sessionViewModel.hasActiveSession()) {
                SessionHost(
                    sessionViewModel = sessionViewModel,
                    questions = setupState.questions,
                    onLeave = { position = QBankPosition.Setup },
                )
            } else {
                // Process death restored position=Session, but the session it
                // referred to died with the process — nothing to resume, so fall
                // back to Setup rather than render an empty runner.
                LaunchedEffect(Unit) { position = QBankPosition.Setup }
            }
    }
}

@Composable
private fun SessionHost(
    sessionViewModel: SessionViewModel,
    questions: List<Question>,
    onLeave: () -> Unit,
) {
    val uiState by sessionViewModel.uiState.collectAsStateWithLifecycle()

    val result = uiState.result
    if (result != null) {
        ResultsScreen(
            result = result,
            questions = questions,
            onDone = onLeave,
            saveState = uiState.saveState,
            onRetrySave = sessionViewModel::retrySave,
        )
    } else {
        SessionRunnerScreen(onLeave = onLeave, viewModel = sessionViewModel)
    }
}

/**
 * Coarser than [QBankScope.poolFor]'s single-select matching: a
 * [MultiResponseQuestion] carries no `libraryIds`, so it can only be matched
 * at the whole-topic level. A question is in scope when its topic is
 * selected outright, or when *any* subtopic under that topic is selected —
 * the closest honest approximation available without per-question library
 * ids to narrow further.
 */
private fun MultiResponseQuestion.inScope(scope: Set<String>): Boolean {
    val topicId = "qt:${topic.trim()}"
    if (QBankScope.topicKey(topicId) in scope) return true
    return scope.any { it.startsWith("s:$topicId:") }
}
