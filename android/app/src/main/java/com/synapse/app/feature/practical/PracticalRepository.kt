package com.synapse.app.feature.practical

import com.synapse.app.core.cache.LocalStore
import com.synapse.app.core.model.StateDoc
import com.synapse.app.core.practical.Practical
import com.synapse.app.core.practical.PracticalProgress
import com.synapse.app.core.practical.PracticalProjection
import com.synapse.app.core.practical.recordCase
import com.synapse.app.core.practical.recordStation
import com.synapse.app.core.practical.setSkillStatus
import com.synapse.app.core.sync.SyncEngine
import kotlinx.coroutines.sync.Mutex
import kotlinx.coroutines.sync.withLock
import kotlinx.serialization.json.Json
import java.time.Instant
import javax.inject.Inject

/** The shared, admin-authored ledger every student practical catalogue is projected from. */
private const val CONTENT_LEDGER_KEY = "synapse-admin-content-ledger-v4"

/**
 * The Practical data layer: projects the shared content ledger into
 * student-facing [Practical] items ([practicals]) and reads/writes this
 * student's own [PracticalProgress] ([progress]) over the durable user-state
 * store — mirrors `LibraryRepository`'s shape exactly.
 */
class PracticalRepository @Inject constructor(
    private val localStore: LocalStore,
    private val syncEngine: SyncEngine,
    private val json: Json,
) {

    /** Serializes writes so two concurrent runs (e.g. a station finished mid-sync-drain) can't clobber each other. */
    private val writeMutex = Mutex()

    /** Published practical items off the shared content ledger. Empty if absent/unparseable. */
    suspend fun practicals(): List<Practical> = PracticalProjection.project(ledgerJsonOrEmpty())

    /** This student's own practical record. Empty (all-defaults) if nothing has been saved yet. */
    suspend fun progress(): PracticalProgress {
        val stored = localStore.getUserState(PracticalProgress.KEY) ?: return PracticalProgress()
        return runCatching { json.decodeFromString(PracticalProgress.serializer(), stored) }.getOrDefault(PracticalProgress())
    }

    /**
     * Keep a station (or skills-checklist-with-a-mark-scheme) run. A no-op
     * when nothing was ticked — an unopened mark scheme is not a run.
     */
    suspend fun recordStation(stationId: String, marks: Int, outOf: Int, checkedItems: List<String>, now: Instant) {
        if (checkedItems.isEmpty()) return
        writeMutex.withLock {
            val next = progress().recordStation(stationId, marks, outOf, checkedItems, now.toString())
            syncEngine.write(PracticalProgress.KEY, json.encodeToString(PracticalProgress.serializer(), next), now)
        }
    }

    /** Keep a case's progress. A no-op when it has no decisions to have stepped through. */
    suspend fun recordCase(caseId: String, lastStep: Int, steps: Int, completed: Boolean, now: Instant) {
        if (steps <= 0) return
        writeMutex.withLock {
            val next = progress().recordCase(caseId, lastStep, steps, completed, now.toString())
            syncEngine.write(PracticalProgress.KEY, json.encodeToString(PracticalProgress.serializer(), next), now)
        }
    }

    /** Move a skill on to whatever it says next ([PracticalProgress.SkillStatus.next]). */
    suspend fun cycleSkill(skillId: String, now: Instant) {
        writeMutex.withLock {
            val current = progress()
            val nextStatus = current.statusOfSkill(skillId).next
            val next = current.setSkillStatus(skillId, nextStatus, now.toString())
            syncEngine.write(PracticalProgress.KEY, json.encodeToString(PracticalProgress.serializer(), next), now)
        }
    }

    /** The ledger's raw `value` JSON, stringified for [PracticalProjection]. */
    private suspend fun ledgerJsonOrEmpty(): String {
        val stored = localStore.getCatalogue(CONTENT_LEDGER_KEY) ?: return "[]"
        return runCatching {
            val doc = json.decodeFromString(StateDoc.serializer(), stored)
            doc.value.toString()
        }.getOrDefault("[]")
    }
}
