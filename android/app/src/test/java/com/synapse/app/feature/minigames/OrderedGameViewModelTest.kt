package com.synapse.app.feature.minigames

import com.synapse.app.core.cache.LocalStore
import com.synapse.app.core.cache.OutboxEntry
import com.synapse.app.core.model.AttemptRecord
import kotlinx.serialization.json.Json
import org.junit.Assert.assertEquals
import org.junit.Assert.assertTrue
import org.junit.Test

class OrderedGameViewModelTest {

    private fun repository() = MinigamesRepository(OrderedGameFakeLocalStore(), Json { ignoreUnknownKeys = true })

    @Test
    fun clinicalSequenceStartsWithAShuffledOrderOfTheBuiltInPack() {
        val viewModel = ClinicalSequenceViewModel(repository())
        val state = viewModel.uiState.value
        assertTrue(state is OrderedGameUiState.Content)
        state as OrderedGameUiState.Content
        assertEquals("cs-basic-life-support-primary-survey", state.pack.id)
        assertEquals(state.pack.steps.map { it.id }.toSet(), state.ids.toSet())
        assertTrue(!state.checked)
    }

    @Test
    fun newGameReshufflesUsingTheInjectedSeed() {
        val viewModel = ClinicalSequenceViewModel(repository())
        var seed = 1
        viewModel.randomSeed = { seed }
        viewModel.newGame()
        val first = (viewModel.uiState.value as OrderedGameUiState.Content).ids
        seed = 1
        viewModel.newGame()
        val second = (viewModel.uiState.value as OrderedGameUiState.Content).ids
        assertEquals(first, second)
    }

    @Test
    fun moveReordersStepsAndClearsAPriorCheck() {
        val viewModel = ClinicalSequenceViewModel(repository())
        viewModel.check()
        val before = (viewModel.uiState.value as OrderedGameUiState.Content).ids
        viewModel.move(0, 1)
        val state = viewModel.uiState.value as OrderedGameUiState.Content
        assertEquals(before[1], state.ids[0])
        assertEquals(before[0], state.ids[1])
        assertTrue(!state.checked)
    }

    @Test
    fun checkMarksTheStateChecked() {
        val viewModel = ClinicalSequenceViewModel(repository())
        viewModel.check()
        assertTrue((viewModel.uiState.value as OrderedGameUiState.Content).checked)
    }

    @Test
    fun mechanismChainStartsWithItsOwnBuiltInPack() {
        val viewModel = MechanismChainViewModel(repository())
        val state = viewModel.uiState.value as OrderedGameUiState.Content
        assertEquals("mc-heart-failure-compensation", state.pack.id)
    }
}

private class OrderedGameFakeLocalStore : LocalStore {
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
