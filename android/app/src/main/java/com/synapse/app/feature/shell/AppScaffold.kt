package com.synapse.app.feature.shell

import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxSize
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
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.testTag
import androidx.navigation.NavGraph.Companion.findStartDestination
import androidx.navigation.NavHostController
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.currentBackStackEntryAsState
import com.synapse.app.design.ThemeChoice
import com.synapse.app.feature.placeholder.PlaceholderScreen

/** Test tag on the top bar's title [Text], so tests can read it unambiguously. */
const val APP_BAR_TITLE_TAG = "app_scaffold_title"

/** Test tag on the theme-cycling action, so tests can trigger it unambiguously. */
const val THEME_TOGGLE_TAG = "app_scaffold_theme_toggle"

/**
 * The student app shell: a [TopAppBar] (destination title + theme toggle), a
 * bottom [NavigationBar] over [PRIMARY_DESTINATIONS], and the [NavHost] that
 * hosts every [STUDENT_DESTINATIONS] route. Only [DASHBOARD_ROUTE] renders
 * real content ([DashboardStub] — Task 6 replaces this); every other route
 * renders [PlaceholderScreen]. [themeChoice]/[onThemeChange] are lifted to the
 * caller (a later integration task wires them to [com.synapse.app.design.ThemePreference]).
 */
@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun AppScaffold(
    navController: NavHostController,
    themeChoice: ThemeChoice,
    onThemeChange: (ThemeChoice) -> Unit,
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
                    if (destination.route == DASHBOARD_ROUTE) {
                        DashboardStub()
                    } else {
                        PlaceholderScreen(title = destination.label)
                    }
                }
            }
        }
    }
}

/** Stands in for Task 6's real Dashboard, so the shell is launchable end to end today. */
@Composable
private fun DashboardStub() {
    Box(modifier = Modifier.fillMaxSize(), contentAlignment = Alignment.Center) {
        Text("Dashboard")
    }
}

private fun ThemeChoice.next(): ThemeChoice = when (this) {
    ThemeChoice.Light -> ThemeChoice.Warm
    ThemeChoice.Warm -> ThemeChoice.Dark
    ThemeChoice.Dark -> ThemeChoice.Light
}
