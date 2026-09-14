package com.synapse.app.feature.essays

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.synapse.app.core.essays.EssayQuestion
import com.synapse.app.core.essays.WrittenQuestion
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.Job
import kotlinx.coroutines.delay
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch
import java.time.Instant
import javax.inject.Inject

/**
 * Long enough that typing a sentence is one write, short enough that a pause
 * to think has already saved. Ported from web's `WRITE_DEBOUNCE_MS`
 * (`src/lib/stateStore.ts`) — a textarea should send one request, not one per
 * keystroke.
 */
private const val DRAFT_DEBOUNCE_MS = 400L

/** What [EssaysScreen] renders. */
sealed interface EssaysUiState {
    data object Loading : EssaysUiState

    data class Content(
        val essaysById: Map<String, EssayQuestion>,
        val essayAnswers: Map<String, EssayAnswer>,
        val writtenById: Map<String, WrittenQuestion>,
        val writtenAnswers: Map<String, WrittenAnswer>,
    ) : EssaysUiState
}

/**
 * Drives the Essays surface: loads the practice-essay and written-question
 * catalogues plus the student's own answers, then owns drafting, revealing
 * and self-marking for both.
 *
 * Text edits update [uiState] immediately (so a text field never lags behind
 * typing) and are persisted through [EssaysRepository] after
 * [DRAFT_DEBOUNCE_MS] of no further edits to the same question — one job per
 * question id, replaced on every keystroke. Reveal and self-mark ticks are
 * not prose a student is still composing, so they persist immediately.
 */
@HiltViewModel
class EssaysViewModel @Inject constructor(
    private val repository: EssaysRepository,
) : ViewModel() {

    var now: () -> Instant = Instant::now

    private val _uiState = MutableStateFlow<EssaysUiState>(EssaysUiState.Loading)
    val uiState: StateFlow<EssaysUiState> = _uiState.asStateFlow()

    private val essayDraftJobs = mutableMapOf<String, Job>()
    private val writtenDraftJobs = mutableMapOf<String, Job>()

    init {
        load()
    }

    fun load() {
        viewModelScope.launch {
            if (_uiState.value !is EssaysUiState.Content) {
                _uiState.value = EssaysUiState.Loading
            }
            _uiState.value = buildContent()
        }
    }

    private suspend fun buildContent(): EssaysUiState.Content {
        val essays = repository.essays()
        val written = repository.writtenQuestions()
        return EssaysUiState.Content(
            essaysById = essays.associateBy { it.id },
            essayAnswers = repository.essayAnswers(),
            writtenById = written.associateBy { it.id },
            writtenAnswers = repository.writtenAnswers(),
        )
    }

    // --- Essays -----------------------------------------------------------------

    fun saveEssayDraft(essayId: String, text: String) {
        updateEssayLocal(essayId) { it.copy(text = text) }
        essayDraftJobs[essayId]?.cancel()
        essayDraftJobs[essayId] = viewModelScope.launch {
            delay(DRAFT_DEBOUNCE_MS)
            persistEssay(essayId)
        }
    }

    fun revealEssay(essayId: String) {
        updateEssayLocal(essayId) { it.copy(revealed = true) }
        persistEssayNow(essayId)
    }

    fun toggleEssayPoint(essayId: String, pointId: String) {
        updateEssayLocal(essayId) { answer ->
            val ticked = answer.ticked.orEmpty()
            val nextTicked = if (pointId in ticked) ticked - pointId else ticked + pointId
            answer.copy(ticked = nextTicked, revealed = true)
        }
        persistEssayNow(essayId)
    }

    private fun updateEssayLocal(essayId: String, transform: (EssayAnswer) -> EssayAnswer) {
        val current = _uiState.value as? EssaysUiState.Content ?: return
        val existing = current.essayAnswers[essayId] ?: EssayAnswer()
        _uiState.value = current.copy(essayAnswers = current.essayAnswers + (essayId to transform(existing)))
    }

    private fun persistEssayNow(essayId: String) {
        essayDraftJobs[essayId]?.cancel()
        viewModelScope.launch { persistEssay(essayId) }
    }

    private suspend fun persistEssay(essayId: String) {
        val answer = (_uiState.value as? EssaysUiState.Content)?.essayAnswers?.get(essayId) ?: return
        repository.saveEssayAnswer(essayId, answer.text, answer.ticked, answer.revealed, now())
    }

    // --- Written exam questions ---------------------------------------------------

    fun saveWrittenDraft(questionId: String, partId: String, text: String) {
        updateWrittenLocal(questionId) { it.copy(text = it.text + (partId to text)) }
        writtenDraftJobs[questionId]?.cancel()
        writtenDraftJobs[questionId] = viewModelScope.launch {
            delay(DRAFT_DEBOUNCE_MS)
            persistWritten(questionId)
        }
    }

    fun revealWritten(questionId: String) {
        updateWrittenLocal(questionId) { it.copy(revealed = true) }
        persistWrittenNow(questionId)
    }

    fun toggleWrittenPoint(questionId: String, partId: String, point: String) {
        updateWrittenLocal(questionId) { answer ->
            val partTicks = answer.ticks?.get(partId).orEmpty()
            val nextPartTicks = if (point in partTicks) partTicks - point else partTicks + point
            answer.copy(ticks = answer.ticks.orEmpty() + (partId to nextPartTicks), revealed = true)
        }
        persistWrittenNow(questionId)
    }

    private fun updateWrittenLocal(questionId: String, transform: (WrittenAnswer) -> WrittenAnswer) {
        val current = _uiState.value as? EssaysUiState.Content ?: return
        val existing = current.writtenAnswers[questionId] ?: WrittenAnswer()
        _uiState.value = current.copy(writtenAnswers = current.writtenAnswers + (questionId to transform(existing)))
    }

    private fun persistWrittenNow(questionId: String) {
        writtenDraftJobs[questionId]?.cancel()
        viewModelScope.launch { persistWritten(questionId) }
    }

    private suspend fun persistWritten(questionId: String) {
        val answer = (_uiState.value as? EssaysUiState.Content)?.writtenAnswers?.get(questionId) ?: return
        repository.saveWrittenAnswer(questionId, answer.text, answer.ticks, answer.revealed, now())
    }
}
