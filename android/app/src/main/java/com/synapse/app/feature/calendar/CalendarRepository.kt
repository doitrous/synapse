package com.synapse.app.feature.calendar

import com.synapse.app.core.auth.AccountIdentity
import com.synapse.app.core.auth.AccountIdentityStore
import com.synapse.app.core.cache.LocalStore
import com.synapse.app.core.calendar.CalendarCourse
import com.synapse.app.core.calendar.CurriculumSession
import com.synapse.app.core.calendar.ModuleScheduleBlockDto
import com.synapse.app.core.calendar.ModuleScheduleStore
import com.synapse.app.core.calendar.StudyBlock
import com.synapse.app.core.calendar.flattenModuleSchedule
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
 * [curriculumSessions] scopes the published timetable by this student's own
 * university/year, read from [AccountIdentityStore] — see that method's doc
 * comment.
 */
class CalendarRepository @Inject constructor(
    private val localStore: LocalStore,
    private val syncEngine: SyncEngine,
    private val json: Json,
    private val accountIdentityStore: AccountIdentityStore,
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
     * university/year, via the already-ported
     * [com.synapse.app.core.calendar.flattenModuleSchedule].
     *
     * `synapse-module-schedules-v1` is keyed
     * `<universityId>:<yearId-or-label>:<courseId>` — every block is
     * authored against a specific university and year, so there is no
     * meaningful "everyone" bucket to fall back to the way an unscoped
     * [com.synapse.app.core.adaptive.BlueprintScope] does for blueprints.
     * Empty until [AccountIdentityStore] has enough to scope by
     * ([AccountIdentity.isKnown]) — same honest degradation
     * `feature/adaptive/AdaptiveRepository.kt` falls back to for an unknown
     * identity, never an invented enrollment. [coursesIn] derives the course
     * list straight off which keys [moduleScheduleStore] actually has blocks
     * for under this student's university/year, rather than a course-name
     * catalogue this client does not have.
     */
    suspend fun curriculumSessions(): List<CurriculumSession> {
        val identity = accountIdentityStore.current()
        if (!identity.isKnown) return emptyList()
        val store = moduleScheduleStore()
        return flattenModuleSchedule(
            universityId = identity.universityId,
            yearId = identity.yearId,
            yearLabel = identity.year,
            courses = coursesIn(store, identity),
            store = store,
        )
    }

    /**
     * The distinct courses [store] actually publishes blocks for, under
     * [identity]'s university keyed by either its yearId or its year label —
     * mirrors [com.synapse.app.core.calendar.moduleKey]'s own label-then-id
     * fallback. No course-name catalogue exists on Android yet, so
     * [CalendarCourse.name] is the course id itself: [flattenModuleSchedule]
     * only reads it for display, and the id is the one piece of real data
     * available rather than an invented label.
     */
    private fun coursesIn(store: ModuleScheduleStore, identity: AccountIdentity): List<CalendarCourse> {
        val prefixes = listOfNotNull(
            "${identity.universityId}:${identity.yearId}:".takeIf { identity.yearId.isNotEmpty() },
            "${identity.universityId}:${identity.year}:".takeIf { identity.year.isNotEmpty() },
        )
        return store.keys
            .mapNotNull { key -> prefixes.firstOrNull { key.startsWith(it) }?.let { key.removePrefix(it) } }
            .distinct()
            .map { CalendarCourse(id = it, name = it) }
    }

    /** The schedule catalogue, tolerantly decoded, ready for [com.synapse.app.core.calendar.flattenModuleSchedule]. Empty if absent/unparseable. */
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
