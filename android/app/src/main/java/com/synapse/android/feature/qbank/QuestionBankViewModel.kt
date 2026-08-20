package com.synapse.android.feature.qbank

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewmodel.initializer
import androidx.lifecycle.viewmodel.viewModelFactory
import com.synapse.android.core.cache.LocalStore
import com.synapse.android.core.model.ContentKind
import com.synapse.android.core.model.Question
import com.synapse.android.core.model.QuestionProjection
import com.synapse.android.core.progress.AttemptLedger
import com.synapse.android.core.progress.AttemptStats
import com.synapse.android.core.qbank.ChooserTopic
import com.synapse.android.core.qbank.LiveSession
import com.synapse.android.core.qbank.QBankScope
import com.synapse.android.core.qbank.SittingMode
import com.synapse.android.core.sync.SyncEngine
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
import kotlinx.serialization.builtins.MapSerializer
import kotlinx.serialization.builtins.serializer
import kotlinx.serialization.json.Json

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
    private val json = Json { ignoreUnknownKeys = true }

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
            sync.write(LiveSession.SESSION_NAMES_KEY, json.encodeToString(NAMES_SERIALIZER, updatedNames))
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
            ?.let { json.decodeFromString(NAMES_SERIALIZER, it) }
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
