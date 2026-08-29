package com.synapse.app.feature.flashcards

import androidx.compose.ui.test.assertCountEquals
import androidx.compose.ui.test.assertIsDisplayed
import androidx.compose.ui.test.assertTextEquals
import androidx.compose.ui.test.junit4.createComposeRule
import androidx.compose.ui.test.onAllNodesWithTag
import androidx.compose.ui.test.onNodeWithTag
import androidx.compose.ui.test.performClick
import com.synapse.app.core.flashcards.AnkiDefaults
import com.synapse.app.core.flashcards.CardSchedule
import com.synapse.app.core.flashcards.CardState
import com.synapse.app.core.flashcards.DeckCard
import com.synapse.app.core.flashcards.Grade
import com.synapse.app.core.flashcards.StudyCard
import org.junit.Rule
import org.junit.Test
import org.junit.runner.RunWith
import org.robolectric.RobolectricTestRunner
import java.time.Instant

/**
 * Exercises [CardRunnerScreen] built directly against a plain [CardRunnerViewModel] (no Hilt) —
 * the same convention as [com.synapse.app.feature.qbank.SessionRunnerScreenTest] against
 * [com.synapse.app.feature.qbank.SessionViewModel].
 */
@RunWith(RobolectricTestRunner::class)
class CardRunnerScreenTest {

    @get:Rule
    val rule = createComposeRule()

    private val now = Instant.parse("2026-08-29T12:00:00Z")

    private fun session(): StudySession {
        val c1 = DeckCard("c1", "What is preload?", "Volume before contraction")
        val c2 = DeckCard("c2", "What is afterload?", "Resistance the heart pumps against")
        val schedule = CardSchedule(
            state = CardState.Review,
            step = 0,
            interval = 3,
            ease = AnkiDefaults.startingEase,
            lapses = 0,
            reps = 1,
            due = now.minusSeconds(60).toString(),
        )
        return StudySession(
            deckId = "deck-1",
            deckTitle = "Cardio",
            queue = listOf(StudyCard("c1", schedule), StudyCard("c2", schedule)),
            cardsById = mapOf(c1.id to c1, c2.id to c2),
        )
    }

    @Test
    fun showAnswerRevealsTheBackAndTheFourGradeButtons() {
        val viewModel = CardRunnerViewModel(NoOpGradeSink())
        viewModel.now = { now }
        viewModel.begin(session(), "runner-test-1")

        rule.setContent { CardRunnerScreen(onLeave = {}, viewModel = viewModel) }

        rule.onNodeWithTag(CARD_RUNNER_FRONT_TAG).assertTextEquals("What is preload?")
        rule.onAllNodesWithTag(CARD_RUNNER_BACK_TAG).assertCountEquals(0)

        rule.onNodeWithTag(CARD_RUNNER_SHOW_ANSWER_TAG).performClick()

        rule.onNodeWithTag(CARD_RUNNER_BACK_TAG).assertTextEquals("Volume before contraction")
        Grade.entries.forEach { grade -> rule.onNodeWithTag(gradeButtonTag(grade)).assertIsDisplayed() }
    }

    @Test
    fun tappingAGradeAdvancesTheProgressMeterToTheNextCard() {
        val viewModel = CardRunnerViewModel(NoOpGradeSink())
        viewModel.now = { now }
        viewModel.begin(session(), "runner-test-2")

        rule.setContent { CardRunnerScreen(onLeave = {}, viewModel = viewModel) }

        rule.onNodeWithTag(CARD_RUNNER_PROGRESS_TAG).assertTextEquals("1 / 2")

        rule.onNodeWithTag(CARD_RUNNER_SHOW_ANSWER_TAG).performClick()
        rule.onNodeWithTag(gradeButtonTag(Grade.Good)).performClick()

        rule.onNodeWithTag(CARD_RUNNER_PROGRESS_TAG).assertTextEquals("2 / 2")
        rule.onNodeWithTag(CARD_RUNNER_FRONT_TAG).assertTextEquals("What is afterload?")
        // The answer must re-hide for the next card, not carry the previous reveal forward.
        rule.onNodeWithTag(CARD_RUNNER_SHOW_ANSWER_TAG).assertIsDisplayed()
    }

    @Test
    fun gradingTheLastCardShowsTheSessionCompleteSummaryWithNoScore() {
        val viewModel = CardRunnerViewModel(NoOpGradeSink())
        viewModel.now = { now }
        val onlyCard = DeckCard("c1", "Front", "Back")
        val schedule = CardSchedule(
            state = CardState.Review, step = 0, interval = 3, ease = AnkiDefaults.startingEase,
            lapses = 0, reps = 1, due = now.minusSeconds(60).toString(),
        )
        viewModel.begin(
            StudySession("deck-1", "Cardio", listOf(StudyCard("c1", schedule)), mapOf(onlyCard.id to onlyCard)),
            "runner-test-3",
        )

        rule.setContent { CardRunnerScreen(onLeave = {}, viewModel = viewModel) }

        rule.onNodeWithTag(CARD_RUNNER_SHOW_ANSWER_TAG).performClick()
        rule.onNodeWithTag(gradeButtonTag(Grade.Good)).performClick()

        rule.onNodeWithTag(CARD_RUNNER_SUMMARY_TAG).assertIsDisplayed()
        rule.onNodeWithTag(CARD_RUNNER_DONE_BUTTON_TAG).assertIsDisplayed()
    }
}

private class NoOpGradeSink : GradeSink {
    override suspend fun persist(deckId: String, cardId: String, newSchedule: CardSchedule, wasNew: Boolean, now: Instant) {}
}
