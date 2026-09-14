package com.synapse.app.core.minigames

/**
 * Authored medicine game packs, ported 1:1 (data and pure functions alike)
 * from web's `src/data/minigamePacks.ts`.
 *
 * These packs are static content: gameplay code may shuffle, score and render
 * them, but it never invents medical facts. On web, admin-authored packs
 * beyond this hardcoded seed set are synced from the
 * `synapse-minigame-packs-v1` catalogue key. That key lives behind an
 * admin/content tab in the server's read-whitelist, so it is **not**
 * student-readable — fetching it from this (student) app would 403. Rather
 * than add it to `core/sync/StudentReadableKeys.kt` (which would break sync
 * entirely) or fabricate packs to fill the gap, this port ships only the
 * built-in [MINI_GAME_PACKS] below and defers admin-authored packs pending a
 * server-side change that makes that key student-readable.
 *
 * Pure module: no Android framework, no storage, no clock — mirrors web's own
 * "pure module: no React, no storage, no clock" discipline.
 */

enum class MiniGameKind { CLINICAL_SEQUENCE, MECHANISM_CHAIN, RED_FLAG_SORT }

data class MiniGameSource(
    val label: String,
    val reviewedBy: String,
    val url: String? = null,
    val reviewedAt: String? = null,
)

/** One step in an ordered (clinical-sequence/mechanism-chain) pack. */
data class OrderedStep(val id: String, val text: String)

enum class RedFlagLane { URGENT, ROUTINE }

data class RedFlagFinding(
    val id: String,
    val text: String,
    val lane: RedFlagLane,
    val rationale: String,
)

/** A pack: either an ordered chain of steps, or a red-flag sort — mirrors web's `MiniGamePack` union, discriminated the Kotlin way via sealed types instead of a `kind` literal union. */
sealed interface MiniGamePack {
    val id: String
    val kind: MiniGameKind
    val title: String
    val subjectId: String
    val topic: String
    val summary: String
    val source: MiniGameSource
}

/** Clinical Sequence or Mechanism Chain — reconstruct the authored order. */
data class OrderedMiniGamePack(
    override val id: String,
    override val kind: MiniGameKind,
    override val title: String,
    override val subjectId: String,
    override val topic: String,
    override val summary: String,
    override val source: MiniGameSource,
    val prompt: String,
    val steps: List<OrderedStep>,
    val explanation: String,
) : MiniGamePack

/** Red Flag Sort — classify authored findings into the authored lane. */
data class RedFlagSortPack(
    override val id: String,
    override val title: String,
    override val subjectId: String,
    override val topic: String,
    override val summary: String,
    override val source: MiniGameSource,
    val prompt: String,
    val lanes: Map<RedFlagLane, String>,
    val findings: List<RedFlagFinding>,
) : MiniGamePack {
    override val kind: MiniGameKind get() = MiniGameKind.RED_FLAG_SORT
}

/** The built-in, reviewed seed packs — ported verbatim from `MINI_GAME_PACKS` on web. */
val MINI_GAME_PACKS: List<MiniGamePack> = listOf(
    OrderedMiniGamePack(
        id = "cs-basic-life-support-primary-survey",
        kind = MiniGameKind.CLINICAL_SEQUENCE,
        title = "Basic life support primary survey",
        subjectId = "fnd",
        topic = "Emergencies & red flags",
        summary = "Order the first response steps for an unresponsive adult in a teaching scenario.",
        prompt = "Place the actions in the order a responder should take before ongoing reassessment.",
        source = MiniGameSource(label = "Synapse authored emergency-skills seed pack", reviewedBy = "Content operations"),
        steps = listOf(
            OrderedStep("danger", "Check the scene for danger before approaching."),
            OrderedStep("response", "Check responsiveness and call for help."),
            OrderedStep("airway", "Open the airway."),
            OrderedStep("breathing", "Check breathing."),
            OrderedStep("compressions", "Start chest compressions if breathing is absent or abnormal."),
            OrderedStep("aed", "Attach an AED as soon as it is available and follow prompts."),
        ),
        explanation = "The pack follows the authored primary-survey order; the game only asks students to reconstruct that order.",
    ),
    OrderedMiniGamePack(
        id = "mc-heart-failure-compensation",
        kind = MiniGameKind.MECHANISM_CHAIN,
        title = "Heart failure compensation loop",
        subjectId = "cvs",
        topic = "Heart failure",
        summary = "Order the authored cause-to-effect chain behind short-term compensation and longer-term worsening.",
        prompt = "Arrange the mechanism from the initiating haemodynamic problem to the maladaptive outcome.",
        source = MiniGameSource(label = "Synapse authored CVS seed pack", reviewedBy = "Content operations"),
        steps = listOf(
            OrderedStep("low-output", "Reduced effective cardiac output is sensed."),
            OrderedStep("sympathetic", "Sympathetic and renin–angiotensin activation increase."),
            OrderedStep("retention", "Salt and water retention raises filling pressures."),
            OrderedStep("wall-stress", "Higher wall stress increases myocardial workload."),
            OrderedStep("remodelling", "Progressive remodelling worsens pump function."),
        ),
        explanation = "Each step is authored as a fixed chain; no mechanism is generated by the app at runtime.",
    ),
    RedFlagSortPack(
        id = "rf-respiratory-escalation",
        title = "Respiratory escalation signals",
        subjectId = "resp",
        topic = "Respiratory safety",
        summary = "Sort respiratory findings into urgent escalation versus routine review.",
        prompt = "Classify each authored finding by the action it should trigger in this learning scenario.",
        source = MiniGameSource(label = "Synapse authored respiratory seed pack", reviewedBy = "Content operations"),
        lanes = mapOf(
            RedFlagLane.URGENT to "Urgent escalation",
            RedFlagLane.ROUTINE to "Routine review",
        ),
        findings = listOf(
            RedFlagFinding(
                id = "silent-chest",
                text = "Silent chest with marked breathlessness",
                lane = RedFlagLane.URGENT,
                rationale = "This is authored as an emergency-pattern finding in this pack.",
            ),
            RedFlagFinding(
                id = "cyanosis",
                text = "Cyanosis or exhaustion",
                lane = RedFlagLane.URGENT,
                rationale = "This is authored as an urgent deterioration signal in this pack.",
            ),
            RedFlagFinding(
                id = "mild-cough",
                text = "Mild cough with normal activity and no distress",
                lane = RedFlagLane.ROUTINE,
                rationale = "This is authored here as appropriate for routine review.",
            ),
            RedFlagFinding(
                id = "inhaler-technique",
                text = "Poor inhaler technique without acute distress",
                lane = RedFlagLane.ROUTINE,
                rationale = "This pack classifies it as a routine education/review issue.",
            ),
            RedFlagFinding(
                id = "saba-overuse",
                text = "Frequent SABA use without inhaled corticosteroid cover",
                lane = RedFlagLane.URGENT,
                rationale = "The authored library seed marks this as a red flag for poor control and exacerbation risk.",
            ),
            RedFlagFinding(
                id = "stable-wheeze",
                text = "Occasional wheeze responding to the usual reliever plan",
                lane = RedFlagLane.ROUTINE,
                rationale = "This pack treats the stable pattern as a routine follow-up finding.",
            ),
        ),
    ),
)

/** Validation errors for [pack] — empty means valid. Ported from web's `validateMiniGamePack`. */
fun validateMiniGamePack(pack: MiniGamePack): List<String> {
    val errors = mutableListOf<String>()
    if (pack.id.isBlank()) errors += "id is required"
    if (pack.title.isBlank()) errors += "${pack.id}: title is required"
    if (pack.subjectId.isBlank()) errors += "${pack.id}: subjectId is required"
    if (pack.topic.isBlank() || pack.summary.isBlank()) errors += "${pack.id}: topic and summary are required"
    if (pack.source.label.isBlank() || pack.source.reviewedBy.isBlank()) errors += "${pack.id}: reviewed source metadata is required"

    when (pack) {
        is RedFlagSortPack -> {
            if (pack.lanes[RedFlagLane.URGENT].isNullOrBlank() || pack.lanes[RedFlagLane.ROUTINE].isNullOrBlank()) {
                errors += "${pack.id}: both red-flag lanes are required"
            }
            if (pack.findings.size < 4) errors += "${pack.id}: at least four findings are required"
            val lanes = pack.findings.map { it.lane }.toSet()
            if (RedFlagLane.URGENT !in lanes || RedFlagLane.ROUTINE !in lanes) {
                errors += "${pack.id}: both urgent and routine findings are required"
            }
            for (finding in pack.findings) {
                if (finding.id.isBlank() || finding.text.isBlank() || finding.rationale.isBlank()) {
                    errors += "${pack.id}: every finding needs id, text and rationale"
                }
            }
        }

        is OrderedMiniGamePack -> {
            if (pack.steps.size < 3) errors += "${pack.id}: at least three ordered steps are required"
            for (step in pack.steps) {
                if (step.id.isBlank() || step.text.isBlank()) errors += "${pack.id}: every step needs id and text"
            }
            if (pack.steps.map { it.id }.toSet().size != pack.steps.size) errors += "${pack.id}: step ids must be unique"
        }
    }
    return errors
}

/** [MINI_GAME_PACKS] filtered to [kind] (or all, if null) and passing [validateMiniGamePack]. Ported from web's `validMiniGamePacks`. */
fun validMiniGamePacks(kind: MiniGameKind? = null): List<MiniGamePack> =
    MINI_GAME_PACKS.filter { (kind == null || it.kind == kind) && validateMiniGamePack(it).isEmpty() }

/** [pack]'s step ids, shuffled deterministically from [seed]. Ported from web's `shuffledStepIds`. */
fun shuffledStepIds(pack: OrderedMiniGamePack, seed: Int): List<String> =
    shuffle(pack.steps.map { it.id }, seededRandom(seed))

data class OrderedStepScore(
    val exactPositions: Int,
    val total: Int,
    val complete: Boolean,
    val correct: List<String>,
)

/** Score [submittedIds] against [pack]'s authored order. Ported from web's `scoreOrderedSteps`. */
fun scoreOrderedSteps(pack: OrderedMiniGamePack, submittedIds: List<String>): OrderedStepScore {
    val correct = pack.steps.map { it.id }
    var exactPositions = 0
    for (i in correct.indices) {
        if (submittedIds.getOrNull(i) == correct[i]) exactPositions++
    }
    return OrderedStepScore(
        exactPositions = exactPositions,
        total = correct.size,
        complete = submittedIds.size == correct.size && submittedIds.all { it in correct },
        correct = correct,
    )
}

data class RedFlagFindingResult(
    val finding: RedFlagFinding,
    val selected: RedFlagLane?,
    val correct: Boolean,
)

data class RedFlagScore(
    val correct: Int,
    val total: Int,
    val results: List<RedFlagFindingResult>,
)

/** Score [placements] (finding id -> chosen lane) against [pack]'s authored lanes. Ported from web's `scoreRedFlagSort`. */
fun scoreRedFlagSort(pack: RedFlagSortPack, placements: Map<String, RedFlagLane>): RedFlagScore {
    var correctCount = 0
    val results = pack.findings.map { finding ->
        val selected = placements[finding.id]
        val matched = selected == finding.lane
        if (matched) correctCount++
        RedFlagFindingResult(finding, selected, matched)
    }
    return RedFlagScore(correct = correctCount, total = pack.findings.size, results = results)
}
