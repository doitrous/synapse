package com.synapse.app.feature.account

import androidx.datastore.preferences.core.PreferenceDataStoreFactory
import androidx.datastore.preferences.preferencesDataStoreFile
import androidx.test.core.app.ApplicationProvider
import com.synapse.app.core.api.AccountApi
import com.synapse.app.core.api.AccountDeletionResult
import com.synapse.app.core.api.DiscoverableResponse
import com.synapse.app.core.api.EnrolmentRequest
import com.synapse.app.core.api.EnrolmentResult
import com.synapse.app.core.api.MeEntitlement
import com.synapse.app.core.api.MeProfile
import com.synapse.app.core.api.MeResponse
import com.synapse.app.core.api.MeUser
import com.synapse.app.core.auth.AccountIdentity
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
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.test.runTest
import kotlinx.serialization.json.Json
import kotlinx.serialization.json.JsonNull
import okhttp3.MediaType.Companion.toMediaType
import okhttp3.ResponseBody.Companion.toResponseBody
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
 * [AccountRepository] against fakes for [AccountApi]/[LocalStore]/[AuthBackend],
 * a real [SyncEngine] (wired to a fake [com.synapse.app.core.api.SynapseApi],
 * same convention as `CalendarRepositoryTest`/`PracticalRepositoryTest`), and a
 * real [AccountIdentityStore] against a Robolectric-backed DataStore file.
 */
@RunWith(RobolectricTestRunner::class)
class AccountRepositoryTest {

    private val json = Json { ignoreUnknownKeys = true }
    private val now = Instant.parse("2026-09-14T12:00:00Z")

    private lateinit var api: FakeAccountApi
    private lateinit var localStore: FakeLocalStore
    private lateinit var identityStore: AccountIdentityStore
    private lateinit var authBackend: FakeAuthBackend
    private lateinit var authModel: AuthModel
    private lateinit var repository: AccountRepository

    @Before
    fun setup() {
        api = FakeAccountApi()
        localStore = FakeLocalStore()
        val dataStore = PreferenceDataStoreFactory.create(
            produceFile = {
                ApplicationProvider.getApplicationContext<android.content.Context>()
                    .preferencesDataStoreFile("account_repo_test_${System.nanoTime()}")
            }
        )
        identityStore = AccountIdentityStore(dataStore)
        authBackend = FakeAuthBackend()
        authModel = AuthModel(authBackend) { true }
        val syncEngine = SyncEngine(FakeSynapseApi(), localStore, readableKeys = emptyList(), userStateKeys = emptyList())
        repository = AccountRepository(api, localStore, syncEngine, identityStore, authModel, json)
    }

    // --- loadMe / identity caching -------------------------------------------

    @Test fun loadMeReturnsTheServerResponseUnchanged() = runTest {
        api.meResponse = meWith(universityId = "KAU", year = "Year 3", yearId = "KAU_Y3")

        val me = repository.loadMe()

        assertEquals("u1", me.user.id)
        assertEquals("KAU", me.profile?.universityId)
    }

    @Test fun loadMeCachesAKnownRosterIntoTheIdentityStore() = runTest {
        api.meResponse = meWith(universityId = "KAU", year = "Year 3", yearId = "KAU_Y3", group = "Group 4")

        repository.loadMe()

        val identity = identityStore.current()
        assertEquals(AccountIdentity("KAU", "Year 3", "KAU_Y3", "Group 4"), identity)
        assertTrue(identity.isKnown)
    }

    @Test fun loadMeLeavesTheIdentityStoreUntouchedWhenTheRosterHasNoUniversityOrYear() = runTest {
        api.meResponse = MeResponse(user = MeUser(id = "u1"), profile = MeProfile(universityId = null, year = null))

        repository.loadMe()

        assertFalse(identityStore.current().isKnown)
    }

    // --- saveEnrolment ---------------------------------------------------------

    @Test fun saveEnrolmentPutsThenRefetchesMeAndUpdatesTheIdentityStore() = runTest {
        api.meResponse = meWith(universityId = "KAU", year = "Year 3", yearId = "KAU_Y3", group = "Group 5")

        repository.saveEnrolment("KAU", "Year 3", "Group 5")

        assertEquals(1, api.putEnrolmentCalls.size)
        assertEquals(EnrolmentRequest("KAU", "Year 3", "Group 5"), api.putEnrolmentCalls.single())
        assertEquals("Group 5", identityStore.current().group)
    }

    // --- prefs -------------------------------------------------------------------

    @Test fun prefsDefaultsWhenNothingIsStored() = runTest {
        val prefs = repository.prefs("Africa/Cairo")
        assertEquals("Africa/Cairo", prefs.timezone)
        assertTrue(prefs.reviewReminders)
        assertTrue(prefs.calendarReminders)
    }

    @Test fun setReviewRemindersPersistsAndPrefsReflectsIt() = runTest {
        repository.setReviewReminders(false, "Africa/Cairo", now)
        assertFalse(repository.prefs("Africa/Cairo").reviewReminders)
    }

    @Test fun setCalendarRemindersLeavesReviewRemindersAlone() = runTest {
        repository.setReviewReminders(false, "Africa/Cairo", now)
        repository.setCalendarReminders(false, "Africa/Cairo", now)

        val prefs = repository.prefs("Africa/Cairo")
        assertFalse(prefs.reviewReminders)
        assertFalse(prefs.calendarReminders)
    }

    @Test fun syncTimezoneIsANoOpWhenNothingHasChanged() = runTest {
        // The default AccountPrefs built for "Africa/Cairo" already has that timezone,
        // so there is nothing to persist yet.
        repository.syncTimezone("Africa/Cairo", now)
        assertNull(localStore.userState[com.synapse.app.core.account.AccountPrefs.KEY])
    }

    @Test fun syncTimezoneWritesWhenTheDeviceZoneDiffersFromWhatIsStored() = runTest {
        repository.setReviewReminders(false, "Africa/Cairo", now) // establishes a stored doc with timezone = Africa/Cairo

        repository.syncTimezone("Europe/London", now)

        assertEquals("Europe/London", repository.prefs("Europe/London").timezone)
        // The switch set above survives the timezone-only write.
        assertFalse(repository.prefs("Europe/London").reviewReminders)
    }

    // --- language ------------------------------------------------------------------

    @Test fun languageDefaultsToEnglish() = runTest {
        assertEquals("en", repository.language())
    }

    @Test fun setLanguageRoundTrips() = runTest {
        repository.setLanguage("ar", now)
        assertEquals("ar", repository.language())
    }

    // --- discoverable ----------------------------------------------------------------

    @Test fun discoverableReturnsFalseWhenTheCallFails() = runTest {
        api.shouldFail = true
        assertFalse(repository.discoverable())
    }

    @Test fun discoverableReflectsTheServerValue() = runTest {
        api.discoverableValue = true
        assertTrue(repository.discoverable())
    }

    @Test fun setDiscoverableReturnsNullOnFailure() = runTest {
        api.shouldFail = true
        assertNull(repository.setDiscoverable(true))
    }

    @Test fun setDiscoverableReturnsTheStoredValueOnSuccess() = runTest {
        api.discoverableValue = true
        assertEquals(true, repository.setDiscoverable(true))
    }

    // --- export ----------------------------------------------------------------------

    @Test fun requestExportReturnsReadyWithTheBodySize() = runTest {
        api.exportBody = "{\"documents\":{}}"
        val outcome = repository.requestExport()
        assertTrue(outcome is ExportOutcome.Ready)
    }

    @Test fun requestExportReturnsUnavailableOnFailure() = runTest {
        api.shouldFail = true
        assertEquals(ExportOutcome.Unavailable, repository.requestExport())
    }

    // --- session / deletion --------------------------------------------------------

    @Test fun signOutDelegatesToAuthModel() = runTest {
        authBackend.nextSession = Session(userId = "u1", accessToken = "tok", emailVerified = true)
        authModel.signIn("a@b.com", "pw")

        repository.signOut()

        assertNull(authModel.accessToken())
    }

    @Test fun deleteAccountSignsOutOnSuccess() = runTest {
        authBackend.nextSession = Session(userId = "u1", accessToken = "tok", emailVerified = true)
        authModel.signIn("a@b.com", "pw")

        val outcome = repository.deleteAccount()

        assertEquals(DeletionOutcome.Deleted, outcome)
        assertNull(authModel.accessToken())
    }

    @Test fun deleteAccountFailsWithoutSigningOutWhenTheServerRefuses() = runTest {
        authBackend.nextSession = Session(userId = "u1", accessToken = "tok", emailVerified = true)
        authModel.signIn("a@b.com", "pw")
        api.shouldFail = true

        val outcome = repository.deleteAccount()

        assertEquals(DeletionOutcome.Failed, outcome)
        assertEquals("tok", authModel.accessToken())
    }

    // --- fixtures ------------------------------------------------------------------

    private fun meWith(universityId: String, year: String, yearId: String, group: String? = null) = MeResponse(
        user = MeUser(id = "u1", email = "a@b.com"),
        profile = MeProfile(studentId = "s1", universityId = universityId, year = year, yearId = yearId, group = group),
        entitlement = MeEntitlement(state = "trialing", daysLeft = 5),
    )
}

// --- Fakes --------------------------------------------------------------------

private class FakeAccountApi : AccountApi {
    var meResponse: MeResponse = MeResponse(user = MeUser(id = "u1"))
    var discoverableValue: Boolean = false
    var exportBody: String = "{}"
    var shouldFail: Boolean = false
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
        if (shouldFail) throw RuntimeException("boom")
        return AccountDeletionResult(ok = true)
    }

    override suspend fun exportRaw(): okhttp3.ResponseBody {
        if (shouldFail) throw RuntimeException("boom")
        return exportBody.toResponseBody("application/json".toMediaType())
    }
}

private class FakeAuthBackend : AuthBackend {
    private val _session = MutableStateFlow<Session?>(null)
    override val session: StateFlow<Session?> = _session.asStateFlow()
    var nextSession: Session? = null
    var restoredSession: Session? = null

    override suspend fun restore() { _session.value = restoredSession }
    override suspend fun signIn(email: String, password: String) { _session.value = nextSession }
    override suspend fun signUp(email: String, password: String) { _session.value = nextSession }
    override suspend fun signOut() { _session.value = null }
    override suspend fun sendReset(email: String) {}
    override suspend fun accessToken(): String? = _session.value?.accessToken
}

private class FakeLocalStore : LocalStore {
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

private class FakeSynapseApi : com.synapse.app.core.api.SynapseApi {
    override suspend fun session(): SessionDto = SessionDto("u")
    override suspend fun manifest(): Manifest = emptyMap()
    override suspend fun getState(key: String): StateDoc = StateDoc(JsonNull)
    override suspend fun getUserState(key: String): StateDoc = StateDoc(JsonNull)
    override suspend fun putUserState(key: String, doc: StateDoc) {}
    override suspend fun getAttempts(month: String): List<ModelAttemptRecord> = emptyList()
    override suspend fun postAttempt(attempt: ModelAttemptRecord) {}
}
