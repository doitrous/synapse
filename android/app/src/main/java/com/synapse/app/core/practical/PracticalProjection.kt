package com.synapse.app.core.practical

import kotlinx.serialization.Serializable
import kotlinx.serialization.json.Json
import kotlinx.serialization.json.JsonArray
import kotlinx.serialization.json.JsonElement
import kotlinx.serialization.json.JsonObject
import kotlinx.serialization.json.JsonPrimitive

/**
 * Projects the raw managed-content authoring ledger (a `StateDoc.value` JSON
 * string) into student-facing [Practical]s. A direct port of iOS's
 * `PracticalProjection` (`Core/Model/Practical.swift`).
 *
 * Only `kind == "practical"` items are considered; everything else is
 * ignored. An item is dropped when it is not Published — matching
 * `LibraryProjection`/`QuestionProjection`'s MVP publish gate.
 *
 * `practicalData`'s `markSections`/`decisions`/`questions` are parsed by hand
 * off raw [JsonElement]s rather than through `@Serializable` shapes, because
 * a mark-scheme item may be authored as a bare string or as `{text|label}` —
 * exactly the `Any` dance iOS's `PracticalProjection` does with
 * `JSONSerialization`.
 */
object PracticalProjection {

    private val json = Json { ignoreUnknownKeys = true }

    fun project(ledgerJson: String): List<Practical> {
        val parsed = runCatching { json.parseToJsonElement(ledgerJson) }.getOrNull()
        val items = when (parsed) {
            is JsonArray -> decodeItems(parsed)
            is JsonObject -> (parsed["items"] as? JsonArray)?.let(::decodeItems) ?: emptyList()
            else -> emptyList()
        }
        return items.filter { it.kind == "practical" }.mapNotNull(::projectOne)
    }

    private fun decodeItems(array: JsonArray): List<PracticalLedgerItem> =
        array.mapNotNull { element ->
            runCatching { json.decodeFromJsonElement(PracticalLedgerItem.serializer(), element) }.getOrNull()
        }

    private fun projectOne(item: PracticalLedgerItem): Practical? {
        if (item.status != "Published") return null
        if (item.title.isBlank()) return null

        val data = item.practicalData
        return Practical(
            id = item.id,
            title = item.title,
            subjectId = item.subjectId,
            type = item.fields["Type"]?.trim()?.ifBlank { null } ?: "Practical",
            difficulty = item.fields["Difficulty"]?.trim()?.ifBlank { null } ?: "Moderate",
            minutes = item.fields["Duration"]?.toIntOrNull(),
            marks = item.fields["Marks"]?.toIntOrNull(),
            learningObjective = data?.get("learningObjective").asText(),
            candidateInstructions = data?.get("candidateInstructions").asText()
                ?: item.fields["Candidate instructions"]?.trim()?.ifBlank { null },
            markSections = markSections(data?.get("markSections")),
            decisions = decisions(data?.get("decisions")),
            questions = labQuestions(data?.get("questions")),
            debrief = data?.get("debrief").asText() ?: item.fields["Debrief"]?.trim()?.ifBlank { null },
            references = (data?.get("references") as? JsonArray)?.mapNotNull { it.asText() } ?: emptyList(),
        )
    }

    private fun markSections(raw: JsonElement?): List<Practical.MarkSection> =
        (raw as? JsonArray)?.mapIndexedNotNull { index, element ->
            val obj = element as? JsonObject ?: return@mapIndexedNotNull null
            val items = (obj["items"] as? JsonArray)?.mapNotNull { it.asMarkItemText() } ?: emptyList()
            val title = obj["title"].asText() ?: ""
            if (items.isEmpty() && title.isBlank()) null
            else Practical.MarkSection(id = obj["id"].asText() ?: "sec-$index", title = title, items = items)
        } ?: emptyList()

    private fun decisions(raw: JsonElement?): List<Practical.Decision> =
        (raw as? JsonArray)?.mapIndexedNotNull { index, element ->
            val obj = element as? JsonObject ?: return@mapIndexedNotNull null
            val title = obj["title"].asText() ?: ""
            val context = obj["context"].asText() ?: ""
            if (title.isBlank() && context.isBlank()) null
            else Practical.Decision(
                id = obj["id"].asText() ?: "dec-$index",
                title = title,
                context = context,
                prompt = obj["prompt"].asText() ?: obj["question"].asText(),
                answer = obj["answer"].asText() ?: obj["explanation"].asText(),
            )
        } ?: emptyList()

    private fun labQuestions(raw: JsonElement?): List<Practical.LabQuestion> =
        (raw as? JsonArray)?.mapIndexedNotNull { index, element ->
            val obj = element as? JsonObject ?: return@mapIndexedNotNull null
            val prompt = obj["prompt"].asText() ?: obj["stem"].asText() ?: obj["question"].asText()
                ?: return@mapIndexedNotNull null
            Practical.LabQuestion(id = obj["id"].asText() ?: "q-$index", prompt = prompt, answer = obj["answer"].asText() ?: obj["explanation"].asText())
        } ?: emptyList()

    /** A mark-scheme item as authored: a bare string, or `{text|label}`. */
    private fun JsonElement.asMarkItemText(): String? = when (this) {
        is JsonPrimitive -> asText()
        is JsonObject -> this["text"].asText() ?: this["label"].asText()
        else -> null
    }.orEmptyToNull()

    private fun JsonElement?.asText(): String? = (this as? JsonPrimitive)?.takeIf { it.isString }?.content?.orEmptyToNull()

    private fun String?.orEmptyToNull(): String? = this?.trim()?.ifBlank { null }
}

/**
 * Minimal wire shape of one item in the managed-content authoring ledger,
 * reduced to what [PracticalProjection] needs. Kept local rather than shared
 * with `core.qbank.ManagedContentItem` for the same reason
 * `LibraryProjection`'s `ArticleLedgerItem` is: a decoupled feature that
 * happens to read the same ledger, not a shared namespace.
 */
@Serializable
private data class PracticalLedgerItem(
    val id: String,
    val kind: String,
    val title: String = "",
    val subjectId: String = "",
    val status: String = "",
    val fields: Map<String, String> = emptyMap(),
    val practicalData: JsonObject? = null,
)
