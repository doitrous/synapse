package com.nishany.android.core.auth

import com.nishany.android.core.config.AppConfig
import kotlinx.coroutines.CancellationException
import kotlinx.coroutines.runBlocking
import okhttp3.OkHttpClient
import org.junit.Assert.assertEquals
import org.junit.Assert.assertNotNull
import org.junit.Assert.assertNull
import org.junit.Test

/**
 * Covers [SupabaseAuthBackend.accessToken]'s failure path, which needs
 * neither the Android Keystore nor a real Supabase project -- only
 * [EncryptedSessionStore] does. [tokenReader] is the injected seam that
 * makes that true: the client is still built (constructing it is local,
 * synchronous setup with no network call), but the actual token read is
 * swapped for a plain lambda.
 */
class SupabaseAuthBackendTest {

    private val config = AppConfig(
        rawSupabaseHost = "project.supabase.co",
        supabaseAnonKey = "anon-key",
        rawApiBaseUrl = "https://api.example.com",
    )

    private fun backend(tokenReader: () -> String?) =
        SupabaseAuthBackend(config, FakeSessionStore(), OkHttpClient(), tokenReader)

    @Test fun `a successful token read returns the token`() = runBlocking {
        val backend = backend(tokenReader = { "session-token" })

        assertEquals("session-token", backend.accessToken())
    }

    @Test fun `a failing token read records lastTokenError and returns null rather than throwing`() = runBlocking {
        val backend = backend(tokenReader = { throw IllegalStateException("keystore unavailable") })

        val token = backend.accessToken()

        assertNull(token)
        assertEquals("keystore unavailable", SupabaseAuthBackend.lastTokenError)
    }

    @Test fun `a cancelled token read propagates instead of returning null`() = runBlocking {
        val errorBefore = SupabaseAuthBackend.lastTokenError
        val backend = backend(tokenReader = { throw CancellationException("scope cancelled") })

        var propagated: CancellationException? = null
        try {
            backend.accessToken()
        } catch (e: CancellationException) {
            propagated = e
        }

        assertNotNull("CancellationException should have propagated out of accessToken", propagated)
        // Not a token failure -- must not leave a misleading breadcrumb.
        assertEquals(errorBefore, SupabaseAuthBackend.lastTokenError)
    }

    private class FakeSessionStore : SessionStore {
        private var value: String? = null
        override fun read(): String? = value
        override fun write(token: String?) {
            value = token
        }
    }
}
