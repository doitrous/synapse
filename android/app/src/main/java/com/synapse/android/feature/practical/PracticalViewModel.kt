package com.synapse.android.feature.practical

import android.util.Log
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewmodel.initializer
import androidx.lifecycle.viewmodel.viewModelFactory
import com.synapse.android.core.BACKGROUND_WORK_TAG
import com.synapse.android.core.CortexJson
import com.synapse.android.core.backgroundWorkScope
import com.synapse.android.core.cache.LocalStore
import com.synapse.android.core.model.ContentKind
import com.synapse.android.core.model.Practical
import com.synapse.android.core.model.PracticalProjection
import com.synapse.android.core.practical.PRACTICAL_PROGRESS_KEY
import com.synapse.android.core.practical.PracticalProgress
import com.synapse.android.core.practical.recordCaseStep
import com.synapse.android.core.practical.recordLabAnswered
import com.synapse.android.core.practical.recordStationRun
import com.synapse.android.core.practical.setSkillStatus
import com.synapse.android.core.progress.AttemptRecord
import com.synapse.android.core.progress.AttemptStore
import com.synapse.android.core.progress.writeAttempt
import com.synapse.android.core.sync.SyncEngine
import java.time.Instant
import kotlinx.coroutines.CancellationException
import kotlinx.coroutines.Job
import kotlinx.coroutines.cancel
import kotlinx.coroutines.delay
import kotlinx.coroutines.launch
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.SharingStarted
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.map
import kotlinx.coroutines.flow.stateIn
import kotlinx.coroutines.flow.update
import kotlinx.coroutines.flow.updateAndGet
import kotlinx.coroutines.sync.Mutex
import kotlinx.coroutines.sync.withLock

/** Which of the list's three live tabs an authored [Practical.type] belongs on. A port of the routing in `useLivePracticals.ts:74-86`. */
enum class PracticalTab { OSCE, CASES, LAB }

/**
 * "OSCE station" and "Skills checklist" (an *authored* checklist station,
 * not the bundled curriculum list -- see [PracticalListScreen]) both land on
 * [PracticalTab.OSCE]; "Clinical case" is its own tab; "Lab interpretation"
 * and "Imaging interpretation" share [PracticalTab.LAB], distinguished only
 * by icon. Anything else is not a live practical tab at all.
 */
fun practicalTab(type: String): PracticalTab? = when (type) {
    "OSCE station", "Skills checklist" -> PracticalTab.OSCE
    "Clinical case" -> PracticalTab.CASES
    "Lab interpretation", "Imaging interpretation" -> PracticalTab.LAB
    else -> null
}

/**
 * Sits a student through every practical format: OSCE stations, clinical
 * cases, lab/imaging sets, and the bundled skills checklist and oral bank.
 *
 * [items] mirrors [com.synapse.android.feature.qbank.QuestionBankViewModel.pool] --
 * every published practical, one [Practical] class for all five authored
 * types (see [Practical.type]).
 *
 * [progress] is read from [LocalStore.documentFlow] for display, but no
 * mutation here ever trusts it -- an eagerly-collected [StateFlow] built on
 * construction is not guaranteed to reflect a write this same instance (or a
 * sibling instance -- see the "ticks survive leaving and reopening a
 * station" test, which opens a second [PracticalViewModel] against the same
 * store) made moments earlier. Every write-path method instead calls
 * [loadProgress], a direct one-shot [LocalStore.document] read, the same way
 * `RootScreen.QuestionBankRoute` resumes a [com.synapse.android.core.qbank.LiveSession]
 * without trusting any ViewModel's own eagerly-collected pool.
 *
 * The station clock ([remaining]) is the one piece of state a second thread
 * writes -- the ticker, running on [backgroundScope] -- so every write to it
 * goes through [MutableStateFlow.update], never a read-then-set. See
 * [openStation].
 *
 * [finishStation], [answerCaseDecision] and [answerLabQuestion] all end in
 * [recordAttempt], which hands the record to
 * [com.synapse.android.core.progress.writeAttempt] -- the one shared
 * implementation, used by the question bank runner too. It refuses a
 * duplicate: [AttemptStore.addAttempt] hands back the exact
 * [com.synapse.android.core.progress.AttemptMonth] it was given when the id
 * already exists, and that identity check gates both the month shard write
 * and the index write, not just one of them.
 *
 * **Every mutation runs through [mutate], and so inside [mutation].** The three methods above are
 * driven by *independent* user taps -- a lab set shows every question's
 * Reveal button at once -- so two of them a few hundred milliseconds apart
 * used to start two coroutines that each read the progress document, each
 * folded their own change onto what they read, and each wrote the whole
 * thing back. Last write wins: one reveal silently vanishes, and so does one
 * record from the month shard and one fold from the index totals. The
 * duplicate check above does not help with that -- it prevents duplicates,
 * not lost updates. Only serialising the whole read-fold-write path does,
 * and the progress fold and the attempt write have to be inside the *same*
 * critical section because both are read-modify-writes of documents the next
 * tap is about to read.
 *
 * Note what a [Mutex] is not: it cannot serialise two *instances* of this
 * class, or this app against the web. Those are resolved by
 * [com.synapse.android.core.sync.SyncEngine]'s own precedence rules, not here.
 */
class PracticalViewModel(
    private val store: LocalStore,
    private val sync: SyncEngine,
) : ViewModel() {
    private val backgroundScope = backgroundWorkScope("PracticalViewModel")

    /** Serialises the whole read-fold-write path -- see the class doc. */
    private val mutation = Mutex()

    val items: StateFlow<List<Practical>> = store.ledgerItems(ContentKind.PRACTICAL)
        .map { entries -> entries.filter { it.isStudentVisible }.mapNotNull(PracticalProjection::project) }
        .stateIn(backgroundScope, SharingStarted.Eagerly, emptyList())

    /** Display only -- see the class doc. */
    val progress: StateFlow<PracticalProgress> = store.documentFlow(PRACTICAL_PROGRESS_KEY)
        .map { doc -> doc?.json?.let { runCatching { CortexJson.decodeFromString(PracticalProgress.serializer(), it) }.getOrNull() } ?: PracticalProgress() }
        .stateIn(backgroundScope, SharingStarted.Eagerly, PracticalProgress())

    /** The mark-scheme items ticked in the station run currently open, seeded from the stored `checkedItems` by [openStation]. */
    private val _ticks = MutableStateFlow<Set<String>>(emptySet())
    val ticks: StateFlow<Set<String>> = _ticks.asStateFlow()

    /** Seconds left on the open station's clock, counting down from [openStationMinutes] `* 60`. */
    private val _remaining = MutableStateFlow(0)
    val remaining: StateFlow<Int> = _remaining.asStateFlow()

    /**
     * Set when a write the student made did not reach the disk.
     *
     * Every path in here that writes goes through [mutate], and the one
     * failure [mutate] is really guarding against is [loadProgress] refusing
     * to decode a stored document written by a client that knows a shape
     * this build does not. Refusing is right -- see [loadProgress] -- but it
     * leaves the student's tap having done nothing, and a silent nothing is
     * the worst of the three outcomes available: worse than the crash it
     * replaces, because a student who watches a station bank cleanly and
     * finds it missing a week later has no idea when it went.
     *
     * A boolean rather than a message: there is one thing that goes wrong
     * here, and the words for it belong on the screen that says them, not
     * in a ViewModel.
     */
    private val _saveFailed = MutableStateFlow(false)
    val saveFailed: StateFlow<Boolean> = _saveFailed.asStateFlow()

    /** Decision ids, lab-question ids, or oral-question ids revealed in whichever one of those screens is currently open. */
    private val _revealed = MutableStateFlow<Set<String>>(emptySet())
    val revealed: StateFlow<Set<String>> = _revealed.asStateFlow()

    private var tickerJob: Job? = null
    private var openStationId: String? = null
    private var openStationMinutes: Int = DEFAULT_STATION_MINUTES
    private var finishedStation: String? = null
    private var caseSessionId: String? = null
    private var labSessionId: String? = null

    /**
     * Opens [stationId]'s run: seeds [ticks] from the last run's
     * `checkedItems` (a direct [loadProgress] read -- see the class doc),
     * resets the clock to [minutes] (or [DEFAULT_STATION_MINUTES], matching
     * `target.minutes ?? 8` in `PracticalRunner.tsx`), and starts the
     * once-a-second countdown.
     */
    suspend fun openStation(stationId: String, minutes: Int? = null) {
        // Reopening the run that is already open is not a new run.
        //
        // A configuration change destroys and rebuilds the composition, so
        // the reader's `LaunchedEffect(station.id)` calls this again for a
        // station the student is still sitting. This ViewModel itself
        // survives that -- it is held by the navigation entry's retained
        // ViewModelStore, so [ticks] and [remaining] come through a rotation
        // intact -- and re-seeding here is what used to throw them away:
        // every tick since the last banked run replaced by that run's stored
        // `checkedItems`, and the clock reset to full. An active ticker is
        // exactly the "a run is in progress" signal, and both ways out of a
        // run ([finishStation] and [abandonStation]) cancel it, so a genuine
        // reopen still seeds normally.
        if (stationId == openStationId && tickerJob?.isActive == true) return

        tickerJob?.cancel()
        openStationId = stationId
        finishedStation = null
        openStationMinutes = minutes ?: DEFAULT_STATION_MINUTES

        // Tolerant on purpose, and the only read here that is. Nothing is
        // written from it: the worst an unreadable document costs is a run
        // that starts with no ticks restored, which is a great deal better
        // than throwing a student out of a station they can still sit. The
        // *write* path must not do this -- see [loadProgress].
        val current = runCatching { loadProgress() }.getOrNull()
        _ticks.value = current?.stations?.get(stationId)?.checkedItems?.toSet() ?: emptySet()
        _remaining.update { openStationMinutes * 60 }

        tickerJob = backgroundScope.launch {
            while (true) {
                delay(1_000)
                _remaining.update { if (it > 0) it - 1 else it }
            }
        }
    }

    fun tick(itemId: String, ticked: Boolean) {
        _ticks.update { current -> if (ticked) current + itemId else current - itemId }
    }

    /**
     * Banks the open run: folds it into [PracticalProgress.stations] and logs
     * a `"station"` attempt with a null mark -- nobody but the student marked
     * it. Guarded by [finishedStation] so a second tap on an already-finished
     * run cannot re-log it from this instance; [recordAttempt]'s own identity
     * check (see the class doc) is what stops it from a second instance too.
     */
    fun finishStation(stationId: String, marks: Int, outOf: Int) {
        if (finishedStation == stationId) return
        finishedStation = stationId
        tickerJob?.cancel()
        tickerJob = null
        // Banking the run closes it. Leaving [openStationId] set would say a
        // run is still open, and the next [openStation] for this station
        // would then have to be told apart from a reopen by the ticker alone.
        openStationId = null

        val checkedItems = _ticks.value.toList()
        val elapsedSeconds = maxOf(0, openStationMinutes * 60 - _remaining.value)
        val item = items.value.firstOrNull { it.id == stationId }
        val sessionId = "station-$stationId-${millisBase36()}"

        mutate {
            mutateProgress { recordStationRun(it, stationId, marks, outOf, checkedItems, nowIso()) }
            recordAttempt(
                surface = SURFACE_STATION,
                itemId = stationId,
                subjectId = item?.subjectId.orEmpty(),
                topic = item?.title ?: stationId,
                correct = null,
                seconds = elapsedSeconds,
                sessionId = sessionId,
            )
        }
    }

    /**
     * Leaves an open station without banking it.
     *
     * A student who opened a station by mistake needs a way out that is not
     * "Finish station" -- that button writes a real `"station"` attempt and a
     * station-run fold for a run that never happened, putting a score nobody
     * sat into their record. This stops the clock and drops the run's local
     * state, and deliberately writes nothing at all: no progress fold, no
     * attempt, nothing queued for the server. The ticks already stored from a
     * *previous*, genuinely finished run are untouched, so reopening the
     * station still resumes from them.
     */
    fun abandonStation() {
        tickerJob?.cancel()
        tickerJob = null
        openStationId = null
        finishedStation = null
        _ticks.value = emptySet()
        _remaining.value = 0
    }

    /** Mints this case run's session id and clears any decisions revealed by a previous run. */
    fun openCase(caseId: String) {
        _revealed.value = emptySet()
        caseSessionId = "case-$caseId-${millisBase36()}"
    }

    /**
     * Reveals decision [index] of [caseId] and folds it into
     * [PracticalProgress.cases]. Guarded by [revealed] itself -- once
     * revealed, answering again is a no-op, matching the web's own
     * `if (choices[idx] != null ...) return` guard.
     */
    fun answerCaseDecision(caseId: String, decisionId: String, index: Int, totalSteps: Int) {
        if (decisionId in _revealed.value) return
        _revealed.update { it + decisionId }

        val item = items.value.firstOrNull { it.id == caseId }
        val sessionId = caseSessionId ?: "case-$caseId-${millisBase36()}"
        mutate {
            mutateProgress {
                recordCaseStep(it, caseId, lastStep = index + 1, steps = totalSteps, completed = index + 1 >= totalSteps, at = nowIso())
            }
            recordAttempt(
                surface = SURFACE_CASE,
                itemId = "$caseId:$index",
                subjectId = item?.subjectId.orEmpty(),
                topic = item?.title ?: caseId,
                correct = null,
                seconds = null,
                sessionId = sessionId,
            )
        }
    }

    /** Mints this lab run's session id and clears any answers revealed by a previous run. */
    fun openLab(labId: String) {
        _revealed.value = emptySet()
        labSessionId = "lab-$labId-${millisBase36()}"
    }

    /**
     * Reveals question [index] of [labId] and folds it into
     * [PracticalProgress.labs]. `done` is how many answers stand revealed
     * once this one has landed, matching the web's `checked.size + 1`
     * (captured before its own reveal lands).
     *
     * That count comes off the value [MutableStateFlow.updateAndGet]
     * actually committed, not off a read taken before it: a lab set shows
     * every Reveal button at once, so two taps a moment apart would both
     * read the pre-reveal size and both claim to be `done = 1`. The lambda
     * stays pure -- `updateAndGet` is a compare-and-set retry loop and may
     * run it more than once.
     */
    fun answerLabQuestion(labId: String, questionId: String, index: Int, totalItems: Int) {
        if (questionId in _revealed.value) return
        val done = _revealed.updateAndGet { it + questionId }.size

        val item = items.value.firstOrNull { it.id == labId }
        val sessionId = labSessionId ?: "lab-$labId-${millisBase36()}"
        mutate {
            mutateProgress { recordLabAnswered(it, labId, done = done, items = totalItems, at = nowIso()) }
            recordAttempt(
                surface = SURFACE_LAB,
                itemId = "$labId:$index",
                subjectId = item?.subjectId.orEmpty(),
                topic = item?.title ?: labId,
                correct = null,
                seconds = null,
                sessionId = sessionId,
            )
        }
    }

    /** Cycles a bundled skill's status. Writes [PracticalProgress.skills] only -- never an attempt; there is nothing to attempt here. */
    fun markSkill(skillId: String, status: String) {
        mutate { mutateProgress { setSkillStatus(it, skillId, status, nowIso()) } }
    }

    /** Reveals an oral question's model answer. Purely local -- no progress write, no attempt, matching `OralTab`'s own reveal toggle. */
    fun revealOral(questionId: String) {
        _revealed.update { it + questionId }
    }

    /**
     * Runs one student-made change: on [backgroundScope], inside [mutation],
     * and without taking the app down if it fails.
     *
     * The three things it guarantees are each load-bearing, and are here
     * rather than at the four call sites because getting one of them wrong
     * at one call site is invisible.
     *
     * [mutation] is why the whole read-fold-write path is serialised -- see
     * the class doc. [backgroundScope] is why this is not `viewModelScope`
     * -- see [backgroundWorkScope]. And the catch is why a stored document
     * this build cannot read costs the student one save instead of the
     * process: [loadProgress] throws on purpose, and an exception thrown out
     * of a `launch` reaches Android's uncaught handler, which kills the app.
     * [backgroundWorkScope] already stops that; this is what turns the
     * survivable failure into one the student is actually told about.
     *
     * [CancellationException] is rethrown untouched. A cancelled scope is
     * the ViewModel being cleared, not a save that failed, and reporting it
     * as one would put a "couldn't save" notice on the way out of a screen
     * that saved perfectly well.
     */
    private fun mutate(work: suspend () -> Unit) {
        backgroundScope.launch {
            mutation.withLock {
                try {
                    work()
                } catch (e: CancellationException) {
                    throw e
                } catch (e: Exception) {
                    Log.e(BACKGROUND_WORK_TAG, "PracticalViewModel: a student's change was not saved", e)
                    _saveFailed.value = true
                }
            }
        }
    }

    /** Dismisses the [saveFailed] notice. The failure itself is not retried -- nothing about it would go differently. */
    fun acknowledgeSaveFailure() {
        _saveFailed.value = false
    }

    /**
     * A direct one-shot read, bypassing [progress] -- see the class doc.
     *
     * **Throws if the stored document will not decode, and must keep
     * throwing.** No document yet is `null`, and that is the only thing that
     * legitimately becomes an empty [PracticalProgress]. A document that is
     * *there* but unreadable is something else entirely: fold an empty
     * document over it and the very next [mutateProgress] writes that empty
     * document back over a real one, erasing the student's `stations`,
     * `cases`, `labs` and `skills` in a single write, on every client. That
     * is exactly the loss this task's brief exists to prevent, arriving
     * through a different door. Every other persisted student document in
     * this app is decoded the same throwing way -- see
     * `RunnerViewModel.recordAttempt` and `QuestionBankViewModel.readNames`.
     * [progress], which only ever paints a screen, is the one place a
     * fallback is right.
     */
    private suspend fun loadProgress(): PracticalProgress =
        store.document(PRACTICAL_PROGRESS_KEY)?.json
            ?.let { CortexJson.decodeFromString(PracticalProgress.serializer(), it) }
            ?: PracticalProgress()

    /**
     * Reads the whole four-section document, folds [transform] over it, and
     * writes the whole document back -- never just the section this call
     * touched. That is what lets a section this app never touches (see this
     * task's brief) survive every write here.
     *
     * Call it inside [mutation] -- the read and the write are not atomic on
     * their own.
     */
    private suspend fun mutateProgress(transform: (PracticalProgress) -> PracticalProgress): PracticalProgress {
        val updated = transform(loadProgress())
        sync.write(PRACTICAL_PROGRESS_KEY, CortexJson.encodeToString(PracticalProgress.serializer(), updated))
        return updated
    }

    /**
     * Describes one practical attempt and hands it to
     * [com.synapse.android.core.progress.writeAttempt], the shared writer the
     * question bank uses too.
     *
     * [difficulty] is always the literal [DIFFICULTY_MODERATE] -- confirmed
     * against `PracticalRunner.tsx` (lines 211, 455, 574), the web hardcodes
     * `'Moderate'` on every one of these three calls rather than reading the
     * item's own difficulty field, and this is a verbatim port of that.
     */
    private suspend fun recordAttempt(
        surface: String,
        itemId: String,
        subjectId: String,
        topic: String,
        correct: Boolean?,
        seconds: Int?,
        sessionId: String,
    ) {
        val record = AttemptRecord(
            id = AttemptStore.attemptId(sessionId, surface, itemId),
            at = Instant.now().toString(),
            surface = surface,
            itemId = itemId,
            subjectId = subjectId,
            topic = topic,
            difficulty = DIFFICULTY_MODERATE,
            conceptIds = emptyList(),
            correct = correct,
            seconds = seconds,
            sessionId = sessionId,
        )
        writeAttempt(store, sync, record)
    }

    private fun nowIso(): String = Instant.now().toString()

    private fun millisBase36(): String = java.lang.Long.toString(System.currentTimeMillis(), 36)

    override fun onCleared() {
        tickerJob?.cancel()
        backgroundScope.cancel()
    }

    companion object {
        private const val SURFACE_STATION = "station"
        private const val SURFACE_CASE = "case"
        private const val SURFACE_LAB = "lab"

        /** Hardcoded on every practical attempt -- see [recordAttempt]. */
        private const val DIFFICULTY_MODERATE = "Moderate"

        /** `target.minutes ?? 8` in `PracticalRunner.tsx`. */
        private const val DEFAULT_STATION_MINUTES = 8

        fun factory(store: LocalStore, sync: SyncEngine) = viewModelFactory {
            initializer { PracticalViewModel(store, sync) }
        }
    }
}
