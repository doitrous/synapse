package com.synapse.android.feature.adaptive

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewmodel.initializer
import androidx.lifecycle.viewmodel.viewModelFactory
import com.synapse.android.core.ConnectivityMonitor
import com.synapse.android.core.CortexJson
import com.synapse.android.core.adaptive.AdaptiveConfig
import com.synapse.android.core.adaptive.AdaptiveEvidenceEvent
import com.synapse.android.core.adaptive.AdaptiveEvidenceStore
import com.synapse.android.core.adaptive.AdaptiveExam
import com.synapse.android.core.adaptive.Allocation
import com.synapse.android.core.adaptive.AllocationNeed
import com.synapse.android.core.adaptive.AllocationPlan
import com.synapse.android.core.adaptive.AllocationShares
import com.synapse.android.core.adaptive.AdaptiveMastery
import com.synapse.android.core.adaptive.BlueprintNode
import com.synapse.android.core.adaptive.BuildCrashInput
import com.synapse.android.core.adaptive.BuildPlanInput
import com.synapse.android.core.adaptive.ConceptGraphDoc
import com.synapse.android.core.adaptive.ConceptState
import com.synapse.android.core.adaptive.ConceptStatus
import com.synapse.android.core.adaptive.Coverage
import com.synapse.android.core.adaptive.CoverageDebt
import com.synapse.android.core.adaptive.CoverageState
import com.synapse.android.core.adaptive.CrashCourse
import com.synapse.android.core.adaptive.CrashProgramme
import com.synapse.android.core.adaptive.DayCapacity
import com.synapse.android.core.adaptive.PlanNeedInput
import com.synapse.android.core.adaptive.ReadinessResult
import com.synapse.android.core.adaptive.StudySchedule
import com.synapse.android.core.adaptive.WeeklyPlan
import com.synapse.android.core.adaptive.rawWrongAttempts
import com.synapse.android.core.backgroundWorkScope
import com.synapse.android.core.cache.LocalStore
import com.synapse.android.core.calendar.MODULE_SCHEDULES_KEY
import com.synapse.android.core.model.ContentKind
import com.synapse.android.core.model.QuestionProjection
import com.synapse.android.core.sync.SyncEngine
import com.synapse.android.core.sync.SyncStatus
import com.synapse.android.core.ui.EmptyConfig
import com.synapse.android.core.ui.UiState
import java.time.DayOfWeek
import java.time.Instant
import java.time.LocalDate
import java.time.ZoneOffset
import java.time.temporal.TemporalAdjusters
import kotlinx.coroutines.cancel
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.SharingStarted
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.combine
import kotlinx.coroutines.flow.flowOf
import kotlinx.coroutines.flow.map
import kotlinx.coroutines.flow.stateIn
import kotlinx.coroutines.launch
import kotlinx.serialization.builtins.ListSerializer

/**
 * Everything the Adaptive Study dashboard computes, on the device, from the
 * synced ledger and blueprint. The Android counterpart of iOS's
 * `AdaptiveStudyModel` / web's `useAdaptiveStudy` -- nothing here asks a server
 * what a student knows; it replays the evidence ledger through the versioned
 * mastery model and derives every figure from that.
 *
 * All reads go through [LocalStore] and every decode is tolerant: a malformed or
 * absent document falls back (default config, empty blueprint, no readiness)
 * rather than crashing the surface.
 */
class AdaptiveStudyViewModel(
    private val store: LocalStore,
    private val sync: SyncEngine,
    connectivity: ConnectivityMonitor? = null,
) : ViewModel() {

    private val scope = backgroundWorkScope("AdaptiveStudyViewModel")

    /**
     * Minutes a day the student says they have. Held, not saved -- matching web
     * and iOS: it is a dial for "what would my week look like at two hours a
     * day", and a stored answer goes stale the moment a timetable changes.
     */
    private val _minutesPerDay = MutableStateFlow(90)
    val minutesPerDay: StateFlow<Int> = _minutesPerDay.asStateFlow()

    fun setMinutesPerDay(value: Int) { _minutesPerDay.value = value.coerceIn(0, 600) }

    /**
     * Recomputed on every sync and every ledger change. Holds everything that
     * does not depend on the [minutesPerDay] dial; the weekly plan is derived
     * from this plus the dial in [uiState].
     */
    private val computed: StateFlow<Computed?> =
        combine(sync.status, store.ledgerItems(ContentKind.QUESTION)) { _, items -> items }
            .map { items -> load(items) }
            .stateIn(scope, SharingStarted.Eagerly, null)

    val uiState: StateFlow<UiState<AdaptiveStudyData>> =
        combine(computed, _minutesPerDay, sync.status, connectivity?.isOnline ?: flowOf(true)) {
                current, minutes, status, online ->
            adaptiveUiState(current, minutes, status, online, retry = ::retrySync)
        }.stateIn(scope, SharingStarted.Eagerly, UiState.Loading)

    private fun retrySync() { scope.launch { sync.refresh() } }

    override fun onCleared() {
        scope.cancel()
    }

    private suspend fun load(items: List<com.synapse.android.core.model.LedgerItem>): Computed {
        val config = decode(AdaptiveConfig.KEY, AdaptiveConfig.serializer()) ?: AdaptiveConfig.DEFAULT
        val blueprint = decode(BlueprintNode.KEY, ListSerializer(BlueprintNode.serializer())) ?: emptyList()
        val debt = decode(CoverageDebt.KEY, CoverageDebt.serializer()) ?: CoverageDebt.EMPTY
        val readiness = decode(ReadinessResult.KEY, ReadinessResult.serializer())
        val graph = decode(ConceptGraphDoc.KEY, ConceptGraphDoc.serializer()) ?: ConceptGraphDoc()
        val events = AdaptiveEvidenceStore.events(store)

        val now = Instant.now()
        val states = AdaptiveMastery.rebuildAll(events, config, now)

        val distinctItemsByConcept = distinctItemsByConcept(events)
        val coverage = Coverage.state(blueprint, distinctItemsByConcept)

        // The question pool the bank actually holds -- so a crash programme
        // cannot promise a concept the bank could not serve.
        val pool = items.filter { it.isStudentVisible }.mapNotNull(QuestionProjection::project)
        val poolByConcept = mutableMapOf<String, Int>()
        for (question in pool) for (conceptId in question.conceptIds) {
            poolByConcept[conceptId] = (poolByConcept[conceptId] ?: 0) + 1
        }

        val scheduleJson = store.document(MODULE_SCHEDULES_KEY)?.json
        val exam = AdaptiveExam.next(scheduleJson)

        val labels = buildMap {
            putAll(graph.labels())
            for (node in blueprint) put(node.conceptId, node.label)
        }

        return Computed(
            config = config,
            blueprint = blueprint,
            events = events,
            states = states,
            coverage = coverage,
            debt = debt,
            readiness = readiness,
            daysToExam = exam?.daysAway,
            examTitle = exam?.title,
            poolByConcept = poolByConcept,
            prerequisites = graph.prerequisites(),
            conceptLabels = labels,
            distinctItemsByConcept = distinctItemsByConcept,
            now = now,
        )
    }

    private suspend fun <T> decode(key: String, serializer: kotlinx.serialization.KSerializer<T>): T? {
        val json = runCatching { store.document(key)?.json }.getOrNull() ?: return null
        return runCatching { CortexJson.decodeFromString(serializer, json) }.getOrNull()
    }

    private fun distinctItemsByConcept(events: List<AdaptiveEvidenceEvent>): Map<String, Int> {
        val byConcept = mutableMapOf<String, MutableSet<String>>()
        for (event in events) byConcept.getOrPut(event.conceptId) { mutableSetOf() }.add(event.questionId)
        return byConcept.mapValues { it.value.size }
    }

    companion object {
        fun factory(store: LocalStore, sync: SyncEngine, connectivity: ConnectivityMonitor) = viewModelFactory {
            initializer { AdaptiveStudyViewModel(store, sync, connectivity) }
        }
    }
}

/** Everything not dependent on the minutes-a-day dial. */
internal data class Computed(
    val config: AdaptiveConfig,
    val blueprint: List<BlueprintNode>,
    val events: List<AdaptiveEvidenceEvent>,
    val states: Map<String, ConceptState>,
    val coverage: CoverageState,
    val debt: CoverageDebt,
    val readiness: ReadinessResult?,
    val daysToExam: Int?,
    val examTitle: String?,
    val poolByConcept: Map<String, Int>,
    val prerequisites: Map<String, List<String>>,
    val conceptLabels: Map<String, String>,
    val distinctItemsByConcept: Map<String, Int>,
    val now: Instant,
)

/** The finished picture the screen renders, dial included. */
data class AdaptiveStudyData(
    val config: AdaptiveConfig,
    val blueprint: List<BlueprintNode>,
    val states: Map<String, ConceptState>,
    val coverage: CoverageState,
    val readiness: ReadinessResult?,
    val daysToExam: Int?,
    val statusCounts: Map<ConceptStatus, Int>,
    val rawWrongTotal: Int,
    val repairTargets: List<ConceptState>,
    val dueForReview: List<ConceptState>,
    val nextBlockPlan: AllocationPlan,
    val shares: AllocationShares,
    val minutesPerDay: Int,
    val weeklyPlan: WeeklyPlan,
    val crashProgramme: CrashProgramme?,
    val conceptLabels: Map<String, String>,
) {
    /** A concept's label, falling back to its id so a row never renders a blank. */
    fun label(conceptId: String): String = conceptLabels[conceptId] ?: conceptId
}

/**
 * The pure computed-plus-dial-plus-sync -> [UiState] fold. Kept out of the class
 * so it is testable in isolation, mirroring `qbankUiState`.
 *
 * Empty means genuinely nothing to study yet: no evidence, no blueprint and no
 * readiness result. Config alone (which always defaults) is not content.
 */
internal fun adaptiveUiState(
    computed: Computed?,
    minutesPerDay: Int,
    syncStatus: SyncStatus,
    isOnline: Boolean,
    retry: () -> Unit,
): UiState<AdaptiveStudyData> {
    if (computed == null) {
        return if (syncStatus is SyncStatus.Failed) {
            UiState.Error(offlineOrReach(isOnline), retry)
        } else {
            UiState.Loading
        }
    }

    val hasAnything = computed.events.isNotEmpty() ||
        computed.blueprint.isNotEmpty() ||
        computed.readiness != null
    if (!hasAnything) {
        if (syncStatus is SyncStatus.Failed) return UiState.Error(offlineOrReach(isOnline), retry)
        return UiState.Empty(
            EmptyConfig(
                icon = "🧭",
                title = "Nothing to study yet",
                description = "Answer some questions and Adaptive Study will show what to revise, " +
                    "what is due for review, and where you stand against your blueprint.",
            ),
        )
    }

    return UiState.Content(buildData(computed, minutesPerDay))
}

private fun offlineOrReach(isOnline: Boolean): String =
    if (isOnline) "Couldn't reach Nishany. Check your connection and try again."
    else "You're offline. Adaptive Study can't be measured right now."

/** Assemble [AdaptiveStudyData] from the computed picture and the current dial. */
internal fun buildData(c: Computed, minutesPerDay: Int): AdaptiveStudyData {
    val config = c.config
    val shares = config.shares(c.daysToExam)

    val statusCounts = ConceptStatus.entries.associateWith { 0 }.toMutableMap()
    for (node in c.blueprint) {
        val status = c.states[node.conceptId]?.status ?: ConceptStatus.UNMEASURED
        statusCounts[status] = (statusCounts[status] ?: 0) + 1
    }

    val repairTargets = c.states.values
        .filter { it.status in ConceptStatus.REPAIR }
        .sortedWith(compareBy({ it.mean }, { it.conceptId }))

    val dueForReview = c.states.values
        .filter { it.status == ConceptStatus.REVIEW_DUE }
        .sortedWith(
            compareByDescending<ConceptState> { AdaptiveMastery.reviewUrgencyDays(it, c.now) ?: 0.0 }
                .thenBy { it.conceptId },
        )

    val nextBlockPlan = Allocation.plan(
        size = Allocation.clampBlockSize(20, config),
        shares = shares, debt = c.debt, config = config,
    )

    val weeklyPlan = buildWeeklyPlan(c, shares, minutesPerDay)
    val crashProgramme = buildCrashProgramme(c)

    return AdaptiveStudyData(
        config = config,
        blueprint = c.blueprint,
        states = c.states,
        coverage = c.coverage,
        readiness = c.readiness,
        daysToExam = c.daysToExam,
        statusCounts = statusCounts,
        rawWrongTotal = c.events.rawWrongAttempts(),
        repairTargets = repairTargets,
        dueForReview = dueForReview,
        nextBlockPlan = nextBlockPlan,
        shares = shares,
        minutesPerDay = minutesPerDay,
        weeklyPlan = weeklyPlan,
        crashProgramme = crashProgramme,
        conceptLabels = c.conceptLabels,
    )
}

private fun buildWeeklyPlan(c: Computed, shares: AllocationShares, minutesPerDay: Int): WeeklyPlan {
    val today = LocalDate.now(ZoneOffset.UTC)
    val monday = today.with(TemporalAdjusters.previousOrSame(DayOfWeek.MONDAY))
    val days = (0..6).map { DayCapacity(monday.plusDays(it.toLong()).toString(), minutesPerDay) }

    fun byStatus(vararg wanted: ConceptStatus): List<String> =
        c.states.values.filter { it.status in wanted }
            .sortedWith(compareBy({ it.mean }, { it.conceptId }))
            .map { it.conceptId }

    val needs = listOf(
        PlanNeedInput(AllocationNeed.WEAKNESS, byStatus(ConceptStatus.WEAK, ConceptStatus.ATTENTION),
            "Weak concept repair"),
        PlanNeedInput(AllocationNeed.COVERAGE, c.coverage.uncoveredConcepts.map { it.conceptId },
            "Blueprint coverage"),
        PlanNeedInput(AllocationNeed.REVIEW, byStatus(ConceptStatus.REVIEW_DUE), "Spaced review"),
        PlanNeedInput(AllocationNeed.UNCERTAINTY,
            c.blueprint.filter { c.states[it.conceptId] == null }.map { it.conceptId },
            "Measuring what is unknown"),
    )

    return StudySchedule.buildWeeklyPlan(
        BuildPlanInput(
            weekStart = monday.toString(),
            days = days,
            shares = shares,
            needs = needs,
            config = c.config,
            blueprintWeights = c.blueprint.associate { it.conceptId to it.weight },
            daysToExam = c.daysToExam,
            generatedAt = c.now.toString(),
        ),
    )
}

private fun buildCrashProgramme(c: Computed): CrashProgramme? {
    val daysToExam = c.daysToExam ?: return null
    if (c.blueprint.isEmpty()) return null
    if (c.config.crashHorizon(daysToExam) == null) return null
    return CrashCourse.build(
        BuildCrashInput(
            daysToExam = daysToExam,
            startDate = LocalDate.now(ZoneOffset.UTC).toString(),
            nodes = c.blueprint,
            coverage = c.coverage,
            states = c.states,
            poolByConcept = c.poolByConcept,
            prerequisites = c.prerequisites,
            config = c.config,
            generatedAt = c.now.toString(),
        ),
    )
}
