package com.synapse.app.core.qbank

import kotlinx.serialization.Serializable
import kotlinx.serialization.json.Json
import kotlinx.serialization.json.JsonArray
import kotlinx.serialization.json.JsonObject

/**
 * A multiple-response question: several options, more than one of them
 * right. Ported from `src/data/multiResponseQuestion.ts`.
 *
 * The single-answer [Question] bank cannot hold one — its stored answer is a
 * single option label, and everything built on that (a session's score,
 * per-subject accuracy, prior-test history) assumes exactly one choice per
 * question. This type and [markMultiResponse] give the format somewhere real
 * to live without widening that contract.
 *
 * [MultiResponseProjection] defines its own minimal `@Serializable` ledger
 * shapes locally (rather than reusing [ManagedContentItem] /
 * [QuestionAuthoringData] from [QuestionProjection]) so this file has no
 * dependency on those — only on [AnswerOption] from [Question].
 */
data class MultiResponseQuestion(
    val id: String,
    val subjectId: String,
    val topic: String,
    val stem: String,
    val options: List<AnswerOption>,
    val correctAnswers: List<String>,
    val learningObjective: String? = null,
    val conceptIds: List<String> = emptyList(),
)

/**
 * The result of marking a multi-response attempt, reported as three lists
 * rather than one score. "Select all that apply" fails in two different
 * ways — choosing something wrong, and leaving something out — and a
 * student who did one needs to know which, because they are different
 * mistakes. A single fraction hides that.
 */
data class MultiResponseResult(
    /** Correct labels the student chose. */
    val hit: List<String>,
    /** Incorrect labels the student chose. */
    val falsePositive: List<String>,
    /** Correct labels the student left out. */
    val missed: List<String>,
    /** Only when every correct label was chosen and no incorrect one was. */
    val allCorrect: Boolean,
)

/**
 * Mark a multi-response attempt against [question].
 *
 * Order-insensitive, and gentle with bad input: duplicate labels in
 * [selected] collapse (a repeated tap counts once), and labels that are not
 * one of [question]'s options are ignored rather than surfacing as a
 * spurious false positive.
 */
fun markMultiResponse(question: MultiResponseQuestion, selected: List<String>): MultiResponseResult {
    val validLabels = question.options.map { it.label }.toSet()
    val right = question.correctAnswers.toSet()
    val picked = selected.filter { it in validLabels }.toSet()

    val hit = picked.filter { it in right }
    val falsePositive = picked.filter { it !in right }
    val missed = right.filter { it !in picked }

    return MultiResponseResult(
        hit = hit,
        falsePositive = falsePositive,
        missed = missed,
        allCorrect = falsePositive.isEmpty() && missed.isEmpty() && right.isNotEmpty(),
    )
}

/**
 * Projects the raw managed-content authoring ledger (a `StateDoc.value` JSON
 * string) into student-facing [MultiResponseQuestion]s.
 *
 * Only `kind == "question"` items whose `questionData` marks them as
 * multi-response — a non-empty `multiResponse.correctAnswers`, or
 * `format == "mcq_multi"` — are considered. An item is dropped when it is
 * not Published, has no title, has fewer than two correct answers, or has
 * fewer than two usable options: a multi-response question with less than
 * that is not one, the same way [QuestionProjection] drops a single-answer
 * question that cannot be marked.
 */
object MultiResponseProjection {

    private val json = Json { ignoreUnknownKeys = true }

    fun project(ledgerJson: String): List<MultiResponseQuestion> {
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

    private fun decodeItems(array: JsonArray): List<MultiResponseLedgerItem> =
        array.mapNotNull { element ->
            runCatching { json.decodeFromJsonElement(MultiResponseLedgerItem.serializer(), element) }.getOrNull()
        }

    private fun projectOne(item: MultiResponseLedgerItem): MultiResponseQuestion? {
        if (item.status != "Published") return null
        if (item.title.isBlank()) return null

        val data = item.questionData ?: return null
        val correctAnswers = data.multiResponse?.correctAnswers ?: emptyList()
        val isMultiResponse = correctAnswers.isNotEmpty() || data.format == "mcq_multi"
        if (!isMultiResponse) return null
        if (correctAnswers.size < 2) return null

        val options = data.answers
            .filter { it.label.isNotEmpty() && it.text.isNotEmpty() }
            .map { AnswerOption(it.label, it.text, it.explanation) }
        if (options.size < 2) return null

        val tags = data.tags
        val conceptIds = tags?.mainConceptIds ?: tags?.conceptIds ?: emptyList()

        return MultiResponseQuestion(
            id = item.id,
            subjectId = item.subjectId,
            topic = item.fields["Topic"] ?: "",
            stem = item.title,
            options = options,
            correctAnswers = correctAnswers,
            learningObjective = data.learningObjective,
            conceptIds = conceptIds,
        )
    }
}

// --- Local wire shapes for the ledger (kept separate from
// QuestionProjection's ManagedContentItem/QuestionAuthoringData so this file
// has no dependency on Task 1's models) ------------------------------------

@Serializable
private data class MultiResponseLedgerItem(
    val id: String,
    val kind: String,
    val title: String = "",
    val subjectId: String = "",
    val status: String = "",
    val fields: Map<String, String> = emptyMap(),
    val questionData: MultiResponseAuthoringData? = null,
)

@Serializable
private data class MultiResponseAuthoringData(
    val format: String? = null,
    val answers: List<MultiResponseRawAnswer> = emptyList(),
    val multiResponse: MultiResponsePayload? = null,
    val learningObjective: String? = null,
    val tags: MultiResponseTags? = null,
)

@Serializable
private data class MultiResponseRawAnswer(
    val label: String = "",
    val text: String = "",
    val explanation: String = "",
)

@Serializable
private data class MultiResponsePayload(
    val correctAnswers: List<String> = emptyList(),
)

@Serializable
private data class MultiResponseTags(
    val mainConceptIds: List<String>? = null,
    val conceptIds: List<String>? = null,
)
