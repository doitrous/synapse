package com.synapse.app.feature.adaptive

import androidx.datastore.preferences.core.PreferenceDataStoreFactory
import androidx.datastore.preferences.preferencesDataStoreFile
import androidx.test.core.app.ApplicationProvider
import com.synapse.app.R
import com.synapse.app.core.adaptive.ConceptStatus
import com.synapse.app.core.api.SynapseApi
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
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.ExperimentalCoroutinesApi
import kotlinx.coroutines.SupervisorJob
import kotlinx.coroutines.test.StandardTestDispatcher
import kotlinx.coroutines.test.resetMain
import kotlinx.coroutines.test.runTest
import kotlinx.coroutines.test.setMain
import kotlinx.serialization.json.Json
import kotlinx.serialization.json.JsonNull
import kotlinx.serialization.json.JsonObject
import org.junit.After
import org.junit.Assert.assertEquals
import org.junit.Assert.assertNull
import org.junit.Assert.assertTrue
import org.junit.Before
import org.junit.Test
import org.junit.runner.RunWith
import org.robolectric.RobolectricTestRunner
import java.time.Instant

/**
 * [AdaptiveViewModel] built against a real [AdaptiveRepository] + [SyncEngine],
 * the latter wired to hand-written fakes — same convention as
 * `LibraryViewModelTest`. Exercises the pure `core.adaptive` engine wired end
 * to end: a stored blueprint + a couple of QBank attempts produce a real
 * mastery rebuild, never a fabricated figure. A real [AccountIdentityStore]
 * against a Robolectric-backed DataStore file backs [AdaptiveRepository]'s
 * identity dependency; none of these tests save an identity, so the
 * blueprint scope stays unscoped throughout, same as before this dependency
 * existed.
 */
@OptIn(ExperimentalCoroutinesApi::class)
@RunWith(RobolectricTestRunner::class)
class AdaptiveViewModelTest {

    private val dispatcher = StandardTestDispatcher()
    private val json = Json { ignoreUnknownKeys = true }
    private val now = Instant.parse("2026-08-29T12:00:00Z")

    @Before fun setUp() { Dispatchers.setMain(dispatcher) }
    @After fun tearDown() { Dispatchers.resetMain() }

    /**
     * DataStore normally does its own file I/O on a real `Dispatchers.IO`-backed
     * scope, independent of [dispatcher] — under [StandardTestDispatcher],
     * `advanceUntilIdle` then has nothing of its own to advance and can return
     * before that real work lands, making assertions racy. Pinning the
     * DataStore's scope to [dispatcher] keeps every bit of work on the one
     * virtual clock this test controls — same fix as `AccountViewModelTest`.
     */
    private fun freshIdentityDataStore() = AccountIdentityStore(
        PreferenceDataStoreFactory.create(
            scope = CoroutineScope(dispatcher + SupervisorJob()),
            produceFile = {
                ApplicationProvider.getApplicationContext<android.content.Context>()
                    .preferencesDataStoreFile("adaptive_vm_test_${System.nanoTime()}")
            }
        )
    )

    private fun repository(localStore: VmFakeLocalStore = VmFakeLocalStore(), api: VmFakeApi = VmFakeApi()): AdaptiveRepository =
        AdaptiveRepository(localStore, SyncEngine(api, localStore, readableKeys = emptyList(), userStateKeys = emptyList()), json, freshIdentityDataStore())

    private fun viewModel(repository: AdaptiveRepository): AdaptiveViewModel =
        AdaptiveViewModel(repository).apply { now = { this@AdaptiveViewModelTest.now } }

    @Test
    fun initLoadsAnEmptyBlueprintRecommendationWhenNothingIsStoredAnywhere() = runTest {
        val viewModel = viewModel(repository())
        dispatcher.scheduler.advanceUntilIdle()

        val state = viewModel.uiState.value
        assertTrue(state is AdaptiveUiState.Content)
        state as AdaptiveUiState.Content
        assertTrue(state.study.blueprintNodes.isEmpty())
        assertEquals(
            RecommendationTitle.Text(R.string.adaptive_recommendation_no_blueprint_title),
            state.study.recommendation.title,
        )
        assertNull(state.study.recommendation.cta)
    }

    @Test
    fun loadRebuildsMasteryFromStoredEvidenceAndFlagsAWeakConcept() = runTest {
        val localStore = VmFakeLocalStore()
        seedCatalogue(localStore, "synapse-adaptive-blueprints-v1", "[$BLUEPRINT_JSON]")
        seedCatalogue(localStore, "synapse-admin-content-ledger-v4", "[$PUBLISHED_QUESTION_JSON,$SECOND_PUBLISHED_QUESTION_JSON]")
        // Two independent wrong answers on the same concept, on two different
        // questions — `weakDistinctItems` needs distinct questions, not just
        // distinct attempts, for `core.adaptive.conceptStatus` to call it WEAK
        // rather than the single-error ATTENTION band.
        seedAttempt(localStore, wrongAttempt("Q1", "s1", now.minusSeconds(3600)))
        seedAttempt(localStore, wrongAttempt("Q2", "s2", now))

        val viewModel = viewModel(repository(localStore))
        dispatcher.scheduler.advanceUntilIdle()

        val study = (viewModel.uiState.value as AdaptiveUiState.Content).study
        assertEquals(ConceptStatus.WEAK, study.states.getValue("CON-A").status)
        assertEquals(2, study.states.getValue("CON-A").rawWrong)
        assertEquals(
            RecommendationTitle.Counted(R.plurals.adaptive_recommendation_weak_title, 1),
            study.recommendation.title,
        )
        assertEquals(RecommendationCta.PRACTICE, study.recommendation.cta)
    }

    @Test
    fun setOverrideRemovesAnOutOfScopeConceptFromTheBlueprintWithNoManualReload() = runTest {
        val localStore = VmFakeLocalStore()
        seedCatalogue(localStore, "synapse-adaptive-blueprints-v1", "[$BLUEPRINT_JSON]")
        val viewModel = viewModel(repository(localStore))
        dispatcher.scheduler.advanceUntilIdle()
        assertEquals(setOf("CON-A", "CON-B"), (viewModel.uiState.value as AdaptiveUiState.Content).study.blueprintNodes.map { it.conceptId }.toSet())

        viewModel.setOverride("CON-A", OverrideMode.OUT_OF_SCOPE)
        dispatcher.scheduler.advanceUntilIdle()

        val study = (viewModel.uiState.value as AdaptiveUiState.Content).study
        assertEquals(setOf("CON-B"), study.blueprintNodes.map { it.conceptId }.toSet())
        // Re-normalised to sum back to 1 once CON-A's 0.6 share is removed.
        assertEquals(1.0, study.blueprintNodes.single().weight, 1e-9)
    }

    // --- fixtures ------------------------------------------------------------------

    private suspend fun seedCatalogue(localStore: VmFakeLocalStore, key: String, valueJson: String) {
        val doc = StateDoc(value = json.parseToJsonElement(valueJson), updatedAt = "2026-08-29T00:00:00Z")
        localStore.putCatalogue(key, "2026-08-29T00:00:00Z", json.encodeToString(StateDoc.serializer(), doc))
    }

    private suspend fun seedAttempt(localStore: VmFakeLocalStore, record: AttemptRecord) {
        localStore.putAttempts(
            listOf(
                ModelAttemptRecord(
                    id = record.id,
                    month = monthKey(Instant.parse(record.at)),
                    payload = json.encodeToJsonElement(AttemptRecord.serializer(), record) as JsonObject,
                ),
            ),
        )
    }

    private fun wrongAttempt(itemId: String, sessionId: String, at: Instant): AttemptRecord = AttemptRecord(
        id = "$sessionId:qbank:$itemId",
        at = at.toString(),
        itemId = itemId,
        subjectId = "cvs",
        topic = "Heart failure",
        difficulty = "Moderate",
        conceptIds = listOf("CON-A"),
        correct = false,
        sessionId = sessionId,
    )

    private companion object {
        val BLUEPRINT_JSON = """
            { "id":"bp1","name":"CVS","version":1,"universityId":"","yearId":"","moduleIds":[],
              "publishedAt":"2026-08-01T00:00:00Z","changeNotes":[],
              "nodes":[
                {"conceptId":"CON-A","label":"A","groupId":"g1","groupLabel":"Group 1","weight":0.6,"overridden":false},
                {"conceptId":"CON-B","label":"B","groupId":"g1","groupLabel":"Group 1","weight":0.4,"overridden":false}
              ]}
        """.trimIndent()

        val PUBLISHED_QUESTION_JSON = """
            { "id":"Q1","kind":"question","title":"A vignette","subjectId":"cvs","status":"Published",
              "fields":{"Topic":"Heart failure","Difficulty":"Moderate"},
              "questionData":{
                "correctAnswer":"A",
                "answers":[{"label":"A","text":"Right","explanation":"x"},{"label":"B","text":"Wrong","explanation":"y"}],
                "tags":{"mainConceptIds":["CON-A"],"conceptIds":["CON-A"]}
              }}
        """.trimIndent()

        val SECOND_PUBLISHED_QUESTION_JSON = """
            { "id":"Q2","kind":"question","title":"Another vignette","subjectId":"cvs","status":"Published",
              "fields":{"Topic":"Heart failure","Difficulty":"Moderate"},
              "questionData":{
                "correctAnswer":"A",
                "answers":[{"label":"A","text":"Right","explanation":"x"},{"label":"B","text":"Wrong","explanation":"y"}],
                "tags":{"mainConceptIds":["CON-A"],"conceptIds":["CON-A"]}
              }}
        """.trimIndent()
    }
}

// --- Fakes --------------------------------------------------------------------

private class VmFakeLocalStore : LocalStore {
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

private class VmFakeApi : SynapseApi {
    override suspend fun session(): SessionDto = SessionDto("u")
    override suspend fun manifest(): Manifest = emptyMap()
    override suspend fun getState(key: String): StateDoc = StateDoc(JsonNull)
    override suspend fun getUserState(key: String): StateDoc = StateDoc(JsonNull)
    override suspend fun putUserState(key: String, doc: StateDoc) { /* unused */ }
    override suspend fun getAttempts(month: String): List<ModelAttemptRecord> = emptyList()
    override suspend fun postAttempt(attempt: ModelAttemptRecord) { /* unused */ }
}
