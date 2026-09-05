package com.synapse.android.core.adaptive

import java.time.LocalDate
import kotlin.math.ceil
import kotlin.math.roundToInt

data class CrashDay(
    val date: String,
    /** 1-based, so the interface can say "day 6 of 30". */
    val dayNumber: Int,
    val conceptIds: List<String>,
    val labels: List<String>,
    val blueprintWeight: Double,
    val load: Int,
    val kind: Kind,
    val reason: String,
) {
    enum class Kind(val label: String) {
        STUDY("Study"), MOCK("Mock"), REVIEW("Review"), CATCH_UP("Catch-up"), REST("Rest"),
    }
}

data class UnreachableGroup(
    val groupId: String,
    val groupLabel: String,
    val weight: Double,
)

data class CrashProgramme(
    val band: AdaptiveConfig.CrashHorizonBand,
    val daysToExam: Int,
    val days: List<CrashDay>,
    val shares: AllocationShares,
    /** Blueprint weight the programme cannot reach with the questions there are. */
    val unreachableWeight: Double,
    val unreachableGroups: List<UnreachableGroup>,
    /** Narrowed claim when coverage is insufficient. */
    val claim: String,
    val generatedAt: String,
    val configVersion: Int,
) {
    /** Study days carrying no concepts -- the honest signal that the pool ran out. */
    val emptyStudyDays: Int get() = days.count { it.kind == CrashDay.Kind.STUDY && it.conceptIds.isEmpty() }

    companion object {
        val CAVEAT = "This programme compresses your blueprint; it does not shorten it. Completing it is " +
            "not a score prediction, and no part of it is a guarantee. Anything your question bank cannot " +
            "yet cover is listed above rather than left out silently."
    }
}

data class BuildCrashInput(
    val daysToExam: Int,
    val startDate: String,
    val nodes: List<BlueprintNode>,
    val coverage: CoverageState,
    val states: Map<String, ConceptState>,
    val poolByConcept: Map<String, Int>,
    val prerequisites: Map<String, List<String>>,
    val config: AdaptiveConfig = AdaptiveConfig.DEFAULT,
    val generatedAt: String,
)

/**
 * Compressed programmes. A port of `src/data/adaptive/crashCourse.ts`. A crash
 * course compresses the same blueprint and evidence model; it does not swap them
 * for "high-yield only". What compression legitimately changes: emphasis,
 * measurement cadence, prerequisite chasing. What it must never change: the
 * blueprint, or the claim made about the result.
 */
object CrashCourse {

    /** Order concepts so prerequisites land before what depends on them. */
    fun orderByPrerequisite(conceptIds: List<String>, prerequisites: Map<String, List<String>>): List<String> {
        val wanted = conceptIds.toSet()
        val ordered = mutableListOf<String>()
        val placed = mutableSetOf<String>()
        val visiting = mutableSetOf<String>()

        fun visit(conceptId: String) {
            if (placed.contains(conceptId) || !wanted.contains(conceptId)) return
            if (visiting.contains(conceptId)) return
            visiting.add(conceptId)
            for (dependency in prerequisites[conceptId] ?: emptyList()) visit(dependency)
            visiting.remove(conceptId)
            placed.add(conceptId)
            ordered.add(conceptId)
        }

        for (conceptId in conceptIds) visit(conceptId)
        return ordered
    }

    fun build(input: BuildCrashInput): CrashProgramme? {
        val config = input.config
        val band = config.crashHorizon(input.daysToExam) ?: config.crashHorizons.firstOrNull() ?: return null
        val reserved = reservedDays(band)

        val reachable = input.nodes.filter { (input.poolByConcept[it.conceptId] ?: 0) > 0 }
        val unreachable = input.nodes.filter { (input.poolByConcept[it.conceptId] ?: 0) == 0 }

        val unreachableWeight = unreachable.sumOf { it.weight }
        val touched = input.coverage.concepts.associate { it.conceptId to it.touched }

        fun urgency(node: BlueprintNode): Double {
            val state = input.states[node.conceptId]
            val untouched = !(touched[node.conceptId] ?: false)
            val repair = state?.let { maxOf(0.0, config.statuses.weakBelow - it.mean) } ?: 0.0
            return band.shares.coverage * node.weight * (if (untouched) 1.0 else 0.3) +
                band.shares.weakness * repair
        }

        val ranked = reachable.sortedWith(
            compareByDescending<BlueprintNode> { urgency(it) }.thenBy { it.conceptId },
        )
        val ordered = orderByPrerequisite(ranked.map { it.conceptId }, input.prerequisites)
        val nodeById = input.nodes.associateBy { it.conceptId }

        val total = maxOf(1, minOf(input.daysToExam, band.days))
        val studyDays = maxOf(1, total - reserved.mocks - reserved.review - reserved.catchUp)
        val perDay = maxOf(1, ceil(ordered.size.toDouble() / studyDays).toInt())

        val days = mutableListOf<CrashDay>()
        val start = runCatching { LocalDate.parse(input.startDate) }.getOrDefault(LocalDate.now())
        var cursor = 0

        for (dayNumber in 1..total) {
            val iso = start.plusDays((dayNumber - 1).toLong()).toString()
            val kind = kind(dayNumber, total, reserved)

            if (kind != CrashDay.Kind.STUDY) {
                days.add(CrashDay(iso, dayNumber, emptyList(), emptyList(), 0.0, 0, kind, reasonFor(kind)))
                continue
            }

            val end = minOf(cursor + perDay, ordered.size)
            val cluster = if (cursor < end) ordered.subList(cursor, end).toList() else emptyList()
            cursor = end
            val clusterNodes = cluster.mapNotNull { nodeById[it] }

            days.add(CrashDay(
                date = iso,
                dayNumber = dayNumber,
                conceptIds = cluster,
                labels = clusterNodes.map { it.label },
                blueprintWeight = clusterNodes.sumOf { it.weight },
                load = cluster.size,
                kind = CrashDay.Kind.STUDY,
                reason = if (cluster.isEmpty())
                    "Nothing outstanding for this day -- use it for consolidation."
                else "Selected by blueprint weight and current evidence, with prerequisites placed " +
                    "before the concepts that depend on them.",
            ))
        }

        return CrashProgramme(
            band = band,
            daysToExam = input.daysToExam,
            days = days,
            shares = band.shares,
            unreachableWeight = unreachableWeight,
            unreachableGroups = groupWeights(unreachable),
            claim = claim(unreachableWeight, band),
            generatedAt = input.generatedAt,
            configVersion = config.version,
        )
    }

    /** What the programme is allowed to claim. Narrowed automatically as coverage falls. */
    fun claim(unreachableWeight: Double, band: AdaptiveConfig.CrashHorizonBand): String {
        val missing = (unreachableWeight * 100).roundToInt()
        return when {
            missing <= 0 ->
                "A ${band.days}-day programme covering your full exam blueprint, emphasising " +
                    "${band.emphasis.lowercase()}."
            missing < 15 ->
                "A ${band.days}-day programme covering most of your exam blueprint. About $missing% by " +
                    "weight has no approved questions yet and is not included."
            else ->
                "A partial ${band.days}-day programme. About $missing% of your blueprint by weight has no " +
                    "approved questions yet, so this cannot claim to cover your exam. Treat it as targeted " +
                    "practice, not a complete course."
        }
    }

    // MARK: - Internals

    private data class Reserved(val mocks: Int, val review: Int, val catchUp: Int)

    private fun reservedDays(band: AdaptiveConfig.CrashHorizonBand): Reserved = when {
        band.days <= 14 -> Reserved(2, 1, 1)
        band.days <= 30 -> Reserved(4, 2, 3)
        band.days <= 60 -> Reserved(4, 4, 5)
        else -> Reserved(5, 6, 7)
    }

    private fun kind(dayNumber: Int, total: Int, reserved: Reserved): CrashDay.Kind {
        if (dayNumber == total) return CrashDay.Kind.REST
        if (dayNumber == 1) return CrashDay.Kind.MOCK

        val mockInterval = maxOf(2, total / maxOf(1, reserved.mocks))
        if (dayNumber % mockInterval == 0 && dayNumber < total - 1) return CrashDay.Kind.MOCK

        val catchUpStart = total - reserved.catchUp
        if (dayNumber > catchUpStart) return CrashDay.Kind.CATCH_UP

        val reviewInterval = maxOf(3, total / maxOf(1, reserved.review))
        if (dayNumber % reviewInterval == 0) return CrashDay.Kind.REVIEW

        return CrashDay.Kind.STUDY
    }

    private fun reasonFor(kind: CrashDay.Kind): String = when (kind) {
        CrashDay.Kind.STUDY -> ""
        CrashDay.Kind.MOCK ->
            "A timed, blueprint-balanced assessment. Placed with enough time left to act on what it finds."
        CrashDay.Kind.REVIEW -> "Revisiting earlier days. Spacing is what makes compressed study hold."
        CrashDay.Kind.CATCH_UP ->
            "Deliberately empty. Something will slip, and a programme with no slack breaks the first time it does."
        CrashDay.Kind.REST -> "Rest. Consolidation happens in the gaps."
    }

    private fun groupWeights(nodes: List<BlueprintNode>): List<UnreachableGroup> {
        val groups = mutableMapOf<String, UnreachableGroup>()
        for (node in nodes) {
            val current = groups[node.groupId]
            groups[node.groupId] = if (current != null) current.copy(weight = current.weight + node.weight)
            else UnreachableGroup(node.groupId, node.groupLabel, node.weight)
        }
        return groups.values.sortedWith(
            compareByDescending<UnreachableGroup> { it.weight }.thenBy { it.groupId },
        )
    }
}
