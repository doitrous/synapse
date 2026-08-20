package com.synapse.android.feature.practical

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewmodel.initializer
import androidx.lifecycle.viewmodel.viewModelFactory
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
import com.synapse.android.core.progress.AttemptIndex
import com.synapse.android.core.progress.AttemptMonth
import com.synapse.android.core.progress.AttemptRecord
import com.synapse.android.core.progress.AttemptStore
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
import kotlinx.coroutines.flow.SharingStarted
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.map
import kotlinx.coroutines.flow.stateIn
import kotlinx.coroutines.flow.update
import kotlinx.serialization.json.Json

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
 * [recordAttempt], which refuses a duplicate the same way
 * [com.synapse.android.feature.qbank.RunnerViewModel.recordAttempt] does:
 * [AttemptStore.addAttempt] hands back the exact [AttemptMonth] it was given
 * when the id already exists, and that identity check gates both the month
 * shard write and the index write, not just one of them. The `finished`-style
 * guards in this class (see [finishStation]) stop a second call from this
 * instance; the identity check is what also stops two *different* instances,
 * or a genuine retry, from double-counting.
 */
class PracticalViewModel(
    private val store: LocalStore,
    private val sync: SyncEngine,
) : ViewModel() {

    private val backgroundScope = CoroutineScope(SupervisorJob() + Dispatchers.Default)
    private val json = Json { ignoreUnknownKeys = true }

    val items: StateFlow<List<Practical>> = store.ledgerItems(ContentKind.PRACTICAL)
        .map { entries -> entries.filter { it.isStudentVisible }.mapNotNull(PracticalProjection::project) }
        .stateIn(backgroundScope, SharingStarted.Eagerly, emptyList())

    /** Display only -- see the class doc. */
    val progress: StateFlow<PracticalProgress> = store.documentFlow(PRACTICAL_PROGRESS_KEY)
        .map { doc -> doc?.json?.let { runCatching { json.decodeFromString(PracticalProgress.serializer(), it) }.getOrNull() } ?: PracticalProgress() }
        .stateIn(backgroundScope, SharingStarted.Eagerly, PracticalProgress())

    /** The mark-scheme items ticked in the station run currently open, seeded from the stored `checkedItems` by [openStation]. */
    private val _ticks = MutableStateFlow<Set<String>>(emptySet())
    val ticks: StateFlow<Set<String>> = _ticks.asStateFlow()

    /** Seconds left on the open station's clock, counting down from [openStationMinutes] `* 60`. */
    private val _remaining = MutableStateFlow(0)
    val remaining: StateFlow<Int> = _remaining.asStateFlow()

    /** Decision ids, lab-question ids, or oral-question ids revealed in whichever one of those screens is currently open. */
    private val _revealed = MutableStateFlow<Set<String>>(emptySet())
    val revealed: StateFlow<Set<String>> = _revealed.asStateFlow()

    private var tickerJob: Job? = null
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
        tickerJob?.cancel()
        finishedStation = null
        openStationMinutes = minutes ?: DEFAULT_STATION_MINUTES

        val current = loadProgress()
        _ticks.value = current.stations[stationId]?.checkedItems?.toSet() ?: emptySet()
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

        val checkedItems = _ticks.value.toList()
        val elapsedSeconds = maxOf(0, openStationMinutes * 60 - _remaining.value)
        val item = items.value.firstOrNull { it.id == stationId }
        val sessionId = "station-$stationId-${millisBase36()}"

        backgroundScope.launch {
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
        backgroundScope.launch {
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
     * [PracticalProgress.labs]. `done` is the pre-reveal count of already
     * revealed answers plus one, matching the web's `checked.size + 1`
     * (captured before its own reveal lands).
     */
    fun answerLabQuestion(labId: String, questionId: String, index: Int, totalItems: Int) {
        if (questionId in _revealed.value) return
        val done = _revealed.value.size + 1
        _revealed.update { it + questionId }

        val item = items.value.firstOrNull { it.id == labId }
        val sessionId = labSessionId ?: "lab-$labId-${millisBase36()}"
        backgroundScope.launch {
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
        backgroundScope.launch { mutateProgress { setSkillStatus(it, skillId, status, nowIso()) } }
    }

    /** Reveals an oral question's model answer. Purely local -- no progress write, no attempt, matching `OralTab`'s own reveal toggle. */
    fun revealOral(questionId: String) {
        _revealed.update { it + questionId }
    }

    /** A direct one-shot read, bypassing [progress] -- see the class doc. */
    private suspend fun loadProgress(): PracticalProgress =
        store.document(PRACTICAL_PROGRESS_KEY)?.json
            ?.let { runCatching { json.decodeFromString(PracticalProgress.serializer(), it) }.getOrNull() }
            ?: PracticalProgress()

    /**
     * Reads the whole four-section document, folds [transform] over it, and
     * writes the whole document back -- never just the section this call
     * touched. That is what lets a section this app never touches (see this
     * task's brief) survive every write here.
     */
    private suspend fun mutateProgress(transform: (PracticalProgress) -> PracticalProgress): PracticalProgress {
        val updated = transform(loadProgress())
        sync.write(PRACTICAL_PROGRESS_KEY, json.encodeToString(PracticalProgress.serializer(), updated))
        return updated
    }

    /**
     * A direct port of [com.synapse.android.feature.qbank.RunnerViewModel.recordAttempt]'s
     * read-modify-write, adapted to the surfaces this screen writes.
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
        val now = Instant.now()
        val record = AttemptRecord(
            id = AttemptStore.attemptId(sessionId, surface, itemId),
            at = now.toString(),
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
