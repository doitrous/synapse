package com.nishany.android.core.calendar

import com.nishany.android.core.CortexJson
import java.time.LocalDate
import java.time.LocalDateTime
import java.time.LocalTime
import java.time.format.DateTimeFormatter
import kotlinx.serialization.Serializable
import kotlinx.serialization.builtins.ListSerializer
import kotlinx.serialization.json.JsonArray
import kotlinx.serialization.json.JsonObject
import kotlinx.serialization.json.JsonPrimitive
import kotlinx.serialization.json.booleanOrNull
import kotlinx.serialization.json.jsonObject

/**
 * The published module timetable, catalogue-synced under
 * [com.nishany.android.core.sync.SyncEngine.CATALOGUE_KEYS]'s
 * `synapse-module-schedules-v1` entry (the server's `nishany-module-schedules-v1`,
 * reachable through either spelling -- see `server/src/stateKeys.js`).
 * Admin-written, student-read: this app never writes it, so unlike
 * [com.nishany.android.core.notebook.Note] and [Task] there is no
 * round-trip-fidelity requirement -- only the fields a agenda card shows are
 * modelled. A port of `ModuleScheduleBlock` in `src/data/moduleSchedule.ts`.
 */
const val MODULE_SCHEDULES_KEY = "synapse-module-schedules-v1"

@Serializable
data class ScheduleBlock(
    val id: String,
    val type: String,
    val title: String,
    val date: String,
    val startTime: String = "",
    val endTime: String = "",
    val location: String = "",
    val completed: Boolean = false,
)

private const val PUBLISH_STATE_KEY = "__schedulePublishState__"
private val EXAM_TYPES = setOf("midterm", "midyear", "term", "final")

/** `"Lecture"`, `"Mid-term exam"`, … -- a port of `MODULE_BLOCK_LABEL`. */
private val BLOCK_LABELS = mapOf(
    "lecture" to "Lecture",
    "practical" to "Practical session",
    "review" to "Review session",
    "midterm" to "Mid-term exam",
    "midyear" to "Mid-year exam",
    "term" to "Term exam",
    "final" to "Final exam",
    "logbook" to "Logbook task",
)

fun blockLabel(type: String): String = BLOCK_LABELS[type] ?: type

/** One flattened, dated entry on the agenda -- either a published schedule block or a personal [Task] with a date. */
sealed interface AgendaItem {
    val start: LocalDateTime
    val title: String

    data class Schedule(val block: ScheduleBlock, override val start: LocalDateTime) : AgendaItem {
        override val title: String get() = block.title
        val isExam: Boolean get() = block.type in EXAM_TYPES
    }

    data class TaskEntry(val task: Task, override val start: LocalDateTime) : AgendaItem {
        override val title: String get() = task.title
    }
}

private val DATE_FORMAT: DateTimeFormatter = DateTimeFormatter.ISO_LOCAL_DATE

/** `YYYY-MM-DD` (+ optional `HH:MM`) parsed as a local date-time, or null for a malformed/blank date -- an unpublished block never reaches this. */
private fun localDateTime(date: String, time: String): LocalDateTime? {
    val day = runCatching { LocalDate.parse(date, DATE_FORMAT) }.getOrNull() ?: return null
    val clock = runCatching { LocalTime.parse(time.ifBlank { "00:00" }) }.getOrDefault(LocalTime.MIDNIGHT)
    return LocalDateTime.of(day, clock)
}

/**
 * Decodes the whole `ModuleScheduleStore` document: a map of module key to
 * block list, plus one reserved key ([PUBLISH_STATE_KEY]) holding the
 * publish flags -- see `withSchedulePublished` in `moduleSchedule.ts` for why
 * that flag cannot live on the array itself. A module key this build cannot
 * decode (or one that is not a JSON array at all) contributes no blocks
 * rather than failing the whole document.
 */
private fun decodeScheduleStore(json: String): Pair<Map<String, List<ScheduleBlock>>, Set<String>> {
    val root = runCatching { CortexJson.parseToJsonElement(json).jsonObject }.getOrNull() ?: return emptyMap<String, List<ScheduleBlock>>() to emptySet()
    val published = (root[PUBLISH_STATE_KEY] as? JsonObject)?.entries
        ?.filter { (it.value as? JsonPrimitive)?.booleanOrNull == true }
        ?.map { it.key }
        ?.toSet()
        ?: emptySet()
    val serializer = ListSerializer(ScheduleBlock.serializer())
    val blocks = root.entries
        .filter { it.key != PUBLISH_STATE_KEY }
        .mapNotNull { (key, value) ->
            val array = value as? JsonArray ?: return@mapNotNull null
            val decoded = runCatching { CortexJson.decodeFromJsonElement(serializer, array) }.getOrNull() ?: return@mapNotNull null
            key to decoded
        }
        .toMap()
    return blocks to published
}

/**
 * Every block from every *published* module, flattened and time-sorted.
 *
 * Unlike `flattenSchedule` in `src/lib/studentSchedule.ts`, this is not
 * scoped to the signed-in student's own university/year/courses -- Android
 * carries no student academic-identity model yet (no university/year on the
 * session, unlike the content ledger's own `universityIds`/`yearIds`
 * filtering), so there is nothing to join `moduleKey` against. Every
 * published module across every course shows here. ponytail: acceptable for
 * a first pass because M1 does not personalise by university anywhere else
 * in this app either; upgrade path is a student-profile university/year
 * model plus the same `moduleKey` join the web/iOS use.
 */
fun flattenPublishedSchedule(json: String): List<AgendaItem.Schedule> {
    val (blocksByModule, published) = decodeScheduleStore(json)
    return blocksByModule
        .filterKeys { it in published }
        .values
        .flatten()
        .mapNotNull { block -> localDateTime(block.date, block.startTime)?.let { AgendaItem.Schedule(block, it) } }
        .sortedBy { it.start }
}
