package com.synapse.app.feature.university

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material3.AssistChip
import androidx.compose.material3.Button
import androidx.compose.material3.Card
import androidx.compose.material3.FilterChip
import androidx.compose.material3.HorizontalDivider
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.unit.dp
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import com.synapse.app.core.api.EnrollmentChangeRequest
import com.synapse.app.core.api.EnrollmentField
import com.synapse.app.core.university.ModuleBadge
import com.synapse.app.core.university.StudentModuleMap
import com.synapse.app.core.university.StudentScheduleMap
import com.synapse.app.core.university.StudentSubjectMap
import com.synapse.app.core.university.StudentTermMap
import com.synapse.app.core.university.UpcomingSession
import java.time.ZoneId
import java.time.format.DateTimeFormatter

const val UNIVERSITY_LOADING_TAG = "university_loading"
const val UNIVERSITY_UNAVAILABLE_TAG = "university_unavailable"
const val UNIVERSITY_EMPTY_STATE_TAG = "university_empty_state"
fun universityModuleCardTag(moduleId: String): String = "university_module_$moduleId"
const val UNIVERSITY_REQUEST_FIELD_VALUE_TAG = "university_request_field_value"
const val UNIVERSITY_REQUEST_REASON_TAG = "university_request_reason"
const val UNIVERSITY_REQUEST_SUBMIT_TAG = "university_request_submit"

/**
 * The University tab's single public entry point. The shell mounts this
 * directly and it constructs its own [UniversityViewModel] via [hiltViewModel] —
 * no navigation wiring required of the caller, matching `LibraryRoute`.
 */
@Composable
fun UniversityRoute(viewModel: UniversityViewModel = hiltViewModel()) {
    val uiState by viewModel.uiState.collectAsStateWithLifecycle()
    val changeRequestResult by viewModel.lastChangeRequestResult.collectAsStateWithLifecycle()
    UniversityScreen(
        uiState = uiState,
        changeRequestResult = changeRequestResult,
        onSubmitChangeRequest = viewModel::submitChangeRequest,
        onDismissChangeRequestResult = viewModel::consumeChangeRequestResult,
    )
}

@Composable
private fun UniversityScreen(
    uiState: UniversityUiState,
    changeRequestResult: ChangeRequestResult?,
    onSubmitChangeRequest: (EnrollmentField, String, String) -> Unit,
    onDismissChangeRequestResult: () -> Unit,
) {
    when (uiState) {
        UniversityUiState.Loading -> Column(
            modifier = Modifier.fillMaxSize().testTag(UNIVERSITY_LOADING_TAG),
            horizontalAlignment = Alignment.CenterHorizontally,
            verticalArrangement = Arrangement.Center,
        ) { Text("Loading your curriculum…") }

        UniversityUiState.Unavailable -> Column(
            modifier = Modifier.fillMaxSize().padding(16.dp).testTag(UNIVERSITY_UNAVAILABLE_TAG),
            horizontalAlignment = Alignment.CenterHorizontally,
            verticalArrangement = Arrangement.Center,
        ) {
            Text("Your curriculum could not be read", style = MaterialTheme.typography.titleMedium)
            Text(
                "This needs a connection at least once. Try again when you're back online.",
                style = MaterialTheme.typography.bodyMedium,
                modifier = Modifier.padding(top = 8.dp),
            )
        }

        is UniversityUiState.Content -> UniversityContent(
            state = uiState,
            changeRequestResult = changeRequestResult,
            onSubmitChangeRequest = onSubmitChangeRequest,
            onDismissChangeRequestResult = onDismissChangeRequestResult,
        )
    }
}

@Composable
private fun UniversityContent(
    state: UniversityUiState.Content,
    changeRequestResult: ChangeRequestResult?,
    onSubmitChangeRequest: (EnrollmentField, String, String) -> Unit,
    onDismissChangeRequestResult: () -> Unit,
) {
    val map = state.map

    if (map.status == "missing_profile") {
        EmptyState(
            title = "Tell Synapse where you study",
            description = "Your university map stays empty until your account has a university and year.",
        )
        return
    }
    if (map.status == "being_verified" || map.university == null || map.year == null) {
        EmptyState(
            title = "This year is being verified",
            description = "Your account is enrolled, but the live academic projection has not published that year yet.",
        )
        return
    }

    LazyColumn(modifier = Modifier.fillMaxSize().padding(16.dp), verticalArrangement = Arrangement.spacedBy(16.dp)) {
        item {
            Column {
                Text("Your University", style = MaterialTheme.typography.titleLarge)
                Text(
                    "A quiet map of your own year: terms, modules, subjects, assessments, and the timetable your faculty has published.",
                    style = MaterialTheme.typography.bodyMedium,
                    modifier = Modifier.padding(top = 4.dp),
                )
                if (state.stale) {
                    Text(
                        "Showing the last copy saved on this device — reconnect to refresh it.",
                        style = MaterialTheme.typography.labelMedium,
                        modifier = Modifier.padding(top = 6.dp),
                    )
                }
            }
        }

        item {
            Card(modifier = Modifier.fillMaxWidth()) {
                Column(modifier = Modifier.padding(16.dp)) {
                    Text("${map.university.short} · ${map.year.year}", style = MaterialTheme.typography.labelLarge)
                    Text(map.university.name, style = MaterialTheme.typography.headlineSmall, modifier = Modifier.padding(top = 4.dp))
                    Text(
                        "This view is server-scoped to your own university and year. No other university or year can be requested from here.",
                        style = MaterialTheme.typography.bodySmall,
                        modifier = Modifier.padding(top = 8.dp),
                    )
                    Row(modifier = Modifier.fillMaxWidth().padding(top = 12.dp), horizontalArrangement = Arrangement.spacedBy(24.dp)) {
                        StatColumn("Terms", map.totals.terms.toString())
                        StatColumn("Modules", map.totals.modules.toString())
                        StatColumn("Marks", displayMarks(map.totals.marks))
                    }
                }
            }
        }

        if (map.terms.isEmpty() || map.totals.modules == 0) {
            item {
                EmptyStateInline(
                    title = "No modules in your year yet",
                    description = "An admin can publish terms and modules from Academic Setup. Library and Qbank still work where content is available.",
                )
            }
        } else {
            map.terms.forEachIndexed { index, term ->
                item { TermHeader(term, index) }
                items(term.modules, key = { it.id }) { module -> ModuleCard(module) }
            }
        }

        if (map.upcoming.isNotEmpty()) {
            item { UpcomingSection(map.upcoming) }
        }

        item { EvidenceSummary(subjects = map.totals.subjects, scheduleRows = map.totals.scheduleRows, marksUnavailable = map.totals.marksUnavailable) }

        item {
            EnrollmentChangeSection(
                requests = state.changeRequests,
                result = changeRequestResult,
                onSubmit = onSubmitChangeRequest,
                onDismissResult = onDismissChangeRequestResult,
            )
        }
    }
}

@Composable
private fun EmptyState(title: String, description: String) {
    Column(
        modifier = Modifier.fillMaxSize().padding(16.dp).testTag(UNIVERSITY_EMPTY_STATE_TAG),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.Center,
    ) {
        Text(title, style = MaterialTheme.typography.titleMedium)
        Text(description, style = MaterialTheme.typography.bodyMedium, modifier = Modifier.padding(top = 8.dp))
    }
}

@Composable
private fun EmptyStateInline(title: String, description: String) {
    Card(modifier = Modifier.fillMaxWidth()) {
        Column(modifier = Modifier.padding(16.dp)) {
            Text(title, style = MaterialTheme.typography.titleMedium)
            Text(description, style = MaterialTheme.typography.bodyMedium, modifier = Modifier.padding(top = 6.dp))
        }
    }
}

@Composable
private fun StatColumn(label: String, value: String) {
    Column {
        Text(label.uppercase(), style = MaterialTheme.typography.labelSmall)
        Text(value, style = MaterialTheme.typography.headlineSmall, modifier = Modifier.padding(top = 2.dp))
    }
}

private fun displayMarks(value: Double?): String = if (value == null) "unavailable" else {
    if (value == Math.floor(value)) value.toLong().toString() else String.format(java.util.Locale.ROOT, "%.2f", value)
}

@Composable
private fun TermHeader(term: StudentTermMap, index: Int) {
    Column(modifier = Modifier.padding(top = 8.dp)) {
        Text("Term ${index + 1}".uppercase(), style = MaterialTheme.typography.labelSmall)
        Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween, verticalAlignment = Alignment.CenterVertically) {
            Text(term.term, style = MaterialTheme.typography.titleLarge)
            Text("${term.modules.size} modules · ${displayMarks(term.marks)} marks", style = MaterialTheme.typography.labelMedium)
        }
    }
}

@Composable
private fun ModuleBadgeChip(badge: ModuleBadge) {
    val label = when (badge) {
        ModuleBadge.Verified -> "verified marks"
        ModuleBadge.CarriedForward -> "carried forward"
        ModuleBadge.Inferred -> "inferred"
        ModuleBadge.BeingVerified -> "being verified"
        ModuleBadge.NeedsMarks -> "marks unavailable"
        ModuleBadge.NeedsSchedule -> "schedule pending"
    }
    AssistChip(onClick = {}, label = { Text(label) })
}

@Composable
private fun SubjectTree(subjects: List<StudentSubjectMap>, depth: Int = 0) {
    if (subjects.isEmpty()) {
        if (depth == 0) Text("No subject tree has been published for this module yet.", style = MaterialTheme.typography.bodySmall)
        return
    }
    subjects.forEach { subject ->
        Text(
            "${"  ".repeat(depth)}• ${subject.name}",
            style = MaterialTheme.typography.bodySmall,
            modifier = Modifier.padding(start = (depth * 12).dp, top = 2.dp),
        )
        SubjectTree(subject.children, depth + 1)
    }
}

@Composable
private fun ScheduleList(rows: List<StudentScheduleMap>) {
    if (rows.isEmpty()) {
        Text("No timetable blocks are published for this module yet.", style = MaterialTheme.typography.bodySmall)
        return
    }
    rows.take(3).forEach { row ->
        Column(modifier = Modifier.padding(top = 6.dp)) {
            Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween) {
                Text(row.title, style = MaterialTheme.typography.bodyMedium)
                Text(row.label, style = MaterialTheme.typography.labelSmall)
            }
            Text(scheduleWhen(row), style = MaterialTheme.typography.labelSmall)
        }
    }
}

private fun scheduleWhen(row: StudentScheduleMap): String {
    val start = row.start
    val whenText = if (start != null) {
        DateTimeFormatter.ofPattern("MMM d, yyyy · HH:mm").withZone(ZoneId.systemDefault()).format(start)
    } else {
        row.date ?: "date unavailable"
    }
    return if (row.location.isNullOrBlank()) whenText else "$whenText · ${row.location}"
}

@Composable
private fun ModuleCard(module: StudentModuleMap) {
    Card(modifier = Modifier.fillMaxWidth().testTag(universityModuleCardTag(module.id))) {
        Column(modifier = Modifier.padding(16.dp)) {
            Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween, verticalAlignment = Alignment.Top) {
                Column {
                    Text(module.name, style = MaterialTheme.typography.titleMedium)
                    Text(
                        "${module.moduleId} · ${module.subjectCount} subject nodes · ${module.schedule.size} timetable blocks",
                        style = MaterialTheme.typography.labelSmall,
                    )
                }
            }
            Row(modifier = Modifier.fillMaxWidth().padding(top = 8.dp), horizontalArrangement = Arrangement.spacedBy(6.dp)) {
                module.badges.forEach { ModuleBadgeChip(it) }
            }

            HorizontalDivider(modifier = Modifier.padding(vertical = 12.dp))
            Text("Subject tree", style = MaterialTheme.typography.labelLarge)
            SubjectTree(module.subjects)

            HorizontalDivider(modifier = Modifier.padding(vertical = 12.dp))
            Text("Scoped schedule", style = MaterialTheme.typography.labelLarge)
            ScheduleList(module.schedule)

            HorizontalDivider(modifier = Modifier.padding(vertical = 12.dp))
            Text("Assessment total", style = MaterialTheme.typography.labelLarge)
            Text(module.assessment.displayTotal, style = MaterialTheme.typography.headlineSmall)
            if (module.assessment.components.none { it.marks != null }) {
                Text("Assessment components are unavailable, not zero.", style = MaterialTheme.typography.bodySmall)
            } else {
                module.assessment.components.forEach { component ->
                    Row(modifier = Modifier.fillMaxWidth().padding(top = 4.dp), horizontalArrangement = Arrangement.SpaceBetween) {
                        Text(component.label, style = MaterialTheme.typography.bodySmall)
                        Text(component.displayMarks, style = MaterialTheme.typography.bodySmall)
                    }
                }
            }
        }
    }
}

@Composable
private fun UpcomingSection(upcoming: List<UpcomingSession>) {
    Card(modifier = Modifier.fillMaxWidth()) {
        Column(modifier = Modifier.padding(16.dp)) {
            Text("Upcoming schedule", style = MaterialTheme.typography.titleMedium)
            upcoming.take(4).forEach { session ->
                Column(modifier = Modifier.padding(top = 10.dp)) {
                    Text(session.schedule.title, style = MaterialTheme.typography.bodyMedium)
                    Text(session.moduleName, style = MaterialTheme.typography.labelSmall)
                    Text(scheduleWhen(session.schedule), style = MaterialTheme.typography.labelSmall)
                }
            }
        }
    }
}

@Composable
private fun EvidenceSummary(subjects: Int, scheduleRows: Int, marksUnavailable: Boolean) {
    Card(modifier = Modifier.fillMaxWidth()) {
        Column(modifier = Modifier.padding(16.dp)) {
            Text("Evidence summary", style = MaterialTheme.typography.titleMedium)
            Row(modifier = Modifier.fillMaxWidth().padding(top = 8.dp), horizontalArrangement = Arrangement.spacedBy(24.dp)) {
                StatColumn("Subjects", subjects.toString())
                StatColumn("Schedule", scheduleRows.toString())
            }
            if (marksUnavailable) {
                Text(
                    "Some assessment totals are unavailable while source evidence is still being reconciled.",
                    style = MaterialTheme.typography.bodySmall,
                    modifier = Modifier.padding(top = 8.dp),
                )
            }
        }
    }
}

@Composable
private fun EnrollmentChangeSection(
    requests: List<EnrollmentChangeRequest>,
    result: ChangeRequestResult?,
    onSubmit: (EnrollmentField, String, String) -> Unit,
    onDismissResult: () -> Unit,
) {
    var field by rememberSaveable { mutableStateOf(EnrollmentField.University) }
    var requestedValue by rememberSaveable { mutableStateOf("") }
    var reason by rememberSaveable { mutableStateOf("") }

    LaunchedEffect(result) {
        if (result is ChangeRequestResult.Submitted) {
            requestedValue = ""
            reason = ""
        }
    }

    Card(modifier = Modifier.fillMaxWidth()) {
        Column(modifier = Modifier.padding(16.dp)) {
            Text("Request an enrollment change", style = MaterialTheme.typography.titleMedium)
            Text(
                "Your university and year are locked once verified. Ask for a change here instead of editing them directly.",
                style = MaterialTheme.typography.bodySmall,
                modifier = Modifier.padding(top = 4.dp),
            )

            Row(modifier = Modifier.fillMaxWidth().padding(top = 12.dp), horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                FilterChip(selected = field == EnrollmentField.University, onClick = { field = EnrollmentField.University }, label = { Text("University") })
                FilterChip(selected = field == EnrollmentField.Year, onClick = { field = EnrollmentField.Year }, label = { Text("Year") })
            }

            OutlinedTextField(
                value = requestedValue,
                onValueChange = { requestedValue = it },
                label = { Text(if (field == EnrollmentField.University) "Requested university id" else "Requested year") },
                singleLine = true,
                modifier = Modifier.fillMaxWidth().padding(top = 12.dp).testTag(UNIVERSITY_REQUEST_FIELD_VALUE_TAG),
            )
            OutlinedTextField(
                value = reason,
                onValueChange = { reason = it },
                label = { Text("Why (at least 12 characters)") },
                modifier = Modifier.fillMaxWidth().padding(top = 8.dp).testTag(UNIVERSITY_REQUEST_REASON_TAG),
            )
            Button(
                onClick = { onSubmit(field, requestedValue.trim(), reason.trim()) },
                enabled = requestedValue.isNotBlank() && reason.trim().length >= 12,
                modifier = Modifier.padding(top = 8.dp).testTag(UNIVERSITY_REQUEST_SUBMIT_TAG),
            ) { Text("Submit request") }

            when (result) {
                ChangeRequestResult.Submitted -> StatusLine("Request submitted — an admin will review it.", onDismissResult)
                is ChangeRequestResult.Refused -> StatusLine("Not submitted: ${result.reason.replace('_', ' ')}", onDismissResult)
                ChangeRequestResult.Failed -> StatusLine("Couldn't reach the server. Try again.", onDismissResult)
                null -> Unit
            }

            if (requests.isNotEmpty()) {
                HorizontalDivider(modifier = Modifier.padding(vertical = 12.dp))
                Text("Your requests", style = MaterialTheme.typography.labelLarge)
                requests.forEach { request ->
                    Column(modifier = Modifier.padding(top = 8.dp)) {
                        Text("${request.field}: ${request.currentValue ?: "unset"} → ${request.requestedValue}", style = MaterialTheme.typography.bodyMedium)
                        Text(request.status, style = MaterialTheme.typography.labelSmall)
                    }
                }
            }
        }
    }
}

/** One-line submit outcome with its own dismiss control — there is no snackbar host wired into this screen. */
@Composable
private fun StatusLine(text: String, onDismiss: () -> Unit) {
    Row(modifier = Modifier.fillMaxWidth().padding(top = 10.dp), horizontalArrangement = Arrangement.SpaceBetween, verticalAlignment = Alignment.CenterVertically) {
        Text(text, style = MaterialTheme.typography.bodySmall, modifier = Modifier.weight(1f))
        TextButton(onClick = onDismiss) { Text("Dismiss") }
    }
}
