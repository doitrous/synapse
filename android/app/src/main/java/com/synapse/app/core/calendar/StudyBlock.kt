package com.synapse.app.core.calendar

import kotlinx.serialization.Serializable

/**
 * The student's own plan, as distinct from their university's timetable.
 *
 * A direct port of web's `src/data/studyBlocks.ts` `StudyBlock` — same key
 * (`synapse.calendar.blocks`, a per-user document — see
 * `core/sync/StateOwnership.kt`'s `synapse\.calendar\.blocks$` pattern and
 * `core/sync/UserStateKeys.kt`), same field names, so a block created on one
 * client edits cleanly on another.
 */
@Serializable
data class StudyBlock(
    val id: String,
    val title: String,
    /** Local calendar date, `YYYY-MM-DD`. */
    val date: String,
    /** `HH:MM`, local. */
    val start: String,
    /** `HH:MM`, local. */
    val end: String,
    val subjectId: String = "",
    /** The module this block belongs to, e.g. `"CVS 01"` — optional. */
    val moduleId: String? = null,
    val kind: String = "Study block",
    /** Set when the student ticks it off. */
    val done: Boolean = false,
    /** The timetable session this was planned from, when it was added from one. */
    val sourceSessionId: String? = null,
)

/** Minutes between two `HH:MM` values, floored at zero. Port of `durationMinutes` (`src/data/studyBlocks.ts`). */
fun durationMinutes(start: String, end: String): Int {
    val (startHour, startMinute) = start.toHourMinute()
    val (endHour, endMinute) = end.toHourMinute()
    return maxOf(0, (endHour * 60 + endMinute) - (startHour * 60 + startMinute))
}

private fun String.toHourMinute(): Pair<Int, Int> {
    val parts = split(":")
    val hour = parts.getOrNull(0)?.toIntOrNull() ?: 0
    val minute = parts.getOrNull(1)?.toIntOrNull() ?: 0
    return hour to minute
}
