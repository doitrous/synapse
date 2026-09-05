package com.nishany.android.core.rooms

import android.Manifest
import android.content.Context
import android.content.pm.PackageManager
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
 * The microphone permission, primed the same way notifications are in
 * `core/notifications/NotificationPermission.kt`: check → a one-line rationale
 * dialog → the system prompt → update state. RECORD_AUDIO is a runtime grant on
 * every supported API level (minSdk 26), so unlike notifications there is no
 * "nothing to grant" fast path.
 */
fun Context.hasMicPermission(): Boolean =
    ContextCompat.checkSelfPermission(this, Manifest.permission.RECORD_AUDIO) == PackageManager.PERMISSION_GRANTED

/** The bare system prompt. Show [MicRationaleDialog] immediately before it. */
@Composable
fun rememberMicPermissionRequester(onResult: (granted: Boolean) -> Unit): () -> Unit {
    val launcher = rememberLauncherForActivityResult(ActivityResultContracts.RequestPermission(), onResult)
    return { launcher.launch(Manifest.permission.RECORD_AUDIO) }
}

/** The one-line rationale shown as its own step before the system dialog. */
@Composable
fun MicRationaleDialog(onConfirm: () -> Unit, onDismiss: () -> Unit) {
    AlertDialog(
        onDismissRequest = onDismiss,
        title = { Text("Join with your microphone") },
        text = {
            Column {
                Text("To talk in the study room, Nishany needs to use your microphone.")
                Spacer(modifier = Modifier.height(8.dp))
                Text("Android will ask you to confirm next.", style = MaterialTheme.typography.bodySmall)
            }
        },
        confirmButton = { TextButton(onClick = onConfirm) { Text("Continue") } },
        dismissButton = { TextButton(onClick = onDismiss) { Text("Not now") } },
    )
}

/** [hasMicPermission], read once for a composable's initial state (not observable). */
@Composable
fun rememberHasMicPermission(): Boolean = LocalContext.current.hasMicPermission()
