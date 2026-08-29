package com.synapse.app.core.auth

import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.test.runTest
import org.junit.Assert.assertEquals
import org.junit.Assert.assertFalse
import org.junit.Assert.assertTrue
import org.junit.Test

private fun session(verified: Boolean, userId: String = "u1", token: String = "tok") =
    Session(userId = userId, accessToken = token, emailVerified = verified)

class AuthModelTest {

    @Test fun initialStateIsLoading() = runTest {
        val backend = FakeAuthBackend()
        val model = AuthModel(backend) { true }
        assertEquals(AuthState.Loading, model.state.value)
    }

    @Test fun signInWithUnverifiedEmailGoesToNeedsEmailVerify() = runTest {
        val backend = FakeAuthBackend()
        backend.nextSession = session(verified = false)
        var confirmCalls = 0
        val model = AuthModel(backend) { confirmCalls++; true }

        model.signIn("a@b.com", "pw")

        assertEquals(AuthState.NeedsEmailVerify, model.state.value)
        assertEquals(0, confirmCalls) // never round-trips /api/session for an unverified email
    }

    @Test fun signInVerifiedButConfirmSessionFalseDoesNotReachSignedIn() = runTest {
        val backend = FakeAuthBackend()
        backend.nextSession = session(verified = true)
        val model = AuthModel(backend) { false }

        model.signIn("a@b.com", "pw")

        assertTrue(model.state.value !is AuthState.SignedIn)
        assertEquals(AuthState.SignedOut, model.state.value)
    }

    @Test fun signInVerifiedAndConfirmSessionTrueReachesSignedIn() = runTest {
        val backend = FakeAuthBackend()
        val expected = session(verified = true)
        backend.nextSession = expected
        val model = AuthModel(backend) { true }

        model.signIn("a@b.com", "pw")

        val state = model.state.value
        assertTrue(state is AuthState.SignedIn)
        assertEquals(expected, (state as AuthState.SignedIn).session)
    }

    @Test fun signOutReturnsToSignedOut() = runTest {
        val backend = FakeAuthBackend()
        backend.nextSession = session(verified = true)
        val model = AuthModel(backend) { true }
        model.signIn("a@b.com", "pw")
        assertTrue(model.state.value is AuthState.SignedIn)

        model.signOut()

        assertEquals(AuthState.SignedOut, model.state.value)
    }

    @Test fun restoreWithExistingVerifiedAndConfirmedSessionReachesSignedIn() = runTest {
        val backend = FakeAuthBackend()
        val existing = session(verified = true, userId = "persisted")
        backend.restoredSession = existing
        val model = AuthModel(backend) { true }

        model.restore()

        val state = model.state.value
        assertTrue(state is AuthState.SignedIn)
        assertEquals(existing, (state as AuthState.SignedIn).session)
    }

    @Test fun restoreWithNoPersistedSessionIsSignedOut() = runTest {
        val backend = FakeAuthBackend()
        val model = AuthModel(backend) { true }

        model.restore()

        assertEquals(AuthState.SignedOut, model.state.value)
    }

    @Test fun accessTokenDelegatesToBackend() = runTest {
        val backend = FakeAuthBackend()
        backend.nextSession = session(verified = true, token = "the-token")
        val model = AuthModel(backend) { true }
        model.signIn("a@b.com", "pw")

        assertEquals("the-token", model.accessToken())
    }

    @Test fun signInVerifiedButConfirmSessionFalseClearsBackendSession() = runTest {
        val backend = FakeAuthBackend()
        backend.nextSession = session(verified = true)
        val model = AuthModel(backend) { false }

        model.signIn("a@b.com", "pw")

        assertEquals(AuthState.SignedOut, model.state.value)
        assertEquals(null, model.accessToken())
    }
}

/** In-memory [AuthBackend] double for tests. Not a real network client. */
private class FakeAuthBackend : AuthBackend {
    private val _session = MutableStateFlow<Session?>(null)
    override val session: StateFlow<Session?> = _session.asStateFlow()

    /** Session the next signIn/signUp call should yield. */
    var nextSession: Session? = null

    /** Session restore() should find as already persisted (e.g. from a saved token). */
    var restoredSession: Session? = null

    val sendResetCalls = mutableListOf<String>()

    override suspend fun restore() {
        _session.value = restoredSession
    }

    override suspend fun signIn(email: String, password: String) {
        _session.value = nextSession
    }

    override suspend fun signUp(email: String, password: String) {
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
