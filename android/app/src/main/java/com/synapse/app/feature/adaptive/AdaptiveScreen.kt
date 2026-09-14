package com.synapse.app.feature.adaptive

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
import androidx.compose.ui.unit.dp
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.lifecycle.compose.collectAsStateWithLifecycle
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

enum class AdaptiveTab(val label: String) {
    TODAY("Today"),
    PRACTICE("Practice"),
    READINESS("Readiness"),
    CONCEPTS("Concepts"),
    PLAN("Plan"),
    HOW_IT_WORKS("How this works"),
}

@Composable
private fun AdaptiveScreen(uiState: AdaptiveUiState, onSetOverride: (String, OverrideMode) -> Unit) {
    if (uiState !is AdaptiveUiState.Content) {
        Column(
            modifier = Modifier.fillMaxSize().testTag(ADAPTIVE_LOADING_TAG),
            horizontalAlignment = Alignment.CenterHorizontally,
            verticalArrangement = Arrangement.Center,
        ) { Text("Loading…") }
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
                    text = { Text(tab.label) },
                    modifier = Modifier.testTag(adaptiveTabTag(tab)),
                )
            }
        }

        when (selected) {
            AdaptiveTab.TODAY -> TodayTab(uiState.study)
            AdaptiveTab.CONCEPTS -> ConceptsTab(uiState.study, onSetOverride)
            AdaptiveTab.HOW_IT_WORKS -> HowItWorksTab(uiState.study)
            AdaptiveTab.PRACTICE -> DeferredTab(
                title = "Practice",
                body = "Blocks are built by a soft-constraint selector (novelty, difficulty mix, exposure caps) that has not landed on Android yet. Today already shows you what a block would prioritise.",
            )
            AdaptiveTab.READINESS -> DeferredTab(
                title = "Readiness",
                body = "Readiness assessments are timed, blueprint-balanced sittings drawn from questions held back from practice. That session flow has not landed on Android yet.",
            )
            AdaptiveTab.PLAN -> DeferredTab(
                title = "Plan",
                body = "The weekly study-plan scheduler has not been ported to this client yet.",
            )
        }
    }
}

@Composable
private fun DeferredTab(title: String, body: String) {
    Column(modifier = Modifier.fillMaxSize().padding(20.dp)) {
        Text(title, style = MaterialTheme.typography.titleLarge)
        Text(body, style = MaterialTheme.typography.bodyMedium, modifier = Modifier.padding(top = 10.dp))
        Text(
            "Coming soon.",
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
        Text("Recommended next", style = MaterialTheme.typography.labelLarge, color = MaterialTheme.colorScheme.primary)
        Text(study.recommendation.title, style = MaterialTheme.typography.headlineSmall, modifier = Modifier.padding(top = 4.dp))
        Text(study.recommendation.body, style = MaterialTheme.typography.bodyMedium, modifier = Modifier.padding(top = 6.dp))

        val counts = statusCounts(study.states, study.blueprintNodes.map { it.conceptId })
        val weak = counts[ConceptStatus.WEAK] ?: 0
        val due = counts[ConceptStatus.REVIEW_DUE] ?: 0
        val measured = study.states.size
        val rawWrong = rawWrongAttempts(study.events)

        SectionCard("At a glance") {
            StatFigure(
                label = "Readiness",
                value = study.readiness?.let { rangeText(it.lower, it.upper) } ?: "Not yet",
                sub = study.readiness?.let { "From ${it.answered} held-out questions" }
                    ?: "Measured separately, on questions held back from practice.",
            )
            StatFigure(
                label = "Blueprint covered",
                value = if (study.blueprintNodes.isEmpty()) "Not yet" else percent(study.coverage.coveredWeight),
                sub = "${study.coverage.uncoveredConcepts.size} concept${if (study.coverage.uncoveredConcepts.size == 1) "" else "s"} untouched",
            )
            StatFigure(label = "Weak concepts", value = "$weak", sub = "$rawWrong wrong answer${if (rawWrong == 1) "" else "s"} recorded")
            StatFigure(label = "Due for review", value = "$due", sub = "$measured concept${if (measured == 1) "" else "s"} measured")
        }

        if (study.blueprintNodes.isNotEmpty()) {
            SectionCard("Blueprint coverage") {
                study.coverage.groups.take(8).forEach { group ->
                    ShareRow(label = group.groupLabel, value = group.coveredWeight, max = group.weight)
                }
                if (study.debt.slots >= 1) {
                    Text(
                        "Recent blocks under-served blueprint coverage by about ${study.debt.slots.roundToInt()} questions. That shortfall is being repaid across the next few blocks rather than all at once.",
                        style = MaterialTheme.typography.bodySmall,
                        color = MaterialTheme.colorScheme.onSurfaceVariant,
                        modifier = Modifier.padding(top = 8.dp),
                    )
                }
            }
        }

        SectionCard("What your next block will contain") {
            ShareRow("Weakness", study.shares.weakness, 1.0)
            ShareRow("Coverage", study.shares.coverage, 1.0)
            ShareRow("Review", study.shares.review, 1.0)
            ShareRow("Uncertainty", study.shares.uncertainty, 1.0)
            Text(
                "These are allocation targets, not separate pools. One question often satisfies several of them at once and takes a single slot.",
                style = MaterialTheme.typography.bodySmall,
                color = MaterialTheme.colorScheme.onSurfaceVariant,
                modifier = Modifier.padding(top = 8.dp),
            )
        }

        SectionCard(WRONG_VS_WEAK_HEADING) {
            Text(WRONG_VS_WEAK_BODY, style = MaterialTheme.typography.bodyMedium, modifier = Modifier.padding(top = 6.dp))
        }
    }
}

// --- Concepts ------------------------------------------------------------------

@Composable
private fun ConceptsTab(study: AdaptiveStudy, onSetOverride: (String, OverrideMode) -> Unit) {
    if (study.blueprintNodes.isEmpty()) {
        Column(modifier = Modifier.fillMaxSize().padding(20.dp)) {
            Text("No concepts in scope", style = MaterialTheme.typography.titleLarge)
            Text(
                "Nothing is scoped to your university and year yet, so there is nothing to measure. An administrator sets the blueprint up.",
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
            WRONG_VS_WEAK_BODY,
            style = MaterialTheme.typography.bodySmall,
            color = MaterialTheme.colorScheme.onSurfaceVariant,
        )
        Text("Your concepts (${rows.size})", style = MaterialTheme.typography.titleMedium, modifier = Modifier.padding(top = 16.dp))

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
                        "${node.groupLabel} · ${percent(node.weight)} of blueprint",
                        style = MaterialTheme.typography.bodySmall,
                        color = MaterialTheme.colorScheme.onSurfaceVariant,
                    )
                    if (state != null && status != ConceptStatus.UNMEASURED) {
                        val lower = (state.mean - state.uncertainty).coerceIn(0.0, 1.0)
                        val upper = (state.mean + state.uncertainty).coerceIn(0.0, 1.0)
                        Text(
                            "Mastery ${rangeText(lower, upper)} · ${state.distinctItems} items · ${state.rawWrong} wrong",
                            style = MaterialTheme.typography.bodySmall,
                            modifier = Modifier.padding(top = 4.dp),
                        )
                    } else {
                        Text("Not enough evidence yet", style = MaterialTheme.typography.bodySmall, modifier = Modifier.padding(top = 4.dp))
                    }

                    Row(modifier = Modifier.fillMaxWidth().padding(top = 10.dp), horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                        FilterChip(
                            selected = override == null || override.mode == OverrideMode.NORMAL,
                            onClick = { onSetOverride(node.conceptId, OverrideMode.NORMAL) },
                            label = { Text("Normal") },
                        )
                        FilterChip(
                            selected = override?.mode == OverrideMode.SNOOZED,
                            onClick = { onSetOverride(node.conceptId, OverrideMode.SNOOZED) },
                            label = { Text("Snoozed") },
                        )
                        FilterChip(
                            selected = override?.mode == OverrideMode.OUT_OF_SCOPE,
                            onClick = { onSetOverride(node.conceptId, OverrideMode.OUT_OF_SCOPE) },
                            label = { Text("Out of scope") },
                        )
                    }
                }
            }
        }

        SectionCard("What your overrides do") {
            Text(
                "Snoozed keeps the concept measured and keeps its evidence, but stops selection offering it for two weeks. Use it when you have decided to come back to something later.",
                style = MaterialTheme.typography.bodySmall,
                modifier = Modifier.padding(top = 6.dp),
            )
            Text(
                "Out of scope removes the concept from your blueprint entirely, so it stops counting toward coverage and stops being selected. Use it when a concept genuinely is not on your exam.",
                style = MaterialTheme.typography.bodySmall,
                modifier = Modifier.padding(top = 6.dp),
            )
            Text(
                "Neither deletes anything. Your answers stay in the record, and setting a concept back to Normal restores its state exactly as it was.",
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
        Text("Two systems, measured separately", style = MaterialTheme.typography.titleLarge)
        Text(
            "Config v${study.config.version}" + (study.storedBlueprint?.let { " · Blueprint v${it.version}" } ?: ""),
            style = MaterialTheme.typography.labelMedium,
            color = MaterialTheme.colorScheme.onSurfaceVariant,
            modifier = Modifier.padding(top = 4.dp),
        )

        SectionCard("Adaptive practice chooses what to study") {
            Text(
                "Adaptive blocks deliberately oversample what you are weakest at and what is due for review. Your accuracy inside them is therefore not a fair estimate of your exam performance, and it is not used as one.",
                style = MaterialTheme.typography.bodyMedium,
                modifier = Modifier.padding(top = 6.dp),
            )
        }
        SectionCard("Readiness assessment measures where you stand") {
            Text(
                "Readiness assessments are balanced against your exam blueprint, timed, and built from questions held back from ordinary practice. They report a range rather than a single score, because a limited number of questions cannot support more precision than that.",
                style = MaterialTheme.typography.bodyMedium,
                modifier = Modifier.padding(top = 6.dp),
            )
        }

        SectionCard(WRONG_VS_WEAK_HEADING) {
            Text(WRONG_VS_WEAK_BODY, style = MaterialTheme.typography.bodyMedium, modifier = Modifier.padding(top = 6.dp))
            Text(
                "Your record: $rawWrong wrong answers · $weakConcepts weak concepts",
                style = MaterialTheme.typography.bodySmall,
                modifier = Modifier.padding(top = 8.dp),
            )
        }

        SectionCard("What Maristana measures") {
            MEASURED.forEach { (title, body) ->
                Text(title, style = MaterialTheme.typography.bodyMedium, modifier = Modifier.padding(top = 10.dp))
                Text(body, style = MaterialTheme.typography.bodySmall, color = MaterialTheme.colorScheme.onSurfaceVariant)
            }
        }
        SectionCard("What it does not measure") {
            NOT_MEASURED.forEach { line ->
                Text("• $line", style = MaterialTheme.typography.bodySmall, modifier = Modifier.padding(top = 6.dp))
            }
            Text(
                PREDICTION_CAVEAT,
                style = MaterialTheme.typography.bodySmall,
                color = MaterialTheme.colorScheme.onSurfaceVariant,
                modifier = Modifier.padding(top = 10.dp),
            )
        }

        SectionCard("How your next block is put together") {
            Text(
                "Each block is divided into slots. These are allocation targets, not separate pools — one question often satisfies several needs at once, and always takes exactly one slot.",
                style = MaterialTheme.typography.bodyMedium,
                modifier = Modifier.padding(top = 6.dp),
            )
            ShareRow("Weakness", study.shares.weakness, 1.0)
            ShareRow("Coverage", study.shares.coverage, 1.0)
            ShareRow("Review", study.shares.review, 1.0)
            ShareRow("Uncertainty", study.shares.uncertainty, 1.0)
        }

        SectionCard("Rules that are never relaxed") {
            NON_NEGOTIABLE_CONSTRAINTS.forEach { rule ->
                Text("• $rule", style = MaterialTheme.typography.bodySmall, modifier = Modifier.padding(top = 6.dp))
            }
            Text(
                "When the question bank cannot satisfy every selection rule, the rules below are relaxed in this published order, the relaxation is recorded, and a shortage is reported.",
                style = MaterialTheme.typography.bodyMedium,
                modifier = Modifier.padding(top = 10.dp),
            )
            study.config.relaxationOrder.forEachIndexed { index, rule ->
                Text(
                    "${index + 1}. ${RELAXABLE_CONSTRAINT_LABEL.getValue(rule)}",
                    style = MaterialTheme.typography.bodySmall,
                    modifier = Modifier.padding(top = 4.dp),
                )
            }
        }

        SectionCard("What each status means") {
            CONCEPT_STATUS_LABEL.keys.forEach { status ->
                Text(CONCEPT_STATUS_LABEL.getValue(status), style = MaterialTheme.typography.bodyMedium, modifier = Modifier.padding(top = 8.dp))
                Text(
                    STATUS_EXPLANATION.getValue(status),
                    style = MaterialTheme.typography.bodySmall,
                    color = MaterialTheme.colorScheme.onSurfaceVariant,
                )
            }
        }

        SectionCard("Provenance") {
            ProvenanceRow("Most recent evidence", lastEvidence ?: "None yet")
            ProvenanceRow("Answers recorded", "${rawWrong + correctAnswers}")
            ProvenanceRow("Algorithm version", "v${study.config.version}")
            ProvenanceRow("Blueprint", study.storedBlueprint?.let { "v${it.version}" } ?: "No blueprint published")
            ProvenanceRow("Concepts in scope", "${study.blueprintNodes.size}")
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

private const val WRONG_VS_WEAK_HEADING = "Wrong answers and weak concepts are counted differently"
private const val WRONG_VS_WEAK_BODY =
    "If you answer three questions incorrectly and all three were mainly testing the same concept, that records three wrong attempts and at most one weak concept. The mistakes are all kept — they make repairing that concept more urgent — but they do not create three separate weaknesses. This is why the number of wrong answers you remember is usually larger than the number of weak concepts shown."

private const val PREDICTION_CAVEAT =
    "Every estimate here is a range based on the questions you have answered so far, under a model that has not yet been calibrated against results at your university. It describes your current preparation. It is not a prediction of your exam result, and it is not a guarantee."

private val MEASURED: List<Pair<String, String>> = listOf(
    "Concept mastery" to "A decayed estimate per concept, rebuilt from every answer you have given. It carries a range, not a single number, and the range widens as evidence ages.",
    "Blueprint coverage" to "How much of your exam blueprint, by weight, has any evidence behind it. Covered means practised at all — not mastered.",
    "Retention" to "Whether a concept survives a gap. A correct answer at least two days after the last one counts differently from four in a row.",
    "Uncertainty" to "How little is known about a concept. This is what funds practice on things you have never been asked about.",
    "Readiness" to "A separate, blueprint-balanced, timed measurement using questions held back from your practice.",
)

private val NOT_MEASURED: List<String> = listOf(
    "Time spent in the app, or how often you open it.",
    "How many questions you have completed.",
    "Your accuracy inside adaptive blocks — those deliberately oversample your weak areas, so it reads lower than your real standing.",
    "Anything about other students. No figure here is a comparison.",
)

private val STATUS_EXPLANATION: Map<ConceptStatus, String> = mapOf(
    ConceptStatus.UNMEASURED to "Not enough distinct questions yet to say anything about this.",
    ConceptStatus.ATTENTION to "One recent answer went wrong. This will be checked again — this is not a weakness label.",
    ConceptStatus.WEAK to "Repeated evidence across different questions points to a real gap here.",
    ConceptStatus.DEVELOPING to "Measurable, but not yet strong enough to count as secure.",
    ConceptStatus.SECURE to "Answered correctly across several distinct questions, including one after a gap of at least two days.",
    ConceptStatus.REVIEW_DUE to "This was secure, and enough time has passed that it is worth checking again.",
)
