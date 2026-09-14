package com.synapse.app.feature.essays

import com.synapse.app.core.cache.LocalStore
import com.synapse.app.core.essays.EssayProjection
import com.synapse.app.core.essays.EssayQuestion
import com.synapse.app.core.essays.WrittenProjection
import com.synapse.app.core.essays.WrittenQuestion
import com.synapse.app.core.essays.WrittenTicks
import com.synapse.app.core.model.StateDoc
import com.synapse.app.core.sync.SyncEngine
import kotlinx.coroutines.sync.Mutex
import kotlinx.coroutines.sync.withLock
import kotlinx.serialization.builtins.MapSerializer
import kotlinx.serialization.builtins.serializer
import kotlinx.serialization.json.Json
import java.time.Instant
import javax.inject.Inject

/** The shared, admin-authored ledger essays and written questions are projected from. */
private const val CONTENT_LEDGER_KEY = "synapse-admin-content-ledger-v4"

/** This student's own practice-essay answers, matching web's `synapse.essay.answers.v1`. */
private const val ESSAY_ANSWERS_KEY = "synapse.essay.answers.v1"

/** This student's own written-exam-question answers, matching web's `synapse.written.answers.v1`. */
private const val WRITTEN_ANSWERS_KEY = "synapse.written.answers.v1"

/**
 * The Essays data layer: projects the shared content ledger into student-facing
 * practice essays ([essays]) and written exam questions ([writtenQuestions]),
 * and reads/writes the student's own drafts, reveals and self-marks over the
 * durable user-state store.
 *
 * Mirrors `com.synapse.app.feature.library.LibraryRepository`'s shape exactly:
 * keys defined locally rather than imported from another feature, a real
 * [SyncEngine] write-through so a read immediately after a write reflects it,
 * and a [Mutex] serializing concurrent writes to the same document.
 */
class EssaysRepository @Inject constructor(
    private val localStore: LocalStore,
    private val syncEngine: SyncEngine,
    private val json: Json,
) {

    private val writeMutex = Mutex()

    private val essayAnswerSerializer = MapSerializer(String.serializer(), EssayAnswer.serializer())
    private val writtenAnswerSerializer = MapSerializer(String.serializer(), WrittenAnswer.serializer())

    /** Published practice essays off the shared content ledger. Empty if absent/unparseable. */
    suspend fun essays(): List<EssayQuestion> = EssayProjection.project(ledgerJsonOrEmpty())

    /** Published written exam questions off the shared content ledger. Empty if absent/unparseable. */
    suspend fun writtenQuestions(): List<WrittenQuestion> = WrittenProjection.project(ledgerJsonOrEmpty())

    /** Essay id -> this student's own answer. */
    suspend fun essayAnswers(): Map<String, EssayAnswer> {
        val stored = localStore.getUserState(ESSAY_ANSWERS_KEY) ?: return emptyMap()
        return runCatching { json.decodeFromString(essayAnswerSerializer, stored) }.getOrDefault(emptyMap())
    }

    /** Written question id -> this student's own answer. */
    suspend fun writtenAnswers(): Map<String, WrittenAnswer> {
        val stored = localStore.getUserState(WRITTEN_ANSWERS_KEY) ?: return emptyMap()
        return runCatching { json.decodeFromString(writtenAnswerSerializer, stored) }.getOrDefault(emptyMap())
    }

    /**
     * Save (overwriting) the student's answer to one essay. One flat document
     * rather than a shard per answer, matching `useEssayAnswers.save`:
     * rereading and re-marking the same essay overwrites its entry.
     */
    suspend fun saveEssayAnswer(
        essayId: String,
        text: String,
        ticked: List<String>?,
        revealed: Boolean?,
        now: Instant,
    ) {
        writeMutex.withLock {
            val next = essayAnswers() + (essayId to EssayAnswer(text, ticked, revealed, now.toString()))
            syncEngine.write(ESSAY_ANSWERS_KEY, json.encodeToString(essayAnswerSerializer, next), now)
        }
    }

    /** Save (overwriting) the student's answer to one written exam question. */
    suspend fun saveWrittenAnswer(
        questionId: String,
        text: Map<String, String>,
        ticks: WrittenTicks?,
        revealed: Boolean?,
        now: Instant,
    ) {
        writeMutex.withLock {
            val next = writtenAnswers() + (questionId to WrittenAnswer(text, ticks, revealed, now.toString()))
            syncEngine.write(WRITTEN_ANSWERS_KEY, json.encodeToString(writtenAnswerSerializer, next), now)
        }
    }

    /** The ledger's raw `value` JSON, stringified for [EssayProjection]/[WrittenProjection]. */
    private suspend fun ledgerJsonOrEmpty(): String {
        val stored = localStore.getCatalogue(CONTENT_LEDGER_KEY) ?: return "[]"
        return runCatching {
            val doc = json.decodeFromString(StateDoc.serializer(), stored)
            doc.value.toString()
        }.getOrDefault("[]")
    }
}
