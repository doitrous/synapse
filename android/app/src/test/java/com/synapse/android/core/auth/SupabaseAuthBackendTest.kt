package com.synapse.android.core.auth

import com.synapse.android.core.config.AppConfig
import kotlinx.coroutines.runBlocking
import okhttp3.OkHttpClient
import org.junit.Assert.assertEquals
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

    private class FakeSessionStore : SessionStore {
        private var value: String? = null
        override fun read(): String? = value
        override fun write(token: String?) {
            value = token
        }
    }
}
