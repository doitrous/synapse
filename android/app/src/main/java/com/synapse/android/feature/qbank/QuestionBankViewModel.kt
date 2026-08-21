package com.synapse.android.feature.qbank

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewmodel.initializer
import androidx.lifecycle.viewmodel.viewModelFactory
import com.synapse.android.core.CortexJson
import com.synapse.android.core.cache.LocalStore
import com.synapse.android.core.model.ContentKind
import com.synapse.android.core.model.Question
import com.synapse.android.core.model.QuestionProjection
import com.synapse.android.core.progress.AttemptLedger
import com.synapse.android.core.progress.AttemptRecord
import com.synapse.android.core.progress.AttemptStats
import com.synapse.android.core.progress.DayCount
import com.synapse.android.core.qbank.ChooserTopic
import com.synapse.android.core.qbank.LiveSession
import com.synapse.android.core.qbank.QBankScope
import com.synapse.android.core.qbank.SittingMode
import com.synapse.android.core.sync.SyncEngine
import java.time.Instant
import java.time.LocalDate
import java.util.UUID
import kotlin.random.Random
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.SupervisorJob
import kotlinx.coroutines.cancel
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.SharingStarted
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.combine
import kotlinx.coroutines.flow.map
import kotlinx.coroutines.flow.stateIn
import kotlinx.coroutines.launch
import kotlinx.serialization.builtins.MapSerializer
import kotlinx.serialization.builtins.serializer

/** One subject's standing in [QBankStats.bySubject], most-accurate first. */
data class SubjectAccuracy(val subjectId: String, val marked: Int, val correct: Int)

/**
 * The student's own standing in the bank -- a port of `YourQbank`
 * (`src/pages/student/QuestionBank.tsx:119-200`).
 *
 * Every figure here is derived from the attempt ledger, scoped to
 * `surface == "qbank"` -- Android carries no `"room"` surface, so [of] does
 * not fold one in the way the web's `YourQbank` does.
 */
data class QBankStats(
    val seen: Int,
    val total: Int,
    val accuracy: Double?,
    val weekTotal: Int,
    val streak: Int,
    val week: List<DayCount>,
    val bySubject: List<SubjectAccuracy>,
) {
    companion object {
        private const val SURFACE = "qbank"
        private const val WEEK_DAYS = 7

        /**
         * Marked answers a subject needs before its accuracy is shown at all
         * (`QuestionBank.tsx:94`). One wrong answer is not a weakness, and one
         * right one is not a mastered subject.
         */
        private const val WEAKNESS_EVIDENCE = 3

        /** Rows the web shows, at most (`QuestionBank.tsx:132`). */
        private const val SUBJECT_ROWS = 6

        /**
         * [total] is the size of the projected question pool -- callers own
         * that read; this function only ever sees the attempt ledger.
         */
        fun of(records: List<AttemptRecord>, total: Int, today: LocalDate = LocalDate.now()): QBankStats {
            val qbankRecords = records.filter { it.surface == SURFACE }
            val week = AttemptStats.dailyCounts(qbankRecords, WEEK_DAYS, today)

            val bySubject = qbankRecords.groupBy { it.subjectId }
                .map { (subjectId, group) ->
                    val scored = AttemptStats.marked(group)
                    Triple(
                        SubjectAccuracy(subjectId, marked = scored.size, correct = scored.count { it.correct == true }),
                        group.size,
                        subjectId,
                    )
                }
                // The web's order, floor and cap, ported exactly
                // (`QuestionBank.tsx:132`, `attemptStats.ts:60`): most-answered
                // first -- by attempts, not by accuracy -- then only subjects
                // with WEAKNESS_EVIDENCE marked answers behind them, then the
                // first six. One lucky answer is not a 100% subject, and a
                // student who has touched twenty subjects gets six rows here,
                // not a wall.
                .sortedByDescending { (_, attempts, _) -> attempts }
                .map { (accuracy, _, _) -> accuracy }
                .filter { it.marked >= WEAKNESS_EVIDENCE }
                .take(SUBJECT_ROWS)

            return QBankStats(
                seen = AttemptStats.distinctItems(qbankRecords),
                total = total,
                accuracy = AttemptStats.accuracyOf(qbankRecords),
                weekTotal = week.sumOf { it.attempts },
                streak = AttemptStats.currentStreak(qbankRecords, today),
                week = week,
                bySubject = bySubject,
            )
        }
    }
}

/**
 * What a student picks from, and what they have picked so far.
 *
 * [topics] and [availableCount] are backed by [LocalStore.ledgerItems], not a
 * one-shot read — a sync landing while the chooser is open must update the
 * count on screen, not just the next time the screen is opened. The
 * collection runs on [Dispatchers.Default], deliberately not
 * `viewModelScope` (which binds to `Dispatchers.Main.immediate`): this class
 * has no Android Looper dependency anywhere, so a JVM unit test can collect
 * [topics] and [availableCount] the same way [store]'s own tests do, with no
 * shadow Looper to pump.
 *
 * There is no client-side cohort filter here, on purpose — see
 * `LocalStore.ledgerItems` and `LedgerItem.isStudentVisible`. Every published
 * question the cache holds is offered; the pool is exactly
 * `usePublishedQuestions()` on the web.
 */
class QuestionBankViewModel(
    private val store: LocalStore,
    private val sync: SyncEngine,
    private val random: Random = Random.Default,
) : ViewModel() {
    private val backgroundScope = CoroutineScope(SupervisorJob() + Dispatchers.Default)

    private val pool: StateFlow<List<Question>> = store.ledgerItems(ContentKind.QUESTION)
        .map { items -> items.filter { it.isStudentVisible }.mapNotNull(QuestionProjection::project) }
        .stateIn(backgroundScope, SharingStarted.Eagerly, emptyList())

    /**
     * Milestone 1 ships no Library (see `QBankScope.chooserTopics`), so the
     * library tree passed here is always empty and every chapter offered is
     * synthesised straight from the questions themselves.
     */
    val topics: StateFlow<List<ChooserTopic>> = pool
        .map { QBankScope.chooserTopics(it, emptyList()) }
        .stateIn(backgroundScope, SharingStarted.Eagerly, emptyList())

    private val _scope = MutableStateFlow<Set<String>>(emptySet())
    val scope: StateFlow<Set<String>> = _scope.asStateFlow()

    /** Adds [key] to the scope, or removes it if it was already there. */
    fun toggle(key: String) {
        _scope.value = _scope.value.let { current -> if (key in current) current - key else current + key }
    }

    val availableCount: StateFlow<Int> = combine(pool, topics, _scope) { currentPool, currentTopics, currentScope ->
        QBankScope.questions(currentPool, currentScope, currentTopics).size
    }.stateIn(backgroundScope, SharingStarted.Eagerly, 0)

    private val _records = MutableStateFlow<List<AttemptRecord>>(emptyList())

    init {
        backgroundScope.launch { _records.value = AttemptLedger.records(store) }
    }

    /**
     * The statistics panel that sits above the chooser on the web
     * (`QuestionBank.tsx:119-200`). [pool] already reacts to a sync landing
     * while this screen is open, so [total][QBankStats.total] does too;
     * the ledger read is one-shot, like [PreviousSittingsViewModel]'s --
     * nothing on this screen ever writes an attempt.
     */
    val stats: StateFlow<QBankStats> = combine(pool, _records) { currentPool, records ->
        QBankStats.of(records, currentPool.size)
    }.stateIn(backgroundScope, SharingStarted.Eagerly, QBankStats.of(emptyList(), 0))

    /**
     * Every published question the current pool holds, narrowed to [ids] and
     * ordered the way [ids] names them. Lets [RootScreen][com.synapse.android.feature.root]
     * resolve the [Question]s a just-built [LiveSession] needs without a
     * second ledger read — [pool] is already loaded here.
     */
    fun questionsFor(ids: List<String>): List<Question> {
        val byId = pool.value.associateBy { it.id }
        return ids.mapNotNull { byId[it] }
    }

    /**
     * Draws a sitting from the current scope, mints its id and names it, and
     * writes that name before handing the sitting back — never persisted
     * here otherwise; writing [LiveSession] itself under [LiveSession.KEY]
     * remains the runner's job.
     *
     * [count] is a request, not a promise: the draw is `min(count,
     * pool.size)`, never padded, matching `Math.min(count, available.length)`
     * in `src/pages/student/QuestionBank.tsx`.
     *
     * Naming is a port of `autoSessionName` and `beginSession`'s naming line
     * (`QuestionBank.tsx:798-799`, `:920-931`). The scope name is computed
     * from [inScope] — the whole scope-matched pool, matching `available` on
     * the web (`scopeSubjectName`'s own `useMemo` depends on `available`,
     * not on the post-shuffle slice) — not from the drawn subset: a
     * ten-question draw from a ninety-question single-subject scope is still
     * that subject's name, not "Mixed" because the draw happened to miss a
     * few questions. If every question in scope shares one `subjectId`, that
     * id is used verbatim as the scope name — Android carries no subject
     * catalogue, so there is no display name to look up (see this task's
     * report for the cross-client naming consequence).
     *
     * `used` counts *stored* names starting with the scope name (mint one
     * session, name it, write the name; never a two-step "mint now, name
     * later" — see `QuestionBank.tsx:793-796`, which records why that used
     * to file a name under the wrong id) — never [LiveSession.name] itself,
     * so a sitting nobody named yet does not consume a test number.
     */
    suspend fun build(mode: SittingMode, count: Int): LiveSession {
        val inScope = QBankScope.questions(pool.value, _scope.value, topics.value)
        val drawn = inScope.shuffled(random).take(minOf(count, inScope.size))
        val sessionId = UUID.randomUUID().toString()

        val scopeName = inScope.map { it.subjectId }.distinct().singleOrNull() ?: MIXED_SCOPE_NAME
        val storedNames = readNames()
        val records = AttemptLedger.records(store)
        val used = AttemptStats.bySession(records).count { (storedNames[it.sessionId] ?: "").startsWith(scopeName) }
        val name = "$scopeName · Test ${used + 1}"

        if (name.isNotBlank()) {
            val updatedNames = storedNames + (sessionId to name)
            sync.write(LiveSession.SESSION_NAMES_KEY, CortexJson.encodeToString(NAMES_SERIALIZER, updatedNames))
        }

        return LiveSession(
            questionIds = drawn.map { it.id },
            idx = 0,
            answers = emptyMap(),
            checked = emptyMap(),
            mode = mode,
            sessionId = sessionId,
            elapsed = 0,
            visited = emptyList(),
            reviewing = false,
            name = name,
            phase = PHASE_RUNNING,
            startedAt = Instant.now().toString(),
        )
    }

    private suspend fun readNames(): Map<String, String> =
        store.document(LiveSession.SESSION_NAMES_KEY)?.json
            ?.let { CortexJson.decodeFromString(NAMES_SERIALIZER, it) }
            .orEmpty()

    override fun onCleared() {
        backgroundScope.cancel()
    }

    companion object {
        /** `"running"` — the other clients' spelling; see `LiveSession.phase`. */
        private const val PHASE_RUNNING = "running"

        /** The literal scope name for a sitting spanning more than one subject. */
        private const val MIXED_SCOPE_NAME = "Mixed"

        private val NAMES_SERIALIZER = MapSerializer(String.serializer(), String.serializer())

        fun factory(store: LocalStore, sync: SyncEngine) = viewModelFactory {
            initializer { QuestionBankViewModel(store, sync) }
        }
    }
}
