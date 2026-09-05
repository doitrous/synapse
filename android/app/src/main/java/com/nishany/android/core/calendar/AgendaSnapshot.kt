package com.nishany.android.core.calendar

import com.nishany.android.core.CortexJson
import java.time.LocalDate
import java.time.LocalDateTime
import java.time.LocalTime
import java.time.format.DateTimeFormatter
import kotlinx.serialization.Serializable

/**
 * A tiny, display-only snapshot of the next few agenda entries, written by the
 * app into [com.nishany.android.feature.focus.CalendarWidgetStore] so the
 * home-screen calendar widget can render without opening Room from its own
 * `provideGlance` -- see that store's and
 * [com.nishany.android.feature.focus.FocusCalendarWidget]'s docs for why the
 * widget must not touch the database.
 *
 * Flat and serializable, unlike [AgendaItem]: it carries no `LocalDateTime`
 * and no source object, only the strings the widget shows. It is derived from
 * the exact same inputs [com.nishany.android.feature.calendar.CalendarViewModel]
 * uses -- [flattenPublishedSchedule] over the module timetable and the dated
 * tasks of a [TaskDoc] -- so the widget and the screen never disagree.
 */
@Serializable
data class AgendaSnapshotItem(
    val title: String,
    val whenLabel: String,
    val isExam: Boolean = false,
)

/** How many upcoming entries the widget snapshot holds. A widget shows a handful; more is just wasted prefs. */
const val AGENDA_SNAPSHOT_LIMIT = 5

private val SNAPSHOT_DAY: DateTimeFormatter = DateTimeFormatter.ofPattern("EEE, MMM d")
private val SNAPSHOT_TIME: DateTimeFormatter = DateTimeFormatter.ofPattern("HH:mm")

/**
 * The next [limit] agenda entries on or after [today], oldest-first: published
 * schedule blocks and the student's own dated tasks, merged. A malformed or
 * absent document contributes nothing rather than failing the snapshot -- the
 * same tolerance [flattenPublishedSchedule] and `calendarUiState` already
 * apply. An item with no clock time (midnight) shows only its day.
 */
fun buildAgendaSnapshot(
    scheduleJson: String?,
    tasksJson: String?,
    today: LocalDate,
    limit: Int = AGENDA_SNAPSHOT_LIMIT,
): List<AgendaSnapshotItem> {
    val schedule = scheduleJson
        ?.let { runCatching { flattenPublishedSchedule(it) }.getOrDefault(emptyList()) }
        .orEmpty()
    val tasks = tasksJson
        ?.let { runCatching { CortexJson.decodeFromString(TaskDoc.serializer(), it) }.getOrNull() }
        ?.tasks.orEmpty()
        .mapNotNull { task -> taskStart(task)?.let { AgendaItem.TaskEntry(task, it) } }

    return (schedule + tasks)
        .filter { !it.start.toLocalDate().isBefore(today) }
        .sortedBy { it.start }
        .take(limit)
        .map { item ->
            AgendaSnapshotItem(
                title = item.title,
                whenLabel = whenLabel(item.start, today),
                isExam = item is AgendaItem.Schedule && item.isExam,
            )
        }
}

/** `YYYY-MM-DD` (+ optional `HH:MM`), or null for an absent/blank/malformed date -- mirrors `calendarUiState`'s own `parseTaskStart`. */
private fun taskStart(task: Task): LocalDateTime? {
    val date = task.date?.ifBlank { null } ?: return null
    return runCatching {
        val day = LocalDate.parse(date)
        val time = task.time?.let { runCatching { LocalTime.parse(it) }.getOrNull() } ?: LocalTime.MIDNIGHT
        LocalDateTime.of(day, time)
    }.getOrNull()
}

private fun whenLabel(start: LocalDateTime, today: LocalDate): String {
    val day = if (start.toLocalDate() == today) "Today" else start.format(SNAPSHOT_DAY)
    return if (start.toLocalTime() == LocalTime.MIDNIGHT) day else "$day · ${start.format(SNAPSHOT_TIME)}"
}
