package com.nishany.android.feature.calendar

import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.AlertDialog
import androidx.compose.material3.Card
import androidx.compose.material3.Checkbox
import androidx.compose.material3.FloatingActionButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.semantics.contentDescription
import androidx.compose.ui.semantics.semantics
import androidx.compose.ui.text.style.TextDecoration
import androidx.compose.ui.unit.dp
import com.nishany.android.core.calendar.AgendaItem
import com.nishany.android.core.calendar.blockLabel
import com.nishany.android.core.ui.StateHost
import com.nishany.android.design.LocalCortex
import java.time.format.DateTimeFormatter

private val DAY_FORMAT: DateTimeFormatter = DateTimeFormatter.ofPattern("EEE, MMM d")
private val TIME_FORMAT: DateTimeFormatter = DateTimeFormatter.ofPattern("h:mm a")

/**
 * The Calendar (parity item G9): the published timetable and the student's
 * own tasks, one agenda -- see [CalendarViewModel]'s class doc for what this
 * combines and the one thing it does not (university/year scoping).
 */
@Composable
fun CalendarScreen(viewModel: CalendarViewModel, onBack: () -> Unit) {
    val uiState by viewModel.uiState.collectAsState()
    val saveFailed by viewModel.saveFailed.collectAsState()
    var adding by remember { mutableStateOf(false) }
    val cortex = LocalCortex.current

    Box(modifier = Modifier.fillMaxSize()) {
        Column(modifier = Modifier.fillMaxSize().padding(24.dp)) {
            Row(modifier = Modifier.fillMaxWidth(), verticalAlignment = Alignment.CenterVertically) {
                Text("Calendar", style = MaterialTheme.typography.headlineSmall, modifier = Modifier.weight(1f))
                TextButton(onClick = onBack) { Text("Back") }
            }

            StateHost(state = uiState, modifier = Modifier.weight(1f).padding(top = 12.dp)) { ui ->
                LazyColumn(verticalArrangement = Arrangement.spacedBy(10.dp)) {
                    if (ui.unscheduled.isNotEmpty()) {
                        item { Text("Unscheduled", style = MaterialTheme.typography.labelLarge, color = cortex.ink3) }
                        items(ui.unscheduled, key = { "task-${it.task.id}" }) { entry ->
                            TaskRow(entry.task, onToggle = { viewModel.toggleTask(entry.task.id) }, onRemove = { viewModel.removeTask(entry.task.id) })
                        }
                    }
                    if (ui.agenda.isNotEmpty()) {
                        item { Text("Agenda", style = MaterialTheme.typography.labelLarge, color = cortex.ink3, modifier = Modifier.padding(top = 8.dp)) }
                        items(ui.agenda, key = { agendaKey(it) }) { item ->
                            AgendaRow(
                                item = item,
                                onToggle = (item as? AgendaItem.TaskEntry)?.let { { viewModel.toggleTask(it.task.id) } },
                                onRemove = (item as? AgendaItem.TaskEntry)?.let { { viewModel.removeTask(it.task.id) } },
                            )
                        }
                    }
                    item { Box(modifier = Modifier.height(72.dp)) }
                }
            }
        }

        FloatingActionButton(
            onClick = { adding = true },
            containerColor = cortex.primary,
            contentColor = cortex.onPrimary,
            modifier = Modifier.align(Alignment.BottomEnd).padding(24.dp).semantics { contentDescription = "New task" },
        ) {
            Text("+", style = MaterialTheme.typography.headlineSmall)
        }
    }

    if (adding) {
        AddTaskDialog(
            onDismiss = { adding = false },
            onSave = { title, date -> viewModel.addTask(title, date); adding = false },
        )
    }

    if (saveFailed) {
        AlertDialog(
            onDismissRequest = viewModel::acknowledgeSaveFailure,
            confirmButton = { TextButton(onClick = viewModel::acknowledgeSaveFailure) { Text("OK") } },
            title = { Text("Couldn't save") },
            text = { Text("That change to your calendar wasn't saved. Try again.") },
        )
    }
}

private fun agendaKey(item: AgendaItem): String = when (item) {
    is AgendaItem.Schedule -> "sched-${item.block.id}"
    is AgendaItem.TaskEntry -> "task-${item.task.id}"
}

@Composable
private fun AgendaRow(item: AgendaItem, onToggle: (() -> Unit)?, onRemove: (() -> Unit)?) {
    when (item) {
        is AgendaItem.Schedule -> ScheduleRow(item)
        is AgendaItem.TaskEntry -> TaskRow(item.task, onToggle = onToggle, onRemove = onRemove)
    }
}

@Composable
private fun ScheduleRow(item: AgendaItem.Schedule) {
    val cortex = LocalCortex.current
    Card(modifier = Modifier.fillMaxWidth().clip(RoundedCornerShape(14.dp))) {
        Column(modifier = Modifier.padding(14.dp)) {
            Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween) {
                Text(blockLabel(item.block.type), style = MaterialTheme.typography.labelSmall, color = if (item.isExam) cortex.danger else cortex.ink3)
                Text(item.start.format(DAY_FORMAT) + " · " + item.start.format(TIME_FORMAT), style = MaterialTheme.typography.labelSmall, color = cortex.ink3)
            }
            Text(item.block.title, style = MaterialTheme.typography.titleSmall, color = cortex.ink, modifier = Modifier.padding(top = 4.dp))
            if (item.block.location.isNotBlank()) {
                Text(item.block.location, style = MaterialTheme.typography.bodySmall, color = cortex.ink2)
            }
        }
    }
}

@Composable
private fun TaskRow(task: com.nishany.android.core.calendar.Task, onToggle: (() -> Unit)?, onRemove: (() -> Unit)?) {
    val cortex = LocalCortex.current
    Card(modifier = Modifier.fillMaxWidth().clip(RoundedCornerShape(14.dp))) {
        Row(modifier = Modifier.padding(10.dp), verticalAlignment = Alignment.CenterVertically) {
            Checkbox(
                checked = task.done,
                onCheckedChange = { onToggle?.invoke() },
                modifier = Modifier.semantics { contentDescription = if (task.done) "Mark not done" else "Mark done" },
            )
            Text(
                task.title,
                style = MaterialTheme.typography.bodyMedium,
                color = if (task.done) cortex.ink3 else cortex.ink,
                textDecoration = if (task.done) TextDecoration.LineThrough else null,
                modifier = Modifier.weight(1f),
            )
            if (onRemove != null) {
                Box(
                    modifier = Modifier
                        .size(48.dp)
                        .clickable(onClick = onRemove)
                        .semantics { contentDescription = "Delete task: ${task.title}" },
                    contentAlignment = Alignment.Center,
                ) {
                    Text("×", style = MaterialTheme.typography.titleLarge, color = cortex.ink3)
                }
            }
        }
    }
}

@Composable
private fun AddTaskDialog(onDismiss: () -> Unit, onSave: (String, String?) -> Unit) {
    var title by remember { mutableStateOf("") }
    var date by remember { mutableStateOf("") }

    AlertDialog(
        onDismissRequest = onDismiss,
        title = { Text("New task") },
        text = {
            Column(verticalArrangement = Arrangement.spacedBy(10.dp)) {
                OutlinedTextField(value = title, onValueChange = { title = it }, label = { Text("Task") }, singleLine = true, modifier = Modifier.fillMaxWidth())
                OutlinedTextField(
                    value = date,
                    onValueChange = { date = it },
                    label = { Text("Date (YYYY-MM-DD, optional)") },
                    singleLine = true,
                    modifier = Modifier.fillMaxWidth(),
                )
            }
        },
        confirmButton = {
            TextButton(onClick = { onSave(title, date.trim().ifBlank { null }) }, enabled = title.isNotBlank()) { Text("Add") }
        },
        dismissButton = { TextButton(onClick = onDismiss) { Text("Cancel") } },
    )
}
