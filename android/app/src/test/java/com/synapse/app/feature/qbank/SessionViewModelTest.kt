package com.synapse.app.feature.qbank

import com.synapse.app.core.qbank.AnswerOption
import com.synapse.app.core.qbank.AttemptRecord
import com.synapse.app.core.qbank.QBankSession
import com.synapse.app.core.qbank.Question
import com.synapse.app.core.qbank.attemptId
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.ExperimentalCoroutinesApi
import kotlinx.coroutines.test.StandardTestDispatcher
import kotlinx.coroutines.test.resetMain
import kotlinx.coroutines.test.runTest
import kotlinx.coroutines.test.setMain
import org.junit.After
import org.junit.Assert.assertEquals
import org.junit.Assert.assertFalse
import org.junit.Assert.assertNull
import org.junit.Assert.assertTrue
import org.junit.Before
import org.junit.Test
import java.time.Instant

/**
 * [SessionViewModel] built against a fake [AttemptRecorder] and a fixed [SessionViewModel.now],
 * over a small in-memory pool — no Hilt, no [QBankRepository].
 */
@OptIn(ExperimentalCoroutinesApi::class)
class SessionViewModelTest {

    private val dispatcher = StandardTestDispatcher()
    private val fixedNow = Instant.parse("2026-08-29T12:00:00Z")

    @Before fun setUp() { Dispatchers.setMain(dispatcher) }
    @After fun tearDown() { Dispatchers.resetMain() }

    private fun questions() = listOf(
        Question(
            id = "Q1", subjectId = "SYS_CVS", topic = "Heart failure",
            vignette = "A patient with HFrEF...", stem = "Which mechanism explains this?",
            options = listOf(
                AnswerOption("A", "Increases cardiac output", "Wrong."),
                AnswerOption("B", "Opposes chronic sympathetic activation", "Correct."),
            ),
            correctLabel = "B", explanation = "Chronic sympathetic activation is toxic.",
            conceptIds = listOf("C1"),
        ),
        Question(
            id = "Q2", subjectId = "SYS_CVS", topic = "Heart failure",
            vignette = "A second patient...", stem = "Which is true?",
            options = listOf(
                AnswerOption("A", "Correct one", "Correct."),
                AnswerOption("B", "Wrong one", "Wrong."),
            ),
            correctLabel = "A", explanation = "Explained.",
        ),
    )

    private fun viewModel(recorder: FakeAttemptRecorder = FakeAttemptRecorder()): Pair<SessionViewModel, FakeAttemptRecorder> {
        val vm = SessionViewModel(recorder)
        vm.now = { fixedNow }
        return vm to recorder
    }

    // --- Tutor: pick -> check reveals graded state --------------------------

    @Test fun tutorPickThenCheckRevealsGradedState() {
        val (vm, _) = viewModel()
        val session = QBankSession.start(questions(), length = 2, mode = QBankSession.Mode.Tutor, seed = 1L)
        vm.begin(session, "qb-test-1")

        vm.pick("A") // wrong answer for whichever question landed at index 0
        assertFalse(vm.uiState.value.isChecked)

        vm.check()

        val state = vm.uiState.value
        assertTrue(state.isChecked)
        assertEquals("A", state.pickedLabel)
    }

    @Test fun tutorFinishProducesTheRightScore() = runTest {
        val (vm, recorder) = viewModel()
        // Fixed seed => deterministic order; verify by reading the actual order from the session.
        val session = QBankSession.start(questions(), length = 2, mode = QBankSession.Mode.Tutor, seed = 1L)
        val orderedIds = session.questions.map { it.id }
        vm.begin(session, "qb-test-2")

        // Answer both correctly.
        for (i in orderedIds.indices) {
            vm.goTo(i)
            val correctLabel = session.questions[i].correctLabel
            vm.pick(correctLabel)
            vm.check()
        }

        vm.finish()
        dispatcher.scheduler.advanceUntilIdle()

        val result = vm.uiState.value.result
        assertTrue(result != null)
        assertEquals(2, result!!.correct)
        assertEquals(2, result.total)
        assertEquals(1, recorder.calls.size)
    }

    // --- Timed: unchecked answers are graded at finish -----------------------

    @Test fun timedGradesAnsweredButUncheckedQuestionsAtFinish() = runTest {
        val (vm, recorder) = viewModel()
        val session = QBankSession.start(questions(), length = 2, mode = QBankSession.Mode.Timed, seed = 2L)
        vm.begin(session, "qb-test-3")

        // Pick correct answers for both, but never call check() (Timed defers grading).
        for (i in session.questions.indices) {
            vm.goTo(i)
            vm.pick(session.questions[i].correctLabel)
        }
        assertFalse(vm.uiState.value.isChecked) // still ungraded mid-session

        vm.finish()
        dispatcher.scheduler.advanceUntilIdle()

        val result = vm.uiState.value.result
        assertEquals(2, result!!.correct)
        assertEquals(2, result.total)

        val records = recorder.calls.single().first
        assertTrue(records.all { it.correct == true })
    }

    // --- finish() builds the expected AttemptRecords -------------------------

    @Test fun finishBuildsExpectedAttemptRecordsAndCallsRecorderExactlyOnce() = runTest {
        val (vm, recorder) = viewModel()
        val session = QBankSession.start(questions(), length = 2, mode = QBankSession.Mode.Tutor, seed = 3L)
        val sessionId = "qb-test-4"
        vm.begin(session, sessionId)

        val q0 = session.questions[0]
        val q1 = session.questions[1]
        vm.goTo(0)
        vm.pick(q0.correctLabel)
        vm.check()
        vm.goTo(1)
        // Leave q1 entirely unanswered.

        vm.finish()
        dispatcher.scheduler.advanceUntilIdle()

        assertEquals(1, recorder.calls.size)
        val (records, recordedNow) = recorder.calls.single()
        assertEquals(fixedNow, recordedNow)
        assertEquals(2, records.size)

        val r0 = records.single { it.itemId == q0.id }
        assertEquals(attemptId(sessionId, "qbank", q0.id), r0.id)
        assertEquals(sessionId, r0.sessionId)
        assertEquals(q0.subjectId, r0.subjectId)
        assertEquals(q0.topic, r0.topic)
        assertEquals(q0.difficulty, r0.difficulty)
        assertEquals(q0.conceptIds, r0.conceptIds)
        assertEquals(true, r0.correct)
        assertEquals(q0.options.indexOfFirst { it.label == q0.correctLabel }, r0.selectedIndex)
        assertEquals(q0.options.indexOfFirst { it.label == q0.correctLabel }, r0.correctIndex)

        val r1 = records.single { it.itemId == q1.id }
        assertNull(r1.selectedIndex)
        assertEquals(false, r1.correct)
    }

    // --- Timer: background pauses accumulation; resume requires an explicit call ---

    @Test fun backgroundingPausesTheTimerAndForegroundAloneDoesNotResumeIt() {
        val (vm, _) = viewModel()
        val session = QBankSession.start(questions(), length = 2, mode = QBankSession.Mode.Tutor, seed = 4L)
        vm.begin(session, "qb-test-5")

        vm.tick()
        vm.tick()
        assertEquals(2, vm.uiState.value.elapsedSeconds)

        vm.onAppBackground()
        vm.tick()
        vm.tick()
        assertEquals(2, vm.uiState.value.elapsedSeconds) // no accumulation while paused
        assertTrue(vm.uiState.value.isPaused)

        vm.onAppForeground() // deliberately does not resume on its own
        vm.tick()
        assertEquals(2, vm.uiState.value.elapsedSeconds)
        assertTrue(vm.uiState.value.isPaused)

        vm.resumeTimer() // the explicit call
        vm.tick()
        assertEquals(3, vm.uiState.value.elapsedSeconds)
        assertFalse(vm.uiState.value.isPaused)
    }
}

private class FakeAttemptRecorder : AttemptRecorder {
    val calls = mutableListOf<Pair<List<AttemptRecord>, Instant>>()

    override suspend fun record(records: List<AttemptRecord>, now: Instant) {
        calls += records to now
    }
}
