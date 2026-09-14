package com.synapse.app.core.calendar

import java.time.LocalDate

/** Which layer of the calendar an event belongs to. Port of web's `Layer` (`src/data/calendar.ts`). */
enum class CalendarLayer { CURRICULUM, PERSONAL }

/**
 * One shape for anything that appears on the student's calendar, whether it
 * came off the published timetable or was planned by the student themself.
 * Port of web's `CalEvent` (`src/data/calendar.ts`).
 */
data class CalendarEvent(
    val id: String,
    val title: String,
    val date: LocalDate,
    /** `HH:MM`, local. */
    val time: String,
    /** `HH:MM` end, when the source has one. */
    val endTime: String? = null,
    val layer: CalendarLayer,
    val subjectId: String = "",
    val moduleId: String? = null,
    val kind: String,
    val location: String? = null,
    /** True for an exam block, which is worth marking differently. */
    val isExam: Boolean = false,
)

/**
 * A student-planned block, as a calendar event. Null when [StudyBlock.date]
 * isn't a usable `YYYY-MM-DD` — tolerant decode, matching how
 * [flattenModuleSchedule] drops a curriculum block with the same problem: one
 * bad entry never crashes the whole calendar.
 */
fun StudyBlock.toCalendarEvent(): CalendarEvent? {
    val localDate = runCatching { LocalDate.parse(date) }.getOrNull() ?: return null
    return CalendarEvent(
        id = id,
        title = title,
        date = localDate,
        time = start,
        endTime = end.ifBlank { null },
        layer = CalendarLayer.PERSONAL,
        subjectId = subjectId,
        moduleId = moduleId,
        kind = kind,
    )
}

/** A published timetable block, as a calendar event. Port of web's `sessionEvent` (`src/pages/student/Calendar.tsx`). */
fun CurriculumSession.toCalendarEvent(): CalendarEvent = CalendarEvent(
    id = block.id,
    title = block.title.ifBlank { label },
    date = start.toLocalDate(),
    time = "%02d:%02d".format(start.hour, start.minute),
    endTime = end?.let { "%02d:%02d".format(it.hour, it.minute) },
    layer = CalendarLayer.CURRICULUM,
    moduleId = block.moduleNumber.ifBlank { null } ?: courseName,
    kind = label,
    location = block.location.ifBlank { null },
    isExam = isExam,
)
