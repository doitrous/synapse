package com.synapse.app.feature.calendar

import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.widthIn
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowBack
import androidx.compose.material.icons.automirrored.filled.ArrowForward
import androidx.compose.material3.AlertDialog
import androidx.compose.material3.Button
import androidx.compose.material3.Checkbox
import androidx.compose.material3.HorizontalDivider
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.unit.dp
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import com.synapse.app.R
import com.synapse.app.core.calendar.CalendarEvent
import com.synapse.app.core.calendar.CalendarLayer
import com.synapse.app.core.calendar.DEFAULT_WEEK_START
import com.synapse.app.core.calendar.StudyBlock
import com.synapse.app.core.calendar.durationMinutes
import com.synapse.app.core.calendar.weekdayLabels
import java.time.LocalDate
import java.time.format.DateTimeFormatter
import java.time.format.TextStyle
import java.util.Locale

const val CALENDAR_LOADING_TAG = "calendar_loading"
const val CALENDAR_PREV_BUTTON_TAG = "calendar_prev_button"
const val CALENDAR_NEXT_BUTTON_TAG = "calendar_next_button"
const val CALENDAR_TODAY_BUTTON_TAG = "calendar_today_button"
const val CALENDAR_ADD_BUTTON_TAG = "calendar_add_button"
const val CALENDAR_TOGGLE_CURRICULUM_TAG = "calendar_toggle_curriculum"
const val CALENDAR_TOGGLE_PERSONAL_TAG = "calendar_toggle_personal"
fun calendarViewModeTag(mode: CalendarViewMode): String = "calendar_view_${mode.name}"
fun calendarDayCellTag(date: LocalDate): String = "calendar_day_$date"
fun calendarEventTag(eventId: String): String = "calendar_event_$eventId"
const val CALENDAR_DIALOG_TITLE_FIELD_TAG = "calendar_dialog_title_field"
const val CALENDAR_DIALOG_DATE_FIELD_TAG = "calendar_dialog_date_field"
const val CALENDAR_DIALOG_START_FIELD_TAG = "calendar_dialog_start_field"
const val CALENDAR_DIALOG_END_FIELD_TAG = "calendar_dialog_end_field"
const val CALENDAR_DIALOG_SAVE_BUTTON_TAG = "calendar_dialog_save_button"
const val CALENDAR_DIALOG_DELETE_BUTTON_TAG = "calendar_dialog_delete_button"
const val CALENDAR_DIALOG_CANCEL_BUTTON_TAG = "calendar_dialog_cancel_button"

/**
 * The Calendar tab's single public entry point. The shell mounts this
 * directly and it constructs its own [CalendarViewModel] via [hiltViewModel]
 * — no navigation wiring required of the caller. Mirrors `LibraryRoute()`.
 */
@Composable
fun CalendarRoute(viewModel: CalendarViewModel = hiltViewModel()) {
    val uiState by viewModel.uiState.collectAsStateWithLifecycle()
    CalendarScreen(
        uiState = uiState,
        onShift = viewModel::shift,
        onToday = viewModel::goToToday,
        onSetView = viewModel::setView,
        onToggleCurriculum = viewModel::toggleCurriculum,
        onTogglePersonal = viewModel::togglePersonal,
        onSaveBlock = viewModel::saveBlock,
        onDeleteBlock = viewModel::deleteBlock,
    )
}

@Composable
private fun CalendarScreen(
    uiState: CalendarUiState,
    onShift: (Int) -> Unit,
    onToday: () -> Unit,
    onSetView: (CalendarViewMode) -> Unit,
    onToggleCurriculum: () -> Unit,
    onTogglePersonal: () -> Unit,
    onSaveBlock: (StudyBlock) -> Unit,
    onDeleteBlock: (String) -> Unit,
) {
    if (uiState !is CalendarUiState.Content) {
        Column(
            modifier = Modifier.fillMaxSize().testTag(CALENDAR_LOADING_TAG),
            horizontalAlignment = Alignment.CenterHorizontally,
            verticalArrangement = Arrangement.Center,
        ) { Text(stringResource(R.string.calendar_loading)) }
        return
    }

    // Which date the add/edit dialog is open for, and which existing block (if
    // any) it is editing — null date means closed. rememberSaveable would need
    // a custom Saver for a nullable pair of non-primitive types, and a
    // dismissed-on-rotation dialog loses nothing the student can't reopen.
    var dialogDate by remember { mutableStateOf<LocalDate?>(null) }
    var editingBlock by remember { mutableStateOf<StudyBlock?>(null) }
    fun openAdd(date: LocalDate) { editingBlock = null; dialogDate = date }
    fun openEdit(block: StudyBlock) { editingBlock = block; dialogDate = LocalDate.parse(block.date) }
    fun closeDialog() { dialogDate = null; editingBlock = null }

    Column(modifier = Modifier.fillMaxSize().padding(12.dp)) {
        CalendarHeader(
            uiState = uiState,
            onShift = onShift,
            onToday = onToday,
            onSetView = onSetView,
            onToggleCurriculum = onToggleCurriculum,
            onTogglePersonal = onTogglePersonal,
            onAdd = { openAdd(uiState.today) },
        )

        Column(modifier = Modifier.fillMaxSize().padding(top = 12.dp).verticalScroll(rememberScrollState())) {
            if (uiState.view == CalendarViewMode.MONTH) {
                MonthGrid(uiState = uiState, onOpenDay = ::openAdd, onOpenEvent = { openEdit(it) })
            } else {
                WeekList(uiState = uiState, onOpenDay = ::openAdd, onOpenEvent = { openEdit(it) })
            }
        }
    }

    val date = dialogDate
    if (date != null) {
        BlockDialog(
            date = date,
            existing = editingBlock,
            onClose = ::closeDialog,
            onSave = { onSaveBlock(it); closeDialog() },
            onDelete = editingBlock?.let { existing -> { onDeleteBlock(existing.id); closeDialog() } },
        )
    }
}

@Composable
private fun CalendarHeader(
    uiState: CalendarUiState.Content,
    onShift: (Int) -> Unit,
    onToday: () -> Unit,
    onSetView: (CalendarViewMode) -> Unit,
    onToggleCurriculum: () -> Unit,
    onTogglePersonal: () -> Unit,
    onAdd: () -> Unit,
) {
    val title = if (uiState.view == CalendarViewMode.WEEK) {
        val days = uiState.days
        stringResource(
            R.string.calendar_week_range_format,
            days.first().format(DateTimeFormatter.ofPattern("d MMM")),
            days.last().format(DateTimeFormatter.ofPattern("d MMM")),
        )
    } else {
        uiState.anchor.month.getDisplayName(TextStyle.FULL, Locale.getDefault()) + " " + uiState.anchor.year
    }

    Row(verticalAlignment = Alignment.CenterVertically, horizontalArrangement = Arrangement.spacedBy(4.dp)) {
        IconButton(onClick = { onShift(-1) }, modifier = Modifier.testTag(CALENDAR_PREV_BUTTON_TAG)) {
            Icon(Icons.AutoMirrored.Filled.ArrowBack, contentDescription = stringResource(R.string.calendar_previous))
        }
        Text(title, style = MaterialTheme.typography.titleMedium, modifier = Modifier.weight(1f))
        IconButton(onClick = { onShift(1) }, modifier = Modifier.testTag(CALENDAR_NEXT_BUTTON_TAG)) {
            Icon(Icons.AutoMirrored.Filled.ArrowForward, contentDescription = stringResource(R.string.calendar_next))
        }
        TextButton(onClick = onToday, modifier = Modifier.testTag(CALENDAR_TODAY_BUTTON_TAG)) { Text(stringResource(R.string.calendar_today)) }
    }

    Row(verticalAlignment = Alignment.CenterVertically, horizontalArrangement = Arrangement.spacedBy(4.dp), modifier = Modifier.padding(top = 6.dp)) {
        CalendarViewMode.entries.forEach { mode ->
            val selected = uiState.view == mode
            TextButton(onClick = { onSetView(mode) }, modifier = Modifier.testTag(calendarViewModeTag(mode))) {
                Text(stringResource(mode.labelRes), fontWeight = if (selected) androidx.compose.ui.text.font.FontWeight.Bold else null)
            }
        }
        Button(onClick = onAdd, modifier = Modifier.testTag(CALENDAR_ADD_BUTTON_TAG)) { Text(stringResource(R.string.calendar_add_block)) }
    }

    Row(verticalAlignment = Alignment.CenterVertically, modifier = Modifier.padding(top = 4.dp)) {
        Checkbox(checked = uiState.showCurriculum, onCheckedChange = { onToggleCurriculum() }, modifier = Modifier.testTag(CALENDAR_TOGGLE_CURRICULUM_TAG))
        Text(stringResource(R.string.calendar_curriculum), style = MaterialTheme.typography.bodySmall)
        Checkbox(checked = uiState.showPersonal, onCheckedChange = { onTogglePersonal() }, modifier = Modifier.testTag(CALENDAR_TOGGLE_PERSONAL_TAG))
        Text(stringResource(R.string.calendar_personal), style = MaterialTheme.typography.bodySmall)
    }
    HorizontalDivider(modifier = Modifier.padding(top = 8.dp))
}

@Composable
private fun MonthGrid(
    uiState: CalendarUiState.Content,
    onOpenDay: (LocalDate) -> Unit,
    onOpenEvent: (StudyBlock) -> Unit,
) {
    Row(modifier = Modifier.fillMaxWidth()) {
        weekdayLabels(DEFAULT_WEEK_START).forEach { label ->
            Text(label, style = MaterialTheme.typography.labelSmall, modifier = Modifier.weight(1f), textAlign = androidx.compose.ui.text.style.TextAlign.Center)
        }
    }
    uiState.days.chunked(7).forEach { week ->
        Row(modifier = Modifier.fillMaxWidth()) {
            week.forEach { day ->
                DayCell(
                    date = day,
                    inMonth = day.month == uiState.anchor.month,
                    isToday = day == uiState.today,
                    events = uiState.visibleEvents(day),
                    blocks = uiState.blocks,
                    onOpenDay = onOpenDay,
                    onOpenEvent = onOpenEvent,
                    modifier = Modifier.weight(1f),
                )
            }
        }
    }
}

@Composable
private fun DayCell(
    date: LocalDate,
    inMonth: Boolean,
    isToday: Boolean,
    events: List<CalendarEvent>,
    blocks: List<StudyBlock>,
    onOpenDay: (LocalDate) -> Unit,
    onOpenEvent: (StudyBlock) -> Unit,
    modifier: Modifier = Modifier,
) {
    Surface(
        onClick = { onOpenDay(date) },
        modifier = modifier.height(84.dp).padding(1.dp).testTag(calendarDayCellTag(date)),
        tonalElevation = if (isToday) 4.dp else 0.dp,
    ) {
        Column(modifier = Modifier.fillMaxSize().padding(3.dp)) {
            Text(
                date.dayOfMonth.toString(),
                style = MaterialTheme.typography.labelSmall,
                color = if (inMonth) MaterialTheme.colorScheme.onSurface else MaterialTheme.colorScheme.onSurfaceVariant,
            )
            events.take(3).forEach { event ->
                val block = if (event.layer == CalendarLayer.PERSONAL) blocks.firstOrNull { it.id == event.id } else null
                Text(
                    "${event.time} ${event.title}",
                    style = MaterialTheme.typography.labelSmall,
                    maxLines = 1,
                    modifier = Modifier
                        .fillMaxWidth()
                        .testTag(calendarEventTag(event.id))
                        .then(
                            if (block != null) {
                                Modifier.clickable { onOpenEvent(block) }
                            } else {
                                Modifier
                            },
                        ),
                )
            }
            if (events.size > 3) {
                Text(
                    stringResource(R.string.calendar_more_events_format, events.size - 3),
                    style = MaterialTheme.typography.labelSmall,
                )
            }
        }
    }
}

@Composable
private fun WeekList(
    uiState: CalendarUiState.Content,
    onOpenDay: (LocalDate) -> Unit,
    onOpenEvent: (StudyBlock) -> Unit,
) {
    uiState.days.forEach { day ->
        val events = uiState.visibleEvents(day)
        Column(modifier = Modifier.fillMaxWidth().padding(vertical = 6.dp).testTag(calendarDayCellTag(day))) {
            Row(verticalAlignment = Alignment.CenterVertically) {
                Text(
                    day.format(DateTimeFormatter.ofPattern("EEE d MMM")),
                    style = MaterialTheme.typography.titleSmall,
                    modifier = Modifier.weight(1f),
                )
                TextButton(onClick = { onOpenDay(day) }) { Text(stringResource(R.string.calendar_add_short)) }
            }
            if (events.isEmpty()) {
                Text(stringResource(R.string.calendar_nothing_scheduled), style = MaterialTheme.typography.bodySmall)
            } else {
                events.forEach { event ->
                    val block = if (event.layer == CalendarLayer.PERSONAL) uiState.blocks.firstOrNull { it.id == event.id } else null
                    Surface(
                        onClick = { block?.let(onOpenEvent) },
                        modifier = Modifier.fillMaxWidth().padding(vertical = 2.dp).testTag(calendarEventTag(event.id)),
                    ) {
                        Row(modifier = Modifier.fillMaxWidth().padding(6.dp)) {
                            Text(event.time, style = MaterialTheme.typography.bodySmall, modifier = Modifier.widthIn(min = 48.dp))
                            Text(event.title, style = MaterialTheme.typography.bodyMedium, modifier = Modifier.weight(1f))
                            Text(
                                stringResource(
                                    if (event.layer == CalendarLayer.CURRICULUM) R.string.calendar_curriculum else R.string.calendar_personal,
                                ),
                                style = MaterialTheme.typography.labelSmall,
                            )
                        }
                    }
                }
            }
            HorizontalDivider(modifier = Modifier.padding(top = 6.dp))
        }
    }
}

/**
 * Create or change one of the student's own blocks. Port of web's
 * `BlockDialog` (`src/pages/student/Calendar.tsx`), reduced to the fields a
 * first cut needs: no module/subject picker (`Field label={t('Module')}`) —
 * this MVP has no confirmed source for the student's own modules on Android
 * (see `CalendarRepository.curriculumSessions`'s doc comment for the same
 * university/year identity gap), so the field is left off rather than shown
 * with nothing to choose from.
 */
@Composable
private fun BlockDialog(
    date: LocalDate,
    existing: StudyBlock?,
    onClose: () -> Unit,
    onSave: (StudyBlock) -> Unit,
    onDelete: (() -> Unit)?,
) {
    val defaultKind = stringResource(R.string.calendar_kind_default)
    var title by rememberSaveable(existing?.id) { mutableStateOf(existing?.title ?: "") }
    var dateText by rememberSaveable(existing?.id) { mutableStateOf(existing?.date ?: date.toString()) }
    var start by rememberSaveable(existing?.id) { mutableStateOf(existing?.start ?: "17:00") }
    var end by rememberSaveable(existing?.id) { mutableStateOf(existing?.end ?: "18:00") }
    var kind by rememberSaveable(existing?.id) { mutableStateOf(existing?.kind ?: defaultKind) }

    val parsedDate = remember(dateText) { runCatching { LocalDate.parse(dateText) }.getOrNull() }
    val valid = title.isNotBlank() && parsedDate != null && durationMinutes(start, end) > 0

    AlertDialog(
        onDismissRequest = onClose,
        title = { Text(if (existing != null) stringResource(R.string.calendar_dialog_title_edit) else stringResource(R.string.calendar_dialog_title_add)) },
        text = {
            Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
                OutlinedTextField(
                    value = title,
                    onValueChange = { title = it },
                    label = { Text(stringResource(R.string.calendar_field_title_label)) },
                    modifier = Modifier.fillMaxWidth().testTag(CALENDAR_DIALOG_TITLE_FIELD_TAG),
                )
                OutlinedTextField(
                    value = dateText,
                    onValueChange = { dateText = it },
                    label = { Text(stringResource(R.string.calendar_field_date_label)) },
                    isError = parsedDate == null,
                    modifier = Modifier.fillMaxWidth().testTag(CALENDAR_DIALOG_DATE_FIELD_TAG),
                )
                Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                    OutlinedTextField(
                        value = start,
                        onValueChange = { start = it },
                        label = { Text(stringResource(R.string.calendar_field_starts_label)) },
                        modifier = Modifier.weight(1f).testTag(CALENDAR_DIALOG_START_FIELD_TAG),
                    )
                    OutlinedTextField(
                        value = end,
                        onValueChange = { end = it },
                        label = { Text(stringResource(R.string.calendar_field_ends_label)) },
                        isError = durationMinutes(start, end) <= 0,
                        modifier = Modifier.weight(1f).testTag(CALENDAR_DIALOG_END_FIELD_TAG),
                    )
                }
                OutlinedTextField(
                    value = kind,
                    onValueChange = { kind = it },
                    label = { Text(stringResource(R.string.calendar_field_type_label)) },
                    modifier = Modifier.fillMaxWidth(),
                )
            }
        },
        confirmButton = {
            TextButton(
                enabled = valid,
                onClick = {
                    val saved = StudyBlock(
                        id = existing?.id ?: "block-${System.currentTimeMillis()}",
                        title = title.trim(),
                        date = parsedDate.toString(),
                        start = start,
                        end = end,
                        subjectId = existing?.subjectId.orEmpty(),
                        moduleId = existing?.moduleId,
                        kind = kind,
                        done = existing?.done ?: false,
                        sourceSessionId = existing?.sourceSessionId,
                    )
                    onSave(saved)
                },
                modifier = Modifier.testTag(CALENDAR_DIALOG_SAVE_BUTTON_TAG),
            ) { Text(if (existing != null) stringResource(R.string.calendar_dialog_save_changes) else stringResource(R.string.calendar_add_block)) }
        },
        dismissButton = {
            Row {
                if (onDelete != null) {
                    TextButton(onClick = onDelete, modifier = Modifier.testTag(CALENDAR_DIALOG_DELETE_BUTTON_TAG)) { Text(stringResource(R.string.calendar_delete)) }
                }
                TextButton(onClick = onClose, modifier = Modifier.testTag(CALENDAR_DIALOG_CANCEL_BUTTON_TAG)) { Text(stringResource(R.string.calendar_cancel)) }
            }
        },
    )
}
