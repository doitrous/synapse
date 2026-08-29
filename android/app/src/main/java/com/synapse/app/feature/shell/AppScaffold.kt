package com.synapse.app.feature.shell

import androidx.compose.foundation.layout.padding
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Menu
import androidx.compose.material.icons.filled.Settings
import androidx.compose.material3.DrawerValue
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.ModalDrawerSheet
import androidx.compose.material3.ModalNavigationDrawer
import androidx.compose.material3.NavigationBar
import androidx.compose.material3.NavigationBarItem
import androidx.compose.material3.NavigationDrawerItem
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.material3.TopAppBar
import androidx.compose.material3.rememberDrawerState
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.rememberCoroutineScope
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.unit.dp
import androidx.navigation.NavGraph.Companion.findStartDestination
import androidx.navigation.NavHostController
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.currentBackStackEntryAsState
import com.synapse.app.design.ThemeChoice
import com.synapse.app.feature.dashboard.DashboardScreen
import com.synapse.app.feature.placeholder.PlaceholderScreen
import com.synapse.app.feature.qbank.QuestionBankRoot
import kotlinx.coroutines.launch

/** Test tag on the top bar's title [Text], so tests can read it unambiguously. */
const val APP_BAR_TITLE_TAG = "app_scaffold_title"

/** Test tag on the theme-cycling action, so tests can trigger it unambiguously. */
const val THEME_TOGGLE_TAG = "app_scaffold_theme_toggle"

/** Test tag on the top bar's hamburger action that opens the nav [ModalNavigationDrawer]. */
const val NAV_DRAWER_BUTTON_TAG = "app_scaffold_nav_drawer_button"

/** Test tag on the drawer item for [route], so tests can trigger it unambiguously. */
fun drawerItemTag(route: String) = "app_scaffold_drawer_item_$route"

/**
 * Test tag on the bottom nav item for [route]. Every [STUDENT_DESTINATIONS] entry also has a
 * drawer item sharing its label (see [drawerItemTag]) — since [ModalNavigationDrawer]'s
 * `drawerContent` stays composed (just off-screen) while closed, a bare `onNodeWithText(label)`
 * can match both; tests that need the bottom nav item specifically should use this tag instead.
 */
fun bottomNavItemTag(route: String) = "app_scaffold_bottom_nav_item_$route"

/**
 * The student app shell: a [TopAppBar] (hamburger + destination title + theme toggle), a
 * [ModalNavigationDrawer] listing every [STUDENT_DESTINATIONS] entry, a bottom [NavigationBar]
 * over [PRIMARY_DESTINATIONS] for quick access, and the [NavHost] that hosts every
 * [STUDENT_DESTINATIONS] route. Only [DASHBOARD_ROUTE] renders real content ([DashboardScreen]);
 * every other route renders [PlaceholderScreen]. [themeChoice]/[onThemeChange] are lifted to the
 * caller ([com.synapse.app.MainActivity] wires them to [com.synapse.app.design.ThemePreference]
 * via [com.synapse.app.RootViewModel]).
 *
 * The bottom [NavigationBar] curates the five destinations a student reaches for most; the
 * drawer is the complete list, reachable via the top bar's hamburger action, so all ten
 * [STUDENT_DESTINATIONS] stay reachable regardless of which are promoted to the bottom bar.
 *
 * [dashboardContent] defaults to the real [DashboardScreen] (which resolves its
 * `@HiltViewModel` via `hiltViewModel()`, requiring a Hilt-aware host activity). Tests that
 * compose [AppScaffold] under a plain (non-Hilt) test activity — e.g. a bare
 * `createComposeRule()` — can override it with a Hilt-free stand-in. [qbankContent]
 * (defaulting to [QuestionBankRoot], Task 6's Question Bank flow) follows the same seam.
 */
@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun AppScaffold(
    navController: NavHostController,
    themeChoice: ThemeChoice,
    onThemeChange: (ThemeChoice) -> Unit,
    dashboardContent: @Composable () -> Unit = { DashboardScreen() },
    qbankContent: @Composable () -> Unit = { QuestionBankRoot() },
) {
    val backStackEntry by navController.currentBackStackEntryAsState()
    val currentRoute = backStackEntry?.destination?.route
    val title = STUDENT_DESTINATIONS.firstOrNull { it.route == currentRoute }?.label ?: "Synapse"

    val drawerState = rememberDrawerState(initialValue = DrawerValue.Closed)
    val scope = rememberCoroutineScope()

    fun navigateTo(route: String) {
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

    ModalNavigationDrawer(
        drawerState = drawerState,
        drawerContent = {
            ModalDrawerSheet {
                Text(
                    text = "Synapse",
                    modifier = Modifier.padding(16.dp),
                    style = MaterialTheme.typography.titleLarge,
                )
                STUDENT_DESTINATIONS.forEach { destination ->
                    NavigationDrawerItem(
                        modifier = Modifier
                            .padding(horizontal = 12.dp)
                            .testTag(drawerItemTag(destination.route)),
                        selected = currentRoute == destination.route,
                        label = { Text(destination.label) },
                        icon = { Icon(destination.icon, contentDescription = destination.label) },
                        onClick = {
                            navigateTo(destination.route)
                            scope.launch { drawerState.close() }
                        },
                    )
                }
            }
        },
    ) {
        Scaffold(
            topBar = {
                TopAppBar(
                    title = { Text(text = title, modifier = Modifier.testTag(APP_BAR_TITLE_TAG)) },
                    navigationIcon = {
                        IconButton(
                            onClick = { scope.launch { drawerState.open() } },
                            modifier = Modifier.testTag(NAV_DRAWER_BUTTON_TAG),
                        ) {
                            Icon(Icons.Filled.Menu, contentDescription = "Open navigation menu")
                        }
                    },
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
                    PRIMARY_DESTINATIONS.forEach { destination ->
                        NavigationBarItem(
                            modifier = Modifier.testTag(bottomNavItemTag(destination.route)),
                            selected = currentRoute == destination.route,
                            onClick = { navigateTo(destination.route) },
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
                STUDENT_DESTINATIONS.forEach { destination ->
                    composable(destination.route) {
                        when (destination.route) {
                            DASHBOARD_ROUTE -> dashboardContent()
                            QUESTION_BANK_ROUTE -> qbankContent()
                            else -> PlaceholderScreen(title = destination.label)
                        }
                    }
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
