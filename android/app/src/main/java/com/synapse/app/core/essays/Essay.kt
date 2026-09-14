package com.synapse.app.core.essays

import kotlinx.serialization.Serializable
import kotlinx.serialization.json.Json
import kotlinx.serialization.json.JsonArray
import kotlinx.serialization.json.JsonObject

/**
 * A practice essay as a student sits it. Ported from `src/data/essay.ts`.
 *
 * There is no automated grader: a student's own prose is marked by the
 * student, by ticking which of the authored key points they actually made —
 * the same self-mark contract [com.synapse.app.core.qbank.Question] and
 * multi-response questions don't need, because free text can't be checked
 * against a single correct answer.
 */
data class EssayKeyPoint(
    val id: String,
    val text: String,
    /** One of the words an examiner scans for. Carried on the point rather than a separate list. */
    val legible: Boolean = false,
)

data class EssayQuestion(
    val id: String,
    val title: String,
    val subjectId: String,
    val prompt: String,
    val keyPoints: List<EssayKeyPoint>,
    val examinerNote: String,
    val modelAnswer: String,
)

/** How much of the answer was there, or null when it has not been marked. Ported from `coveredCount`. */
data class CoveredCount(val covered: Int, val total: Int)

/**
 * Null rather than zero: a student who has written an answer and not yet
 * marked it has not scored nothing, and showing "0 of 6" would say they did.
 *
 * Ticks are intersected with the points that currently exist, so editing a
 * question cannot leave an old tick counting toward a point that is gone.
 */
fun coveredCount(ticked: List<String>?, pointIds: List<String>): CoveredCount? {
    if (ticked == null) return null
    val present = pointIds.toSet()
    return CoveredCount(covered = ticked.count { it in present }, total = pointIds.size)
}

/**
 * Projects the raw managed-content authoring ledger (a `StateDoc.value` JSON
 * string) into student-facing [EssayQuestion]s.
 *
 * Only `kind == "essay"` items are considered. An essay with no prompt or no
 * key points is dropped — there would be nothing to mark yourself against,
 * which is the whole of the practice. Local wire shapes only (no dependency
 * on [com.synapse.app.core.qbank.ManagedContentItem]), matching how
 * `MultiResponseProjection` keeps its own ledger shapes apart from Task 1's.
 */
object EssayProjection {

    private val json = Json { ignoreUnknownKeys = true }

    fun project(ledgerJson: String): List<EssayQuestion> {
        val items = when (val element = json.parseToJsonElement(ledgerJson)) {
            is JsonArray -> decodeItems(element)
            is JsonObject -> {
                val itemsElement = element["items"]
                if (itemsElement is JsonArray) decodeItems(itemsElement) else emptyList()
            }
            else -> emptyList()
        }
        return items.filter { it.kind == "essay" }.mapNotNull(::projectOne)
    }

    private fun decodeItems(array: JsonArray): List<EssayLedgerItem> =
        array.mapNotNull { element ->
            runCatching { json.decodeFromJsonElement(EssayLedgerItem.serializer(), element) }.getOrNull()
        }

    private fun projectOne(item: EssayLedgerItem): EssayQuestion? {
        if (item.status != "Published") return null
        if (item.title.isBlank()) return null

        val data = item.essayData ?: return null
        if (data.prompt.isBlank()) return null
        if (data.keyPoints.isEmpty()) return null

        return EssayQuestion(
            id = item.id,
            title = item.title,
            subjectId = item.subjectId,
            prompt = data.prompt,
            keyPoints = data.keyPoints.map { EssayKeyPoint(it.id, it.text, it.legible) },
            examinerNote = data.examinerNote,
            modelAnswer = data.modelAnswer,
        )
    }
}

// --- Local wire shapes for the ledger --------------------------------------

@Serializable
private data class EssayLedgerItem(
    val id: String,
    val kind: String,
    val title: String = "",
    val subjectId: String = "",
    val status: String = "",
    val essayData: EssayAuthoringDataWire? = null,
)

@Serializable
private data class EssayAuthoringDataWire(
    val prompt: String = "",
    val keyPoints: List<EssayKeyPointWire> = emptyList(),
    val examinerNote: String = "",
    val modelAnswer: String = "",
)

@Serializable
private data class EssayKeyPointWire(
    val id: String = "",
    val text: String = "",
    val legible: Boolean = false,
)
