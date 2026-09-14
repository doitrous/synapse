package com.synapse.app.feature.party

import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.ExperimentalCoroutinesApi
import kotlinx.coroutines.test.StandardTestDispatcher
import kotlinx.coroutines.test.resetMain
import kotlinx.coroutines.test.runTest
import kotlinx.coroutines.test.setMain
import org.junit.After
import org.junit.Assert.assertEquals
import org.junit.Assert.assertTrue
import org.junit.Before
import org.junit.Test

/** [PartiesViewModel]: no polling here (only the single-party GET is a polled endpoint) — just load/create/join. */
@OptIn(ExperimentalCoroutinesApi::class)
class PartiesViewModelTest {

    private val dispatcher = StandardTestDispatcher()

    @Before fun setUp() { Dispatchers.setMain(dispatcher) }
    @After fun tearDown() { Dispatchers.resetMain() }

    @Test
    fun loadPopulatesMineAndOpenFromTheApi() = runTest {
        val api = FakePartyApi().apply {
            partiesList = listOf(com.synapse.app.core.api.PartySummaryDto(id = "p1", code = "ABC123", name = "Mine", visibility = "invite"))
            openPartiesList = listOf(com.synapse.app.core.api.OpenPartyDto(id = "p2", code = "DEF456", name = "Open"))
        }
        val viewModel = PartiesViewModel(PartiesRepository(api))
        dispatcher.scheduler.runCurrent()

        val state = viewModel.uiState.value as PartiesUiState.Content
        assertEquals(listOf("p1"), state.mine.map { it.id })
        assertEquals(listOf("p2"), state.open.map { it.id })
    }

    @Test
    fun createOnSuccessSetsOpenedPartyId() = runTest {
        val viewModel = PartiesViewModel(PartiesRepository(FakePartyApi()))
        dispatcher.scheduler.runCurrent()

        viewModel.create("New party")
        dispatcher.scheduler.runCurrent()

        assertEquals("p1", viewModel.openedPartyId.value)
    }

    @Test
    fun joinWithBlankCodeIsANoOp() = runTest {
        val api = FakePartyApi()
        val viewModel = PartiesViewModel(PartiesRepository(api))
        dispatcher.scheduler.runCurrent()

        viewModel.join("   ")
        dispatcher.scheduler.runCurrent()

        assertTrue(viewModel.openedPartyId.value == null)
    }
}
