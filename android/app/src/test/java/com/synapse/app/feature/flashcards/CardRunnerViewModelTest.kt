package com.synapse.app.feature.flashcards

import com.synapse.app.core.flashcards.AnkiDefaults
import com.synapse.app.core.flashcards.CardSchedule
import com.synapse.app.core.flashcards.CardState
import com.synapse.app.core.flashcards.DeckCard
import com.synapse.app.core.flashcards.Grade
import com.synapse.app.core.flashcards.StudyCard
import com.synapse.app.core.flashcards.grade
import com.synapse.app.core.flashcards.newCard
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
import java.time.Instant

/**
 * Task 4 (Plan 05 — Flashcards): [CardRunnerViewModel] built against a plain fake [GradeSink] —
 * the same "narrow seam over a heavy-constructor repository" convention as
 * [com.synapse.app.feature.qbank.SessionViewModelTest] against [com.synapse.app.feature.qbank.AttemptRecorder].
 */
@OptIn(ExperimentalCoroutinesApi::class)
class CardRunnerViewModelTest {

    private val dispatcher = StandardTestDispatcher()
    private val now = Instant.parse("2026-08-29T12:00:00Z")

    @Before fun setUp() { Dispatchers.setMain(dispatcher) }
    @After fun tearDown() { Dispatchers.resetMain() }

    private fun card(id: String) = DeckCard(id = id, front = "Front $id", back = "Back $id")

    private fun schedule(state: CardState, dueOffsetMs: Long = 0) = CardSchedule(
        state = state,
        step = 0,
        interval = if (state == CardState.Review) 3 else 0,
        ease = AnkiDefaults.startingEase,
        lapses = 0,
        reps = 0,
        due = now.plusMillis(dueOffsetMs).toString(),
    )

    private fun studySession(vararg entries: Pair<DeckCard, CardSchedule>): StudySession {
        val cards = entries.map { it.first }
        val queue = entries.map { (card, schedule) -> StudyCard(card.id, schedule) }
        return StudySession(deckId = "d1", deckTitle = "Deck One", queue = queue, cardsById = cards.associateBy { it.id })
    }

    @Test
    fun beginPublishesTheFirstCardAndDoesNotRevealTheBackYet() = runTest {
        val viewModel = CardRunnerViewModel(FakeGradeSink())
        viewModel.now = { now }
        val c1 = card("c1")
        viewModel.begin(studySession(c1 to schedule(CardState.New)), "sess-1")

        val state = viewModel.uiState.value
        assertEquals("Front c1", state.front)
        assertFalse(state.revealed)
        assertEquals(1, state.total)
        assertEquals(1, state.position)
        assertFalse(state.finished)
        assertTrue(state.gradeOptions.isEmpty())
    }

    @Test
    fun showAnswerRevealsTheBackAndFourLiveComputedGradeOptions() = runTest {
        val viewModel = CardRunnerViewModel(FakeGradeSink())
        viewModel.now = { now }
        val c1 = card("c1")
        val due = schedule(CardState.Review, dueOffsetMs = -1000)
        viewModel.begin(studySession(c1 to due), "sess-1")

        viewModel.showAnswer()

        val state = viewModel.uiState.value
        assertTrue(state.revealed)
        assertEquals("Back c1", state.back)
        assertEquals(4, state.gradeOptions.size)
        assertEquals(listOf(Grade.Again, Grade.Hard, Grade.Good, Grade.Easy), state.gradeOptions.map { it.grade })
        // Every interval is exactly what `grade()` itself would produce - not a fabricated number.
        state.gradeOptions.forEach { option ->
            val expectedNext = grade(due, option.grade, now, AnkiDefaults)
            assertEquals(formatInterval(expectedNext, now), option.interval)
        }
    }

    @Test
    fun theQueueIsSnapshottedOnceAtBeginAndDoesNotGrowBackMidSession() = runTest {
        val viewModel = CardRunnerViewModel(FakeGradeSink())
        viewModel.now = { now }
        // c1 is due now; c2 is a new card. Grading c1 "Again" schedules it ~1 minute out - still
        // "due" again almost immediately in wall-clock terms, but it must NOT reappear this session.
        val c1 = card("c1")
        val c2 = card("c2")
        viewModel.begin(studySession(c1 to schedule(CardState.Review, dueOffsetMs = -1000), c2 to schedule(CardState.New)), "sess-1")

        assertEquals(2, viewModel.uiState.value.total)

        viewModel.showAnswer()
        viewModel.grade(Grade.Again)

        // Advanced to c2, not looped back to a re-queued c1.
        assertEquals("Front c2", viewModel.uiState.value.front)

        viewModel.showAnswer()
        viewModel.grade(Grade.Good)

        // Session over after exactly the 2 snapshotted cards - not reopened for c1's fast requeue.
        assertTrue(viewModel.uiState.value.finished)
        assertEquals(2, viewModel.uiState.value.studied)
    }

    @Test
    fun gradePersistsTheGradeUpdatedScheduleWithTheCorrectWasNewFlagAndAdvances() = runTest {
        val sink = FakeGradeSink()
        val viewModel = CardRunnerViewModel(sink)
        viewModel.now = { now }
        val c1 = card("c1")
        val newSchedule = newCard(now)
        viewModel.begin(studySession(c1 to newSchedule), "sess-1")

        viewModel.showAnswer()
        viewModel.grade(Grade.Good)
        dispatcher.scheduler.advanceUntilIdle()

        assertEquals(1, sink.calls.size)
        val call = sink.calls.single()
        assertEquals("d1", call.deckId)
        assertEquals("c1", call.cardId)
        assertTrue(call.wasNew)
        assertEquals(grade(newSchedule, Grade.Good, now, AnkiDefaults), call.newSchedule)
        assertEquals(now, call.now)

        assertTrue(viewModel.uiState.value.finished)
    }

    @Test
    fun gradingAnAlreadyReviewCardReportsWasNewFalse() = runTest {
        val sink = FakeGradeSink()
        val viewModel = CardRunnerViewModel(sink)
        viewModel.now = { now }
        val c1 = card("c1")
        viewModel.begin(studySession(c1 to schedule(CardState.Review, dueOffsetMs = -1000)), "sess-1")

        viewModel.showAnswer()
        viewModel.grade(Grade.Good)
        dispatcher.scheduler.advanceUntilIdle()

        assertFalse(sink.calls.single().wasNew)
    }

    @Test
    fun endSummaryReportsStudiedAndGraduatedLaterCorrectly() = runTest {
        val viewModel = CardRunnerViewModel(FakeGradeSink())
        viewModel.now = { now }
        val c1 = card("c1")
        val c2 = card("c2")
        // c1: Easy on a New card graduates straight to Review, `due` days out -> counts as graduated later.
        // c2: Again on a Review card lapses back into Relearning, `due` minutes out -> not graduated later.
        viewModel.begin(
            studySession(
                c1 to newCard(now),
                c2 to schedule(CardState.Review, dueOffsetMs = -1000),
            ),
            "sess-1",
        )

        viewModel.showAnswer()
        viewModel.grade(Grade.Easy)
        viewModel.showAnswer()
        viewModel.grade(Grade.Again)

        val state = viewModel.uiState.value
        assertTrue(state.finished)
        assertEquals(2, state.studied)
        assertEquals(1, state.graduatedLater)
    }

    @Test
    fun emptyQueueFinishesImmediatelyWithZeroStudied() = runTest {
        val viewModel = CardRunnerViewModel(FakeGradeSink())
        viewModel.now = { now }
        viewModel.begin(StudySession("d1", "Deck One", queue = emptyList(), cardsById = emptyMap()), "sess-1")

        val state = viewModel.uiState.value
        assertTrue(state.finished)
        assertEquals(0, state.studied)
        assertEquals(0, state.graduatedLater)
    }

    @Test
    fun beginIsANoOpWhenCalledAgainWithTheSameSessionId() = runTest {
        val viewModel = CardRunnerViewModel(FakeGradeSink())
        viewModel.now = { now }
        val c1 = card("c1")
        viewModel.begin(studySession(c1 to schedule(CardState.Review, dueOffsetMs = -1000)), "sess-1")
        viewModel.showAnswer()
        viewModel.grade(Grade.Good)
        assertTrue(viewModel.uiState.value.finished)

        // A recomposition-driven re-invocation with the same sessionId must not reset progress.
        viewModel.begin(studySession(c1 to schedule(CardState.Review, dueOffsetMs = -1000)), "sess-1")

        assertTrue(viewModel.uiState.value.finished)
        assertEquals(1, viewModel.uiState.value.studied)
    }

    @Test
    fun hasActiveSessionIsFalseUntilBegin() {
        val viewModel = CardRunnerViewModel(FakeGradeSink())
        assertFalse(viewModel.hasActiveSession())
        viewModel.begin(studySession(card("c1") to schedule(CardState.Review, dueOffsetMs = -1000)), "sess-1")
        assertTrue(viewModel.hasActiveSession())
    }

    @Test
    fun noScoreOrAccuracyIsExposedAnywhereInTheUiState() = runTest {
        val viewModel = CardRunnerViewModel(FakeGradeSink())
        viewModel.now = { now }
        viewModel.begin(studySession(card("c1") to schedule(CardState.Review, dueOffsetMs = -1000)), "sess-1")
        viewModel.showAnswer()
        viewModel.grade(Grade.Good)

        // CardRunnerUiState carries only studied/graduatedLater counts - reflectively confirm no
        // field even resembling a score/percentage/correctness tally was added.
        val fieldNames = CardRunnerUiState::class.java.declaredFields.map { it.name.lowercase() }
        val forbidden = listOf("score", "accuracy", "percent", "correct")
        forbidden.forEach { term ->
            assertTrue("unexpected field matching '$term': $fieldNames", fieldNames.none { it.contains(term) })
        }
    }
}

private data class GradeSinkCall(val deckId: String, val cardId: String, val newSchedule: CardSchedule, val wasNew: Boolean, val now: Instant)

private class FakeGradeSink : GradeSink {
    val calls = mutableListOf<GradeSinkCall>()
    override suspend fun persist(deckId: String, cardId: String, newSchedule: CardSchedule, wasNew: Boolean, now: Instant) {
        calls += GradeSinkCall(deckId, cardId, newSchedule, wasNew, now)
    }
}
