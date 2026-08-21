package com.synapse.android.feature.root

import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.NavigationBar
import androidx.compose.material3.NavigationBarItem
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.lifecycle.viewmodel.compose.viewModel
import androidx.navigation.NavGraph.Companion.findStartDestination
import androidx.navigation.NavHostController
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.currentBackStackEntryAsState
import androidx.navigation.compose.rememberNavController
import com.synapse.android.AppGraph
import com.synapse.android.core.CortexJson
import com.synapse.android.core.auth.AuthState
import com.synapse.android.core.cache.LocalStore
import com.synapse.android.core.model.ContentKind
import com.synapse.android.core.model.Question
import com.synapse.android.core.model.QuestionProjection
import com.synapse.android.core.model.Practical
import com.synapse.android.core.qbank.LiveSession
import com.synapse.android.feature.account.AccountScreen
import com.synapse.android.feature.account.AccountViewModel
import com.synapse.android.feature.auth.SignInScreen
import com.synapse.android.feature.practical.PracticalListScreen
import com.synapse.android.feature.practical.PracticalReaderScreen
import com.synapse.android.feature.practical.PracticalViewModel
import com.synapse.android.feature.qbank.PreviousSittingsScreen
import com.synapse.android.feature.qbank.PreviousSittingsViewModel
import com.synapse.android.feature.qbank.QuestionBankViewModel
import com.synapse.android.feature.qbank.QuestionRunnerScreen
import com.synapse.android.feature.qbank.ResultsScreen
import com.synapse.android.feature.qbank.ResultsViewModel
import com.synapse.android.feature.qbank.RunnerViewModel
import com.synapse.android.feature.qbank.SessionBuilderScreen
import com.synapse.android.feature.qbank.TopicChooserScreen
import kotlinx.coroutines.flow.first

private const val ROUTE_QBANK = "qbank"
private const val ROUTE_PRACTICAL = "practical"
private const val ROUTE_ACCOUNT = "account"

/**
 * Collects [AppGraph.auth]'s state and shows exactly one thing per
 * [AuthState] -- the table in this task's brief is not a detail, it is the
 * whole point of the four-state machine `AuthModel` builds.
 *
 * [AppGraph.auth]`.start()` is called from here, in a `LaunchedEffect(Unit)`
 * keyed on nothing that survives a rotation -- never from
 * `MainActivity.onCreate`, where a configuration change would re-run
 * session restore and cost a signed-in student a flash of the sign-in form.
 *
 * [AppGraph.config]`.isConfigured` is checked *before* [AppGraph.auth] is
 * ever read. `graph.auth` is a `by lazy` chain that ends in
 * `EncryptedSessionStore`'s eager Android Keystore access, so touching it on
 * an unconfigured build -- even just to `collectAsState()` its `state` --
 * builds the whole server-facing stack (and can fail in the Keystore) before
 * the student ever sees the screen that explains what is missing. Returning
 * early here, without so much as naming `graph.auth`, is what keeps that
 * stack unreachable on this path rather than merely unlikely to run.
 */
@Composable
fun RootScreen(graph: AppGraph) {
    if (!graph.config.isConfigured) {
        NotConfiguredScreen(missing = graph.config.missing)
        return
    }

    val authState by graph.auth.state.collectAsState()

    LaunchedEffect(Unit) {
        graph.auth.start()
    }

    when (val state = authState) {
        // graph.config.isConfigured is checked above, before graph.auth is
        // ever touched, so AuthModel.start() has no path back to this state
        // from here -- kept only because AuthState is sealed and this `when`
        // has to stay exhaustive.
        is AuthState.NotConfigured -> NotConfiguredScreen(missing = state.missing)

        // Never the sign-in form here. Flashing it and then replacing it is
        // how an app tells an already-signed-in student they were signed
        // out.
        AuthState.Restoring -> RestoringScreen()

        AuthState.SignedOut -> {
            val message by graph.auth.message.collectAsState()
            val isWorking by graph.auth.isWorking.collectAsState()
            SignInScreen(
                message = message,
                isWorking = isWorking,
                onSignIn = graph.auth::signIn,
                onSignUp = graph.auth::signUp,
                onResetPassword = graph.auth::resetPassword,
            )
        }

        is AuthState.SignedIn -> {
            // Once per arrival at SignedIn, not once per recomposition: a
            // failure here is non-fatal (see SyncEngine's own class doc) --
            // the app is offline-first and every screen reads LocalStore,
            // so a refresh that fails simply leaves the student with what
            // they already had, shown on Account rather than as a blocking
            // dialog.
            LaunchedEffect(state) {
                graph.sync.refresh()
            }
            SignedInNavHost(graph)
        }
    }
}

/** A neutral splash -- deciding whether a stored session is still good is not a decision the student needs to watch happen. */
@Composable
private fun RestoringScreen() {
    Box(modifier = Modifier.fillMaxSize(), contentAlignment = Alignment.Center) {
        CircularProgressIndicator()
    }
}

/** The signed-in shell. `qbank` and `practical` each hold their own local step inside one destination -- see [QuestionBankRoute] and [PracticalRoute]. */
@Composable
private fun SignedInNavHost(graph: AppGraph) {
    val navController = rememberNavController()

    Scaffold(
        bottomBar = {
            val backStackEntry by navController.currentBackStackEntryAsState()
            val currentRoute = backStackEntry?.destination?.route
            NavigationBar {
                NavigationBarItem(
                    selected = currentRoute == ROUTE_QBANK,
                    onClick = { navController.navigateToTab(ROUTE_QBANK) },
                    icon = {},
                    label = { Text("Question Bank") },
                )
                NavigationBarItem(
                    selected = currentRoute == ROUTE_PRACTICAL,
                    onClick = { navController.navigateToTab(ROUTE_PRACTICAL) },
                    icon = {},
                    label = { Text("Practical") },
                )
                NavigationBarItem(
                    selected = currentRoute == ROUTE_ACCOUNT,
                    onClick = { navController.navigateToTab(ROUTE_ACCOUNT) },
                    icon = {},
                    label = { Text("Account") },
                )
            }
        },
    ) { padding ->
        NavHost(
            navController = navController,
            startDestination = ROUTE_QBANK,
            modifier = Modifier.padding(padding),
        ) {
            composable(ROUTE_QBANK) { QuestionBankRoute(graph) }
            composable(ROUTE_PRACTICAL) { PracticalRoute(graph) }
            composable(ROUTE_ACCOUNT) {
                val viewModel: AccountViewModel = viewModel(
                    factory = AccountViewModel.factory(graph.auth, graph.sync, graph.store, graph.themePreference),
                )
                AccountScreen(viewModel = viewModel)
            }
        }
    }
}

private fun NavHostController.navigateToTab(route: String) {
    navigate(route) {
        popUpTo(graph.findStartDestination().id) { saveState = true }
        launchSingleTop = true
        restoreState = true
    }
}

/**
 * Where the qbank tab is, right now.
 *
 * A plain local step, not a nested `NavHost` -- the whole flow lives inside
 * one destination on the outer [NavHost] ([RootScreen.ROUTE_QBANK]), so there
 * is no nested back stack for a finished [Running] step to be left on. That
 * is what satisfies this task's brief, "finishing a sitting must not leave
 * the runner on the back stack": there is nothing to pop into, because
 * switching from [Running] to [Results] never pushed anything.
 */
private sealed interface QbankStep {
    data object Loading : QbankStep
    data object Chooser : QbankStep
    data object Builder : QbankStep
    data class Running(val session: LiveSession, val questions: List<Question>) : QbankStep
    data class Results(val session: LiveSession, val questions: List<Question>) : QbankStep
    data object Previous : QbankStep
}

/**
 * `TopicChooserScreen -> SessionBuilderScreen -> QuestionRunnerScreen ->
 * ResultsScreen`, with `PreviousSittingsScreen` reachable from the chooser.
 *
 * On first entering the tab, [LocalStore.document] is checked for a
 * [LiveSession] still `phase == "running"`; a student who backgrounded the
 * app mid-sitting is dropped straight back into the runner, never the
 * chooser -- the session document is shared with the web and iOS clients,
 * which both resume the same way.
 */
@Composable
private fun QuestionBankRoute(graph: AppGraph) {
    var step by remember { mutableStateOf<QbankStep>(QbankStep.Loading) }

    LaunchedEffect(Unit) {
        val stored = graph.store.document(LiveSession.KEY)?.json
            ?.let { runCatching { CortexJson.decodeFromString(LiveSession.serializer(), it) }.getOrNull() }
        step = if (stored != null && stored.phase == PHASE_RUNNING) {
            QbankStep.Running(stored, resolveQuestions(graph.store, stored.questionIds))
        } else {
            QbankStep.Chooser
        }
    }

    when (val current = step) {
        QbankStep.Loading -> RestoringScreen()

        QbankStep.Chooser -> {
            val viewModel: QuestionBankViewModel = viewModel(factory = QuestionBankViewModel.factory(graph.store, graph.sync))
            TopicChooserScreen(
                viewModel = viewModel,
                onContinue = { step = QbankStep.Builder },
                onPreviousSittings = { step = QbankStep.Previous },
            )
        }

        QbankStep.Builder -> {
            val viewModel: QuestionBankViewModel = viewModel(factory = QuestionBankViewModel.factory(graph.store, graph.sync))
            SessionBuilderScreen(
                viewModel = viewModel,
                onBuilt = { session -> step = QbankStep.Running(session, viewModel.questionsFor(session.questionIds)) },
            )
        }

        is QbankStep.Running -> {
            val runnerViewModel: RunnerViewModel = viewModel(
                key = current.session.sessionId,
                factory = RunnerViewModel.factory(current.session, current.questions, graph.store, graph.sync),
            )
            QuestionRunnerScreen(
                viewModel = runnerViewModel,
                questions = current.questions,
                onFinished = { step = QbankStep.Results(runnerViewModel.session.value, current.questions) },
            )
        }

        is QbankStep.Results -> {
            val resultsViewModel: ResultsViewModel = viewModel(
                key = current.session.sessionId,
                factory = ResultsViewModel.factory(current.session, current.questions),
            )
            ResultsScreen(viewModel = resultsViewModel, onDone = { step = QbankStep.Chooser })
        }

        QbankStep.Previous -> {
            val viewModel: PreviousSittingsViewModel = viewModel(factory = PreviousSittingsViewModel.factory(graph.store))
            PreviousSittingsScreen(viewModel = viewModel, onBack = { step = QbankStep.Chooser })
        }
    }
}

/**
 * Where the practical tab is, right now: the id of the item being read, or
 * null for the list.
 *
 * A plain local step, not a nested `NavHost` -- the same reasoning as
 * [QuestionBankRoute]: the whole list-then-reader flow lives inside one
 * destination on the outer [NavHost] ([RootScreen.ROUTE_PRACTICAL]), so
 * there is no nested back stack to leave a finished sitting on.
 *
 * Held in `rememberSaveable`, and as an *id* rather than the [Practical]
 * itself, which is what makes that possible without making the model
 * `Parcelable`. A configuration change destroys the composition, so a plain
 * `remember` here dropped a student out of the station they were sitting and
 * back to the list -- and reopening it re-seeded the run from disk. The
 * ViewModel is not what was lost: it belongs to the navigation entry's
 * retained `ViewModelStore` and carries the ticks and the clock through a
 * rotation untouched.
 *
 * Unlike [QuestionBankRoute] there is still no on-disk "still running"
 * session to resume into -- a station's countdown and a case's or lab's
 * reveal state live only in [PracticalViewModel] -- so process death does
 * start over on the list, which is the honest outcome: the run really is
 * gone by then.
 */
@Composable
private fun PracticalRoute(graph: AppGraph) {
    val viewModel: PracticalViewModel = viewModel(factory = PracticalViewModel.factory(graph.store, graph.sync))
    var openId by rememberSaveable { mutableStateOf<String?>(null) }
    val items by viewModel.items.collectAsState()
    val open = openId?.let { id -> items.firstOrNull { it.id == id } }

    when {
        openId == null -> PracticalListScreen(
            viewModel = viewModel,
            onOpenPractical = { practical -> openId = practical.id },
        )

        open != null -> PracticalReaderScreen(
            practical = open,
            viewModel = viewModel,
            onExit = { openId = null },
        )

        // Restored into a reader before the ledger has come back off disk.
        // Nothing to draw for the moment it takes; after a rotation there is
        // no such moment, because the ViewModel never let go of its items.
        else -> Unit
    }
}

/**
 * Projects [ids] into [Question]s the same way [QuestionBankViewModel]'s own
 * pool does -- every published item, filtered to what a student may see. A
 * one-shot read: used only to resolve a session already found on disk before
 * any [QuestionBankViewModel] exists to have loaded its pool yet.
 */
private suspend fun resolveQuestions(store: LocalStore, ids: List<String>): List<Question> {
    val byId = store.ledgerItems(ContentKind.QUESTION).first()
        .filter { it.isStudentVisible }
        .mapNotNull(QuestionProjection::project)
        .associateBy { it.id }
    return ids.mapNotNull { byId[it] }
}

/** `"running"` -- the other clients' spelling; see `LiveSession.phase`. */
private const val PHASE_RUNNING = "running"
