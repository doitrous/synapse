package com.synapse.app.core.auth

import kotlinx.coroutines.test.runTest
import okhttp3.mockwebserver.MockResponse
import okhttp3.mockwebserver.MockWebServer
import okhttp3.mockwebserver.SocketPolicy
import org.junit.After
import org.junit.Assert.assertEquals
import org.junit.Assert.assertNull
import org.junit.Assert.assertTrue
import org.junit.Before
import org.junit.Test

private const val ANON_KEY = "test-anon-key"

class SupabaseAuthBackendTest {
    private lateinit var server: MockWebServer
    private lateinit var tokenStore: FakeTokenStore
    private lateinit var backend: SupabaseAuthBackend

    @Before fun setup() {
        server = MockWebServer()
        server.start()
        tokenStore = FakeTokenStore()
        backend = SupabaseAuthBackend(
            baseUrl = server.url("/auth/v1/").toString(),
            anonKey = ANON_KEY,
            tokenStore = tokenStore,
        )
    }

    @After fun teardown() = server.shutdown()

    @Test fun signInParsesSessionAndEmailVerified() = runTest {
        server.enqueue(
            MockResponse().setResponseCode(200).setBody(
                """
                {
                  "access_token": "at-123",
                  "refresh_token": "rt-456",
                  "user": {
                    "id": "user-1",
                    "email": "a@b.com",
                    "email_confirmed_at": "2026-08-20T10:00:00Z"
                  }
                }
                """.trimIndent()
            )
        )

        backend.signIn("a@b.com", "pw")

        val session = backend.session.value
        assertEquals("user-1", session?.userId)
        assertEquals("at-123", session?.accessToken)
        assertTrue(session?.emailVerified == true)
        assertEquals(Tokens("at-123", "rt-456"), tokenStore.saved)
    }

    @Test fun signIn400ThrowsAuthException() = runTest {
        server.enqueue(
            MockResponse().setResponseCode(400).setBody(
                """{"error":"invalid_grant","error_description":"Invalid login credentials"}"""
            )
        )

        val error = runCatching { backend.signIn("a@b.com", "wrong") }.exceptionOrNull()

        assertTrue(error is AuthException)
        assertEquals("Invalid login credentials", error?.message)
        assertNull(backend.session.value)
    }

    @Test fun restoreRefreshesFromStoredRefreshToken() = runTest {
        tokenStore.saved = Tokens(accessToken = "old-access", refreshToken = "old-refresh")
        server.enqueue(
            MockResponse().setResponseCode(200).setBody(
                """
                {
                  "access_token": "new-access",
                  "refresh_token": "new-refresh",
                  "user": {
                    "id": "user-1",
                    "email_confirmed_at": "2026-08-20T10:00:00Z"
                  }
                }
                """.trimIndent()
            )
        )

        backend.restore()

        val session = backend.session.value
        assertEquals("new-access", session?.accessToken)
        assertEquals(Tokens("new-access", "new-refresh"), tokenStore.saved)

        val request = server.takeRequest()
        assertTrue(request.path!!.contains("grant_type=refresh_token"))
        assertTrue(request.body.readUtf8().contains("old-refresh"))
    }

    @Test fun restoreWithNoStoredTokensEmitsNullSession() = runTest {
        backend.restore()

        assertNull(backend.session.value)
        assertEquals(0, server.requestCount)
    }

    /**
     * Regression test for a cold-start crash: Retrofit suspend calls throw
     * [java.io.IOException] directly (not [AuthException]) when the device has no
     * network. A silent, app-launch [SupabaseAuthBackend.restore] must degrade to
     * signed-out rather than let that exception escape and crash the app.
     */
    @Test fun restoreWhenOfflineEmitsNullSessionWithoutThrowing() = runTest {
        tokenStore.saved = Tokens(accessToken = "old-access", refreshToken = "old-refresh")
        server.enqueue(MockResponse().setSocketPolicy(SocketPolicy.DISCONNECT_AT_START))

        backend.restore()

        assertNull(backend.session.value)
    }

    @Test fun signOutClearsTokensAndSession() = runTest {
        server.enqueue(
            MockResponse().setResponseCode(200).setBody(
                """
                {
                  "access_token": "at-123",
                  "refresh_token": "rt-456",
                  "user": { "id": "user-1", "email_confirmed_at": "2026-08-20T10:00:00Z" }
                }
                """.trimIndent()
            )
        )
        backend.signIn("a@b.com", "pw")
        assertTrue(backend.session.value != null)

        backend.signOut()

        assertNull(backend.session.value)
        assertNull(tokenStore.saved)
        assertTrue(tokenStore.cleared)
    }

    @Test fun apikeyHeaderPresentOnSignIn() = runTest {
        server.enqueue(
            MockResponse().setResponseCode(200).setBody(
                """{"access_token":"at","refresh_token":"rt","user":{"id":"u","email_confirmed_at":"t"}}"""
            )
        )

        backend.signIn("a@b.com", "pw")

        assertEquals(ANON_KEY, server.takeRequest().getHeader("apikey"))
    }

    @Test fun signUpHappyPathEmitsSession() = runTest {
        server.enqueue(
            MockResponse().setResponseCode(200).setBody(
                """
                {
                  "access_token": "at-789",
                  "refresh_token": "rt-789",
                  "user": {
                    "id": "user-2",
                    "email": "new@b.com",
                    "email_confirmed_at": "2026-08-20T10:00:00Z"
                  }
                }
                """.trimIndent()
            )
        )

        backend.signUp("new@b.com", "pw")

        val session = backend.session.value
        assertEquals("user-2", session?.userId)
        assertEquals("at-789", session?.accessToken)
        assertTrue(session?.emailVerified == true)
        assertEquals(Tokens("at-789", "rt-789"), tokenStore.saved)
    }

    /**
     * GoTrue's `signup` endpoint nests the user under `user` only when a session
     * is also issued; with email confirmation required it instead returns the
     * user's fields flattened at the top level and omits `access_token`. That
     * must not be mistaken for a signed-in session.
     */
    @Test fun signUpPendingConfirmationDoesNotEmitSession() = runTest {
        server.enqueue(
            MockResponse().setResponseCode(200).setBody(
                """
                {
                  "id": "user-3",
                  "email": "pending@b.com"
                }
                """.trimIndent()
            )
        )

        backend.signUp("pending@b.com", "pw")

        assertNull(backend.session.value)
        assertNull(tokenStore.saved)
    }

    @Test fun sendResetPostsToRecoverEndpointAndSucceeds() = runTest {
        server.enqueue(MockResponse().setResponseCode(200).setBody(""))

        backend.sendReset("a@b.com")

        val request = server.takeRequest()
        assertTrue(request.path!!.contains("recover"))
        assertEquals(ANON_KEY, request.getHeader("apikey"))
        assertTrue(request.body.readUtf8().contains("a@b.com"))
    }

    @Test fun sendResetThrowsOnNonSuccess() = runTest {
        server.enqueue(
            MockResponse().setResponseCode(400).setBody(
                """{"error":"bad_request","error_description":"Invalid email"}"""
            )
        )

        val error = runCatching { backend.sendReset("bad@b.com") }.exceptionOrNull()

        assertTrue(error is AuthException)
        assertEquals("Invalid email", error?.message)
    }
}

/** In-memory [TokenStore] double for tests. Not a real persistence layer. */
private class FakeTokenStore : TokenStore {
    var saved: Tokens? = null
    var cleared: Boolean = false

    override suspend fun save(tokens: Tokens) {
        saved = tokens
        cleared = false
    }

    override suspend fun load(): Tokens? = saved

    override suspend fun clear() {
        saved = null
        cleared = true
    }
}
