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
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.unit.dp
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import com.synapse.app.R

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
        Text(text = stringResource(R.string.auth_verify_email_title), style = MaterialTheme.typography.headlineMedium)
        Text(
            text = stringResource(R.string.auth_verify_email_body),
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
            Text(stringResource(R.string.auth_check_again))
        }
    }
}
