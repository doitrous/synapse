package com.synapse.android.core.model

import kotlinx.serialization.json.Json
import kotlinx.serialization.json.JsonArray
import kotlinx.serialization.json.JsonElement
import kotlinx.serialization.json.JsonObject
import kotlinx.serialization.json.JsonPrimitive
import kotlinx.serialization.json.contentOrNull

/**
 * One answer option, with the explanation for choosing it.
 *
 * Every option carries its own explanation, not just the correct one — that
 * is the point of the question bank. A student who picked B learns why B is
 * wrong, which is the thing they actually needed to read.
 */
data class AnswerOption(
    val label: String,
    val text: String,
    val explanation: String,
)

/** A question as a student sits it. */
data class Question(
    val id: String,
    val subjectId: String,
    /** The chapter this question was filed under. */
    val topic: String,
    val difficulty: String,
    /** The clinical scenario. May be empty for a bare recall question. */
    val vignette: String,
    /** The question itself. */
    val stem: String,
    val options: List<AnswerOption>,
    /** The label of the correct option, e.g. "C". */
    val correctLabel: String,
    /** The overall explanation, shown once the answer is revealed. */
    val explanation: String,
    /**
     * Held back until the answer is revealed — it names what is being
     * tested, so showing it first gives the answer away.
     */
    val learningObjective: String?,
    val estimatedSeconds: Int?,
    /** Library articles this question tests. */
    val libraryIds: List<String>,
    /** The concepts it actually assesses, for the mastery ledger. */
    val conceptIds: List<String>,
) {
    val correctOption: AnswerOption? get() = options.firstOrNull { it.label == correctLabel }

    fun isCorrect(label: String): Boolean = label == correctLabel
}

/**
 * Builds a sittable question from a ledger item.
 *
 * Written against the shape the authoring pipeline actually writes, which is
 * not the shape the TypeScript interfaces suggest. In live content the stem
 * is the item's `title`, and the vignette and explanation are in `fields` —
 * the `vignette`, `stem` and `explanation` keys inside `questionData` are
 * unused across every published question. Reading those would render blank
 * questions and nothing would report an error.
 */
object QuestionProjection {

    fun project(item: LedgerItem): Question? {
        if (item.kind != ContentKind.QUESTION) return null
        val record = item.raw.parseObjectOrNull() ?: return null

        val data = record["questionData"]?.jsonObjectOrNull()
        val fields = record["fields"]?.jsonObjectOrNull()
        val tags = data?.get("tags")?.jsonObjectOrNull()

        val options = optionsOf(data?.get("answers"))
        val correctLabel = data?.get("correctAnswer")?.stringOrNull()?.trim().orEmpty()

        // A question whose correct answer is not among its options cannot be
        // marked, so it is not a question — it is a broken record, and
        // showing it would mark every attempt wrong.
        if (options.isEmpty() || options.none { it.label == correctLabel }) return null

        val stem = item.title.trim()
        if (stem.isEmpty()) return null

        return Question(
            id = item.id,
            subjectId = item.subjectId,
            topic = fields?.get("Topic")?.stringOrNull()?.trim().orEmpty(),
            difficulty = fields?.get("Difficulty")?.stringOrNull()?.trim() ?: "Moderate",
            vignette = fields?.get("Vignette")?.stringOrNull()?.trim().orEmpty(),
            stem = stem,
            options = options,
            correctLabel = correctLabel,
            explanation = fields?.get("Explanation")?.stringOrNull()?.trim().orEmpty(),
            learningObjective = data?.get("learningObjective")?.stringOrNull()?.trim()?.takeIf { it.isNotEmpty() },
            estimatedSeconds = (data?.get("estimatedSeconds") as? JsonPrimitive)?.content?.toIntOrNull(),
            libraryIds = data?.get("libraryIds")?.stringListOrEmpty() ?: emptyList(),
            conceptIds = tags?.get("mainConceptIds")?.stringListOrEmpty()
                ?: tags?.get("conceptIds")?.stringListOrEmpty()
                ?: emptyList(),
        )
    }

    /**
     * Authored questions carry a fixed A–F block, so the unused labels
     * arrive as entries with empty text. Rendering them would offer a
     * student blank options to choose between.
     */
    private fun optionsOf(raw: JsonElement?): List<AnswerOption> {
        val entries = raw as? JsonArray ?: return emptyList()
        return entries.mapNotNull { entry ->
            val obj = entry.jsonObjectOrNull() ?: return@mapNotNull null
            val label = obj["label"]?.stringOrNull()?.trim().orEmpty()
            val text = obj["text"]?.stringOrNull()?.trim().orEmpty()
            if (label.isEmpty() || text.isEmpty()) return@mapNotNull null
            AnswerOption(
                label = label,
                text = text,
                explanation = obj["explanation"]?.stringOrNull()?.trim().orEmpty(),
            )
        }
    }
}

private fun String.parseObjectOrNull(): JsonObject? =
    try {
        Json.parseToJsonElement(this) as? JsonObject
    } catch (e: Exception) {
        null
    }

private fun JsonElement.jsonObjectOrNull(): JsonObject? = this as? JsonObject

private fun JsonElement.stringOrNull(): String? = (this as? JsonPrimitive)?.contentOrNull

private fun JsonElement.stringListOrEmpty(): List<String> =
    (this as? JsonArray)?.mapNotNull { it.stringOrNull() }.orEmpty()
