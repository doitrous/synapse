package com.synapse.app.feature.minigames

import com.synapse.app.core.cache.LocalStore
import com.synapse.app.core.cache.OutboxEntry
import com.synapse.app.core.minigames.SpotterRefusal
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
import org.junit.Assert.assertNull
import org.junit.Assert.assertTrue
import org.junit.Before
import org.junit.Test
import java.time.Instant

@OptIn(ExperimentalCoroutinesApi::class)
class SpotterViewModelTest {

    private val dispatcher = StandardTestDispatcher()
    private val json = Json { ignoreUnknownKeys = true }

    @Before fun setUp() { Dispatchers.setMain(dispatcher) }
    @After fun tearDown() { Dispatchers.resetMain() }

    private fun seededLocalStore(count: Int = 8): SpotterFakeLocalStore {
        val localStore = SpotterFakeLocalStore()
        val terms = (1..count).joinToString(",") { i ->
            """{ "id": "t$i", "term": "Term$i", "ar": "", "category": "Cat${i % 2}", "def": "Definition $i.", "defAr": "" }"""
        }
        val valueJson = """{ "categories": [], "terms": [$terms] }"""
        val doc = StateDoc(value = json.parseToJsonElement(valueJson), updatedAt = "2026-08-29T00:00:00Z")
        runBlocking { localStore.putCatalogue("synapse-medical-glossary-v1", "2026-08-29T00:00:00Z", json.encodeToString(StateDoc.serializer(), doc)) }
        return localStore
    }

    private fun viewModel(localStore: SpotterFakeLocalStore = seededLocalStore()): SpotterViewModel {
        val vm = SpotterViewModel(MinigamesRepository(localStore, json))
        dispatcher.scheduler.advanceUntilIdle()
        return vm
    }

    @Test
    fun loadsAndBuildsAGameFromTheGlossary() = runTest {
        val viewModel = viewModel()
        val state = viewModel.uiState.value as SpotterUiState.Content
        assertNull(state.game.refusal)
        assertTrue(state.game.rounds.isNotEmpty())
        assertEquals(0, state.roundIndex)
        assertEquals(0, state.correct)
        assertNull(state.chosen)
    }

    @Test
    fun choosingTheCorrectAnswerIncrementsScore() = runTest {
        val viewModel = viewModel()
        val round = (viewModel.uiState.value as SpotterUiState.Content).game.rounds.first()
        viewModel.choose(round.answer)
        val state = viewModel.uiState.value as SpotterUiState.Content
        assertEquals(1, state.correct)
        assertEquals(round.answer, state.chosen)
    }

    @Test
    fun choosingAWrongAnswerDoesNotIncrementScore() = runTest {
        val viewModel = viewModel()
        val round = (viewModel.uiState.value as SpotterUiState.Content).game.rounds.first()
        val wrong = round.options.first { it != round.answer }
        viewModel.choose(wrong)
        assertEquals(0, (viewModel.uiState.value as SpotterUiState.Content).correct)
    }

    @Test
    fun choosingTwiceInARoundIsIgnored() = runTest {
        val viewModel = viewModel()
        val round = (viewModel.uiState.value as SpotterUiState.Content).game.rounds.first()
        val wrong = round.options.first { it != round.answer }
        viewModel.choose(wrong)
        viewModel.choose(round.answer)
        assertEquals(0, (viewModel.uiState.value as SpotterUiState.Content).correct)
    }

    @Test
    fun advancingPastTheLastRoundSetsFinishedAt() = runTest {
        val viewModel = viewModel()
        var state = viewModel.uiState.value as SpotterUiState.Content
        val totalRounds = state.game.rounds.size
        repeat(totalRounds) {
            state = viewModel.uiState.value as SpotterUiState.Content
            viewModel.choose(state.game.rounds[state.roundIndex].answer)
            viewModel.advance()
        }
        val finished = viewModel.uiState.value as SpotterUiState.Content
        assertTrue(finished.finishedAt != null)
        assertEquals(totalRounds, finished.correct)
    }

    @Test
    fun fewerThanTheFloorOfDistinctTermsIsRefused() = runTest {
        val viewModel = viewModel(seededLocalStore(count = 2))
        val state = viewModel.uiState.value as SpotterUiState.Content
        assertEquals(SpotterRefusal.TOO_FEW_TERMS, state.game.refusal)
    }

    @Test
    fun newGameUsesTheInjectedSeedDeterministically() = runTest {
        val localStore = seededLocalStore()
        val viewModel = viewModel(localStore)
        viewModel.randomSeed = { 99 }
        viewModel.now = { Instant.EPOCH }
        viewModel.newGame()
        val first = (viewModel.uiState.value as SpotterUiState.Content).game
        viewModel.newGame()
        val second = (viewModel.uiState.value as SpotterUiState.Content).game
        assertEquals(first, second)
    }
}

private class SpotterFakeLocalStore : LocalStore {
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
