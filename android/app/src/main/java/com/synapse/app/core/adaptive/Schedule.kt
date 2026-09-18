package com.synapse.app.core.adaptive

import java.time.Instant
import java.time.ZoneOffset
import java.time.format.DateTimeFormatter
import java.util.Locale
import kotlin.math.floor
import kotlin.math.roundToInt

/**
 * Turning priorities into a week a person can actually live.
 *
 * Port of `ios/Synapse/Core/Adaptive/Schedule.swift` (itself a port of
 * `src/data/adaptive/schedule.ts`). The failure mode it is written against is
 * the familiar one: a planner that fills every free minute, stacks the
 * hardest work back to back, and answers a missed day by demanding double
 * tomorrow. Students abandon those within a fortnight, and the abandonment
 * looks like laziness in the figures when it was arithmetic.
 *
 * So capacity carries a buffer, demanding sessions are separated, and every
 * task states why it exists so a student can disagree with it. Nothing here
 * promises that finishing the plan produces readiness — readiness is
 * measured, not planned.
 *
 * ponytail: iOS also ports `carryForward` (missed-work forgiveness) and
 * `mockDate` (where an exam mock sits). Neither is wired to anything on
 * Android yet — there is no student exam-schedule source ported (see
 * [AdaptiveConfig]'s doc comment on `daysToExam`), and nothing offers a
 * "missed day" recalculation UI. Left out rather than duplicated with no
 * caller; add them alongside whichever feature needs them.
 */

/**
 * What a student has to do to have done the plan.
 *
 * Three tiers exist so a bad day still has a defined win. Someone who manages
 * only the minimum has done the plan, not failed it.
 */
enum class TaskTier { MINIMUM, RECOMMENDED, STRETCH }

enum class TaskKind { PRACTICE, REVIEW, CALIBRATION, RESOURCE, PRACTICAL, REST }

/**
 * The kinds that genuinely tax a student differently.
 *
 * A timed assessment and a hands-on station are not more of the same work —
 * they carry stakes and demand a different sort of attention, and two in a
 * row is the stacking the guardrail is about.
 */
private val HIGH_EFFORT: Set<TaskKind> = setOf(TaskKind.CALIBRATION, TaskKind.PRACTICAL)

data class PlanTaskMove(val at: String, val from: String, val to: String, val reason: String)

data class PlanTask(
    val id: String,
    /** ISO date, `YYYY-MM-DD`. */
    val date: String,
    val kind: TaskKind,
    val tier: TaskTier,
    val title: String,
    /** Why this task exists, in words the student can argue with. */
    val reason: String,
    val expectedMinutes: Int,
    /** Concepts this is meant to move. Empty for rest. */
    val conceptIds: List<String>,
    /** Blueprint weight this task would contribute to covering, 0-1. */
    val blueprintContribution: Double,
    /** The need it serves, for the weekly balance readout. */
    val need: AllocationNeed?,
    val questionIds: List<String> = emptyList(),
    val resourceIds: List<String> = emptyList(),
    /** Locked tasks survive every recalculation untouched. */
    val locked: Boolean = false,
    val completedAt: String? = null,
    val skippedAt: String? = null,
    /** Every move this task has made, kept rather than overwritten. */
    val history: List<PlanTaskMove> = emptyList(),
)

data class DayCapacity(
    /** ISO date. */
    val date: String,
    /** Minutes the student says they have. */
    val statedMinutes: Int,
    /** Minutes taken by fixed university events. Not schedulable. */
    val reservedMinutes: Int = 0,
    /** True when the student marked the day unavailable. */
    val unavailable: Boolean = false,
)

/** Work the week had no room for, named rather than quietly discarded. */
data class UnplacedTask(val title: String, val kind: TaskKind, val expectedMinutes: Int, val reason: String)

data class WeeklyPlan(
    /** ISO date of the day this plan starts. */
    val weekStart: String,
    val tasks: List<PlanTask>,
    /** What did not fit. */
    val unplaced: List<UnplacedTask>,
    /** Minutes available after buffer and reservations. */
    val plannedMinutes: Int,
    /** Minutes the student stated, before any deduction. */
    val statedMinutes: Int,
    /** Minutes deliberately left unscheduled. */
    val bufferMinutes: Int,
    /** Target minutes per need, before rounding into tasks. */
    val needMinutes: Map<AllocationNeed, Int>,
    val generatedAt: String,
    val configVersion: Int,
) {
    /** Minutes planned per day, for the week bar. */
    val minutesByDay: Map<String, Int>
        get() {
            val out = mutableMapOf<String, Int>()
            for (task in tasks) out[task.date] = (out[task.date] ?: 0) + task.expectedMinutes
            return out
        }
}

/** What one need contributes to the week. */
data class PlanNeedInput(
    val need: AllocationNeed,
    /** Concepts this need is about, most urgent first. */
    val conceptIds: List<String>,
    /** Human label for the tasks generated. */
    val label: String,
)

data class BuildPlanInput(
    val weekStart: String,
    val days: List<DayCapacity>,
    /** Allocation shares for the student's current exam horizon. */
    val shares: AllocationShares,
    val needs: List<PlanNeedInput>,
    /** Concepts needing a practical station, if the programme has them. */
    val practicalConceptIds: List<String> = emptyList(),
    val config: AdaptiveConfig = DEFAULT_ADAPTIVE_CONFIG,
    /** Blueprint weight per concept, for the contribution figure. */
    val blueprintWeights: Map<String, Double> = emptyMap(),
    /** Days before the next exam, or null when nothing is scheduled. */
    val daysToExam: Int? = null,
    val generatedAt: String,
    /** Tasks the student locked, carried through untouched. */
    val locked: List<PlanTask> = emptyList(),
)

/**
 * Build a week.
 *
 * Needs become minutes by share, then tasks of a sane length, then a
 * placement across the available days that alternates load. The placement is
 * deliberately simple: a cleverer packer would be harder to explain to the
 * student whose week it is, and the constraint that actually matters — never
 * scheduling every minute — is held by the capacity function rather than by
 * the packing.
 */
object StudySchedule {

    /**
     * `YYYY-MM-DD` in UTC, matching how the website and iOS read and write
     * plan dates. Pinned to [Locale.US] (iOS pins `en_US_POSIX`) rather than
     * the device default — a Gregorian date formatted under an Arabic locale
     * default can render its digits in Arabic-Indic numerals, and a plan date
     * used as a map key and sort key must be the same bytes on every device.
     */
    val ISO_DAY: DateTimeFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd", Locale.US)

    /** The Monday of the week containing `today`, in UTC. */
    fun weekStart(today: Instant): String {
        val date = today.atZone(ZoneOffset.UTC).toLocalDate()
        val monday = date.minusDays((date.dayOfWeek.value - 1).toLong())
        return ISO_DAY.format(monday)
    }

    /**
     * How much of a day may actually be scheduled.
     *
     * Reserved university events come off first because they are not
     * optional, then the buffer comes off what remains. Taking the buffer
     * from the stated total first would produce days that look free but are
     * not.
     */
    fun schedulableMinutes(day: DayCapacity, config: AdaptiveConfig): Int {
        if (day.unavailable) return 0
        val free = maxOf(0, day.statedMinutes - day.reservedMinutes)
        return floor(free * (1 - config.schedule.capacityBufferShare)).toInt()
    }

    fun buildWeeklyPlan(input: BuildPlanInput): WeeklyPlan {
        val config = input.config

        val locked = input.locked.filter { it.locked }
        val lockedByDate = mutableMapOf<String, Int>()
        for (task in locked) lockedByDate[task.date] = (lockedByDate[task.date] ?: 0) + task.expectedMinutes

        val statedMinutes = input.days.sumOf { if (it.unavailable) 0 else it.statedMinutes }
        val capacity = input.days.map { day ->
            DayMinutes(day.date, maxOf(0, schedulableMinutes(day, config) - (lockedByDate[day.date] ?: 0)))
        }
        val plannedMinutes = capacity.sumOf { it.minutes }

        val needMinutes = AllocationNeed.entries.associateWith { need ->
            (plannedMinutes * input.shares[need]).roundToInt()
        }

        val drafts = mutableListOf<TaskDraft>()

        // Drafted before anything else, deliberately. A mock belongs in the
        // week holding its lead window and nowhere else, and it is the one
        // task that must not be squeezed out when the week is tight — a plan
        // that drops the measurement and keeps the practice has its
        // priorities backwards.
        val daysToExam = input.daysToExam
        if (daysToExam != null && daysToExam <= config.schedule.mockLeadDays + 7) {
            val full = (config.readiness.assessmentSize.toDouble() * config.readiness.secondsPerItem / 60.0).roundToInt()
            drafts.add(
                TaskDraft(
                    kind = TaskKind.CALIBRATION,
                    title = "Readiness assessment",
                    reason = "Far enough before your exam that a poor result can still be repaired. This measures where you stand; it is not practice.",
                    expectedMinutes = minOf(config.schedule.maxTaskMinutes, full),
                    conceptIds = emptyList(),
                    blueprintContribution = 0.0,
                    need = null,
                ),
            )
        }

        for (entry in input.needs) {
            var remaining = needMinutes[entry.need] ?: 0
            var index = 0
            while (remaining >= config.schedule.minTaskMinutes) {
                val minutes = minOf(config.schedule.maxTaskMinutes, remaining)
                // Slice the need's queue so consecutive tasks on one need do
                // not all target the same concept — that is a drill, not a
                // week.
                val start = minOf(index * 3, entry.conceptIds.size)
                val end = minOf(start + 3, entry.conceptIds.size)
                val conceptIds = entry.conceptIds.subList(start, end).toList()
                drafts.add(
                    TaskDraft(
                        kind = kindFor(entry.need),
                        title = entry.label,
                        reason = reasonFor(entry.need, conceptIds.size),
                        expectedMinutes = minutes,
                        conceptIds = conceptIds,
                        blueprintContribution = conceptIds.sumOf { input.blueprintWeights[it] ?: 0.0 },
                        need = entry.need,
                    ),
                )
                remaining -= minutes
                index += 1
            }
        }

        if (input.practicalConceptIds.isNotEmpty()) {
            drafts.add(
                TaskDraft(
                    kind = TaskKind.PRACTICAL,
                    title = "Practical station preparation",
                    reason = "Your programme assesses these concepts at a practical station, which needs separate preparation from written questions.",
                    expectedMinutes = config.schedule.maxTaskMinutes,
                    conceptIds = input.practicalConceptIds.take(3),
                    blueprintContribution = 0.0,
                    need = null,
                ),
            )
        }

        val (placed, unplaced) = place(drafts, capacity, config, input.weekStart)
        val withRest = addRestDays(placed, input.days, input.weekStart, config)

        return WeeklyPlan(
            weekStart = input.weekStart,
            tasks = (locked + withRest).sortedBy { it.date },
            unplaced = unplaced,
            plannedMinutes = plannedMinutes,
            statedMinutes = statedMinutes,
            bufferMinutes = maxOf(0, statedMinutes - plannedMinutes),
            needMinutes = needMinutes,
            generatedAt = input.generatedAt,
            configVersion = config.version,
        )
    }

    // --- Internals ---------------------------------------------------------

    private data class DayMinutes(val date: String, val minutes: Int)

    private data class TaskDraft(
        val kind: TaskKind,
        val title: String,
        val reason: String,
        val expectedMinutes: Int,
        val conceptIds: List<String>,
        val blueprintContribution: Double,
        val need: AllocationNeed?,
    )

    /**
     * `calibration` is reserved for readiness assessments.
     *
     * Measuring unmeasured concepts happens through an ordinary question
     * block, so it is practice. Calling it calibration would put two
     * different things — a timed measurement with no feedback during it, and
     * a normal block that happens to explore — under one word in the
     * interface.
     */
    private fun kindFor(need: AllocationNeed): TaskKind = if (need == AllocationNeed.REVIEW) TaskKind.REVIEW else TaskKind.PRACTICE

    private fun reasonFor(need: AllocationNeed, concepts: Int): String {
        val scope = when (concepts) {
            0 -> ""
            1 -> " Focused on 1 concept."
            else -> " Focused on $concepts concepts."
        }
        return when (need) {
            AllocationNeed.WEAKNESS -> "Repeated evidence points to gaps here.$scope"
            AllocationNeed.COVERAGE -> "These blueprint areas have had little or no practice.$scope"
            AllocationNeed.REVIEW -> "Scheduled before this is likely to fade.$scope"
            AllocationNeed.UNCERTAINTY -> "Nothing yet measures these, so a short check tells Nishany where you stand.$scope"
        }
    }

    /**
     * Place tasks across the week, alternating load.
     *
     * Round-robin across days rather than filling each in turn: filling days
     * sequentially produces three exhausting days and four empty ones, which
     * is both worse for retention and the first thing a student notices.
     */
    private fun place(
        drafts: List<TaskDraft>,
        capacity: List<DayMinutes>,
        config: AdaptiveConfig,
        weekStart: String,
    ): Pair<List<PlanTask>, List<UnplacedTask>> {
        if (capacity.isEmpty()) {
            return emptyList<PlanTask>() to drafts.map {
                UnplacedTask(it.title, it.kind, it.expectedMinutes, "You have no available days this week.")
            }
        }

        val remaining = mutableMapOf<String, Int>()
        for (day in capacity) remaining[day.date] = day.minutes
        val heavyOnDay = mutableMapOf<String, Int>()
        val lightOnDay = mutableMapOf<String, Int>()
        val placed = mutableListOf<PlanTask>()
        val unplaced = mutableListOf<UnplacedTask>()

        // Rotate across needs before placing, so consecutive sessions change
        // subject rather than grinding through one need for three days. The
        // high-effort check below is the separate, stricter guard.
        val ordered = interleaveByNeed(drafts)

        var cursor = 0
        for (task in ordered) {
            // Whole-hour tasks rarely tile a buffered day exactly, so a
            // session fitting nowhere at full length is shortened to the
            // largest room left rather than dropped. A 45-minute block is
            // worth far more than a perfect 60-minute one that never happens.
            val largestSlot = capacity.maxOf { remaining[it.date] ?: 0 }
            var draft = task
            if (largestSlot >= config.schedule.minTaskMinutes && largestSlot < draft.expectedMinutes) {
                draft = draft.copy(expectedMinutes = largestSlot)
            }

            var target: String? = null
            for (step in 0 until capacity.size) {
                val day = capacity[(cursor + step) % capacity.size]
                if ((remaining[day.date] ?: 0) < draft.expectedMinutes) continue
                // A day may hold several demanding sessions, but never two in
                // a row: it needs a lighter task between them. A flat per-day
                // cap would limit any week to seven demanding sessions
                // however many free hours the student has.
                if (draft.kind in HIGH_EFFORT) {
                    val heavy = heavyOnDay[day.date] ?: 0
                    val light = lightOnDay[day.date] ?: 0
                    if (heavy - light >= config.schedule.maxConsecutiveHighEffort) continue
                }
                target = day.date
                cursor = (cursor + step + 1) % capacity.size
                break
            }

            // No day can take it. It is not scheduled — overrunning capacity
            // is the one thing this function exists to prevent — but it is
            // reported, so the student sees that their stated hours cannot
            // hold everything the week wanted.
            if (target == null) {
                unplaced.add(
                    UnplacedTask(
                        title = draft.title,
                        kind = draft.kind,
                        expectedMinutes = draft.expectedMinutes,
                        reason = "Needs ${draft.expectedMinutes} uninterrupted minutes, and no day this week has that much left after your other commitments.",
                    ),
                )
                continue
            }

            remaining[target] = (remaining[target] ?: 0) - draft.expectedMinutes
            if (draft.kind in HIGH_EFFORT) heavyOnDay[target] = (heavyOnDay[target] ?: 0) + 1
            else lightOnDay[target] = (lightOnDay[target] ?: 0) + 1

            placed.add(
                PlanTask(
                    id = "task-$weekStart-${placed.size}",
                    date = target,
                    kind = draft.kind,
                    tier = tier(placed.size, ordered.size, config),
                    title = draft.title,
                    reason = draft.reason,
                    expectedMinutes = draft.expectedMinutes,
                    conceptIds = draft.conceptIds,
                    blueprintContribution = draft.blueprintContribution,
                    need = draft.need,
                ),
            )
        }

        return alternateWithinDays(placed) to unplaced
    }

    /**
     * Alternate demanding and light work inside each day.
     *
     * Placement decides *which* day; this decides the order within it.
     * Without it a day can end up front-loaded with every demanding session,
     * which is the stacking the capacity rules exist to prevent — the
     * constraint has to hold in the order the student actually works
     * through, not merely in the daily totals.
     */
    private fun alternateWithinDays(tasks: List<PlanTask>): List<PlanTask> {
        val byDate = mutableMapOf<String, MutableList<PlanTask>>()
        for (task in tasks) byDate.getOrPut(task.date) { mutableListOf() }.add(task)

        val out = mutableListOf<PlanTask>()
        for (date in byDate.keys.sorted()) {
            val dayTasks = byDate.getValue(date)
            val heavy = ArrayDeque(dayTasks.filter { it.kind in HIGH_EFFORT })
            val light = ArrayDeque(dayTasks.filter { it.kind !in HIGH_EFFORT })
            while (heavy.isNotEmpty() || light.isNotEmpty()) {
                if (heavy.isNotEmpty()) out.add(heavy.removeFirst())
                if (light.isNotEmpty()) out.add(light.removeFirst())
            }
        }
        return out
    }

    /**
     * Round-robin across needs, preserving the order they were drafted in.
     *
     * Lanes are kept in an ordered list rather than left to a map's
     * iteration order: the readiness assessment is drafted first precisely
     * so a tight week places it before anything else competes for the room,
     * and a lane order that varied run to run would throw that away.
     */
    private fun interleaveByNeed(drafts: List<TaskDraft>): List<TaskDraft> {
        val order = mutableListOf<String>()
        val queues = mutableMapOf<String, ArrayDeque<TaskDraft>>()
        for (draft in drafts) {
            val key = draft.need?.name ?: draft.kind.name
            if (key !in queues) {
                order.add(key)
                queues[key] = ArrayDeque()
            }
            queues.getValue(key).add(draft)
        }

        val out = mutableListOf<TaskDraft>()
        while (out.size < drafts.size) {
            for (key in order) {
                val queue = queues.getValue(key)
                if (queue.isNotEmpty()) out.add(queue.removeFirst())
            }
        }
        return out
    }

    private fun tier(index: Int, total: Int, config: AdaptiveConfig): TaskTier {
        if (total <= 0) return TaskTier.MINIMUM
        val position = index.toDouble() / total.toDouble()
        if (position < config.schedule.minimumTierShare) return TaskTier.MINIMUM
        if (position < config.schedule.minimumTierShare + config.schedule.recommendedTierShare) return TaskTier.RECOMMENDED
        return TaskTier.STRETCH
    }

    /** A day with nothing scheduled is named as rest rather than left blank. */
    private fun addRestDays(tasks: List<PlanTask>, days: List<DayCapacity>, weekStart: String, config: AdaptiveConfig): List<PlanTask> {
        if (config.schedule.capacityBufferShare <= 0) return tasks
        val busy = tasks.map { it.date }.toSet()
        val rest = days
            .filter { it.date !in busy && !it.unavailable }
            .mapIndexed { index, day ->
                PlanTask(
                    id = "task-$weekStart-rest-$index",
                    date = day.date,
                    kind = TaskKind.REST,
                    tier = TaskTier.MINIMUM,
                    title = "Rest",
                    reason = "Deliberately unscheduled. Consolidation needs gaps, and a plan with no slack is one a single bad day destroys.",
                    expectedMinutes = 0,
                    conceptIds = emptyList(),
                    blueprintContribution = 0.0,
                    need = null,
                )
            }
        return tasks + rest
    }
}
