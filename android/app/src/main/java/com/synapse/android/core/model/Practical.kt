package com.synapse.android.core.model

import kotlinx.serialization.json.Json
import kotlinx.serialization.json.JsonArray
import kotlinx.serialization.json.JsonElement
import kotlinx.serialization.json.JsonObject
import kotlinx.serialization.json.JsonPrimitive
import kotlinx.serialization.json.contentOrNull

/**
 * A practical item: an OSCE station, a clinical case, a lab or imaging set,
 * or a skills checklist.
 *
 * The five formats are one content kind with different blocks filled in,
 * which is why [type] decides what a reader shows rather than a separate
 * type per screen.
 */
data class Practical(
    val id: String,
    val title: String,
    val subjectId: String,
    /**
     * As authored: "OSCE station", "Clinical case", "Lab interpretation",
     * "Imaging interpretation", "Skills checklist".
     */
    val type: String,
    val difficulty: String,
    val minutes: Int?,
    val marks: Int?,
    val learningObjective: String?,
    /** What the candidate is told before they start. */
    val candidateInstructions: String?,
    /** The mark scheme, as sections of tickable points. */
    val markSections: List<MarkSection>,
    /** A case's staged decision points. */
    val decisions: List<Decision>,
    /** A lab or imaging set's questions. */
    val questions: List<LabQuestion>,
    val debrief: String?,
    val references: List<String>,
) {
    data class MarkSection(val id: String, val title: String, val items: List<String>)

    data class Decision(
        val id: String,
        val title: String,
        val context: String,
        val prompt: String?,
        val answer: String?,
    )

    data class LabQuestion(val id: String, val prompt: String, val answer: String?)
}

/** Builds a sittable practical from a ledger item. */
object PracticalProjection {

    fun project(item: LedgerItem): Practical? {
        if (item.kind != ContentKind.PRACTICAL) return null
        val record = item.raw.parseObjectOrNull() ?: return null

        val data = record["practicalData"]?.jsonObjectOrNull()
        val fields = record["fields"]?.jsonObjectOrNull()

        return Practical(
            id = item.id,
            title = item.title,
            subjectId = item.subjectId,
            type = fields?.get("Type")?.stringOrNull()?.trim()?.takeIf { it.isNotEmpty() } ?: "Practical",
            difficulty = fields?.get("Difficulty")?.stringOrNull()?.trim() ?: "Moderate",
            minutes = fields?.get("Duration")?.stringOrNull()?.trim()?.toIntOrNull(),
            marks = fields?.get("Marks")?.stringOrNull()?.trim()?.toIntOrNull(),
            learningObjective = data?.get("learningObjective")?.stringOrNull()?.trim()?.takeIf { it.isNotEmpty() },
            candidateInstructions = data?.get("candidateInstructions")?.stringOrNull()?.trim()?.takeIf { it.isNotEmpty() }
                ?: fields?.get("Candidate instructions")?.stringOrNull()?.trim()?.takeIf { it.isNotEmpty() },
            markSections = markSectionsOf(data?.get("markSections")),
            decisions = decisionsOf(data?.get("decisions")),
            questions = labQuestionsOf(data?.get("questions")),
            debrief = data?.get("debrief")?.stringOrNull()?.trim()?.takeIf { it.isNotEmpty() }
                ?: fields?.get("Debrief")?.stringOrNull()?.trim()?.takeIf { it.isNotEmpty() },
            references = data?.get("references")?.stringListOrEmpty() ?: emptyList(),
        )
    }

    private fun markSectionsOf(raw: JsonElement?): List<Practical.MarkSection> {
        val array = raw as? JsonArray ?: return emptyList()
        return array.mapIndexedNotNull { index, entry ->
            val obj = entry.jsonObjectOrNull() ?: return@mapIndexedNotNull null
            val items = (obj["items"] as? JsonArray)?.mapNotNull { itemElement ->
                when (itemElement) {
                    is JsonPrimitive -> itemElement.contentOrNull?.trim()?.takeIf { it.isNotEmpty() }
                    else -> itemElement.jsonObjectOrNull()?.let { entryObject ->
                        (entryObject["text"]?.stringOrNull() ?: entryObject["label"]?.stringOrNull())
                            ?.trim()?.takeIf { it.isNotEmpty() }
                    }
                }
            }.orEmpty()
            val title = obj["title"]?.stringOrNull()?.trim().orEmpty()
            if (items.isEmpty() && title.isEmpty()) return@mapIndexedNotNull null
            Practical.MarkSection(
                id = obj["id"]?.stringOrNull() ?: "sec-$index",
                title = title,
                items = items,
            )
        }
    }

    private fun decisionsOf(raw: JsonElement?): List<Practical.Decision> {
        val array = raw as? JsonArray ?: return emptyList()
        return array.mapIndexedNotNull { index, entry ->
            val obj = entry.jsonObjectOrNull() ?: return@mapIndexedNotNull null
            val title = obj["title"]?.stringOrNull()?.trim().orEmpty()
            val context = obj["context"]?.stringOrNull()?.trim().orEmpty()
            if (title.isEmpty() && context.isEmpty()) return@mapIndexedNotNull null
            Practical.Decision(
                id = obj["id"]?.stringOrNull() ?: "dec-$index",
                title = title,
                context = context,
                prompt = (obj["prompt"]?.stringOrNull() ?: obj["question"]?.stringOrNull())
                    ?.trim()?.takeIf { it.isNotEmpty() },
                answer = (obj["answer"]?.stringOrNull() ?: obj["explanation"]?.stringOrNull())
                    ?.trim()?.takeIf { it.isNotEmpty() },
            )
        }
    }

    private fun labQuestionsOf(raw: JsonElement?): List<Practical.LabQuestion> {
        val array = raw as? JsonArray ?: return emptyList()
        return array.mapIndexedNotNull { index, entry ->
            val obj = entry.jsonObjectOrNull() ?: return@mapIndexedNotNull null
            val prompt = (obj["prompt"]?.stringOrNull() ?: obj["stem"]?.stringOrNull() ?: obj["question"]?.stringOrNull())
                ?.trim()?.takeIf { it.isNotEmpty() } ?: return@mapIndexedNotNull null
            Practical.LabQuestion(
                id = obj["id"]?.stringOrNull() ?: "q-$index",
                prompt = prompt,
                answer = (obj["answer"]?.stringOrNull() ?: obj["explanation"]?.stringOrNull())
                    ?.trim()?.takeIf { it.isNotEmpty() },
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
