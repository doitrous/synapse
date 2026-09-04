package com.synapse.android.feature.qbank

import com.synapse.android.core.model.Question
import com.synapse.android.core.qbank.LiveSession
import com.synapse.android.core.ui.UiState
import org.junit.Assert.assertEquals
import org.junit.Assert.assertTrue
import org.junit.Test

/**
 * [runnerUiState] in isolation -- a plain function of a [LiveSession] and the
 * [Question]s it was built with, no [RunnerViewModel], no coroutine
 * dispatcher.
 */
class RunnerUiStateTest {

    private val question = Question(
        id = "q-1", subjectId = "cvs", topic = "Heart failure", difficulty = "Moderate",
        vignette = "", stem = "Stem", options = emptyList(), correctLabel = "A",
        explanation = "Explanation", learningObjective = null, estimatedSeconds = null,
        libraryIds = emptyList(), conceptIds = emptyList(),
    )

    private fun session(questionIds: List<String>, idx: Int = 0) = LiveSession(
        questionIds = questionIds, idx = idx, answers = emptyMap(), checked = emptyMap(),
        mode = com.synapse.android.core.qbank.SittingMode.TUTOR, sessionId = "s-1", elapsed = 0,
        visited = emptyList(), reviewing = false, name = "Test", phase = "running", startedAt = "now",
    )

    @Test
    fun `a session with no questions is Loading`() {
        assertEquals(UiState.Loading, runnerUiState(session(emptyList()), listOf(question)))
    }

    @Test
    fun `the current question resolved from the pool is Content`() {
        val result = runnerUiState(session(listOf(question.id)), listOf(question))
        assertEquals(UiState.Content(question), result)
    }

    @Test
    fun `a session naming a question the pool cannot resolve is Error`() {
        val result = runnerUiState(session(listOf("missing-id")), listOf(question))
        assertTrue(result is UiState.Error)
    }

    @Test
    fun `idx pointing past the end is Error, not a crash`() {
        val result = runnerUiState(session(listOf(question.id), idx = 5), listOf(question))
        assertTrue(result is UiState.Error)
    }
}
