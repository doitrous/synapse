package com.synapse.app.core.calendar

import kotlinx.serialization.Serializable
import java.time.LocalDate
import java.time.LocalDateTime
import java.time.LocalTime

/**
 * One published block on a module's timetable, off the shared
 * `synapse-module-schedules-v1` catalogue doc.
 *
 * Reduced from web's full `ModuleScheduleBlock` (`src/data/moduleSchedule.ts`)
 * to what a student's calendar shows: no admin-authoring fields (content
 * links, provenance, carry-forward, automatic-question wiring, exam mark
 * splits/reminders). All fields default so one malformed block in the
 * catalogue decodes as "mostly blank" instead of failing the whole array —
 * [flattenModuleSchedule] then drops it for having no usable date.
 */
@Serializable
data class ModuleScheduleBlockDto(
    val id: String = "",
    val type: String = "lecture",
    val title: String = "",
    /** `YYYY-MM-DD`. */
    val date: String = "",
    /** `HH:MM`, local. */
    val startTime: String = "",
    /** `HH:MM`, local. Blank for an untimed block (e.g. a logbook task). */
    val endTime: String = "",
    val location: String = "",
    val moduleNumber: String = "",
    val completed: Boolean = false,
)

/** The catalogue doc's shape: `moduleKey(...) -> that module's published blocks`. */
typealias ModuleScheduleStore = Map<String, List<ModuleScheduleBlockDto>>

/** A course on the student's year, as much as [flattenModuleSchedule] needs to know about it. */
data class CalendarCourse(val id: String, val name: String)

private val EXAM_TYPES = setOf("midterm", "midyear", "term", "final")

private val TYPE_LABELS = mapOf(
    "lecture" to "Lecture",
    "practical" to "Practical session",
    "review" to "Review session",
    "midterm" to "Mid-term exam",
    "midyear" to "Mid-year exam",
    "term" to "Term exam",
    "final" to "Final exam",
    "logbook" to "Logbook task",
)

/** A block on the student's timetable, with the module it belongs to attached. Port of web's `ScheduledSession` (`src/lib/studentSchedule.ts`). */
data class CurriculumSession(
    val block: ModuleScheduleBlockDto,
    val courseId: String,
    val courseName: String,
    val start: LocalDateTime,
    /** Null for a logbook task, which is a deadline rather than a sitting. */
    val end: LocalDateTime?,
    val label: String,
    val isExam: Boolean,
)

/** The one place a per-module storage key is built. Port of web's `moduleKey` (`src/data/moduleSubjects.ts`). */
fun moduleKey(universityId: String, yearIdOrLabel: String, courseId: String): String =
    "$universityId:$yearIdOrLabel:$courseId"

/** `YYYY-MM-DD` and `HH:MM` as a local [LocalDateTime] — never as UTC/epoch, which shifts the day. Null when [date] is unusable, so the block is dropped rather than placed at the epoch. */
private fun localDateTime(date: String, time: String): LocalDateTime? {
    val localDate = runCatching { LocalDate.parse(date) }.getOrNull() ?: return null
    val localTime = time.ifBlank { "00:00" }.let { runCatching { LocalTime.parse(it) }.getOrDefault(LocalTime.MIDNIGHT) }
    return LocalDateTime.of(localDate, localTime)
}

/**
 * The student's own timetable, as their university published it, flattened
 * across every module in their year into one time-ordered list. Port of
 * web's `flattenSchedule` (`src/lib/studentSchedule.ts`), including its
 * label-then-id key fallback (schedules published before years grew stable
 * IDs are still keyed by the year's label; the ID wins when both exist).
 *
 * Empty until [store] actually has something published for [courses] under
 * [universityId]/[yearId] (or [yearLabel]) — which is the honest state; there
 * is no generated fallback here (see `Calendar.tsx`'s doc comment on why the
 * old generated calendar had to go).
 *
 * **Not yet wired to a real caller.** Android has no confirmed source for
 * which university/year the signed-in student belongs to (see
 * `feature/calendar/CalendarRepository.kt`'s `curriculumSessions` doc
 * comment for the same gap `feature/adaptive/AdaptiveRepository.kt` already
 * documents). This function is ready the day that identity lands: call it
 * with the real ids and course list.
 */
fun flattenModuleSchedule(
    universityId: String,
    yearId: String,
    yearLabel: String,
    courses: List<CalendarCourse>,
    store: ModuleScheduleStore,
): List<CurriculumSession> {
    val sessions = mutableListOf<CurriculumSession>()
    for (course in courses) {
        val blocks = store[moduleKey(universityId, yearId, course.id)]
            ?: store[moduleKey(universityId, yearLabel, course.id)]
            ?: emptyList()
        for (block in blocks) {
            val start = localDateTime(block.date, block.startTime) ?: continue
            sessions += CurriculumSession(
                block = block,
                courseId = course.id,
                courseName = course.name,
                start = start,
                end = block.endTime.takeIf { it.isNotBlank() }?.let { localDateTime(block.date, it) },
                label = TYPE_LABELS[block.type] ?: block.type,
                isExam = block.type in EXAM_TYPES,
            )
        }
    }
    return sessions.sortedBy { it.start }
}
