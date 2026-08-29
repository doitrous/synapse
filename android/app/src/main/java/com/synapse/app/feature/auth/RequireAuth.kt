package com.synapse.app.feature.auth

import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import com.synapse.app.core.auth.AuthState

/**
 * Gates [content] on [com.synapse.app.core.auth.AuthModel]'s session state:
 * a centered spinner while the initial restore is in flight, [onSignedOut]
 * (the login/signup/reset nav flow) when there's no session,
 * [VerifyEmailScreen] for a signed-in-but-unverified session, and [content]
 * only once the session is fully signed in.
 *
 * Takes [onSignedOut] and [content] as lambdas rather than referencing the
 * app shell or a concrete nav flow directly, so this file stays independent
 * of the root composable wiring (owned by a separate task) — the caller
 * decides what "the auth flow" and "the app" actually render, e.g.:
 * ```
 * RequireAuth(onSignedOut = { AuthNavHost() }) { AppScaffold() }
 * ```
 */
@Composable
fun RequireAuth(
    authViewModel: AuthViewModel = hiltViewModel(),
    onSignedOut: @Composable () -> Unit,
    content: @Composable () -> Unit,
) {
    val state by authViewModel.state.collectAsStateWithLifecycle()

    when (state) {
        is AuthState.Loading -> {
            Box(modifier = Modifier.fillMaxSize(), contentAlignment = Alignment.Center) {
                CircularProgressIndicator()
            }
        }

        is AuthState.SignedOut -> onSignedOut()

        is AuthState.NeedsEmailVerify -> VerifyEmailScreen(viewModel = authViewModel)

        is AuthState.SignedIn -> content()
    }
}
