package com.synapse.app.feature.qbank

import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import com.synapse.app.core.qbank.MultiResponseQuestion
import com.synapse.app.core.qbank.QBankScope
import com.synapse.app.core.qbank.QBankSession
import com.synapse.app.core.qbank.Question

/**
 * Where [QuestionBankRoot] currently is in the Setup → Runner → Results flow
 * (plus the Offline and multi-response-practice side screens reachable from
 * Setup). A `when` over this sealed type, not a nested `NavHost` — the
 * question bank tab is one bottom-nav destination, and a second nested
 * back stack under it would fight the app shell's own back handling for no
 * benefit at this scale.
 */
private sealed interface QBankFlowStep {
    data object Setup : QBankFlowStep
    data object Offline : QBankFlowStep
    data object MultiResponsePractice : QBankFlowStep
    data class Session(val session: QBankSession, val sessionId: String) : QBankFlowStep
}

/**
 * The Question Bank tab's entire flow: Setup, the single-select Runner +
 * Results, the Offline downloads screen, and multi-response practice — all
 * driven by [QBankFlowStep] rather than nav routes (see its doc comment).
 *
 * [setupViewModel] resolves via `hiltViewModel()` by default so plain
 * (non-Hilt) tests composing [com.synapse.app.feature.shell.AppScaffold]
 * substitute their own `qbankContent` instead of this composable, the same
 * seam [com.synapse.app.feature.dashboard.DashboardScreen] uses for
 * `dashboardContent`.
 */
@Composable
fun QuestionBankRoot(
    setupViewModel: QuestionBankViewModel = hiltViewModel(),
) {
    var step by remember { mutableStateOf<QBankFlowStep>(QBankFlowStep.Setup) }
    val setupState by setupViewModel.uiState.collectAsStateWithLifecycle()
    val sessionStart by setupViewModel.sessionStart.collectAsStateWithLifecycle()

    LaunchedEffect(sessionStart) {
        val start = sessionStart ?: return@LaunchedEffect
        step = QBankFlowStep.Session(start.session, start.sessionId)
        setupViewModel.consumeSessionStart()
    }

    when (val current = step) {
        QBankFlowStep.Setup -> QBankSetupScreen(
            onStartOffline = { step = QBankFlowStep.Offline },
            onStartMultiResponsePractice = { step = QBankFlowStep.MultiResponsePractice },
            viewModel = setupViewModel,
        )

        QBankFlowStep.Offline -> OfflineDownloadScreen(
            scope = setupState.scope,
            questions = setupState.questions,
            onBack = { step = QBankFlowStep.Setup },
        )

        QBankFlowStep.MultiResponsePractice -> MultiResponseRunner(
            questions = setupState.multiResponseQuestions.filter { it.inScope(setupState.scope) },
            onDone = { step = QBankFlowStep.Setup },
        )

        is QBankFlowStep.Session -> SessionHost(
            session = current.session,
            sessionId = current.sessionId,
            questions = setupState.questions,
            onLeave = { step = QBankFlowStep.Setup },
        )
    }
}

@Composable
private fun SessionHost(
    session: QBankSession,
    sessionId: String,
    questions: List<Question>,
    onLeave: () -> Unit,
    sessionViewModel: SessionViewModel = hiltViewModel(),
) {
    LaunchedEffect(sessionId) { sessionViewModel.begin(session, sessionId) }
    val uiState by sessionViewModel.uiState.collectAsStateWithLifecycle()

    val result = uiState.result
    if (result != null) {
        ResultsScreen(result = result, questions = questions, onDone = onLeave)
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
