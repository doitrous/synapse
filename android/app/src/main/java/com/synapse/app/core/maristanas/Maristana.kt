package com.synapse.app.core.maristanas

import kotlinx.serialization.Serializable
import kotlin.math.floor
import kotlin.math.max
import kotlin.math.min
import kotlin.math.roundToInt

/**
 * The construction economy behind Build Maristanas. Direct port of web's
 * `src/data/maristanas.ts` (the pure model — no iOS Maristanas screen exists,
 * so web is the sole source of truth). Kept byte-for-byte equivalent to the
 * TypeScript so the same evidence produces the same credits and hospital
 * layout on every client; `MaristanaTest.kt` ports `maristanas.test.ts`'s
 * vectors to keep the two in sync.
 *
 * A credit shown here must come from something the learning product can
 * explain: an active minute on a study surface, a server-marked answer, or the
 * score of an assessment-length question session. Decorative "XP" that cannot
 * be traced back to learning never enters this model.
 */

/** The shared, admin-authored catalogue key. Already student-readable — see `core/sync/StudentReadableKeys.kt`. */
const val MARISTANA_CONFIG_KEY = "synapse-maristana-config-v1"

/** The user-owned onboarding/dismissal doc — see `core/sync/UserStateKeys.kt`. */
const val MARISTANA_ONBOARDING_KEY = "synapse.maristanas.onboarding.v1"

const val MARISTANA_STEPS = 25

/**
 * Path web resolves the per-stage illustration from. Ported for parity with
 * `maristanas.ts`; Android ships no bundled per-stage art yet, so nothing
 * currently resolves this into a drawable — see `feature/maristanas/MaristanaScreen.kt`.
 */
fun maristanaStageAsset(stage: Int): String =
    "/maristana/stages/stage-${max(1, stage).toString().padStart(2, '0')}.webp"

@Serializable
data class MaristanaOnboardingState(val version: Int = 1, val completed: Boolean = false)

val DEFAULT_MARISTANA_ONBOARDING = MaristanaOnboardingState(version = 1, completed = false)

data class MaristanaMilestone(val stage: Int, val title: String, val description: String)

/**
 * The six moments students can recognise in the commissioned construction
 * sequence. They are architectural milestones, not invented XP ranks, so an
 * achievement always describes a visible change to the hospital itself.
 */
val MARISTANA_MILESTONES: List<MaristanaMilestone> = listOf(
    MaristanaMilestone(1, "Site prepared", "The perimeter and first foundation are in place."),
    MaristanaMilestone(5, "Courtyard planned", "The central court and its paths have been set out."),
    MaristanaMilestone(10, "Arcades raised", "The first clinical wings now enclose the court."),
    MaristanaMilestone(15, "Healing hall opened", "The central hall joins both sides of the Maristana."),
    MaristanaMilestone(20, "Dome crowned", "The hospital has received its defining crown."),
    MaristanaMilestone(25, "Maristana complete", "The hospital and its gardens are ready to serve."),
)

/**
 * The visible construction sequence in the commissioned 25-frame model.
 * These labels stay architectural and concrete so the roadmap describes the
 * part the student is actually working toward, not an abstract game level.
 */
val MARISTANA_BUILD_STEPS: List<String> = listOf(
    "Perimeter set", "Foundation bed", "Courtyard traced", "Main axis laid", "Entry steps formed",
    "West wing begun", "West arcade raised", "Front wall enclosed", "East wing framed", "Twin arcades joined",
    "Courtyard wings opened", "Central hall planned", "Healing hall raised", "Main portal framed", "Grand portal finished",
    "Rooflines secured", "Entrance masonry set", "Dome ribs assembled", "Dome crowned", "Main doors fitted",
    "Fountain opened", "Gardens planted", "Cypress court completed", "Tilework finished", "Maristana complete",
)

@Serializable
data class MaristanaConfig(
    val version: Int = 1,
    val enabled: Boolean = true,
    val creditsPerStep: Double = 100.0,
    val creditsPerStudyMinute: Double = 2.0,
    val creditsPerQuestion: Double = 2.0,
    val creditsPerCorrectAnswer: Double = 10.0,
    val assessmentMinimumQuestions: Int = 20,
    val creditsPerAssessmentPercent: Double = 1.5,
)

val DEFAULT_MARISTANA_CONFIG = MaristanaConfig()

/** Partial, possibly-untrusted config (an admin catalogue doc) before [normaliseMaristanaConfig] bounds it. */
@Serializable
data class MaristanaConfigInput(
    val enabled: Boolean? = null,
    val creditsPerStep: Double? = null,
    val creditsPerStudyMinute: Double? = null,
    val creditsPerQuestion: Double? = null,
    val creditsPerCorrectAnswer: Double? = null,
    val assessmentMinimumQuestions: Double? = null,
    val creditsPerAssessmentPercent: Double? = null,
)

private fun bounded(value: Double?, fallback: Double, minValue: Double, maxValue: Double): Double {
    if (value == null || !value.isFinite()) return fallback
    return min(maxValue, max(minValue, value))
}

/** Bound admin-authored values before they can affect progression. Direct port of `normaliseMaristanaConfig`. */
fun normaliseMaristanaConfig(input: MaristanaConfigInput?): MaristanaConfig {
    val safe = input ?: MaristanaConfigInput()
    return MaristanaConfig(
        version = 1,
        enabled = safe.enabled != false,
        creditsPerStep = bounded(safe.creditsPerStep, DEFAULT_MARISTANA_CONFIG.creditsPerStep, 20.0, 10_000.0),
        creditsPerStudyMinute = bounded(safe.creditsPerStudyMinute, DEFAULT_MARISTANA_CONFIG.creditsPerStudyMinute, 0.0, 100.0),
        creditsPerQuestion = bounded(safe.creditsPerQuestion, DEFAULT_MARISTANA_CONFIG.creditsPerQuestion, 0.0, 500.0),
        creditsPerCorrectAnswer = bounded(safe.creditsPerCorrectAnswer, DEFAULT_MARISTANA_CONFIG.creditsPerCorrectAnswer, 0.0, 1_000.0),
        assessmentMinimumQuestions = bounded(safe.assessmentMinimumQuestions, DEFAULT_MARISTANA_CONFIG.assessmentMinimumQuestions.toDouble(), 5.0, 200.0).roundToInt(),
        creditsPerAssessmentPercent = bounded(safe.creditsPerAssessmentPercent, DEFAULT_MARISTANA_CONFIG.creditsPerAssessmentPercent, 0.0, 100.0),
    )
}

@Serializable
data class MaristanaCreditBreakdown(val study: Int, val questions: Int, val accuracy: Int, val assessments: Int)

data class MaristanaCredits(val breakdown: MaristanaCreditBreakdown, val total: Int)

@Serializable
data class MaristanaHospital(
    val slot: Int,
    val name: String,
    val stage: Int,
    val completed: Boolean,
    val active: Boolean,
    val creditsInHospital: Int,
    val creditsToNextStep: Int,
    val stepProgress: Double,
)

/** One recently-earned construction credit, for the ledger's activity feed. `kind` is left as a raw wire string (tolerant of a server-added kind) rather than a closed enum. */
@Serializable
data class MaristanaRecentActivity(val id: String, val kind: String, val label: String, val detail: String, val credits: Int, val at: String)

@Serializable
data class MaristanaWeek(val studyMinutes: Int, val questionsAnswered: Int, val credits: Int)

@Serializable
data class MaristanaOverview(
    val enabled: Boolean,
    val config: MaristanaConfig,
    val totalCredits: Int,
    val completedHospitals: Int,
    val studyMinutes: Int,
    val questionsAnswered: Int,
    val correctAnswers: Int,
    val assessmentSessions: Int,
    val averageAssessmentScore: Int? = null,
    val breakdown: MaristanaCreditBreakdown,
    val hospitals: List<MaristanaHospital>,
    val recentActivity: List<MaristanaRecentActivity> = emptyList(),
    val thisWeek: MaristanaWeek,
)

data class MaristanaEvidence(
    val studyMinutes: Int,
    val questionsAnswered: Int,
    val correctAnswers: Int,
    val assessmentScores: List<Double>,
)

/** Direct port of `maristanaCredits`: every credit source stays separately explainable. */
fun maristanaCredits(evidence: MaristanaEvidence, config: MaristanaConfig = DEFAULT_MARISTANA_CONFIG): MaristanaCredits {
    val study = (max(0, evidence.studyMinutes) * config.creditsPerStudyMinute).roundToInt()
    val questions = (max(0, evidence.questionsAnswered) * config.creditsPerQuestion).roundToInt()
    val accuracy = (max(0, min(evidence.questionsAnswered, evidence.correctAnswers)) * config.creditsPerCorrectAnswer).roundToInt()
    val assessments = evidence.assessmentScores.sumOf { score -> max(0.0, min(100.0, score)) * config.creditsPerAssessmentPercent }.roundToInt()
    val breakdown = MaristanaCreditBreakdown(study, questions, accuracy, assessments)
    return MaristanaCredits(breakdown, breakdown.study + breakdown.questions + breakdown.accuracy + breakdown.assessments)
}

/** Direct port of `maristanaHospitals`: always keeps the next site visible, even on an exact boundary. */
fun maristanaHospitals(totalCredits: Number, config: MaristanaConfig = DEFAULT_MARISTANA_CONFIG, names: Map<Int, String> = emptyMap()): List<MaristanaHospital> {
    val hospitalCredits = config.creditsPerStep * MARISTANA_STEPS
    val total = max(0, floor(totalCredits.toDouble()).toInt())
    val completed = floor(total / hospitalCredits).toInt()
    val visible = max(1, completed + 1)
    return (1..visible).map { slot ->
        val index = slot - 1
        val available = max(0.0, total - index * hospitalCredits)
        val creditsInHospital = min(hospitalCredits, available)
        val stage = min(MARISTANA_STEPS, floor(creditsInHospital / config.creditsPerStep).toInt())
        val complete = stage == MARISTANA_STEPS
        val remainder = if (complete) 0.0 else creditsInHospital % config.creditsPerStep
        MaristanaHospital(
            slot = slot,
            name = names[slot] ?: "Maristana ${slot.toString().padStart(2, '0')}",
            stage = stage,
            completed = complete,
            active = slot == visible,
            creditsInHospital = creditsInHospital.roundToInt(),
            creditsToNextStep = if (complete) 0 else (config.creditsPerStep - remainder).roundToInt(),
            stepProgress = if (complete) 1.0 else remainder / config.creditsPerStep,
        )
    }
}

/** Default balance preview: one representative taught module. */
fun projectedModuleHospitals(config: MaristanaConfig = DEFAULT_MARISTANA_CONFIG): Double {
    val total = maristanaCredits(
        MaristanaEvidence(
            studyMinutes = 30 * 60,
            questionsAnswered = 300,
            correctAnswers = 225,
            assessmentScores = List(10) { 75.0 },
        ),
        config,
    ).total
    return total / (config.creditsPerStep * MARISTANA_STEPS)
}

data class MaristanaProgressDelta(
    val earnedCredits: Int,
    val stepsPlaced: Int,
    val hospitalName: String,
    val stage: Int,
    val nextStage: Int,
    val creditsToNextStep: Int,
    val stepProgress: Double,
    val hospitalCompleted: Boolean,
)

/** Build the small, global progress acknowledgement from two server ledgers. Direct port of `maristanaProgressDelta`. */
fun maristanaProgressDelta(previous: MaristanaOverview, next: MaristanaOverview): MaristanaProgressDelta? {
    val earnedCredits = next.totalCredits - previous.totalCredits
    if (!next.enabled || earnedCredits <= 0) return null
    val hospital = next.hospitals.firstOrNull { it.active } ?: next.hospitals.lastOrNull() ?: return null
    val stepCost = max(1.0, next.config.creditsPerStep)
    val stepsPlaced = max(0, floor(next.totalCredits / stepCost).toInt() - floor(previous.totalCredits / stepCost).toInt())
    return MaristanaProgressDelta(
        earnedCredits = earnedCredits,
        stepsPlaced = stepsPlaced,
        hospitalName = hospital.name,
        stage = hospital.stage,
        nextStage = min(MARISTANA_STEPS, hospital.stage + if (hospital.completed) 0 else 1),
        creditsToNextStep = hospital.creditsToNextStep,
        stepProgress = if (hospital.completed) 1.0 else hospital.stepProgress,
        hospitalCompleted = next.completedHospitals > previous.completedHospitals,
    )
}

/** A representative overview for previews/tests only — never a production fallback for a failed fetch (see `feature/maristanas/MaristanaRepository.kt`'s doc comment on degrading honestly). */
val DEMO_MARISTANA_OVERVIEW: MaristanaOverview = run {
    val evidence = MaristanaEvidence(
        studyMinutes = 1_327,
        questionsAnswered = 244,
        correctAnswers = 189,
        assessmentScores = listOf(72.0, 78.0, 81.0, 76.0, 84.0, 79.0, 88.0),
    )
    val (breakdown, total) = maristanaCredits(evidence)
    MaristanaOverview(
        enabled = true,
        config = DEFAULT_MARISTANA_CONFIG,
        totalCredits = total,
        completedHospitals = floor(total / (DEFAULT_MARISTANA_CONFIG.creditsPerStep * MARISTANA_STEPS)).toInt(),
        studyMinutes = evidence.studyMinutes,
        questionsAnswered = evidence.questionsAnswered,
        correctAnswers = evidence.correctAnswers,
        assessmentSessions = evidence.assessmentScores.size,
        averageAssessmentScore = evidence.assessmentScores.average().roundToInt(),
        breakdown = breakdown,
        hospitals = maristanaHospitals(total, DEFAULT_MARISTANA_CONFIG, mapOf(1 to "Al-Razi House", 2 to "Ibn Sina House", 3 to "The Courtyard")),
        thisWeek = MaristanaWeek(studyMinutes = 286, questionsAnswered = 63, credits = 1_094),
        recentActivity = emptyList(),
    )
}
