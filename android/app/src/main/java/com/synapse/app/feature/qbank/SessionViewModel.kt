package com.synapse.app.feature.qbank

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.synapse.app.core.qbank.AttemptRecord
import com.synapse.app.core.qbank.QBankSession
import com.synapse.app.core.qbank.QBankSessionResult
import com.synapse.app.core.qbank.Question
import com.synapse.app.core.qbank.attemptId
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.CancellationException
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch
import java.time.Instant
import javax.inject.Inject

/** A default when a question carries no [Question.estimatedSeconds] of its own. */
private const val DEFAULT_SECONDS_PER_QUESTION = 90

/**
 * Where a finished sitting's attempts stand with local persistence.
 *
 * [Saving] while the write is in flight, [Saved] once it lands, [Failed] if a
 * genuine **local** write error occurred — the last is surfaced to the
 * student (with a retry), never reported as saved. This is *not* about the
 * best-effort leaderboard POST, which [QBankRepository] swallows internally.
 */
enum class SessionSaveState { Saving, Saved, Failed }

/**
 * What [SessionRunnerScreen] (and [ResultsScreen], once [result] lands) renders.
 *
 * [timerDisplaySeconds] is what the screen shows: elapsed time in
 * [QBankSession.Mode.Tutor], or (allotted − elapsed), floored at zero, in
 * [QBankSession.Mode.Timed]. [isOvertime] flags a [QBankSession.Mode.Timed]
 * sitting that has run past its allotted time — the timer keeps counting
 * (via [elapsedSeconds]) so [finish] can report the overrun, but the display
 * value stops shrinking once it hits zero.
 */
data class SessionUiState(
    val index: Int = 0,
    val question: Question? = null,
    val total: Int = 0,
    val pickedLabel: String? = null,
    val isChecked: Boolean = false,
    val mode: QBankSession.Mode = QBankSession.Mode.Tutor,
    val navStates: List<QBankSession.NavState> = emptyList(),
    /** The sitting's question ids, in fixed order — lets the navigator map a grid index to a flagged/note lookup. */
    val questionIds: List<String> = emptyList(),
    val flaggedIds: Set<String> = emptySet(),
    val notes: Map<String, String> = emptyMap(),
    val crossedOut: Map<String, Set<String>> = emptyMap(),
    val elapsedSeconds: Int = 0,
    val timerDisplaySeconds: Int = 0,
    val isOvertime: Boolean = false,
    val isPaused: Boolean = false,
    val result: QBankSessionResult? = null,
    val saveState: SessionSaveState = SessionSaveState.Saved,
) {
    val isFlagged: Boolean get() = question?.id in flaggedIds
    val currentNote: String get() = question?.let { notes[it.id] }.orEmpty()
    val currentCrossedOut: Set<String> get() = question?.let { crossedOut[it.id] }.orEmpty()
    val isLast: Boolean get() = index == total - 1
    val isFirst: Boolean get() = index == 0
}

/**
 * Drives one [QBankSession]: navigation, picking/checking answers, per-option
 * cross-out, flags, private notes, a timer, and finishing into a graded
 * [QBankSessionResult].
 *
 * [begin] hands this view model a session built by [QuestionBankViewModel] —
 * a `SavedStateHandle`-based rebuild would be overkill for a single sitting
 * that doesn't need to survive process death independently of the rest of
 * the flow. Calling [begin] again with the same [sessionId] is a no-op, so a
 * recomposition-driven re-invocation (e.g. from a `LaunchedEffect(sessionId)`)
 * doesn't reset progress.
 *
 * The 1-second timer is deliberately **not** a coroutine loop owned by this
 * view model: [tick] is a plain, synchronous state update, driven in
 * production by the runner screen's own `LaunchedEffect` (`delay(1000)` then
 * `tick()`), and called directly by tests instead of manipulating coroutine
 * virtual time.
 */
@HiltViewModel
class SessionViewModel @Inject constructor(
    private val recorder: AttemptRecorder,
    private val flaggedStore: FlaggedQuestionsStore = FlaggedQuestionsStore.NoOp,
) : ViewModel() {

    var now: () -> Instant = Instant::now

    private var session: QBankSession? = null
    private var sessionId: String = ""
    private var allottedSeconds: Int = 0
    private var currentIndex: Int = 0
    private var elapsedSeconds: Int = 0
    private var paused: Boolean = false
    private var finishedResult: QBankSessionResult? = null
    private var pendingRecords: List<AttemptRecord> = emptyList()
    private var saveState: SessionSaveState = SessionSaveState.Saved
    private val flaggedIds = mutableSetOf<String>()
    private val notes = mutableMapOf<String, String>()
    private val crossedOut = mutableMapOf<String, MutableSet<String>>()

    private val _uiState = MutableStateFlow(SessionUiState())
    val uiState: StateFlow<SessionUiState> = _uiState.asStateFlow()

    /** Start (or re-enter) a sitting. A no-op if already showing [sessionId]. */
    fun begin(session: QBankSession, sessionId: String) {
        if (this.session != null && this.sessionId == sessionId) return

        this.session = session
        this.sessionId = sessionId
        currentIndex = 0
        elapsedSeconds = 0
        paused = false
        finishedResult = null
        pendingRecords = emptyList()
        saveState = SessionSaveState.Saved
        flaggedIds.clear()
        notes.clear()
        crossedOut.clear()
        allottedSeconds = session.questions.sumOf { it.estimatedSeconds ?: DEFAULT_SECONDS_PER_QUESTION }
        refresh()
        loadPersistedFlags()
    }

    /**
     * Brings in flags the student set in an earlier sitting, so [SessionUiState.isFlagged]
     * (and the navigator's flag markers) are right for a question re-encountered
     * here. Async and best-effort: a slow or failed read just leaves this
     * sitting's flags looking empty until it resolves, rather than blocking
     * [begin].
     */
    private fun loadPersistedFlags() {
        viewModelScope.launch {
            val loaded = try {
                flaggedStore.flaggedIds()
            } catch (e: CancellationException) {
                throw e
            } catch (e: Exception) {
                emptySet()
            }
            flaggedIds.addAll(loaded)
            refresh()
        }
    }

    fun pick(label: String) {
        val s = session ?: return
        s.pick(currentIndex, label)
        refresh()
    }

    /** Touch-crosses-out one option on the current question. Independent of [pick]. */
    fun toggleCrossOut(label: String) {
        val question = currentQuestion() ?: return
        val set = crossedOut.getOrPut(question.id) { mutableSetOf() }
        if (!set.add(label)) set.remove(label)
        refresh()
    }

    /** Tutor-only: locks in the current pick and reveals right/wrong (see [QBankSession.check]). */
    fun check() {
        val s = session ?: return
        s.check(currentIndex)
        refresh()
    }

    fun next() {
        val s = session ?: return
        if (currentIndex >= s.questions.lastIndex) return
        currentIndex++
        s.visited.add(currentIndex)
        refresh()
    }

    fun prev() {
        if (currentIndex <= 0) return
        currentIndex--
        refresh()
    }

    fun goTo(index: Int) {
        val s = session ?: return
        if (index !in s.questions.indices) return
        currentIndex = index
        s.visited.add(index)
        refresh()
    }

    /**
     * Flags (or unflags) the current question, in memory immediately and
     * persisted in the background so it survives past this sitting -- feeding
     * the Revise hub's Flagged collection.
     *
     * The persisted write re-reads [flaggedStore] and applies just this one
     * change, rather than pushing this sitting's whole in-memory [flaggedIds]
     * snapshot: [loadPersistedFlags] is still in flight the first time a student
     * flags something (it starts in [begin], asynchronously), and pushing a
     * snapshot taken before that load lands would silently drop every flag from
     * every other sitting.
     * ponytail: a second toggle fired before the first one's read-modify-write
     * completes could still race (both read the same starting set). Acceptable
     * for one student's own sequential taps; a value-level merge (a set union
     * rather than a replace) would close it if this ever needs to be airtight.
     */
    fun toggleFlag() {
        val question = currentQuestion() ?: return
        val nowFlagged = question.id !in flaggedIds
        if (nowFlagged) flaggedIds.add(question.id) else flaggedIds.remove(question.id)
        refresh()
        val at = now()
        viewModelScope.launch {
            try {
                val persisted = flaggedStore.flaggedIds().toMutableSet()
                if (nowFlagged) persisted.add(question.id) else persisted.remove(question.id)
                flaggedStore.setFlaggedIds(persisted, at)
            } catch (e: CancellationException) {
                throw e
            } catch (e: Exception) {
                // Best-effort: the flag still shows correctly for this sitting even
                // if persisting it failed.
            }
        }
    }

    fun setNote(text: String) {
        val question = currentQuestion() ?: return
        notes[question.id] = text
        refresh()
    }

    /** The app left the foreground: stop accumulating the timer. */
    fun onAppBackground() {
        if (paused) return
        paused = true
        refresh()
    }

    /**
     * The app returned to the foreground. Deliberately does **not** resume the
     * timer on its own — [resumeTimer] is what a student's explicit tap on the
     * runner's "Resume" affordance calls. Auto-resuming here would silently
     * clock a student for time spent away from the app.
     */
    fun onAppForeground() {
        // Intentionally a no-op for timer state; see the doc comment above.
    }

    /** The explicit, deliberate resume a paused timer requires. */
    fun resumeTimer() {
        if (!paused) return
        paused = false
        refresh()
    }

    /**
     * Advance the timer by one second. In production, called by the runner
     * screen's real-time loop; tests call this directly instead of waiting on
     * (or manipulating virtual) coroutine time.
     */
    fun tick() {
        val s = session ?: return
        if (paused) return
        elapsedSeconds++
        val question = s.questions.getOrNull(currentIndex)
        if (question != null) {
            s.spent[question.id] = (s.spent[question.id] ?: 0) + 1
        }
        refresh()
    }

    /**
     * End the sitting: grades every question (Timed mode grades
     * answered-but-unchecked questions here, per [QBankSession.finish]),
     * builds one [AttemptRecord] per question, and publishes
     * [SessionUiState.result] for [ResultsScreen] straight away — the grade is
     * already computed in memory, so the student sees their results
     * regardless of how persistence goes. The write itself runs in
     * [persistPending], which tracks its outcome in [SessionUiState.saveState].
     */
    fun finish() {
        val s = session ?: return
        val result = s.finish()
        val sessionDurationSeconds = elapsedSeconds
        val overtimeSeconds = if (s.mode == QBankSession.Mode.Timed) {
            (elapsedSeconds - allottedSeconds).coerceAtLeast(0)
        } else {
            null
        }
        val byId = s.questions.associateBy { it.id }
        val at = now()
        pendingRecords = result.perQuestion.map { pq ->
            val question = byId.getValue(pq.questionId)
            val selectedIndex = pq.pickedLabel
                ?.let { label -> question.options.indexOfFirst { it.label == label } }
                ?.takeIf { it >= 0 }
            val correctIndex = question.options.indexOfFirst { it.label == question.correctLabel }.takeIf { it >= 0 }
            AttemptRecord(
                id = attemptId(sessionId, "qbank", question.id),
                at = at.toString(),
                surface = "qbank",
                itemId = question.id,
                subjectId = question.subjectId,
                topic = question.topic,
                difficulty = question.difficulty,
                conceptIds = question.conceptIds,
                correct = pq.correct,
                seconds = s.spent[question.id],
                sessionId = sessionId,
                selectedIndex = selectedIndex,
                correctIndex = correctIndex,
                sessionDurationSeconds = sessionDurationSeconds,
                sessionOvertimeSeconds = overtimeSeconds,
            )
        }
        finishedResult = result
        persistPending()
    }

    /**
     * Persist the finished sitting's attempts, tracking the outcome in
     * [SessionSaveState].
     *
     * Only a genuine **local** write failure reaches here as an exception:
     * [QBankRepository.recordAttempts] persists locally first (uncaught) and
     * only its leaderboard POST is best-effort/swallowed. So a throw out of
     * [recorder] means the sitting was NOT saved — that becomes
     * [SessionSaveState.Failed] with a [retrySave] path, and is never reported
     * to the student as saved. [kotlin.coroutines.cancellation.CancellationException]
     * still propagates untouched.
     */
    private fun persistPending() {
        val records = pendingRecords
        if (records.isEmpty()) return
        saveState = SessionSaveState.Saving
        refresh()
        viewModelScope.launch {
            saveState = try {
                recorder.record(records, now())
                SessionSaveState.Saved
            } catch (e: CancellationException) {
                throw e
            } catch (e: Exception) {
                SessionSaveState.Failed
            }
            refresh()
        }
    }

    /** Re-attempt a [SessionSaveState.Failed] save (the student's explicit "retry"). */
    fun retrySave() {
        if (saveState == SessionSaveState.Failed) persistPending()
    }

    /**
     * Whether a sitting is currently loaded. Survives a configuration change
     * (the view model outlives the Activity), but is false after process death
     * — [QuestionBankRoot] uses it to tell "resume the surviving sitting" from
     * "the session is gone, fall back to Setup".
     */
    fun hasActiveSession(): Boolean = session != null

    private fun currentQuestion(): Question? = session?.questions?.getOrNull(currentIndex)

    private fun refresh() {
        val s = session ?: return
        val question = s.questions.getOrNull(currentIndex)
        val navStates = s.questions.indices.map { s.navState(it, currentIndex) }
        val timerDisplay = if (s.mode == QBankSession.Mode.Timed) {
            (allottedSeconds - elapsedSeconds).coerceAtLeast(0)
        } else {
            elapsedSeconds
        }
        _uiState.value = SessionUiState(
            index = currentIndex,
            question = question,
            total = s.questions.size,
            pickedLabel = question?.let { s.picked[it.id] },
            isChecked = question != null && question.id in s.checked,
            mode = s.mode,
            navStates = navStates,
            questionIds = s.questions.map { it.id },
            flaggedIds = flaggedIds.toSet(),
            notes = notes.toMap(),
            crossedOut = crossedOut.mapValues { it.value.toSet() },
            elapsedSeconds = elapsedSeconds,
            timerDisplaySeconds = timerDisplay,
            isOvertime = s.mode == QBankSession.Mode.Timed && elapsedSeconds > allottedSeconds,
            isPaused = paused,
            result = finishedResult,
            saveState = saveState,
        )
    }
}
