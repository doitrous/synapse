package com.synapse.android.feature.home

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewmodel.initializer
import androidx.lifecycle.viewmodel.viewModelFactory
import com.synapse.android.core.CortexJson
import com.synapse.android.core.auth.AuthModel
import com.synapse.android.core.auth.AuthState
import com.synapse.android.core.backgroundWorkScope
import com.synapse.android.core.cache.LocalStore
import com.synapse.android.core.model.ContentKind
import com.synapse.android.core.model.Practical
import com.synapse.android.core.model.PracticalProjection
import com.synapse.android.core.model.Question
import com.synapse.android.core.model.QuestionProjection
import com.synapse.android.core.progress.AttemptLedger
import com.synapse.android.core.progress.AttemptRecord
import com.synapse.android.core.progress.AttemptStats
import com.synapse.android.core.qbank.LiveSession
import java.time.LocalDate
import java.time.LocalTime
import kotlinx.coroutines.cancel
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.SharingStarted
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.combine
import kotlinx.coroutines.flow.map
import kotlinx.coroutines.flow.stateIn
import kotlinx.coroutines.launch

/** A sitting still `phase == "running"` -- what the resume card shows. */
data class ResumeInfo(val name: String, val position: Int, val total: Int)

/** Everything the Home screen paints. */
data class HomeUi(
    val greeting: String,
    val todayCount: Int,
    val goal: Int,
    val earned: Boolean,
    val avatarInitial: String,
    val questionCount: Int,
    val practicalCount: Int,
    val previousSittingsCount: Int,
    val resume: ResumeInfo?,
) {
    companion object {
        val EMPTY = HomeUi(
            greeting = HomeStats.greeting(LocalTime.now().hour, HomeStats.displayName(null)),
            todayCount = 0,
            goal = HomeStats.DAILY_QUESTION_GOAL,
            earned = false,
            avatarInitial = "S",
            questionCount = 0,
            practicalCount = 0,
            previousSittingsCount = 0,
            resume = null,
        )
    }
}

/**
 * The signed-in shell's landing screen: the day's target, a resume card for
 * a sitting still in progress, and the four surfaces a student jumps into
 * most.
 *
 * Every number here is read the same way the tab it summarises reads it --
 * [questionCount] the same projected, visible-only pool
 * [com.synapse.android.feature.root.RootScreen.QuestionBankRoute] and
 * [com.synapse.android.feature.qbank.QuestionBankViewModel] read, [practicalCount]
 * the same pool [com.synapse.android.feature.practical.PracticalViewModel] reads,
 * [previousSittingsCount] the same session grouping
 * [com.synapse.android.feature.qbank.PreviousSittingsViewModel] reads -- so this
 * screen can never show a figure the tab it points at would contradict.
 *
 * [todayCount] is the one figure with real behaviour behind it: a port of
 * `TodaysTarget.tsx`, counting today's `qbank`-or-`room` attempts against
 * [HomeStats.DAILY_QUESTION_GOAL]. `AttemptLedger.records` is a one-shot read,
 * like [com.synapse.android.feature.qbank.PreviousSittingsViewModel]'s --
 * nothing on this screen ever writes an attempt, so there is nothing to keep
 * that read reactive for.
 */
class HomeViewModel(
    private val auth: AuthModel,
    private val store: LocalStore,
) : ViewModel() {
    private val backgroundScope = backgroundWorkScope("HomeViewModel")

    private val questionPool: StateFlow<List<Question>> = store.ledgerItems(ContentKind.QUESTION)
        .map { items -> items.filter { it.isStudentVisible }.mapNotNull(QuestionProjection::project) }
        .stateIn(backgroundScope, SharingStarted.Eagerly, emptyList())

    private val practicalPool: StateFlow<List<Practical>> = store.ledgerItems(ContentKind.PRACTICAL)
        .map { items -> items.filter { it.isStudentVisible }.mapNotNull(PracticalProjection::project) }
        .stateIn(backgroundScope, SharingStarted.Eagerly, emptyList())

    /** Reactive, unlike [_records]: a sitting started while this screen is open must resolve the resume card without leaving the tab. */
    private val liveSession: StateFlow<LiveSession?> = store.documentFlow(LiveSession.KEY)
        .map { doc ->
            doc?.json?.let { runCatching { CortexJson.decodeFromString(LiveSession.serializer(), it) }.getOrNull() }
        }
        .stateIn(backgroundScope, SharingStarted.Eagerly, null)

    private val _records = MutableStateFlow<List<AttemptRecord>>(emptyList())

    init {
        backgroundScope.launch { _records.value = AttemptLedger.records(store) }
    }

    val ui: StateFlow<HomeUi> = combine(
        auth.state, questionPool, practicalPool, liveSession, _records,
    ) { authState, questions, practicals, session, records ->
        val email = (authState as? AuthState.SignedIn)?.user?.email
        val name = HomeStats.displayName(email)
        val hour = LocalTime.now().hour

        val qbankRecords = records.filter { it.surface in DAILY_SURFACES }
        val todayCount = AttemptStats.dailyCounts(qbankRecords, days = 1, today = LocalDate.now())
            .firstOrNull()?.attempts ?: 0
        val previousSittings = AttemptStats.bySession(records).count { it.surface == SURFACE_QBANK }

        HomeUi(
            greeting = HomeStats.greeting(hour, name),
            todayCount = todayCount,
            goal = HomeStats.DAILY_QUESTION_GOAL,
            earned = HomeStats.earned(todayCount),
            avatarInitial = name.take(1).uppercase().ifEmpty { "S" },
            questionCount = questions.size,
            practicalCount = practicals.size,
            previousSittingsCount = previousSittings,
            resume = session?.takeIf { it.phase == PHASE_RUNNING }?.let {
                ResumeInfo(name = it.name, position = it.idx + 1, total = it.questionIds.size)
            },
        )
    }.stateIn(backgroundScope, SharingStarted.Eagerly, HomeUi.EMPTY)

    override fun onCleared() {
        backgroundScope.cancel()
    }

    companion object {
        /** Both surfaces a question can be answered on -- see `QBankStats.SURFACES`, ported the same way here. */
        private val DAILY_SURFACES = setOf("qbank", "room")
        private const val SURFACE_QBANK = "qbank"

        /** `"running"` -- the other clients' spelling; see `LiveSession.phase`. */
        private const val PHASE_RUNNING = "running"

        fun factory(auth: AuthModel, store: LocalStore) = viewModelFactory {
            initializer { HomeViewModel(auth, store) }
        }
    }
}
