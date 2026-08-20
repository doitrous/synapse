package com.synapse.android.feature.qbank

import android.util.Log
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewmodel.initializer
import androidx.lifecycle.viewmodel.viewModelFactory
import com.synapse.android.core.cache.LocalStore
import com.synapse.android.core.model.Question
import com.synapse.android.core.progress.AttemptIndex
import com.synapse.android.core.progress.AttemptMonth
import com.synapse.android.core.progress.AttemptRecord
import com.synapse.android.core.progress.AttemptStore
import com.synapse.android.core.qbank.LiveSession
import com.synapse.android.core.qbank.QuestionState
import com.synapse.android.core.qbank.SittingMode
import com.synapse.android.core.sync.SyncEngine
import java.time.Instant
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.Job
import kotlinx.coroutines.SupervisorJob
import kotlinx.coroutines.cancel
import kotlinx.coroutines.delay
import kotlinx.coroutines.launch
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.update
import kotlinx.serialization.json.Json

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
 */
class RunnerViewModel(
    initialSession: LiveSession,
    private val questions: List<Question>,
    private val store: LocalStore,
    private val sync: SyncEngine,
    private val ticker: Ticker = RealTicker,
) : ViewModel() {

    private val backgroundScope = CoroutineScope(SupervisorJob() + Dispatchers.Default)
    private val json = Json { ignoreUnknownKeys = true }
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
     */
    fun choose(label: String) {
        val current = _session.value
        val questionId = current.questionIds.getOrNull(current.idx) ?: return
        val question = questionsById[questionId]
        if (question == null) {
            warnUnresolved(questionId)
            return
        }
        val optionIndex = question.options.indexOfFirst { it.label == label }
        if (optionIndex < 0) return
        _session.value = current.copy(answers = current.answers + (questionId to optionIndex))
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
        val current = _session.value
        val questionId = current.questionIds.getOrNull(current.idx) ?: return
        val question = questionsById[questionId]
        if (question == null) {
            warnUnresolved(questionId)
            return
        }
        val chosenIndex = current.answers[questionId] ?: return
        val label = question.options.getOrNull(chosenIndex)?.label ?: return

        val updated = if (current.mode == SittingMode.TUTOR) {
            current.copy(checked = current.checked + (questionId to true))
        } else {
            current
        }
        persist(updated)

        if (current.mode == SittingMode.TUTOR) {
            backgroundScope.launch { recordAttempt(question, label, seconds = null, sessionId = current.sessionId) }
        }
    }

    /**
     * Moves to [index], remembering the question just left as visited so
     * [stateOf] can tell "skipped" from "not reached".
     */
    fun goTo(index: Int) {
        val current = _session.value
        if (index !in current.questionIds.indices) return
        val visited = if (current.idx in current.visited) current.visited else current.visited + current.idx
        current.questionIds.getOrNull(index)?.let { openedAtElapsed.putIfAbsent(it, current.elapsed) }
        persist(current.copy(idx = index, visited = visited))
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
        val current = _session.value
        if (current.phase == PHASE_RESULTS) return
        tickerJob?.cancel()

        val newlyChecked = current.answers.keys.associateWith { true }
        val updated = current.copy(phase = PHASE_RESULTS, reviewing = true, checked = current.checked + newlyChecked)
        persist(updated)

        if (current.mode == SittingMode.TIMED) {
            backgroundScope.launch {
                for ((questionId, optionIndex) in current.answers) {
                    val question = questionsById[questionId]
                    if (question == null) {
                        warnUnresolved(questionId)
                        continue
                    }
                    val label = question.options.getOrNull(optionIndex)?.label ?: continue
                    // No baseline means the sitting was resumed after this
                    // question was already answered (a force-quit, say) --
                    // record that honestly as "unknown", never as 0 seconds.
                    val openedAt = openedAtElapsed[questionId]
                    val seconds = openedAt?.let { maxOf(0, current.elapsed - it) }
                    recordAttempt(question, label, seconds, sessionId = current.sessionId)
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

    private fun persist(updated: LiveSession) {
        _session.value = updated
        backgroundScope.launch { sync.write(LiveSession.KEY, json.encodeToString(LiveSession.serializer(), updated)) }
    }

    /**
     * Read-modify-write through the cache, never the API -- see this task's
     * brief, step 2, "How". Two documents change per attempt: the month
     * shard the record actually lives in, and the index that lets headline
     * totals be read without opening every shard. [SyncEngine.write] saves
     * each locally and queues it in one transaction, so an attempt made
     * offline is queued rather than lost.
     *
     * [AttemptStore.addAttempt] refuses a record whose id already exists in
     * the shard by handing back the exact same [AttemptMonth] instance it
     * was given. That identity is the signal a duplicate call (e.g. [finish]
     * somehow running twice) must not also fold into [AttemptIndex.totals]
     * -- so when nothing changed, nothing is written, to either document.
     */
    private suspend fun recordAttempt(question: Question, label: String, seconds: Int?, sessionId: String) {
        val now = Instant.now()
        val record = AttemptRecord(
            id = AttemptStore.attemptId(sessionId, SURFACE, question.id),
            at = now.toString(),
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

        val monthName = AttemptStore.month(now)
        val monthKey = AttemptStore.monthKey(monthName)
        val month = store.document(monthKey)?.json?.let { json.decodeFromString(AttemptMonth.serializer(), it) }
            ?: AttemptMonth(month = monthName)
        val updatedMonth = AttemptStore.addAttempt(month, record)
        if (updatedMonth === month) return
        sync.write(monthKey, json.encodeToString(AttemptMonth.serializer(), updatedMonth))

        val index = store.document(AttemptStore.INDEX_KEY)?.json
            ?.let { json.decodeFromString(AttemptIndex.serializer(), it) }
            ?: AttemptIndex()
        sync.write(AttemptStore.INDEX_KEY, json.encodeToString(AttemptIndex.serializer(), AttemptStore.index(index, record)))
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
