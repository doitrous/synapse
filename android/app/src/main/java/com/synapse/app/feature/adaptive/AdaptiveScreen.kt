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
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.res.pluralStringResource
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.unit.dp
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import com.synapse.app.R
import com.synapse.app.core.adaptive.CONCEPT_STATUS_LABEL
import com.synapse.app.core.adaptive.ConceptStatus
import com.synapse.app.core.adaptive.NON_NEGOTIABLE_CONSTRAINTS
import com.synapse.app.core.adaptive.RELAXABLE_CONSTRAINT_LABEL
import com.synapse.app.core.adaptive.rawWrongAttempts
import kotlin.math.roundToInt

const val ADAPTIVE_LOADING_TAG = "adaptive_loading"
fun adaptiveTabTag(tab: AdaptiveTab): String = "adaptive_tab_${tab.name}"
fun adaptiveConceptRowTag(conceptId: String): String = "adaptive_concept_$conceptId"

/**
 * The Adaptive Study feature's single public entry point. Constructs its own
 * [AdaptiveViewModel] via [hiltViewModel] — no navigation wiring required of
 * the caller (see `feature.library.LibraryRoute` for the same shape).
 *
 * **Tabs implemented vs deferred.** Web/iOS ship six tabs: Today, Practice,
 * Readiness, Concepts, Plan, How this works. This pass lands **Today,
 * Concepts and How this works** — the three that only need the mastery
 * model, coverage and the allocation shares, all already wired to real
 * engine output over this student's own evidence. **Practice, Readiness and
 * Plan are deferred** (shown as a plain "coming soon" pane, never a
 * fabricated block/assessment/schedule): each needs a piece of the engine
 * this task did not build —
 *  - Practice needs the soft-constraint block builder (`blockBuilder.ts` /
 *    novelty, difficulty mix, consecutive-topic, exposure-cap relaxation),
 *    which is not part of the merged `core.adaptive` engine this task builds
 *    on top of.
 *  - Readiness needs a session flow around `assembleReadiness`/`scoreReadiness`
 *    (timed, single-sitting, no adaptive substitution) plus a place to write
 *    new [com.synapse.app.core.adaptive.ReadinessResult]s — [AdaptiveRepository]
 *    only reads the existing history today.
 *  - Plan needs the weekly-schedule engine (`schedule.ts`), which — like
 *    boosts/interventions/crash-course — is explicitly not ported into
 *    `core.adaptive.AdaptiveConfig` yet (see that file's doc comment).
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
            AdaptiveTab.PRACTICE -> DeferredTab(
                titleRes = R.string.adaptive_tab_practice,
                bodyRes = R.string.adaptive_practice_deferred_body,
            )
            AdaptiveTab.READINESS -> DeferredTab(
                titleRes = R.string.adaptive_tab_readiness,
                bodyRes = R.string.adaptive_readiness_deferred_body,
            )
            AdaptiveTab.PLAN -> DeferredTab(
                titleRes = R.string.adaptive_tab_plan,
                bodyRes = R.string.adaptive_plan_deferred_body,
            )
        }
    }
}

@Composable
private fun DeferredTab(@StringRes titleRes: Int, @StringRes bodyRes: Int) {
    Column(modifier = Modifier.fillMaxSize().padding(20.dp)) {
        Text(stringResource(titleRes), style = MaterialTheme.typography.titleLarge)
        Text(stringResource(bodyRes), style = MaterialTheme.typography.bodyMedium, modifier = Modifier.padding(top = 10.dp))
        Text(
            stringResource(R.string.adaptive_coming_soon),
            style = MaterialTheme.typography.labelLarge,
            color = MaterialTheme.colorScheme.primary,
            modifier = Modifier.padding(top = 16.dp),
        )
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
                        Text(CONCEPT_STATUS_LABEL.getValue(status), style = MaterialTheme.typography.labelLarge)
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
            NON_NEGOTIABLE_CONSTRAINTS.forEach { rule ->
                Text("• $rule", style = MaterialTheme.typography.bodySmall, modifier = Modifier.padding(top = 6.dp))
            }
            Text(
                stringResource(R.string.adaptive_relaxation_order_note),
                style = MaterialTheme.typography.bodyMedium,
                modifier = Modifier.padding(top = 10.dp),
            )
            study.config.relaxationOrder.forEachIndexed { index, rule ->
                Text(
                    stringResource(R.string.adaptive_relaxation_rule_item, index + 1, RELAXABLE_CONSTRAINT_LABEL.getValue(rule)),
                    style = MaterialTheme.typography.bodySmall,
                    modifier = Modifier.padding(top = 4.dp),
                )
            }
        }

        SectionCard(stringResource(R.string.adaptive_status_meanings_title)) {
            CONCEPT_STATUS_LABEL.keys.forEach { status ->
                Text(CONCEPT_STATUS_LABEL.getValue(status), style = MaterialTheme.typography.bodyMedium, modifier = Modifier.padding(top = 8.dp))
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
