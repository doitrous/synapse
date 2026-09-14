package com.synapse.app.core.essays

import kotlinx.serialization.Serializable
import kotlinx.serialization.json.Json
import kotlinx.serialization.json.JsonArray
import kotlinx.serialization.json.JsonObject

/**
 * A written exam question — the written half of a faculty paper, several
 * marked subparts rather than one free-text prompt. Ported from
 * `src/data/writtenQuestion.ts` / `src/data/questionFormat.ts`.
 *
 * Marking is the student's own, exactly as it is for [EssayQuestion]: nothing
 * here reads prose and decides whether it was right. The mark scheme is shown
 * after an answer is written, and the student ticks what they actually
 * covered per part.
 */
data class WrittenPart(
    val id: String,
    /** `a`, `b`, `i` — as the paper labels it. */
    val label: String,
    val prompt: String,
    /** Marks this part carries, as printed. Zero when the paper does not say. */
    val marks: Int,
    /** The components an answer must contain to earn the marks — a mark scheme, not a model essay. */
    val expectedPoints: List<String>,
    val conceptIds: List<String> = emptyList(),
    val dependsOnPartId: String? = null,
)

data class WrittenQuestion(
    val id: String,
    val title: String,
    val subjectId: String,
    val topic: String,
    /** The instruction above the parts — "Answer both parts". */
    val stem: String,
    val parts: List<WrittenPart>,
    val totalMarks: Int,
    val learningObjective: String? = null,
    val conceptIds: List<String> = emptyList(),
)

/** What the student ticked, per part id. */
typealias WrittenTicks = Map<String, List<String>>

data class WrittenPartScore(
    val partId: String,
    val label: String,
    val covered: Int,
    val total: Int,
    /**
     * Marks earned, apportioned across the part's expected points. A part
     * worth 5 with 4 expected points scores 1.25 per point. Kept fractional
     * rather than rounded per part: rounding each part and then totalling
     * drifts from the paper's own total.
     */
    val marks: Double,
    val outOf: Int,
)

data class WrittenScore(
    val parts: List<WrittenPartScore>,
    val marks: Double,
    val outOf: Int,
)

/**
 * Mark a written answer against the scheme, or null when it has not been marked.
 *
 * Null rather than zero, matching essays. Ticks are intersected with the
 * points that currently exist, so editing a question cannot leave an old tick
 * counting toward a point that is gone.
 */
fun markWritten(ticks: WrittenTicks?, parts: List<WrittenPart>): WrittenScore? {
    if (ticks == null) return null

    val scored = parts.map { part ->
        val present = part.expectedPoints.toSet()
        val ticked = (ticks[part.id] ?: emptyList()).filter { it in present }
        val total = part.expectedPoints.size
        val covered = ticked.size
        // A part with no published mark scheme cannot be marked — it scores
        // nothing rather than full marks, and the total says what was available.
        val marks = if (total > 0) (covered.toDouble() / total) * part.marks else 0.0
        WrittenPartScore(partId = part.id, label = part.label, covered = covered, total = total, marks = marks, outOf = part.marks)
    }

    return WrittenScore(
        parts = scored,
        marks = scored.sumOf { it.marks },
        outOf = scored.sumOf { it.outOf },
    )
}

/**
 * Whether every part has been marked. A part with no expected points counts
 * as done — there is nothing to tick, and waiting for a tick that cannot be
 * given would strand the student.
 */
fun writtenFullyMarked(ticks: WrittenTicks?, parts: List<WrittenPart>): Boolean {
    if (ticks == null) return false
    return parts.all { it.expectedPoints.isEmpty() || it.id in ticks }
}

/** Formats whose answer is prose a person writes. Ported from `WRITTEN_FORMATS` in `questionFormat.ts`. */
private val WRITTEN_FORMATS = setOf(
    "short_answer", "structured_written", "essay", "comparison_table", "multipart_written",
)

/**
 * Projects the raw managed-content authoring ledger into student-facing
 * [WrittenQuestion]s.
 *
 * Only `kind == "question"` items whose `questionData.format` is one of
 * [WRITTEN_FORMATS] and which carry at least one part are considered — a
 * written question with no parts is refused for the same reason an essay
 * with no key points is: there would be nothing to mark against.
 */
object WrittenProjection {

    private val json = Json { ignoreUnknownKeys = true }

    fun project(ledgerJson: String): List<WrittenQuestion> {
        val items = when (val element = json.parseToJsonElement(ledgerJson)) {
            is JsonArray -> decodeItems(element)
            is JsonObject -> {
                val itemsElement = element["items"]
                if (itemsElement is JsonArray) decodeItems(itemsElement) else emptyList()
            }
            else -> emptyList()
        }
        return items.filter { it.kind == "question" }.mapNotNull(::projectOne)
    }

    private fun decodeItems(array: JsonArray): List<WrittenLedgerItem> =
        array.mapNotNull { element ->
            runCatching { json.decodeFromJsonElement(WrittenLedgerItem.serializer(), element) }.getOrNull()
        }

    private fun projectOne(item: WrittenLedgerItem): WrittenQuestion? {
        if (item.status != "Published") return null
        if (item.title.isBlank()) return null

        val data = item.questionData ?: return null
        if (data.format !in WRITTEN_FORMATS) return null
        val parts = data.writtenParts.map {
            WrittenPart(it.id, it.label, it.prompt, it.marks, it.expectedPoints, it.conceptIds, it.dependsOnPartId)
        }
        if (parts.isEmpty()) return null

        val tags = data.tags
        val conceptIds = (tags?.mainConceptIds ?: tags?.conceptIds ?: emptyList()).distinct()

        return WrittenQuestion(
            id = item.id,
            title = item.title,
            subjectId = item.subjectId,
            topic = data.tags?.topic?.takeIf { it.isNotBlank() } ?: item.fields["Topic"]?.takeIf { it.isNotBlank() } ?: "General",
            stem = item.title,
            parts = parts,
            totalMarks = parts.sumOf { it.marks },
            learningObjective = data.learningObjective?.takeIf { it.isNotBlank() },
            conceptIds = conceptIds,
        )
    }
}

// --- Local wire shapes for the ledger --------------------------------------

@Serializable
private data class WrittenLedgerItem(
    val id: String,
    val kind: String,
    val title: String = "",
    val subjectId: String = "",
    val status: String = "",
    val fields: Map<String, String> = emptyMap(),
    val questionData: WrittenAuthoringDataWire? = null,
)

@Serializable
private data class WrittenAuthoringDataWire(
    val format: String? = null,
    val writtenParts: List<WrittenPartWire> = emptyList(),
    val learningObjective: String? = null,
    val tags: WrittenTagsWire? = null,
)

@Serializable
private data class WrittenPartWire(
    val id: String = "",
    val label: String = "",
    val prompt: String = "",
    val marks: Int = 0,
    val expectedPoints: List<String> = emptyList(),
    val conceptIds: List<String> = emptyList(),
    val dependsOnPartId: String? = null,
)

@Serializable
private data class WrittenTagsWire(
    val mainConceptIds: List<String>? = null,
    val conceptIds: List<String>? = null,
    val topic: String? = null,
)
