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
    /**
     * What the station is out of. Never null: an unmarked station is worth
     * [DEFAULT_STATION_MARKS], which is what the web gives it -- see
     * [Practical.project].
     */
    val marks: Int,
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
    /**
     * One tickable point on the mark scheme.
     *
     * [id] is the *authored* id, and it has to be: the shared
     * `nishany.practical.progress.v1` document stores a station's
     * `checkedItems` as authored item ids, and the web restores a run with
     * `checked.has(item.id)` (`PracticalRunner.tsx:227`, `:230`). A tick
     * written under a positional key restores nothing on the web, and the
     * web's restores nothing here.
     */
    data class MarkItem(val id: String, val text: String)

    /**
     * A block of the mark scheme.
     *
     * [marks] is the weight the whole section carries, not a per-item score.
     * A station is scored by weighted section share -- see [earnedMarks] --
     * so dropping this field puts a number in the shared document that means
     * one thing on the phone and another on the web.
     */
    data class MarkSection(
        val id: String,
        val title: String,
        val marks: Int,
        val items: List<MarkItem>,
    )

    data class Decision(
        val id: String,
        val title: String,
        val context: String,
        val prompt: String?,
        val answer: String?,
        /**
         * How many answers with non-blank text the author wrote for this
         * decision. A stage with none is not a question -- the web filters
         * it out of the run entirely (`PracticalRunner.tsx:421`) -- so it
         * must not be counted towards `steps` here either. See
         * [answerableDecisions].
         */
        val answerCount: Int,
    )

    data class LabQuestion(
        val id: String,
        val prompt: String,
        val answer: String?,
        /** As [Decision.answerCount]; the web's own filter is `PracticalRunner.tsx:544`. */
        val answerCount: Int,
    )

    /**
     * The decisions a student can actually be asked, in the order the web
     * numbers them.
     *
     * `steps` in the shared document is "always the latest" while `lastStep`
     * is a monotonic maximum, so counting unanswerable stages here would
     * push `lastStep` above the `steps` the web later writes and leave the
     * student reading "5 of 3". The attempt log's `itemId` is
     * `"$caseId:$index"` against this same filtered list, so any reader must
     * index into it, not into [decisions].
     */
    val answerableDecisions: List<Decision> get() = decisions.filter { it.answerCount > 0 }

    /** As [answerableDecisions], for a lab or imaging set. */
    val answerableQuestions: List<LabQuestion> get() = questions.filter { it.answerCount > 0 }

    /**
     * What a fully ticked mark scheme is worth: `Σ section.marks`
     * (`PracticalRunner.tsx:181`). Distinct from [marks], which is the
     * authored `Marks` *field* on the item -- the admin keeps them in step
     * but a student's score must be computed from the sections that were
     * actually ticked.
     */
    val totalMarks: Int get() = markSections.sumOf { it.marks }

    /**
     * What [ticked] is worth, by weighted section share:
     * `Σ section.marks × (ticked in section / items in section)`, rounded --
     * a verbatim port of `PracticalRunner.tsx:230`. A tick *count* is not
     * this number, and writing one into `bestMarks` makes
     * `recordStationRun` compare two different scales as if they were one.
     */
    fun earnedMarks(ticked: Set<String>): Int {
        val earned = markSections.sumOf { section ->
            if (section.items.isEmpty()) {
                0.0
            } else {
                section.marks * (section.items.count { it.id in ticked }.toDouble() / section.items.size)
            }
        }
        return kotlin.math.round(earned).toInt()
    }
}

/**
 * What a station is out of when nobody said: `|| 20` in
 * `src/lib/useLivePracticals.ts:80`.
 */
const val DEFAULT_STATION_MARKS = 20

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
            // `marks: Number(i.fields.Marks) || 20` in
            // `src/lib/useLivePracticals.ts:80`. This read `?: 0` and left
            // the fallback to the one screen that showed it, so a station an
            // author had not given a mark total to read as "0 marks" here
            // and "20 marks" on the site -- and anything else that came to
            // use this field would have inherited the zero.
            //
            // `||` in TypeScript is falsy, not nullish: an authored "0" is
            // 20 there too, hence the takeIf rather than a plain elvis.
            marks = fields?.get("Marks")?.stringOrNull()?.trim()?.toIntOrNull()?.takeIf { it != 0 }
                ?: DEFAULT_STATION_MARKS,
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

    /**
     * Reads a mark scheme as authored: `{ id, title, marks, items: [{ id, text }] }`
     * (`PracticalMarkSectionDraft` in `src/data/contentControl.ts:347-352`).
     *
     * Tolerant on the way in, and deliberately so: a bare-string item, an
     * item with no id, and a section with no `marks` must all still project
     * rather than drop the section a student would otherwise never see. An
     * item with no authored id falls back to `"$sectionId:$index"`; a
     * section with no readable `marks` falls back to `0`, which is what the
     * web's own importer does with an unparseable figure
     * (`bulkImport.ts:267`).
     */
    private fun markSectionsOf(raw: JsonElement?): List<Practical.MarkSection> {
        val array = raw as? JsonArray ?: return emptyList()
        return array.mapIndexedNotNull { index, entry ->
            val obj = entry.jsonObjectOrNull() ?: return@mapIndexedNotNull null
            val sectionId = obj["id"]?.stringOrNull() ?: "sec-$index"
            val items = (obj["items"] as? JsonArray)?.mapIndexedNotNull { itemIndex, itemElement ->
                val fallbackId = "$sectionId:$itemIndex"
                when (itemElement) {
                    is JsonPrimitive -> itemElement.contentOrNull?.trim()?.takeIf { it.isNotEmpty() }
                        ?.let { Practical.MarkItem(id = fallbackId, text = it) }
                    else -> itemElement.jsonObjectOrNull()?.let { entryObject ->
                        val text = (entryObject["text"]?.stringOrNull() ?: entryObject["label"]?.stringOrNull())
                            ?.trim()?.takeIf { it.isNotEmpty() } ?: return@let null
                        Practical.MarkItem(
                            id = entryObject["id"]?.stringOrNull()?.trim()?.takeIf { it.isNotEmpty() } ?: fallbackId,
                            text = text,
                        )
                    }
                }
            }.orEmpty()
            val title = obj["title"]?.stringOrNull()?.trim().orEmpty()
            if (items.isEmpty() && title.isEmpty()) return@mapIndexedNotNull null
            Practical.MarkSection(
                id = sectionId,
                title = title,
                marks = obj["marks"]?.intOrNull() ?: 0,
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
                answerCount = obj["answers"].nonBlankAnswerCount(),
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
                answerCount = obj["answers"].nonBlankAnswerCount(),
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

/** Reads a number authored either as a JSON number or as a string, the way `Duration` and `Marks` arrive. */
private fun JsonElement.intOrNull(): Int? = (this as? JsonPrimitive)?.contentOrNull?.trim()?.toDoubleOrNull()?.toInt()

/**
 * How many of an authored `answers` array have non-blank text.
 *
 * The web's own filter, `answers.filter((answer) => answer.text.trim())`
 * (`PracticalRunner.tsx:414`, `:542`), and the reason it exists: a stage
 * with no options is not a question, and the runner used to invent three of
 * them rather than skip it.
 */
private fun JsonElement?.nonBlankAnswerCount(): Int =
    (this as? JsonArray)?.count { answer ->
        !answer.jsonObjectOrNull()?.get("text")?.stringOrNull()?.trim().isNullOrEmpty()
    } ?: 0
