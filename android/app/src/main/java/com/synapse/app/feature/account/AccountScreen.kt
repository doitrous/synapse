package com.synapse.app.feature.account

import androidx.annotation.StringRes
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.FilterChip
import androidx.compose.material3.HorizontalDivider
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Switch
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.unit.dp
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import com.synapse.app.R
import com.synapse.app.core.api.MeProfile
import com.synapse.app.design.ThemeChoice

const val ACCOUNT_LOADING_TAG = "account_loading"
const val ACCOUNT_UNAVAILABLE_TAG = "account_unavailable"
const val ACCOUNT_UNIVERSITY_FIELD_TAG = "account_university_field"
const val ACCOUNT_YEAR_FIELD_TAG = "account_year_field"
const val ACCOUNT_GROUP_FIELD_TAG = "account_group_field"
const val ACCOUNT_SAVE_ENROLMENT_BUTTON_TAG = "account_save_enrolment_button"
const val ACCOUNT_REVIEW_REMINDERS_SWITCH_TAG = "account_review_reminders_switch"
const val ACCOUNT_CALENDAR_REMINDERS_SWITCH_TAG = "account_calendar_reminders_switch"
const val ACCOUNT_DISCOVERABLE_SWITCH_TAG = "account_discoverable_switch"
const val ACCOUNT_EXPORT_BUTTON_TAG = "account_export_button"
const val ACCOUNT_SIGN_OUT_BUTTON_TAG = "account_sign_out_button"
const val ACCOUNT_DELETE_CONFIRM_FIELD_TAG = "account_delete_confirm_field"
const val ACCOUNT_DELETE_BUTTON_TAG = "account_delete_button"
fun accountThemeChipTag(choice: ThemeChoice): String = "account_theme_chip_${choice.name}"
fun accountLanguageChipTag(language: String): String = "account_language_chip_$language"

/**
 * The Account tab's single public entry point. The shell mounts this
 * directly (see the plan's integration boundary) and it constructs its own
 * [AccountViewModel] via [hiltViewModel] — no navigation wiring required of
 * the caller.
 */
@Composable
fun AccountRoute(viewModel: AccountViewModel = hiltViewModel()) {
    val uiState by viewModel.uiState.collectAsStateWithLifecycle()
    val theme by viewModel.theme.collectAsStateWithLifecycle()
    AccountScreen(
        uiState = uiState,
        theme = theme,
        onRetry = viewModel::load,
        onSetTheme = viewModel::setTheme,
        onSaveEnrolment = viewModel::saveEnrolment,
        onSetReviewReminders = viewModel::setReviewReminders,
        onSetCalendarReminders = viewModel::setCalendarReminders,
        onSetLanguage = viewModel::setLanguage,
        onSetDiscoverable = viewModel::setDiscoverable,
        onRequestExport = viewModel::requestExport,
        onSignOut = viewModel::signOut,
        onDeletionTypedChange = viewModel::onDeletionTypedChange,
        onConfirmDelete = viewModel::confirmDelete,
    )
}

@Composable
private fun AccountScreen(
    uiState: AccountUiState,
    theme: ThemeChoice,
    onRetry: () -> Unit,
    onSetTheme: (ThemeChoice) -> Unit,
    onSaveEnrolment: (String, String, String?) -> Unit,
    onSetReviewReminders: (Boolean) -> Unit,
    onSetCalendarReminders: (Boolean) -> Unit,
    onSetLanguage: (String) -> Unit,
    onSetDiscoverable: (Boolean) -> Unit,
    onRequestExport: () -> Unit,
    onSignOut: () -> Unit,
    onDeletionTypedChange: (String) -> Unit,
    onConfirmDelete: () -> Unit,
) {
    when (uiState) {
        is AccountUiState.Loading -> LoadingState()
        is AccountUiState.Unavailable -> UnavailableState(onRetry)
        is AccountUiState.Content -> ContentState(
            state = uiState,
            theme = theme,
            onSetTheme = onSetTheme,
            onSaveEnrolment = onSaveEnrolment,
            onSetReviewReminders = onSetReviewReminders,
            onSetCalendarReminders = onSetCalendarReminders,
            onSetLanguage = onSetLanguage,
            onSetDiscoverable = onSetDiscoverable,
            onRequestExport = onRequestExport,
            onSignOut = onSignOut,
            onDeletionTypedChange = onDeletionTypedChange,
            onConfirmDelete = onConfirmDelete,
        )
    }
}

@Composable
private fun LoadingState() {
    Column(
        modifier = Modifier.fillMaxSize().testTag(ACCOUNT_LOADING_TAG),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.Center,
    ) { CircularProgressIndicator() }
}

@Composable
private fun UnavailableState(onRetry: () -> Unit) {
    Column(
        modifier = Modifier.fillMaxSize().padding(16.dp).testTag(ACCOUNT_UNAVAILABLE_TAG),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.Center,
    ) {
        Text(stringResource(R.string.account_unavailable_title), style = MaterialTheme.typography.bodyLarge)
        Text(
            stringResource(R.string.common_check_connection),
            style = MaterialTheme.typography.bodyMedium,
            modifier = Modifier.padding(top = 4.dp),
        )
        TextButton(onClick = onRetry, modifier = Modifier.padding(top = 12.dp)) { Text(stringResource(R.string.common_retry)) }
    }
}

@Composable
private fun ContentState(
    state: AccountUiState.Content,
    theme: ThemeChoice,
    onSetTheme: (ThemeChoice) -> Unit,
    onSaveEnrolment: (String, String, String?) -> Unit,
    onSetReviewReminders: (Boolean) -> Unit,
    onSetCalendarReminders: (Boolean) -> Unit,
    onSetLanguage: (String) -> Unit,
    onSetDiscoverable: (Boolean) -> Unit,
    onRequestExport: () -> Unit,
    onSignOut: () -> Unit,
    onDeletionTypedChange: (String) -> Unit,
    onConfirmDelete: () -> Unit,
) {
    Column(modifier = Modifier.fillMaxSize().padding(16.dp).verticalScroll(rememberScrollState())) {
        Text(stringResource(R.string.account_title), style = MaterialTheme.typography.titleLarge)

        SectionTitle(stringResource(R.string.account_section_profile))
        Text(state.profile?.name ?: state.user.email ?: stringResource(R.string.account_signed_in_fallback), style = MaterialTheme.typography.bodyLarge)
        Text(state.user.email ?: "", style = MaterialTheme.typography.bodyMedium, modifier = Modifier.padding(top = 2.dp))
        EntitlementRow(state)
        HorizontalDivider(modifier = Modifier.padding(vertical = 16.dp))

        SectionTitle(stringResource(R.string.account_section_study_context))
        EnrolmentSection(
            profile = state.profile,
            saving = state.savingEnrolment,
            error = state.enrolmentError,
            onSave = onSaveEnrolment,
        )
        HorizontalDivider(modifier = Modifier.padding(vertical = 16.dp))

        SectionTitle(stringResource(R.string.account_section_preferences))
        ToggleRow(
            title = stringResource(R.string.account_review_reminders_title),
            subtitle = stringResource(R.string.account_review_reminders_subtitle),
            checked = state.prefs.reviewReminders,
            tag = ACCOUNT_REVIEW_REMINDERS_SWITCH_TAG,
            onCheckedChange = onSetReviewReminders,
        )
        ToggleRow(
            title = stringResource(R.string.account_calendar_reminders_title),
            subtitle = stringResource(R.string.account_calendar_reminders_subtitle),
            checked = state.prefs.calendarReminders,
            tag = ACCOUNT_CALENDAR_REMINDERS_SWITCH_TAG,
            onCheckedChange = onSetCalendarReminders,
        )
        Text(stringResource(R.string.account_language_label), style = MaterialTheme.typography.bodyMedium, modifier = Modifier.padding(top = 12.dp))
        Text(
            stringResource(R.string.account_language_note),
            style = MaterialTheme.typography.bodySmall,
        )
        Row(modifier = Modifier.padding(top = 6.dp), horizontalArrangement = Arrangement.spacedBy(8.dp)) {
            listOf("en" to R.string.account_language_english, "ar" to R.string.account_language_arabic).forEach { (code, labelRes) ->
                FilterChip(
                    selected = state.language == code,
                    onClick = { onSetLanguage(code) },
                    label = { Text(stringResource(labelRes)) },
                    modifier = Modifier.testTag(accountLanguageChipTag(code)),
                )
            }
        }
        Text(stringResource(R.string.account_theme_label), style = MaterialTheme.typography.bodyMedium, modifier = Modifier.padding(top = 16.dp))
        Row(modifier = Modifier.padding(top = 6.dp), horizontalArrangement = Arrangement.spacedBy(8.dp)) {
            ThemeChoice.entries.forEach { choice ->
                FilterChip(
                    selected = theme == choice,
                    onClick = { onSetTheme(choice) },
                    label = { Text(stringResource(choice.labelRes())) },
                    modifier = Modifier.testTag(accountThemeChipTag(choice)),
                )
            }
        }
        HorizontalDivider(modifier = Modifier.padding(vertical = 16.dp))

        SectionTitle(stringResource(R.string.account_section_privacy_data))
        ToggleRow(
            title = stringResource(R.string.account_discoverable_title),
            subtitle = stringResource(R.string.account_discoverable_subtitle),
            checked = state.discoverable,
            tag = ACCOUNT_DISCOVERABLE_SWITCH_TAG,
            onCheckedChange = onSetDiscoverable,
        )
        ExportSection(state.export, onRequestExport)
        HorizontalDivider(modifier = Modifier.padding(vertical = 16.dp))

        SectionTitle(stringResource(R.string.account_section_this_session))
        Text(state.user.email ?: stringResource(R.string.account_signed_in_fallback), style = MaterialTheme.typography.bodyMedium)
        TextButton(onClick = onSignOut, modifier = Modifier.padding(top = 8.dp).testTag(ACCOUNT_SIGN_OUT_BUTTON_TAG)) { Text(stringResource(R.string.account_sign_out)) }
        HorizontalDivider(modifier = Modifier.padding(vertical = 16.dp))

        SectionTitle(stringResource(R.string.account_section_delete))
        DeleteAccountSection(state.deletion, onDeletionTypedChange, onConfirmDelete)
    }
}

/** Display name for [ThemeChoice], shown on the Account theme chips. */
@StringRes
private fun ThemeChoice.labelRes(): Int = when (this) {
    ThemeChoice.Light -> R.string.theme_light
    ThemeChoice.Warm -> R.string.theme_warm
    ThemeChoice.Dark -> R.string.theme_dark
}

@Composable
private fun SectionTitle(text: String) {
    Text(text, style = MaterialTheme.typography.titleMedium, modifier = Modifier.padding(top = 4.dp, bottom = 8.dp))
}

@Composable
private fun EntitlementRow(state: AccountUiState.Content) {
    val entitlement = state.entitlement
    val resources = LocalContext.current.resources
    val text = when {
        entitlement == null || entitlement.state.isNullOrEmpty() -> stringResource(R.string.account_no_plan)
        entitlement.state == "trialing" && entitlement.daysLeft != null ->
            resources.getQuantityString(R.plurals.account_trial_days_left, entitlement.daysLeft, entitlement.daysLeft)
        else -> "${entitlement.plan ?: entitlement.state}"
    }
    Text(text, style = MaterialTheme.typography.bodySmall, modifier = Modifier.padding(top = 6.dp))
}

@Composable
private fun EnrolmentSection(
    profile: MeProfile?,
    saving: Boolean,
    error: String?,
    onSave: (String, String, String?) -> Unit,
) {
    val enrolled = !profile?.universityId.isNullOrEmpty() && !profile?.year.isNullOrEmpty()

    if (enrolled) {
        Text("${profile?.universityId} · ${profile?.year}", style = MaterialTheme.typography.bodyLarge)
        Text(stringResource(R.string.account_enrolment_locked), style = MaterialTheme.typography.bodySmall, modifier = Modifier.padding(top = 2.dp))
        var group by rememberSaveable(profile?.group) { mutableStateOf(profile?.group.orEmpty()) }
        Row(modifier = Modifier.fillMaxWidth().padding(top = 12.dp), verticalAlignment = Alignment.CenterVertically) {
            OutlinedTextField(
                value = group,
                onValueChange = { group = it },
                label = { Text(stringResource(R.string.account_group_field_label)) },
                singleLine = true,
                modifier = Modifier.weight(1f).testTag(ACCOUNT_GROUP_FIELD_TAG),
            )
            Button(
                onClick = { onSave(profile!!.universityId!!, profile.year!!, group.trim()) },
                enabled = !saving,
                modifier = Modifier.padding(start = 8.dp).testTag(ACCOUNT_SAVE_ENROLMENT_BUTTON_TAG),
            ) { Text(stringResource(if (saving) R.string.common_saving else R.string.common_save)) }
        }
    } else {
        var universityId by rememberSaveable { mutableStateOf("") }
        var year by rememberSaveable { mutableStateOf("") }
        var group by rememberSaveable { mutableStateOf("") }
        Text(
            stringResource(R.string.account_enrolment_prompt),
            style = MaterialTheme.typography.bodyMedium,
        )
        OutlinedTextField(
            value = universityId,
            onValueChange = { universityId = it },
            label = { Text(stringResource(R.string.account_university_id_label)) },
            singleLine = true,
            modifier = Modifier.fillMaxWidth().padding(top = 12.dp).testTag(ACCOUNT_UNIVERSITY_FIELD_TAG),
        )
        OutlinedTextField(
            value = year,
            onValueChange = { year = it },
            label = { Text(stringResource(R.string.account_year_label)) },
            singleLine = true,
            modifier = Modifier.fillMaxWidth().padding(top = 8.dp).testTag(ACCOUNT_YEAR_FIELD_TAG),
        )
        OutlinedTextField(
            value = group,
            onValueChange = { group = it },
            label = { Text(stringResource(R.string.account_group_optional_label)) },
            singleLine = true,
            modifier = Modifier.fillMaxWidth().padding(top = 8.dp).testTag(ACCOUNT_GROUP_FIELD_TAG),
        )
        Button(
            onClick = { onSave(universityId.trim(), year.trim(), group.trim().ifEmpty { null }) },
            enabled = !saving && universityId.isNotBlank() && year.isNotBlank(),
            modifier = Modifier.padding(top = 12.dp).testTag(ACCOUNT_SAVE_ENROLMENT_BUTTON_TAG),
        ) { Text(stringResource(if (saving) R.string.common_saving else R.string.common_save)) }
    }

    if (error != null) {
        Text(error, style = MaterialTheme.typography.bodySmall, color = MaterialTheme.colorScheme.error, modifier = Modifier.padding(top = 6.dp))
    }
}

@Composable
private fun ToggleRow(title: String, subtitle: String, checked: Boolean, tag: String, onCheckedChange: (Boolean) -> Unit) {
    Row(
        modifier = Modifier.fillMaxWidth().padding(vertical = 8.dp),
        verticalAlignment = Alignment.CenterVertically,
        horizontalArrangement = Arrangement.SpaceBetween,
    ) {
        Column(modifier = Modifier.weight(1f).padding(end = 12.dp)) {
            Text(title, style = MaterialTheme.typography.bodyLarge)
            Text(subtitle, style = MaterialTheme.typography.bodySmall, modifier = Modifier.padding(top = 2.dp))
        }
        Switch(checked = checked, onCheckedChange = onCheckedChange, modifier = Modifier.testTag(tag))
    }
}

@Composable
private fun ExportSection(export: ExportUiState, onRequestExport: () -> Unit) {
    Column(modifier = Modifier.padding(top = 12.dp)) {
        Button(
            onClick = onRequestExport,
            enabled = export !is ExportUiState.Loading,
            modifier = Modifier.testTag(ACCOUNT_EXPORT_BUTTON_TAG),
        ) { Text(stringResource(R.string.account_download_my_data)) }
        when (export) {
            is ExportUiState.Ready -> Text(
                stringResource(R.string.account_export_ready, export.sizeBytes),
                style = MaterialTheme.typography.bodySmall,
                modifier = Modifier.padding(top = 6.dp),
            )
            ExportUiState.Unavailable -> Text(
                stringResource(R.string.account_export_unavailable),
                style = MaterialTheme.typography.bodySmall,
                color = MaterialTheme.colorScheme.error,
                modifier = Modifier.padding(top = 6.dp),
            )
            ExportUiState.Loading, ExportUiState.Idle -> Unit
        }
    }
}

/**
 * Required by Google Play's account-deletion policy. Written on the same
 * assumption iOS's `DeleteAccountView` is: the student means it but may not
 * have understood it, so the consequence is stated before the button exists
 * at all, and the button only enables once the word has actually been typed.
 */
@Composable
private fun DeleteAccountSection(state: DeletionUiState, onTypedChange: (String) -> Unit, onConfirm: () -> Unit) {
    Text(
        stringResource(R.string.account_delete_warning),
        style = MaterialTheme.typography.bodyMedium,
    )
    OutlinedTextField(
        value = state.typed,
        onValueChange = onTypedChange,
        label = { Text(stringResource(R.string.account_delete_confirm_label)) },
        singleLine = true,
        enabled = !state.isDeleting,
        modifier = Modifier.fillMaxWidth().padding(top = 12.dp).testTag(ACCOUNT_DELETE_CONFIRM_FIELD_TAG),
    )
    if (state.failure != null) {
        Text(state.failure, style = MaterialTheme.typography.bodySmall, color = MaterialTheme.colorScheme.error, modifier = Modifier.padding(top = 6.dp))
    }
    Button(
        onClick = onConfirm,
        enabled = state.canDelete,
        colors = ButtonDefaults.buttonColors(containerColor = MaterialTheme.colorScheme.error),
        modifier = Modifier.padding(top = 12.dp).testTag(ACCOUNT_DELETE_BUTTON_TAG),
    ) { Text(stringResource(if (state.isDeleting) R.string.account_deleting else R.string.account_delete_button)) }
}
