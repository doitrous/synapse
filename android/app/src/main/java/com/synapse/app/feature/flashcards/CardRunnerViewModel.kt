package com.synapse.app.feature.flashcards

import androidx.annotation.StringRes
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.synapse.app.R
import com.synapse.app.core.flashcards.AnkiDefaults
import com.synapse.app.core.flashcards.CardSchedule
import com.synapse.app.core.flashcards.CardState
import com.synapse.app.core.flashcards.DeckCard
import com.synapse.app.core.flashcards.Grade
import com.synapse.app.core.flashcards.StudyCard
import com.synapse.app.core.flashcards.grade as computeGrade
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.CancellationException
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch
import java.time.Instant
import java.time.ZoneId
import java.time.temporal.ChronoUnit
import java.util.Locale
import javax.inject.Inject
import kotlin.math.max
import kotlin.math.roundToInt
import kotlin.math.roundToLong

/**
 * The fixed queue a study session works through, snapshotted once at
 * [CardRunnerViewModel.begin] — see that function's doc comment for why it is
 * never re-derived mid-session.
 */
data class StudySession(
    val deckId: String,
    val deckTitle: String,
    val queue: List<StudyCard>,
    val cardsById: Map<String, DeckCard>,
)

/** A one-shot signal ([FlashcardsViewModel.startStudy]) that a session was built and is ready to run. */
data class StudyStart(val session: StudySession, val sessionId: String)

/**
 * One of the four grade buttons: its [grade], its localized name resource [labelRes], and its
 * already-formatted, locale-invariant Anki-style [interval] (e.g. "10m", "4d") — see
 * [formatInterval]'s doc comment for why that compact notation is never translated.
 */
data class GradeOption(val grade: Grade, @StringRes val labelRes: Int, val interval: String)

/**
 * What [CardRunnerScreen] renders. No score/accuracy field exists here by design — a flashcard
 * grade is a self-report of recall quality, not a marked answer (see [FlashcardsRepository]'s
 * doc comment on why attempt logging stays deferred). [studied] and [graduatedLater] are the only
 * numbers the end-of-session summary reports.
 */
data class CardRunnerUiState(
    val deckTitle: String = "",
    /** 1-based position of the current card within [total]. Meaningless once [finished]. */
    val position: Int = 0,
    /** Fixed at session start; never changes mid-session (see [StudySession]). */
    val total: Int = 0,
    val front: String = "",
    val back: String = "",
    val revealed: Boolean = false,
    /** The four grade buttons' live-computed labels. Empty until [revealed]. */
    val gradeOptions: List<GradeOption> = emptyList(),
    val studied: Int = 0,
    /** How many of [studied] now have a `due` date more than zero days out. */
    val graduatedLater: Int = 0,
    val finished: Boolean = false,
)

/**
 * Drives one study session over a [StudySession] snapshot: revealing a card's back, grading it
 * against the four live-computed [GradeOption]s, and finishing into an end-of-session summary.
 *
 * [begin] hands this view model a queue already snapshotted by [FlashcardsViewModel.startStudy] —
 * mirroring [com.synapse.app.feature.qbank.SessionViewModel.begin], calling it again with the
 * same `sessionId` is a no-op, so a recomposition-driven re-invocation (e.g. a
 * `LaunchedEffect(studyStart)`) doesn't reset progress or a configuration change drop it (this
 * view model, resolved via `hiltViewModel()` against the flashcards destination's back-stack
 * entry, survives rotation the same way [com.synapse.app.feature.qbank.SessionViewModel] does).
 *
 * [grade] persists the graded card's new [CardSchedule] via [GradeSink] — a fire-and-forget
 * `viewModelScope.launch`, not awaited before advancing: the local-first architecture treats the
 * write as reliable, and a student grading a self-reported recall has nothing to gain from
 * watching a spinner (unlike [com.synapse.app.feature.qbank.SessionViewModel]'s finished-sitting
 * save, there is no student-facing failure/retry state here).
 */
@HiltViewModel
class CardRunnerViewModel @Inject constructor(
    private val gradeSink: GradeSink,
) : ViewModel() {

    var now: () -> Instant = Instant::now

    private var started = false
    private var sessionId: String = ""
    private var deckId: String = ""
    private var deckTitle: String = ""
    private var cardsById: Map<String, DeckCard> = emptyMap()
    private var queue: List<StudyCard> = emptyList()
    private var total: Int = 0
    private var studied: Int = 0
    private var graduatedLater: Int = 0
    private var revealed: Boolean = false

    private val _uiState = MutableStateFlow(CardRunnerUiState())
    val uiState: StateFlow<CardRunnerUiState> = _uiState.asStateFlow()

    /** Start (or re-enter) a session. A no-op if already showing [sessionId]. */
    fun begin(session: StudySession, sessionId: String) {
        if (started && this.sessionId == sessionId) return

        started = true
        this.sessionId = sessionId
        deckId = session.deckId
        deckTitle = session.deckTitle
        cardsById = session.cardsById
        queue = session.queue
        total = session.queue.size
        studied = 0
        graduatedLater = 0
        revealed = false
        refresh()
    }

    /** Reveals the current card's back and the four live-computed grade options. */
    fun showAnswer() {
        if (queue.isEmpty()) return
        revealed = true
        refresh()
    }

    /**
     * Grades the current card: computes its next [CardSchedule], fires the [gradeSink] write,
     * bumps [studied]/[graduatedLater], and advances to the next card in the snapshot — never
     * back into the queue this session (see [StudySession]'s doc comment).
     */
    fun grade(answer: Grade) {
        val current = queue.firstOrNull() ?: return
        val instant = now()
        val wasNew = current.schedule.state == CardState.New
        val next = computeGrade(current.schedule, answer, instant, AnkiDefaults)

        viewModelScope.launch {
            try {
                gradeSink.persist(deckId, current.id, next, wasNew, instant)
            } catch (e: CancellationException) {
                throw e
            } catch (e: Exception) {
                // Best-effort local write: flashcards grading intentionally has no save/retry UI
                // (a grade is a self-report, not a marked answer). A failed persist must not crash
                // the study session out from under the student mid-sitting — the next successful
                // write, or the next refresh's server pull, reconciles.
            }
        }

        studied++
        if (dayDiff(next.due, instant) > 0) graduatedLater++
        queue = queue.drop(1)
        revealed = false
        refresh()
    }

    /**
     * Whether a session is currently loaded. Survives a configuration change (the view model
     * outlives the Activity), false after process death — [FlashcardsRoot] uses it the same way
     * [com.synapse.app.feature.qbank.QuestionBankRoot] uses
     * [com.synapse.app.feature.qbank.SessionViewModel.hasActiveSession].
     */
    fun hasActiveSession(): Boolean = started

    private fun refresh() {
        val current = queue.firstOrNull()
        val card = current?.let { cardsById[it.id] }
        val instant = now()
        _uiState.value = CardRunnerUiState(
            deckTitle = deckTitle,
            position = total - queue.size + 1,
            total = total,
            front = card?.front.orEmpty(),
            back = card?.back.orEmpty(),
            revealed = revealed,
            gradeOptions = if (revealed && current != null) gradeOptions(current.schedule, instant) else emptyList(),
            studied = studied,
            graduatedLater = graduatedLater,
            finished = current == null,
        )
    }

    private fun gradeOptions(schedule: CardSchedule, instant: Instant): List<GradeOption> =
        Grade.entries.map { g ->
            val next = computeGrade(schedule, g, instant, AnkiDefaults)
            GradeOption(g, g.labelRes(), formatInterval(next, instant))
        }
}

@StringRes
private fun Grade.labelRes(): Int = when (this) {
    Grade.Again -> R.string.flashcards_grade_again
    Grade.Hard -> R.string.flashcards_grade_hard
    Grade.Good -> R.string.flashcards_grade_good
    Grade.Easy -> R.string.flashcards_grade_easy
}

/** Whole local-calendar days between [from] and the local-calendar day [dueIso] falls on. */
private fun dayDiff(dueIso: String, from: Instant): Long {
    val zone = ZoneId.systemDefault()
    val target = Instant.parse(dueIso).atZone(zone).toLocalDate()
    val base = from.atZone(zone).toLocalDate()
    return ChronoUnit.DAYS.between(base, target)
}

/**
 * Compact, Anki-style interval text: "10m", "4d", "3mo", "1y" — a verbatim port of
 * `formatInterval` in `src/components/flashcards/CardRunner.tsx`.
 *
 * A learning/relearning card is scheduled in minutes off its `due` timestamp; a review card
 * carries its interval in whole days directly — reading the field that matches the state is what
 * keeps a fresh "Good" from reporting "0d" instead of the minutes it actually waits.
 */
fun formatInterval(schedule: CardSchedule, from: Instant): String {
    if (schedule.state == CardState.Review) {
        val days = schedule.interval
        return when {
            days < 30 -> "${days}d"
            days < 365 -> "${max(1, (days / 30.0).roundToInt())}mo"
            else -> {
                val years = days / 365.0
                val text = if (days < 3650) {
                    String.format(Locale.US, "%.1f", years)
                } else {
                    String.format(Locale.US, "%.0f", years)
                }
                "${text}y"
            }
        }
    }
    val minutes = max(1L, ((Instant.parse(schedule.due).toEpochMilli() - from.toEpochMilli()) / 60_000.0).roundToLong())
    return if (minutes < 60) "${minutes}m" else "${(minutes / 60.0).roundToLong()}h"
}
