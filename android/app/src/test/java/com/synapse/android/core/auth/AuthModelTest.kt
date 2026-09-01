package com.synapse.android.core.auth

import com.synapse.android.core.api.SessionUser
import com.synapse.android.core.api.SynapseApi
import com.synapse.android.core.config.AppConfig
import kotlinx.coroutines.CancellationException
import kotlinx.coroutines.runBlocking
import okhttp3.OkHttpClient
import okhttp3.mockwebserver.MockResponse
import okhttp3.mockwebserver.MockWebServer
import okhttp3.mockwebserver.SocketPolicy
import org.junit.After
import org.junit.Assert.assertEquals
import org.junit.Assert.assertFalse
import org.junit.Assert.assertNotNull
import org.junit.Assert.assertNull
import org.junit.Assert.assertTrue
import org.junit.Before
import org.junit.Test

class AuthModelTest {

    private lateinit var server: MockWebServer
    private lateinit var api: SynapseApi
    private lateinit var backend: FakeAuthBackend
    private lateinit var cache: FakeSessionUserCache
    private lateinit var config: AppConfig

    @Before fun setUp() {
        server = MockWebServer().also { it.start() }
        backend = FakeAuthBackend()
        cache = FakeSessionUserCache()
        config = AppConfig(
            rawSupabaseHost = "project.supabase.co",
            supabaseAnonKey = "anon-key",
            rawApiBaseUrl = server.url("/").toString(),
        )
        api = SynapseApi(
            baseUrl = server.url("/").toString().trimEnd('/'),
            client = OkHttpClient(),
            tokenProvider = { backend.accessToken() },
        )
    }

    @After fun tearDown() = server.shutdown()

    private fun model(cfg: AppConfig = config) = AuthModel(cfg, api, backend, cache)

    private fun aUser(id: String = "u1") = SessionUser(
        id = id,
        email = "student@example.com",
        role = "student",
        aal = "aal1",
        mfaRequired = false,
    )

    private fun sessionBody(id: String, email: String) =
        """{"user":{"id":"$id","email":"$email","role":"student","aal":"aal1","mfaRequired":false}}"""

    @Test fun `an unconfigured build never reaches the sign-in form`() = runBlocking {
        val model = model(AppConfig("", "", ""))
        model.start()
        val state = model.state.value
        assertTrue(state is AuthState.NotConfigured)
        assertEquals(
            listOf("SUPABASE_HOST", "SUPABASE_ANON_KEY", "API_BASE_URL"),
            (state as AuthState.NotConfigured).missing,
        )
    }

    @Test fun `a successful sign-in is confirmed against the API before we claim to be signed in`() = runBlocking {
        backend.accessTokenValue = "session-token"
        server.enqueue(MockResponse().setBody(sessionBody("u1", "student@example.com")))
        val model = model()

        model.signIn("student@example.com", "pw")

        assertEquals(1, backend.signIns.size)
        val request = server.takeRequest()
        assertEquals("Bearer session-token", request.getHeader("Authorization"))
        val state = model.state.value
        assertTrue(state is AuthState.SignedIn)
        assertEquals("u1", (state as AuthState.SignedIn).user.id)
    }

    @Test fun `a token that does not survive the round-trip signs us back out`() = runBlocking {
        // backend.accessTokenValue is deliberately left null even though
        // signIn "succeeds" -- the session was stored but reads back as
        // null, so the request goes out with no Authorization header and
        // the API answers 401.
        server.enqueue(MockResponse().setResponseCode(401))
        val model = model()

        model.signIn("student@example.com", "pw")

        assertEquals(AuthState.SignedOut, model.state.value)
        assertNotNull(model.message.value)
    }

    @Test fun `a Supabase account the API does not know lands on SignedOut with an explanation`() = runBlocking {
        backend.accessTokenValue = "session-token"
        server.enqueue(MockResponse().setBody("""{"user":null}"""))
        val model = model()

        model.signIn("student@example.com", "pw")

        assertEquals(AuthState.SignedOut, model.state.value)
        assertNotNull(model.message.value)
    }

    @Test fun `restore with no stored token lands on SignedOut, not on Failed`() = runBlocking {
        server.enqueue(MockResponse().setBody("""{"user":null}"""))
        val model = model()

        model.start()

        assertEquals(AuthState.SignedOut, model.state.value)
        assertNull(model.message.value)
    }

    @Test fun `a dropped connection during restore does not discard a stored session`() = runBlocking {
        backend.accessTokenValue = "existing-token"
        server.enqueue(MockResponse().setSocketPolicy(SocketPolicy.DISCONNECT_AT_START))
        val model = model()

        model.start()

        assertEquals(AuthState.SignedOut, model.state.value)
        assertFalse(backend.signOutCalled)
        assertEquals("existing-token", backend.accessTokenValue)
    }

    @Test fun `sign out clears the stored token`() = runBlocking {
        backend.accessTokenValue = "session-token"
        val model = model()

        model.signOut()

        assertTrue(backend.signOutCalled)
        assertNull(backend.accessTokenValue)
        assertEquals(AuthState.SignedOut, model.state.value)
    }

    @Test fun `an email is trimmed and lower-cased before it is sent`() = runBlocking {
        backend.accessTokenValue = "session-token"
        server.enqueue(MockResponse().setBody(sessionBody("u1", "me@example.com")))
        val model = model()

        model.signIn(" Me@Example.com ", "pw")
        assertEquals("me@example.com", backend.signIns.last().first)

        model.signUp(" You@Example.com ", "pw")
        assertEquals("you@example.com", backend.signUps.last().first)

        model.resetPassword(" Them@Example.com ")
        assertEquals("them@example.com", backend.resets.last())
    }

    @Test fun `signing up says what happens next instead of returning silently`() = runBlocking {
        server.enqueue(MockResponse().setBody("""{"user":null}"""))
        val model = model()
        model.start()
        assertEquals(AuthState.SignedOut, model.state.value)

        model.signUp("student@example.com", "pw")

        assertEquals(AuthState.SignedOut, model.state.value)
        assertNotNull(model.message.value)
    }

    @Test fun `a sign-up that worked does not arrive looking like a rejection`() = runBlocking {
        val model = model()

        model.signUp("student@example.com", "pw")

        // Same channel as every failure, so without a tone on it the screen
        // has no way to tell "your account was created, go and confirm it"
        // apart from "your password was rejected", and it painted both red.
        val notice = model.message.value
        assertNotNull(notice)
        assertEquals(AuthNotice.Tone.PROGRESS, notice!!.tone)
    }

    @Test fun `a reset that was sent reads as progress and a failed sign-in as a problem`() = runBlocking {
        val sent = model()
        sent.resetPassword("student@example.com")
        assertEquals(AuthNotice.Tone.PROGRESS, sent.message.value!!.tone)

        backend.accessTokenValue = "session-token"
        server.enqueue(MockResponse().setResponseCode(401))
        val refused = model()
        refused.signIn("student@example.com", "pw")
        assertEquals(AuthNotice.Tone.PROBLEM, refused.message.value!!.tone)
    }

    @Test fun `a password reset says the same thing whether or not the account exists`() = runBlocking {
        val known = model()
        known.resetPassword("known@example.com")

        val unknown = model()
        unknown.resetPassword("unknown@example.com")

        assertNotNull(known.message.value)
        assertEquals(known.message.value, unknown.message.value)
    }

    @Test fun `the token is read fresh on every request rather than cached`() = runBlocking {
        val model = model()

        backend.accessTokenValue = "first-token"
        assertEquals("first-token", model.accessToken())

        backend.accessTokenValue = "second-token"
        assertEquals("second-token", model.accessToken())
    }

    @Test fun `a cancelled sign-in propagates instead of becoming a message`() = runBlocking {
        backend.cancelOnSignIn = true
        val model = model()

        var propagated: CancellationException? = null
        try {
            model.signIn("student@example.com", "pw")
        } catch (e: CancellationException) {
            propagated = e
        }

        assertNotNull("CancellationException should have propagated out of signIn", propagated)
        assertFalse(model.isWorking.value)
        assertNull(model.message.value)
    }

    @Test fun `a restore that cannot reach the server keeps the student signed in`() = runBlocking {
        // The situation this exists for: a stored token, work already
        // cached on the device, and no network on the way to the lecture.
        backend.accessTokenValue = "existing-token"
        cache.stored = aUser("u7")
        server.enqueue(MockResponse().setSocketPolicy(SocketPolicy.DISCONNECT_AT_START))
        val model = model()

        model.start()

        val state = model.state.value
        assertTrue("expected SignedIn, was $state", state is AuthState.SignedIn)
        assertEquals("u7", (state as AuthState.SignedIn).user.id)
        assertNull(model.message.value)
        assertFalse(backend.signOutCalled)
        assertEquals("existing-token", backend.accessTokenValue)
    }

    @Test fun `a remembered identity is not enough on its own without a token`() = runBlocking {
        // No token means no way to talk to the server at all, so a
        // signed-in shell would be a lie the first time it tried.
        backend.accessTokenValue = null
        cache.stored = aUser("u7")
        server.enqueue(MockResponse().setSocketPolicy(SocketPolicy.DISCONNECT_AT_START))
        val model = model()

        model.start()

        assertEquals(AuthState.SignedOut, model.state.value)
    }

    @Test fun `a student who just typed a password is told the network failed`() = runBlocking {
        // The restore path may carry on quietly; this one may not. Someone
        // pressing Sign in is owed the truth about what happened to it.
        backend.accessTokenValue = "session-token"
        cache.stored = aUser("u7")
        server.enqueue(MockResponse().setSocketPolicy(SocketPolicy.DISCONNECT_AT_START))
        val model = model()

        model.signIn("student@example.com", "pw")

        assertEquals(AuthState.SignedOut, model.state.value)
        assertNotNull(model.message.value)
    }

    @Test fun `a session the server rejects is forgotten rather than restored offline`() = runBlocking {
        backend.accessTokenValue = "stale-token"
        cache.stored = aUser("u7")
        server.enqueue(MockResponse().setResponseCode(401))
        val model = model()

        model.start()

        assertEquals(AuthState.SignedOut, model.state.value)
        assertNull("a rejected session must not be restorable", cache.stored)

        // And with nothing remembered, the next dropped connection has
        // nothing to fall back on either.
        server.enqueue(MockResponse().setSocketPolicy(SocketPolicy.DISCONNECT_AT_START))
        model.start()
        assertEquals(AuthState.SignedOut, model.state.value)
    }

    @Test fun `a confirmed session is what gets remembered`() = runBlocking {
        backend.accessTokenValue = "session-token"
        server.enqueue(MockResponse().setBody(sessionBody("u9", "student@example.com")))
        val model = model()

        model.start()

        assertEquals("u9", cache.stored?.id)
    }

    @Test fun `signing out forgets who was signed in`() = runBlocking {
        backend.accessTokenValue = "session-token"
        cache.stored = aUser("u7")
        val model = model()

        model.signOut()

        assertNull(cache.stored)
    }

    @Test fun `an address Connect Cortex has no account for is not remembered`() = runBlocking {
        backend.accessTokenValue = "session-token"
        cache.stored = aUser("u7")
        server.enqueue(MockResponse().setBody("""{"user":null}"""))
        val model = model()

        model.start()

        assertEquals(AuthState.SignedOut, model.state.value)
        assertNull(cache.stored)
    }

    private class FakeSessionUserCache : SessionUserCache {
        var stored: SessionUser? = null
        override fun readUser(): SessionUser? = stored
        override fun writeUser(user: SessionUser?) {
            stored = user
        }
    }

    private class FakeAuthBackend : AuthBackend {
        var accessTokenValue: String? = null
        var signOutCalled = false
        var cancelOnSignIn = false
        val signIns = mutableListOf<Pair<String, String>>()
        val signUps = mutableListOf<Pair<String, String>>()
        val resets = mutableListOf<String>()

        override suspend fun signIn(email: String, password: String) {
            if (cancelOnSignIn) throw CancellationException("scope cancelled")
            signIns.add(email to password)
        }

        override suspend fun signUp(email: String, password: String) {
            signUps.add(email to password)
        }

        override suspend fun sendPasswordReset(email: String) {
            resets.add(email)
        }

        override suspend fun signOut() {
            signOutCalled = true
            accessTokenValue = null
        }

        override suspend fun accessToken(): String? = accessTokenValue
    }
}
