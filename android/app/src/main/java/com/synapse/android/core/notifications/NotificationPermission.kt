package com.synapse.android.core.notifications

import android.Manifest
import android.content.Context
import android.content.pm.PackageManager
import android.os.Build
import androidx.activity.compose.rememberLauncherForActivityResult
import androidx.activity.result.contract.ActivityResultContracts
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.height
import androidx.compose.material3.AlertDialog
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.unit.dp
import androidx.core.content.ContextCompat

/**
 * Whether this process may post a notification right now.
 *
 * Below API 33 there is no runtime grant to check -- the manifest permission
 * alone is enough -- so this reads `true` there without touching
 * [ContextCompat.checkSelfPermission] at all, the same as the OS treats it.
 */
fun Context.hasNotificationPermission(): Boolean {
    if (Build.VERSION.SDK_INT < Build.VERSION_CODES.TIRAMISU) return true
    return ContextCompat.checkSelfPermission(this, Manifest.permission.POST_NOTIFICATIONS) ==
        PackageManager.PERMISSION_GRANTED
}

/**
 * The bare system prompt, with no rationale of its own -- see
 * [NotificationRationaleDialog] for the one-liner shown immediately before
 * it, per this task's brief. Calling the returned lambda on API < 33 reports
 * [onResult]`(true)` at once and never shows a system dialog: there is
 * nothing to grant there.
 */
@Composable
fun rememberNotificationPermissionRequester(onResult: (granted: Boolean) -> Unit): () -> Unit {
    val launcher = rememberLauncherForActivityResult(ActivityResultContracts.RequestPermission(), onResult)
    return {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
            launcher.launch(Manifest.permission.POST_NOTIFICATIONS)
        } else {
            onResult(true)
        }
    }
}

/**
 * The one-line rationale this task's brief requires immediately before the
 * system prompt -- shown as its own step, not folded into the system
 * dialog's copy, which this app does not control.
 */
@Composable
fun NotificationRationaleDialog(onConfirm: () -> Unit, onDismiss: () -> Unit) {
    AlertDialog(
        onDismissRequest = onDismiss,
        title = { Text("Enable reminders") },
        text = {
            Column {
                Text("Nishany can remind you when a review is due or a study block is about to start.")
                Spacer(modifier = Modifier.height(8.dp))
                Text("Android will ask you to confirm next.", style = MaterialTheme.typography.bodySmall)
            }
        },
        confirmButton = { TextButton(onClick = onConfirm) { Text("Continue") } },
        dismissButton = { TextButton(onClick = onDismiss) { Text("Not now") } },
    )
}

/**
 * [hasNotificationPermission], read once for a composable's initial state.
 *
 * Not itself observable -- a grant happens inside the system dialog, off
 * this process's own state, so nothing here recomposes when it changes.
 * Callers hold the result in their own `mutableStateOf` and update it from
 * [rememberNotificationPermissionRequester]'s `onResult`, the way
 * `SettingsScreen`'s reminders row does.
 */
@Composable
fun rememberHasNotificationPermission(): Boolean = LocalContext.current.hasNotificationPermission()
