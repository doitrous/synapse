package com.synapse.android.core.adaptive

import kotlin.math.roundToInt
import kotlinx.serialization.Serializable

/** How one blueprint group came out. */
@Serializable
data class GroupResult(
    val groupId: String,
    val groupLabel: String = groupId,
    val answered: Int = 0,
    val correct: Int = 0,
    /** Null when too few items to report a range for this group honestly. */
    val lower: Double? = null,
    val upper: Double? = null,
    val insufficient: Boolean = false,
)

/** A blueprint area the assessment could not represent -- the honest asterisk on the score. */
@Serializable
data class UnderRepresentedGroup(
    val groupId: String,
    val groupLabel: String = groupId,
    val wanted: Int = 0,
    val got: Int = 0,
)

/**
 * The stored result of a readiness assessment.
 *
 * Read-only on Android: the assessment runner lives on web/iOS, so this surface
 * displays the last result the student earned there. A port of the persisted
 * shape from `src/data/adaptive/readiness.ts`.
 */
@Serializable
data class ReadinessResult(
    val id: String = "",
    val at: String = "",
    /** Blueprint-balanced score interval, 0-1. Never a single number. */
    val lower: Double = 0.0,
    val upper: Double = 0.0,
    val answered: Int = 0,
    val omitted: Int = 0,
    val medianSeconds: Double? = null,
    val groups: List<GroupResult> = emptyList(),
    val underRepresented: List<UnderRepresentedGroup> = emptyList(),
    val configVersion: Int = 1,
    val blueprintVersion: Int? = null,
) {
    companion object {
        const val KEY = "nishany.progress.adaptive.readiness.v1"
    }
}

/**
 * Readiness copy. Only the display half is ported: the scoring half
 * (`wilsonInterval`, `score`) belongs to the assessment runner, which Android
 * does not have yet, so it is deferred rather than ported dead.
 * ponytail: port scoring when an on-device readiness runner lands.
 */
object Readiness {

    /** A readiness range in words. Never a single number, never a promise. */
    fun sentence(result: ReadinessResult?): String {
        if (result == null || result.answered <= 0) {
            return "No readiness assessment yet. Practice accuracy is not a substitute -- adaptive blocks " +
                "deliberately oversample your weak areas."
        }
        val lower = (result.lower * 100).roundToInt()
        val upper = (result.upper * 100).roundToInt()

        var caveat = ""
        if (result.underRepresented.isNotEmpty()) {
            val count = result.underRepresented.size
            caveat = " $count blueprint area${if (count == 1) "" else "s"} could not be fully " +
                "represented, so treat this as provisional."
        }
        return "On blueprint-balanced questions held back from your practice, your performance is " +
            "between $lower% and $upper%.$caveat"
    }
}
