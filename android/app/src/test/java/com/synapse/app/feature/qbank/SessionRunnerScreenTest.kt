package com.synapse.app.feature.qbank

import androidx.compose.ui.test.assertIsDisplayed
import androidx.compose.ui.test.junit4.createComposeRule
import androidx.compose.ui.test.onNodeWithTag
import androidx.compose.ui.test.performClick
import androidx.compose.ui.test.performScrollTo
import com.synapse.app.core.qbank.AnswerOption
import com.synapse.app.core.qbank.AttemptRecord
import com.synapse.app.core.qbank.QBankSession
import com.synapse.app.core.qbank.Question
import org.junit.Rule
import org.junit.Test
import org.junit.runner.RunWith
import org.robolectric.RobolectricTestRunner
import org.robolectric.annotation.Config
import java.time.Instant

/**
 * Exercises [SessionRunnerScreen] in Tutor mode: picking an option and tapping Check reveals
 * the per-question explanation and the navigator marks that question Correct/Wrong — built
 * directly against a plain [SessionViewModel] (no Hilt), the same convention as
 * [com.synapse.app.feature.auth.LoginScreenTest] constructing [com.synapse.app.feature.auth.AuthViewModel] directly.
 *
 * [Config.qualifiers] widens Robolectric's default (tiny, 320x470px) viewport so the whole
 * runner content — vignette, options, explanation, note field, and the navigator's own
 * internal grid — fits without relying on nested-scrollable [performScrollTo] behavior, which
 * doesn't reliably reach across a scrollable-inside-scrollable boundary (the navigator's grid
 * sits inside the runner's own scrolling column).
 */
@RunWith(RobolectricTestRunner::class)
@Config(qualifiers = "w411dp-h1500dp")
class SessionRunnerScreenTest {

    @get:Rule
    val rule = createComposeRule()

    private fun question() = Question(
        id = "Q1", subjectId = "SYS_CVS", topic = "Heart failure",
        vignette = "A patient with HFrEF presents to clinic.",
        stem = "Which mechanism explains the benefit of beta blockade?",
        options = listOf(
            AnswerOption("A", "Increases cardiac output", "Wrong: beta blockers reduce, not increase, contractility acutely."),
            AnswerOption("B", "Opposes chronic sympathetic activation", "Correct: this is the basis of beta blockade in HFrEF."),
        ),
        correctLabel = "B",
        explanation = "Chronic sympathetic activation is toxic to a failing heart.",
    )

    @Test
    fun pickingTheCorrectOptionThenCheckingRevealsExplanationAndMarksNavigatorCorrect() {
        val viewModel = SessionViewModel(NoOpAttemptRecorder())
        val session = QBankSession.start(listOf(question()), length = 1, mode = QBankSession.Mode.Tutor, seed = 1L)
        viewModel.begin(session, "qb-runner-test-1")

        rule.setContent { SessionRunnerScreen(onLeave = {}, viewModel = viewModel) }

        rule.onNodeWithTag(optionRowTag("B")).performScrollTo().performClick()
        rule.onNodeWithTag(QBANK_CHECK_BUTTON_TAG).performClick()

        rule.onNodeWithTag(QBANK_EXPLANATION_TAG).performScrollTo().assertIsDisplayed()
        rule.onNodeWithTag(navigatorItemTag(0)).performScrollTo().assertIsDisplayed()
        assert(viewModel.uiState.value.isChecked)
        assert(session.navState(0, currentIndex = 0) == QBankSession.NavState.Correct)
    }

    @Test
    fun pickingTheWrongOptionThenCheckingMarksNavigatorWrong() {
        val viewModel = SessionViewModel(NoOpAttemptRecorder())
        val session = QBankSession.start(listOf(question()), length = 1, mode = QBankSession.Mode.Tutor, seed = 1L)
        viewModel.begin(session, "qb-runner-test-2")

        rule.setContent { SessionRunnerScreen(onLeave = {}, viewModel = viewModel) }

        rule.onNodeWithTag(optionRowTag("A")).performScrollTo().performClick()
        rule.onNodeWithTag(QBANK_CHECK_BUTTON_TAG).performClick()

        rule.onNodeWithTag(QBANK_EXPLANATION_TAG).performScrollTo().assertIsDisplayed()
        assert(session.navState(0, currentIndex = 0) == QBankSession.NavState.Wrong)
    }
}

private class NoOpAttemptRecorder : AttemptRecorder {
    override suspend fun record(records: List<AttemptRecord>, now: Instant) {}
}
