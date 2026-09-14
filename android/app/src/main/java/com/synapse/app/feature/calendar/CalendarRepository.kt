package com.synapse.app.feature.calendar

import com.synapse.app.core.cache.LocalStore
import com.synapse.app.core.calendar.CurriculumSession
import com.synapse.app.core.calendar.ModuleScheduleBlockDto
import com.synapse.app.core.calendar.ModuleScheduleStore
import com.synapse.app.core.calendar.StudyBlock
import com.synapse.app.core.model.StateDoc
import com.synapse.app.core.sync.SyncEngine
import kotlinx.coroutines.sync.Mutex
import kotlinx.coroutines.sync.withLock
import kotlinx.serialization.builtins.ListSerializer
import kotlinx.serialization.json.Json
import kotlinx.serialization.json.JsonArray
import kotlinx.serialization.json.JsonObject
import java.time.Instant
import javax.inject.Inject

/** The shared, admin-published university timetable every student's schedule is projected from. */
private const val MODULE_SCHEDULES_KEY = "synapse-module-schedules-v1"

/** The student's own planned blocks — a per-user document, matching web's `STUDY_BLOCKS_STORAGE_KEY`. */
private const val BLOCKS_KEY = "synapse.calendar.blocks"

/**
 * The Calendar data layer: reads the shared, admin-published timetable
 * catalogue and reads/writes this student's own planned blocks over the
 * durable user-state store — mirrors `LibraryRepository`/`PracticalRepository`'s
 * shape.
 *
 * **Deliberately not built here: a scoped [curriculumSessions].** See that
 * method's doc comment.
 */
class CalendarRepository @Inject constructor(
    private val localStore: LocalStore,
    private val syncEngine: SyncEngine,
    private val json: Json,
) {

    /** Serializes [saveBlock]/[deleteBlock] so two concurrent edits can't clobber each other. */
    private val writeMutex = Mutex()

    private val blockListSerializer = ListSerializer(StudyBlock.serializer())

    /**
     * The student's own planned blocks. Decoded element-by-element so one
     * malformed entry (a bad app version, a partial sync) is dropped instead
     * of blanking the whole list — same tolerance as [moduleScheduleStore].
     */
    suspend fun blocks(): List<StudyBlock> {
        val stored = localStore.getUserState(BLOCKS_KEY) ?: return emptyList()
        val array = runCatching { json.parseToJsonElement(stored) }.getOrNull() as? JsonArray ?: return emptyList()
        return array.mapNotNull { element ->
            runCatching { json.decodeFromJsonElement(StudyBlock.serializer(), element) }.getOrNull()
        }
    }

    /** Create or update one block by id — the whole document is re-encoded and replaced, matching `FlashcardsRepository.updateOwnDecks`. */
    suspend fun saveBlock(block: StudyBlock, now: Instant) {
        writeMutex.withLock {
            val current = blocks()
            val next = if (current.any { it.id == block.id }) {
                current.map { if (it.id == block.id) block else it }
            } else {
                current + block
            }
            syncEngine.write(BLOCKS_KEY, json.encodeToString(blockListSerializer, next), now)
        }
    }

    /** Remove one block by id. A no-op if it isn't present. */
    suspend fun deleteBlock(id: String, now: Instant) {
        writeMutex.withLock {
            val next = blocks().filterNot { it.id == id }
            syncEngine.write(BLOCKS_KEY, json.encodeToString(blockListSerializer, next), now)
        }
    }

    /**
     * The published university timetable, projected for the student's own
     * university/year. **Always empty today.**
     *
     * `synapse-module-schedules-v1` is keyed
     * `<universityId>:<yearId-or-label>:<courseId>` — every block is
     * authored against a specific university and year, so there is no
     * meaningful "everyone" bucket to fall back to the way an unscoped
     * [com.synapse.app.core.adaptive.BlueprintScope] does for blueprints.
     * Android has no confirmed source yet for which university/year the
     * signed-in student belongs to; `feature/adaptive/AdaptiveRepository.kt`
     * hits the exact same gap (`BlueprintScope("", "")`) and documents it the
     * same way. Per this task's brief: show what is readable (this
     * student's own [blocks], which need no such scope) and defer the
     * timetable honestly rather than invent an enrollment.
     *
     * The pure projection this would call is already ported and unit-tested
     * — [com.synapse.app.core.calendar.flattenModuleSchedule] — so wiring
     * this up the day identity lands is a one-line change: decode
     * [moduleScheduleStore] (already done here) and pass it the real
     * university id, year id/label, and course list.
     */
    suspend fun curriculumSessions(): List<CurriculumSession> = emptyList()

    /** The schedule catalogue, tolerantly decoded, ready for [com.synapse.app.core.calendar.flattenModuleSchedule] once a university/year scope exists. Empty if absent/unparseable. */
    suspend fun moduleScheduleStore(): ModuleScheduleStore {
        val stored = localStore.getCatalogue(MODULE_SCHEDULES_KEY) ?: return emptyMap()
        val value = runCatching {
            json.decodeFromString(StateDoc.serializer(), stored).value
        }.getOrNull() as? JsonObject ?: return emptyMap()
        return value.mapValues { (_, blocks) ->
            (blocks as? JsonArray)?.mapNotNull { block ->
                runCatching { json.decodeFromJsonElement(ModuleScheduleBlockDto.serializer(), block) }.getOrNull()
            } ?: emptyList()
        }
    }
}
