package com.synapse.app.feature.auth

import androidx.compose.runtime.Composable
import androidx.navigation.NavHostController
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController

private const val ROUTE_LOGIN = "auth/login"
private const val ROUTE_SIGNUP = "auth/signup"
private const val ROUTE_RESET = "auth/reset"

/**
 * The unauthenticated nav flow: login, signup, and password reset, linked
 * to one another. This is what a [RequireAuth] caller typically passes as
 * `onSignedOut`, e.g. `RequireAuth(onSignedOut = { AuthNavHost() }) { ... }`.
 * Self-contained (its own [NavHostController]) so it can be dropped in
 * without any dependency on the app shell's own navigation graph.
 */
@Composable
fun AuthNavHost(navController: NavHostController = rememberNavController()) {
    NavHost(navController = navController, startDestination = ROUTE_LOGIN) {
        composable(ROUTE_LOGIN) {
            LoginScreen(
                onNavigateToSignup = { navController.navigate(ROUTE_SIGNUP) },
                onNavigateToReset = { navController.navigate(ROUTE_RESET) },
            )
        }
        composable(ROUTE_SIGNUP) {
            SignupScreen(
                onNavigateToLogin = { navController.popBackStack() },
            )
        }
        composable(ROUTE_RESET) {
            ResetPasswordScreen(
                onNavigateToLogin = { navController.popBackStack() },
            )
        }
    }
}
