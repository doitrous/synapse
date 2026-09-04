package com.synapse.android.feature.performance

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewmodel.initializer
import androidx.lifecycle.viewmodel.viewModelFactory
import com.synapse.android.core.backgroundWorkScope
import com.synapse.android.core.cache.LocalStore
import com.synapse.android.core.progress.AttemptLedger
import com.synapse.android.core.progress.AttemptRecord
import com.synapse.android.core.progress.AttemptStats
import com.synapse.android.core.progress.DayCount
import com.synapse.android.core.ui.EmptyConfig
import com.synapse.android.core.ui.UiState
import java.time.LocalDate
import kotlinx.coroutines.cancel
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.SharingStarted
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.map
import kotlinx.coroutines.flow.stateIn
import kotlinx.coroutines.launch

/** Accuracy for one subject/topic pair. A port of `bySubject` in `attemptStats.ts` and `PerformanceSummary.SubjectAccuracy` on iOS. */
data class SubjectBreakdown(val subjectId: String, val topic: String, val marked: Int, val correct: Int) {
    /** Non-null whenever this row exists at all -- see [performanceSummary]'s [MIN_MARKED_PER_SUBJECT] filter. */
    val accuracy: Double get() = if (marked > 0) correct.toDouble() / marked else 0.0
}

/** Accuracy for one authored difficulty. A port of `byDifficulty` in `attemptStats.ts` and iOS's `PerformanceSummary.DifficultyAccuracy`. */
data class DifficultyBreakdown(val difficulty: String, val marked: Int, val correct: Int) {
    val accuracy: Double get() = if (marked > 0) correct.toDouble() / marked else 0.0
}

/**
 * Every number [PerformanceScreen] paints, folded once from the attempt log.
 *
 * Mirrors iOS's `PerformanceSummary` and the web's `Performance.tsx`: overall
 * accuracy (gated behind [MIN_MARKED_FOR_ACCURACY] -- see [hasEnoughForAccuracy]),
 * a day streak, a short activity trend, and weakest-first subject/difficulty
 * breakdowns. Study minutes are not here -- see [PerformanceViewModel]'s class doc.
 */
data class PerformanceUi(
    val attempts: Int,
    val marked: Int,
    val correct: Int,
    val accuracy: Double?,
    val hasEnoughForAccuracy: Boolean,
    val streak: Int,
    val distinctItems: Int,
    /** Last [TREND_DAYS] days, oldest first, including empty ones -- see [AttemptStats.dailyCounts]. */
    val dailyCounts: List<DayCount>,
    /** Weakest first -- the order that answers "what should I study?", matching iOS and the web. */
    val bySubject: List<SubjectBreakdown>,
    /** Easy, Moderate, Hard, Challenging -- authored order, not accuracy order. */
    val byDifficulty: List<DifficultyBreakdown>,
)

/** Authored difficulty order, matching iOS's `PerformanceModel.summarise`. Not in [AttemptRecord] itself -- attempts arrive in no particular order. */
private val DIFFICULTY_ORDER = listOf("Easy", "Moderate", "Hard", "Challenging")

/** Below this many marked answers, accuracy is noise wearing the clothes of a measurement -- the same floor iOS (`PerformanceModel.minimumMarked`) and the web (`MIN_MARKED`) hold. */
const val MIN_MARKED_FOR_ACCURACY = 20

/** Per subject, the same idea at a smaller scale -- iOS's `minimumPerTopic`, the web's `MIN_PER_SUBJECT`. */
const val MIN_MARKED_PER_SUBJECT = 3

/** How far back the activity trend looks. Web's heatmap goes to 17 weeks; a phone screen does not have the room, so this keeps two weeks -- enough to show a streak breaking. */
const val TREND_DAYS = 14

/**
 * The pure records -> [PerformanceUi] fold, pulled out as a plain function
 * (like [com.synapse.android.feature.practical.practicalUiState]) so it is
 * testable with a plain JUnit test and no Robolectric.
 */
internal fun performanceSummary(records: List<AttemptRecord>, today: LocalDate = LocalDate.now()): PerformanceUi {
    val scored = AttemptStats.marked(records)
    val correct = scored.count { it.correct == true }

    val bySubject = records
        .groupBy { it.subjectId to it.topic }
        .map { (key, group) ->
            val groupScored = AttemptStats.marked(group)
            SubjectBreakdown(
                subjectId = key.first,
                topic = key.second,
                marked = groupScored.size,
                correct = groupScored.count { it.correct == true },
            )
        }
        .filter { it.marked >= MIN_MARKED_PER_SUBJECT }
        .sortedBy { it.accuracy }

    val byDifficulty = records
        .groupBy { it.difficulty }
        .map { (difficulty, group) ->
            val groupScored = AttemptStats.marked(group)
            DifficultyBreakdown(
                difficulty = difficulty,
                marked = groupScored.size,
                correct = groupScored.count { it.correct == true },
            )
        }
        .filter { it.marked > 0 }
        .sortedBy { DIFFICULTY_ORDER.indexOf(it.difficulty).let { i -> if (i < 0) Int.MAX_VALUE else i } }

    return PerformanceUi(
        attempts = records.size,
        marked = scored.size,
        correct = correct,
        accuracy = AttemptStats.accuracyOf(records),
        hasEnoughForAccuracy = scored.size >= MIN_MARKED_FOR_ACCURACY,
        streak = AttemptStats.currentStreak(records, today),
        distinctItems = AttemptStats.distinctItems(records),
        dailyCounts = AttemptStats.dailyCounts(records, days = TREND_DAYS, today = today),
        bySubject = bySubject,
        byDifficulty = byDifficulty,
    )
}

/**
 * [records] is `null` until the one-shot [AttemptLedger] read completes, `UiState.Loading`;
 * an empty list once loaded is `UiState.Empty`; otherwise the folded [performanceSummary].
 *
 * No `UiState.Error`/retry branch: unlike [com.synapse.android.feature.practical.PracticalViewModel],
 * this screen makes no network call of its own -- the attempt ledger is already
 * synced by the time a student opens it (see [PerformanceViewModel]'s class doc), so
 * there is nothing here for a Retry button to redo.
 */
internal fun performanceUiState(records: List<AttemptRecord>?): UiState<PerformanceUi> = when {
    records == null -> UiState.Loading
    records.isEmpty() -> UiState.Empty(
        EmptyConfig(
            title = "No attempts yet",
            description = "Solve some questions and your accuracy, streak and weak spots appear here.",
        ),
    )
    else -> UiState.Content(performanceSummary(records))
}

/**
 * The Android performance/progress dashboard (parity item G10) -- read-only,
 * built from the attempt ledger [com.synapse.android.core.progress.AttemptWriter]
 * already writes and [com.synapse.android.core.sync.SyncEngine] already syncs, so
 * this ViewModel needs neither a sync engine nor a connectivity monitor of its own.
 *
 * A one-shot [AttemptLedger.records] read on construction, exactly like
 * [com.synapse.android.feature.home.HomeViewModel]'s own `_records` and
 * [com.synapse.android.feature.qbank.PreviousSittingsViewModel]: nothing on this
 * screen writes an attempt, so there is nothing to keep the read reactive for, and
 * [com.synapse.android.feature.root.RootScreen] gives this screen a fresh
 * ViewModel every time it is navigated to (a plain nav-graph destination, not a
 * retained bottom-nav tab), so a student who answers questions and comes back
 * always sees a fresh ledger.
 *
 * // ponytail: study-minutes (the web's `StudyTimePanel`, reading the Build
 * // Maristanas minute ledger) is not here -- Android has no local reader for
 * // that ledger yet, only `core/progress` (attempts). Add a minutes panel once
 * // that ledger is synced locally; until then this screen is attempt-based only,
 * // same as iOS's `PerformanceView`.
 */
class PerformanceViewModel(private val store: LocalStore) : ViewModel() {
    private val backgroundScope = backgroundWorkScope("PerformanceViewModel")

    private val _records = MutableStateFlow<List<AttemptRecord>?>(null)

    init {
        backgroundScope.launch { _records.value = AttemptLedger.records(store) }
    }

    val uiState: StateFlow<UiState<PerformanceUi>> = _records
        .map(::performanceUiState)
        .stateIn(backgroundScope, SharingStarted.Eagerly, UiState.Loading)

    override fun onCleared() {
        backgroundScope.cancel()
    }

    companion object {
        fun factory(store: LocalStore) = viewModelFactory {
            initializer { PerformanceViewModel(store) }
        }
    }
}
