package com.synapse.android

import android.content.Context
import androidx.test.core.app.ApplicationProvider
import com.synapse.android.core.config.AppConfig
import java.time.Instant
import kotlinx.coroutines.flow.first
import kotlinx.coroutines.runBlocking
import kotlinx.coroutines.withTimeout
import org.junit.After
import org.junit.Assert.assertEquals
import org.junit.Assert.assertFalse
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
    fun `a write made through store is visible through the database directly`() = runBlocking {
        // The invariant that matters is not "reading the database val twice
        // returns the same reference" -- that is true by Kotlin semantics no
        // matter what AppGraph.database does. What actually matters is that
        // AppGraph.store (what every screen writes through) and
        // AppGraph.database (what a test or a future caller might read
        // through directly) are backed by the *same Room instance* -- i.e.
        // the same connection pool and the same InvalidationTracker. Two
        // separate Room.databaseBuilder(...).build() calls over the same
        // file would each pass a trivial assertSame-on-a-val check while
        // still being two independent writers: a Flow queried from one would
        // never notice a write made through the other, and it would fail
        // silently -- no exception, just a Flow that stops updating. Writing
        // through [AppGraph.store] and observing the change through a Flow
        // queried straight off [AppGraph.database]'s own DAO is what would
        // actually have caught that regression.
        val built = AppGraph(context(), unconfigured())
        graph = built

        built.store.enqueue(key = "nishany.qbank.marked.v1", json = "{}", savedAt = Instant.now())

        val countSeenThroughDatabase = withTimeout(5_000) {
            built.database.outboxDao().count().first { it == 1 }
        }

        assertEquals(1, countSeenThroughDatabase)
    }
}
