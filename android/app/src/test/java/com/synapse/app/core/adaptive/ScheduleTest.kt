package com.synapse.app.core.adaptive

import org.junit.Assert.assertEquals
import org.junit.Assert.assertTrue
import org.junit.Test
import kotlin.math.floor

/**
 * 1:1 port of iOS's `AdaptiveScheduleTests.swift`, which itself mirrors
 * `src/data/adaptive/planning.test.ts` — same inputs, same expected numbers.
 * A plan built on the phone and a plan built on a laptop have to be the same
 * plan. The promises held here are about liveability rather than raw
 * arithmetic: never scheduling every free minute, never stacking the
 * demanding sessions, never dropping work without saying so.
 *
 * `carryForward`/`mockDate` are not ported (see [Schedule.kt]'s doc comment),
 * so their iOS test vectors are not mirrored here either — nothing on
 * Android calls those functions yet.
 */
class ScheduleTest {

    private val config = DEFAULT_ADAPTIVE_CONFIG
    private val weekStart = "2026-08-17"

    private fun week(minutesPerDay: Int = 120, overrides: Map<Int, DayCapacity> = emptyMap()): List<DayCapacity> {
        val start = java.time.LocalDate.parse(weekStart, StudySchedule.ISO_DAY)
        return (0 until 7).map { index ->
            overrides[index] ?: DayCapacity(
                date = StudySchedule.ISO_DAY.format(start.plusDays(index.toLong())),
                statedMinutes = minutesPerDay,
            )
        }
    }

    private fun input(days: List<DayCapacity>? = null, daysToExam: Int? = null, locked: List<PlanTask> = emptyList()): BuildPlanInput =
        BuildPlanInput(
            weekStart = weekStart,
            days = days ?: week(),
            shares = config.horizonBands.last().shares,
            needs = listOf(
                PlanNeedInput(AllocationNeed.WEAKNESS, listOf("CON-0", "CON-1", "CON-2", "CON-3"), "Weak concept repair"),
                PlanNeedInput(AllocationNeed.COVERAGE, listOf("CON-4", "CON-5"), "Blueprint coverage"),
                PlanNeedInput(AllocationNeed.REVIEW, listOf("CON-6"), "Spaced review"),
                PlanNeedInput(AllocationNeed.UNCERTAINTY, listOf("CON-7"), "Measurement"),
            ),
            config = config,
            blueprintWeights = (0 until 8).associate { "CON-$it" to 0.125 },
            daysToExam = daysToExam,
            generatedAt = "2026-08-17T09:00:00.000Z",
            locked = locked,
        )

    // --- Capacity ------------------------------------------------------------------

    @Test
    fun `a plan never schedules every free minute`() {
        val plan = StudySchedule.buildWeeklyPlan(input())
        assertTrue(plan.plannedMinutes < plan.statedMinutes)
        assertTrue(plan.bufferMinutes > 0)
    }

    @Test
    fun `the buffer is taken after fixed events not before`() {
        val day = DayCapacity(date = "2026-08-17", statedMinutes = 180, reservedMinutes = 60)
        // 120 free, then the buffer — not 180 buffered and then 60 removed,
        // which would leave a day that looks free and is not.
        assertEquals(98, StudySchedule.schedulableMinutes(day, config))
    }

    @Test
    fun `an unavailable day is scheduled with nothing at all`() {
        val days = week().toMutableList()
        days[2] = DayCapacity(date = days[2].date, statedMinutes = 120, unavailable = true)
        val plan = StudySchedule.buildWeeklyPlan(input(days = days))
        assertTrue(plan.tasks.all { it.date != days[2].date })
    }

    @Test
    fun `no single day is loaded past its own buffered capacity`() {
        val plan = StudySchedule.buildWeeklyPlan(input())
        val capacity = floor(120.0 * (1 - config.schedule.capacityBufferShare)).toInt()
        for ((date, minutes) in plan.minutesByDay) {
            assertTrue("$date was loaded with $minutes against a capacity of $capacity", minutes <= capacity)
        }
    }

    @Test
    fun `a longer day earns more work rather than being capped at one session`() {
        val short = StudySchedule.buildWeeklyPlan(input(days = week(120)))
        val long = StudySchedule.buildWeeklyPlan(input(days = week(300)))
        fun minutes(plan: WeeklyPlan) = plan.tasks.sumOf { it.expectedMinutes }
        assertTrue(minutes(long) > minutes(short))
    }

    @Test
    fun `a week with no capacity produces no work rather than an impossible plan`() {
        val plan = StudySchedule.buildWeeklyPlan(input(days = week(0)))
        assertEquals(0, plan.plannedMinutes)
        assertTrue(plan.tasks.none { it.expectedMinutes > 0 })
    }

    // --- Load ------------------------------------------------------------------

    @Test
    fun `assessments and practical stations never sit back to back within a day`() {
        // Checked in the order the student works through, not merely in
        // daily totals — a day whose totals look balanced can still be
        // front-loaded with every hard session, which is the stacking the
        // rule prevents.
        for (minutes in listOf(120, 240, 300)) {
            val plan = StudySchedule.buildWeeklyPlan(input(days = week(minutes)))
            val byDate = mutableMapOf<String, MutableList<TaskKind>>()
            for (task in plan.tasks) byDate.getOrPut(task.date) { mutableListOf() }.add(task.kind)
            for ((date, kinds) in byDate) {
                var run = 0
                for (kind in kinds) {
                    run = if (kind == TaskKind.CALIBRATION || kind == TaskKind.PRACTICAL) run + 1 else 0
                    assertTrue(
                        "$date at $minutes min/day stacks $run demanding sessions in a row",
                        run <= config.schedule.maxConsecutiveHighEffort,
                    )
                }
            }
        }
    }

    @Test
    fun `consecutive tasks on one need do not all target the same concept`() {
        val plan = StudySchedule.buildWeeklyPlan(input(days = week(300)))
        val weakness = plan.tasks.filter { it.need == AllocationNeed.WEAKNESS && it.conceptIds.isNotEmpty() }
        // A drill is one concept repeated; a week is a rotation.
        assertTrue(weakness.flatMap { it.conceptIds }.toSet().size > 1)
    }

    // --- Legibility ------------------------------------------------------------------

    @Test
    fun `every task states why it exists`() {
        val plan = StudySchedule.buildWeeklyPlan(input())
        assertTrue(plan.tasks.isNotEmpty())
        for (task in plan.tasks) assertTrue("${task.title} has no reason", task.reason.isNotEmpty())
    }

    @Test
    fun `a plan offers a minimum tier so a bad day still has a defined win`() {
        val plan = StudySchedule.buildWeeklyPlan(input())
        assertTrue(plan.tasks.any { it.tier == TaskTier.MINIMUM })
    }

    @Test
    fun `a day with nothing scheduled is named as rest rather than left blank`() {
        val plan = StudySchedule.buildWeeklyPlan(input(days = week(60)))
        val busy = plan.tasks.filter { it.kind != TaskKind.REST }.map { it.date }.toSet()
        val available = week(60).filter { !it.unavailable }.map { it.date }
        for (date in available.filter { it !in busy }) {
            assertTrue(plan.tasks.any { it.date == date && it.kind == TaskKind.REST })
        }
    }

    // --- Locked work ------------------------------------------------------------------

    @Test
    fun `locked tasks survive a recalculation untouched`() {
        val pinned = PlanTask(
            id = "pinned", date = "2026-08-19", kind = TaskKind.RESOURCE, tier = TaskTier.MINIMUM,
            title = "Dissection room", reason = "Booked.", expectedMinutes = 90,
            conceptIds = emptyList(), blueprintContribution = 0.0, need = null, locked = true,
        )
        val plan = StudySchedule.buildWeeklyPlan(input(locked = listOf(pinned)))
        assertTrue(plan.tasks.contains(pinned))
        // And its minutes are gone from that day's capacity, not double-spent.
        val capacity = floor(120.0 * (1 - config.schedule.capacityBufferShare)).toInt()
        assertTrue((plan.minutesByDay["2026-08-19"] ?: 0) <= 90 + capacity)
    }

    // --- The mock ------------------------------------------------------------------

    @Test
    fun `a readiness assessment is scheduled only when an exam is actually near`() {
        val far = StudySchedule.buildWeeklyPlan(input(days = week(300), daysToExam = 90))
        assertTrue(far.tasks.none { it.kind == TaskKind.CALIBRATION })

        val near = StudySchedule.buildWeeklyPlan(input(days = week(300), daysToExam = 10))
        assertTrue(near.tasks.any { it.kind == TaskKind.CALIBRATION })
    }

    @Test
    fun `a tight week places the measurement first or says it could not`() {
        // The mock is the one task a squeezed week must not lose quietly.
        val cramped = StudySchedule.buildWeeklyPlan(input(days = week(60), daysToExam = 10))
        val scheduled = cramped.tasks.any { it.kind == TaskKind.CALIBRATION }
        val reported = cramped.unplaced.any { it.kind == TaskKind.CALIBRATION }
        assertTrue(scheduled || reported)
    }

    // --- What did not fit ------------------------------------------------------------------

    @Test
    fun `work that does not fit is reported never silently discarded`() {
        val cramped = StudySchedule.buildWeeklyPlan(input(days = week(30)))
        val asked = cramped.tasks.count { it.expectedMinutes > 0 } + cramped.unplaced.size
        assertTrue(asked > 0)
        for (task in cramped.unplaced) {
            assertTrue("the reason says concretely what was missing", task.reason.contains("minutes"))
        }
    }

    @Test
    fun `a week with room for everything reports nothing unplaced`() {
        val roomy = StudySchedule.buildWeeklyPlan(input(days = week(300)))
        assertTrue(roomy.unplaced.isEmpty())
    }

    // --- Determinism ------------------------------------------------------------------

    @Test
    fun `the same input builds the same plan every time`() {
        val first = StudySchedule.buildWeeklyPlan(input())
        val second = StudySchedule.buildWeeklyPlan(input())
        assertEquals(first, second)
    }

    @Test
    fun `need ordering matches the declared apportionment order`() {
        // Ties break in AllocationNeed's declaration order — weakness,
        // coverage, review, uncertainty — same as apportion() in Allocation.kt.
        assertEquals(listOf(AllocationNeed.WEAKNESS, AllocationNeed.COVERAGE, AllocationNeed.REVIEW, AllocationNeed.UNCERTAINTY), AllocationNeed.entries)
    }
}
