package com.synapse.android.feature.adaptive

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.ScrollableTabRow
import androidx.compose.material3.Tab
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableIntStateOf
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.semantics.clearAndSetSemantics
import androidx.compose.ui.semantics.contentDescription
import androidx.compose.ui.semantics.semantics
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.synapse.android.core.adaptive.AdaptiveExplain
import com.synapse.android.core.adaptive.AllocationNeed
import com.synapse.android.core.adaptive.ConceptState
import com.synapse.android.core.adaptive.ConceptStatus
import com.synapse.android.core.adaptive.CrashDay
import com.synapse.android.core.adaptive.PlanTask
import com.synapse.android.core.adaptive.Readiness
import com.synapse.android.core.adaptive.TaskKind
import com.synapse.android.core.ui.StateHost
import com.synapse.android.design.CortexColors
import com.synapse.android.design.LocalCortex
import kotlin.math.roundToInt

private enum class Panel(val label: String) {
    TODAY("Today"),
    PRACTICE("Practice"),
    READINESS("Readiness"),
    CONCEPTS("Concepts"),
    PLAN("Plan"),
    HOW("How this works"),
}

/**
 * Adaptive Study (M6 / gate G1). Six panels over one model, every figure
 * computed on the device from the evidence ledger and blueprint. The Android
 * peer of iOS's `AdaptiveStudyView` -- a read-only dashboard, not a question
 * runner (neither platform runs a live adaptive session from this surface).
 */
@Composable
fun AdaptiveStudyScreen(viewModel: AdaptiveStudyViewModel, onBack: () -> Unit) {
    val uiState by viewModel.uiState.collectAsState()
    var tab by rememberSaveable { mutableIntStateOf(0) }
    val cortex = LocalCortex.current

    Column(modifier = Modifier.fillMaxSize().background(cortex.paper)) {
        Row(
            modifier = Modifier.fillMaxWidth().padding(start = 24.dp, end = 8.dp, top = 20.dp),
            verticalAlignment = Alignment.CenterVertically,
        ) {
            Text(
                "Adaptive Study",
                style = MaterialTheme.typography.headlineSmall,
                color = cortex.ink,
                modifier = Modifier.weight(1f),
            )
            TextButton(onClick = onBack) { Text("Back") }
        }

        ScrollableTabRow(
            selectedTabIndex = tab,
            containerColor = cortex.paper,
            contentColor = cortex.primary,
            edgePadding = 16.dp,
        ) {
            Panel.entries.forEachIndexed { index, panel ->
                Tab(
                    selected = tab == index,
                    onClick = { tab = index },
                    text = { Text(panel.label, fontSize = 13.sp) },
                )
            }
        }

        StateHost(state = uiState, modifier = Modifier.weight(1f)) { data ->
            Column(
                modifier = Modifier
                    .fillMaxSize()
                    .verticalScroll(rememberScrollState())
                    .padding(16.dp),
                verticalArrangement = Arrangement.spacedBy(16.dp),
            ) {
                when (Panel.entries[tab]) {
                    Panel.TODAY -> TodayPanel(data, cortex)
                    Panel.PRACTICE -> PracticePanel(data, cortex)
                    Panel.READINESS -> ReadinessPanel(data, cortex)
                    Panel.CONCEPTS -> ConceptsPanel(data, cortex)
                    Panel.PLAN -> PlanPanel(data, cortex, onMinutes = viewModel::setMinutesPerDay)
                    Panel.HOW -> HowPanel(data, cortex)
                }
                Spacer(Modifier.height(24.dp))
            }
        }
    }
}

// MARK: - Today

@Composable
private fun TodayPanel(data: AdaptiveStudyData, cortex: CortexColors) {
    if (data.blueprint.isNotEmpty()) {
        Panel("Where you stand", cortex) {
            ConceptStatus.entries.forEach { status ->
                val count = data.statusCounts[status] ?: 0
                if (count > 0) {
                    Row(verticalAlignment = Alignment.CenterVertically, modifier = Modifier.fillMaxWidth()) {
                        Dot(statusColour(status, cortex))
                        Spacer(Modifier.width(8.dp))
                        Text(status.label, fontSize = 14.sp, color = cortex.ink, modifier = Modifier.weight(1f))
                        Numeric("$count", cortex)
                    }
                }
            }
        }
    }

    Panel(AdaptiveExplain.WRONG_ATTEMPTS_VERSUS_WEAK_CONCEPTS.heading, cortex) {
        Row(horizontalArrangement = Arrangement.spacedBy(24.dp)) {
            Figure("Wrong answers", "${data.rawWrongTotal}", cortex)
            Figure("Weak concepts", "${data.statusCounts[ConceptStatus.WEAK] ?: 0}", cortex)
        }
        Spacer(Modifier.height(8.dp))
        Text(AdaptiveExplain.WRONG_ATTEMPTS_VERSUS_WEAK_CONCEPTS.body, fontSize = 13.sp, color = cortex.ink2)
    }

    if (data.blueprint.isNotEmpty()) {
        Panel("Blueprint coverage", cortex) {
            Meter(data.coverage.coveredWeight, cortex.primary, cortex)
            Spacer(Modifier.height(8.dp))
            Text("Coverage is measured in blueprint weight, not questions answered.",
                fontSize = 12.sp, color = cortex.ink3)
            Spacer(Modifier.height(6.dp))
            data.coverage.groups.take(6).forEach { group ->
                Row(modifier = Modifier.fillMaxWidth().padding(top = 4.dp)) {
                    Text(group.groupLabel, fontSize = 13.sp, color = cortex.ink, modifier = Modifier.weight(1f))
                    Numeric(percent(if (group.weight > 0) group.coveredWeight / group.weight else 0.0), cortex)
                }
            }
        }
    }

    Panel("What your next block will contain", cortex) {
        AllocationNeed.entries.forEach { need ->
            Row(modifier = Modifier.fillMaxWidth().padding(vertical = 2.dp)) {
                Text(need.label, fontSize = 13.sp, color = cortex.ink, modifier = Modifier.weight(1f))
                Numeric("${data.nextBlockPlan.targets[need]}", cortex)
            }
        }
        if (data.nextBlockPlan.debtRepaid > 0) {
            Spacer(Modifier.height(4.dp))
            Text("${data.nextBlockPlan.debtRepaid} slot(s) moved into coverage to repay earlier blocks.",
                fontSize = 12.sp, color = cortex.ink3)
        }
    }
}

// MARK: - Practice

@Composable
private fun PracticePanel(data: AdaptiveStudyData, cortex: CortexColors) {
    if (data.repairTargets.isEmpty() && data.dueForReview.isEmpty()) {
        Panel("Nothing needs repairing", cortex) {
            Text("Answer some questions and what you find hard will show up here.",
                fontSize = 13.sp, color = cortex.ink2)
        }
        return
    }
    if (data.repairTargets.isNotEmpty()) {
        Panel("Worth going back to", cortex) {
            data.repairTargets.take(8).forEach { ConceptRow(it, data, cortex) }
        }
    }
    if (data.dueForReview.isNotEmpty()) {
        Panel("Due for review", cortex) {
            data.dueForReview.take(8).forEach { ConceptRow(it, data, cortex) }
        }
    }
}

// MARK: - Readiness

@Composable
private fun ReadinessPanel(data: AdaptiveStudyData, cortex: CortexColors) {
    val result = data.readiness
    Panel("How ready you are", cortex) {
        if (result != null && result.answered > 0) {
            Text("${percent(result.lower)} - ${percent(result.upper)}",
                fontSize = 30.sp, fontWeight = FontWeight.SemiBold, color = cortex.ink)
            Spacer(Modifier.height(6.dp))
        }
        Text(Readiness.sentence(result), fontSize = 14.sp, color = cortex.ink2)
    }

    if (result != null && result.groups.isNotEmpty()) {
        Panel("By area", cortex) {
            result.groups.forEach { group ->
                Row(modifier = Modifier.fillMaxWidth().padding(vertical = 2.dp)) {
                    Text(group.groupLabel, fontSize = 13.sp, color = cortex.ink, modifier = Modifier.weight(1f))
                    val lower = group.lower
                    val upper = group.upper
                    if (lower != null && upper != null) {
                        Numeric("${percent(lower)} - ${percent(upper)}", cortex)
                    } else {
                        Text("Too few to say", fontSize = 11.sp, color = cortex.ink3)
                    }
                }
            }
        }
    }

    Panel(AdaptiveExplain.ADAPTIVE_CHOOSES_WHAT_TO_STUDY.heading, cortex) {
        Text(AdaptiveExplain.ADAPTIVE_CHOOSES_WHAT_TO_STUDY.body, fontSize = 13.sp, color = cortex.ink2)
    }
}

// MARK: - Concepts

@Composable
private fun ConceptsPanel(data: AdaptiveStudyData, cortex: CortexColors) {
    if (data.blueprint.isEmpty()) {
        Panel("No blueprint in scope", cortex) {
            Text("Your programme has no exam blueprint published yet, so there is nothing to measure against.",
                fontSize = 13.sp, color = cortex.ink2)
        }
        return
    }
    Panel("Every concept on your blueprint", cortex) {
        data.blueprint.take(40).forEach { node ->
            val status = data.states[node.conceptId]?.status ?: ConceptStatus.UNMEASURED
            Row(verticalAlignment = Alignment.CenterVertically, modifier = Modifier.fillMaxWidth().padding(vertical = 3.dp)) {
                Dot(statusColour(status, cortex))
                Spacer(Modifier.width(8.dp))
                Text(node.label, fontSize = 13.sp, color = cortex.ink, modifier = Modifier.weight(1f))
                Text(status.label, fontSize = 11.sp, color = cortex.ink3)
            }
        }
    }
}

// MARK: - Plan

@Composable
private fun PlanPanel(data: AdaptiveStudyData, cortex: CortexColors, onMinutes: (Int) -> Unit) {
    val week = data.weeklyPlan

    Panel("This week", cortex) {
        Row(verticalAlignment = Alignment.CenterVertically, modifier = Modifier.fillMaxWidth()) {
            Text("Minutes a day", fontSize = 14.sp, color = cortex.ink, modifier = Modifier.weight(1f))
            Stepper(value = data.minutesPerDay, step = 15, onChange = onMinutes, cortex = cortex)
        }
        Spacer(Modifier.height(10.dp))
        val byDate = week.tasks.groupBy { it.date }
        orderedDates(week).forEach { date ->
            val tasks = byDate[date] ?: emptyList()
            Row(modifier = Modifier.fillMaxWidth().padding(top = 8.dp)) {
                Text(date, fontSize = 13.sp, fontWeight = FontWeight.SemiBold, color = cortex.ink, modifier = Modifier.weight(1f))
                Numeric("${tasks.sumOf { it.expectedMinutes }}m", cortex)
            }
            tasks.forEach { TaskRow(it, cortex) }
        }
    }

    Panel("Where the week's time goes", cortex) {
        AllocationNeed.entries.forEach { need ->
            val minutes = week.needMinutes[need] ?: 0
            Row(modifier = Modifier.fillMaxWidth().padding(vertical = 2.dp)) {
                Text(need.label, fontSize = 13.sp, color = cortex.ink, modifier = Modifier.weight(1f))
                Numeric("${minutes}m", cortex)
            }
            Meter(
                if (week.plannedMinutes > 0) minutes.toDouble() / week.plannedMinutes else 0.0,
                if (need == AllocationNeed.WEAKNESS) cortex.primary else cortex.ink3, cortex,
            )
        }
    }

    Panel("Capacity", cortex) {
        CapacityRow("You said you have", week.statedMinutes, cortex.ink2, cortex)
        CapacityRow("Planned", week.plannedMinutes, cortex.ink2, cortex)
        CapacityRow("Deliberately left free", week.bufferMinutes, cortex.primary, cortex)
    }

    if (week.unplaced.isNotEmpty()) {
        Panel("What would not fit", cortex) {
            week.unplaced.forEach { task ->
                Text(task.title, fontSize = 13.sp, fontWeight = FontWeight.Medium, color = cortex.ink)
                Text(task.reason, fontSize = 12.sp, color = cortex.ink3, modifier = Modifier.padding(bottom = 6.dp))
            }
        }
    }

    Panel("How this block divides", cortex) {
        if (data.daysToExam != null) {
            Text("${data.daysToExam} day(s) to your exam.", fontSize = 14.sp, color = cortex.ink)
        } else {
            Text("No exam scheduled, so practice favours depth over breadth.", fontSize = 14.sp, color = cortex.ink2)
        }
        Spacer(Modifier.height(6.dp))
        AllocationNeed.entries.forEach { need ->
            Row(modifier = Modifier.fillMaxWidth().padding(vertical = 2.dp)) {
                Text(need.label, fontSize = 13.sp, color = cortex.ink, modifier = Modifier.weight(1f))
                Numeric(percent(data.shares[need]), cortex)
            }
        }
    }

    CrashPanel(data, cortex)

    Text(com.synapse.android.core.adaptive.WeeklyPlan.CAVEAT, fontSize = 12.sp, color = cortex.ink3)
}

@Composable
private fun CrashPanel(data: AdaptiveStudyData, cortex: CortexColors) {
    val programme = data.crashProgramme
    if (programme == null) {
        Panel("Crash programme", cortex) {
            val reason = when {
                data.daysToExam == null ->
                    "No exam is published on your timetable, so nothing here is going to invent a countdown."
                data.blueprint.isEmpty() ->
                    "Your exam blueprint has not been published for your year yet, so there is nothing honest to compress."
                else -> "Your exam is far enough away that an ordinary weekly plan serves you better."
            }
            Text(reason, fontSize = 13.sp, color = cortex.ink2)
        }
        return
    }
    Panel("${programme.band.days}-day programme", cortex) {
        Text(programme.claim, fontSize = 13.5.sp, color = cortex.ink)
        if (programme.unreachableGroups.isNotEmpty()) {
            Spacer(Modifier.height(6.dp))
            Text(
                "No approved questions exist for ${percent(programme.unreachableWeight)} of your blueprint by " +
                    "weight: " + programme.unreachableGroups.take(4).joinToString(", ") { it.groupLabel },
                fontSize = 12.sp, color = cortex.ink3,
            )
        }
        Spacer(Modifier.height(8.dp))
        Text("First two weeks", fontSize = 12.sp, fontWeight = FontWeight.SemiBold, color = cortex.ink2)
        programme.days.take(14).forEach { day -> CrashDayRow(day, cortex) }
        Spacer(Modifier.height(6.dp))
        Text(com.synapse.android.core.adaptive.CrashProgramme.CAVEAT, fontSize = 12.sp, color = cortex.ink3)
    }
}

// MARK: - How

@Composable
private fun HowPanel(data: AdaptiveStudyData, cortex: CortexColors) {
    listOf(
        AdaptiveExplain.WRONG_ATTEMPTS_VERSUS_WEAK_CONCEPTS,
        AdaptiveExplain.ADAPTIVE_CHOOSES_WHAT_TO_STUDY,
        AdaptiveExplain.READINESS_MEASURES_WHERE_YOU_STAND,
    ).forEach { note ->
        Panel(note.heading, cortex) {
            Text(note.body, fontSize = 13.sp, color = cortex.ink2)
        }
    }
    Text("Algorithm v${data.config.version}", fontSize = 11.sp, fontFamily = FontFamily.Monospace, color = cortex.ink3)
}

// MARK: - Pieces

@Composable
private fun Panel(title: String, cortex: CortexColors, content: @Composable () -> Unit) {
    Column(
        modifier = Modifier
            .fillMaxWidth()
            .clip(RoundedCornerShape(16.dp))
            .background(cortex.surface)
            .border(1.dp, cortex.line, RoundedCornerShape(16.dp))
            .padding(16.dp),
        verticalArrangement = Arrangement.spacedBy(4.dp),
    ) {
        Text(title, fontSize = 13.sp, fontWeight = FontWeight.SemiBold, color = cortex.ink2)
        Spacer(Modifier.height(4.dp))
        content()
    }
}

@Composable
private fun ConceptRow(state: ConceptState, data: AdaptiveStudyData, cortex: CortexColors) {
    Row(verticalAlignment = Alignment.CenterVertically, modifier = Modifier.fillMaxWidth().padding(vertical = 4.dp)) {
        Dot(statusColour(state.status, cortex))
        Spacer(Modifier.width(8.dp))
        Column(modifier = Modifier.weight(1f)) {
            Text(data.label(state.conceptId), fontSize = 14.sp, color = cortex.ink)
            // The estimate is never shown without its interval.
            Text("${percent(state.mean)} +/- ${percent(state.uncertainty)}",
                fontSize = 11.sp, fontFamily = FontFamily.Monospace, color = cortex.ink3)
        }
        Text(state.status.label, fontSize = 11.sp, color = statusColour(state.status, cortex))
    }
}

@Composable
private fun TaskRow(task: PlanTask, cortex: CortexColors) {
    val restful = task.kind == TaskKind.REST
    Column(modifier = Modifier.fillMaxWidth().padding(top = 6.dp, start = 4.dp)) {
        Row(verticalAlignment = Alignment.CenterVertically, modifier = Modifier.fillMaxWidth()) {
            Text(if (restful) "Rest" else task.title, fontSize = 12.5.sp,
                fontWeight = FontWeight.Medium, color = if (restful) cortex.ink3 else cortex.ink,
                modifier = Modifier.weight(1f))
            if (!restful) Numeric("${task.expectedMinutes}m", cortex)
        }
        Text(task.reason, fontSize = 11.5.sp, color = cortex.ink3)
    }
}

@Composable
private fun CrashDayRow(day: CrashDay, cortex: CortexColors) {
    Row(modifier = Modifier.fillMaxWidth().padding(vertical = 3.dp)) {
        Text("${day.dayNumber}", fontSize = 11.sp, fontFamily = FontFamily.Monospace, color = cortex.ink3,
            modifier = Modifier.width(24.dp))
        Text(day.kind.label, fontSize = 10.sp, fontWeight = FontWeight.SemiBold,
            color = if (day.kind == CrashDay.Kind.MOCK) cortex.primaryStrong else cortex.ink3,
            modifier = Modifier.width(64.dp))
        Text(day.labels.ifEmpty { listOf(day.reason) }.joinToString(" - "),
            fontSize = 12.sp, color = cortex.ink2, modifier = Modifier.weight(1f))
    }
}

@Composable
private fun CapacityRow(label: String, minutes: Int, tint: Color, cortex: CortexColors) {
    Row(modifier = Modifier.fillMaxWidth().padding(vertical = 2.dp)) {
        Text(label, fontSize = 13.sp, color = cortex.ink, modifier = Modifier.weight(1f))
        Text("${minutes}m", fontSize = 13.sp, fontFamily = FontFamily.Monospace, color = tint)
    }
}

@Composable
private fun Figure(label: String, value: String, cortex: CortexColors) {
    Column {
        Text(label, fontSize = 12.sp, color = cortex.ink2)
        Text(value, fontSize = 26.sp, fontWeight = FontWeight.SemiBold, color = cortex.ink)
    }
}

@Composable
private fun Numeric(text: String, cortex: CortexColors) {
    Text(text, fontSize = 13.sp, fontFamily = FontFamily.Monospace, color = cortex.ink2)
}

@Composable
private fun Dot(color: Color) {
    Box(modifier = Modifier.size(8.dp).clip(CircleShape).background(color).clearAndSetSemantics { })
}

@Composable
private fun Meter(fraction: Double, tint: Color, cortex: CortexColors) {
    val clamped = fraction.coerceIn(0.0, 1.0)
    Box(
        modifier = Modifier
            .fillMaxWidth()
            .height(8.dp)
            .clip(RoundedCornerShape(4.dp))
            .background(cortex.inset)
            .semantics { contentDescription = "${(clamped * 100).roundToInt()} percent" },
    ) {
        Box(modifier = Modifier.fillMaxWidth(clamped.toFloat()).height(8.dp).clip(RoundedCornerShape(4.dp)).background(tint))
    }
}

@Composable
private fun Stepper(value: Int, step: Int, onChange: (Int) -> Unit, cortex: CortexColors) {
    Row(verticalAlignment = Alignment.CenterVertically) {
        TextButton(
            onClick = { onChange(value - step) },
            modifier = Modifier.semantics { contentDescription = "Decrease minutes a day" },
        ) { Text("-", fontSize = 20.sp, color = cortex.primary) }
        Text("$value", fontSize = 14.sp, fontFamily = FontFamily.Monospace, color = cortex.ink2)
        TextButton(
            onClick = { onChange(value + step) },
            modifier = Modifier.semantics { contentDescription = "Increase minutes a day" },
        ) { Text("+", fontSize = 20.sp, color = cortex.primary) }
    }
}

private fun percent(value: Double): String = "${(value * 100).roundToInt()}%"

private fun orderedDates(week: com.synapse.android.core.adaptive.WeeklyPlan): List<String> {
    val seen = LinkedHashSet<String>()
    week.tasks.forEach { seen.add(it.date) }
    return seen.toList()
}

/**
 * Status colours. Blue marks a review coming round -- a fact about the schedule,
 * not the student -- so it uses the accent rather than a judgement colour.
 */
private fun statusColour(status: ConceptStatus, cortex: CortexColors): Color = when (status) {
    ConceptStatus.WEAK -> cortex.danger
    ConceptStatus.ATTENTION -> cortex.warning
    ConceptStatus.DEVELOPING -> cortex.primary
    ConceptStatus.SECURE -> cortex.success
    ConceptStatus.REVIEW_DUE -> cortex.accent
    ConceptStatus.UNMEASURED -> cortex.ink3
}
