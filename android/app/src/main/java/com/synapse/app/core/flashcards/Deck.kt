package com.synapse.app.core.flashcards

import kotlinx.serialization.Serializable
import java.time.Instant

/**
 * What a deck is, and which of its cards are worth showing today.
 *
 * This file is pure — no Android framework, no storage, no clock of its own —
 * for the same reason [Srs.kt][CardSchedule] takes `now` as a parameter: a
 * queue that reads its own clock or its own store can only be asserted
 * against itself.
 *
 * A deck reaches a student from one of two places. [DeckProjection] takes an
 * admin-authored deck off the content ledger. [deckFromTerms] builds one on
 * the fly from a filtered set of Medical Taxonomy terms, for "study these as
 * flashcards" off a glossary view. Both land on [StudentDeck].
 *
 * A verbatim port of `src/data/decks.ts`.
 */

/** One card's content: front and back text only — no media, no cloze. */
@Serializable
data class DeckCard(val id: String, val front: String, val back: String)

/** A deck as a student sees it: content only, no per-student scheduling. */
data class StudentDeck(
    val id: String,
    val title: String,
    val subjectId: String,
    val description: String,
    val cards: List<DeckCard>,
)

/**
 * A deck as the student's OWN document stores it — the per-student half that
 * never appears on the content ledger.
 *
 * [schedules] is keyed by card id and lives here, on the student's own
 * document, even for cards that came from a published deck ([sourceId] set).
 * That is why an admin fixing a typo on a card never resets anyone's
 * progress, and why two students studying the same published deck never see
 * each other's intervals. [cards] for a provided-deck mirror is a snapshot of
 * content taken when the deck was (re-)opened for study, not a live join.
 */
@Serializable
data class StoredDeck(
    val id: String,
    val name: String,
    /** Set when this deck mirrors a published one, so its cards come from there. */
    val sourceId: String? = null,
    val cards: List<DeckCard>,
    /** Card id -> schedule. Covers premade cards too: the schedule is the student's. */
    val schedules: Map<String, CardSchedule> = emptyMap(),
    val createdAt: String,
)

/** One card paired with the schedule that decides whether it is due. */
data class StudyCard(val id: String, val schedule: CardSchedule)

/** How many new and review cards a student has already been shown today, and which day that is. */
@Serializable
data class DailyDeckCounts(val day: String, val newSeen: Int, val reviewsSeen: Int)

/**
 * Which cards are worth showing right now, due cards first.
 *
 * Due comes before new because a pile of overdue reviews buried under fresh
 * material is how a deck gets abandoned — the student never gets back to the
 * reviews they already owe. Caps come from [config] (Anki's own defaults: 20
 * new, 200 reviews), and [seenToday] is subtracted from them so the limit
 * holds across a whole day's sittings, not just this one call.
 */
fun dueQueue(
    cards: List<StudyCard>,
    now: Instant,
    config: SrsConfig = AnkiDefaults,
    seenToday: DailyDeckCounts,
): List<StudyCard> {
    val due = cards.filter { it.schedule.state != CardState.New && isDue(it.schedule, now) }
    val fresh = cards.filter { it.schedule.state == CardState.New }

    val dueRoom = maxOf(0, config.maxReviewsPerDay - seenToday.reviewsSeen)
    val newRoom = maxOf(0, config.newPerDay - seenToday.newSeen)

    return due.take(dueRoom) + fresh.take(newRoom)
}

/**
 * One card per line, front and back split on the first `|`. A line without a
 * separator has no back to show, so it is not a card — silently keeping it
 * would leave a blank-backed card in the deck instead of telling the author
 * their line was malformed.
 */
fun parseCardLines(text: String): List<DeckCard> {
    val cards = mutableListOf<DeckCard>()
    val lines = text.split("\n")
    for (i in lines.indices) {
        val line = lines[i].trim()
        if (line.isEmpty()) continue
        val sep = line.indexOf('|')
        if (sep == -1) continue
        val front = line.substring(0, sep).trim()
        val back = line.substring(sep + 1).trim()
        cards.add(DeckCard(id = "line-$i", front = front, back = back))
    }
    return cards
}

/** The shape of a Medical Taxonomy term, as consumed by [deckFromTerms]. */
data class TaxonomyTerm(val id: String, val term: String, val def: String)

/** Lowercase, hyphenated, nothing but that — stable across runs by construction. */
private fun slugify(value: String): String =
    value.trim().lowercase().replace(Regex("[^a-z0-9]+"), "-").trim('-')

/**
 * Build a deck from a named filter over the Medical Taxonomy.
 *
 * A student re-running "study these as flashcards" on the same filter should
 * update that deck, not spawn a second one — so the deck id comes from the
 * filter name alone, and each card id comes from its term's own id, never
 * from a counter or the clock. Two runs over the same inputs land on exactly
 * the same ids. Only the English [TaxonomyTerm.term]/[TaxonomyTerm.def] are
 * used; there is no Arabic field to ignore because this type never carries one.
 */
fun deckFromTerms(filterName: String, terms: List<TaxonomyTerm>): StudentDeck {
    val id = "deck-taxonomy-${slugify(filterName)}"
    return StudentDeck(
        id = id,
        title = filterName,
        subjectId = slugify(filterName),
        description = "Flashcards from the Medical Taxonomy: $filterName",
        cards = terms.map { term -> DeckCard(id = "$id-${term.id}", front = term.term, back = term.def) },
    )
}
