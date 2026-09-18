package com.synapse.app.feature.adaptive

import androidx.annotation.PluralsRes
import androidx.annotation.StringRes
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.synapse.app.R
import com.synapse.app.core.adaptive.AdaptiveConfig
import com.synapse.app.core.adaptive.AdaptiveEvidenceEvent
import com.synapse.app.core.adaptive.AdaptiveItem
import com.synapse.app.core.adaptive.AllocationNeed
import com.synapse.app.core.adaptive.AllocationShares
import com.synapse.app.core.adaptive.Blueprint
import com.synapse.app.core.adaptive.BlueprintNode
import com.synapse.app.core.adaptive.BuildPlanInput
import com.synapse.app.core.adaptive.ConceptState
import com.synapse.app.core.adaptive.ConceptStatus
import com.synapse.app.core.adaptive.CoverageDebt
import com.synapse.app.core.adaptive.CoverageState
import com.synapse.app.core.adaptive.DayCapacity
import com.synapse.app.core.adaptive.PlanNeedInput
import com.synapse.app.core.adaptive.REPAIR_STATUSES
import com.synapse.app.core.adaptive.ReadinessResult
import com.synapse.app.core.adaptive.StudySchedule
import com.synapse.app.core.adaptive.WeeklyPlan
import com.synapse.app.core.adaptive.coverageState
import com.synapse.app.core.adaptive.distinctQuestions
import com.synapse.app.core.adaptive.groupByConcept
import com.synapse.app.core.adaptive.heldOutIds
import com.synapse.app.core.adaptive.normaliseNodes
import com.synapse.app.core.adaptive.rebuildAll
import com.synapse.app.core.adaptive.reviewUrgencyDays
import com.synapse.app.core.adaptive.sharesForHorizon
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch
import java.time.Instant
import javax.inject.Inject

/**
 * Everything every Adaptive Study tab reads, assembled once per
 * [AdaptiveViewModel.load] — the same shape as web's `useAdaptiveStudy()` /
 * iOS's `AdaptiveStudyModel`. `daysToExam`/`examTitle` are not carried:
 * Android has no student exam-schedule source ported yet, so [shares] is
 * always computed for an unknown horizon ([sharesForHorizon] with
 * `daysToExam = null`) rather than a fabricated one, and [weeklyPlan] always
 * builds its [BuildPlanInput] with `daysToExam = null` too — same behaviour
 * as an iOS student whose year publishes no exam.
 */
data class AdaptiveStudy(
    val config: AdaptiveConfig,
    val blueprintNodes: List<BlueprintNode>,
    val storedBlueprint: Blueprint?,
    val items: List<AdaptiveItem>,
    val heldOut: Set<String>,
    val events: List<AdaptiveEvidenceEvent>,
    val states: Map<String, ConceptState>,
    val coverage: CoverageState,
    val debt: CoverageDebt,
    val shares: AllocationShares,
    val overrides: OverrideLedger,
    val readiness: ReadinessResult?,
    val recommendation: Recommendation,
    /** The weakest concepts worth repairing, most urgent first. Port of iOS's `repairTargets`. */
    val repairTargets: List<ConceptState>,
    /** Concepts whose review has come round. Port of iOS's `dueForReview`. */
    val dueForReview: List<ConceptState>,
)

/** What the "Build a block" / "Start assessment" CTA on the Today tab would do, once wired. */
enum class RecommendationCta { PRACTICE, READINESS }

/**
 * A [Recommendation] title, resolved to text only at the composable — plain
 * [StringRes] and [PluralsRes] resources carry no language-specific grammar
 * (Arabic plural agreement in particular) themselves, so the variant decides
 * which resolver (`stringResource`/`pluralStringResource`) applies.
 */
sealed interface RecommendationTitle {
    data class Text(@StringRes val res: Int) : RecommendationTitle
    data class Counted(@PluralsRes val res: Int, val count: Int) : RecommendationTitle
    data class Formatted(@StringRes val res: Int, val arg: Int) : RecommendationTitle
}

/** One recommended next action and the reason for it. Port of web's `Today.tsx` `nextAction`. */
data class Recommendation(val title: RecommendationTitle, @StringRes val bodyRes: Int, val cta: RecommendationCta?)

/** What [AdaptiveScreen] renders. */
sealed interface AdaptiveUiState {
    data object Loading : AdaptiveUiState
    data class Content(val study: AdaptiveStudy) : AdaptiveUiState
}

/**
 * Drives [AdaptiveRoute]: loads the shared config/blueprint/held-out
 * catalogues and this student's own evidence and overrides, then calls the
 * `core.adaptive` pure functions to rebuild mastery, coverage and the block
 * allocation shares — never inventing a figure the engine did not produce.
 * Overrides are a thin pass-through to [AdaptiveRepository], reloading
 * afterward so [uiState] always reflects the latest write (mirrors
 * `feature.library.LibraryViewModel`'s load-on-mutate shape).
 */
@HiltViewModel
class AdaptiveViewModel @Inject constructor(
    private val repository: AdaptiveRepository,
) : ViewModel() {

    var now: () -> Instant = Instant::now

    private val _uiState = MutableStateFlow<AdaptiveUiState>(AdaptiveUiState.Loading)
    val uiState: StateFlow<AdaptiveUiState> = _uiState.asStateFlow()

    init {
        load()
    }

    fun load() {
        viewModelScope.launch {
            if (_uiState.value !is AdaptiveUiState.Content) {
                _uiState.value = AdaptiveUiState.Loading
            }
            _uiState.value = AdaptiveUiState.Content(buildStudy())
        }
    }

    /** Set (or clear, via [OverrideMode.NORMAL]) one concept's override, then reload. */
    fun setOverride(conceptId: String, mode: OverrideMode) {
        viewModelScope.launch {
            repository.setOverride(conceptId, mode, now())
            load()
        }
    }

    private suspend fun buildStudy(): AdaptiveStudy {
        val at = now()
        val config = repository.config()
        val overrides = repository.overrides()
        val excludedConcepts = outOfScopeConcepts(overrides)
        val deferredConcepts = snoozedConcepts(overrides, at)

        val storedBlueprint = repository.storedBlueprint()
        val rawNodes = repository.blueprintNodes()
        // A concept the student put out of scope stops counting toward
        // coverage entirely, rather than sitting there as permanent unpayable
        // debt for material they have told the app is not on their exam.
        val blueprintNodes = if (excludedConcepts.isEmpty()) {
            rawNodes
        } else {
            normaliseNodes(rawNodes.filterNot { it.conceptId in excludedConcepts })
        }

        val allItems = repository.items()
        val items = allItems.filter { item ->
            // Withheld only when *every* concept it assesses is excluded or
            // deferred — dropping it over one out of four tagged concepts
            // would remove far more of the bank than the student asked to.
            item.conceptIds.isEmpty() || item.conceptIds.any { it !in excludedConcepts && it !in deferredConcepts }
        }
        val heldOut = heldOutIds(items, repository.heldOutRegistry(), config)

        val events = repository.evidenceEvents(at)
        val states = rebuildAll(events, config, at)
        val distinctItemsByConcept = groupByConcept(events).mapValues { (_, concepts) -> distinctQuestions(concepts) }
        val coverage = coverageState(blueprintNodes, distinctItemsByConcept)
        val debt = repository.coverageDebt()
        val shares = sharesForHorizon(config, daysToExam = null)
        val readiness = repository.latestReadiness()

        val withoutRecommendation = AdaptiveStudy(
            config = config,
            blueprintNodes = blueprintNodes,
            storedBlueprint = storedBlueprint,
            items = items,
            heldOut = heldOut,
            events = events,
            states = states,
            coverage = coverage,
            debt = debt,
            shares = shares,
            overrides = overrides,
            readiness = readiness,
            recommendation = Recommendation(
                title = RecommendationTitle.Text(R.string.adaptive_recommendation_start_block_title),
                bodyRes = R.string.adaptive_recommendation_start_block_body,
                cta = null,
            ),
            repairTargets = repairTargets(states),
            dueForReview = dueForReview(states, at),
        )
        return withoutRecommendation.copy(recommendation = recommendation(withoutRecommendation))
    }
}

/**
 * The weakest concepts worth repairing, most urgent first — [ConceptStatus]
 * in [REPAIR_STATUSES], weakest mean first, ties broken by concept id so the
 * order is stable. Port of iOS's `AdaptiveStudyModel.repairTargets`.
 */
fun repairTargets(states: Map<String, ConceptState>): List<ConceptState> =
    states.values
        .filter { it.status in REPAIR_STATUSES }
        .sortedWith(compareBy({ it.mean }, { it.conceptId }))

/**
 * Concepts whose review has come round, most overdue first, ties broken by
 * concept id. Port of iOS's `AdaptiveStudyModel.dueForReview`.
 */
fun dueForReview(states: Map<String, ConceptState>, now: Instant): List<ConceptState> =
    states.values
        .filter { it.status == ConceptStatus.REVIEW_DUE }
        .sortedWith(compareByDescending<ConceptState> { reviewUrgencyDays(it, now) ?: 0.0 }.thenBy { it.conceptId })

/**
 * A week built from where the student actually stands. Port of iOS's
 * `AdaptiveStudyModel.weeklyPlan(from:)`: Monday-UTC week start, the same
 * four [PlanNeedInput]s (weakness, coverage, review, uncertainty), and
 * [minutesPerDay] applied flat across all seven days. `minutesPerDay` is a UI
 * dial, held by the caller and never persisted — same as iOS/web.
 */
fun weeklyPlan(study: AdaptiveStudy, minutesPerDay: Int, today: Instant = Instant.now()): WeeklyPlan {
    val start = StudySchedule.weekStart(today)
    val monday = java.time.LocalDate.parse(start, StudySchedule.ISO_DAY)
    val days = (0 until 7).map { index ->
        DayCapacity(date = StudySchedule.ISO_DAY.format(monday.plusDays(index.toLong())), statedMinutes = minutesPerDay)
    }

    fun byStatus(wanted: Set<ConceptStatus>): List<String> =
        study.states.values.filter { it.status in wanted }
            .sortedWith(compareBy({ it.mean }, { it.conceptId }))
            .map { it.conceptId }

    val needs = listOf(
        PlanNeedInput(AllocationNeed.WEAKNESS, byStatus(setOf(ConceptStatus.WEAK, ConceptStatus.ATTENTION)), "Weak concept repair"),
        PlanNeedInput(AllocationNeed.COVERAGE, study.coverage.uncoveredConcepts.map { it.conceptId }, "Blueprint coverage"),
        PlanNeedInput(AllocationNeed.REVIEW, byStatus(setOf(ConceptStatus.REVIEW_DUE)), "Spaced review"),
        PlanNeedInput(
            AllocationNeed.UNCERTAINTY,
            study.blueprintNodes.filter { it.conceptId !in study.states }.map { it.conceptId },
            "Measuring what is unknown",
        ),
    )

    return StudySchedule.buildWeeklyPlan(
        BuildPlanInput(
            weekStart = start,
            days = days,
            shares = study.shares,
            needs = needs,
            config = study.config,
            blueprintWeights = study.blueprintNodes.associate { it.conceptId to it.weight },
            daysToExam = null,
            generatedAt = today.toString(),
        ),
    )
}

/** Concepts on the blueprint, counted per [ConceptStatus]. A blueprint concept with no evidence is [ConceptStatus.UNMEASURED], not absent — skipping it would read "0 unmeasured" on a student's first day. */
fun statusCounts(states: Map<String, ConceptState>, conceptIds: List<String>): Map<ConceptStatus, Int> {
    val counts = ConceptStatus.entries.associateWith { 0 }.toMutableMap()
    for (conceptId in conceptIds) {
        val status = states[conceptId]?.status ?: ConceptStatus.UNMEASURED
        counts[status] = (counts[status] ?: 0) + 1
    }
    return counts
}

/**
 * Port of web's `Today.tsx` `nextAction`: one recommendation, in the same
 * priority order — reviews due first (knowledge decaying while the student
 * practises something else), then confirmed weakness, then a readiness
 * assessment once there is enough practice behind it, then blueprint
 * coverage, then a plain "start a block". Deliberately one recommendation: a
 * dashboard offering five equally-weighted options has not actually decided
 * anything.
 *
 * [Recommendation.cta] is carried but [AdaptiveScreen] does not yet wire it
 * to a button action — Practice and Readiness are deferred tabs (see that
 * file's doc comment). The recommendation itself is real, computed from the
 * live ledger, not a placeholder for the missing button.
 */
private fun recommendation(study: AdaptiveStudy): Recommendation {
    if (study.blueprintNodes.isEmpty()) {
        return Recommendation(
            title = RecommendationTitle.Text(R.string.adaptive_recommendation_no_blueprint_title),
            bodyRes = R.string.adaptive_recommendation_no_blueprint_body,
            cta = null,
        )
    }
    if (study.items.isEmpty()) {
        return Recommendation(
            title = RecommendationTitle.Text(R.string.adaptive_recommendation_no_items_title),
            bodyRes = R.string.adaptive_recommendation_no_items_body,
            cta = null,
        )
    }

    val counts = statusCounts(study.states, study.blueprintNodes.map { it.conceptId })
    val due = counts[ConceptStatus.REVIEW_DUE] ?: 0
    val weak = counts[ConceptStatus.WEAK] ?: 0

    if (due > 0) {
        return Recommendation(
            title = RecommendationTitle.Counted(R.plurals.adaptive_recommendation_due_title, due),
            bodyRes = R.string.adaptive_recommendation_due_body,
            cta = RecommendationCta.PRACTICE,
        )
    }
    if (weak > 0) {
        return Recommendation(
            title = RecommendationTitle.Counted(R.plurals.adaptive_recommendation_weak_title, weak),
            bodyRes = R.string.adaptive_recommendation_weak_body,
            cta = RecommendationCta.PRACTICE,
        )
    }
    if (study.readiness == null && study.events.size > 40) {
        return Recommendation(
            title = RecommendationTitle.Text(R.string.adaptive_recommendation_readiness_title),
            bodyRes = R.string.adaptive_recommendation_readiness_body,
            cta = RecommendationCta.READINESS,
        )
    }
    if (study.coverage.uncoveredWeight > 0.2) {
        val pct = Math.round(study.coverage.uncoveredWeight * 100).toInt()
        return Recommendation(
            title = RecommendationTitle.Formatted(R.string.adaptive_recommendation_uncovered_title, pct),
            bodyRes = R.string.adaptive_recommendation_uncovered_body,
            cta = RecommendationCta.PRACTICE,
        )
    }
    return Recommendation(
        title = RecommendationTitle.Text(R.string.adaptive_recommendation_start_block_title),
        bodyRes = R.string.adaptive_recommendation_start_block_body,
        cta = RecommendationCta.PRACTICE,
    )
}
