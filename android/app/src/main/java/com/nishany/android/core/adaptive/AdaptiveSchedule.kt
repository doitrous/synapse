package com.nishany.android.core.adaptive

import kotlin.math.floor
import kotlin.math.roundToInt

/**
 * What a student has to do to have done the plan. Three tiers exist so a bad day
 * still has a defined win.
 */
enum class TaskTier(val label: String) {
    MINIMUM("Minimum"), RECOMMENDED("Recommended"), STRETCH("Stretch"),
}

enum class TaskKind { PRACTICE, REVIEW, CALIBRATION, RESOURCE, PRACTICAL, REST }

/** The kinds that genuinely tax a student differently. */
private val HIGH_EFFORT = setOf(TaskKind.CALIBRATION, TaskKind.PRACTICAL)

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
    val conceptIds: List<String>,
    val blueprintContribution: Double,
    val need: AllocationNeed?,
)

data class DayCapacity(
    val date: String,
    val statedMinutes: Int,
    val reservedMinutes: Int = 0,
    val unavailable: Boolean = false,
)

/** Work the week had no room for, named rather than quietly discarded. */
data class UnplacedTask(
    val title: String,
    val kind: TaskKind,
    val expectedMinutes: Int,
    val reason: String,
)

data class WeeklyPlan(
    val weekStart: String,
    val tasks: List<PlanTask>,
    val unplaced: List<UnplacedTask>,
    val plannedMinutes: Int,
    val statedMinutes: Int,
    val bufferMinutes: Int,
    val needMinutes: Map<AllocationNeed, Int>,
    val generatedAt: String,
    val configVersion: Int,
) {
    companion object {
        val CAVEAT = "Completing this plan does not by itself mean you are ready. " +
            "Readiness is measured separately, on blueprint-balanced questions held back from your practice."
    }
}

/** What one need contributes to the week. */
data class PlanNeedInput(
    val need: AllocationNeed,
    val conceptIds: List<String>,
    val label: String,
)

data class BuildPlanInput(
    val weekStart: String,
    val days: List<DayCapacity>,
    val shares: AllocationShares,
    val needs: List<PlanNeedInput>,
    val practicalConceptIds: List<String> = emptyList(),
    val config: AdaptiveConfig = AdaptiveConfig.DEFAULT,
    val blueprintWeights: Map<String, Double> = emptyMap(),
    val daysToExam: Int? = null,
    val generatedAt: String,
)

/**
 * Turning priorities into a week a person can actually live.
 *
 * A port of `src/data/adaptive/schedule.ts`. Capacity carries a buffer,
 * demanding sessions are separated, and every task states why it exists.
 */
object StudySchedule {

    /** How much of a day may actually be scheduled. Reserved events off first, then the buffer. */
    fun schedulableMinutes(day: DayCapacity, config: AdaptiveConfig): Int {
        if (day.unavailable) return 0
        val free = maxOf(0, day.statedMinutes - day.reservedMinutes)
        return floor(free * (1 - config.schedule.capacityBufferShare)).toInt()
    }

    fun buildWeeklyPlan(input: BuildPlanInput): WeeklyPlan {
        val config = input.config

        val statedMinutes = input.days.sumOf { if (it.unavailable) 0 else it.statedMinutes }
        val capacity = input.days.map { day -> day.date to maxOf(0, schedulableMinutes(day, config)) }
        val plannedMinutes = capacity.sumOf { it.second }

        val needMinutes = AllocationNeed.entries.associateWith {
            (plannedMinutes * input.shares[it]).roundToInt()
        }

        val drafts = mutableListOf<TaskDraft>()

        // A mock is drafted first so a tight week places it before anything else.
        val daysToExam = input.daysToExam
        if (daysToExam != null && daysToExam <= config.schedule.mockLeadDays + 7) {
            val full = (config.readiness.assessmentSize * config.readiness.secondsPerItem / 60).roundToInt()
            drafts.add(TaskDraft(
                kind = TaskKind.CALIBRATION,
                title = "Readiness assessment",
                reason = "Far enough before your exam that a poor result can still be repaired. " +
                    "This measures where you stand; it is not practice.",
                expectedMinutes = minOf(config.schedule.maxTaskMinutes, full),
                conceptIds = emptyList(),
                blueprintContribution = 0.0,
                need = null,
            ))
        }

        for (entry in input.needs) {
            var remaining = needMinutes[entry.need] ?: 0
            var index = 0
            while (remaining >= config.schedule.minTaskMinutes) {
                val minutes = minOf(config.schedule.maxTaskMinutes, remaining)
                val start = minOf(index * 3, entry.conceptIds.size)
                val end = minOf(start + 3, entry.conceptIds.size)
                val conceptIds = entry.conceptIds.subList(start, end).toList()
                drafts.add(TaskDraft(
                    kind = kindFor(entry.need),
                    title = entry.label,
                    reason = reasonFor(entry.need, conceptIds.size),
                    expectedMinutes = minutes,
                    conceptIds = conceptIds,
                    blueprintContribution = conceptIds.sumOf { input.blueprintWeights[it] ?: 0.0 },
                    need = entry.need,
                ))
                remaining -= minutes
                index += 1
            }
        }

        if (input.practicalConceptIds.isNotEmpty()) {
            drafts.add(TaskDraft(
                kind = TaskKind.PRACTICAL,
                title = "Practical station preparation",
                reason = "Your programme assesses these concepts at a practical station, which needs " +
                    "separate preparation from written questions.",
                expectedMinutes = config.schedule.maxTaskMinutes,
                conceptIds = input.practicalConceptIds.take(3),
                blueprintContribution = 0.0,
                need = null,
            ))
        }

        val (placed, unplaced) = place(drafts, capacity, config, input.weekStart)
        val withRest = addRestDays(placed, input.days, input.weekStart, config)

        return WeeklyPlan(
            weekStart = input.weekStart,
            tasks = withRest.sortedBy { it.date },
            unplaced = unplaced,
            plannedMinutes = plannedMinutes,
            statedMinutes = statedMinutes,
            bufferMinutes = maxOf(0, statedMinutes - plannedMinutes),
            needMinutes = needMinutes,
            generatedAt = input.generatedAt,
            configVersion = config.version,
        )
    }

    // MARK: - Internals

    private data class TaskDraft(
        val kind: TaskKind,
        val title: String,
        val reason: String,
        val expectedMinutes: Int,
        val conceptIds: List<String>,
        val blueprintContribution: Double,
        val need: AllocationNeed?,
    )

    private fun kindFor(need: AllocationNeed): TaskKind =
        if (need == AllocationNeed.REVIEW) TaskKind.REVIEW else TaskKind.PRACTICE

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
            AllocationNeed.UNCERTAINTY ->
                "Nothing yet measures these, so a short check tells Nishany where you stand.$scope"
        }
    }

    /** Place tasks across the week, alternating load (round-robin across days). */
    private fun place(
        drafts: List<TaskDraft>,
        capacity: List<Pair<String, Int>>,
        config: AdaptiveConfig,
        weekStart: String,
    ): Pair<List<PlanTask>, List<UnplacedTask>> {
        if (capacity.isEmpty()) {
            return emptyList<PlanTask>() to drafts.map {
                UnplacedTask(it.title, it.kind, it.expectedMinutes, "You have no available days this week.")
            }
        }

        val remaining = capacity.associate { it.first to it.second }.toMutableMap()
        val heavyOnDay = mutableMapOf<String, Int>()
        val lightOnDay = mutableMapOf<String, Int>()
        val placed = mutableListOf<PlanTask>()
        val unplaced = mutableListOf<UnplacedTask>()

        val ordered = interleaveByNeed(drafts)

        var cursor = 0
        for (task in ordered) {
            val largestSlot = capacity.maxOf { remaining[it.first] ?: 0 }
            var draft = task
            if (largestSlot >= config.schedule.minTaskMinutes && largestSlot < task.expectedMinutes) {
                draft = draft.copy(expectedMinutes = largestSlot)
            }

            var target: String? = null
            for (step in capacity.indices) {
                val day = capacity[(cursor + step) % capacity.size]
                if ((remaining[day.first] ?: 0) < draft.expectedMinutes) continue
                if (draft.kind in HIGH_EFFORT) {
                    val heavy = heavyOnDay[day.first] ?: 0
                    val light = lightOnDay[day.first] ?: 0
                    if (heavy - light >= config.schedule.maxConsecutiveHighEffort) continue
                }
                target = day.first
                cursor = (cursor + step + 1) % capacity.size
                break
            }

            val chosen = target
            if (chosen == null) {
                unplaced.add(UnplacedTask(
                    draft.title, draft.kind, draft.expectedMinutes,
                    "Needs ${draft.expectedMinutes} uninterrupted minutes, and no day this week has " +
                        "that much left after your other commitments.",
                ))
                continue
            }

            remaining[chosen] = (remaining[chosen] ?: 0) - draft.expectedMinutes
            if (draft.kind in HIGH_EFFORT) heavyOnDay[chosen] = (heavyOnDay[chosen] ?: 0) + 1
            else lightOnDay[chosen] = (lightOnDay[chosen] ?: 0) + 1

            placed.add(PlanTask(
                id = "task-$weekStart-${placed.size}",
                date = chosen,
                kind = draft.kind,
                tier = tier(placed.size, ordered.size, config),
                title = draft.title,
                reason = draft.reason,
                expectedMinutes = draft.expectedMinutes,
                conceptIds = draft.conceptIds,
                blueprintContribution = draft.blueprintContribution,
                need = draft.need,
            ))
        }

        return alternateWithinDays(placed) to unplaced
    }

    /** Alternate demanding and light work inside each day. */
    private fun alternateWithinDays(tasks: List<PlanTask>): List<PlanTask> {
        val byDate = tasks.groupBy { it.date }
        val out = mutableListOf<PlanTask>()
        for (day in byDate.keys.sorted()) {
            val dayTasks = byDate[day] ?: emptyList()
            val heavy = dayTasks.filter { it.kind in HIGH_EFFORT }.toMutableList()
            val light = dayTasks.filter { it.kind !in HIGH_EFFORT }.toMutableList()
            while (heavy.isNotEmpty() || light.isNotEmpty()) {
                if (heavy.isNotEmpty()) out.add(heavy.removeAt(0))
                if (light.isNotEmpty()) out.add(light.removeAt(0))
            }
        }
        return out
    }

    /** Round-robin across needs, preserving the order they were drafted in. */
    private fun interleaveByNeed(drafts: List<TaskDraft>): List<TaskDraft> {
        val order = mutableListOf<String>()
        val queues = mutableMapOf<String, MutableList<TaskDraft>>()
        for (draft in drafts) {
            val key = draft.need?.name ?: draft.kind.name
            if (queues[key] == null) { order.add(key); queues[key] = mutableListOf() }
            queues[key]?.add(draft)
        }

        val out = mutableListOf<TaskDraft>()
        while (out.size < drafts.size) {
            for (key in order) {
                val queue = queues[key]
                if (queue != null && queue.isNotEmpty()) out.add(queue.removeAt(0))
            }
        }
        return out
    }

    private fun tier(index: Int, total: Int, config: AdaptiveConfig): TaskTier {
        if (total <= 0) return TaskTier.MINIMUM
        val position = index.toDouble() / total
        if (position < config.schedule.minimumTierShare) return TaskTier.MINIMUM
        if (position < config.schedule.minimumTierShare + config.schedule.recommendedTierShare) return TaskTier.RECOMMENDED
        return TaskTier.STRETCH
    }

    /** A day with nothing scheduled is named as rest rather than left blank. */
    private fun addRestDays(
        tasks: List<PlanTask>, days: List<DayCapacity>, weekStart: String, config: AdaptiveConfig,
    ): List<PlanTask> {
        if (config.schedule.capacityBufferShare <= 0) return tasks
        val busy = tasks.map { it.date }.toSet()
        val rest = days.filter { !busy.contains(it.date) && !it.unavailable }
            .mapIndexed { index, day ->
                PlanTask(
                    id = "task-$weekStart-rest-$index",
                    date = day.date,
                    kind = TaskKind.REST,
                    tier = TaskTier.MINIMUM,
                    title = "Rest",
                    reason = "Deliberately unscheduled. Consolidation needs gaps, and a plan with no " +
                        "slack is one a single bad day destroys.",
                    expectedMinutes = 0,
                    conceptIds = emptyList(),
                    blueprintContribution = 0.0,
                    need = null,
                )
            }
        return tasks + rest
    }
}
