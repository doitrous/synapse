package com.synapse.app.feature.adaptive

import androidx.datastore.preferences.core.PreferenceDataStoreFactory
import androidx.datastore.preferences.preferencesDataStoreFile
import androidx.test.core.app.ApplicationProvider
import com.synapse.app.core.adaptive.AttemptOutcome
import com.synapse.app.core.adaptive.Confidence
import com.synapse.app.core.adaptive.ConceptRole
import com.synapse.app.core.adaptive.DEFAULT_ADAPTIVE_CONFIG
import com.synapse.app.core.adaptive.EMPTY_COVERAGE_DEBT
import com.synapse.app.core.adaptive.EMPTY_HELD_OUT
import com.synapse.app.core.adaptive.ExposureState
import com.synapse.app.core.adaptive.PresentationMode
import com.synapse.app.core.api.SynapseApi
import com.synapse.app.core.auth.AccountIdentity
import com.synapse.app.core.auth.AccountIdentityStore
import com.synapse.app.core.cache.LocalStore
import com.synapse.app.core.cache.OutboxEntry
import com.synapse.app.core.model.AttemptRecord as ModelAttemptRecord
import com.synapse.app.core.model.Manifest
import com.synapse.app.core.model.SessionDto
import com.synapse.app.core.model.StateDoc
import com.synapse.app.core.qbank.AttemptRecord
import com.synapse.app.core.qbank.monthKey
import com.synapse.app.core.sync.SyncEngine
import kotlinx.coroutines.test.runTest
import kotlinx.serialization.json.JsonNull
import kotlinx.serialization.json.Json
import org.junit.Assert.assertEquals
import org.junit.Assert.assertNull
import org.junit.Assert.assertTrue
import org.junit.Before
import org.junit.Test
import org.junit.runner.RunWith
import org.robolectric.RobolectricTestRunner
import java.time.Instant

/**
 * [AdaptiveRepository] reads the shared config/blueprint/held-out catalogues,
 * projects the shared content ledger into [com.synapse.app.core.adaptive.AdaptiveItem]s,
 * rebuilds evidence from the QBank attempts store, and round-trips this
 * student's own overrides — the same convention as `LibraryRepositoryTest`: a
 * real [SyncEngine] against a fake in-memory [LocalStore], and a real
 * [AccountIdentityStore] against a Robolectric-backed DataStore file — same
 * convention as `AccountRepositoryTest`.
 */
@RunWith(RobolectricTestRunner::class)
class AdaptiveRepositoryTest {

    private val json = Json { ignoreUnknownKeys = true }
    private lateinit var localStore: FakeLocalStore
    private lateinit var api: FakeSynapseApi
    private lateinit var syncEngine: SyncEngine
    private lateinit var identityStore: AccountIdentityStore
    private lateinit var repository: AdaptiveRepository

    @Before
    fun setup() {
        localStore = FakeLocalStore()
        api = FakeSynapseApi()
        syncEngine = SyncEngine(api, localStore, readableKeys = emptyList(), userStateKeys = emptyList())
        identityStore = AccountIdentityStore(
            PreferenceDataStoreFactory.create(
                produceFile = {
                    ApplicationProvider.getApplicationContext<android.content.Context>()
                        .preferencesDataStoreFile("adaptive_repo_test_${System.nanoTime()}")
                }
            )
        )
        repository = AdaptiveRepository(localStore, syncEngine, json, identityStore)
    }

    // --- config / blueprints / heldOutRegistry ------------------------------

    @Test
    fun configFallsBackToTheDefaultWhenNothingIsStoredLocally() = runTest {
        assertEquals(DEFAULT_ADAPTIVE_CONFIG, repository.config())
    }

    @Test
    fun configDecodesTheStoredCatalogue() = runTest {
        seedCatalogue("synapse-adaptive-config-v1", json.encodeToString(com.synapse.app.core.adaptive.AdaptiveConfig.serializer(), DEFAULT_ADAPTIVE_CONFIG.copy(version = 7)))

        assertEquals(7, repository.config().version)
    }

    @Test
    fun blueprintsIsEmptyWhenNothingIsStoredLocally() = runTest {
        assertTrue(repository.blueprints().isEmpty())
    }

    @Test
    fun blueprintNodesReadsThePublishedBlueprintForAnUnscopedStudent() = runTest {
        // No identity saved to identityStore — AccountIdentity.Unknown, so the default scope stays the unscoped ("", "").
        seedCatalogue("synapse-adaptive-blueprints-v1", "[$BLUEPRINT_JSON]")

        val nodes = repository.blueprintNodes()

        assertEquals(listOf("CON-A", "CON-B"), nodes.map { it.conceptId })
        // Normalised: 0.6 and 0.4 already sum to 1, so weights round-trip unchanged.
        assertEquals(0.6, nodes.first { it.conceptId == "CON-A" }.weight, 1e-9)
    }

    @Test
    fun blueprintNodesDefaultsToThisStudentsOwnScopeWhenIdentityIsKnown() = runTest {
        identityStore.save(AccountIdentity(universityId = "UNI-1", year = "Year 3", yearId = "OMS_Y3"))
        seedCatalogue("synapse-adaptive-blueprints-v1", "[$BLUEPRINT_JSON,$SCOPED_BLUEPRINT_JSON]")

        val nodes = repository.blueprintNodes()

        // The unscoped blueprint (CON-A/CON-B) loses to the more specific one published for UNI-1/OMS_Y3.
        assertEquals(listOf("CON-C"), nodes.map { it.conceptId })
    }

    @Test
    fun storedBlueprintIgnoresAScopedPublicationWhenIdentityIsUnknown() = runTest {
        // No identity saved — the default scope stays unscoped, so a blueprint published only for UNI-1/OMS_Y3 is never picked up.
        seedCatalogue("synapse-adaptive-blueprints-v1", "[$SCOPED_BLUEPRINT_JSON]")

        assertNull(repository.storedBlueprint())
    }

    @Test
    fun anExplicitScopeArgumentOverridesTheIdentityDefault() = runTest {
        identityStore.save(AccountIdentity(universityId = "UNI-1", year = "Year 3", yearId = "OMS_Y3"))
        seedCatalogue("synapse-adaptive-blueprints-v1", "[$BLUEPRINT_JSON,$SCOPED_BLUEPRINT_JSON]")

        val nodes = repository.blueprintNodes(com.synapse.app.core.adaptive.BlueprintScope("", ""))

        assertEquals(listOf("CON-A", "CON-B"), nodes.map { it.conceptId })
    }

    @Test
    fun heldOutRegistryFallsBackToEmptyWhenNothingIsStoredLocally() = runTest {
        assertEquals(EMPTY_HELD_OUT, repository.heldOutRegistry())
    }

    // --- items ---------------------------------------------------------------

    @Test
    fun itemsIsEmptyWhenNoLedgerIsStoredLocally() = runTest {
        assertTrue(repository.items().isEmpty())
    }

    @Test
    fun itemsProjectsAPublishedQuestionWithItsMainAndSecondaryConceptSplit() = runTest {
        seedCatalogue("synapse-admin-content-ledger-v4", "[$PUBLISHED_QUESTION_JSON]")

        val items = repository.items()

        assertEquals(1, items.size)
        val item = items.single()
        assertEquals("Q1", item.id)
        assertEquals(listOf("CON-A"), item.mainConceptIds)
        assertEquals(listOf("CON-B"), item.secondaryConceptIds)
    }

    @Test
    fun itemsExcludesADraftQuestion() = runTest {
        seedCatalogue("synapse-admin-content-ledger-v4", "[$DRAFT_QUESTION_JSON]")

        assertTrue(repository.items().isEmpty())
    }

    // --- evidenceEvents --------------------------------------------------------

    @Test
    fun evidenceEventsIsEmptyWhenNoAttemptsAreStored() = runTest {
        assertTrue(repository.evidenceEvents(NOW).isEmpty())
    }

    @Test
    fun evidenceEventsFansOneAttemptOutIntoOneEventPerAssessedConcept() = runTest {
        seedCatalogue("synapse-admin-content-ledger-v4", "[$PUBLISHED_QUESTION_JSON]")
        seedAttempt(
            AttemptRecord(
                id = "s1:qbank:Q1",
                at = NOW.toString(),
                itemId = "Q1",
                subjectId = "cvs",
                topic = "Heart failure",
                difficulty = "Moderate",
                conceptIds = listOf("CON-A", "CON-B"),
                correct = false,
                seconds = 40,
                sessionId = "s1",
            ),
        )

        val events = repository.evidenceEvents(NOW)

        assertEquals(2, events.size)
        val main = events.single { it.conceptId == "CON-A" }
        assertEquals(ConceptRole.MAIN, main.role)
        assertEquals(false, main.correct)
        assertEquals(AttemptOutcome.ANSWERED, main.outcome)
        assertEquals(Confidence.UNSTATED, main.confidence)
        assertEquals(ExposureState.FIRST, main.exposure)
        assertEquals(PresentationMode.TUTOR, main.mode)
        val secondary = events.single { it.conceptId == "CON-B" }
        assertEquals(ConceptRole.SECONDARY, secondary.role)
    }

    @Test
    fun evidenceEventsIgnoresAttemptsFromOtherSurfaces() = runTest {
        seedAttempt(
            AttemptRecord(
                id = "s1:essay:Q1", at = NOW.toString(), surface = "essay", itemId = "Q1", subjectId = "cvs",
                topic = "x", difficulty = "Moderate", conceptIds = listOf("CON-A"), sessionId = "s1",
            ),
        )

        assertTrue(repository.evidenceEvents(NOW).isEmpty())
    }

    @Test
    fun evidenceEventsIgnoresAttemptsOlderThanTheLookbackWindow() = runTest {
        val old = NOW.minusSeconds(60L * 60 * 24 * 365) // a year back
        seedAttempt(
            AttemptRecord(
                id = "old:qbank:Q1", at = old.toString(), itemId = "Q1", subjectId = "cvs",
                topic = "x", difficulty = "Moderate", conceptIds = listOf("CON-A"), sessionId = "s0",
            ),
        )

        assertTrue(repository.evidenceEvents(NOW).isEmpty())
    }

    // --- coverageDebt / latestReadiness ---------------------------------------

    @Test
    fun coverageDebtFallsBackToEmptyWhenNothingIsStored() = runTest {
        assertEquals(EMPTY_COVERAGE_DEBT, repository.coverageDebt())
    }

    @Test
    fun latestReadinessIsNullWhenNothingIsStored() = runTest {
        assertNull(repository.latestReadiness())
    }

    @Test
    fun latestReadinessPicksTheMostRecentResult() = runTest {
        localStore.putUserState(
            ADAPTIVE_READINESS_RESULTS_KEY,
            """[$READINESS_JSON_A,$READINESS_JSON_B]""",
            savedAt = null,
            serverUpdatedAt = null,
        )

        val latest = repository.latestReadiness()

        assertEquals("r2", latest?.id)
    }

    // --- overrides / setOverride -----------------------------------------------

    @Test
    fun overridesIsEmptyWhenNothingIsStored() = runTest {
        assertTrue(repository.overrides().isEmpty())
    }

    @Test
    fun setOverrideThenOverridesReflectsTheWriteWithNoRefresh() = runTest {
        repository.setOverride("CON-A", OverrideMode.SNOOZED, NOW)

        val stored = repository.overrides().getValue("CON-A")
        assertEquals(OverrideMode.SNOOZED, stored.mode)
        assertEquals(NOW.plusSeconds(60L * 60 * 24 * ADAPTIVE_SNOOZE_DAYS).toString(), stored.until)
        assertEquals(1, api.putCalls.size)
    }

    @Test
    fun setOverrideBackToNormalRemovesTheEntryEntirely() = runTest {
        repository.setOverride("CON-A", OverrideMode.OUT_OF_SCOPE, NOW)

        repository.setOverride("CON-A", OverrideMode.NORMAL, NOW)

        assertTrue(repository.overrides().isEmpty())
    }

    // --- fixtures ------------------------------------------------------------------

    private suspend fun seedCatalogue(key: String, valueJson: String) {
        val doc = StateDoc(value = json.parseToJsonElement(valueJson), updatedAt = "2026-08-29T00:00:00Z")
        localStore.putCatalogue(key, "2026-08-29T00:00:00Z", json.encodeToString(StateDoc.serializer(), doc))
    }

    private suspend fun seedAttempt(record: AttemptRecord) {
        localStore.putAttempts(
            listOf(
                ModelAttemptRecord(
                    id = record.id,
                    month = monthKey(Instant.parse(record.at)),
                    payload = json.encodeToJsonElement(AttemptRecord.serializer(), record) as kotlinx.serialization.json.JsonObject,
                ),
            ),
        )
    }

    private companion object {
        val NOW: Instant = Instant.parse("2026-08-29T12:00:00Z")

        val BLUEPRINT_JSON = """
            { "id":"bp1","name":"CVS","version":1,"universityId":"","yearId":"","moduleIds":[],
              "publishedAt":"2026-08-01T00:00:00Z","changeNotes":[],
              "nodes":[
                {"conceptId":"CON-A","label":"A","groupId":"g1","groupLabel":"Group 1","weight":0.6,"overridden":false},
                {"conceptId":"CON-B","label":"B","groupId":"g1","groupLabel":"Group 1","weight":0.4,"overridden":false}
              ]}
        """.trimIndent()

        /** Published for a specific university/year, so [blueprintFor] prefers it over [BLUEPRINT_JSON]'s unscoped one for a student scoped to UNI-1/OMS_Y3. */
        val SCOPED_BLUEPRINT_JSON = """
            { "id":"bp2","name":"CVS (UNI-1 Y3)","version":1,"universityId":"UNI-1","yearId":"OMS_Y3","moduleIds":[],
              "publishedAt":"2026-08-01T00:00:00Z","changeNotes":[],
              "nodes":[
                {"conceptId":"CON-C","label":"C","groupId":"g1","groupLabel":"Group 1","weight":1.0,"overridden":false}
              ]}
        """.trimIndent()

        val PUBLISHED_QUESTION_JSON = """
            { "id":"Q1","kind":"question","title":"A vignette","subjectId":"cvs","status":"Published",
              "fields":{"Topic":"Heart failure","Difficulty":"Moderate"},
              "questionData":{
                "correctAnswer":"A",
                "answers":[{"label":"A","text":"Right","explanation":"x"},{"label":"B","text":"Wrong","explanation":"y"}],
                "estimatedSeconds":60,
                "tags":{"mainConceptIds":["CON-A"],"conceptIds":["CON-A","CON-B"]}
              }}
        """.trimIndent()

        val DRAFT_QUESTION_JSON = """
            { "id":"Q2","kind":"question","title":"Draft","subjectId":"cvs","status":"Draft",
              "questionData":{"correctAnswer":"A","answers":[{"label":"A","text":"Right","explanation":"x"}]}}
        """.trimIndent()

        val READINESS_JSON_A = """
            {"id":"r1","at":"2026-08-01T00:00:00Z","lower":0.4,"upper":0.6,"answered":40,"omitted":0,
             "medianSeconds":null,"groups":[],"underRepresented":[],"configVersion":1,"blueprintVersion":null}
        """.trimIndent()

        val READINESS_JSON_B = """
            {"id":"r2","at":"2026-08-20T00:00:00Z","lower":0.5,"upper":0.7,"answered":40,"omitted":0,
             "medianSeconds":null,"groups":[],"underRepresented":[],"configVersion":1,"blueprintVersion":null}
        """.trimIndent()
    }
}

// --- Fakes --------------------------------------------------------------------

private class FakeLocalStore : LocalStore {
    val catalogue = linkedMapOf<String, Pair<String, String>>()
    val outbox = linkedMapOf<String, String>()
    val attemptsById = linkedMapOf<String, ModelAttemptRecord>()
    val userState = linkedMapOf<String, Triple<String, String?, String?>>()

    override suspend fun putCatalogue(key: String, updatedAt: String, json: String) {
        catalogue[key] = updatedAt to json
    }

    override suspend fun catalogueUpdatedAt(key: String): String? = catalogue[key]?.first
    override suspend fun getCatalogue(key: String): String? = catalogue[key]?.second
    override suspend fun enqueue(key: String, json: String) { outbox[key] = json }
    override suspend fun pendingOutbox(): List<OutboxEntry> = outbox.map { OutboxEntry(it.key, it.value) }
    override suspend fun clearOutbox(key: String) { outbox.remove(key) }
    override suspend fun putAttempts(items: List<ModelAttemptRecord>) { items.forEach { attemptsById[it.id] = it } }
    override suspend fun attempts(month: String): List<ModelAttemptRecord> =
        attemptsById.values.filter { it.month == month }
    override suspend fun putUserState(key: String, json: String, savedAt: String?, serverUpdatedAt: String?) {
        userState[key] = Triple(json, savedAt, serverUpdatedAt)
    }
    override suspend fun getUserState(key: String): String? = userState[key]?.first
    override suspend fun userStateSavedAt(key: String): String? = userState[key]?.second

    override suspend fun clearAll() {
        catalogue.clear(); outbox.clear(); attemptsById.clear(); userState.clear()
    }
}

private class FakeSynapseApi : SynapseApi {
    val putCalls = mutableListOf<String>()

    override suspend fun session(): SessionDto = SessionDto("u")
    override suspend fun manifest(): Manifest = emptyMap()
    override suspend fun getState(key: String): StateDoc = StateDoc(JsonNull)
    override suspend fun getUserState(key: String): StateDoc = StateDoc(JsonNull)
    override suspend fun putUserState(key: String, doc: StateDoc) { putCalls += key }
}
