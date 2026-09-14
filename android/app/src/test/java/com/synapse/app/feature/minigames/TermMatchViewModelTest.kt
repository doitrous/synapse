package com.synapse.app.feature.minigames

import com.synapse.app.core.cache.LocalStore
import com.synapse.app.core.cache.OutboxEntry
import com.synapse.app.core.minigames.MatchMode
import com.synapse.app.core.minigames.MatchRefusal
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

@OptIn(ExperimentalCoroutinesApi::class)
class TermMatchViewModelTest {

    private val dispatcher = StandardTestDispatcher()
    private val json = Json { ignoreUnknownKeys = true }

    @Before fun setUp() { Dispatchers.setMain(dispatcher) }
    @After fun tearDown() { Dispatchers.resetMain() }

    private fun viewModel(localStore: TermMatchFakeLocalStore = seededLocalStore()): TermMatchViewModel {
        val vm = TermMatchViewModel(MinigamesRepository(localStore, json))
        dispatcher.scheduler.advanceUntilIdle()
        return vm
    }

    private fun seededLocalStore(): TermMatchFakeLocalStore {
        val localStore = TermMatchFakeLocalStore()
        val terms = (1..8).joinToString(",") { i ->
            """{ "id": "t$i", "term": "Term$i", "ar": "ar$i", "category": "Directional", "def": "Definition $i.", "defAr": "d$i" }"""
        }
        val valueJson = """{ "categories": [{"key":"Directional","ar":"x"}], "terms": [$terms] }"""
        val doc = StateDoc(value = json.parseToJsonElement(valueJson), updatedAt = "2026-08-29T00:00:00Z")
        runBlockingLocal(localStore, json.encodeToString(StateDoc.serializer(), doc))
        return localStore
    }

    private fun runBlockingLocal(localStore: TermMatchFakeLocalStore, encoded: String) {
        runBlocking { localStore.putCatalogue("synapse-medical-glossary-v1", "2026-08-29T00:00:00Z", encoded) }
    }

    @Test
    fun loadsAndBuildsABoardFromTheGlossary() = runTest {
        val viewModel = viewModel()
        val state = viewModel.uiState.value as TermMatchUiState.Content
        assertEquals(MatchMode.ARABIC, state.mode)
        assertNull(state.board.refusal)
        assertEquals(8, state.board.pairs)
    }

    @Test
    fun tappingAMatchingPairMarksBothMatched() = runTest {
        val viewModel = viewModel()
        val state = viewModel.uiState.value as TermMatchUiState.Content
        val term = state.board.termTiles.first()
        val partner = state.board.partnerTiles.first { it.pairId == term.pairId }
        viewModel.tap(term.id)
        viewModel.tap(partner.id)
        val after = viewModel.uiState.value as TermMatchUiState.Content
        assertTrue(term.id in after.matchedIds)
        assertTrue(partner.id in after.matchedIds)
        assertNull(after.selectedId)
    }

    @Test
    fun tappingAMismatchedPairFlagsBothAsWrongAndCountsTheAttempt() = runTest {
        val viewModel = viewModel()
        val state = viewModel.uiState.value as TermMatchUiState.Content
        val term = state.board.termTiles.first()
        val wrongPartner = state.board.partnerTiles.first { it.pairId != term.pairId }
        viewModel.tap(term.id)
        viewModel.tap(wrongPartner.id)
        val after = viewModel.uiState.value as TermMatchUiState.Content
        assertEquals(setOf(term.id, wrongPartner.id), after.wrongIds)
        assertEquals(1, after.wrongAttempts)
    }

    @Test
    fun clearWrongFlashClearsTheWrongSetWithoutTouchingScore() = runTest {
        val viewModel = viewModel()
        val state = viewModel.uiState.value as TermMatchUiState.Content
        val term = state.board.termTiles.first()
        val wrongPartner = state.board.partnerTiles.first { it.pairId != term.pairId }
        viewModel.tap(term.id)
        viewModel.tap(wrongPartner.id)
        viewModel.clearWrongFlash()
        val after = viewModel.uiState.value as TermMatchUiState.Content
        assertTrue(after.wrongIds.isEmpty())
        assertEquals(1, after.wrongAttempts)
    }

    @Test
    fun matchingEveryPairSetsFinishedAt() = runTest {
        val viewModel = viewModel()
        var state = viewModel.uiState.value as TermMatchUiState.Content
        val pairIds = state.board.termTiles.map { it.pairId }
        for (pairId in pairIds) {
            state = viewModel.uiState.value as TermMatchUiState.Content
            val term = state.board.termTiles.first { it.pairId == pairId }
            val partner = state.board.partnerTiles.first { it.pairId == pairId }
            viewModel.tap(term.id)
            viewModel.tap(partner.id)
        }
        val finished = viewModel.uiState.value as TermMatchUiState.Content
        assertEquals(pairIds.size * 2, finished.matchedIds.size)
        assertTrue(finished.finishedAt != null)
    }

    @Test
    fun newGameWithFewerThanMinPairsProducesARefusal() = runTest {
        val localStore = TermMatchFakeLocalStore()
        val terms = (1..3).joinToString(",") { i ->
            """{ "id": "t$i", "term": "Term$i", "ar": "ar$i", "category": "Directional", "def": "Definition $i.", "defAr": "d$i" }"""
        }
        val valueJson = """{ "categories": [{"key":"Directional","ar":"x"}], "terms": [$terms] }"""
        val doc = StateDoc(value = json.parseToJsonElement(valueJson), updatedAt = "2026-08-29T00:00:00Z")
        runBlockingLocal(localStore, json.encodeToString(StateDoc.serializer(), doc))

        val viewModel = viewModel(localStore)
        val state = viewModel.uiState.value as TermMatchUiState.Content
        assertEquals(MatchRefusal.TOO_FEW_TERMS, state.board.refusal)
    }
}

private class TermMatchFakeLocalStore : LocalStore {
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
