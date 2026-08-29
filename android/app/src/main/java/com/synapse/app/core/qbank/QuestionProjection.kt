package com.synapse.app.core.qbank

import kotlinx.serialization.json.Json
import kotlinx.serialization.json.JsonArray
import kotlinx.serialization.json.JsonObject

/**
 * Projects the raw managed-content authoring ledger (a `StateDoc.value` JSON
 * string) into student-facing [Question]s.
 *
 * Only `kind == "question"` items are considered; everything else is
 * ignored. An item is dropped — rather than surfaced half-broken — when it
 * is not Published, has no title, has no usable options, or its authored
 * `correctAnswer` doesn't match any surviving option label. An unmarkable
 * question is worse than none.
 */
object QuestionProjection {

    private val json = Json { ignoreUnknownKeys = true }

    fun project(ledgerJson: String): List<Question> {
        val items = when (val element = json.parseToJsonElement(ledgerJson)) {
            is JsonArray -> decodeItems(element)
            is JsonObject -> {
                val itemsElement = element["items"]
                if (itemsElement is JsonArray) decodeItems(itemsElement) else emptyList()
            }
            else -> emptyList()
        }
        return items
            .filter { it.kind == "question" }
            .mapNotNull(::projectOne)
    }

    private fun decodeItems(array: JsonArray): List<ManagedContentItem> =
        array.mapNotNull { element ->
            runCatching { json.decodeFromJsonElement(ManagedContentItem.serializer(), element) }.getOrNull()
        }

    private fun projectOne(item: ManagedContentItem): Question? {
        if (item.status != "Published") return null
        if (item.title.isBlank()) return null

        val questionData = item.questionData ?: return null
        val options = questionData.answers
            .filter { it.label.isNotEmpty() && it.text.isNotEmpty() }
            .map { AnswerOption(it.label, it.text, it.explanation) }
        if (options.isEmpty()) return null

        val correctLabel = questionData.correctAnswer ?: return null
        if (options.none { it.label == correctLabel }) return null

        val tags = questionData.tags
        val conceptIds = tags?.mainConceptIds ?: tags?.conceptIds ?: emptyList()

        return Question(
            id = item.id,
            subjectId = item.subjectId,
            topic = item.fields["Topic"] ?: "",
            difficulty = item.fields["Difficulty"] ?: "Moderate",
            vignette = item.fields["Vignette"] ?: "",
            stem = item.title,
            options = options,
            correctLabel = correctLabel,
            explanation = item.fields["Explanation"] ?: "",
            learningObjective = questionData.learningObjective,
            estimatedSeconds = questionData.estimatedSeconds,
            libraryIds = questionData.libraryIds,
            conceptIds = conceptIds,
            universityIds = tags?.universityIds ?: emptyList(),
            years = tags?.years ?: emptyList(),
        )
    }

    /** Whether [q] is visible to a student at [universityId] in [year]. */
    fun inScope(q: Question, universityId: String?, year: String?): Boolean =
        ScopeMatch.universityMatches(q.universityIds, universityId) &&
            ScopeMatch.yearMatches(q.years, year)
}
