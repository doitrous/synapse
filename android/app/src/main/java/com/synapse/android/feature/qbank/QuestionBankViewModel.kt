package com.synapse.android.feature.qbank

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewmodel.initializer
import androidx.lifecycle.viewmodel.viewModelFactory
import com.synapse.android.core.cache.LocalStore
import com.synapse.android.core.model.ContentKind
import com.synapse.android.core.model.Question
import com.synapse.android.core.model.QuestionProjection
import com.synapse.android.core.qbank.ChooserTopic
import com.synapse.android.core.qbank.LiveSession
import com.synapse.android.core.qbank.QBankScope
import com.synapse.android.core.qbank.SittingMode
import java.time.Instant
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
    store: LocalStore,
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

    /**
     * Draws a sitting from the current scope. Never persisted here — writing
     * it under [LiveSession.KEY] is the runner's job (a later task), not the
     * builder's.
     *
     * [count] is a request, not a promise: the draw is `min(count,
     * pool.size)`, never padded, matching `Math.min(count, available.length)`
     * in `src/pages/student/QuestionBank.tsx`.
     *
     * [LiveSession.name] is left blank. Naming a sitting on the web
     * (`autoSessionName` in `QuestionBank.tsx`) reads the student's saved
     * test history to number it, e.g. "Cardiovascular · Test 3" — state this
     * builder has no access to and that this method's signature (`mode`,
     * `count`, nothing else) has no room to accept. That naming is the
     * runner's job, alongside the persistence it already owns.
     */
    fun build(mode: SittingMode, count: Int): LiveSession {
        val inScope = QBankScope.questions(pool.value, _scope.value, topics.value)
        val drawn = inScope.shuffled(random).take(minOf(count, inScope.size))
        return LiveSession(
            questionIds = drawn.map { it.id },
            idx = 0,
            answers = emptyMap(),
            checked = emptyMap(),
            mode = mode,
            sessionId = UUID.randomUUID().toString(),
            elapsed = 0,
            visited = emptyList(),
            reviewing = false,
            name = "",
            phase = PHASE_RUNNING,
            startedAt = Instant.now().toString(),
        )
    }

    override fun onCleared() {
        backgroundScope.cancel()
    }

    companion object {
        /** `"running"` — the other clients' spelling; see `LiveSession.phase`. */
        private const val PHASE_RUNNING = "running"

        fun factory(store: LocalStore) = viewModelFactory {
            initializer { QuestionBankViewModel(store) }
        }
    }
}
