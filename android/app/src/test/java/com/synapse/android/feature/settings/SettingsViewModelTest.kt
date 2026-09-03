package com.synapse.android.feature.settings

import android.content.Context
import androidx.test.core.app.ApplicationProvider
import com.synapse.android.core.api.SynapseApi
import com.synapse.android.core.auth.AuthBackend
import com.synapse.android.core.auth.AuthModel
import com.synapse.android.core.config.AppConfig
import com.synapse.android.design.AppLanguage
import com.synapse.android.design.CortexThemeChoice
import com.synapse.android.design.LanguagePreference
import com.synapse.android.design.ThemePreference
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.flow.first
import kotlinx.coroutines.runBlocking
import kotlinx.coroutines.test.UnconfinedTestDispatcher
import kotlinx.coroutines.test.resetMain
import kotlinx.coroutines.test.setMain
import kotlinx.coroutines.withTimeout
import okhttp3.OkHttpClient
import okhttp3.mockwebserver.MockResponse
import okhttp3.mockwebserver.MockWebServer
import org.junit.After
import org.junit.Assert.assertEquals
import org.junit.Assert.assertNull
import org.junit.Assert.assertTrue
import org.junit.Before
import org.junit.Test
import org.junit.runner.RunWith
import org.robolectric.RobolectricTestRunner

/** Mirrors the old `AccountViewModelTest`'s server-and-backend setup; see its own doc for why a real [MockWebServer] rather than a fake [SynapseApi]. */
@RunWith(RobolectricTestRunner::class)
class SettingsViewModelTest {

    private lateinit var server: MockWebServer
    private lateinit var api: SynapseApi
    private lateinit var backend: FakeAuthBackend
    private lateinit var auth: AuthModel
    private lateinit var themePreference: ThemePreference
    private lateinit var languagePreference: LanguagePreference

    @Before
    fun setUp() {
        // load()/saveProfile()/etc. dispatch on viewModelScope (Dispatchers.Main).
        // Under a JVM/Robolectric unit test, runBlocking holds the main thread, so
        // those coroutines never run and the state collectors time out. An
        // Unconfined test dispatcher runs them eagerly on the caller instead.
        Dispatchers.setMain(UnconfinedTestDispatcher())
        server = MockWebServer().also { it.start() }
        val context = ApplicationProvider.getApplicationContext<Context>()
        themePreference = ThemePreference(context)
        languagePreference = LanguagePreference(context)
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
    }

    @After
    fun tearDown() {
        server.shutdown()
        Dispatchers.resetMain()
    }

    private fun viewModel() = SettingsViewModel(auth, api, themePreference, languagePreference)

    private fun meBody(profile: String?) =
        """{"user":{"id":"u1","email":"student@example.com","role":"student","aal":"aal1","mfaRequired":false},"profile":$profile,"subscription":null,"entitlement":{"state":"none","plan":"Free","expiresAt":null,"daysLeft":null}}"""

    @Test
    fun `load renders Content when the roster row exists`() = runBlocking {
        server.enqueue(MockResponse().setBody(
            meBody("""{"studentId":"u1","name":"Jordan","email":"student@example.com","universityId":"uni-1","year":"Y3","group":null,"status":"active","username":"jordan","profileIcon":"heart","statusMessage":null,"aiConsentAt":null}"""),
        ))
        val model = viewModel()

        model.load()

        val state = withTimeout(5_000) { model.state.first { it !is SettingsUiState.Loading } }
        val content = state as SettingsUiState.Content
        assertEquals("student@example.com", content.email)
        assertEquals("jordan", content.profile.username)
    }

    @Test
    fun `load renders Empty when there is no roster row, not an error`() = runBlocking {
        server.enqueue(MockResponse().setBody(meBody("null")))
        val model = viewModel()

        model.load()

        val state = withTimeout(5_000) { model.state.first { it !is SettingsUiState.Loading } }
        assertEquals(SettingsUiState.Empty, state)
    }

    @Test
    fun `load renders ConnectionDropped on a transient failure`() = runBlocking {
        server.enqueue(MockResponse().setResponseCode(500))
        val model = viewModel()

        model.load()

        val state = withTimeout(5_000) { model.state.first { it !is SettingsUiState.Loading } }
        assertTrue(state is SettingsUiState.ConnectionDropped)
    }

    @Test
    fun `sign out clears the signed-in state`() = runBlocking {
        backend.accessTokenValue = "session-token"
        server.enqueue(MockResponse().setBody(
            """{"user":{"id":"u1","email":"student@example.com","role":"student","aal":"aal1","mfaRequired":false}}""",
        ))
        auth.signIn("student@example.com", "pw")

        viewModel().signOut()

        assertNull(backend.accessTokenValue)
    }

    @Test
    fun `deleteAccount calls DELETE then signs out`() = runBlocking {
        backend.accessTokenValue = "session-token"
        server.enqueue(MockResponse().setBody(
            """{"user":{"id":"u1","email":"student@example.com","role":"student","aal":"aal1","mfaRequired":false}}""",
        ))
        auth.signIn("student@example.com", "pw")
        server.takeRequest() // the sign-in confirm's GET /api/session
        server.enqueue(MockResponse().setBody("{}")) // DELETE /api/account

        viewModel().deleteAccount()

        val deleteRequest = server.takeRequest()
        assertEquals("DELETE", deleteRequest.method)
        assertEquals("/api/account", deleteRequest.path)
        assertNull(backend.accessTokenValue)
    }

    @Test
    fun `setTheme and setLanguage delegate straight to their preferences`() {
        val model = viewModel()

        model.setTheme(CortexThemeChoice.DARK)
        model.setLanguage(AppLanguage.ARABIC)

        assertEquals(CortexThemeChoice.DARK, themePreference.choice.value)
        assertEquals(AppLanguage.ARABIC, languagePreference.language.value)
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
