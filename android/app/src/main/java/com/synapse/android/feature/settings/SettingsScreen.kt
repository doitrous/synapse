package com.synapse.android.feature.settings

import android.content.Intent
import android.net.Uri
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.Button
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.FilterChip
import androidx.compose.material3.HorizontalDivider
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedButton
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.SegmentedButton
import androidx.compose.material3.SegmentedButtonDefaults
import androidx.compose.material3.SingleChoiceSegmentedButtonRow
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.rememberCoroutineScope
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import com.synapse.android.BuildConfig
import com.synapse.android.core.api.Profile
import com.synapse.android.core.api.SupportTicket
import com.synapse.android.core.api.UsernameAvailability
import com.synapse.android.core.cache.LocalStore
import com.synapse.android.core.notifications.NotificationRationaleDialog
import com.synapse.android.core.notifications.hasNotificationPermission
import com.synapse.android.core.notifications.rememberNotificationPermissionRequester
import com.synapse.android.core.sync.SyncEngine
import com.synapse.android.core.sync.SyncStatus
import com.synapse.android.design.AppLanguage
import com.synapse.android.design.CortexThemeChoice
import com.synapse.android.feature.root.AiDisclaimerDialog
import java.time.Instant
import java.time.ZoneId
import java.time.format.DateTimeFormatter
import kotlinx.coroutines.delay
import kotlinx.coroutines.launch

private sealed interface SettingsSubScreen {
    data object Main : SettingsSubScreen
    data object Accessibility : SettingsSubScreen
}

/**
 * Everything a student manages about their own account and this device, in
 * one scrolling surface -- Profile, Preferences, Account, Help, About and
 * legal, Sign out, and Delete account, in that order, mirroring iOS and web.
 *
 * [sync] and [store] are read directly here, not through [viewModel], purely
 * for the "last synced / N changes waiting" line -- both are already
 * [kotlinx.coroutines.flow.StateFlow]/[kotlinx.coroutines.flow.Flow]s that
 * recompose this screen on their own, so routing them through the view
 * model would only add a second copy of state [AppGraph] already holds once.
 */
@Composable
fun SettingsScreen(viewModel: SettingsViewModel, sync: SyncEngine, store: LocalStore, onOpenBilling: () -> Unit) {
    val context = LocalContext.current
    val state by viewModel.state.collectAsState()
    val supportTickets by viewModel.supportTickets.collectAsState()
    val syncStatus by sync.status.collectAsState()
    val pendingWrites by store.outboxCount().collectAsState(initial = 0)
    val themeChoice by viewModel.themePreference.choice.collectAsState()
    val language by viewModel.languagePreference.language.collectAsState()

    var subScreen by remember { mutableStateOf<SettingsSubScreen>(SettingsSubScreen.Main) }
    var showDeleteDialog by remember { mutableStateOf(false) }
    var showAiDialog by remember { mutableStateOf(false) }

    LaunchedEffect(Unit) {
        viewModel.load()
        viewModel.loadSupportTickets()
    }

    when (subScreen) {
        SettingsSubScreen.Accessibility -> {
            AccessibilityStatementScreen(onBack = { subScreen = SettingsSubScreen.Main })
            return
        }
        SettingsSubScreen.Main -> Unit
    }

    if (showDeleteDialog) {
        DeleteAccountDialog(
            onDelete = { viewModel.deleteAccount() },
            onDismiss = { showDeleteDialog = false },
        )
    }
    if (showAiDialog) {
        AiDisclaimerDialog(onDismiss = { showAiDialog = false })
    }

    Column(modifier = Modifier.fillMaxSize()) {
        Text(
            "Account",
            style = MaterialTheme.typography.headlineSmall,
            modifier = Modifier.padding(horizontal = 20.dp, vertical = 16.dp),
        )
        when (val s = state) {
            is SettingsUiState.Loading ->
                Box(Modifier.fillMaxSize(), contentAlignment = Alignment.Center) { CircularProgressIndicator() }

            is SettingsUiState.ConnectionDropped ->
                ConnectionDroppedBody(message = s.message, onRetry = viewModel::load)

            SettingsUiState.Empty ->
                Column(
                    modifier = Modifier.fillMaxSize().padding(20.dp).verticalScroll(rememberScrollState()),
                    verticalArrangement = Arrangement.spacedBy(20.dp),
                ) {
                    Text(
                        "Your university hasn't set up your profile yet, so there's nothing to edit here. " +
                            "Sign out or delete your account are still available below.",
                        style = MaterialTheme.typography.bodyMedium,
                    )
                    PreferencesSection(
                        themeChoice = themeChoice,
                        onThemeSelect = viewModel::setTheme,
                        language = language,
                        onLanguageSelect = viewModel::setLanguage,
                    )
                    BillingSection(onOpenBilling = onOpenBilling)
                    AboutSection(
                        onOpenTerms = { openUrl(context, TERMS_URL) },
                        onOpenPrivacy = { openUrl(context, PRIVACY_URL) },
                        onOpenAccessibility = { subScreen = SettingsSubScreen.Accessibility },
                        onOpenAiDisclaimer = { showAiDialog = true },
                    )
                    SignOutSection(onSignOut = viewModel::signOut)
                    DeleteSection(onDelete = { showDeleteDialog = true })
                }

            is SettingsUiState.Content ->
                Column(
                    modifier = Modifier.fillMaxSize().padding(horizontal = 20.dp).verticalScroll(rememberScrollState()),
                    verticalArrangement = Arrangement.spacedBy(24.dp),
                ) {
                    SyncStatusLine(
                        lastSyncedAt = (syncStatus as? SyncStatus.Done)?.at,
                        pendingWrites = pendingWrites,
                    )
                    ProfileSection(profile = s.profile, viewModel = viewModel)
                    HorizontalDivider()
                    PreferencesSection(
                        themeChoice = themeChoice,
                        onThemeSelect = viewModel::setTheme,
                        language = language,
                        onLanguageSelect = viewModel::setLanguage,
                    )
                    HorizontalDivider()
                    AccountSection(profile = s.profile, viewModel = viewModel)
                    HorizontalDivider()
                    BillingSection(onOpenBilling = onOpenBilling)
                    HorizontalDivider()
                    HelpSection(tickets = supportTickets, viewModel = viewModel)
                    HorizontalDivider()
                    AboutSection(
                        onOpenTerms = { openUrl(context, TERMS_URL) },
                        onOpenPrivacy = { openUrl(context, PRIVACY_URL) },
                        onOpenAccessibility = { subScreen = SettingsSubScreen.Accessibility },
                        onOpenAiDisclaimer = { showAiDialog = true },
                    )
                    HorizontalDivider()
                    SignOutSection(onSignOut = viewModel::signOut)
                    DeleteSection(onDelete = { showDeleteDialog = true })
                    Spacer(modifier = Modifier.height(24.dp))
                }
        }
    }
}

@Composable
private fun ConnectionDroppedBody(message: String, onRetry: () -> Unit) {
    Column(
        modifier = Modifier.fillMaxSize().padding(20.dp),
        verticalArrangement = Arrangement.spacedBy(12.dp),
        horizontalAlignment = Alignment.Start,
    ) {
        Text(message, style = MaterialTheme.typography.bodyMedium)
        Button(onClick = onRetry) { Text("Try again") }
    }
}

@Composable
private fun SectionTitle(text: String) {
    Text(text, style = MaterialTheme.typography.titleMedium, fontWeight = FontWeight.SemiBold)
}

@Composable
private fun SyncStatusLine(lastSyncedAt: Instant?, pendingWrites: Int) {
    Column(verticalArrangement = Arrangement.spacedBy(2.dp)) {
        Text(syncedAtLabel(lastSyncedAt), style = MaterialTheme.typography.bodySmall)
        Text(pendingWritesLabel(pendingWrites), style = MaterialTheme.typography.bodySmall)
    }
}

private fun syncedAtLabel(lastSyncedAt: Instant?): String {
    if (lastSyncedAt == null) return "Not yet synced"
    val formatter = DateTimeFormatter.ofPattern("MMM d, h:mm a").withZone(ZoneId.systemDefault())
    return "Last synced ${formatter.format(lastSyncedAt)}"
}

private fun pendingWritesLabel(pendingWrites: Int): String = when (pendingWrites) {
    0 -> "All changes saved"
    1 -> "1 change waiting to sync"
    else -> "$pendingWrites changes waiting to sync"
}

// --- 1. Profile ------------------------------------------------------------

/** What a locally-typed username currently looks like against the server, debounced by the plain `LaunchedEffect(username)` below -- see `SettingsViewModel`'s class doc for why the debounce lives here rather than in the view model. */
private sealed interface UsernameCheck {
    data object Idle : UsernameCheck
    data object Checking : UsernameCheck
    data object Available : UsernameCheck
    data class Taken(val reason: String?) : UsernameCheck
    data class Invalid(val message: String) : UsernameCheck

    /** The availability call itself failed (offline, timeout). Doesn't block Save -- only a confirmed [Taken] or [Invalid] does. */
    data object Unknown : UsernameCheck
}

@Composable
private fun ProfileSection(profile: Profile, viewModel: SettingsViewModel) {
    val savedUsername = profile.username.orEmpty()
    val savedIcon = profile.profileIcon ?: DEFAULT_PROFILE_ICON
    val savedStatus = profile.statusMessage.orEmpty()

    var username by remember(savedUsername) { mutableStateOf(savedUsername) }
    var icon by remember(savedIcon) { mutableStateOf(savedIcon) }
    var statusMessage by remember(savedStatus) { mutableStateOf(savedStatus) }
    var usernameCheck by remember { mutableStateOf<UsernameCheck>(UsernameCheck.Idle) }
    var saving by remember { mutableStateOf(false) }
    var saved by remember { mutableStateOf(false) }
    var error by remember { mutableStateOf<String?>(null) }

    LaunchedEffect(username, savedUsername) {
        val candidate = username.trim()
        if (candidate.isEmpty() || normaliseUsername(candidate) == normaliseUsername(savedUsername)) {
            usernameCheck = UsernameCheck.Idle
            return@LaunchedEffect
        }
        val problem = usernameProblem(candidate)
        if (problem != null) {
            usernameCheck = UsernameCheck.Invalid(problem)
            return@LaunchedEffect
        }
        usernameCheck = UsernameCheck.Checking
        delay(400)
        usernameCheck = try {
            val result: UsernameAvailability = viewModel.checkUsername(normaliseUsername(candidate))
            if (result.available) UsernameCheck.Available else UsernameCheck.Taken(result.reason)
        } catch (e: Exception) {
            UsernameCheck.Unknown
        }
    }

    val dirty = normaliseUsername(username) != normaliseUsername(savedUsername) ||
        icon != savedIcon || statusMessage.trim() != savedStatus
    val blockedByUsername = usernameCheck is UsernameCheck.Taken || usernameCheck is UsernameCheck.Invalid || usernameCheck is UsernameCheck.Checking

    Column(verticalArrangement = Arrangement.spacedBy(10.dp)) {
        SectionTitle("Profile")

        Text("Study icon", style = MaterialTheme.typography.bodyMedium)
        Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
            PROFILE_ICONS.forEach { option ->
                FilterChip(
                    selected = option.id == icon,
                    onClick = { icon = option.id; saved = false },
                    label = { Text(option.label) },
                )
            }
        }

        OutlinedTextField(
            value = username,
            onValueChange = { username = it; saved = false },
            label = { Text("Username") },
            singleLine = true,
            supportingText = { UsernameCheckLabel(usernameCheck) },
            isError = usernameCheck is UsernameCheck.Taken || usernameCheck is UsernameCheck.Invalid,
            modifier = Modifier.fillMaxWidth(),
        )

        OutlinedTextField(
            value = statusMessage,
            onValueChange = { if (it.length <= 140) { statusMessage = it; saved = false } },
            label = { Text("Status message") },
            supportingText = { Text("${statusMessage.length}/140") },
            modifier = Modifier.fillMaxWidth(),
        )

        Row(verticalAlignment = Alignment.CenterVertically) {
            Button(
                enabled = dirty && !blockedByUsername && !saving,
                onClick = {
                    saving = true
                    error = null
                    viewModel.saveProfile(normaliseUsername(username), icon, statusMessage.trim()) { result ->
                        saving = false
                        result.onSuccess { saved = true }
                        result.onFailure { error = "That could not be saved. Check your connection and try again." }
                    }
                },
            ) { Text(if (saving) "Saving…" else if (saved && !dirty) "Saved" else "Save profile") }
        }
        error?.let { Text(it, color = MaterialTheme.colorScheme.error, style = MaterialTheme.typography.bodySmall) }
    }
}

@Composable
private fun UsernameCheckLabel(check: UsernameCheck) {
    when (check) {
        UsernameCheck.Idle -> Unit
        UsernameCheck.Checking -> Text("Checking…")
        UsernameCheck.Available -> Text("Available")
        is UsernameCheck.Taken -> Text(check.reason ?: "That username is taken.")
        is UsernameCheck.Invalid -> Text(check.message)
        UsernameCheck.Unknown -> Text("Couldn't check availability right now.")
    }
}

// --- 2. Preferences ----------------------------------------------------------

@Composable
private fun PreferencesSection(
    themeChoice: CortexThemeChoice,
    onThemeSelect: (CortexThemeChoice) -> Unit,
    language: AppLanguage,
    onLanguageSelect: (AppLanguage) -> Unit,
) {
    val context = LocalContext.current
    var hasNotificationPermission by remember { mutableStateOf(context.hasNotificationPermission()) }
    var showRationale by remember { mutableStateOf(false) }
    val requestPermission = rememberNotificationPermissionRequester { granted -> hasNotificationPermission = granted }

    Column(verticalArrangement = Arrangement.spacedBy(12.dp)) {
        SectionTitle("Preferences")

        Text("Theme", style = MaterialTheme.typography.bodyMedium)
        SingleChoiceSegmentedButtonRow(modifier = Modifier.fillMaxWidth()) {
            CortexThemeChoice.entries.forEachIndexed { index, choice ->
                SegmentedButton(
                    selected = choice == themeChoice,
                    onClick = { onThemeSelect(choice) },
                    shape = SegmentedButtonDefaults.itemShape(index = index, count = CortexThemeChoice.entries.size),
                    label = { Text(themeLabel(choice)) },
                )
            }
        }
        Text("Light, warm, dark, or true black for OLED screens. Kept on this device.", style = MaterialTheme.typography.bodySmall)

        Text("Language", style = MaterialTheme.typography.bodyMedium)
        SingleChoiceSegmentedButtonRow(modifier = Modifier.fillMaxWidth()) {
            AppLanguage.entries.forEachIndexed { index, entry ->
                SegmentedButton(
                    selected = entry == language,
                    onClick = { onLanguageSelect(entry) },
                    shape = SegmentedButtonDefaults.itemShape(index = index, count = AppLanguage.entries.size),
                    label = { Text(entry.ownName) },
                )
            }
        }

        Row(verticalAlignment = Alignment.CenterVertically) {
            OutlinedButton(
                enabled = !hasNotificationPermission,
                onClick = { showRationale = true },
            ) { Text(if (hasNotificationPermission) "Reminders enabled" else "Enable reminders") }
        }
    }

    if (showRationale) {
        NotificationRationaleDialog(
            onConfirm = { showRationale = false; requestPermission() },
            onDismiss = { showRationale = false },
        )
    }
}

private fun themeLabel(choice: CortexThemeChoice): String = when (choice) {
    CortexThemeChoice.LIGHT -> "Light"
    CortexThemeChoice.WARM -> "Warm"
    CortexThemeChoice.DARK -> "Dark"
    CortexThemeChoice.OLED -> "OLED"
}

// --- 3. Account: request a university/year change ---------------------------

@Composable
private fun AccountSection(profile: Profile, viewModel: SettingsViewModel) {
    var targetUniversityId by remember { mutableStateOf("") }
    var targetYear by remember { mutableStateOf("") }
    var reason by remember { mutableStateOf("") }
    var submitting by remember { mutableStateOf(false) }
    var result by remember { mutableStateOf<String?>(null) }
    var isError by remember { mutableStateOf(false) }

    val canSubmit = (targetUniversityId.isNotBlank() || targetYear.isNotBlank()) && reason.trim().length >= 12 && !submitting

    Column(verticalArrangement = Arrangement.spacedBy(10.dp)) {
        SectionTitle("Account")
        Text("Currently: ${profile.universityId ?: "—"} · ${profile.year ?: "—"}", style = MaterialTheme.typography.bodyMedium)
        Text(
            "University and year changes need administrator approval. Fill in whichever you want to change, and a reason of at least 12 characters.",
            style = MaterialTheme.typography.bodySmall,
        )
        OutlinedTextField(
            value = targetUniversityId,
            onValueChange = { targetUniversityId = it; result = null },
            label = { Text("Target university ID (leave blank to keep current)") },
            singleLine = true,
            modifier = Modifier.fillMaxWidth(),
        )
        OutlinedTextField(
            value = targetYear,
            onValueChange = { targetYear = it; result = null },
            label = { Text("Target year (leave blank to keep current)") },
            singleLine = true,
            modifier = Modifier.fillMaxWidth(),
        )
        OutlinedTextField(
            value = reason,
            onValueChange = { reason = it; result = null },
            label = { Text("Reason (at least 12 characters)") },
            modifier = Modifier.fillMaxWidth(),
        )
        Button(
            enabled = canSubmit,
            onClick = {
                submitting = true
                val requests = buildList {
                    if (targetUniversityId.isNotBlank()) add("university" to targetUniversityId.trim())
                    if (targetYear.isNotBlank()) add("year" to targetYear.trim())
                }
                submitSequentially(viewModel, requests, reason.trim()) { failures ->
                    submitting = false
                    isError = failures.isNotEmpty()
                    result = if (failures.isEmpty()) {
                        targetUniversityId = ""; targetYear = ""; reason = ""
                        "Request sent for admin review."
                    } else {
                        "One or more requests could not be sent. Check your connection and try again."
                    }
                }
            },
        ) { Text(if (submitting) "Sending…" else "Submit change request") }
        result?.let { Text(it, color = if (isError) MaterialTheme.colorScheme.error else MaterialTheme.colorScheme.primary, style = MaterialTheme.typography.bodySmall) }
    }
}

/** Fires each `(field, requestedValue)` in [requests] against `requestEnrollmentChange` in turn, so one field's failure doesn't stop the other's request -- the same tolerance `src/pages/student/Account.tsx`'s `Promise.allSettled` gives the web form. */
private fun submitSequentially(
    viewModel: SettingsViewModel,
    requests: List<Pair<String, String>>,
    reason: String,
    onDone: (failures: List<String>) -> Unit,
) {
    if (requests.isEmpty()) return
    val failures = mutableListOf<String>()
    var remaining = requests.size
    requests.forEach { (field, value) ->
        viewModel.requestEnrollmentChange(field, value, reason) { result ->
            result.onFailure { failures += field }
            remaining -= 1
            if (remaining == 0) onDone(failures)
        }
    }
}

// --- 4. Help -----------------------------------------------------------------

@Composable
private fun HelpSection(tickets: SupportListState, viewModel: SettingsViewModel) {
    val context = LocalContext.current
    var subject by remember { mutableStateOf("") }
    var message by remember { mutableStateOf("") }
    var sending by remember { mutableStateOf(false) }
    var sendResult by remember { mutableStateOf<String?>(null) }

    Column(verticalArrangement = Arrangement.spacedBy(10.dp)) {
        SectionTitle("Help")

        // ponytail: opens nishany.com/help even though that page doesn't
        // exist on the web yet -- the affordance is real once it ships;
        // swap for an in-app walkthrough instead if that ends up preferred.
        OutlinedButton(onClick = { openUrl(context, TUTORIALS_URL) }, modifier = Modifier.fillMaxWidth()) {
            Text("App tutorials")
        }

        Text("Contact us", style = MaterialTheme.typography.bodyMedium)
        Text(SUPPORT_EMAIL, style = MaterialTheme.typography.bodySmall)
        OutlinedButton(
            onClick = {
                val intent = Intent(Intent.ACTION_SENDTO).apply {
                    data = Uri.parse("mailto:$SUPPORT_EMAIL")
                    putExtra(Intent.EXTRA_SUBJECT, "Nishany support")
                }
                context.startActivity(intent)
            },
            modifier = Modifier.fillMaxWidth(),
        ) { Text("Email $SUPPORT_EMAIL") }

        OutlinedTextField(
            value = subject,
            onValueChange = { subject = it },
            label = { Text("Subject (optional)") },
            singleLine = true,
            modifier = Modifier.fillMaxWidth(),
        )
        OutlinedTextField(
            value = message,
            onValueChange = { message = it },
            label = { Text("Message") },
            modifier = Modifier.fillMaxWidth(),
        )
        Button(
            enabled = message.trim().isNotEmpty() && !sending,
            onClick = {
                sending = true
                viewModel.submitSupport(subject.trim().ifEmpty { null }, message.trim()) { result ->
                    sending = false
                    result.onSuccess {
                        sendResult = "Sent. We'll reply by email."
                        subject = ""; message = ""
                    }
                    result.onFailure { sendResult = "That could not be sent. Check your connection and try again." }
                }
            },
        ) { Text(if (sending) "Sending…" else "Send message") }
        sendResult?.let { Text(it, style = MaterialTheme.typography.bodySmall) }

        Text("Your messages", style = MaterialTheme.typography.bodyMedium)
        SupportTicketList(tickets)
    }
}

@Composable
private fun SupportTicketList(state: SupportListState) {
    when (state) {
        SupportListState.Loading -> CircularProgressIndicator(modifier = Modifier.padding(8.dp))
        SupportListState.Empty -> Text("No messages yet.", style = MaterialTheme.typography.bodySmall)
        is SupportListState.ConnectionDropped -> Text(state.message, style = MaterialTheme.typography.bodySmall)
        is SupportListState.Loaded -> Column(verticalArrangement = Arrangement.spacedBy(6.dp)) {
            state.tickets.forEach { ticket -> SupportTicketRow(ticket) }
        }
    }
}

@Composable
private fun SupportTicketRow(ticket: SupportTicket) {
    Column {
        Text(ticket.subject?.takeIf { it.isNotBlank() } ?: "(no subject)", style = MaterialTheme.typography.bodyMedium, fontWeight = FontWeight.Medium)
        Text(ticket.message, style = MaterialTheme.typography.bodySmall)
        ticket.status?.let { Text(it, style = MaterialTheme.typography.labelSmall) }
    }
}

// --- 4b. Billing (parity item G6) ---------------------------------------------

/** A single row into [com.synapse.android.feature.billing.BillingScreen] -- plan status, pricing, and vouchers live on that pushed screen, not inline here, matching iOS's own "More -> Billing" link. */
@Composable
private fun BillingSection(onOpenBilling: () -> Unit) {
    Column(verticalArrangement = Arrangement.spacedBy(6.dp)) {
        SectionTitle("Billing")
        OutlinedButton(onClick = onOpenBilling, modifier = Modifier.fillMaxWidth()) {
            Text("Your plan & vouchers")
        }
    }
}

// --- 5. About / legal ---------------------------------------------------------

@Composable
private fun AboutSection(
    onOpenTerms: () -> Unit,
    onOpenPrivacy: () -> Unit,
    onOpenAccessibility: () -> Unit,
    onOpenAiDisclaimer: () -> Unit,
) {
    Column(verticalArrangement = Arrangement.spacedBy(6.dp)) {
        SectionTitle("About")
        TextButton(onClick = onOpenTerms) { Text("Terms") }
        TextButton(onClick = onOpenPrivacy) { Text("Privacy") }
        TextButton(onClick = onOpenAccessibility) { Text("Accessibility statement") }
        TextButton(onClick = onOpenAiDisclaimer) { Text("AI in Nishany") }
        Text("Version ${BuildConfig.VERSION_NAME}", style = MaterialTheme.typography.bodySmall)
    }
}

// --- 6 & 7. Sign out, delete account ------------------------------------------

@Composable
private fun SignOutSection(onSignOut: suspend () -> Unit) {
    val scope = rememberCoroutineScope()
    Button(onClick = { scope.launch { onSignOut() } }, modifier = Modifier.fillMaxWidth()) {
        Text("Sign out")
    }
}

@Composable
private fun DeleteSection(onDelete: () -> Unit) {
    Column(verticalArrangement = Arrangement.spacedBy(4.dp)) {
        TextButton(onClick = onDelete) {
            Text("Delete account", color = MaterialTheme.colorScheme.error)
        }
        Text(
            "Removes your account and everything in it, on the app and the website. This cannot be undone.",
            style = MaterialTheme.typography.labelSmall,
        )
    }
}

private fun openUrl(context: android.content.Context, url: String) {
    context.startActivity(Intent(Intent.ACTION_VIEW, Uri.parse(url)))
}

private const val SUPPORT_EMAIL = "help@nishany.com"
private const val TERMS_URL = "https://nishany.com/terms"
private const val PRIVACY_URL = "https://nishany.com/privacy"
private const val TUTORIALS_URL = "https://nishany.com/help"
