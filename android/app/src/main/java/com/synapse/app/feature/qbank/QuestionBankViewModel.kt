package com.synapse.app.feature.qbank

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.synapse.app.core.qbank.AttemptRecord
import com.synapse.app.core.qbank.MultiResponseQuestion
import com.synapse.app.core.qbank.QBankCollections
import com.synapse.app.core.qbank.QBankCollections.SessionSummary
import com.synapse.app.core.qbank.QBankScope
import com.synapse.app.core.qbank.QBankSession
import com.synapse.app.core.qbank.QBankSessionId
import com.synapse.app.core.qbank.QBankSessionResult
import com.synapse.app.core.qbank.Question
import com.synapse.app.core.qbank.SessionManifests
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
 * What a new sitting is drawn from — also the four sources the Draw From
 * selector offers. Named to match the derivations in [QBankCollections]:
 * [Incorrect] is "got wrong" (latest verdict wrong), [Omitted] is
 * reached-then-skipped (not merely unseen).
 */
enum class QuestionSource { All, Flagged, Incorrect, Omitted }

/** Which section of the Question Bank hub is on screen. */
enum class HubTab { New, Collections, Previous }

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

/** What [QBankSetupScreen] renders and edits, plus the Revise hub's collections and previous tests. */
data class QuestionBankUiState(
    val loading: Boolean = true,
    val questions: List<Question> = emptyList(),
    val multiResponseQuestions: List<MultiResponseQuestion> = emptyList(),
    val topics: List<TopicNode> = emptyList(),
    val scope: Set<String> = emptySet(),
    val source: QuestionSource = QuestionSource.All,
    val preset: QBankPreset? = null,
    val mode: QBankSession.Mode = QBankSession.Mode.Tutor,
    val length: Int = 20,
    val customLength: Int? = null,
    val hubTab: HubTab = HubTab.New,
    /** [QBankRepository.flaggedIds] — questions flagged for another look. */
    val flaggedIds: Set<String> = emptySet(),
    /** Every attempt this device knows about, across every month. */
    val attempts: List<AttemptRecord> = emptyList(),
    /** [QBankRepository.sessionManifests] — what "omitted" is derived against. */
    val manifests: SessionManifests = emptyMap(),
    /** [QBankRepository.sessionNames] — what a student has renamed each sitting to. */
    val sessionNames: Map<String, String> = emptyMap(),
) {
    val flaggedQuestions: List<Question> get() = QBankCollections.questionsById(questions, flaggedIds)
    val incorrectQuestions: List<Question>
        get() = QBankCollections.questionsById(questions, QBankCollections.incorrectIds(attempts))
    val omittedQuestions: List<Question>
        get() = QBankCollections.questionsById(questions, QBankCollections.omittedIds(manifests, attempts))
    val previousTests: List<SessionSummary> get() = QBankCollections.bySession(attempts)

    /** The questions [source] draws a new sitting from, before [scope] narrows further. */
    fun sourcePool(): List<Question> = when (source) {
        QuestionSource.All -> questions
        QuestionSource.Flagged -> flaggedQuestions
        QuestionSource.Incorrect -> incorrectQuestions
        QuestionSource.Omitted -> omittedQuestions
    }

    /** How many questions [scope] (over [sourcePool]) currently resolves to, for the Start button's label. */
    fun poolSize(): Int = QBankScope.poolFor(scope, sourcePool()).size

    /** The published questions a given finished sitting can still be reopened with. */
    fun reviewableQuestions(sessionId: String): List<Question> {
        val ids = attempts.filter { it.sessionId == sessionId }.map { it.itemId }.toSet()
        return QBankCollections.questionsById(questions, ids)
    }
}

/** A one-shot signal that a sitting was built and is ready to run. */
data class SessionStart(val session: QBankSession, val sessionId: String)

/** A one-shot signal to show a read-only [ResultsScreen] over [questions] — no live sitting involved. */
data class ReviewTarget(val result: QBankSessionResult, val questions: List<Question>)

/**
 * Drives [QBankSetupScreen] and the Revise hub (Flagged & missed, Previous
 * tests): loads the published (and multi-response) question catalogue plus
 * the student's attempt history, flags, session manifests and sitting names;
 * holds the student's scope/source/preset/mode/length picks; and builds a
 * [QBankSession] on [start] (or on any of [testThese], [testScope],
 * [retakeSame], [retakeScope]) — published via [sessionStart] rather than
 * folded into [uiState], since it's a one-time "go do this" event rather than
 * steady-state screen content. [reviewTarget] is the read-only counterpart,
 * for "View" on a collection and "Review answers" on a previous test.
 *
 * Both events are plain nullable [StateFlow]s rather than a `Channel`/
 * `SharedFlow`: [QuestionBankRoot] reacts to either going non-null in a
 * `LaunchedEffect` and immediately calls the matching `consume...` to null it
 * back out — the same "fire once, then reset" shape as a `Channel` event but
 * trivially synchronous to assert against in tests.
 *
 * "Previous tests" deliberately has no "resume" affordance for an
 * in-progress, unsubmitted sitting: web persists a live sitting to disk on
 * every pause so one survives being closed and reopened, but Android's
 * [SessionViewModel] holds a sitting only in memory (it survives a
 * configuration change, not process death), and no [AttemptRecord] exists for
 * a question until the whole sitting finishes. There is nothing a rebuilt
 * [QuestionBankViewModel] could show as "still open" to resume, so the list
 * here only ever holds finished sittings. Persisting a live sitting to disk
 * (mirroring web's `LiveSession`) would close this gap; it's a separate,
 * larger change than extending the hub with the collections and history this
 * task asks for.
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

    private val _reviewTarget = MutableStateFlow<ReviewTarget?>(null)
    val reviewTarget: StateFlow<ReviewTarget?> = _reviewTarget.asStateFlow()

    init {
        load()
    }

    /** (Re)loads everything the hub is built from. Safe to call again after a sitting finishes, a rename, or a delete. */
    fun load() {
        viewModelScope.launch {
            _uiState.update { it.copy(loading = true) }
            val questions = repository.publishedQuestions()
            val multiResponse = repository.multiResponseQuestions()
            val topics = QBankScope.topicsFromQuestions(questions)
            val attempts = repository.allAttemptRecords()
            val flaggedIds = repository.flaggedIds()
            val manifests = repository.sessionManifests()
            val sessionNames = repository.sessionNames()
            _uiState.update {
                it.copy(
                    loading = false,
                    questions = questions,
                    multiResponseQuestions = multiResponse,
                    topics = topics,
                    attempts = attempts,
                    flaggedIds = flaggedIds,
                    manifests = manifests,
                    sessionNames = sessionNames,
                )
            }
        }
    }

    fun onHubTabChange(tab: HubTab) {
        _uiState.update { it.copy(hubTab = tab) }
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

    /** Builds the pool from the current source+scope and, if non-empty, publishes [sessionStart]. */
    fun start() {
        val state = _uiState.value
        val pool = repository.pool(state.scope, state.sourcePool())
        if (pool.isEmpty()) return
        beginSession(pool, length = state.length, title = null)
    }

    /** "Test these": drill exactly [questions] (shuffled, capped at the current length choice). */
    fun testThese(questions: List<Question>, title: String) {
        if (questions.isEmpty()) return
        beginSession(questions, length = _uiState.value.length, title = title)
    }

    /**
     * "Test this scope": a fresh sitting over the topics [questions] came from,
     * including material the student has not seen — unlike [testThese], which
     * drills exactly the questions handed to it.
     */
    fun testScope(questions: List<Question>, title: String) {
        if (questions.isEmpty()) return
        val state = _uiState.value
        val derivedScope = QBankCollections.scopeFromQuestions(questions, state.topics)
        val pool = QBankScope.poolFor(derivedScope, state.questions)
        if (pool.isEmpty()) return
        beginSession(pool, length = state.length, title = "$title · same scope")
    }

    /** Sit a previous test's exact questions again, reshuffled, as a new sitting. */
    fun retakeSame(sessionId: String) {
        val state = _uiState.value
        val rebuilt = state.reviewableQuestions(sessionId)
        if (rebuilt.isEmpty()) return
        val name = state.sessionNames[sessionId]?.trim().let { if (it.isNullOrBlank()) "Untitled test" else it }
        beginSession(rebuilt, length = rebuilt.size, title = "$name · retake")
    }

    /** A fresh sitting over the subjects a previous test covered — including its own questions again. */
    fun retakeScope(summary: SessionSummary) {
        val state = _uiState.value
        val wanted = summary.subjectIds.toSet()
        val pool = state.questions.filter { it.subjectId in wanted }
        if (pool.isEmpty()) return
        val label = if (summary.subjectIds.size == 1) summary.subjectIds.single() else "Mixed"
        beginSession(pool, length = summary.answered.coerceAtLeast(1), title = "$label · Test ${state.previousTests.size + 1}")
    }

    /** "View" on a Collection: a read-only [ResultsScreen] built from the freshest attempt on record for each question. */
    fun reviewCollection(questions: List<Question>) {
        if (questions.isEmpty()) return
        val result = QBankCollections.latestResultFor(questions, _uiState.value.attempts)
        _reviewTarget.value = ReviewTarget(result, questions)
    }

    /** "Review answers" on a previous test: a read-only [ResultsScreen] built from that sitting's own records. */
    fun reviewSession(sessionId: String) {
        val state = _uiState.value
        val questions = state.reviewableQuestions(sessionId)
        if (questions.isEmpty()) return
        val result = QBankCollections.sessionResult(sessionId, questions, state.attempts)
        _reviewTarget.value = ReviewTarget(result, questions)
    }

    fun renameSession(sessionId: String, name: String) {
        viewModelScope.launch {
            repository.renameSession(sessionId, name, now())
            _uiState.update { it.copy(sessionNames = repository.sessionNames()) }
        }
    }

    fun deleteSession(sessionId: String) {
        viewModelScope.launch {
            repository.deleteSession(sessionId, now())
            load()
        }
    }

    /** Shuffles [pool] into a sitting of [length], files its manifest (and, if given, its [title]), then publishes [sessionStart]. */
    private fun beginSession(pool: List<Question>, length: Int, title: String?) {
        val instant = now()
        val sessionId = QBankSessionId.mint(instant, Random(instant.toEpochMilli()))
        val session = QBankSession.start(pool, length, _uiState.value.mode, seed = instant.toEpochMilli())
        viewModelScope.launch {
            repository.recordSessionManifest(sessionId, session.questions.map { it.id }, instant)
            if (!title.isNullOrBlank()) repository.renameSession(sessionId, title, instant)
        }
        _sessionStart.value = SessionStart(session, sessionId)
    }

    /** Acknowledges the current [sessionStart] event so it doesn't re-fire on recomposition. */
    fun consumeSessionStart() {
        _sessionStart.value = null
    }

    /** Acknowledges the current [reviewTarget] event so it doesn't re-fire on recomposition. */
    fun consumeReviewTarget() {
        _reviewTarget.value = null
    }
}
