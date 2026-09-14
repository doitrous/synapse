package com.synapse.app.feature.minigames

import com.synapse.app.core.cache.LocalStore
import com.synapse.app.core.cache.OutboxEntry
import com.synapse.app.core.model.AttemptRecord
import com.synapse.app.core.model.StateDoc
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.ExperimentalCoroutinesApi
import kotlinx.coroutines.runBlocking
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

@OptIn(ExperimentalCoroutinesApi::class)
class TermGridViewModelTest {

    private val dispatcher = StandardTestDispatcher()
    private val json = Json { ignoreUnknownKeys = true }

    private val directionalTerms = listOf(
        "ANTERIOR" to "Toward the front",
        "POSTERIOR" to "Toward the back",
        "SUPERIOR" to "Above",
        "INFERIOR" to "Below",
        "MEDIAL" to "Toward the midline",
        "LATERAL" to "Away from the midline",
        "PROXIMAL" to "Nearer the trunk",
        "DISTAL" to "Further from the trunk",
        "SUPINE" to "Lying face up",
        "PRONE" to "Lying face down",
    )

    @Before fun setUp() { Dispatchers.setMain(dispatcher) }
    @After fun tearDown() { Dispatchers.resetMain() }

    private fun seededLocalStore(): TermGridFakeLocalStore {
        val localStore = TermGridFakeLocalStore()
        val terms = directionalTerms.mapIndexed { i, (term, def) ->
            """{ "id": "t$i", "term": "$term", "ar": "", "category": "Directional", "def": "$def", "defAr": "" }"""
        }.joinToString(",")
        val valueJson = """{ "categories": [{"key":"Directional","ar":"x"}], "terms": [$terms] }"""
        val doc = StateDoc(value = json.parseToJsonElement(valueJson), updatedAt = "2026-08-29T00:00:00Z")
        runBlocking { localStore.putCatalogue("synapse-medical-glossary-v1", "2026-08-29T00:00:00Z", json.encodeToString(StateDoc.serializer(), doc)) }
        return localStore
    }

    /**
     * Constructs the view model with an already-fixed [randomSeed] before its
     * `init`-block `load()` coroutine actually runs, so every test here
     * builds a deterministic grid rather than depending on whichever
     * arrangement a real random seed happens to produce.
     */
    private fun viewModel(seed: Int = 21): TermGridViewModel {
        val vm = TermGridViewModel(MinigamesRepository(seededLocalStore(), json))
        vm.randomSeed = { seed }
        dispatcher.scheduler.advanceUntilIdle()
        return vm
    }

    @Test
    fun loadsAndBuildsAPuzzleFromTheFirstCategory() = runTest {
        val viewModel = viewModel()
        val state = viewModel.uiState.value as TermGridUiState.Content
        assertEquals("Directional", state.category)
        assertTrue(state.grid.words.isNotEmpty())
    }

    @Test
    fun givenWordsArrivePrefilledInLetters() = runTest {
        val viewModel = viewModel()
        val state = viewModel.uiState.value as TermGridUiState.Content
        assertTrue(state.givenWords.isNotEmpty())
        val givenWord = state.grid.words.first { it.term in state.givenWords }
        val (row, column) = cellFor(givenWord, 0)
        assertEquals(givenWord.term[0].toString(), state.letters["$row,$column"])
    }

    @Test
    fun typingTheFullSolutionMarksThePuzzleFinished() = runTest {
        val viewModel = viewModel()
        val state = viewModel.uiState.value as TermGridUiState.Content
        for (word in state.grid.words) {
            for (i in word.term.indices) {
                val (row, column) = cellFor(word, i)
                viewModel.setLetter(row, column, word.term[i].toString())
            }
        }
        val finished = viewModel.uiState.value as TermGridUiState.Content
        assertTrue(finished.finishedAt != null)
    }

    @Test
    fun revealWordFillsInEveryLetterOfThatWord() = runTest {
        val viewModel = viewModel()
        val state = viewModel.uiState.value as TermGridUiState.Content
        val word = state.grid.words.first { it.term !in state.givenWords }
        viewModel.revealWord(word.term)
        val after = viewModel.uiState.value as TermGridUiState.Content
        assertTrue(word.term in after.revealedWords)
        for (i in word.term.indices) {
            val (row, column) = cellFor(word, i)
            assertEquals(word.term[i].toString(), after.letters["$row,$column"])
        }
    }

    @Test
    fun selectingACategoryWithNoTermsRefusesTheGridRatherThanCrashing() = runTest {
        val viewModel = viewModel()
        viewModel.selectCategory("Nonexistent")
        val state = viewModel.uiState.value as TermGridUiState.Content
        assertTrue(state.grid.words.isEmpty())
    }
}

private class TermGridFakeLocalStore : LocalStore {
    private val catalogue = linkedMapOf<String, Pair<String, String>>()
    override suspend fun putCatalogue(key: String, updatedAt: String, json: String) { catalogue[key] = updatedAt to json }
    override suspend fun catalogueUpdatedAt(key: String): String? = catalogue[key]?.first
    override suspend fun getCatalogue(key: String): String? = catalogue[key]?.second
    override suspend fun enqueue(key: String, json: String) {}
    override suspend fun pendingOutbox(): List<OutboxEntry> = emptyList()
    override suspend fun clearOutbox(key: String) {}
    override suspend fun putAttempts(items: List<AttemptRecord>) {}
    override suspend fun attempts(month: String): List<AttemptRecord> = emptyList()
    override suspend fun putUserState(key: String, json: String, savedAt: String?, serverUpdatedAt: String?) {}
    override suspend fun getUserState(key: String): String? = null
    override suspend fun userStateSavedAt(key: String): String? = null
    override suspend fun clearAll() { catalogue.clear() }
}
