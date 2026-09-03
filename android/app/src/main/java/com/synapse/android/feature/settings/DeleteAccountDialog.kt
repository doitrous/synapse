package com.synapse.android.feature.settings

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.material3.AlertDialog
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.rememberCoroutineScope
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import kotlinx.coroutines.launch

/**
 * Deleting an account, from inside the app -- required by Play's Data safety
 * / account-deletion policy the same way App Store guideline 5.1.1(v)
 * required [ios/Synapse/Features/Root/DeleteAccountView.swift], and written
 * on the same assumption: the student means it but may not have understood
 * it, so the consequence is stated before the destructive control exists at
 * all, and typing the word is the difference between reading the warning and
 * having read it -- not a security measure.
 *
 * There is no grace period and no way back, and this dialog does not pretend
 * otherwise.
 */
@Composable
fun DeleteAccountDialog(onDelete: suspend () -> Unit, onDismiss: () -> Unit) {
    var typed by remember { mutableStateOf("") }
    var isDeleting by remember { mutableStateOf(false) }
    var failure by remember { mutableStateOf<String?>(null) }
    val scope = rememberCoroutineScope()

    val canDelete = typed.trim().uppercase() == CONFIRMATION && !isDeleting

    AlertDialog(
        onDismissRequest = { if (!isDeleting) onDismiss() },
        title = { Text("Delete account") },
        text = {
            Column(verticalArrangement = Arrangement.spacedBy(12.dp)) {
                Text("This cannot be undone.", style = MaterialTheme.typography.titleSmall)
                Text(
                    "Deleting your account removes your notes, highlights and annotations, your whiteboards, your study plan, and your whole answer history. Support cannot recover any of it afterwards.",
                    style = MaterialTheme.typography.bodyMedium,
                )
                Text(
                    "Your account on the website is the same account, so it is deleted too.",
                    style = MaterialTheme.typography.bodyMedium,
                )
                OutlinedTextField(
                    value = typed,
                    onValueChange = { typed = it; failure = null },
                    label = { Text("Type DELETE to confirm") },
                    singleLine = true,
                    enabled = !isDeleting,
                    modifier = Modifier.fillMaxWidth(),
                )
                failure?.let { Text(it, color = MaterialTheme.colorScheme.error, style = MaterialTheme.typography.bodySmall) }
            }
        },
        confirmButton = {
            TextButton(
                enabled = canDelete,
                onClick = {
                    isDeleting = true
                    failure = null
                    scope.launch {
                        try {
                            onDelete()
                        } catch (e: Exception) {
                            // Nothing was deleted -- the server does the whole thing in one
                            // transaction -- so saying "try again" is honest rather than hopeful.
                            failure = "Your account was not deleted. Nothing has been removed. Please check your connection and try again."
                        } finally {
                            isDeleting = false
                        }
                    }
                },
            ) { Text(if (isDeleting) "Deleting…" else "Delete my account") }
        },
        dismissButton = {
            TextButton(enabled = !isDeleting, onClick = onDismiss) { Text("Cancel") }
        },
    )
}

private const val CONFIRMATION = "DELETE"
