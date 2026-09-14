package com.synapse.app.feature.shell

import androidx.compose.foundation.layout.padding
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Settings
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.NavigationBar
import androidx.compose.material3.NavigationBarItem
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.material3.TopAppBar
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.testTag
import androidx.navigation.NavGraph.Companion.findStartDestination
import androidx.navigation.NavHostController
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.currentBackStackEntryAsState
import com.synapse.app.design.ThemeChoice
import com.synapse.app.feature.adaptive.AdaptiveRoute
import com.synapse.app.feature.dashboard.DashboardScreen
import com.synapse.app.feature.account.AccountRoute
import com.synapse.app.feature.billing.BillingRoute
import com.synapse.app.feature.calendar.CalendarRoute
import com.synapse.app.feature.essays.EssaysRoute
import com.synapse.app.feature.flashcards.FlashcardsRoot
import com.synapse.app.feature.library.LibraryRoute
import com.synapse.app.feature.maristanas.MaristanasRoute
import com.synapse.app.feature.minigames.MinigamesRoute
import com.synapse.app.feature.notebook.NotebookRoute
import com.synapse.app.feature.placeholder.PlaceholderScreen
import com.synapse.app.feature.taxonomy.TaxonomyRoute
import com.synapse.app.feature.university.UniversityRoute
import com.synapse.app.feature.whiteboard.WhiteboardRoute
import com.synapse.app.feature.performance.PerformanceRoute
import com.synapse.app.feature.practical.PracticalRoute
import com.synapse.app.feature.qbank.QuestionBankRoot
import com.synapse.app.feature.resources.ResourcesRoute
import com.synapse.app.feature.social.StudyTogetherRoute

/** Test tag on the top bar's title [Text], so tests can read it unambiguously. */
const val APP_BAR_TITLE_TAG = "app_scaffold_title"

/** Test tag on the theme-cycling action, so tests can trigger it unambiguously. */
const val THEME_TOGGLE_TAG = "app_scaffold_theme_toggle"

/** Test tag on the bottom nav item for [route], so tests can trigger it unambiguously. */
fun bottomNavItemTag(route: String) = "app_scaffold_bottom_nav_item_$route"

/**
 * The student app shell: a [TopAppBar] (destination title + theme toggle), a bottom
 * [NavigationBar] over [BOTTOM_DESTINATIONS] (mirroring the production iOS app's 5-tab
 * `SignedInView`: Today, Library, Questions, Resources, More), and the [NavHost] that hosts
 * every [ALL_DESTINATIONS] route. The "More" tab renders [MoreHubScreen], which lists every
 * destination that doesn't fit in the bottom bar, grouped like the web sidebar (`nav.ts`).
 *
 * [routeContent] is the single route -> screen registry (mirroring the web router's
 * `studentPages` map in `router.tsx`): a route not listed here falls back to
 * [PlaceholderScreen]. Wiring up a newly-built surface later is a one-line addition to this
 * map — no other seam needs to change. [themeChoice]/[onThemeChange] are lifted to the caller
 * ([com.synapse.app.MainActivity] wires them to [com.synapse.app.design.ThemePreference] via
 * [com.synapse.app.RootViewModel]).
 *
 * [dashboardContent] defaults to the real [DashboardScreen] (which resolves its
 * `@HiltViewModel` via `hiltViewModel()`, requiring a Hilt-aware host activity). Tests that
 * compose [AppScaffold] under a plain (non-Hilt) test activity — e.g. a bare
 * `createComposeRule()` — can override it with a Hilt-free stand-in. [qbankContent]
 * (defaulting to [QuestionBankRoot], Task 6's Question Bank flow) and [flashcardsContent]
 * (defaulting to [FlashcardsRoot], Plan 05 Task 4's Flashcards flow, now reached through the
 * More hub rather than the bottom bar) follow the same seam.
 */
@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun AppScaffold(
    navController: NavHostController,
    themeChoice: ThemeChoice,
    onThemeChange: (ThemeChoice) -> Unit,
    dashboardContent: @Composable () -> Unit = { DashboardScreen() },
    qbankContent: @Composable () -> Unit = { QuestionBankRoot() },
    flashcardsContent: @Composable () -> Unit = { FlashcardsRoot() },
    libraryContent: @Composable () -> Unit = { LibraryRoute() },
    resourcesContent: @Composable () -> Unit = { ResourcesRoute() },
    taxonomyContent: @Composable () -> Unit = { TaxonomyRoute() },
    essaysContent: @Composable () -> Unit = { EssaysRoute() },
    practicalContent: @Composable () -> Unit = { PracticalRoute() },
    performanceContent: @Composable () -> Unit = { PerformanceRoute() },
    adaptiveContent: @Composable () -> Unit = { AdaptiveRoute() },
    notebookContent: @Composable () -> Unit = { NotebookRoute() },
    whiteboardContent: @Composable () -> Unit = { WhiteboardRoute() },
    calendarContent: @Composable () -> Unit = { CalendarRoute() },
    universityContent: @Composable () -> Unit = { UniversityRoute() },
    accountContent: @Composable () -> Unit = { AccountRoute() },
    billingContent: @Composable () -> Unit = { BillingRoute() },
    maristanasContent: @Composable () -> Unit = { MaristanasRoute() },
    minigamesContent: @Composable () -> Unit = { MinigamesRoute() },
    studyTogetherContent: @Composable () -> Unit = { StudyTogetherRoute() },
) {
    val backStackEntry by navController.currentBackStackEntryAsState()
    val currentRoute = backStackEntry?.destination?.route
    val title = ALL_DESTINATIONS.firstOrNull { it.route == currentRoute }?.label ?: "nishany"

    /** Bottom-tab navigation: resets to a fresh, single copy of [route] on the back stack. */
    fun navigateToTab(route: String) {
        if (currentRoute != route) {
            navController.navigate(route) {
                popUpTo(navController.graph.findStartDestination().id) {
                    saveState = true
                }
                launchSingleTop = true
                restoreState = true
            }
        }
    }

    /** More-hub navigation: an ordinary push, so the back stack returns to the hub. */
    fun navigateFromHub(route: String) {
        if (currentRoute != route) {
            navController.navigate(route)
        }
    }

    // The route -> screen registry. Every ALL_DESTINATIONS route not listed here renders
    // PlaceholderScreen (see the NavHost builder below) until its own feature lands.
    val routeContent: Map<String, @Composable () -> Unit> = mapOf(
        DASHBOARD_ROUTE to dashboardContent,
        LIBRARY_ROUTE to libraryContent,
        RESOURCES_ROUTE to resourcesContent,
        QUESTION_BANK_ROUTE to qbankContent,
        FLASHCARDS_ROUTE to flashcardsContent,
        "taxonomy" to taxonomyContent,
        "essays" to essaysContent,
        "practical" to practicalContent,
        "performance" to performanceContent,
        "adaptive" to adaptiveContent,
        "notebook" to notebookContent,
        "whiteboard" to whiteboardContent,
        "calendar" to calendarContent,
        "university" to universityContent,
        "account" to accountContent,
        "billing" to billingContent,
        "maristanas" to maristanasContent,
        "minigames" to minigamesContent,
        "study-together" to studyTogetherContent,
        MORE_ROUTE to { MoreHubScreen(onNavigate = ::navigateFromHub) },
    )

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text(text = title, modifier = Modifier.testTag(APP_BAR_TITLE_TAG)) },
                actions = {
                    IconButton(
                        onClick = { onThemeChange(themeChoice.next()) },
                        modifier = Modifier.testTag(THEME_TOGGLE_TAG),
                    ) {
                        Icon(Icons.Filled.Settings, contentDescription = "Change theme")
                    }
                },
            )
        },
        bottomBar = {
            NavigationBar {
                BOTTOM_DESTINATIONS.forEach { destination ->
                    NavigationBarItem(
                        modifier = Modifier.testTag(bottomNavItemTag(destination.route)),
                        selected = currentRoute == destination.route,
                        onClick = { navigateToTab(destination.route) },
                        icon = { Icon(destination.icon, contentDescription = destination.label) },
                        label = { Text(destination.label) },
                    )
                }
            }
        },
    ) { innerPadding ->
        NavHost(
            navController = navController,
            startDestination = DASHBOARD_ROUTE,
            modifier = Modifier.padding(innerPadding),
        ) {
            ALL_DESTINATIONS.forEach { destination ->
                composable(destination.route) {
                    val content = routeContent[destination.route]
                        ?: { PlaceholderScreen(title = destination.label) }
                    content()
                }
            }
        }
    }
}

private fun ThemeChoice.next(): ThemeChoice = when (this) {
    ThemeChoice.Light -> ThemeChoice.Warm
    ThemeChoice.Warm -> ThemeChoice.Dark
    ThemeChoice.Dark -> ThemeChoice.Light
}
