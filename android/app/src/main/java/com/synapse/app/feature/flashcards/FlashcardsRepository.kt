package com.synapse.app.feature.flashcards

import com.synapse.app.core.cache.LocalStore
import com.synapse.app.core.flashcards.DailyDeckCounts
import com.synapse.app.core.flashcards.DeckProjection
import com.synapse.app.core.flashcards.StoredDeck
import com.synapse.app.core.flashcards.StudentDeck
import com.synapse.app.core.model.StateDoc
import com.synapse.app.core.sync.SyncEngine
import kotlinx.coroutines.sync.Mutex
import kotlinx.coroutines.sync.withLock
import kotlinx.serialization.builtins.MapSerializer
import kotlinx.serialization.builtins.serializer
import kotlinx.serialization.json.Json
import java.time.Instant
import java.time.ZoneId
import javax.inject.Inject

/** The shared, admin-authored ledger every student deck catalogue is projected from. */
private const val CONTENT_LEDGER_KEY = "synapse-admin-content-ledger-v4"

/** The student's own decks (`Map<deckId, StoredDeck>`), keyed by id, kept off the shared ledger. */
private const val DECKS_KEY = "synapse.flashcards.decks.v1"

/** Today's new/review caps, scoped to the device's local calendar day (see [FlashcardsRepository.dailyCounts]). */
private const val DAILY_COUNTS_KEY = "synapse.flashcards.dailyCounts.v1"

/**
 * The flashcards data layer: projects the shared content ledger into
 * provided decks ([providedDecks]), and reads/writes the student's own decks
 * ([ownDecks]) and the daily new/review study caps ([dailyCounts]) over the
 * durable user-state store from Plan 04.
 *
 * Keys are defined locally rather than imported from [com.synapse.app.feature.qbank] —
 * QBank and flashcards are decoupled features that happen to share a storage
 * mechanism, not a namespace.
 *
 * **Deliberately not built here: card-attempt logging.** The web logs every
 * grade via `CardRunner.logAttempt` as a `surface: "card"` attempt with
 * `correct: null` — a flashcard grade is a self-report of recall quality,
 * not a marked answer, and coercing it into true/false would quietly
 * corrupt every accuracy figure elsewhere that reads the attempt log (see
 * the research doc, `docs/superpowers/specs/2026-08-29-android-flashcards-research.md`
 * §3.3). Android's `AttemptRecord` id scheme is session-oriented
 * (`sessionId:surface:itemId`), and how the streak/dashboard should consume
 * a `correct = null` grade attempt is not yet designed. Do not wire grading
 * into attempt recording until that scheme exists — this is a tracked
 * follow-up, not an oversight.
 */
class FlashcardsRepository @Inject constructor(
    private val localStore: LocalStore,
    private val syncEngine: SyncEngine,
    private val json: Json,
) {

    /** Serializes [updateOwnDecks]/[updateDailyCounts] so two concurrent grades can't clobber each other's write. */
    private val writeMutex = Mutex()

    private val deckMapSerializer = MapSerializer(String.serializer(), StoredDeck.serializer())

    /** Published decks off the shared content ledger. Empty if absent/unparseable. */
    suspend fun providedDecks(): List<StudentDeck> =
        DeckProjection.project(ledgerJsonOrEmpty())

    /** The student's own decks (including provided-deck mirrors), keyed by id. Empty if absent/unparseable. */
    suspend fun ownDecks(): Map<String, StoredDeck> {
        val stored = localStore.getUserState(DECKS_KEY) ?: return emptyMap()
        return runCatching { json.decodeFromString(deckMapSerializer, stored) }.getOrDefault(emptyMap())
    }

    /**
     * Today's new/review caps. Reset to `(today, 0, 0)` whenever the stored
     * `day` isn't [now]'s **local** calendar day — the caps bound how many
     * cards a student sees per day as they experience it on their device,
     * not per UTC day, so a student west of Greenwich isn't cut off (or
     * handed a fresh allowance) hours early or late.
     */
    suspend fun dailyCounts(now: Instant): DailyDeckCounts {
        val today = localDay(now)
        val stored = localStore.getUserState(DAILY_COUNTS_KEY)?.let { raw ->
            runCatching { json.decodeFromString(DailyDeckCounts.serializer(), raw) }.getOrNull()
        }
        return if (stored != null && stored.day == today) stored else DailyDeckCounts(today, 0, 0)
    }

    /**
     * Atomic read-modify-write of the student's own decks. The whole
     * document is re-encoded and replaced — not appended — mirroring
     * `QBankRepository`'s month re-sync via [SyncEngine.write].
     */
    suspend fun updateOwnDecks(now: Instant, transform: (Map<String, StoredDeck>) -> Map<String, StoredDeck>) {
        writeMutex.withLock {
            val next = transform(ownDecks())
            syncEngine.write(DECKS_KEY, json.encodeToString(deckMapSerializer, next), now)
        }
    }

    /** Atomic read-modify-write of today's counts (already day-reset before [transform] sees it). See [updateOwnDecks]. */
    suspend fun updateDailyCounts(now: Instant, transform: (DailyDeckCounts) -> DailyDeckCounts) {
        writeMutex.withLock {
            val next = transform(dailyCounts(now))
            syncEngine.write(DAILY_COUNTS_KEY, json.encodeToString(DailyDeckCounts.serializer(), next), now)
        }
    }

    /** Convenience: upsert one deck by id. */
    suspend fun saveDeck(now: Instant, deck: StoredDeck) {
        updateOwnDecks(now) { it + (deck.id to deck) }
    }

    /** Convenience: drop one deck by id. A no-op if it isn't present. */
    suspend fun removeDeck(now: Instant, deckId: String) {
        updateOwnDecks(now) { it - deckId }
    }

    private fun localDay(now: Instant): String =
        now.atZone(ZoneId.systemDefault()).toLocalDate().toString()

    /** The ledger's raw `value` JSON, stringified for [DeckProjection]. */
    private suspend fun ledgerJsonOrEmpty(): String {
        val stored = localStore.getCatalogue(CONTENT_LEDGER_KEY) ?: return "[]"
        return runCatching {
            val doc = json.decodeFromString(StateDoc.serializer(), stored)
            doc.value.toString()
        }.getOrDefault("[]")
    }
}
