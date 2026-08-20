package com.synapse.android.feature.qbank

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewmodel.initializer
import androidx.lifecycle.viewmodel.viewModelFactory
import com.synapse.android.core.model.Question
import com.synapse.android.core.qbank.LiveSession
import com.synapse.android.core.qbank.QuestionState
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow

/**
 * The headline figures for a sitting that has reached `phase == "results"`.
 *
 * [answered] counts questions the student actually picked an option for --
 * not [LiveSession.questionIds]`.size`, which would fold [omitted] into the
 * denominator and understate how many were actually left blank. [omitted]
 * is reported on its own: a question never answered is not a question
 * answered wrong, and folding the two together overstates effort and
 * understates accuracy (this task's brief, step 3).
 */
data class SittingSummary(val answered: Int, val correct: Int, val omitted: Int, val seconds: Int)

/**
 * What [ResultsScreen] shows for the sitting [initialSession] just finished.
 *
 * [session] is a plain snapshot, never mutated here -- a finished sitting is
 * read-only; [RunnerViewModel] is the one class allowed to write
 * [LiveSession.KEY]. [questions] must be resolved from the same ids
 * [LiveSession.questionIds] names, exactly as [RunnerViewModel] requires --
 * this class does no ledger lookup of its own either.
 */
class ResultsViewModel(initialSession: LiveSession, private val questions: List<Question>) : ViewModel() {

    private val questionsById: Map<String, Question> = questions.associateBy { it.id }

    private val _session = MutableStateFlow(initialSession)
    val session: StateFlow<LiveSession> = _session.asStateFlow()

    val summary: StateFlow<SittingSummary> = MutableStateFlow(computeSummary(initialSession)).asStateFlow()

    private fun computeSummary(session: LiveSession): SittingSummary {
        val answered = session.answers.size
        val correct = session.answers.count { (questionId, optionIndex) ->
            val question = questionsById[questionId] ?: return@count false
            val label = question.options.getOrNull(optionIndex)?.label ?: return@count false
            question.isCorrect(label)
        }
        val omitted = session.questionIds.size - answered
        return SittingSummary(answered = answered, correct = correct, omitted = omitted, seconds = session.elapsed)
    }

    /**
     * A simplified port of `RunnerViewModel.stateOf`. A results-phase
     * session is always reviewing, so this collapses straight to
     * CORRECT/WRONG/OMITTED/UNSEEN with no ANSWERED branch -- there is
     * nothing left un-revealed once a sitting has finished.
     */
    fun stateOf(index: Int): QuestionState {
        val current = _session.value
        val questionId = current.questionIds.getOrNull(index) ?: return QuestionState.UNSEEN
        val picked = current.answers[questionId] ?: return QuestionState.OMITTED
        val label = questionsById[questionId]?.options?.getOrNull(picked)?.label
        val correct = label != null && questionsById[questionId]?.isCorrect(label) == true
        return if (correct) QuestionState.CORRECT else QuestionState.WRONG
    }

    companion object {
        fun factory(session: LiveSession, questions: List<Question>) = viewModelFactory {
            initializer { ResultsViewModel(session, questions) }
        }
    }
}
