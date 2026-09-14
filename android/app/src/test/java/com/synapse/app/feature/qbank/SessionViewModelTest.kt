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

    // --- Save state: a local write failure is surfaced, not swallowed --------

    @Test fun finishMarksSaveStateSavedOnSuccess() = runTest {
        val (vm, _) = viewModel()
        val session = QBankSession.start(questions(), length = 1, mode = QBankSession.Mode.Tutor, seed = 6L)
        vm.begin(session, "qb-test-ok")

        vm.finish()
        dispatcher.scheduler.advanceUntilIdle()

        assertEquals(SessionSaveState.Saved, vm.uiState.value.saveState)
    }

    @Test fun finishSurfacesLocalSaveFailureThenRetrySucceeds() = runTest {
        val recorder = FlakyAttemptRecorder(failuresRemaining = 1)
        val vm = SessionViewModel(recorder).also { it.now = { fixedNow } }
        val session = QBankSession.start(questions(), length = 2, mode = QBankSession.Mode.Tutor, seed = 5L)
        vm.begin(session, "qb-test-fail")
        vm.goTo(0)
        vm.pick(session.questions[0].correctLabel)
        vm.check()

        vm.finish()
        dispatcher.scheduler.advanceUntilIdle()

        // Results are shown regardless (grade is computed), but the failed
        // local write is reported as Failed — never as saved — and nothing
        // was actually persisted.
        assertTrue(vm.uiState.value.result != null)
        assertEquals(SessionSaveState.Failed, vm.uiState.value.saveState)
        assertTrue(recorder.calls.isEmpty())

        vm.retrySave()
        dispatcher.scheduler.advanceUntilIdle()

        assertEquals(SessionSaveState.Saved, vm.uiState.value.saveState)
        assertEquals(1, recorder.calls.size)
    }

    @Test fun hasActiveSessionReflectsWhetherASittingIsLoaded() {
        val (vm, _) = viewModel()
        assertFalse(vm.hasActiveSession())

        val session = QBankSession.start(questions(), length = 1, mode = QBankSession.Mode.Tutor, seed = 7L)
        vm.begin(session, "qb-test-has")

        assertTrue(vm.hasActiveSession())
    }

    // --- Flags: loaded on begin, persisted on toggle -------------------------

    @Test fun beginLoadsPersistedFlagsForQuestionsInThisSitting() = runTest {
        val store = FakeFlaggedQuestionsStore(initial = setOf("Q2"))
        val vm = SessionViewModel(FakeAttemptRecorder(), store).also { it.now = { fixedNow } }
        val session = QBankSession.start(questions(), length = 2, mode = QBankSession.Mode.Tutor, seed = 1L)
        vm.begin(session, "qb-flags-1")
        dispatcher.scheduler.advanceUntilIdle()

        val indexOfQ2 = session.questions.indexOfFirst { it.id == "Q2" }
        vm.goTo(indexOfQ2)
        assertTrue(vm.uiState.value.isFlagged)
    }

    @Test fun togglingAFlagPersistsItWithoutClobberingOtherPersistedFlags() = runTest {
        val store = FakeFlaggedQuestionsStore(initial = setOf("Q-elsewhere"))
        val vm = SessionViewModel(FakeAttemptRecorder(), store).also { it.now = { fixedNow } }
        val session = QBankSession.start(questions(), length = 1, mode = QBankSession.Mode.Tutor, seed = 1L)
        vm.begin(session, "qb-flags-2")
        // Toggle before the async load of persisted flags necessarily lands --
        // this is the race the read-modify-write in toggleFlag guards against.
        vm.toggleFlag()
        dispatcher.scheduler.advanceUntilIdle()

        assertTrue(vm.uiState.value.isFlagged)
        assertEquals(setOf("Q-elsewhere", session.questions[0].id), store.saved)
    }

    @Test fun togglingAnAlreadyFlaggedQuestionUnflagsAndPersistsThat() = runTest {
        val store = FakeFlaggedQuestionsStore(initial = setOf("Q1"))
        val vm = SessionViewModel(FakeAttemptRecorder(), store).also { it.now = { fixedNow } }
        val session = QBankSession.start(questions(), length = 2, mode = QBankSession.Mode.Tutor, seed = 1L)
        vm.begin(session, "qb-flags-3")
        dispatcher.scheduler.advanceUntilIdle()

        val indexOfQ1 = session.questions.indexOfFirst { it.id == "Q1" }
        vm.goTo(indexOfQ1)
        assertTrue(vm.uiState.value.isFlagged)

        vm.toggleFlag()
        dispatcher.scheduler.advanceUntilIdle()

        assertFalse(vm.uiState.value.isFlagged)
        assertEquals(emptySet<String>(), store.saved)
    }
}

private class FakeAttemptRecorder : AttemptRecorder {
    val calls = mutableListOf<Pair<List<AttemptRecord>, Instant>>()

    override suspend fun record(records: List<AttemptRecord>, now: Instant) {
        calls += records to now
    }
}

/** Throws on its first [failuresRemaining] calls, then records normally — models a transient local-write failure. */
private class FlakyAttemptRecorder(private var failuresRemaining: Int) : AttemptRecorder {
    val calls = mutableListOf<Pair<List<AttemptRecord>, Instant>>()

    override suspend fun record(records: List<AttemptRecord>, now: Instant) {
        if (failuresRemaining > 0) {
            failuresRemaining--
            throw RuntimeException("simulated local write failure")
        }
        calls += records to now
    }
}

/** A single mutable persisted set, so a test can assert exactly what the last write left behind. */
private class FakeFlaggedQuestionsStore(initial: Set<String> = emptySet()) : FlaggedQuestionsStore {
    var saved: Set<String> = initial
        private set

    override suspend fun flaggedIds(): Set<String> = saved
    override suspend fun setFlaggedIds(ids: Set<String>, now: Instant) {
        saved = ids
    }
}
