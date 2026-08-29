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
import com.synapse.app.feature.dashboard.DashboardScreen
import com.synapse.app.feature.placeholder.PlaceholderScreen
import com.synapse.app.feature.qbank.QuestionBankRoot

/** Test tag on the top bar's title [Text], so tests can read it unambiguously. */
const val APP_BAR_TITLE_TAG = "app_scaffold_title"

/** Test tag on the theme-cycling action, so tests can trigger it unambiguously. */
const val THEME_TOGGLE_TAG = "app_scaffold_theme_toggle"

/**
 * The student app shell: a [TopAppBar] (destination title + theme toggle), a
 * bottom [NavigationBar] over [PRIMARY_DESTINATIONS], and the [NavHost] that
 * hosts every [STUDENT_DESTINATIONS] route. Only [DASHBOARD_ROUTE] renders
 * real content ([DashboardScreen]); every other route renders [PlaceholderScreen].
 * [themeChoice]/[onThemeChange] are lifted to the caller
 * ([com.synapse.app.MainActivity] wires them to [com.synapse.app.design.ThemePreference]
 * via [com.synapse.app.RootViewModel]).
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
                PRIMARY_DESTINATIONS.forEach { destination ->
                    NavigationBarItem(
                        selected = currentRoute == destination.route,
                        onClick = {
                            if (currentRoute != destination.route) {
                                navController.navigate(destination.route) {
                                    popUpTo(navController.graph.findStartDestination().id) {
                                        saveState = true
                                    }
                                    launchSingleTop = true
                                    restoreState = true
                                }
                            }
                        },
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

private fun ThemeChoice.next(): ThemeChoice = when (this) {
    ThemeChoice.Light -> ThemeChoice.Warm
    ThemeChoice.Warm -> ThemeChoice.Dark
    ThemeChoice.Dark -> ThemeChoice.Light
}
