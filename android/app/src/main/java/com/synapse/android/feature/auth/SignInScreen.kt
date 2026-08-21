package com.synapse.android.feature.auth

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.material3.Button
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.rememberCoroutineScope
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.input.PasswordVisualTransformation
import androidx.compose.ui.unit.dp
import com.synapse.android.design.Wordmark
import kotlinx.coroutines.launch

/**
 * The only entry point to a signed-in session.
 *
 * [message] and [isWorking] are orthogonal to which screen is showing --
 * see `AuthModel`'s own class doc -- so a spinner on the sign-in button and
 * a notice above it can both be true at once, and neither one ever replaces
 * this form with something else.
 */
@Composable
fun SignInScreen(
    message: String?,
    isWorking: Boolean,
    onSignIn: suspend (email: String, password: String) -> Unit,
    onSignUp: suspend (email: String, password: String) -> Unit,
    onResetPassword: suspend (email: String) -> Unit,
) {
    var email by remember { mutableStateOf("") }
    var password by remember { mutableStateOf("") }
    val scope = rememberCoroutineScope()

    Column(
        modifier = Modifier.fillMaxSize().padding(24.dp),
        verticalArrangement = Arrangement.spacedBy(12.dp),
    ) {
        Wordmark()
        Text("Welcome back", style = MaterialTheme.typography.headlineSmall)

        message?.let { Text(it, color = MaterialTheme.colorScheme.error) }

        OutlinedTextField(
            value = email,
            onValueChange = { email = it },
            label = { Text("Email") },
            modifier = Modifier.fillMaxWidth(),
            singleLine = true,
        )
        OutlinedTextField(
            value = password,
            onValueChange = { password = it },
            label = { Text("Password") },
            modifier = Modifier.fillMaxWidth(),
            singleLine = true,
            visualTransformation = PasswordVisualTransformation(),
        )

        Button(
            onClick = { scope.launch { onSignIn(email, password) } },
            enabled = !isWorking,
            modifier = Modifier.fillMaxWidth(),
        ) {
            if (isWorking) {
                CircularProgressIndicator(modifier = Modifier.size(18.dp))
            } else {
                Text("Sign in")
            }
        }

        TextButton(onClick = { scope.launch { onSignUp(email, password) } }, enabled = !isWorking) {
            Text("Create an account")
        }
        TextButton(onClick = { scope.launch { onResetPassword(email) } }, enabled = !isWorking) {
            Text("Forgot your password?")
        }
    }
}
