package com.synapse.android.feature.root

import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.FloatingActionButton
import androidx.compose.material3.NavigationBar
import androidx.compose.material3.NavigationBarItem
import androidx.compose.material3.NavigationBarItemDefaults
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
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp
import androidx.lifecycle.Lifecycle
import androidx.lifecycle.compose.LocalLifecycleOwner
import androidx.lifecycle.repeatOnLifecycle
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
import com.synapse.android.design.AccountGlyph
import com.synapse.android.design.DailyGlyph
import com.synapse.android.design.LocalCortex
import com.synapse.android.design.NishanyMark
import com.synapse.android.design.PracticalGlyph
import com.synapse.android.design.QuestionBankGlyph
import com.synapse.android.feature.settings.SettingsScreen
import com.synapse.android.feature.settings.SettingsViewModel
import com.synapse.android.feature.assistant.AssistantScreen
import com.synapse.android.feature.assistant.AssistantViewModel
import com.synapse.android.feature.auth.SignInScreen
import com.synapse.android.feature.billing.BillingScreen
import com.synapse.android.feature.billing.BillingViewModel
import com.synapse.android.feature.calendar.CalendarScreen
import com.synapse.android.feature.calendar.CalendarViewModel
import com.synapse.android.feature.focus.FocusTimerRoute
import com.synapse.android.feature.home.HomeRoute
import com.synapse.android.feature.library.LibraryRoute
import com.synapse.android.feature.notebook.NotebookScreen
import com.synapse.android.feature.notebook.NotebookViewModel
import com.synapse.android.feature.performance.PerformanceScreen
import com.synapse.android.feature.performance.PerformanceViewModel
import com.synapse.android.feature.taxonomy.TerminologyScreen
import com.synapse.android.feature.taxonomy.TerminologyViewModel
import com.synapse.android.feature.practical.PracticalListScreen
import com.synapse.android.feature.qotd.QotdRoute
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
import java.time.Duration
import kotlinx.coroutines.flow.first

private const val ROUTE_HOME = "home"
private const val ROUTE_QBANK = "qbank"
private const val ROUTE_PRACTICAL = "practical"
private const val ROUTE_QOTD = "qotd"
private const val ROUTE_ACCOUNT = "account"
private const val ROUTE_PERFORMANCE = "performance"
private const val ROUTE_NOTEBOOK = "notebook"
private const val ROUTE_CALENDAR = "calendar"
private const val ROUTE_TERMINOLOGY = "terminology"
private const val ROUTE_ASSISTANT = "assistant"
private const val ROUTE_BILLING = "billing"
// A pushed detail destination, not a bottom-bar tab -- reached from Home,
// the same shape as ROUTE_PERFORMANCE and friends below.
private const val ROUTE_LIBRARY = "library"

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
/**
 * How stale the cache may be before returning to the foreground refreshes it.
 *
 * Two minutes is chosen against the thing this exists for: a student moving
 * between the web and the phone on the same account. Long enough that
 * flicking to a message and back, rotating the phone, or answering a call
 * costs nothing; short enough that "I just did those on my laptop" is
 * already true by the time they have opened the tab they wanted.
 */
private val FOREGROUND_REFRESH_INTERVAL: Duration = Duration.ofMinutes(2)

@Composable
fun RootScreen(
    graph: AppGraph,
    openFocusTimerRequest: Boolean = false,
    onFocusTimerRequestConsumed: () -> Unit = {},
) {
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
            // Every time this app comes back to the foreground, not once per
            // process.
            //
            // It used to be the latter -- a single refresh on arrival at
            // SignedIn -- and an Android process outlives a great many
            // sessions on the same account. A student who worked through a
            // block of questions on the web at a desk and then picked their
            // phone back up got the cache as it stood whenever the app had
            // first opened, with no way to ask for a fresh one short of
            // killing it from the task switcher. Same account, same
            // documents, two clients disagreeing, and only one of them
            // wrong.
            //
            // repeatOnLifecycle(STARTED) runs the block on each arrival at
            // STARTED and cancels it on the way below, so a pass still in
            // flight when the student leaves does not outlive the screen
            // that wanted it. refreshWhenStale carries the throttle -- see
            // its own doc for why the foreground alone is not a safe
            // trigger. A failure remains non-fatal (see SyncEngine's class
            // doc): the app is offline-first, every screen reads LocalStore,
            // so a refresh that fails leaves the student with what they
            // already had, reported on Account rather than as a dialog.
            val lifecycleOwner = LocalLifecycleOwner.current
            LaunchedEffect(state, lifecycleOwner) {
                lifecycleOwner.lifecycle.repeatOnLifecycle(Lifecycle.State.STARTED) {
                    graph.sync.refreshWhenStale(FOREGROUND_REFRESH_INTERVAL)
                }
            }
            // Held behind the AI-use disclaimer exactly once per sign-in --
            // see AiConsentGate's own doc for why this is not on the
            // foreground-refresh path above.
            AiConsentGate(graph) {
                SignedInNavHost(graph, openFocusTimerRequest, onFocusTimerRequestConsumed)
            }
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

/**
 * The signed-in shell. `qbank` and `practical` each hold their own local
 * step inside one destination -- see [QuestionBankRoute] and
 * [PracticalRoute]. The Focus Timer FAB and its full-screen overlay are
 * hoisted here rather than into any one tab's route, for the same reason
 * the web keeps its trigger in the shell (`TopbarTools.tsx`) rather than on
 * a page: a running block has to survive switching tabs underneath it.
 */
@Composable
private fun SignedInNavHost(
    graph: AppGraph,
    openFocusTimerRequest: Boolean = false,
    onFocusTimerRequestConsumed: () -> Unit = {},
) {
    val navController = rememberNavController()

    val cortex = LocalCortex.current
    var focusTimerOpen by rememberSaveable { mutableStateOf(false) }

    // A tap on the ongoing notification (or a future deep link) asking for
    // the timer specifically, rather than just the app's last tab.
    LaunchedEffect(openFocusTimerRequest) {
        if (openFocusTimerRequest) {
            focusTimerOpen = true
            onFocusTimerRequestConsumed()
        }
    }

    Box(modifier = Modifier.fillMaxSize()) {
    Scaffold(
        floatingActionButton = {
            FloatingActionButton(onClick = { focusTimerOpen = true }, containerColor = cortex.primary, contentColor = cortex.onPrimary) {
                Text("⏱")
            }
        },
        bottomBar = {
            val backStackEntry by navController.currentBackStackEntryAsState()
            val currentRoute = backStackEntry?.destination?.route
            // Container = surface (white on the light/warm themes) rather
            // than Material's tonal-elevation tint, and no tonal elevation of
            // its own, so the bar reads as the mock's plain top-hairline bar
            // instead of gaining a translucent scrim as content scrolls
            // beneath it.
            NavigationBar(containerColor = cortex.surface, tonalElevation = 0.dp) {
                val itemColors = NavigationBarItemDefaults.colors(
                    selectedIconColor = cortex.primaryStrong,
                    selectedTextColor = cortex.primaryStrong,
                    unselectedIconColor = cortex.ink2,
                    unselectedTextColor = cortex.ink2,
                    indicatorColor = Color.Transparent,
                )
                NavigationBarItem(
                    selected = currentRoute == ROUTE_HOME,
                    onClick = { navController.navigateToTab(ROUTE_HOME) },
                    icon = { NishanyMark() },
                    label = { Text("Home") },
                    colors = itemColors,
                )
                NavigationBarItem(
                    selected = currentRoute == ROUTE_QBANK,
                    onClick = { navController.navigateToTab(ROUTE_QBANK) },
                    icon = { QuestionBankGlyph() },
                    label = { Text("Question Bank") },
                    colors = itemColors,
                )
                NavigationBarItem(
                    selected = currentRoute == ROUTE_PRACTICAL,
                    onClick = { navController.navigateToTab(ROUTE_PRACTICAL) },
                    icon = { PracticalGlyph() },
                    label = { Text("Practical") },
                    colors = itemColors,
                )
                NavigationBarItem(
                    selected = currentRoute == ROUTE_QOTD,
                    onClick = { navController.navigateToTab(ROUTE_QOTD) },
                    icon = { DailyGlyph() },
                    label = { Text("Daily") },
                    colors = itemColors,
                )
                NavigationBarItem(
                    selected = currentRoute == ROUTE_ACCOUNT,
                    onClick = { navController.navigateToTab(ROUTE_ACCOUNT) },
                    icon = { AccountGlyph() },
                    label = { Text("Account") },
                    colors = itemColors,
                )
            }
        },
    ) { padding ->
        NavHost(
            navController = navController,
            startDestination = ROUTE_HOME,
            modifier = Modifier.padding(padding),
        ) {
            composable(ROUTE_HOME) {
                HomeRoute(
                    graph = graph,
                    onOpenQuestionBank = { navController.navigateToTab(ROUTE_QBANK) },
                    onOpenPractical = { navController.navigateToTab(ROUTE_PRACTICAL) },
                    onOpenDaily = { navController.navigateToTab(ROUTE_QOTD) },
                    onOpenAccount = { navController.navigateToTab(ROUTE_ACCOUNT) },
                    onOpenPerformance = { navController.navigate(ROUTE_PERFORMANCE) },
                    onOpenNotebook = { navController.navigate(ROUTE_NOTEBOOK) },
                    onOpenCalendar = { navController.navigate(ROUTE_CALENDAR) },
                    onOpenTerminology = { navController.navigate(ROUTE_TERMINOLOGY) },
                    onOpenAssistant = { navController.navigate(ROUTE_ASSISTANT) },
                    onOpenLibrary = { navController.navigate(ROUTE_LIBRARY) },
                )
            }
            composable(ROUTE_QBANK) { QuestionBankRoute(graph) }
            composable(ROUTE_PRACTICAL) { PracticalRoute(graph) }
            composable(ROUTE_QOTD) { QotdRoute(graph) }
            // A plain pushed destination, not a bottom-nav tab -- reached only
            // from Home's "MORE" grid, with a real back-stack entry so the
            // system back gesture and PerformanceScreen's own Back button both
            // return to Home, unlike navigateToTab's saved/restored tab state.
            composable(ROUTE_PERFORMANCE) {
                val viewModel: PerformanceViewModel = viewModel(factory = PerformanceViewModel.factory(graph.store))
                PerformanceScreen(viewModel = viewModel, onBack = { navController.popBackStack() })
            }
            // Same shape as ROUTE_PERFORMANCE above -- pushed from Home's
            // "MORE" grid, never a bottom-nav tab.
            composable(ROUTE_NOTEBOOK) {
                val viewModel: NotebookViewModel = viewModel(factory = NotebookViewModel.factory(graph.store, graph.sync, graph.connectivity))
                NotebookScreen(viewModel = viewModel, onBack = { navController.popBackStack() })
            }
            composable(ROUTE_CALENDAR) {
                val viewModel: CalendarViewModel = viewModel(factory = CalendarViewModel.factory(graph.store, graph.sync, graph.connectivity))
                CalendarScreen(viewModel = viewModel, onBack = { navController.popBackStack() })
            }
            composable(ROUTE_TERMINOLOGY) {
                val viewModel: TerminologyViewModel = viewModel(factory = TerminologyViewModel.factory(graph.store))
                TerminologyScreen(viewModel = viewModel, onBack = { navController.popBackStack() })
            }
            // Same shape as ROUTE_PERFORMANCE above -- pushed from Home's
            // "MORE" grid, never a bottom-nav tab. The transcript is held by
            // this route's own ViewModel, not [graph], so leaving the screen
            // (a plain nav-graph destination, freshly created on each visit)
            // drops it -- see AssistantViewModel's class doc for why that
            // matches every other client.
            composable(ROUTE_ASSISTANT) {
                val viewModel: AssistantViewModel = viewModel(factory = AssistantViewModel.factory(graph.api, graph.connectivity))
                val language by graph.languagePreference.language.collectAsState()
                AssistantScreen(viewModel = viewModel, lang = language.wire, onBack = { navController.popBackStack() })
            }
            // Same shape as ROUTE_PERFORMANCE above -- pushed from Home's grid,
            // never a bottom-nav tab. LibraryRoute holds its own ViewModel.
            composable(ROUTE_LIBRARY) {
                LibraryRoute(graph = graph, onBack = { navController.popBackStack() })
            }
            // Reached from Settings' Billing row, not the "MORE" grid --
            // matching iOS and the web, which both put Billing under Account.
            composable(ROUTE_BILLING) {
                val viewModel: BillingViewModel = viewModel(factory = BillingViewModel.factory(graph.api, graph.connectivity))
                BillingScreen(viewModel = viewModel, onBack = { navController.popBackStack() })
            }
            composable(ROUTE_ACCOUNT) {
                val viewModel: SettingsViewModel = viewModel(
                    factory = SettingsViewModel.factory(graph.auth, graph.api, graph.themePreference, graph.languagePreference),
                )
                SettingsScreen(
                    viewModel = viewModel,
                    sync = graph.sync,
                    store = graph.store,
                    onOpenBilling = { navController.navigate(ROUTE_BILLING) },
                )
            }
        }
    }

    // Drawn as a sibling of the Scaffold, not inside any one route, so it
    // covers the bottom nav too -- the same full-bleed overlay the web's
    // FocusTimerPanel is (`fixed inset-0 z-[90]`), regardless of which tab
    // was open underneath it.
    if (focusTimerOpen) {
        FocusTimerRoute(graph = graph, onClose = { focusTimerOpen = false })
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
            val viewModel: QuestionBankViewModel = viewModel(
                factory = QuestionBankViewModel.factory(graph.store, graph.sync, graph.connectivity),
            )
            TopicChooserScreen(
                viewModel = viewModel,
                onContinue = { step = QbankStep.Builder },
                onPreviousSittings = { step = QbankStep.Previous },
            )
        }

        QbankStep.Builder -> {
            val viewModel: QuestionBankViewModel = viewModel(
                factory = QuestionBankViewModel.factory(graph.store, graph.sync, graph.connectivity),
            )
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
    val viewModel: PracticalViewModel = viewModel(factory = PracticalViewModel.factory(graph.store, graph.sync, graph.connectivity))
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
