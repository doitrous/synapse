package com.synapse.app.core.adaptive

import kotlinx.serialization.Serializable
import java.time.Instant
import kotlin.math.sqrt

/**
 * Measuring where the student actually stands.
 *
 * Port of `src/data/adaptive/readiness.ts`. Adaptive practice deliberately
 * oversamples weakness, so accuracy inside it is a biased estimator of exam
 * performance — reliably pessimistic, and getting more so the better the
 * algorithm works. Reporting it as readiness would be a lie the system tells
 * more confidently over time.
 *
 * So readiness is measured by a separate instrument: blueprint-balanced,
 * timed, mixed, drawn from items held back from ordinary practice, with no
 * adaptive substitution once it starts. The two systems share a question
 * bank and nothing else.
 *
 * The result is always a **range**. Forty questions cannot support a point
 * estimate, and printing one would invite exactly the over-reading the
 * product exists to prevent.
 */

private const val DAY_MS = 86_400_000L
private const val MIN_POOL_TO_RESERVE = 5

@Serializable
data class HeldOutRegistry(
    /** Explicitly reserved by an admin. Authoritative. */
    val itemIds: List<String>,
    /** When false, the deterministic auto-reserve below is not applied. */
    val autoReserveEnabled: Boolean,
    val updatedAt: String,
)

val EMPTY_HELD_OUT = HeldOutRegistry(itemIds = emptyList(), autoReserveEnabled = true, updatedAt = "")

/**
 * Whether an item is reserved for measurement.
 *
 * An admin flag decides it outright. Failing that, a deterministic hash
 * reserves a stable share of every concept's pool — deterministic so the
 * same item is reserved on every device and every rebuild, because an item
 * that drifts in and out of the held-out set is worse than no held-out set
 * at all.
 *
 * The auto-reserve is a floor for banks nobody has curated, not a
 * replacement for curation. A concept with only one or two items reserves
 * none of them: a blueprint node with no practice questions left teaches
 * nobody anything.
 */
fun isHeldOut(item: AdaptiveItem, registry: HeldOutRegistry, poolSizeForItem: Int, config: AdaptiveConfig): Boolean {
    if (registry.itemIds.contains(item.id)) return true
    if (!registry.autoReserveEnabled) return false
    if (poolSizeForItem < MIN_POOL_TO_RESERVE) return false

    // A stable per-item value in [0,1). Reserving the lowest slice is
    // equivalent to sampling at random, but repeatable without storing
    // anything.
    val draw = mulberry32(seedFrom(item.id))()
    return draw < config.readiness.autoReserveShare
}

/** Build the held-out set once for a whole catalogue. */
fun heldOutIds(items: List<AdaptiveItem>, registry: HeldOutRegistry, config: AdaptiveConfig): Set<String> {
    val poolByConcept = mutableMapOf<String, Int>()
    for (item in items) {
        for (conceptId in item.mainConceptIds) {
            poolByConcept[conceptId] = (poolByConcept[conceptId] ?: 0) + 1
        }
    }

    val held = mutableSetOf<String>()
    for (item in items) {
        val pool = item.mainConceptIds.fold(0) { max, id -> maxOf(max, poolByConcept[id] ?: 0) }
        if (isHeldOut(item, registry, pool, config)) held.add(item.id)
    }
    return held
}

data class ReadinessItem(
    val item: AdaptiveItem,
    /** The blueprint group this item was drawn to represent. */
    val groupId: String,
)

/** A blueprint area the assessment could not represent — the honest asterisk on the score. */
@Serializable
data class UnderRepresentedGroup(val groupId: String, val groupLabel: String, val wanted: Int, val supplied: Int)

data class ReadinessAssembly(
    val id: String,
    val items: List<ReadinessItem>,
    /** Groups the blueprint wanted but the pool could not supply. */
    val underRepresented: List<UnderRepresentedGroup>,
    val seed: Int,
    val createdAt: String,
)

/**
 * Assemble a blueprint-balanced assessment.
 *
 * Slots are apportioned to blueprint groups by weight, then filled from
 * held-out items that have not been seen in practice recently. Where a group
 * cannot be filled, the shortfall is **reported rather than backfilled from
 * elsewhere** — a 40-item assessment that quietly became 30 cardiology items
 * is not blueprint-balanced, and reporting a range from it would be worse
 * than reporting nothing.
 */
fun assembleReadiness(
    items: List<AdaptiveItem>,
    heldOut: Set<String>,
    nodes: List<BlueprintNode>,
    nodeByConcept: Map<String, BlueprintNode>,
    scope: ItemScope,
    /** Question id -> ISO timestamp last shown in practice. */
    lastPracticedAt: Map<String, String>,
    config: AdaptiveConfig,
    assessmentId: String,
    now: Instant,
): ReadinessAssembly {
    val seed = seedFrom(assessmentId)
    val random = mulberry32(seed)

    val excludeBefore = now.toEpochMilli() - config.readiness.exposureExclusionDays * DAY_MS

    val eligible = items.filter { item ->
        if (!heldOut.contains(item.id)) return@filter false
        if (!itemInScope(item, scope)) return@filter false
        val seenAt = lastPracticedAt[item.id]
        // Recently practised items measure recall of that session, not
        // preparedness.
        if (seenAt != null && Instant.parse(seenAt).toEpochMilli() >= excludeBefore) return@filter false
        item.conceptIds.any { nodeByConcept.containsKey(it) }
    }

    val byGroup = mutableMapOf<String, MutableList<AdaptiveItem>>()
    for (item in eligible) {
        val node = item.conceptIds.firstNotNullOfOrNull { nodeByConcept[it] } ?: continue
        byGroup.getOrPut(node.groupId) { mutableListOf() }.add(item)
    }

    val groupOrder = mutableListOf<String>()
    val groupWeights = mutableMapOf<String, Pair<String, Double>>()
    for (node in nodes) {
        val current = groupWeights[node.groupId]
        if (current != null) {
            groupWeights[node.groupId] = current.first to current.second + node.weight
        } else {
            groupOrder.add(node.groupId)
            groupWeights[node.groupId] = node.groupLabel to node.weight
        }
    }

    val size = config.readiness.assessmentSize
    val chosen = mutableListOf<ReadinessItem>()
    val underRepresented = mutableListOf<UnderRepresentedGroup>()

    // Largest-remainder again, for the same reason as block allocation: 40
    // items across nine groups cannot represent nine percentages by rounding
    // each one.
    data class Wanted(val groupId: String, val label: String, val exact: Double)
    val wanted = groupOrder
        .map { groupId -> val (label, weight) = groupWeights.getValue(groupId); Wanted(groupId, label, size * weight) }
        .sortedWith(compareByDescending<Wanted> { it.exact }.thenBy { it.groupId })

    data class Slot(val groupId: String, val label: String, val exact: Double, var slots: Int, val remainder: Double)
    var assigned = 0
    val slots = wanted.map { entry ->
        val floor = kotlin.math.floor(entry.exact).toInt()
        assigned += floor
        Slot(entry.groupId, entry.label, entry.exact, floor, entry.exact - floor)
    }
    val spare = size - assigned
    val sortedSlots = slots.sortedWith(compareByDescending<Slot> { it.remainder }.thenBy { it.groupId })
    for (i in 0 until spare) sortedSlots[i % sortedSlots.size].slots += 1

    for (group in sortedSlots) {
        if (group.slots <= 0) continue
        val pool = (byGroup[group.groupId] ?: emptyList())
            .map { it to random() }
            .sortedBy { it.second }
            .map { it.first }

        val take = pool.take(group.slots)
        for (item in take) chosen.add(ReadinessItem(item, group.groupId))
        if (take.size < group.slots) {
            underRepresented.add(UnderRepresentedGroup(group.groupId, group.label, group.slots, take.size))
        }
    }

    // Interleave so consecutive items come from different groups. A mixed
    // assessment is part of the protocol, not a presentation preference:
    // blocked topics let a student settle into one mode of thinking and
    // inflate the score.
    val interleaved = interleaveByGroup(chosen, random)

    return ReadinessAssembly(assessmentId, interleaved, underRepresented, seed, now.toString())
}

/** Round-robin across groups, largest group first, so no group clumps. */
private fun interleaveByGroup(items: List<ReadinessItem>, random: () -> Double): List<ReadinessItem> {
    val order = mutableListOf<String>()
    val groups = mutableMapOf<String, ArrayDeque<ReadinessItem>>()
    for (entry in items) {
        val bucket = groups[entry.groupId]
        if (bucket != null) {
            bucket.add(entry)
        } else {
            order.add(entry.groupId)
            groups[entry.groupId] = ArrayDeque(listOf(entry))
        }
    }
    val queues = order.map { groups.getValue(it) }.sortedWith(compareByDescending<ArrayDeque<ReadinessItem>> { it.size }.thenBy { random() })
    val out = mutableListOf<ReadinessItem>()
    var placed = 0
    while (placed < items.size) {
        for (queue in queues) {
            val next = queue.removeFirstOrNull()
            if (next != null) {
                out.add(next)
                placed += 1
            }
        }
    }
    return out
}

data class ReadinessAnswer(
    val questionId: String,
    val groupId: String,
    val correct: Boolean,
    val seconds: Double?,
    /** True when the student never answered — kept distinct from a wrong answer. */
    val omitted: Boolean,
)

@Serializable
data class GroupResult(
    val groupId: String,
    val groupLabel: String,
    val answered: Int,
    val correct: Int,
    /** Null when too few items to report honestly. */
    val lower: Double?,
    val upper: Double?,
    /** True when the pool could not supply enough items to report this group. */
    val insufficient: Boolean,
)

@Serializable
data class ReadinessResult(
    val id: String,
    val at: String,
    /** Blueprint-balanced score interval, 0-1. */
    val lower: Double,
    val upper: Double,
    val answered: Int,
    val omitted: Int,
    val medianSeconds: Double?,
    val groups: List<GroupResult>,
    /** Groups the assessment could not represent — the honest asterisk on the score. */
    val underRepresented: List<UnderRepresentedGroup>,
    val configVersion: Int,
    val blueprintVersion: Int?,
)

data class Interval(val lower: Double, val upper: Double)

/**
 * A Wilson score interval.
 *
 * Chosen over the textbook normal approximation because that one is badly
 * wrong exactly where this product needs it to be right: small samples and
 * proportions near 0 or 1. A student who got 18 of 20 correct should not be
 * shown an upper bound above 1.
 */
fun wilsonInterval(correct: Int, total: Int, confidence: Double): Interval {
    if (total <= 0) return Interval(0.0, 1.0)
    val z = zFor(confidence)
    val p = correct.toDouble() / total
    val denominator = 1 + (z * z) / total
    val centre = p + (z * z) / (2 * total)
    val spread = z * sqrt((p * (1 - p)) / total + (z * z) / (4.0 * total * total))
    return Interval(
        lower = maxOf(0.0, (centre - spread) / denominator),
        upper = minOf(1.0, (centre + spread) / denominator),
    )
}

/** The handful of confidence levels the console offers, rather than an erf. */
private fun zFor(confidence: Double): Double {
    val table = listOf(0.8 to 1.2816, 0.9 to 1.6449, 0.95 to 1.96, 0.99 to 2.5758)
    return table.fold(table[1]) { closest, entry ->
        if (kotlin.math.abs(entry.first - confidence) < kotlin.math.abs(closest.first - confidence)) entry else closest
    }.second
}

/**
 * Score an assessment.
 *
 * Omissions are excluded from the accuracy denominator but reported
 * separately. Counting a blank as wrong would fold a pacing problem into a
 * knowledge estimate; hiding it entirely would let a student skip everything
 * they found hard and receive a flattering range.
 */
fun scoreReadiness(
    assembly: ReadinessAssembly,
    answers: List<ReadinessAnswer>,
    groupLabels: Map<String, String>,
    config: AdaptiveConfig,
    blueprintVersion: Int?,
    at: String,
): ReadinessResult {
    val marked = answers.filter { !it.omitted }
    val correct = marked.count { it.correct }
    val overall = wilsonInterval(correct, marked.size, config.readiness.intervalConfidence)

    val order = mutableListOf<String>()
    val byGroup = mutableMapOf<String, MutableList<ReadinessAnswer>>()
    for (answer in answers) {
        val bucket = byGroup[answer.groupId]
        if (bucket != null) bucket.add(answer) else { order.add(answer.groupId); byGroup[answer.groupId] = mutableListOf(answer) }
    }

    val under = assembly.underRepresented.map { it.groupId }.toSet()

    val groups = order.map { groupId ->
        val entries = byGroup.getValue(groupId)
        val groupMarked = entries.filter { !it.omitted }
        val groupCorrect = groupMarked.count { it.correct }
        val enough = groupMarked.size >= config.readiness.minItemsPerTopicReport
        val interval = if (enough) wilsonInterval(groupCorrect, groupMarked.size, config.readiness.intervalConfidence) else null
        GroupResult(
            groupId = groupId,
            groupLabel = groupLabels[groupId] ?: groupId,
            answered = groupMarked.size,
            correct = groupCorrect,
            lower = interval?.lower,
            upper = interval?.upper,
            insufficient = !enough || under.contains(groupId),
        )
    }.sortedBy { it.groupLabel }

    val times = answers.mapNotNull { it.seconds }.sorted()
    val middle = times.size / 2
    val medianSeconds = if (times.isEmpty()) null else if (times.size % 2 == 1) times[middle] else (times[middle - 1] + times[middle]) / 2

    return ReadinessResult(
        id = assembly.id,
        at = at,
        lower = overall.lower,
        upper = overall.upper,
        answered = marked.size,
        omitted = answers.size - marked.size,
        medianSeconds = medianSeconds,
        groups = groups,
        underRepresented = assembly.underRepresented,
        configVersion = config.version,
        blueprintVersion = blueprintVersion,
    )
}

/**
 * Calibration: did the student's confidence match their accuracy?
 *
 * Reported alongside the score because knowing *that* you do not know is a
 * separate, teachable skill — and a student who is confidently wrong needs a
 * different intervention from one who is uncertainly right.
 */
data class CalibrationAnswer(val correct: Boolean, val confident: Boolean, val omitted: Boolean)

fun calibrationError(answers: List<CalibrationAnswer>): Double? {
    val marked = answers.filter { !it.omitted }
    if (marked.isEmpty()) return null
    val confident = marked.filter { it.confident }
    val unconfident = marked.filter { !it.confident }
    if (confident.isEmpty() || unconfident.isEmpty()) return null

    val confidentAccuracy = confident.count { it.correct }.toDouble() / confident.size
    val unconfidentAccuracy = unconfident.count { it.correct }.toDouble() / unconfident.size
    // Perfect calibration would put confident answers far above unconfident
    // ones. The error is how much of that expected separation is missing.
    return maxOf(0.0, 1 - (confidentAccuracy - unconfidentAccuracy))
}

/** A readiness range in words. Never a single number, never a promise. */
fun readinessSentence(result: ReadinessResult?): String {
    if (result == null || result.answered == 0) {
        return "No readiness assessment yet. Practice accuracy is not a substitute — adaptive blocks deliberately oversample your weak areas."
    }
    val lower = Math.round(result.lower * 100)
    val upper = Math.round(result.upper * 100)
    val caveat = if (result.underRepresented.isNotEmpty()) {
        val count = result.underRepresented.size
        " $count blueprint area${if (count == 1) "" else "s"} could not be fully represented, so treat this as provisional."
    } else {
        ""
    }
    return "On blueprint-balanced questions held back from your practice, your performance is between $lower% and $upper%.$caveat"
}
