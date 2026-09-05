package com.synapse.android.core.adaptive

import com.synapse.android.core.calendar.flattenPublishedSchedule
import java.time.LocalDate
import java.time.temporal.ChronoUnit

/** The next exam on the published timetable, and how far away it is. */
data class NextExam(val daysAway: Int, val title: String)

/**
 * Days until the student's next exam, from the published module timetable.
 *
 * Adaptive Study divides every block by the exam horizon, so this figure has to
 * be a real one -- an invented countdown would change how the whole screen is
 * shaped. Null is a genuine answer (no exam published), and the one that must
 * not be papered over.
 *
 * Reuses [flattenPublishedSchedule], so it inherits that function's known
 * limitation: Android has no student academic-identity model yet, so this is
 * the next exam across *every* published module, not the student's own cohort.
 * ponytail: acceptable until a university/year profile lands; upgrade path is
 * the same moduleKey join the web/iOS use.
 */
object AdaptiveExam {

    fun next(scheduleJson: String?, today: LocalDate = LocalDate.now()): NextExam? {
        if (scheduleJson.isNullOrBlank()) return null
        val exam = flattenPublishedSchedule(scheduleJson)
            .filter { it.isExam && !it.start.toLocalDate().isBefore(today) }
            .minByOrNull { it.start }
            ?: return null
        val days = ChronoUnit.DAYS.between(today, exam.start.toLocalDate()).toInt()
        return NextExam(daysAway = days, title = exam.title)
    }
}
