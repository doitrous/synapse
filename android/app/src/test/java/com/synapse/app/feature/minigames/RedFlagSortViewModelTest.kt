package com.synapse.app.feature.minigames

import com.synapse.app.core.cache.LocalStore
import com.synapse.app.core.cache.OutboxEntry
import com.synapse.app.core.minigames.RedFlagLane
import com.synapse.app.core.model.AttemptRecord
import kotlinx.serialization.json.Json
import org.junit.Assert.assertEquals
import org.junit.Assert.assertTrue
import org.junit.Test

class RedFlagSortViewModelTest {

    private fun repository() = MinigamesRepository(RedFlagSortFakeLocalStore(), Json { ignoreUnknownKeys = true })

    @Test
    fun startsWithTheBuiltInPackAndNoPlacements() {
        val viewModel = RedFlagSortViewModel(repository())
        val state = viewModel.uiState.value as RedFlagSortUiState.Content
        assertEquals("rf-respiratory-escalation", state.pack.id)
        assertTrue(state.placements.isEmpty())
        assertTrue(!state.checked)
    }

    @Test
    fun placeRecordsAChoiceAndClearsAPriorCheck() {
        val viewModel = RedFlagSortViewModel(repository())
        viewModel.check()
        val findingId = (viewModel.uiState.value as RedFlagSortUiState.Content).pack.findings.first().id
        viewModel.place(findingId, RedFlagLane.URGENT)
        val state = viewModel.uiState.value as RedFlagSortUiState.Content
        assertEquals(RedFlagLane.URGENT, state.placements[findingId])
        assertTrue(!state.checked)
    }

    @Test
    fun resetClearsPlacementsAndCheckedFlag() {
        val viewModel = RedFlagSortViewModel(repository())
        val findingId = (viewModel.uiState.value as RedFlagSortUiState.Content).pack.findings.first().id
        viewModel.place(findingId, RedFlagLane.ROUTINE)
        viewModel.check()
        viewModel.reset()
        val state = viewModel.uiState.value as RedFlagSortUiState.Content
        assertTrue(state.placements.isEmpty())
        assertTrue(!state.checked)
    }

    @Test
    fun checkingAllCorrectPlacementsScoresEveryFinding() {
        val viewModel = RedFlagSortViewModel(repository())
        val pack = (viewModel.uiState.value as RedFlagSortUiState.Content).pack
        for (finding in pack.findings) viewModel.place(finding.id, finding.lane)
        viewModel.check()
        val state = viewModel.uiState.value as RedFlagSortUiState.Content
        assertTrue(state.checked)
        assertEquals(pack.findings.size, state.placements.size)
    }
}

private class RedFlagSortFakeLocalStore : LocalStore {
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
