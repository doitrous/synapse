package com.synapse.app.feature.account

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
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.unit.dp
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.lifecycle.compose.collectAsStateWithLifecycle
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
        Text("Your account could not be loaded.", style = MaterialTheme.typography.bodyLarge)
        Text(
            "Check your connection and try again.",
            style = MaterialTheme.typography.bodyMedium,
            modifier = Modifier.padding(top = 4.dp),
        )
        TextButton(onClick = onRetry, modifier = Modifier.padding(top = 12.dp)) { Text("Retry") }
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
        Text("Account", style = MaterialTheme.typography.titleLarge)

        SectionTitle("Profile")
        Text(state.profile?.name ?: state.user.email ?: "Signed in", style = MaterialTheme.typography.bodyLarge)
        Text(state.user.email ?: "", style = MaterialTheme.typography.bodyMedium, modifier = Modifier.padding(top = 2.dp))
        EntitlementRow(state)
        HorizontalDivider(modifier = Modifier.padding(vertical = 16.dp))

        SectionTitle("Study context")
        EnrolmentSection(
            profile = state.profile,
            saving = state.savingEnrolment,
            error = state.enrolmentError,
            onSave = onSaveEnrolment,
        )
        HorizontalDivider(modifier = Modifier.padding(vertical = 16.dp))

        SectionTitle("Preferences")
        ToggleRow(
            title = "Review reminders",
            subtitle = "Notices when concepts are due for review.",
            checked = state.prefs.reviewReminders,
            tag = ACCOUNT_REVIEW_REMINDERS_SWITCH_TAG,
            onCheckedChange = onSetReviewReminders,
        )
        ToggleRow(
            title = "Calendar reminders",
            subtitle = "Notices before your blocks and sessions.",
            checked = state.prefs.calendarReminders,
            tag = ACCOUNT_CALENDAR_REMINDERS_SWITCH_TAG,
            onCheckedChange = onSetCalendarReminders,
        )
        Text("Language", style = MaterialTheme.typography.bodyMedium, modifier = Modifier.padding(top = 12.dp))
        Text(
            "Recorded for your other devices — Android doesn't translate its own screens yet.",
            style = MaterialTheme.typography.bodySmall,
        )
        Row(modifier = Modifier.padding(top = 6.dp), horizontalArrangement = Arrangement.spacedBy(8.dp)) {
            listOf("en" to "English", "ar" to "العربية").forEach { (code, label) ->
                FilterChip(
                    selected = state.language == code,
                    onClick = { onSetLanguage(code) },
                    label = { Text(label) },
                    modifier = Modifier.testTag(accountLanguageChipTag(code)),
                )
            }
        }
        Text("Theme", style = MaterialTheme.typography.bodyMedium, modifier = Modifier.padding(top = 16.dp))
        Row(modifier = Modifier.padding(top = 6.dp), horizontalArrangement = Arrangement.spacedBy(8.dp)) {
            ThemeChoice.entries.forEach { choice ->
                FilterChip(
                    selected = theme == choice,
                    onClick = { onSetTheme(choice) },
                    label = { Text(choice.name) },
                    modifier = Modifier.testTag(accountThemeChipTag(choice)),
                )
            }
        }
        HorizontalDivider(modifier = Modifier.padding(vertical = 16.dp))

        SectionTitle("Privacy and data")
        ToggleRow(
            title = "Let classmates find me",
            subtitle = "Off by default. Appears in, and can browse, your same-university-and-year classmate directory.",
            checked = state.discoverable,
            tag = ACCOUNT_DISCOVERABLE_SWITCH_TAG,
            onCheckedChange = onSetDiscoverable,
        )
        ExportSection(state.export, onRequestExport)
        HorizontalDivider(modifier = Modifier.padding(vertical = 16.dp))

        SectionTitle("This session")
        Text(state.user.email ?: "Signed in", style = MaterialTheme.typography.bodyMedium)
        TextButton(onClick = onSignOut, modifier = Modifier.padding(top = 8.dp).testTag(ACCOUNT_SIGN_OUT_BUTTON_TAG)) { Text("Sign out") }
        HorizontalDivider(modifier = Modifier.padding(vertical = 16.dp))

        SectionTitle("Delete account")
        DeleteAccountSection(state.deletion, onDeletionTypedChange, onConfirmDelete)
    }
}

@Composable
private fun SectionTitle(text: String) {
    Text(text, style = MaterialTheme.typography.titleMedium, modifier = Modifier.padding(top = 4.dp, bottom = 8.dp))
}

@Composable
private fun EntitlementRow(state: AccountUiState.Content) {
    val entitlement = state.entitlement
    val text = when {
        entitlement == null || entitlement.state.isNullOrEmpty() -> "No plan on record"
        entitlement.state == "trialing" && entitlement.daysLeft != null -> "Trial · ${entitlement.daysLeft} day${if (entitlement.daysLeft == 1) "" else "s"} left"
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
        Text("Locked after onboarding", style = MaterialTheme.typography.bodySmall, modifier = Modifier.padding(top = 2.dp))
        var group by rememberSaveable(profile?.group) { mutableStateOf(profile?.group.orEmpty()) }
        Row(modifier = Modifier.fillMaxWidth().padding(top = 12.dp), verticalAlignment = Alignment.CenterVertically) {
            OutlinedTextField(
                value = group,
                onValueChange = { group = it },
                label = { Text("Group") },
                singleLine = true,
                modifier = Modifier.weight(1f).testTag(ACCOUNT_GROUP_FIELD_TAG),
            )
            Button(
                onClick = { onSave(profile!!.universityId!!, profile.year!!, group.trim()) },
                enabled = !saving,
                modifier = Modifier.padding(start = 8.dp).testTag(ACCOUNT_SAVE_ENROLMENT_BUTTON_TAG),
            ) { Text(if (saving) "Saving…" else "Save") }
        }
    } else {
        var universityId by rememberSaveable { mutableStateOf("") }
        var year by rememberSaveable { mutableStateOf("") }
        var group by rememberSaveable { mutableStateOf("") }
        Text(
            "Your university hasn't set up your profile yet. Enter it yourself to unlock scoped content.",
            style = MaterialTheme.typography.bodyMedium,
        )
        OutlinedTextField(
            value = universityId,
            onValueChange = { universityId = it },
            label = { Text("University id") },
            singleLine = true,
            modifier = Modifier.fillMaxWidth().padding(top = 12.dp).testTag(ACCOUNT_UNIVERSITY_FIELD_TAG),
        )
        OutlinedTextField(
            value = year,
            onValueChange = { year = it },
            label = { Text("Year, e.g. Year 3") },
            singleLine = true,
            modifier = Modifier.fillMaxWidth().padding(top = 8.dp).testTag(ACCOUNT_YEAR_FIELD_TAG),
        )
        OutlinedTextField(
            value = group,
            onValueChange = { group = it },
            label = { Text("Group (optional)") },
            singleLine = true,
            modifier = Modifier.fillMaxWidth().padding(top = 8.dp).testTag(ACCOUNT_GROUP_FIELD_TAG),
        )
        Button(
            onClick = { onSave(universityId.trim(), year.trim(), group.trim().ifEmpty { null }) },
            enabled = !saving && universityId.isNotBlank() && year.isNotBlank(),
            modifier = Modifier.padding(top = 12.dp).testTag(ACCOUNT_SAVE_ENROLMENT_BUTTON_TAG),
        ) { Text(if (saving) "Saving…" else "Save") }
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
        ) { Text("Download my data") }
        when (export) {
            is ExportUiState.Ready -> Text(
                "Export ready (${export.sizeBytes} bytes). Saving it to a file isn't wired up on Android yet.",
                style = MaterialTheme.typography.bodySmall,
                modifier = Modifier.padding(top = 6.dp),
            )
            ExportUiState.Unavailable -> Text(
                "Your data couldn't be exported right now. Try again in a moment.",
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
        "This cannot be undone. Deleting your account removes your notes, whiteboards, study plan and your whole answer history — support cannot recover any of it afterwards. Your account on the website is the same account, so it is deleted too.",
        style = MaterialTheme.typography.bodyMedium,
    )
    OutlinedTextField(
        value = state.typed,
        onValueChange = onTypedChange,
        label = { Text("Type DELETE to confirm") },
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
    ) { Text(if (state.isDeleting) "Deleting…" else "Delete my account") }
}
