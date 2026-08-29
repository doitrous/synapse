package com.synapse.app.feature.auth

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Button
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.lifecycle.compose.collectAsStateWithLifecycle

/**
 * Shown by [RequireAuth] when [com.synapse.app.core.auth.AuthState.NeedsEmailVerify]:
 * the session exists but its email isn't verified yet. "Check again" calls
 * [AuthViewModel.onCheckVerification], which re-runs [AuthModel.restore] to
 * re-derive state once the user has verified.
 */
@Composable
fun VerifyEmailScreen(
    viewModel: AuthViewModel = hiltViewModel(),
) {
    val uiState by viewModel.uiState.collectAsStateWithLifecycle()

    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(24.dp),
        verticalArrangement = Arrangement.Center,
        horizontalAlignment = Alignment.CenterHorizontally,
    ) {
        Text(text = "Verify your email", style = MaterialTheme.typography.headlineMedium)
        Text(
            text = "We've sent a verification link to your email. " +
                "Follow it, then check again below.",
            modifier = Modifier.padding(top = 8.dp),
        )

        val error = uiState.error
        if (error != null) {
            Text(
                text = error,
                color = MaterialTheme.colorScheme.error,
                modifier = Modifier.padding(top = 8.dp),
            )
        }

        Button(
            onClick = viewModel::onCheckVerification,
            enabled = !uiState.submitting,
            modifier = Modifier.padding(top = 16.dp),
        ) {
            Text("Check again")
        }
    }
}
