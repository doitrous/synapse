package com.synapse.android.feature.practical

import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material3.Button
import androidx.compose.material3.Card
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Tab
import androidx.compose.material3.PrimaryTabRow
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import com.synapse.android.core.model.Practical
import com.synapse.android.core.practical.PRACTICAL_ORAL_QUESTIONS
import com.synapse.android.core.practical.PRACTICAL_SKILLS
import com.synapse.android.core.practical.SKILL_CATEGORY_COMMUNICATION
import com.synapse.android.core.practical.SKILL_CATEGORY_EXAMINATION
import com.synapse.android.core.practical.SKILL_CATEGORY_PROCEDURES
import com.synapse.android.core.practical.SKILL_NOT_STARTED
import com.synapse.android.core.practical.SKILL_PRACTISED
import com.synapse.android.core.practical.SKILL_READY
import com.synapse.android.core.practical.PracticalProgress
import com.synapse.android.core.practical.Skill
import com.synapse.android.core.practical.summariseSkills
import kotlin.math.roundToInt

/** The five tabs, in the exact order and copy of `Practical.tsx:530-541`. */
private enum class ListTab(val label: String) {
    OSCE("OSCE stations"),
    CASES("Clinical cases"),
    ORAL("Oral questions"),
    SKILLS("Skills"),
    LAB("Lab & imaging"),
}

private val NEXT_STATUS = mapOf(
    SKILL_NOT_STARTED to SKILL_PRACTISED,
    SKILL_PRACTISED to SKILL_READY,
    SKILL_READY to SKILL_NOT_STARTED,
)

private val STATUS_LABEL = mapOf(
    SKILL_NOT_STARTED to "Not started",
    SKILL_PRACTISED to "Practised",
    SKILL_READY to "Ready to be assessed",
)

/**
 * The five practical formats, on five tabs.
 *
 * OSCE stations, clinical cases and lab/imaging sets are published content,
 * read straight from [PracticalViewModel.items] and routed by [practicalTab].
 * Skills and Oral are not: they are the bundled catalogues in
 * `core/practical/PracticalCatalogue.kt` -- a second copy of the web's own
 * lists, frozen at whatever this app last shipped with. There is no sync
 * mechanism keeping the two in step.
 */
@Composable
fun PracticalListScreen(
    viewModel: PracticalViewModel,
    onOpenPractical: (Practical) -> Unit,
) {
    val items by viewModel.items.collectAsState()
    val progress by viewModel.progress.collectAsState()
    val revealed by viewModel.revealed.collectAsState()
    var tab by remember { mutableStateOf(ListTab.OSCE) }

    Column(modifier = Modifier.fillMaxSize()) {
        PrimaryTabRow(selectedTabIndex = tab.ordinal) {
            ListTab.entries.forEach { candidate ->
                Tab(
                    selected = tab == candidate,
                    onClick = { tab = candidate },
                    text = { Text(candidate.label) },
                )
            }
        }

        when (tab) {
            ListTab.OSCE -> {
                val stations = items.filter { practicalTab(it.type) == PracticalTab.OSCE }
                LazyColumn(modifier = Modifier.weight(1f).padding(16.dp), verticalArrangement = Arrangement.spacedBy(8.dp)) {
                    items(stations, key = Practical::id) { station ->
                        val run = progress.stations[station.id]
                        val bestPct = if (run != null && run.outOf != 0) ((run.bestMarks.toDouble() / run.outOf) * 100).roundToInt() else null
                        StationRow(station, bestPct, run?.attempts, onClick = { onOpenPractical(station) })
                    }
                }
            }

            ListTab.CASES -> {
                val cases = items.filter { practicalTab(it.type) == PracticalTab.CASES }
                LazyColumn(modifier = Modifier.weight(1f).padding(16.dp), verticalArrangement = Arrangement.spacedBy(8.dp)) {
                    items(cases, key = Practical::id) { case ->
                        val status = progress.cases[case.id]?.status ?: "not-started"
                        CaseRow(case, status, onClick = { onOpenPractical(case) })
                    }
                }
            }

            ListTab.LAB -> {
                val labs = items.filter { practicalTab(it.type) == PracticalTab.LAB }
                LazyColumn(modifier = Modifier.weight(1f).padding(16.dp), verticalArrangement = Arrangement.spacedBy(8.dp)) {
                    items(labs, key = Practical::id) { lab ->
                        val done = progress.labs[lab.id]?.done
                        LabRow(lab, done, onClick = { onOpenPractical(lab) })
                    }
                }
            }

            ListTab.SKILLS -> SkillsTab(
                progress = progress,
                onCycle = { skillId, current -> viewModel.markSkill(skillId, NEXT_STATUS.getValue(current)) },
            )

            ListTab.ORAL -> OralTab(revealed = revealed, onReveal = viewModel::revealOral)
        }
    }
}

@Composable
private fun StationRow(station: Practical, bestPct: Int?, attempts: Int?, onClick: () -> Unit) {
    Row(modifier = Modifier.fillMaxWidth(), verticalAlignment = Alignment.CenterVertically) {
        Column(modifier = Modifier.weight(1f)) {
            Row {
                Text(station.title, style = MaterialTheme.typography.titleSmall)
                if (station.type == "Skills checklist") {
                    Text(" · Checklist", style = MaterialTheme.typography.labelSmall)
                }
            }
            Text(
                "${station.minutes ?: 8} min · ${station.marks} marks · ${station.difficulty}",
                style = MaterialTheme.typography.bodySmall,
            )
            Text(
                if (bestPct != null) "$bestPct% best · $attempts ${if (attempts == 1) "try" else "tries"}" else "Not attempted",
                style = MaterialTheme.typography.bodySmall,
            )
        }
        Button(onClick = onClick) { Text(if (bestPct != null) "Retry" else "Start") }
    }
}

@Composable
private fun CaseRow(case: Practical, status: String, onClick: () -> Unit) {
    val (label, cta) = when (status) {
        "completed" -> "Completed" to "Review"
        "in-progress" -> "In progress" to "Continue"
        else -> "Not started" to "Start"
    }
    Row(modifier = Modifier.fillMaxWidth(), verticalAlignment = Alignment.CenterVertically) {
        Column(modifier = Modifier.weight(1f)) {
            Text("${case.title} · $label", style = MaterialTheme.typography.titleSmall)
            // answerableDecisions, not decisions: this is the same count the
            // reader writes into the shared document as `steps`, and a row
            // promising four steps for a case the runner walks in three is
            // the sort of drift a student notices and we never would.
            Text(
                "${case.minutes ?: 12} min · ${case.answerableDecisions.size} steps",
                style = MaterialTheme.typography.bodySmall,
            )
        }
        Button(onClick = onClick) { Text(cta) }
    }
}

@Composable
private fun LabRow(lab: Practical, done: Int?, onClick: () -> Unit) {
    val kindLabel = if (lab.type == "Imaging interpretation") "Imaging" else "Lab"
    Row(modifier = Modifier.fillMaxWidth(), verticalAlignment = Alignment.CenterVertically) {
        Column(modifier = Modifier.weight(1f)) {
            Text("$kindLabel · ${lab.title}", style = MaterialTheme.typography.titleSmall)
            // As CaseRow: `done` is counted against the answerable questions,
            // so the denominator has to be too, or a finished set reads
            // "9 / 12 answered" forever.
            val total = lab.answerableQuestions.size
            Text(
                if (done != null) "$done / $total answered" else "$total questions",
                style = MaterialTheme.typography.bodySmall,
            )
        }
        Button(onClick = onClick) { Text(if (done != null) "Continue" else "Start") }
    }
}

/**
 * The bundled skills checklist. `statuses` comes from
 * [com.synapse.android.core.practical.PracticalProgress.skills] (only skills
 * with an entry are present -- "not started" has none, per
 * `setSkillStatus`'s fold rule); a missing entry reads as "not-started".
 */
@Composable
private fun SkillsTab(progress: PracticalProgress, onCycle: (String, String) -> Unit) {
    val summary = summariseSkills(progress, PRACTICAL_SKILLS.size)
    LazyColumn(modifier = Modifier.fillMaxSize().padding(16.dp), verticalArrangement = Arrangement.spacedBy(12.dp)) {
        item {
            Card(modifier = Modifier.fillMaxWidth()) {
                Column(modifier = Modifier.padding(16.dp)) {
                    Text("${summary.ready} / ${summary.total}", style = MaterialTheme.typography.headlineMedium)
                    Text(
                        "${summary.total - summary.ready} still to go · ${summary.practised} practised so far",
                        style = MaterialTheme.typography.bodySmall,
                    )
                }
            }
        }
        item {
            Text(
                "This is your own record of what you have practised. A formal sign-off is given by an assessor " +
                    "and is not recorded in Connect Cortex.",
                style = MaterialTheme.typography.bodySmall,
            )
        }
        listOf(
            SKILL_CATEGORY_EXAMINATION to "Examination",
            SKILL_CATEGORY_PROCEDURES to "Procedures",
            SKILL_CATEGORY_COMMUNICATION to "Communication",
        ).forEach { (category, heading) ->
            val skills = PRACTICAL_SKILLS.filter { it.category == category }
            if (skills.isNotEmpty()) {
                item { Text(heading, style = MaterialTheme.typography.titleMedium) }
                items(skills, key = Skill::id) { skill ->
                    val status = progress.skills[skill.id]?.status ?: SKILL_NOT_STARTED
                    SkillRow(skill, status, onClick = { onCycle(skill.id, status) })
                }
            }
        }
    }
}

@Composable
private fun SkillRow(skill: Skill, status: String, onClick: () -> Unit) {
    Row(
        modifier = Modifier.fillMaxWidth().clickable(onClick = onClick),
        verticalAlignment = Alignment.CenterVertically,
    ) {
        Column(modifier = Modifier.weight(1f).padding(vertical = 8.dp)) {
            Text(skill.name, style = MaterialTheme.typography.bodyMedium)
            Text(STATUS_LABEL.getValue(status), style = MaterialTheme.typography.bodySmall)
        }
    }
}

/**
 * The bundled viva question bank, grouped by subject id. There is no
 * subject-name catalogue on Android (see `QuestionBankViewModel`'s own
 * doc), so groups are headed by the raw `subjectId`, not a resolved name.
 */
@Composable
private fun OralTab(revealed: Set<String>, onReveal: (String) -> Unit) {
    val groups = PRACTICAL_ORAL_QUESTIONS.groupBy { it.subjectId }
    LazyColumn(modifier = Modifier.fillMaxSize().padding(16.dp), verticalArrangement = Arrangement.spacedBy(12.dp)) {
        item {
            Text(
                "The most common viva questions by module. Attempt each one aloud, then reveal the model answer to mark yourself.",
                style = MaterialTheme.typography.bodyMedium,
            )
        }
        groups.forEach { (subjectId, questions) ->
            item { Text(subjectId, style = MaterialTheme.typography.titleMedium) }
            items(questions, key = { it.id }) { question ->
                val isRevealed = question.id in revealed
                Card(modifier = Modifier.fillMaxWidth()) {
                    Column(modifier = Modifier.padding(16.dp)) {
                        Text(question.topic.uppercase(), style = MaterialTheme.typography.labelSmall)
                        Text(question.question, style = MaterialTheme.typography.bodyMedium)
                        if (isRevealed) {
                            Text("Model answer", style = MaterialTheme.typography.labelSmall)
                            Text(question.modelAnswer, style = MaterialTheme.typography.bodySmall)
                        } else {
                            Button(onClick = { onReveal(question.id) }) { Text("Reveal answer") }
                        }
                    }
                }
            }
        }
    }
}
