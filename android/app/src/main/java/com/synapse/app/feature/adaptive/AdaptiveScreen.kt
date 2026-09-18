package com.synapse.app.feature.adaptive

import androidx.annotation.StringRes
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.ColumnScope
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.Card
import androidx.compose.material3.FilterChip
import androidx.compose.material3.LinearProgressIndicator
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.ScrollableTabRow
import androidx.compose.material3.Tab
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableIntStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.runtime.setValue
import androidx.compose.material3.TextButton
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.res.pluralStringResource
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.semantics.contentDescription
import androidx.compose.ui.semantics.semantics
import androidx.compose.ui.unit.dp
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import com.synapse.app.R
import com.synapse.app.core.adaptive.AllocationNeed
import com.synapse.app.core.adaptive.ConceptState
import com.synapse.app.core.adaptive.ConceptStatus
import com.synapse.app.core.adaptive.PlanTask
import com.synapse.app.core.adaptive.RelaxableConstraint
import com.synapse.app.core.adaptive.TaskKind
import com.synapse.app.core.adaptive.TaskTier
import com.synapse.app.core.adaptive.rawWrongAttempts
import com.synapse.app.core.adaptive.readinessSentence
import java.time.LocalDate
import java.time.format.DateTimeFormatter
import java.time.format.DateTimeParseException
import kotlin.math.roundToInt

const val ADAPTIVE_LOADING_TAG = "adaptive_loading"
fun adaptiveTabTag(tab: AdaptiveTab): String = "adaptive_tab_${tab.name}"
fun adaptiveConceptRowTag(conceptId: String): String = "adaptive_concept_$conceptId"

/**
 * The Adaptive Study feature's single public entry point. Constructs its own
 * [AdaptiveViewModel] via [hiltViewModel] — no navigation wiring required of
 * the caller (see `feature.library.LibraryRoute` for the same shape).
 *
 * All six web/iOS tabs are implemented: Today, Practice, Readiness, Concepts,
 * Plan, How this works. Readiness renders the [com.synapse.app.core.adaptive.ReadinessResult]
 * [AdaptiveRepository] already reads (the session flow that *produces* a new
 * result is a separate, not-yet-built feature — this tab only displays the
 * latest one on record, exactly like iOS/web's Readiness panel). Plan skips
 * the crash-programme sub-section — see [PlanTab]'s doc comment.
 */
@Composable
fun AdaptiveRoute(viewModel: AdaptiveViewModel = hiltViewModel()) {
    val uiState by viewModel.uiState.collectAsStateWithLifecycle()
    AdaptiveScreen(uiState = uiState, onSetOverride = viewModel::setOverride)
}

enum class AdaptiveTab(@StringRes val labelRes: Int) {
    TODAY(R.string.adaptive_tab_today),
    PRACTICE(R.string.adaptive_tab_practice),
    READINESS(R.string.adaptive_tab_readiness),
    CONCEPTS(R.string.adaptive_tab_concepts),
    PLAN(R.string.adaptive_tab_plan),
    HOW_IT_WORKS(R.string.adaptive_tab_how_it_works),
}

@Composable
private fun AdaptiveScreen(uiState: AdaptiveUiState, onSetOverride: (String, OverrideMode) -> Unit) {
    if (uiState !is AdaptiveUiState.Content) {
        Column(
            modifier = Modifier.fillMaxSize().testTag(ADAPTIVE_LOADING_TAG),
            horizontalAlignment = Alignment.CenterHorizontally,
            verticalArrangement = Arrangement.Center,
        ) { Text(stringResource(R.string.adaptive_loading)) }
        return
    }

    var selectedIndex by rememberSaveable { mutableIntStateOf(0) }
    val tabs = AdaptiveTab.entries
    val selected = tabs[selectedIndex]

    Column(modifier = Modifier.fillMaxSize()) {
        ScrollableTabRow(selectedTabIndex = selectedIndex) {
            tabs.forEachIndexed { index, tab ->
                Tab(
                    selected = index == selectedIndex,
                    onClick = { selectedIndex = index },
                    text = { Text(stringResource(tab.labelRes)) },
                    modifier = Modifier.testTag(adaptiveTabTag(tab)),
                )
            }
        }

        when (selected) {
            AdaptiveTab.TODAY -> TodayTab(uiState.study)
            AdaptiveTab.CONCEPTS -> ConceptsTab(uiState.study, onSetOverride)
            AdaptiveTab.HOW_IT_WORKS -> HowItWorksTab(uiState.study)
            AdaptiveTab.PRACTICE -> PracticeTab(uiState.study)
            AdaptiveTab.READINESS -> ReadinessTab(uiState.study)
            AdaptiveTab.PLAN -> PlanTab(uiState.study)
        }
    }
}

// --- shared formatting -----------------------------------------------------

private fun percent(value: Double): String = "${(value * 100).roundToInt()}%"
private fun rangeText(lower: Double, upper: Double): String = "${percent(lower)}–${percent(upper)}"

@Composable
private fun recommendationTitleText(title: RecommendationTitle): String = when (title) {
    is RecommendationTitle.Text -> stringResource(title.res)
    is RecommendationTitle.Counted -> pluralStringResource(title.res, title.count, title.count)
    is RecommendationTitle.Formatted -> stringResource(title.res, title.arg)
}

@Composable
private fun SectionCard(title: String, content: @Composable ColumnScope.() -> Unit) {
    Card(modifier = Modifier.fillMaxWidth().padding(top = 12.dp)) {
        Column(modifier = Modifier.padding(16.dp)) {
            Text(title, style = MaterialTheme.typography.titleMedium)
            content()
        }
    }
}

@Composable
private fun StatFigure(label: String, value: String, sub: String? = null) {
    Column(modifier = Modifier.padding(vertical = 6.dp)) {
        Text(label, style = MaterialTheme.typography.labelMedium, color = MaterialTheme.colorScheme.onSurfaceVariant)
        Text(value, style = MaterialTheme.typography.headlineSmall, modifier = Modifier.padding(top = 2.dp))
        if (sub != null) Text(sub, style = MaterialTheme.typography.bodySmall, color = MaterialTheme.colorScheme.onSurfaceVariant)
    }
}

@Composable
private fun ShareRow(label: String, value: Double, max: Double) {
    Column(modifier = Modifier.fillMaxWidth().padding(vertical = 6.dp)) {
        Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween) {
            Text(label, style = MaterialTheme.typography.bodyMedium)
            Text(percent(value), style = MaterialTheme.typography.bodyMedium)
        }
        LinearProgressIndicator(
            progress = { if (max > 0) (value / max).toFloat().coerceIn(0f, 1f) else 0f },
            modifier = Modifier.fillMaxWidth().padding(top = 4.dp),
        )
    }
}

// --- Today -------------------------------------------------------------------

@Composable
private fun TodayTab(study: AdaptiveStudy) {
    Column(modifier = Modifier.fillMaxSize().padding(16.dp).verticalScroll(rememberScrollState())) {
        Text(stringResource(R.string.adaptive_recommended_next), style = MaterialTheme.typography.labelLarge, color = MaterialTheme.colorScheme.primary)
        Text(recommendationTitleText(study.recommendation.title), style = MaterialTheme.typography.headlineSmall, modifier = Modifier.padding(top = 4.dp))
        Text(stringResource(study.recommendation.bodyRes), style = MaterialTheme.typography.bodyMedium, modifier = Modifier.padding(top = 6.dp))

        val counts = statusCounts(study.states, study.blueprintNodes.map { it.conceptId })
        val weak = counts[ConceptStatus.WEAK] ?: 0
        val due = counts[ConceptStatus.REVIEW_DUE] ?: 0
        val measured = study.states.size
        val rawWrong = rawWrongAttempts(study.events)
        val notYet = stringResource(R.string.adaptive_not_yet)

        SectionCard(stringResource(R.string.adaptive_at_a_glance)) {
            StatFigure(
                label = stringResource(R.string.adaptive_tab_readiness),
                value = study.readiness?.let { rangeText(it.lower, it.upper) } ?: notYet,
                sub = study.readiness?.let { stringResource(R.string.adaptive_readiness_from_held_out, it.answered) }
                    ?: stringResource(R.string.adaptive_readiness_measured_separately),
            )
            StatFigure(
                label = stringResource(R.string.adaptive_blueprint_covered_label),
                value = if (study.blueprintNodes.isEmpty()) notYet else percent(study.coverage.coveredWeight),
                sub = pluralStringResource(
                    R.plurals.adaptive_concepts_untouched_count,
                    study.coverage.uncoveredConcepts.size,
                    study.coverage.uncoveredConcepts.size,
                ),
            )
            StatFigure(
                label = stringResource(R.string.adaptive_weak_concepts_label),
                value = "$weak",
                sub = pluralStringResource(R.plurals.adaptive_wrong_answers_recorded_count, rawWrong, rawWrong),
            )
            StatFigure(
                label = stringResource(R.string.adaptive_due_for_review_label),
                value = "$due",
                sub = pluralStringResource(R.plurals.adaptive_concepts_measured_count, measured, measured),
            )
        }

        if (study.blueprintNodes.isNotEmpty()) {
            SectionCard(stringResource(R.string.adaptive_blueprint_coverage_title)) {
                study.coverage.groups.take(8).forEach { group ->
                    ShareRow(label = group.groupLabel, value = group.coveredWeight, max = group.weight)
                }
                if (study.debt.slots >= 1) {
                    val slots = study.debt.slots.roundToInt()
                    Text(
                        pluralStringResource(R.plurals.adaptive_coverage_debt_message, slots, slots),
                        style = MaterialTheme.typography.bodySmall,
                        color = MaterialTheme.colorScheme.onSurfaceVariant,
                        modifier = Modifier.padding(top = 8.dp),
                    )
                }
            }
        }

        SectionCard(stringResource(R.string.adaptive_next_block_title)) {
            ShareRow(stringResource(R.string.adaptive_share_weakness), study.shares.weakness, 1.0)
            ShareRow(stringResource(R.string.adaptive_share_coverage), study.shares.coverage, 1.0)
            ShareRow(stringResource(R.string.adaptive_share_review), study.shares.review, 1.0)
            ShareRow(stringResource(R.string.adaptive_share_uncertainty), study.shares.uncertainty, 1.0)
            Text(
                stringResource(R.string.adaptive_allocation_note),
                style = MaterialTheme.typography.bodySmall,
                color = MaterialTheme.colorScheme.onSurfaceVariant,
                modifier = Modifier.padding(top = 8.dp),
            )
        }

        SectionCard(stringResource(R.string.adaptive_wrong_vs_weak_heading)) {
            Text(stringResource(R.string.adaptive_wrong_vs_weak_body), style = MaterialTheme.typography.bodyMedium, modifier = Modifier.padding(top = 6.dp))
        }
    }
}

// --- Practice ------------------------------------------------------------------

/** Port of iOS's `practice` panel: `repairTargets` and `dueForReview`, both already ordered by [AdaptiveViewModel]. */
@Composable
private fun PracticeTab(study: AdaptiveStudy) {
    Column(modifier = Modifier.fillMaxSize().padding(16.dp).verticalScroll(rememberScrollState())) {
        if (study.repairTargets.isEmpty() && study.dueForReview.isEmpty()) {
            Text(stringResource(R.string.adaptive_practice_empty_title), style = MaterialTheme.typography.titleLarge)
            Text(
                stringResource(R.string.adaptive_practice_empty_body),
                style = MaterialTheme.typography.bodyMedium,
                modifier = Modifier.padding(top = 8.dp),
            )
        } else {
            if (study.repairTargets.isNotEmpty()) {
                SectionCard(stringResource(R.string.adaptive_practice_repair_title)) {
                    study.repairTargets.take(8).forEach { state -> ConceptSummaryRow(study, state) }
                }
            }
            if (study.dueForReview.isNotEmpty()) {
                SectionCard(stringResource(R.string.adaptive_due_for_review_label)) {
                    study.dueForReview.take(8).forEach { state -> ConceptSummaryRow(study, state) }
                }
            }
        }
    }
}

/** A concept's label, mastery range and status — the estimate is never shown without its interval. */
@Composable
private fun ConceptSummaryRow(study: AdaptiveStudy, state: ConceptState) {
    val lower = (state.mean - state.uncertainty).coerceIn(0.0, 1.0)
    val upper = (state.mean + state.uncertainty).coerceIn(0.0, 1.0)
    Row(
        modifier = Modifier.fillMaxWidth().padding(vertical = 6.dp).testTag(adaptiveConceptRowTag(state.conceptId)),
        horizontalArrangement = Arrangement.SpaceBetween,
    ) {
        Column(modifier = Modifier.weight(1f)) {
            Text(
                study.blueprintNodes.firstOrNull { it.conceptId == state.conceptId }?.label ?: state.conceptId,
                style = MaterialTheme.typography.bodyMedium,
                maxLines = 1,
            )
            Text(rangeText(lower, upper), style = MaterialTheme.typography.labelSmall, color = MaterialTheme.colorScheme.onSurfaceVariant)
        }
        Text(
            stringResource(CONCEPT_STATUS_LABEL_RES.getValue(state.status)),
            style = MaterialTheme.typography.labelSmall,
            modifier = Modifier.padding(start = 8.dp),
        )
    }
}

// --- Readiness -----------------------------------------------------------------

/** Port of iOS's `readinessPanel`: the range, the sentence, per-area breakdown, then the explanatory panel. */
@Composable
private fun ReadinessTab(study: AdaptiveStudy) {
    val result = study.readiness

    Column(modifier = Modifier.fillMaxSize().padding(16.dp).verticalScroll(rememberScrollState())) {
        SectionCard(stringResource(R.string.adaptive_readiness_how_ready_title)) {
            if (result != null && result.answered > 0) {
                Text(
                    rangeText(result.lower, result.upper),
                    style = MaterialTheme.typography.headlineMedium,
                    modifier = Modifier.padding(top = 4.dp),
                )
            }
            Text(
                readinessSentence(result),
                style = MaterialTheme.typography.bodyMedium,
                modifier = Modifier.padding(top = 6.dp),
            )
        }

        val groups = result?.groups.orEmpty()
        if (groups.isNotEmpty()) {
            SectionCard(stringResource(R.string.adaptive_readiness_by_area_title)) {
                groups.forEach { group ->
                    Row(modifier = Modifier.fillMaxWidth().padding(top = 8.dp), horizontalArrangement = Arrangement.SpaceBetween) {
                        Text(group.groupLabel, style = MaterialTheme.typography.bodyMedium)
                        // A range from two answers is a number pretending to be
                        // evidence, so a thin group says so instead.
                        if (group.lower != null && group.upper != null) {
                            Text(rangeText(group.lower, group.upper), style = MaterialTheme.typography.bodySmall)
                        } else {
                            Text(
                                stringResource(R.string.adaptive_readiness_too_few),
                                style = MaterialTheme.typography.labelSmall,
                                color = MaterialTheme.colorScheme.onSurfaceVariant,
                            )
                        }
                    }
                }
            }
        }

        // The same explanation Today gives for why adaptive practice is not
        // itself a readiness estimate — iOS shows this panel here too.
        SectionCard(stringResource(R.string.adaptive_practice_chooses_title)) {
            Text(
                stringResource(R.string.adaptive_practice_chooses_body),
                style = MaterialTheme.typography.bodyMedium,
                modifier = Modifier.padding(top = 6.dp),
            )
        }
    }
}

// --- Concepts ------------------------------------------------------------------

@Composable
private fun ConceptsTab(study: AdaptiveStudy, onSetOverride: (String, OverrideMode) -> Unit) {
    if (study.blueprintNodes.isEmpty()) {
        Column(modifier = Modifier.fillMaxSize().padding(20.dp)) {
            Text(stringResource(R.string.adaptive_no_concepts_title), style = MaterialTheme.typography.titleLarge)
            Text(
                stringResource(R.string.adaptive_no_concepts_body),
                style = MaterialTheme.typography.bodyMedium,
                modifier = Modifier.padding(top = 8.dp),
            )
        }
        return
    }

    val rows = remember(study.blueprintNodes, study.states, study.overrides) {
        val order = listOf(
            ConceptStatus.WEAK, ConceptStatus.REVIEW_DUE, ConceptStatus.ATTENTION,
            ConceptStatus.DEVELOPING, ConceptStatus.UNMEASURED, ConceptStatus.SECURE,
        )
        study.blueprintNodes.sortedWith(
            compareBy<com.synapse.app.core.adaptive.BlueprintNode> { order.indexOf(study.states[it.conceptId]?.status ?: ConceptStatus.UNMEASURED) }
                .thenByDescending { it.weight },
        )
    }

    Column(modifier = Modifier.fillMaxSize().padding(16.dp).verticalScroll(rememberScrollState())) {
        Text(
            stringResource(R.string.adaptive_wrong_vs_weak_body),
            style = MaterialTheme.typography.bodySmall,
            color = MaterialTheme.colorScheme.onSurfaceVariant,
        )
        Text(
            stringResource(R.string.adaptive_your_concepts_title, rows.size),
            style = MaterialTheme.typography.titleMedium,
            modifier = Modifier.padding(top = 16.dp),
        )

        rows.forEach { node ->
            val state = study.states[node.conceptId]
            val status = state?.status ?: ConceptStatus.UNMEASURED
            val override = study.overrides[node.conceptId]
            Card(modifier = Modifier.fillMaxWidth().padding(top = 10.dp).testTag(adaptiveConceptRowTag(node.conceptId))) {
                Column(modifier = Modifier.padding(12.dp)) {
                    Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween) {
                        Text(node.label, style = MaterialTheme.typography.bodyLarge)
                        Text(stringResource(CONCEPT_STATUS_LABEL_RES.getValue(status)), style = MaterialTheme.typography.labelLarge)
                    }
                    Text(
                        stringResource(R.string.adaptive_concept_group_percent, node.groupLabel, percent(node.weight)),
                        style = MaterialTheme.typography.bodySmall,
                        color = MaterialTheme.colorScheme.onSurfaceVariant,
                    )
                    if (state != null && status != ConceptStatus.UNMEASURED) {
                        val lower = (state.mean - state.uncertainty).coerceIn(0.0, 1.0)
                        val upper = (state.mean + state.uncertainty).coerceIn(0.0, 1.0)
                        Text(
                            stringResource(
                                R.string.adaptive_concept_mastery_summary,
                                rangeText(lower, upper),
                                state.distinctItems,
                                state.rawWrong,
                            ),
                            style = MaterialTheme.typography.bodySmall,
                            modifier = Modifier.padding(top = 4.dp),
                        )
                    } else {
                        Text(
                            stringResource(R.string.adaptive_not_enough_evidence),
                            style = MaterialTheme.typography.bodySmall,
                            modifier = Modifier.padding(top = 4.dp),
                        )
                    }

                    Row(modifier = Modifier.fillMaxWidth().padding(top = 10.dp), horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                        FilterChip(
                            selected = override == null || override.mode == OverrideMode.NORMAL,
                            onClick = { onSetOverride(node.conceptId, OverrideMode.NORMAL) },
                            label = { Text(stringResource(R.string.adaptive_override_normal)) },
                        )
                        FilterChip(
                            selected = override?.mode == OverrideMode.SNOOZED,
                            onClick = { onSetOverride(node.conceptId, OverrideMode.SNOOZED) },
                            label = { Text(stringResource(R.string.adaptive_override_snoozed)) },
                        )
                        FilterChip(
                            selected = override?.mode == OverrideMode.OUT_OF_SCOPE,
                            onClick = { onSetOverride(node.conceptId, OverrideMode.OUT_OF_SCOPE) },
                            label = { Text(stringResource(R.string.adaptive_override_out_of_scope)) },
                        )
                    }
                }
            }
        }

        SectionCard(stringResource(R.string.adaptive_overrides_title)) {
            Text(
                stringResource(R.string.adaptive_override_snoozed_explanation),
                style = MaterialTheme.typography.bodySmall,
                modifier = Modifier.padding(top = 6.dp),
            )
            Text(
                stringResource(R.string.adaptive_override_out_of_scope_explanation),
                style = MaterialTheme.typography.bodySmall,
                modifier = Modifier.padding(top = 6.dp),
            )
            Text(
                stringResource(R.string.adaptive_override_neither_deletes_note),
                style = MaterialTheme.typography.bodySmall,
                color = MaterialTheme.colorScheme.onSurfaceVariant,
                modifier = Modifier.padding(top = 6.dp),
            )
        }
    }
}

// --- Plan ------------------------------------------------------------------

/**
 * Port of iOS's `plan` panel: the minutes-a-day dial, the week broken down by
 * day, where the week's time goes, capacity, and what would not fit.
 *
 * `minutesPerDay` is held here as plain Compose state ([rememberSaveable]),
 * never in [AdaptiveViewModel] — it survives tab switches and configuration
 * changes but is never persisted to disk, exactly matching iOS/web's own
 * session-only dial (see [AdaptiveStudy]'s doc comment).
 *
 * ponytail: iOS's Plan tab also renders a crash-programme sub-section
 * (`CrashCourse.swift`) when an exam is close. Not ported here — Android has
 * no exam-schedule source wired up yet (see [AdaptiveStudy]'s doc comment on
 * `daysToExam`), so there is nothing honest to compress against. Add it
 * alongside whichever feature ports the exam timetable.
 */
@Composable
private fun PlanTab(study: AdaptiveStudy) {
    var minutesPerDay by rememberSaveable { mutableIntStateOf(90) }
    val week = remember(study, minutesPerDay) { weeklyPlan(study, minutesPerDay) }
    val orderedDates = remember(week) {
        val seen = mutableSetOf<String>()
        week.tasks.map { it.date }.filter { seen.add(it) }
    }

    Column(modifier = Modifier.fillMaxSize().padding(16.dp).verticalScroll(rememberScrollState())) {
        SectionCard(stringResource(R.string.adaptive_plan_this_week_title)) {
            Row(
                modifier = Modifier.fillMaxWidth().padding(top = 8.dp),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically,
            ) {
                Text(stringResource(R.string.adaptive_plan_minutes_per_day_label), style = MaterialTheme.typography.bodyMedium)
                Row(verticalAlignment = Alignment.CenterVertically) {
                    val decreaseDescription = stringResource(R.string.adaptive_plan_decrease_minutes)
                    val increaseDescription = stringResource(R.string.adaptive_plan_increase_minutes)
                    TextButton(
                        onClick = { minutesPerDay = (minutesPerDay - MINUTES_STEP).coerceIn(0, MAX_MINUTES_PER_DAY) },
                        modifier = Modifier.semantics { contentDescription = decreaseDescription },
                    ) { Text("−") }
                    Text(
                        stringResource(R.string.adaptive_plan_minutes_suffix, minutesPerDay),
                        style = MaterialTheme.typography.bodyMedium,
                        modifier = Modifier.padding(horizontal = 4.dp),
                    )
                    TextButton(
                        onClick = { minutesPerDay = (minutesPerDay + MINUTES_STEP).coerceIn(0, MAX_MINUTES_PER_DAY) },
                        modifier = Modifier.semantics { contentDescription = increaseDescription },
                    ) { Text("+") }
                }
            }

            orderedDates.forEach { date ->
                val tasks = week.tasks.filter { it.date == date }
                Column(modifier = Modifier.fillMaxWidth().padding(top = 12.dp)) {
                    Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween) {
                        Text(dayName(date), style = MaterialTheme.typography.titleSmall)
                        Text(
                            stringResource(R.string.adaptive_plan_minutes_suffix, tasks.sumOf { it.expectedMinutes }),
                            style = MaterialTheme.typography.labelMedium,
                            color = MaterialTheme.colorScheme.onSurfaceVariant,
                        )
                    }
                    tasks.forEach { task -> PlanTaskRow(task) }
                }
            }
        }

        SectionCard(stringResource(R.string.adaptive_plan_time_goes_title)) {
            AllocationNeed.entries.forEach { need ->
                val minutes = week.needMinutes[need] ?: 0
                Column(modifier = Modifier.fillMaxWidth().padding(vertical = 6.dp)) {
                    Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween) {
                        Text(stringResource(NEED_LABEL_RES.getValue(need)), style = MaterialTheme.typography.bodyMedium)
                        Text(stringResource(R.string.adaptive_plan_minutes_suffix, minutes), style = MaterialTheme.typography.bodyMedium)
                    }
                    LinearProgressIndicator(
                        progress = { if (week.plannedMinutes > 0) (minutes.toFloat() / week.plannedMinutes).coerceIn(0f, 1f) else 0f },
                        modifier = Modifier.fillMaxWidth().padding(top = 4.dp),
                    )
                }
            }
        }

        SectionCard(stringResource(R.string.adaptive_plan_capacity_title)) {
            CapacityRow(stringResource(R.string.adaptive_plan_capacity_stated), week.statedMinutes)
            CapacityRow(stringResource(R.string.adaptive_plan_capacity_planned), week.plannedMinutes)
            // Shown, not hidden. A buffer a student cannot see is a buffer
            // they assume is not there.
            CapacityRow(stringResource(R.string.adaptive_plan_capacity_buffer), week.bufferMinutes, emphasise = true)
        }

        if (week.unplaced.isNotEmpty()) {
            SectionCard(stringResource(R.string.adaptive_plan_unplaced_title)) {
                week.unplaced.forEach { task ->
                    Column(modifier = Modifier.fillMaxWidth().padding(top = 8.dp)) {
                        Text(task.title, style = MaterialTheme.typography.bodyMedium)
                        Text(task.reason, style = MaterialTheme.typography.bodySmall, color = MaterialTheme.colorScheme.onSurfaceVariant)
                    }
                }
                Text(
                    stringResource(R.string.adaptive_plan_unplaced_note),
                    style = MaterialTheme.typography.bodySmall,
                    color = MaterialTheme.colorScheme.onSurfaceVariant,
                    modifier = Modifier.padding(top = 8.dp),
                )
            }
        }

        // ponytail: crash-programme sub-section (iOS's CrashCourse.swift) is not rendered — no Android exam-schedule source ported yet; add once that lands.

        // Inside the plan, not in a settings page nobody opens. That is the
        // difference between a caveat and a disclaimer.
        Text(
            stringResource(R.string.adaptive_plan_caveat),
            style = MaterialTheme.typography.bodySmall,
            color = MaterialTheme.colorScheme.onSurfaceVariant,
            modifier = Modifier.padding(top = 12.dp, start = 4.dp, end = 4.dp),
        )
    }
}

private const val MINUTES_STEP = 15
private const val MAX_MINUTES_PER_DAY = 600

@Composable
private fun PlanTaskRow(task: PlanTask) {
    Card(modifier = Modifier.fillMaxWidth().padding(top = 6.dp)) {
        Column(modifier = Modifier.padding(10.dp)) {
            if (task.kind == TaskKind.REST) {
                Text(task.title, style = MaterialTheme.typography.bodyMedium, color = MaterialTheme.colorScheme.onSurfaceVariant)
                Text(
                    task.reason,
                    style = MaterialTheme.typography.bodySmall,
                    color = MaterialTheme.colorScheme.onSurfaceVariant,
                    modifier = Modifier.padding(top = 2.dp),
                )
            } else {
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically,
                ) {
                    Text(task.title, style = MaterialTheme.typography.bodyMedium, maxLines = 1, modifier = Modifier.weight(1f))
                    Text(
                        stringResource(R.string.adaptive_plan_minutes_suffix, task.expectedMinutes),
                        style = MaterialTheme.typography.labelSmall,
                        modifier = Modifier.padding(start = 6.dp),
                    )
                    Text(
                        stringResource(TASK_TIER_LABEL_RES.getValue(task.tier)),
                        style = MaterialTheme.typography.labelSmall,
                        color = MaterialTheme.colorScheme.primary,
                        modifier = Modifier.padding(start = 6.dp),
                    )
                }
                // Every task says why it exists, so a student can disagree
                // with it rather than only obey or abandon it.
                Text(
                    task.reason,
                    style = MaterialTheme.typography.bodySmall,
                    color = MaterialTheme.colorScheme.onSurfaceVariant,
                    modifier = Modifier.padding(top = 4.dp),
                )
            }
        }
    }
}

@Composable
private fun CapacityRow(label: String, minutes: Int, emphasise: Boolean = false) {
    Row(modifier = Modifier.fillMaxWidth().padding(top = 6.dp), horizontalArrangement = Arrangement.SpaceBetween) {
        Text(label, style = MaterialTheme.typography.bodyMedium)
        Text(
            stringResource(R.string.adaptive_plan_minutes_suffix, minutes),
            style = MaterialTheme.typography.bodyMedium,
            color = if (emphasise) MaterialTheme.colorScheme.primary else MaterialTheme.colorScheme.onSurfaceVariant,
        )
    }
}

/** The dates that have work, in the order the week runs — Mon-first, since [StudySchedule.weekStart] is always a Monday. */
private fun dayName(iso: String): String = try {
    LocalDate.parse(iso, DateTimeFormatter.ISO_LOCAL_DATE).format(DateTimeFormatter.ofPattern("EEE d MMM"))
} catch (e: DateTimeParseException) {
    iso
}

// --- How this works --------------------------------------------------------

@Composable
private fun HowItWorksTab(study: AdaptiveStudy) {
    val rawWrong = rawWrongAttempts(study.events)
    val weakConcepts = study.states.values.count { it.status == ConceptStatus.WEAK }
    val correctAnswers = study.events.count { it.correct == true }
    val lastEvidence = study.events.maxByOrNull { it.at }?.at

    Column(modifier = Modifier.fillMaxSize().padding(16.dp).verticalScroll(rememberScrollState())) {
        Text(stringResource(R.string.adaptive_how_it_works_title), style = MaterialTheme.typography.titleLarge)
        val configLabel = stringResource(R.string.adaptive_config_label)
        val blueprintLabel = stringResource(R.string.adaptive_blueprint_label)
        Text(
            "$configLabel ${stringResource(R.string.adaptive_version_value, study.config.version)}" +
                (study.storedBlueprint?.let { " · $blueprintLabel ${stringResource(R.string.adaptive_version_value, it.version)}" } ?: ""),
            style = MaterialTheme.typography.labelMedium,
            color = MaterialTheme.colorScheme.onSurfaceVariant,
            modifier = Modifier.padding(top = 4.dp),
        )

        SectionCard(stringResource(R.string.adaptive_practice_chooses_title)) {
            Text(
                stringResource(R.string.adaptive_practice_chooses_body),
                style = MaterialTheme.typography.bodyMedium,
                modifier = Modifier.padding(top = 6.dp),
            )
        }
        SectionCard(stringResource(R.string.adaptive_readiness_measures_title)) {
            Text(
                stringResource(R.string.adaptive_readiness_measures_body),
                style = MaterialTheme.typography.bodyMedium,
                modifier = Modifier.padding(top = 6.dp),
            )
        }

        SectionCard(stringResource(R.string.adaptive_wrong_vs_weak_heading)) {
            Text(stringResource(R.string.adaptive_wrong_vs_weak_body), style = MaterialTheme.typography.bodyMedium, modifier = Modifier.padding(top = 6.dp))
            Text(
                stringResource(R.string.adaptive_your_record, rawWrong, weakConcepts),
                style = MaterialTheme.typography.bodySmall,
                modifier = Modifier.padding(top = 8.dp),
            )
        }

        SectionCard(stringResource(R.string.adaptive_what_measures_title)) {
            MEASURED.forEach { (titleRes, bodyRes) ->
                Text(stringResource(titleRes), style = MaterialTheme.typography.bodyMedium, modifier = Modifier.padding(top = 10.dp))
                Text(stringResource(bodyRes), style = MaterialTheme.typography.bodySmall, color = MaterialTheme.colorScheme.onSurfaceVariant)
            }
        }
        SectionCard(stringResource(R.string.adaptive_not_measured_title)) {
            NOT_MEASURED.forEach { lineRes ->
                Text("• ${stringResource(lineRes)}", style = MaterialTheme.typography.bodySmall, modifier = Modifier.padding(top = 6.dp))
            }
            Text(
                stringResource(R.string.adaptive_prediction_caveat),
                style = MaterialTheme.typography.bodySmall,
                color = MaterialTheme.colorScheme.onSurfaceVariant,
                modifier = Modifier.padding(top = 10.dp),
            )
        }

        SectionCard(stringResource(R.string.adaptive_next_block_explainer_title)) {
            Text(
                stringResource(R.string.adaptive_next_block_explainer_body),
                style = MaterialTheme.typography.bodyMedium,
                modifier = Modifier.padding(top = 6.dp),
            )
            ShareRow(stringResource(R.string.adaptive_share_weakness), study.shares.weakness, 1.0)
            ShareRow(stringResource(R.string.adaptive_share_coverage), study.shares.coverage, 1.0)
            ShareRow(stringResource(R.string.adaptive_share_review), study.shares.review, 1.0)
            ShareRow(stringResource(R.string.adaptive_share_uncertainty), study.shares.uncertainty, 1.0)
        }

        SectionCard(stringResource(R.string.adaptive_rules_never_relaxed_title)) {
            NON_NEGOTIABLE_CONSTRAINT_RES.forEach { ruleRes ->
                Text("• ${stringResource(ruleRes)}", style = MaterialTheme.typography.bodySmall, modifier = Modifier.padding(top = 6.dp))
            }
            Text(
                stringResource(R.string.adaptive_relaxation_order_note),
                style = MaterialTheme.typography.bodyMedium,
                modifier = Modifier.padding(top = 10.dp),
            )
            study.config.relaxationOrder.forEachIndexed { index, rule ->
                Text(
                    stringResource(R.string.adaptive_relaxation_rule_item, index + 1, stringResource(RELAXABLE_CONSTRAINT_LABEL_RES.getValue(rule))),
                    style = MaterialTheme.typography.bodySmall,
                    modifier = Modifier.padding(top = 4.dp),
                )
            }
        }

        SectionCard(stringResource(R.string.adaptive_status_meanings_title)) {
            CONCEPT_STATUS_LABEL_RES.keys.forEach { status ->
                Text(stringResource(CONCEPT_STATUS_LABEL_RES.getValue(status)), style = MaterialTheme.typography.bodyMedium, modifier = Modifier.padding(top = 8.dp))
                Text(
                    stringResource(STATUS_EXPLANATION.getValue(status)),
                    style = MaterialTheme.typography.bodySmall,
                    color = MaterialTheme.colorScheme.onSurfaceVariant,
                )
            }
        }

        SectionCard(stringResource(R.string.adaptive_provenance_title)) {
            ProvenanceRow(stringResource(R.string.adaptive_provenance_most_recent_evidence), lastEvidence ?: stringResource(R.string.adaptive_provenance_none_yet))
            ProvenanceRow(stringResource(R.string.adaptive_provenance_answers_recorded), "${rawWrong + correctAnswers}")
            ProvenanceRow(stringResource(R.string.adaptive_provenance_algorithm_version), stringResource(R.string.adaptive_version_value, study.config.version))
            ProvenanceRow(
                blueprintLabel,
                study.storedBlueprint?.let { stringResource(R.string.adaptive_version_value, it.version) }
                    ?: stringResource(R.string.adaptive_provenance_no_blueprint),
            )
            ProvenanceRow(stringResource(R.string.adaptive_provenance_concepts_in_scope), "${study.blueprintNodes.size}")
        }
    }
}

@Composable
private fun ProvenanceRow(label: String, value: String) {
    Row(modifier = Modifier.fillMaxWidth().padding(top = 6.dp), horizontalArrangement = Arrangement.SpaceBetween) {
        Text(label, style = MaterialTheme.typography.bodyMedium)
        Text(value, style = MaterialTheme.typography.bodyMedium)
    }
}

// --- copy, ported verbatim from `src/data/adaptive/explain.ts` -------------------
// Text lives in res/values{,-ar}/strings_adaptive.xml (adaptive_wrong_vs_weak_*,
// adaptive_prediction_caveat, adaptive_measured_*, adaptive_not_measured_*,
// adaptive_status_explanation_*) — only the pairing/ordering stays here.

private val MEASURED: List<Pair<Int, Int>> = listOf(
    R.string.adaptive_measured_mastery_title to R.string.adaptive_measured_mastery_body,
    R.string.adaptive_blueprint_coverage_title to R.string.adaptive_measured_coverage_body,
    R.string.adaptive_measured_retention_title to R.string.adaptive_measured_retention_body,
    R.string.adaptive_share_uncertainty to R.string.adaptive_measured_uncertainty_body,
    R.string.adaptive_tab_readiness to R.string.adaptive_measured_readiness_body,
)

private val NOT_MEASURED: List<Int> = listOf(
    R.string.adaptive_not_measured_time_in_app,
    R.string.adaptive_not_measured_questions_completed,
    R.string.adaptive_not_measured_practice_accuracy,
    R.string.adaptive_not_measured_other_students,
)

private val STATUS_EXPLANATION: Map<ConceptStatus, Int> = mapOf(
    ConceptStatus.UNMEASURED to R.string.adaptive_status_explanation_unmeasured,
    ConceptStatus.ATTENTION to R.string.adaptive_status_explanation_attention,
    ConceptStatus.WEAK to R.string.adaptive_status_explanation_weak,
    ConceptStatus.DEVELOPING to R.string.adaptive_status_explanation_developing,
    ConceptStatus.SECURE to R.string.adaptive_status_explanation_secure,
    ConceptStatus.REVIEW_DUE to R.string.adaptive_status_explanation_review_due,
)

// core-adaptive cleanup: the label maps used to live in core/adaptive as
// English-only String constants (CONCEPT_STATUS_LABEL, RELAXABLE_CONSTRAINT_LABEL,
// NON_NEGOTIABLE_CONSTRAINTS). The model/config logic (ConceptStatus, RelaxableConstraint,
// relaxationOrder) is untouched; only the human-readable label moved here as
// @StringRes ids, resolved with stringResource at the call site below.

private val CONCEPT_STATUS_LABEL_RES: Map<ConceptStatus, Int> = mapOf(
    ConceptStatus.UNMEASURED to R.string.adaptive_status_label_unmeasured,
    ConceptStatus.ATTENTION to R.string.adaptive_status_label_attention,
    ConceptStatus.WEAK to R.string.adaptive_status_label_weak,
    ConceptStatus.DEVELOPING to R.string.adaptive_status_label_developing,
    ConceptStatus.SECURE to R.string.adaptive_status_label_secure,
    ConceptStatus.REVIEW_DUE to R.string.adaptive_status_label_review_due,
)

private val RELAXABLE_CONSTRAINT_LABEL_RES: Map<RelaxableConstraint, Int> = mapOf(
    RelaxableConstraint.NOVELTY to R.string.adaptive_constraint_novelty,
    RelaxableConstraint.DIFFICULTY_MIX to R.string.adaptive_constraint_difficulty_mix,
    RelaxableConstraint.CONSECUTIVE_TOPIC to R.string.adaptive_constraint_consecutive_topic,
    RelaxableConstraint.UNSEEN_SHARE to R.string.adaptive_constraint_unseen_share,
    RelaxableConstraint.CONCEPT_CAP to R.string.adaptive_constraint_concept_cap,
    RelaxableConstraint.EXPOSURE_CAP to R.string.adaptive_constraint_exposure_cap,
    RelaxableConstraint.QUOTA_TOLERANCE to R.string.adaptive_constraint_quota_tolerance,
)

/** Never relaxed, at any pool size, for any student. Stated so it can be shown. */
private val NON_NEGOTIABLE_CONSTRAINT_RES: List<Int> = listOf(
    R.string.adaptive_non_negotiable_content_approval,
    R.string.adaptive_non_negotiable_scope,
    R.string.adaptive_non_negotiable_language_accessibility,
    R.string.adaptive_non_negotiable_held_out_readiness,
)

/** [AllocationNeed] display labels — the same four strings [TodayTab] and [HowItWorksTab] already use for [ShareRow]. */
private val NEED_LABEL_RES: Map<AllocationNeed, Int> = mapOf(
    AllocationNeed.WEAKNESS to R.string.adaptive_share_weakness,
    AllocationNeed.COVERAGE to R.string.adaptive_share_coverage,
    AllocationNeed.REVIEW to R.string.adaptive_share_review,
    AllocationNeed.UNCERTAINTY to R.string.adaptive_share_uncertainty,
)

private val TASK_TIER_LABEL_RES: Map<TaskTier, Int> = mapOf(
    TaskTier.MINIMUM to R.string.adaptive_tier_minimum,
    TaskTier.RECOMMENDED to R.string.adaptive_tier_recommended,
    TaskTier.STRETCH to R.string.adaptive_tier_stretch,
)
