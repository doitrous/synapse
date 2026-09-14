package com.synapse.app.feature.taxonomy

import com.synapse.app.core.cache.LocalStore
import com.synapse.app.core.cache.OutboxEntry
import com.synapse.app.core.model.AttemptRecord
import com.synapse.app.core.model.StateDoc
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.ExperimentalCoroutinesApi
import kotlinx.coroutines.test.StandardTestDispatcher
import kotlinx.coroutines.test.resetMain
import kotlinx.coroutines.test.runTest
import kotlinx.coroutines.test.setMain
import kotlinx.serialization.json.Json
import org.junit.After
import org.junit.Assert.assertEquals
import org.junit.Assert.assertTrue
import org.junit.Before
import org.junit.Test

/**
 * [TaxonomyViewModel] built against a real [TaxonomyRepository] wired to a
 * hand-written fake [LocalStore] — the same convention as
 * `LibraryViewModelTest`.
 */
@OptIn(ExperimentalCoroutinesApi::class)
class TaxonomyViewModelTest {

    private val dispatcher = StandardTestDispatcher()
    private val json = Json { ignoreUnknownKeys = true }

    @Before fun setUp() { Dispatchers.setMain(dispatcher) }
    @After fun tearDown() { Dispatchers.resetMain() }

    private fun viewModel(localStore: VmFakeLocalStore = VmFakeLocalStore()): TaxonomyViewModel =
        TaxonomyViewModel(TaxonomyRepository(localStore, json))

    @Test
    fun initLoadsEmptyContentWhenNothingIsStoredAnywhere() = runTest {
        val viewModel = viewModel()
        dispatcher.scheduler.advanceUntilIdle()

        val state = viewModel.uiState.value
        assertTrue(state is TaxonomyUiState.Content)
        state as TaxonomyUiState.Content
        assertTrue(state.groups.isEmpty())
        assertEquals(0, state.totalCount)
        assertEquals("", state.query)
    }

    @Test
    fun loadProjectsThePublishedGlossaryIntoGroups() = runTest {
        val localStore = VmFakeLocalStore()
        seedGlossary(localStore)
        val viewModel = viewModel(localStore)
        dispatcher.scheduler.advanceUntilIdle()

        val state = viewModel.uiState.value as TaxonomyUiState.Content
        assertEquals(2, state.totalCount)
        assertEquals(1, state.groups.size)
        assertEquals("Word parts", state.groups.single().category.key)
        assertEquals(setOf("s-itis", "s-ectomy"), state.termsById.keys)
    }

    @Test
    fun onQueryChangeFiltersGroupsWithoutReReadingTheCatalogue() = runTest {
        val localStore = VmFakeLocalStore()
        seedGlossary(localStore)
        val viewModel = viewModel(localStore)
        dispatcher.scheduler.advanceUntilIdle()

        viewModel.onQueryChange("ectomy")

        val state = viewModel.uiState.value as TaxonomyUiState.Content
        assertEquals("ectomy", state.query)
        assertEquals(listOf("s-ectomy"), state.groups.single().terms.map { it.id })
        // termsById is unaffected by the filter — the catalogue itself didn't shrink.
        assertEquals(2, state.termsById.size)
    }

    @Test
    fun aQueryMatchingNothingLeavesGroupsEmpty() = runTest {
        val localStore = VmFakeLocalStore()
        seedGlossary(localStore)
        val viewModel = viewModel(localStore)
        dispatcher.scheduler.advanceUntilIdle()

        viewModel.onQueryChange("nonexistent term")

        assertTrue((viewModel.uiState.value as TaxonomyUiState.Content).groups.isEmpty())
    }

    // --- fixtures ------------------------------------------------------------------

    private suspend fun seedGlossary(localStore: VmFakeLocalStore) {
        val valueJson = """
            { "categories": [ { "key": "Word parts", "ar": "مكوّنات الكلمة" } ],
              "terms": [
                { "id": "s-itis", "term": "-itis", "ar": "لاحقة: التهاب", "category": "Word parts", "def": "Inflammation of a part.", "defAr": "x" },
                { "id": "s-ectomy", "term": "-ectomy", "ar": "لاحقة: استئصال", "category": "Word parts", "def": "Surgical removal.", "defAr": "y" }
              ] }
        """.trimIndent()
        val doc = StateDoc(value = json.parseToJsonElement(valueJson), updatedAt = "2026-08-29T00:00:00Z")
        localStore.putCatalogue(GLOSSARY_KEY, "2026-08-29T00:00:00Z", json.encodeToString(StateDoc.serializer(), doc))
    }

    private companion object {
        const val GLOSSARY_KEY = "synapse-medical-glossary-v1"
    }
}

// --- Fake --------------------------------------------------------------------

private class VmFakeLocalStore : LocalStore {
    val catalogue = linkedMapOf<String, Pair<String, String>>()
    val outbox = linkedMapOf<String, String>()
    val attemptsById = linkedMapOf<String, AttemptRecord>()
    val userState = linkedMapOf<String, Triple<String, String?, String?>>()

    override suspend fun putCatalogue(key: String, updatedAt: String, json: String) {
        catalogue[key] = updatedAt to json
    }

    override suspend fun catalogueUpdatedAt(key: String): String? = catalogue[key]?.first
    override suspend fun getCatalogue(key: String): String? = catalogue[key]?.second
    override suspend fun enqueue(key: String, json: String) { outbox[key] = json }
    override suspend fun pendingOutbox(): List<OutboxEntry> = outbox.map { OutboxEntry(it.key, it.value) }
    override suspend fun clearOutbox(key: String) { outbox.remove(key) }
    override suspend fun putAttempts(items: List<AttemptRecord>) { items.forEach { attemptsById[it.id] = it } }
    override suspend fun attempts(month: String): List<AttemptRecord> = attemptsById.values.filter { it.month == month }
    override suspend fun putUserState(key: String, json: String, savedAt: String?, serverUpdatedAt: String?) {
        userState[key] = Triple(json, savedAt, serverUpdatedAt)
    }
    override suspend fun getUserState(key: String): String? = userState[key]?.first
    override suspend fun userStateSavedAt(key: String): String? = userState[key]?.second

    override suspend fun clearAll() {
        catalogue.clear(); outbox.clear(); attemptsById.clear(); userState.clear()
    }
}
