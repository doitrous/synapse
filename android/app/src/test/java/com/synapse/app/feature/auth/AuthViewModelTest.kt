package com.synapse.app.feature.auth

import com.synapse.app.core.auth.AuthBackend
import com.synapse.app.core.auth.AuthException
import com.synapse.app.core.auth.AuthModel
import com.synapse.app.core.auth.AuthState
import com.synapse.app.core.auth.Session
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.ExperimentalCoroutinesApi
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.test.StandardTestDispatcher
import kotlinx.coroutines.test.resetMain
import kotlinx.coroutines.test.runTest
import kotlinx.coroutines.test.setMain
import org.junit.After
import org.junit.Assert.assertEquals
import org.junit.Assert.assertFalse
import org.junit.Assert.assertNull
import org.junit.Assert.assertTrue
import org.junit.Before
import org.junit.Test

/**
 * [AuthViewModel] built on a real [AuthModel] + [FakeAuthBackend] double (not
 * a mock) so these tests exercise the same sign-in/gate logic the app runs,
 * per this project's convention (see [com.synapse.app.core.auth.AuthModelTest]).
 */
@OptIn(ExperimentalCoroutinesApi::class)
class AuthViewModelTest {

    private val dispatcher = StandardTestDispatcher()

    @Before
    fun setUp() {
        Dispatchers.setMain(dispatcher)
    }

    @After
    fun tearDown() {
        Dispatchers.resetMain()
    }

    @Test
    fun failedSignInSetsVisibleErrorWithoutCrashing() = runTest {
        val backend = FakeAuthBackend(signInError = AuthException("Invalid credentials"))
        val viewModel = AuthViewModel(AuthModel(backend) { true })

        viewModel.onEmailChange("student@example.com")
        viewModel.onPasswordChange("wrong-password")
        viewModel.onSignIn()
        dispatcher.scheduler.advanceUntilIdle()

        assertEquals("Invalid credentials", viewModel.uiState.value.error)
        assertFalse(viewModel.uiState.value.submitting)
        assertTrue(viewModel.state.value !is AuthState.SignedIn)
    }

    @Test
    fun successfulVerifiedAndConfirmedSignInReachesSignedIn() = runTest {
        val backend = FakeAuthBackend()
        backend.nextSession = Session(userId = "u1", accessToken = "tok", emailVerified = true)
        val viewModel = AuthViewModel(AuthModel(backend) { true })

        viewModel.onEmailChange("student@example.com")
        viewModel.onPasswordChange("correct-password")
        viewModel.onSignIn()
        dispatcher.scheduler.advanceUntilIdle()

        assertTrue(viewModel.state.value is AuthState.SignedIn)
        assertNull(viewModel.uiState.value.error)
        assertFalse(viewModel.uiState.value.submitting)
    }

    @Test
    fun editingEmailAfterAnErrorClearsIt() = runTest {
        val backend = FakeAuthBackend(signInError = AuthException("bad creds"))
        val viewModel = AuthViewModel(AuthModel(backend) { true })

        viewModel.onSignIn()
        dispatcher.scheduler.advanceUntilIdle()
        assertEquals("bad creds", viewModel.uiState.value.error)

        viewModel.onEmailChange("new@example.com")

        assertNull(viewModel.uiState.value.error)
    }

    @Test
    fun signUpFailureIsSurfacedTheSameWay() = runTest {
        val backend = FakeAuthBackend(signUpError = AuthException("Email already registered"))
        val viewModel = AuthViewModel(AuthModel(backend) { true })

        viewModel.onEmailChange("student@example.com")
        viewModel.onPasswordChange("pw")
        viewModel.onSignUp()
        dispatcher.scheduler.advanceUntilIdle()

        assertEquals("Email already registered", viewModel.uiState.value.error)
    }

    @Test
    fun resetSendsEmailAndSurfacesFailure() = runTest {
        val backend = FakeAuthBackend()
        val viewModel = AuthViewModel(AuthModel(backend) { true })
        viewModel.onEmailChange("student@example.com")

        viewModel.onReset()
        dispatcher.scheduler.advanceUntilIdle()

        assertEquals(listOf("student@example.com"), backend.sendResetCalls)
        assertNull(viewModel.uiState.value.error)
    }
}

/** In-memory [AuthBackend] double that can be told to fail specific calls, for [AuthViewModelTest]. */
private class FakeAuthBackend(
    private val signInError: AuthException? = null,
    private val signUpError: AuthException? = null,
) : AuthBackend {
    private val _session = MutableStateFlow<Session?>(null)
    override val session: StateFlow<Session?> = _session.asStateFlow()

    /** Session the next successful signIn/signUp/restore call should yield. */
    var nextSession: Session? = null

    val sendResetCalls = mutableListOf<String>()

    override suspend fun restore() {
        _session.value = nextSession
    }

    override suspend fun signIn(email: String, password: String) {
        signInError?.let { throw it }
        _session.value = nextSession
    }

    override suspend fun signUp(email: String, password: String) {
        signUpError?.let { throw it }
        _session.value = nextSession
    }

    override suspend fun signOut() {
        _session.value = null
    }

    override suspend fun sendReset(email: String) {
        sendResetCalls += email
    }

    override suspend fun accessToken(): String? = _session.value?.accessToken
}
