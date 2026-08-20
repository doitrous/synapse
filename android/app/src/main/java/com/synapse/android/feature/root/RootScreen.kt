package com.synapse.android.feature.root

import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.NavigationBar
import androidx.compose.material3.NavigationBarItem
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
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
import com.synapse.android.core.auth.AuthState
import com.synapse.android.feature.account.AccountScreen
import com.synapse.android.feature.account.AccountViewModel
import com.synapse.android.feature.auth.SignInScreen

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

/** The signed-in shell: `qbank` and `practical` are stubs here -- later tasks build the real screens behind these routes. */
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
            composable(ROUTE_QBANK) { StubScreen("Question Bank") }
            composable(ROUTE_PRACTICAL) { StubScreen("Practical") }
            composable(ROUTE_ACCOUNT) {
                val viewModel: AccountViewModel = viewModel(
                    factory = AccountViewModel.factory(graph.auth, graph.sync, graph.store),
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

@Composable
private fun StubScreen(name: String) {
    Box(modifier = Modifier.fillMaxSize(), contentAlignment = Alignment.Center) {
        Text("$name is coming soon", style = MaterialTheme.typography.bodyLarge)
    }
}
