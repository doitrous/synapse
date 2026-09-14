package com.synapse.app.core.calendar

import org.junit.Assert.assertEquals
import org.junit.Assert.assertTrue
import org.junit.Test
import java.time.LocalDate

/** Ported test vectors from web's `src/lib/calendarGrid.test.ts`, so this client draws the same grid web does. */
class CalendarGridTest {

    /** 14 August 2026 is a Friday. */
    private val friday = LocalDate.of(2026, 8, 14)

    @Test
    fun aSaturdayWeekContainingAFridayStartsOnTheSaturdayBeforeIt() {
        // The regression this guards: a Saturday-first calendar putting Friday at the
        // head of next week instead of the end of this one.
        assertEquals(LocalDate.of(2026, 8, 8), startOfWeek(friday, 6))
    }

    @Test
    fun aSaturdayWeekContainingASaturdayStartsOnThatSaturday() {
        assertEquals(LocalDate.of(2026, 8, 15), startOfWeek(LocalDate.of(2026, 8, 15), 6))
    }

    @Test
    fun mondayAndSundayWeekStartsStillWork() {
        assertEquals(LocalDate.of(2026, 8, 10), startOfWeek(friday, 1))
        assertEquals(LocalDate.of(2026, 8, 9), startOfWeek(friday, 0))
    }

    @Test
    fun columnHeadingsAreRotatedToTheChosenFirstDay() {
        assertEquals(listOf("Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"), weekdayLabels(6))
        assertEquals(listOf("Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"), weekdayLabels(1))
        assertEquals(listOf("Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"), weekdayLabels(0))
    }

    @Test
    fun theDaysOfAWeekLineUpWithTheirHeadings() {
        // Headings and cells are produced by different functions; if these disagree,
        // every event in the week view is drawn a column out.
        val labels = weekdayLabels(6)
        val days = weekDays(friday, 6)
        val named = days.map { listOf("Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat")[it.dayOfWeek.value % 7] }
        assertEquals(labels, named)
    }

    @Test
    fun aWeekIsSevenConsecutiveDays() {
        val days = weekDays(friday, 6)
        assertEquals(7, days.size)
        assertEquals(
            listOf(
                LocalDate.of(2026, 8, 8), LocalDate.of(2026, 8, 9), LocalDate.of(2026, 8, 10), LocalDate.of(2026, 8, 11),
                LocalDate.of(2026, 8, 12), LocalDate.of(2026, 8, 13), LocalDate.of(2026, 8, 14),
            ),
            days,
        )
    }

    @Test
    fun aMonthGridIsAlwaysSixWeeksSoThePageDoesNotChangeHeight() {
        for (month in listOf(1, 2, 6, 12)) {
            assertEquals(42, monthGrid(LocalDate.of(2026, month, 1), 6).size)
        }
    }

    @Test
    fun aMonthGridBeginsOnTheChosenFirstDayAndContainsTheWholeMonth() {
        val grid = monthGrid(friday, 6)
        assertEquals(6, grid[0].dayOfWeek.value % 7) // Saturday
        assertEquals(LocalDate.of(2026, 8, 1), grid[0]) // 1 August 2026 is itself a Saturday
        assertTrue(grid.any { it == LocalDate.of(2026, 8, 31) })
    }

    @Test
    fun aMonthWhoseFirstDayIsTheWeekStartDoesNotGainABlankLeadingWeek() {
        // February 2026 starts on a Sunday, so a Sunday-first grid must not open with
        // seven days of the previous month.
        val grid = monthGrid(LocalDate.of(2026, 2, 10), 0)
        assertEquals(LocalDate.of(2026, 2, 1), grid[0])
    }
}
