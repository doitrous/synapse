package com.nishany.android.feature.qbank

import android.util.Log
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewmodel.initializer
import androidx.lifecycle.viewmodel.viewModelFactory
import com.nishany.android.core.CortexJson
import com.nishany.android.core.backgroundWorkScope
import com.nishany.android.core.cache.LocalStore
import com.nishany.android.core.model.Question
import com.nishany.android.core.progress.AttemptRecord
import com.nishany.android.core.progress.AttemptStore
import com.nishany.android.core.progress.writeAttempt
import com.nishany.android.core.qbank.LiveSession
import com.nishany.android.core.qbank.QuestionState
import com.nishany.android.core.qbank.SittingMode
import com.nishany.android.core.sync.SyncEngine
import com.nishany.android.core.ui.UiState
import java.time.Instant
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.Job
import kotlinx.coroutines.cancel
import kotlinx.coroutines.delay
import kotlinx.coroutines.launch
import kotlinx.coroutines.sync.Mutex
import kotlinx.coroutines.sync.withLock
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.SharingStarted
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.map
import kotlinx.coroutines.flow.stateIn
import kotlinx.coroutines.flow.update
import kotlinx.coroutines.flow.updateAndGet

/**
 * Where [RunnerViewModel] gets its once-a-second signal to advance
 * [LiveSession.elapsed]. Production uses [RealTicker]; a test injects
 * something that resolves without an actual wait, so the clock advances
 * deterministically and no unit test sits through a real second.
 */
fun interface Ticker {
    suspend fun await()
}

private object RealTicker : Ticker {
    override suspend fun await() {
        delay(1_000)
    }
}

/**
 * Sits a student through a drawn [LiveSession], one question at a time.
 *
 * [questions] is resolved once, by whoever builds this view model, from the
 * exact ids [LiveSession.questionIds] names -- this class does no ledger
 * lookups of its own, it only ever reasons about the sitting mechanics: what
 * is chosen, what is revealed, and what gets logged.
 *
 * Every mutating call updates [session] synchronously (so the screen never
 * waits on I/O to reflect a tap) and then persists asynchronously on
 * [backgroundScope] -- deliberately not `viewModelScope`, so a JVM test can
 * drive this class with no `Dispatchers.Main` to install, the same reason
 * `QuestionBankViewModel` avoids it.
 *
 * [backgroundScope] runs on [Dispatchers.Default], a real thread pool, and
 * [tick] is the one thing in this class that writes [_session] from it --
 * every screen-driven call ([choose], [commit], [goTo], [finish]) writes
 * from the caller's own thread. That makes two threads capable of writing
 * concurrently, so every write here goes through [MutableStateFlow.update]
 * or [MutableStateFlow.updateAndGet] (an atomic compare-and-set retry loop)
 * rather than a read-`.value`-then-set-`.value`, which would let a tick
 * landing in between silently revert to the reader's stale snapshot.
 */
class RunnerViewModel(
    initialSession: LiveSession,
    private val questions: List<Question>,
    private val store: LocalStore,
    private val sync: SyncEngine,
    private val ticker: Ticker = RealTicker,
) : ViewModel() {
    private val backgroundScope = backgroundWorkScope("RunnerViewModel")

    /**
     * Serialises the attempt read-modify-write. Tutor mode banks an
     * attempt from [commit], one independently launched coroutine per
     * answer checked, so two quick checks would otherwise both read the
     * same month shard and the later write would drop the earlier record.
     */
    private val banking = Mutex()
    private val questionsById: Map<String, Question> = questions.associateBy { it.id }

    /**
     * `elapsed` (from [LiveSession.elapsed]) captured the first moment each
     * question was reached -- what [finish] subtracts from the sitting's
     * final `elapsed` to get a timed question's own duration. Not part of
     * [LiveSession] itself: it is scratch bookkeeping for this one running
     * instance, not a fact that needs to survive a process death. When a
     * question has no baseline here -- e.g. the app was force-quit and
     * resumed mid-sitting -- [finish] records `seconds = null` rather than
     * guessing.
     */
    private val openedAtElapsed: MutableMap<String, Int> = mutableMapOf<String, Int>().apply {
        initialSession.questionIds.getOrNull(initialSession.idx)?.let { put(it, initialSession.elapsed) }
    }

    private val _session = MutableStateFlow(initialSession)
    val session: StateFlow<LiveSession> = _session.asStateFlow()

    /**
     * [session] resolved to the one [Question] [QuestionRunnerScreen] should
     * be drawing right now, wrapped as a [UiState] -- see [runnerUiState]'s
     * own doc for what each branch means here. Nothing about this class ever
     * reads the ledger or the network, so unlike
     * [QuestionBankViewModel.uiState] there is no [SyncEngine] or
     * [com.nishany.android.core.ConnectivityMonitor] in this combine -- the
     * fold is a pure function of [session] and the [questions] this instance
     * was built with.
     */
    val uiState: StateFlow<UiState<Question>> = session
        .map { runnerUiState(it, questions) }
        .stateIn(backgroundScope, SharingStarted.Eagerly, UiState.Loading)

    /**
     * Advances [LiveSession.elapsed] once a second while the sitting is
     * running and not under review. Deliberately never persists on its own
     * -- see [tick] -- so it cannot flood [SyncEngine]'s outbox; whatever it
     * has advanced to rides along on the next event that already persists
     * (commit, navigation, finish).
     */
    private var tickerJob: Job? = startTicking()

    private fun startTicking(): Job = backgroundScope.launch {
        while (true) {
            ticker.await()
            tick()
        }
    }

    private fun tick() {
        _session.update { current ->
            if (current.phase != PHASE_RUNNING || current.reviewing) current
            else current.copy(elapsed = current.elapsed + 1)
        }
    }

    /**
     * Records which option the student is looking at right now. Not
     * persisted on its own -- see the class doc -- [commit] is what makes a
     * pick durable.
     *
     * The question/option to record is decided from a plain snapshot -- only
     * [tick] writes concurrently, and it never touches [LiveSession.idx] or
     * [LiveSession.answers] -- but the write itself goes through
     * [MutableStateFlow.update] rather than a read-then-set, so a tick
     * racing this call can never be clobbered by it. See the class doc.
     */
    fun choose(label: String) {
        val snapshot = _session.value
        val questionId = snapshot.questionIds.getOrNull(snapshot.idx) ?: return
        val question = questionsById[questionId]
        if (question == null) {
            warnUnresolved(questionId)
            return
        }
        val optionIndex = question.options.indexOfFirst { it.label == label }
        if (optionIndex < 0) return
        _session.update { cur -> cur.copy(answers = cur.answers + (questionId to optionIndex)) }
    }

    /**
     * Finalises the current question's answer.
     *
     * Tutor mode reveals it immediately -- `checkAnswer` in
     * `src/pages/student/QuestionBank.tsx` -- and logs the attempt right
     * away. Timed mode leaves [LiveSession.checked] untouched and logs
     * nothing here; both wait for [finish], so the navigator strip cannot
     * leak correctness mid-sitting. See this task's brief, step 2, for why
     * the two modes are pinned to write at different moments.
     */
    fun commit() {
        val snapshot = _session.value
        val questionId = snapshot.questionIds.getOrNull(snapshot.idx) ?: return
        val question = questionsById[questionId]
        if (question == null) {
            warnUnresolved(questionId)
            return
        }
        val chosenIndex = snapshot.answers[questionId] ?: return
        val label = question.options.getOrNull(chosenIndex)?.label ?: return
        val isTutor = snapshot.mode == SittingMode.TUTOR

        val updated = persist { cur -> if (isTutor) cur.copy(checked = cur.checked + (questionId to true)) else cur }

        if (isTutor) {
            backgroundScope.launch { recordAttempt(question, label, seconds = null, sessionId = updated.sessionId) }
        }
    }

    /**
     * Moves to [index], remembering the question just left as visited so
     * [stateOf] can tell "skipped" from "not reached".
     */
    fun goTo(index: Int) {
        val snapshot = _session.value
        if (index !in snapshot.questionIds.indices) return
        val updated = persist { cur ->
            val visited = if (cur.idx in cur.visited) cur.visited else cur.visited + cur.idx
            cur.copy(idx = index, visited = visited)
        }
        // Baselined against the elapsed the CAS actually committed, not the
        // snapshot read before it -- see the class doc on the ticker race.
        updated.questionIds.getOrNull(index)?.let { openedAtElapsed.putIfAbsent(it, updated.elapsed) }
    }

    /**
     * Ends the sitting: marks every answered question checked (so [stateOf]
     * finally reports CORRECT/WRONG instead of ANSWERED for it) and, in
     * timed mode, logs the attempt tutor mode already logged back at
     * [commit] -- one record per answered question, per this task's brief.
     *
     * Idempotent: a second tap (e.g. the strip still shows "Finish" once
     * the student is back on the last question) is a no-op, so it can never
     * re-log every answered question and double the index's totals.
     */
    fun finish() {
        val snapshot = _session.value
        if (snapshot.phase == PHASE_RESULTS) return
        tickerJob?.cancel()

        val updated = persist { cur ->
            val newlyChecked = cur.answers.keys.associateWith { true }
            cur.copy(phase = PHASE_RESULTS, reviewing = true, checked = cur.checked + newlyChecked)
        }

        if (snapshot.mode == SittingMode.TIMED) {
            // Snapshotted before the launch: openedAtElapsed is a plain,
            // non-thread-safe map, written on the caller's thread (goTo) and
            // otherwise only ever read here, in a coroutine that can run on
            // a different Dispatchers.Default thread. A goTo during review
            // could otherwise structurally modify it while this iterates.
            val baselines = openedAtElapsed.toMap()
            backgroundScope.launch {
                for ((questionId, optionIndex) in updated.answers) {
                    val question = questionsById[questionId]
                    if (question == null) {
                        warnUnresolved(questionId)
                        continue
                    }
                    val label = question.options.getOrNull(optionIndex)?.label ?: continue
                    // No baseline means the sitting was resumed after this
                    // question was already answered (a force-quit, say) --
                    // record that honestly as "unknown", never as 0 seconds.
                    val openedAt = baselines[questionId]
                    // updated.elapsed -- the CAS-committed value, not a
                    // pre-CAS read -- so a tick that landed concurrently
                    // with this finish() is never silently dropped.
                    val seconds = openedAt?.let { maxOf(0, updated.elapsed - it) }
                    recordAttempt(question, label, seconds, sessionId = updated.sessionId)
                }
            }
        }
    }

    /**
     * A direct port of `stateFor` in `src/pages/student/QuestionBank.tsx`.
     * [QuestionState.OMITTED] deliberately excludes [LiveSession.idx] itself
     * -- being on a question you have not answered yet is not skipping it.
     */
    fun stateOf(index: Int): QuestionState {
        val current = _session.value
        val questionId = current.questionIds.getOrNull(index) ?: return QuestionState.UNSEEN
        val picked = current.answers[questionId]
            ?: return if (index in current.visited && index != current.idx) QuestionState.OMITTED else QuestionState.UNSEEN

        if (current.reviewing || current.checked[questionId] == true) {
            val label = questionsById[questionId]?.options?.getOrNull(picked)?.label
            val correct = label != null && questionsById[questionId]?.isCorrect(label) == true
            return if (correct) QuestionState.CORRECT else QuestionState.WRONG
        }
        return QuestionState.ANSWERED
    }

    /**
     * Applies [transform] atomically -- [MutableStateFlow.updateAndGet] is a
     * compare-and-set retry loop, so [transform] must be pure; it can run
     * more than once if [tick] wins a race in between attempts. The actual
     * side effect (the write) happens once, outside the lambda, using the
     * value the CAS actually committed.
     */
    private fun persist(transform: (LiveSession) -> LiveSession): LiveSession {
        val updated = _session.updateAndGet(transform)
        backgroundScope.launch { sync.write(LiveSession.KEY, CortexJson.encodeToString(LiveSession.serializer(), updated)) }
        return updated
    }

    /**
     * Banks one answered question through [writeAttempt] -- the single
     * shared implementation of the read-modify-write, and of the dedupe
     * invariant that stops [finish] somehow running twice from doubling the
     * index's totals. This method's only job is to say what the record
     * *is*; the practical surfaces say the same thing about theirs and hand
     * it to the same writer.
     */
    private suspend fun recordAttempt(question: Question, label: String, seconds: Int?, sessionId: String) {
        val record = AttemptRecord(
            id = AttemptStore.attemptId(sessionId, SURFACE, question.id),
            at = Instant.now().toString(),
            surface = SURFACE,
            itemId = question.id,
            subjectId = question.subjectId,
            topic = question.topic,
            difficulty = question.difficulty,
            conceptIds = question.conceptIds,
            correct = question.isCorrect(label),
            seconds = seconds,
            sessionId = sessionId,
        )
        banking.withLock { writeAttempt(store, sync, record) }
    }

    private fun warnUnresolved(questionId: String) {
        Log.w(TAG, "No Question resolved for id \"$questionId\" in this sitting; the tap was ignored.")
    }

    override fun onCleared() {
        tickerJob?.cancel()
        backgroundScope.cancel()
    }

    companion object {
        private const val TAG = "RunnerViewModel"
        private const val SURFACE = "qbank"

        /** `"running"` / `"results"` -- the other clients' spelling; see `LiveSession.phase`. */
        private const val PHASE_RUNNING = "running"
        private const val PHASE_RESULTS = "results"

        fun factory(session: LiveSession, questions: List<Question>, store: LocalStore, sync: SyncEngine) =
            viewModelFactory {
                initializer { RunnerViewModel(session, questions, store, sync) }
            }
    }
}

/**
 * The pure session-plus-resolved-questions -> [UiState] fold behind
 * [RunnerViewModel.uiState]. No network state feeds this one -- [session] is
 * an already-built, already-local sitting, so there is nothing left to
 * arrive later the way a ledger sync would deliver more items.
 *
 * [UiState.Loading] covers only the degenerate case of a sitting with no
 * questions at all ([LiveSession.questionIds] empty) -- [SessionBuilderScreen]
 * never builds one (the Start button is disabled at `availableCount == 0`),
 * so this is a defensive branch, not one a student is expected to see.
 * [UiState.Error] is the one a data problem can actually produce: the
 * session names a question id [questions] does not resolve, the same
 * condition [choose] and [commit] already log via `warnUnresolved` --
 * this is what shows the student something instead of a blank screen.
 */
internal fun runnerUiState(session: LiveSession, questions: List<Question>): UiState<Question> {
    if (session.questionIds.isEmpty()) return UiState.Loading
    val questionId = session.questionIds.getOrNull(session.idx)
    val question = questionId?.let { id -> questions.firstOrNull { it.id == id } }
    return if (question != null) {
        UiState.Content(question)
    } else {
        UiState.Error("This question could not be loaded. It may have been removed from the bank.")
    }
}
