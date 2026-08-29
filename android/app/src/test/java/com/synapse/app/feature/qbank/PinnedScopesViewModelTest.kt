package com.synapse.app.feature.qbank

import com.synapse.app.core.qbank.AnswerOption
import com.synapse.app.core.qbank.Question
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.ExperimentalCoroutinesApi
import kotlinx.coroutines.test.StandardTestDispatcher
import kotlinx.coroutines.test.resetMain
import kotlinx.coroutines.test.runTest
import kotlinx.coroutines.test.setMain
import org.junit.After
import org.junit.Assert.assertEquals
import org.junit.Assert.assertFalse
import org.junit.Assert.assertTrue
import org.junit.Before
import org.junit.Test

/**
 * [PinnedScopesViewModel] against a fake [QBankOfflineStore] — proves the
 * "Download for offline" action calls [QBankOfflineStore.pinScopeForOffline]
 * with the right scope/questions and surfaces progress + the pinned list,
 * without needing a real [QBankRepository].
 */
@OptIn(ExperimentalCoroutinesApi::class)
class PinnedScopesViewModelTest {

    private val dispatcher = StandardTestDispatcher()

    @Before fun setUp() { Dispatchers.setMain(dispatcher) }
    @After fun tearDown() { Dispatchers.resetMain() }

    private fun question(id: String) = Question(
        id = id, subjectId = "SYS_CVS", topic = "Heart failure",
        vignette = "...", stem = "...",
        options = listOf(AnswerOption("A", "A", "A")),
        correctLabel = "A", explanation = "...",
    )

    @Test fun downloadCallsPinScopeForOfflineWithTheGivenScopeAndQuestions() = runTest {
        val store = FakeOfflineStore()
        val viewModel = PinnedScopesViewModel(store)
        dispatcher.scheduler.advanceUntilIdle()

        val scope = setOf("t:qt:Heart failure")
        val questions = listOf(question("Q1"), question("Q2"))

        viewModel.download(scope, questions)
        dispatcher.scheduler.advanceUntilIdle()

        assertEquals(1, store.pinCalls.size)
        assertEquals(scope, store.pinCalls.single().first)
        assertEquals(questions, store.pinCalls.single().second)

        val state = viewModel.uiState.value
        assertFalse(state.downloading)
        assertEquals(PinResult(cachedCount = 2, alreadyCachedCount = 0), state.lastResult)
    }

    @Test fun downloadRefreshesThePinnedScopesListAfterward() = runTest {
        val store = FakeOfflineStore()
        val viewModel = PinnedScopesViewModel(store)
        dispatcher.scheduler.advanceUntilIdle()
        assertTrue(viewModel.uiState.value.pinnedScopes.isEmpty())

        val scope = setOf("t:qt:Heart failure")
        viewModel.download(scope, listOf(question("Q1")))
        dispatcher.scheduler.advanceUntilIdle()

        assertTrue(viewModel.uiState.value.pinnedScopes.contains(scope))
    }

    @Test fun removeCallsUnpinAndRefreshes() = runTest {
        val store = FakeOfflineStore()
        val scope = setOf("t:qt:Heart failure")
        store.pinned += scope
        val viewModel = PinnedScopesViewModel(store)
        dispatcher.scheduler.advanceUntilIdle()
        assertTrue(viewModel.uiState.value.pinnedScopes.contains(scope))

        viewModel.remove(scope)
        dispatcher.scheduler.advanceUntilIdle()

        assertEquals(listOf(scope), store.unpinCalls)
        assertFalse(viewModel.uiState.value.pinnedScopes.contains(scope))
    }
}

private class FakeOfflineStore : QBankOfflineStore {
    val pinned = mutableListOf<Set<String>>()
    val pinCalls = mutableListOf<Pair<Set<String>, List<Question>>>()
    val unpinCalls = mutableListOf<Set<String>>()

    override suspend fun pinScopeForOffline(
        scope: Set<String>,
        questions: List<Question>,
        onProgress: (done: Int, total: Int) -> Unit,
    ): PinResult {
        pinCalls += scope to questions
        questions.forEachIndexed { index, _ -> onProgress(index + 1, questions.size) }
        pinned += scope
        return PinResult(cachedCount = questions.size, alreadyCachedCount = 0)
    }

    override suspend fun pinnedScopes(): List<Set<String>> = pinned.toList()

    override suspend fun unpin(scope: Set<String>) {
        unpinCalls += scope
        pinned.remove(scope)
    }
}
