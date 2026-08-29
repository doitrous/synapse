package com.synapse.app.feature.auth

import androidx.compose.ui.test.assertIsDisplayed
import androidx.compose.ui.test.assertIsNotEnabled
import androidx.compose.ui.test.junit4.createComposeRule
import androidx.compose.ui.test.onNodeWithText
import androidx.compose.ui.test.performClick
import androidx.compose.ui.test.performTextInput
import com.synapse.app.core.auth.AuthBackend
import com.synapse.app.core.auth.AuthException
import com.synapse.app.core.auth.AuthModel
import com.synapse.app.core.auth.Session
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import org.junit.Assert.assertEquals
import org.junit.Rule
import org.junit.Test
import org.junit.runner.RunWith
import org.robolectric.RobolectricTestRunner

@RunWith(RobolectricTestRunner::class)
class LoginScreenTest {

    @get:Rule
    val rule = createComposeRule()

    @Test
    fun showsErrorMessageWhenViewModelStateCarriesOne() {
        val backend = FakeLoginAuthBackend(signInError = AuthException("Invalid email or password"))
        val viewModel = AuthViewModel(AuthModel(backend) { true })

        rule.setContent { LoginScreen(viewModel = viewModel) }
        rule.runOnIdle { viewModel.onSignIn() }
        rule.waitForIdle()

        rule.onNodeWithText("Invalid email or password").assertIsDisplayed()
    }

    @Test
    fun tappingSignInInvokesTheViewModelWithTheEnteredCredentials() {
        val backend = FakeLoginAuthBackend()
        val viewModel = AuthViewModel(AuthModel(backend) { true })

        rule.setContent { LoginScreen(viewModel = viewModel) }

        rule.onNodeWithText("Email").performTextInput("student@example.com")
        rule.onNodeWithText("Password").performTextInput("correct-password")
        rule.onNodeWithText("Sign in").performClick()
        rule.waitForIdle()

        assertEquals(1, backend.signInCalls)
        assertEquals("student@example.com", backend.lastSignInEmail)
        assertEquals("correct-password", backend.lastSignInPassword)
    }

    @Test
    fun submitButtonIsDisabledWhileSubmitting() {
        val backend = FakeLoginAuthBackend(blockSignIn = true)
        val viewModel = AuthViewModel(AuthModel(backend) { true })

        rule.setContent { LoginScreen(viewModel = viewModel) }
        rule.onNodeWithText("Sign in").performClick()

        rule.onNodeWithText("Sign in").assertIsNotEnabled()
    }
}

/** In-memory [AuthBackend] double for [LoginScreenTest]. */
private class FakeLoginAuthBackend(
    private val signInError: AuthException? = null,
    private val blockSignIn: Boolean = false,
) : AuthBackend {
    private val _session = MutableStateFlow<Session?>(null)
    override val session: StateFlow<Session?> = _session.asStateFlow()

    var signInCalls = 0
    var lastSignInEmail: String? = null
    var lastSignInPassword: String? = null

    override suspend fun restore() {}

    override suspend fun signIn(email: String, password: String) {
        signInCalls++
        lastSignInEmail = email
        lastSignInPassword = password
        signInError?.let { throw it }
        if (blockSignIn) kotlinx.coroutines.delay(Long.MAX_VALUE / 2)
    }

    override suspend fun signUp(email: String, password: String) {}

    override suspend fun signOut() {
        _session.value = null
    }

    override suspend fun sendReset(email: String) {}

    override suspend fun accessToken(): String? = _session.value?.accessToken
}
