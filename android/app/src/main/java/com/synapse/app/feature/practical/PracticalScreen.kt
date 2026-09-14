package com.synapse.app.feature.practical

import androidx.annotation.StringRes
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowBack
import androidx.compose.material3.Button
import androidx.compose.material3.Checkbox
import androidx.compose.material3.HorizontalDivider
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.material3.Tab
import androidx.compose.material3.TabRow
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.DisposableEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
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
import com.synapse.app.core.practical.Practical
import com.synapse.app.core.practical.PracticalProgress
import com.synapse.app.core.practical.totalMarkItems

const val PRACTICAL_LOADING_TAG = "practical_loading"
fun practicalTabTag(tab: PracticalTab): String = "practical_tab_${tab.name}"
fun practicalRowTag(id: String): String = "practical_row_$id"
const val PRACTICAL_BACK_BUTTON_TAG = "practical_back_button"
const val PRACTICAL_REVEAL_BUTTON_TAG = "practical_reveal_button"
fun practicalMarkItemTag(sectionId: String, index: Int): String = "practical_mark_item_${sectionId}_$index"
fun practicalSkillCycleTag(id: String): String = "practical_skill_cycle_$id"

/**
 * The Practical tab's single public entry point. The shell mounts this
 * directly and it constructs its own [PracticalViewModel] via [hiltViewModel]
 * — no navigation wiring required of the caller. Tab bar and runner
 * navigation are internal to this composable (see [PracticalPane]).
 *
 * **This pass implements three of the six tabs the production surfaces
 * carry: OSCE stations, Clinical cases, and Skills.** They are the ones the
 * iOS parity benchmark (`Features/More/PracticalView.swift`) actually
 * renders — iOS has no Oral-questions or Histology surface at all, and its
 * Lab/Imaging interpretation rows share the same generic runner OSCE
 * stations and skills-with-a-mark-scheme use here. Deferred, matching the
 * plan's brief:
 * - **Lab & imaging** — `Practical.questions` already projects (see
 *   `core/practical/Practical.kt`); no tab lists `type == "Lab
 *   interpretation" || "Imaging interpretation"` items yet, and
 *   `PracticalProgress.Lab` is decoded but nothing writes it.
 * - **Oral questions** — web-only content (`src/data/practical.ts`'s
 *   `oralQuestions`), a static seed list rather than ledger content; no
 *   Android equivalent exists to project yet.
 * - **Histology** — a distinct web-only feature (`src/data/histology.ts`,
 *   the microscope/slide viewer) with no iOS or ledger-content counterpart.
 */
@Composable
fun PracticalRoute(viewModel: PracticalViewModel = hiltViewModel()) {
    val uiState by viewModel.uiState.collectAsStateWithLifecycle()
    PracticalScreen(
        uiState = uiState,
        onFinishRun = viewModel::finishRun,
        onAdvanceCase = viewModel::advanceCase,
        onCycleSkill = viewModel::cycleSkill,
    )
}

enum class PracticalTab(@StringRes val labelRes: Int) {
    OSCE(R.string.practical_tab_osce),
    CASES(R.string.practical_tab_cases),
    SKILLS(R.string.practical_tab_skills),
}

/** Where inside Practical the student currently is: a tab's list, or a runner over one item. */
private sealed interface PracticalPane {
    data class List(val tab: PracticalTab) : PracticalPane
    data class Runner(val practicalId: String) : PracticalPane
}

@Composable
private fun PracticalScreen(
    uiState: PracticalUiState,
    onFinishRun: (Practical, Set<String>) -> Unit,
    onAdvanceCase: (Practical, Int, Boolean) -> Unit,
    onCycleSkill: (String) -> Unit,
) {
    if (uiState !is PracticalUiState.Content) {
        Column(
            modifier = Modifier.fillMaxSize().testTag(PRACTICAL_LOADING_TAG),
            horizontalAlignment = Alignment.CenterHorizontally,
            verticalArrangement = Arrangement.Center,
        ) { Text(stringResource(R.string.practical_loading)) }
        return
    }

    var tab by rememberSaveable { mutableStateOf(PracticalTab.OSCE) }
    var openId by rememberSaveable { mutableStateOf<String?>(null) }
    val pane: PracticalPane = openId?.let { PracticalPane.Runner(it) } ?: PracticalPane.List(tab)

    when (pane) {
        is PracticalPane.List -> Column(modifier = Modifier.fillMaxSize()) {
            Text(stringResource(R.string.practical_title), style = MaterialTheme.typography.titleLarge, modifier = Modifier.padding(16.dp))
            TabRow(selectedTabIndex = pane.tab.ordinal) {
                PracticalTab.entries.forEach { entry ->
                    Tab(
                        selected = pane.tab == entry,
                        onClick = { tab = entry },
                        text = { Text(stringResource(entry.labelRes)) },
                        modifier = Modifier.testTag(practicalTabTag(entry)),
                    )
                }
            }
            when (pane.tab) {
                PracticalTab.OSCE -> StationListPane(uiState.osceStations, uiState.progress, onOpen = { openId = it })
                PracticalTab.CASES -> CaseListPane(uiState.clinicalCases, uiState.progress, onOpen = { openId = it })
                PracticalTab.SKILLS -> SkillListPane(uiState.skills, uiState.progress, onOpen = { openId = it }, onCycleSkill = onCycleSkill)
            }
        }

        is PracticalPane.Runner -> {
            val practical = (uiState.osceStations + uiState.clinicalCases + uiState.skills).firstOrNull { it.id == pane.practicalId }
            if (practical == null) {
                openId = null
            } else {
                RunnerPane(
                    practical = practical,
                    progress = uiState.progress,
                    onBack = { openId = null },
                    onFinishRun = onFinishRun,
                    onAdvanceCase = onAdvanceCase,
                )
            }
        }
    }
}

@Composable
private fun EmptyHint(text: String) {
    Text(text, style = MaterialTheme.typography.bodyMedium, modifier = Modifier.padding(16.dp))
}

@Composable
private fun StationListPane(items: List<Practical>, progress: PracticalProgress, onOpen: (String) -> Unit) {
    if (items.isEmpty()) {
        EmptyHint(stringResource(R.string.practical_osce_empty))
        return
    }
    Column(modifier = Modifier.fillMaxSize().verticalScroll(rememberScrollState())) {
        items.forEach { station ->
            val best = progress.stations[station.id]
            Surface(onClick = { onOpen(station.id) }, modifier = Modifier.fillMaxWidth().testTag(practicalRowTag(station.id))) {
                Row(modifier = Modifier.fillMaxWidth().padding(16.dp, 12.dp), horizontalArrangement = Arrangement.SpaceBetween) {
                    Column {
                        Text(station.title, style = MaterialTheme.typography.bodyLarge)
                        Text(
                            listOfNotNull(
                                station.minutes?.let { stringResource(R.string.practical_minutes_format, it) },
                                station.marks?.let { pluralStringResource(R.plurals.practical_marks, it, it) },
                                station.difficulty,
                            ).joinToString(" · "),
                            style = MaterialTheme.typography.bodySmall,
                        )
                    }
                    Text(
                        if (best != null && best.outOf > 0) {
                            stringResource(R.string.practical_best_score_format, best.bestMarks, best.outOf)
                        } else {
                            stringResource(R.string.practical_not_attempted)
                        },
                        style = MaterialTheme.typography.bodySmall,
                    )
                }
            }
            HorizontalDivider()
        }
    }
}

@Composable
private fun CaseListPane(items: List<Practical>, progress: PracticalProgress, onOpen: (String) -> Unit) {
    if (items.isEmpty()) {
        EmptyHint(stringResource(R.string.practical_cases_empty))
        return
    }
    Column(modifier = Modifier.fillMaxSize().verticalScroll(rememberScrollState())) {
        items.forEach { case ->
            val record = progress.cases[case.id]
            val statusLabel = when (record?.status) {
                PracticalProgress.CaseStatus.COMPLETED -> stringResource(R.string.practical_case_completed)
                PracticalProgress.CaseStatus.IN_PROGRESS -> stringResource(R.string.practical_case_progress_format, record.lastStep, record.steps)
                else -> stringResource(R.string.practical_not_started)
            }
            val minutesText = case.minutes?.let { stringResource(R.string.practical_minutes_format, it) }
                ?: stringResource(R.string.practical_minutes_unknown)
            val stepsText = pluralStringResource(R.plurals.practical_steps, case.decisions.size, case.decisions.size)
            Surface(onClick = { onOpen(case.id) }, modifier = Modifier.fillMaxWidth().testTag(practicalRowTag(case.id))) {
                Row(modifier = Modifier.fillMaxWidth().padding(16.dp, 12.dp), horizontalArrangement = Arrangement.SpaceBetween) {
                    Column {
                        Text(case.title, style = MaterialTheme.typography.bodyLarge)
                        Text("$minutesText · $stepsText", style = MaterialTheme.typography.bodySmall)
                    }
                    Text(statusLabel, style = MaterialTheme.typography.bodySmall)
                }
            }
            HorizontalDivider()
        }
    }
}

/**
 * A skill checklist item with no mark scheme is rated directly from the row —
 * there is nothing to open and read, matching iOS's
 * `isSkill(item), item.markSections.isEmpty` branch. One that does carry a
 * mark scheme (an OSCE-style skills station) opens the same runner a station
 * does.
 */
@Composable
private fun SkillListPane(items: List<Practical>, progress: PracticalProgress, onOpen: (String) -> Unit, onCycleSkill: (String) -> Unit) {
    if (items.isEmpty()) {
        EmptyHint(stringResource(R.string.practical_skills_empty))
        return
    }
    Column(modifier = Modifier.fillMaxSize().verticalScroll(rememberScrollState())) {
        items.forEach { skill ->
            val hasMarkScheme = skill.totalMarkItems() > 0
            Surface(
                onClick = { if (hasMarkScheme) onOpen(skill.id) },
                modifier = Modifier.fillMaxWidth().testTag(practicalRowTag(skill.id)),
            ) {
                Row(
                    modifier = Modifier.fillMaxWidth().padding(16.dp, 12.dp),
                    verticalAlignment = Alignment.CenterVertically,
                    horizontalArrangement = Arrangement.SpaceBetween,
                ) {
                    Text(skill.title, style = MaterialTheme.typography.bodyLarge, modifier = Modifier.weight(1f))
                    if (hasMarkScheme) {
                        val best = progress.stations[skill.id]
                        val text = if (best != null && best.outOf > 0) {
                            stringResource(R.string.practical_best_score_format, best.bestMarks, best.outOf)
                        } else {
                            stringResource(R.string.practical_not_attempted)
                        }
                        Text(text, style = MaterialTheme.typography.bodySmall)
                    } else {
                        val status = progress.statusOfSkill(skill.id)
                        Button(onClick = { onCycleSkill(skill.id) }, modifier = Modifier.testTag(practicalSkillCycleTag(skill.id))) {
                            Text(stringResource(status.labelRes()))
                        }
                    }
                }
            }
            HorizontalDivider()
        }
    }
}

@StringRes
private fun PracticalProgress.SkillStatus.labelRes(): Int = when (this) {
    PracticalProgress.SkillStatus.NOT_STARTED -> R.string.practical_not_started
    PracticalProgress.SkillStatus.PRACTISED -> R.string.practical_skill_practised
    PracticalProgress.SkillStatus.READY -> R.string.practical_skill_ready
}

/**
 * Runs a station, case, or skills-checklist-with-a-mark-scheme: candidate
 * instructions, staged decisions (revealed on demand), the tickable mark
 * scheme, and the debrief — a direct port of iOS `PracticalDetailView`.
 * Answers stay behind a tap: a mark scheme visible while still working
 * through a station is not a mark scheme, it is the answers.
 *
 * Keeps the run on the way out ([DisposableEffect]) rather than on every tick
 * — the record is one document, and a fifty-point mark scheme would
 * otherwise cost fifty writes — and only when something actually changed
 * from what was open, so reopening a station to read it does not count as
 * another attempt.
 */
@Composable
private fun RunnerPane(
    practical: Practical,
    progress: PracticalProgress,
    onBack: () -> Unit,
    onFinishRun: (Practical, Set<String>) -> Unit,
    onAdvanceCase: (Practical, Int, Boolean) -> Unit,
) {
    val resumedTicks = remember(practical.id) { progress.stations[practical.id]?.checkedItems?.toSet() ?: emptySet() }
    var ticked by rememberSaveable(practical.id) { mutableStateOf(resumedTicks) }
    var revealed by rememberSaveable(practical.id) { mutableStateOf(false) }
    val totalMarkItems = practical.totalMarkItems()
    val hasHiddenContent = practical.debrief != null ||
        practical.decisions.any { it.answer != null } ||
        practical.questions.any { it.answer != null }

    DisposableEffect(practical.id) {
        onDispose {
            when {
                totalMarkItems > 0 -> if (ticked != resumedTicks) onFinishRun(practical, ticked)
                practical.decisions.isNotEmpty() -> onAdvanceCase(practical, if (revealed) practical.decisions.size else 0, revealed)
                // Lab/imaging questions: deferred, see PracticalScreen's top-level doc comment.
            }
        }
    }

    Column(modifier = Modifier.fillMaxSize().padding(16.dp).verticalScroll(rememberScrollState())) {
        Row(verticalAlignment = Alignment.CenterVertically, horizontalArrangement = Arrangement.spacedBy(8.dp)) {
            IconButton(onClick = onBack, modifier = Modifier.testTag(PRACTICAL_BACK_BUTTON_TAG)) {
                Icon(Icons.AutoMirrored.Filled.ArrowBack, contentDescription = stringResource(R.string.practical_back))
            }
            Text(practical.title, style = MaterialTheme.typography.titleLarge)
        }
        Text(
            listOfNotNull(
                practical.type,
                practical.minutes?.let { stringResource(R.string.practical_minutes_format, it) },
                practical.marks?.let { pluralStringResource(R.plurals.practical_marks, it, it) },
            ).joinToString(" · "),
            style = MaterialTheme.typography.labelLarge,
            modifier = Modifier.padding(top = 4.dp),
        )
        practical.learningObjective?.let { Text(it, style = MaterialTheme.typography.bodyMedium, modifier = Modifier.padding(top = 8.dp)) }

        practical.candidateInstructions?.let {
            SectionCard(stringResource(R.string.practical_candidate_instructions_title)) { Text(it, style = MaterialTheme.typography.bodyLarge) }
        }

        val decisionDefaultTitle = stringResource(R.string.practical_decision_default_title)
        practical.decisions.forEach { decision ->
            SectionCard(decision.title.ifBlank { decisionDefaultTitle }) {
                Column {
                    if (decision.context.isNotBlank()) Text(decision.context, style = MaterialTheme.typography.bodyLarge)
                    decision.prompt?.let { Text(it, style = MaterialTheme.typography.bodyMedium, modifier = Modifier.padding(top = 6.dp)) }
                    if (revealed) decision.answer?.let { Text(it, style = MaterialTheme.typography.bodyMedium, modifier = Modifier.padding(top = 6.dp)) }
                }
            }
        }

        practical.questions.forEach { question ->
            SectionCard(stringResource(R.string.practical_question_section_title)) {
                Column {
                    Text(question.prompt, style = MaterialTheme.typography.bodyLarge)
                    if (revealed) question.answer?.let { Text(it, style = MaterialTheme.typography.bodyMedium, modifier = Modifier.padding(top = 6.dp)) }
                }
            }
        }

        if (practical.markSections.isNotEmpty()) {
            SectionCard(stringResource(R.string.practical_mark_scheme_title)) {
                Column {
                    practical.markSections.forEach { section ->
                        if (section.title.isNotBlank()) Text(section.title, style = MaterialTheme.typography.titleSmall, modifier = Modifier.padding(top = 8.dp))
                        section.items.forEachIndexed { index, item ->
                            val key = "${section.id}-$index"
                            val isTicked = key in ticked
                            Row(
                                verticalAlignment = Alignment.CenterVertically,
                                modifier = Modifier.fillMaxWidth()
                                    .testTag(practicalMarkItemTag(section.id, index))
                                    .padding(vertical = 4.dp),
                            ) {
                                Checkbox(
                                    checked = isTicked,
                                    onCheckedChange = { ticked = if (isTicked) ticked - key else ticked + key },
                                )
                                Text(item, style = MaterialTheme.typography.bodyMedium)
                            }
                        }
                    }
                    if (totalMarkItems > 0) {
                        Text(
                            stringResource(R.string.practical_ticked_count_format, ticked.size, totalMarkItems),
                            style = MaterialTheme.typography.bodySmall,
                            modifier = Modifier.padding(top = 8.dp),
                        )
                        progress.stations[practical.id]?.takeIf { it.outOf > 0 }?.let {
                            val bestText = stringResource(R.string.practical_best_score_format, it.bestMarks, it.outOf)
                            val attemptsText = pluralStringResource(R.plurals.practical_attempts, it.attempts, it.attempts)
                            Text("$bestText · $attemptsText", style = MaterialTheme.typography.bodySmall)
                        }
                    }
                }
            }
        }

        if (revealed) {
            practical.debrief?.let { SectionCard(stringResource(R.string.practical_debrief_title)) { Text(it, style = MaterialTheme.typography.bodyLarge) } }
        }

        if (hasHiddenContent) {
            Button(
                onClick = { revealed = true },
                enabled = !revealed,
                modifier = Modifier.padding(top = 16.dp).testTag(PRACTICAL_REVEAL_BUTTON_TAG),
            ) { Text(stringResource(if (revealed) R.string.practical_answers_shown else R.string.practical_reveal_answers)) }
        }

        if (practical.references.isNotEmpty()) {
            SectionCard(stringResource(R.string.practical_references_title)) {
                Column { practical.references.forEach { Text(it, style = MaterialTheme.typography.bodySmall) } }
            }
        }
    }
}

@Composable
private fun SectionCard(title: String, content: @Composable () -> Unit) {
    Column(modifier = Modifier.fillMaxWidth().padding(top = 16.dp)) {
        Text(title, style = MaterialTheme.typography.titleMedium)
        Column(modifier = Modifier.padding(top = 6.dp)) { content() }
    }
}
