package com.synapse.android.feature.account

import android.content.Context
import androidx.room.Room
import androidx.test.core.app.ApplicationProvider
import com.synapse.android.core.api.SynapseApi
import com.synapse.android.core.auth.AuthBackend
import com.synapse.android.core.auth.AuthModel
import com.synapse.android.core.cache.CortexDatabase
import com.synapse.android.core.cache.LocalStore
import com.synapse.android.core.config.AppConfig
import com.synapse.android.core.sync.SyncEngine
import java.time.Instant
import kotlinx.coroutines.flow.first
import kotlinx.coroutines.runBlocking
import kotlinx.coroutines.withTimeout
import okhttp3.OkHttpClient
import okhttp3.mockwebserver.MockResponse
import okhttp3.mockwebserver.MockWebServer
import org.junit.After
import org.junit.Assert.assertEquals
import org.junit.Assert.assertNull
import org.junit.Before
import org.junit.Test
import org.junit.runner.RunWith
import org.robolectric.RobolectricTestRunner

/**
 * [AccountViewModel.ui] is a cold [kotlinx.coroutines.flow.Flow] rather than
 * a `viewModelScope`-backed [kotlinx.coroutines.flow.StateFlow] specifically
 * so it is testable this directly -- every test here just collects it, with
 * no `Dispatchers.Main` to install and no ViewModel lifecycle to fake.
 */
@RunWith(RobolectricTestRunner::class)
class AccountViewModelTest {

    private lateinit var server: MockWebServer
    private lateinit var database: CortexDatabase
    private lateinit var store: LocalStore
    private lateinit var api: SynapseApi
    private lateinit var backend: FakeAuthBackend
    private lateinit var auth: AuthModel
    private lateinit var sync: SyncEngine

    @Before
    fun setUp() {
        server = MockWebServer().also { it.start() }
        val context = ApplicationProvider.getApplicationContext<Context>()
        database = Room.inMemoryDatabaseBuilder(context, CortexDatabase::class.java).build()
        store = LocalStore(database)
        backend = FakeAuthBackend()
        api = SynapseApi(
            baseUrl = server.url("/").toString().trimEnd('/'),
            client = OkHttpClient(),
            tokenProvider = { backend.accessToken() },
        )
        val config = AppConfig(
            rawSupabaseHost = "project.supabase.co",
            supabaseAnonKey = "anon-key",
            rawApiBaseUrl = server.url("/").toString(),
        )
        auth = AuthModel(config, api, backend)
        sync = SyncEngine(api, store)
    }

    @After
    fun tearDown() {
        database.close()
        server.shutdown()
    }

    private fun viewModel() = AccountViewModel(auth, sync, store)

    private fun sessionBody(id: String, email: String) =
        """{"user":{"id":"$id","email":"$email","role":"student","aal":"aal1","mfaRequired":false}}"""

    @Test
    fun `Account reports how many writes are still waiting`() = runBlocking {
        // Not a debug affordance. It is the honest answer to "is my work
        // saved?", and a student on a ward deserves to see it.
        store.enqueue("synapse.qbank.marked.v1", "{}", Instant.now())
        store.enqueue("synapse.qbank.marked.v1", "{}", Instant.now())

        val ui = withTimeout(5_000) { viewModel().ui.first { it.pendingWrites == 2 } }

        assertEquals(2, ui.pendingWrites)
    }

    @Test
    fun `a never-synced account shows no timestamp rather than the epoch`() = runBlocking {
        // A refresh was attempted and failed -- if lastSyncedAt were ever
        // derived from "the last time we tried" instead of "the last time
        // we actually succeeded", this is exactly the case that would leak
        // a 1 January 1970 timestamp onto the screen.
        server.enqueue(MockResponse().setResponseCode(500))
        sync.refresh()

        val ui = withTimeout(5_000) { viewModel().ui.first() }

        assertNull(ui.lastSyncedAt)
    }

    @Test
    fun `sign out clears the signed-in state`() = runBlocking {
        backend.accessTokenValue = "session-token"
        server.enqueue(MockResponse().setBody(sessionBody("u1", "student@example.com")))
        auth.signIn("student@example.com", "pw")

        val model = viewModel()
        val signedIn = withTimeout(5_000) { model.ui.first { it.email != null } }
        assertEquals("student@example.com", signedIn.email)

        model.signOut()

        val signedOut = withTimeout(5_000) { model.ui.first { it.email == null } }
        assertNull(signedOut.email)
    }

    private class FakeAuthBackend : AuthBackend {
        var accessTokenValue: String? = null

        override suspend fun signIn(email: String, password: String) {}
        override suspend fun signUp(email: String, password: String) {}
        override suspend fun sendPasswordReset(email: String) {}
        override suspend fun signOut() {
            accessTokenValue = null
        }

        override suspend fun accessToken(): String? = accessTokenValue
    }
}
