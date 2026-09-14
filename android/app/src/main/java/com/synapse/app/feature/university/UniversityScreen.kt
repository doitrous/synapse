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
import androidx.compose.ui.res.pluralStringResource
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.unit.dp
import androidx.annotation.StringRes
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import com.synapse.app.R
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
        ) { Text(stringResource(R.string.university_loading)) }

        UniversityUiState.Unavailable -> Column(
            modifier = Modifier.fillMaxSize().padding(16.dp).testTag(UNIVERSITY_UNAVAILABLE_TAG),
            horizontalAlignment = Alignment.CenterHorizontally,
            verticalArrangement = Arrangement.Center,
        ) {
            Text(stringResource(R.string.university_unavailable_title), style = MaterialTheme.typography.titleMedium)
            Text(
                stringResource(R.string.university_unavailable_description),
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
            title = stringResource(R.string.university_missing_profile_title),
            description = stringResource(R.string.university_missing_profile_description),
        )
        return
    }
    if (map.status == "being_verified" || map.university == null || map.year == null) {
        EmptyState(
            title = stringResource(R.string.university_being_verified_title),
            description = stringResource(R.string.university_being_verified_description),
        )
        return
    }

    val unavailableMarks = stringResource(R.string.university_marks_unavailable)

    LazyColumn(modifier = Modifier.fillMaxSize().padding(16.dp), verticalArrangement = Arrangement.spacedBy(16.dp)) {
        item {
            Column {
                Text(stringResource(R.string.university_header_title), style = MaterialTheme.typography.titleLarge)
                Text(
                    stringResource(R.string.university_header_description),
                    style = MaterialTheme.typography.bodyMedium,
                    modifier = Modifier.padding(top = 4.dp),
                )
                if (state.stale) {
                    Text(
                        stringResource(R.string.university_stale_notice),
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
                        stringResource(R.string.university_scope_notice),
                        style = MaterialTheme.typography.bodySmall,
                        modifier = Modifier.padding(top = 8.dp),
                    )
                    Row(modifier = Modifier.fillMaxWidth().padding(top = 12.dp), horizontalArrangement = Arrangement.spacedBy(24.dp)) {
                        StatColumn(stringResource(R.string.university_stat_terms), map.totals.terms.toString())
                        StatColumn(stringResource(R.string.university_stat_modules), map.totals.modules.toString())
                        StatColumn(stringResource(R.string.university_stat_marks), displayMarks(map.totals.marks, unavailableMarks))
                    }
                }
            }
        }

        if (map.terms.isEmpty() || map.totals.modules == 0) {
            item {
                EmptyStateInline(
                    title = stringResource(R.string.university_no_modules_title),
                    description = stringResource(R.string.university_no_modules_description),
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

private fun displayMarks(value: Double?, unavailableLabel: String): String = if (value == null) unavailableLabel else {
    if (value == Math.floor(value)) value.toLong().toString() else String.format(java.util.Locale.ROOT, "%.2f", value)
}

@Composable
private fun TermHeader(term: StudentTermMap, index: Int) {
    Column(modifier = Modifier.padding(top = 8.dp)) {
        Text(stringResource(R.string.university_term_number_format, index + 1).uppercase(), style = MaterialTheme.typography.labelSmall)
        Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween, verticalAlignment = Alignment.CenterVertically) {
            Text(term.term, style = MaterialTheme.typography.titleLarge)
            Text(
                stringResource(
                    R.string.university_term_summary_format,
                    pluralStringResource(R.plurals.university_modules_count, term.modules.size, term.modules.size),
                    stringResource(
                        R.string.university_marks_suffix_format,
                        displayMarks(term.marks, stringResource(R.string.university_marks_unavailable)),
                    ),
                ),
                style = MaterialTheme.typography.labelMedium,
            )
        }
    }
}

@StringRes
private fun moduleBadgeLabelRes(badge: ModuleBadge): Int = when (badge) {
    ModuleBadge.Verified -> R.string.university_badge_verified
    ModuleBadge.CarriedForward -> R.string.university_badge_carried_forward
    ModuleBadge.Inferred -> R.string.university_badge_inferred
    ModuleBadge.BeingVerified -> R.string.university_badge_being_verified
    ModuleBadge.NeedsMarks -> R.string.university_badge_needs_marks
    ModuleBadge.NeedsSchedule -> R.string.university_badge_needs_schedule
}

@Composable
private fun ModuleBadgeChip(badge: ModuleBadge) {
    AssistChip(onClick = {}, label = { Text(stringResource(moduleBadgeLabelRes(badge))) })
}

@Composable
private fun SubjectTree(subjects: List<StudentSubjectMap>, depth: Int = 0) {
    if (subjects.isEmpty()) {
        if (depth == 0) Text(stringResource(R.string.university_subject_tree_empty), style = MaterialTheme.typography.bodySmall)
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
        Text(stringResource(R.string.university_schedule_empty), style = MaterialTheme.typography.bodySmall)
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

@Composable
private fun scheduleWhen(row: StudentScheduleMap): String {
    val start = row.start
    val whenText = if (start != null) {
        DateTimeFormatter.ofPattern("MMM d, yyyy · HH:mm").withZone(ZoneId.systemDefault()).format(start)
    } else {
        row.date ?: stringResource(R.string.university_date_unavailable)
    }
    return if (row.location.isNullOrBlank()) whenText else stringResource(R.string.university_schedule_location_format, whenText, row.location)
}

@Composable
private fun ModuleCard(module: StudentModuleMap) {
    Card(modifier = Modifier.fillMaxWidth().testTag(universityModuleCardTag(module.id))) {
        Column(modifier = Modifier.padding(16.dp)) {
            Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween, verticalAlignment = Alignment.Top) {
                Column {
                    Text(module.name, style = MaterialTheme.typography.titleMedium)
                    Text(
                        stringResource(
                            R.string.university_module_meta_format,
                            module.moduleId,
                            pluralStringResource(R.plurals.university_subject_nodes_count, module.subjectCount, module.subjectCount),
                            pluralStringResource(R.plurals.university_timetable_blocks_count, module.schedule.size, module.schedule.size),
                        ),
                        style = MaterialTheme.typography.labelSmall,
                    )
                }
            }
            Row(modifier = Modifier.fillMaxWidth().padding(top = 8.dp), horizontalArrangement = Arrangement.spacedBy(6.dp)) {
                module.badges.forEach { ModuleBadgeChip(it) }
            }

            HorizontalDivider(modifier = Modifier.padding(vertical = 12.dp))
            Text(stringResource(R.string.university_subject_tree_label), style = MaterialTheme.typography.labelLarge)
            SubjectTree(module.subjects)

            HorizontalDivider(modifier = Modifier.padding(vertical = 12.dp))
            Text(stringResource(R.string.university_scoped_schedule_label), style = MaterialTheme.typography.labelLarge)
            ScheduleList(module.schedule)

            HorizontalDivider(modifier = Modifier.padding(vertical = 12.dp))
            Text(stringResource(R.string.university_assessment_total_label), style = MaterialTheme.typography.labelLarge)
            Text(module.assessment.displayTotal, style = MaterialTheme.typography.headlineSmall)
            if (module.assessment.components.none { it.marks != null }) {
                Text(stringResource(R.string.university_assessment_components_unavailable), style = MaterialTheme.typography.bodySmall)
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
            Text(stringResource(R.string.university_upcoming_schedule_title), style = MaterialTheme.typography.titleMedium)
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
            Text(stringResource(R.string.university_evidence_summary_title), style = MaterialTheme.typography.titleMedium)
            Row(modifier = Modifier.fillMaxWidth().padding(top = 8.dp), horizontalArrangement = Arrangement.spacedBy(24.dp)) {
                StatColumn(stringResource(R.string.university_stat_subjects), subjects.toString())
                StatColumn(stringResource(R.string.university_stat_schedule), scheduleRows.toString())
            }
            if (marksUnavailable) {
                Text(
                    stringResource(R.string.university_marks_unavailable_notice),
                    style = MaterialTheme.typography.bodySmall,
                    modifier = Modifier.padding(top = 8.dp),
                )
            }
        }
    }
}

/**
 * The server's own refusal-reason wire code (verbatim, per
 * `EnrollmentChangeSubmission.Refused`'s doc: `invalid_field`,
 * `requested_value_required`, `reason_required`, `profile_incomplete`,
 * `unchanged`, `pending_exists`, or an `unknown_error` fallback) mapped to a
 * localized message — the code itself never reaches the screen.
 */
@StringRes
private fun changeRequestRefusalReasonRes(reason: String): Int = when (reason) {
    "invalid_field" -> R.string.university_refusal_invalid_field
    "requested_value_required" -> R.string.university_refusal_requested_value_required
    "reason_required" -> R.string.university_refusal_reason_required
    "profile_incomplete" -> R.string.university_refusal_profile_incomplete
    "unchanged" -> R.string.university_refusal_unchanged
    "pending_exists" -> R.string.university_refusal_pending_exists
    else -> R.string.university_refusal_unknown
}

/** [EnrollmentChangeRequest.field] is the wire value (`"university"`/`"year"`) verbatim; this is only its display label. */
@StringRes
private fun enrollmentFieldLabelRes(wireValue: String): Int = when (wireValue) {
    EnrollmentField.University.wireValue -> R.string.university_field_university
    EnrollmentField.Year.wireValue -> R.string.university_field_year
    else -> R.string.university_field_university
}

/** [EnrollmentChangeRequest.status] is the wire value (`pending`/`approved`/`rejected`) verbatim; this is only its display label. */
@StringRes
private fun changeRequestStatusLabelRes(status: String): Int = when (status) {
    "approved" -> R.string.university_status_approved
    "rejected" -> R.string.university_status_rejected
    else -> R.string.university_status_pending
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
            Text(stringResource(R.string.university_change_request_title), style = MaterialTheme.typography.titleMedium)
            Text(
                stringResource(R.string.university_change_request_description),
                style = MaterialTheme.typography.bodySmall,
                modifier = Modifier.padding(top = 4.dp),
            )

            Row(modifier = Modifier.fillMaxWidth().padding(top = 12.dp), horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                FilterChip(selected = field == EnrollmentField.University, onClick = { field = EnrollmentField.University }, label = { Text(stringResource(R.string.university_field_university)) })
                FilterChip(selected = field == EnrollmentField.Year, onClick = { field = EnrollmentField.Year }, label = { Text(stringResource(R.string.university_field_year)) })
            }

            OutlinedTextField(
                value = requestedValue,
                onValueChange = { requestedValue = it },
                label = { Text(stringResource(if (field == EnrollmentField.University) R.string.university_requested_university_label else R.string.university_requested_year_label)) },
                singleLine = true,
                modifier = Modifier.fillMaxWidth().padding(top = 12.dp).testTag(UNIVERSITY_REQUEST_FIELD_VALUE_TAG),
            )
            OutlinedTextField(
                value = reason,
                onValueChange = { reason = it },
                label = { Text(stringResource(R.string.university_reason_label)) },
                modifier = Modifier.fillMaxWidth().padding(top = 8.dp).testTag(UNIVERSITY_REQUEST_REASON_TAG),
            )
            Button(
                onClick = { onSubmit(field, requestedValue.trim(), reason.trim()) },
                enabled = requestedValue.isNotBlank() && reason.trim().length >= 12,
                modifier = Modifier.padding(top = 8.dp).testTag(UNIVERSITY_REQUEST_SUBMIT_TAG),
            ) { Text(stringResource(R.string.university_submit_request)) }

            when (result) {
                ChangeRequestResult.Submitted -> StatusLine(stringResource(R.string.university_request_submitted), onDismissResult)
                is ChangeRequestResult.Refused -> StatusLine(
                    stringResource(R.string.university_request_refused_format, stringResource(changeRequestRefusalReasonRes(result.reason))),
                    onDismissResult,
                )
                ChangeRequestResult.Failed -> StatusLine(stringResource(R.string.university_request_failed), onDismissResult)
                null -> Unit
            }

            if (requests.isNotEmpty()) {
                val unset = stringResource(R.string.university_value_unset)
                HorizontalDivider(modifier = Modifier.padding(vertical = 12.dp))
                Text(stringResource(R.string.university_your_requests_title), style = MaterialTheme.typography.labelLarge)
                requests.forEach { request ->
                    Column(modifier = Modifier.padding(top = 8.dp)) {
                        Text(
                            stringResource(
                                R.string.university_request_change_format,
                                stringResource(enrollmentFieldLabelRes(request.field)),
                                request.currentValue ?: unset,
                                request.requestedValue,
                            ),
                            style = MaterialTheme.typography.bodyMedium,
                        )
                        Text(stringResource(changeRequestStatusLabelRes(request.status)), style = MaterialTheme.typography.labelSmall)
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
        TextButton(onClick = onDismiss) { Text(stringResource(R.string.university_dismiss)) }
    }
}
