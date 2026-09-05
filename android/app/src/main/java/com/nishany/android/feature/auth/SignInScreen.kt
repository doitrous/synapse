package com.nishany.android.feature.auth

import androidx.compose.foundation.background
import androidx.compose.foundation.border
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
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.input.PasswordVisualTransformation
import androidx.compose.ui.unit.dp
import com.nishany.android.core.auth.AuthNotice
import com.nishany.android.design.CortexRadius
import com.nishany.android.design.LocalCortex
import com.nishany.android.design.Wordmark
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
    message: AuthNotice?,
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

        message?.let { AuthNoticePanel(it) }

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

/**
 * One notice, in the tone it carries.
 *
 * Both are ported from the site: the problem is `role="alert"` in
 * `src/pages/auth/Login.tsx:93` -- `border-danger/30 bg-danger-tint
 * text-danger` -- and the progress notice is `role="status"` in
 * `src/pages/auth/ForgotPassword.tsx:22`, `border-line bg-surface-2
 * text-ink-2`. Everything used to render as the first of these, which meant
 * "your account was created" was delivered in the colour of a rejection.
 */
@Composable
private fun AuthNoticePanel(notice: AuthNotice) {
    val cortex = LocalCortex.current
    val shape = RoundedCornerShape(CortexRadius.lg)
    val border = when (notice.tone) {
        AuthNotice.Tone.PROBLEM -> cortex.danger.copy(alpha = 0.30f)
        AuthNotice.Tone.PROGRESS -> cortex.line
    }
    val fill = when (notice.tone) {
        AuthNotice.Tone.PROBLEM -> cortex.dangerTint
        AuthNotice.Tone.PROGRESS -> cortex.surface2
    }
    val ink = when (notice.tone) {
        AuthNotice.Tone.PROBLEM -> cortex.danger
        AuthNotice.Tone.PROGRESS -> cortex.ink2
    }

    Text(
        notice.text,
        color = ink,
        style = MaterialTheme.typography.bodySmall,
        modifier = Modifier
            .fillMaxWidth()
            .border(1.dp, border, shape)
            .background(fill, shape)
            .padding(horizontal = 14.dp, vertical = 12.dp),
    )
}
