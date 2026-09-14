package com.synapse.app.core.calendar

import java.time.LocalDate

/**
 * The shape of a calendar, as arithmetic.
 *
 * Which day a week begins on is a real curriculum question, not a formatting
 * detail: this app's students study on a Saturday-to-Friday week, and the
 * week grid and the month grid have to agree about it or the same date lands
 * in two different columns. Direct port of web's `src/lib/calendarGrid.ts` —
 * same test vectors (`CalendarGridTest.kt`), so this client draws the same
 * grid web does.
 *
 * Uses [LocalDate] rather than a JS-style `Date` — immutable, no time-of-day
 * component to accidentally carry along, and `LocalDate.now()`/`plusDays`/
 * equality already cover what web's `addDays`/`sameDay` helpers hand-rolled.
 */

/** `LocalDate.getDayOfWeek()` mapped to JS `Date.getDay()` convention: Sunday is 0. */
typealias WeekStart = Int

val WEEKDAY_LABELS: List<String> = listOf("Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat")

/** Saturday. The academic week these students actually keep. */
const val DEFAULT_WEEK_START: WeekStart = 6

private const val DAYS = 7
private const val MONTH_CELLS = 42

/** [java.time.DayOfWeek] is Monday=1..Sunday=7 (ISO); JS is Sunday=0..Saturday=6. */
private fun LocalDate.jsDayOfWeek(): Int = dayOfWeek.value % 7

/** Midnight (implicit — [LocalDate] carries no time) on the first day of the week containing [date]. */
fun startOfWeek(date: LocalDate, weekStart: WeekStart): LocalDate =
    date.minusDays(((date.jsDayOfWeek() - weekStart + DAYS) % DAYS).toLong())

/** Column headings in the order the grid draws them. */
fun weekdayLabels(weekStart: WeekStart): List<String> =
    (0 until DAYS).map { WEEKDAY_LABELS[(weekStart + it) % DAYS] }

/** The seven days of the week containing [anchor]. */
fun weekDays(anchor: LocalDate, weekStart: WeekStart): List<LocalDate> {
    val first = startOfWeek(anchor, weekStart)
    return (0 until DAYS).map { first.plusDays(it.toLong()) }
}

/**
 * Six weeks of cells covering [anchor]'s month.
 *
 * Always 42 so the grid does not change height from month to month — a
 * shifting calendar makes the page jump under the pointer.
 */
fun monthGrid(anchor: LocalDate, weekStart: WeekStart): List<LocalDate> {
    val firstOfMonth = anchor.withDayOfMonth(1)
    val first = startOfWeek(firstOfMonth, weekStart)
    return (0 until MONTH_CELLS).map { first.plusDays(it.toLong()) }
}
