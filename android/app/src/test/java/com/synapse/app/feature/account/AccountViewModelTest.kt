package com.synapse.app.feature.account

import androidx.datastore.preferences.core.PreferenceDataStoreFactory
import androidx.datastore.preferences.preferencesDataStoreFile
import androidx.test.core.app.ApplicationProvider
import com.synapse.app.core.api.AccountApi
import com.synapse.app.core.api.AccountDeletionResult
import com.synapse.app.core.api.DiscoverableResponse
import com.synapse.app.core.api.EnrolmentRequest
import com.synapse.app.core.api.EnrolmentResult
import com.synapse.app.core.api.MeProfile
import com.synapse.app.core.api.MeResponse
import com.synapse.app.core.api.MeUser
import com.synapse.app.core.auth.AccountIdentityStore
import com.synapse.app.core.auth.AuthBackend
import com.synapse.app.core.auth.AuthModel
import com.synapse.app.core.auth.Session
import com.synapse.app.core.cache.LocalStore
import com.synapse.app.core.cache.OutboxEntry
import com.synapse.app.core.model.AttemptRecord as ModelAttemptRecord
import com.synapse.app.core.model.Manifest
import com.synapse.app.core.model.SessionDto
import com.synapse.app.core.model.StateDoc
import com.synapse.app.core.sync.SyncEngine
import com.synapse.app.design.ThemeChoice
import com.synapse.app.design.ThemePreference
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.ExperimentalCoroutinesApi
import kotlinx.coroutines.SupervisorJob
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.test.StandardTestDispatcher
import kotlinx.coroutines.test.resetMain
import kotlinx.coroutines.test.runTest
import kotlinx.coroutines.test.setMain
import kotlinx.serialization.json.Json
import kotlinx.serialization.json.JsonNull
import okhttp3.MediaType.Companion.toMediaType
import okhttp3.ResponseBody.Companion.toResponseBody
import org.junit.After
import org.junit.Assert.assertEquals
import org.junit.Assert.assertFalse
import org.junit.Assert.assertNull
import org.junit.Assert.assertTrue
import org.junit.Before
import org.junit.Test
import org.junit.runner.RunWith
import org.robolectric.RobolectricTestRunner
import java.time.Instant

/**
 * [AccountViewModel] built against a real [AccountRepository] + [SyncEngine] +
 * [ThemePreference], all wired to hand-written fakes/Robolectric DataStore
 * files — same convention as `PracticalViewModelTest`.
 */
@OptIn(ExperimentalCoroutinesApi::class)
@RunWith(RobolectricTestRunner::class)
class AccountViewModelTest {

    private val dispatcher = StandardTestDispatcher()
    private val json = Json { ignoreUnknownKeys = true }
    private val now = Instant.parse("2026-09-14T12:00:00Z")

    private lateinit var api: VmFakeAccountApi
    private lateinit var authBackend: VmFakeAuthBackend

    @Before fun setUp() {
        Dispatchers.setMain(dispatcher)
        api = VmFakeAccountApi()
        authBackend = VmFakeAuthBackend()
    }

    @After fun tearDown() = Dispatchers.resetMain()

    /**
     * DataStore normally does its own file I/O on a real `Dispatchers.IO`-backed
     * scope, independent of [dispatcher] — under [StandardTestDispatcher],
     * [advanceUntilIdle] then has nothing of its own to advance and can return
     * before that real work lands, making assertions racy. Pinning the
     * DataStore's scope to [dispatcher] keeps every bit of work on the one
     * virtual clock this test controls.
     */
    private fun freshDataStore(name: String) = PreferenceDataStoreFactory.create(
        scope = CoroutineScope(dispatcher + SupervisorJob()),
        produceFile = {
            ApplicationProvider.getApplicationContext<android.content.Context>()
                .preferencesDataStoreFile("${name}_${System.nanoTime()}")
        }
    )

    private fun viewModel(): AccountViewModel {
        val localStore = VmFakeLocalStore()
        val syncEngine = SyncEngine(VmFakeSynapseApi(), localStore, readableKeys = emptyList(), userStateKeys = emptyList())
        val identityStore = AccountIdentityStore(freshDataStore("account_identity_vm_test"))
        val authModel = AuthModel(authBackend) { true }
        val repository = AccountRepository(api, localStore, syncEngine, identityStore, authModel, json)
        val themePreference = ThemePreference(freshDataStore("theme_vm_test"))
        return AccountViewModel(repository, themePreference).apply {
            now = { this@AccountViewModelTest.now }
            currentTimezone = { "Africa/Cairo" }
        }
    }

    @Test fun initLoadsContentFromTheServer() = runTest {
        api.meResponse = MeResponse(user = MeUser(id = "u1", email = "a@b.com"), profile = MeProfile(universityId = "KAU", year = "Year 3"))
        val viewModel = viewModel()
        dispatcher.scheduler.advanceUntilIdle()

        val state = viewModel.uiState.value
        assertTrue(state is AccountUiState.Content)
        state as AccountUiState.Content
        assertEquals("u1", state.user.id)
        assertEquals("KAU", state.profile?.universityId)
        assertTrue(state.prefs.reviewReminders)
        assertEquals("en", state.language)
    }

    @Test fun initGoesToUnavailableWhenTheServerCallFails() = runTest {
        api.shouldFail = true
        val viewModel = viewModel()
        dispatcher.scheduler.advanceUntilIdle()

        assertEquals(AccountUiState.Unavailable, viewModel.uiState.value)
    }

    @Test fun saveEnrolmentUpdatesTheProfileOnSuccess() = runTest {
        api.meResponse = MeResponse(user = MeUser(id = "u1"), profile = null)
        val viewModel = viewModel()
        dispatcher.scheduler.advanceUntilIdle()

        api.meResponse = MeResponse(user = MeUser(id = "u1"), profile = MeProfile(universityId = "KAU", year = "Year 3"))
        viewModel.saveEnrolment("KAU", "Year 3", null)
        dispatcher.scheduler.advanceUntilIdle()

        val state = viewModel.uiState.value as AccountUiState.Content
        assertEquals("KAU", state.profile?.universityId)
        assertFalse(state.savingEnrolment)
        assertEquals(listOf(EnrolmentRequest("KAU", "Year 3", null)), api.putEnrolmentCalls)
    }

    @Test fun saveEnrolmentSurfacesAnErrorOnFailureWithoutLosingTheState() = runTest {
        val viewModel = viewModel()
        dispatcher.scheduler.advanceUntilIdle()

        api.shouldFail = true
        viewModel.saveEnrolment("KAU", "Year 3", null)
        dispatcher.scheduler.advanceUntilIdle()

        val state = viewModel.uiState.value as AccountUiState.Content
        assertFalse(state.savingEnrolment)
        assertTrue(state.enrolmentError != null)
    }

    @Test fun setReviewRemindersFlipsTheSwitchAndPersists() = runTest {
        val viewModel = viewModel()
        dispatcher.scheduler.advanceUntilIdle()

        viewModel.setReviewReminders(false)
        dispatcher.scheduler.advanceUntilIdle()

        assertFalse((viewModel.uiState.value as AccountUiState.Content).prefs.reviewReminders)
    }

    @Test fun setLanguageUpdatesUiState() = runTest {
        val viewModel = viewModel()
        dispatcher.scheduler.advanceUntilIdle()

        viewModel.setLanguage("ar")
        dispatcher.scheduler.advanceUntilIdle()

        assertEquals("ar", (viewModel.uiState.value as AccountUiState.Content).language)
    }

    @Test fun setThemeDelegatesToThemePreference() = runTest {
        val viewModel = viewModel()
        dispatcher.scheduler.advanceUntilIdle()
        assertEquals(ThemeChoice.Light, viewModel.theme.value)

        viewModel.setTheme(ThemeChoice.Dark)
        dispatcher.scheduler.advanceUntilIdle()

        assertEquals(ThemeChoice.Dark, viewModel.theme.value)
    }

    @Test fun setDiscoverableOptimisticallyUpdatesThenConfirms() = runTest {
        api.discoverableValue = false
        val viewModel = viewModel()
        dispatcher.scheduler.advanceUntilIdle()

        viewModel.setDiscoverable(true)
        dispatcher.scheduler.advanceUntilIdle()

        assertTrue((viewModel.uiState.value as AccountUiState.Content).discoverable)
    }

    @Test fun setDiscoverableRevertsOnFailure() = runTest {
        val viewModel = viewModel()
        dispatcher.scheduler.advanceUntilIdle()

        api.shouldFail = true
        viewModel.setDiscoverable(true)
        dispatcher.scheduler.advanceUntilIdle()

        assertFalse((viewModel.uiState.value as AccountUiState.Content).discoverable)
    }

    @Test fun requestExportReportsReadyOnSuccess() = runTest {
        val viewModel = viewModel()
        dispatcher.scheduler.advanceUntilIdle()

        viewModel.requestExport()
        dispatcher.scheduler.advanceUntilIdle()

        assertTrue((viewModel.uiState.value as AccountUiState.Content).export is ExportUiState.Ready)
    }

    @Test fun requestExportReportsUnavailableOnFailure() = runTest {
        val viewModel = viewModel()
        dispatcher.scheduler.advanceUntilIdle()

        api.shouldFail = true
        viewModel.requestExport()
        dispatcher.scheduler.advanceUntilIdle()

        assertEquals(ExportUiState.Unavailable, (viewModel.uiState.value as AccountUiState.Content).export)
    }

    // --- deletion --------------------------------------------------------------------

    @Test fun confirmDeleteIsANoOpUntilTheWordIsTypedExactly() = runTest {
        val viewModel = viewModel()
        dispatcher.scheduler.advanceUntilIdle()

        viewModel.onDeletionTypedChange("delete my account")
        viewModel.confirmDelete()
        dispatcher.scheduler.advanceUntilIdle()

        assertEquals(0, api.deleteAccountCalls)
    }

    @Test fun confirmDeleteAcceptsTheWordTrimmedAndInAnyCase() = runTest {
        authBackend.nextSession = Session(userId = "u1", accessToken = "tok", emailVerified = true)
        val viewModel = viewModel()
        dispatcher.scheduler.advanceUntilIdle()

        viewModel.onDeletionTypedChange("  delete  ")
        viewModel.confirmDelete()
        dispatcher.scheduler.advanceUntilIdle()

        assertEquals(1, api.deleteAccountCalls)
    }

    @Test fun confirmDeleteSurfacesAFailureAndStaysOnTheScreen() = runTest {
        val viewModel = viewModel()
        dispatcher.scheduler.advanceUntilIdle()
        api.shouldFail = true

        viewModel.onDeletionTypedChange("DELETE")
        viewModel.confirmDelete()
        dispatcher.scheduler.advanceUntilIdle()

        val state = viewModel.uiState.value as AccountUiState.Content
        assertFalse(state.deletion.isDeleting)
        assertTrue(state.deletion.failure != null)
    }

    @Test fun signOutDelegatesThroughToAuthModel() = runTest {
        authBackend.nextSession = Session(userId = "u1", accessToken = "tok", emailVerified = true)
        val viewModel = viewModel()
        dispatcher.scheduler.advanceUntilIdle()

        viewModel.signOut()
        dispatcher.scheduler.advanceUntilIdle()

        assertNull(authBackend.session.value)
    }
}

// --- Fakes --------------------------------------------------------------------

private class VmFakeAccountApi : AccountApi {
    var meResponse: MeResponse = MeResponse(user = MeUser(id = "u1"))
    var discoverableValue: Boolean = false
    var shouldFail: Boolean = false
    var deleteAccountCalls: Int = 0
    val putEnrolmentCalls = mutableListOf<EnrolmentRequest>()

    override suspend fun getMe(): MeResponse {
        if (shouldFail) throw RuntimeException("boom")
        return meResponse
    }

    override suspend fun putEnrolment(body: EnrolmentRequest): EnrolmentResult {
        if (shouldFail) throw RuntimeException("boom")
        putEnrolmentCalls += body
        return EnrolmentResult(ok = true)
    }

    override suspend fun getDiscoverable(): DiscoverableResponse {
        if (shouldFail) throw RuntimeException("boom")
        return DiscoverableResponse(discoverable = discoverableValue)
    }

    override suspend fun setDiscoverable(discoverable: Boolean): DiscoverableResponse {
        if (shouldFail) throw RuntimeException("boom")
        discoverableValue = discoverable
        return DiscoverableResponse(discoverable = discoverable, ok = true)
    }

    override suspend fun deleteAccount(): AccountDeletionResult {
        deleteAccountCalls++
        if (shouldFail) throw RuntimeException("boom")
        return AccountDeletionResult(ok = true)
    }

    override suspend fun exportRaw(): okhttp3.ResponseBody {
        if (shouldFail) throw RuntimeException("boom")
        return "{}".toResponseBody("application/json".toMediaType())
    }
}

private class VmFakeAuthBackend : AuthBackend {
    private val _session = MutableStateFlow<Session?>(null)
    override val session: StateFlow<Session?> = _session.asStateFlow()
    var nextSession: Session? = null

    override suspend fun restore() {}
    override suspend fun signIn(email: String, password: String) { _session.value = nextSession }
    override suspend fun signUp(email: String, password: String) { _session.value = nextSession }
    override suspend fun signOut() { _session.value = null }
    override suspend fun sendReset(email: String) {}
    override suspend fun accessToken(): String? = _session.value?.accessToken
}

private class VmFakeLocalStore : LocalStore {
    val catalogue = linkedMapOf<String, Pair<String, String>>()
    val outbox = linkedMapOf<String, String>()
    val attemptsById = linkedMapOf<String, ModelAttemptRecord>()
    val userState = linkedMapOf<String, Triple<String, String?, String?>>()

    override suspend fun putCatalogue(key: String, updatedAt: String, json: String) { catalogue[key] = updatedAt to json }
    override suspend fun catalogueUpdatedAt(key: String): String? = catalogue[key]?.first
    override suspend fun getCatalogue(key: String): String? = catalogue[key]?.second
    override suspend fun enqueue(key: String, json: String) { outbox[key] = json }
    override suspend fun pendingOutbox(): List<OutboxEntry> = outbox.map { OutboxEntry(it.key, it.value) }
    override suspend fun clearOutbox(key: String) { outbox.remove(key) }
    override suspend fun putAttempts(items: List<ModelAttemptRecord>) { items.forEach { attemptsById[it.id] = it } }
    override suspend fun attempts(month: String): List<ModelAttemptRecord> = attemptsById.values.filter { it.month == month }
    override suspend fun putUserState(key: String, json: String, savedAt: String?, serverUpdatedAt: String?) {
        userState[key] = Triple(json, savedAt, serverUpdatedAt)
    }
    override suspend fun getUserState(key: String): String? = userState[key]?.first
    override suspend fun userStateSavedAt(key: String): String? = userState[key]?.second
    override suspend fun clearAll() { catalogue.clear(); outbox.clear(); attemptsById.clear(); userState.clear() }
}

private class VmFakeSynapseApi : com.synapse.app.core.api.SynapseApi {
    override suspend fun session(): SessionDto = SessionDto("u")
    override suspend fun manifest(): Manifest = emptyMap()
    override suspend fun getState(key: String): StateDoc = StateDoc(JsonNull)
    override suspend fun getUserState(key: String): StateDoc = StateDoc(JsonNull)
    override suspend fun putUserState(key: String, doc: StateDoc) {}
    override suspend fun getAttempts(month: String): List<ModelAttemptRecord> = emptyList()
    override suspend fun postAttempt(attempt: ModelAttemptRecord) {}
}
