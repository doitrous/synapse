package com.synapse.app.feature.qbank

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.synapse.app.core.qbank.MultiResponseQuestion
import com.synapse.app.core.qbank.QBankScope
import com.synapse.app.core.qbank.QBankSession
import com.synapse.app.core.qbank.QBankSessionId
import com.synapse.app.core.qbank.Question
import com.synapse.app.core.qbank.TopicNode
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.update
import kotlinx.coroutines.launch
import java.time.Instant
import javax.inject.Inject
import kotlin.random.Random

/** The hard ceiling on a sitting's length, regardless of preset or custom entry. */
const val QBANK_MAX_LENGTH = 40

/**
 * What a sitting is drawn from.
 *
 * Only [New] is fully wired: [QBankRepository] projects the shared content
 * ledger into [Question]s but exposes no per-student history (attempts,
 * flags) for this view model to read, so there is no signal yet to build
 * [FlaggedAndMissed] or [Previous] on. Selecting either of them today falls
 * back to the same pool as [New] — **not** a fabricated "flagged" or
 * "previous" set — until a later milestone adds an attempt-history read path
 * to [QBankRepository].
 */
enum class QuestionSource { New, FlaggedAndMissed, Previous }

/**
 * A named scope+length+mode bundle a student can apply in one tap.
 *
 * Only [Everything] touches [QuestionBankUiState.scope] (it selects every
 * topic) — the engine has no notion of which topics a student is "weak" in
 * or which are "coming up" (no adaptive/analytics signal is exposed by
 * [QBankRepository]), so [Weak], [Emergency], and [Demanding] cannot honestly
 * narrow the scope on their own. They only set a sensible mode+length shape;
 * the student still ticks topics themselves via [ScopeChooser]. This is
 * documented here rather than silently guessing a "weak topics" set.
 */
enum class QBankPreset { Weak, Emergency, Demanding, Everything }

/** What [QBankSetupScreen] renders and edits. */
data class QuestionBankUiState(
    val loading: Boolean = true,
    val questions: List<Question> = emptyList(),
    val multiResponseQuestions: List<MultiResponseQuestion> = emptyList(),
    val topics: List<TopicNode> = emptyList(),
    val scope: Set<String> = emptySet(),
    val source: QuestionSource = QuestionSource.New,
    val preset: QBankPreset? = null,
    val mode: QBankSession.Mode = QBankSession.Mode.Tutor,
    val length: Int = 20,
    val customLength: Int? = null,
) {
    /** How many questions [scope] currently resolves to, for the Start button's label. */
    fun poolSize(): Int = QBankScope.poolFor(scope, questions).size
}

/** A one-shot signal that a sitting was built and is ready to run. */
data class SessionStart(val session: QBankSession, val sessionId: String)

/**
 * Drives [QBankSetupScreen]: loads the published (and multi-response)
 * question catalogue, holds the student's scope/source/preset/mode/length
 * picks, and builds a [QBankSession] on [start] — published via
 * [sessionStart] rather than folded into [uiState], since it's a one-time
 * "go do this" event rather than steady-state screen content.
 *
 * [sessionStart] is a plain nullable [StateFlow] rather than a `Channel`/
 * `SharedFlow`: [QuestionBankRoot] reacts to it going non-null in a
 * `LaunchedEffect` and immediately calls [consumeSessionStart] to null it back
 * out, the same "fire once, then reset" shape as a `Channel` event but
 * trivially synchronous to assert against in tests (no separate collector
 * coroutine, no dispatcher to advance).
 */
@HiltViewModel
class QuestionBankViewModel @Inject constructor(
    private val repository: QBankRepository,
) : ViewModel() {

    var now: () -> Instant = Instant::now

    private val _uiState = MutableStateFlow(QuestionBankUiState())
    val uiState: StateFlow<QuestionBankUiState> = _uiState.asStateFlow()

    private val _sessionStart = MutableStateFlow<SessionStart?>(null)
    val sessionStart: StateFlow<SessionStart?> = _sessionStart.asStateFlow()

    init {
        load()
    }

    fun load() {
        viewModelScope.launch {
            _uiState.update { it.copy(loading = true) }
            val questions = repository.publishedQuestions()
            val multiResponse = repository.multiResponseQuestions()
            val topics = QBankScope.topicsFromQuestions(questions)
            _uiState.update {
                it.copy(loading = false, questions = questions, multiResponseQuestions = multiResponse, topics = topics)
            }
        }
    }

    fun onSourceChange(source: QuestionSource) {
        _uiState.update { it.copy(source = source) }
    }

    fun onModeChange(mode: QBankSession.Mode) {
        _uiState.update { it.copy(mode = mode, preset = null) }
    }

    fun onLengthChange(length: Int) {
        _uiState.update { it.copy(length = length.coerceIn(1, QBANK_MAX_LENGTH), customLength = null, preset = null) }
    }

    fun onCustomLengthChange(length: Int) {
        val clamped = length.coerceIn(1, QBANK_MAX_LENGTH)
        _uiState.update { it.copy(length = clamped, customLength = clamped, preset = null) }
    }

    fun onToggleTopic(topicId: String) {
        _uiState.update { s -> s.copy(scope = QBankScope.toggleTopic(s.scope, topicId, s.topics), preset = null) }
    }

    fun onToggleSubtopic(topicId: String, subtopicId: String) {
        _uiState.update { s ->
            s.copy(scope = QBankScope.toggleSubtopic(s.scope, topicId, subtopicId, s.topics), preset = null)
        }
    }

    /** Applies [preset]'s mode+length shape (and, for [QBankPreset.Everything], its scope). */
    fun onPresetSelected(preset: QBankPreset) {
        _uiState.update { s ->
            when (preset) {
                QBankPreset.Everything -> s.copy(
                    preset = preset,
                    scope = s.topics.map { QBankScope.topicKey(it.id) }.toSet(),
                )
                QBankPreset.Weak -> s.copy(preset = preset, mode = QBankSession.Mode.Tutor, length = 10, customLength = null)
                QBankPreset.Emergency -> s.copy(preset = preset, mode = QBankSession.Mode.Timed, length = 20, customLength = null)
                QBankPreset.Demanding -> s.copy(preset = preset, mode = QBankSession.Mode.Timed, length = 40, customLength = null)
            }
        }
    }

    /** Builds the pool from the current scope and, if non-empty, publishes [sessionStart]. */
    fun start() {
        val state = _uiState.value
        val pool = repository.pool(state.scope, state.questions)
        if (pool.isEmpty()) return

        val instant = now()
        val sessionId = QBankSessionId.mint(instant, Random(instant.toEpochMilli()))
        val session = QBankSession.start(pool, state.length, state.mode, seed = instant.toEpochMilli())
        _sessionStart.value = SessionStart(session, sessionId)
    }

    /** Acknowledges the current [sessionStart] event so it doesn't re-fire on recomposition. */
    fun consumeSessionStart() {
        _sessionStart.value = null
    }
}
