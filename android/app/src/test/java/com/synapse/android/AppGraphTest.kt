package com.synapse.android

import android.content.Context
import androidx.test.core.app.ApplicationProvider
import com.synapse.android.core.config.AppConfig
import org.junit.After
import org.junit.Assert.assertFalse
import org.junit.Assert.assertSame
import org.junit.Assert.assertTrue
import org.junit.Test
import org.junit.runner.RunWith
import org.robolectric.RobolectricTestRunner

/**
 * [AppGraph] is where every collaborator from earlier tasks gets a single,
 * process-lifetime instance. These tests exercise the two properties that
 * matter and that no compiler would catch a regression in: that an
 * unconfigured build never touches the network half while constructing the
 * graph, and that [AppGraph.database] really is the one instance every
 * screen shares.
 */
@RunWith(RobolectricTestRunner::class)
class AppGraphTest {

    private var graph: AppGraph? = null

    @After
    fun tearDown() {
        graph?.database?.close()
    }

    private fun context(): Context = ApplicationProvider.getApplicationContext()

    private fun unconfigured() = AppConfig(rawSupabaseHost = "", supabaseAnonKey = "", rawApiBaseUrl = "")

    @Test
    fun `an unconfigured build reaches the explanation screen instead of crashing`() {
        // Must not throw. authBackend/api/auth reach into the Android
        // Keystore (via EncryptedSessionStore) and a Supabase client built
        // against a blank host -- neither of which this call is allowed to
        // touch, since RootScreen decides to show NotConfiguredScreen from
        // config alone, before any of those fields are ever read.
        val built = AppGraph(context(), unconfigured())
        graph = built

        assertFalse(built.config.isConfigured)
        assertTrue(built.config.missing.containsAll(listOf("SUPABASE_HOST", "SUPABASE_ANON_KEY", "API_BASE_URL")))
    }

    @Test
    fun `the graph hands out the same database every time`() {
        val built = AppGraph(context(), unconfigured())
        graph = built

        assertSame(built.database, built.database)
        assertSame(built.store, built.store)
    }
}
