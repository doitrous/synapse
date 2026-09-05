package com.synapse.android.core.adaptive

import org.junit.Assert.assertEquals
import org.junit.Assert.assertTrue
import org.junit.Test

class AdaptiveScheduleTest {

    private val config = AdaptiveConfig.DEFAULT

    private fun week(minutesPerDay: Int): List<DayCapacity> =
        (0..6).map { DayCapacity(date = "2026-09-0${it + 1}", statedMinutes = minutesPerDay) }

    private fun input(
        days: List<DayCapacity>,
        needs: List<PlanNeedInput> = listOf(
            PlanNeedInput(AllocationNeed.WEAKNESS, listOf("c1", "c2"), "Weak concept repair"),
            PlanNeedInput(AllocationNeed.COVERAGE, listOf("c3"), "Blueprint coverage"),
        ),
        daysToExam: Int? = null,
    ) = BuildPlanInput(
        weekStart = "2026-09-01",
        days = days,
        shares = config.shares(daysToExam),
        needs = needs,
        config = config,
        daysToExam = daysToExam,
        generatedAt = "2026-09-01T00:00:00Z",
    )

    @Test
    fun `capacity keeps a buffer -- never schedules every stated minute`() {
        val plan = StudySchedule.buildWeeklyPlan(input(week(120)))
        assertEquals(7 * 120, plan.statedMinutes)
        assertTrue("planned below stated", plan.plannedMinutes < plan.statedMinutes)
        assertTrue("buffer is shown", plan.bufferMinutes > 0)
    }

    @Test
    fun `no task exceeds the day capacity it was placed on`() {
        val plan = StudySchedule.buildWeeklyPlan(input(week(120)))
        val schedulable = StudySchedule.schedulableMinutes(DayCapacity("d", 120), config)
        val byDay = plan.tasks.filter { it.kind != TaskKind.REST }.groupBy { it.date }
        for ((_, tasks) in byDay) {
            assertTrue(tasks.sumOf { it.expectedMinutes } <= schedulable)
        }
    }

    @Test
    fun `empty days are named as rest rather than left blank`() {
        // Tiny need, big week -> most days have nothing and should become rest.
        val plan = StudySchedule.buildWeeklyPlan(input(week(120),
            needs = listOf(PlanNeedInput(AllocationNeed.WEAKNESS, listOf("c1"), "Weak concept repair"))))
        assertTrue(plan.tasks.any { it.kind == TaskKind.REST })
    }

    @Test
    fun `need minutes are apportioned by share`() {
        val plan = StudySchedule.buildWeeklyPlan(input(week(120)))
        val total = AllocationNeed.entries.sumOf { plan.needMinutes[it] ?: 0 }
        // Rounding aside, need minutes track planned capacity.
        assertTrue(total in (plan.plannedMinutes - 4)..(plan.plannedMinutes + 4))
    }

    @Test
    fun `a readiness assessment is drafted when an exam is near`() {
        val plan = StudySchedule.buildWeeklyPlan(input(week(180), daysToExam = 5))
        assertTrue("mock scheduled or reported unplaced",
            plan.tasks.any { it.kind == TaskKind.CALIBRATION } ||
                plan.unplaced.any { it.kind == TaskKind.CALIBRATION })
    }

    @Test
    fun `an unavailable week places nothing and reports the shortfall`() {
        val days = (0..6).map { DayCapacity("2026-09-0${it + 1}", 120, unavailable = true) }
        val plan = StudySchedule.buildWeeklyPlan(input(days))
        assertEquals(0, plan.plannedMinutes)
        assertTrue(plan.tasks.none { it.kind != TaskKind.REST })
    }
}
